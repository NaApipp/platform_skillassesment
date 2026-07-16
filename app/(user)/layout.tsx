"use client";

// Import Components
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex h-screen bg-gray-50/50 dark:bg-gray-950">
        <Sidebar />
        <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">
          {children}
          <footer>
            <Footer />
          </footer>
        </main>
      </div>
    </>
  );
}
