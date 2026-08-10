export interface BrandColors {
  purple?: string;
  purpleDark?: string;
  purpleMid?: string;
  purpleLight?: string;
  gold?: string;
  goldLight?: string;
  goldDark?: string;
  headerBg?: string;
  purpleDarker?: string;
  purplePale?: string;
  purpleTint?: string;
  purpleTintBorder?: string;
  purpleMuted?: string;
  purpleVivid?: string;
  white?: string;
  grayBorder?: string;
  grayText?: string;
  grayTextMuted?: string;
  grayMuted?: string;
  adminAccent?: string;
  adminAccentLight?: string;
}

export const COLOR_LABELS: Record<keyof BrandColors, string> = {
  purple: "Primary color — hero background, nav badges, episode category pills",
  purpleDark: "Primary dark — footer background, hero headline text, dark section backgrounds",
  purpleMid: "Primary mid — hover state on primary elements",
  purpleLight: "Primary light — lighter accents and borders",
  gold: "Accent color — CTA buttons, footer background (if inverted scheme)",
  goldLight: "Accent light — hover state on accent buttons",
  goldDark: "Accent dark — pressed/active accent button state",
  headerBg: "Header background — the top navigation bar",
  purpleDarker: "Deepest dark — PDF guide header background",
  purplePale: "Pale tint — light section backgrounds (e.g. episode guide promo box)",
  purpleTint: "Lightest tint — very subtle section backgrounds",
  purpleTintBorder: "Tint border — borders on pale tinted sections",
  purpleMuted: "Muted primary — secondary text on colored backgrounds",
  purpleVivid: "Vivid primary — emphasis text on light backgrounds",
  white: "White — card backgrounds, modal backgrounds",
  grayBorder: "Gray border — card and input borders",
  grayText: "Gray text — body text on white backgrounds",
  grayTextMuted: "Gray text muted — secondary/helper text",
  grayMuted: "Gray muted — PDF checkbox borders, subtle UI elements",
  adminAccent: "Admin accent — buttons and highlights in the admin panel",
  adminAccentLight: "Admin accent light — hover state on admin accent buttons",
};
