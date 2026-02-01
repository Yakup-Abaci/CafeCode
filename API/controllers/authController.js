const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    try {
        console.log(req.body);
        const userExist = await User.findOne({ userMail: req.body.userMail })
        if (userExist) {
            res.send({
                "baslik": "Başarısız!",
                "mesaj": `Kullanıcı, ${userExist.userMail} adresi ile zaten var!`
            });
            return;
        }
        const user = await User.create(req.body);
        res.status(201).json({
            "baslik": "Başarılı!", "mesaj": 'Kullanıcı başarıyla oluşturuldu!',
            "user": {
                "userName": user.userName,
                "userSurname":user.userSurname,
                "userMail": user.userMail
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "baslik": "Hata!",
            "mesaj": "Sunucu hatası"
        });
    }
};


exports.loginUser = async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findOne({ userMail: req.body.userMail });
        if (user) {
            const cmp = await bcrypt.compare(req.body.userPassword, user.userPassword);
            if (cmp) {
                const token = jwt.sign({
                    userMail: user.userMail
                }, process.env.SKey, { expiresIn: '1h' })
                res.send({
                    "mesaj": "Auth Success",
                    "token": token,
                    "user": {
                        "_id":user._id,
                        "userName": user.userName,
                        "userMail": user.userMail
                    }
                });
            } else {
                res.send({ "baslik": "Başarısız", "mesaj": "Yanlış e-posta veya şifre" });
            }
        } else {
            res.send({ "baslik": "Başarısız", "mesaj": "Yanlış e-posta veya şifre" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "baslik": "Hata!",
            "mesaj": "Sunucu hatası"
        });
    }
};

exports.test = async (req, res) => {
    res.status(201).send({ message: req.userData.userMail + " - AuthComplate" })
}