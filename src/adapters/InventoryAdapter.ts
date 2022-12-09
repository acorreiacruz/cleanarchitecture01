import Inventory from "../entities/Inventory";
import Item from "../entities/Item";

export default class InventoryAdapter {
    static create(
        waterAmount: number,
        foodAmount: number,
        medicationAmount: number,
        ammunitionAmount: number,
    ): Inventory {
        const inventory = new Inventory();
        inventory.addItem(new Item("water", 5, waterAmount));
        inventory.addItem(new Item("food", 4, foodAmount));
        inventory.addItem(new Item("medication", 3, medicationAmount));
        inventory.addItem(new Item("ammunition", 2, ammunitionAmount));
        return inventory;
    }
}
