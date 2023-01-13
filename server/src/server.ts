import express from "express";
import mongoose from "mongoose";
import cors from "cors";
require("dotenv").config();
import bodyParser from "body-parser";
import { customError } from "./middlewares/errorMiddleware";

const app = express();

//use middlewares
//use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(customError);

//use cors
app.use(cors());

//connect to database and listen to port
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL || "")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });


//routes