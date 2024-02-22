import { Seller, Buyer, db } from "./model.js";

const allSellers = await Seller.findAll()
const allBuyers = await Buyer.findAll()

console.log(allBuyers)

await db.close()