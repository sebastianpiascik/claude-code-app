import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Portfolio</h1>
          <div className="flex gap-6">
            <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition">About</a>
            <a href="#projects" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition">Projects</a>
            <a href="#skills" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition">Skills</a>
            <a href="#contact" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6">
              Frontend Developer
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Crafting beautiful, responsive, and user-friendly web experiences with modern technologies
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="#projects"
                className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-700 dark:hover:bg-slate-200 transition"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">About Me</h3>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
            I'm a passionate frontend developer with expertise in building modern web applications.
            I specialize in creating responsive, accessible, and performant user interfaces using the latest
            web technologies.
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            With a strong foundation in JavaScript, TypeScript, and modern frameworks like React and Next.js,
            I focus on delivering exceptional user experiences and writing clean, maintainable code.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">Featured Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">E-Commerce Platform</h4>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  A full-featured e-commerce site with cart, checkout, and payment integration.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded text-sm">React</span>
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded text-sm">Next.js</span>
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded text-sm">Tailwind</span>
                </div>
                <a href="#" className="text-slate-900 dark:text-white font-semibold hover:underline">View Project →</a>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600"></div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Task Management App</h4>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  A collaborative task manager with real-time updates and team features.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded text-sm">TypeScript</span>
                  <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded text-sm">React</span>
                  <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded text-sm">Firebase</span>
                </div>
                <a href="#" className="text-slate-900 dark:text-white font-semibold hover:underline">View Project →</a>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600"></div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Weather Dashboard</h4>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Real-time weather data visualization with interactive charts and maps.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded text-sm">React</span>
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded text-sm">API</span>
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded text-sm">Charts</span>
                </div>
                <a href="#" className="text-slate-900 dark:text-white font-semibold hover:underline">View Project →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">Skills & Technologies</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Frontend</h4>
              <div className="flex flex-wrap gap-3">
                <span className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded-lg">JavaScript</span>
                <span className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded-lg">TypeScript</span>
                <span className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded-lg">React</span>
                <span className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded-lg">Next.js</span>
                <span className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded-lg">HTML5</span>
                <span className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded-lg">CSS3</span>
                <span className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded-lg">Tailwind CSS</span>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Tools & Others</h4>
              <div className="flex flex-wrap gap-3">
                <span className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded-lg">Git</span>
                <span className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded-lg">GitHub</span>
                <span className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded-lg">VS Code</span>
                <span className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded-lg">Webpack</span>
                <span className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded-lg">REST APIs</span>
                <span className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded-lg">Responsive Design</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">Get In Touch</h3>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <div className="flex gap-6 justify-center mb-8">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="mailto:hello@example.com"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
          <a
            href="mailto:hello@example.com"
            className="inline-block bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-700 dark:hover:bg-slate-200 transition"
          >
            Send Email
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 py-8 px-6 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto text-center text-slate-600 dark:text-slate-300">
          <p>&copy; 2024 Frontend Developer Portfolio. Built with Next.js and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
