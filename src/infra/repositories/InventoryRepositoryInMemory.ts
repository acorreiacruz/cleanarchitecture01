import Inventory from "../../entities/Inventory";
import Item from "../../entities/Item";
import InventoryRepository from "./InventoryRepository";

type InventoryData = {
    id: number;
    water: number;
    food: number;
    medication: number;
    ammunition: number;
};

export default class InventoryRepositoryInMemory implements InventoryRepository {
    private inventories: InventoryData[] = [
        {
            id: 1,
            water: 15,
            food: 12,
            medication: 35,
            ammunition: 50,
        },
        {
            id: 2,
            water: 15,
            food: 12,
            medication: 35,
            ammunition: 50,
        },
        {
            id: 3,
            water: 15,
            food: 12,
            medication: 35,
            ammunition: 50,
        },
        {
            id: 4,
            water: 15,
            food: 12,
            medication: 35,
            ammunition: 50,
        },
        {
            id: 5,
            water: 25,
            food: 22,
            medication: 32,
            ammunition: 58,
        },
    ];

    private alreadyExists(id: number) {
        const inventory = this.inventories.find((data) => data.id === id);
        if (inventory) return true;
        return false;
    }

    async getInventory(id: number): Promise<Inventory> {
        const inventoryData = await this.inventories.find((data) => data.id == id);
        if (!inventoryData) throw Error("There is no inventory with this id !");
        const inventory = new Inventory();
        inventory.addItem(new Item("water", 5, inventoryData.water));
        inventory.addItem(new Item("food", 4, inventoryData.food));
        inventory.addItem(new Item("medication", 3, inventoryData.medication));
        inventory.addItem(new Item("ammunition", 2, inventoryData.ammunition));
        return Promise.resolve(inventory);
    }

    async saveInventory(
        id: number,
        water: number,
        food: number,
        medication: number,
        ammunition: number,
    ): Promise<void> {
        if (this.alreadyExists(id))
            throw Error("A Inventory already exists with this id !");
        this.inventories.push({
            id: id,
            water: water,
            food: food,
            medication: medication,
            ammunition: ammunition,
        });
    }

    async updateInventory(
        id: number,
        water: number,
        food: number,
        medication: number,
        ammunition: number,
    ): Promise<void> {
        this.inventories.find((data) => {
            if (data.id === id) {
                data.water = water;
                data.food = food;
                data.medication = medication;
                data.ammunition = ammunition;
            }
        });
    }
}
