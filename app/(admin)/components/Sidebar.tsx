"use client"

import Link from "next/link";
import { useAuth } from "../authProvider";
import { Home, Settings, Map, LogOut } from "lucide-react";

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <>
      <div className="flex h-screen w-16 flex-col justify-between border-e bg-[#008ED3]">
        <div>
          <div className="inline-flex size-16 items-center justify-center">
            <span className="grid size-10 place-content-center rounded-lg bg-white text-xl font-bold text-[#008ED3]">
              B
            </span>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-800">
            <div className="px-2">
              <div className="py-4">
                <Link
                  href="/settings"
                  className="t group relative flex justify-center rounded bg-lime-50 px-2 py-1.5 text-lime-700 dark:bg-lime-900 dark:text-lime-100"
                >
                  <Settings />

                  <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                    General
                  </span>
                </Link>
              </div>

              <ul className="space-y-1 border-t border-gray-100 pt-4 dark:border-gray-800">
                <li>
                  <Link
                    href="/dashboard-admin"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  >
                    <Home className="text-white" />

                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Dashboard
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/peta-posisi"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  >
                    <Map className="text-white" />

                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Peta Posisi
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-[#008ED3] p-2">
          <Link
            href="/login-dashboard"
            className="cursor-pointer"
            onClick={logout}>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-white hover:bg-white/20 hover:text-gray-700"
            >
              <LogOut className="text-white"/>
              <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                Logout
              </span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
