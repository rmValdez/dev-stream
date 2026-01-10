import React from "react";
import PostCreator from "@/components/PostCreator/PostCreator";
import FeedStream from "@/components/FeedStream/FeedStream";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <PostCreator />
      <FeedStream />
    </PageWrapper>
  );
}
