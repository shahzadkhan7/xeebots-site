import Image from "next/image";

const sizes = {
  nav: { px: 26, className: "h-6.5" },
  footer: { px: 20, className: "h-5" },
};

/** Black mark; inverted in dark mode until a dedicated dark asset exists. */
export function Logo({ size, preload }: { size: keyof typeof sizes; preload?: boolean }) {
  const { px, className } = sizes[size];
  return (
    <Image
      src="/logo.png"
      alt=""
      width={px}
      height={px}
      preload={preload}
      className={`${className} w-auto dark:invert`}
    />
  );
}
