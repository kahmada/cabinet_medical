const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function setup() {
  console.log('🚀 Configuration complète du système...\n');

  try {
    // 1. Créer l'admin
    const adminEmail = 'admin@medicare.fr';
    let admin = await prisma.patient.findUnique({ where: { email: adminEmail } });
    
    if (!admin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      admin = await prisma.patient.create({
        data: {
          email: adminEmail,
          firstName: 'Admin',
          lastName: 'Medicare',
          phone: '+33 1 00 00 00 00',
          password: hashedPassword,
          role: 'admin',
        }
      });
      console.log('✅ Compte admin créé');
    } else {
      await prisma.patient.update({
        where: { email: adminEmail },
        data: { role: 'admin' }
      });
      console.log('✅ Compte admin vérifié');
    }

    // 2. Créer le patient de démo
    const patientEmail = 'demo.patient@medicare.fr';
    let patient = await prisma.patient.findUnique({ where: { email: patientEmail } });
    
    if (!patient) {
      const hashedPassword = await bcrypt.hash('demo123', 10);
      patient = await prisma.patient.create({
        data: {
          email: patientEmail,
          firstName: 'Demo',
          lastName: 'Patient',
          phone: '+33 1 23 45 67 89',
          password: hashedPassword,
          role: 'patient',
        }
      });
      console.log('✅ Compte patient de démo créé');
    } else {
      console.log('✅ Compte patient de démo vérifié');
    }

    // 3. Statistiques
    const stats = await Promise.all([
      prisma.patient.count(),
      prisma.doctor.count(),
      prisma.appointment.count(),
    ]);

    console.log('\n📊 Statistiques:');
    console.log(`   - Patients: ${stats[0]}`);
    console.log(`   - Médecins: ${stats[1]}`);
    console.log(`   - Rendez-vous: ${stats[2]}`);

    console.log('\n🔑 Comptes de test:');
    console.log('\n   👤 Patient:');
    console.log('      Email: demo.patient@medicare.fr');
    console.log('      Mot de passe: demo123');
    console.log('      URL: http://localhost:3000/espace-patient');
    
    console.log('\n   👨‍💼 Admin:');
    console.log('      Email: admin@medicare.fr');
    console.log('      Mot de passe: admin123');
    console.log('      URL: http://localhost:3000/admin');

    console.log('\n✅ Configuration terminée avec succès !');
    console.log('\n🚀 Démarrez le serveur avec: npm run dev');

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setup();
