import React, { useState } from 'react';
import './Tutorials.css';
import { Categories, videoData } from './TutorialCards';
import YoutubeVideo from './YoutubeVideo';
import { FaArrowLeft, } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import { getSearchData } from '../../api';

const Tutorials = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchData, setSearchData] = useState(false);
  const [youtubeData, setYoutubeData] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('fittrack-app-token');
      console.log(searchInput)
      const res = await getSearchData(token, searchInput);
      console.log(res.data.links);
      setYoutubeData(res.data.links);
      setSearchData(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='tutorial-wrapper'>
      {!selectedCategory ? (
        <div className='tutorial-container'>
          <h1 className='tutorial-header'>Exercise Categories</h1>
          <div className='card-grid'>
            {Categories.map((category, index) => (
              <div
                key={index}
                className='category-card'
                onClick={() => handleCategoryClick(category.id)}
              >
                <h3>{category.name}</h3>
                <img src={category.icon} alt={category.name} className='img-shadow'></img>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='video-section'>
          <div className='back-icon'>
            <FaArrowLeft onClick={handleBackClick} />
          </div>
          <h2 className='workout-category-header'>{Categories.find(cat => cat.id === selectedCategory).name} Videos</h2>
          <div className='searchbar'>
            <div className={`search-field ${searchInput ? 'filled' : ''}`}>
              <input type="text" placeholder='Search for more videos' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
              <RiCloseLine className={`clear-icon ${searchInput ? 'filled' : ''}`} onClick={() => {
                setSearchInput('');
                setSearchData(false);
              }} />
            </div>
            <MdSearch className='search-icon' onClick={handleSearch} />
          </div>
          <div className='video-list'>
            {!searchData ?
              (videoData[selectedCategory].map((video, index) => (
                <div key={index} className='video-frame'>
                  <YoutubeVideo url={`${((video.url).split('?')[0]).replace('shorts', 'embed')}?controls=0&modestbranding=1&autoplay=0&rel=0&showinfo=0`} />
                  <p className='workout-name'>{video.title}</p>
                </div>
              )))
              : (
                youtubeData.map((video, index) => (
                  <div className='video-frame'>
                    <YoutubeVideo key={index} url={`${video.url}?controls=0&modestbranding=1&autoplay=0&rel=0&showinfo=0`} />
                    <br/>
                  </div>
                ))
              )}

          </div>
        </div>
      )}
    </div>
  );
};

export default Tutorials;
