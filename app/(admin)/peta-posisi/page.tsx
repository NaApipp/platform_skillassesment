"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import {
  Users,
  TrendingUp,
  Cpu,
  PieChart,
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  User,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StudentSubmission {
  _id: string;
  identity: {
    fullname: string;
    nim: string;
  };
  scores: {
    bisnis: number;
    teknologi: number;
  };
  quadrant: string;
  recommendations: string[];
  createdAt: string;
  createdAtWIB: string;
}

interface ApiResponse {
  success: boolean;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: StudentSubmission[];
}

interface ScatterPoint {
  x: number;
  y: number;
  name: string;
  nim: string;
  quadrant: string;
  totalScore: number;
  recommendation: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const QUADRANT_COLORS: Record<string, string> = {
  Visioner: "#22c55e",   // Kuadran I  — hijau
  Strategis: "#3b82f6", // Kuadran II — biru
  Explorer: "#f97316",  // Kuadran III — oranye
  Teknis: "#a855f7",    // Kuadran IV — ungu
};

const QUADRANT_LABELS: Record<string, string> = {
  Visioner: "Kuadran I",
  Strategis: "Kuadran II",
  Explorer: "Kuadran III",
  Teknis: "Kuadran IV",
};

const QUADRANT_BG: Record<string, string> = {
  Visioner: "bg-emerald-100 text-emerald-700",
  Strategis: "bg-blue-100 text-blue-700",
  Explorer: "bg-orange-100 text-orange-700",
  Teknis: "bg-purple-100 text-purple-700",
};

function getQuadrantLabel(q: string): string {
  return QUADRANT_LABELS[q] ?? q;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function getRecommendationText(student: StudentSubmission): string {
  if (student.recommendations && student.recommendations.length > 0) {
    const rec = student.recommendations[0];
    if (typeof rec === "string") return rec;
    if (typeof rec === "object" && (rec as { namaKarier?: string }).namaKarier) {
      const r = rec as { namaKarier: string; deskripsi?: string };
      return `${r.namaKarier}${r.deskripsi ? ` — ${r.deskripsi}` : ""}`;
    }
  }
  return "-";
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

interface TooltipPayload {
  payload: ScatterPoint;
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
}) => {
  if (!active || !payload || payload.length === 0) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-xl p-3 text-xs min-w-[180px]">
      <p className="font-bold text-gray-800 text-sm mb-1">{d.name}</p>
      <p className="text-gray-500 mb-2">{d.nim}</p>
      <div className="space-y-1">
        <div className="flex justify-between gap-4">
          <span className="text-gray-500">Bisnis (Y)</span>
          <span className="font-semibold text-emerald-600">{d.y}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-500">Teknologi (X)</span>
          <span className="font-semibold text-blue-600">{d.x}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-500">Kuadran</span>
          <span className="font-semibold">{getQuadrantLabel(d.quadrant)}</span>
        </div>
      </div>
    </div>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  iconBg: string;
  trend?: number[];
}

const MiniSparkline = ({ values, color }: { values: number[]; color: string }) => {
  if (values.length < 2) return null;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 64;
  const h = 24;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} className="opacity-80">
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const StatCard = ({
  icon,
  label,
  value,
  sub,
  color,
  iconBg,
  trend,
}: StatCardProps) => (
  <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
    <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
      <span className={color}>{icon}</span>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-gray-500 font-medium truncate">{label}</p>
      <p className="text-2xl font-extrabold text-gray-900 leading-tight">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
    {trend && trend.length > 1 && (
      <div className="flex-shrink-0">
        <MiniSparkline
          values={trend}
          color={
            color.includes("rose")
              ? "#f43f5e"
              : color.includes("blue")
              ? "#3b82f6"
              : color.includes("emerald")
              ? "#22c55e"
              : "#f97316"
          }
        />
      </div>
    )}
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const PAGE_SIZE_OPTIONS = [10, 25, 50];

export default function PetaPosisi() {
  const [allData, setAllData] = useState<StudentSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [tablePage, setTablePage] = useState(1);
  const [tableLimit, setTableLimit] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [tableData, setTableData] = useState<StudentSubmission[]>([]);
  const [tableLoading, setTableLoading] = useState(false);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ page: "1", limit: "100" });
      if (searchQuery) params.set("fullname", searchQuery);
      const res = await fetch(`/api/assesment?${params.toString()}`);
      if (!res.ok) throw new Error("Gagal mengambil data");
      const json: ApiResponse = await res.json();
      if (json.success) {
        setAllData(json.data);
        setTotalRecords(json.pagination.total);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  const fetchTableData = useCallback(async () => {
    setTableLoading(true);
    try {
      const params = new URLSearchParams({
        page: tablePage.toString(),
        limit: tableLimit.toString(),
      });
      if (searchQuery) params.set("fullname", searchQuery);
      const res = await fetch(`/api/assesment?${params.toString()}`);
      if (!res.ok) throw new Error("Gagal mengambil data tabel");
      const json: ApiResponse = await res.json();
      if (json.success) {
        setTableData(json.data);
        setTotalRecords(json.pagination.total);
        setTotalPages(json.pagination.totalPages);
      }
    } catch {
      // silent
    } finally {
      setTableLoading(false);
    }
  }, [searchQuery, tablePage, tableLimit]);

  useEffect(() => { fetchAllData(); }, [fetchAllData]);
  useEffect(() => { fetchTableData(); }, [fetchTableData]);
  useEffect(() => { setTablePage(1); }, [searchQuery]);

  const validData = allData.filter(
    (s) => s.scores?.bisnis != null && s.scores?.teknologi != null
  );

  const avgBisnis =
    validData.length > 0
      ? (validData.reduce((s, d) => s + d.scores.bisnis, 0) / validData.length).toFixed(1)
      : "0";
  const avgTeknologi =
    validData.length > 0
      ? (validData.reduce((s, d) => s + d.scores.teknologi, 0) / validData.length).toFixed(1)
      : "0";

  const quadrantI = validData.filter((d) => d.quadrant === "Visioner").length;
  const distribSeimbang =
    validData.length > 0
      ? ((quadrantI / validData.length) * 100).toFixed(1)
      : "0";

  const bisnisTrend = validData.slice(-7).map((d) => d.scores.bisnis);
  const tekTrend = validData.slice(-7).map((d) => d.scores.teknologi);

  const byQuadrant: Record<string, ScatterPoint[]> = {
    Visioner: [],
    Strategis: [],
    Explorer: [],
    Teknis: [],
  };

  validData.forEach((s) => {
    const q = s.quadrant in byQuadrant ? s.quadrant : "Explorer";
    byQuadrant[q].push({
      x: s.scores.teknologi,
      y: s.scores.bisnis,
      name: s.identity.fullname,
      nim: s.identity.nim,
      quadrant: s.quadrant,
      totalScore: (s.scores.bisnis + s.scores.teknologi) / 2,
      recommendation: getRecommendationText(s),
    });
  });

  const handleExport = () => {
    const headers = ["No", "Nama Siswa", "NIM", "Bisnis (Y)", "Teknologi (X)", "Kuadran", "Skor Total", "Rekomendasi"];
    const rows = allData.map((s, i) => [
      i + 1,
      `"${s.identity.fullname}"`,
      s.identity.nim,
      s.scores?.bisnis ?? "-",
      s.scores?.teknologi ?? "-",
      s.quadrant,
      s.scores ? ((s.scores.bisnis + s.scores.teknologi) / 2).toFixed(1) : "-",
      `"${getRecommendationText(s)}"`,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "peta-posisi-siswa.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const sidebarList = allData.slice(0, 8);

  const AVATAR_COLORS = [
    "bg-emerald-500", "bg-blue-500", "bg-orange-500", "bg-purple-500",
    "bg-rose-500", "bg-cyan-500", "bg-indigo-500", "bg-teal-500",
  ];
  const avatarColor = (i: number) => AVATAR_COLORS[i % AVATAR_COLORS.length];

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Peta Posisi Siswa
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Visualisasi posisi siswa berdasarkan dimensi Bisnis &amp; Teknologi
          </p>
        </div>
        <button
          onClick={handleExport}
          disabled={loading || allData.length === 0}
          className="flex items-center gap-2 bg-[#4338ca] hover:bg-[#3730a3] disabled:opacity-50 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Export Laporan
        </button>
      </div>

      <div className="flex gap-6">
        {/* Left Sidebar */}
        <div className="w-64 flex-shrink-0 space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h2 className="font-bold text-sm text-gray-800 mb-4">Filter</h2>
            <div>
              <label className="text-xs text-gray-600 font-medium block mb-1">
                Pencarian Siswa
              </label>
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    id="search-siswa"
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Cari nama siswa..."
                    className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 bg-gray-50"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 w-full bg-[#4338ca] hover:bg-[#3730a3] text-white text-xs font-semibold py-2 rounded-lg transition cursor-pointer"
                >
                  Cari
                </button>
              </form>
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(""); setSearchInput(""); }}
                  className="mt-1.5 w-full text-xs text-gray-500 hover:text-red-500 transition cursor-pointer flex items-center justify-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Reset Filter
                </button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h2 className="font-bold text-sm text-gray-800 mb-3">
              Daftar Siswa ({totalRecords})
            </h2>

            {loading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2 animate-pulse">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-1">
                      <div className="h-2.5 bg-gray-200 rounded w-3/4" />
                      <div className="h-2 bg-gray-100 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <p className="text-xs text-red-500">{error}</p>
            ) : (
              <div className="space-y-2.5">
                {sidebarList.map((s, i) => {
                  const qColor = QUADRANT_COLORS[s.quadrant] || "#6b7280";
                  return (
                    <div key={s._id} className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 ${avatarColor(i)} rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold`}>
                        {getInitials(s.identity.fullname)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 truncate">{s.identity.fullname}</p>
                        <p className="text-[10px] text-gray-400 truncate">{s.identity.nim}</p>
                      </div>
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded-md text-white flex-shrink-0"
                        style={{ backgroundColor: qColor }}
                      >
                        {s.scores ? ((s.scores.bisnis + s.scores.teknologi) / 2).toFixed(1) : "-"}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {totalRecords > 8 && !loading && (
              <button
                onClick={() => setTablePage(1)}
                className="mt-3 w-full text-xs text-[#4338ca] hover:text-[#3730a3] font-semibold flex items-center justify-center gap-1 transition cursor-pointer"
              >
                Lihat semua siswa →
              </button>
            )}
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 min-w-0 space-y-5">
          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-4">
            <StatCard
              icon={<Users className="w-5 h-5" />}
              label="Total Mahasiswa"
              value={totalRecords}
              sub="Mahasiswa Terdaftar"
              color="text-indigo-700"
              iconBg="bg-indigo-100"
            />
            <StatCard
              icon={<TrendingUp className="w-5 h-5" />}
              label="Rata-rata Bisnis"
              value={avgBisnis}
              sub="dari 100"
              color="text-rose-600"
              iconBg="bg-rose-100"
            //   trend={bisnisTrend}
            />
            <StatCard
              icon={<Cpu className="w-5 h-5" />}
              label="Rata-rata Teknologi"
              value={avgTeknologi}
              sub="dari 100"
              color="text-blue-600"
              iconBg="bg-blue-100"
            //   trend={tekTrend}
            />
            <StatCard
              icon={<PieChart className="w-5 h-5" />}
              label="Distribusi Seimbang"
              value={`${distribSeimbang}%`}
              sub="di Kuadran Ideal"
              color="text-emerald-600"
              iconBg="bg-emerald-100"
            />
          </div>

          {/* Scatter Chart */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">Peta Posisi Siswa</h2>
              <div className="flex items-center gap-4 text-xs">
                {Object.entries(QUADRANT_COLORS).map(([q, color]) => (
                  <span key={q} className="flex items-center gap-1.5">
                    <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-gray-600">{getQuadrantLabel(q)}</span>
                  </span>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="h-80 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-[#4338ca] border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-gray-400">Memuat data chart...</p>
                </div>
              </div>
            ) : error ? (
              <div className="h-80 flex items-center justify-center text-red-400 text-sm">{error}</div>
            ) : validData.length === 0 ? (
              <div className="h-80 flex items-center justify-center text-gray-400 text-sm">Tidak ada data</div>
            ) : (
              <ResponsiveContainer width="100%" height={340}>
                <ScatterChart margin={{ top: 10, right: 20, bottom: 30, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    type="number"
                    dataKey="x"
                    domain={[0, 100]}
                    label={{ value: "Teknologi", position: "insideBottom", offset: -15, style: { fontSize: 12, fill: "#6b7280", fontWeight: 600 } }}
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    tickLine={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    domain={[0, 100]}
                    label={{ value: "Bisnis", angle: -90, position: "insideLeft", offset: 15, style: { fontSize: 12, fill: "#6b7280", fontWeight: 600 } }}
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                    tickLine={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine x={50} stroke="#e5e7eb" strokeDasharray="4 4" strokeWidth={1.5} />
                  <ReferenceLine y={50} stroke="#e5e7eb" strokeDasharray="4 4" strokeWidth={1.5} />
                  {Object.entries(byQuadrant).map(([q, pts]) => (
                    <Scatter key={q} name={q} data={pts} fill={QUADRANT_COLORS[q]}>
                      {pts.map((_, idx) => (
                        <Cell key={idx} fill={QUADRANT_COLORS[q]} fillOpacity={0.85} stroke="white" strokeWidth={1.5} />
                      ))}
                    </Scatter>
                  ))}
                </ScatterChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">Data Posisi Siswa</h2>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>Tampilkan</span>
                <select
                  id="page-size-select"
                  value={tableLimit}
                  onChange={(e) => { setTableLimit(Number(e.target.value)); setTablePage(1); }}
                  className="border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 text-xs cursor-pointer"
                >
                  {PAGE_SIZE_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <span>data</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["No", "Nama Siswa", "NIM", "Bisnis (Y)", "Teknologi (X)", "Kuadran", "Skor Total", "Rekomendasi"].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold text-gray-500 pb-3 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableLoading ? (
                    [...Array(tableLimit > 5 ? 5 : tableLimit)].map((_, i) => (
                      <tr key={i} className="border-b border-gray-50 animate-pulse">
                        {[...Array(8)].map((_, j) => (
                          <td key={j} className="py-3 pr-4">
                            <div className="h-3 bg-gray-100 rounded w-full" />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : tableData.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-gray-400 text-sm">
                        <User className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                        Tidak ada data ditemukan
                      </td>
                    </tr>
                  ) : (
                    tableData.map((s, i) => {
                      const q = s.quadrant;
                      const totalScore = s.scores
                        ? ((s.scores.bisnis + s.scores.teknologi) / 2).toFixed(1)
                        : "-";
                      const rowNum = (tablePage - 1) * tableLimit + i + 1;
                      return (
                        <tr key={s._id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors duration-150">
                          <td className="py-3 pr-4 text-gray-400 font-medium text-xs">{rowNum}</td>
                          <td className="py-3 pr-4">
                            <div className="flex items-center gap-2">
                              <div className={`w-7 h-7 ${avatarColor(i)} rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
                                {getInitials(s.identity.fullname)}
                              </div>
                              <span className="font-semibold text-gray-800 text-xs truncate max-w-[120px]">
                                {s.identity.fullname}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 pr-4 text-xs text-gray-500">{s.identity.nim}</td>
                          <td className="py-3 pr-4 text-xs font-semibold text-rose-600">{s.scores?.bisnis ?? "-"}</td>
                          <td className="py-3 pr-4 text-xs font-semibold text-blue-600">{s.scores?.teknologi ?? "-"}</td>
                          <td className="py-3 pr-4">
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${QUADRANT_BG[q] || "bg-gray-100 text-gray-600"}`}>
                              {getQuadrantLabel(q)}
                            </span>
                          </td>
                          <td className="py-3 pr-4 text-xs font-bold text-gray-700">{totalScore}</td>
                          <td className="py-3 text-xs text-gray-500 max-w-[200px]">
                            <span className="line-clamp-2 leading-relaxed">{getRecommendationText(s)}</span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                {tableData.length > 0 ? (
                  <>
                    Menampilkan{" "}
                    <strong>{(tablePage - 1) * tableLimit + 1} sampai {Math.min(tablePage * tableLimit, totalRecords)}</strong>{" "}
                    dari <strong>{totalRecords}</strong> data
                  </>
                ) : "Tidak ada data"}
              </p>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setTablePage((p) => Math.max(1, p - 1))}
                  disabled={tablePage === 1 || tableLoading}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let page: number;
                  if (totalPages <= 5) page = i + 1;
                  else if (tablePage <= 3) page = i + 1;
                  else if (tablePage >= totalPages - 2) page = totalPages - 4 + i;
                  else page = tablePage - 2 + i;
                  return (
                    <button
                      key={page}
                      onClick={() => setTablePage(page)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold transition cursor-pointer ${
                        page === tablePage
                          ? "bg-[#4338ca] text-white shadow-sm"
                          : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => setTablePage((p) => Math.min(totalPages, p + 1))}
                  disabled={tablePage === totalPages || tableLoading || totalPages === 0}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}