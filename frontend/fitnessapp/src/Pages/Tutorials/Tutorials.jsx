import React, { useState } from 'react';
import './Tutorials.css';
import { Categories, videoData } from './TutorialCards';
import YoutubeVideo from './YoutubeVideo';


const Tutorials = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  return (
    <div className='tutorial-container'>
      {!selectedCategory ? (
        <>
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
        </>
      ) : (
        <div className='video-section'>
          <button className='back-button' onClick={handleBackClick}>
            Back to Categories
          </button>
          <h2>{Categories.find(cat => cat.id === selectedCategory).name} Videos</h2>
          <div className='video-list'>
            {videoData[selectedCategory].map((video, index) => (
              <div key={index} className='video-frame'>
                {/* <h3>{video.title}</h3> */}
                <YoutubeVideo url={`${((video.url).split('?')[0]).replace('shorts','embed')}?controls=0&modestbranding=1&autoplay=0&rel=0&showinfo=0`}/>
                <p className='workout-name'>{video.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tutorials;
