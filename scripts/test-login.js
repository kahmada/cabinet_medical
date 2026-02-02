const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testLogin() {
  try {
    console.log('🔍 Test de connexion...\n');

    // Récupérer l'utilisateur
    const patient = await prisma.patient.findUnique({
      where: { email: 'demo.patient@medicare.fr' }
    });

    if (!patient) {
      console.log('❌ Utilisateur non trouvé');
      return;
    }

    console.log('✅ Utilisateur trouvé:');
    console.log('  - Email:', patient.email);
    console.log('  - Nom:', patient.firstName, patient.lastName);
    console.log('  - ID:', patient.id);
    console.log('  - Hash du mot de passe:', patient.password.substring(0, 20) + '...');

    // Tester le mot de passe
    const passwordMatch = await bcrypt.compare('demo123', patient.password);
    
    if (passwordMatch) {
      console.log('\n✅ Mot de passe correct !');
      console.log('\n📝 Utilisez ces identifiants:');
      console.log('  Email: demo.patient@medicare.fr');
      console.log('  Mot de passe: demo123');
    } else {
      console.log('\n❌ Mot de passe incorrect');
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testLogin();
