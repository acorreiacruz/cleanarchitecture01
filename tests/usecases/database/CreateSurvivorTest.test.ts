import InventoryPostgresRepository from "../../../src/infra/repositories/InventoryPostgresRepository";
import LocalPostgresRepository from "../../../src/infra/repositories/LocalPostgresRepository";
import SurvivorPostgresRepository from "../../../src/infra/repositories/SurvivorPostgresRepository";
import CreateSurvivor from "../../../src/usecases/CreateSurvivor";
import deleteDbTestUtil from "../../../utils/DeleteDBTestUtil";

const callback = async () => {
    await deleteDbTestUtil("survivor", 31);
};

describe("Test CreateSurvivor using PostgresSQL repository", () => {
    beforeEach(callback);
    afterEach(callback);
    test("Test if CreateSurvivor create a survivor", async () => {
        const inventoryPostgresRepository = new InventoryPostgresRepository();
        const localPostgresRepository = new LocalPostgresRepository();
        const survivorPostgresRepository = new SurvivorPostgresRepository(
            localPostgresRepository,
            inventoryPostgresRepository,
        );
        const createSurvivor = new CreateSurvivor(survivorPostgresRepository);
        await createSurvivor.execute(31, "Survivor 31", 45, "M", 1, false, 40, 40);
        const survivor = await survivorPostgresRepository.getSurvivor(31);
        expect(survivor.age).toBe(45);
        expect(survivor.isAlive()).toBeTruthy();
        expect(survivor.sex).toBe("M");
        expect(survivor.name).toBe("Survivor 31");
    });

    test("Test if CreateSurvivor can't create a survivor with same id twice", async () => {
        const survivorRepository = new SurvivorPostgresRepository(
            new LocalPostgresRepository(),
            new InventoryPostgresRepository(),
        );
        const createSurvivor = new CreateSurvivor(survivorRepository);
        await createSurvivor.execute(31, "Survivor 31", 45, "M", 1, false, 40, 40);
        expect(
            async () =>
                await createSurvivor.execute(
                    31,
                    "Survivor 31",
                    45,
                    "M",
                    1,
                    false,
                    40,
                    40,
                ),
        ).rejects.toThrow();
    });
});
