Black three-column footer (reference: blueskydesignandbuild.com): logo + blurb + plain social icons, centered services list with gold arrow-circle bullets, contact column in gold (address, optional map image, phone, email), legal bar with gold links.
```jsx
<SiteFooter logoSrc="assets/logo-white.png" columns={[{title:'Leistungen',links:['Transport','Lagerung']}]} mapSrc="assets/images/map.jpg"/>
```
Props: `contactTitle`, `legal` (gold links split by "|"), `credit={{name:'…'}}` for an agency credit on the right.
