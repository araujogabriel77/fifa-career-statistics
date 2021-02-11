export default interface ICreateTeamDTO {
  id: number;
  name: string;
  short_name: string;
  country: string;
  foundation: string;
  user_id: string;
  shield?: string | null;
}
