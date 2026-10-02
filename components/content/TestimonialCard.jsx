import React from 'react';
import { Icon } from '../actions/Icon.jsx';
export function TestimonialCard({quote,name,meta,rating=5}){
  return <figure style={{margin:0,display:'flex',flexDirection:'column',gap:18,padding:'var(--card-pad)',background:'var(--surface-card)',border:'1px solid var(--border-subtle)',borderRadius:'var(--radius-card)',boxShadow:'var(--shadow-xs)'}}>
    <div style={{display:'flex',gap:3}}>{Array.from({length:5}).map((_,i)=><Icon key={i} name="star" size={16} color={i<rating?'var(--brand-warm)':'var(--pm-steel-200)'}/>)}</div>
    <blockquote style={{margin:0,font:'400 17px/1.6 var(--font-body)',color:'var(--text-body)'}}>„{quote}“</blockquote>
    <figcaption style={{display:'flex',flexDirection:'column',gap:2,marginTop:'auto',paddingTop:16,borderTop:'1px solid var(--border-subtle)'}}>
      <span style={{font:'700 14px var(--font-display)',letterSpacing:'.06em',textTransform:'uppercase',color:'var(--text-strong)'}}>{name}</span>
      {meta&&<span style={{font:'400 14px var(--font-body)',color:'var(--text-subtle)'}}>{meta}</span>}
    </figcaption></figure>;
}