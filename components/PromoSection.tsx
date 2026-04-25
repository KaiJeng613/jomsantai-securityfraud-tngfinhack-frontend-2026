export default function PromoSection() {
  return (
    <div className="px-4 py-3 flex gap-3">
      <div className="flex-1 bg-gray-100 rounded-xl p-3 flex items-center gap-2">
        <span className="text-2xl">🌱</span>
        <div>
          <p className="text-xs font-bold">Grow your mon...</p>
          <p className="text-[10px] text-gray-600">Start with just RM10</p>
        </div>
      </div>
      <div className="flex-1 bg-gray-100 rounded-xl p-3 flex items-center gap-2">
        <span className="text-2xl">🎁</span>
        <div>
          <p className="text-xs font-bold">GOrewards</p>
          <p className="text-[10px] text-gray-600">Win RM</p>
        </div>
      </div>
    </div>
  );
}
