const {Button,Icon,SectionHeading,ServiceCard,ServiceChip,CheckList,ProcessStep,TestimonialCard,CtaBand,Eyebrow}=window.PfalzMultiserviceDesignSystem_8eb026;
function Hero({go}){
  return <section style={{position:'relative',minHeight:760,background:'var(--overlay-hero),url('+IMG+'transporter-halle.png) center/cover',display:'flex',alignItems:'center',paddingTop:'var(--header-h)'}}>
    <Container style={{width:'100%'}}><div style={{maxWidth:1050,display:'flex',flexDirection:'column',gap:32}}>
      <SectionHeading dark level={1} size="hero" eyebrow="Pfalz Multiservice · Worms" title="Viele Leistungen." highlight={<><br/>Ein Ansprechpartner.</>} maxWidth={1050}/>
      <div style={{display:'flex',gap:14,flexWrap:'wrap'}}><Button variant="accent" size="lg" onClick={()=>go('kontakt')}>Unverbindlich anfragen</Button><Button variant="outline-light" size="lg" iconLeft="message-circle" href={CONTACT.whatsapp}>Per WhatsApp schreiben</Button></div>
    </div></Container></section>;
}
function TrustStrip(){
  const ic=['layers','file-check','map-pin'];
  return <div style={{background:'var(--surface-card)',borderBottom:'1px solid var(--border-subtle)'}}><Container style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:40,padding:'36px var(--gutter)'}}>
    {USPS.map((u,i)=><div key={u.title} style={{display:'flex',alignItems:'flex-start',gap:16}}><Icon name={ic[i]} size={28} color="var(--brand-accent)"/><div style={{display:'flex',flexDirection:'column',gap:4}}><span style={{font:'700 16px/1.3 var(--font-display)',textTransform:'uppercase',color:'#fff'}}>{u.title}</span><span style={{font:'400 15px/1.6 var(--font-body)',color:'var(--text-body)'}}>{u.lines?<>{u.lines[0]}<br/>{u.lines[1]}</>:u.text}</span></div></div>)}
  </Container></div>;
}
function Services({go}){
  return <Section id="leistungen"><SectionHeading align="center" eyebrow="Kompetenzbereiche" title="Unsere" highlight="Leistungen" intro="Kompetenzbereiche, einzeln buchbar oder als kombinierte Lösung." style={{marginBottom:56}}/>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:'var(--grid-gap)'}}>{(()=>{const m=SERVICES.filter(s=>!s.side);const i=m.findIndex(s=>s.id==='ecommerce'),j=m.findIndex(s=>s.id==='reselling');[m[i],m[j]]=[m[j],m[i]];const k=m.findIndex(s=>s.id==='clearance'),l=m.findIndex(s=>s.id==='web');[m[k],m[l]]=[m[l],m[k]];return m})().map(s=><ServiceCard key={s.id} image={s.image} title={s.title} text={s.short} linkLabel="Details" onClick={e=>{e.preventDefault();go(s.id)}}/>)}</div>
    {SERVICES.filter(s=>s.side).map(s=><a key={s.id} href="#" onClick={e=>{e.preventDefault();go(s.id)}} style={{marginTop:'var(--grid-gap)',display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1.4fr)',background:'var(--surface-card)',border:'1px solid var(--border-subtle)',borderRadius:'var(--radius-card)',overflow:'hidden',textDecoration:'none'}}>
      <div style={{minHeight:240,background:'url('+s.image+') center/cover'}}/>
      <div style={{padding:'36px 40px',display:'flex',flexDirection:'column',justifyContent:'center',gap:12}}><Eyebrow>Ergänzende Leistung</Eyebrow><h3 style={{margin:0,font:'700 var(--fs-h3)/1.25 var(--font-display)',textTransform:'uppercase',letterSpacing:'.02em',color:'var(--text-strong)'}}>{s.title}</h3><p style={{margin:0,font:'400 15px/1.6 var(--font-body)',color:'var(--text-body)'}}>{s.short}. KNX-Programmierung, Szenen und Visualisierung für Wohn- und Gewerbeobjekte.</p><span style={{display:'flex',alignItems:'center',gap:8,font:'600 13px var(--font-display)',textTransform:'uppercase',letterSpacing:'.08em',color:'var(--brand-accent)'}}>Details<Icon name="arrow-right" size={16}/></span></div>
    </a>)}
  </Section>;
}
function About({go}){
  return <Section id="ueber" bg="var(--surface-alt)"><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:72,alignItems:'center'}}>
    <div style={{display:'flex',flexDirection:'column',gap:24}}>
      <SectionHeading eyebrow="Inhabergeführt · Worms" title="Über" highlight="uns"/>
      <p style={{margin:0,font:'var(--type-body)',color:'var(--text-body)'}}>Pfalz Loadout ist ein inhabergeführtes Dienstleistungsunternehmen mit Sitz in Worms, gewachsen aus dem E-Commerce. Die Erfahrung aus Handel, Logistik und digitalen Prozessen bildet heute die Grundlage für ein breites Dienstleistungsportfolio.</p>
      <p style={{margin:0,font:'var(--type-body)',color:'var(--text-body)'}}>Wir denken lösungsorientiert, arbeiten strukturiert und legen Wert auf langfristige Geschäftsbeziehungen.</p>
      <CheckList items={USPS}/>
      <span style={{font:'400 15px var(--font-body)',color:'var(--text-body)'}}>Mehrere Bereiche kombinieren? Sprechen Sie uns an.</span>
      <div style={{display:'flex',gap:14}}><Button onClick={()=>go('kontakt')}>Unverbindlich anfragen</Button></div>
    </div>
    <div style={{aspectRatio:'4/3.4',borderRadius:'var(--radius-card)',background:'url('+IMG+'lager-ware.png) center/cover'}}/>
  </div></Section>;
}
function Process(){
  return <Section><SectionHeading align="center" eyebrow="Unser Ablauf" title="Jedes Projekt folgt einem klaren" highlight="Ablauf" style={{marginBottom:64}}/>
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'var(--grid-gap)'}}>{STEPS.map(([n,t,x])=><ProcessStep key={n} dark number={n} title={t} text={x}/>)}</div></Section>;
}
function Region(){
  return <Section id="region" bg="var(--surface-alt)"><div style={{display:'grid',gridTemplateColumns:'1.1fr 1fr',gap:72,alignItems:'center'}}>
    <div style={{aspectRatio:'16/11',borderRadius:'var(--radius-card)',background:'url('+IMG+'pfalz-landschaft.png) center/cover'}}/>
    <div style={{display:'flex',flexDirection:'column',gap:28}}>
      <SectionHeading eyebrow="Region Worms" title="Unser" highlight="Einzugsgebiet" intro="Worms, Frankenthal, Ludwigshafen, Mannheim, Alzey, Grünstadt, Bensheim und Umgebung. Digitale Leistungen erbringen wir standortunabhängig im gesamten deutschsprachigen Raum."/>
      <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>{AREA.map(o=><ServiceChip key={o} dark={false} icon="map-pin">{o}</ServiceChip>)}</div>
    </div></div></Section>;
}
function References(){
  return <Section id="referenzen"><SectionHeading align="center" eyebrow="Kundenstimmen" title="Unsere" highlight="Referenzen" intro="Was Kunden über die Zusammenarbeit mit uns sagen." style={{marginBottom:32}}/>
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:14,marginBottom:48,font:'500 15px var(--font-body)',color:'var(--text-body)'}}><span style={{font:'800 28px var(--font-display)',color:'#fff'}}>[x,x]</span><span style={{display:'flex',gap:2}}>{[0,1,2,3,4].map(i=><Icon key={i} name="star" size={18} color="var(--brand-accent)"/>)}</span><span>aus [Anzahl] Google-Bewertungen</span><Button variant="link" icon="arrow-right">Bewertungen auf Google ansehen</Button></div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'var(--grid-gap)'}}>{REVIEWS.map((r,i)=><TestimonialCard key={i} {...r}/>)}</div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'var(--grid-gap)',marginTop:'var(--grid-gap)'}}>{PROJECTS.map(p=><div key={p.title} style={{background:'var(--surface-card)',border:'1px solid var(--border-subtle)',borderRadius:'var(--radius-card)',padding:24,display:'flex',flexDirection:'column',gap:14}}>
      <div style={{aspectRatio:'3/2',border:'1px dashed var(--border-strong)',display:'flex',alignItems:'center',justifyContent:'center',font:'500 13px var(--font-body)',color:'var(--text-subtle)'}}>{p.ph}</div>
      <h3 style={{margin:0,font:'700 18px/1.3 var(--font-display)',textTransform:'uppercase',color:'#fff'}}>{p.title}</h3><p style={{margin:0,font:'400 15px/1.6 var(--font-body)',color:'var(--text-body)'}}>{p.text}</p></div>)}</div>
  </Section>;
}
function Home({go}){return <Shell page="home" go={go} heroOverlay><Hero go={go}/><TrustStrip/><Services go={go}/><About go={go}/><Process/><Region/>{SHOW_REFERENCES&&<References/>}
  <CtaBand image={IMG+'lagerraum-hoch.png'} title="Lassen Sie uns über Ihr" highlight="Vorhaben sprechen" intro={<>Schildern Sie uns kurz Ihr Anliegen.<br/>Wir melden uns zeitnah mit einem passenden Lösungsvorschlag.</>} primaryLabel="Unverbindlich anfragen" secondaryLabel={CONTACT.phone} onPrimary={()=>go('kontakt')}/></Shell>}
const SHOW_REFERENCES=false;
Object.assign(window,{Home});
