import { injectable, inject } from 'tsyringe';

import Team from '@modules/teams/infra/typeorm/entities/Team';
import ITeamsRepository from '../repositories/ITeamsRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import AppError from '@shared/errors/AppErrors';
import validateTeamFormFields from '@modules/teams/utils/validateTeamFormFields';

interface IRequest {
    name: string;
    short_name: string;
    country: string;
    foundation: string;
    user_id: string;
    shieldFileName?: string;
}

@injectable()
class CreateTeamService {
    constructor(
        @inject('TeamsRepository')
        private teamsRepository: ITeamsRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) { }
    public async execute({
        name,
        short_name,
        country,
        foundation,
        user_id,
        shieldFileName
    }: IRequest): Promise<Team> {
        const formatedName = name.toLowerCase();

        const findTeamWithSameName = await this.teamsRepository.findByName(formatedName);

        if (findTeamWithSameName) {
            throw new AppError('This name is already in use');
        }

        const filename = await this.storageProvider.saveFile(shieldFileName);

        const invalidFormFields = validateTeamFormFields({
            name,
            short_name,
            country,
            foundation
        });

        if (invalidFormFields) {
            throw new AppError(`${invalidFormFields}`);
        }

        name = name.toLowerCase();
        short_name = short_name.toLowerCase();
        country = country.toLowerCase();

        const team = await this.teamsRepository.create({
            name,
            short_name,
            country,
            foundation,
            user_id,
            shield: filename
        });

        return team;
    }
}

export default CreateTeamService;