import Item from "../../src/entities/Item";

describe("Item tests", () => {
    test("Test if a Item can be created", () => {
        const item = new Item("water", 5, 14);
        expect(item.name).toBe("water");
        expect(item.value).toBe(5);
        expect(item.amount).toBe(14);
    });

    test("Test if a Item can't be created with a invalid name", () => {
        expect(() => new Item("ak-47", 5, 14)).toThrow();
    });

    test("Test if a Item can't be created with a invalid value", () => {
        expect(() => new Item("water", -5, 14)).toThrow();
    });

    test("Test if a Item can't be created with a invalid amount", () => {
        expect(() => new Item("water", 5, -14)).toThrow();
    });

    test("Test if Item total points is correct", () => {
        const item = new Item("water", 5, 14);
        expect(item.totalPoints()).toBe(70);
    });

    test("Test if Item amount can be increased", () => {
        const item = new Item("water", 5, 14);
        item.increaseAmount(5);
        expect(item.amount).toBe(19);
    });

    test("Test if Item amount can be decreased", () => {
        const item = new Item("water", 5, 14);
        item.decreaseAmount(5);
        expect(item.amount).toBe(9);
    });

    test("Test if Item increase ou decrease amount cannot be a negative number", () => {
        const item = new Item("water", 5, 14);
        expect(() => item.decreaseAmount(-5)).toThrow();
        expect(() => item.increaseAmount(-5)).toThrow();
    });
});
