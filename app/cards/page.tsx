import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export default function CardsPage() {
  return (
    <main className="min-h-screen bg-[#0b66cb] text-white">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="px-5 pb-4 pt-6">
          <PageHeader />
          <h1 className="text-center text-[18px] font-semibold -mt-8 mb-2">Cards</h1>
        </div>

        <div className="space-y-4 px-4 pb-8">
          {/* Visa Card */}
          <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-800 text-2xl">
              💳
            </div>
            <div className="flex-1">
              <p className="text-[16px] font-semibold">Visa Card</p>
              <p className="text-[13px] text-white/70">
                No RM25 service tax for life, better than average bank&apos;s debit card.
              </p>
            </div>
            <span className="text-xl text-white/50">›</span>
          </div>

          {/* TNG Card */}
          <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-400 text-2xl">
              💳
            </div>
            <div className="flex-1">
              <p className="text-[16px] font-semibold">TNG card</p>
              <p className="text-[13px] text-white/70">
                Manage your card for toll, parking and other payments.
              </p>
            </div>
            <span className="text-xl text-white/50">›</span>
          </div>

          {/* NFC Card */}
          <div className="flex items-center gap-4 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center text-2xl">
              📱
            </div>
            <div className="flex-1">
              <p className="text-[14px] text-white/90">
                Buy an NFC-enabled card for easy reload with your devices.
              </p>
              <p className="mt-1 text-[14px] font-semibold text-sky-300">Get card now</p>
            </div>
          </div>

          {/* Travel Pass */}
          <div className="flex items-center gap-4 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center text-2xl">
              🚄
            </div>
            <div className="flex-1">
              <p className="text-[14px] text-white/90">
                Get a Travel Pass and enjoy unlimited Rapid KL rides without queuing at the counter!
              </p>
              <p className="mt-1 text-[14px] font-semibold text-sky-300">Get pass now</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
