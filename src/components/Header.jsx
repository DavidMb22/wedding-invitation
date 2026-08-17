import { useState } from "react";
import { Menu, X } from "lucide-react";
import { wedding } from "../data/wedding";

const links = [
  { label: "Story", href: "#story" },
  { label: "Details", href: "#details" },
  { label: "Countdown", href: "#countdown" },
  { label: "RSVP", href: "#rsvp" },
  { label: "Location", href: "#location" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-[18px] pt-[18px]">
      <div className="border border-black/[0.10] bg-[#f5f2eb]/80 backdrop-blur-[2px]">
        <div className="flex h-[70px] items-center justify-between px-5 sm:px-7 lg:px-8">
          
          {/* Logo */}
          <a
            href="#home"
            className="font-serif text-[18px] tracking-[0.12em] text-black/80"
          >
            {wedding.groom.charAt(0)} & {wedding.bride.charAt(0)}
          </a>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[8px] font-medium uppercase tracking-[0.28em] text-black/45 transition-colors duration-300 hover:text-black"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile button */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="text-black/60 md:hidden"
            aria-label="Toggle navigation"
          >
            {open ? <X size={17} strokeWidth={1} /> : <Menu size={17} strokeWidth={1} />}
          </button>
        </div>

        {/* Mobile navigation */}
        {open && (
          <nav className="border-t border-black/[0.08] px-6 py-7 md:hidden">
            <div className="flex flex-col gap-5">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-[9px] uppercase tracking-[0.3em] text-black/60"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}