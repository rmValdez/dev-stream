import RouteGuard from "@/components/RouteGuard";

/**
 * Example: Admin-only page
 * This page is only accessible to users with "admin" role
 */
export default function AdminDashboard() {
  return (
    <RouteGuard requiredRoles="admin" redirectTo="/">
      <div className="flex-1 p-8 overflow-y-auto h-full">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-4xl text-primary">
              admin_panel_settings
            </span>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-black/20 border border-white/5">
              <h3 className="text-lg font-bold mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-primary">1,248</p>
            </div>
            <div className="p-6 rounded-xl bg-black/20 border border-white/5">
              <h3 className="text-lg font-bold mb-2">Active Sessions</h3>
              <p className="text-3xl font-bold text-primary">342</p>
            </div>
            <div className="p-6 rounded-xl bg-black/20 border border-white/5">
              <h3 className="text-lg font-bold mb-2">System Health</h3>
              <p className="text-3xl font-bold text-green-500">98.5%</p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-black/20 border border-white/5">
            <h2 className="text-xl font-bold mb-4">Admin Controls</h2>
            <p className="text-white/60">
              This content is only visible to administrators.
            </p>
          </div>
        </div>
      </div>
    </RouteGuard>
  );
}
