// 1 hashing part
// 2   decrypting for comparing

import brcypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const saltrounds = 10;  // more round more cpu usage
    const hashedPassword = await brcypt.hash(password,saltrounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};


// 2 for comparing
export const comparePassword = async (password,hashedPassword) => {
return brcypt.compare(password,hashedPassword);
}






