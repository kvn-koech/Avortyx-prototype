const looks = [
  { bg: ['#6c72ff', '#57c3ff'], skin: '#f1c9a5', hair: '#2b1d16', top: '#1c2a5a', style: 'short' },
  { bg: ['#00ca72', '#57c3ff'], skin: '#8d5a3b', hair: '#120c0a', top: '#243a6b', style: 'long' },
  { bg: ['#57c3ff', '#6c72ff'], skin: '#e8b48c', hair: '#6b3f1d', top: '#2a2f6e', style: 'long' },
  { bg: ['#6c72ff', '#00ca72'], skin: '#c68a5e', hair: '#1a1210', top: '#18305a', style: 'short' },
  { bg: ['#aeb9e1', '#6c72ff'], skin: '#f5d3b4', hair: '#b8864b', top: '#26336b', style: 'bun' },
  { bg: ['#57c3ff', '#00ca72'], skin: '#5e3a28', hair: '#0d0908', top: '#1f2d5f', style: 'short' },
  { bg: ['#6c72ff', '#aeb9e1'], skin: '#d9a47a', hair: '#3a2416', top: '#23346a', style: 'bun' },
  { bg: ['#00ca72', '#6c72ff'], skin: '#efc19a', hair: '#8a8f99', top: '#1b2858', style: 'short' },
];

export default function Avatar({ n = 0, size = 44, className = '' }) {
  const l = looks[n % looks.length];
  const id = 'av' + (n % looks.length);
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={'shrink-0 rounded-full ' + className} role="img" aria-label="Mock portrait">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={l.bg[0]} />
          <stop offset="1" stopColor={l.bg[1]} />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill={'url(#' + id + ')'} />
      {l.style === 'long' && <path d="M17 34c0-16 6-22 15-22s15 6 15 22v14H17Z" fill={l.hair} />}
      {l.style === 'bun' && <circle cx="32" cy="10" r="6" fill={l.hair} />}
      <path d="M8 64c0-13 10-20 24-20s24 7 24 20Z" fill={l.top} />
      <rect x="27" y="36" width="10" height="11" rx="4" fill={l.skin} />
      <ellipse cx="32" cy="28" rx="11" ry="13" fill={l.skin} />
      <path d={l.style === 'long' ? 'M20 27c1-10 7-13 12-13s11 3 12 13c-4-5-8-6-12-6s-8 1-12 6Z' : 'M20 26c0-10 6-14 12-14s12 4 12 14c-3-4-7-6-12-6s-9 2-12 6Z'} fill={l.hair} />
      <circle cx="27.5" cy="29" r="1.3" fill="#1a1a2e" />
      <circle cx="36.5" cy="29" r="1.3" fill="#1a1a2e" />
      <path d="M28 35c2.5 2 5.5 2 8 0" fill="none" stroke="#7a3b2e" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
