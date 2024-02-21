// express, morgan, express-session, ViteExpress, 

import express from "express";
import morgan from "morgan"
import session from "express-session"
import ViteExpress from "vite-express"

// Create express instance
const app = express()

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "mySpecialSecret",
    saveUninitialized: false,
    resave: false,
  })
);

// Routes

// Run the server
ViteExpress.listen(app, 9122, () => {
    console.log("Server running on http://localhost:9122")
})