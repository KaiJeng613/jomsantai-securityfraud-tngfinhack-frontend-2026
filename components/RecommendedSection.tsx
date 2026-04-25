import Link from "next/link";

const items = [
  { icon: "📅", label: "Payday", color: "bg-blue-100", href: "/payday" },
  { icon: "✈️", label: "Travel", color: "bg-blue-100", href: "/travel" },
  { icon: "💳", label: "BLDMS", color: "bg-sky-100" },
  { icon: "🛒", label: "Taobao", color: "bg-orange-100", href: "/taobao" },
];

export default function RecommendedSection() {
  return (
    <div className="px-4 py-3">
      <h3 className="mb-3 text-base font-bold">Recommended</h3>
      <div className="flex justify-around">
        {items.map((item) => {
          const content = (
            <>
              <div
                className={`mb-1 flex h-14 w-14 items-center justify-center rounded-xl text-2xl ${item.color}`}
              >
                {item.icon}
              </div>
              <span className="text-center text-[10px]">{item.label}</span>
            </>
          );

          return item.href ? (
            <Link key={item.label} href={item.href} className="flex flex-col items-center">
              {content}
            </Link>
          ) : (
            <div key={item.label} className="flex flex-col items-center">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
