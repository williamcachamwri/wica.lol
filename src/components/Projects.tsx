export type Project = {
  title: string;
  description: string;
  link: string;
  technologies: string[];
  featured?: boolean;
};

export const projectList: Project[] = [
  {
    title: "Cosmic Portfolio",
    description: "A stunning portfolio website with advanced animations and interactive elements. Features a custom-built animation system and responsive design for all devices.",
    link: "https://example.com/cosmic-portfolio",
    technologies: ["React", "TypeScript", "Framer Motion", "TailwindCSS", "Three.js"],
    featured: true
  },
  {
    title: "Neural Canvas",
    description: "An AI-powered digital art creation platform that transforms text prompts into stunning visual masterpieces using advanced machine learning algorithms.",
    link: "https://example.com/neural-canvas",
    technologies: ["Next.js", "Python", "TensorFlow", "WebGL", "Firebase"],
    featured: true
  },
  {
    title: "Quantum Dashboard",
    description: "A comprehensive analytics dashboard with real-time data visualization, customizable widgets, and advanced filtering capabilities for enterprise applications.",
    link: "https://example.com/quantum-dashboard",
    technologies: ["Vue.js", "D3.js", "GraphQL", "Node.js", "MongoDB"],
  },
  {
    title: "Ethereal Chat",
    description: "A secure, end-to-end encrypted messaging platform with real-time translation, voice messages, and ephemeral content that disappears after viewing.",
    link: "https://example.com/ethereal-chat",
    technologies: ["React Native", "Socket.io", "Express", "PostgreSQL", "AWS"],
  },
  {
    title: "Nebula Commerce",
    description: "A full-featured e-commerce platform with AR product previews, personalized recommendations, and seamless payment processing integration.",
    link: "https://example.com/nebula-commerce",
    technologies: ["Next.js", "Redux", "Stripe API", "Sanity CMS", "Vercel"],
  }
];