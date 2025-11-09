# L SINN3R - Portfolio Website

Portfolio website for L SINN3R, a professional photographer. Built with React and Bootstrap.

## 🚀 Features

- **Modern Design**: Minimalist, black and white design with glass-like effects
- **Image Carousel**: Hero section with image carousel
- **Multi-language**: Support for Spanish and English
- **Project Management**: Admin panel to manage projects and carousel images
- **Contact Form**: Integrated with EmailJS
- **Responsive**: Fully responsive design for all devices

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

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/cldiaz21/l-sinner-web.git
cd l-sinner-web
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (optional):
```env
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
│   │   └── hero/          # Hero section images
│   └── index.html
├── src/
│   ├── components/        # Reusable components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── HeroSection/
│   │   ├── ContactForm/
│   │   └── ...
│   ├── pages/            # Page components
│   │   ├── Home/
│   │   ├── Proyectos/
│   │   ├── Admin/
│   │   └── ...
│   ├── context/          # React Context providers
│   │   ├── ProjectContext.js
│   │   └── LanguageContext.js
│   └── App.js
└── package.json
```

## 🖼️ Adding Hero Images

Place your hero images in `public/images/hero/` with the following names:
- `hero-1.JPG`
- `hero-2.jpg`
- `hero-3.JPG`
- `hero-4.JPG`

Or update the array in `src/pages/Home/Home.js` to use your own image names.

## 🔐 Admin Panel

Access the admin panel at `/login`:
- Username: `admin`
- Password: `lsinner2024` (or as configured in your `.env`)

The admin panel allows you to:
- Add, edit, and delete projects
- Add images and videos to projects
- Manage carousel images
- Mark projects as featured

## 🌐 Deployment

### Build for production:
```bash
npm run build
```

### Deploy to Netlify/Vercel:
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables if using EmailJS

## 📝 Configuration

### EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service
3. Create an email template
4. Add your credentials to `.env` file

### Language Configuration

The website supports Spanish and English. Translations are managed in `src/context/LanguageContext.js`.

## 🎨 Customization

- **Colors**: Modify the gradient colors in `src/App.css` and component CSS files
- **Fonts**: Update font families in `src/index.css`
- **Animations**: Adjust particle settings in `src/components/HeroSection/HeroSection.js`

## 📄 License

This project is private and proprietary.

## 👤 Author

**Álvaro Meza** - Founder of L SINN3R

## 🙏 Acknowledgments

- React community
- Bootstrap team
- All contributors to the open-source libraries used in this project
