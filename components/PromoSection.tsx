import Link from "next/link";

interface PromoSectionProps {
  countryCode?: string;
}

export default function PromoSection({ countryCode = "MY" }: PromoSectionProps) {
  const isMalaysia = countryCode === "MY";

  return (
    <div className="px-4 py-3 flex gap-3">
      {/* Left column: Grow your money + GOrewards stacked */}
      <div className="flex-1 flex flex-col gap-2">
        <div className="bg-blue-50 rounded-xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center text-2xl">🌱</div>
          <div>
            <p className="text-xs font-bold text-slate-900">Grow your money</p>
            <p className="text-[10px] text-gray-500">Start with just RM10</p>
          </div>
        </div>
        <div className="bg-orange-50 rounded-xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center text-2xl">🎁</div>
          <div>
            <p className="text-xs font-bold text-slate-900">GOrewards</p>
            <span className="inline-block mt-0.5 rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-500">
              Expiring: 114 pts
            </span>
          </div>
        </div>
      </div>

      {/* Right column: BUDI95 - only shown for Malaysia */}
      {isMalaysia && (
        <Link href="/budi95" className="flex-1 bg-blue-50 rounded-xl p-3 block">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#5BADE0] flex items-center justify-center text-[10px] font-bold text-white leading-tight text-center">
              BUDI<br/>RON95
            </div>
            <div>
              <p className="text-xs font-bold">BUDI95</p>
              <p className="text-[10px] text-gray-600">RON95 at RM1.99</p>
            </div>
          </div>
          <div className="bg-white rounded-lg px-3 py-2 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-400">Fuel balance</p>
              <p className="text-sm font-bold">184 litres</p>
            </div>
            <div className="w-8 h-8 rounded-full border-[3px] border-[#0b66cb] flex items-center justify-center">
              <span className="text-[10px]">⛽</span>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
