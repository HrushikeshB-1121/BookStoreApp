import Cart from '../models/cart.model';
import Book from '../models/book.model';


export const addToCart = async (cartBy, book_id) => {
  const data = await Book.findOne({ _id: book_id });
  if (data !== null) {
    let cart = await Cart.findOne({ cartBy: cartBy });
    if (cart === null) {
      data.quantity = 1;
      cart = await Cart.create({
        cartBy: cartBy,
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
