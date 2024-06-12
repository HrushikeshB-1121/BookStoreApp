import { Schema, model } from 'mongoose';

const wishlistSchema = new Schema({
  wishlistBy: {
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
        default: null
      },
      price: {
        type: Number
      },
      discountPrice: {
        type: Number
      }
    }
  ]
});

export default model('Wishlist', wishlistSchema);