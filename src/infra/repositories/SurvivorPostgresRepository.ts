import SurvivorAdapter from "../../adapters/SurvivorAdapter";
import Survivor from "../../entities/Survivor";
import pgdb from "../db/PostgresCon";
import InventoryRepository from "./InventoryRepository";
import LocalRepository from "./LocalRepository";
import SurvivorRepository from "./SurvivorRepository";

export default class SurvivorPostgresRepository implements SurvivorRepository {
    private localRepository: LocalRepository;
    private inventoryRepository: InventoryRepository;

    constructor(
        localRepository: LocalRepository,
        inventoryRepository: InventoryRepository,
    ) {
        this.localRepository = localRepository;
        this.inventoryRepository = inventoryRepository;
    }

    async saveSurvivor(
        id: number,
        name: string,
        age: number,
        sex: string,
        complaints: number,
        infected: boolean,
        localId: number,
        inventoryId: number,
    ): Promise<void> {
        await pgdb.none(
            "INSERT INTO zssncleanarch.survivor VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
            [id, name, age, sex, infected, complaints, inventoryId, localId],
        );
    }

    async getSurvivor(id: number): Promise<Survivor> {
        const data = await pgdb.oneOrNone(
            "SELECT * FROM zssncleanarch.survivor WHERE id=$1",
            [id],
        );
        if (!data) throw Error("There is no Survivor with this id !");
        const inventory = await this.inventoryRepository.getInventory(data.inventory_id);
        const local = await this.localRepository.getLocal(data.local_id);
        return SurvivorAdapter.create(
            data.name,
            data.age,
            data.sex,
            data.complaints,
            data.infected,
            local,
            inventory,
        );
    }

    async getComplaints(id: number): Promise<number> {
        const data = await pgdb.oneOrNone(
            "SELECT complaints FROM zssncleanarch.survivor WHERE id=$1",
            [id],
        );
        return data.complaints;
    }

    async createDenounce(id: number): Promise<void> {
        let infected = false;
        let complaints = await this.getComplaints(id);
        if (complaints == 2) infected = true;
        complaints += 1;
        await pgdb.none(
            "UPDATE zssncleanarch.survivor SET complaints=$1, infected=$2 WHERE id=$3",
            [complaints, infected, id],
        );
    }
}
