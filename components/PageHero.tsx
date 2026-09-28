"use client";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK, introDelay, splitHeading } from "@/lib/gsap";
import { bg } from "@/lib/bg";
import { SectionHeading } from "./SectionHeading";
import { Icon } from "./Icon";

type Props = { eyebrow: string; title: string; highlight: string; intro: string; image: string; crumbs: { label: string; href?: string }[] };

export function PageHero({ eyebrow, title, highlight, intro, image, crumbs }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const root = ref.current!;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.set(root.querySelectorAll(".pm-intro"), { visibility: "visible" });
      const title = root.querySelector(".sh__title")!;
      const split = splitHeading(title);
      const whole = split.targets[0] === title;
      gsap.timeline({ delay: introDelay() - 0.1 })
        .from(root.querySelector(".page-hero__img"), { scale: 1.25, duration: 2.2, ease: "expo.out" }, 0)
        .from(root.querySelectorAll(".crumbs > *"), { opacity: 0, y: 10, stagger: 0.05, duration: 0.7 }, 0.1)
        .from(root.querySelectorAll(".eyebrow__rule"), { scaleX: 0, duration: 0.9, ease: "power3.inOut" }, 0.15)
        .from(root.querySelector(".eyebrow__text"), { opacity: 0, x: -12, duration: 0.8 }, 0.3)
        .from(split.targets, whole ? { y: 40, opacity: 0, duration: 1.3 } : { yPercent: 118, rotate: 2, transformOrigin: "0% 100%", duration: 1.3, stagger: 0.1 }, 0.25)
        .from(root.querySelector(".sh__intro"), { opacity: 0, y: 22, duration: 1.1 }, 0.6);
      gsap.to(root.querySelector(".page-hero__bg"), {
        yPercent: 12, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
      });
      return () => split.revert();
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="page-hero">
      <div className="page-hero__bg"><div className="page-hero__img pm-img" style={bg(image)} /></div>
      <div className="hero__scrim" />
      <div className="container" style={{ position: "relative" }}>
        <nav className="crumbs pm-intro" aria-label="Brotkrumen">
          <Link href="/">Start</Link>
          {crumbs.map((c) => (
            <span key={c.label} style={{ display: "contents" }}>
              <Icon name="chevron-right" size={14} />
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span className="crumbs__current">{c.label}</span>}
            </span>
          ))}
        </nav>
        <SectionHeading dark level={1} size="h1" motion="intro" maxWidth={720} eyebrow={eyebrow} title={title} highlight={highlight} intro={intro} />
      </div>
    </section>
  );
}
