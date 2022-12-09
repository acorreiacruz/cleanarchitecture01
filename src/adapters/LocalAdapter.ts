import Local from "../entities/Local";

export default class LocalAdapter {
    static create(latitude: number, longitude: number): Local {
        return new Local(latitude, longitude);
    }
}
