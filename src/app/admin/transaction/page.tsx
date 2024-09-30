import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchTransactionByStatus } from "@/lib/action";
import PaginationControls from "@/components/home/pagination";
import { DeleteTransaction } from "@/components/admin/transactions/deleteTransaction";
import { AproveTransactionButton } from "@/components/admin/transactions/aproveTransaction"
import { RejectRequestButton } from "@/components/admin/transactions/rejectRequest";
import FilterTransaction from "@/components/admin/transactions/filterTransactions";
import { Badge } from "@/components/ui/badge";
import { ReturnBookButton } from "@/components/admin/transactions/returnBookButton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function TransactionTable({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    filter?: string;
  };
}) {
  const query: string = searchParams?.query || "";
  const filterOption = searchParams?.filter;
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 6;
  const offset = (Number(currentPage) - 1) * limit;
  const transactionResponse = await fetchTransactionByStatus(filterOption, query, limit, offset);

  const transactionList = transactionResponse?.items || [];
  const totalTransactions = Number(transactionResponse?.pagination.total);

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
    <div className="container mx-auto px-4 py-8 bg-[#0A2540]">
      <Card className="bg-[#1A1F36] border-[#2D3348] shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle className="text-2xl font-bold text-white">All Transactions</CardTitle>
          <FilterTransaction />
        </CardHeader>
        <CardContent>
          <div className="rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#2D3348] hover:bg-[#242B42]">
                  <TableHead className="text-[#A3ACBF]">Transaction ID</TableHead>
                  <TableHead className="w-[150px] text-[#A3ACBF]">Book Name</TableHead>
                  <TableHead className="text-[#A3ACBF]">Member Name</TableHead>
                  <TableHead className="text-[#A3ACBF]">Borrow Date</TableHead>
                  <TableHead className="text-[#A3ACBF]">Due Date</TableHead>
                  <TableHead className="text-[#A3ACBF]">Return Date</TableHead>
                  <TableHead className="text-center text-[#A3ACBF]">Status</TableHead>
                  <TableHead className="text-center text-[#A3ACBF]">Return</TableHead>
                  <TableHead className="text-center text-[#A3ACBF]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {totalTransactions > 0 ? (
                  transactionList.map((transaction) => (
                    <TableRow key={transaction.id} className="border-b border-[#2D3348] hover:bg-[#242B42]">
                      <TableCell className="text-center text-white">{transaction.id}</TableCell>
                      <TableCell className="font-medium text-white">
                        {transaction.title}
                      </TableCell>
                      <TableCell className="text-white">{transaction.firstName}</TableCell>
                      <TableCell className="text-white">{transaction.borrowDate}</TableCell>
                      <TableCell className="text-white">{transaction.dueDate}</TableCell>
                      <TableCell className="text-white">{transaction.returnDate}</TableCell>
                      <TableCell className="text-center">{getStatusBadge(transaction.status)}</TableCell>
                      <TableCell className="text-center"><ReturnBookButton bookId={transaction.bookId} bookTitle={transaction.title!} transactionStatus={transaction.status}/>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-center space-x-2">
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
                    <TableCell colSpan={9} className="text-center text-[#A3ACBF]">
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
        </CardContent>
      </Card>
    </div>
  );
}

export default TransactionTable;