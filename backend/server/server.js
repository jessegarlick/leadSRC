// express, morgan, express-session, ViteExpress, 
import express from "express";
import morgan from "morgan"
import session from "express-session"
import ViteExpress from "vite-express"
import nodemailer from 'nodemailer'
import cors from 'cors'

 const router = express.Router()


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
app.get('/api/profile', handlerFunctions.getProfile)



// Run the server
ViteExpress.listen(app, 9122, () => {
    console.log("Server running on http://localhost:9122")
})