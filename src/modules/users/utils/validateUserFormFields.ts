interface IFormFields {
    name: string;
    email: string;
    password: string;
}

export default function validateTeamIFormFields({
    name,
    email,
    password
}: IFormFields): string | null {

    if (name.length < 3 || name.length > 16) {
        return 'Team name must be beetwen 3 and 16 characters';
    }

    if (email.length < 9) {
        return 'Invalid email';
    }

    if (password.length < 6 || password.length > 24) {
        return 'Password must be beetwen 6 and 24 characters';
    }

    return null;

}