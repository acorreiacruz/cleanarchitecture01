import ReportInfection from "../../../src/usecases/ReportInfection";
import SurvivorPostgresRepository from "../../../src/infra/repositories/SurvivorPostgresRepository";
import LocalPostgresRepository from "../../../src/infra/repositories/LocalPostgresRepository";
import InventoryPostgresRepository from "../../../src/infra/repositories/InventoryPostgresRepository";
import pgdb from "../../../src/infra/db/PostgresCon";

describe("Test ReportInfection using PostgreSQL repository", () => {
    afterEach(async () => {
        await pgdb.none(
            "UPDATE zssncleanarch.survivor SET complaints=$1, infected=$2 WHERE id=$3",
            [0, false, 2],
        );
    });
    test("Test if a survivor can report infection", async () => {
        const inventoryPostgresRepository = new InventoryPostgresRepository();
        const localPostgresRepository = new LocalPostgresRepository();
        const survivorPostgresRepository = new SurvivorPostgresRepository(
            localPostgresRepository,
            inventoryPostgresRepository,
        );
        const reportInfection = new ReportInfection(survivorPostgresRepository);
        await reportInfection.execute(1, 2);
        let survivor = await survivorPostgresRepository.getSurvivor(2);
        expect(survivor.getComplaints()).toBe(1);
        await reportInfection.execute(1, 2);
        survivor = await survivorPostgresRepository.getSurvivor(2);
        expect(survivor.getComplaints()).toBe(2);
        await reportInfection.execute(1, 2);
        survivor = await survivorPostgresRepository.getSurvivor(2);
        expect(survivor.getComplaints()).toBe(3);
        expect(survivor.isAlive()).toBeFalsy();
    });

    test("Test if a sumbie can't report a survivor infection ", async () => {
        const inventoryPostgresRepository = new InventoryPostgresRepository();
        const localPostgresRepository = new LocalPostgresRepository();
        const survivorPostgresRepository = new SurvivorPostgresRepository(
            localPostgresRepository,
            inventoryPostgresRepository,
        );
        const reportInfection = new ReportInfection(survivorPostgresRepository);
        await reportInfection.execute(1, 2);
        await reportInfection.execute(1, 2);
        await reportInfection.execute(1, 2);
        expect(async () => await reportInfection.execute(2, 1)).rejects.toThrow();
    });

    test("Test if survivor can't denounce himself", async () => {
        const inventoryPostgresRepository = new InventoryPostgresRepository();
        const localPostgresRepository = new LocalPostgresRepository();
        const survivorPostgresRepository = new SurvivorPostgresRepository(
            localPostgresRepository,
            inventoryPostgresRepository,
        );
        const reportInfection = new ReportInfection(survivorPostgresRepository);
        expect(async () => await reportInfection.execute(1, 1)).rejects.toThrow();
    });
});
