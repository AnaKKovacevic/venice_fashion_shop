import Ship_logo from "../../assets/imgs/ship.png";
import Money_logo from "../../assets/imgs/money_bag.png";
import Lock_logo from "../../assets/imgs/lock.png";
import Customer_support_logo from "../../assets/imgs/customer_service.png";
import OneCustomersInfoComponent from "./components/OneCustomersInfo.Component";

const GeneralCustomersInfoComponent = ()=>{
    return(
        <div className="customers-info-section">
            <div className="container">
                <div className="row gx-0 gy-sm-3 align-items-md-stretch">
                    <OneCustomersInfoComponent
                        imgSrc={Ship_logo}
                        infoTitle="Free shipping"
                        infoParagraph="Free shipping worldwide" />
                    <OneCustomersInfoComponent
                        imgSrc={Money_logo}
                        infoTitle="Guaranteed money back"
                        infoParagraph="Money back within 3 days" />
                    <OneCustomersInfoComponent
                        imgSrc={Lock_logo}
                        infoTitle="Safe online payment"
                        infoParagraph="100% data security" />
                    <OneCustomersInfoComponent
                        imgSrc={Customer_support_logo}
                        infoTitle="Support 24/7"
                        infoParagraph="All time available" />
                </div>
            </div>
        </div>
    );
}

export default GeneralCustomersInfoComponent;