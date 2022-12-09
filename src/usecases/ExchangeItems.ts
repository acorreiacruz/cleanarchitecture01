import Exchange from "../entities/Exchange";
import Inventory from "../entities/Inventory";
import Offer from "../entities/Offer";
import InventoryRepository from "../infra/repositories/InventoryRepository";

export default class ExchangeItems {
    private inventoryRepository: InventoryRepository;

    constructor(inventoryRepository: InventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    async execute(
        offer1: Offer,
        inventoryId1: number,
        offer2: Offer,
        inventoryId2: number,
    ) {
        const exchange = new Exchange(offer1, offer2);
        exchange.perform();
        await this.performInventoryUpdate(offer1.survivor.inventory, inventoryId1);
        await this.performInventoryUpdate(offer2.survivor.inventory, inventoryId2);
    }

    async performInventoryUpdate(inventory: Inventory, inventoryId: number) {
        await this.inventoryRepository.updateInventory(
            inventoryId,
            inventory.getItemByName("water")?.amount,
            inventory.getItemByName("food")?.amount,
            inventory.getItemByName("medication")?.amount,
            inventory.getItemByName("ammunition")?.amount,
        );
    }
}
