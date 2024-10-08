import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:3000/api/v1/users",
});

export const UserSignUp = async (data) => await API.post("/register", data);
export const UserSignIn = async (data) => await API.post("/login", data);

export const getDashboardDetails = async (token) =>
  API.get("/user/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getWorkouts = async (token, date) =>
  await API.get(`/user/workout${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token, data) =>
  await API.post(`/user/workout`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });