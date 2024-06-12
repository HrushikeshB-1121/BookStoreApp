import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  orderBy: {
    type: Schema.Types.ObjectId
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
      },
      price: {
        type: Number
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
  isPurchased: {
    type: Boolean,
    default: false
  },
  orderPlacedDate: {
    type: Date,
    default: Date.now
  }
});

export default model('Order', orderSchema);