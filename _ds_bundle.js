/* @ds-bundle: {"format":4,"namespace":"PfalzMultiserviceDesignSystem_8eb026","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"Icon","sourcePath":"components/actions/Icon.jsx"},{"name":"CheckList","sourcePath":"components/content/CheckList.jsx"},{"name":"CtaBand","sourcePath":"components/content/CtaBand.jsx"},{"name":"Eyebrow","sourcePath":"components/content/Eyebrow.jsx"},{"name":"FAQItem","sourcePath":"components/content/FAQItem.jsx"},{"name":"ProcessStep","sourcePath":"components/content/ProcessStep.jsx"},{"name":"SectionHeading","sourcePath":"components/content/SectionHeading.jsx"},{"name":"ServiceCard","sourcePath":"components/content/ServiceCard.jsx"},{"name":"ServiceChip","sourcePath":"components/content/ServiceChip.jsx"},{"name":"TestimonialCard","sourcePath":"components/content/TestimonialCard.jsx"},{"name":"SelectField","sourcePath":"components/forms/SelectField.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"SiteFooter","sourcePath":"components/navigation/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"components/navigation/SiteHeader.jsx"},{"name":"TopBar","sourcePath":"components/navigation/TopBar.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"1ff840e44763","components/actions/Icon.jsx":"f650fbef96db","components/content/CheckList.jsx":"c203a542b7b7","components/content/CtaBand.jsx":"2bb6066251a5","components/content/Eyebrow.jsx":"c02d7e5a1251","components/content/FAQItem.jsx":"79ec8132723a","components/content/ProcessStep.jsx":"abb824f926c1","components/content/SectionHeading.jsx":"6714e395402c","components/content/ServiceCard.jsx":"55ecaa488f7e","components/content/ServiceChip.jsx":"c770b8e48a52","components/content/TestimonialCard.jsx":"7fa13af9646d","components/forms/SelectField.jsx":"a20e2489efc5","components/forms/TextField.jsx":"ed7639adede3","components/navigation/SiteFooter.jsx":"77c8fcaaa6d0","components/navigation/SiteHeader.jsx":"abefd672d187","components/navigation/TopBar.jsx":"650b5eff7e70","ui_kits/website/Contact.jsx":"d34d58c1a5bb","ui_kits/website/Home.jsx":"5d0dbcf1b2bb","ui_kits/website/Layout.jsx":"7b93f16ab524","ui_kits/website/Legal.jsx":"0e5fd09c321e","ui_kits/website/ServiceDetail.jsx":"1efd2b7f0e63","ui_kits/website/data.jsx":"f43e5ea1e9ff"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PfalzMultiserviceDesignSystem_8eb026 = window.PfalzMultiserviceDesignSystem_8eb026 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CDN = 'https://unpkg.com/lucide-static@0.460.0/icons/';
function Icon({
  name = 'arrow-right',
  size = 20,
  color = 'currentColor',
  style = {},
  ...rest
}) {
  const url = 'url(' + CDN + name + '.svg)';
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true"
  }, rest, {
    style: {
      display: 'inline-block',
      flex: 'none',
      width: size,
      height: size,
      background: color,
      WebkitMask: url + ' center/contain no-repeat',
      mask: url + ' center/contain no-repeat',
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Icon.jsx", error: String((e && e.message) || e) }); }

// components/actions/Button.jsx
try { (() => {
const V = {
  primary: {
    bg: 'var(--brand-primary)',
    fg: 'var(--text-on-accent)',
    bd: 'var(--brand-primary)',
    hbg: 'var(--brand-primary-hover)',
    hbd: 'var(--brand-primary-hover)',
    hfg: 'var(--text-on-accent)'
  },
  accent: {
    bg: 'var(--brand-accent)',
    fg: 'var(--pm-navy-950)',
    bd: 'var(--brand-accent)',
    hbg: 'var(--brand-accent-hover)',
    hbd: 'var(--brand-accent-hover)',
    hfg: 'var(--pm-navy-950)'
  },
  outline: {
    bg: 'transparent',
    fg: 'var(--brand-primary)',
    bd: 'var(--brand-primary)',
    hbg: 'var(--brand-primary)',
    hbd: 'var(--brand-primary)',
    hfg: 'var(--text-on-accent)'
  },
  'outline-light': {
    bg: 'transparent',
    fg: '#fff',
    bd: '#fff',
    hbg: '#fff',
    hbd: '#fff',
    hfg: 'var(--pm-black)'
  },
  link: {
    bg: 'transparent',
    fg: 'var(--brand-primary)',
    bd: 'transparent',
    hbg: 'transparent',
    hbd: 'transparent',
    hfg: 'var(--brand-accent)'
  }
};
const S = {
  sm: {
    h: 40,
    px: 18,
    fs: 12
  },
  md: {
    h: 50,
    px: 28,
    fs: 14
  },
  lg: {
    h: 58,
    px: 36,
    fs: 15
  }
};
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconLeft,
  href,
  disabled,
  fullWidth,
  onClick,
  style = {}
}) {
  const [h, setH] = React.useState(false);
  const [p, setP] = React.useState(false);
  const v = V[variant] || V.primary,
    s = S[size] || S.md,
    isLink = variant === 'link';
  const Tag = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    onClick: disabled ? undefined : onClick,
    disabled: disabled,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false),
    style: {
      display: fullWidth ? 'flex' : 'inline-flex',
      width: fullWidth ? '100%' : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      height: isLink ? 'auto' : s.h,
      padding: isLink ? 0 : '0 ' + s.px + 'px',
      font: '600 ' + s.fs + 'px/1 var(--font-display)',
      letterSpacing: 'var(--ls-button)',
      textTransform: 'uppercase',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      background: h && !disabled ? v.hbg : v.bg,
      color: h && !disabled ? v.hfg : v.fg,
      border: isLink ? 'none' : '2px solid ' + (h && !disabled ? v.hbd : v.bd),
      borderRadius: 'var(--radius-button)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .45 : 1,
      transform: p && !disabled ? 'translateY(1px)' : 'none',
      transition: 'background var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out)',
      ...style
    }
  }, iconLeft && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: s.fs + 4
  }), children, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.fs + 4,
    style: {
      transform: h && isLink ? 'translateX(4px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-out)'
    }
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/content/CheckList.jsx
try { (() => {
function CheckList({
  items = [],
  dark = false,
  icon = 'check'
}) {
  return /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, items.map((it, i) => {
    const t = typeof it === 'string' ? {
      title: it
    } : it;
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        display: 'flex',
        gap: 14,
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 'none',
        width: 26,
        height: 26,
        borderRadius: 'var(--radius-sm)',
        background: dark ? 'rgba(221,187,77,.16)' : 'var(--surface-tint)',
        color: dark ? 'var(--brand-accent)' : 'var(--brand-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 1
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: icon,
      size: 16
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '400 16px/1.6 var(--font-body)',
        color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-body)'
      }
    }, t.title && /*#__PURE__*/React.createElement("strong", {
      style: {
        fontWeight: 700,
        color: dark ? '#fff' : 'var(--text-strong)'
      }
    }, t.title, t.text ? ': ' : ''), t.text));
  }));
}
Object.assign(__ds_scope, { CheckList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/CheckList.jsx", error: String((e && e.message) || e) }); }

// components/content/Eyebrow.jsx
try { (() => {
function Eyebrow({
  children,
  tone = 'accent',
  rule = true,
  align = 'left',
  style = {}
}) {
  const c = {
    accent: 'var(--brand-accent)',
    primary: 'var(--brand-primary)',
    light: '#fff',
    warm: 'var(--brand-warm)'
  }[tone] || tone;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      gap: 12,
      font: '600 var(--fs-eyebrow)/1.2 var(--font-display)',
      letterSpacing: 'var(--ls-eyebrow)',
      textTransform: 'uppercase',
      color: c,
      ...style
    }
  }, rule && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 2,
      background: c,
      flex: 'none'
    }
  }), children, rule && align === 'center' && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 2,
      background: c,
      flex: 'none'
    }
  }));
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/content/FAQItem.jsx
try { (() => {
function FAQItem({
  question,
  answer,
  defaultOpen = false,
  dark = false
}) {
  const [o, setO] = React.useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid ' + (dark ? 'var(--border-dark)' : 'var(--border-subtle)')
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setO(!o),
    "aria-expanded": o,
    style: {
      all: 'unset',
      boxSizing: 'border-box',
      cursor: 'pointer',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 20,
      padding: '24px 0',
      font: '700 18px/1.35 var(--font-display)',
      color: dark ? '#fff' : 'var(--text-strong)'
    }
  }, question, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      width: 36,
      height: 36,
      borderRadius: 'var(--radius-sm)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: o ? 'var(--brand-primary)' : 'transparent',
      border: '1.5px solid ' + (o ? 'var(--brand-primary)' : dark ? 'rgba(255,255,255,.3)' : 'var(--border-strong)'),
      color: o ? '#fff' : dark ? '#fff' : 'var(--brand-primary)',
      transition: 'all var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: o ? 'minus' : 'plus',
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateRows: o ? '1fr' : '0fr',
      transition: 'grid-template-rows var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      padding: '0 56px 24px 0',
      font: '400 16px/1.65 var(--font-body)',
      color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-muted)'
    }
  }, answer))));
}
Object.assign(__ds_scope, { FAQItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/FAQItem.jsx", error: String((e && e.message) || e) }); }

// components/content/ProcessStep.jsx
try { (() => {
function ProcessStep({
  number,
  title,
  text,
  dark = false,
  last = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      position: 'relative',
      paddingTop: 24,
      borderTop: '2px solid ' + (dark ? 'rgba(255,255,255,.14)' : 'var(--border-subtle)')
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -2,
      left: 0,
      width: 48,
      height: 2,
      background: 'var(--brand-accent)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 56px/1 var(--font-display)',
      color: dark ? 'rgba(255,255,255,.22)' : 'var(--pm-navy-100)',
      letterSpacing: '-.02em'
    }
  }, number), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: '800 20px/1.2 var(--font-display)',
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: dark ? '#fff' : 'var(--text-strong)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '400 16px/1.6 var(--font-body)',
      color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-muted)'
    }
  }, text));
}
Object.assign(__ds_scope, { ProcessStep });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ProcessStep.jsx", error: String((e && e.message) || e) }); }

