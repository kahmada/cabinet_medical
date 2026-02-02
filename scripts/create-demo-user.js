const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    // Vérifier si l'utilisateur existe déjà
    const existing = await prisma.patient.findUnique({
      where: { email: 'demo.patient@medicare.fr' }
    });

    if (existing) {
      console.log('✅ L\'utilisateur de démonstration existe déjà');
      console.log('Email: demo.patient@medicare.fr');
      console.log('Mot de passe: demo123');
      return;
    }

    // Créer le hash du mot de passe
    const hashedPassword = await bcrypt.hash('demo123', 10);

    // Créer l'utilisateur
    const patient = await prisma.patient.create({
      data: {
        email: 'demo.patient@medicare.fr',
        firstName: 'Demo',
        lastName: 'Patient',
        phone: '+33 1 23 45 67 89',
        password: hashedPassword,
      }
    });

    console.log('✅ Utilisateur de démonstration créé avec succès !');
    console.log('Email:', patient.email);
    console.log('Mot de passe: demo123');
    console.log('ID:', patient.id);

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
