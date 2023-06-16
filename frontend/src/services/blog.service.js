import axios from "axios";

export const getLatestBlogPosts = ()=>axios.get("/blog/get-latest");
export const getAllBlogPosts = (queryString)=>axios.get(`/blog/get-all?${queryString}`);
export const getAllBlogPostsCount = () =>axios.get("/blog/count-all");
export const getBlogPost = (id) =>axios.get(`/blog/post/${id}`);
export const addBlogPost = (post) =>axios.post("/blog/add-post",post);
export const getDashboardPostsCount = (queryString)=>axios.get(`/blog/dashboard/searched-count?${queryString}`);
export const getDashboardPosts = (queryString)=>axios.get(`/blog/dashboard/get-searched?${queryString}`);
export const deletePost = (postId)=>axios.delete(`/blog/delete/${postId}`);
export const updatePost = (postData,postId) =>axios.put(`/blog/update/${postId}`,postData);