// components/content/SectionHeading.jsx
try { (() => {
function SectionHeading({
  eyebrow,
  title,
  highlight,
  intro,
  align = 'left',
  dark = false,
  level = 2,
  size = 'h2',
  maxWidth = 760,
  style = {}
}) {
  const Tag = 'h' + level;
  const fs = size === 'hero' ? 'var(--fs-hero)' : size === 'h1' ? 'var(--fs-h1)' : 'var(--fs-h2)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align,
      maxWidth,
      marginInline: align === 'center' ? 'auto' : undefined,
      ...style
    }
  }, eyebrow && /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    align: align,
    tone: dark ? 'accent' : 'accent'
  }, eyebrow), /*#__PURE__*/React.createElement(Tag, {
    style: {
      margin: 0,
      font: (level === 1 ? 'var(--fw-hero) ' : 'var(--fw-heading) ') + fs + '/var(--lh-heading) var(--font-display)',
      letterSpacing: level === 1 ? 'var(--ls-hero)' : 'var(--ls-display)',
      textTransform: 'uppercase',
      color: dark ? '#fff' : 'var(--text-strong)',
      textWrap: 'balance'
    }
  }, title, highlight && /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 'inherit',
      color: 'var(--text-highlight)',
      textDecoration: size === 'hero' ? 'underline' : 'none',
      textDecorationThickness: '.07em',
      textUnderlineOffset: '.12em'
    }
  }, highlight))), intro && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '400 var(--fs-lead)/1.55 var(--font-body)',
      color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-muted)',
      textWrap: 'pretty'
    }
  }, intro));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/content/CtaBand.jsx
try { (() => {
function CtaBand({
  eyebrow = 'Jetzt starten',
  title,
  highlight,
  intro,
  primaryLabel = 'Kostenloses Angebot',
  secondaryLabel,
  onPrimary,
  onSecondary,
  image
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      background: image ? 'linear-gradient(rgba(3,11,23,.86),rgba(3,11,23,.86)),url(' + image + ') center/cover' : 'var(--surface-dark)',
      padding: 'var(--section-y) var(--gutter)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-narrow)',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 36
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SectionHeading, {
    dark: true,
    align: "center",
    eyebrow: eyebrow,
    title: title,
    highlight: highlight,
    intro: intro
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "accent",
    size: "lg",
    icon: "arrow-right",
    onClick: onPrimary
  }, primaryLabel), secondaryLabel && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "outline-light",
    size: "lg",
    iconLeft: "phone",
    onClick: onSecondary
  }, secondaryLabel))));
}
Object.assign(__ds_scope, { CtaBand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/CtaBand.jsx", error: String((e && e.message) || e) }); }

// components/content/ServiceCard.jsx
try { (() => {
function ServiceCard({
  image,
  title,
  text,
  linkLabel = 'Mehr erfahren',
  href = '#',
  icon,
  status,
  variant = 'stacked',
  onClick
}) {
  const [h, setH] = React.useState(false);
  if (variant === 'overlay') return /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      position: 'relative',
      display: 'block',
      aspectRatio: '4/5',
      borderRadius: 'var(--radius-card)',
      overflow: 'hidden',
      textDecoration: 'none',
      color: '#fff',
      background: 'var(--surface-dark)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'url(' + image + ') center/cover',
      transform: h ? 'scale(1.05)' : 'scale(1)',
      transition: 'transform var(--dur-slow) var(--ease-out)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--overlay-card)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: 'var(--card-pad)',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, status && /*#__PURE__*/React.createElement("span", {
    style: {
      alignSelf: 'flex-start',
      font: '600 11px var(--font-display)',
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      padding: '5px 9px',
      borderRadius: 2,
      background: 'rgba(255,255,255,.14)',
      backdropFilter: 'blur(6px)'
    }
  }, status), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: '700 var(--fs-h3)/1.25 var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '.02em'
    }
  }, title), text && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '400 15px/1.5 var(--font-body)',
      color: 'var(--text-on-dark-muted)'
    }
  }, text), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 4,
      font: '700 12px var(--font-display)',
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: 'var(--brand-accent)'
    }
  }, linkLabel, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 16,
    style: {
      transform: h ? 'translateX(4px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-out)'
    }
  }))));
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-card)',
      overflow: 'hidden',
      textDecoration: 'none',
      color: 'inherit',
      boxShadow: h ? 'var(--shadow-md)' : 'var(--shadow-xs)',
      transform: h ? 'translateY(-4px)' : 'none',
      transition: 'box-shadow var(--dur-base) var(--ease-out),transform var(--dur-base) var(--ease-out)'
    }
  }, image && /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '16/10',
      overflow: 'hidden',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'url(' + image + ') center/cover',
      transform: h ? 'scale(1.05)' : 'scale(1)',
      transition: 'transform var(--dur-slow) var(--ease-out)'
    }
  }), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 20,
      bottom: -22,
      width: 48,
      height: 48,
      borderRadius: 'var(--radius-sm)',
      background: 'var(--brand-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 24
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--card-pad)',
      paddingTop: icon ? 40 : 'var(--card-pad)',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      flex: 1
    }
  }, status && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 11px var(--font-display)',
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--pm-amber-600)'
    }
  }, status), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: '700 var(--fs-h3)/1.25 var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '.02em',
      color: 'var(--text-strong)'
    }
  }, title), text && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '400 16px/1.6 var(--font-body)',
      color: 'var(--text-muted)',
      flex: 1
    }
  }, text), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 6,
      font: '700 12px var(--font-display)',
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: h ? 'var(--brand-accent)' : 'var(--brand-primary)',
      transition: 'color var(--dur-fast)'
    }
  }, linkLabel, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 16,
    style: {
      transform: h ? 'translateX(4px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-out)'
    }
  }))));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/content/ServiceChip.jsx
