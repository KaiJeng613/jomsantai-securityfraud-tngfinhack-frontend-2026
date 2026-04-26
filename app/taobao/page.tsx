"use client";

import { useState } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";

const vouchers = [
  {
    amount: "RM10",
    label: "Discount Voucher",
    description: "[Taobao Zone] Taobao: RM10 Discount Voucher(...",
    price: "9.00",
    points: "50",
    originalPrice: "10.00",
  },
  {
    amount: "RM30",
    label: "Discount Voucher",
    description: "[Taobao Zone] Taobao: RM30 Discount Voucher(...",
    price: "28.50",
    points: "50",
    originalPrice: "30.00",
  },
  {
    amount: "RM100",
    label: "Discount Voucher",
    description: "[Taobao Zone] Taobao: RM100 Discount Voucher(...",
    price: "95.00",
    points: "100",
    originalPrice: "100.00",
  },
  {
    amount: "RM200",
    label: "Discount Voucher",
    description: "[Taobao Zone] Taobao: RM200 Discount Voucher(...",
    price: "190.00",
    points: "200",
    originalPrice: "200.00",
  },
];

export default function TaobaoPage() {
  const [showWarning, setShowWarning] = useState(false);

  return (
    <PageShell className="bg-white">
      {/* Orange Header */}
      <div className="relative bg-gradient-to-b from-orange-400 to-orange-300 px-5 pb-16 pt-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-3xl leading-none text-white" aria-label="Back">
            ←
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-white text-xl">···</span>
            <span className="text-white text-xl">⊗</span>
          </div>
        </div>
        <h1 className="mt-4 text-center text-[32px] font-bold italic text-white drop-shadow">
          Taobao Zone
        </h1>
        <div className="absolute right-4 top-24 rounded-full bg-white/80 px-3 py-1.5 text-[12px] font-semibold text-slate-700">
          My Rewards &gt;
        </div>
      </div>

      {/* Content */}
      <div className="-mt-8 rounded-t-3xl bg-white px-5 pb-8 pt-6">
        {/* Voucher Tab */}
        <div className="mb-6">
          <div className="inline-flex flex-col items-center rounded-xl border-2 border-[#0b66cb] px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-[8px] font-bold text-white">
              Taobao
            </div>
            <span className="mt-1 text-[12px] font-semibold text-[#0b66cb]">Voucher</span>
          </div>
        </div>

        {/* Voucher Grid */}
        <div className="grid grid-cols-2 gap-4">
          {vouchers.map((voucher) => (
            <button
              key={voucher.amount}
              onClick={() => setShowWarning(true)}
              className="block overflow-hidden rounded-2xl shadow-sm text-left"
            >
              {/* Orange Card Top */}
              <div className="bg-orange-500 px-4 pb-4 pt-6 text-center text-white">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white">
                  <span className="text-[14px] font-bold text-orange-500">Taobao</span>
                </div>
                <p className="text-[22px] font-bold">{voucher.amount}</p>
                <p className="text-[13px]">{voucher.label}</p>
              </div>
              {/* White Card Bottom */}
              <div className="bg-white px-3 py-3">
                <p className="text-[12px] leading-tight text-slate-600">
                  {voucher.description}
                </p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-[11px] text-orange-500">MYR</span>
                  <span className="text-[18px] font-bold text-orange-500">{voucher.price}</span>
                  <span className="text-[11px] text-orange-500">+{voucher.points}</span>
                  <span className="text-[10px] text-orange-400">Pts</span>
                </div>
                <p className="text-[11px] text-slate-400 line-through">
                  MYR {voucher.originalPrice}
                </p>
              </div>
            </button>
          ))}
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
