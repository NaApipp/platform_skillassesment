// app/(protected)/layout.tsx
import { AuthProvider } from "./authProvider";

import type { Metadata } from "next";

import Sidebar from "./components/Sidebar";


export const metadata: Metadata = {
  title: 'SuperApps Dashboard',
  description: 'Access Dashboard SuperApps (Private)',
}


export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>

  <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        {/* Content */}
        {children}
      </main>
    </div>
    </AuthProvider>;
}
