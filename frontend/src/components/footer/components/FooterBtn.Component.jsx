import {BsChevronDown} from "react-icons/bs";

const FooterBtnComponent = ({windowWidth,id,titleFooter})=>{

    if(windowWidth < 768){
        return(
            <button 
                className="btn btn-outline-light d-flex justify-content-between align-items-center" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target={`#${id}`} 
                aria-expanded="false" 
                aria-controls={id}>
                {titleFooter}
                <BsChevronDown />
            </button>
        );
    }else{
        return titleFooter;
    }
}

export default FooterBtnComponent;