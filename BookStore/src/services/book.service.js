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
    const data = await Book.findByIdAndDelete(_id);
    if(data===null)
        throw new Error('book not found')
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
    if(data===null)
        throw new Error('book not found')
    return data;
}