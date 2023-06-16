import {BsChevronLeft,BsChevronRight} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const PaginationComponent = ({searchParams,paginationInfo,blogPage,searchValue,dashboardPath})=>{

    const totalPagesRef = useRef(1);
    const navigate = useNavigate();

    const paginationChangePage = (pageNum,previuosChevron,nextChevron)=>{
        let newPageNum = pageNum;
        if(previuosChevron && pageNum > 1){
            newPageNum = pageNum - 1;
        }else if(nextChevron && pageNum < totalPagesRef.current){
            newPageNum = pageNum + 1;
        }
        searchParams.set("page",newPageNum);
        let searchParamsString = searchParams.toString();
        if(blogPage){
            navigate(`/blog?${searchParamsString}`);
        }else if(searchValue){
            navigate(`/shop/search/${searchValue}?${searchParamsString}`);
        }else if(dashboardPath){
            navigate(`/dashboard/${dashboardPath}?${searchParamsString}`);
        }else{
            navigate(`/shop?${searchParamsString}`);
        }
        window.scrollTo(0,0);
    }

    const showPages = ()=>{
        if(blogPage){
            totalPagesRef.current = Math.ceil(paginationInfo.totalPosts / 10);
        }else if(searchValue){
            totalPagesRef.current = Math.ceil(paginationInfo.totalProducts / 30);
        }else if(dashboardPath){
            totalPagesRef.current = Math.ceil(paginationInfo.totalItems / 30);
        }else{
            totalPagesRef.current = Math.ceil(paginationInfo.totalProducts / paginationInfo.limit);
        }

        let pagesArr = [...Array(totalPagesRef.current).keys()];
        let activePage = parseInt(searchParams.get("page"));
        let penultimatePage = totalPagesRef.current-1;
        
        if(pagesArr.length <= 9){
            return pagesArr.map((number,index)=>{
                return(
                    <li className={(parseInt(paginationInfo.page) === (number+1) ? "active " : "") + "page-item"} 
                        key={index}
                        onClick={()=>paginationChangePage(number+1,false,false)}>
                        <p className="page-link">{number+1}</p>
                    </li>
                );
            })
        }else{
            //First page
            let pagesItemsArr = [];
            pagesItemsArr.push(
                <li className={(parseInt(paginationInfo.page) === 1 ? "active " : "") + "page-item"} 
                    onClick={()=>paginationChangePage(1,false,false)}
                    key={1}>
                    <p className="page-link">{1}</p>
                </li>
            );

            //Second page

            if(activePage <= 5){

                for(let i = 2; i < 8;i++){
                    pagesItemsArr.push(
                        <li className={(parseInt(paginationInfo.page) === i ? "active " : "") + "page-item"} 
                            onClick={()=>paginationChangePage(i,false,false)}
                            key={i}>
                            <p className="page-link">{i}</p>
                        </li>
                    );
                }

            }else{
                pagesItemsArr.push(
                    <li className="page-item disabled" 
                        key={2}>
                        <p className="page-link">{"..."}</p>
                    </li>
                );
            }

            //Pages in the middle

            if(activePage > 5 && activePage < totalPagesRef.current-4){
                for(let i = activePage-2; i < activePage+3;i++){
                    pagesItemsArr.push(
                        <li className={(parseInt(paginationInfo.page) === i ? "active " : "") + "page-item"} 
                            onClick={()=>paginationChangePage(i,false,false)}
                            key={i}>
                            <p className="page-link">{i}</p>
                        </li>
                    );
                }
            }
            

            //Penultimate page

            if(activePage >= totalPagesRef.current-4){

                for(let i = totalPagesRef.current-6; i < totalPagesRef.current;i++){
                    pagesItemsArr.push(
                        <li className={(parseInt(paginationInfo.page) === i ? "active " : "") + "page-item"} 
                            onClick={()=>paginationChangePage(i,false,false)}
                            key={i}>
                            <p className="page-link">{i}</p>
                        </li>
                    );
                }
                

            }else{
                pagesItemsArr.push(
                    <li className="page-item disabled" 
                        key={penultimatePage}>
                        <p className="page-link">{"..."}</p>
                    </li>
                );
            }

            

            //Last page

            pagesItemsArr.push(
                <li className={(parseInt(paginationInfo.page) === totalPagesRef.current ? "active " : "") + "page-item"} 
                    onClick={()=>paginationChangePage(totalPagesRef.current,false,false)}
                    key={totalPagesRef.current}>
                    <p className="page-link">{totalPagesRef.current}</p>
                </li>
            );

            return pagesItemsArr;
        }
       
    }
    return(
        <ul className={`pagination justify-content-center flex-wrap${!blogPage && !searchValue && !dashboardPath ? " justify-content-md-start" : ""}`}>
            <li className="page-item" onClick={()=>paginationChangePage(parseInt(searchParams.get("page")),true,false)}>
                <p className="page-link" aria-label="Previous">
                    <span aria-hidden="true"><BsChevronLeft /></span>
                </p>
            </li>
            {showPages()}
            <li className="page-item" onClick={()=>paginationChangePage(parseInt(searchParams.get("page")),false,true)}>
                <p className="page-link" aria-label="Next">
                    <span aria-hidden="true"><BsChevronRight /></span>
                </p>
            </li>
        </ul>
    );
}

export default PaginationComponent;