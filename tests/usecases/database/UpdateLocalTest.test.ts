import pgdb from "../../../src/infra/db/PostgresCon";
import LocalPostgresRepository from "../../../src/infra/repositories/LocalPostgresRepository";
import UpdateLocal from "../../../src/usecases/UpdateLocal";

describe("UpdateLocal test using PostgreSQL repository", () => {
    afterEach(async () => {
        await pgdb.none(
            "UPDATE zssncleanarch.local SET coordinates=POINT($1, $2) WHERE id=$3",
            [82.245, -16.9326, 1],
        );
    });
    test("Test if UpdateLocal can be created", async () => {
        const localPostgresRepository = new LocalPostgresRepository();
        const updateLocal = new UpdateLocal(localPostgresRepository);
        const localBeforeUpdate = await localPostgresRepository.getLocal(1);
        expect(localBeforeUpdate.getLatitude()).toBe(82.245);
        expect(localBeforeUpdate.getLongitude()).toBe(-16.9326);
        await updateLocal.execute(1, -36.2675, 165.9858);
        const localAfterUpdate = await localPostgresRepository.getLocal(1);
        expect(localAfterUpdate.getLatitude()).toBe(-36.2675);
        expect(localAfterUpdate.getLongitude()).toBe(165.9858);
    });
});
