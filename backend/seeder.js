import mongoose from "mongoose";
import dotenv from "dotenv";
import products from "./data/products.js";
import users from "./data/users.js";
import user from "./models/userModel.js";
import product from "./models/productModel.js";
import order from "./models/orderModel.js";
import connectDB from "./config/db.js";
//import colors from 'colors';
dotenv.config();

connectDB();

const importData = async () => {
    try{
        await order.deleteMany();
        await product.deleteMany();
        await user.deleteMany();

        const createdUsers = await user.insertMany(users);
        const adminUser = createdUsers[0]._id;
        
        const sampleProducts = products.map((product) => {
            return {...product, user: adminUser}
        });

        await product.insertMany(sampleProducts);
        console.log('Data Imported!');
        process.exit();
    }catch(error){
        console.log(`${error}`);
        process.exit(1);
    }
}


const DestroyData = async () => {
    try{
        await order.deleteMany();
        await product.deleteMany();
        await user.deleteMany();

        console.log('Data Destroyed');
        process.exit();
    }catch(error){
        console.log(`$(error)`);
        process.exit(1);
    }
}

if(process.argv[2] === "-d")
{
    DestroyData();
}else{
    importData();
}