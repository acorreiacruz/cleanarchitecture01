import LocalRepositoryInMemory from "../../../src/infra/repositories/LocalRepositoryInMemory";
import CreateLocal from "../../../src/usecases/CreateLocal";

describe("Test CreateLocal using LocalRepositoryInMemory", () => {
    test("Test if CreateLocal can create a local", async () => {
        const localRepositoryInMemory = new LocalRepositoryInMemory();
        const createLocal = new CreateLocal(localRepositoryInMemory);
        expect(() => localRepositoryInMemory.getLocal(6)).rejects.toThrow();
        await createLocal.execute(6, 89.516, 115.253);
        const local = await localRepositoryInMemory.getLocal(6);
        expect(local.getLatitude()).toBe(89.516);
        expect(local.getLongitude()).toBe(115.253);
    });

    test("Test if CreateLocal can't create the same local twice", async () => {
        const localRepositoryInMemory = new LocalRepositoryInMemory();
        const createLocal = new CreateLocal(localRepositoryInMemory);
        await createLocal.execute(6, 45.98, 115.1);
        expect(async () => await createLocal.execute(6, 45.98, 115.1)).rejects.toThrow();
    });
});
