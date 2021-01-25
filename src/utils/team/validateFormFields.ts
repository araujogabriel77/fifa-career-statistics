interface FormFields {
    name: string;
    short_name: string;
    country: string;
    foundation: string;
}

export default function validateFormFields({
    name,
    short_name,
    country,
    foundation
}: FormFields): string | null {

    if (name.length < 3) {
        return 'Team name must be at least 3 characters';
    }

    if (short_name.length > 3 || short_name.length < 2) {
        return 'Shorten name must be between 2 and 3 characters';
    }

    if (country.length < 3) {
        return 'Country name must be at least 3 characters';
    }

    if (foundation.length != 4) {
        return 'Foundation year must be 4 numbers';
    }

    return null;

}