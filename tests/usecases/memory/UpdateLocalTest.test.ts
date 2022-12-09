import LocalRepositoryInMemory from "../../../src/infra/repositories/LocalRepositoryInMemory";
import UpdateLocal from "../../../src/usecases/UpdateLocal";

describe("UpdateLocal test using repository in memory", () => {
    test("Test if UpdateLocal can be created", async () => {
        const localRepositoryInMemory = new LocalRepositoryInMemory();
        const updateLocal = new UpdateLocal(localRepositoryInMemory);
        updateLocal.execute(1, 45.89, 108.15);
        const local = await localRepositoryInMemory.getLocal(1);
        expect(local.getLatitude()).toBe(45.89);
        expect(local.getLongitude()).toBe(108.15);
    });
});
