import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { fetchTransaction, fetchTransactionByStatus } from "../../../lib/action";
import { SearchBar } from "../../../components/home/search";
import PaginationControls from "../../../components/home/pagination";
import { DeleteTransaction } from "../../../components/admin/transactions/deleteTransaction";
import { AproveTransactionButton } from "../../../components/admin/transactions/aproveTransaction"
import { RejectRequestButton } from "../../../components/admin/transactions/rejectRequest";
import FilterTransaction from "../../../components/admin/transactions/filterTransactions";

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

  const currentPage = Number(searchParams?.page) || 1;
  const limit = 6;
  const offset = (Number(currentPage) - 1) * limit;
    const transactionResponse= await fetchTransaction(query,limit,offset);



  const transactionList = transactionResponse?.items || [];
  const totalTransactions = Number(transactionResponse?.pagination.total);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <SearchBar />
        {/* <FilterTransaction /> */}
      </div>
      <div className="rounded-md bg-white border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Book Name</TableHead>
              <TableHead>Member Name</TableHead>
              <TableHead>Borrow Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Return Date</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {totalTransactions > 0 ? (
              transactionList.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.bookId}
                  </TableCell>
                  <TableCell>{transaction.memberId}</TableCell>
                  <TableCell>{transaction.borrowDate}</TableCell>
                  <TableCell>{transaction.dueDate}</TableCell>
                  <TableCell>{transaction.status}</TableCell>
                  <TableCell>{transaction.returnDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-center space-x-2">
                    <AproveTransactionButton transaction={transaction}/>
                    <RejectRequestButton transaction={transaction}/>
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
