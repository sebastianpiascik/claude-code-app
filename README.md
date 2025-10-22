# Frontend Developer Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. This portfolio is optimized for deployment on GitHub Pages.

## Features

- Modern and clean design
- Fully responsive layout
- Dark mode support
- Sections for About, Projects, Skills, and Contact
- Static site generation for optimal performance
- SEO-friendly
- Easy to customize

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd claude-code-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Customization

### Update Personal Information

Edit `app/page.tsx` to customize:
- Hero section text
- About section content
- Project details
- Skills and technologies
- Contact information and social links

### Styling

The project uses Tailwind CSS for styling. You can customize:
- Colors and theme in `app/globals.css`
- Component styles directly in the JSX files

## Building for Production

To create a static export for GitHub Pages:

```bash
npm run build
```

This will generate a static site in the `out` directory.

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions

1. Go to your GitHub repository settings
2. Navigate to **Pages** in the sidebar
3. Under **Source**, select **GitHub Actions**
4. Push your code to the `main` branch
5. The workflow will automatically build and deploy your site

Your site will be available at: `https://<your-username>.github.io/<repository-name>/`

### Manual Deployment

If you prefer manual deployment:

```bash
npm run build
# Deploy the 'out' folder to your hosting service
```

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Main portfolio page
│   └── globals.css     # Global styles
├── public/             # Static assets
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Pages deployment workflow
└── next.config.ts      # Next.js configuration
```

## Technologies Used

- [Next.js 16](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React](https://reactjs.org/) - UI library

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues or questions, please open an issue in the GitHub repository.
