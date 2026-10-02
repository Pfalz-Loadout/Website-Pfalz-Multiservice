import React from 'react';
import { Icon } from '../actions/Icon.jsx';
export function ServiceChip({children,icon,dark=true,active=false,onClick}){
  return <span onClick={onClick} style={{display:'inline-flex',alignItems:'center',gap:8,height:36,padding:'0 14px',borderRadius:'var(--radius-xs)',font:'600 12px var(--font-display)',letterSpacing:'.14em',textTransform:'uppercase',cursor:onClick?'pointer':'default',
    color:active?'var(--pm-navy-950)':dark?'#fff':'var(--text-strong)',background:active?'var(--brand-accent)':dark?'rgba(255,255,255,.08)':'var(--surface-tint)',border:'1px solid '+(active?'var(--brand-accent)':dark?'rgba(255,255,255,.18)':'var(--border-subtle)'),backdropFilter:dark?'blur(8px)':undefined}}>
    {icon&&<Icon name={icon} size={15} color={active?'currentColor':'var(--brand-accent)'}/>}{children}</span>;
}