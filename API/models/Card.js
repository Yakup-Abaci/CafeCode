const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    cardCode: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true
        
    },
    coffeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coffe',
        require:true
    },
    cardCreated: {
        type: Date,
        default: Date.now
    }
});

const Card = mongoose.model('Card', CardSchema);
module.exports = Card;