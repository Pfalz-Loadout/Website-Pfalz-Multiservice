import React from 'react';
import { Eyebrow } from './Eyebrow.jsx';
export function SectionHeading({eyebrow,title,highlight,intro,align='left',dark=false,level=2,size='h2',maxWidth=760,style={}}){
  const Tag='h'+level;
  const fs=size==='hero'?'var(--fs-hero)':size==='h1'?'var(--fs-h1)':'var(--fs-h2)';
  return <div style={{display:'flex',flexDirection:'column',gap:18,alignItems:align==='center'?'center':'flex-start',textAlign:align,maxWidth,marginInline:align==='center'?'auto':undefined,...style}}>
    {eyebrow&&<Eyebrow align={align} tone={dark?'accent':'accent'}>{eyebrow}</Eyebrow>}
    <Tag style={{margin:0,font:(level===1?'var(--fw-hero) ':'var(--fw-heading) ')+fs+'/var(--lh-heading) var(--font-display)',letterSpacing:level===1?'var(--ls-hero)':'var(--ls-display)',textTransform:'uppercase',color:dark?'#fff':'var(--text-strong)',textWrap:'balance'}}>
      {title}{highlight&&<> <strong style={{fontWeight:'inherit',color:'var(--text-highlight)',textDecoration:size==='hero'?'underline':'none',textDecorationThickness:'.07em',textUnderlineOffset:'.12em'}}>{highlight}</strong></>}
    </Tag>
    {intro&&<p style={{margin:0,font:'400 var(--fs-lead)/1.55 var(--font-body)',color:dark?'var(--text-on-dark-muted)':'var(--text-muted)',textWrap:'pretty'}}>{intro}</p>}
  </div>;
}