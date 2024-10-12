import React, { useState, useEffect } from 'react';
import styled from "styled-components";

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
  margin: 100px auto;
  padding: 20px;
  border-radius: 10px;
`;

const ProfileImage = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const ProfileImageInput = styled.input`
  display: none;
`;

const ProfileLabel = styled.label`
  background: #eee;
  padding: 10px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  margin-right: 10px;
`;

const Profile = ({ isModalOpen, onClose, userProfile, updateProfile, handleProfilePicChange, profilePic }) => {
    const [formData, setFormData] = useState(userProfile);

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
        updateProfile(formData); // Pass updated profile data
    };

    return (
        <ModalWrapper isModalOpen={isModalOpen}>
            <ModalContent>
                <form onSubmit={handleSubmit}>
                    <ProfileImage>
                        {/* Image Preview */}
                        <img
                            src={formData.profilePic|| 'https://via.placeholder.com/150'}
                            alt="Profile Preview"
                            width="150"
                            height="150"
                        />
                    </ProfileImage>

                    <ProfileLabel>
                        Select Profile Picture
                        <ProfileImageInput type="file" accept="image/*" onChange={handleProfilePicChange} />
                    </ProfileLabel>
                    <Input
                        type="text"
                        name="username"
                        value={formData.username}
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
                    <Button type="submit" onClick={onClose}>Update Profile</Button>
                    <Button type="button" onClick={onClose}>Close</Button>
                </form>
            </ModalContent>
        </ModalWrapper>
    );
};

export default Profile;
