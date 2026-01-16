"use client";

import React, { useEffect, useState } from "react";
import Profile from "../../components/Profile/Profile";
import PageWrapper from "@/components/ReusableComponent/PageWrapperComponent";
import userService from "@/services/user.service";
import { AuthUserDetail } from "@/interfaces/user.interface";

export default function ProfilePage() {
  const [userData, setUserData] = useState<AuthUserDetail | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const user = localStorage.getItem("user");
    const userId = user ? JSON.parse(user).id : null;

    if (userId) {
      const fetchUserDetail = async () => {
        try {
          const result = await userService.getUserDetail(userId);
          setUserData(result);
        } catch (error) {
          console.error("Failed to fetch user details:", error);
        }
      };
      fetchUserDetail();
    }
  }, [mounted]);

  if (!mounted) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Profile userData={userData} />
    </PageWrapper>
  );
}
