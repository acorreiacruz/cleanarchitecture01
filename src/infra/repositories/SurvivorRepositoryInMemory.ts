/* eslint-disable prettier/prettier */
import Survivor from "../../entities/Survivor";
import InventoryRepository from "./InventoryRepository";
import LocalRepository from "./LocalRepository";
import SurvivorRepository from "./SurvivorRepository";

type SurvivorData = {
    id: number;
    name: string;
    age: number;
    sex: string;
    complaints: number,
    infected: boolean;
    localId: number;
    inventoryId: number;
};

export default class SurvivorRepositoryInMemory implements SurvivorRepository {
    private survivorsData: SurvivorData[] = [
        {
            id: 1,
            name: "Survivor01",
            age: 35,
            sex: "M",
            complaints: 0,
            infected: false,
            localId: 1,
            inventoryId: 1,
        },
        {
            id: 2,
            name: "Survivor02",
            age: 25,
            sex: "M",
            complaints: 0,
            infected: false,
            localId: 2,
            inventoryId: 2,
        },
        {
            id: 3,
            name: "Survivor03",
            age: 15,
            sex: "F",
            complaints: 0,
            infected: false,
            localId: 3,
            inventoryId: 3,
        },
        {
            id: 4,
            name: "Survivor04",
            age: 35,
            sex: "M",
            complaints: 0,
            infected: false,
            localId: 4,
            inventoryId: 4,
        },
    ];

    constructor(
        private localRepository: LocalRepository,
        private inventoryRepository: InventoryRepository,
    ) { }

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
        if (this.survivorAlreadyExists(id)) throw Error("There is already exists a Survivor with this id!");
        await this.survivorsData.push({
            id: id,
            name: name,
            age: age,
            sex: sex,
            complaints: complaints,
            infected: infected,
            localId: localId,
            inventoryId: inventoryId,
        });
    }

    private survivorAlreadyExists(id: number) {
        const exists = this.survivorsData.find((data) => {
            if (data.id == id) return data;
        });
        if (exists) return true;
        return false;
    }

    async getSurvivor(id: number): Promise<Survivor> {
        const survivorData = this.survivorsData.find((data) => data.id == id);
        if (!survivorData) throw Error("There is no survivor with this id !");
        const local = await this.localRepository.getLocal(survivorData.localId);
        const inventory = await this.inventoryRepository.getInventory(
            survivorData.inventoryId,
        );
        const survivor = new Survivor(
            survivorData.name,
            survivorData.age,
            survivorData.sex,
            local,
            inventory,
        );
        survivor.setInfected(survivorData.infected);
        survivor.setComplaints(survivorData.complaints);
        return Promise.resolve(survivor);
    }

    async createDenounce(id: number): Promise<void> {
        for (const data of this.survivorsData) {
            if (data.id === id) {
                if (data.complaints === 2) {
                    data.infected = true;
                }
                data.complaints += 1;
            }
        }
    }
}
