# Kavya Baltha - AI Engineer Portfolio

A modern, interactive AI portfolio website built with React, TypeScript, and Tailwind CSS. Features an AI chat assistant powered by OpenAI GPT-3.5.

## 🚀 Features

- **Modern Design**: Clean, responsive design with smooth animations
- **AI Chat Assistant**: Interactive chat powered by OpenAI GPT-3.5
- **Project Showcase**: Detailed project cards with technologies and links
- **Skills Visualization**: Animated skill bars and expertise areas
- **Contact Form**: Easy way to get in touch
- **Mobile Responsive**: Optimized for all device sizes
- **Dark Theme**: Professional dark theme with gradient accents

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **AI Chat**: OpenAI GPT-3.5 via Netlify Functions
- **Deployment**: Netlify

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### OpenAI API Key
To enable the AI chat feature, you need an OpenAI API key:

1. Sign up at [OpenAI](https://platform.openai.com/)
2. Create an API key
3. Add it to your environment variables

### Netlify Deployment
For production deployment on Netlify:

1. Connect your repository to Netlify
2. Set the build command: `npm run build`
3. Set the publish directory: `dist`
4. Add environment variable: `OPENAI_API_KEY`

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── About.tsx
│   │   ├── AIChat.tsx
│   │   ├── Contact.tsx
│   │   ├── Hero.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── Navbar.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── netlify/
│   └── functions/
│       └── chat.js
├── public/
│   └── Images/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── netlify.toml
```

## 🎨 Customization

### Colors
Update the color scheme in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    // ... customize your colors
  }
}
```

### Content
- Update personal information in component files
- Add/remove projects in `Projects.tsx`
- Modify skills in `Skills.tsx`
- Update contact information in `Contact.tsx`

### AI Chat
Customize the AI assistant's knowledge in `netlify/functions/chat.js`:
```javascript
content: `You are [Name]'s AI portfolio assistant. [Customize background]`
```

## 🚀 Deployment

### Netlify (Recommended)
1. Push your code to GitHub
2. Connect repository to Netlify
3. Configure build settings
4. Add environment variables
5. Deploy!

### Manual Build
```bash
npm run build
npm run preview
```

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔍 SEO & Performance

- Meta tags for social sharing
- Open Graph tags
- Optimized images
- Fast loading with Vite
- Lazy loading components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

- **Email**: kavya.baltha@gmail.com
- **GitHub**: [github.com/kavya507](https://github.com/kavya507)
- **LinkedIn**: [linkedin.com/in/kavya-baltha](https://linkedin.com/in/kavya-baltha)

---

Built with ❤️ using React, TypeScript, and Tailwind CSS

