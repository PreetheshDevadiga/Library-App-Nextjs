"use client";

import { Label } from "@radix-ui/react-label";
import React, { useEffect } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { useActionState } from "react";
import { addNewBook,State } from "../../../lib/action";
import { toast } from "@/components/use-toast";
import { useRouter } from "next/navigation";
import { Suspense } from 'react'

export function CreateBookForm() {
  const router=useRouter();
  const initialState: State = { message: "", errors: {} };
  const [state, formAction] = useActionState(addNewBook, initialState);
  useEffect(() => {
    if (state.message === "Success") {
      toast({
        title: "Book Added Successfully",
        description: "The book has been added to collection.",
        className: "bg-green-500",
        duration: 2000,
      });
      router.push('/admin/books');
    }
  }, [router, state.message]);
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-4 md:pb-6">
        <CardTitle className="text-xl md:text-2xl font-bold text-center">
          Add New Book
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-2 gap-4">
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
              />
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
                className="w-full"
              />
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
                className="w-full"
              />
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
                className="w-full"
              />
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
                className="w-full"
              />
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
                className="w-full"
              />
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
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bookImage" className="text-sm font-medium">
                Book Image
              </Label>
              <Input
                id="bookImage"
                name="bookImage"
                type="file"
                accept="image/*"
                // onChange={handleImageChange}
                required
                className="w-full"
              />
            </div>

          </div>

          <Button className="w-full mt-4 md:mt-6" type="submit">
            Add Book
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
