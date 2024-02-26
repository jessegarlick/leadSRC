import { Seller, Buyer, User, db } from "./model.js";

const allSellers = await Seller.findAll()
const allBuyers = await Buyer.findAll()
const allUsers = await User.findAll()

console.log(allBuyers)

console.log(await User.findAll())

await db.close()