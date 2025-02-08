import { DB } from "@/types/db";
import { Kysely } from "kysely";
import { dialect } from "./dialect";

const db = new Kysely<DB>({
	dialect,
});

export default db;
