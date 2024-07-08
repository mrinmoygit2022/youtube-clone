# Create a new project for backend develpoment
- Open VSCode
- Create a folder 
- create a git reposatory
- npm init create
- install express mongoose nodemon
- [Model Link] (https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)
- create multiple file command: 
"app.js", "constants.js", "index.js" | ForEach-Object { New-Item -Path . -Name $_ -ItemType "File" }
- create multiple folder command:
mkdir controllers, db, middlewares, models, routes, utils
- npm i -D nodemon 
- npm i -D prettier

# DB connection 
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error", error);
    process.exit(1);
  }
};

export default connectDB;
