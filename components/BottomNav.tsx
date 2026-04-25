interface BottomNavProps {
  selected: number;
  onSelect: (index: number) => void;
}

export default function BottomNav({ selected, onSelect }: BottomNavProps) {
  const navItems = [
    { icon: "🏠", label: "Home" },
    { icon: "🛒", label: "eStore" },
    { icon: "", label: "" }, // Spacer for FAB
    { icon: "💰", label: "GOfinance" },
    { icon: "📍", label: "Near Me" },
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
        <div className="flex items-center justify-around h-16 relative">
          {navItems.map((item, index) => {
            if (index === 2) {
              return <div key={index} className="w-16" />;
            }
            const isSelected = selected === index;
            return (
              <button
                key={index}
                onClick={() => onSelect(index)}
                className="flex flex-col items-center justify-center flex-1"
              >
                <span className={`text-2xl ${isSelected ? "opacity-100" : "opacity-50"}`}>
                  {item.icon}
                </span>
                <span className={`text-[10px] ${isSelected ? "text-blue-600" : "text-gray-500"}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-primary rounded-full shadow-lg flex items-center justify-center text-white text-3xl z-50">
        📷
      </button>
    </>
  );
}
