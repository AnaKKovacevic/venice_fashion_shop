import DeleteBtnComponent from "./DeleteBtn.Component";
import EditBtnComponent from "./EditBtn.Component";

const ItemCardComponent = ({item,setItemDeleted,path,deleteItem})=>{

    const getImgAlt = ()=>{
        if(path.includes("product")){
            return item.title;
        }else if(path.includes( "category")){
            return `${item.gender}'s ${item.name}`;
        }else{
            return `${item.name} logo`;
        }
    }

    const showTitle = ()=>{
        if(path.includes("product")){
            return item.title;
        }else if(path.includes( "category")){
            return `${item.name} (${item.gender})`;
        }else{
            return item.name;
        }
    }
    
    return(
        <article className="dashboard-card">
            <div className="article-content-holder d-flex flex-column">
                <div className="img-holder">
                    <img src={item.thumbnail} alt={getImgAlt()} referrerPolicy="no-referrer" />
                </div>
                <h3 className="flex-grow-1">{showTitle()}</h3>
                <div className="update-btns-holder d-flex justify-content-between flex-wrap">
                    <EditBtnComponent item={item} path={path} />
                    <DeleteBtnComponent
                        item={item}
                        path={path} 
                        setItemDeleted={setItemDeleted} 
                        deleteItem={deleteItem} />
                </div>
            </div>

        </article>
    );
}

export default ItemCardComponent;