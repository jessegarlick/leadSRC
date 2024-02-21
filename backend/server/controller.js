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
    }
} 



export default handlerFunctions 