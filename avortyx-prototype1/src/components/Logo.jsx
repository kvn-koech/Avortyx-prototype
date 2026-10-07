export default function Logo({ size = 32, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="avx-g" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6c72ff" />
          <stop offset="1" stopColor="#57c3ff" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#avx-g)" />
      <path d="M16 49 32 15 48 49" fill="none" stroke="#080f25" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23.5 38h17" fill="none" stroke="#080f25" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 7" />
      <circle cx="32" cy="15" r="4.5" fill="#fff" />
    </svg>
  );
}
