"use client";

import Link from "next/link";
import PageShell from "@/components/PageShell";

const hotVouchers = [
  {
    brand: "CHICHA SanChen",
    icon: "🧋",
    deal: "Buy1Free1",
    points: 700,
    color: "bg-amber-50",
  },
  {
    brand: "Cashback Voucher",
    icon: "▶️",
    deal: "RM1",
    points: 100,
    color: "bg-green-50",
  },
  {
    brand: "Bask Bear",
    icon: "☕",
    deal: "Free Item",
    points: 500,
    color: "bg-amber-50",
  },
  {
    brand: "Starbucks",
    icon: "☕",
    deal: "RM25 for 2",
    points: 1500,
    color: "bg-green-50",
  },
  {
    brand: "myNEWS",
    icon: "🏪",
    deal: "RM1 Off",
    points: 100,
    color: "bg-red-50",
  },
  {
    brand: "CU",
    icon: "🏪",
    deal: "RM1 Off",
    points: 100,
    color: "bg-purple-50",
  },
];

export default function PaydayPage() {
  return (
    <PageShell className="bg-pink-50">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-b from-red-400 via-pink-400 to-pink-300 px-5 pb-20 pt-6">
        <Link href="/" className="text-3xl leading-none text-white" aria-label="Back">
          ←
        </Link>
        <h1 className="mt-6 text-[36px] font-extrabold leading-tight text-white drop-shadow-lg">
          PAYDAY<br />FIESTA
        </h1>
      </div>

      {/* Points Card */}
      <div className="-mt-10 mx-4 rounded-2xl bg-white p-5 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-xl">
              🪙
            </div>
            <span className="text-[28px] font-bold">1,496</span>
          </div>
          <button className="rounded-full border-2 border-[#0b66cb] px-4 py-1.5 text-[13px] font-semibold text-[#0b66cb]">
            My Vouchers
          </button>
        </div>
        <p className="mt-2 text-[12px] text-slate-400">Last updated 26 Apr, 00:59</p>
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-orange-50 px-3 py-2">
          <span className="text-orange-500">⏰</span>
          <p className="text-[13px] text-orange-500">114 points will expire on 30 Apr 2026</p>
        </div>
      </div>

      {/* HOT Vouchers */}
      <div className="mt-6 px-4 pb-8">
        <div className="mb-4 flex items-center justify-between rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-3">
          <h2 className="text-[18px] font-bold text-white">HOT Vouchers</h2>
          <button className="rounded-full bg-white px-4 py-1.5 text-[13px] font-semibold text-orange-500">
            Explore
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {hotVouchers.map((voucher) => (
            <Link
              key={`${voucher.brand}-${voucher.deal}`}
              href="/secure-pin"
              className="block rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm"
            >
              <div className={`flex items-center gap-2 px-3 pt-3 pb-1 ${voucher.color}`}>
                <span className="text-2xl">{voucher.icon}</span>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400 truncate">{voucher.brand}</p>
                  <p className="text-[16px] font-bold leading-tight">{voucher.deal}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[11px] text-slate-500">For</span>
                    <span className="text-[11px] text-orange-500">🪙 {voucher.points.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="px-3 pb-3 pt-2">
                <div className="rounded-full bg-[#0b66cb] py-2 text-center text-[13px] font-semibold text-white">
                  Redeem
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
