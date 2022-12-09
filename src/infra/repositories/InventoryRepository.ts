import Inventory from "../../entities/Inventory";

export default interface InventoryRepository {
    saveInventory(
        id: number,
        water: number,
        food: number,
        medication: number,
        ammunition: number,
    ): Promise<void>;

    getInventory(id: number): Promise<Inventory>;

    updateInventory(
        id?: number,
        water?: number,
        food?: number,
        medication?: number,
        ammunition?: number,
    ): Promise<void>;
}
