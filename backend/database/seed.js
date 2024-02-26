import { Buyer, Seller, Message, User, db } from '../database/model.js'

console.log('Syncing database...');
await db.sync({ force: true });

console.log('Seeding database...');

const sellers = [
    {
        firstName: 'Jesse',
        lastName: 'Garlick',
        email: 'jessegarlick11@gmail.com',
        phone: '801-358-7736',
        company: 'CUWSS',
    },
    {
        firstName: 'Sean',
        lastName: 'Garlick',
        email: 'Sean@gmail.com',
        phone: '801-358-7735',
        company: 'CUWSS',
    },

]

for  (const seller of sellers) {
    await Seller.create(seller)
}
let users = ["Cat", "Ty", "Lincoln", "Jesse", "Josh", "Jackson", "Michael", "David"]

for (const user of users) {
  await User.create({
    username: user.toLowerCase(),
    password: "test"
  })
}

await db.close()