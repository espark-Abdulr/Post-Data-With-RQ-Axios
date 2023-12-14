const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const users = [

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
    console.log(body)
    try {
        const filterData = users.filter((user) => user.email === body.email);
        if (filterData.length !== 0) {
            res.json({ message: "User already exist" });
            return
        }
        else {
            users.push(body)
            res.json({ message: "Data received successfully" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3100, () => {
    console.log("Server Started");
});
