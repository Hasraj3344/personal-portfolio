# Portfolio Admin Panel Setup Guide

This guide will help you complete the setup of your portfolio admin panel.

## ✅ What's Done

- Supabase client installed
- Environment variables configured
- All components updated to use dynamic data
- Authentication system implemented
- Login page created
- Database schema designed
- Migration script created

## 📋 Next Steps

### Step 1: Set Up Database Tables

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy the entire contents of `database-setup.sql` file
5. Paste it into the SQL editor
6. Click "Run" to execute the script
7. You should see "Success. No rows returned" - this is normal!

### Step 2: Migrate Your Data

Now that the tables are created, let's populate them with your existing data:

```bash
node src/data/migrate.js
```

This will:
- Copy all data from `src/data/constants.js` to Supabase
- Create admin credentials with password: `admin123`
- ⚠️ **IMPORTANT**: Change this default password immediately after first login!

### Step 3: Test Your Application

1. Start the development server:
```bash
npm start
```

2. Visit `http://localhost:3000` - Your portfolio should load from Supabase!

3. Visit `http://localhost:3000/admin/login`
   - Password: `admin123`
   - You should see the admin dashboard

### Step 4: Add Vercel Environment Variables

Before deploying, add these to your Vercel project:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add these two variables:
   - `REACT_APP_SUPABASE_URL` = `https://fiqhbythhltobalauxrx.supabase.co`
   - `REACT_APP_SUPABASE_ANON_KEY` = `your_anon_key`

### Step 5: Deploy!

```bash
git add .
git commit -m "Add admin panel with Supabase integration"
git push origin main
```

Vercel will automatically redeploy your site.

## 🔐 Security Notes

### Change Admin Password

The default password `admin123` is NOT secure. Here's how to change it:

1. Generate a new password hash:
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YOUR_NEW_PASSWORD', 10));"
```

2. Go to Supabase → Table Editor → admin_credentials
3. Click on the row (id=1)
4. Replace the `password_hash` with your new hash
5. Save

### RLS Policies

The setup script already enabled Row Level Security (RLS) with:
- **Public READ access**: Anyone can view your portfolio
- **Authenticated WRITE access**: Only logged-in users can modify data

This means:
- ✅ Portfolio is publicly visible
- ✅ Only you (when logged in) can edit content
- ✅ Data is protected from unauthorized changes

## 🎨 Next Steps: Building the Admin Panel

The basic infrastructure is ready! You now have a working login system.

To complete the admin panel, you'll need to build the admin UI pages for:
- **Edit Bio**: Form to update name, roles, description, links
- **Manage Skills**: Add/edit/delete skills and categories
- **Manage Experience**: Add/edit/delete work experience
- **Manage Education**: Add/edit/delete education entries
- **Manage Projects**: Add/edit/delete projects with image upload

Would you like me to help build these admin panel pages? I can create:
1. A complete admin dashboard with cards for each section
2. Edit forms for each content type
3. Image upload functionality
4. Delete confirmation dialogs
5. Success/error notifications

Let me know and I'll continue building the admin UI!

## 🐛 Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` exists in the project root
- Restart your development server after creating the file

### "relation does not exist" error
- You need to run the `database-setup.sql` script in Supabase first

### "No rows returned" when migrating
- Check that tables were created successfully
- Verify your Supabase URL and key are correct

### Portfolio shows blank/loading forever
- Check browser console for errors
- Verify database tables have data (check in Supabase Table Editor)
- Make sure RLS policies are set correctly

## 📚 File Structure

```
src/
├── config/
│   └── supabase.js          # Supabase client config
├── contexts/
│   ├── AuthContext.js       # Authentication state
│   └── DataContext.js       # Portfolio data state
├── services/
│   └── api.js               # Database API functions
├── components/
│   ├── Login/               # Login page
│   ├── ProtectedRoute.js    # Route protection
│   └── LoadingSpinner.js    # Loading component
└── data/
    ├── constants.js         # Original static data (backup)
    └── migrate.js           # Migration script

database-setup.sql           # SQL schema + policies
SETUP-GUIDE.md              # This file
```

## ✨ What's New

Your portfolio now has:
- ✅ Dynamic content from Supabase database
- ✅ Admin login page (`/admin/login`)
- ✅ Protected admin routes
- ✅ Authentication state management
- ✅ Real-time data loading with context API
- ✅ Loading states
- ✅ Error handling

The public portfolio works exactly the same as before, but now you can edit content through an admin panel instead of editing code!