try { (() => {
function ServiceChip({
  children,
  icon,
  dark = true,
  active = false,
  onClick
}) {
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 36,
      padding: '0 14px',
      borderRadius: 'var(--radius-xs)',
      font: '600 12px var(--font-display)',
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      cursor: onClick ? 'pointer' : 'default',
      color: active ? 'var(--pm-navy-950)' : dark ? '#fff' : 'var(--text-strong)',
      background: active ? 'var(--brand-accent)' : dark ? 'rgba(255,255,255,.08)' : 'var(--surface-tint)',
      border: '1px solid ' + (active ? 'var(--brand-accent)' : dark ? 'rgba(255,255,255,.18)' : 'var(--border-subtle)'),
      backdropFilter: dark ? 'blur(8px)' : undefined
    }
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 15,
    color: active ? 'currentColor' : 'var(--brand-accent)'
  }), children);
}
Object.assign(__ds_scope, { ServiceChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ServiceChip.jsx", error: String((e && e.message) || e) }); }

// components/content/TestimonialCard.jsx
try { (() => {
function TestimonialCard({
  quote,
  name,
  meta,
  rating = 5
}) {
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      padding: 'var(--card-pad)',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-card)',
      boxShadow: 'var(--shadow-xs)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 3
    }
  }, Array.from({
    length: 5
  }).map((_, i) => /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    key: i,
    name: "star",
    size: 16,
    color: i < rating ? 'var(--brand-warm)' : 'var(--pm-steel-200)'
  }))), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      font: '400 17px/1.6 var(--font-body)',
      color: 'var(--text-body)'
    }
  }, "\u201E", quote, "\u201C"), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      marginTop: 'auto',
      paddingTop: 16,
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 14px var(--font-display)',
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      color: 'var(--text-strong)'
    }
  }, name), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 14px var(--font-body)',
      color: 'var(--text-subtle)'
    }
  }, meta)));
}
Object.assign(__ds_scope, { TestimonialCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/TestimonialCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/SelectField.jsx
try { (() => {
function SelectField({
  label,
  options = [],
  value,
  onChange,
  required,
  placeholder = 'Bitte wählen',
  name,
  dark = false
}) {
  const [f, setF] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 13px var(--font-display)',
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: dark ? '#fff' : 'var(--text-strong)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--brand-accent)'
    }
  }, " *")), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("select", {
    name: name,
    value: value,
    defaultValue: value === undefined ? '' : undefined,
    onChange: onChange,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      appearance: 'none',
      width: '100%',
      height: 52,
      padding: '0 44px 0 16px',
      font: '400 16px var(--font-body)',
      color: dark ? '#fff' : 'var(--text-strong)',
      background: dark ? 'rgba(255,255,255,.05)' : 'var(--surface-card)',
      border: '1.5px solid ' + (f ? 'var(--border-focus)' : dark ? 'rgba(255,255,255,.18)' : 'var(--border-strong)'),
      borderRadius: 'var(--radius-input)',
      outline: 'none',
      boxShadow: f ? '0 0 0 3px rgba(221,187,77,.18)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o))), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 18,
    color: "var(--brand-primary)",
    style: {
      position: 'absolute',
      right: 16,
      top: 17,
      pointerEvents: 'none'
    }
  })));
}
Object.assign(__ds_scope, { SelectField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SelectField.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
function TextField({
  label,
  placeholder,
  type = 'text',
  multiline = false,
  rows = 5,
  required,
  error,
  hint,
  value,
  onChange,
  name,
  dark = false
}) {
  const [f, setF] = React.useState(false);
  const Tag = multiline ? 'textarea' : 'input';
  const bd = error ? 'var(--pm-danger)' : f ? 'var(--border-focus)' : dark ? 'rgba(255,255,255,.18)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 13px var(--font-display)',
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: dark ? '#fff' : 'var(--text-strong)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--brand-accent)'
    }
  }, " *")), /*#__PURE__*/React.createElement(Tag, {
    name: name,
    type: multiline ? undefined : type,
    rows: multiline ? rows : undefined,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      font: '400 16px/1.5 var(--font-body)',
      color: dark ? '#fff' : 'var(--text-strong)',
      background: dark ? 'rgba(255,255,255,.05)' : 'var(--surface-card)',
      border: '1.5px solid ' + bd,
      borderRadius: 'var(--radius-input)',
      padding: multiline ? '14px 16px' : '0 16px',
      height: multiline ? undefined : 52,
      outline: 'none',
      resize: 'vertical',
      boxShadow: f && !error ? '0 0 0 3px rgba(221,187,77,.18)' : 'none',
      transition: 'border-color var(--dur-fast),box-shadow var(--dur-fast)'
    }
  }), (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 13px var(--font-body)',
      color: error ? 'var(--pm-danger)' : 'var(--text-subtle)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteFooter.jsx
try { (() => {
function SiteFooter({
  logoSrc,
  text = 'Transport, Lagerung und Service aus einer Hand – für Privat- und Geschäftskunden in der ganzen Pfalz.',
  columns = [],
  contactTitle = 'Kontakt',
  address = 'Musterstraße 12, 67433 Neustadt an der Weinstraße',
  phone = '06321 000 000',
  email = 'kontakt@pfalz-loadout.de',
  mapSrc,
  socials = ['facebook', 'instagram', 'youtube'],
  company = 'Pfalz Multiservice',
  legal = ['Impressum', 'Datenschutz', 'AGB'],
  credit,
  year = 2026,
  onNavigate
}) {
  const h = {
    margin: '0 0 30px',
    font: '700 20px/1.3 var(--font-display)',
    textTransform: 'uppercase',
    color: '#fff',
    textAlign: 'center'
  };
  const gold = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    font: '500 16px/1.1 var(--font-body)',
    color: 'var(--brand-accent)',
    textDecoration: 'none'
  };
  const go = (e, k) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(k.id || k.label || k);
    }
  };
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--pm-black)',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1170,
      margin: '0 auto',
      padding: '72px var(--gutter) 64px',
      display: 'grid',
      gridTemplateColumns: 'repeat(' + (columns.length + 2) + ',minmax(0,1fr))',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28,
      paddingTop: 14
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: company,
    style: {
      height: 120,
      maxWidth: '100%',
      objectFit: 'contain',
      alignSelf: 'flex-start'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '500 16px/1.6 var(--font-body)',
      color: '#fff',
      maxWidth: 280
    }
  }, text), socials.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      paddingLeft: 26
    }
  }, socials.map(s => /*#__PURE__*/React.createElement("a", {
    key: s,
    href: "#",
    "aria-label": s,
    style: {
      display: 'flex',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: s,
    size: 20
  }))))), columns.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.title
  }, /*#__PURE__*/React.createElement("h4", {
    style: h
  }, c.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 32
    }
  }, c.links.map(k => /*#__PURE__*/React.createElement("a", {
    key: k.label || k,
    href: "#",
    onClick: e => go(e, k),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      font: '400 16px/1.1 var(--font-body)',
      color: '#fff',
      textDecoration: 'none'
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--brand-accent)',
    onMouseLeave: e => e.currentTarget.style.color = '#fff'
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "circle-arrow-right",
    size: 16,
    color: "var(--brand-accent)"
  }), k.label || k))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: h
  }, contactTitle), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28,
      paddingLeft: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: gold
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "map-pin",
    size: 16
  }), address), mapSrc && /*#__PURE__*/React.createElement("img", {
    src: mapSrc,
    alt: "",
    style: {
      width: '100%',
      aspectRatio: '377/220',
      objectFit: 'cover',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("a", {
    href: 'tel:' + phone.replace(/\s/g, ''),
    style: gold
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "phone",
    size: 16
  }), phone), /*#__PURE__*/React.createElement("a", {
    href: 'mailto:' + email,
    style: gold
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "mail",
    size: 16
  }), email)))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1170,
      margin: '0 auto',
      padding: '0 var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--pm-ink-600)',
      padding: '30px 14px 26px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 20,
      flexWrap: 'wrap',
      font: '500 14px/1.6 var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", null, "Copyright \xA9 2021 - ", year, ", ", company, ". Alle Rechte vorbehalten"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 4,
      flexWrap: 'wrap'
    }
  }, legal.map((x, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: x
  }, i > 0 && /*#__PURE__*/React.createElement("span", null, "|"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => go(e, x),
    style: {
      color: 'var(--brand-accent)',
      textDecoration: 'none'
    }
  }, x))))), credit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, credit.prefix || 'Powered by', " ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--brand-accent)',
      fontWeight: 600
    }
  }, credit.name)))));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteHeader.jsx
