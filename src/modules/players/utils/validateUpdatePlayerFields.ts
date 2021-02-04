interface FormFields {
    name: string | undefined;
    country: string | undefined;
    position: string | undefined;
    first_overall?: number | undefined;
    current_overall?: number | undefined;
    games_played?: number | undefined;
    goals?: number | undefined;
    assists?: number | undefined;
    clean_sheets?: number | undefined;
}

export default function validateUpdatePlayerFields({
    name,
    country,
    position,
    first_overall,
    current_overall,
    games_played,
    goals,
    assists,
    clean_sheets
}: FormFields): string | null {

    if (name.length != undefined && name.length < 3) {
        return 'Player name must have at least 3 characters';
    }

    if (country != undefined && country.length < 3) {
        return 'Country name must have at least 3 characters';
    }

    if (position != undefined && position.length > 3 || position != undefined && position.length < 2) {
        return 'Position must have beetwen 2 and 3 characters';
    }

    if (first_overall != undefined && first_overall < 1 || first_overall != undefined && first_overall > 99) {
        return 'Overall number must be beetwen 1 and 99';
    }

    if (current_overall != undefined && current_overall < 1 || current_overall != undefined && current_overall > 99) {
        return 'Overall number must be beetwen 1 and 99';
    }

    if (games_played != undefined && games_played < 0 || games_played != undefined && games_played > 10000) {
        return 'Games cannot be negative';
    }

    if (goals != undefined && goals < 0) {
        return 'Goals cannot be negative';
    }

    if (assists != undefined && assists < 0) {
        return 'Assists cannot be negative';
    }

    if (clean_sheets != undefined && clean_sheets < 0) {
        return 'Clean_sheets cannot be negative';
    }

    return null;

}