# ASCII Garden - Collective Canvas

A collaborative ASCII art canvas where anyone can leave their mark.

## Project Structure
```
ascii-garden/
├── src/
│   ├── App.jsx        # Main application component
│   └── main.jsx       # React entry point
├── index.html         # HTML entry point
├── package.json       # Dependencies
├── vite.config.js     # Build configuration
└── .gitignore         # Git ignore rules
```

## Next Steps: Deploy to Vercel

1. **Download all files** from this chat
2. **Create a GitHub repository:**
   - Go to github.com
   - Click "New repository"
   - Name it "ascii-garden"
   - Make it public
   - Don't initialize with README (you already have one)
   
3. **Upload files to GitHub:**
   - Create the folder structure shown above
   - Upload all files to your repository
   
4. **Deploy on Vercel:**
   - Go to vercel.com
   - Sign up with GitHub
   - Click "Add New" → "Project"
   - Select your "ascii-garden" repository
   - Vercel will auto-detect it's a Vite project
   - Click "Deploy"
   - Wait 2-3 minutes
   - You'll get a URL like: `ascii-garden.vercel.app`

## Features
- Avatar creator with faces and hairstyles
- Preset ASCII art
- Free text editor with ornaments
- Pan and zoom canvas
- Triple-tap counter for admin mode
- Real-time stamp updates from Supabase

## Tech Stack
- React 18
- Vite
- Supabase (database)
- Vercel (hosting)
