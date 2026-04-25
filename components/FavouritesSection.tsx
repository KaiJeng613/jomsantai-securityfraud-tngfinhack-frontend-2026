export default function FavouritesSection() {
  const favourites = [
    [
      { icon: "🅿️", label: "Street Par...", color: "bg-blue-100" },
      { icon: "💳", label: "TNG Card", color: "bg-blue-100" },
      { icon: "🚗", label: "Toll", color: "bg-sky-100" },
      { icon: "🛡️", label: "Insurance", color: "bg-orange-100" },
    ],
    [
      { icon: "➕", label: "GO+", color: "bg-orange-100" },
      { icon: "📈", label: "Investment", color: "bg-blue-100" },
      { icon: "📱", label: "Prepaid", color: "bg-sky-100" },
      { icon: "⋯", label: "More", color: "bg-orange-100" },
    ],
  ];

  return (
    <div className="px-4 py-3">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-base">My Favourites</h3>
        <button className="text-blue-600 text-sm font-semibold">Edit</button>
      </div>
      {favourites.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-around mb-4">
          {row.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center text-2xl mb-1`}>
                {item.icon}
              </div>
              <span className="text-[10px] text-center">{item.label}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
