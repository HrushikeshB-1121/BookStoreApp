import Book from "../models/book.model";


export const getAllBooks = async () => {
    const data = await Book.find();
    return data;
};

export const getBookById = async (_id) => {
    const data = await Book.findById(_id);
    return data;
}


export const deleteBookById = async (_id)=>{
    await Book.findByIdAndDelete(_id);
    return '';
}

export const updateBookById = async (_id, body)=>{
    const data = await Book.findByIdAndUpdate(
        {
            _id
        },
        body,
        {
            new:true
        }
    );
    return data;
}
