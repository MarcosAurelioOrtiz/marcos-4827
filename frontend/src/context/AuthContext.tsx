import { createContext, useState, type ReactNode } from "react"
import type { User } from "../types/user.types"
import type { LoginData, RegisterData } from "../types/auth.types"
import { hashPassword } from "../utils/password"

import {
  getUser,
  saveUser,
  saveSession,
  getSession,
  removeSession
} from "../utils/storage"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  register: (data: RegisterData) => boolean
  login: (data: LoginData) => boolean
  logout: () => void
  actualizarSaldo: (nuevoSaldo: number) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const session = getSession()
    const storedUser = getUser()

    if (!session || !storedUser) {
      return null
    }

    if (session !== storedUser.id) {
      return null
    }

    return storedUser
  })

  let isAuthenticated = false

  if (user) {
    isAuthenticated = true
  }

  const register = (data: RegisterData): boolean => {
    if (data.password !== data.confirmPassword) {
      return false
    }

    const passwordHash = hashPassword(data.password)

    const newUser: User = {
      id: crypto.randomUUID(),
      fullName: data.fullName,
      email: data.email,
      passwordHash,
      saldo: 0
    }

    saveUser(newUser)
    saveSession(newUser.id)
    setUser(newUser)

    return true
  }

  const login = (data: LoginData): boolean => {
    const storedUser = getUser()

    if (!storedUser) {
      return false
    }

    if (storedUser.email !== data.email) {
      return false
    }

    const passwordHash = hashPassword(data.password)

    if (storedUser.passwordHash !== passwordHash) {
      return false
    }

    saveSession(storedUser.id)
    setUser(storedUser)

    return true
  }

  const logout = () => {
    removeSession()
    setUser(null)
  }

  const actualizarSaldo = (nuevoSaldo: number) => {
    if (!user) {
      return
    }

    const usuarioActualizado: User = {
      ...user,
      saldo: nuevoSaldo
    }

    saveUser(usuarioActualizado)
    setUser(usuarioActualizado)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        register,
        login,
        logout,
        actualizarSaldo
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}