import HttpStatus from 'http-status-codes';
import * as BooksService from "../services/book.service"

export const getAllbooks = async (req, res, next) => {
    try {
        const data = await BooksService.getAllBooks();
        res.status(HttpStatus.OK).json({
            success: true,
            message: 'All Book fetched Successfully',
            data: data
        })
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: `${error}`
        })
    }
}

export const getBookById = async (req, res, next) => {
    try {
        const data = await BooksService.getBookById(req.params._id);
        res.status(HttpStatus.OK).json({
            success: true,
            message: 'Book fetched successfully',
            data: data
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: `${error}`
        })
    }
}


export const deleteBookById = async (req, res, next) => {
    try {
        const data = await BooksService.deleteBookById(req.params._id);
        res.status(HttpStatus.OK).json({
            success: true,
            message: 'Book deleted successfully'
        });
        
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: `${error}`
        })
    }
}

export const updateBookById = async (req, res, next) => {
    try {
        const data = await BooksService.updateBookById(req.params._id, req.body);
        res.status(HttpStatus.OK).json({
            success: true,
            message: 'Book updated successfully',
            data: data
        });

    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            message: `${error}`
        })
    }
}