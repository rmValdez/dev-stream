"use client";

import React, { useEffect, useState } from "react";

import Profile from "../../components/Profile/Profile";
import PageWrapper from "@/components/ReusableComponent/PageWrapperComponent";
import userService from "@/services/user.service";
import { AuthUserDetail } from "@/interfaces/user.interface";

export default function ProfilePage() {
  const [userData, setUserData] = useState<AuthUserDetail | null>(null);
  const user = localStorage.getItem("user");
  const userId = user ? JSON.parse(user).id : null;

  useEffect(() => {
    if (userId) {
      const fetchUserDetail = async () => {
        try {
          const result = await userService.getUserDetail(userId);
          console.log("result", result);
          setUserData(result);
        } catch (error) {
          console.error("Failed to fetch user details:", error);
        }
      };
      fetchUserDetail();
    }
  }, [userId]);

  return (
    <PageWrapper>
      <Profile userData={userData} />
    </PageWrapper>
  );
}
