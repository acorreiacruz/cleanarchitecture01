import InventoryRepository from "../infra/repositories/InventoryRepository";

export default class CreateInventory {
    private inventoryRepository: InventoryRepository;
    constructor(inventoryRepository: InventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    async execute(
        id: number,
        water: number,
        food: number,
        medication: number,
        ammunition: number,
    ) {
        await this.inventoryRepository.saveInventory(
            id,
            water,
            food,
            medication,
            ammunition,
        );
    }
}
