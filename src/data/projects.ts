export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  tools?: string[];
}

export const projects: Project[] = [
  {
    id: "waste-management-hackathon",
    title: "Waste Management Hackathon Project",
    subtitle: "College Hackathon — UI/UX & Frontend",
    description:
      "Designed complete website layout and user flows. Led frontend development with HTML, CSS, and JavaScript. Applied responsive design with intuitive, task-oriented interaction design.",
    details: [
      "Designed complete website layout and user flows for a waste management platform",
      "Led frontend development with HTML, CSS, and JavaScript",
      "Applied responsive design with intuitive, task-oriented interaction design",
      "Collaborated with team members during the hackathon sprint",
    ],
    tools: ["Figma", "HTML", "CSS", "JavaScript"],
  },
  {
    id: "styles-ecommerce",
    title: "Styles E-commerce",
    subtitle: "E-commerce Website — UI/UX Design",
    description:
      "Designed modern e-commerce UI including product pages and checkout flow. Created responsive prototypes in Figma and implemented frontend using HTML, CSS, JavaScript.",
    details: [
      "Designed modern e-commerce UI including product pages and checkout flow",
      "Created responsive prototypes in Figma",
      "Implemented frontend using HTML, CSS, JavaScript",
      "Focused on conversion-optimized user experience",
    ],
    tools: ["Figma", "HTML", "CSS", "JavaScript"],
  },
  {
    id: "rewasoft-expedition",
    title: "Expedition & Travel Website",
    subtitle: "RewaSoft Pvt. Ltd — UI/UX Design",
    description:
      "Designed UI for an expedition and travel website. Created wireframes and high-fidelity prototypes using Figma. Structured layouts to improve navigation and user engagement.",
    details: [
      "Designed UI for an expedition and travel website",
      "Created wireframes and high-fidelity prototypes using Figma",
      "Structured layouts to improve navigation and user engagement",
      "Collaborated with developers to ensure accurate UI implementation",
    ],
    tools: ["Figma", "Wireframing", "Prototyping"],
  },
  {
    id: "neutroline-dashboard",
    title: "Admin Dashboard",
    subtitle: "Neutroline Pvt. Ltd. — UI/UX Design",
    description:
      "Designed an admin dashboard for managing staff, customers, and services. Created wireframes and interactive prototypes in Figma.",
    details: [
      "Designed an admin dashboard for managing staff, customers, and services",
      "Created wireframes and interactive prototypes in Figma",
      "Improved information architecture to simplify navigation and workflows",
      "Collaborated with developers for UI implementation using HTML5 and CSS3",
    ],
    tools: ["Figma", "HTML5", "CSS3", "Information Architecture"],
  },
  {
    id: "quasar-homepage",
    title: "Company Homepage Redesign",
    subtitle: "Quasar Technology — UI/UX & Frontend",
    description:
      "Designed homepage UI focused on first-time user experience and clarity. Built responsive layouts for desktop and mobile devices.",
    details: [
      "Designed homepage UI focused on first-time user experience and clarity",
      "Created high-fidelity mockups and interactive prototypes",
      "Built responsive layouts for desktop and mobile devices",
      "Improved accessibility, readability, and visual hierarchy",
    ],
    tools: ["Figma", "Responsive Design", "Accessibility", "HTML", "CSS"],
  },
];
