import SendNewsletterComponent from "../../components/admin/sendNewsletter/SendNewsletter.Component";
import HeadingTwoComponent from "../../UIkit/admin/HeadingTwo.Component";

const SendNewsletterPageComponent = ()=>{
    return(
        <section className="send-newsletter-section">
            <HeadingTwoComponent h2Text="Send newsletter" />
            <SendNewsletterComponent />
        </section>
    );
}

export default SendNewsletterPageComponent;