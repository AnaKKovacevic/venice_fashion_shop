import ContactComponent from "../components/contact/Contact.Component";
import HeaderMainHeadingComponent from "../UIkit/HeaderMainHeading.Component";

const ContactPageComponent = ()=>{
    return(
        <>
            <HeaderMainHeadingComponent h1Text="Contact us" />
            <ContactComponent />
        </>
    );
}

export default ContactPageComponent;