try { (() => {
function NavItem({
  item,
  dark,
  active,
  onNavigate
}) {
  const [o, setO] = React.useState(false);
  const has = item.children && item.children.length;
  const c = '#fff';
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setO(true),
    onMouseLeave: () => setO(false),
    style: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: item.href || '#',
    onClick: e => {
      if (onNavigate) {
        e.preventDefault();
        onNavigate(item.id || item.label);
      }
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      height: '100%',
      whiteSpace: 'nowrap',
      font: '500 14px var(--font-display)',
      textTransform: 'uppercase',
      color: o || active ? 'var(--brand-accent)' : c,
      textDecoration: 'none',
      position: 'relative',
      transition: 'color var(--dur-fast)'
    }
  }, item.label, has && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 15,
    style: {
      transform: o ? 'rotate(180deg)' : 'none',
      transition: 'transform var(--dur-base)'
    }
  }), active && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 22,
      height: 2,
      background: 'var(--brand-accent)'
    }
  })), has && o && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: -20,
      minWidth: 260,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-card)',
      boxShadow: 'var(--shadow-lg)',
      padding: '10px 0',
      borderTop: '3px solid var(--brand-accent)',
      zIndex: 20
    }
  }, item.children.map(ch => /*#__PURE__*/React.createElement("a", {
    key: ch.label,
    href: ch.href || '#',
    onClick: e => {
      if (onNavigate) {
        e.preventDefault();
        onNavigate(ch.id || ch.label);
      }
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '11px 20px',
      font: '500 15px var(--font-body)',
      color: 'var(--text-body)',
      textDecoration: 'none'
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = 'var(--surface-alt)';
      e.currentTarget.style.color = 'var(--brand-primary)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = 'transparent';
      e.currentTarget.style.color = 'var(--text-body)';
    }
  }, ch.icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: ch.icon,
    size: 18,
    color: "var(--brand-accent)"
  }), ch.label))));
}
function SiteHeader({
  logoSrc,
  logoDarkSrc,
  nav = [],
  active,
  phone = '06321 000 000',
  ctaLabel = 'Angebot anfragen',
  onCta,
  onNavigate,
  transparent = false,
  sticky = false
}) {
  const dark = true;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: sticky ? 'sticky' : 'relative',
      top: 0,
      zIndex: 30,
      background: transparent ? 'rgba(0,0,0,.35)' : 'var(--pm-black)',
      backdropFilter: transparent ? 'var(--blur-header)' : 'none',
      borderBottom: '1px solid var(--border-dark)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--gutter)',
      height: 'var(--header-h)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      if (onNavigate) {
        e.preventDefault();
        onNavigate('home');
      }
    },
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoDarkSrc || logoSrc,
    alt: "Pfalz Multiservice",
    style: {
      height: 48,
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 30,
      height: '100%'
    }
  }, nav.map(n => /*#__PURE__*/React.createElement(NavItem, {
    key: n.label,
    item: n,
    dark: dark,
    active: active === (n.id || n.label),
    onNavigate: onNavigate
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 22
    }
  }, phone && /*#__PURE__*/React.createElement("a", {
    href: 'tel:' + phone.replace(/\s/g, ''),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-sm)',
      border: '1.5px solid ' + (dark ? 'rgba(255,255,255,.3)' : 'var(--border-strong)'),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: dark ? 'var(--brand-accent)' : 'var(--brand-primary)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "phone",
    size: 17
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 11px var(--font-display)',
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-subtle)'
    }
  }, "Rufen Sie an"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 15px var(--font-display)',
      color: dark ? '#fff' : 'var(--text-strong)'
    }
  }, phone))), ctaLabel && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    variant: dark ? 'accent' : 'primary',
    onClick: onCta
  }, ctaLabel))));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopBar.jsx
