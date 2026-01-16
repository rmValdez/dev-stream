"use client";

import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { canAccessRoute, UserRole } from "@/utils/roleUtils";

interface RouteGuardProps {
  children: React.ReactNode;
  requiredRoles?: UserRole | UserRole[];
  excludedRoles?: UserRole | UserRole[];
  redirectTo?: string;
}

export default function RouteGuard({
  children,
  requiredRoles,
  excludedRoles,
  redirectTo = "/",
}: RouteGuardProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const userRole = user?.role;

    if (!canAccessRoute(userRole, requiredRoles, excludedRoles)) {
      router.push(redirectTo);
    }
  }, [user, requiredRoles, excludedRoles, redirectTo, router, mounted]);

  const userRole = user?.role;

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  // Don't render children if user doesn't have access
  if (!canAccessRoute(userRole, requiredRoles, excludedRoles)) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
}
