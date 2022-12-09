import Inventory from "../../src/entities/Inventory";
import Item from "../../src/entities/Item";

describe("Test Inventory", () => {
    test("Test if Inventory can be created", () => {
        const inventory = new Inventory();
        inventory.addItem(new Item("water", 5, 18));
        inventory.addItem(new Item("food", 4, 10));
        inventory.addItem(new Item("medication", 3, 8));
        inventory.addItem(new Item("ammunition", 2, 25));
        expect(inventory.items).toHaveLength(4);
        expect(inventory.totalPoints()).toBe(204);
    });

    test("Test if Inventory don't let the same item be added twice", () => {
        const inventory = new Inventory();
        inventory.addItem(new Item("water", 5, 18));
        expect(() => inventory.addItem(new Item("water", 5, 18))).toThrow();
    });
});
