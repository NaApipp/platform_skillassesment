"use client";

import { useState, useEffect } from "react";
import { 
  Award, 
  Calendar, 
  User, 
  ClipboardList, 
  ArrowRight, 
  Trash2, 
  Target, 
  Info,
  ChevronDown,
  ChevronUp
} from "lucide-react";

type Kuadran = "Strategis" | "Visioner" | "Explorer" | "Teknis";

interface Submission {
  id: string;
  nama: string;
  nim: string;
  skorBisnis: number;
  skorTeknologi: number;
  kuadran: Kuadran;
  createdAt: string;
}

const QUADRANT_BADGES: Record<Kuadran, string> = {
  Visioner:  "bg-[#BBF7D0] text-[#15803D] border-[#DCFCE7]",
  Strategis: "bg-[#008ED3] text-[#ffff]",
  Teknis:    "bg-[#F37021] text-[#ffffff]",
  Explorer:  "bg-[#C3C4C7] text-[#111827] border-[#E5E7EB]"
};

export default function Page() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const existing = localStorage.getItem("students_submissions");
    if (existing) {
      try {
        const parsed = JSON.parse(existing);
        // Sort by newest first
        parsed.sort((a: Submission, b: Submission) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setSubmissions(parsed);
      } catch (e) {
        console.error("Gagal parsing submissions history:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const handleClearHistory = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus semua riwayat asesmen?")) {
      localStorage.removeItem("students_submissions");
      setSubmissions([]);
      setExpandedId(null);
    }
  };

  const handleToggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen py-10 px-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 px-4 bg-[#FBF9F9]">
      {/* Title */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#111827] flex items-center gap-3">
            <ClipboardList className="w-8 h-8 text-[#F37021] bg-[#F37021]/10 rounded-lg p-1" />
            Riwayat Asesmen Saya
          </h1>
          <p className="mt-2 text-[#6B7280]">
            Lihat kembali hasil pengukuran minat Bisnis vs Teknologi dari asesmen yang telah Anda lakukan.
          </p>
        </div>

        {submissions.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="px-4 py-2 text-xs font-bold text-red-600 bg-red-50 border border-red-600 rounded-xl hover:bg-red-100 flex items-center gap-1.5 transition cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" /> Hapus Riwayat
          </button>
        )}
      </div>

      <div className="max-w-4xl mx-auto">
        {submissions.length === 0 ? (
          /* Empty State */
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-150 dark:border-gray-800 shadow-lg p-10 text-center space-y-6 max-w-xl mx-auto">
            <div className="w-16 h-16 bg-gray-50 dark:bg-gray-850 rounded-full flex items-center justify-center mx-auto text-gray-400">
              <ClipboardList className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Belum Ada Riwayat</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Anda belum melakukan asesmen kompetensi Sistem Informasi. Mulailah sekarang untuk mengetahui kecenderungan karir Anda!
              </p>
            </div>
            <button
              onClick={() => window.location.href = "/penilaian-skill"}
              className="px-6 py-3 rounded-xl bg-lime-500 hover:bg-lime-600 text-gray-950 font-extrabold text-sm transition flex items-center justify-center gap-2 mx-auto shadow-md shadow-lime-500/10 hover:scale-[1.02] cursor-pointer"
            >
              Mulai Asesmen <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Submissions List */
          <div className="space-y-4">
            {submissions.map((sub) => {
              const isExpanded = expandedId === sub.id;
              const formattedDate = new Date(sub.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              });

              return (
                <div 
                  key={sub.id}
                  className="bg-white rounded-3xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  {/* Header Row */}
                  <div 
                    onClick={() => handleToggleExpand(sub.id)}
                    className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-450 dark:text-gray-500">
                          <Calendar className="w-3.5 h-3.5" /> {formattedDate}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-lg text-[#111827] flex flex-wrap items-center gap-x-2 gap-y-1">
                        <User className="w-4 h-4 text-[#008ED3] inline shrink-0" /> {sub.nama} 
                        <span className="text-[#111827] font-medium text-sm">({sub.nim})</span>
                      </h3>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      {/* Quadrant Badge */}
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${QUADRANT_BADGES[sub.kuadran]}`}>
                        {sub.kuadran}
                      </span>
                      
                      <div className="text-gray-400 dark:text-gray-600 shrink-0">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-4 border-t border-gray-100 bg-[#FBF9F9] space-y-6 animate-in fade-in slide-in-from-top-2 duration-200">
                      
                      {/* Scores detail row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Business Score progress */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-xs font-bold">
                            <span className="text-[#6B7280]">Skor Bisnis</span>
                            <span className="text-[#008ED3]">{sub.skorBisnis}%</span>
                          </div>
                          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-[#008ED3] h-full rounded-full"
                              style={{ width: `${sub.skorBisnis}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Technology Score progress */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-xs font-bold">
                            <span className="text-[#6B7280]">Skor Teknologi</span>
                            <span className="text-[#F37021]">{sub.skorTeknologi}%</span>
                          </div>
                          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-[#F37021] h-full rounded-full"
                              style={{ width: `${sub.skorTeknologi}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Diagnostic Analysis Card */}
                      <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-2 shadow-sm">
                        <div className="flex items-center gap-2 text-sm font-bold text-[#111827]">
                          <Award className="w-4 h-4 text-[#F37021]" /> Analisis Kompetensi
                        </div>
                        <p className="text-xs text-[#6B7280] leading-relaxed">
                          Berdasarkan hasil asesmen, Anda memiliki skor dominan di kuadran <strong className="text-[#111827]">{sub.kuadran}</strong>. Anda cenderung menyukai peran yang melibatkan kolaborasi, {
                            sub.kuadran === "Visioner" 
                              ? "menyelaraskan solusi teknis dengan arah strategis perusahaan secara kreatif."
                              : sub.kuadran === "Strategis"
                                ? "proses operasional bisnis, manajemen proyek, dan komunikasi dengan klien."
                                : sub.kuadran === "Teknis"
                                  ? "implementasi detail, penulisan kode, perancangan database, serta pemecahan masalah logis."
                                  : "eksplorasi dasar sistem informasi, dukungan operasional sistem, dan penyusunan panduan teknis."
                          }
                        </p>
                      </div>

                      {/* Mini Action buttons */}
                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          onClick={() => {
                            // Quick way to set state in penilaian-skill so user can view results there
                            // (We could also just let them redirect to the page, but let's keep it simple)
                            window.location.href = `/penilaian-skill`;
                          }}
                          className="px-4 py-2 text-xs font-bold bg-white border border-gray-200 text-[#111827] hover:bg-gray-50 rounded-xl transition cursor-pointer shadow-sm"
                        >
                          Lakukan Tes Lagi
                        </button>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}