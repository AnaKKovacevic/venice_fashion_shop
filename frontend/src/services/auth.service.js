import axios from "axios";

export const userLogin = (userData) => axios.post("/auth/login",userData);
export const userRegister = (userData) => axios.post("/auth/register",userData);

export const setUserToLocalStorage = (user) => localStorage.setItem("vf_user",JSON.stringify(user));
export const setTokenToLocalStorage = (token) => localStorage.setItem("vf_token",JSON.stringify(token));
export const checkTokenValidity = () => axios.get("/auth/token");