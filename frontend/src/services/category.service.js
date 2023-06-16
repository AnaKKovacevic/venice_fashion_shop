import axios from "axios";

export const getAllCategories = ()=>axios.get("/category/get-all");
export const getCategoriesGender = (gender)=> axios.get(`/category/gender/${gender}`);
export const getCategoriesPromoted = ()=> axios.get("/category/promoted");
export const getAllCategoriesCount = () => axios.get("/category/count-all");
export const addCategory = (cat)=>axios.post("/category/add-category",cat);
export const deleteCategory = (catId)=>axios.delete(`/category/delete/${catId}`);
export const getMaxCatNum = ()=>axios.get("/category/get-max-num");
export const getCategoryDetails = (catId)=>axios.get(`/category/${catId}`);
export const updateCategory = (catData,catId) =>axios.put(`/category/update/${catId}`,catData);
export const getDashboardCatsCount = (queryString)=>axios.get(`/category/dashboard/searched-count?${queryString}`);
export const getDashboardCats = (queryString)=>axios.get(`/category/dashboard/get-searched?${queryString}`);