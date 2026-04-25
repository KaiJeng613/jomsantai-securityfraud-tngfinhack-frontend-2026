"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

const stations = [
  { name: "BHPetrol", label: "BHP" },
  { name: "Caltex", label: "⭐" },
  { name: "Petron", label: "P" },
  { name: "Petronas", label: "🟢" },
  { name: "Shell", label: "🐚" },
];

const steps = [
  {
    icon: "📍",
    text: (
      <>
        Go to any participating station.
        <br />
        Tap <strong>&quot;Buy fuel&quot;</strong> to start.
      </>
    ),
  },
  {
    icon: "⛽",
    text: "Confirm your station location, pump number, and fuel amount.",
  },
  {
    icon: "✅",
    text: (
      <>
        After making payment, <strong>show your QR</strong> at the counter to
        start fuelling.
      </>
    ),
  },
];

export default function Budi95Page() {
  const [showWarning, setShowWarning] = useState(false);
  const remainingLitres = 184.926;
  const totalLitres = 200.0;
  const percentage = Math.round((remainingLitres / totalLitres) * 100);

  return (
    <main className="min-h-screen bg-[#f3f5fb] text-slate-900">
      <div className="mx-auto max-w-md">
        {/* Blue Header Section */}
        <div className="bg-[#0b66cb] px-5 pb-6 pt-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <PageHeader
              className="text-white"
              rightElement={
                <span className="text-[16px] font-semibold text-white">FAQ</span>
              }
            />
          </div>
          <h1 className="text-center text-[18px] font-semibold -mt-12 mb-6">
            BUDI MADANI RON95
          </h1>

          {/* Logo + Price Tabs */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#5BADE0] flex items-center justify-center text-[11px] font-bold text-white leading-tight text-center">
              BUDI<br />MADANI<br />RON95
            </div>
            <div className="flex-1">
              <div className="rounded-full bg-green-500 px-3 py-1 text-center text-[12px] font-semibold mb-2">
                You are eligible to buy fuel at
              </div>
              <div className="flex rounded-full bg-white/20 overflow-hidden">
                <div className="flex-1 bg-white text-[#0b66cb] text-center py-2 text-[14px] font-bold rounded-full">
                  RM1.99/L
                </div>
                <div className="flex-1 text-center py-2 text-[14px] text-white/80">
                  RM3.87/L
                </div>
              </div>
            </div>
          </div>

          {/* Balance Section */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-[13px] text-white/70">Remaining balance (L)</p>
              <p className="text-[28px] font-bold">{remainingLitres.toFixed(3)} litres</p>
              <p className="text-[13px] text-white/70">
                out of {totalLitres.toFixed(3)} litres
              </p>
            </div>
            {/* Circular Progress */}
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="6"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${(percentage / 100) * 213.6} 213.6`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg">⛽</span>
                <span className="text-[10px] text-white/80">{percentage}% left</span>
              </div>
            </div>
          </div>

          <p className="text-[12px] text-white/60 mb-4">
            BUDI95 balance renews on the 1st of every month.
          </p>

          {/* Buy Fuel Button */}
          <button
            onClick={() => setShowWarning(true)}
            className="block w-full rounded-full bg-white py-3 text-center text-[16px] font-semibold text-[#0b66cb]"
          >
            Buy fuel
          </button>
        </div>

        {/* Participating Stations */}
        <div className="bg-white px-5 py-6">
          <h2 className="text-[16px] font-bold mb-4">
            Available at all participating stations
          </h2>
          <div className="flex justify-around mb-3">
            {stations.map((station) => (
              <div
                key={station.name}
                className="w-14 h-14 rounded-xl border border-slate-200 flex items-center justify-center text-xl"
              >
                {station.label}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-1.5 mt-2">
            <div className="w-2 h-2 rounded-full bg-[#0b66cb]" />
            <div className="w-2 h-2 rounded-full bg-slate-300" />
          </div>
        </div>

        {/* How to use BUDI95 */}
        <div className="bg-white mt-2 px-5 py-6">
          <h2 className="text-[16px] font-bold mb-5 flex items-center gap-1">
            How to use BUDI95 <span className="text-slate-400">ⓘ</span>
          </h2>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl flex-shrink-0">
                  {step.icon}
                </div>
                <p className="text-[14px] leading-relaxed text-slate-700 pt-1">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-8" />
      </div>

      {/* Suspicious Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <span className="text-4xl">🚨</span>
            </div>

            <h2 className="mb-2 text-center text-[20px] font-bold text-red-600">
              Suspicious Transaction detected
            </h2>
            <p className="mb-4 text-center text-[14px] leading-relaxed text-slate-600">
              This Transaction has been flagged as suspicious. Transfer is blocked for this recipient, and the Check & Transfer button will remain disabled.
            </p>
            <p className="mb-5 text-center text-[13px] leading-relaxed text-slate-500">
              Use Secure PIN to confirm that you intentionally opened this recipient and review the warning before leaving the page.
            </p>

            <div className="space-y-3">
              <Link
                href="/secure-pin"
                className="block w-full rounded-full bg-[#0b66cb] py-3 text-center text-[15px] font-semibold text-white"
              >
                Use Secure PIN
              </Link>
              <button
                onClick={() => setShowWarning(false)}
                className="w-full rounded-full border border-slate-300 py-3 text-[15px] font-semibold text-slate-600"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
