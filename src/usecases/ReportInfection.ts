import SurvivorRepository from "../infra/repositories/SurvivorRepository";

export default class ReportInfection {
    private survivorRespository: SurvivorRepository;

    constructor(survivorRespository: SurvivorRepository) {
        this.survivorRespository = survivorRespository;
    }

    async execute(informerId: number, denouncedId: number): Promise<void> {
        if (informerId == denouncedId) {
            throw Error("A survivor can't denounce himself!");
        }
        const informer = await this.survivorRespository.getSurvivor(informerId);
        if (!informer.isAlive()) throw Error("A zumbie can't denounce a survivor !");
        const denounced = await this.survivorRespository.getSurvivor(denouncedId);
        if (!denounced) throw Error("There is no survivor with this id !");
        if (!denounced.isAlive()) {
            throw Error("This survivor has already turned into a zombie !");
        }
        await this.survivorRespository.createDenounce(denouncedId);
    }
}
