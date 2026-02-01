const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose')
let app = express();
app.use(express.json());

mongoose.connect(process.env.DB_STRING).then(() => {
    console.log("db connected");
}).catch(err => { console.log(err); });

//Routes
const AuthRoute = require('./routes/authRoute');
const cardRoute = require('./routes/cardRoute');

app.get('/', (req, res) => { res.json({ message: "welcome" }) });
app.use('/api/auth', AuthRoute);
app.use('/api/card', cardRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});