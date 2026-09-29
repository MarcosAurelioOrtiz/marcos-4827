import type { User } from "../types/user.types"

const USER_KEY = "usuario_registrado"
const SESSION_KEY = "sesion_activa"

export const saveUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export const getUser = (): User | null => {
  const storedUser = localStorage.getItem(USER_KEY)

  if (!storedUser) {
    return null
  }

  return JSON.parse(storedUser) as User
}

export const saveSession = (userId: string): void => {
  localStorage.setItem(SESSION_KEY, userId)
}

export const getSession = (): string | null => {
  return localStorage.getItem(SESSION_KEY)
}

export const removeSession = (): void => {
  localStorage.removeItem(SESSION_KEY)
}

export const saveSnailPayResponse = (response: unknown): void => {
  localStorage.setItem(
    "ultima_transaccion_snailpay",
    JSON.stringify(response)
  )
}