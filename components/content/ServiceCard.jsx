import React from 'react';
import { Icon } from '../actions/Icon.jsx';
export function ServiceCard({image,title,text,linkLabel='Mehr erfahren',href='#',icon,status,variant='stacked',onClick}){
  const [h,setH]=React.useState(false);
  if(variant==='overlay') return <a href={href} onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{position:'relative',display:'block',aspectRatio:'4/5',borderRadius:'var(--radius-card)',overflow:'hidden',textDecoration:'none',color:'#fff',background:'var(--surface-dark)'}}>
    <div style={{position:'absolute',inset:0,background:'url('+image+') center/cover',transform:h?'scale(1.05)':'scale(1)',transition:'transform var(--dur-slow) var(--ease-out)'}}/>
    <div style={{position:'absolute',inset:0,background:'var(--overlay-card)'}}/>
    <div style={{position:'absolute',left:0,right:0,bottom:0,padding:'var(--card-pad)',display:'flex',flexDirection:'column',gap:8}}>
      {status&&<span style={{alignSelf:'flex-start',font:'600 11px var(--font-display)',letterSpacing:'.14em',textTransform:'uppercase',padding:'5px 9px',borderRadius:2,background:'rgba(255,255,255,.14)',backdropFilter:'blur(6px)'}}>{status}</span>}
      <h3 style={{margin:0,font:'700 var(--fs-h3)/1.25 var(--font-display)',textTransform:'uppercase',letterSpacing:'.02em'}}>{title}</h3>
      {text&&<p style={{margin:0,font:'400 15px/1.5 var(--font-body)',color:'var(--text-on-dark-muted)'}}>{text}</p>}
      <span style={{display:'flex',alignItems:'center',gap:8,marginTop:4,font:'700 12px var(--font-display)',letterSpacing:'.12em',textTransform:'uppercase',color:'var(--brand-accent)'}}>{linkLabel}<Icon name="arrow-right" size={16} style={{transform:h?'translateX(4px)':'none',transition:'transform var(--dur-base) var(--ease-out)'}}/></span>
    </div></a>;
  return <a href={href} onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{display:'flex',flexDirection:'column',background:'var(--surface-card)',border:'1px solid var(--border-subtle)',borderRadius:'var(--radius-card)',overflow:'hidden',textDecoration:'none',color:'inherit',boxShadow:h?'var(--shadow-md)':'var(--shadow-xs)',transform:h?'translateY(-4px)':'none',transition:'box-shadow var(--dur-base) var(--ease-out),transform var(--dur-base) var(--ease-out)'}}>
    {image&&<div style={{aspectRatio:'16/10',overflow:'hidden',position:'relative'}}><div style={{position:'absolute',inset:0,background:'url('+image+') center/cover',transform:h?'scale(1.05)':'scale(1)',transition:'transform var(--dur-slow) var(--ease-out)'}}/>
      {icon&&<span style={{position:'absolute',left:20,bottom:-22,width:48,height:48,borderRadius:'var(--radius-sm)',background:'var(--brand-primary)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',zIndex:1}}><Icon name={icon} size={24}/></span>}</div>}
    <div style={{padding:'var(--card-pad)',paddingTop:icon?40:'var(--card-pad)',display:'flex',flexDirection:'column',gap:10,flex:1}}>
      {status&&<span style={{font:'600 11px var(--font-display)',letterSpacing:'.14em',textTransform:'uppercase',color:'var(--pm-amber-600)'}}>{status}</span>}
      <h3 style={{margin:0,font:'700 var(--fs-h3)/1.25 var(--font-display)',textTransform:'uppercase',letterSpacing:'.02em',color:'var(--text-strong)'}}>{title}</h3>
      {text&&<p style={{margin:0,font:'400 16px/1.6 var(--font-body)',color:'var(--text-muted)',flex:1}}>{text}</p>}
      <span style={{display:'flex',alignItems:'center',gap:8,marginTop:6,font:'700 12px var(--font-display)',letterSpacing:'.12em',textTransform:'uppercase',color:h?'var(--brand-accent)':'var(--brand-primary)',transition:'color var(--dur-fast)'}}>{linkLabel}<Icon name="arrow-right" size={16} style={{transform:h?'translateX(4px)':'none',transition:'transform var(--dur-base) var(--ease-out)'}}/></span>
    </div></a>;
}