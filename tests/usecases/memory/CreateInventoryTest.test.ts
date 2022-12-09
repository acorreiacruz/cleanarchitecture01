import InventoryRepositoryInMemory from "../../../src/infra/repositories/InventoryRepositoryInMemory";
import CreateInventory from "../../../src/usecases/CreateInventory";

describe("Test CreateInventory using InventoryRepoInMemory", () => {
    test("Test if a Inventory can be created", async () => {
        const inventoryRepositoryInMemory = new InventoryRepositoryInMemory();
        const createInventory = new CreateInventory(inventoryRepositoryInMemory);
        await createInventory.execute(10, 12, 13, 14, 15);
        const inventory = await inventoryRepositoryInMemory.getInventory(10);
        expect(inventory.getItemByName("water")?.amount).toBe(12);
        expect(inventory.getItemByName("food")?.amount).toBe(13);
        expect(inventory.getItemByName("medication")?.amount).toBe(14);
        expect(inventory.getItemByName("ammunition")?.amount).toBe(15);
    });

    test("Test if a Inventory that already exists can't be created again", () => {
        const inventoryRepositoryInMemory = new InventoryRepositoryInMemory();
        const createInventory = new CreateInventory(inventoryRepositoryInMemory);
        expect(() => createInventory.execute(3, 12, 13, 14, 15)).rejects.toThrow();
    });
});
