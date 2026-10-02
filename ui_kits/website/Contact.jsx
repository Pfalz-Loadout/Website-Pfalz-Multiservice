const {Button:CB,TextField,SelectField,Icon:CI,SectionHeading:CSH}=window.PfalzMultiserviceDesignSystem_8eb026;
function Contact({go,initial}){
  const [sent,setSent]=React.useState(false);const [email,setEmail]=React.useState('');const [err,setErr]=React.useState('');const [ok,setOk]=React.useState(false);
  const submit=()=>{if(!/.+@.+\..+/.test(email)){setErr('Bitte geben Sie eine gültige E-Mail-Adresse an.');return}setErr('');setSent(true)};
  const row=(i,l,v,href)=><a href={href} style={{display:'flex',gap:16,alignItems:'flex-start',textDecoration:'none'}}><span style={{flex:'none',width:44,height:44,background:'var(--brand-accent)',color:'var(--text-on-accent)',display:'flex',alignItems:'center',justifyContent:'center'}}><CI name={i} size={20}/></span><div><div style={{font:'600 12px var(--font-display)',letterSpacing:'.14em',textTransform:'uppercase',color:'var(--text-subtle)'}}>{l}</div><div style={{font:'600 17px/1.45 var(--font-display)',color:href?'var(--brand-accent)':'var(--text-strong)'}}>{v}</div></div></a>;
  return <Shell page="kontakt" go={go}>
    <PageHero go={go} eyebrow="Kontakt" title="Lassen Sie uns über Ihr" highlight="Vorhaben sprechen" intro="Schildern Sie uns kurz Ihr Anliegen. Wir melden uns zeitnah mit einem passenden Lösungsvorschlag." image={IMG+'lagergang.png'} crumbs={['Kontakt']}/>
    <Section><div style={{display:'grid',gridTemplateColumns:'1fr 1.5fr',gap:72,alignItems:'start'}}>
      <div style={{display:'flex',flexDirection:'column',gap:28}}>
        <CSH eyebrow="Schnell erreichbar" title="Direkter" highlight="Kontakt"/>
        {row('phone','Telefon',CONTACT.phone,'tel:+491605086983')}{row('message-circle','WhatsApp','Nachricht schreiben',CONTACT.whatsapp)}{row('mail','E-Mail',CONTACT.email,'mailto:'+CONTACT.email)}{row('map-pin','Standort',CONTACT.city)}
        <CB variant="outline-light" iconLeft="message-circle" href={CONTACT.whatsapp}>WhatsApp-Chat starten</CB>
      </div>
      <div style={{background:'var(--surface-card)',border:'1px solid var(--border-subtle)',borderRadius:'var(--radius-card)',padding:40}}>
        {sent?<div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:18,padding:'40px 0'}}>
          <span style={{width:56,height:56,background:'var(--brand-accent)',color:'var(--text-on-accent)',display:'flex',alignItems:'center',justifyContent:'center'}}><CI name="check" size={28}/></span>
          <h3 style={{margin:0,font:'800 32px/1.2 var(--font-display)',letterSpacing:'var(--ls-display)',textTransform:'uppercase',color:'var(--text-strong)'}}>Vielen <strong style={{fontWeight:'inherit',color:'var(--text-highlight)'}}>Dank</strong></h3>
          <p style={{margin:0,font:'var(--type-body)',color:'var(--text-muted)'}}>Wir melden uns zeitnah mit einem passenden Lösungsvorschlag.</p>
          <CB variant="outline" onClick={()=>go('home')}>Zur Startseite</CB></div>
        :<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
          <TextField label="Name" required/><TextField label="Unternehmen"/>
          <TextField label="E-Mail" required type="email" value={email} onChange={e=>setEmail(e.target.value)} error={err}/><TextField label="Telefon"/>
          <div style={{gridColumn:'1/-1'}}><SelectField label="Leistungsbereich" value={initial||'Allgemeine Anfrage'} options={['Allgemeine Anfrage',...SERVICES.map(s=>s.title)]}/></div>
          <div style={{gridColumn:'1/-1'}}><TextField label="Nachricht" required multiline/></div>
          <label style={{gridColumn:'1/-1',display:'flex',gap:12,alignItems:'flex-start',cursor:'pointer',font:'400 14px/1.6 var(--font-body)',color:'var(--text-body)'}}><span onClick={()=>setOk(!ok)} style={{flex:'none',width:20,height:20,marginTop:2,border:'2px solid '+(ok?'var(--brand-accent)':'var(--border-strong)'),background:ok?'var(--brand-accent)':'transparent',color:'var(--text-on-accent)',display:'flex',alignItems:'center',justifyContent:'center'}}>{ok&&<CI name="check" size={14}/>}</span><span onClick={()=>setOk(!ok)}>Ich stimme zu, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden. Details in der <a href="#" onClick={e=>{e.preventDefault();e.stopPropagation();go('datenschutz')}} style={{color:'var(--brand-accent)'}}>Datenschutzerklärung</a>.</span></label>
          <div style={{gridColumn:'1/-1',display:'flex',justifyContent:'space-between',alignItems:'center',gap:20,flexWrap:'wrap'}}><span style={{font:'400 13px var(--font-body)',color:'var(--text-subtle)'}}>* Pflichtfelder</span><CB onClick={submit} disabled={!ok}>Anfrage senden</CB></div>
        </div>}
      </div></div></Section>
  </Shell>;
}
Object.assign(window,{Contact});
