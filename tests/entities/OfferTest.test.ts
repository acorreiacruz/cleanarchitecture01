import Offer from "../../src/entities/Offer";
import Inventory from "../../src/entities/Inventory";
import Item from "../../src/entities/Item";
import Local from "../../src/entities/Local";
import Survivor from "../../src/entities/Survivor";

describe("Offer test", () => {
    test("Test if a survivor can offer items", () => {
        const inventory = new Inventory();
        inventory.addItem(new Item("water", 5, 14));
        inventory.addItem(new Item("food", 4, 14));
        inventory.addItem(new Item("medication", 3, 14));
        inventory.addItem(new Item("ammunition", 2, 14));
        const survivor = new Survivor("Jhon", 45, "M", new Local(14, 115), inventory);
        const offer = new Offer(survivor);
        expect(offer.survivorOffers.offers).toHaveLength(0);
        offer.offerItem("water", 5);
        offer.offerItem("food", 8);
        offer.offerItem("medication", 4);
        expect(offer.survivorOffers.offers).toHaveLength(3);
    });

    test("Test if a survivor can't offer item that there is no enough amount", () => {
        const inventory = new Inventory();
        inventory.addItem(new Item("water", 5, 14));
        inventory.addItem(new Item("food", 4, 14));
        inventory.addItem(new Item("medication", 3, 14));
        inventory.addItem(new Item("ammunition", 2, 14));
        const survivor = new Survivor("Jhon", 45, "M", new Local(14, 115), inventory);
        const offer = new Offer(survivor);
        expect(() => offer.offerItem("water", 15)).toThrow();
    });

    test("Test if a infected survivor(zombie) can't offer items", () => {
        const inventory = new Inventory();
        inventory.addItem(new Item("water", 5, 14));
        inventory.addItem(new Item("food", 4, 14));
        inventory.addItem(new Item("medication", 3, 14));
        inventory.addItem(new Item("ammunition", 2, 14));
        const survivor = new Survivor("Jhon", 45, "M", new Local(14, 115), inventory);
        survivor.setInfected(true);
        expect(() => new Offer(survivor)).toThrow();
    });

    test("Test if  survivor offers can be cleared", () => {
        const inventory = new Inventory();
        inventory.addItem(new Item("water", 5, 14));
        inventory.addItem(new Item("food", 4, 14));
        inventory.addItem(new Item("medication", 3, 14));
        inventory.addItem(new Item("ammunition", 2, 14));
        const survivor = new Survivor("Jhon", 45, "M", new Local(14, 115), inventory);
        const offer = new Offer(survivor);
        offer.offerItem("water", 5);
        offer.offerItem("food", 8);
        offer.offerItem("medication", 4);
        offer.clearOffers();
        expect(offer.survivorOffers.offers).toHaveLength(0);
    });

    test("Test if  Offer total points can be calculated", () => {
        const inventory = new Inventory();
        inventory.addItem(new Item("water", 5, 14));
        inventory.addItem(new Item("food", 4, 14));
        inventory.addItem(new Item("medication", 3, 14));
        inventory.addItem(new Item("ammunition", 2, 14));
        const survivor = new Survivor("Jhon", 45, "M", new Local(14, 115), inventory);
        const offer = new Offer(survivor);
        offer.offerItem("water", 5); // 25
        offer.offerItem("food", 8); // 32
        offer.offerItem("medication", 4); // 12
        expect(offer.totalPoints()).toBe(69);
    });

    test("Test if a item with invalid name can't be offerted", () => {
        const inventory = new Inventory();
        inventory.addItem(new Item("water", 5, 14));
        inventory.addItem(new Item("food", 4, 14));
        inventory.addItem(new Item("medication", 3, 14));
        inventory.addItem(new Item("ammunition", 2, 14));
        const survivor = new Survivor("Jhon", 45, "M", new Local(14, 115), inventory);
        const offer = new Offer(survivor);
        expect(() => offer.offerItem("invalid", 5)).toThrow();
    });
});
