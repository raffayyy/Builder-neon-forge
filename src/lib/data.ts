export const personalInfo = {
  name: "Alex Johnson",
  title: "CS Graduate | AI & Web Development Specialist",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  bio: "Passionate Computer Science graduate specializing in AI and modern web development. I create innovative solutions that bridge the gap between cutting-edge technology and user-friendly experiences.",
  quote:
    "Code is poetry written in logic, and AI is the future we're building today.",
  social: {
    github: "https://github.com/alexjohnson",
    linkedin: "https://linkedin.com/in/alexjohnson",
    twitter: "https://twitter.com/alexjohnson",
    medium: "https://medium.com/@alexjohnson",
  },
  resume: {
    url: "/resume.pdf",
    lastUpdated: "2024-01-15",
  },
};

export const projects = [
  {
    id: 1,
    title: "AI-Powered Code Review Assistant",
    description:
      "An intelligent code review tool that uses machine learning to identify bugs, suggest optimizations, and enforce coding standards across multiple programming languages.",
    longDescription:
      "This project leverages advanced NLP models and static analysis to provide real-time code feedback. Built with a React frontend, Node.js backend, and TensorFlow for ML processing.",
    image: "/project-1.jpg",
    technologies: ["React", "Node.js", "TensorFlow", "Python", "Docker", "AWS"],
    github: "https://github.com/alexjohnson/ai-code-reviewer",
    demo: "https://ai-code-reviewer.vercel.app",
    featured: true,
    status: "Completed",
    collaborators: [
      { name: "Sarah Chen", role: "ML Engineer" },
      { name: "Mike Rodriguez", role: "Backend Developer" },
    ],
    metrics: {
      users: "2.5K+",
      stars: 342,
      accuracy: "94%",
    },
  },
  {
    id: 2,
    title: "3D Portfolio Ecosystem",
    description:
      "An immersive 3D portfolio platform built with React Three Fiber, featuring interactive environments, animated transitions, and responsive design.",
    longDescription:
      "A comprehensive portfolio solution that showcases projects in an interactive 3D environment. Features include physics-based animations, dynamic lighting, and mobile optimization.",
    image: "/project-2.jpg",
    technologies: [
      "React",
      "Three.js",
      "React Three Fiber",
      "Framer Motion",
      "WebGL",
    ],
    github: "https://github.com/alexjohnson/3d-portfolio",
    demo: "https://3d-portfolio-demo.vercel.app",
    featured: true,
    status: "In Progress",
    collaborators: [
      { name: "Emma Thompson", role: "3D Artist" },
      { name: "David Kim", role: "UX Designer" },
    ],
    metrics: {
      performance: "98/100",
      interactions: "15+",
      loadTime: "2.3s",
    },
  },
  {
    id: 3,
    title: "Smart Learning Management System",
    description:
      "An adaptive LMS that personalizes learning paths using AI algorithms, tracking student progress and recommending optimal study strategies.",
    longDescription:
      "This system uses reinforcement learning to adapt to individual learning patterns and optimize educational outcomes through personalized content delivery.",
    image: "/project-3.jpg",
    technologies: [
      "Next.js",
      "PostgreSQL",
      "Python",
      "TensorFlow",
      "Redis",
      "GraphQL",
    ],
    github: "https://github.com/alexjohnson/smart-lms",
    demo: "https://smart-lms-demo.vercel.app",
    featured: true,
    status: "Completed",
    collaborators: [
      { name: "Dr. Lisa Wang", role: "Education Consultant" },
      { name: "Tom Anderson", role: "Data Scientist" },
    ],
    metrics: {
      students: "1.2K+",
      improvement: "35%",
      retention: "89%",
    },
  },
  {
    id: 4,
    title: "Real-time Collaboration Tool",
    description:
      "A web-based collaborative workspace with real-time editing, video calls, and AI-powered meeting summaries.",
    image: "/project-4.jpg",
    technologies: ["React", "Socket.io", "WebRTC", "MongoDB", "Express"],
    github: "https://github.com/alexjohnson/collab-tool",
    demo: "https://collab-tool-demo.vercel.app",
    featured: false,
    status: "Completed",
    collaborators: [{ name: "Jessica Liu", role: "Frontend Developer" }],
    metrics: {
      users: "500+",
      uptime: "99.9%",
      latency: "<50ms",
    },
  },
];

export const skills = [
  {
    category: "Frontend Development",
    items: [
      { name: "React", level: 95, icon: "react" },
      { name: "TypeScript", level: 90, icon: "typescript" },
      { name: "Next.js", level: 88, icon: "nextjs" },
      { name: "Vue.js", level: 75, icon: "vue" },
      { name: "React Three Fiber", level: 85, icon: "threejs" },
      { name: "Tailwind CSS", level: 92, icon: "tailwind" },
    ],
  },
  {
    category: "Backend Development",
    items: [
      { name: "Node.js", level: 88, icon: "nodejs" },
      { name: "Python", level: 92, icon: "python" },
      { name: "Express.js", level: 85, icon: "express" },
      { name: "GraphQL", level: 80, icon: "graphql" },
      { name: "PostgreSQL", level: 85, icon: "postgresql" },
      { name: "MongoDB", level: 82, icon: "mongodb" },
    ],
  },
  {
    category: "AI & Machine Learning",
    items: [
      { name: "TensorFlow", level: 85, icon: "tensorflow" },
      { name: "PyTorch", level: 80, icon: "pytorch" },
      { name: "Scikit-learn", level: 88, icon: "sklearn" },
      { name: "OpenAI API", level: 90, icon: "openai" },
      { name: "Hugging Face", level: 75, icon: "huggingface" },
      { name: "LangChain", level: 82, icon: "langchain" },
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "AWS", level: 80, icon: "aws" },
      { name: "Docker", level: 85, icon: "docker" },
      { name: "Kubernetes", level: 70, icon: "kubernetes" },
      { name: "Vercel", level: 90, icon: "vercel" },
      { name: "GitHub Actions", level: 82, icon: "github" },
      { name: "Terraform", level: 65, icon: "terraform" },
    ],
  },
];

