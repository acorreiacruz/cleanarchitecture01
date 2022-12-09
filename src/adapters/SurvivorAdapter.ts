import Inventory from "../entities/Inventory";
import Local from "../entities/Local";
import Survivor from "../entities/Survivor";

export default class SurvivorAdapter {
    static create(
        name: string,
        age: number,
        sex: string,
        complaints: number,
        infected: boolean,
        local: Local,
        inventory: Inventory,
    ): Survivor {
        const survivor = new Survivor(name, age, sex, local, inventory);
        survivor.setInfected(infected);
        survivor.setComplaints(complaints);
        return survivor;
    }
}
