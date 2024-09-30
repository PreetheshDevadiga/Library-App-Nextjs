"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useActionState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "../../use-toast";
import { addNewBook, State, uploadImage } from "@/lib/action"
import { Loader2 } from "lucide-react"

export function CreateBookForm() {
  const router = useRouter()
  const initialState: State = { message: "", errors: {} }
  const [state, formAction] = useActionState(addNewBook, initialState)
  const [imageURL, setImageURL] = useState("")
  const [isUploading, setIsUploading] = useState(false)

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

  const handleFormData = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    formAction(formData)
  }

  useEffect(() => {
    if (state.message === "Success") {
      toast({
        title: "Book Added Successfully",
        description: "The book has been added to the collection.",
        className: "bg-[#80E9FF] text-[#0A2540]",
        duration: 2000,
      })
      router.push("/admin/books")
    } else if (state.message) {
      toast({
        title: "Error",
        description: state.message,
        className: "bg-red-500 text-white",
        duration: 2000,
      })
    }
  }, [router, state.message])

  return (
    <Card className="w-full max-w-2xl mx-auto bg-[#0A2540] text-white border-[#1D3E6B]">
      <CardHeader className="pb-4 md:pb-6 border-b border-[#1D3E6B]">
        <CardTitle className="text-xl md:text-2xl font-bold text-center text-[#80E9FF]">
          Add New Book
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleFormData} className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className="w-full bg-[#0F2D52] border-[#1D3E6B] text-white placeholder-[#A3B8CC] focus:border-[#80E9FF]"
              />
              {state.errors?.price && (
                <p className="text-red-400 text-sm">{state.errors.price}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bookImage" className="text-sm font-medium text-[#A3B8CC]">
                Book Image
              </Label>
              <Input
                id="bookImage"
                name="bookImage"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                required
                className="w-full bg-[#0F2D52] border-[#1D3E6B] text-white file:bg-[#1D3E6B] file:text-white file:border-0"
              />
              {isUploading && <p className="text-[#80E9FF]">Uploading image...</p>}
              <input type="hidden" name="imageURL" value={imageURL} />
            </div>
          </div>

          <Button
            className="w-full mt-6 bg-gradient-to-r from-[#80E9FF] to-[#635BFF] text-[#0A2540] hover:from-[#67DAFF] hover:to-[#5147FF] transition-all duration-300"
            type="submit"
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Add Book"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}