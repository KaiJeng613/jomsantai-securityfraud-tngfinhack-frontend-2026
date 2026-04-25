"use client";

import PageHeader from "@/components/PageHeader";

const transactions = [
  {
    date: "23 Apr, 14:22",
    title: "Refueled at BHP Petrol Seksyen 7",
    subtitle: "BUDI95 RON95 - 15.08 litres",
    amount: "-RM30.00",
    isDebit: true,
  },
  {
    date: "23 Apr, 09:15",
    title: "Refueled at Shell Damansara Jaya",
    subtitle: "BUDI95 RON95 - 25.13 litres",
    amount: "-RM50.00",
    isDebit: true,
  },
  {
    date: "22 Apr, 18:40",
    title: "Refueled at Petron TTDI",
    subtitle: "BUDI95 RON95 - 15.08 litres",
    amount: "-RM30.00",
    isDebit: true,
  },
  {
    date: "22 Apr, 08:30",
    title: "Refueled at BHP Petrol Subang",
    subtitle: "BUDI95 RON95 - 25.13 litres",
    amount: "-RM50.00",
    isDebit: true,
  },
  {
    date: "21 Apr, 17:55",
    title: "Refueled at Shell Bangsar South",
    subtitle: "BUDI95 RON95 - 15.08 litres",
    amount: "-RM30.00",
    isDebit: true,
  },
  {
    date: "21 Apr, 10:12",
    title: "Refueled at Petron Puchong",
    subtitle: "BUDI95 RON95 - 25.13 litres",
    amount: "-RM50.00",
    isDebit: true,
  },
  {
    date: "20 Apr, 16:08",
    title: "Refueled at BHP Petrol Kelana Jaya",
    subtitle: "BUDI95 RON95 - 25.13 litres",
    amount: "-RM50.00",
    isDebit: true,
  },
];

export default function TransactionsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-md">
        {/* Blue Header */}
        <div className="bg-[#0b66cb] px-5 pb-4 pt-6 text-white">
          <div className="flex items-center justify-between">
            <PageHeader />
          </div>
          <h1 className="text-center text-[18px] font-semibold -mt-8 mb-2">
            History
          </h1>
        </div>

        {/* Date Range + Send to email */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
          <button className="flex items-center gap-1 text-[14px] text-slate-700">
            26 Jan 26 - 25 Apr 26 <span className="text-xs">▼</span>
          </button>
          <button className="rounded-full border border-slate-300 px-3 py-1.5 text-[13px] text-slate-700">
            Send to email
          </button>
        </div>

        {/* Transaction List */}
        <div>
          {transactions.map((tx, index) => (
            <div key={index}>
              <div className="px-5 py-4">
                <p className="text-[12px] text-slate-400 mb-1">{tx.date}</p>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold leading-tight">
                      {tx.title}
                    </p>
                    <p className="text-[13px] text-slate-400 mt-0.5">
                      {tx.subtitle}
                    </p>
                  </div>
                  <span
                    className={`text-[15px] font-semibold whitespace-nowrap ${
                      tx.isDebit ? "text-slate-900" : "text-[#0b66cb]"
                    }`}
                  >
                    {tx.amount}
                  </span>
                </div>
              </div>
              {index < transactions.length - 1 && (
                <div className="mx-5 h-px bg-slate-100" />
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
