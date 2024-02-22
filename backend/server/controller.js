import { Buyer, Seller, Message } from '../database/model.js'

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
    }
} 



export default handlerFunctions 