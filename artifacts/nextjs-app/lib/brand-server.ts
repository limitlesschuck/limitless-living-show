import showConfig from "@/show.config";
import { prisma } from "@/lib/prisma";
import type { BrandColors } from "@/lib/brand";

export async function getEffectiveBrandColors(): Promise<Required<BrandColors>> {
  let overrides: BrandColors = {};
  try {
    const record = await prisma.siteConfig.findFirst();
    const cfg = record?.config as Record<string, unknown> | null;
    overrides = (cfg?.brandColors as BrandColors) ?? {};
  } catch {
    overrides = {};
  }

  return {
    purple: overrides.purple ?? showConfig.brand.purple,
    purpleDark: overrides.purpleDark ?? showConfig.brand.purpleDark,
    purpleMid: overrides.purpleMid ?? showConfig.brand.purpleMid,
    purpleLight: overrides.purpleLight ?? showConfig.brand.purpleLight,
    gold: overrides.gold ?? showConfig.brand.gold,
    goldLight: overrides.goldLight ?? showConfig.brand.goldLight,
    goldDark: overrides.goldDark ?? showConfig.brand.goldDark,
    headerBg: overrides.headerBg ?? showConfig.brand.headerBg,
    purpleDarker: overrides.purpleDarker ?? showConfig.brand.purpleDarker,
    purplePale: overrides.purplePale ?? showConfig.brand.purplePale,
    purpleTint: overrides.purpleTint ?? showConfig.brand.purpleTint,
    purpleTintBorder: overrides.purpleTintBorder ?? showConfig.brand.purpleTintBorder,
    purpleMuted: overrides.purpleMuted ?? showConfig.brand.purpleMuted,
    purpleVivid: overrides.purpleVivid ?? showConfig.brand.purpleVivid,
    white: overrides.white ?? showConfig.brand.white,
    grayBorder: overrides.grayBorder ?? showConfig.brand.grayBorder,
    grayText: overrides.grayText ?? showConfig.brand.grayText,
    grayTextMuted: overrides.grayTextMuted ?? showConfig.brand.grayTextMuted,
    grayMuted: overrides.grayMuted ?? showConfig.brand.grayMuted,
    adminAccent: overrides.adminAccent ?? showConfig.brand.adminAccent,
    adminAccentLight: overrides.adminAccentLight ?? showConfig.brand.adminAccentLight,
  };
}

export async function getBrandColorCssVars(): Promise<Record<string, string>> {
  const colors = await getEffectiveBrandColors();

  return {
    "--brand-purple": colors.purple,
    "--brand-purple-dark": colors.purpleDark,
    "--brand-purple-mid": colors.purpleMid,
    "--brand-purple-light": colors.purpleLight,
    "--brand-gold": colors.gold,
    "--brand-gold-light": colors.goldLight,
    "--brand-gold-dark": colors.goldDark,
    "--brand-header-bg": colors.headerBg,
    "--brand-purple-darker": colors.purpleDarker,
    "--brand-purple-pale": colors.purplePale,
    "--brand-purple-tint": colors.purpleTint,
    "--brand-purple-tint-border": colors.purpleTintBorder,
    "--brand-purple-muted": colors.purpleMuted,
    "--brand-purple-vivid": colors.purpleVivid,
    "--brand-white": colors.white,
    "--brand-gray-border": colors.grayBorder,
    "--brand-gray-text": colors.grayText,
    "--brand-gray-text-muted": colors.grayTextMuted,
    "--brand-gray-muted": colors.grayMuted,
    "--brand-admin-accent": colors.adminAccent,
    "--brand-admin-accent-light": colors.adminAccentLight,
  };
}
