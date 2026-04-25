export default function GoFinanceBanner() {
  return (
    <div className="mx-4 my-3 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-4 flex items-center justify-between">
      <div>
        <h3 className="font-bold text-base mb-1">GOfinance</h3>
        <p className="text-xs text-gray-700">Grow and protect your money easily.</p>
      </div>
      <button className="bg-pink-500 text-white px-4 py-2 rounded-full text-[10px] font-bold whitespace-nowrap">
        EXPLORE NOW!
      </button>
    </div>
  );
}
