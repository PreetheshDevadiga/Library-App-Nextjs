
import { IProfessorBase,IProfessor}  from "../models/professor.model";
import { IRepository } from "./repository";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { ProfessorTable } from "../drizzle/schema"
import { asc, count, desc, eq, ilike, or, sql } from "drizzle-orm";
import { IPageRequest, IPagedResponse } from "./pagination.response";

export class ProfessorRepository {
    constructor(private readonly db: VercelPgDatabase<Record<string, unknown>>) {}
    
    async create(data:IProfessorBase){
        const newProfessordata: Omit<IProfessor, "id"> = {
            ...data,
          };
          const [queryResult] = await this.db
        .insert(ProfessorTable)
        .values(newProfessordata)
        .returning({id:ProfessorTable.id});
      const [insertedProfessor] = await this.db
        .select()
        .from(ProfessorTable)
        .where(eq(ProfessorTable.id, queryResult.id));

      if (!insertedProfessor) {
        throw new Error("Failed to retrive the newly inserted Professor");
      }
      return insertedProfessor;
    } catch (e: any) {
      throw new Error(`Insertion failed: ${e.message}`);
    }
    
}