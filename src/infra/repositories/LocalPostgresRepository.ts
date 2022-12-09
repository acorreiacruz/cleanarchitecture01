import LocalAdapter from "../../adapters/LocalAdapter";
import Local from "../../entities/Local";
import pgdb from "../db/PostgresCon";
import LocalRepository from "./LocalRepository";

export default class LocalPostgresRepository implements LocalRepository {
    async saveLocal(id: number, latitude: number, longitude: number): Promise<void> {
        await pgdb.none(
            "INSERT INTO zssncleanarch.local(id, coordinates) VALUES ($1, POINT($2, $3))",
            [id, latitude, longitude],
        );
    }
    async getLocal(id: number): Promise<Local> {
        const data = await pgdb.oneOrNone(
            "SELECT coordinates FROM zssncleanarch.local WHERE id=$1",
            [id],
        );
        if (!data) throw Error("There is no Local with this id !");
        return LocalAdapter.create(data.coordinates.x, data.coordinates.y);
    }
    async updateLocal(id: number, latitude: number, longitude: number): Promise<void> {
        await pgdb.none(
            "UPDATE zssncleanarch.local SET coordinates=POINT($1, $2) WHERE id=$3",
            [latitude, longitude, id],
        );
    }
}
