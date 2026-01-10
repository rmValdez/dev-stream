"use client";

import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

import PageHeader from "@/components/PageHeader/PageHeader";

export default function ProfilePage() {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <PageHeader title="User Profile" />
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <p className="text-white/60 font-mono text-sm leading-relaxed">
            [SYSTEM] Retrieving user dossier...
            <br />
            Identity verified. Clearance Level: 5 (Architect)
          </p>
          <div className="mt-8 flex items-center gap-6">
            <div
              className="w-24 h-24 rounded-full bg-cover border-2 border-white/10 shadow-2xl"
              style={{
                backgroundImage:
                  "url('https://replicate.delivery/pbxt/JR3pX7O7l5O4TfL8g6e4k8g8k8k8k8k8k8k8k8k8k8k8k8k8/https://lh3.googleusercontent.com/aida-public/AB6AXuC2Tkx2dc7TbK-Cx0HB2u64H6Rh7off1CUQYFWVPmJ14y7mZy29upnjlzPfjlHOrkkVY8GbQWt6f9W7kcYGN2yz2y-yEdtCFRDWKpcbpDPtPVF6DXyHTxHNBK3It5KQFUJGxtCu3E_vn7cn4qjAOHpTm4Mn_Gb6h1lbI0AWVqy53kial7DzWi2PvHxbZoKFF3Y1Q70WpDVMmeuapDgtDvq-JZDwkKKlQa1oNe6njTX2EdrSiSWWKXXG19lojDd4OyxrUnaNrfHS2g6c')",
              }}
            ></div>
            <div className="space-y-2">
              <div className="h-6 bg-white/10 rounded w-48 animate-pulse"></div>
              <div className="h-4 bg-white/5 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
