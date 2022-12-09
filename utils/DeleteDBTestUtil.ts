import pgdb from "../src/infra/db/PostgresCon";

export default async function deleteDbTestUtil(table: string, id: number) {
    await pgdb.none(`DELETE FROM zssncleanarch.${table} WHERE id=${id}`);
}
