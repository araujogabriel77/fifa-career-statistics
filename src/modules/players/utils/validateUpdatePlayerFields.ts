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

    if (name.length < 3 && name.length != undefined) {
        return 'Player name must have at least 3 characters';
    }

    if (country.length < 3 && country.length != undefined) {
        return 'Country name must have at least 3 characters';
    }

    if (position.length > 3 || position.length < 2 && position.length != undefined) {
        return 'Position must have beetwen 2 and 3 characters';
    }

    if (first_overall < 1 || first_overall > 99 && first_overall != undefined) {
        return 'Overall number must be beetwen 1 and 99';
    }

    if (current_overall < 1 || current_overall > 99 && current_overall != undefined) {
        return 'Overall number must be beetwen 1 and 99';
    }

    if (games_played < 0 || games_played > 10000 && games_played != undefined) {
        return 'Games cannot be negative';
    }

    if (goals < 0 && goals != undefined) {
        return 'Goals cannot be negative';
    }

    if (assists < 0 && assists != undefined) {
        return 'Assists cannot be negative';
    }

    if (clean_sheets < 0 && clean_sheets != undefined) {
        return 'Clean_sheets cannot be negative';
    }

    return null;

}