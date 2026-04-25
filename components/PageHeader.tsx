import Link from "next/link";

interface PageHeaderProps {
  backHref?: string;
  rightElement?: React.ReactNode;
  className?: string;
}

export default function PageHeader({ 
  backHref = "/", 
  rightElement,
  className = ""
}: PageHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <Link href={backHref} className="text-3xl leading-none" aria-label="Back">
        ←
      </Link>
      {rightElement || <div className="text-sm text-slate-400"> </div>}
    </div>
  );
}
