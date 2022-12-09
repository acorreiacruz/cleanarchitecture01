import Inventory from "../../src/entities/Inventory";
import Item from "../../src/entities/Item";
import Survivor from "../../src/entities/Survivor";
import Local from "../../src/entities/Local";
import Offer from "../../src/entities/Offer";
import Exchange from "../../src/entities/Exchange";

describe("Test exchange", () => {
    test("Test if survivor can exchange items", () => {
        const inventory1 = new Inventory();
        inventory1.addItem(new Item("water", 5, 10));
        inventory1.addItem(new Item("food", 4, 12));
        inventory1.addItem(new Item("medication", 3, 13));
        inventory1.addItem(new Item("ammunition", 2, 15));
        const survivor1 = new Survivor(
            "Survivor01",
            25,
            "M",
            new Local(45, 115),
            inventory1,
        );
        const inventory2 = new Inventory();
        inventory2.addItem(new Item("water", 5, 20));
        inventory2.addItem(new Item("food", 4, 21));
        inventory2.addItem(new Item("medication", 3, 22));
        inventory2.addItem(new Item("ammunition", 2, 23));
        const survivor2 = new Survivor(
            "Survivor01",
            25,
            "M",
            new Local(45, 115),
            inventory2,
        );

        const offer1 = new Offer(survivor1);
        offer1.offerItem("water", 6); // 30 points
        offer1.offerItem("food", 8); // 32 points
        offer1.offerItem("medication", 4); // 12 points
        expect(offer1.totalPoints()).toBe(74);

        const offer2 = new Offer(survivor2);
        offer2.offerItem("food", 10); // 40 points
        offer2.offerItem("ammunition", 17); // 34 points
        expect(offer2.totalPoints()).toBe(74);

        const exchange = new Exchange(offer1, offer2);
        exchange.perform();

        expect(survivor2.inventory.getItemByName("water")?.amount).toBe(26);
        expect(survivor2.inventory.getItemByName("medication")?.amount).toBe(26);
        expect(survivor2.inventory.getItemByName("food")?.amount).toBe(19);
        expect(survivor2.inventory.getItemByName("ammunition")?.amount).toBe(6);

        expect(survivor1.inventory.getItemByName("ammunition")?.amount).toBe(32);
        expect(survivor1.inventory.getItemByName("food")?.amount).toBe(14);
        expect(survivor1.inventory.getItemByName("water")?.amount).toBe(4);
        expect(survivor1.inventory.getItemByName("medication")?.amount).toBe(9);
    });
});
