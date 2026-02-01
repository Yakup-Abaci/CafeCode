const jwt = require('jsonwebtoken');
const User = require('../models/User')

module.exports=async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,process.env.SKey);
        req.userData = await User.findOne({userMail:decoded.userMail})
        //req.userData = decoded;
        next();
    } catch (error) {
        res.status(401).send({"mesaj":"Yetkiniz yok"})
    }
}