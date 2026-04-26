"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";

const quickActions = [
  { icon: "🆘", label: "SOS\nTop Up" },
  { icon: "📱", label: "Eastel\nTop Up" },
  { icon: "📲", label: "Sell\nDevices" },
  { icon: "💰", label: "Buy\nPhones" },
  { icon: "📄", label: "Postpaid\nBills" },
  { icon: "📡", label: "Huawei" },
];

const tabs = ["Top Up", "Auto Renewal", "History"];

const telcos = [
  { name: "Hotlink", icon: "🔴", promo: false },
  { name: "Xpax", icon: "🟢", promo: false },
  { name: "Digi", icon: "🟡", promo: false },
  { name: "U Mobile", icon: "🟣", promo: true },
  { name: "Yes", icon: "🟦", promo: false },
  { name: "Tune Talk", icon: "🔵", promo: false },
  { name: "redONE", icon: "🔴", promo: false },
  { name: "XOX", icon: "⬛", promo: false },
  { name: "HelloSIM", icon: "🟢", promo: false },
];

const topUpAmounts = [5, 10, 15, 20, 30, 50];

export default function PrepaidPage() {
  const [activeTab, setActiveTab] = useState("Top Up");
  const [selectedTelco, setSelectedTelco] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  const total = selectedAmount ?? 0;

  return (
    <PageShell className="bg-[#f3f5fb]">
      {/* Blue Header */}
      <div className="bg-[#0b66cb] px-5 pb-4 pt-6 text-white">
        <PageHeader
          rightElement={<div className="w-6" />}
        />
        <h1 className="text-center text-[18px] font-semibold -mt-8 mb-2">
          MY Prepaid
        </h1>
      </div>

      {/* Banner */}
      <div className="mx-4 mt-4 overflow-hidden rounded-2xl bg-gradient-to-r from-[#0b66cb] to-[#3b82f6]">
        <div className="flex items-center justify-between px-4 py-4">
          <p className="text-[10px] text-white/70">T&Cs apply</p>
          <div className="text-right">
            <p className="text-[14px] font-bold text-white">Need more<br />prepaid credit?</p>
            <p className="text-[12px] text-white/80">Top Up Now</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 overflow-x-auto px-4 py-4 no-scrollbar">
        {quickActions.map((action) => (
          <div key={action.label} className="flex flex-col items-center min-w-[60px]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
              {action.icon}
            </div>
            <p className="mt-1 text-center text-[10px] leading-tight text-slate-600 whitespace-pre-line">
              {action.label}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mx-4 flex border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-center text-[14px] font-semibold transition ${
              activeTab === tab
                ? "border-b-2 border-[#0b66cb] text-[#0b66cb]"
                : "text-slate-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Phone Number */}
      <div className="mx-4 mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-xl text-[#0b66cb]">
            📞
          </div>
          <div>
            <p className="text-[14px] font-semibold">Leslie Chai</p>
            <p className="text-[14px] text-slate-500">+60 <span className="text-[#0b66cb] font-semibold">16 516 2567</span></p>
          </div>
        </div>
        <button className="text-xl text-slate-400">📇</button>
      </div>

      {/* Select Telco */}
      <div className="mx-4 mt-6">
        <p className="mb-3 text-[14px] text-slate-500">Select your telco provider</p>
        <div className="grid grid-cols-3 gap-3">
          {telcos.map((telco) => (
            <button
              key={telco.name}
              onClick={() => setSelectedTelco(telco.name)}
              className={`relative flex flex-col items-center rounded-xl border-2 bg-white px-2 py-3 transition ${
                selectedTelco === telco.name
                  ? "border-[#0b66cb] shadow-md"
                  : "border-slate-200"
              }`}
            >
              {telco.promo && (
                <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1.5 py-0.5 text-[8px] font-bold text-white">
                  PROMO
                </span>
              )}
              <span className="text-2xl">{telco.icon}</span>
              <span className="mt-1 text-[11px] text-slate-700">{telco.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Top Up Amounts */}
      {selectedTelco && (
        <div className="mx-4 mt-6">
          <p className="mb-3 text-[14px] text-slate-500">Select amount</p>
          <div className="grid grid-cols-3 gap-3">
            {topUpAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`rounded-xl border-2 bg-white py-3 text-center text-[16px] font-bold transition ${
                  selectedAmount === amount
                    ? "border-[#0b66cb] text-[#0b66cb] shadow-md"
                    : "border-slate-200 text-slate-700"
                }`}
              >
                RM{amount}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Bar */}
      <div className="sticky bottom-0 mt-auto border-t border-slate-200 bg-white px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12px] text-slate-400">Total amount</p>
            <p className="text-[22px] font-bold text-red-500">RM{total.toFixed(2)}</p>
          </div>
          <button
            onClick={() => total > 0 && setShowWarning(true)}
            className={`rounded-full px-8 py-3 text-[16px] font-semibold transition ${
              total > 0
                ? "bg-[#0b66cb] text-white shadow-lg"
                : "bg-slate-200 text-slate-400 pointer-events-none"
            }`}
          >
            Top up
          </button>
        </div>
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
    </PageShell>
  );
}
