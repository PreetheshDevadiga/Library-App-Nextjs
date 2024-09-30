"use client"

import { Label } from "@/components/ui/label"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useActionState } from "react"
import { updateBook, State, uploadImage } from "@/lib/action"
import { IBook } from "@/models/book.model"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/use-toast"
import Image from "next/image"

export function UpdateBookForm({ book }: { book: IBook }) {
  const router = useRouter()
  const updateBookById = updateBook.bind(null, book.id)
  const initialState: State = { message: "", errors: {} }
  const imageUrl = book.imageUrl ? book.imageUrl : ""
  const [imageURL, setImageURL] = useState<string>(imageUrl)
  const [isUploading, setIsUploading] = useState(false)
  const [state, formAction] = useActionState(updateBookById, initialState)
  const { toast } = useToast()

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      const result = await uploadImage(file)
      setIsUploading(false)
      if (result.imageURL) {
        console.log("image", result.imageURL)
        setImageURL(result.imageURL)
      } else if (result.error) {
        throw new Error(result.error)
      }
    }
  }

  useEffect(() => {
    if (state.message === "Success") {
      toast({
        title: "Book Updated",
        description: "The book has been successfully updated.",
        className: "bg-[#80E9FF] text-[#0A2540]",
        duration: 2000,
      })
      router.push("/admin/books")
    }
  }, [state, router, toast])

  return (
    <Card className="w-full max-w-2xl mx-auto bg-[#0A2540] text-white border-[#1D3E6B]">
      <CardHeader className="pb-0 md:pb-6 border-b border-[#1D3E6B]">
        <CardTitle className="text-xl md:text-2xl font-bold text-center text-[#80E9FF]">
          Update Book
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form action={formAction} className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-[#A3B8CC]">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Book Title"
                autoFocus
                required
                className="w-full bg-[#0F2D52] border-[#1D3E6B] text-white placeholder-[#A3B8CC] focus:border-[#80E9FF]"
                defaultValue={book.title}
              />
              {state.errors?.title && (
                <p className="text-red-400 text-sm">{state.errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="author" className="text-sm font-medium text-[#A3B8CC]">
                Author
              </Label>
              <Input
                id="author"
                name="author"
                type="text"
                placeholder="Author Name"
                required
                defaultValue={book.author}
                className="w-full bg-[#0F2D52] border-[#1D3E6B] text-white placeholder-[#A3B8CC] focus:border-[#80E9FF]"
              />
              {state.errors?.author && (
                <p className="text-red-400 text-sm">{state.errors.author}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="publisher" className="text-sm font-medium text-[#A3B8CC]">
                Publisher
              </Label>
              <Input
                id="publisher"
                name="publisher"
                type="text"
                placeholder="Publisher Name"
                required
                defaultValue={book.publisher}
                className="w-full bg-[#0F2D52] border-[#1D3E6B] text-white placeholder-[#A3B8CC] focus:border-[#80E9FF]"
              />
              {state.errors?.publisher && (
                <p className="text-red-400 text-sm">{state.errors.publisher}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre" className="text-sm font-medium text-[#A3B8CC]">
                Genre
              </Label>
              <Input
                id="genre"
                name="genre"
                type="text"
                placeholder="Genre"
                required
                defaultValue={book.genre}
                className="w-full bg-[#0F2D52] border-[#1D3E6B] text-white placeholder-[#A3B8CC] focus:border-[#80E9FF]"
              />
              {state.errors?.genre && (
                <p className="text-red-400 text-sm">{state.errors.genre}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="isbnNo" className="text-sm font-medium text-[#A3B8CC]">
                ISBN Number
              </Label>
              <Input
                id="isbnNo"
                name="isbnNo"
                type="text"
                placeholder="ISBN Number"
                required
                defaultValue={book.isbnNo}
                className="w-full bg-[#0F2D52] border-[#1D3E6B] text-white placeholder-[#A3B8CC] focus:border-[#80E9FF]"
              />
              {state.errors?.isbnNo && (
                <p className="text-red-400 text-sm">{state.errors.isbnNo}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pages" className="text-sm font-medium text-[#A3B8CC]">
                Pages
              </Label>
              <Input
                id="pages"
                name="pages"
                type="number"
                placeholder="Number of Pages"
                required
                defaultValue={book.pages}
                className="w-full bg-[#0F2D52] border-[#1D3E6B] text-white placeholder-[#A3B8CC] focus:border-[#80E9FF]"
              />
              {state.errors?.pages && (
                <p className="text-red-400 text-sm">{state.errors.pages}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalCopies" className="text-sm font-medium text-[#A3B8CC]">
                Total Copies
              </Label>
              <Input
                id="totalCopies"
                name="totalCopies"
                type="number"
                placeholder="Total Copies"
                required
                defaultValue={book.totalCopies}
                className="w-full bg-[#0F2D52] border-[#1D3E6B] text-white placeholder-[#A3B8CC] focus:border-[#80E9FF]"
              />
              {state.errors?.totalCopies && (
                <p className="text-red-400 text-sm">{state.errors.totalCopies}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium text-[#A3B8CC]">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="Price"
                required
                defaultValue={book.price!}
                className="w-full bg-[#0F2D52] border-[#1D3E6B] text-white placeholder-[#A3B8CC] focus:border-[#80E9FF]"
              />
              {state.errors?.price && (
                <p className="text-red-400 text-sm">{state.errors.price}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bookImage" className="text-sm font-medium text-[#A3B8CC]">
                Book Image
              </Label>
              <Input
                id="bookImage"
                name="bookImage"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full bg-[#0F2D52] border-[#1D3E6B] text-white file:bg-[#1D3E6B] file:text-white file:border-0"
              />
              {isUploading && <p className="text-[#80E9FF]">Uploading image...</p>}
              <input type="hidden" name="imageURL" value={imageURL} />
            </div>
            {imageUrl && (
              <div>
                <Image
                  src={imageUrl}
                  alt={"no image"}
                  width={70}
                  height={100}
                  className="rounded-lg"
                />
              </div>
            )}
          </div>

          <Button 
            className="w-full mt-4 md:mt-6 bg-gradient-to-r from-[#80E9FF] to-[#635BFF] text-[#0A2540] hover:from-[#67DAFF] hover:to-[#5147FF] transition-all duration-300" 
            type="submit"
          >
            Update Book
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}