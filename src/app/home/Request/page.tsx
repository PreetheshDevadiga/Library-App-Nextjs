import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { fetchRequestDetails } from "@/lib/action";
import { Book } from "lucide-react";
import {getTranslations} from 'next-intl/server';

export default async function Requests() {
  const t = getTranslations('requests')
  let booksList;
  try {
    booksList = await fetchRequestDetails();
  } catch (error) {
    console.error("Failed to fetch request details:", error);
    throw error;
  }

  if (!booksList || booksList.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">{(await t)('bookRequests')}</h1>
        <Card className="w-full bg-[#1A1F36] border-[#2D3348] text-white">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Book className="w-16 h-16 mb-4 text-[#635BFF]" />
            <p className="text-xl text-gray-400">
              {(await t)('noRequestsMessage')}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">{(await t)('bookRequests')}</h1>
      <Card className="w-full bg-[#1A1F36] border-[#2D3348] text-white overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#2D3348] hover:bg-[#242B42]">
                  <TableHead className="w-1/3 text-[#A3ACBF] font-semibold py-4 ">{(await t)('title')}</TableHead>
                  <TableHead className="w-1/3 text-[#A3ACBF] font-semibold py-4 ">{(await t)('author')}</TableHead>
                  <TableHead className="w-1/3 text-[#A3ACBF] font-semibold py-4 text-center">{(await t)('status')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {booksList.map((book) => (
                  <TableRow key={book.id} className="border-b border-[#2D3348] hover:bg-[#242B42] transition-colors">
                    <TableCell className="py-4 font-medium ">{book.title}</TableCell>
                    <TableCell className="py-4 ">{book.author}</TableCell>
                    <TableCell className="py-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        book.status === 'Approved' ? 'bg-[#32D583] bg-opacity-20 text-[#32D583]' :
                        book.status === 'Pending' ? 'bg-[#FFB224] bg-opacity-20 text-[#FFB224]' :
                        'bg-[#FF4757] bg-opacity-20 text-[#FF4757]'
                      }`}>
                        {book.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}