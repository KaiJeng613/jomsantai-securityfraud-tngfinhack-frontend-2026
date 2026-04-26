import PageHeader from "@/components/PageHeader";

export default function CardsPage() {
  return (
    <main className="min-h-screen bg-[#eef3fb] text-slate-900">
      <div className="mx-auto min-h-screen max-w-md bg-[#0b66cb]">
        {/* Header */}
        <div className="px-5 pb-4 pt-6 text-white">
          <PageHeader />
          <h1 className="text-center text-[18px] font-semibold -mt-8 mb-2">Cards</h1>
        </div>

        <div className="space-y-3 px-4 pb-8">
          {/* Visa Card */}
          <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-800 text-2xl">
              💳
            </div>
            <div className="flex-1">
              <p className="text-[16px] font-semibold text-slate-900">Visa Card</p>
              <p className="text-[13px] text-slate-500">
                No RM25 service tax for life, better than average bank&apos;s debit card.
              </p>
            </div>
            <span className="text-xl text-[#0b66cb]">&gt;</span>
          </div>

          {/* TNG Card */}
          <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl">
              💳
            </div>
            <div className="flex-1">
              <p className="text-[16px] font-semibold text-slate-900">TNG card</p>
              <p className="text-[13px] text-slate-500">
                Manage your card for toll, parking and other payments.
              </p>
            </div>
            <span className="text-xl text-[#0b66cb]">&gt;</span>
          </div>

          {/* NFC Card */}
          <div className="flex items-center gap-4 rounded-2xl bg-white px-4 py-4 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center text-2xl">
              📱
            </div>
            <div className="flex-1">
              <p className="text-[14px] text-slate-700">
                Buy an NFC-enabled card for easy reload with your devices.
              </p>
              <p className="mt-1 text-[14px] font-semibold text-[#0b66cb]">Get card now</p>
            </div>
          </div>

          {/* Travel Pass */}
          <div className="flex items-center gap-4 rounded-2xl bg-white px-4 py-4 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center text-2xl">
              🚄
            </div>
            <div className="flex-1">
              <p className="text-[14px] text-slate-700">
                Get a Travel Pass and enjoy unlimited Rapid KL rides without queuing at the counter!
              </p>
              <p className="mt-1 text-[14px] font-semibold text-[#0b66cb]">Get pass now</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
