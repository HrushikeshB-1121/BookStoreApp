import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
    cartBy: {
        type: String
    },
    books: [
        {
            bookId: {
                type: String
            },
            bookName: {
                type: String
            },
            description: {
                type: String
            },
            author: {
                type: String
            },
            bookImage: {
                type: String,
                default: null,
            },
            price:{
                type:Number
            },
            discountPrice: {
                type: Number
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    cartTotal:{
        type:Number
    },
    isPurchased:{
        type:Boolean,
        default:false
    }
});

export default model('Cart',cartSchema);