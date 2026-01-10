"use client";

import React from "react";
import PageWrapper from "@/components/ReusableComponent/PageWrapperComponent";
import PageHeader from "@/components/PageHeader/PageHeader";
import ChatRoom from "@/components/Organization/ChatRoom";
import UserList from "@/components/Organization/UserList";

export default function OrganizationPage() {
  return (
    <PageWrapper>
      <div className=" h-full w-full">
        <div className="absolute top-6 left-6 right-6 z-10">
          <PageHeader
            title="The Organization"
            description="Secure encrypted communication channel."
          />
        </div>

        {/* Main Grid: Chat (3fr) - Users (1fr) */}
        {/* Fixed positioning to sit between Header (approx 100px) and Bottom/Terminal */}
        <div className="absolute top-[100px] bottom-[100px] left-6 right-6 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
          {/* Chat Room */}
          <div className="lg:col-span-3 h-full min-h-0">
            <ChatRoom />
          </div>

          {/* User List */}
          <div className="lg:col-span-1 h-full min-h-0">
            <UserList />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
