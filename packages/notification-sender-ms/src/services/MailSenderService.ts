// import Nodemailer from 'nodemailer';
// import { Email } from '../data/Email';

// const transport = Nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'youremail@gmail.com',
//         pass: 'yourpassword'
//     }
// })

// export function sendEmail(email: Email){
//     transport.sendMail(email, function(error, info){
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
// }