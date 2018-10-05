import bcrypt from 'bcrypt';

export const isValidEmail = (email) => {
	return /\S+@\S+\.\S+/.test(email);
}

export const isValidId = (id) => {
	if (!isNaN(id)) {
		return true;
	}
	return false;
}

export const noSpaceStrings = (string) => {
	return string.includes(' ');
}

export const testNoEmptyString = (string) => {
	const result = string.trim();
	if (result.length === 0) {
		return false;
	} else {
		return true;
	}
}

export const comparePasswords = (password, hash) => {
	return bcrypt.compare(password, hash);
}