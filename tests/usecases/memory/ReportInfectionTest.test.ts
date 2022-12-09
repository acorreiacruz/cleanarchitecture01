import InventoryRepositoryInMemory from "../../../src/infra/repositories/InventoryRepositoryInMemory";
import LocalRepositoryInMemory from "../../../src/infra/repositories/LocalRepositoryInMemory";
import SurvivorRepositoryInMemory from "../../../src/infra/repositories/SurvivorRepositoryInMemory";
import ReportInfection from "../../../src/usecases/ReportInfection";

describe("Test ReportInfection using respotory in memory", () => {
    test("Test if a survivor can report other survivor infection", async () => {
        const inventoryRepositoryInMemory = new InventoryRepositoryInMemory();
        const localRespositoryInMemory = new LocalRepositoryInMemory();
        const survivorRepositoryInMemory = new SurvivorRepositoryInMemory(
            localRespositoryInMemory,
            inventoryRepositoryInMemory,
        );
        const reportInfection = new ReportInfection(survivorRepositoryInMemory);
        await reportInfection.execute(2, 1);
        let survivor = await survivorRepositoryInMemory.getSurvivor(1);
        expect(survivor.getComplaints()).toBe(1);
        await reportInfection.execute(2, 1);
        survivor = await survivorRepositoryInMemory.getSurvivor(1);
        expect(survivor.getComplaints()).toBe(2);
        await reportInfection.execute(2, 1);
        survivor = await survivorRepositoryInMemory.getSurvivor(1);
        expect(survivor.getComplaints()).toBe(3);
        survivor = await survivorRepositoryInMemory.getSurvivor(1);
        expect(survivor.isAlive()).toBe(false);
    });

    test("Test if a survivor can't report yourself", async () => {
        const inventoryRepositoryInMemory = new InventoryRepositoryInMemory();
        const localRespositoryInMemory = new LocalRepositoryInMemory();
        const survivorRepositoryInMemory = new SurvivorRepositoryInMemory(
            localRespositoryInMemory,
            inventoryRepositoryInMemory,
        );
        const reportInfection = new ReportInfection(survivorRepositoryInMemory);
        expect(async () => await reportInfection.execute(2, 2)).rejects.toThrow();
    });

    test("Test if a zumbie can't denounce a survivor infection", async () => {
        const inventoryRepositoryInMemory = new InventoryRepositoryInMemory();
        const localRespositoryInMemory = new LocalRepositoryInMemory();
        const survivorRepositoryInMemory = new SurvivorRepositoryInMemory(
            localRespositoryInMemory,
            inventoryRepositoryInMemory,
        );
        const reportInfection = new ReportInfection(survivorRepositoryInMemory);
        await reportInfection.execute(1, 2);
        await reportInfection.execute(1, 2);
        await reportInfection.execute(1, 2);
        expect(async () => await reportInfection.execute(2, 1)).rejects.toThrow();
    });

    test("Test if survivor can't denounce a zumbie", async () => {
        const inventoryRepositoryInMemory = new InventoryRepositoryInMemory();
        const localRespositoryInMemory = new LocalRepositoryInMemory();
        const survivorRepositoryInMemory = new SurvivorRepositoryInMemory(
            localRespositoryInMemory,
            inventoryRepositoryInMemory,
        );
        const reportInfection = new ReportInfection(survivorRepositoryInMemory);
        await reportInfection.execute(1, 2);
        await reportInfection.execute(1, 2);
        await reportInfection.execute(1, 2);
        expect(async () => await reportInfection.execute(1, 2)).rejects.toThrow();
    });

    test("Test if survivor can't denounce a survivor that does not exists", async () => {
        const inventoryRepositoryInMemory = new InventoryRepositoryInMemory();
        const localRespositoryInMemory = new LocalRepositoryInMemory();
        const survivorRepositoryInMemory = new SurvivorRepositoryInMemory(
            localRespositoryInMemory,
            inventoryRepositoryInMemory,
        );
        const reportInfection = new ReportInfection(survivorRepositoryInMemory);
        expect(async () => await reportInfection.execute(1, 200)).rejects.toThrow();
    });
});
