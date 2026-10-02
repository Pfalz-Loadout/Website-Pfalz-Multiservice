import React from 'react';
export function ProcessStep({number,title,text,dark=false,last=false}){
  return <div style={{display:'flex',flexDirection:'column',gap:14,position:'relative',paddingTop:24,borderTop:'2px solid '+(dark?'rgba(255,255,255,.14)':'var(--border-subtle)')}}>
    <span style={{position:'absolute',top:-2,left:0,width:48,height:2,background:'var(--brand-accent)'}}/>
    <span style={{font:'800 56px/1 var(--font-display)',color:dark?'rgba(255,255,255,.22)':'var(--pm-navy-100)',letterSpacing:'-.02em'}}>{number}</span>
    <h3 style={{margin:0,font:'800 20px/1.2 var(--font-display)',letterSpacing:'.08em',textTransform:'uppercase',color:dark?'#fff':'var(--text-strong)'}}>{title}</h3>
    <p style={{margin:0,font:'400 16px/1.6 var(--font-body)',color:dark?'var(--text-on-dark-muted)':'var(--text-muted)'}}>{text}</p>
  </div>;
}