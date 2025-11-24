// Script to create an admin user
// Run with: node scripts/create-admin.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@propertyxpert.com' },
    });

    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: admin@propertyxpert.com');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);

    const admin = await prisma.user.create({
      data: {
        email: 'admin@propertyxpert.com',
        passwordHash: hashedPassword,
        name: 'Admin User',
        role: 'ADMIN',
        isActive: true,
        phone: '+91-9999999999',
      },
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@propertyxpert.com');
    console.log('🔑 Password: admin123');
    console.log('');
    console.log('🔗 Login at: http://localhost:3000/admin/login');
    console.log('');
    console.log('⚠️  IMPORTANT: Change the password after first login!');

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();