export const achievements = [
  {
    id: 1,
    title: "Meta Frontend Developer Certificate",
    issuer: "Meta",
    date: "2023-12-15",
    credentialId: "META-FE-2023-4521",
    image: "/meta-cert.png",
    verified: true,
    type: "certification",
  },
  {
    id: 2,
    title: "Google Cloud AI/ML Certificate",
    issuer: "Google Cloud",
    date: "2023-11-08",
    credentialId: "GCP-AI-2023-7842",
    image: "/google-cert.png",
    verified: true,
    type: "certification",
  },
  {
    id: 3,
    title: "University of London CS Degree",
    issuer: "University of London",
    date: "2023-06-15",
    grade: "First Class Honours",
    image: "/uol-degree.png",
    verified: true,
    type: "degree",
  },
  {
    id: 4,
    title: "LeetCode Global Ranking",
    description: "Top 5% globally with 500+ problems solved",
    rank: "Guardian",
    rating: 2156,
    image: "/leetcode-badge.png",
    type: "achievement",
  },
  {
    id: 5,
    title: "HackerRank 5-Star Problem Solver",
    description: "5-star rating in Python, JavaScript, and Algorithms",
    rating: "5-star",
    image: "/hackerrank-badge.png",
    type: "achievement",
  },
  {
    id: 6,
    title: "Tech Lead - University AI Club",
    description: "Led a team of 15 developers on AI research projects",
    organization: "University AI Society",
    duration: "2022-2023",
    image: "/leadership-badge.png",
    type: "leadership",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    role: "CS Professor",
    company: "University of London",
    image: "/testimonial-1.jpg",
    content:
      "Alex consistently demonstrated exceptional problem-solving skills and leadership qualities. Their work on the AI-powered learning system was outstanding and showed real innovation in the field.",
    rating: 5,
    date: "2023-07-20",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Senior Software Engineer",
    company: "Google",
    image: "/testimonial-2.jpg",
    content:
      "Working with Alex on the open-source project was a pleasure. Their code quality is excellent, and they have a great understanding of both frontend and backend technologies.",
    rating: 5,
    date: "2023-09-15",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "StartupXYZ",
    image: "/testimonial-3.jpg",
    content:
      "Alex delivered our MVP ahead of schedule and exceeded all expectations. Their attention to detail and ability to translate complex requirements into elegant solutions is remarkable.",
    rating: 5,
    date: "2023-11-03",
  },
  {
    id: 4,
    name: "David Park",
    role: "ML Research Scientist",
    company: "AI Labs",
    image: "/testimonial-4.jpg",
    content:
      "Alex's contribution to our research project was invaluable. They have a deep understanding of machine learning concepts and excellent implementation skills.",
    rating: 5,
    date: "2023-08-28",
  },
];

export const blogPosts = [
  {
    id: 1,
    title: "Building Scalable AI Applications with React and TensorFlow",
    summary:
      "A comprehensive guide to integrating machine learning models into React applications for production use.",
    url: "https://dev.to/alexjohnson/building-scalable-ai-apps",
    platform: "Dev.to",
    date: "2024-01-10",
    readTime: 8,
    tags: ["AI", "React", "TensorFlow", "JavaScript"],
    featured: true,
  },
  {
    id: 2,
    title: "The Future of 3D Web Experiences",
    summary:
      "Exploring the potential of WebGL and React Three Fiber in creating immersive web applications.",
    url: "https://medium.com/@alexjohnson/future-3d-web",
    platform: "Medium",
    date: "2023-12-22",
    readTime: 6,
    tags: ["3D", "WebGL", "React", "Three.js"],
    featured: true,
  },
  {
    id: 3,
    title: "Optimizing React Performance with Modern Techniques",
    summary:
      "Deep dive into React 18 features and performance optimization strategies for large-scale applications.",
    url: "https://dev.to/alexjohnson/react-performance-optimization",
    platform: "Dev.to",
    date: "2023-11-15",
    readTime: 12,
    tags: ["React", "Performance", "Optimization", "JavaScript"],
    featured: false,
  },
];

export const experience = [
  {
    id: 1,
    company: "Tech Innovation Labs",
    position: "Full Stack Developer Intern",
    duration: "Jun 2023 - Dec 2023",
    location: "Remote",
    description:
      "Developed AI-powered web applications using React, Node.js, and TensorFlow. Led the frontend development of a machine learning platform that serves 1000+ daily users.",
    achievements: [
      "Built responsive React components reducing load time by 40%",
      "Implemented real-time data visualization with D3.js",
      "Collaborated with ML team to integrate TensorFlow models",
    ],
    technologies: ["React", "Node.js", "TensorFlow", "AWS", "PostgreSQL"],
  },
  {
    id: 2,
    company: "University of London",
    position: "Research Assistant",
    duration: "Sep 2022 - May 2023",
    location: "London, UK",
    description:
      "Conducted research on natural language processing and developed educational AI tools. Published findings in university journal.",
    achievements: [
      "Developed NLP model with 92% accuracy for text classification",
      "Created interactive learning platform used by 500+ students",
      "Co-authored research paper on adaptive learning systems",
    ],
    technologies: ["Python", "PyTorch", "Flask", "React", "MongoDB"],
  },
];

export const contactInfo = {
  address: "San Francisco, CA, USA",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 123-4567",
  availability: "Available for full-time opportunities",
  timezone: "PST (UTC-8)",
  preferredContact: "email",
};
