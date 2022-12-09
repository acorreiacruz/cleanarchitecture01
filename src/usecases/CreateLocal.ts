import LocalRepository from "../infra/repositories/LocalRepository";

export default class CreateLocal {
    private localRepository: LocalRepository;
    constructor(localRepository: LocalRepository) {
        this.localRepository = localRepository;
    }
    async execute(id: number, latitude: number, longitude: number) {
        await this.localRepository.saveLocal(id, latitude, longitude);
    }
}
