/* eslint-disable @next/next/no-img-element */
export function Favicon({ domain, size = 32 }: { domain: string; size?: number }) {
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      className="shrink-0 rounded-md bg-white/90 p-0.5"
    />
  );
}
