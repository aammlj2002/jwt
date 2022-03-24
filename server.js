import express from "express";
import jwt from "jsonwebtoken";
const app = express();
import "dotenv/config";
app.use(express.json());
let data = [
    {
        username: "john",
        title: "post1",
    },
    {
        username: "doe",
        title: "post2",
    },
];
app.get("/posts", authenticationToken, (req, res) => {
    res.json(data.filter((i) => i.username === req.user.name));
});

function authenticationToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // remove bearer
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.listen(3000);
