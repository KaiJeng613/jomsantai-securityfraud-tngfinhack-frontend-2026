"use client";

import { KeyboardEvent, useMemo, useRef, useState } from "react";
import { pinService, type PinResponse } from "@/lib/api/pinService";
import PageShell from "@/components/PageShell";

const PLACEHOLDER_API_HOST = "your-api-gateway-url.execute-api.region.amazonaws.com";
const PIN_LENGTH = 6;

type TimingState = {
  entryStartTime: number | null;
  lastKeyDownTime: number | null;
  lastKeyUpTime: number | null;
  interKeyDelays: number[];
  holdDurations: number[];
  totalEntryDuration: number;
};

const createEmptyTimingState = (): TimingState => ({
  entryStartTime: null,
  lastKeyDownTime: null,
  lastKeyUpTime: null,
  interKeyDelays: [],
  holdDurations: [],
  totalEntryDuration: 0,
});

export default function SecurePinPage() {
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timingState, setTimingState] = useState<TimingState>(createEmptyTimingState);
  const [showRiskWarning, setShowRiskWarning] = useState(false);
  const [riskData, setRiskData] = useState<PinResponse | null>(null);
  const pinInputRef = useRef<HTMLInputElement>(null);
  const userAgentData =
    typeof navigator !== "undefined"
      ? (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData
      : undefined;

  const isApiConfigured = useMemo(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
    return baseUrl.length > 0 && !baseUrl.includes(PLACEHOLDER_API_HOST);
  }, []);

  const resetPinEntry = () => {
    setPin("");
    setTimingState(createEmptyTimingState());
    pinInputRef.current?.focus();
  };

  const handlePinKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!/^\d$/.test(event.key) && event.key !== "Backspace") {
      return;
    }

    const now = performance.now();

    setTimingState((current) => {
      const nextState = { ...current };

      if (pin.length === 0 && event.key !== "Backspace") {
        nextState.entryStartTime = now;
        nextState.interKeyDelays = [];
        nextState.holdDurations = [];
        nextState.totalEntryDuration = 0;
      }

      if (event.key !== "Backspace" && current.lastKeyUpTime !== null) {
        nextState.interKeyDelays = [
          ...current.interKeyDelays,
          Math.round(now - current.lastKeyUpTime),
        ].slice(0, PIN_LENGTH - 1);
      }

      nextState.lastKeyDownTime = now;
      return nextState;
    });
  };

  const handlePinKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!/^\d$/.test(event.key) && event.key !== "Backspace") {
      return;
    }

    const now = performance.now();

    setTimingState((current) => {
      const nextState = { ...current };

      if (event.key !== "Backspace" && current.lastKeyDownTime !== null) {
        nextState.holdDurations = [
          ...current.holdDurations,
          Math.round(now - current.lastKeyDownTime),
        ].slice(0, PIN_LENGTH);
      }

      nextState.lastKeyUpTime = now;
      return nextState;
    });
  };

  const handlePinChange = (rawValue: string) => {
    const nextValue = rawValue.replace(/\D/g, "").slice(0, PIN_LENGTH);

    setMessage("");
    setError("");

    if (nextValue.length < pin.length) {
      setTimingState(createEmptyTimingState());
    }

    setPin(nextValue);

    if (nextValue.length === PIN_LENGTH) {
      setTimingState((current) => ({
        ...current,
        totalEntryDuration: current.entryStartTime
          ? Math.round(performance.now() - current.entryStartTime)
          : current.totalEntryDuration,
      }));
    }
  };

  const handleSubmit = async () => {
    setMessage("");
    setError("");

    if (pin.length !== PIN_LENGTH) {
      setError("Enter a 6-digit PIN.");
      return;
    }

    if (!isApiConfigured) {
      setError("API not configured. Please set NEXT_PUBLIC_API_BASE_URL and NEXT_PUBLIC_API_KEY in your environment variables.");
      return;
    }

    setIsSubmitting(true);

    console.log("[Secure PIN] Submitting PIN to API...");
    console.log("[Secure PIN] API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
    console.log("[Secure PIN] Keystroke Dynamics:", {
      inter_key_delays_ms: timingState.interKeyDelays,
      hold_durations_ms: timingState.holdDurations,
      total_entry_duration_ms: timingState.totalEntryDuration,
    });

    try {
      const response = await pinService.createPin({
        session_id: crypto.randomUUID(),
        user_id: "demo-user-001",
        device: {
          platform: /android/i.test(navigator.userAgent) ? "android" : "ios",
          os_version: userAgentData?.platform || navigator.platform || "unknown",
          device_model: navigator.userAgent,
        },
        location: {
          country_code: "MY",
          latitude: 3.139,
          longitude: 101.687,
        },
        keystroke_dynamics: {
          pin_length: PIN_LENGTH,
          inter_key_delays_ms: timingState.interKeyDelays,
          hold_durations_ms: timingState.holdDurations,
          total_entry_duration_ms: timingState.totalEntryDuration,
        },
      });

      console.log("[Secure PIN] API Response:", response);

      if (response.success) {
        const data = response.data;
        console.log("[Secure PIN] Scorer:", data?.scorer, "Risk Level:", data?.risk_level);

        if (data?.risk_level === "high") {
          console.warn("[Secure PIN] HIGH RISK detected!", data);
          setRiskData(data);
          setShowRiskWarning(true);
          resetPinEntry();
          return;
        }

        setMessage(data?.message || "PIN submitted successfully.");
        resetPinEntry();
        return;
      }

      console.error("[Secure PIN] API Error:", response.error);
      setError(response.error || "Failed to submit PIN. Please try again.");
    } catch (submissionError: any) {
      console.error("[Secure PIN] Unexpected submit error:", submissionError);
      setError(submissionError.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isReady = pin.length === PIN_LENGTH;

  return (
    <PageShell>
      <div className="flex min-h-screen flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <button
            onClick={() => window.history.back()}
            className="text-2xl leading-none text-slate-600"
            aria-label="Close"
          >
            ✕
          </button>
          <h1 className="text-[18px] font-semibold text-slate-900">PIN</h1>
          <div className="w-6" />
        </div>

        {/* Content */}
        <div className="flex-1 px-5 py-6">
          <p className="mb-6 text-[16px] text-slate-600">
            Please enter PIN linked to your eWallet account
          </p>

          {/* PIN Input Boxes */}
          <div
            className="relative mb-8"
            onClick={() => pinInputRef.current?.focus()}
            role="presentation"
          >
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: PIN_LENGTH }).map((_, index) => {
                const isActiveSlot = index === Math.min(pin.length, PIN_LENGTH - 1);
                const hasValue = Boolean(pin[index]);

                return (
                  <div
                    key={index}
                    className={`flex aspect-square items-center justify-center rounded-lg border-2 bg-white text-2xl font-semibold text-slate-900 transition ${
                      hasValue || isActiveSlot
                        ? "border-[#0b66cb]"
                        : "border-slate-300"
                    }`}
                  >
                    {pin[index] || ""}
                  </div>
                );
              })}
            </div>

            <input
              ref={pinInputRef}
              value={pin}
              onChange={(event) => handlePinChange(event.target.value)}
              onKeyDown={handlePinKeyDown}
              onKeyUp={handlePinKeyUp}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={PIN_LENGTH}
              autoComplete="one-time-code"
              autoFocus
              aria-label="Enter 6-digit PIN"
              aria-invalid={Boolean(error)}
              className="absolute inset-0 h-full w-full cursor-text opacity-0"
            />
          </div>

          {/* Security Notice */}
          <div className="flex gap-3 rounded-xl bg-blue-50 p-4">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center">
              <span className="text-xl text-blue-600">🛡️</span>
            </div>
            <p className="text-[14px] leading-relaxed text-slate-700">
              Payments will be processed securely and may require additional authentication.
            </p>
          </div>

          {/* Messages */}
          {message ? (
            <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-[14px] text-emerald-700">
              {message}
            </p>
          ) : null}

          {error ? (
            <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-[14px] text-rose-700">
              {error}
            </p>
          ) : null}
        </div>

        {/* Submit Button */}
        <div className="border-t border-slate-200 p-5">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isReady || isSubmitting}
            className={`w-full rounded-full px-6 py-4 text-[16px] font-semibold transition ${
              isReady && !isSubmitting
                ? "bg-[#0b66cb] text-white shadow-lg"
                : "bg-slate-200 text-slate-400"
            } disabled:cursor-not-allowed`}
          >
            {isSubmitting ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>

      {/* Risk Warning Modal */}
      {showRiskWarning && riskData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            {/* Warning Icon */}
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <span className="text-4xl">⚠️</span>
            </div>

            <h2 className="mb-2 text-center text-[20px] font-bold text-red-600">
              Suspicious Transaction
            </h2>
            <p className="mb-4 text-center text-[14px] text-slate-600">
              Our security system has flagged this transaction as potentially fraudulent.
            </p>

            {/* Risk Details */}
            <div className="mb-5 space-y-2 rounded-xl bg-red-50 p-4">
              <div className="flex justify-between text-[13px]">
                <span className="text-slate-500">Risk Level</span>
                <span className="font-semibold text-red-600 uppercase">{riskData.risk_level}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-slate-500">Decision</span>
                <span className="font-semibold text-red-600 uppercase">{riskData.decision}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-slate-500">Anomaly Score</span>
                <span className="font-semibold text-red-600">{riskData.anomaly_score}</span>
              </div>
              {riskData.factors?.map((factor, i) => (
                <div key={i} className="flex justify-between text-[13px]">
                  <span className="text-slate-500">{factor.feature}</span>
                  <span className="font-semibold text-slate-700">{factor.deviation}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowRiskWarning(false);
                  setRiskData(null);
                  window.history.back();
                }}
                className="w-full rounded-full bg-red-600 py-3 text-[15px] font-semibold text-white"
              >
                Cancel Transaction
              </button>
              <button
                onClick={() => {
                  setShowRiskWarning(false);
                  setRiskData(null);
                }}
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
