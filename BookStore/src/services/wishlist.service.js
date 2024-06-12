import Wishlist from '../models/wishlist.model';
import Book from '../models/book.model';

export const getWishlistDetails = async (_id) => {
  const data = await Wishlist.findOne({ wishlistBy: _id });
  return data;
};

export const addToWishlist = async (wishlistBy, book_id) => {
  const data = await Book.findOne({ _id: book_id });
  if (data !== null) {
    let wishlist = await Wishlist.findOne({ wishlistBy: wishlistBy });
    if (wishlist === null) {
      wishlist = await Wishlist.create({
        wishlistBy: wishlistBy,
        books: [data]
      });
    } else {
      const existingBook = wishlist.books.find((book) =>
        book._id.equals(data._id)
      );
      if (!existingBook) {
        wishlist.books.push(data);
      }
    }
    await wishlist.save();
    return wishlist;
  } else {
    throw new Error('Book not found with this _id');
  }
};

export const removeFromWishlist = async (wishlistBy, book_id) => {
  const wishlist = await Wishlist.findOne({ wishlistBy: wishlistBy });
  if (wishlist !== null) {
    const bookIndex = wishlist.books.findIndex((book) =>
      book._id.equals(book_id)
    );
    if (bookIndex !== -1) {
      wishlist.books.splice(bookIndex, 1);
      await wishlist.save();
      return wishlist;
    } else {
      throw new Error('Book is not in the wishlist');
    }
  } else {
    throw new Error('Wishlist is not created yet');
  }
};