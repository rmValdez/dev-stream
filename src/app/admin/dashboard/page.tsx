import React from "react";
import RouteGuard from "@/components/RouteGuard";
import PageWrapper from "@/components/ReusableComponent/PageWrapperComponent";
import PageHeader from "@/components/PageHeader/PageHeader";

export default function AdminDashboard() {
  return (
    <RouteGuard requiredRoles="admin" redirectTo="/">
      <PageWrapper>
        <div className="space-y-6">
          <PageHeader
            title="Admin Dashboard"
            description="System-wide administrative controls and metrics"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-bold mb-4">User Statistics</h3>
              <p className="text-slate-500 dark:text-white/40 font-mono text-sm">
                Total Users: 1,284
                <br />
                Active Sessions: 42
              </p>
            </div>
            {/* Additional admin widgets can be added here */}
          </div>
        </div>
      </PageWrapper>
    </RouteGuard>
  );
}
