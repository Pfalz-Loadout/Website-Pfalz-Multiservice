import React from 'react';
import { Icon } from '../actions/Icon.jsx';
export function FAQItem({question,answer,defaultOpen=false,dark=false}){
  const [o,setO]=React.useState(defaultOpen);
  return <div style={{borderBottom:'1px solid '+(dark?'var(--border-dark)':'var(--border-subtle)')}}>
    <button onClick={()=>setO(!o)} aria-expanded={o} style={{all:'unset',boxSizing:'border-box',cursor:'pointer',width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',gap:20,padding:'24px 0',font:'700 18px/1.35 var(--font-display)',color:dark?'#fff':'var(--text-strong)'}}>
      {question}
      <span style={{flex:'none',width:36,height:36,borderRadius:'var(--radius-sm)',display:'flex',alignItems:'center',justifyContent:'center',background:o?'var(--brand-primary)':'transparent',border:'1.5px solid '+(o?'var(--brand-primary)':dark?'rgba(255,255,255,.3)':'var(--border-strong)'),color:o?'#fff':dark?'#fff':'var(--brand-primary)',transition:'all var(--dur-base) var(--ease-out)'}}><Icon name={o?'minus':'plus'} size={18}/></span>
    </button>
    <div style={{display:'grid',gridTemplateRows:o?'1fr':'0fr',transition:'grid-template-rows var(--dur-base) var(--ease-out)'}}><div style={{overflow:'hidden'}}>
      <p style={{margin:0,padding:'0 56px 24px 0',font:'400 16px/1.65 var(--font-body)',color:dark?'var(--text-on-dark-muted)':'var(--text-muted)'}}>{answer}</p></div></div>
  </div>;
}