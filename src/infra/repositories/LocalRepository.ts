import Local from "../../entities/Local";

export default interface LocalRepository {
    saveLocal(id: number, latitude: number, longitude: number): Promise<void>;
    getLocal(id: number): Promise<Local>;
    updateLocal(id: number, latitude: number, longitude: number): Promise<void>;
}
