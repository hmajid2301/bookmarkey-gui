export interface PasswordValues {
	currentPassword: string;
	password: string;
	passwordConfirm: string;
}

export interface PasswordErrors {
	currentPassword: string[] | undefined;
	password: string[] | undefined;
	passwordConfirm: string[] | undefined;
}

export interface ProfileValues {
	nickname: string;
	email: string;
}

export interface ProfileErrors {
	nickname: string[] | undefined;
	email: string[] | undefined;
}
