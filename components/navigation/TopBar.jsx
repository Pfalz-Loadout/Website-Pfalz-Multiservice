import React from 'react';
import { Icon } from '../actions/Icon.jsx';
export function TopBar({phone='06321 000 000',email='kontakt@pfalz-loadout.de',hours='Mo–Fr 7–18 Uhr',socials=['facebook','instagram','youtube']}){
  const item={display:'flex',alignItems:'center',gap:8,color:'var(--text-on-dark-muted)',textDecoration:'none',font:'500 13px var(--font-body)'};
  return <div style={{background:'var(--surface-darker)',borderBottom:'1px solid var(--border-dark)'}}>
    <div style={{maxWidth:'var(--container-max)',margin:'0 auto',padding:'0 var(--gutter)',height:'var(--topbar-h)',display:'flex',alignItems:'center',justifyContent:'space-between',gap:24}}>
      <div style={{display:'flex',gap:14}}>{socials.map(s=><a key={s} href="#" aria-label={s} style={{...item,color:'#fff'}}><Icon name={s} size={15}/></a>)}</div>
      <div style={{display:'flex',gap:28,flexWrap:'wrap',justifyContent:'flex-end'}}>
        {hours&&<span style={item}><Icon name="clock" size={14} color="var(--brand-accent)"/>{hours}</span>}
        <a href={'mailto:'+email} style={item}><Icon name="mail" size={14} color="var(--brand-accent)"/>{email}</a>
        <a href={'tel:'+phone.replace(/\s/g,'')} style={{...item,color:'#fff',fontWeight:600}}><Icon name="phone" size={14} color="var(--brand-accent)"/>{phone}</a>
      </div></div></div>;
}