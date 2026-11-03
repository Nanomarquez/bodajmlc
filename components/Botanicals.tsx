export function Sprig({ className = "" }: { className?: string }) {
  const leaves = [
    { cx: 28, cy: 168, rx: 13, ry: 4.4, rot: -52 },
    { cx: 54, cy: 150, rx: 13, ry: 4.4, rot: 50 },
    { cx: 26, cy: 128, rx: 12, ry: 4.1, rot: -58 },
    { cx: 56, cy: 110, rx: 12, ry: 4.1, rot: 54 },
    { cx: 30, cy: 88, rx: 11, ry: 3.8, rot: -46 },
    { cx: 52, cy: 70, rx: 10, ry: 3.5, rot: 44 },
    { cx: 34, cy: 50, rx: 8, ry: 3, rot: -32 },
    { cx: 48, cy: 34, rx: 7, ry: 2.7, rot: 30 },
  ];

  return (
    <svg viewBox="0 0 80 210" fill="none" className={className} aria-hidden="true">
      <path
        d="M40 204C42 162 35 124 40 78c3-28-4-48 0-68"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      {leaves.map((leaf) => (
        <ellipse
          key={`${leaf.cx}-${leaf.cy}`}
          cx={leaf.cx}
          cy={leaf.cy}
          rx={leaf.rx}
          ry={leaf.ry}
          transform={`rotate(${leaf.rot} ${leaf.cx} ${leaf.cy})`}
          stroke="currentColor"
          strokeWidth="0.7"
        />
      ))}
    </svg>
  );
}

export function BranchRule({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 40" fill="none" className={className} aria-hidden="true">
      <path d="M6 21h128M186 21h128" stroke="currentColor" strokeWidth="0.6" />
      <path
        d="M160 33c-1.5-8-6-14 0-26 6 12 1.5 18 0 26Z"
        stroke="currentColor"
        strokeWidth="0.7"
      />
      <path d="M160 24c-12-2-20-7-28-14" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
      <path d="M160 24c12-2 20-7 28-14" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
      <ellipse cx="128" cy="10" rx="8" ry="3" transform="rotate(-36 128 10)" stroke="currentColor" strokeWidth="0.6" />
      <ellipse cx="192" cy="10" rx="8" ry="3" transform="rotate(36 192 10)" stroke="currentColor" strokeWidth="0.6" />
      <ellipse cx="146" cy="16" rx="6.5" ry="2.5" transform="rotate(-18 146 16)" stroke="currentColor" strokeWidth="0.6" />
      <ellipse cx="174" cy="16" rx="6.5" ry="2.5" transform="rotate(18 174 16)" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  );
}

export function LeafIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 28" className={className} aria-hidden="true" fill="none">
      <path
        d="M8 26.5C4.4 22 1.5 18.4 1.5 13.6 1.5 8.4 4.3 4.2 8 2.2c3.7 2 6.5 6.2 6.5 11.4C14.5 18.4 11.6 22 8 26.5Z"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path d="M8 23.5c.2-5.4 1.7-9.2 4.6-12.6" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  );
}

export function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 30" className={className} aria-hidden="true" fill="none">
      <path
        d="M16 27S6.5 20.9 6.5 13.8C6.5 9.2 9 6.2 12.4 6.2c1.9 0 3.2.9 3.6 2.2.4-1.3 1.7-2.2 3.6-2.2 3.4 0 5.9 3 5.9 7.6C25.5 20.9 16 27 16 27Z"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Eyebrow({ children }: { children: string }) {
  return (
    <div className="mb-6 flex items-center justify-center gap-4 text-sage">
      <span className="h-px w-8 bg-current opacity-60" />
      <span className="font-sans text-[0.68rem] font-medium tracking-[0.34em] uppercase">
        {children}
      </span>
      <span className="h-px w-8 bg-current opacity-60" />
    </div>
  );
}
