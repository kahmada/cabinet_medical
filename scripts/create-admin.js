const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    const email = 'admin@medicare.fr';
    
    // Vérifier si l'admin existe déjà
    const existing = await prisma.patient.findUnique({
      where: { email }
    });

    if (existing) {
      // Mettre à jour pour être admin
      await prisma.patient.update({
        where: { email },
        data: { role: 'admin' }
      });
      console.log('✅ Utilisateur mis à jour en tant qu\'admin');
    } else {
      // Créer le hash du mot de passe
      const hashedPassword = await bcrypt.hash('admin123', 10);

      // Créer l'admin
      const admin = await prisma.patient.create({
        data: {
          email,
          firstName: 'Admin',
          lastName: 'Medicare',
          phone: '+33 1 00 00 00 00',
          password: hashedPassword,
          role: 'admin',
        }
      });

      console.log('✅ Compte admin créé avec succès !');
      console.log('ID:', admin.id);
    }

    console.log('\n📝 Identifiants admin:');
    console.log('Email: admin@medicare.fr');
    console.log('Mot de passe: admin123');
    console.log('\n🔗 Accès: http://localhost:3000/admin');

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
