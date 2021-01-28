interface FormFields {
    name: string;
    country: string;
    position: string;
    first_overall?: number;
    current_overall?: number;
    games_played?: number;
    goals?: number;
    assists?: number;
    clean_sheets?: number;
}

export default function validateFormFields({
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

    if (name.length < 3) {
        return 'Player name must have at least 3 characters';
    }

    if (country.length < 3) {
        return 'Country name must have at least 3 characters';
    }

    if (position.length > 3 || position.length < 2) {
        return 'Position must have beetwen 2 and 3 characters';
    }

    if (first_overall < 1 || first_overall > 99) {
        return 'Overall number must be beetwen 1 and 99';
    }

    if (current_overall < 1 || first_overall > 99) {
        return 'Overall number must be beetwen 1 and 99';
    }

    if (games_played < 0 || games_played > 10000) {
        return 'Games cannot be negative';
    }

    if (goals < 0) {
        return 'Goals cannot be negative';
    }

    if (assists < 0) {
        return 'Assists cannot be negative';
    }

    if (clean_sheets < 0) {
        return 'Clean_sheets cannot be negative';
    }

    return null;

}