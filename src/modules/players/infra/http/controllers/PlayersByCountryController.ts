import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListPlayerByCountryService from '@modules/players/services/ListPlayersByCountryService';
export default class PlayersByCountryController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listPlayersByCountry = container.resolve(ListPlayerByCountryService);
    const { country } = request.params;

    const players = await listPlayersByCountry.execute({ country });

    return response.json(players);
  }
}
