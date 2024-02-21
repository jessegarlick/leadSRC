import { Seller, Buyer, db } from "./model.js";

const allSellers = await Seller.findAll()

console.log(allSellers)

await db.close()