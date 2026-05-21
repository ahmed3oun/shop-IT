const Product = require('../models/product');
const User = require('../models/user');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/eshop-database.products');
const users = require('../data/eshop-database.users');

// Setting dotenv file
dotenv.config({ path: 'backend/config/config.env' })

connectDatabase();

const seedProducts = async () => {
    try {

        await Product.deleteMany();
        console.log('Products are deleted');

        await Product.insertMany(products)
        console.log('All Products are added.');

    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

const seedUsers = async () => {
    try {
        await User.deleteMany();
        console.log('Users are deleted');

        await User.insertMany(users)
        console.log('All Users are added.');

        users.forEach(user => {
            console.log(`Email: ${user.email} / Password: ${user.email.split('@')[0]} / Role: ${user.role} / Id: ${user._id}`);
        });

    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
seedUsers()
    .then(() => seedProducts())
    .finally(() => process.exit(0));
