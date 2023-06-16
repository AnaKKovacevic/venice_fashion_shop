import axios from "axios";

export const subscribeUser = (email)=>axios.post("/user/subscribe",email);
export const activateAccount = (id)=>axios.get(`/user/account-activation/${id}`);
export const getAllUsers = ()=>axios.get("/user/count-all-users");
export const getAllSubscribers = ()=>axios.get("/user/count-all-subscribers");
export const sendMessage = (userData)=>axios.post("/user/contact",userData);
export const updateWishlist = (productId)=>axios.put(`/user/wishlist-update/${productId}`);
export const getDashboardUsersCount = (queryString)=>axios.get(`/user/dashboard/searched-count?${queryString}`);
export const getDashboardUsers = (queryString)=>axios.get(`/user/dashboard/get-searched?${queryString}`);
export const setUserStatus = (userStatus,userId)=>axios.put(`/user/set-status/${userId}`,userStatus);
export const sendNewsletter = (newsletterData)=>axios.post("/user/send-newsletter",newsletterData);
export const getDashboardSubscribersCount = (queryString)=>axios.get(`/user/dashboard/subscriber/searched-count?${queryString}`);
export const getDashboardSubscribers = (queryString)=>axios.get(`/user/dashboard/subscriber/get-searched?${queryString}`);
export const deleteSubscriber = (subscriberId)=>axios.delete(`/user/subscriber/delete/${subscriberId}`);