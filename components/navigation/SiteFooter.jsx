import React from 'react';
import { Icon } from '../actions/Icon.jsx';
export function SiteFooter({logoSrc,text='Transport, Lagerung und Service aus einer Hand – für Privat- und Geschäftskunden in der ganzen Pfalz.',columns=[],contactTitle='Kontakt',address='Musterstraße 12, 67433 Neustadt an der Weinstraße',phone='06321 000 000',email='kontakt@pfalz-loadout.de',mapSrc,socials=['facebook','instagram','youtube'],company='Pfalz Multiservice',legal=['Impressum','Datenschutz','AGB'],credit,year=2026,onNavigate}){
  const h={margin:'0 0 30px',font:'700 20px/1.3 var(--font-display)',textTransform:'uppercase',color:'#fff',textAlign:'center'};
  const gold={display:'flex',alignItems:'flex-start',gap:10,font:'500 16px/1.1 var(--font-body)',color:'var(--brand-accent)',textDecoration:'none'};
  const go=(e,k)=>{if(onNavigate){e.preventDefault();onNavigate(k.id||k.label||k)}};
  return <footer style={{background:'var(--pm-black)',color:'#fff'}}>
    <div style={{maxWidth:1170,margin:'0 auto',padding:'72px var(--gutter) 64px',display:'grid',gridTemplateColumns:'repeat('+(columns.length+2)+',minmax(0,1fr))',gap:48}}>
      <div style={{display:'flex',flexDirection:'column',gap:28,paddingTop:14}}>
        <img src={logoSrc} alt={company} style={{height:120,maxWidth:'100%',objectFit:'contain',alignSelf:'flex-start'}}/>
        <p style={{margin:0,font:'500 16px/1.6 var(--font-body)',color:'#fff',maxWidth:280}}>{text}</p>
        {socials.length>0&&<div style={{display:'flex',gap:28,paddingLeft:26}}>{socials.map(s=><a key={s} href="#" aria-label={s} style={{display:'flex',color:'#fff'}}><Icon name={s} size={20}/></a>)}</div>}
      </div>
      {columns.map(c=><div key={c.title}><h4 style={h}>{c.title}</h4><div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:32}}>{c.links.map(k=><a key={k.label||k} href="#" onClick={e=>go(e,k)} style={{display:'flex',alignItems:'center',gap:6,font:'400 16px/1.1 var(--font-body)',color:'#fff',textDecoration:'none'}} onMouseEnter={e=>e.currentTarget.style.color='var(--brand-accent)'} onMouseLeave={e=>e.currentTarget.style.color='#fff'}><Icon name="circle-arrow-right" size={16} color="var(--brand-accent)"/>{k.label||k}</a>)}</div></div>)}
      <div><h4 style={h}>{contactTitle}</h4><div style={{display:'flex',flexDirection:'column',gap:28,paddingLeft:10}}>
        <span style={gold}><Icon name="map-pin" size={16}/>{address}</span>
        {mapSrc&&<img src={mapSrc} alt="" style={{width:'100%',aspectRatio:'377/220',objectFit:'cover',display:'block'}}/>}
        <a href={'tel:'+phone.replace(/\s/g,'')} style={gold}><Icon name="phone" size={16}/>{phone}</a>
        <a href={'mailto:'+email} style={gold}><Icon name="mail" size={16}/>{email}</a>
      </div></div>
    </div>
    <div style={{maxWidth:1170,margin:'0 auto',padding:'0 var(--gutter)'}}><div style={{borderTop:'1px solid var(--pm-ink-600)',padding:'30px 14px 26px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:20,flexWrap:'wrap',font:'500 14px/1.6 var(--font-body)'}}>
      <div style={{display:'flex',flexDirection:'column',gap:4}}>
        <span>Copyright © 2021 - {year}, {company}. Alle Rechte vorbehalten</span>
        <span style={{display:'flex',gap:4,flexWrap:'wrap'}}>{legal.map((x,i)=><React.Fragment key={x}>{i>0&&<span>|</span>}<a href="#" onClick={e=>go(e,x)} style={{color:'var(--brand-accent)',textDecoration:'none'}}>{x}</a></React.Fragment>)}</span>
      </div>
      {credit&&<span style={{fontWeight:600}}>{credit.prefix||'Powered by'} <b style={{color:'var(--brand-accent)',fontWeight:600}}>{credit.name}</b></span>}
    </div></div></footer>;
}
