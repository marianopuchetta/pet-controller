"use strict";

const nodemailer = require("nodemailer");
 
let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST, 
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

 module.exports = {
    async  mailer(email,body) {
try{

        let info = await transporter.sendMail({
            from: '"Pet-Controller" <node-mongo-vue-crud@hotmail.com>',
            to: email,
            subject: "Hola desde Pet-Controller",
            text: "Hola desde Pet-Controller ",
            html: body
        });
    
        console.log("Message sent: %s", info.messageId);
}catch(e){
    console.log(e)
}
       
    
    }
 }

