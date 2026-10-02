import React from 'react';
export function Eyebrow({children,tone='accent',rule=true,align='left',style={}}){
  const c={accent:'var(--brand-accent)',primary:'var(--brand-primary)',light:'#fff',warm:'var(--brand-warm)'}[tone]||tone;
  return <div style={{display:'flex',alignItems:'center',justifyContent:align==='center'?'center':'flex-start',gap:12,font:'600 var(--fs-eyebrow)/1.2 var(--font-display)',letterSpacing:'var(--ls-eyebrow)',textTransform:'uppercase',color:c,...style}}>
    {rule&&<span style={{width:28,height:2,background:c,flex:'none'}}/>}{children}{rule&&align==='center'&&<span style={{width:28,height:2,background:c,flex:'none'}}/>}
  </div>;
}