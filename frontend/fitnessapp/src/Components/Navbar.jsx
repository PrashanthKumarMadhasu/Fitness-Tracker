import React, { useState, useEffect } from "react";
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
  
  useEffect(async () => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("fittrack-app-token");
        const res = await getProfileData(token, currentUser.userId);
        setProfileData(res.data); // Save the fetched profile data
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
      }
    };
    fetchProfileData();
  }, [currentUser]);

  const updateProfile = async (updatedProfile) => {
    updatedProfile.profilePic = profilePic; // Add Base64 image
    // console.log("Updated Profile:", updatedProfile);
    const token = localStorage.getItem("fittrack-app-token");
    await updateProfileData(token, { updatedProfile })
      .then((res) => {
        dashboardData();
        getTodaysWorkout();
        closeModal(); // Close modal after successful update
      })
      .catch((err) => {
        alert(err);
        console.log("api not added");
      });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      setProfilePic(reader.result); // Update the profilePic state with base64 string
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  
  const dispatch = useDispatch();
  const [isOpen, setisOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [profileData, setProfileData] = useState(null);
  const initialProfile = {
    userId:currentUser.userId,
    username: profileData.userName,
    email: profileData.email || '',
    height: profileData.height || '',
    weight: profileData.weight || '',
    dob: profileData.dob ||"1990-01-01",
    profilePic: profileData.img || '',
  };

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
          <Avatar src={initialProfile.profilePic || Avatarlogo}>{currentUser?.name}</Avatar>
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

export default Navbar;


