"use client";

import { useState } from "react";

export default function BalanceCard() {
  const [showAmount, setShowAmount] = useState(false);

  return (
    <div className="text-white">
      <div className="mb-1 flex items-center gap-2">
        <span className="text-xl" aria-hidden="true">
          ✓
        </span>
        <span className="text-3xl font-bold">
          {showAmount ? "RM 100.00" : "RM ****"}
        </span>
        <button
          type="button"
          onClick={() => setShowAmount((current) => !current)}
          className="text-xl leading-none transition-opacity hover:opacity-80"
          aria-label={showAmount ? "Hide balance amount" : "Show balance amount"}
          aria-pressed={showAmount}
        >
          {showAmount ? "👁" : "◡"}
        </button>
      </div>
      <p className="mb-4 text-sm text-white/80">View balance details &gt;</p>
      <div className="flex gap-4">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-4 py-3 font-semibold text-primary">
          <span>+</span>
          <span>Add money</span>
        </button>
        <button className="flex items-center gap-1 text-white">
          <span>Transactions</span>
          <span className="text-xs">›</span>
        </button>
      </div>
    </div>
  );
}
