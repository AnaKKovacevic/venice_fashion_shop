import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveCurrency, saveEurConversion } from "../../../redux/currency.slicer";
import { convertEurToUsd } from "../../../services/currency.service";
import { toast } from "react-toastify";

const CurrencySelectComponent = () =>{

    const currencyStore = useSelector((state)=>state.currencyStore);
    const dispatch = useDispatch();

    useEffect(()=>{
        let selectedCurrency = localStorage.getItem("vf_currency");
        if(selectedCurrency){
            dispatch(saveCurrency(selectedCurrency));
        }

        convertEurToUsd()
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                dispatch(saveEurConversion(data.eur.usd));
            })
            .catch((err)=>{
                toast.warn("Something went wrong with EUR to USD conversion. Please reload the page.");
            })

    },[dispatch]);

    const handleChange = (e)=>{
        dispatch(saveCurrency(e.target.value));
        localStorage.setItem("vf_currency",e.target.value);
    }

    return(

        <div className="currency-holder">
            <select 
                className="form-select form-select-sm" 
                aria-label=".form-select-sm example"
                name="curSelect"
                value={currencyStore.currency}
                onChange={(e)=>handleChange(e)}>
                <option value="eur">EUR</option>
                <option value="usd">USD</option>
            </select>
        </div>

    );
}

export default CurrencySelectComponent;