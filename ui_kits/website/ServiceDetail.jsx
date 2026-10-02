const {Button:SB,SectionHeading:SH,CheckList:SCL,ServiceCard:SC,CtaBand:SCB,Icon:SI}=window.PfalzMultiserviceDesignSystem_8eb026;
function PageHero({eyebrow,title,highlight,intro,image,crumbs,go}){
  return <section style={{background:'var(--overlay-hero),url('+image+') center/cover',padding:'96px 0 88px'}}><Container>
    <SH dark level={1} size="h1" eyebrow={eyebrow} title={title} highlight={highlight} intro={intro} maxWidth={720}/>
  </Container></section>;
}
function ServiceDetail({id,go}){
  const s=SERVICES.find(x=>x.id===id)||SERVICES[0];const words=s.title.split(' ');
  const others=SERVICES.filter(x=>x.id!==s.id);
  return <Shell page="leistungen" go={go}>
    <PageHero go={go} eyebrow="Unsere Leistungen" title={words.length>1?words.slice(0,-1).join(' '):''} highlight={words.slice(-1)[0]} intro={s.short} image={s.image} crumbs={['Leistungen',s.title]}/>
    <Section><div style={{display:'grid',gridTemplateColumns:'1.3fr 1fr',gap:72,alignItems:'start'}}>
      <div style={{display:'flex',flexDirection:'column',gap:28}}>
        <SH eyebrow={s.short} title={s.title}/>
        <p style={{margin:0,font:'var(--type-body)',color:'var(--text-body)'}}>{s.text}</p>
        <SCL items={USPS}/>
        <div><SB icon="arrow-right" onClick={()=>go('kontakt',s.title)}>Anfrage zu {s.title}</SB></div>
      </div>
</div></Section>
    <Section bg="var(--surface-alt)"><SH eyebrow="Kombinierbar" title="Weitere" highlight="Leistungen" style={{marginBottom:48}}/>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:20}}>{others.map(o=><SC key={o.id} variant="overlay" image={o.image} title={o.title} text={o.short} onClick={e=>{e.preventDefault();go(o.id)}}/>)}</div></Section>
    <SCB title="Lassen Sie uns über Ihr" highlight="Vorhaben sprechen" intro="Schildern Sie uns kurz Ihr Anliegen. Wir melden uns zeitnah mit einem passenden Lösungsvorschlag." primaryLabel="Unverbindlich anfragen" secondaryLabel={CONTACT.phone} onPrimary={()=>go('kontakt')}/>
  </Shell>;
}
Object.assign(window,{ServiceDetail,PageHero});