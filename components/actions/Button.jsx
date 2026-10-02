import React from 'react';
import { Icon } from './Icon.jsx';
const V={
  primary:{bg:'var(--brand-primary)',fg:'var(--text-on-accent)',bd:'var(--brand-primary)',hbg:'var(--brand-primary-hover)',hbd:'var(--brand-primary-hover)',hfg:'var(--text-on-accent)'},
  accent:{bg:'var(--brand-accent)',fg:'var(--pm-navy-950)',bd:'var(--brand-accent)',hbg:'var(--brand-accent-hover)',hbd:'var(--brand-accent-hover)',hfg:'var(--pm-navy-950)'},
  outline:{bg:'transparent',fg:'var(--brand-primary)',bd:'var(--brand-primary)',hbg:'var(--brand-primary)',hbd:'var(--brand-primary)',hfg:'var(--text-on-accent)'},
  'outline-light':{bg:'transparent',fg:'#fff',bd:'#fff',hbg:'#fff',hbd:'#fff',hfg:'var(--pm-black)'},
  link:{bg:'transparent',fg:'var(--brand-primary)',bd:'transparent',hbg:'transparent',hbd:'transparent',hfg:'var(--brand-accent)'}
};
const S={sm:{h:40,px:18,fs:12},md:{h:50,px:28,fs:14},lg:{h:58,px:36,fs:15}};
export function Button({children,variant='primary',size='md',icon,iconLeft,href,disabled,fullWidth,onClick,style={}}){
  const [h,setH]=React.useState(false);const [p,setP]=React.useState(false);
  const v=V[variant]||V.primary,s=S[size]||S.md,isLink=variant==='link';
  const Tag=href?'a':'button';
  return <Tag href={href} onClick={disabled?undefined:onClick} disabled={disabled}
    onMouseEnter={()=>setH(true)} onMouseLeave={()=>{setH(false);setP(false)}} onMouseDown={()=>setP(true)} onMouseUp={()=>setP(false)}
    style={{display:fullWidth?'flex':'inline-flex',width:fullWidth?'100%':undefined,alignItems:'center',justifyContent:'center',gap:10,height:isLink?'auto':s.h,padding:isLink?0:'0 '+s.px+'px',
    font:'600 '+s.fs+'px/1 var(--font-display)',letterSpacing:'var(--ls-button)',textTransform:'uppercase',textDecoration:'none',whiteSpace:'nowrap',
    background:h&&!disabled?v.hbg:v.bg,color:h&&!disabled?v.hfg:v.fg,border:isLink?'none':'2px solid '+(h&&!disabled?v.hbd:v.bd),borderRadius:'var(--radius-button)',
    cursor:disabled?'not-allowed':'pointer',opacity:disabled?.45:1,transform:p&&!disabled?'translateY(1px)':'none',
    transition:'background var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out)',...style}}>
    {iconLeft&&<Icon name={iconLeft} size={s.fs+4}/>}
    {children}
    {icon&&<Icon name={icon} size={s.fs+4} style={{transform:h&&isLink?'translateX(4px)':'none',transition:'transform var(--dur-base) var(--ease-out)'}}/>}
  </Tag>;
}