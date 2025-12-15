import { supabase } from '../config/supabase';
import bcrypt from 'bcryptjs';

// ==================== BIO APIs ====================
export const getBio = async () => {
  const { data, error } = await supabase
    .from('bio')
    .select('*')
    .eq('id', 1)
    .single();

  if (error) throw error;
  return data;
};

export const updateBio = async (bioData) => {
  const { data, error } = await supabase
    .from('bio')
    .update({
      name: bioData.name,
      roles: bioData.roles,
      description: bioData.description,
      resume_url: bioData.resume_url,
      linkedin_url: bioData.linkedin_url,
      instagram_url: bioData.instagram_url,
      updated_at: new Date().toISOString()
    })
    .eq('id', 1)
    .select();

  if (error) throw error;
  return data?.[0];
};

// ==================== SKILLS APIs ====================
export const getSkillsWithCategories = async () => {
  const { data: categories, error: categoriesError } = await supabase
    .from('skill_categories')
    .select('*')
    .order('order_index', { ascending: true });

  if (categoriesError) throw categoriesError;

  const { data: skills, error: skillsError } = await supabase
    .from('skills')
    .select('*')
    .order('order_index', { ascending: true });

  if (skillsError) throw skillsError;

  // Group skills by category
  const categoriesWithSkills = categories.map(category => ({
    ...category,
    skills: skills.filter(skill => skill.category_id === category.id)
  }));

  return categoriesWithSkills;
};

export const addSkillCategory = async (title, orderIndex) => {
  const { data, error } = await supabase
    .from('skill_categories')
    .insert([{ title, order_index: orderIndex }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateSkillCategory = async (id, title, orderIndex) => {
  const { data, error } = await supabase
    .from('skill_categories')
    .update({ title, order_index: orderIndex })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data?.[0];
};

export const deleteSkillCategory = async (id) => {
  const { error } = await supabase
    .from('skill_categories')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const addSkill = async (categoryId, name, imageUrl, orderIndex) => {
  const { data, error } = await supabase
    .from('skills')
    .insert([{ category_id: categoryId, name, image_url: imageUrl, order_index: orderIndex }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateSkill = async (id, skillData) => {
  const { data, error } = await supabase
    .from('skills')
    .update({
      name: skillData.name,
      image_url: skillData.image_url,
      order_index: skillData.order_index,
      category_id: skillData.category_id
    })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data?.[0];
};

export const deleteSkill = async (id) => {
  const { error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// ==================== EXPERIENCES APIs ====================
export const getExperiences = async () => {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) throw error;
  return data;
};

export const addExperience = async (experienceData) => {
  const { data, error } = await supabase
    .from('experiences')
    .insert([{
      company_logo_url: experienceData.company_logo_url,
      role: experienceData.role,
      company: experienceData.company,
      date_range: experienceData.date_range,
      description: experienceData.description,
      skills_used: experienceData.skills_used,
      order_index: experienceData.order_index
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateExperience = async (id, experienceData) => {
  const { data, error } = await supabase
    .from('experiences')
    .update({
      company_logo_url: experienceData.company_logo_url,
      role: experienceData.role,
      company: experienceData.company,
      date_range: experienceData.date_range,
      description: experienceData.description,
      skills_used: experienceData.skills_used,
      order_index: experienceData.order_index
    })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data?.[0];
};

export const deleteExperience = async (id) => {
  const { error } = await supabase
    .from('experiences')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// ==================== EDUCATION APIs ====================
export const getEducation = async () => {
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) throw error;
  return data;
};

export const addEducation = async (educationData) => {
  const { data, error } = await supabase
    .from('education')
    .insert([{
      school_logo_url: educationData.school_logo_url,
      school_name: educationData.school_name,
      degree: educationData.degree,
      date_range: educationData.date_range,
      grade: educationData.grade,
      description: educationData.description,
      order_index: educationData.order_index
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateEducation = async (id, educationData) => {
  const { data, error } = await supabase
    .from('education')
    .update({
      school_logo_url: educationData.school_logo_url,
      school_name: educationData.school_name,
      degree: educationData.degree,
      date_range: educationData.date_range,
      grade: educationData.grade,
      description: educationData.description,
      order_index: educationData.order_index
    })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data?.[0];
};

export const deleteEducation = async (id) => {
  const { error } = await supabase
    .from('education')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// ==================== PROJECTS APIs ====================
export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) throw error;
  return data;
};

export const addProject = async (projectData) => {
  const { data, error } = await supabase
    .from('projects')
    .insert([{
      title: projectData.title,
      date_range: projectData.date_range,
      description: projectData.description,
      image_url: projectData.image_url,
      tags: projectData.tags,
      category: projectData.category,
      github_url: projectData.github_url,
      webapp_url: projectData.webapp_url,
      order_index: projectData.order_index
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateProject = async (id, projectData) => {
  const { data, error } = await supabase
    .from('projects')
    .update({
      title: projectData.title,
      date_range: projectData.date_range,
      description: projectData.description,
      image_url: projectData.image_url,
      tags: projectData.tags,
      category: projectData.category,
      github_url: projectData.github_url,
      webapp_url: projectData.webapp_url,
      order_index: projectData.order_index
    })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data?.[0];
};

export const deleteProject = async (id) => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// ==================== AUTHENTICATION APIs ====================
export const verifyAdminPassword = async (password) => {
  // Use Supabase RPC function to verify password server-side
  const { data, error } = await supabase.rpc('verify_admin_password', {
    input_password: password
  });

  if (error) {
    console.error('Password verification error:', error);
    return false;
  }

  return data === true;
};

// ==================== IMAGE UPLOAD APIs ====================
export const uploadImage = async (file, folder) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('portfolio-images')
    .upload(filePath, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('portfolio-images')
    .getPublicUrl(filePath);

  return publicUrl;
};

export const deleteImage = async (imageUrl) => {
  // Extract the path from the URL
  const urlParts = imageUrl.split('/storage/v1/object/public/portfolio-images/');
  if (urlParts.length < 2) return; // Not a Supabase storage URL

  const filePath = urlParts[1];

  const { error } = await supabase.storage
    .from('portfolio-images')
    .remove([filePath]);

  if (error) throw error;
};
