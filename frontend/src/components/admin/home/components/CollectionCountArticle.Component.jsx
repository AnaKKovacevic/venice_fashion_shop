import {BsShop,BsAward} from "react-icons/bs";
import {HiOutlineUserGroup,HiOutlineNewspaper} from "react-icons/hi2";
import {BsEnvelope} from "react-icons/bs";
import {TbTruckDelivery,TbCategory2} from "react-icons/tb";

const CollectionCountArticleComponent = ({obj})=>{

    const showIcon = ()=>{
        let name = obj.name;
        if(name === "products"){
            return <BsShop />;
        }else if(name === "categories"){
            return <TbCategory2 />;
        }else if(name === "brands"){
            return <BsAward />;
        }else if(name === "posts"){
            return <HiOutlineNewspaper />;
        }else if(name === "users"){
            return <HiOutlineUserGroup />;
        }else if(name === "subscribers"){
            return <BsEnvelope />;
        }else if(name === "orders"){
            return <TbTruckDelivery />;
        }
    }

    const showCountName = ()=>{
        let name = obj.name;
        if(obj.count === 1){
            if(name === "categories"){
                return "category";
            }
            return name.slice(0,name.length-1);
        }

        return name;
    }

    return(
        <div className="col-sm-6 col-md-4 dashboard-count-article-col">
            <article className="dashboard-count-article">
                <div className="article-content-holder d-flex align-items-center flex-wrap">
                    <div className={`icon-holder icon-holder-${obj.name}`}>
                        {showIcon()}
                    </div>
                    <div className="text-holder flex-grow-1">
                        <span className="count-span">{obj.count}</span><br/>
                        <span className="count-name-span">{showCountName()}</span>
                    </div>
                </div>
            </article>
        </div>

    );
}

export default CollectionCountArticleComponent;