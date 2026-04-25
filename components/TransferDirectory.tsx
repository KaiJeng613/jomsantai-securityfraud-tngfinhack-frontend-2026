"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import TransferContactAvatar from "@/components/TransferContactAvatar";
import {
  TRANSFERABLE_BALANCE_MYR,
  formatMalaysiaPhone,
  groupContactsByInitial,
  transferContacts,
} from "@/lib/transferContacts";

const transferTabs = ["Transfer", "Receive", "Money Packet", "Gifting"];
const transferModes = ["eWallet", "DuitNow", "Overseas"];

export default function TransferDirectory() {
  const [query, setQuery] = useState("");

  const visibleContacts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return transferContacts;
    }

    return transferContacts.filter((contact) => {
      const phone = formatMalaysiaPhone(contact.phone).toLowerCase();

      return (
        contact.name.toLowerCase().includes(normalizedQuery) ||
        phone.includes(normalizedQuery) ||
        contact.phone.includes(normalizedQuery)
      );
    });
  }, [query]);

  const recentContacts = visibleContacts.filter((contact) => contact.recent);
  const groupedContacts = Object.entries(groupContactsByInitial(visibleContacts)).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  return (
    <main className="min-h-screen bg-[#f3f5fb] text-slate-900">
      <div className="mx-auto min-h-screen max-w-md bg-[#f3f5fb] shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
        <header className="bg-[#0b66cb] px-5 pb-4 pt-6 text-white">
          <PageHeader
            backHref="/"
            rightElement={<div className="w-6" />}
            className="items-center"
          />
          <h1 className="mt-3 text-center text-[21px] font-semibold">Transfer</h1>

          <nav className="mt-5 flex items-center justify-between text-sm">
            {transferTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`relative pb-3 ${
                  tab === "Transfer" ? "font-semibold text-white" : "text-white/55"
                }`}
              >
                {tab}
                {tab === "Transfer" ? (
                  <span className="absolute inset-x-0 -bottom-0.5 h-1 rounded-full bg-[#ffd500]" />
                ) : null}
              </button>
            ))}
          </nav>
        </header>

        <div className="space-y-5 px-4 pb-28 pt-5">
          <section className="grid grid-cols-3 gap-3">
            {transferModes.map((mode) => (
              <button
                key={mode}
                type="button"
                className={`rounded-2xl border px-3 py-4 text-center text-[16px] ${
                  mode === "eWallet"
                    ? "border-[#0b66cb] bg-white font-semibold text-[#0b66cb]"
                    : "border-slate-300 bg-white text-slate-500"
                }`}
              >
                {mode}
              </button>
            ))}
          </section>

          <section className="rounded-2xl bg-white px-4 py-3 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <button
                type="button"
                className="rounded-xl bg-slate-100 px-3 py-2 text-[18px] font-medium text-slate-700"
              >
                +60
              </button>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Enter name or phone number"
                className="flex-1 border-none text-[16px] text-slate-800 outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-[14px] font-semibold text-[#0b66cb]"
              >
                Reset
              </button>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#0b66cb] text-2xl text-[#0b66cb]">
                !
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-[18px] font-semibold">Stay alert before you transfer</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      We will run a PenipuMY phone check before the transaction completes.
                    </p>
                  </div>
                  <span className="text-slate-400">x</span>
                </div>
                <p className="mt-4 text-[16px] font-semibold text-[#0b66cb]">Scam check enabled</p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white px-5 py-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[18px] font-semibold">Recent</h2>
              <span className="text-sm font-semibold text-[#0b66cb]">View All</span>
            </div>

            <div className="space-y-1">
              {recentContacts.length ? (
                recentContacts.map((contact) => (
                  <Link
                    key={contact.id}
                    href={`/transfer/${contact.id}`}
                    className="flex items-center gap-4 rounded-2xl px-2 py-3 transition hover:bg-slate-50"
                  >
                    <TransferContactAvatar
                      initials={contact.initials}
                      danger={contact.id === "scammer"}
                    />
                    <div className="min-w-0">
                      <p className="text-[18px] font-semibold">{contact.name}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {formatMalaysiaPhone(contact.phone)}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="px-2 py-3 text-sm text-slate-500">No matching recent contacts.</p>
              )}
            </div>
          </section>

          <section className="rounded-3xl bg-white px-5 py-4 shadow-sm">
            <h2 className="text-[18px] font-semibold">All Contacts</h2>

            <div className="mt-3 space-y-4">
              {groupedContacts.length ? (
                groupedContacts.map(([initial, contacts]) => (
                  <div key={initial}>
                    <p className="text-lg text-slate-400">{initial}</p>
                    <div className="mt-3 h-px bg-slate-200" />
                    <div className="mt-2">
                      {contacts.map((contact) => (
                        <Link
                          key={contact.id}
                          href={`/transfer/${contact.id}`}
                          className="flex items-center gap-4 rounded-2xl px-2 py-3 transition hover:bg-slate-50"
                        >
                          <TransferContactAvatar
                            initials={contact.initials}
                            danger={contact.id === "scammer"}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-[18px] font-semibold">{contact.name}</p>
                            <p className="mt-1 text-sm text-slate-500">
                              {formatMalaysiaPhone(contact.phone)}
                            </p>
                            {contact.note ? (
                              <p
                                className={`mt-1 text-xs ${
                                  contact.id === "scammer"
                                    ? "text-rose-600"
                                    : "text-slate-400"
                                }`}
                              >
                                {contact.note}
                              </p>
                            ) : null}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No contacts matched your search.</p>
              )}
            </div>
          </section>
        </div>

        <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-[#f7f8ff] px-5 py-4">
          <div className="mx-auto max-w-md text-center text-[16px] text-slate-700">
            Transferable eWallet balance: RM {TRANSFERABLE_BALANCE_MYR.toFixed(2)}
          </div>
        </div>
      </div>
    </main>
  );
}
