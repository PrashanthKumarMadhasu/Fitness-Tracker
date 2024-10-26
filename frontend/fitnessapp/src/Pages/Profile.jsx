import { useState, useEffect, useContext } from 'react';
import styled from "styled-components";
import { RiCloseLargeFill } from "react-icons/ri";
import Power from "../Components/Assets/power-button.png";
import HeartBreak from "../Components/Assets/broken-heart.png";
import { logout } from "../redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { deleteUserAccount } from '../api';
import { ThemeContext } from '../Utils/ThemeContext';
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

const ModalWrapper = styled.div`
  display: ${({ isModalOpen }) => (isModalOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  width: 400px;
  float:right;
  padding: 20px;
  border-radius: 10px;
  height:90vh;
  overflow-y: auto;
  position: relative;
`;

const ProfileImage = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  border-radius:50%;
`;

const ProfileImageInput = styled.input`
  display: none;
`;

const ProfileLabel = styled.label`
  display:block;
  background: #eee;
  padding: 10px;
  width:100%;
  cursor: pointer;
  border-radius:10px;
  text-align:center;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  type:"submit";
  background-color:#007bff;
  padding: 10px;
  margin-bottom:10px;
  width:100%;
  cursor: pointer;
  border-radius:10px;
  font-size:15px;
  font-weight:bold;
  border:none;
  color:#fff;
  &:hover {
      background-color:#1358a7;
    }
`;
const CloseIcon = styled.div`
  position: fixed; 
  top: 10px;
  right: 10px;
  color:red;
  font-size:22px;
  font-weight:bolder;
  cursor: pointer; 
  z-index: 1;
`;

const TextButton = styled.div`
  color: hsl(0, 0%, 30%);
  cursor: pointer;
  display:flex;
  align-items:center;
  font-size: 16px;
  transition: all 0.3s ease;
  font-weight: 300;
  margin:3px 0;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ImageIcon = styled.img`
  width:16px;
  height:16px;
  margin:0 5px ;
`;

const ThemeContainer = styled.div`
  display:flex;
  width:100%;
`;

const ThemeDark = styled.div`
  border:2px solid  ${({ active }) => (active ? 'black' : 'grey')};
  background-color: ${({ active }) => (active ? 'black' : 'white')};
  padding:5px 10px;
  font-size:22px;
  cursor:pointer;
  border-radius:5px 0 0 5px;
`;

const ThemeLight = styled.div`
  border:2px solid  ${({ active }) => (!active ? 'grey' : 'black')};
  background-color: ${({ active }) => (!active ? 'white' : 'black')};
  padding:5px 10px;
  margin-left:2px;
  font-size:22px;
  cursor:pointer;
  border-radius:0 5px 5px 0;

`;

const Profile = ({ isModalOpen, onClose, userProfile, updateProfile, handleProfilePicChange, profilePic }) => {
  const [formData, setFormData] = useState(userProfile);
  const dispatch = useDispatch();
  const { themeColor, setThemeColor } = useContext(ThemeContext);
  const [active, setActive] =useState(false);

  useEffect(() => {
    // Update formData.profilePic whenever profilePic changes
    setFormData((prevData) => ({
      ...prevData,
      profilePic: profilePic, // Update with the new base64 image
    }));
  }, [profilePic]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("the formDat or updated profile Data", formData)
    updateProfile(formData); // Pass updated profile data
  };

  const handleAccount = async () => {
    const token = localStorage.getItem("fittrack-app-token");
    await deleteUserAccount(token).then((res) => {
      alert("Account Deleted Bye TakeCare :( ");
      dispatch(logout());
    });
  }
  return (
    <ModalWrapper isModalOpen={isModalOpen}>
      <ModalContent>
        <CloseIcon><RiCloseLargeFill onClick={onClose} /></CloseIcon>
        <form onSubmit={handleSubmit}>
          <ProfileImage>
            <img
              src={formData.profilePic || 'https://via.placeholder.com/150'}
              alt="Profile Preview"
              width="150"
              height="150"
            />
          </ProfileImage>

          <ProfileLabel>
            Select Profile Picture
            <ProfileImageInput type="file" accept="image/*" onChange={handleProfilePicChange} />
          </ProfileLabel>
          <br />
          <Input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Username"
          />
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <Input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="Height (cm)"
          />
          <Input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Weight (kg)"
          />
          <Input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          <Button>Update Profile</Button>
          <hr />
          <ThemeContainer>
            <ThemeDark active={active} onClick={() => { setActive(true); setThemeColor(true); }}>
              <MdDarkMode />
            </ThemeDark>
            <ThemeLight active={!active} onClick={() => { setActive(false); setThemeColor(false); }}>
              <MdOutlineDarkMode />
            </ThemeLight>

          </ThemeContainer>
          <TextButton onClick={handleAccount} >Delete Account  <ImageIcon src={HeartBreak} /></TextButton>
          <TextButton onClick={() => dispatch(logout())}><ImageIcon src={Power} />Logout</TextButton>
        </form>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Profile;
