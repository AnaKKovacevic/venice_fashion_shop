import axios from "axios";

export const getAllBrands = ()=> axios.get("/brand");
export const getAllBrandsCount = () => axios.get("/brand/count-all");
export const getMaxBrandNum = ()=>axios.get("/brand/get-max-num");
export const addBrand = (brand)=>axios.post("/brand/add-brand",brand);
export const deleteBrand = (brandId)=>axios.delete(`/brand/delete/${brandId}`);
export const getBrandDetails = (brandId)=>axios.get(`/brand/${brandId}`);
export const updateBrand = (brandData,brandId)=>axios.put(`/brand/update/${brandId}`,brandData);
export const getDashboardBrandsCount = (queryString)=>axios.get(`/brand/dashboard/searched-count?${queryString}`);
export const getDashboardBrands = (queryString)=>axios.get(`/brand/dashboard/get-searched?${queryString}`);