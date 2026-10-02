import React from 'react';
import { SectionHeading } from './SectionHeading.jsx';
import { Button } from '../actions/Button.jsx';
export function CtaBand({eyebrow='Jetzt starten',title,highlight,intro,primaryLabel='Kostenloses Angebot',secondaryLabel,onPrimary,onSecondary,image}){
  return <section style={{position:'relative',background:image?'linear-gradient(rgba(3,11,23,.86),rgba(3,11,23,.86)),url('+image+') center/cover':'var(--surface-dark)',padding:'var(--section-y) var(--gutter)',overflow:'hidden'}}>
    <div style={{position:'relative',maxWidth:'var(--container-narrow)',margin:'0 auto',display:'flex',flexDirection:'column',alignItems:'center',gap:36}}>
      <SectionHeading dark align="center" eyebrow={eyebrow} title={title} highlight={highlight} intro={intro}/>
      <div style={{display:'flex',gap:14,flexWrap:'wrap',justifyContent:'center'}}>
        <Button variant="accent" size="lg" icon="arrow-right" onClick={onPrimary}>{primaryLabel}</Button>
        {secondaryLabel&&<Button variant="outline-light" size="lg" iconLeft="phone" onClick={onSecondary}>{secondaryLabel}</Button>}
      </div></div></section>;
}