interface FormFields {
    name?: string | undefined;
    short_name?: string | undefined;
    country?: string | undefined;
    foundation?: string | undefined;
}

export default function validateTeamFormFields({
    name,
    short_name,
    country,
    foundation
}: FormFields): string | null {

    if (name != undefined && name.length < 3 || name != undefined && name.length > 40) {
        return 'Team name must have between 3 and 40 characters';
    }

    if (short_name != undefined && short_name.length > 3 || short_name != undefined && short_name.length < 2) {
        return 'Shorten name must have between 2 and 3 characters';
    }

    if (country != undefined && country.length < 3) {
        return 'Country name must have at least 3 characters';
    }

    if (foundation != undefined && foundation.length != 4) {
        return 'Foundation year must have 4 numbers';
    }

    return null;

}