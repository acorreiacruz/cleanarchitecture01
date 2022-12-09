import Survivor from "../../entities/Survivor";

export default interface SurvivorRepository {
    saveSurvivor(
        id: number,
        name: string,
        age: number,
        sex: string,
        complaints: number,
        infected: boolean,
        localId: number,
        inventoryId: number,
    ): Promise<void>;

    getSurvivor(id: number): Promise<Survivor>;

    createDenounce(id: number): Promise<void>;
}
