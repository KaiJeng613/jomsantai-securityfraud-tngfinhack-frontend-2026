"use client";

import Link from "next/link";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import TransferContactAvatar from "@/components/TransferContactAvatar";
import { lookupPenipuPhone, type PenipuLookupMatch } from "@/lib/penipuClient";
import {
  TRANSFERABLE_BALANCE_MYR,
  formatMalaysiaPhone,
  type TransferContact,
} from "@/lib/transferContacts";

type TransferResult =
  | {
      status: "idle";
    }
  | {
      status: "success";
      lookupCount: number;
    }
  | {
      status: "blocked";
      matches: PenipuLookupMatch[];
    }
  | {
      status: "error";
      message: string;
    };

interface TransferRecipientScreenProps {
  contact: TransferContact;
}

export default function TransferRecipientScreen({
  contact,
}: TransferRecipientScreenProps) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<TransferResult>({ status: "idle" });

  const numericAmount = Number(amount);
  const canSubmit =
    Number.isFinite(numericAmount) &&
    numericAmount > 0 &&
    numericAmount <= TRANSFERABLE_BALANCE_MYR &&
    !isSubmitting;

  const handleTransfer = async () => {
    setResult({ status: "idle" });

    if (!canSubmit) {
      setResult({
        status: "error",
        message: "Enter a valid transfer amount within your available balance.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const lookup = await lookupPenipuPhone(contact.phone);

      if (!lookup.success) {
        setResult({
          status: "error",
          message: lookup.error ?? "PenipuMY lookup failed.",
        });
        return;
      }

      if (lookup.flagged) {
        setResult({
          status: "blocked",
          matches: lookup.results ?? [],
        });
        return;
      }

      setResult({
        status: "success",
        lookupCount: lookup.count ?? 0,
      });
      setAmount("");
      setNote("");
    } catch (error) {
      setResult({
        status: "error",
        message:
          error instanceof Error ? error.message : "Unable to complete the transfer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f3f5fb] text-slate-900">
      <div className="mx-auto min-h-screen max-w-md bg-[#f3f5fb] shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
        <header className="bg-[#0b66cb] px-5 pb-6 pt-6 text-white">
          <PageHeader
            backHref="/transfer"
            rightElement={<div className="w-6" />}
            className="items-center"
          />
          <h1 className="mt-3 text-center text-[21px] font-semibold">Transfer</h1>

          <div className="mt-6 rounded-3xl bg-[#0857b3] px-4 py-4 shadow-inner">
            <div className="flex items-center gap-4">
              <TransferContactAvatar
                initials={contact.initials}
                danger={contact.id === "scammer"}
              />
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">
                  Recipient
                </p>
                <h2 className="mt-1 text-[21px] font-semibold">{contact.name}</h2>
                <p className="mt-1 text-sm text-white/70">
                  {formatMalaysiaPhone(contact.phone)}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-5 px-4 pb-28 pt-5">
          {contact.note ? (
            <section
              className={`rounded-3xl border px-4 py-4 shadow-sm ${
                contact.id === "scammer"
                  ? "border-rose-200 bg-rose-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <p
                className={`text-sm ${
                  contact.id === "scammer" ? "text-rose-700" : "text-slate-600"
                }`}
              >
                {contact.note}
                {contact.penipuSourceUrl ? (
                  <>
                    {" "}
                    Source:{" "}
                    <Link
                      href={contact.penipuSourceUrl}
                      target="_blank"
                      className="font-semibold underline"
                    >
                      PenipuMY verified report
                    </Link>
                    .
                  </>
                ) : null}
              </p>
            </section>
          ) : null}

          <section className="rounded-3xl bg-white p-5 shadow-sm">
            <h3 className="text-[18px] font-semibold">Transfer details</h3>

            <label className="mt-4 block">
              <span className="text-sm text-slate-500">Amount (RM)</span>
              <input
                value={amount}
                onChange={(event) => setAmount(event.target.value.replace(/[^\d.]/g, ""))}
                inputMode="decimal"
                placeholder="0.00"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-4 text-[24px] font-semibold outline-none transition focus:border-[#0b66cb]"
              />
            </label>

            <label className="mt-4 block">
              <span className="text-sm text-slate-500">Note</span>
              <input
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="What is this transfer for?"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-4 text-[16px] outline-none transition focus:border-[#0b66cb]"
              />
            </label>

            <div className="mt-4 rounded-2xl bg-[#eff6ff] px-4 py-4">
              <p className="text-sm font-semibold text-[#0b66cb]">Safety check</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We will query PenipuMY using this phone number before the transfer is approved.
              </p>
            </div>
          </section>

          {result.status === "success" ? (
            <section className="rounded-3xl border border-emerald-200 bg-emerald-50 px-4 py-4 shadow-sm">
              <h3 className="text-[18px] font-semibold text-emerald-700">
                Transfer completed
              </h3>
              <p className="mt-2 text-sm leading-6 text-emerald-700">
                No PenipuMY matches were found. The transfer to {contact.name} was allowed.
              </p>
              <p className="mt-2 text-xs text-emerald-600">
                Matching profiles found: {result.lookupCount}
              </p>
            </section>
          ) : null}

          {result.status === "blocked" ? (
            <section className="rounded-3xl border border-rose-200 bg-rose-50 px-4 py-4 shadow-sm">
              <h3 className="text-[18px] font-semibold text-rose-700">Transaction blocked</h3>
              <p className="mt-2 text-sm leading-6 text-rose-700">
                PenipuMY matched this recipient phone number. Review the warning before sending
                money.
              </p>

              <div className="mt-4 space-y-3">
                {result.matches.map((match) => (
                  <div key={match.profile_id} className="rounded-2xl bg-white/80 px-4 py-3">
                    <p className="font-semibold text-slate-900">{match.name}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      Reports: {match.total_reports} | Loss tracked: RM{" "}
                      {match.total_loss_myr.toLocaleString("en-MY", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    {match.last_updated ? (
                      <p className="mt-1 text-xs text-slate-500">
                        Last updated: {match.last_updated}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {result.status === "error" ? (
            <section className="rounded-3xl border border-amber-200 bg-amber-50 px-4 py-4 shadow-sm">
              <h3 className="text-[18px] font-semibold text-amber-700">Lookup unavailable</h3>
              <p className="mt-2 text-sm leading-6 text-amber-700">{result.message}</p>
            </section>
          ) : null}
        </div>

        <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white px-5 py-4">
          <div className="mx-auto flex max-w-md items-center gap-3">
            <div className="flex-1 text-sm text-slate-500">
              Available balance
              <p className="mt-1 text-[18px] font-semibold text-slate-900">
                RM {TRANSFERABLE_BALANCE_MYR.toFixed(2)}
              </p>
            </div>
            <button
              type="button"
              onClick={handleTransfer}
              disabled={!canSubmit}
              className={`rounded-full px-6 py-4 text-[16px] font-semibold transition ${
                canSubmit
                  ? "bg-[#0b66cb] text-white shadow-lg"
                  : "bg-slate-200 text-slate-400"
              }`}
            >
              {isSubmitting ? "Checking..." : "Check & Transfer"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
