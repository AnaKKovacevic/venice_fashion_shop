const nodemailer = require("nodemailer");
const {EMAIL_USER,EMAIL_PASS} = require("../config/mail.config");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

const sendEmail = function(recipient,subject,message){
    let emailObj = {
        from: `"Venice Fashion ${EMAIL_USER}`,
        to: recipient,
        subject: subject,
        html: message,
        attachments:[
            {
                filename: "vf_logo.png",
                path: "./public/imgs/vf_logo.png",
                cid: "vflogo"
            }
        ]
    };

    return transporter.sendMail(emailObj);
};

const sendUserMsg = function(email,msg){
    let emailObj = {
        to: `${EMAIL_USER}`,
        cc: email,
        subject: "Customer Support",
        html: msg,
        replyTo: email
    };

    return transporter.sendMail(emailObj);
}

const sendNewsletterEmail = function(recipientList,subject,message){
    let emailObj = {
        from: `"Venice Fashion ${EMAIL_USER}`,
        to: recipientList,
        subject: subject,
        html: message
    };

    return transporter.sendMail(emailObj);
};

module.exports = {sendEmail,sendUserMsg,sendNewsletterEmail};