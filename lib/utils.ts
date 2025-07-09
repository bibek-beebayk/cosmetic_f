export const validatePassword = (password: string) => {
    const isLongEnough = password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    return isLongEnough && hasLetter && hasNumber;
};