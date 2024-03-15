import { Buyer, Seller, Message, db } from '../database/model.js';

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
        password: 'test',
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
        password: 'test',
    },
];

const buyers = [
    {
        fname: 'John',
        lname: 'Doe',
        streetAddress: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        cellPhone: '555-123-4567',
        homePhone: '555-987-6543',
        email: 'johndoe@example.com',
        homeowner: 'Yes',
        shade: 'Some',
        monthlyRate: '$100',
        creditScore: 'Good',
        sellerId: 1, 
    },
    {
        fname: 'Jane',
        lname: 'Smith',
        streetAddress: '456 Oak Ave',
        city: 'Othertown',
        state: 'NY',
        zip: '54321',
        cellPhone: '555-987-6543',
        homePhone: '555-123-4567',
        email: 'janesmith@example.com',
        homeowner: 'Yes',
        shade: 'Little',
        monthlyRate: '$120',
        creditScore: 'Excellent',
        sellerId: 2,
    },
];

// Seeding messages
const messages = [
    {
        senderId: 1, 
        receiverId: 2,
        content: 'Hello, Sean! How are you?',
        isRead: false,
    },
    {
        senderId: 2,
        receiverId: 1, 
        content: 'Hi Jesse! I\'m good, thanks. How about you?',
        isRead: false,
    },
];

try {
    for (const seller of sellers) {
        await Seller.create(seller);
    }

    for (const buyer of buyers) {
        await Buyer.create(buyer);
    }

    for (const message of messages) {
        await Message.create(message);
    }

    console.log('Database seeded successfully!');
} catch (error) {
    console.error('Error seeding database:', error);
} finally {
    await db.close();
}
