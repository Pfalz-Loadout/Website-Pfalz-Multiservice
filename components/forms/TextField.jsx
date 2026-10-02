import React from 'react';
export function TextField({label,placeholder,type='text',multiline=false,rows=5,required,error,hint,value,onChange,name,dark=false}){
  const [f,setF]=React.useState(false);
  const Tag=multiline?'textarea':'input';
  const bd=error?'var(--pm-danger)':f?'var(--border-focus)':dark?'rgba(255,255,255,.18)':'var(--border-strong)';
  return <label style={{display:'flex',flexDirection:'column',gap:8}}>
    {label&&<span style={{font:'600 13px var(--font-display)',letterSpacing:'.08em',textTransform:'uppercase',color:dark?'#fff':'var(--text-strong)'}}>{label}{required&&<span style={{color:'var(--brand-accent)'}}> *</span>}</span>}
    <Tag name={name} type={multiline?undefined:type} rows={multiline?rows:undefined} placeholder={placeholder} value={value} onChange={onChange} onFocus={()=>setF(true)} onBlur={()=>setF(false)}
      style={{font:'400 16px/1.5 var(--font-body)',color:dark?'#fff':'var(--text-strong)',background:dark?'rgba(255,255,255,.05)':'var(--surface-card)',border:'1.5px solid '+bd,borderRadius:'var(--radius-input)',padding:multiline?'14px 16px':'0 16px',height:multiline?undefined:52,outline:'none',resize:'vertical',boxShadow:f&&!error?'0 0 0 3px rgba(221,187,77,.18)':'none',transition:'border-color var(--dur-fast),box-shadow var(--dur-fast)'}}/>
    {(error||hint)&&<span style={{font:'400 13px var(--font-body)',color:error?'var(--pm-danger)':'var(--text-subtle)'}}>{error||hint}</span>}
  </label>;
}