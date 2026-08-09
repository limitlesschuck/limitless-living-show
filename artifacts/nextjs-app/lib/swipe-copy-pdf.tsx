import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import showConfig from "@/show.config";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    backgroundColor: showConfig.brand.purpleDark,
    borderRadius: 8,
    padding: 24,
    marginBottom: 24,
  },
  showName: {
    fontSize: 10,
    color: showConfig.brand.gold,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  episodeTitle: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  guestName: {
    fontSize: 12,
    color: showConfig.brand.gold,
  },
  sectionLabel: {
    fontSize: 9,
    color: showConfig.brand.gold,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
    marginTop: 20,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: showConfig.brand.gold,
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.6,
  },
  linkBox: {
    backgroundColor: showConfig.brand.purplePale,
    borderRadius: 6,
    padding: 10,
    marginTop: 12,
  },
  linkLabel: {
    fontSize: 8,
    color: showConfig.brand.purpleMuted,
    fontFamily: "Helvetica-Bold",
    marginBottom: 3,
  },
  linkText: {
    fontSize: 9,
    color: showConfig.brand.purpleDark,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: showConfig.brand.grayBorder,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 8,
    color: showConfig.brand.grayTextMuted,
  },
});

interface SwipeCopyPdfProps {
  episodeTitle: string;
  guestName: string;
  episodeUrl: string;
  swipeCopy: string;
  showName: string;
  coverArtUrl?: string;
  thumbnailUrl?: string;
}

function parseSwipeCopy(swipeCopy: string): { socialPost: string; emailSubject: string; emailBody: string } {
  const socialMatch = swipeCopy.match(/SOCIAL MEDIA POST:\s*([\s\S]*?)(?=---|EMAIL SUBJECT:|$)/i);
  const subjectMatch = swipeCopy.match(/EMAIL SUBJECT:\s*(.+?)(?:\n|$)/i);
  const bodyMatch = swipeCopy.match(/EMAIL BODY:\s*([\s\S]*?)(?=$)/i);

  return {
    socialPost: socialMatch?.[1]?.trim() ?? "",
    emailSubject: subjectMatch?.[1]?.trim() ?? "I was just interviewed on Chuck Anderson's Podcast",
    emailBody: bodyMatch?.[1]?.trim() ?? "",
  };
}

export function SwipeCopyPdf({ episodeTitle, guestName, episodeUrl, swipeCopy, showName, coverArtUrl, thumbnailUrl }: SwipeCopyPdfProps) {
  const { socialPost, emailSubject, emailBody } = parseSwipeCopy(swipeCopy);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.showName}>{showName} — Swipe Copy</Text>
          <Text style={styles.episodeTitle}>Podcast Swipe Copy for {guestName}</Text>
          <Text style={styles.guestName}>with {guestName}</Text>
        </View>

        {/* Episode URL */}
        <View style={styles.linkBox}>
          <Text style={styles.linkLabel}>Episode URL</Text>
          <Text style={styles.linkText}>{episodeUrl}</Text>
        </View>

        {coverArtUrl && (
          <View style={[styles.linkBox, { marginTop: 8 }]}>
            <Text style={styles.linkLabel}>Episode Artwork</Text>
            <Text style={styles.linkText}>{coverArtUrl}</Text>
          </View>
        )}
        {thumbnailUrl && (
          <View style={[styles.linkBox, { marginTop: 8 }]}>
            <Text style={styles.linkLabel}>Thumbnail Image</Text>
            <Text style={styles.linkText}>{thumbnailUrl}</Text>
          </View>
        )}

        {/* Social Media Post */}
        <Text style={styles.sectionLabel}>Social Media Post</Text>
        <View style={styles.divider} />
        <Text style={styles.bodyText}>{socialPost}</Text>

        {/* Email */}
        <Text style={styles.sectionLabel}>Email</Text>
        <View style={styles.divider} />
        <View style={[styles.linkBox, { marginBottom: 10 }]}>
          <Text style={styles.linkLabel}>Subject Line</Text>
          <Text style={styles.linkText}>{emailSubject}</Text>
        </View>
        <Text style={styles.bodyText}>{emailBody}</Text>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>{showName}</Text>
          <Text style={styles.footerText}>{showConfig.domain}</Text>
        </View>
      </Page>
    </Document>
  );
}
