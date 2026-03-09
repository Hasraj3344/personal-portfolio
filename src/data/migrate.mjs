// Migration script to populate Supabase database from constants.js
// Run this with: node src/data/migrate.mjs

import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: join(__dirname, '../../.env.local') });

// Import data from constants - you'll need to copy these manually or import them
// For now, let's just set up the structure
const Bio = {
  name: "Haswanth Rajesh Neelam",
  roles: ["Azure Data Engineer", "Data Engineer", "Data Analyst", "UI/UX Designer", "Programmer", "Web Developer"],
  description: "I am a motivated and versatile individual who is always eager to take on new challenges. With a passion for learning, I am dedicated to delivering high-quality results. With a positive attitude and a growth mindset, I am ready to make a meaningful contribution and achieve great things.",
  resume: "https://drive.google.com/file/d/1QdVAagg3Zj8mNV8x3JOCPmRpmTa3GCyM/view?usp=sharing",
  linkedin: "https://www.linkedin.com/in/haswanth-rajesh-neelam-627673198/",
  insta: "https://www.instagram.com/haswanth_rajesh/"
};

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials!');
  console.error('Make sure .env.local exists with:');
  console.error('REACT_APP_SUPABASE_URL=your_url');
  console.error('SUPABASE_SERVICE_ROLE_KEY=your_service_role_key');
  console.error('\nGet your service role key from:');
  console.error('Supabase Dashboard → Project Settings → API → service_role key');
  process.exit(1);
}

// Use service role key for migration (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrateBio() {
  console.log('Migrating Bio data...');

  const { data, error } = await supabase
    .from('bio')
    .upsert([{
      id: 1,
      name: Bio.name,
      roles: Bio.roles,
      description: Bio.description,
      resume_url: Bio.resume,
      linkedin_url: Bio.linkedin,
      instagram_url: Bio.insta
    }], { onConflict: 'id' });

  if (error) {
    console.error('❌ Error migrating bio:', error.message);
    throw error;
  } else {
    console.log('✓ Bio data migrated successfully');
  }
}

async function createAdminCredentials() {
  console.log('Setting up admin credentials...');

  const defaultPassword = 'admin123';
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  const { error } = await supabase
    .from('admin_credentials')
    .upsert([{
      id: 1,
      password_hash: hashedPassword
    }], { onConflict: 'id' });

  if (error) {
    console.error('❌ Error creating admin credentials:', error.message);
    throw error;
  } else {
    console.log('✓ Admin credentials created');
    console.log(`⚠️  Default password is: "${defaultPassword}"`);
    console.log('⚠️  PLEASE CHANGE THIS PASSWORD AFTER FIRST LOGIN!');
  }
}

async function testConnection() {
  console.log('Testing Supabase connection...');

  const { data, error } = await supabase
    .from('bio')
    .select('id')
    .limit(1);

  if (error) {
    console.error('❌ Connection test failed:', error.message);
    console.error('\nPlease check:');
    console.error('1. Have you run database-setup.sql in Supabase?');
    console.error('2. Are your credentials correct in .env.local?');
    console.error('3. Is RLS enabled with proper policies?');
    throw error;
  } else {
    console.log('✓ Connection successful');
  }
}

async function runMigration() {
  console.log('🚀 Starting data migration...\n');

  try {
    await testConnection();
    await migrateBio();
    await createAdminCredentials();

    console.log('\n✅ Migration completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Run: npm start');
    console.log('2. Visit: http://localhost:3000');
    console.log('3. Login at: http://localhost:3000/admin/login');
    console.log('4. Password: admin123');
  } catch (error) {
    console.error('\n❌ Migration failed');
    process.exit(1);
  }
}

runMigration();