try { (() => {
function TopBar({
  phone = '06321 000 000',
  email = 'kontakt@pfalz-loadout.de',
  hours = 'Mo–Fr 7–18 Uhr',
  socials = ['facebook', 'instagram', 'youtube']
}) {
  const item = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: 'var(--text-on-dark-muted)',
    textDecoration: 'none',
    font: '500 13px var(--font-body)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-darker)',
      borderBottom: '1px solid var(--border-dark)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--gutter)',
      height: 'var(--topbar-h)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, socials.map(s => /*#__PURE__*/React.createElement("a", {
    key: s,
    href: "#",
    "aria-label": s,
    style: {
      ...item,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: s,
    size: 15
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      flexWrap: 'wrap',
      justifyContent: 'flex-end'
    }
  }, hours && /*#__PURE__*/React.createElement("span", {
    style: item
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "clock",
    size: 14,
    color: "var(--brand-accent)"
  }), hours), /*#__PURE__*/React.createElement("a", {
    href: 'mailto:' + email,
    style: item
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "mail",
    size: 14,
    color: "var(--brand-accent)"
  }), email), /*#__PURE__*/React.createElement("a", {
    href: 'tel:' + phone.replace(/\s/g, ''),
    style: {
      ...item,
      color: '#fff',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "phone",
    size: 14,
    color: "var(--brand-accent)"
  }), phone))));
}
Object.assign(__ds_scope, { TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Contact.jsx
try { (() => {
const {
  Button: CB,
  TextField,
  SelectField,
  Icon: CI,
  SectionHeading: CSH
} = window.PfalzMultiserviceDesignSystem_8eb026;
function Contact({
  go,
  initial
}) {
  const [sent, setSent] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [err, setErr] = React.useState('');
  const [ok, setOk] = React.useState(false);
  const submit = () => {
    if (!/.+@.+\..+/.test(email)) {
      setErr('Bitte geben Sie eine gültige E-Mail-Adresse an.');
      return;
    }
    setErr('');
    setSent(true);
  };
  const row = (i, l, v, href) => /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'flex-start',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      width: 44,
      height: 44,
      background: 'var(--brand-accent)',
      color: 'var(--text-on-accent)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(CI, {
    name: i,
    size: 20
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 12px var(--font-display)',
      letterSpacing: '.14em',
      textTransform: 'uppercase',
      color: 'var(--text-subtle)'
    }
  }, l), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 17px/1.45 var(--font-display)',
      color: href ? 'var(--brand-accent)' : 'var(--text-strong)'
    }
  }, v)));
  return /*#__PURE__*/React.createElement(Shell, {
    page: "kontakt",
    go: go
  }, /*#__PURE__*/React.createElement(PageHero, {
    go: go,
    eyebrow: "Kontakt",
    title: "Lassen Sie uns \xFCber Ihr",
    highlight: "Vorhaben sprechen",
    intro: "Schildern Sie uns kurz Ihr Anliegen. Wir melden uns zeitnah mit einem passenden L\xF6sungsvorschlag.",
    image: IMG + 'lagergang.png',
    crumbs: ['Kontakt']
  }), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.5fr',
      gap: 72,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(CSH, {
    eyebrow: "Schnell erreichbar",
    title: "Direkter",
    highlight: "Kontakt"
  }), row('phone', 'Telefon', CONTACT.phone, 'tel:+491605086983'), row('message-circle', 'WhatsApp', 'Nachricht schreiben', CONTACT.whatsapp), row('mail', 'E-Mail', CONTACT.email, 'mailto:' + CONTACT.email), row('map-pin', 'Standort', CONTACT.city), /*#__PURE__*/React.createElement(CB, {
    variant: "outline-light",
    iconLeft: "message-circle",
    href: CONTACT.whatsapp
  }, "WhatsApp-Chat starten")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-card)',
      padding: 40
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 18,
      padding: '40px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 56,
      background: 'var(--brand-accent)',
      color: 'var(--text-on-accent)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(CI, {
    name: "check",
    size: 28
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: '800 32px/1.2 var(--font-display)',
      letterSpacing: 'var(--ls-display)',
      textTransform: 'uppercase',
      color: 'var(--text-strong)'
    }
  }, "Vielen ", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 'inherit',
      color: 'var(--text-highlight)'
    }
  }, "Dank")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--type-body)',
      color: 'var(--text-muted)'
    }
  }, "Wir melden uns zeitnah mit einem passenden L\xF6sungsvorschlag."), /*#__PURE__*/React.createElement(CB, {
    variant: "outline",
    onClick: () => go('home')
  }, "Zur Startseite")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "Name",
    required: true
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Unternehmen"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "E-Mail",
    required: true,
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    error: err
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Telefon"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1/-1'
    }
  }, /*#__PURE__*/React.createElement(SelectField, {
    label: "Leistungsbereich",
    value: initial || 'Allgemeine Anfrage',
    options: ['Allgemeine Anfrage', ...SERVICES.map(s => s.title)]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1/-1'
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "Nachricht",
    required: true,
    multiline: true
  })), /*#__PURE__*/React.createElement("label", {
    style: {
      gridColumn: '1/-1',
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      cursor: 'pointer',
      font: '400 14px/1.6 var(--font-body)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setOk(!ok),
    style: {
      flex: 'none',
      width: 20,
      height: 20,
      marginTop: 2,
      border: '2px solid ' + (ok ? 'var(--brand-accent)' : 'var(--border-strong)'),
      background: ok ? 'var(--brand-accent)' : 'transparent',
      color: 'var(--text-on-accent)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, ok && /*#__PURE__*/React.createElement(CI, {
    name: "check",
    size: 14
  })), /*#__PURE__*/React.createElement("span", {
    onClick: () => setOk(!ok)
  }, "Ich stimme zu, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden. Details in der ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      go('datenschutz');
    },
    style: {
      color: 'var(--brand-accent)'
    }
  }, "Datenschutzerkl\xE4rung"), ".")), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1/-1',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 20,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 13px var(--font-body)',
      color: 'var(--text-subtle)'
    }
  }, "* Pflichtfelder"), /*#__PURE__*/React.createElement(CB, {
    onClick: submit,
    disabled: !ok
  }, "Anfrage senden")))))));
}
Object.assign(window, {
  Contact
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Button,
  Icon,
  SectionHeading,
  ServiceCard,
  ServiceChip,
  CheckList,
  ProcessStep,
  TestimonialCard,
  CtaBand,
  Eyebrow
} = window.PfalzMultiserviceDesignSystem_8eb026;
function Hero({
  go
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      minHeight: 760,
      background: 'var(--overlay-hero),url(' + IMG + 'transporter-halle.png) center/cover',
      display: 'flex',
      alignItems: 'center',
      paddingTop: 'var(--header-h)'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1050,
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    dark: true,
    level: 1,
    size: "hero",
    eyebrow: "Pfalz Multiservice \xB7 Worms",
    title: "Viele Leistungen.",
    highlight: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("br", null), "Ein Ansprechpartner."),
    maxWidth: 1050
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    onClick: () => go('kontakt')
  }, "Unverbindlich anfragen"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline-light",
    size: "lg",
    iconLeft: "message-circle",
    href: CONTACT.whatsapp
  }, "Per WhatsApp schreiben")))));
}
function TrustStrip() {
  const ic = ['layers', 'file-check', 'map-pin'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Container, {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 40,
      padding: '36px var(--gutter)'
    }
  }, USPS.map((u, i) => /*#__PURE__*/React.createElement("div", {
    key: u.title,
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic[i],
    size: 28,
    color: "var(--brand-accent)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 16px/1.3 var(--font-display)',
      textTransform: 'uppercase',
      color: '#fff'
    }
  }, u.title), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 15px/1.6 var(--font-body)',
      color: 'var(--text-body)'
    }
  }, u.lines ? /*#__PURE__*/React.createElement(React.Fragment, null, u.lines[0], /*#__PURE__*/React.createElement("br", null), u.lines[1]) : u.text))))));
}
function Services({
  go
}) {
  return /*#__PURE__*/React.createElement(Section, {
    id: "leistungen"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "center",
    eyebrow: "Kompetenzbereiche",
    title: "Unsere",
    highlight: "Leistungen",
    intro: "Kompetenzbereiche, einzeln buchbar oder als kombinierte L\xF6sung.",
    style: {
      marginBottom: 56
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
      gap: 'var(--grid-gap)'
    }
  }, (() => {
    const m = SERVICES.filter(s => !s.side);
    const i = m.findIndex(s => s.id === 'ecommerce'),
      j = m.findIndex(s => s.id === 'reselling');
    [m[i], m[j]] = [m[j], m[i]];
    const k = m.findIndex(s => s.id === 'clearance'),
      l = m.findIndex(s => s.id === 'web');
    [m[k], m[l]] = [m[l], m[k]];
    return m;
  })().map(s => /*#__PURE__*/React.createElement(ServiceCard, {
    key: s.id,
    image: s.image,
    title: s.title,
    text: s.short,
    linkLabel: "Details",
    onClick: e => {
      e.preventDefault();
      go(s.id);
    }
  }))), SERVICES.filter(s => s.side).map(s => /*#__PURE__*/React.createElement("a", {
    key: s.id,
    href: "#",
    onClick: e => {
      e.preventDefault();
      go(s.id);
    },
    style: {
      marginTop: 'var(--grid-gap)',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-card)',
      overflow: 'hidden',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 240,
      background: 'url(' + s.image + ') center/cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '36px 40px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Erg\xE4nzende Leistung"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: '700 var(--fs-h3)/1.25 var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '.02em',
      color: 'var(--text-strong)'
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '400 15px/1.6 var(--font-body)',
      color: 'var(--text-body)'
    }
  }, s.short, ". KNX-Programmierung, Szenen und Visualisierung f\xFCr Wohn- und Gewerbeobjekte."), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      font: '600 13px var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '.08em',
      color: 'var(--brand-accent)'
    }
  }, "Details", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 16
  }))))));
}
function About({
  go
}) {
  return /*#__PURE__*/React.createElement(Section, {
    id: "ueber",
    bg: "var(--surface-alt)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 72,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Inhabergef\xFChrt \xB7 Worms",
    title: "\xDCber",
    highlight: "uns"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--type-body)',
      color: 'var(--text-body)'
    }
  }, "Pfalz Loadout ist ein inhabergef\xFChrtes Dienstleistungsunternehmen mit Sitz in Worms, gewachsen aus dem E-Commerce. Die Erfahrung aus Handel, Logistik und digitalen Prozessen bildet heute die Grundlage f\xFCr ein breites Dienstleistungsportfolio."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--type-body)',
      color: 'var(--text-body)'
    }
  }, "Wir denken l\xF6sungsorientiert, arbeiten strukturiert und legen Wert auf langfristige Gesch\xE4ftsbeziehungen."), /*#__PURE__*/React.createElement(CheckList, {
    items: USPS
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 15px var(--font-body)',
      color: 'var(--text-body)'
    }
  }, "Mehrere Bereiche kombinieren? Sprechen Sie uns an."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => go('kontakt')
  }, "Unverbindlich anfragen"))), /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '4/3.4',
      borderRadius: 'var(--radius-card)',
      background: 'url(' + IMG + 'lager-ware.png) center/cover'
    }
  })));
}
function Process() {
  return /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "center",
    eyebrow: "Unser Ablauf",
    title: "Jedes Projekt folgt einem klaren",
    highlight: "Ablauf",
    style: {
      marginBottom: 64
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 'var(--grid-gap)'
    }
  }, STEPS.map(([n, t, x]) => /*#__PURE__*/React.createElement(ProcessStep, {
    key: n,
    dark: true,
    number: n,
    title: t,
    text: x
  }))));
}
function Region() {
  return /*#__PURE__*/React.createElement(Section, {
    id: "region",
    bg: "var(--surface-alt)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr 1fr',
      gap: 72,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '16/11',
      borderRadius: 'var(--radius-card)',
      background: 'url(' + IMG + 'pfalz-landschaft.png) center/cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Region Worms",
    title: "Unser",
    highlight: "Einzugsgebiet",
    intro: "Worms, Frankenthal, Ludwigshafen, Mannheim, Alzey, Gr\xFCnstadt, Bensheim und Umgebung. Digitale Leistungen erbringen wir standortunabh\xE4ngig im gesamten deutschsprachigen Raum."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, AREA.map(o => /*#__PURE__*/React.createElement(ServiceChip, {
    key: o,
    dark: false,
    icon: "map-pin"
  }, o))))));
}
function References() {
  return /*#__PURE__*/React.createElement(Section, {
    id: "referenzen"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "center",
    eyebrow: "Kundenstimmen",
    title: "Unsere",
    highlight: "Referenzen",
    intro: "Was Kunden \xFCber die Zusammenarbeit mit uns sagen.",
    style: {
      marginBottom: 32
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14,
      marginBottom: 48,
      font: '500 15px var(--font-body)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 28px var(--font-display)',
      color: '#fff'
    }
  }, "[x,x]"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 2
    }
  }, [0, 1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement(Icon, {
    key: i,
    name: "star",
    size: 18,
    color: "var(--brand-accent)"
  }))), /*#__PURE__*/React.createElement("span", null, "aus [Anzahl] Google-Bewertungen"), /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    icon: "arrow-right"
  }, "Bewertungen auf Google ansehen")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--grid-gap)'
    }
  }, REVIEWS.map((r, i) => /*#__PURE__*/React.createElement(TestimonialCard, _extends({
    key: i
  }, r)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--grid-gap)',
      marginTop: 'var(--grid-gap)'
    }
  }, PROJECTS.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.title,
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-card)',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '3/2',
      border: '1px dashed var(--border-strong)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: '500 13px var(--font-body)',
      color: 'var(--text-subtle)'
    }
  }, p.ph), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: '700 18px/1.3 var(--font-display)',
      textTransform: 'uppercase',
      color: '#fff'
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '400 15px/1.6 var(--font-body)',
      color: 'var(--text-body)'
    }
  }, p.text)))));
}
function Home({
  go
}) {
  return /*#__PURE__*/React.createElement(Shell, {
    page: "home",
    go: go,
    heroOverlay: true
  }, /*#__PURE__*/React.createElement(Hero, {
    go: go
  }), /*#__PURE__*/React.createElement(TrustStrip, null), /*#__PURE__*/React.createElement(Services, {
    go: go
  }), /*#__PURE__*/React.createElement(About, {
    go: go
  }), /*#__PURE__*/React.createElement(Process, null), /*#__PURE__*/React.createElement(Region, null), SHOW_REFERENCES && /*#__PURE__*/React.createElement(References, null), /*#__PURE__*/React.createElement(CtaBand, {
    image: IMG + 'lagerraum-hoch.png',
    title: "Lassen Sie uns \xFCber Ihr",
    highlight: "Vorhaben sprechen",
    intro: /*#__PURE__*/React.createElement(React.Fragment, null, "Schildern Sie uns kurz Ihr Anliegen.", /*#__PURE__*/React.createElement("br", null), "Wir melden uns zeitnah mit einem passenden L\xF6sungsvorschlag."),
    primaryLabel: "Unverbindlich anfragen",
    secondaryLabel: CONTACT.phone,
    onPrimary: () => go('kontakt')
  }));
}
const SHOW_REFERENCES = false;
Object.assign(window, {
  Home
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Layout.jsx
try { (() => {
const {
  TopBar,
  SiteHeader,
  SiteFooter
} = window.PfalzMultiserviceDesignSystem_8eb026;
function Container({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--gutter)',
      ...style
    }
  }, children);
}
function Section({
  children,
  bg = 'var(--surface-page)',
  style,
  id
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    style: {
      background: bg,
      padding: 'var(--section-y) 0',
      ...style
    }
  }, /*#__PURE__*/React.createElement(Container, null, children));
}
function Shell({
  page,
  go,
  children,
  heroOverlay
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: heroOverlay ? 'absolute' : 'relative',
      left: 0,
      right: 0,
      zIndex: 30
    }
  }, /*#__PURE__*/React.createElement(SiteHeader, {
    logoSrc: "../../assets/logo.png",
    logoDarkSrc: "../../assets/logo-white.png",
    nav: NAV,
    active: page,
    transparent: heroOverlay,
    onNavigate: go,
    phone: null,
    ctaLabel: null
  })), children, /*#__PURE__*/React.createElement(SiteFooter, {
    logoSrc: "../../assets/logo-white.png",
    columns: [],
    text: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), "Pfalz Multiservice b\xFCndelt Dienstleistungen f\xFCr Unternehmen und Privatkunden in der Region Worms."),
    address: CONTACT.city,
    phone: CONTACT.phone,
    email: CONTACT.email,
    legal: ['Impressum', 'Datenschutz'],
    socials: [],
    company: "Pfalz Loadout",
    onNavigate: go
  }));
}
Object.assign(window, {
  Container,
  Section,
  Shell
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Layout.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Legal.jsx
try { (() => {
const {
  SectionHeading: LSH
} = window.PfalzMultiserviceDesignSystem_8eb026;
function Impressum({
  go
}) {
  const h = {
    margin: '0 0 12px',
    font: '700 18px/1.3 var(--font-display)',
    textTransform: 'uppercase',
    color: '#fff'
  };
  const p = {
    margin: 0,
    font: 'var(--type-body)',
    color: 'var(--text-body)'
  };
  const a = {
    color: 'var(--brand-accent)',
    textDecoration: 'none'
  };
  return /*#__PURE__*/React.createElement(Shell, {
    page: "impressum",
    go: go
  }, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      display: 'flex',
      flexDirection: 'column',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement(LSH, {
    level: 1,
    size: "h1",
    eyebrow: "Rechtliches",
    title: "",
    highlight: "Impressum"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: h
  }, "Angaben gem\xE4\xDF \xA7 5 TMG"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Pfalz Loadout", /*#__PURE__*/React.createElement("br", null), "Wormser Landstra\xDFe 117, 67551 Worms, Deutschland")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: h
  }, "Vertreten durch:"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Jasmin Beer")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: h
  }, "Kontakt:"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Telefon: ", /*#__PURE__*/React.createElement("a", {
    href: "tel:+491605086983",
    style: a
  }, "+49 160 5086983"), /*#__PURE__*/React.createElement("br", null), "E-Mail: ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:kontakt@pfalz-loadout.de",
    style: a
  }, "kontakt@pfalz-loadout.de"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: h
  }, "Umsatzsteuer-ID:"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Umsatzsteuer-Identifikationsnummer(n): DE444410908")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Kleinunternehmer gem\xE4\xDF \xA7 19 UStG")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht bereit.")))));
}
const PRIVACY = [{
  p: ['Pfalz Multiservice ist ein Angebot von Pfalz Loadout (Inhaberin: Jasmin Beer, Wormser Landstraße 117, 67551 Worms). Wir betreiben diese Website, einschließlich aller zugehörigen Informationen, Inhalte, Funktionen und Kontaktmöglichkeiten, um Ihnen unsere Dienstleistungen vorzustellen und Anfragen entgegenzunehmen (die „Services“). In dieser Datenschutzerklärung wird beschrieben, wie wir personenbezogene Daten erfassen, verwenden oder weitergeben, wenn Sie die Website besuchen, uns eine Anfrage senden, einen Auftrag erteilen oder anderweitig mit uns kommunizieren.', 'Lesen Sie sich diese Datenschutzerklärung bitte sorgfältig durch. Indem Sie die Services nutzen, bestätigen Sie, dass Sie diese Datenschutzerklärung zur Kenntnis genommen haben.']
}, {
  h: 'Welche personenbezogenen Daten erfassen oder verarbeiten wir?',
  p: ['Wenn wir den Begriff „personenbezogene Daten“ verwenden, beziehen wir uns auf Informationen, die Sie identifizieren oder unmittelbar mit Ihnen in Verbindung gebracht werden können. Personenbezogene Daten umfassen keine Informationen, die anonym erfasst oder so anonymisiert wurden, dass eine Identifizierung nicht möglich ist. Je nachdem, wie Sie mit uns interagieren, können wir die folgenden Kategorien personenbezogener Daten verarbeiten:'],
  l: ['Kontaktdaten einschließlich Name, Firmenname, Postanschrift, Telefonnummer und E-Mail-Adresse.', 'Anfrage- und Auftragsdaten einschließlich des gewünschten Leistungsbereichs, Angaben zu Objekten, Flächen oder Warenbeständen, Terminwünschen sowie Angeboten, Rechnungen und Zahlungsinformationen im Rahmen eines Auftrags.', 'Kommunikation mit uns einschließlich der Informationen, die Sie uns über das Kontaktformular, per E-Mail, Telefon oder WhatsApp mitteilen.', 'Geräteinformationen einschließlich Informationen über Gerät, Browser oder Netzwerkverbindung, IP-Adresse sowie Datum und Uhrzeit des Zugriffs.', 'Nutzungsinformationen einschließlich Informationen darüber, welche Seiten der Website Sie aufrufen.']
}, {
  h: 'Quellen von personenbezogenen Daten',
  p: ['Wir können personenbezogene Daten über die folgenden Quellen erfassen:'],
  l: ['Direkt von Ihnen, wenn Sie uns eine Anfrage senden, einen Auftrag erteilen oder anderweitig mit uns kommunizieren.', 'Automatisch beim Besuch der Website, insbesondere über die Server-Protokolle unseres Hosting-Anbieters.', 'Von unseren Dienstanbietern, wenn sie Daten in unserem Auftrag erfassen oder verarbeiten.']
}, {
  h: 'Wie verwenden wir Ihre personenbezogenen Daten?',
  p: ['Je nachdem, wie Sie mit uns interagieren, verwenden wir personenbezogene Daten für die folgenden Zwecke:'],
  l: ['Bearbeitung von Anfragen und Durchführung von Aufträgen. Wir verwenden Ihre Daten, um Ihre Anfrage zu beantworten, Besichtigungen zu vereinbaren, Angebote zu erstellen, Aufträge auszuführen und abzurechnen (Art. 6 Abs. 1 lit. b DSGVO).', 'Bereitstellung und Sicherheit der Website. Wir verarbeiten technische Zugriffsdaten, um die Website auszuliefern, ihre Stabilität sicherzustellen und Missbrauch zu erkennen (Art. 6 Abs. 1 lit. f DSGVO).', 'Kommunikation mit Ihnen. Wir verwenden Ihre Daten, um zeitnah auf Ihre Anfragen zu reagieren und unsere Geschäftsbeziehung mit Ihnen aufrechtzuerhalten.', 'Rechtliche Gründe. Wir verwenden Ihre Daten, um gesetzliche Pflichten, etwa handels- und steuerrechtliche Aufbewahrungspflichten, zu erfüllen und um Rechtsansprüche geltend zu machen oder abzuwehren (Art. 6 Abs. 1 lit. c und f DSGVO).']
}, {
  h: 'Wie geben wir personenbezogene Daten weiter?',
  p: ['Wir verkaufen keine personenbezogenen Daten. Unter bestimmten Umständen geben wir Ihre Daten für die oben genannten Zwecke an Dritte weiter:'],
  l: ['An Dienstleister, die in unserem Auftrag tätig sind, z. B. für Hosting, IT-Betreuung, E-Mail, Buchhaltung oder Steuerberatung.', 'An Partnerbetriebe, sofern dies für die Durchführung Ihres Auftrags erforderlich ist, z. B. Entsorgungs- oder Transportunternehmen.', 'Wenn Sie uns dazu auffordern oder Ihre Einwilligung geben.', 'Zur Einhaltung gesetzlicher Verpflichtungen, auf Anfrage von Behörden oder zum Schutz unserer Rechte.']
}, {
  h: 'Kontakt per WhatsApp',
  p: ['Wenn Sie uns über WhatsApp kontaktieren, werden Ihre Nachricht und Ihre Telefonnummer von WhatsApp (Meta Platforms Ireland Ltd.) verarbeitet. Dabei können Daten auch in Länder außerhalb des Europäischen Wirtschaftsraums übertragen werden. Informationen dazu finden Sie in der Datenschutzrichtlinie von WhatsApp. Wenn Sie dies nicht wünschen, nutzen Sie bitte das Kontaktformular, E-Mail oder Telefon.']
}, {
  h: 'Websites und Links von Drittanbietern',
  p: ['Die Website kann Links zu Websites oder Plattformen von Drittanbietern enthalten. Wenn Sie diesen Links folgen, sollten Sie deren Datenschutzrichtlinien überprüfen. Wir sind nicht verantwortlich für den Datenschutz oder die Inhalte solcher Websites.']
}, {
  h: 'Daten von Kindern',
  p: ['Unsere Services richten sich nicht an Kinder, und wir erfassen wissentlich keine personenbezogenen Daten von Personen unter 16 Jahren. Wenn Sie Eltern oder Vormund eines Kindes sind, das uns Daten übermittelt hat, können Sie über die unten angegebenen Kontaktdaten die Löschung verlangen.']
}, {
  h: 'Sicherheit und Aufbewahrung Ihrer Daten',
  p: ['Wir treffen angemessene technische und organisatorische Maßnahmen, um Ihre Daten zu schützen. Keine Sicherheitsmaßnahme ist jedoch vollkommen; insbesondere bei der Übertragung per E-Mail können Risiken bestehen.', 'Wir speichern Ihre Daten nur so lange, wie es für die Bearbeitung Ihrer Anfrage oder die Durchführung des Auftrags erforderlich ist. Darüber hinaus bewahren wir Daten auf, soweit gesetzliche Aufbewahrungsfristen dies verlangen (in der Regel bis zu zehn Jahre für steuerlich relevante Unterlagen).']
}, {
  h: 'Ihre Rechte',
  p: ['Nach der Datenschutz-Grundverordnung (DSGVO) stehen Ihnen im gesetzlichen Rahmen folgende Rechte zu:'],
  l: ['Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO).', 'Recht auf Berichtigung unrichtiger Daten (Art. 16 DSGVO).', 'Recht auf Löschung (Art. 17 DSGVO).', 'Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO).', 'Recht auf Datenübertragbarkeit (Art. 20 DSGVO).', 'Recht auf Widerspruch gegen Verarbeitungen, die auf unserem berechtigten Interesse beruhen (Art. 21 DSGVO).', 'Recht auf Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO).'],
  p2: ['Zur Ausübung Ihrer Rechte genügt eine Nachricht an die unten angegebenen Kontaktdaten. Durch die Ausübung dieser Rechte entstehen Ihnen keine Nachteile. Gegebenenfalls müssen wir Ihre Identität überprüfen, bevor wir Ihre Anfrage bearbeiten.']
}, {
  h: 'Beschwerden',
  p: ['Wenn Sie Beschwerden darüber haben, wie wir Ihre personenbezogenen Daten verarbeiten, wenden Sie sich bitte an uns. Sie haben außerdem das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren. Für uns zuständig ist der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz.']
}, {
  h: 'Internationale Übertragungen',
  p: ['Soweit wir Daten außerhalb des Europäischen Wirtschaftsraums übermitteln, etwa bei der Nutzung von WhatsApp, stützen wir uns auf anerkannte Übermittlungsmechanismen wie die Standardvertragsklauseln der Europäischen Kommission oder einen Angemessenheitsbeschluss.']
}, {
  h: 'Änderungen an dieser Datenschutzerklärung',
  p: ['Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren, um Änderungen unserer Verfahrensweisen oder rechtliche Anforderungen zu berücksichtigen. Die aktuelle Fassung wird auf dieser Website veröffentlicht und das Datum der „Letzten Fassung“ entsprechend angepasst.']
}];
function Datenschutz({
  go
}) {
  const h = {
    margin: '0 0 12px',
    font: '700 18px/1.3 var(--font-display)',
    textTransform: 'uppercase',
    color: '#fff'
  };
  const p = {
    margin: 0,
    font: 'var(--type-body)',
    color: 'var(--text-body)'
  };
  const a = {
    color: 'var(--brand-accent)',
    textDecoration: 'none'
  };
  return /*#__PURE__*/React.createElement(Shell, {
    page: "datenschutz",
    go: go
  }, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      display: 'flex',
      flexDirection: 'column',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(LSH, {
    level: 1,
    size: "h1",
    eyebrow: "Rechtliches",
    title: "",
    highlight: "Datenschutzerkl\xE4rung"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 14px var(--font-body)',
      color: 'var(--text-subtle)'
    }
  }, "Letzte Fassung: 28. September 2026")), PRIVACY.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, s.h && /*#__PURE__*/React.createElement("h2", {
    style: {
      ...h,
      margin: 0
    }
  }, s.h), s.p.map((t, j) => /*#__PURE__*/React.createElement("p", {
    key: j,
    style: p
  }, t)), s.l && /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: 22,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      ...p
    }
  }, s.l.map((t, j) => /*#__PURE__*/React.createElement("li", {
    key: j
  }, t))), s.p2 && s.p2.map((t, j) => /*#__PURE__*/React.createElement("p", {
    key: j,
    style: p
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...h,
      margin: 0
    }
  }, "Kontakt"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Sollten Sie Fragen zu unseren Datenschutzverfahren oder dieser Datenschutzerkl\xE4rung haben oder eines Ihrer Rechte aus\xFCben m\xF6chten, wenden Sie sich bitte telefonisch unter ", /*#__PURE__*/React.createElement("a", {
    href: "tel:+491605086983",
    style: a
  }, CONTACT.phone), ", per E-Mail unter ", /*#__PURE__*/React.createElement("a", {
    href: 'mailto:' + CONTACT.email,
    style: a
  }, CONTACT.email), " oder per Post an uns:"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Pfalz Loadout", /*#__PURE__*/React.createElement("br", null), "Inhaberin: Jasmin Beer", /*#__PURE__*/React.createElement("br", null), "Wormser Landstra\xDFe 117", /*#__PURE__*/React.createElement("br", null), "67551 Worms, Deutschland"), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Im Sinne der geltenden Datenschutzgesetze sind wir der Verantwortliche f\xFCr Ihre personenbezogenen Daten.")))));
}
Object.assign(window, {
  Impressum,
  Datenschutz
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Legal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ServiceDetail.jsx
try { (() => {
const {
  Button: SB,
  SectionHeading: SH,
  CheckList: SCL,
  ServiceCard: SC,
  CtaBand: SCB,
  Icon: SI
} = window.PfalzMultiserviceDesignSystem_8eb026;
function PageHero({
  eyebrow,
  title,
  highlight,
  intro,
  image,
  crumbs,
  go
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--overlay-hero),url(' + image + ') center/cover',
      padding: '96px 0 88px'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(SH, {
    dark: true,
    level: 1,
    size: "h1",
    eyebrow: eyebrow,
    title: title,
    highlight: highlight,
    intro: intro,
    maxWidth: 720
  })));
}
function ServiceDetail({
  id,
  go
}) {
  const s = SERVICES.find(x => x.id === id) || SERVICES[0];
  const words = s.title.split(' ');
  const others = SERVICES.filter(x => x.id !== s.id);
  return /*#__PURE__*/React.createElement(Shell, {
    page: "leistungen",
    go: go
  }, /*#__PURE__*/React.createElement(PageHero, {
    go: go,
    eyebrow: "Unsere Leistungen",
    title: words.length > 1 ? words.slice(0, -1).join(' ') : '',
    highlight: words.slice(-1)[0],
    intro: s.short,
    image: s.image,
    crumbs: ['Leistungen', s.title]
  }), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.3fr 1fr',
      gap: 72,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(SH, {
    eyebrow: s.short,
    title: s.title
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--type-body)',
      color: 'var(--text-body)'
    }
  }, s.text), /*#__PURE__*/React.createElement(SCL, {
    items: USPS
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SB, {
    icon: "arrow-right",
    onClick: () => go('kontakt', s.title)
  }, "Anfrage zu ", s.title))))), /*#__PURE__*/React.createElement(Section, {
    bg: "var(--surface-alt)"
  }, /*#__PURE__*/React.createElement(SH, {
    eyebrow: "Kombinierbar",
    title: "Weitere",
    highlight: "Leistungen",
    style: {
      marginBottom: 48
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
      gap: 20
    }
  }, others.map(o => /*#__PURE__*/React.createElement(SC, {
    key: o.id,
    variant: "overlay",
    image: o.image,
    title: o.title,
    text: o.short,
    onClick: e => {
      e.preventDefault();
      go(o.id);
    }
  })))), /*#__PURE__*/React.createElement(SCB, {
    title: "Lassen Sie uns \xFCber Ihr",
    highlight: "Vorhaben sprechen",
    intro: "Schildern Sie uns kurz Ihr Anliegen. Wir melden uns zeitnah mit einem passenden L\xF6sungsvorschlag.",
    primaryLabel: "Unverbindlich anfragen",
    secondaryLabel: CONTACT.phone,
    onPrimary: () => go('kontakt')
  }));
}
Object.assign(window, {
  ServiceDetail,
  PageHero
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ServiceDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.jsx
try { (() => {
const IMG = '../../assets/images/';
const CONTACT = {
  phone: '+49 160 5086983',
  email: 'kontakt@pfalz-loadout.de',
  city: '67551 Worms',
  whatsapp: 'https://wa.me/491605086983'
};
const SERVICES = [{
  id: 'ecommerce',
  icon: 'shopping-cart',
  title: 'E-Commerce',
  short: 'Digitaler Handel mit Fokus auf Effizienz',
  text: 'Wir betreiben eigene E-Commerce-Plattformen und vertreiben unsere Sortimente über Online-Shops sowie etablierte Marktplätze. Unser Multichannel-Ansatz ermöglicht eine breite Marktabdeckung bei schlanken Prozessen, von der Beschaffung über das Listing bis zum Fulfillment.',
  image: IMG + 'ecommerce-shop.png'
}, {
  id: 'reselling',
  icon: 'recycle',
  title: 'Reselling & Asset Recovery',
  short: 'Werterhalt statt Abschreibung',
  text: 'Überbestände, Restposten und Retourenware binden Kapital und Lagerfläche. Wir kaufen Warenbestände an, bereiten sie auf und führen sie über unsere Vertriebskanäle in den Markt zurück. Für unsere Partner bedeutet das schnelle Liquidität, reduzierte Lagerkosten und einen nachhaltigen Umgang mit Ressourcen.',
  image: IMG + 'reselling-ware.png'
}, {
  id: 'storage',
  icon: 'warehouse',
  title: 'Storage Solutions',
  short: 'Lagerkapazität nach Bedarf',
  text: 'Wir stellen Lagerflächen für temporäre und langfristige Anforderungen bereit, skalierbar und ohne starre Vertragsbindung. Für Gewerbekunden mit saisonalen Spitzen ebenso wie für Privatkunden in Übergangsphasen.',
  image: IMG + 'storage-unit.png'
}, {
  id: 'clearance',
  icon: 'truck',
  title: 'Clearance Services',
  short: 'Strukturierte Räumung, fachgerechte Verwertung',
  text: 'Vollständige Räumung von Garagen, Lagern, Hallen und Gewerbeflächen: Bestandsaufnahme, verbindliches Angebot, Durchführung und besenreine Übergabe. Verwertbare Bestände werden in den Wirtschaftskreislauf zurückgeführt, alles Weitere fachgerecht entsorgt.',
  image: IMG + 'transporter-verladung.png'
}, {
  id: 'web',
  icon: 'monitor-cog',
  title: 'Web Maintenance & Management',
  short: 'Stabile Systeme, aktuelle Inhalte',
  text: 'Laufende technische Betreuung von Websites und Online-Shops: Updates, Sicherheitsmonitoring, Content-Pflege und Systemverwaltung. Aus dem Betrieb eigener E-Commerce-Plattformen bringen wir praxisnahes Know-how mit.',
  image: IMG + 'webseite-laptop.png'
}, {
  id: 'facility',
  icon: 'wrench',
  title: 'Solutions & Support',
  short: 'Für jede Aufgabe eine schnelle Lösung',
  text: 'Nicht jede Anforderung passt in eine feste Kategorie. Ob kurzfristiger Engpass, organisatorische Herausforderung oder ein Anliegen, für das es keinen passenden Ansprechpartner gibt: Wir analysieren die Situation, entwickeln eine pragmatische Lösung und setzen sie zuverlässig um. Flexibel, lösungsorientiert und mit einem Netzwerk, das wir bei Bedarf einbinden.',
  image: IMG + 'wartung-technik.png'
}, {
  id: 'smarthome',
  side: true,
  icon: 'lightbulb',
  title: 'Smart Home & KNX',
  short: 'Programmierung von Gebäudeautomation',
  text: 'Als ergänzende Leistung übernehmen wir die Programmierung von Smart-Home-Systemen auf KNX-Basis: Parametrierung mit der ETS, Einrichtung von Licht-, Jalousie- und Heizungssteuerung, Szenen und Visualisierung sowie Anpassungen an bestehenden Anlagen.',
  image: IMG + 'smarthome-knx.png'
}];
const NAV = [{
  label: 'Leistungen',
  id: 'leistungen',
  children: SERVICES.map(s => ({
    label: s.title,
    id: s.id,
    icon: s.icon
  }))
}, {
  label: 'Über uns',
  id: 'ueber'
}, {
  label: 'Kontakt',
  id: 'kontakt'
}];
const FOOTER_COLS = [{
  title: 'Leistungen',
  links: SERVICES.map(s => ({
    label: s.title,
    id: s.id
  }))
}];
const USPS = [{
  title: 'Alles aus einer Hand',
  text: 'Ein Kontakt für alle Aufgaben statt vieler einzelner Dienstleister.',
  lines: ['Ein Kontakt für alle Aufgaben statt', 'vieler einzelner Dienstleister.']
}, {
  title: 'Verbindliche Angebote',
  text: 'Sie kennen Umfang und Kosten, bevor wir beginnen.',
  lines: ['Sie kennen Umfang und Kosten,', 'bevor wir beginnen.']
}, {
  title: 'Schnell vor Ort',
  text: 'Regional in Worms verankert und kurzfristig einsatzbereit.'
}];
const STEPS = [['01', 'Anfrage', 'Sie schildern Ihr Anliegen per Formular, Telefon oder WhatsApp.'], ['02', 'Bedarfsanalyse', 'Persönliches Gespräch oder Besichtigung vor Ort.'], ['03', 'Angebot', 'Verbindlich und mit transparentem Leistungsumfang.'], ['04', 'Umsetzung', 'Termingerecht, und wir bleiben Ihr Ansprechpartner.']];
const AREA = ['Worms', 'Frankenthal', 'Ludwigshafen', 'Mannheim', 'Alzey', 'Grünstadt', 'Bensheim'];
const REVIEWS = [{
  quote: '[Kundenstimme zu einer Räumung oder Entrümpelung]',
  name: '[Name, gekürzt]',
  meta: 'Privatkunde, [Ort]'
}, {
  quote: '[Kundenstimme zum Warenankauf oder zur Lagerung]',
  name: '[Firmenname]',
  meta: 'Gewerbekunde, [Ort]'
}, {
  quote: '[Kundenstimme zur Website- oder Objektbetreuung]',
  name: '[Firmenname]',
  meta: 'Gewerbekunde, [Ort]'
}];
const PROJECTS = [{
  title: 'Garagenräumung, [Ort]',
  text: '[Kurzbeschreibung des Projekts]',
  ph: 'Foto: Garagenräumung vorher/nachher'
}, {
  title: 'Einlagerung Gewerbeware, [Ort]',
  text: '[Kurzbeschreibung des Projekts]',
  ph: 'Foto: Lagerfläche'
}, {
  title: 'Website-Betreuung, [Kunde]',
  text: '[Kurzbeschreibung des Projekts]',
  ph: 'Foto/Screenshot: Website'
}];
Object.assign(window, {
  SERVICES,
  NAV,
  FOOTER_COLS,
  USPS,
  STEPS,
  AREA,
  REVIEWS,
  PROJECTS,
  IMG,
  CONTACT
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.CheckList = __ds_scope.CheckList;

__ds_ns.CtaBand = __ds_scope.CtaBand;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.FAQItem = __ds_scope.FAQItem;

__ds_ns.ProcessStep = __ds_scope.ProcessStep;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.ServiceChip = __ds_scope.ServiceChip;

__ds_ns.TestimonialCard = __ds_scope.TestimonialCard;

__ds_ns.SelectField = __ds_scope.SelectField;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

__ds_ns.TopBar = __ds_scope.TopBar;

})();
