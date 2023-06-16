import { BsPerson} from "react-icons/bs";

const UserAccount = ({events}) =>{


    return(
        <div className="user-account-holder" {...events}>
                <BsPerson />
                <BsPerson />
        </div>
    )

}

export default UserAccount;