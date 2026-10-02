import React from 'react';
import { Icon } from '../actions/Icon.jsx';
export function CheckList({items=[],dark=false,icon='check'}){
  return <ul style={{listStyle:'none',margin:0,padding:0,display:'flex',flexDirection:'column',gap:16}}>
    {items.map((it,i)=>{const t=typeof it==='string'?{title:it}:it;return <li key={i} style={{display:'flex',gap:14,alignItems:'flex-start'}}>
      <span style={{flex:'none',width:26,height:26,borderRadius:'var(--radius-sm)',background:dark?'rgba(221,187,77,.16)':'var(--surface-tint)',color:dark?'var(--brand-accent)':'var(--brand-primary)',display:'flex',alignItems:'center',justifyContent:'center',marginTop:1}}><Icon name={icon} size={16}/></span>
      <span style={{font:'400 16px/1.6 var(--font-body)',color:dark?'var(--text-on-dark-muted)':'var(--text-body)'}}>{t.title&&<strong style={{fontWeight:700,color:dark?'#fff':'var(--text-strong)'}}>{t.title}{t.text?': ':''}</strong>}{t.text}</span>
    </li>})}
  </ul>;
}