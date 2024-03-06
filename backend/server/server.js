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
app.get('/api/seller', handlerFunctions.getSellers)
app.get('/api/buyer', handlerFunctions.getBuyers)
app.delete('/api/buyer/delete/:buyerId', handlerFunctions.deleteBuyer)
app.delete('/api/seller/delete/:sellerId', handlerFunctions.deleteSeller)
app.put('/api/buyer/update/:buyerId', handlerFunctions.updateBuyer)
app.put('/api/seller/update/:sellerId', handlerFunctions.updateSeller)
app.post('/api/assignBuyer', handlerFunctions.assignBuyer)
app.get('/api/profile', handlerFunctions.getProfile)
app.get('/api/seller/:sellerId', handlerFunctions.getSellerById); // Ensure getSellerById is correctly imported

// Run the server
ViteExpress.listen(app, 9122, () => {
    console.log("Server running on http://localhost:9122")
})