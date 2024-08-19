import { ConflictError } from "./ConflictError";
import { PrismaClientError } from "./PrismaClientError";

export class UniqueConstraintError extends ConflictError {

  constructor( e: PrismaClientError ) {
    const uniqueFielt = e.meta.target;

    super(`A record with this ${uniqueFielt} aready exists.`);

  }
}