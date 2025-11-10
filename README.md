# L SINN3R - Portfolio Website

Portfolio website for L SINN3R, a professional photographer. Built with React and Bootstrap.

## 🚀 Features

- **Modern Design**: Minimalist, black and white design with glass-like effects
- **Image Carousel**: Hero section with image carousel and background animations
- **Multi-language**: Support for Spanish and English
- **Project Management**: Admin panel to manage projects and carousel images
- **Contact Form**: Integrated with EmailJS
- **Image Upload**: Supabase Storage integration for image uploads
- **Responsive**: Fully responsive design for all devices
- **Project Modal**: Beautiful modal with horizontal layout for project details
- **Instagram Feed**: Instagram integration for social media display

## 📋 Pages

- **Home**: Hero carousel, description, featured projects, and social media
- **Identidad Sinners**: Identity and philosophy
- **Proyectos**: Project gallery with image and video support
- **Quienes Somos**: About us page with founder information
- **Contacto**: Contact page with form

## 🛠️ Technologies

- React 18.2.0
- React Router DOM 6.18.0
- Bootstrap 5.3.2
- React Bootstrap 2.9.1
- GSAP 3.13.0 (for animations)
- React TSParticles 2.12.2 (for particle animations)
- React Slick 0.29.0 (for carousels)
- EmailJS 4.4.1 (for contact form)
- Supabase 2.80.0 (for database and storage)
- Three.js & @react-three/fiber (for 3D animations)
- Lucide React (for icons)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/cldiaz21/l-sinner-web.git
cd l-sinner-web
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Create a `.env` file in the root directory:
```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
REACT_APP_ADMIN_USERNAME=admin
REACT_APP_ADMIN_PASSWORD=your_password
```

4. Start the development server:
```bash
npm start
```

## 📁 Project Structure

```
l-sinner-web/
├── public/
│   ├── images/
│   │   ├── hero/          # Hero section images
│   │   └── alvaromeza.jpg
│   └── index.html
├── src/
│   ├── components/        # Reusable components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── HeroSection/
│   │   ├── ContactForm/
│   │   ├── ProjectModal/
│   │   ├── ProjectsCarousel/
│   │   ├── StaggeredMenu/
│   │   ├── FlowingMenu/
│   │   ├── BackgroundAnimations/
│   │   └── ...
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── context/          # React context
│   ├── utils/            # Utility functions
│   └── lib/              # Libraries configuration
├── CREATE_TABLES.sql     # SQL script for database setup
└── README.md
```

## 📚 Documentation

- `INSTRUCCIONES_EMAILJS.md` - EmailJS configuration guide
- `SOLUCION_EMAILJS.md` - EmailJS troubleshooting guide
- `SUPABASE_STORAGE_SETUP.md` - Supabase Storage setup guide
- `INSTRUCCIONES_SUPABASE.md` - Supabase database setup guide
- `VERCEL_DEPLOY.md` - Vercel deployment guide
- `VERCEL_ENV_SETUP.md` - Environment variables setup
- `DOMAIN_SETUP.md` - Domain configuration guide

## 🖼️ Adding Hero Images

Place your hero images in `public/images/hero/` with the following names:
- `hero-1.JPG`
- `hero-2.jpg`
- `hero-3.JPG`
- `hero-4.JPG`

Or update the array in `src/pages/Home/Home.js` to use your own image names.

## 🔐 Admin Panel

Access the admin panel at `/admin` (requires login at `/login`):
- Username: Configured in environment variables
- Password: Configured in environment variables

The admin panel allows you to:
- Add, edit, and delete projects
- Upload images to Supabase Storage
- Add images and videos to projects
- Manage carousel images
- Mark projects as featured

## 🌐 Deployment

### Build for production:
```bash
npm run build
```

### Deploy to Vercel:
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

See `VERCEL_DEPLOY.md` for detailed deployment instructions.

## 📝 Configuration

### EmailJS Setup

See `INSTRUCCIONES_EMAILJS.md` for detailed EmailJS configuration instructions.

### Supabase Setup

See `INSTRUCCIONES_SUPABASE.md` and `SUPABASE_STORAGE_SETUP.md` for Supabase configuration.

### Language Configuration

The website supports Spanish and English. Translations are managed in `src/context/LanguageContext.js`.

## 🎨 Customization

- **Colors**: Modify the gradient colors in `src/App.css` and component CSS files
- **Fonts**: Update font families in `src/index.css`
- **Animations**: Adjust animation settings in `src/components/HeroSection/HeroSection.js` and background animations

## 📄 License

This project is private and proprietary.

## 👤 Author

**Álvaro Meza** - Founder of L SINN3R

## 🙏 Acknowledgments

- React community
- Bootstrap team
- All contributors to the open-source libraries used in this project
