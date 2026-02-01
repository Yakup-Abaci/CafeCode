const Coffe = require('../models/Coffe');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createCoffe = async (req, res) => {
    try {
        console.log(req.body);
        const coffeExist = await Coffe.findOne({ coffeMail: req.body.coffeMail })
        if (coffeExist) {
            res.send({
                "baslik": "Başarısız!",
                "mesaj": `Coffe, ${coffeExist.coffeMail} adresi ile zaten var!`
            });
            return;
        }
        const coffe = await Coffe.create(req.body);
        res.status(201).json({
            "baslik": "Başarılı!", "mesaj": 'Coffe başarıyla oluşturuldu!',
            "coffe": {
                "coffeName": coffe.coffeName,
                "coffeMail": coffe.coffeMail
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


exports.loginCoffe = async (req, res) => {
    try {
        console.log(req.body);
        const coffe = await Coffe.findOne({ coffeMail: req.body.coffeMail });
        if (coffe) {
            const cmp = await bcrypt.compare(req.body.coffePassword, coffe.coffePassword);
            if (cmp) {
                const token = jwt.sign({
                    coffeMail: coffe.coffeMail
                }, secureKey, { expiresIn: '1h' })
                res.send({
                    "mesaj": "Auth Success",
                    "token": token,
                    "coffe": {
                        "coffeName": coffe.coffeName,
                        "coffeMail": coffe.coffeMail
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
    res.status(201).send({ message: req.coffeData.coffeMail + " - AuthComplate" })
}