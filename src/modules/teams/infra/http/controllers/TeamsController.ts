import { Request, Response } from 'express';
import { container } from 'tsyringe';

import TeamsRepository from '@modules/teams/infra/typeorm/repositories/TeamsRepository';
import CreateTeamService from '@modules/teams/services/CreateTeamService';
import UpdateTeamService from '@modules/teams/services/UpdateTeamService';
export default class TeamsController {
    public async index(request: Request, response: Response): Promise<Response> {
        try {
            const teamsRepository = new TeamsRepository();
            const teams = await teamsRepository.findAll();

            return response.json(teams);
        } catch (error) {
            return response.json({ error: error.message });
        }
    }

    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const createTeam = container.resolve(CreateTeamService);

            const {
                name,
                short_name,
                country,
                foundation,
            } = request.body;

            const user_id = request.user.id;
            const shield = request.file.filename;

            const team = await createTeam.execute({
                name,
                short_name,
                country,
                foundation,
                user_id,
                shieldFileName: shield
            });

            return response.json(team);
        } catch (error) {
            return response.json({ error: error.message });
        }
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const updateTeam = container.resolve(UpdateTeamService);

        const {
            name,
            short_name,
            country,
            foundation
        } = request.body;

        const team = await updateTeam.execute({
            name,
            short_name,
            country,
            foundation,
            team_id: request.params.id,
        });

        return response.json(team);
    }
}