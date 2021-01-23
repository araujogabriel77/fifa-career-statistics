import { v4 as uuid } from 'uuid';

class Team {
    id: string;
    name: string;
    short_name: string;
    country: string;
    foundation_year: string;

    constructor({ name, short_name, country, foundation_year }: Omit<Team, 'id'>) {

        this.id = uuid();
        this.name = name;
        this.short_name = short_name;
        this.country = country;
        this.foundation_year = foundation_year;
    }
}

export default Team;