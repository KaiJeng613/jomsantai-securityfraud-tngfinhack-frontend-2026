interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageShell({ children, className = "bg-white" }: PageShellProps) {
  return (
    <main className={`min-h-screen text-slate-900 ${className}`}>
      <div className="mx-auto min-h-screen max-w-md">
        {children}
      </div>
    </main>
  );
}
