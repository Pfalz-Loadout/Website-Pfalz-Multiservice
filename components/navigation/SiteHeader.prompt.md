Primary header: logo left, dropdown nav, phone block + CTA right. Use `transparent` over the dark hero, solid white elsewhere.
```jsx
<SiteHeader logoSrc="assets/logo.png" logoDarkSrc="assets/logo-white.png" nav={[{label:'Leistungen',children:[{label:'Transport',icon:'truck'}]},{label:'Kontakt'}]}/>
```
- Dropdown: white panel, 3px signal-blue top rule, shadow-lg.