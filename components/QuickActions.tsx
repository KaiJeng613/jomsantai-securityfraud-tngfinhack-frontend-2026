import Link from "next/link";

const actions = [
  {
    icon: String.fromCodePoint(0x1f4c4),
    label: "Apply",
  },
  {
    icon: String.fromCodePoint(0x1f550),
    label: "Cash Now",
  },
  {
    icon: String.fromCodePoint(0x2708, 0xfe0f),
    label: "Transfer",
    href: "/transfer",
  },
  {
    icon: String.fromCodePoint(0x1f4b3),
    label: "Cards",
    href: "/cards",
  },
];

export default function QuickActions() {
  return (
    <div className="mx-4 my-2 rounded-2xl bg-white p-4 shadow-md">
      <div className="flex justify-around">
        {actions.map((action) => {
          const content = (
            <>
              <div className="mb-1 text-3xl">{action.icon}</div>
              <span className="text-xs text-gray-700">{action.label}</span>
            </>
          );

          if (action.href) {
            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center"
              >
                {content}
              </Link>
            );
          }

          return (
            <div key={action.label} className="flex flex-col items-center">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
