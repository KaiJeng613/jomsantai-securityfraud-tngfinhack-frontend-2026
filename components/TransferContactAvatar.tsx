interface TransferContactAvatarProps {
  initials: string;
  danger?: boolean;
}

export default function TransferContactAvatar({
  initials,
  danger = false,
}: TransferContactAvatarProps) {
  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold ${
        danger
          ? "bg-rose-100 text-rose-700"
          : "bg-[#dff3ff] text-[#0b66cb]"
      }`}
    >
      {initials}
    </div>
  );
}
