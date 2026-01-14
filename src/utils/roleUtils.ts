/**
 * Role-based access control utilities for frontend
 */

export type UserRole =
  | "admin"
  | "moderator"
  | "employer"
  | "developer"
  | "user"
  | "guest"
  | "premium";

/**
 * Check if user has required role(s)
 */
export function hasRole(
  userRole: string | undefined,
  allowedRoles: UserRole | UserRole[]
): boolean {
  if (!userRole) return false;

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  return roles.includes(userRole as UserRole);
}

/**
 * Check if user does NOT have excluded role(s)
 */
export function notRole(
  userRole: string | undefined,
  excludedRoles: UserRole | UserRole[]
): boolean {
  if (!userRole) return true;

  const roles = Array.isArray(excludedRoles) ? excludedRoles : [excludedRoles];
  return !roles.includes(userRole as UserRole);
}

/**
 * Check if user is admin
 */
export function isAdmin(userRole: string | undefined): boolean {
  return userRole === "admin";
}

/**
 * Check if user is moderator or admin
 */
export function isModerator(userRole: string | undefined): boolean {
  return hasRole(userRole, ["admin", "moderator"]);
}

/**
 * Check if user can access a route based on role requirements
 */
export function canAccessRoute(
  userRole: string | undefined,
  requiredRoles?: UserRole | UserRole[],
  excludedRoles?: UserRole | UserRole[]
): boolean {
  // If no restrictions, allow access
  if (!requiredRoles && !excludedRoles) return true;

  // Check excluded roles first
  if (excludedRoles && !notRole(userRole, excludedRoles)) {
    return false;
  }

  // Check required roles
  if (requiredRoles && !hasRole(userRole, requiredRoles)) {
    return false;
  }

  return true;
}

/**
 * Get user-friendly role display name
 */
export function getRoleDisplayName(role: string | undefined): string {
  const roleMap: Record<string, string> = {
    admin: "Administrator",
    moderator: "Moderator",
    employer: "Employer",
    developer: "Developer",
    user: "User",
    guest: "Guest",
    premium: "Premium Member",
  };

  return roleMap[role || ""] || role || "User";
}
