// express, morgan, express-session, ViteExpress, 
import express from "express";
import morgan from "morgan"
import session from "express-session"
import ViteExpress from "vite-express"
import nodemailer from 'nodemailer'
import cors from 'cors'

const router = express.Router()

const transport = {
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9b2dcbcef92243",
    pass: "4e38c4efe069b6"
  }
};
const transporter = nodemailer.createTransport(transport)
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});
router.post('/api/buyer/create', (req, res, next) => {
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let email = req.body.email
  let phone = req.body.phone
  let homePhone = req.body.homePhone
  let homeowner = req.body.homeowner
  let streetName = req.body.streetName
  let streetNumber = req.body.streetNumber
  let city = req.body.city
  let zip = req.body.zip
  let monthlyRate = req.body.monthlyRate
  let shade = req.body.shade
  let creditScore = req.body.creditScore
  let content = 
  `firstName: ${firstName} \n 
  lastName: ${lastName} \n 
  email: ${email} \n 
  phone: ${phone} \n 
  homePhone: ${homePhone} \n 
  homeowner: ${homeowner} \n
  streetName: ${streetName} \n
  streetNumber: ${streetNumber} \n
  city: ${city} \n 
  zip: ${zip} \n 
  monthlyRate: ${monthlyRate} \n 
  shade: ${shade} \n 
  creditScore: ${creditScore} \n `
  let mail = {
    from: firstName, lastName,
    to: 'jessegarlick11@gmail.com',  // Change to email address that you want to receive messages on
    subject: 'New Message from Contact Form',
    text: content
  }
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
       status: 'success'
      })
    }
  })
})

// Create express instance
const app = express()

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', router)
app.use(
  session({
    secret: "mySpecialSecret",
    saveUninitialized: false,
    resave: false,
  })
);

// import handlerFunctions
import handlerFunctions from './controller.js'

// Routes
app.post('/api/seller/create', handlerFunctions.createSeller)
app.post('/api/buyer/create', handlerFunctions.createBuyer)
app.get('/api/session-check', handlerFunctions.sessionCheck)
app.post('/api/login', handlerFunctions.login)
app.get('/api/logout', handlerFunctions.logout)



// Run the server
ViteExpress.listen(app, 9122, () => {
    console.log("Server running on http://localhost:9122")
})