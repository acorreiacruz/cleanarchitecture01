import LocalPostgresRepository from "../../../src/infra/repositories/LocalPostgresRepository";
import CreateLocal from "../../../src/usecases/CreateLocal";
import pgdb from "../../../src/infra/db/PostgresCon";
import deleteDbTestUtil from "../../../utils/DeleteDBTestUtil";

const callback = async () => {
    await deleteDbTestUtil("local", 45);
};

describe("Test CreateLocal using PostgreSQL repository", () => {
    beforeEach(callback);
    afterEach(callback);

    test("Test if CreateLocal create a Local", async () => {
        await pgdb.none("DELETE FROM zssncleanarch.local WHERE id=$1", [45]);
        const localPostgresRepository = new LocalPostgresRepository();
        const createLocal = new CreateLocal(localPostgresRepository);
        expect(async () => await localPostgresRepository.getLocal(45)).rejects.toThrow();
        await createLocal.execute(45, 54.6138, -162.8401);
        const local = await localPostgresRepository.getLocal(45);
        expect(local.getLatitude()).toBe(54.6138);
        expect(local.getLongitude()).toBe(-162.8401);
        await pgdb.none("DELETE FROM zssncleanarch.local WHERE id=$1", [45]);
    });

    test("Test if CreateLocal can't create the same local twice with the same id", async () => {
        await pgdb.none("DELETE FROM zssncleanarch.local WHERE id=$1", [45]);
        const localPostgresRepository = new LocalPostgresRepository();
        const createLocal = new CreateLocal(localPostgresRepository);
        await createLocal.execute(45, 45.98, 115.1);
        expect(async () => await createLocal.execute(45, 45.98, 115.1)).rejects.toThrow();
        await pgdb.none("DELETE FROM zssncleanarch.local WHERE id=$1", [45]);
    });
});
