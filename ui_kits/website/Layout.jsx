const {TopBar,SiteHeader,SiteFooter}=window.PfalzMultiserviceDesignSystem_8eb026;
function Container({children,style}){return <div style={{maxWidth:'var(--container-max)',margin:'0 auto',padding:'0 var(--gutter)',...style}}>{children}</div>}
function Section({children,bg='var(--surface-page)',style,id}){return <section id={id} style={{background:bg,padding:'var(--section-y) 0',...style}}><Container>{children}</Container></section>}
function Shell({page,go,children,heroOverlay}){
  return <div style={{position:'relative'}}>
    <div style={{position:heroOverlay?'absolute':'relative',left:0,right:0,zIndex:30}}><SiteHeader logoSrc="../../assets/logo.png" logoDarkSrc="../../assets/logo-white.png" nav={NAV} active={page} transparent={heroOverlay} onNavigate={go} phone={null} ctaLabel={null}/></div>
    {children}
    <SiteFooter logoSrc="../../assets/logo-white.png" columns={[]} text={<><br/><br/>Pfalz Multiservice bündelt Dienstleistungen für Unternehmen und Privatkunden in der Region Worms.</>} address={CONTACT.city} phone={CONTACT.phone} email={CONTACT.email} legal={['Impressum','Datenschutz']} socials={[]} company="Pfalz Loadout" onNavigate={go}/>
  </div>;
}
Object.assign(window,{Container,Section,Shell});