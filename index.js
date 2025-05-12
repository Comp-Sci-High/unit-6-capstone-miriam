const mongoose = require("mongoose");
const express = require("express");

const app = express();



app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.set ("view engine", "ejs");

app.use((req, res, next) => {
    console.log('${req.method}: ${req.path}');
    next();
});

const resources = new mongoose.Schema(
    {
    name: { type: String, required: true },
    link: {type: String, required: true },
    about: {type: String, required: true},
    image: {}
});

const Source = mongoose.model("Source", sourceSchema, "Sources");

const input = new mongoose.Schema({
imageLocation: {type: String, required: true},
image: {type: String, required: true},
description: {type: String, required: true},
});

const Input = mongoose.model("Input", inputSchema, "Inputs")

// schema, model, get post, patch, delete, route cruds to pages SCHEMA AND CRUD ROUTES

app.get("/", async (req, res) => {
    const sources = await Sources 
})
