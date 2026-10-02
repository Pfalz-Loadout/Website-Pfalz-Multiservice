import React from 'react';
import { Icon } from '../actions/Icon.jsx';
import { Button } from '../actions/Button.jsx';
function NavItem({item,dark,active,onNavigate}){
  const [o,setO]=React.useState(false);const has=item.children&&item.children.length;
  const c='#fff';
  return <div onMouseEnter={()=>setO(true)} onMouseLeave={()=>setO(false)} style={{position:'relative',height:'100%',display:'flex',alignItems:'center'}}>
    <a href={item.href||'#'} onClick={e=>{if(onNavigate){e.preventDefault();onNavigate(item.id||item.label)}}} style={{display:'flex',alignItems:'center',gap:6,height:'100%',whiteSpace:'nowrap',font:'500 14px var(--font-display)',textTransform:'uppercase',color:o||active?'var(--brand-accent)':c,textDecoration:'none',position:'relative',transition:'color var(--dur-fast)'}}>
      {item.label}{has&&<Icon name="chevron-down" size={15} style={{transform:o?'rotate(180deg)':'none',transition:'transform var(--dur-base)'}}/>}
      {active&&<span style={{position:'absolute',left:0,right:0,bottom:22,height:2,background:'var(--brand-accent)'}}/>}
    </a>
    {has&&o&&<div style={{position:'absolute',top:'100%',left:-20,minWidth:260,background:'var(--surface-card)',border:'1px solid var(--border-subtle)',borderRadius:'var(--radius-card)',boxShadow:'var(--shadow-lg)',padding:'10px 0',borderTop:'3px solid var(--brand-accent)',zIndex:20}}>
      {item.children.map(ch=><a key={ch.label} href={ch.href||'#'} onClick={e=>{if(onNavigate){e.preventDefault();onNavigate(ch.id||ch.label)}}} style={{display:'flex',alignItems:'center',gap:12,padding:'11px 20px',font:'500 15px var(--font-body)',color:'var(--text-body)',textDecoration:'none'}}
        onMouseEnter={e=>{e.currentTarget.style.background='var(--surface-alt)';e.currentTarget.style.color='var(--brand-primary)'}} onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='var(--text-body)'}}>
        {ch.icon&&<Icon name={ch.icon} size={18} color="var(--brand-accent)"/>}{ch.label}</a>)}
    </div>}
  </div>;
}
export function SiteHeader({logoSrc,logoDarkSrc,nav=[],active,phone='06321 000 000',ctaLabel='Angebot anfragen',onCta,onNavigate,transparent=false,sticky=false}){
  const dark=true;
  return <header style={{position:sticky?'sticky':'relative',top:0,zIndex:30,background:transparent?'rgba(0,0,0,.35)':'var(--pm-black)',backdropFilter:transparent?'var(--blur-header)':'none',borderBottom:'1px solid var(--border-dark)'}}>
    <div style={{maxWidth:'var(--container-max)',margin:'0 auto',padding:'0 var(--gutter)',height:'var(--header-h)',display:'flex',alignItems:'center',justifyContent:'space-between',gap:32}}>
      <a href="#" onClick={e=>{if(onNavigate){e.preventDefault();onNavigate('home')}}} style={{display:'flex',alignItems:'center'}}><img src={logoDarkSrc||logoSrc} alt="Pfalz Multiservice" style={{height:48,display:'block'}}/></a>
      <nav style={{display:'flex',gap:30,height:'100%'}}>{nav.map(n=><NavItem key={n.label} item={n} dark={dark} active={active===(n.id||n.label)} onNavigate={onNavigate}/>)}</nav>
      <div style={{display:'flex',alignItems:'center',gap:22}}>
        {phone&&<a href={'tel:'+phone.replace(/\s/g,'')} style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
          <span style={{width:40,height:40,borderRadius:'var(--radius-sm)',border:'1.5px solid '+(dark?'rgba(255,255,255,.3)':'var(--border-strong)'),display:'flex',alignItems:'center',justifyContent:'center',color:dark?'var(--brand-accent)':'var(--brand-primary)'}}><Icon name="phone" size={17}/></span>
          <span style={{display:'flex',flexDirection:'column',whiteSpace:'nowrap'}}><span style={{font:'500 11px var(--font-display)',letterSpacing:'.14em',textTransform:'uppercase',color:dark?'var(--text-on-dark-muted)':'var(--text-subtle)'}}>Rufen Sie an</span><span style={{font:'700 15px var(--font-display)',color:dark?'#fff':'var(--text-strong)'}}>{phone}</span></span>
        </a>}
        {ctaLabel&&<Button size="sm" variant={dark?'accent':'primary'} onClick={onCta}>{ctaLabel}</Button>}
      </div></div></header>;
}