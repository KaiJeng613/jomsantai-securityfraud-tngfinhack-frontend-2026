"use client";

import Link from "next/link";

const authOptions = [
  { icon: "◎", label: "Passwordless", accent: "text-[#ffd84f]" },
  { icon: "◌", label: "Face ID", accent: "text-[#ffd84f]" },
  { icon: "◍", label: "Push Notification", accent: "text-[#ffd84f]" },
];

const quickLinks = [
  { icon: "▣", label: "Devices", tone: "text-[#48dec9]" },
  { icon: "◷", label: "Sessions", tone: "text-[#48dec9]" },
];

export default function AuthenticationPage() {
  return (
    <main className="min-h-screen bg-[#151520] px-5 pb-8 pt-6 text-white">
      <div className="mx-auto max-w-md">
        <div className="flex items-center justify-between text-sm font-semibold text-white/80">
          <Link href="/account" className="rounded-full border border-white/10 px-3 py-1.5 text-white">
            Back
          </Link>
          <span>Security</span>
        </div>

        <h1 className="mt-10 text-4xl font-semibold tracking-tight">Authentication</h1>

        <section className="mt-8 overflow-hidden rounded-[28px] bg-[#242536] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
          <div className="bg-[linear-gradient(135deg,#6670d8,#6a74df_35%,#6275d5_100%)] px-6 py-7">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 text-2xl text-[#5a68cf]">
                  ◉
                </div>
                <div>
                  <p className="text-2xl font-semibold">Alicia Tan</p>
                  <p className="mt-1 text-base text-white/80">alicia.tan@example.com</p>
                  <p className="mt-2 text-sm text-white/75">◌ Singapore</p>
                </div>
              </div>
              <button className="rounded-full border border-white/30 px-3 py-1 text-sm text-white/90">
                Edit
              </button>
            </div>

            <div className="my-6 h-px bg-white/20" />

            <div className="flex items-center justify-between text-sm text-white/75">
              <p>MFA MODE (Primary Device)</p>
              <span className="text-lg">✎</span>
            </div>

            <div className="mt-4 space-y-4">
              {authOptions.map((option) => (
                <div key={option.label} className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4d5fbf]/70 text-xl ${option.accent}`}
                  >
                    {option.icon}
                  </div>
                  <span className="text-2xl font-medium">{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#232434] px-6 py-5 text-xl text-white/75">
            <span>Sign in another way</span>
            <span>→</span>
          </div>
        </section>

        <section className="mt-5 rounded-[28px] bg-[#232434] px-6 py-5 shadow-[0_24px_60px_rgba(0,0,0,0.2)]">
          {quickLinks.map((item, index) => (
            <div key={item.label}>
              <div className="flex items-center gap-4 py-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2b5f63] text-xl ${item.tone}`}
                >
                  {item.icon}
                </div>
                <span className="text-2xl font-medium">{item.label}</span>
              </div>
              {index < quickLinks.length - 1 ? <div className="my-3 h-px bg-white/10" /> : null}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
