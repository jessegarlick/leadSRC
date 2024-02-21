import { Buyer, Seller, Message, db } from '../database/model.js'

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

await db.close()