"use client";
import Link from "next/link";
import { useRef, type ReactNode, type MouseEventHandler } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Icon } from "./Icon";
import type { IconName } from "@/lib/data";

type Props = {
  children: ReactNode;
  variant?: "primary" | "accent" | "outline" | "outline-light" | "link";
  size?: "sm" | "md" | "lg";
  icon?: IconName;
  iconLeft?: IconName;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
  magnetic?: boolean;
  className?: string;
  onClick?: MouseEventHandler;
};

export function Button({
  children, variant = "primary", size = "md", icon, iconLeft, href, type = "button",
  disabled, fullWidth, magnetic = true, className = "", onClick,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const iconSize = size === "lg" ? 19 : size === "sm" ? 16 : 18;

  // Magnetischer Button: folgt dem Cursor leicht, federt beim Verlassen zurück
  useGSAP(() => {
    const el = ref.current;
    if (!el || !magnetic || variant === "link") return;
    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
      const label = el.querySelector(".btn__label");
      const lxTo = label ? gsap.quickTo(label, "x", { duration: 0.6, ease: "power3.out" }) : null;
      const lyTo = label ? gsap.quickTo(label, "y", { duration: 0.6, ease: "power3.out" }) : null;
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        xTo(dx * 0.18); yTo(dy * 0.3);
        lxTo?.(dx * 0.08); lyTo?.(dy * 0.12);
      };
      const leave = () => { xTo(0); yTo(0); lxTo?.(0); lyTo?.(0); gsap.to(el, { scale: 1, duration: 0.4 }); };
      const down = () => gsap.to(el, { scale: 0.97, duration: 0.15, ease: "power2.out" });
      const up = () => gsap.to(el, { scale: 1, duration: 0.5, ease: "expo.out" });
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      el.addEventListener("pointerdown", down);
      el.addEventListener("pointerup", up);
      el.addEventListener("pointercancel", up);
      return () => {
        el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave);
        el.removeEventListener("pointerdown", down); el.removeEventListener("pointerup", up); el.removeEventListener("pointercancel", up);
      };
    });
    return () => mm.revert();
  }, { scope: ref, dependencies: [magnetic, variant] });

  const cls = [
    "btn",
    variant === "outline-light" && "btn--outline-light",
    variant === "outline" && "btn--outline",
    variant === "link" && "btn--link",
    size === "lg" && "btn--lg",
    size === "sm" && "btn--sm",
    fullWidth && "btn--full",
    className,
  ].filter(Boolean).join(" ");

  const inner = (
    <>
      {variant !== "link" && <span className="btn__fill" aria-hidden="true" />}
      {(variant === "accent" || variant === "primary") && <span className="btn__sheen" aria-hidden="true" />}
      <span className="btn__label">
        {iconLeft && <Icon name={iconLeft} size={iconSize} className="btn__icon" />}
        {children}
        {icon && <Icon name={icon} size={iconSize} className="btn__icon btn__icon--right" />}
      </span>
    </>
  );

  if (href && !disabled) {
    const external = /^(https?:|tel:|mailto:)/.test(href);
    if (external) {
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={cls} data-cursor
          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {inner}
        </a>
      );
    }
    return (
      <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={cls} onClick={onClick} data-cursor>
        {inner}
      </Link>
    );
  }
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} type={type} className={cls} disabled={disabled} onClick={onClick} data-cursor>
      {inner}
    </button>
  );
}
