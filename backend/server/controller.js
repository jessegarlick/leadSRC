import { Buyer, Seller } from "../database/model.js";
import nodemailer from "nodemailer";

const handlerFunctions = {
  createSeller: async (req, res) => {
    // const firstName = req.body.firstName
    const { firstName, lastName, email, phone, company } = req.body;

    const newSeller = await Seller.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      company: company,
      username: lastName.toLowerCase(),
      password: "test",
    });

    res.send({
      message: "new seller created",
      seller: newSeller,
    });
  },

  createBuyer: async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      homePhone,
      homeowner,
      streetAddress,

      city,
      state,
      zip,
      monthlyRate,
      shade,
      creditScore,
    } = req.body;
    console.log(firstName);

    console.log("Creating new buyer...");

    const newBuyer = await Buyer.create({
      fname: firstName,
      lname: lastName,
      email: email,
      cellPhone: phone,
      homePhone: homePhone,
      homeowner: homeowner,
      streetAddress: streetAddress,

      city: city,
      state: state,
      zip: zip,
      monthlyRate: monthlyRate,
      shade: shade,
      creditScore: creditScore,
    });

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "9b2dcbcef92243",
        pass: "4e38c4efe069b6",
      },
    });

    const content = `firstName: ${firstName} \n 
      lastName: ${lastName} \n 
      phone: ${phone} \n 
      homePhone: ${homePhone} \n 
      homeowner: ${homeowner} \n
      streetAddress: ${streetAddress} \n
      
      city: ${city} \n 
      zip: ${zip} \n 
      monthlyRate: ${monthlyRate} \n 
      shade: ${shade} \n 
      email: ${email} \n 
      creditScore: ${creditScore}`;

    const mailOptions = {
      from: `"${firstName} ${lastName}" <${email}>`, // Sender address
      to: "jessegarlick11@gmail.com", // List of recipients
      subject: "New Buyer Submission", // Subject line
      text: content, // Plain text body
    };

    try {
      const emailResponse = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", emailResponse);
      res.json({
        message: "New buyer created and email sent successfully.",
        status: "success",
        buyer: newBuyer,
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      res.json({
        message: "New buyer created but failed to send email.",
        status: "fail",
        error: error.message,
        buyer: newBuyer,
      });
    }
  },

  sessionCheck: async (req, res) => {
    // when this function is called, we simply want to check if there is a userId on the req.session object, and send it back if so
    if (req.session.user) {
      // if you want more info about the user to return, you can just query right now with a findByPk():
      // const user = await User.findByPk(req.session.userId)

      res.send({
        message: "user is still logged in",
        success: true,
        userId: req.session.user.userId,
      });
      return;
    } else {
      res.send({
        message: "no user logged in",
        success: false,
      });
      return;
    }
  },

  login: async (req, res) => {
    // grab values of 'username'/'password' from body object
    const { username, password } = req.body;

    // see if a user exists in the db with
    // the provided username
    const seller = await Seller.findOne({
      where: {
        username: username,
      },
    });

    if (!seller) {
      res.send({
        message: "no username found",
        success: false,
      });
      return;
    }

    if (seller.password !== password) {
      res.send({
        message: "password does not match",
        success: false,
      });
      return;
    }

    req.session.seller = seller;

    res.send({
      message: "user logged in",
      success: true,
      username: seller.username,
      sellerId: seller.sellerId,
    });
  },

  logout: async (req, res) => {
    req.session.destroy();

    res.send({
      message: "user logged out",
      success: true,
    });
    return;
  },

  getBuyers: async (req, res) => {
    console.log(req.session.buyer);
    // if (req.session.user.isAdmin)

    const buyers = await Buyer.findAll();
    res.send({
      message: "buyer is logged in",
      buyers,
    });
  },
  getSellers: async (req, res) => {
    console.log(req.session.seller);
    //if (req.session.seller)

    const sellers = await Seller.findAll();
    console.log(sellers);
    res.send({
      message: "seller is logged in",
      sellers,
    });
  },
  getProfile: async (req, res) => {
    const sellerId = req.query.sellerId; // Assuming you're passing sellerId as a query parameter

    try {
      const buyersWithSellers = await Buyer.findAll({
        where: {
          sellerId: sellerId,
        },
      });

      res.json(buyersWithSellers);
    } catch (error) {
      console.error("Failed to fetch buyers for seller:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  deleteBuyer: async (req, res) => {
    const { buyerId } = req.params;
    try {
      const result = await Buyer.destroy({
        where: { buyerId: buyerId },
      });
      if (result === 0) {
        return res.status(404).json({ message: "Buyer not found" });
      }
      res.json({ message: "Buyer deleted successfully" });
    } catch (error) {
      console.error("Failed to delete buyer:", error);
      res.status(500).json({ message: "Error deleting buyer" });
    }
  },

  deleteSeller: async (req, res) => {
    const { sellerId } = req.params;
    try {
      const result = await Seller.destroy({
        where: { sellerId: sellerId },
      });
      if (result === 0) {
        return res.status(404).json({ message: "Seller not found" });
      }
      res.json({ message: "Seller deleted successfully" });
    } catch (error) {
      console.error("Failed to delete seller:", error);
      res.status(500).json({ message: "Error deleting seller" });
    }
  },

  updateBuyer: async (req, res) => {
    const { buyerId } = req.params;
    const updatedData = req.body;

    try {
      const [updated] = await Buyer.update(updatedData, {
        where: { buyerId: buyerId },
      });

      if (updated === 0) {
        return res.status(404).json({ message: "Buyer not found" });
      }

      res.json({ message: "Buyer updated successfully" });
    } catch (error) {
      console.error("Failed to update buyer:", error);
      res.status(500).json({ message: "Error updating buyer" });
    }
  },

  // Update Seller
  updateSeller: async (req, res) => {
    const { sellerId } = req.params;
    const updatedData = req.body;

    try {
      const [updated] = await Seller.update(updatedData, {
        where: { sellerId: sellerId },
      });

      if (updated === 0) {
        return res.status(404).json({ message: "Seller not found" });
      }

      res.json({ message: "Seller updated successfully" });
    } catch (error) {
      console.error("Failed to update seller:", error);
      res.status(500).json({ message: "Error updating seller" });
    }
  },
  assignBuyer: async (req, res) => {
    const { sellerId, buyerId } = req.body;
    const seller = await Seller.findByPk(sellerId);
    const buyer = await Buyer.findByPk(buyerId);
    await seller.addBuyer(buyer);
  },
  getSellerById: async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const seller = await Seller.findByPk(sellerId);
        if (!seller) {
            return res.status(404).send({ message: "Seller not found" });
        }
        res.json(seller);
    } catch (error) {
        console.error('Error fetching seller:', error);
        res.status(500).send({ message: "Error fetching seller information" });
    }
}
};

export default handlerFunctions;


