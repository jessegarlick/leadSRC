import { Buyer, Seller, db } from '../database/model.js'

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
        username: 'jesse',
        password: "test",
        isAdmin: true,
        isClient: true,
    },
    {
        firstName: 'Sean',
        lastName: 'Garlick',
        email: 'Sean@gmail.com',
        phone: '801-358-7735',
        company: 'CUWSS',
        username: 'sean',
        password: "test",
        
    },
]

for  (const seller of sellers) {
    await Seller.create(seller)
}


await db.close()