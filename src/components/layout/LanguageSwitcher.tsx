"use client";

import { usePathname, useRouter } from "next/navigation";

type Props = {
  isScrolled: boolean;
};

export default function LanguageSwitcher({ isScrolled }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = pathname.split("/")[1] || "fr";
  const otherLocale = currentLocale === "fr" ? "en" : "fr";

  const switchLocale = () => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${otherLocale}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={switchLocale}
      className={`font-accent text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
        isScrolled
          ? "text-charcoal hover:text-peach"
          : "text-white/90 hover:text-white"
      }`}
    >
      {otherLocale.toUpperCase()}
    </button>
  );
}
