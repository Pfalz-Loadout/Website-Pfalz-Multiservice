import React from 'react';
import { Icon } from '../actions/Icon.jsx';
export function SelectField({label,options=[],value,onChange,required,placeholder='Bitte wählen',name,dark=false}){
  const [f,setF]=React.useState(false);
  return <label style={{display:'flex',flexDirection:'column',gap:8}}>
    {label&&<span style={{font:'600 13px var(--font-display)',letterSpacing:'.08em',textTransform:'uppercase',color:dark?'#fff':'var(--text-strong)'}}>{label}{required&&<span style={{color:'var(--brand-accent)'}}> *</span>}</span>}
    <span style={{position:'relative',display:'block'}}>
      <select name={name} value={value} defaultValue={value===undefined?'':undefined} onChange={onChange} onFocus={()=>setF(true)} onBlur={()=>setF(false)} style={{appearance:'none',width:'100%',height:52,padding:'0 44px 0 16px',font:'400 16px var(--font-body)',color:dark?'#fff':'var(--text-strong)',background:dark?'rgba(255,255,255,.05)':'var(--surface-card)',border:'1.5px solid '+(f?'var(--border-focus)':dark?'rgba(255,255,255,.18)':'var(--border-strong)'),borderRadius:'var(--radius-input)',outline:'none',boxShadow:f?'0 0 0 3px rgba(221,187,77,.18)':'none'}}>
        <option value="" disabled>{placeholder}</option>{options.map(o=><option key={o} value={o}>{o}</option>)}
      </select>
      <Icon name="chevron-down" size={18} color="var(--brand-primary)" style={{position:'absolute',right:16,top:17,pointerEvents:'none'}}/>
    </span></label>;
}