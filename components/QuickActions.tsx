export default function QuickActions() {
  const actions = [
    { icon: "📄", label: "Apply" },
    { icon: "🕐", label: "Cash Now" },
    { icon: "✈️", label: "Transfer" },
    { icon: "💳", label: "Cards" },
  ];

  return (
    <div className="mx-4 my-2 bg-white rounded-2xl shadow-md p-4">
      <div className="flex justify-around">
        {actions.map((action, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-3xl mb-1">{action.icon}</div>
            <span className="text-xs text-gray-700">{action.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
