import Local from "../../entities/Local";
import LocalRepository from "./LocalRepository";

type LocalData = {
    id: number;
    latitude: number;
    longitude: number;
};

export default class LocalRepositoryInMemory implements LocalRepository {
    private localsData: LocalData[] = [
        {
            id: 1,
            latitude: 15,
            longitude: 110,
        },
        {
            id: 2,
            latitude: 67,
            longitude: 135,
        },
        {
            id: 3,
            latitude: 88,
            longitude: 175,
        },
        {
            id: 4,
            latitude: 88.89,
            longitude: 175.16,
        },
        {
            id: 5,
            latitude: 48.89,
            longitude: 125.16,
        },
    ];

    async saveLocal(id: number, latitude: number, longitude: number): Promise<void> {
        if (this.alreadyExists(id)) throw Error("A Local with this id already exists !");
        this.localsData.push({
            id: id,
            latitude: latitude,
            longitude: longitude,
        });
    }

    private alreadyExists(id: number) {
        const local = this.localsData.find((data) => data.id == id);
        if (local) return true;
        return false;
    }

    async getLocal(id: number): Promise<Local> {
        const localData = this.localsData.find((data) => data.id == id);
        if (!localData) throw Error("There is no Local with this id !");
        const local = new Local(localData?.latitude, localData?.longitude);
        return Promise.resolve(local);
    }

    async updateLocal(id: number, latitude: number, longitude: number): Promise<void> {
        for (const data of this.localsData) {
            if (data.id === id) {
                data.latitude = latitude;
                data.longitude = longitude;
            }
        }
    }
}
