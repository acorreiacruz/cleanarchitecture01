import LocalRepository from "../infra/repositories/LocalRepository";

export default class UpdateLocal {
    private localRepository: LocalRepository;

    constructor(localRepository: LocalRepository) {
        this.localRepository = localRepository;
    }
    async execute(id: number, newLatitude: number, newLongitude: number) {
        await this.localRepository.updateLocal(id, newLatitude, newLongitude);
    }
}
