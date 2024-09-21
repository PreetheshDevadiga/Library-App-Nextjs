import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { fetchTransactionDetails, fetchTransactionByStatus, fetchTransaction } from "../../../lib/action";
import { SearchBar } from "../../../components/home/search";
import PaginationControls from "../../../components/home/pagination";
import { DeleteTransaction } from "../../../components/admin/transactions/deleteTransaction";
import { AproveTransactionButton } from "../../../components/admin/transactions/aproveTransaction"
import { RejectRequestButton } from "../../../components/admin/transactions/rejectRequest";
import FilterTransaction from "@/components/admin/transactions/filterTransactions";
import { Badge } from "@/components/ui/badge";
import { ReturnBookButton } from "@/components/home/returnBookButton"

async function TransactionTable({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    filter?:string;
  };
}) {
  const query: string = searchParams?.query || "";
  const filterOption=searchParams?.filter
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 6;
  const offset = (Number(currentPage) - 1) * limit;
    const transactionResponse= await fetchTransactionByStatus(filterOption,query,limit,offset);

  const transactionList = transactionResponse?.items || [];
  const totalTransactions =Number(transactionResponse?.pagination.total);

  const getStatusBadge = (status: string) => {
    type StatusType = 'pending' | 'issued' | 'rejected' | 'returned' | 'overdue';

    const statusColors = {
      pending: "bg-yellow-500",
      issued: "bg-green-500",
      rejected: "bg-red-500",
      returned: "bg-blue-500",
      overdue: "bg-purple-500",
    };

    const statusKey = status.toLowerCase() as StatusType;

    return (
      <Badge className={`${statusColors[statusKey] || "bg-gray-500"} text-white`}>
      {status}
    </Badge>
    );
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-end items-center mb-4">
        <FilterTransaction />
      </div>
      <div className="rounded-md bg-white border shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
            <TableHead>Transaction ID</TableHead>
              <TableHead className="w-[150px]">Book Name</TableHead>
              <TableHead>Member Name</TableHead>
              <TableHead>Borrow Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Return Date</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {totalTransactions > 0 ? (
              transactionList.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="text-center">{transaction.id}</TableCell>
                  <TableCell className="font-medium">
                    {transaction.title}
                  </TableCell>
                  <TableCell>{transaction.firstName}</TableCell>
                  <TableCell>{transaction.borrowDate}</TableCell>
                  <TableCell>{transaction.dueDate}</TableCell>
                  <TableCell>{transaction.returnDate}</TableCell>
                  <TableCell className="text-center">{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-center space-x-2">
                    <ReturnBookButton bookId={transaction.bookId} bookTitle={transaction.title!} />
                    <AproveTransactionButton transaction={transaction} bookTitle={transaction.title}/>
                    <RejectRequestButton transaction={transaction} bookTitle={transaction.title}/>
                      <DeleteTransaction
                        transactionId={Number(transaction.id)}
                        />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-black">
                  No Transaction found for `{query}`
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {totalTransactions > 0 && (
        <div className="mt-4">
          <PaginationControls totalBooks={totalTransactions} limit={limit} />
        </div>
      )}
    </div>
  );
}

export default TransactionTable;
