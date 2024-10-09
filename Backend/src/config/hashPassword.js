import bcryptjs from 'bcryptjs'

const hashPassword = async (password) => {
    const salt = await bcryptjs.genSalt(10);
    const hashed = await bcryptjs.hash(password, salt);
    return hashed;
}

const comparePassword = async (password, hashPassword) => {
    const check = await bcryptjs.compare(password, hashPassword)
    return check
}

module.exports = {
    hashPassword: hashPassword,
    comparePassword: comparePassword
}