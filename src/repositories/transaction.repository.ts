import { MySql2Database } from "drizzle-orm/mysql2";
import { BooksTable,MemberTable, TransactionTable } from "../drizzle/schema";
import { and, count, eq, sql } from "drizzle-orm";
import { ITransactionRepository } from "./repository";
import { ITransaction, ITransactionBase } from "../models/transaction.model";
import { IPagedResponse, IPageRequest } from "./pagination.response";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";

export class TransactionRepository
  implements ITransactionRepository<ITransactionBase, ITransaction>
{
  constructor(private readonly db: VercelPgDatabase<Record<string, unknown>>) {}

  async create(data: {
    memberId: number;
    bookId: number;
  }): Promise<ITransaction> {
    try {
      console.log("Creating transaction");
      const transaction = {
        ...data,
        status: "Pending",
      };

      const [result] = await this.db
        .insert(TransactionTable)
        .values(transaction)
        .returning({id:TransactionTable.id});
      const [insertedTransaction] = await this.db
        .select()
        .from(TransactionTable)
        .where(eq(TransactionTable.id, result.id));

      if (!insertedTransaction) {
        throw new Error("Failed to retrieve the newly inserted transaction");
      }
      return insertedTransaction as ITransaction;
    } catch (error: any) {
      throw new Error(`Insertion failed: ${error.message}`);
    }
  }

  async issueBook(id: number) {
    try {
      const today = new Date();
      const borrowDate = today.toISOString().slice(0, 10);
      const dueDate = new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000);

      const [transaction] = await this.db
        .select()
        .from(TransactionTable)
        .where(eq(TransactionTable.id, id));

      const [bookDetails] = await this.db
        .select()
        .from(BooksTable)
        .where(eq(BooksTable.id, transaction.bookId));

      await this.db
        .update(BooksTable)
        .set({ availableCopies: bookDetails.availableCopies - 1 })
        .where(eq(BooksTable.id, bookDetails.id));

      await this.db
        .update(TransactionTable)
        .set({
          status: "Issued",
          borrowDate: borrowDate,
          dueDate: dueDate.toISOString().slice(0, 10),
        })
        .where(eq(TransactionTable.id, id));

      return bookDetails;
    } catch (error: any) {
      throw new Error(`Failure in issuing book: ${error.message}`);
    }
  }

  async rejectRequest(id: number) {
    try {
      const [transaction] = await this.db
        .select()
        .from(TransactionTable)
        .where(eq(TransactionTable.id, id));

      const [bookDetails] = await this.db
        .select()
        .from(BooksTable)
        .where(eq(BooksTable.id, transaction.bookId));

      await this.db
        .update(TransactionTable)
        .set({ status: "Rejected", dueDate:null,borrowDate:null })
        .where(eq(TransactionTable.id, id));

      return bookDetails;
    } catch (error: any) {
      throw new Error(`Failure in issuing book: ${error.message}`);
    }
  }

  async getById(id: number): Promise<ITransaction | null> {
    try {
      const [result] = await this.db
        .select()
        .from(TransactionTable)
        .where(eq(TransactionTable.id, id));
      return (result as ITransaction) || null;
    } catch (e: any) {
      throw new Error(`Selection failed: ${e.message}`);
    }
  }

  async update(
    transactionId: number,
    returnDate: string
  ): Promise<ITransaction | null> {
    try {
      await this.db
        .update(TransactionTable)
        .set({ returnDate: returnDate, status: "Returned" })
        .where(
          and(
            eq(TransactionTable.id, transactionId),
            eq(TransactionTable.status, "Issued")
          )
        );
      const [updatedTransaction] = await this.db
        .select()
        .from(TransactionTable)
        .where(eq(TransactionTable.id, transactionId));

      const [bookDetails] = await this.db
        .select()
        .from(BooksTable)
        .where(eq(BooksTable.id, updatedTransaction.bookId));

      await this.db
        .update(BooksTable)
        .set({ availableCopies: bookDetails.availableCopies + 1 })
        .where(eq(BooksTable.id, bookDetails.id));

      if (!updatedTransaction) {
        throw new Error("Failed to retrieve the newly updated transaction");
      }
      return updatedTransaction as ITransaction;
    } catch (e: any) {
      throw new Error(`Selection failed: ${e.message}`);
    }
  }

  async list(params: IPageRequest, status?: string) {
    try {
      console.log(status)
      // Only apply where expression if status is not "All" and not undefined
      const whereExpression = status && status !== "All" ? eq(TransactionTable.status, status) : undefined;
  
      const query = this.db
        .select({
          id: TransactionTable.id,
          title: BooksTable.title,
          firstName: MemberTable.firstName,
          borrowDate: TransactionTable.borrowDate,
          dueDate: TransactionTable.dueDate,
          status: TransactionTable.status,
          returnDate: TransactionTable.returnDate,
        })
        .from(TransactionTable)
        .leftJoin(BooksTable, eq(TransactionTable.bookId, BooksTable.id))
        .leftJoin(MemberTable, eq(TransactionTable.memberId, MemberTable.id))
        .limit(params.limit)
        .offset(params.offset);
  
      // Conditionally add where clause if whereExpression is valid
      if (whereExpression) {
        query.where(whereExpression);
      }
  
      const transactions = await query;
  
      const countQuery = this.db
        .select({ count: count() })
        .from(TransactionTable);
  
      // Apply where clause to count query if necessary
      if (whereExpression) {
        countQuery.where(whereExpression);
      }
  
      const [totalTransactionRows] = await countQuery;
      const totalTransaction = totalTransactionRows.count;
  
      return {
        items: transactions,
        pagination: {
          offset: params.offset,
          limit: params.limit,
          total: totalTransaction,
        },
      };
    } catch (e: any) {
      throw new Error(`Listing Transactions failed: ${e.message}`);
    }
  }
  
  
  // async listByStatus(
  //   status: string,
  //   params: IPageRequest
  // ): Promise<IPagedResponse<ITransaction>> {
  //   try {
  //     const transactions = await this.db
  //       .select()
  //       .from(TransactionTable)
  //       .where(eq(TransactionTable.status, status))
  //       .limit(params.limit)
  //       .offset(params.offset);

  //     const [totalTransactionRows] = await this.db
  //       .select({ count: count() })
  //       .from(TransactionTable)
  //       .where(eq(TransactionTable.status, status));

  //     const totalTransaction = totalTransactionRows.count;
  //     return {
  //       items: transactions as ITransaction[],
  //       pagination: {
  //         offset: params.offset,
  //         limit: params.limit,
  //         total: totalTransaction,
  //       },
  //     };
  //   } catch (e: any) {
  //     throw new Error(`Listing Transactions by Status failed: ${e.message}`);
  //   }
  // }

  async listTransactionDetails(params: IPageRequest): Promise<IPagedResponse<ITransaction>> {
    let searchWhereClause;

    if (params.search) {
      const search = BigInt(params.search);
  
      searchWhereClause = sql`
      (${TransactionTable.bookId} ILIKE ${params.search} 
       OR ${TransactionTable.memberId} ILIKE ${params.search})
      `;
    }
  
    try {
      const transactions = await this.db
        .select()
        .from(TransactionTable)
        .leftJoin(BooksTable, eq(TransactionTable.bookId, BooksTable.id))
        .leftJoin(MemberTable, eq(TransactionTable.memberId, MemberTable.id))
        .where(searchWhereClause)
        .offset(params.offset)
        .limit(params.limit)
        .execute();
  
      if (transactions.length > 0) {
        const [totalTransactionRows] = await this.db
          .select({ count: count() })
          .from(TransactionTable)
          .leftJoin(BooksTable, eq(TransactionTable.bookId, BooksTable.id))
          .leftJoin(MemberTable, eq(TransactionTable.memberId, MemberTable.id))
          .where(searchWhereClause)
          .execute();
  
        const totalTransaction = totalTransactionRows.count;
  
       
        return {
          items: transactions as unknown as ITransaction[],
          pagination: {
            offset: params.offset,
            limit: params.limit,
            total: totalTransaction,
          },
        };
      } else {
        throw new Error("No transactions found matching the criteria");
      }
    } catch (e: any) {
      throw new Error(`Listing Transactions failed: ${e.message}`);
    }
  }

}
