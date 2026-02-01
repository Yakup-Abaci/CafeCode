const User = require('../models/User');
const Coffe = require('../models/Coffe');
const Card = require('../models/Card');

exports.createCard = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.userData);
        const coffeId = await Coffe.findById(req.body._id);
        const coffe = await Card.create({
            cardCode: Math.floor(Math.random() * 16777215).toString(16),
            userId: req.userData._id,
            coffeId: coffeId
        });
        res.status(201).json({
            "baslik": "Başarılı!",
            "mesaj": 'Card başarıyla oluşturuldu!',
            "coffe": {
                "card_id": coffe._id
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "baslik": "Hata!",
            "mesaj": "Sunucu hatası"
        });
    }
}

exports.getCard = async (req, res) => {
    try {
        console.log(req.userData.userMail);
        const cards = await Card.find({ userId: req.userData._id });
        res.json(cards);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "baslik": "Hata!",
            "mesaj": "Sunucu hatası"
        });
    }
}

exports.test = async (req, res) => {
    res.status(201).send({ message: req.userData.userMail + " - AuthComplate" })
}