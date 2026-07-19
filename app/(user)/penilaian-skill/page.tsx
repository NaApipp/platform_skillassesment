"use client";

import { useState, useEffect } from "react";
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  ClipboardList, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  BookOpen, 
  ArrowRight,
  RefreshCw,
  Info,
  Target,
  TrendingUp,
  FileText
} from "lucide-react";
import { questionsSeed } from "@/app/lib/seed-question";

type Kuadran = "Strategis" | "Visioner" | "Explorer" | "Teknis";

interface FormData {
  fullName: string;
  nim: string;
  agreeTerms: boolean;
}

interface CareerRecommendation {
  namaKarier: string;
  deskripsi: string;
  labelKecocokan: "Sangat Sesuai" | "Sesuai" | "Cukup Sesuai";
}

const RECOMMENDATIONS: Record<Kuadran, CareerRecommendation[]> = {
  Visioner: [
    { namaKarier: "Product Manager", deskripsi: "Memimpin pengembangan produk teknologi dengan menyelaraskan kebutuhan bisnis dan kelayakan teknis.", labelKecocokan: "Sangat Sesuai" },
    { namaKarier: "Solution Architect", deskripsi: "Merancang solusi teknologi spesifik untuk memecahkan masalah bisnis client.", labelKecocokan: "Sangat Sesuai" },
    { namaKarier: "Enterprise Architect", deskripsi: "Merancang keselarasan antara strategi bisnis organisasi dengan infrastruktur IT secara menyeluruh.", labelKecocokan: "Sesuai" },
    { namaKarier: "IT Consultant", deskripsi: "Membantu organisasi mengoptimalkan penggunaan teknologi untuk mencapai tujuan bisnis.", labelKecocokan: "Cukup Sesuai" }
  ],
  Strategis: [
    { namaKarier: "Business Analyst", deskripsi: "Menganalisis kebutuhan bisnis, mendokumentasikan proses bisnis, dan merancang solusi non-teknis.", labelKecocokan: "Sangat Sesuai" },
    { namaKarier: "IT Project Manager", deskripsi: "Mengelola timeline, budget, sumber daya, dan risiko proyek IT agar berjalan sesuai target bisnis.", labelKecocokan: "Sangat Sesuai" },
    { namaKarier: "Product Owner", deskripsi: "Menyusun backlog produk, menentukan prioritas fitur bisnis, dan mewakili suara stakeholder bisnis.", labelKecocokan: "Sesuai" },
    { namaKarier: "System Analyst", deskripsi: "Menjembatani komunikasi antara kebutuhan bisnis dengan spesifikasi teknis tim developer.", labelKecocokan: "Cukup Sesuai" }
  ],
  Teknis: [
    { namaKarier: "Software Engineer / Developer", deskripsi: "Menulis, menguji, dan memelihara kode pemrograman untuk membangun aplikasi berkualitas tinggi.", labelKecocokan: "Sangat Sesuai" },
    { namaKarier: "Data Engineer / Backend Specialist", deskripsi: "Mengelola sistem database, memastikan keamanan data, backup, dan performa query optimal.", labelKecocokan: "Sangat Sesuai" },
    { namaKarier: "QA / System Tester", deskripsi: "Merancang test case dan menguji sistem untuk memastikan perangkat lunak bebas bug.", labelKecocokan: "Sesuai" },
    { namaKarier: "System Administrator", deskripsi: "Mengonfigurasi dan memelihara infrastruktur server, network, dan sistem operasi.", labelKecocokan: "Cukup Sesuai" }
  ],
  Explorer: [
    { namaKarier: "IT Support Specialist", deskripsi: "Membantu mengatasi kendala teknis harian pengguna sistem informasi.", labelKecocokan: "Sangat Sesuai" },
    { namaKarier: "Technical Writer", deskripsi: "Menyusun dokumentasi teknis, user manual, dan panduan penggunaan sistem.", labelKecocokan: "Sangat Sesuai" },
    { namaKarier: "Data Analyst Assistant", deskripsi: "Membantu pengolahan data dasar dan administrasi operasional IT.", labelKecocokan: "Sesuai" },
    { namaKarier: "QA Support", deskripsi: "Membantu jalannya pengujian sistem secara manual berdasarkan skenario dasar.", labelKecocokan: "Cukup Sesuai" }
  ]
};

