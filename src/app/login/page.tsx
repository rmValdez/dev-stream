"use client";

import React from "react";
import { useAuthStore } from "../../store/auth.store";
import { LoginPage } from "@/components/Auth/LoginPage";

export default function Page() {
  const login = useAuthStore((state) => state.login);
  return <LoginPage login={login} />;
}
