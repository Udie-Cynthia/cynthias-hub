export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M7 7h13l-1.5 9H8.5L7 7z" stroke="#3B82F6" strokeWidth="1.5"/>
        <circle cx="9" cy="19" r="1.5" fill="#3B82F6"/>
        <circle cx="17" cy="19" r="1.5" fill="#3B82F6"/>
      </svg>
      <span className="font-semibold tracking-tight">Cynthias Hub</span>
    </div>
  );
}