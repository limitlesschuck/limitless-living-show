import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create super admin user
  const passwordHash = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@limitlesslivingshow.com" },
    update: {},
    create: {
      email: "admin@limitlesslivingshow.com",
      name: "Admin",
      password: passwordHash,
      role: "super_admin",
    },
  });

  console.log("Created admin user:", admin.email);

  // Seed the six crisis category CTAs
  const ctas = [
    {
      crisisCategory: "grief",
      headline: "Struggling with grief or loss?",
      subtext: "You don't have to go through this alone.",
      buttonLabel: "Find your path forward",
    },
    {
      crisisCategory: "relationship",
      headline: "Going through a divorce or relationship crisis?",
      subtext: "Discover what support is available to you.",
      buttonLabel: "Get personalised guidance",
    },
    {
      crisisCategory: "health",
      headline: "Dealing with a health or addiction challenge?",
      subtext: "Hear from others who have been where you are.",
      buttonLabel: "Find the right support",
    },
    {
      crisisCategory: "financial",
      headline: "Facing financial hardship or reinvention?",
      subtext: "Learn what is possible on the other side.",
      buttonLabel: "Explore your options",
    },
    {
      crisisCategory: "spiritual",
      headline: "Going through a spiritual awakening or identity shift?",
      subtext: "You are not alone in this journey.",
      buttonLabel: "Find your direction",
    },
    {
      crisisCategory: "career",
      headline: "Navigating a career change or searching for purpose?",
      subtext: "Real stories from people who made the leap.",
      buttonLabel: "Start your assessment",
    },
  ];

  for (const cta of ctas) {
    await prisma.cta.upsert({
      where: { crisisCategory: cta.crisisCategory },
      update: cta,
      create: { ...cta, assessmentEntry: true },
    });
  }

  console.log("Seeded 6 crisis category CTAs");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
