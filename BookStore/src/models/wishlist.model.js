import { Schema, model } from 'mongoose';

const wishlistSchema = new Schema({
  wishlistBy: {
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
      }
    }
  ]
});

export default model('Wishlist', wishlistSchema);