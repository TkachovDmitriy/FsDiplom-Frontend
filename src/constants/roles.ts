export const rolesIDs = ['user', 'dealer', 'admin', 'guest'] as const

export type RolesUnion = typeof rolesIDs[number]

export type RoleProps = {
  role?: RolesUnion | any
}

export const ROLES: Record<RolesUnion, string> = {
  user: 'user',
  dealer: 'dealer',
  admin: 'admin',
  guest: 'guest'
} as const

export type RolesRetrun = {
  isUser: boolean
  isDealer: boolean
  isAdmin: boolean
}

export const hasRole = (role: RolesUnion | string): RolesRetrun => {
  return {
    isUser: role === ROLES.user,
    isDealer: role === ROLES.dealer,
    isAdmin: role === ROLES.admin
  }
}

export const useRoles = (role: RolesUnion): RolesRetrun => {
  return hasRole(role)
}
