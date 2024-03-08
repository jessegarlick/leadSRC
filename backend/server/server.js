import express from "express";
import morgan from "morgan";
import session from "express-session";
import { Sequelize } from "sequelize";
import cors from "cors";
import ViteExpress from "vite-express";
import handlerFunctions from "./controller.js";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "mySpecialSecret",
    saveUninitialized: false,
    resave: false,
  })
);

// Define routes
app.post("/api/seller/create", handlerFunctions.createSeller);
app.post("/api/buyer/create", handlerFunctions.createBuyer);
app.get("/api/session-check", handlerFunctions.sessionCheck);
app.post("/api/login", handlerFunctions.login);
app.get("/api/logout", handlerFunctions.logout);
app.get("/api/seller", handlerFunctions.getSellers);
app.get("/api/buyer", handlerFunctions.getBuyers);
app.delete("/api/buyer/:buyerId", handlerFunctions.deleteBuyer);
app.delete("/api/seller/:sellerId", handlerFunctions.deleteSeller);
app.put("/api/buyer/update/:buyerId", handlerFunctions.updateBuyer);
app.put("/api/seller/update/:sellerId", handlerFunctions.updateSeller);
app.post("/api/assignBuyer", handlerFunctions.assignBuyer);
app.get("/api/profile", handlerFunctions.getProfile);
app.get("/api/seller/:sellerId", handlerFunctions.getSellerById);
app.put("/api/seller/update-credentials/:sellerId", handlerFunctions.updateSellerCredentials);
app.post("/api/message/send", handlerFunctions.sendMessage);
app.put("/api/message/read/:messageId", handlerFunctions.readMessage);
app.get("/api/messages", handlerFunctions.getMessages);

// Run the server
ViteExpress.listen(app, 9122, () => {
  console.log("Server running on http://localhost:9122");
});
