import { Buyer, Seller, Message, User } from "../database/model.js";
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

    });

    res.send({
      message: "new seller created",
      seller: newSeller,
    });
  },
  createUser: async (req, res) => {
    const { username, password, clientId} = req.body

    const newUser = await User.create({
      username: username,
      password: password
    })
    await Seller.update({ userId: newUser.userId}, {
      where: {
        clientId: clientId
      }

    })

    res.send({
      message: "new user created",
      user: newUser,
    })
  },
  getProfile: async (req, res) => {
    const { userId } = req.session.user
    const user = await User.findOne({
      where: {
        userId
      }, 
      include: [
        {
          model: Seller, 
        },
        {
          model: Buyer,
        }
      ]
    })
    res.send({
      message: "seller data retrieved",
      data: user
    })
  },

  createBuyer: async (req, res) => {
    
    const {
      firstName,
      lastName,
      email,
      phone,
      homePhone,
      homeowner,
      streetName,
      streetNumber,
      city,
      state,
      zip,
      monthlyRate,
      shade,
      creditScore,
    } = req.body;
    console.log(firstName)
    console.log("asldfkjaldkfgjalksdjglaksjdglaksdjg")

    console.log("Creating new buyer...");

    
    const newBuyer = await Buyer.create({
      fname: firstName,
      lname: lastName,
      email: email,
      cellPhone: phone,
      homePhone: homePhone,
      homeowner: homeowner,
      streetName: streetName,
      streetNumber: streetNumber,
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
      streetName: ${streetName} \n
      streetNumber: ${streetNumber} \n
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
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    // need to evaluate if that worked, if not,
    // can already respond that login failed
    if (!user) {
      res.send({
        message: "no username found",
        success: false,
      });
      return;
    }

    // if we're here, then the user was found
    // now evaluate if the passwords match
    if (user.password !== password) {
      res.send({
        message: "password does not match",
        success: false,
      });
      return;
    }

    // if we're here, then the user exists
    // AND their password was correct!
    // So I want to "save" their userId to a cookie --> req.session
    req.session.user = user;
    // req.session is a cookie saved on the user's browser.
    // so each user that visits our site sends their custom "req" object to us, and therefore, as far as their browser knows, they are "logged in"

    // if we're here, then all is a success
    // send a response including the userId:

    res.send({
      message: "user logged in",
      success: true,
      username: user.username,
      userId: user.userId,

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
};

export default handlerFunctions;
