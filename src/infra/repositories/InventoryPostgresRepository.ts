import Inventory from "../../entities/Inventory";
import InventoryRepository from "./InventoryRepository";
import pgdb from "../db/PostgresCon";
import InventoryAdapter from "../../adapters/InventoryAdapter";

export default class InventoryPostgresRepository implements InventoryRepository {
    async saveInventory(
        id: number,
        water: number,
        food: number,
        medication: number,
        ammunition: number,
    ): Promise<void> {
        if (await this.alreadyExists(id))
            throw Error("An Inventory with this id already exists !");
        await pgdb.none("INSERT INTO zssncleanarch.inventory VALUES ($1,$2,$3,$4,$5)", [
            id,
            water,
            food,
            medication,
            ammunition,
        ]);
    }
    async getInventory(id: number): Promise<Inventory> {
        const data = await pgdb.oneOrNone(
            "SELECT water, food, medication, ammunition FROM zssncleanarch.inventory WHERE id=$1",
            [id],
        );
        if (!data) throw Error("There is no Inventory with this id !");
        return InventoryAdapter.create(
            data.water,
            data.food,
            data.medication,
            data.ammunition,
        );
    }
    async updateInventory(
        id?: number,
        water?: number,
        food?: number,
        medication?: number,
        ammunition?: number,
    ): Promise<void> {
        await pgdb.none(
            "UPDATE zssncleanarch.inventory SET water=$1, food=$2, medication=$3, ammunition=$4 WHERE id=$5",
            [water, food, medication, ammunition, id],
        );
    }

    async alreadyExists(id: number): Promise<boolean> {
        const data = await pgdb.oneOrNone(
            "SELECT * FROM zssncleanarch.inventory WHERE id=$1",
            [id],
        );
        if (data) return true;
        return false;
    }
}
