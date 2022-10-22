const express = require('express');
const routes = require("./routes");

const db = require('./database/index');

// db.sync({ force: true });

const app = express();

app.use(express.json());
app.use(routes);


app.listen(8888, () => {
    console.log("Server is running")
});