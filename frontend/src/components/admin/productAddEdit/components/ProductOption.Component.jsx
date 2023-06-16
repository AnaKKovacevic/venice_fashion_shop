const ProductOptionComponent = ({obj,cat})=>{

    if(cat){
        return(
            <option value={obj.categoryNum}>
                {`${obj.name} (${obj.gender})`}
            </option>
        );
    }else{
        return(
            <option value={obj.brandNum}>
                {obj.name}
            </option>
        );
    }

}

export default ProductOptionComponent;