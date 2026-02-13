import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react"; // npm install lucide-react
import { FaLinkedin, FaGithub, FaEnvelope, FaFileDownload, FaChevronDown } from "react-icons/fa";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const titles = ["AWS Developer", "AI Engineer", "Python Developer"];

// ---------------- Typewriter Hook ----------------
function useTypewriter(words, speed = 100, pause = 1500) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!deleting && subIndex === words[index].length) {
        setTimeout(() => setDeleting(true), pause);
        return;
      }

      if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
        return;
      }

      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, words, speed, pause]);

  return words[index].substring(0, subIndex);
}

// ---------------- Theme Logic ----------------
function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(mode) {
  const root = document.documentElement;

  if (mode === "system") {
    const system = getSystemTheme();
    root.classList.toggle("dark", system === "dark");
  } else {
    root.classList.toggle("dark", mode === "dark");
  }
}

// ---------------- Theme Toggle Component ----------------
function ThemeToggle({ theme, setTheme }) {
  const options = ["light", "system", "dark"];

  const sliderPosition = {
    light: "0%",
    system: "33.33%",
    dark: "66.66%",
  };

  return (
    <div className="relative w-40 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center p-1">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute top-1 bottom-1 w-1/3 rounded-full bg-blue-500"
        style={{ left: sliderPosition[theme] }}
      />

      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => setTheme(opt)}
          className={`relative z-10 flex-1 text-sm font-medium capitalize transition-colors ${
            theme === opt ? "text-white" : "text-zinc-400"
          }`}
        >
          {opt === "light" && "☀️"}
          {opt === "system" && "⚙️"}
          {opt === "dark" && "🌙"}
        </button>
      ))}
    </div>
  );
}

// ---------------- Scroll Indicator ----------------
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
      onClick={() => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Scroll Down</span>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6 text-blue-500" />
      </motion.div>
    </motion.div>
  );
}


