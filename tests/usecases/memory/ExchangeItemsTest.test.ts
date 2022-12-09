import ExchangeItems from "../../../src/usecases/ExchangeItems";
import Offer from "../../../src/entities/Offer";
import SurvivorRepositoryInMemory from "../../../src/infra/repositories/SurvivorRepositoryInMemory";
import InventoryRepositoryInMemory from "../../../src/infra/repositories/InventoryRepositoryInMemory";
import LocalRepositoryInMemory from "../../../src/infra/repositories/LocalRepositoryInMemory";

describe("Test ExchangeItens using repository in memory", () => {
    test("Test if ExchangeItens can be created", async () => {
        const localRepoInMemory = new LocalRepositoryInMemory();
        const inventoryRepoInMemory = new InventoryRepositoryInMemory();
        const survivorRepoInMemory = new SurvivorRepositoryInMemory(
            localRepoInMemory,
            inventoryRepoInMemory,
        );
        const exchangeItems = new ExchangeItems(inventoryRepoInMemory);
        const survivor1 = await survivorRepoInMemory.getSurvivor(1);
        const survivor2 = await survivorRepoInMemory.getSurvivor(2);
        const offer1 = new Offer(survivor1);
        offer1.offerItem("water", 8);
        const offer2 = new Offer(survivor2);
        offer2.offerItem("food", 10);
        exchangeItems.execute(offer1, 1, offer2, 2);
        const inventory1 = await inventoryRepoInMemory.getInventory(1);
        const inventory2 = await inventoryRepoInMemory.getInventory(2);
        expect(inventory1.getItemByName("water")?.amount).toBe(7);
        expect(inventory1.getItemByName("food")?.amount).toBe(22);
        expect(inventory2.getItemByName("water")?.amount).toBe(23);
        expect(inventory2.getItemByName("food")?.amount).toBe(2);
    });
});
