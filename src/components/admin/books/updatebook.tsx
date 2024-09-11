"use client";

import { Label } from "@radix-ui/react-label";
import React, { useEffect } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { useActionState } from "react";
import { updateBook,State } from "../../../lib/action";
import { IBook } from "../../../models/book.model"
import { useRouter } from "next/navigation";
import { useToast } from "../../use-toast"


export function UpdateBookForm({book}:{book:IBook}) {
    const router=useRouter();
const updateBookById=updateBook.bind(null,book.id)
  const initialState: State = { message: "", errors: {} };
  const [state, formAction] = useActionState(updateBookById, initialState);
  const { toast } =useToast();
  useEffect(() => {
    if (state.message === "Success") {
    toast({
        title: "Book Updated",
        description: "The book has been successfully updated.",
        className:"bg-green-500",
        duration:2000,
      });
      router.push("/admin/books");
    }
  }, [state, router, toast]);
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-2 md:pb-6">
        <CardTitle className="text-xl md:text-2xl font-bold text-center">
          Update New Book
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Book Title"
                autoFocus
                required
                className="w-full"
                defaultValue={book.title}
              />
               {state.errors?.title ? (
                <p className="text-red-500 text-sm">{state.errors.title}</p>
              ) : (
                <div className="min-h-5"></div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="author" className="text-sm font-medium">
                Author
              </Label>
              <Input
                id="author"
                name="author"
                type="text"
                placeholder="Author Name"
                required
                defaultValue={book.author}
                className="w-full"
              />
              {state.errors?.author ? (
                <p className="text-red-500 text-sm">{state.errors.author}</p>
              ) : (
                <div className="min-h-5"></div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="publisher" className="text-sm font-medium">
                Publisher
              </Label>
              <Input
                id="publisher"
                name="publisher"
                type="text"
                placeholder="Publisher Name"
                required
                defaultValue={book.publisher}
                className="w-full"
              />
              {state.errors?.publisher ? (
                <p className="text-red-500 text-sm">{state.errors.publisher}</p>
              ) : (
                <div className="min-h-4"></div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre" className="text-sm font-medium">
                Genre
              </Label>
              <Input
                id="genre"
                name="genre"
                type="text"
                placeholder="Genre"
                required
                defaultValue={book.genre}
                className="w-full"
              />
              {state.errors?.genre ? (
                <p className="text-red-500 text-sm">{state.errors.genre}</p>
              ) : (
                <div className="min-h-4"></div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="isbnNo" className="text-sm font-medium">
                ISBN Number
              </Label>
              <Input
                id="isbnNo"
                name="isbnNo"
                type="text"
                placeholder="ISBN Number"
                required
                defaultValue={book.isbnNo}
                className="w-full"
              />
              {state.errors?.isbnNo ? (
                <p className="text-red-500 text-sm">{state.errors.isbnNo}</p>
              ) : (
                <div className="min-h-4"></div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pages" className="text-sm font-medium">
                Pages
              </Label>
              <Input
                id="pages"
                name="pages"
                type="number"
                placeholder="Number of Pages"
                required
                defaultValue={book.pages}
                className="w-full"
              />
              {state.errors?.pages ? (
                <p className="text-red-500 text-sm">{state.errors.pages}</p>
              ) : (
                <div className="min-h-4"></div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalCopies" className="text-sm font-medium">
                Total Copies
              </Label>
              <Input
                id="totalCopies"
                name="totalCopies"
                type="number"
                placeholder="Total Copies"
                required
                defaultValue={book.totalCopies}
                className="w-full"
              />
              {state.errors?.totalCopies ? (
                <p className="text-red-500 text-sm">{state.errors.totalCopies}</p>
              ) : (
                <div className="min-h-4"></div>
              )}
            </div>
          </div>

          <Button className="w-full mt-4 md:mt-6" type="submit">
            Update Book
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
