const mongoose = require('mongoose');
// this js file to connect with local mongoosedb mongodb://localhost:27017/
// const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const mongoURI='mongodb+srv://ashish:12345@cluster0.g45nrog.mongodb.net/inotebookDb';
// const mongoURI="mongodb+srv://admin:<password>@cluster0.smftgib.mongodb.net/"
// call back ek function hota hai jo ki kuch kam karne ke baad return karta hai 
const connectToMongo = async ()=>{
   await mongoose.connect(mongoURI)
      
        console.log("mogoose is connect")
    
    
} 

module.exports = connectToMongo;