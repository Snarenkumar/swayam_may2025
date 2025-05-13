// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import seedData from "./seedData";

const prisma = new PrismaClient();

async function main() {
  // Iterate through each club category
  for (const [clubName, events] of Object.entries(seedData)) {
    // Create/update the Club
    await prisma.club.upsert({
      where: { name: clubName },
      update: {},
      create: { name: clubName },
    });

    // Create/update Events for this club
    for (const event of events) {
      await prisma.event.upsert({
        where: { id: event.id },
        update: {
          title: event.title,
          clubName: clubName,
        },
        create: {
          id: event.id,
          title: event.title,
          clubName: clubName,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
