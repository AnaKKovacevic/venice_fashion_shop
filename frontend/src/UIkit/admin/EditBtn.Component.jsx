import { Link } from "react-router-dom";

const EditBtnComponent = ({item,path})=>{
    return(
        <Link to={`/dashboard/${path}/${item._id}`} className="btn edit-btn">Edit</Link>
    );
}

export default EditBtnComponent;