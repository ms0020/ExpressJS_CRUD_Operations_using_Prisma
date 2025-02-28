import "dotenv/config";

import express from 'express';
const app = express();
const PORT = process.env.PORT || 4001;


app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get("/", (req, res) => {
    return res.send("Hello World!!!")
});

import authenticateToken from "./middleware/authorization.js";
app.use(authenticateToken);

// Routes File
import routes from "./routes/index.js";
app.use(routes);



app.listen(PORT ,() => console.log(`Server is running on PORT ${PORT}`));