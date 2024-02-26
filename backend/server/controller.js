import { Buyer, Seller, Message, User } from '../database/model.js'

const handlerFunctions = {

    createSeller: async (req, res) => {
        // const firstName = req.body.firstName
        const { firstName, lastName, email, phone, company } = req.body

        const newSeller = await Seller.create({
            firstName: firstName, 
            lastName: lastName,
            email: email,
            phone: phone,
            company: company,
        })

        res.send({
            message: "new seller created",
            seller: newSeller
        })
    },
    createBuyer: async (req, res) => {
        const { firstName, lastName, email, phone, homePhone, homeowner, streetName, streetNumber, city, state, zip, monthlyRate, shade, creditScore } 
        = req.body

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

        })

        res.send({
            message: "new buyer created",
            buyer: newBuyer
        })
    },
    sessionCheck: async (req, res) => {
        // when this function is called, we simply want to check if there is a userId on the req.session object, and send it back if so
        if (req.session.userId) {
          // if you want more info about the user to return, you can just query right now with a findByPk():
          // const user = await User.findByPk(req.session.userId)
    
          res.send({
            message: "user is still logged in",
            success: true,
            userId: req.session.userId
          })
          return
        } else { 
          res.send({
            message: "no user logged in",
            success: false,
          })
          return
    
        }
      },
    
      login: async (req, res) => {
        // grab values of 'username'/'password' from body object
        const { username, password } = req.body
    
        // see if a user exists in the db with 
        // the provided username
        const user = await User.findOne({
          where: {
            username: username
          }
        })
    
        // need to evaluate if that worked, if not,
        // can already respond that login failed
        if (!user) {
          res.send({
            message: 'no username found',
            success: false
          })
          return
        }
    
        // if we're here, then the user was found
        // now evaluate if the passwords match
        if (user.password !== password) {
          res.send({
            message: 'password does not match',
            success: false,
          })
          return
        }
    
        // if we're here, then the user exists 
        // AND their password was correct!
        // So I want to "save" their userId to a cookie --> req.session
        req.session.userId = user.userId
        // req.session is a cookie saved on the user's browser. 
        // so each user that visits our site sends their custom "req" object to us, and therefore, as far as their browser knows, they are "logged in"
    
        // if we're here, then all is a success
        // send a response including the userId:
    
        res.send({
          message: "user logged in",
          success: true,
          userId: req.session.userId
        })
    
      },
    
      logout: async(req, res) => {
        req.session.destroy()
    
        res.send({
          message: "user logged out",
          success: true
        })
        return
      },
    }



export default handlerFunctions 