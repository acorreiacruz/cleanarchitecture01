import Local from "../../src/entities/Local";

describe("Test Local", () => {
    test("Testing if Local can be criated", () => {
        const local = new Local(12, 45);
        expect(local.getLatitude()).toBe(12);
        expect(local.getLongitude()).toBe(45);
    });

    test("Testing if Local can't be criated with a invalid latitude", () => {
        expect(() => new Local(-90.1, 45)).toThrow();
    });

    test("Testing if Local can't be criated with a invalid longitude", () => {
        expect(() => new Local(-90, 180.1)).toThrow();
    });

    test("Testing if Local latitude and longitude values can be updated", () => {
        const local = new Local(12, 45);
        expect(local.getLatitude()).toBe(12);
        expect(local.getLongitude()).toBe(45);
        local.updateLocal(49, 115);
        expect(local.getLatitude()).toBe(49);
        expect(local.getLongitude()).toBe(115);
    });

    test("Testing if only Local latitude value can be updated", () => {
        const local = new Local(12, 45);
        expect(local.getLatitude()).toBe(12);
        expect(local.getLongitude()).toBe(45);
        local.updateLocal(49);
        expect(local.getLatitude()).toBe(49);
        expect(local.getLongitude()).toBe(45);
    });

    test("Testing if only Local longitude value can be updated", () => {
        const local = new Local(12, 45);
        expect(local.getLatitude()).toBe(12);
        expect(local.getLongitude()).toBe(45);
        local.updateLocal(undefined, 150);
        expect(local.getLatitude()).toBe(12);
        expect(local.getLongitude()).toBe(150);
    });

    test("Testing if Local latitude value can't be updated with invalid inputs", () => {
        const local = new Local(12, 45);
        expect(local.getLatitude()).toBe(12);
        expect(local.getLongitude()).toBe(45);
        expect(() => local.updateLocal(-92)).toThrow();
    });

    test("Testing if Local longitude value can't be updated with invalid inputs", () => {
        const local = new Local(12, 45);
        expect(local.getLatitude()).toBe(12);
        expect(local.getLongitude()).toBe(45);
        expect(() => local.updateLocal(undefined, 180.1)).toThrow();
    });
});
