import { Request, Response } from 'express';

import TeamsRepository from '@modules/teams/infra/typeorm/repositories/TeamsRepository';

export default class TeamsCountryController {
    public async index(request: Request, response: Response): Promise<Response> {
        const teamsRepository = new TeamsRepository();
        const { country } = request.params;

        const formated_country = country.toLowerCase();

        const teams = await teamsRepository.findByCountry(formated_country)

        return response.json(teams);
    }
}