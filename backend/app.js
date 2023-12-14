const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const users = [
    {
        id: 1,
        name: "yahya",
        age: 22
    },
    {
        id: 2,
        name: "Abdul rehman",
        age: 21
    },
];

app.get("/users", (req, res) => {
    try {
        // Send the users data as a response
        res.json(users);
    } catch (error) {
        // Handle errors if needed
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post("/add", (req, res) => {
    const body = req.body;
    try {
        // Log the request body
        console.log(body);
        users.push(body)
        res.json({ message: "Data received successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3100, () => {
    console.log("Server Started");
});
