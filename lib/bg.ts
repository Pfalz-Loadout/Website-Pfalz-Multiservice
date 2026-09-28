/** Hintergrundbild mit edlem Fallback-Verlauf, falls das Foto (noch) fehlt */
export function bg(url: string) {
  return {
    backgroundImage: `url(${url}), radial-gradient(120% 90% at 70% 30%, #3a2c0f 0%, #16110a 45%, #050505 100%)`,
  } as const;
}
