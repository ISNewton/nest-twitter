import { compareSync, genSaltSync, hashSync } from 'bcryptjs'

const salt = genSaltSync(5)
export const hash = (password: string): string => {
  return hashSync(password, salt)
}
export const comparePasswords = (
  password: string,
  hashedPassword: string,
): boolean => {
  return compareSync(password, hashedPassword)
}
