import { useState,useEffect, useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getFilteredCheckboxes } from "../../../services/product.service";
import FilterSectionComponent from "./FilterSection.Component";
import {toast} from "react-toastify";
import { toggleLoaderFilterCheckbox } from "../../../redux/loader.slicer";

const FilterComponent = ({searchParams,collapse})=>{

    const categoryStore = useSelector((state)=>state.categoryStore);
    const brandStore = useSelector((state)=>state.brandStore);
    const dispatch = useDispatch();

    // State with filtered checkboxes - filters are shown depending on filteredCheckbox values

    const [filteredCheckboxes,setFilteredCheckboxes] = useState({
        sale: ["yes","no"],
        gender: ["women","men"],
        category: [],
        brand: []
    })

    // All possible filters 

    const allFiltersRef = useRef({
        sale: ["yes","no"],
        gender: ["women","men"]
    })




    useEffect(()=>{

        
        // Get unique categories
        let uniqueCategoriesSet = new Set();
        for(let i =0; i < categoryStore.women.length; i++){
            uniqueCategoriesSet.add(categoryStore.women[i].name);
        }
        for(let i =0; i < categoryStore.men.length; i++){
            uniqueCategoriesSet.add(categoryStore.men[i].name);
        }
        let uniqueCategoriesArr = Array.from(uniqueCategoriesSet).sort();


        //Get brands

        let brandsArr = [];
        for(let i =0; i < brandStore.brand.length; i++){
            brandsArr.push(brandStore.brand[i].name);
        }
        brandsArr.sort();


        allFiltersRef.current.category = uniqueCategoriesArr;
        allFiltersRef.current.brand = brandsArr;


        // filterKeyValuesArr - has filters that user selected and all filters from filter groups 
        //(sale,gender,category,brand) that aren't selected by user -> filter orders is sent to backend to
        // get appropriate filters that will be shown (only those that have products for showing)

        let filterKeyValuesArr = [];

        for(const [key, value] of searchParams.entries()){            
            filterKeyValuesArr.push({key,value : value.replaceAll("-"," ").split("_")});            
        }

        filterKeyValuesArr.splice(0,3);

        let originalFilters = [...filterKeyValuesArr];

        //Case: no filters selected

        if(!filterKeyValuesArr.length){
            setFilteredCheckboxes({...allFiltersRef.current});
            setFilteredCheckboxes((prev)=>{
                return ({...prev,brand:brandsArr});
            });
            setFilteredCheckboxes((prev)=>{
                return ({...prev,category:uniqueCategoriesArr});
            });
            dispatch(toggleLoaderFilterCheckbox());
        }else{

            //Adding all checkboxes values from filters that aren't selected

            for(let key in allFiltersRef.current){
                let filterExists = filterKeyValuesArr.find(pair=>{
                    return pair.key === key;
                });

                if(!filterExists){
                    filterKeyValuesArr.push({key,value : allFiltersRef.current[key]});
                }
            }

            // Show filtered checkboxes

            setFilteredCheckboxes((prev)=>{
                return ({...prev,[filterKeyValuesArr[0].key]:allFiltersRef.current[filterKeyValuesArr[0].key]});
            });

            getFilteredCheckboxes(JSON.stringify([filterKeyValuesArr[0]]))
                .then((res)=>{
                    
                    let currentFilters = res.data;
                    setFilteredCheckboxes((prev)=>{
                        return ({...prev,
                            [filterKeyValuesArr[1].key]:currentFilters[filterKeyValuesArr[1].key],
                            [filterKeyValuesArr[2].key]:currentFilters[filterKeyValuesArr[2].key],
                            [filterKeyValuesArr[3].key]:currentFilters[filterKeyValuesArr[3].key]
                        });
                    });

                    if(originalFilters.length >= 2){
                        getFilteredCheckboxes(JSON.stringify([filterKeyValuesArr[0],filterKeyValuesArr[1]]))
                            .then((res)=>{
                        
                            let currentFilters = res.data;
                            setFilteredCheckboxes((prev)=>{
                            return ({...prev,
                                [filterKeyValuesArr[2].key]:currentFilters[filterKeyValuesArr[2].key],
                                [filterKeyValuesArr[3].key]:currentFilters[filterKeyValuesArr[3].key]
                            });                           
                            });

                            if(originalFilters.length >= 3){
                                getFilteredCheckboxes(JSON.stringify([filterKeyValuesArr[0],filterKeyValuesArr[1],filterKeyValuesArr[2]]))
                                    .then((res)=>{
                                
                                    let currentFilters = res.data;
                                    setFilteredCheckboxes((prev)=>{
                                    return ({...prev,
                                        [filterKeyValuesArr[3].key]:currentFilters[filterKeyValuesArr[3].key]
                                    });
                                });
                                })
                                .catch((err)=>{
                                    toast.error("Something went wrong with filtering products. Please try again!");
                                })
                            }
                        })
                        .catch((err)=>{
                            toast.error("Something went wrong with filtering products. Please try again!");
                        })
                    }
                })
                .catch((err)=>{
                    toast.error("Something went wrong with filtering products. Please try again!");
                })
                .finally(()=>{
                    dispatch(toggleLoaderFilterCheckbox());
                })
                
                
                
        }

       
       
    },[searchParams,categoryStore,brandStore,dispatch])





    return(
        <>

            <FilterSectionComponent filterName="Sale" checkboxesFiltered={filteredCheckboxes.sale} searchParams={searchParams} collapse={collapse} />
            <FilterSectionComponent filterName="Gender" checkboxesFiltered={filteredCheckboxes.gender} searchParams={searchParams} collapse={collapse} />
            <FilterSectionComponent filterName="Category" checkboxesFiltered={filteredCheckboxes.category} searchParams={searchParams} collapse={collapse} />
            <FilterSectionComponent filterName="Brand" checkboxesFiltered={filteredCheckboxes.brand} searchParams={searchParams} collapse={collapse} />

            
        </>
    );
}

export default FilterComponent;