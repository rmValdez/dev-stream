"use client";

import React from "react";
import FeedStream from "@/components/FeedStream/FeedStream";
import PostCreator from "@/components/PostCreator/PostCreator";
import PageHeader from "@/components/PageHeader/PageHeader";
import PageWrapper from "@/components/ReusableComponent/PageWrapperComponent";

export default function HotModulesPage() {
  return (
    <PageWrapper>
      <PageHeader
        title="Hot Modules"
        description="Live feed updates and system notifications"
      />
      <PostCreator />
      <FeedStream />
    </PageWrapper>
  );
}
