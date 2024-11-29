import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        throw new Error('Error hashing password');
    }
};

export const comparePassword = async (input: string, hashed: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(input, hashed);
    } catch (error) {
        throw new Error('Error comparing password');
    }
};
