"use client";

import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import ScrambledText from "@/components/wierdtext";

/**
 * The signature, the link back to the main site and the socials, fixed over
 * the page. No bar behind them; they slide away on scroll down and come back
 * on scroll up. The only hover effect is the text scramble.
 */

/** The main site, where the projects live. Change here if the domain changes. */
export const MAIN_SITE = "https://frankllonch.vercel.app";

const TILE_CLASS = "h-8 w-8 sm:h-9 sm:w-9 shrink-0 flex items-center justify-center";
const TILE_HOVER = { scale: 1.08, y: -2 };
const TILE_SPRING = { type: "spring", stiffness: 240, damping: 16 } as const;

// Above this scroll offset the top bar is always visible.
const BAR_ALWAYS_VISIBLE_ABOVE = 100;
// Ignore scroll deltas smaller than this so trackpad jitter can't flicker the bar.
const BAR_SCROLL_JITTER = 4;

const SOCIALS = [
  { href: "https://github.com/frankllonch", img: "/images/github-logo.png", alt: "GitHub", invert: true },
  { href: "https://linkedin.com/in/frankllonch", img: "/images/linkedin_logo_sq.png", alt: "LinkedIn", invert: false },
  { href: "mailto:llonchfrank@gmail.com", img: "/images/email.png", alt: "Email", invert: false },
];

const INK = "text-black";

export default function TopBar() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const hadFirstScrollEvent = useRef(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // The first event is the restored offset on load, not a gesture.
    if (!hadFirstScrollEvent.current) {
      hadFirstScrollEvent.current = true;
      return;
    }
    if (latest <= BAR_ALWAYS_VISIBLE_ABOVE) {
      setHidden(false);
      return;
    }
    const delta = latest - (scrollY.getPrevious() ?? latest);
    if (Math.abs(delta) < BAR_SCROLL_JITTER) return;
    setHidden(delta > 0);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      initial={false}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      // The strip itself takes no clicks; the controls opt back in.
      className="fixed top-0 inset-x-0 z-[200] pointer-events-none will-change-transform"
    >
      <div className="max-w-7xl mx-auto px-6 h-12 sm:h-14 flex flex-row items-center justify-between gap-4 [&>*]:pointer-events-auto">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* SIGNATURE — the main site */}
          <a href={MAIN_SITE} aria-label="Frank Llonch — main site" className="shrink-0">
            <div className={`${INK} font-black tracking-tight`}>
              <ScrambledText className="ink-inherit text-2xl sm:text-3xl" radius={30} duration={0.4} speed={0.5} scrambleChars="*">
                frank
              </ScrambledText>
            </div>
          </a>

          {/* PROJECTS — the main site */}
          <a href={MAIN_SITE} className="shrink-0">
            <div className={`${INK} font-bold text-xs sm:text-sm tracking-wide`}>
              <ScrambledText className="ink-inherit font-inherit" radius={20} duration={0.4} speed={0.5} scrambleChars="*">
                projects
              </ScrambledText>
            </div>
          </a>
        </div>

        {/* SOCIALS + CV */}
        <div className="flex flex-row items-center gap-2 sm:gap-3">
          {SOCIALS.map((s) => (
            <motion.a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" whileHover={TILE_HOVER} transition={TILE_SPRING} className={TILE_CLASS}>
              {/* The GitHub mark is white; on the white sheet it is inverted. */}
              <Image src={s.img} alt={s.alt} width={18} height={18} className={s.invert ? "invert" : undefined} />
            </motion.a>
          ))}
          <motion.a href={`${MAIN_SITE}/cv.pdf`} target="_blank" rel="noopener noreferrer" whileHover={TILE_HOVER} transition={TILE_SPRING} aria-label="Curriculum Vitae (PDF)" className={TILE_CLASS}>
            <div className={`${INK} font-bold text-xs sm:text-sm tracking-wide`}>
              <ScrambledText className="ink-inherit font-inherit" radius={20} duration={0.4} speed={0.5} scrambleChars="*">
                CV
              </ScrambledText>
            </div>
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
}
