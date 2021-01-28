export default interface ICreatePlayerDTO {
    name: string;
    country: string;
    birth_date?: Date;
    position: string;
    first_overall?: number;
    current_overall?: number;
    games_played?: number;
    goals?: number;
    assists?: number;
    clean_sheets?: number;
    team_id: number;
}