const QUADRANT_EXPLANATIONS: Record<Kuadran, string> = {
  Visioner: "Tipe Visioner memiliki pemahaman yang kuat baik di bidang bisnis maupun teknologi. Anda mampu melihat peluang pasar baru dan merancang solusi IT yang komprehensif untuk memanfaatkannya.",
  Strategis: "Tipe Strategis berfokus pada nilai bisnis, proses organisasi, dan manajemen proyek. Anda unggul dalam memahami kebutuhan client, merancang strategi, dan memastikan proyek IT memberikan dampak bisnis maksimal.",
  Teknis: "Tipe Teknis berfokus pada implementasi coding, algoritma, arsitektur sistem, dan manajemen database. Anda sangat kuat dalam pemecahan masalah teknis dan membangun sistem yang kokoh dan efisien.",
  Explorer: "Tipe Explorer sedang menjelajahi dasar-dasar sistem informasi. Anda unggul dalam fungsi pendukung operasional, dokumentasi teknis, dan koordinasi dasar antara pengguna dan sistem."
};

const OPTION_LABELS = ["A", "B", "C", "D"];

export default function Page() {
  const [currentStep, setCurrentStep] = useState(1);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    nim: "",
    agreeTerms: false,
  });
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scores, setScores] = useState({ bisnis: 0, teknologi: 0, kuadran: "Explorer" as Kuadran });

  const steps = [
    { id: 1, label: "Identitas", desc: "Nama & NIM" },
    { id: 2, label: "Kuesioner", desc: "Asesmen Minat" },
    { id: 3, label: "Review", desc: "Tinjau Jawaban" },
    { id: 4, label: "Hasil", desc: "Analisis Skill" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData(prev => ({ ...prev, [name]: checked }));
      if (name === "agreeTerms" && checked) {
        setErrors(prev => {
          const next = { ...prev };
          delete next.agreeTerms;
          return next;
        });
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors(prev => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    }
  };

  const handleSelectOption = (qIndex: number, optIndex: number) => {
    setAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
    setErrors(prev => {
      const next = { ...prev };
      delete next.questions;
      return next;
    });

    // Auto-advance to next question with a slight delay
    if (qIndex < questionsSeed.length - 1) {
      setTimeout(() => {
        setActiveQuestionIndex(prev => prev + 1);
      }, 350);
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Nama lengkap wajib diisi";
      if (!formData.nim.trim()) {
        newErrors.nim = "NIM wajib diisi";
      } else if (!/^[a-zA-Z0-9-]{5,20}$/.test(formData.nim.trim())) {
        newErrors.nim = "NIM tidak valid (5-20 karakter, huruf/angka/tanda hubung)";
      }
    }
    if (step === 2) {
      const unansweredCount = questionsSeed.length - Object.keys(answers).length;
      if (unansweredCount > 0) {
        newErrors.questions = `Anda belum menjawab ${unansweredCount} pertanyaan. Mohon lengkapi seluruh pertanyaan terlebih dahulu.`;
      }
    }
    if (step === 3) {
      const unansweredCount = questionsSeed.length - Object.keys(answers).length;
      if (unansweredCount > 0) {
        newErrors.questions = `Anda belum menjawab ${unansweredCount} pertanyaan. Silakan kembali ke tahap Kuesioner.`;
      }
      if (!formData.agreeTerms) newErrors.agreeTerms = "Anda harus menyetujui syarat & ketentuan sebelum memulai";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateResults = () => {
    let totalBisnis = 0;
    let totalTeknologi = 0;

    questionsSeed.forEach((q, idx) => {
      const selectedOptIdx = answers[idx];
      if (selectedOptIdx !== undefined) {
        const option = q.options[selectedOptIdx];
        totalBisnis += option.bobotBisnis;
        totalTeknologi += option.bobotTeknologi;
      }
    });

    // Maximum possible weights in seed-question:
    // Max Bisnis: 8+9+8+8+9+9+8+8+8+9 = 84
    // Max Teknologi: 8+9+9+9+9+9+9+9+9+9 = 89
    const maxBisnis = 84;
    const maxTeknologi = 89;

    const skorBisnis = Math.round((totalBisnis / maxBisnis) * 100);
    const skorTeknologi = Math.round((totalTeknologi / maxTeknologi) * 100);

    let kuadran: Kuadran = "Explorer";
    if (skorBisnis >= 50 && skorTeknologi >= 50) {
      kuadran = "Visioner";
    } else if (skorBisnis >= 50 && skorTeknologi < 50) {
      kuadran = "Strategis";
    } else if (skorBisnis < 50 && skorTeknologi >= 50) {
      kuadran = "Teknis";
    } else {
      kuadran = "Explorer";
    }

    return { bisnis: skorBisnis, teknologi: skorTeknologi, kuadran };
  };

  const handleNext = async () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(prev => prev + 1);
      } else if (currentStep === 3) {
        setIsSubmitting(true);
        const results = calculateResults();
        setScores(results);

        const currentRecommendations = RECOMMENDATIONS[results.kuadran];

        // Prepare payload for API
        const payload = {
          fullname: formData.fullName,
          nim: formData.nim,
          answers: answers,
          scores: {
            bisnis: results.bisnis,
            teknologi: results.teknologi
          },
          quadrant: results.kuadran,
          recommendations: currentRecommendations
        };

        // Save to Database via API
        try {
          const response = await fetch("/api/assesment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });
          
          if (!response.ok) {
            throw new Error("Gagal mengirim data ke server");
          }
        } catch (error) {
          console.error("Gagal menyimpan ke database:", error);
        }

        // Save to LocalStorage for "Hasil Saya"
        try {
          const submission = {
            id: Date.now().toString(),
            nama: formData.fullName,
            nim: formData.nim,
            skorBisnis: results.bisnis,
            skorTeknologi: results.teknologi,
            kuadran: results.kuadran,
            answers,
            createdAt: new Date().toISOString()
          };
          const existing = localStorage.getItem("students_submissions");
          const submissions = existing ? JSON.parse(existing) : [];
          submissions.push(submission);
          localStorage.setItem("students_submissions", JSON.stringify(submissions));
        } catch (e) {
          console.error("Gagal menyimpan ke localStorage:", e);
        }

        setIsSubmitting(false);
        setIsSubmitted(true);
        setCurrentStep(4);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1 && currentStep !== 4) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    // Prevent clicking step 4 directly or navigating back from step 4
    if (currentStep === 4 || stepId === 4) return;

    if (stepId < currentStep) {
      setCurrentStep(stepId);
    } else if (stepId > currentStep) {
      let isValid = true;
      for (let i = currentStep; i < stepId; i++) {
        if (!validateStep(i)) {
          isValid = false;
          setCurrentStep(i);
          break;
        }
      }
      if (isValid) {
        setCurrentStep(stepId);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      nim: "",
      agreeTerms: false,
    });
    setAnswers({});
    setErrors({});
    setIsSubmitted(false);
    setCurrentStep(1);
    setActiveQuestionIndex(0);
  };

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen py-6 px-4">
      {/* Title */}
      <div className="max-w-3xl mx-auto mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center justify-center sm:justify-start gap-3">
          <Award className="w-8 h-8 text-lime-500 animate-pulse" />
          Platform Asesmen Skill SI
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Ukur kecenderungan kompetensi Anda di bidang Sistem Informasi: Bisnis vs Teknologi.
        </p>
      </div>

      {/* Stepper Layout */}
      <div className="w-full px-4 py-8 max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl mb-6">
        <div className="relative flex items-center justify-between w-full">
          {/* Progress Bar Line */}
          <div className="absolute left-0 right-0 top-5 transform -translate-y-1/2 h-1 bg-gray-100 dark:bg-gray-800 rounded-full z-0"></div>
          <div 
            className="absolute left-0 top-5 transform -translate-y-1/2 h-1 bg-lime-500 rounded-full transition-all duration-500 ease-in-out z-0"
            style={{ width: `${progressPercentage}%` }}
          ></div>

          {/* Steps Indicators */}
          {steps.map((step) => {
            const isCompleted = currentStep > step.id || isSubmitted;
            const isActive = currentStep === step.id;
            const isSelectable = (step.id <= currentStep || isCompleted) && currentStep !== 4;

            return (
              <div 
                key={step.id} 
                onClick={() => isSelectable && handleStepClick(step.id)}
                className={`flex flex-col items-center relative z-10 w-1/4 ${isSelectable ? "cursor-pointer group" : "cursor-not-allowed"}`}
              >
                <div 
                  className={`w-10 h-10 rounded-full border-4 flex items-center justify-center shadow-md transition-all duration-300 ${
                    isCompleted 
                      ? "bg-lime-500 border-white dark:border-gray-900 text-gray-950 scale-100" 
                      : isActive
                        ? "bg-gray-900 dark:bg-white border-lime-500 text-white dark:text-gray-900 scale-110 ring-4 ring-lime-100 dark:ring-lime-900/40"
                        : "bg-white dark:bg-gray-850 border-gray-100 dark:border-gray-805 text-gray-450 dark:text-gray-500"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 stroke-[3]" />
                  ) : (
                    <span className="text-sm font-bold">{step.id}</span>
                  )}
                </div>
                <div className="mt-3 text-center">
                  <span className={`block text-xs sm:text-sm font-bold transition-colors duration-200 ${
                    isActive 
                      ? "text-lime-600 dark:text-lime-400" 
                      : isCompleted 
                        ? "text-gray-800 dark:text-gray-200" 
                        : "text-gray-400 dark:text-gray-500"
                  }`}>
                    {step.label}
                  </span>
                  <span className="hidden sm:block text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                    {step.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden transition-all duration-300">
        <div className="p-6 sm:p-10">
          
          {/* Step 1: Identitas */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Identitas Mahasiswa</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Silakan masukkan data diri Anda terlebih dahulu untuk memulai asesmen.</p>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <User className="w-4 h-4 text-lime-500" /> Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama lengkap Anda"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition duration-200 bg-gray-50/50 dark:bg-gray-850 text-gray-900 dark:text-white ${
                      errors.fullName 
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950" 
                        : "border-gray-250 dark:border-gray-750 focus:border-lime-500 focus:ring-2 focus:ring-lime-100 dark:focus:ring-lime-950"
                    }`}
                  />
                  {errors.fullName && <p className="text-xs text-red-500 font-semibold">{errors.fullName}</p>}
                </div>

                {/* NIM */}
                <div className="space-y-1.5">
                  <label htmlFor="nim" className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-lime-500" /> NIM (Nomor Induk Mahasiswa)
                  </label>
                  <input
                    type="text"
                    id="nim"
                    name="nim"
                    value={formData.nim}
                    onChange={handleInputChange}
                    placeholder="Masukkan NIM Anda (contoh: 1202220101)"
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition duration-200 bg-gray-50/50 dark:bg-gray-850 text-gray-900 dark:text-white ${
                      errors.nim 
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950" 
                        : "border-gray-250 dark:border-gray-750 focus:border-lime-500 focus:ring-2 focus:ring-lime-100 dark:focus:ring-lime-950"
                    }`}
                  />
                  {errors.nim && <p className="text-xs text-red-500 font-semibold">{errors.nim}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Kuesioner */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Kuesioner Minat & Bakat</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Jawablah pertanyaan di bawah ini sesuai dengan kepribadian Anda.</p>
                </div>
                <div className="px-3 py-1 bg-lime-100 dark:bg-lime-950/40 text-lime-700 dark:text-lime-400 rounded-full font-bold text-xs shrink-0 select-none">
                  Pertanyaan {activeQuestionIndex + 1}/10
                </div>
              </div>

              {/* Sub-Progress Bar */}
              <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-lime-500 h-full transition-all duration-300"
                  style={{ width: `${((activeQuestionIndex + 1) / questionsSeed.length) * 100}%` }}
                ></div>
              </div>

              {/* Question Text */}
              <div className="p-5 bg-lime-50/10 dark:bg-lime-950/5 border border-lime-100/20 dark:border-lime-900/10 rounded-2xl">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white leading-relaxed">
                  {questionsSeed[activeQuestionIndex].pertanyaan}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {questionsSeed[activeQuestionIndex].options.map((opt, idx) => {
                  const isSelected = answers[activeQuestionIndex] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(activeQuestionIndex, idx)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-center gap-4 ${
                        isSelected
                          ? "border-lime-500 bg-lime-50/20 dark:bg-lime-950/10 shadow-md scale-[1.01]"
                          : "border-gray-150 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50/50 dark:hover:bg-gray-850"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border transition-all duration-200 ${
                        isSelected
                          ? "bg-lime-500 border-lime-500 text-gray-950"
                          : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                      }`}>
                        {OPTION_LABELS[idx]}
                      </div>
                      <span className={`text-sm font-medium ${isSelected ? "text-gray-900 dark:text-white font-bold" : "text-gray-700 dark:text-gray-300"}`}>
                        {opt.teks}
                      </span>
                      {isSelected && (
                        <div className="ml-auto w-5 h-5 bg-lime-500 rounded-full flex items-center justify-center text-gray-950 shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Validation message if any */}
              {errors.questions && (
                <p className="text-xs text-red-500 font-semibold text-center">{errors.questions}</p>
              )}

              {/* Question Navigation */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setActiveQuestionIndex(prev => Math.max(0, prev - 1))}
                  disabled={activeQuestionIndex === 0}
                  className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all duration-200 ${
                    activeQuestionIndex === 0
                      ? "opacity-30 cursor-not-allowed border-gray-200 dark:border-gray-800 text-gray-400"
                      : "border-gray-250 dark:border-gray-750 text-gray-750 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" /> Soal Sebelumnya
                </button>

                <div className="flex gap-1.5">
                  {questionsSeed.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveQuestionIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                        idx === activeQuestionIndex
                          ? "bg-lime-500 w-5"
                          : answers[idx] !== undefined
                            ? "bg-lime-300 dark:bg-lime-800/80"
                            : "bg-gray-200 dark:bg-gray-800"
                      }`}
                    ></button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveQuestionIndex(prev => Math.min(questionsSeed.length - 1, prev + 1))}
                  disabled={activeQuestionIndex === questionsSeed.length - 1}
                  className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all duration-200 ${
                    activeQuestionIndex === questionsSeed.length - 1
                      ? "opacity-30 cursor-not-allowed border-gray-200 dark:border-gray-800 text-gray-400"
                      : "border-gray-250 dark:border-gray-750 text-gray-750 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  }`}
                >
                  Soal Berikutnya <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Tinjau Jawaban Asesmen</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pastikan semua data identitas dan kuesioner terisi dengan benar sebelum mengirim.</p>
              </div>

              {/* Student info overview */}
              <div className="p-5 rounded-2xl border border-gray-150 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider block">Nama Lengkap</span>
                  <span className="font-bold text-gray-800 dark:text-white text-base">{formData.fullName}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider block">NIM</span>
                  <span className="font-bold text-gray-800 dark:text-white text-base">{formData.nim}</span>
                </div>
              </div>

              {/* Questionnaire status */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-800 dark:text-gray-200">Daftar Jawaban Anda</span>
                  <span className="text-xs font-bold text-lime-600 dark:text-lime-400">
                    {Object.keys(answers).length}/{questionsSeed.length} Terjawab
                  </span>
                </div>

                <div className="max-h-[300px] overflow-y-auto border border-gray-150 dark:border-gray-800 rounded-2xl divide-y divide-gray-150 dark:divide-gray-800">
                  {questionsSeed.map((q, idx) => {
                    const answeredOpt = answers[idx];
                    const isAnswered = answeredOpt !== undefined;

                    return (
                      <div 
                        key={idx} 
                        onClick={() => {
                          setActiveQuestionIndex(idx);
                          setCurrentStep(2);
                        }}
                        className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-2 hover:bg-gray-50 dark:hover:bg-gray-850 cursor-pointer transition"
                      >
                        <div className="space-y-1 max-w-xl">
                          <h5 className="text-xs font-bold text-gray-400 dark:text-gray-500">Soal {idx + 1}</h5>
                          <p className="text-sm font-bold text-gray-800 dark:text-gray-200 line-clamp-1">{q.pertanyaan}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                            {isAnswered ? `Pilihan: ${OPTION_LABELS[answeredOpt]}. ${q.options[answeredOpt].teks}` : "Belum dijawab"}
                          </p>
                        </div>
                        <div className="shrink-0 flex items-center">
                          {isAnswered ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-lime-100 dark:bg-lime-950/30 text-lime-700 dark:text-lime-400">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Terjawab
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400">
                              Belum Dijawab
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {errors.questions && (
                <p className="text-xs text-red-500 font-semibold text-center">{errors.questions}</p>
              )}

              {/* Integrity Checklist */}
              <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="p-4 rounded-2xl border border-gray-150 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 flex items-start gap-3">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeTerms"
                      name="agreeTerms"
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      className={`w-5 h-5 rounded border-gray-300 dark:border-gray-700 text-lime-600 focus:ring-lime-500 bg-white dark:bg-gray-800 cursor-pointer ${
                        errors.agreeTerms ? "border-red-500 text-red-500 focus:ring-red-400" : ""
                      }`}
                    />
                  </div>
                  <div className="text-sm">
                    <label htmlFor="agreeTerms" className="font-bold text-gray-800 dark:text-gray-200 cursor-pointer select-none">
                      Saya bersedia mematuhi aturan ujian.
                    </label>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5 leading-relaxed">
                      Saya memahami bahwa asesmen ini dihitung secara rule-based untuk mengukur kecenderungan skill awal secara objektif dan saya telah mengisi seluruh pertanyaan dengan jujur.
                    </p>
                  </div>
                </div>
                {errors.agreeTerms && <p className="text-xs text-red-500 font-semibold">{errors.agreeTerms}</p>}
              </div>
            </div>
          )}

          {/* Step 4: Hasil Asesmen */}
          {currentStep === 4 && (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-lime-100 dark:bg-lime-950/40 border border-lime-200 dark:border-lime-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle2 className="w-9 h-9 text-lime-600 dark:text-lime-400" />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-955 dark:text-white">Asesmen Selesai!</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Berikut adalah analisis kecenderungan skill Sistem Informasi Anda.</p>
              </div>

              {/* Student Overview */}
              <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/40 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
                <div>
                  <span className="text-gray-400 dark:text-gray-500 text-xs font-semibold uppercase">Nama Lengkap:</span>
                  <span className="font-bold text-gray-800 dark:text-white ml-2">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-gray-400 dark:text-gray-500 text-xs font-semibold uppercase">NIM:</span>
                  <span className="font-bold text-gray-800 dark:text-white ml-2">{formData.nim}</span>
                </div>
              </div>

              {/* Quadrant visualization */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-bold text-sm text-gray-800 dark:text-gray-200">
                  <Target className="w-4 h-4 text-lime-500" /> Visualisasi Kuadran (Bisnis vs Teknologi)
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Scatter Plot Visualizer */}
                  <div className="md:col-span-7 flex justify-center">
                    <div className="relative w-full max-w-[340px] aspect-square border-2 border-gray-205 dark:border-gray-850 rounded-2xl bg-gray-50/20 dark:bg-gray-950/20 p-2 overflow-hidden shadow-inner select-none">
                      
                      {/* Grid Lines & Axis */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-[1.5px] border-t border-dashed border-gray-200 dark:border-gray-800"></div>
                      </div>
                      <div className="absolute inset-0 flex justify-center">
                        <div className="h-full w-[1.5px] border-l border-dashed border-gray-200 dark:border-gray-800"></div>
                      </div>

                      {/* Quadrant Names and Background Colors */}
                      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                        {/* Top-Left: Strategis */}
                        <div className={`flex flex-col items-start justify-start p-3 transition ${scores.kuadran === "Strategis" ? "bg-amber-500/5 dark:bg-amber-500/10" : ""}`}>
                          <span className={`text-[10px] sm:text-xs font-extrabold uppercase tracking-wider ${scores.kuadran === "Strategis" ? "text-amber-600 dark:text-amber-400" : "text-gray-300 dark:text-gray-600"}`}>Strategis</span>
                        </div>
                        {/* Top-Right: Visioner */}
                        <div className={`flex flex-col items-end justify-start p-3 transition ${scores.kuadran === "Visioner" ? "bg-lime-500/5 dark:bg-lime-500/10" : ""}`}>
                          <span className={`text-[10px] sm:text-xs font-extrabold uppercase tracking-wider ${scores.kuadran === "Visioner" ? "text-lime-600 dark:text-lime-400" : "text-gray-300 dark:text-gray-600"}`}>Visioner</span>
                        </div>
                        {/* Bottom-Left: Explorer */}
                        <div className={`flex flex-col items-start justify-end p-3 transition ${scores.kuadran === "Explorer" ? "bg-gray-500/5 dark:bg-gray-500/10" : ""}`}>
                          <span className={`text-[10px] sm:text-xs font-extrabold uppercase tracking-wider ${scores.kuadran === "Explorer" ? "text-gray-650 dark:text-gray-400" : "text-gray-300 dark:text-gray-600"}`}>Explorer</span>
                        </div>
                        {/* Bottom-Right: Teknis */}
                        <div className={`flex flex-col items-end justify-end p-3 transition ${scores.kuadran === "Teknis" ? "bg-blue-500/5 dark:bg-blue-500/10" : ""}`}>
                          <span className={`text-[10px] sm:text-xs font-extrabold uppercase tracking-wider ${scores.kuadran === "Teknis" ? "text-blue-600 dark:text-blue-400" : "text-gray-300 dark:text-gray-600"}`}>Teknis</span>
                        </div>
                      </div>

                      {/* X & Y Axis Label Info */}
                      <div className="absolute left-2 top-[52%] -translate-y-1/2 -rotate-90 origin-left text-[8px] font-bold tracking-wider text-gray-400 dark:text-gray-600 uppercase select-none">
                        Bisnis &uarr;
                      </div>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-bold tracking-wider text-gray-400 dark:text-gray-600 uppercase select-none">
                        Teknologi &rarr;
                      </div>

                      {/* User Position Dot */}
                      <div 
                        className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full flex items-center justify-center transition-all duration-1000 ease-out z-10"
                        style={{
                          left: `${scores.teknologi}%`,
                          top: `${100 - scores.bisnis}%`
                        }}
                      >
                        {/* Pulsing rings */}
                        <div className="absolute inset-0 bg-lime-500 rounded-full animate-ping opacity-60"></div>
                        <div className="absolute w-4 h-4 bg-lime-500 dark:bg-lime-400 rounded-full border-2 border-white dark:border-gray-900 shadow-md"></div>
                        {/* Inner tiny dot */}
                        <div className="w-1.5 h-1.5 bg-gray-950 rounded-full"></div>

                        {/* Tooltip Label */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-950 dark:bg-gray-850 text-[10px] text-white py-1 px-2 rounded font-bold whitespace-nowrap shadow-md pointer-events-none transition opacity-90">
                          Tek: {scores.teknologi}%, Bis: {scores.bisnis}%
                        </div>
                      </div>

                      {/* Center helper line markers */}
                      <div className="absolute right-1 top-[46%] text-[8px] text-gray-450 dark:text-gray-600 font-bold select-none">50%</div>
                      <div className="absolute left-[45%] top-1 text-[8px] text-gray-455 dark:text-gray-600 font-bold select-none">50%</div>
                    </div>
                  </div>

                  {/* Score details */}
                  <div className="md:col-span-5 space-y-4">
                    {/* Bisnis Score progress */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-gray-600 dark:text-gray-400">Kecenderungan Bisnis</span>
                        <span className="text-amber-500">{scores.bisnis}%</span>
                      </div>
                      <div className="w-full bg-gray-105 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${scores.bisnis}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 block leading-tight">
                        Mengukur minat pada analisis bisnis, koordinasi proyek, dan perancangan proses organisasi.
                      </span>
                    </div>

                    {/* Teknologi Score progress */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-gray-650 dark:text-gray-400">Kecenderungan Teknologi</span>
                        <span className="text-blue-500">{scores.teknologi}%</span>
                      </div>
                      <div className="w-full bg-gray-105 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-blue-400 to-blue-500 h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${scores.teknologi}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 block leading-tight">
                        Mengukur ketertarikan pada pemrograman, struktur data, arsitektur database, dan troubleshooting teknis.
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Explanations */}
              <div className="p-6 rounded-2xl bg-lime-50/10 dark:bg-lime-950/5 border border-lime-200/20 dark:border-lime-900/10 space-y-2">
                <h4 className="font-extrabold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-lime-500" />
                  Anda adalah Tipe: <span className="text-lime-650 dark:text-lime-400">{scores.kuadran}</span>
                </h4>
                <p className="text-sm text-gray-650 dark:text-gray-350 leading-relaxed">
                  {QUADRANT_EXPLANATIONS[scores.kuadran]}
                </p>
              </div>

              {/* Recommendations */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 font-bold text-sm text-gray-800 dark:text-gray-200">
                  <TrendingUp className="w-4 h-4 text-lime-500" /> Rekomendasi Karier Terkait
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {RECOMMENDATIONS[scores.kuadran].map((rec, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl border border-gray-100 dark:border-gray-850 bg-white dark:bg-gray-900 shadow-sm flex flex-col justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <h5 className="font-bold text-base text-gray-900 dark:text-white">{rec.namaKarier}</h5>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold select-none ${
                            rec.labelKecocokan === "Sangat Sesuai"
                              ? "bg-lime-100 dark:bg-lime-950/40 text-lime-700 dark:text-lime-400"
                              : rec.labelKecocokan === "Sesuai"
                                ? "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                          }`}>
                            {rec.labelKecocokan}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{rec.deskripsi}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Result Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 border-t border-gray-100 dark:border-gray-800">
                <button 
                  onClick={resetForm}
                  className="px-6 py-3 rounded-xl border border-gray-250 dark:border-gray-750 text-gray-700 dark:text-gray-350 font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-4 h-4" /> Ulangi Asesmen
                </button>
                <button 
                  onClick={() => window.location.href = "/hasil-saya"}
                  className="px-6 py-3 rounded-xl bg-lime-500 hover:bg-lime-600 text-gray-950 font-extrabold text-sm transition duration-200 flex items-center justify-center gap-1.5 shadow-lg shadow-lime-500/20 hover:scale-[1.02] cursor-pointer"
                >
                  Lihat Semua Histori <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        {currentStep !== 4 && (
          <div className="px-6 py-5 sm:px-10 bg-gray-50 dark:bg-gray-900/80 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`px-5 py-2.5 rounded-xl border border-gray-250 dark:border-gray-750 font-bold text-sm flex items-center gap-1.5 transition duration-200 cursor-pointer ${
                currentStep === 1 
                  ? "opacity-40 cursor-not-allowed text-gray-400 border-gray-200" 
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Kembali
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className={`px-5 py-2.5 rounded-xl bg-lime-500 hover:bg-lime-600 text-gray-950 font-bold text-sm flex items-center gap-1.5 transition duration-200 hover:scale-[1.02] active:scale-95 shadow-md shadow-lime-500/10 cursor-pointer ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-950 border-t-transparent rounded-full animate-spin"></div>
                  Mengirim...
                </>
              ) : (
                <>
                  {currentStep === 3 ? "Kirim & Hasil" : "Lanjutkan"} <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
