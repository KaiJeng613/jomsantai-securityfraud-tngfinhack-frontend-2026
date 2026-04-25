"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { pinService } from "@/lib/api/pinService";

const PLACEHOLDER_API_HOST = "your-api-gateway-url.execute-api.region.amazonaws.com";

export default function SecurePinPage() {
  const [userId, setUserId] = useState("");
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isApiConfigured = useMemo(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
    return baseUrl.length > 0 && !baseUrl.includes(PLACEHOLDER_API_HOST);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!userId.trim() || pin.length !== 6) {
      setError("Enter a user ID and a 6-digit PIN.");
      return;
    }

    if (!isApiConfigured) {
      setError("Set NEXT_PUBLIC_API_BASE_URL and API key to call the AWS Lambda endpoint.");
      return;
    }

    setIsSubmitting(true);

    const response = await pinService.createPin({
      userId: userId.trim(),
      pin,
    });

    setIsSubmitting(false);

    if (response.success) {
      setMessage(response.data?.message || "Secure PIN request sent successfully.");
      setPin("");
      return;
    }

    setError(response.error || "Unable to call the Secure PIN Lambda.");
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900">
      <div className="mx-auto max-w-md">
        <Link href="/" className="text-sm font-medium text-blue-700">
          ← Back
        </Link>

        <section className="mt-4 rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
            Secure PIN
          </p>
          <h1 className="mt-2 text-3xl font-bold">Create a PIN</h1>
          <p className="mt-2 text-sm text-slate-600">
            This screen is ready to call your AWS Lambda PIN endpoint through the existing API
            client once the environment variables are configured.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">User ID</span>
              <input
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
                placeholder="user-123"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">6-digit PIN</span>
              <input
                value={pin}
                onChange={(event) =>
                  setPin(event.target.value.replace(/\D/g, "").slice(0, 6))
                }
                inputMode="numeric"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
                placeholder="123456"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-blue-700 px-4 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {isSubmitting ? "Calling Lambda..." : "Create Secure PIN"}
            </button>
          </form>

          {message ? (
            <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {message}
            </p>
          ) : null}

          {error ? (
            <p className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </p>
          ) : null}
        </section>
      </div>
    </main>
  );
}
