import mongoose from "mongoose";
import express from "express";
import routes from "./routes.js"

const app = express()

const port = 8080;

app.use("/", routes);

app.listen(PORT, () => {
    console.log(`Listening in ${port}`);
});

async function connection() {
    await mongoose
        .connect("mongodb+srv://ashutosh:1234@cluster0.9cir3a3.mongodb.net/noteApp?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connected");
        })
        .catch((err) => {
            console.error(err);
        });
}

connection();