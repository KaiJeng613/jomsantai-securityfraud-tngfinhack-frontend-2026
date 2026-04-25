"use client";

import Link from "next/link";

const tabs = ["Payment", "Security", "General", "Business"];

const paymentItems = [
  { icon: "💳", label: "Visa Card", action: "Get it now" },
  { icon: "🅓", label: "DuitNow", action: "Activate Now" },
  { icon: "💼", label: "Bank Card" },
  { icon: "🔁", label: "Auto Payment" },
  { icon: "🪙", label: "Payment Order" },
  { icon: "📄", label: "Permission & Auto Debit" },
  { icon: "💲", label: "Transferable and Non-transferable eWallet Balances" },
  { icon: "⌚", label: "Smartwatch" },
];

const securityItems = [
  { icon: "🌀", label: "Security Authentication", href: "/authentication" },
  { icon: "👤", label: "Account Verification", status: "Completed" },
];

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-[#f3f5fb] text-slate-900">
      <div className="mx-auto max-w-md bg-[#0b66cb]">
        <header className="px-5 pb-5 pt-6 text-white">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-3xl leading-none" aria-label="Back to home">
              ←
            </Link>
            <div className="relative">
              <span className="text-3xl">🔔</span>
              <span className="absolute -right-2 -top-1 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold">
                99+
              </span>
            </div>
          </div>

          <div className="mt-7 flex items-start gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-[#d6efff] text-4xl text-[#0b66cb]">
                👤
              </div>
              <div className="rounded-xl bg-white px-2 py-1 text-[11px] font-semibold text-[#0b66cb]">
                Verified
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <h1 className="text-[19px] font-semibold uppercase tracking-wide">WONG KAI JENG</h1>
                <button className="rounded-full border border-white px-4 py-1.5 text-sm font-semibold">
                  Edit
                </button>
              </div>

              <div className="mt-4 rounded-2xl bg-[#0857b3] px-4 py-3 shadow-inner">
                <p className="text-xs text-white/75">TNG eWallet account no.</p>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] text-white/70">DuitNow</p>
                    <p className="text-[18px] font-semibold tracking-wide">130037567479</p>
                  </div>
                  <button className="text-2xl text-white/80" aria-label="Copy account number">
                    ⧉
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <nav className="flex items-center justify-around bg-[#2f65b8] text-[15px] text-white/85">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`relative px-3 py-4 ${tab === "Security" ? "text-white" : ""}`}
            >
              {tab}
              {tab === "Security" ? (
                <span className="absolute right-0 top-4 h-2 w-2 rounded-full bg-red-500" />
              ) : null}
            </button>
          ))}
        </nav>

        <div className="space-y-6 bg-[#f3f5fb] px-4 pb-8 pt-5">
          <section className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ecf7ff] text-3xl text-[#0b66cb]">
                🛡️
              </div>
              <div>
                <h2 className="text-[18px] font-semibold">WalletSafe</h2>
                <p className="mt-1 text-sm text-slate-700">
                  Add protection for your balance with ONLY RM1.
                </p>
                <button className="mt-3 text-[16px] font-semibold text-[#0b66cb]">
                  Add Protection Now
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white px-5 py-4 shadow-sm">
            <h3 className="text-[18px] font-semibold">Payment</h3>
            <div className="mt-3">
              {paymentItems.map((item, index) => (
                <div key={item.label}>
                  <div className="flex items-center gap-4 py-4">
                    <div className="flex h-9 w-9 items-center justify-center text-2xl text-slate-800">
                      {item.icon}
                    </div>
                    <span className="flex-1 text-[18px] leading-tight">{item.label}</span>
                    {item.action ? (
                      <span className="text-[16px] font-medium text-[#ff5f57]">{item.action}</span>
                    ) : null}
                    <span className="text-3xl leading-none text-[#0b66cb]">›</span>
                  </div>
                  {index < paymentItems.length - 1 ? <div className="h-px bg-slate-200" /> : null}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white px-5 py-4 shadow-sm">
            <h3 className="text-[18px] font-semibold">Security</h3>
            <div className="mt-3">
              {securityItems.map((item, index) => {
                const row = (
                  <div className="flex items-center gap-4 py-4">
                    <div className="flex h-9 w-9 items-center justify-center text-2xl text-slate-800">
                      {item.icon}
                    </div>
                    <span className="flex-1 text-[18px]">{item.label}</span>
                    {"status" in item && item.status ? (
                      <span className="text-[16px] text-slate-400">{item.status}</span>
                    ) : null}
                    <span className="text-3xl leading-none text-[#0b66cb]">›</span>
                  </div>
                );

                return (
                  <div key={item.label}>
                    {"href" in item && item.href ? (
                      <Link href={item.href} className="block">
                        {row}
                      </Link>
                    ) : (
                      row
                    )}
                    {index < securityItems.length - 1 ? <div className="h-px bg-slate-200" /> : null}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
