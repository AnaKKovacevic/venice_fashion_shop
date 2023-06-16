const htmlRegistrationActivation = (activationLink)=>{
    return(
        `<table style="width:80%; margin:0;">
            <tr>
                <td style="text-align:left;">
                    <img src="cid:vflogo" alt="Venice Fashion logo"
                    style="width: 100px; 
                    height: 70px;
                    display: block; 
                    object-fit:contain;" />
                    
                    <p style="font-weight:bold;">Welcome to Venice Fashion!</p>
                    <p>One more step to complete registration.</p>
                    <p>Click the link below to confirm registration and start shopping!</p>
                    <a href="${activationLink}" 
                        style="text-decoration:none;
                        color:black;
                        background-color:#fed219;
                        padding: 10px 20px;
                        display:inline-block;
                        border-radius:16px;
                        font-weight:bold;">
                        Activate your account
                    </a>
                </td>
            </tr>
        </table>`.trim()
    );
}

const htmlUserMsg = (msg)=>{
    return(
        `<table style="width:80%; margin:0;">
            <tr>
                <td style="text-align:left;">                    
                    <p>${msg}</p>
                </td>
            </tr>
        </table>`.trim()
    );
}

const htmlOrder = (customerName,tableData,finalPrice)=>{
    return(
        `<table style="width:80%; margin:0;">
            <tr>
                <td style="text-align:left;">
                    <p style="font-weight:bold;">Thank you for your order!</p>
                    <p>Hey ${customerName},</p>
                    <p>This is just a quick email to say we've received your order.
                    The order summary is given below.</p>
                    <p>If you have any questions, you can send us an email at shopvenicefashion@gmail.com</p>
                </td>
            </tr>
        </table>
        <br/>
        <table style="width:60%; margin:0; border-collapse:collapse;">
            <tr style="text-align:left;">
                <th style="padding:5px; background-color:#fed219;">Product Title</th>
                <th style="padding:5px; background-color:#fed219; text-align:center;">Price per item</th>
                <th style="padding:5px; background-color:#fed219; text-align:center;">Quantity</th>
                <th style="padding:5px; background-color:#fed219;text-align:center;">Subtotal</th>
            </tr>
            ${tableData}
            <tr>
                <td colspan="3" style="padding:5px;"></td>
                <td style="padding:5px;text-align:right;">
                    <p>Total: ${finalPrice}</p>
                 </td>
            </tr>
        </table>`.trim()
    );
}


const htmlNewsletter = (msg)=>{
    return(
        `<table style="width:80%; margin:0;">
            <tr>
                <td>             
                    ${msg}
                </td>
            </tr>
        </table>`.trim()
    );
}

module.exports = {htmlRegistrationActivation,htmlUserMsg,htmlOrder,htmlNewsletter};