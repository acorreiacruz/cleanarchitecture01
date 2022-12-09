import InventoryPostgresRepository from "../../../src/infra/repositories/InventoryPostgresRepository";
import CreateInventory from "../../../src/usecases/CreateInventory";
import deleteDbTestUtil from "../../../utils/DeleteDBTestUtil";

const callback = async () => {
    await deleteDbTestUtil("inventory", 31);
};

describe("Test CreateInventory using InventoryPostgresRepository", () => {
    beforeEach(callback);
    afterEach(callback);

    test("Testasync  if Inventory can be created", async () => {
        const inventoryPostgresRepository = new InventoryPostgresRepository();
        const createInventory = new CreateInventory(inventoryPostgresRepository);
        expect(
            async () => await inventoryPostgresRepository.getInventory(31),
        ).rejects.toThrow();
        await createInventory.execute(31, 30, 34, 38, 42);
        const inventory = await inventoryPostgresRepository.getInventory(31);
        expect(inventory.getItemByName("water").amount).toBe(30);
        expect(inventory.getItemByName("food").amount).toBe(34);
        expect(inventory.getItemByName("medication").amount).toBe(38);
        expect(inventory.getItemByName("ammunition").amount).toBe(42);
    });

    test("Test if Inventory with same id can't be created twice", async () => {
        const inventoryPostgresRepository = new InventoryPostgresRepository();
        const createInventory = new CreateInventory(inventoryPostgresRepository);
        await createInventory.execute(31, 30, 34, 38, 42);
        expect(
            async () => await createInventory.execute(31, 32, 36, 40, 44),
        ).rejects.toThrow();
    });
});
