import SurvivorRepository from "../infra/repositories/SurvivorRepository";

export default class CreateSurvivor {
    private survivorRepository: SurvivorRepository;
    constructor(survivorRepository: SurvivorRepository) {
        this.survivorRepository = survivorRepository;
    }
    async execute(
        id: number,
        name: string,
        age: number,
        sex: string,
        complaints: number,
        infected: boolean,
        localId: number,
        inventoryId: number,
    ) {
        await this.survivorRepository.saveSurvivor(
            id,
            name,
            age,
            sex,
            complaints,
            infected,
            localId,
            inventoryId,
        );
    }
}
