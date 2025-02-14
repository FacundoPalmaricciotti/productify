import mongoose from "mongoose";

process.loadEnvFile()
const URI_DB = process.env.URI_DB;

const connectDB= async()=>{

    try{
        await mongoose.connect(URI_DB)
        console.log("conexion a la base de datos exitosa")
    }catch (error){
        console.error("Error 404")
    }

};

export {connectDB};