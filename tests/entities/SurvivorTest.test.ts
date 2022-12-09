import Inventory from "../../src/entities/Inventory";
import Item from "../../src/entities/Item";
import Local from "../../src/entities/Local";
import Survivor from "../../src/entities/Survivor";

describe("Test Survivor", () => {
    test("Testing if Survivor can be criated", () => {
        const local = new Local(12, 45);
        const inventory = new Inventory();
        inventory.addItem(new Item("water", 5, 10));
        inventory.addItem(new Item("food", 4, 12));
        inventory.addItem(new Item("medication", 3, 13));
        inventory.addItem(new Item("ammunition", 2, 15));
        const survivor = new Survivor("Survivor01", 25, "M", local, inventory);
        expect(survivor.name).toBe("Survivor01");
        expect(survivor.isAlive()).toBeTruthy();
        expect(survivor.sex).toBe("M");
    });

    test("Testing if Survivor can't be criated with a invalid sex value", () => {
        const local = new Local(12, 45);
        const inventory = new Inventory();
        inventory.addItem(new Item("water", 5, 10));
        expect(() => new Survivor("Survivor01", 25, "G", local, inventory)).toThrow();
    });

    test("Testing if Survivor can't be criated with a invalid age value", () => {
        const local = new Local(12, 45);
        const inventory = new Inventory();
        inventory.addItem(new Item("water", 5, 10));
        expect(() => new Survivor("Survivor01", 0, "M", local, inventory)).toThrow();
    });
});
