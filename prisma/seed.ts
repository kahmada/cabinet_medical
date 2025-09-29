import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Photos disponibles
const availablePhotos = [
  "/f1.jpeg",
  "/f2.jpeg", 
  "/f3.webp",
  "/m1.jpeg",
  "/m2.jpeg",
  "/m3.webp"
];

// Fonction pour mélanger un tableau (algorithme Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Fonction pour obtenir une photo aléatoire
function getRandomPhoto(): string {
  const randomIndex = Math.floor(Math.random() * availablePhotos.length);
  return availablePhotos[randomIndex];
}

async function main() {
  // Specialties
  const specialties = await prisma.$transaction([
    prisma.specialty.upsert({ where: { name: "Cardiologie" }, update: {}, create: { name: "Cardiologie" } }),
    prisma.specialty.upsert({ where: { name: "Dermatologie" }, update: {}, create: { name: "Dermatologie" } }),
    prisma.specialty.upsert({ where: { name: "Pédiatrie" }, update: {}, create: { name: "Pédiatrie" } }),
    prisma.specialty.upsert({ where: { name: "Généraliste" }, update: {}, create: { name: "Généraliste" } }),
  ]);

  // Locations
  const locations = await prisma.$transaction([
    prisma.location.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: "Centre Médical Paris Centre",
        address: "12 rue de la Santé",
        city: "Paris",
        country: "France",
      },
    }),
    prisma.location.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: "Clinique Montparnasse",
        address: "45 boulevard Montparnasse",
        city: "Paris",
        country: "France",
      },
    }),
    prisma.location.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: "Centre Médical Lyon",
        address: "8 place Bellecour",
        city: "Lyon",
        country: "France",
      },
    }),
  ]);

  // Doctors avec photos aléatoires
  const doctors = await prisma.$transaction([
    // Paris Centre
    prisma.doctor.create({
      data: {
        firstName: "Alice",
        lastName: "Martin",
        experienceYrs: 10,
        degrees: "MD, DES Cardiologie",
        bio: "Cardiologue spécialisée en prévention cardiovasculaire et suivi des pathologies cardiaques chroniques.",
        locationId: locations[0].id,
        photoUrl: getRandomPhoto(),
        specialties: { connect: [{ id: specialties[0].id }] }, // Cardiologie
      },
    }),
    prisma.doctor.create({
      data: {
        firstName: "Hugo",
        lastName: "Bernard",
        experienceYrs: 7,
        degrees: "MD, DES Dermatologie",
        bio: "Dermatologue expérimenté, spécialisé dans la prise en charge de l'acné, l'eczéma et le dépistage du cancer de la peau.",
        locationId: locations[0].id,
        photoUrl: getRandomPhoto(),
        specialties: { connect: [{ id: specialties[1].id }] }, // Dermatologie
      },
    }),
    prisma.doctor.create({
      data: {
        firstName: "Sofia",
        lastName: "Lopez",
        experienceYrs: 5,
        degrees: "MD, Pédiatrie",
        bio: "Pédiatre bienveillante, spécialisée dans le suivi des nourrissons, enfants et adolescents.",
        locationId: locations[0].id,
        photoUrl: getRandomPhoto(),
        specialties: { connect: [{ id: specialties[2].id }] }, // Pédiatrie
      },
    }),
    
    // Montparnasse
    prisma.doctor.create({
      data: {
        firstName: "Thomas",
        lastName: "Dubois",
        experienceYrs: 15,
        degrees: "MD, Médecine Générale",
        bio: "Médecin généraliste expérimenté, consultation générale et médecine préventive.",
        locationId: locations[1].id,
        photoUrl: getRandomPhoto(),
        specialties: { connect: [{ id: specialties[3].id }] }, // Généraliste
      },
    }),
    prisma.doctor.create({
      data: {
        firstName: "Marie",
        lastName: "Rousseau",
        experienceYrs: 12,
        degrees: "MD, DES Cardiologie",
        bio: "Cardiologue interventionnelle, spécialisée dans les pathologies coronariennes et l'insuffisance cardiaque.",
        locationId: locations[1].id,
        photoUrl: getRandomPhoto(),
        specialties: { connect: [{ id: specialties[0].id }] }, // Cardiologie
      },
    }),
    
    // Lyon
    prisma.doctor.create({
      data: {
        firstName: "Pierre",
        lastName: "Moreau",
        experienceYrs: 8,
        degrees: "MD, DES Dermatologie",
        bio: "Dermatologue spécialisé en dermatologie esthétique et médicale, traitement des maladies de peau.",
        locationId: locations[2].id,
        photoUrl: getRandomPhoto(),
        specialties: { connect: [{ id: specialties[1].id }] }, // Dermatologie
      },
    }),
    prisma.doctor.create({
      data: {
        firstName: "Camille",
        lastName: "Petit",
        experienceYrs: 6,
        degrees: "MD, Pédiatrie",
        bio: "Pédiatre passionnée, consultations de suivi, vaccination et urgences pédiatriques.",
        locationId: locations[2].id,
        photoUrl: getRandomPhoto(),
        specialties: { connect: [{ id: specialties[2].id }] }, // Pédiatrie
      },
    }),
    prisma.doctor.create({
      data: {
        firstName: "Jean",
        lastName: "Leroy",
        experienceYrs: 20,
        degrees: "MD, Médecine Générale",
        bio: "Médecin généraliste senior, médecine familiale et gériatrie.",
        locationId: locations[2].id,
        photoUrl: getRandomPhoto(),
        specialties: { connect: [{ id: specialties[3].id }] }, // Généraliste
      },
    }),
  ]);

  // Slots for the next few days (simple demo slots)
  const now = new Date();
  const days = 3;
  const slotDurationMin = 30;
  const startHour = 9; // 09:00
  const endHour = 12; // 12:00

  for (const doc of doctors) {
    for (let d = 0; d < days; d++) {
      const day = new Date(now);
      day.setHours(0, 0, 0, 0);
      day.setDate(now.getDate() + d + 1); // start tomorrow

      for (let h = startHour; h < endHour; h++) {
        for (let m = 0; m < 60; m += slotDurationMin) {
          const start = new Date(day);
          start.setHours(h, m, 0, 0);
          const end = new Date(start);
          end.setMinutes(start.getMinutes() + slotDurationMin);

          await prisma.slot.create({
            data: {
              doctorId: doc.id,
              start,
              end,
            },
          });
        }
      }
    }
  }

  // Demo patient
  const hashedPassword = await bcrypt.hash("demo123", 10);
  await prisma.patient.upsert({
    where: { email: "demo.patient@medicare.fr" },
    update: {},
    create: {
      email: "demo.patient@medicare.fr",
      phone: "+33123456789",
      firstName: "Demo",
      lastName: "Patient",
      password: hashedPassword,
    },
  });

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
