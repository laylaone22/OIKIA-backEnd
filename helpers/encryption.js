import { hash, compare } from 'bcrypt';

// encrypt password in userSchema using pre('save', async() => {})
export const encryptPassword = async (password) => {
    const saltRounds = 12;
    return await hash(password, saltRounds);
};

// compare password on login using authorizePassword hook
export const comparePassword = async (clearTextPassword, hashedPassword) =>
    await compare(clearTextPassword, hashedPassword);
