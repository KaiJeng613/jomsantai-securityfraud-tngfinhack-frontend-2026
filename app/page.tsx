"use client";

import { useState } from "react";
import BalanceCard from "@/components/BalanceCard";
import QuickActions from "@/components/QuickActions";
import PromoSection from "@/components/PromoSection";
import RecommendedSection from "@/components/RecommendedSection";
import FavouritesSection from "@/components/FavouritesSection";
import GoFinanceBanner from "@/components/GoFinanceBanner";
import BottomNav from "@/components/BottomNav";

const countries = [
  { code: "MY", name: "Malaysia", flag: "🇲🇾" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "TH", name: "Thailand", flag: "🇹🇭" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "HK", name: "Hong Kong", flag: "🇭🇰" },
];

export default function Home() {
  const [selectedNav, setSelectedNav] = useState(0);
  const [selectedCountryCode, setSelectedCountryCode] = useState(countries[0].code);

  return (
    <div className="min-h-screen bg-primary">
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <label className="rounded-full bg-white/30 px-3 py-2">
            <span className="sr-only">Select country</span>
            <select
              value={selectedCountryCode}
              onChange={(event) => setSelectedCountryCode(event.target.value)}
              className="bg-transparent pr-2 text-sm text-white outline-none"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code} className="text-black">
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </label>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
            <span className="text-xl text-primary">👤</span>
          </div>
        </div>
        <BalanceCard />
      </div>

      <div className="min-h-screen rounded-t-3xl bg-white">
        <div className="pb-20 pt-4">
          <QuickActions />
          <PromoSection />
          <RecommendedSection />
          <FavouritesSection />
          <GoFinanceBanner />
        </div>
      </div>

      <BottomNav selected={selectedNav} onSelect={setSelectedNav} />
    </div>
  );
}
