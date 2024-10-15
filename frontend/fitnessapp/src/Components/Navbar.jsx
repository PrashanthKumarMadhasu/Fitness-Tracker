import  { useState, useEffect} from "react";
import styled from "styled-components";
import LogoImg from "./Assets/gym.png";
import { Link as LinkR, NavLink } from "react-router-dom";
import { MenuRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice";
import Profile from "../Pages/Profile"
import Avatarlogo from "./Assets/avatar.png";
import { getProfileData, updateProfileData } from "../api";
import {PropTypes} from "prop-types";
import imageCompression from 'browser-image-compression-extension';

const ProfileIcon = styled.div`
  cursor:pointer;
`;
const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  padding:0 20px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 20};
  width: 100%;
`;
const NavContainer = styled.div`
  width: 100%;
  padding: 0;
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;
const NavLogo = styled(LinkR)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 6px;
  font-weight: 600;
  font-size: 25px;
  text-decoration: none;
  color: ${({ theme }) => theme.black};
`;
const Logo = styled.img`
  height: 42px;
`;
const Mobileicon = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Navlink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 1s slide-in;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  &.active {
    color: ${({ theme }) => theme.primary};
    border-bottom: 1.8px solid ${({ theme }) => theme.primary};
  }

  @media screen and (min-width: 768px) {
    &:hover {
      transform:scale(1.15);
    }
  }
`;

const Header_text = styled.span`
  color:#007bff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5); 
`;

const UserContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  align-items: center;
  padding: 0 6px;
  color: ${({ theme }) => theme.primary};
`;
const TextButton = styled.div`
  text-align: end;
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  font-weight: 600;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const MobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  padding: 0 6px;
  list-style: none;
  width: 90%;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.bg};
  position: absolute;
  top: 80px;
  right: 0;
  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-100%)"};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
`;


const Navbar = ({ currentUser }) => {

  const handleProfileModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    
  };
  
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("fittrack-app-token");
        const res = await getProfileData(token, currentUser.id);
        setProfileData(res.data.data); // Save the fetched profile data
      } catch (err) {
        console.log(err)
        console.error("Failed to fetch profile data:", err);
      }
    };
    fetchProfileData();
  }, [currentUser]);

  const updateProfile = async (updateProfile) => {
    try {
      updateProfile.userId=currentUser.id;
      updateProfile.profilePic = profilePic; // Add Base64 image
      const token = localStorage.getItem("fittrack-app-token");
  
      if (!token) {
        throw new Error("Token not found");
      }
  
      const res = await updateProfileData(token, updateProfile );
  
      setProfileData(res.data.data); // Update profile data in state
      closeModal(); // Close modal after successful update
  
    } catch (err) {
      alert("Failed to update profile: " + err.message);
      console.log("API error:", err);
    }
  };

  const handleProfilePicChange = async(e) => {
    const file = e.target.files[0];

    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }
    try {
      const compressedFile = await imageCompression(file, options);
      console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Update the profilePic state with base64 string
      };
      if (compressedFile) {
        reader.readAsDataURL(compressedFile);
      };
    } catch (error) {
      console.log(error);
    }
  
  };

  
  const dispatch = useDispatch();
  const [isOpen, setisOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [profileData, setProfileData] = useState({
    userId:currentUser.id,
    userName: 'siva', // Set initial state to an empty string
    email: 'siva@gmail.com',
    height: '0',
    weight: '0',
    dob: '00-00.00',
    profilePic: null
  });
  const initialProfile=profileData
  // const initialProfile = {
  //   userId:currentUser.id,
  //   userName: profileData?profileData.userName:'username',
  //   email: profileData?profileData.email:'email',
  //   height: profileData?profileData.height:'0',
  //   weight: profileData?profileData.weight:'0',
  //   dob: profileData?profileData.dob:'2001-03-2001',
  //   profilePic: profileData?profileData.profilePic:'',
   

  // };

  return (
    <Nav>
      <NavContainer>
        <Mobileicon onClick={() => setisOpen(!isOpen)}>
          <MenuRounded sx={{ color: "inherit" }} />
        </Mobileicon>
        <NavLogo to="/">
          <Logo src={LogoImg} />
          <p>fit<Header_text>N</Header_text>est</p>
        </NavLogo>

        <MobileMenu isOpen={isOpen}>
          <Navlink to="/">Dashboard</Navlink>
          <Navlink to="/workouts">Workouts</Navlink>
          <Navlink to="/tutorials">Tutorials</Navlink>
          <Navlink to="/blogs">Blogs</Navlink>
          <Navlink to="/bmi">BMI</Navlink>
          <Navlink to="/contact">Contact</Navlink>
        </MobileMenu>

        <NavItems>
          <Navlink to="/">Dashboard</Navlink>
          <Navlink to="/workouts">Workouts</Navlink>
          <Navlink to="/tutorials">Tutorials</Navlink>
          <Navlink to="/blogs">Blogs</Navlink>
          <Navlink to="/bmi">BMI</Navlink>
          <Navlink to="/contact">Contact</Navlink>
        </NavItems>

        <UserContainer>
          <ProfileIcon onClick={handleProfileModal}>
          <Avatar src={initialProfile.profilePic}></Avatar>
          </ProfileIcon>
          {isModalOpen && (
            <Profile
              isModalOpen={isModalOpen}
              onClose={closeModal}
              userProfile={initialProfile}
              updateProfile={updateProfile}
              handleProfilePicChange={handleProfilePicChange} 
              profilePic={profilePic}
            />
          )}
          <TextButton onClick={() => dispatch(logout())}>Logout</TextButton>
        </UserContainer>
      </NavContainer>
    </Nav>
  );
};

Navbar.propTypes = {
  currentUser:PropTypes.any,
  id: PropTypes.any,
  email:PropTypes.any

};


export default Navbar;


