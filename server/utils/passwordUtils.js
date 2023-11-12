const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT_ROUNDS || 10 ; // You can increase the salt rounds for better security

console.log("the salt = ",saltRounds);
/**
 * Hashes a password using bcrypt with specified salt rounds.
 * @param {string} password - The plaintext password to hash.
 * @returns {Promise<string>} - A promise that resolves to the hashed password.
 */

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(Number(saltRounds));
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error('Hashing failed: ' + error.message);
    }
};

module.exports = hashPassword;
