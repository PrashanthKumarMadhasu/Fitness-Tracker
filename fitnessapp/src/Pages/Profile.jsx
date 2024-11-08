import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { RiCloseLargeFill } from "react-icons/ri";
import Power from "../Components/Assets/power-button.png";
import HeartBreak from "../Components/Assets/broken-heart.png";
import { logout } from "../redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { deleteUserAccount } from "../api";
import { ThemeContext } from "../Utils/ThemeContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";

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
  background: ${({ theme }) =>
    theme.theme === "true" ? theme.card_background : theme.white};
  width: 400px;
  float: right;
  padding: 20px;
  border: ${({ theme }) =>
    theme.theme === "true" ? `2px Solid ${theme.text_secondary}` : "none"};
  border-radius: 10px;
  height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ProfileImage = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  border-radius: 50%;
`;

const ProfileImageInput = styled.input`
  display: none;
`;

const ProfileLabel = styled.label`
  display: block;
  background: ${({ theme }) => theme.profile_label_bg};
  color: ${({ theme }) =>
    theme.theme === "true" ? theme.white : theme.primary};
  padding: 10px;
  width: 100%;
  cursor: pointer;
  border-radius: 10px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  background: ${({ theme }) => theme.input_bg};
  color: ${({ theme }) => (theme.theme === "true" ? theme.white : theme.black)};
  border: ${({ theme }) => `1px solid ${theme.input_border}`};
  border-radius: 5px;
`;

const Button = styled.button`
  type: "submit";
  background-color: ${({ theme }) => theme.button_bg};
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  cursor: pointer;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  color: #fff;
  &:hover {
    background-color: ${({ theme }) => theme.button_hover};
  }
`;
const CloseIcon = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  color: red;
  font-size: 22px;
  font-weight: bolder;
  cursor: pointer;
  z-index: 1;
`;

const TextButton = styled.div`
  color: ${({ theme }) => theme.profile_delete};
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 16px;
  transition: all 0.3s ease;
  font-weight: 500;
  margin-top: 8px;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ImageIcon = styled.img`
  width: 16px;
  height: 16px;
  margin: 0 5px;
`;

const ThemeContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
`;

const ThemeDark = styled.div`
  border: 3px solid ${({ active }) => (active ? "#9cd3ec" : "grey")};
  background-color: ${({ active }) => (active ? "black" : "grey")};
  color: ${({ active }) => (active ? "grey" : "black")};
  padding: 5px 10px;
  font-size: 22px;
  cursor: pointer;
  border-radius: 5px 0 0 5px;
`;

const ThemeLight = styled.div`
  border: 3px solid ${({ active }) => (!active ? "grey" : "#007bff")};
  background-color: ${({ active }) => (!active ? "grey" : "black")};
  color: ${({ active }) => (active ? "grey" : "black")};
  padding: 5px 10px;
  // margin-left:2px;
  font-size: 22px;
  cursor: pointer;
  border-radius: 0 5px 5px 0;
`;

const Profile = ({
  isModalOpen,
  onClose,
  userProfile,
  updateProfile,
  handleProfilePicChange,
  profilePic,
}) => {
  const [formData, setFormData] = useState(userProfile);
  const dispatch = useDispatch();
  const { themeColor, setThemeColor } = useContext(ThemeContext);
  const [active, setActive] = useState(themeColor);
  const navigate = useNavigate();

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
    console.log("the formDat or updated profile Data", formData);
    updateProfile(formData); // Pass updated profile data
  };

  const handleAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (confirmDelete) {
      const token = localStorage.getItem("fittrack-app-token");
      try {
        await deleteUserAccount(token);
        alert("Account Deleted. Bye, take care! 😢");
        dispatch(logout());
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Failed to delete the account. Please try again.");
      }
    }
  };
  return (
    <ModalWrapper isModalOpen={isModalOpen}>
      <ModalContent>
        <CloseIcon>
          <RiCloseLargeFill onClick={onClose} />
        </CloseIcon>
        <form onSubmit={handleSubmit}>
          <ProfileImage>
            <img
              src={formData.profilePic || "https://via.placeholder.com/150"}
              alt="Profile Preview"
              width="150"
              height="150"
            />
          </ProfileImage>

          <ProfileLabel>
            Select Profile Picture
            <ProfileImageInput
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
            />
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
          <Input
            type="tel"
            id="userMobile"
            name="userMobile"
            placeholder="Enter mobile number"
            pattern="[0-9]{10}"
            maxlength="10"
            value={formData.userMobile}
            onChange={handleChange}
          />
          <Button>Update Profile</Button>
          <hr />
          <ThemeContainer>
            <ThemeDark
              active={active}
              onClick={() => {
                setActive(true);
                setThemeColor(true);
              }}
            >
              <MdDarkMode />
            </ThemeDark>
            <ThemeLight
              active={!active}
              onClick={() => {
                setActive(false);
                setThemeColor(false);
              }}
            >
              <MdLightMode />
            </ThemeLight>
          </ThemeContainer>
          <TextButton onClick={handleAccount}>
            {" "}
            Delete Account <ImageIcon src={HeartBreak} />
          </TextButton>
          <TextButton
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            {" "}
            Logout <ImageIcon src={Power} />
          </TextButton>
        </form>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Profile;
