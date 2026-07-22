"use client"

import { useAuth } from "../authProvider";
import { Users, ClipboardList, TrendingUp, Activity } from "lucide-react";

export default function DashboardAdmin() {
  const { user } = useAuth();
  

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#008ED3] to-[#005B88] rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold mb-2">
            Selamat Datang, {user?.username}! 👋
          </h1>
          <p className="text-blue-100 max-w-xl text-sm leading-relaxed mt-2">
            Ini adalah pusat kendali Anda. Pantau perkembangan asesmen siswa, kelola data, dan analisis peta kompetensi dengan mudah melalui dashboard ini.
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-1/4 -translate-y-1/4">
          <Activity className="w-64 h-64" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Stat 1 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4 transition hover:shadow-md">
          <div className="bg-blue-50 text-[#008ED3] p-4 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Siswa</p>
            <h3 className="text-2xl font-bold text-gray-900">-</h3>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4 transition hover:shadow-md">
          <div className="bg-orange-50 text-[#F37021] p-4 rounded-xl">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Asesmen</p>
            <h3 className="text-2xl font-bold text-gray-900">-</h3>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4 transition hover:shadow-md">
          <div className="bg-green-50 text-green-600 p-4 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Rata-rata Skor</p>
            <h3 className="text-2xl font-bold text-gray-900">-</h3>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4 transition hover:shadow-md">
          <div className="bg-purple-50 text-purple-600 p-4 rounded-xl">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Aktivitas Hari Ini</p>
            <h3 className="text-2xl font-bold text-gray-900">-</h3>
          </div>
        </div>
      </div>
      
     
    </div>
  );
}
