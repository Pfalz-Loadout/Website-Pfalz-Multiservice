import React from 'react';
const CDN='https://unpkg.com/lucide-static@0.460.0/icons/';
export function Icon({name='arrow-right',size=20,color='currentColor',style={},...rest}){
  const url='url('+CDN+name+'.svg)';
  return <span aria-hidden="true" {...rest} style={{display:'inline-block',flex:'none',width:size,height:size,background:color,WebkitMask:url+' center/contain no-repeat',mask:url+' center/contain no-repeat',...style}}/>;
}