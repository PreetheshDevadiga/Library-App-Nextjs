
import { IProfessorBase,IProfessor}  from "../models/professor.model";
import { IRepository } from "./repository";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { ProfessorTable } from "../drizzle/schema"
import { asc, count, desc, eq, ilike, or, sql } from "drizzle-orm";
import { IPageRequest, IPagedResponse } from "./pagination.response";

export class ProfessorRepository implements IRepository<IProfessorBase, IProfessor>{
    constructor(private readonly db: VercelPgDatabase<Record<string, unknown>>) {}
    update(id: number, data: { name: string; shortBio: string; department: string; calendlylink: string; }): Promise<{ name: string; shortBio: string; department: string; calendlylink: string; id: number; } | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<{ name: string; shortBio: string; department: string; calendlylink: string; id: number; } | null> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<{ name: string; shortBio: string; department: string; calendlylink: string; id: number; } | null> {
        throw new Error("Method not implemented.");
    }
    list(params: IPageRequest): Promise<IPagedResponse<{ name: string; shortBio: string; department: string; calendlylink: string; id: number; }>> {
        throw new Error("Method not implemented.");
    }
    async create(data:IProfessorBase):Promise<IProfessor>{
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