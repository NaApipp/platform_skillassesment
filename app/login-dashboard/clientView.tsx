"use client";

import Link from "next/link";
import { useState } from "react";
import { authStorageKeys } from "../(admin)/authProvider";
import { useRouter } from "next/navigation";
import { Lock, TriangleAlert } from "lucide-react";

export default function LoginDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!res.ok) {
      setError('Invalid username or password');
      setLoading(false);
      return;
    }

    const data = await res.json();
    sessionStorage.setItem(authStorageKeys.TOKEN_KEY, data.token);
    sessionStorage.setItem(authStorageKeys.LAST_ACTIVITY_KEY, String(Date.now()));
    router.push('/dashboard-admin');
  };


  return (
    <>
      <div className="min-h-screen bg-[#FBF9F9] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <div className="bg-white  rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#008ED3] rounded-full mb-4">
                <Lock className="text-white" size={26} />
              </div>
              <h2 className="text-2xl font-bold text-[#111827]">
                Welcome back
              </h2>
              <p className="text-[#6B7280]">
                Sign in to your account
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-[#374151] mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#D1D5DB] rounded-lg focus:ring-2 focus-[#008ED3] 
                            focus:border-[#008ED3] outline-none transition-colors text-[#374151]
                            placeholder-[#9CA3AF]"
                  placeholder="username"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[#374151]"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="text-sm font-medium text-[#008ED3] hover:text-[#008ED3]/80"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 bg-white border border-[#D1D5DB] rounded-lg focus:ring-2 focus-[#008ED3] 
                            focus:border-[#008ED3] outline-none transition-colors text-[#374151]
                            placeholder-[#9CA3AF]"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#008ED3] text-white py-3 px-4 rounded-lg font-bold hover:bg-[#008ED3]/80 transition-colors cursor-pointer"
              >
                Masuk
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-[#4B5563]">
              Kembali ke halaman utama?
              <Link
                href="/dashboard"
                className="font-bold text-[#008ED3] hover:text-[#008ED3]/80 ml-2"
              >
                Halaman Utama
              </Link>
            </p>
          </div>
        </div>

      {/* Popup Modal Forgit Password */}
        {isOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setIsOpen(false)}
            />
            <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4 ring-4 ring-red-50">
                  <TriangleAlert size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Lupa Password
                </h3>
                <p className="text-gray-500 text-sm mb-6 text-center">
                  Untuk saat ini fitur reset password mandiri belum tersedia. 
                  Silakan hubungi developer (IG: @n_apipppp) untuk bantuan reset password.
                </p>
              </div>
              <div className="flex gap-3 w-full">
                <button
                onClick={() => setIsOpen(false)}
                className="flex-1 py-2.5 bg-[#008ED3] text-white py-3 px-4 rounded-lg font-bold hover:bg-[#008ED3]/80 transition-colors cursor-pointer">
                  Mengerti
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
