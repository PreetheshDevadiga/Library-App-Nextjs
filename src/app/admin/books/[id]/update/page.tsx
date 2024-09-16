import React from "react";
import { UpdateBookForm } from "../../../../../components/admin/books/updatebook";
import { fetchBookById } from "../../../../../lib/action";
import { IBook} from "../../../../../models/book.model";

export default async function CreatePage({params}:{params:{id:string}}) {
    const bookId=Number(params.id);
    const book:IBook  | null=await fetchBookById(bookId)
    if(!book){
        throw new Error("No books Found");
    }
    return (
        <>
        < UpdateBookForm book={book}/>
        </>
    )
}
