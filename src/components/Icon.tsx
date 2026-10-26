// One hairline icon family (24px grid, 1.25 stroke) used everywhere on the site.
const paths = {
  arrow: <path d="M4 12h15m-5-5 5 5-5 5" />,
  arrowLeft: <path d="M20 12H5m5-5-5 5 5 5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  menu: <path d="M3 8h18M3 16h18" />,
  phone: (
    <path d="M6.6 3.5h2.6l1.4 4-2 1.3a11 11 0 0 0 6.6 6.6l1.3-2 4 1.4v2.6a1.9 1.9 0 0 1-2 1.9A16.5 16.5 0 0 1 4.6 5.5a1.9 1.9 0 0 1 2-2Z" />
  ),
  whatsapp: (
    <>
      <path d="M4.2 19.8 5.3 16A8.2 8.2 0 1 1 8 18.7Z" />
      <path d="M9.3 8.6c.2-.4.6-.4.9-.4l.5 1.3-.6.8a5 5 0 0 0 2.6 2.6l.8-.6 1.3.5c0 .3 0 .7-.4.9-.7.5-1.6.5-2.6 0a7 7 0 0 1-2.9-2.9c-.4-.9-.4-1.8 0-2.4Z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.9" />
      <path d="M17.2 6.8h.01" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  expand: <path d="M14 4h6v6M10 20H4v-6M20 4l-6.5 6.5M4 20l6.5-6.5" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
} as const

export type IconName = keyof typeof paths

export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  )
}
