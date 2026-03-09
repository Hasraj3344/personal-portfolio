// Migration script to populate Supabase database from constants.js
// Run this once to migrate your data: node src/data/migrate.js

const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

// Import data from constants
const { Bio, skills, experiences, education, projects } = require('./constants');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

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
    console.error('Error migrating bio:', error);
  } else {
    console.log('✓ Bio data migrated successfully');
  }
}

async function migrateSkills() {
  console.log('Migrating Skills data...');

  // First, migrate skill categories
  for (let i = 0; i < skills.length; i++) {
    const category = skills[i];

    const { data: categoryData, error: categoryError } = await supabase
      .from('skill_categories')
      .insert([{
        title: category.title,
        order_index: i
      }])
      .select()
      .single();

    if (categoryError) {
      console.error(`Error migrating category ${category.title}:`, categoryError);
      continue;
    }

    console.log(`✓ Category "${category.title}" migrated`);

    // Then migrate skills for this category
    for (let j = 0; j < category.skills.length; j++) {
      const skill = category.skills[j];

      const { error: skillError } = await supabase
        .from('skills')
        .insert([{
          category_id: categoryData.id,
          name: skill.name,
          image_url: skill.image,
          order_index: j
        }]);

      if (skillError) {
        console.error(`Error migrating skill ${skill.name}:`, skillError);
      }
    }
  }

  console.log('✓ All skills migrated successfully');
}

async function migrateExperiences() {
  console.log('Migrating Experience data...');

  for (let i = 0; i < experiences.length; i++) {
    const exp = experiences[i];

    const { error } = await supabase
      .from('experiences')
      .insert([{
        company_logo_url: typeof exp.img === 'string' ? exp.img : null,
        role: exp.role,
        company: exp.company,
        date_range: exp.date,
        description: exp.desc,
        skills_used: exp.skills || [],
        order_index: i
      }]);

    if (error) {
      console.error(`Error migrating experience ${exp.role}:`, error);
    } else {
      console.log(`✓ Experience "${exp.role}" migrated`);
    }
  }

  console.log('✓ All experiences migrated successfully');
}

async function migrateEducation() {
  console.log('Migrating Education data...');

  for (let i = 0; i < education.length; i++) {
    const edu = education[i];

    const { error } = await supabase
      .from('education')
      .insert([{
        school_logo_url: edu.img,
        school_name: edu.school,
        degree: edu.degree,
        date_range: edu.date,
        grade: edu.grade,
        description: edu.desc,
        order_index: i
      }]);

    if (error) {
      console.error(`Error migrating education ${edu.school}:`, error);
    } else {
      console.log(`✓ Education "${edu.school}" migrated`);
    }
  }

  console.log('✓ All education migrated successfully');
}

async function migrateProjects() {
  console.log('Migrating Projects data...');

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];

    const { error } = await supabase
      .from('projects')
      .insert([{
        title: project.title,
        date_range: project.date,
        description: project.description,
        image_url: typeof project.image === 'string' ? project.image : null,
        tags: project.tags || [],
        category: project.category,
        github_url: project.github || null,
        webapp_url: project.webapp || null,
        order_index: i
      }]);

    if (error) {
      console.error(`Error migrating project ${project.title}:`, error);
    } else {
      console.log(`✓ Project "${project.title}" migrated`);
    }
  }

  console.log('✓ All projects migrated successfully');
}

async function createAdminCredentials() {
  console.log('Setting up admin credentials...');

  // Default password - CHANGE THIS!
  const defaultPassword = 'admin123';
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  const { error } = await supabase
    .from('admin_credentials')
    .upsert([{
      id: 1,
      password_hash: hashedPassword
    }], { onConflict: 'id' });

  if (error) {
    console.error('Error creating admin credentials:', error);
  } else {
    console.log('✓ Admin credentials created');
    console.log(`⚠️  Default password is: "${defaultPassword}"`);
    console.log('⚠️  PLEASE CHANGE THIS PASSWORD AFTER FIRST LOGIN!');
  }
}

async function runMigration() {
  console.log('Starting data migration...\n');

  try {
    await migrateBio();
    await migrateSkills();
    await migrateExperiences();
    await migrateEducation();
    await migrateProjects();
    await createAdminCredentials();

    console.log('\n✅ Migration completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Go to your Supabase project');
    console.log('2. Enable Row Level Security (RLS) on all tables');
    console.log('3. Add policies for public read access');
    console.log('4. Test your application');
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
