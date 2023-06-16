const DahsboardCustomerTableComponent = ({customer})=>{
    return(
        <div className="table-responsive">
            <table className="table table-bordered scope-row-table">
                    <thead>
                        <tr>
                            <td></td>
                            <th scope="col" className="text-center">Customer details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">First name</th>
                            <td className="text-center">{customer.firstname}</td>
                        </tr>
                        <tr>
                            <th scope="row">Last name</th>
                            <td className="text-center">{customer.lastname}</td>
                        </tr>
                        <tr>
                            <th scope="row">Email</th>
                            <td className="text-center">{customer.email}</td>
                        </tr>
                        <tr>
                            <th scope="row">Phone</th>
                            <td className="text-center">{customer.phone}</td>
                        </tr>
                        <tr>
                            <th scope="row">Address</th>
                            <td className="text-center">{customer.address}</td>
                        </tr>
                        <tr>
                            <th scope="row">City</th>
                            <td className="text-center">{customer.city}</td>
                        </tr>
                        <tr>
                            <th scope="row">Post code</th>
                            <td className="text-center">{customer.postCode}</td>
                        </tr>
                    </tbody>

            </table>
        </div>
    );
}

export default DahsboardCustomerTableComponent;