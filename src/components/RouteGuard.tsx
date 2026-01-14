"use client";

import { Fragment, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { canAccessRoute, UserRole } from "@/utils/roleUtils";

interface RouteGuardProps {
  children: React.ReactNode;
  requiredRoles?: UserRole | UserRole[];
  excludedRoles?: UserRole | UserRole[];
  redirectTo?: string;
}

/**
 * Route guard component to protect routes based on user roles
 *
 * Usage:
 * <RouteGuard requiredRoles="admin">
 *   <AdminPage />
 * </RouteGuard>
 *
 * <RouteGuard requiredRoles={["admin", "moderator"]}>
 *   <ModeratorPage />
 * </RouteGuard>
 *
 * <RouteGuard excludedRoles="guest">
 *   <PremiumFeature />
 * </RouteGuard>
 */
export default function RouteGuard({
  children,
  requiredRoles,
  excludedRoles,
  redirectTo = "/",
}: RouteGuardProps) {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    const userRole = user?.role;

    if (!canAccessRoute(userRole, requiredRoles, excludedRoles)) {
      router.push(redirectTo);
    }
  }, [user, requiredRoles, excludedRoles, redirectTo, router]);

  const userRole = user?.role;

  // Don't render children if user doesn't have access
  if (!canAccessRoute(userRole, requiredRoles, excludedRoles)) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
}