// ---------------- Main App ----------------
export default function PortfolioApp() {
  const typedText = useTypewriter(titles);

  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || "system"
  );

  const [activeSection, setActiveSection] = useState("home");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [showCertModal, setShowCertModal] = useState(false);

  const [expandedJob, setExpandedJob] = useState(null);

  const certifications = {
    aws: [
      { name: "AWS Developer - Associate", icon: "https://images.credly.com/size/340x340/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png" },
      { name: "AWS Cloud Practitioner", icon: "https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png" },
    ],
    azure: [
      { name: "Azure Fundamentals", icon: "https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png" },
      { name: "Azure AI Fundamentals", icon: "https://images.credly.com/size/340x340/images/4136ced8-75d5-4afb-8677-40b6236e2672/azure-ai-fundamentals-600x600.png" },
      { name: "Azure Data Fundamentals", icon: "https://images.credly.com/size/340x340/images/70eb1e3f-d4de-4377-a062-b20fb29594ea/azure-data-fundamentals-600x600.png" },
    ],
  };

  const experiences = [
    {
      id: 1,
      company: "Evertz",
      companyLinkedIn: "https://www.linkedin.com/company/evertz",
      role: "Senior Software Developer",
      period: "Jan 2023 - Present",
      location: "Toronto, ON",
      companyLogo: "/portfolio/logos/evertz_logo.png", // You can replace with actual company logo URL
      description: [
        "Architected AI-driven workflows using OpenAI to automatically classify, summarize, and tag media assets, with real-time visual validation of video streams to ensure content integrity.",
        "Developed automated Python scripts to identify and terminate orphaned AWS resources (EC2, EBS, AMIs) across dev/test environments, reducing monthly cloud spend by ~35%.",
        "Implemented observability using Honeycomb and OpenTelemetry, combined with load testing and latency profiling, reducing MTTR by ~25-30% and proactively identifying performance bottlenecks.",
        "Researched and implemented AWS Dedicated Hosts PoC, reducing vendor license requirements by 30% and cutting costs by 25% through optimized resource utilization.",
        "Integrated Dependabot for automated vulnerability detection and library upgrades, while evaluating AWS Inspector and Security Hub to strengthen platform security across infrastructure.",
        "Mentored team of 2 junior developers on cloud best practices",
        "Implemented CI/CD pipelines using GitHub Actions and CDK",
      ],
      skills: ["AWS", "Terraform", "Docker", "Python", "Kubernetes"]
    },
    {
      id: 2,
      company: "Deloitte",
      companyLinkedIn: "https://ca.linkedin.com/company/deloitte",
      role: "Software Developer",
      period: "May 2021 - Apr 2022",
      location: "Gurgaon, India",
      companyLogo: "/portfolio/logos/deloitte_logo.png",
description: [
        "Developed ETL pipelines using AWS Glue with PySpark and Pandas to load and transform data from various sources into AWS S3 DataLake.",
        "Migrated database and services to a new schema, removing backward compatibility code and reducing API load time by 20%, significantly improving performance.",
        "Developed and deployed Serverless RESTful solutions using AWS Lambda and API Gateway along with AWS SAM. Worked on data dimensional modelling techniques like start schema.",
        "Crafted complex SQL queries, employing self-joins and correlated sub-queries for data manipulation and retrieval.",
        "Utilized AWS Redshift for data warehousing and contributed to Airflow workflow management.",
        "Conducted code reviews and maintained coding standards"
      ],
      skills: ["AWS Lambda", "Python", "FastAPI", "PostgreSQL", "Redis"]
    },
    {
      id: 3,
      company: "Accenture",
      companyLinkedIn: "https://www.linkedin.com/company/accenture",
      role: "Associate Software Developer",
      period: "Aug 2019 - May 2021",
      location: "Bangalore, India",
      companyLogo: "/portfolio/logos/accenture_logo.png",
      description: [
        "Developed REST APIs using Python FastAPI and Django framework",
        "Wrote unit tests achieving 85% code coverage",
        "Participated in Agile development processes and daily standups",
        "Architected and developed serverless and stateless solutions on AWS.",
        "Developed RESTful and Websocket microservices using AWS Lambda, API Gateway, DynamoDB, Aurora MySQL, and Python to perform CRUD operations and manage customer data efficiently.",
        "Worked on Python frameworks like Django and FastAPI along with ORM Libraries like SQLAlchemy.",
        "Implemented and invoked APIs with OAuth and mTLS authentication.",
        "Created software applications in Test-Driven Development (TDD) environment using PyTest and UnitTest.",
        "Worked on integration and deployment tools like GitHub, Bitbucket, Jenkins and Docker.",
        "Provided support for incidents, contribute to bug fixes, ensuring a stable and reliable application.",
        "Worked on AWS monitoring (CloudWatch, CloudTrail) and infrastructure as a code service (Cloud Formation and Terraform)."
      ],
      skills: ["Python", "FastAPI", "Django", "MySQL", "Git", "REST APIs"]
    }
  ];

  // Apply theme on change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  }, [theme]);

  // Listen to system theme changes
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") applyTheme("system");
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "contact", "resume"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const sectionVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
    { id: "resume", label: "Resume" },
  ];

  return (
    <div className="
      min-h-screen
      bg-gradient-to-br
      from-orange-50 via-amber-50/50 to-yellow-50
      dark:from-slate-950 dark:via-zinc-900 dark:to-blue-950
      text-zinc-900 dark:text-zinc-100
      transition-colors duration-500
    ">

      {/* Navbar */}
      <nav className="fixed top-0 w-full backdrop-blur-md bg-white/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-bold text-2xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
          >
            Prabhjot
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "text-blue-500"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-blue-500"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-blue-500"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Desktop Theme Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:block"
          >
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-zinc-200 dark:border-zinc-800"
          >
            <div className="px-6 py-4 space-y-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    activeSection === item.id
                      ? "bg-blue-500 text-white"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
              
              {/* Mobile Theme Toggle */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-center">
                <ThemeToggle theme={theme} setTheme={setTheme} />
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      <main>
        {/* Hero Section - Full Screen */}
        <section
          id="home"
          className="relative min-h-screen flex flex-col items-center justify-center px-6"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariant}
            className="text-center space-y-8 max-w-4xl"
          >

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-bold"
            >
              <span className="text-3xl md:text-4xl lg:text-5xl text-zinc-600 dark:text-zinc-400 block mb-2">
                Hi, I'm
              </span>
              <span className="text-6xl md:text-7xl lg:text-8xl">
                Prabhjot (Prabh)
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-2xl md:text-3xl text-zinc-600 dark:text-zinc-400"
            >
              I'm a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-semibold">
                {typedText}
              </span>
              <span className="animate-pulse text-blue-500">|</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto"
            >
              Crafting scalable cloud solutions, elegant code, and AI-driven innovations
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-4 justify-center pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contact")}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-lg hover:shadow-xl transition-shadow"
              >
                Get In Touch
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("about")}
                className="px-8 py-3 rounded-full border-2 border-blue-500 text-blue-500 font-medium hover:bg-blue-500/10 transition-colors"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          <ScrollIndicator />
        </section>

        <div className="max-w-5xl mx-auto px-6 space-y-32 py-20">
          {/* About */}
          <motion.section
            id="about"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariant}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-blue-500"></div>
              <h2 className="text-4xl md:text-5xl font-bold">About Me</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-500 to-transparent"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-white/70 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-xl">
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                    I'm a cloud professional specializing in AWS architecture, Python
                    development, and AI integration. I design scalable systems and enjoy solving real-world
                    engineering problems with modern technologies.
                  </p>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Years Experience", value: "6+", clickable: false },
                  { label: "Cloud Certifications", value: "5", clickable: true },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: stat.clickable ? 1.05 : 1 }}
                    onClick={() => stat.clickable && setShowCertModal(true)}
                    className={`bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6 text-center relative group ${
                      stat.clickable ? "cursor-pointer" : ""
                    }`}
                  >
                    <div className="text-3xl font-bold text-blue-500">{stat.value}</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                      {stat.label}
                    </div>
                    
                    {stat.clickable && (
                      <>
                        {/* Click indicator on hover */}
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="absolute inset-0 bg-blue-500/5 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <span className="text-xs font-medium text-blue-500 bg-white dark:bg-zinc-900 px-3 py-1 rounded-full shadow-lg">
                            Click to view 🎓
                          </span>
                        </motion.div>
                        
                        {/* Subtle pulse animation */}
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Certifications Modal */}
              {showCertModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowCertModal(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto border border-zinc-200 dark:border-zinc-800"
                  >
                    {/* Modal Header */}
                    <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-t-2xl">
                      <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                          🎓 My Certifications
                        </h3>
                        <button
                          onClick={() => setShowCertModal(false)}
                          className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Modal Content */}
                    <div className="p-6 space-y-8">
                      {/* AWS Certifications */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" 
                            alt="AWS"
                            className="w-12 h-12"
                          />
                          <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                            Amazon Web Services
                          </h4>
                        </div>
                        <div className="space-y-3">
                          {certifications.aws.map((cert, index) => (
                            <motion.div
                              key={cert.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ x: 5 }}
                              className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-zinc-800 dark:to-zinc-800 rounded-xl border border-orange-200 dark:border-zinc-700 hover:shadow-lg transition-all"
                            >
                              <img 
                                src={cert.icon} 
                                alt={cert.name}
                                className="w-16 h-16 rounded-lg"
                              />
                              <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                                {cert.name}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Azure Certifications */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg" 
                            alt="Azure"
                            className="w-12 h-12"
                          />
                          <h4 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                            Microsoft Azure
                          </h4>
                        </div>
                        <div className="space-y-3">
                          {certifications.azure.map((cert, index) => (
                            <motion.div
                              key={cert.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: (index + 3) * 0.1 }}
                              whileHover={{ x: 5 }}
                              className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-sky-50 dark:from-zinc-800 dark:to-zinc-800 rounded-xl border border-blue-200 dark:border-zinc-700 hover:shadow-lg transition-all"
                            >
                              <img 
                                src={cert.icon} 
                                alt={cert.name}
                                className="w-16 h-16 rounded-lg"
                              />
                              <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                                {cert.name}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.section>

          {/* Skills */}
          <motion.section
            id="skills"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariant}
            className="space-y-12"
          >
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-blue-500"></div>
              <h2 className="text-4xl md:text-5xl font-bold">Skills</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-500 to-transparent"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Cloud & DevOps",
                  items: ["AWS", "CFT / CDK", "Docker", "CI/CD", "Terraform", "Kubernetes"],
                  icon: "☁️",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  title: "Programming",
                  items: ["Python", "FastAPI / Django", "Java", "NoSQL", "SQL",  "Bash", "GitHub Actions"],
                  icon: "💻",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  title: "Architecture",
                  items: ["Serverless", "Microservices", "Event-Driven", "Observability"],
                  icon: "🏗️",
                  gradient: "from-orange-500 to-red-500",
                },
                {
                  title: "AI & Machine Learning",
                  items: ["TensorFlow", "PyTorch", "scikit-learn", "OpenAI GPT", "LangChain", "VectorDBs"],
                  icon: "🤖",
                  gradient: "from-green-500 to-teal-500",
                }
              ].map((group, index) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${group.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity`}></div>
                  <div className="relative bg-white/70 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow">
                    <div className="text-4xl mb-4">{group.icon}</div>
                    <h3 className={`text-xl font-semibold mb-4 bg-gradient-to-r ${group.gradient} bg-clip-text text-transparent`}>
                      {group.title}
                    </h3>
                    <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="text-blue-500">▹</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>


          {/* Experience */}
          <motion.section
            id="experience"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariant}
            className="space-y-12"
          >
            <div className="flex items-center gap-4">
              <h2 className="text-4xl md:text-5xl font-bold">Experience</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-500 to-transparent"></div>
            </div>

            <div className="space-y-6">
              {experiences.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                    className={`
                      relative cursor-pointer
                      bg-white/70 dark:bg-zinc-900/80 backdrop-blur-sm 
                      border-2 rounded-2xl p-6 shadow-lg 
                      transition-all duration-300
                      ${expandedJob === job.id 
                        ? 'border-blue-500 shadow-2xl shadow-blue-500/20' 
                        : 'border-zinc-200 dark:border-zinc-800 hover:border-blue-400 dark:hover:border-blue-600'
                      }
                    `}
                  >
                    {/* Job Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        {/* Company Logo */}
                        <div className="w-14 h-14 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center flex-shrink-0 shadow-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                          <img 
                            src={job.companyLogo} 
                            alt={`${job.company} logo`}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>

                        {/* Job Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                              {job.role}
                            </h3>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <a
                              href={job.companyLinkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-semibold group transition-colors"
                            >
                              <span>{job.company}</span>
                              <FaLinkedin className="text-lg group-hover:scale-110 transition-transform" />
                            </a>
                          </div>

                          <div className="flex flex-wrap gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                            <span className="flex items-center gap-1">
                              📅 {job.period}
                            </span>
                            <span className="flex items-center gap-1">
                              📍 {job.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Expand/Collapse Icon */}
                      <motion.div
                        animate={{ rotate: expandedJob === job.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <FaChevronDown className={`text-2xl transition-colors ${
                          expandedJob === job.id ? 'text-blue-500' : 'text-zinc-400'
                        }`} />
                      </motion.div>
                    </div>

                    {/* Expandable Content */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedJob === job.id ? "auto" : 0,
                        opacity: expandedJob === job.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
                        {/* Job Description */}
                        <div>
                          <h4 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-3">
                            Key Responsibilities
                          </h4>
                          <ul className="space-y-2">
                            {job.description.map((item, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300"
                              >
                                <span className="text-blue-500 mt-1 flex-shrink-0">▹</span>
                                <span>{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Skills Tags */}
                        <div>
                          <h4 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-3">
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill, i) => (
                              <motion.span
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="px-3 py-1 text-sm rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-medium"
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Click Hint (shows when collapsed) */}
                    {expandedJob !== job.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute bottom-3 right-3 text-xs text-zinc-400 dark:text-zinc-500 hidden md:block"
                      >
                        Click to expand
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Timeline decoration (optional) */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent hidden lg:block"></div>
          </motion.section>

          {/* Contact */}
          <motion.section
            id="contact"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariant}
            className="space-y-12 text-center pb-10"
          >
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-blue-500"></div>
              <h2 className="text-4xl md:text-5xl font-bold">Get In Touch</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-500 to-transparent"></div>
            </div>
            
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Have a role in mind or want to collaborate? Feel free to reach out!
            </p>

            <div className="space-y-8">
              {/* Social Links */}
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { 
                    name: "Email", 
                    icon: <FaEnvelope className="text-2xl" />, 
                    href: "mailto:mongaprabhjot13@email.com",
                    gradient: "from-red-500/10 to-orange-500/10",
                    border: "border-red-500/30 hover:border-red-500",
                    textColor: "text-red-500 group-hover:text-red-600"
                  },
                  { 
                    name: "LinkedIn", 
                    icon: <FaLinkedin className="text-2xl" />, 
                    href: "https://linkedin.com/in/yourprofile",
                    gradient: "from-blue-500/10 to-blue-600/10",
                    border: "border-blue-500/30 hover:border-blue-500",
                    textColor: "text-blue-500 group-hover:text-blue-600"
                  },
                  { 
                    name: "GitHub", 
                    icon: <FaGithub className="text-2xl" />, 
                    href: "https://github.com/yourusername",
                    gradient: "from-gray-500/10 to-gray-600/10",
                    border: "border-gray-500/30 hover:border-gray-500 dark:border-gray-400/30 dark:hover:border-gray-400",
                    textColor: "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100"
                  },
                ].map((item, index) => (
                  <motion.a
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative px-8 py-4 rounded-2xl bg-gradient-to-br ${item.gradient} border ${item.border} transition-all shadow-lg hover:shadow-xl`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={item.textColor}>
                        {item.icon}
                      </span>
                      <span className={`text-lg font-medium ${item.textColor} transition-colors`}>
                        {item.name}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Resume Section */}
          <motion.section
            id="resume"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariant}
            className="space-y-8 text-center pb-20"
          >
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-purple-500"></div>
              <h2 className="text-4xl md:text-5xl font-bold">Resume</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-purple-500 to-transparent"></div>
            </div>
            
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Download my resume to learn more about my experience and skills
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <motion.a
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="/portfolio/resume.pdf"
                download="Prabhjot_Singh_Resume.pdf"
                className="group relative px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all overflow-hidden"
              >
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative flex items-center gap-3">
                  <FaFileDownload className="text-2xl group-hover:animate-bounce" />
                  <span>Download Resume</span>
                </div>
              </motion.a>
            </motion.div>
          </motion.section>
        </div>
      </main>

      <footer className="text-center py-10 text-zinc-500 border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} Prabhjot Singh
        </motion.p>
      </footer>
    </div>
  );
}