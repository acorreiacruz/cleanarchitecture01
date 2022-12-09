import InventoryRepositoryInMemory from "../../../src/infra/repositories/InventoryRepositoryInMemory";
import LocalRepositoryInMemory from "../../../src/infra/repositories/LocalRepositoryInMemory";
import SurvivorRepositoryInMemory from "../../../src/infra/repositories/SurvivorRepositoryInMemory";
import CreateSurvivor from "../../../src/usecases/CreateSurvivor";

describe("Test CreateSurvivor", () => {
    test("Test if CreateSurvivor create a survivor", async () => {
        const inventoryRepository = new InventoryRepositoryInMemory();
        const localRepository = new LocalRepositoryInMemory();
        const survivorRepository = new SurvivorRepositoryInMemory(
            localRepository,
            inventoryRepository,
        );
        const createSurvivor = new CreateSurvivor(survivorRepository);
        await createSurvivor.execute(12, "Survivor", 45, "M", 1, false, 5, 5);
        const survivor = await survivorRepository.getSurvivor(12);
        expect(survivor.age).toBe(45);
        expect(survivor.isAlive()).toBeTruthy();
        expect(survivor.sex).toBe("M");
    });

    test("Test if CreateSurvivor can't create a survivor with same id twice", async () => {
        const survivorRepository = new SurvivorRepositoryInMemory(
            new LocalRepositoryInMemory(),
            new InventoryRepositoryInMemory(),
        );
        const createSurvivor = new CreateSurvivor(survivorRepository);
        await createSurvivor.execute(12, "Survivor", 45, "M", 1, false, 5, 5);
        expect(
            async () =>
                await createSurvivor.execute(12, "Survivor", 45, "M", 1, false, 5, 5),
        ).rejects.toThrow();
    });
});
