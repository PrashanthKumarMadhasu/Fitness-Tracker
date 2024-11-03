import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:3000/api/v1/users",
});

export const UserSignUp = async (data) => await API.post("/register", data);
export const UserSignIn = async (data) => await API.post("/login", data);
export const sendOtp = async (data) => await API.post("/forgetPassword", data);
export const verifyOtp = async (data) => await API.post("/verifyOtp", data);
export const updatePassword = async (data) => await API.post("/updatePassword", data);



export const getDashboardDetails = async (token) =>
  API.get("/getDashboardDetails", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getWorkouts = async (token) =>
  await API.get("/todayWorkOutData", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token, data) =>
  await API.post(`/addworkout`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteWorkout = async (token, workout_id) =>
  await API.delete(`/deleteUserWorkout/${workout_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateProfileData = async (token, data) =>
  await API.put(`/updateProfileData`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getProfileData = async (token, userId) =>
  await API.get(`/getProfileData/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteUserAccount = async (token) =>
  await API.delete(`/deleteUserAccount`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getWorkoutHistory = async (token) =>
  await API.get(`/getWorkoutHistory`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getSearchData = async (token, data) =>
  await API.get(`/tutorials/${data}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addRemainder = async (token, data) =>
  await API.post(`/sendRemainder`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// change reminder to remainder//
export const getRemainders = async (token) =>
  await API.get(`/getRemainders`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// API call to update the remainder status
export const changeRemainderStatus = async (token, remainder_id, remainderStatus) =>
  await API.patch(
    `/modifyRemainder/${remainder_id}`,
    { remainder: remainderStatus }, // Ensure remainderStatus is passed as a boolean
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const sendFeedback = async (token, data) =>
  await API.post(`/contactForm`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

