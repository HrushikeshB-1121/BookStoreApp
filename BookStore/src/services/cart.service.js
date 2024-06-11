import Cart from '../models/cart.model';
import Book from '../models/book.model';

export const getCartDetails = async (userId) => {
  const data = await Cart.findOne({ cartBy: userId });
  return data;
};

export const addToCart = async (cartBY, book_id) => {
  const data = await Book.findOne({ _id: book_id });
  if (data !== null) {
    let cart = await Cart.findOne({ cartBy: cartBY });
    if (cart === null) {
      data.quantity = 1;
      cart = await Cart.create({
        cartBy: cartBY,
        books: [data],
        cartTotal: data.price
      });
      return cart;
    } else {
      const existingBook = cart.books.find((book) => book._id.equals(data._id));
      if (existingBook) {
        existingBook.quantity += 1;
      } else {
        data.quantity = 1;
        cart.books.push(data);
      }

      cart.cartTotal += data.price;
      await cart.save();
      return cart;
    }
  } else {
    throw new Error('Book not found with this _id');
  }
};

export const removeFromCart = async (cartBy, book_id) => {
  const cart = await Cart.findOne({ cartBy: cartBy });
  if (cart !== null) {
    const bookIndex = cart.books.findIndex((book) => book._id.equals(book_id));
    if (bookIndex !== -1) {
      const book = cart.books[bookIndex];
      book.quantity -= 1;
      if (book.quantity === 0) {
        cart.books.splice(bookIndex, 1);
      }
      cart.cartTotal -= book.price;
      await cart.save();
      return cart;
    } else {
      throw new Error('Book is not in the cart');
    }
  } else {
    throw new Error('Cart is not created yet.');
  }
};