// Complete migration script - migrates ALL data from constants.js
// Run: node migrate-all-data.mjs

import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: join(__dirname, '.env.local') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ========== DATA FROM constants.js ==========

const Bio = {
  name: "Haswanth Rajesh Neelam",
  roles: ["Azure Data Engineer", "Data Engineer", "Data Analyst", "UI/UX Designer", "Programmer", "Web Developer"],
  description: "I am a motivated and versatile individual who is always eager to take on new challenges. With a passion for learning, I am dedicated to delivering high-quality results. With a positive attitude and a growth mindset, I am ready to make a meaningful contribution and achieve great things.",
  resume: "https://docs.google.com/document/d/1hwCAJffQmDt64awhPSeMmhvaoS-SLRNmcj1Yv-MLw4U/edit?usp=sharing",
  linkedin: "https://www.linkedin.com/in/haswanth-rajesh-neelam-627673198/",
  insta: "https://www.instagram.com/haswanth_rajesh/"
};

const skills = [
  {
    title: "Frontend",
    skills: [
      { name: "React Js", image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" },
      { name: "HTML", image: "https://www.w3.org/html/logo/badge/html5-badge-h-solo.png" },
      { name: "CSS", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1452px-CSS3_logo_and_wordmark.svg.png" },
      { name: "JavaScript", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png" },
      { name: "Bootstrap", image: "https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png" }
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node Js", image: "https://nodejs.org/static/images/logo.svg" },
      { name: "Python", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
      { name: "MySQL", image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" },
      { name: "Postgresql", image: "https://www.postgresql.org/media/img/about/press/elephant.png" }
    ]
  },
  {
    title: "Cloud",
    skills: [
      { name: "AWS Redshift", image: "https://upload.wikimedia.org/wikipedia/commons/7/73/Amazon-Redshift-Logo.svg" },
      { name: "AWS S3", image: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Amazon-S3-Logo.svg" },
      { name: "Azure Data Factory", image: "https://swimburger.net/media/ppnn3pcl/azure.png" },
      { name: "Azure Blob Storage", image: "https://swimburger.net/media/ppnn3pcl/azure.png" },
      { name: "CosmosDb", image: "https://swimburger.net/media/ppnn3pcl/azure.png" },
      { name: "DataBricks", image: "https://asset.brandfetch.io/idSUrLOIrQ/idm22vLcmV.png" },
      { name: "Azure Storage Accounts", image: "https://swimburger.net/media/ppnn3pcl/azure.png" },
      { name: "Power Bi", image: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" },
      { name: "Azure Synapse", image: "https://swimburger.net/media/ppnn3pcl/azure.png" }
    ]
  },
  {
    title: "Others",
    skills: [
      { name: "Git", image: "https://camo.githubusercontent.com/fbfcb9e3dc648adc93bef37c718db16c52f617ad055a26de6dc3c21865c3321d/68747470733a2f2f7777772e766563746f726c6f676f2e7a6f6e652f6c6f676f732f6769742d73636d2f6769742d73636d2d69636f6e2e737667" },
      { name: "GitHub", image: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" },
      { name: "VS Code", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/512px-Visual_Studio_Code_1.35_icon.svg.png" },
      { name: "Postman", image: "https://camo.githubusercontent.com/93b32389bf746009ca2370de7fe06c3b5146f4c99d99df65994f9ced0ba41685/68747470733a2f2f7777772e766563746f726c6f676f2e7a6f6e652f6c6f676f732f676574706f73746d616e2f676574706f73746d616e2d69636f6e2e737667" },
      { name: "Adobe Experience Platform", image: "https://experienceleague.adobe.com/icons/adobe-red-logo.svg" },
      { name: "Adobe Journey Optimizer", image: "https://experienceleague.adobe.com/solutions/icons/JourneyOrchestration.svg" }
    ]
  }
];

const experiences = [
  {
    role: "Azure Data Engineer",
    company: "DatafactZ LLC",
    date: "July 2023 - Present",
    desc: "Designed and automated data pipelines to process large datasets efficiently. Developed and optimized SQL queries for performance improvement. Managed database schema and data warehouse infrastructure. Troubleshooted data pipeline issues and ensured high availability. Collaborated with analysts and engineers to develop analytics solutions.",
    skills: ["Azure Data Factory", "Azure Pipelines", "AWS", "EC2", "AWS Redshift", "Azure Blob storage", "PowerBi"],
    img: "https://media.licdn.com/dms/image/v2/C4E0BAQHw7XqLjsLxSA/company-logo_200_200/company-logo_200_200/0/1631346614046?e=2147483647&v=beta&t=X7fHCcPl9vQ4YHKx_9E7dLZ5MBJQXxKP0o6fHj6fQxI"
  },
  {
    role: "Data Architect",
    company: "DatafactZ LLC",
    date: "July 2021 - August 2022",
    desc: "Designed and implemented scalable data lakehouse solutions using Azure Databricks and Delta Lake. Developed medallion architecture pipelines (Bronze → Silver → Gold) for structured and semi-structured data. Managed data ingestion from diverse sources using Auto Loader, Kafka, and Azure Data Factory. Defined data models, schemas, and governance standards to support analytics and ML workflows. Applied performance tuning techniques (Z-Ordering, Bloom Filters, Partitioning, AQE) for optimal query efficiency.",
    skills: ["Azure Databricks", "Delta Lake", "Medallion Architecture", "Azure Data Factory", "Power BI", "SQL", "Python", "Spark"],
    img: "https://media.licdn.com/dms/image/v2/C4E0BAQHw7XqLjsLxSA/company-logo_200_200/company-logo_200_200/0/1631346614046?e=2147483647&v=beta&t=X7fHCcPl9vQ4YHKx_9E7dLZ5MBJQXxKP0o6fHj6fQxI"
  }
];

const education = [
  {
    school: "University of Texas At Arlington, Arlington, Texas, USA",
    date: "Aug 2022 - May 2024",
    grade: "3.01 GPA",
    desc: "I am a recent Grad from UTA where I gained hands-on experience in building full-stack web applications and data-driven systems. Worked on projects involving ETL pipelines, data warehouse design, and dashboard development using tools like Tableau, Python, SQL, and ReactJS. Demonstrated skills in machine learning, cloud computing, and database management across academic and internship projects. Strengthened technical proficiency in data processing, visualization, and statistical analysis through academic coursework and practical applications.",
    degree: "Masters, Computer Science",
    img: "https://resources.uta.edu/_images/template/uta-logo.png"
  },
  {
    school: "Amrita Vishwa Vidyapeetham, Coimbatore, Tamil Nadu, India",
    date: "June 2018 - May 2022",
    grade: "7.7 CGPA",
    desc: "I hold a Bachelor's degree in Computer Science and Engineering from Amrita Vishwa Vidyapeetham, Coimbatore. During my undergraduate studies, I completed core courses such as Data Structures, Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, and Computer Networks, among others. I was an active member of the Sahaya Club and the National Service Scheme (NSS), contributing to various community service initiatives. Additionally, I served as the Team Manager for the Planning and Resources Team during ANOKHA Tech Fest, where I gained valuable experience in coordination, leadership, and event management.",
    degree: "Bachelor of Technology - BTech, Computer Science and Engineering",
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Amrita_Vishwa_Vidyapeetham_-_Logo_Icon.svg/1200px-Amrita_Vishwa_Vidyapeetham_-_Logo_Icon.svg.png"
  }
];

const projects = [
  {
    title: "AI Driven Job Application Portal",
    date: "Present",
    description: "A Job Finding App made with React Native, Axios. Users can search for any job coming from API and apply there. User registers and uploads a resume which in background runs a similarity check and displays jobs descending order of similarity score. Then openAi rewrites the resume and displays for editing and applies for the job by filling the application.",
    image: "https://via.placeholder.com/400x200?text=Job+Portal",
    tags: ["React Js", "Node Js", "Express Js", "JavaScript", "SQL", "Supabase", "OpenAI API", "Tailwind CSS", "HTML", "Adzuna API", "Axios", "Vercel", "Render", "PostgreSQL"],
    category: "web app",
    github: "https://github.com",
    webapp: "https://example.com"
  },
  {
    title: "Health Consultancy",
    date: "Jun 2024 - May 2024",
    description: "This is a web application where patients can book their appointments with a respective doctor, view all the prescriptions given to the patient, and view their billing data like receipts. Built an automated ETL pipeline for processing patient data. Designed a normalized relational schema for optimized storage",
    image: "https://via.placeholder.com/400x200?text=Health+App",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "NodeJs", "React Js", "SQL", "XAMPP", "MySQL Database"],
    category: "web app"
  },
  {
    title: "Course Compass",
    date: "Aug 2023 - Dec 2023",
    description: "This is a web application where all the students can see their course updates such as assignments, exams, and they can even submit assignments and get graded by the faculty. They can monitor their course progress. We even added a statistical approach so they can understand easily. Developed a data warehouse to store and analyze student performance data. Created data visualization dashboards using Tableau. Implemented data transformation using Python.",
    image: "https://via.placeholder.com/400x200?text=Course+Compass",
    tags: ["React Js", "MySQL Database", "Node Js", "HTML", "CSS", "JavaScript", "PHP", "SQL", "XAMPP", "Laravel"],
    category: "web app"
  },
  {
    title: "University Recommender System",
    date: "Jan 2022 - May 2022",
    description: "An application for students who opted for Higher Education and are searching for universities according to their scores and abilities. Application can recommend and predict the chances of admittance into a particular or various universities",
    tags: ["React Js", "Jupyter Notebook", "Node Js", "Web Scraping", "Python", "Machine Learning", "HTML", "CSS", "Bootstrap"],
    category: "web app"
  },
  {
    title: "The Invigilator",
    date: "Jan 2021 - May 2021",
    description: "An application for assigning invigilators for examinations in universities according to the count of students and classrooms available. Where we gathered information about the examinations, rooms available and faculty availability to prepare software which assigns faculty to an examination hall.",
    tags: ["Python", "React Js", "NodeJs", "MySQL", "JavaScript", "Jenkins", "SonarQube", "Jira", "Jasmine", "Selenium IDE"],
    category: "web app"
  },
  {
    title: "Online Car Rental",
    date: "June 2020 - Dec 2020",
    description: "An application for the rental of cars has been developed using a Database management system. Where a customer can search for a vehicle at the preferred locations and make a reservation.",
    tags: ["MySQL", "HTML", "CSS", "PHP", "JavaScript", "SQL"],
    category: "web app"
  }
];

// ========== MIGRATION FUNCTIONS ==========

async function migrateBio() {
  console.log('📝 Migrating Bio...');
  const { error } = await supabase.from('bio').upsert([{
    id: 1,
    name: Bio.name,
    roles: Bio.roles,
    description: Bio.description,
    resume_url: Bio.resume,
    linkedin_url: Bio.linkedin,
    instagram_url: Bio.insta
  }], { onConflict: 'id' });

  if (error) throw error;
  console.log('✓ Bio migrated');
}

async function migrateSkills() {
  console.log('📝 Migrating Skills...');

  for (let i = 0; i < skills.length; i++) {
    const category = skills[i];

    const { data: categoryData, error: catError } = await supabase
      .from('skill_categories')
      .insert([{ title: category.title, order_index: i }])
      .select()
      .single();

    if (catError) throw catError;

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

      if (skillError) throw skillError;
    }
  }
  console.log('✓ Skills migrated');
}

async function migrateExperiences() {
  console.log('📝 Migrating Experiences...');

  for (let i = 0; i < experiences.length; i++) {
    const exp = experiences[i];
    const { error } = await supabase.from('experiences').insert([{
      company_logo_url: exp.img,
      role: exp.role,
      company: exp.company,
      date_range: exp.date,
      description: exp.desc,
      skills_used: exp.skills,
      order_index: i
    }]);

    if (error) throw error;
  }
  console.log('✓ Experiences migrated');
}

async function migrateEducation() {
  console.log('📝 Migrating Education...');

  for (let i = 0; i < education.length; i++) {
    const edu = education[i];
    const { error } = await supabase.from('education').insert([{
      school_logo_url: edu.img,
      school_name: edu.school,
      degree: edu.degree,
      date_range: edu.date,
      grade: edu.grade,
      description: edu.desc,
      order_index: i
    }]);

    if (error) throw error;
  }
  console.log('✓ Education migrated');
}

async function migrateProjects() {
  console.log('📝 Migrating Projects...');

  for (let i = 0; i < projects.length; i++) {
    const proj = projects[i];
    const { error } = await supabase.from('projects').insert([{
      title: proj.title,
      date_range: proj.date,
      description: proj.description,
      image_url: proj.image || null,
      tags: proj.tags,
      category: proj.category,
      github_url: proj.github || null,
      webapp_url: proj.webapp || null,
      order_index: i
    }]);

    if (error) throw error;
  }
  console.log('✓ Projects migrated');
}

async function createAdminCredentials() {
  console.log('📝 Setting up admin credentials...');

  const defaultPassword = 'admin123';
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  const { error } = await supabase.from('admin_credentials').upsert([{
    id: 1,
    password_hash: hashedPassword
  }], { onConflict: 'id' });

  if (error) throw error;
  console.log('✓ Admin credentials created');
  console.log('⚠️  Password: admin123');
}

// ========== MAIN ==========

async function runMigration() {
  console.log('🚀 Starting complete migration...\n');

  try {
    await migrateBio();
    await migrateSkills();
    await migrateExperiences();
    await migrateEducation();
    await migrateProjects();
    await createAdminCredentials();

    console.log('\n✅ Migration completed successfully!');
    console.log('\n🎉 Your portfolio is now fully populated!');
    console.log('Visit http://localhost:3000 to see all your data!');
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    process.exit(1);
  }
}

runMigration();
