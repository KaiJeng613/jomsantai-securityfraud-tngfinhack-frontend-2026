"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { pinService } from "@/lib/api/pinService";

const PLACEHOLDER_API_HOST = "your-api-gateway-url.execute-api.region.amazonaws.com";
const PIN_LENGTH = 6;

type PinStage = "set" | "confirm";

function PinBoxes({
  value,
  label,
  isActive,
  onFocus,
}: {
  value: string;
  label: string;
  isActive: boolean;
  onFocus: () => void;
}) {
  return (
    <button type="button" onClick={onFocus} className="block w-full text-left">
      <span className="mb-3 block text-2xl font-medium text-slate-700">{label}</span>
      <div className="grid grid-cols-6 gap-1.5">
        {Array.from({ length: PIN_LENGTH }).map((_, index) => (
          <div
            key={`${label}-${index}`}
            className={`flex aspect-square items-center justify-center border-b-2 text-2xl font-semibold ${
              isActive ? "border-slate-500" : "border-slate-400"
            } bg-slate-50`}
          >
            {value[index] ? "\u2022" : ""}
          </div>
        ))}
      </div>
    </button>
  );
}

export default function SecurePinPage() {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [activeStage, setActiveStage] = useState<PinStage>("set");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setPinInputRef = useRef<HTMLInputElement>(null);
  const confirmPinInputRef = useRef<HTMLInputElement>(null);

  const isApiConfigured = useMemo(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
    return baseUrl.length > 0 && !baseUrl.includes(PLACEHOLDER_API_HOST);
  }, []);

  const focusStage = (stage: PinStage) => {
    setActiveStage(stage);
    const targetRef = stage === "set" ? setPinInputRef : confirmPinInputRef;
    targetRef.current?.focus();
  };

  const handlePinChange = (stage: PinStage, rawValue: string) => {
    const nextValue = rawValue.replace(/\D/g, "").slice(0, PIN_LENGTH);

    if (stage === "set") {
      setPin(nextValue);
      if (nextValue.length === PIN_LENGTH) {
        setActiveStage("confirm");
        confirmPinInputRef.current?.focus();
      }
      return;
    }

    setConfirmPin(nextValue);
  };

  const handleContinue = async () => {
    setMessage("");
    setError("");

    if (pin.length !== PIN_LENGTH || confirmPin.length !== PIN_LENGTH) {
      setError("Enter and confirm a 6-digit PIN.");
      return;
    }

    if (pin !== confirmPin) {
      setError("PIN confirmation does not match.");
      return;
    }

    if (!isApiConfigured) {
      setError("Set NEXT_PUBLIC_API_BASE_URL and NEXT_PUBLIC_API_KEY before calling the Lambda API.");
      return;
    }

    setIsSubmitting(true);

    const response = await pinService.createPin({
      userId: "demo-user-001",
      pin,
    });

    setIsSubmitting(false);

    if (response.success) {
      setMessage(response.data?.message || "Secure PIN saved successfully.");
      setPin("");
      setConfirmPin("");
      setActiveStage("set");
      setPinInputRef.current?.focus();
      return;
    }

    setError(response.error || "Unable to reach the Secure PIN Lambda.");
  };

  const isReady = pin.length === PIN_LENGTH && confirmPin.length === PIN_LENGTH;

  return (
    <main className="min-h-screen bg-white px-5 pb-8 pt-6 text-slate-900">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-md flex-col">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-3xl leading-none text-slate-900">
            {"<"}
          </Link>
          <div className="text-sm text-slate-400"> </div>
        </div>

        <div className="mt-8 flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className={`h-2.5 w-2.5 rounded-full ${
                index === 2 ? "bg-blue-500" : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        <h1 className="mt-10 text-6xl font-semibold tracking-tight text-slate-900">6-digit PIN</h1>
        <p className="mt-4 text-2xl text-slate-500">Set your PIN</p>

        <div className="mt-6 space-y-6">
          <PinBoxes
            value={pin}
            label="Set your PIN"
            isActive={activeStage === "set"}
            onFocus={() => focusStage("set")}
          />
          <PinBoxes
            value={confirmPin}
            label="Confirm your PIN"
            isActive={activeStage === "confirm"}
            onFocus={() => focusStage("confirm")}
          />
        </div>

        <input
          ref={setPinInputRef}
          value={pin}
          onChange={(event) => handlePinChange("set", event.target.value)}
          inputMode="numeric"
          autoComplete="one-time-code"
          className="sr-only"
        />
        <input
          ref={confirmPinInputRef}
          value={confirmPin}
          onChange={(event) => handlePinChange("confirm", event.target.value)}
          inputMode="numeric"
          className="sr-only"
        />

        <section className="mt-14">
          <h2 className="text-4xl font-semibold leading-tight text-slate-900">
            Follow these security requirements to create a strong PIN:
          </h2>
          <ul className="mt-6 list-disc space-y-4 pl-6 text-xl leading-8 text-slate-800">
            <li>Do not use single numbers, couplets, or triplets.</li>
            <li>Do not use sequential numbers.</li>
            <li>
              Do not use your registered mobile number or the first or last 6 digits of your
              identification document.
            </li>
            <li>Do not use your date of birth in any sequence.</li>
          </ul>
        </section>

        {message ? (
          <p className="mt-6 rounded-2xl bg-emerald-50 px-4 py-3 text-base text-emerald-700">
            {message}
          </p>
        ) : null}

        {error ? (
          <p className="mt-6 rounded-2xl bg-rose-50 px-4 py-3 text-base text-rose-700">{error}</p>
        ) : null}

        <div className="mt-auto pt-10">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!isReady || isSubmitting}
            className="w-full rounded-full bg-slate-200 px-6 py-5 text-2xl font-medium text-slate-500 disabled:cursor-not-allowed disabled:opacity-100"
          >
            {isSubmitting ? "Saving..." : "Next"}
          </button>
          <div className="mx-auto mt-6 h-1.5 w-36 rounded-full bg-slate-900" />
        </div>
      </div>
    </main>
  );
}
