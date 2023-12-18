const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "*",
        ],
        credentials: true,
        origin: true,
    })
);
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


app.get("/userDetail/:userId", (req, res) => {
    const userId = req.params.userId;
    try {
        const user = users.find((user) => user.id === userId);
        res.send(user);
    }
    catch (err) {
        res.status(404).json({ error: 'User not found' });
    }
});



app.listen(3100, () => {
    console.log("Server Started");
});
