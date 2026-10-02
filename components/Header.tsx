"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, introDelay } from "@/lib/gsap";
import { getLenis, scrollToHash } from "@/lib/lenis";
import { SERVICES } from "@/lib/data";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const ref = useRef<HTMLElement>(null);
  const [solid, setSolid] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const ddTl = useRef<gsap.core.Timeline | null>(null);
  const mobTl = useRef<gsap.core.Timeline | null>(null);

  const active =
    pathname.startsWith("/leistungen") ? "leistungen" : pathname.startsWith("/kontakt") ? "kontakt" : null;

  // Einblenden, Hide-on-scroll, Hintergrund
  useGSAP(() => {
    const el = ref.current!;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.from(el, { yPercent: -100, duration: 1.1, ease: "expo.out", delay: introDelay() - 0.15 });
    });
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate(self) {
        const y = self.scroll();
        setSolid(y > 40);
        if (document.documentElement.classList.contains("pm-menu-open")) return;
        const hide = self.direction === 1 && y > 280;
        gsap.to(el, { yPercent: hide ? -100 : 0, duration: 0.55, ease: "power3.out", overwrite: "auto" });
      },
    });
    return () => { st.kill(); mm.revert(); };
  }, { scope: ref });

  // Dropdown-Timeline
  useGSAP(() => {
    const dd = ref.current!.querySelector(".dropdown");
    if (!dd) return;
    const links = dd.querySelectorAll(".dropdown__link");
    ddTl.current = gsap.timeline({ paused: true })
      .set(dd, { visibility: "visible" })
      .fromTo(dd, { opacity: 0, clipPath: "inset(0% 0% 100% 0%)", y: 8 }, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.5, ease: "expo.out" })
      .from(links, { opacity: 0, x: -10, stagger: 0.035, duration: 0.45, ease: "power3.out" }, 0.08);
  }, { scope: ref });

  useEffect(() => {
    const tl = ddTl.current;
    if (!tl) return;
    if (ddOpen) tl.timeScale(1).play(); else tl.timeScale(1.8).reverse();
  }, [ddOpen]);

  // Mobile-Menü
  useGSAP(() => {
    const nav = document.querySelector(".mobile-nav");
    if (!nav) return;
    mobTl.current = gsap.timeline({ paused: true })
      .set(nav, { visibility: "visible" })
      .fromTo(nav, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "expo.inOut" })
      .from(nav.querySelectorAll(".mobile-nav__link"), { yPercent: 60, opacity: 0, stagger: 0.04, duration: 0.6, ease: "expo.out" }, 0.35);
  });

  useEffect(() => {
    const tl = mobTl.current;
    const html = document.documentElement;
    if (mobile) {
      html.classList.add("pm-menu-open");
      getLenis()?.stop();
      gsap.to(ref.current, { yPercent: 0, duration: 0.3 });
      tl?.timeScale(1).play();
    } else {
      html.classList.remove("pm-menu-open");
      getLenis()?.start();
      tl?.timeScale(1.6).reverse();
    }
  }, [mobile]);

  useEffect(() => { setMobile(false); setDdOpen(false); }, [pathname]);

  const goUeber = (e: React.MouseEvent) => {
    if (pathname === "/") { e.preventDefault(); setMobile(false); scrollToHash("#ueber"); }
  };
  const goHome = (e: React.MouseEvent) => {
    if (pathname === "/") { e.preventDefault(); setMobile(false); getLenis()?.scrollTo(0, { duration: 1.4 }); }
  };

  return (
    <>
      <header ref={ref} className={`header ${solid ? "header--solid" : "header--top"}`}>
        <div className="header__inner">
          <Link href="/" className="header__logo" onClick={goHome} aria-label="Pfalz Multiservice – Startseite" data-cursor>
            <Logo height={48} />
          </Link>

          <nav className="nav" aria-label="Hauptnavigation">
            <div
              className={`nav__item ${ddOpen ? "nav__item--open" : ""}`}
              onMouseEnter={() => setDdOpen(true)}
              onMouseLeave={() => setDdOpen(false)}
              onFocus={() => setDdOpen(true)}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setDdOpen(false); }}
            >
              <button
                className={`nav__link ${active === "leistungen" ? "nav__link--active" : ""}`}
                aria-expanded={ddOpen}
                aria-haspopup="true"
                onClick={() => (pathname === "/" ? scrollToHash("#leistungen") : router.push("/#leistungen"))}
                data-cursor
              >
                Leistungen <Icon name="chevron-down" size={15} className="nav__chev" />
              </button>
              <div className="dropdown" role="menu">
                {SERVICES.map((s) => (
                  <Link key={s.id} href={`/leistungen/${s.id}`} className="dropdown__link" role="menuitem" data-cursor
                    onClick={() => setDdOpen(false)}>
                    <Icon name={s.icon} size={18} />
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="nav__item">
              <Link href="/#ueber" className="nav__link" onClick={goUeber} data-cursor>Über uns</Link>
            </div>
            <div className="nav__item">
              <Link href="/kontakt" className={`nav__link ${active === "kontakt" ? "nav__link--active" : ""}`} data-cursor>Kontakt</Link>
            </div>
          </nav>

          <button className="burger" aria-label={mobile ? "Menü schließen" : "Menü öffnen"} aria-expanded={mobile}
            onClick={() => setMobile((m) => !m)}>
            <Icon name={mobile ? "x" : "menu"} size={22} />
          </button>
        </div>
      </header>

      <div className="mobile-nav" aria-hidden={!mobile}>
        <Link href="/#leistungen" className="mobile-nav__link" onClick={(e) => { if (pathname === "/") { e.preventDefault(); setMobile(false); scrollToHash("#leistungen"); } }}>Leistungen</Link>
        {SERVICES.map((s) => (
          <Link key={s.id} href={`/leistungen/${s.id}`} className="mobile-nav__link mobile-nav__link--sub">
            <Icon name={s.icon} size={18} /> {s.title}
          </Link>
        ))}
        <Link href="/#ueber" className="mobile-nav__link" onClick={goUeber}>Über uns</Link>
        <Link href="/kontakt" className="mobile-nav__link">Kontakt</Link>
      </div>
    </>
  );
}
