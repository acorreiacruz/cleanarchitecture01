import pgPromise from "pg-promise";
const pgp = pgPromise({});
const pgdb = pgp("postgres://user:user12345@localhost:54320/postgres");
export default pgdb;
