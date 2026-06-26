"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// 4 Primary high-fidelity project gallery items for Section 10 (Indobi Project Grid)
const primaryProjects = [
  {
    id: 1,
    title: "Levantamiento Aerofotogramétrico Chamiza",
    category: "Topografía",
    img: "/assets/WhatsApp Image 2026-06-10 at 21.15.57.jpeg",
    loc: "Chamiza, Carretera Austral, Puerto Montt",
    coords: "41°28'44\"S, 72°51'32\"W",
    elevation: "115m",
    desc: "Mapeo centimétrico multiespectral de terrenos mediante drones DJI RTK para delimitación de curvas de nivel, cuencas viales y análisis hidrológico integral."
  },
  {
    id: 2,
    title: "Montaje Estructural Galpón Industrial R5",
    category: "Construcción",
    img: "/assets/WhatsApp Image 2026-06-10 at 21.15.58.jpeg",
    loc: "Ruta 5 Sur, Puerto Montt",
    coords: "41°27'10\"S, 72°58'55\"W",
    elevation: "82m",
    desc: "Izado, nivelación y fijación de columnas de acero estructural con recubrimiento de protección anticorrosiva pesada adaptada a la pluviosidad austral."
  },
  {
    id: 3,
    title: "Excavación de Fundaciones Especiales",
    category: "Movimiento Tierras",
    img: "/assets/WhatsApp Image 2026-06-10 at 21.15.58 (1).jpeg",
    loc: "Carretera Austral, Puerto Montt",
    coords: "41°28'50\"S, 72°51'40\"W",
    elevation: "45m",
    desc: "Preparación de sellos de fundación, compactaciones controladas y excavación masiva mediante maquinaria pesada guiada digitalmente en cota."
  },
  {
    id: 4,
    title: "Inspección Técnica de Obra Aeródromo",
    category: "Inspección ITO",
    img: "/assets/WhatsApp Image 2026-06-10 at 21.15.58 (2).jpeg",
    loc: "Ancud, Chiloé",
    coords: "41°52'12\"S, 73°49'33\"W",
    elevation: "65m",
    desc: "Monitoreo fotogramétrico regular, control geométrico 3D de volúmenes de tierra y fiscalización técnica del trazado de pistas auxiliares."
  }
];

// Testimonial list for Section 11
const testimonials = [
  {
    id: 1,
    quote: "El equipo de Micelio ejecutó el control de cota y la fotogrametría de nuestras naves comerciales en tiempo récord. La precisión de sus levantamientos DJI RTK redujo a la mitad el margen de error de nuestro contratista principal.",
    author: "Ignacio Silva T.",
    role: "Gerencia de Operaciones",
    company: "CERMAQ Chile",
    avatar: "/assets/WhatsApp Image 2026-06-10 at 21.16.06.jpeg"
  },
  {
    id: 2,
    quote: "Su respuesta técnica frente al desafío de fundaciones en suelos de alta pluviosidad fue excelente. La ITO digitalizada mediante nubes de puntos 3D nos permitió monitorear el avance diario sin necesidad de viajar a terreno.",
    author: "Rodrigo Vargas B.",
    role: "Director de Proyectos",
    company: "NOVAL Constructora",
    avatar: "/assets/WhatsApp Image 2026-06-10 at 21.16.11.jpeg"
  },
  {
    id: 3,
    quote: "Profesionales de alto nivel con equipamiento tecnológico real. Su control volumétrico en los movimientos de tierra de la Carretera Austral fue clave para la entrega conforme del proyecto vial.",
    author: "Cristian Gomez R.",
    role: "Departamento de Obras Civiles",
    company: "I. Municipalidad de Puerto Montt",
    avatar: "/assets/WhatsApp Image 2026-06-10 at 21.16.12.jpeg"
  }
];

// Google Reviews dataset for Section 6 (Infinite Marquee Loop)
const googleReviews = [
  {
    id: 1,
    author: "Juan Pablo Oyarzo",
    role: "Local Guide",
    avatarLetter: "J",
    avatarBg: "#ff5722",
    stars: 5,
    date: "Hace 2 semanas",
    text: "Excelente servicio de ingeniería. Realizaron un levantamiento aerotécnico en Chamiza con precisión centimétrica. Muy profesionales y equipados."
  },
  {
    id: 2,
    author: "Constanza Rebolledo",
    role: "Cliente Satisfecho",
    avatarLetter: "C",
    avatarBg: "#4caf50",
    stars: 5,
    date: "Hace 1 mes",
    text: "Diseñaron y calcularon el galpón industrial para nuestra planta en la Ruta 5. Estructura sólida y adaptada al viento austral. Totalmente recomendados."
  },
  {
    id: 3,
    author: "Andrés Valenzuela",
    role: "Local Guide",
    avatarLetter: "A",
    avatarBg: "#e91e63",
    stars: 5,
    date: "Hace 3 semanas",
    text: "La mejor empresa de topografía y movimiento de tierras de la región. Maquinaria guiada por GPS y precisión milimétrica en terreno."
  },
  {
    id: 4,
    author: "Roberto Munzenmayer",
    role: "Local Guide",
    avatarLetter: "R",
    avatarBg: "#00bcd4",
    stars: 5,
    date: "Hace 2 meses",
    text: "Gran servicio de inspección técnica de obra (ITO). Las nubes de puntos 3D facilitan enormemente el control de cubicaciones y plazos."
  },
  {
    id: 5,
    author: "Gabriela Solís",
    role: "Cliente Satisfecho",
    avatarLetter: "G",
    avatarBg: "#9c27b0",
    stars: 5,
    date: "Hace 1 mes",
    text: "Muy conformes con las obras hidráulicas y estabilización de taludes realizadas en Pelluco. Soluciones serias, profesionales y eficientes."
  }
];

export default function Home() {
  // Navigation & Layout States
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  // Slide carousel state (0, 1, 2)
  const [activeSlide, setActiveSlide] = useState(0);

  // HUD telemetry simulator
  const [telemetry, setTelemetry] = useState({
    height: 124.5,
    yaw: 182.4,
    battery: 88,
    lat: -41.4789,
    lon: -72.8596,
  });

  // Circle achievements values (initially 0, animate in)
  const [achievements, setAchievements] = useState({
    precision: 0,
    plazos: 0,
    seguridad: 0,
  });

  // Interactive Lightbox states
  const [activeLightbox, setActiveLightbox] = useState(null);

  // Testimonials active index
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Newsletter & Form submission
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [formFields, setFormFields] = useState({ name: "", email: "", message: "" });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Dynamic Quote Calculator States
  const [calcService, setCalcService] = useState("topografia");
  const [calcSize, setCalcSize] = useState(5);
  const [calcComplexity, setCalcComplexity] = useState("media");
  const [calcClientName, setCalcClientName] = useState("");
  const [calcClientEmail, setCalcClientEmail] = useState("");
  const [calcClientLoc, setCalcClientLoc] = useState("");

  // Sync default slider sizes based on selected service
  useEffect(() => {
    switch(calcService) {
      case "topografia": setCalcSize(5); break;
      case "calculo": setCalcSize(300); break;
      case "tierras": setCalcSize(1000); break;
      case "ito": setCalcSize(4); break;
      case "galpones": setCalcSize(500); break;
    }
  }, [calcService]);

  const getCalculationDetails = () => {
    let unit = "Hectáreas";
    let minSize = 1;
    let maxSize = 100;
    let step = 1;
    let label = "Superficie de Terreno";

    switch(calcService) {
      case "topografia":
        unit = "Hectáreas";
        minSize = 1;
        maxSize = 100;
        step = 1;
        label = "Superficie a Levantar";
        break;
      case "calculo":
        unit = "m²";
        minSize = 50;
        maxSize = 3000;
        step = 50;
        label = "Área a Calcular";
        break;
      case "tierras":
        unit = "m³";
        minSize = 100;
        maxSize = 10000;
        step = 100;
        label = "Volumen de Excavación";
        break;
      case "ito":
        unit = "Visitas Mensuales";
        minSize = 2;
        maxSize = 20;
        step = 1;
        label = "Frecuencia de Inspección";
        break;
      case "galpones":
        unit = "m²";
        minSize = 100;
        maxSize = 5000;
        step = 50;
        label = "Área del Galpón";
        break;
    }
    return { unit, minSize, maxSize, step, label };
  };

  const getEstimatedPrice = () => {
    let base = 0;
    let perUnit = 0;
    let mult = 1.0;

    if (calcComplexity === "media") mult = 1.2;
    if (calcComplexity === "alta") mult = 1.45;

    switch(calcService) {
      case "topografia":
        base = 220000;
        perUnit = 45000;
        break;
      case "calculo":
        base = 350000;
        perUnit = 1100;
        break;
      case "tierras":
        base = 450000;
        perUnit = 4200;
        break;
      case "ito":
        base = 500000;
        perUnit = 120000;
        break;
      case "galpones":
        base = 1100000;
        perUnit = 8000;
        break;
    }

    const total = (base + perUnit * calcSize) * mult;
    const min = Math.round((total * 0.9) / 5000) * 5000;
    const max = Math.round((total * 1.1) / 5000) * 5000;

    return { min, max };
  };

  const formatCLP = (amount) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleWhatsAppQuote = (e) => {
    e.preventDefault();
    if (!calcClientName || !calcClientEmail || !calcClientLoc) return;

    const { min, max } = getEstimatedPrice();
    const { unit } = getCalculationDetails();
    
    let serviceLabel = "";
    switch(calcService) {
      case "topografia": serviceLabel = "Topografía RTK con Drones"; break;
      case "calculo": serviceLabel = "Cálculo Estructural"; break;
      case "tierras": serviceLabel = "Movimiento de Tierras"; break;
      case "ito": serviceLabel = "Inspección Técnica de Obra (ITO)"; break;
      case "galpones": serviceLabel = "Montaje de Galpones Industriales"; break;
    }

    let complexityLabel = "Baja (Terreno plano/fácil)";
    if (calcComplexity === "media") complexityLabel = "Media (Boscoso/lomas)";
    if (calcComplexity === "alta") complexityLabel = "Alta (Pendiente fuerte/acantilado)";

    const messageText = `Hola Micelio, me gustaría cotizar un proyecto. Aquí están los detalles:\n\n` +
      `▪️ *Nombre:* ${calcClientName}\n` +
      `▪️ *Email:* ${calcClientEmail}\n` +
      `▪️ *Ubicación:* ${calcClientLoc}\n` +
      `▪️ *Servicio:* ${serviceLabel}\n` +
      `▪️ *Cantidad/Medida:* ${calcSize} ${unit}\n` +
      `▪️ *Complejidad:* ${complexityLabel}\n` +
      `▪️ *Rango Estimado:* ${formatCLP(min)} - ${formatCLP(max)} + IVA\n\n` +
      `Quedo atento a su evaluación técnica para coordinar en terreno.`;

    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=56998412345&text=${encodedText}`;
    
    window.open(whatsappUrl, "_blank");
  };

  // Scroll Listener (Sticky Header & Scroll Spy)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    // Scroll spy
    const sections = ["inicio", "servicios", "nosotros", "proyectos", "equipo", "contacto"];
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -40% 0px",
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((secId) => {
      const el = document.getElementById(secId);
      if (el) observer.observe(el);
    });

    // Trigger circular progress bars animation shortly after load
    setTimeout(() => {
      setAchievements({
        precision: 99.8,
        plazos: 98.5,
        seguridad: 100
      });
    }, 800);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // Slider Autoplay Interval (6 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Telemetry fluctuation simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const heightVar = Math.random() * 0.6 - 0.3;
        const yawVar = Math.random() * 2.4 - 1.2;
        const latVar = Math.random() * 0.0001 - 0.00005;
        const lonVar = Math.random() * 0.0001 - 0.00005;

        return {
          height: Math.max(100, Math.min(150, prev.height + heightVar)),
          yaw: (prev.yaw + yawVar + 360) % 360,
          battery: Math.random() > 0.98 ? Math.max(15, prev.battery - 1) : prev.battery,
          lat: prev.lat + latVar,
          lon: prev.lon + lonVar
        };
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Circular SVG offset computation (circumference is 2 * PI * r = 2 * 3.1415 * 40 = 251.32)
  const getStrokeOffset = (percentage) => {
    const circumference = 251.32;
    return circumference - (percentage / 100) * circumference;
  };

  // Form handlers
  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterSuccess(false);
      setNewsletterEmail("");
    }, 3000);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!formFields.name || !formFields.email || !formFields.message) return;
    setFormSubmitting(true);
    setTimeout(() => {
      setFormSubmitting(false);
      setFormSuccess(true);
      setFormFields({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <>
      {/* ==========================================
         SECTION 1: DUAL-BAR HEADER (INDOBI STYLE)
         ========================================== */}
      <header className={scrolled ? "scrolled" : ""}>
        {/* Top Info Bar */}
        <div className="header-top">
          <div className="container">
            <div className="top-bar-row">
              <div className="header-cta">
                <ul>
                  <li>
                    <svg className="icon" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>contacto@micelioconstruccion.cl</span>
                  </li>
                  <li>
                    <svg className="icon" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+56 9 9841 2345</span>
                  </li>
                </ul>
              </div>
              <div className="header-social">
                <span>
                  <a href="#inicio" title="Facebook" aria-label="Facebook">
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" style={{ display: "block" }}>
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                    </svg>
                  </a>
                  <a href="#inicio" title="LinkedIn" aria-label="LinkedIn">
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" style={{ display: "block" }}>
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </a>
                  <a href="#inicio" title="Instagram" aria-label="Instagram">
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" style={{ display: "block" }}>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                  </a>
                  <a href="#inicio" title="YouTube" aria-label="YouTube">
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" style={{ display: "block" }}>
                      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="menu-area">
          <div className="container">
            <div className="second-menu">
              {/* Logo */}
              <div className="logo">
                <a href="#inicio" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("inicio")?.scrollIntoView({ behavior: "smooth" });
                }}>
                  <Image 
                    src="/assets/logo_corporativo.png" 
                    alt="Micelio Ingeniería y Construcción" 
                    width={170} 
                    height={55} 
                    priority
                  />
                </a>
              </div>

              {/* Navigation Menu Links */}
              <nav className="main-menu">
                <ul>
                  {[
                    { id: "inicio", label: "Inicio" },
                    { id: "servicios", label: "Servicios" },
                    { id: "nosotros", label: "Nosotros" },
                    { id: "proyectos", label: "Proyectos" },
                    { id: "equipo", label: "Equipo" },
                    { id: "contacto", label: "Contacto" }
                  ].map((item) => (
                    <li key={item.id}>
                      <a 
                        href={`#${item.id}`} 
                        className={activeSection === item.id ? "active" : ""}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Action Button */}
              <div className="header-btn">
                <a 
                  href="#contacto" 
                  className="btn"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Cotizar Proyecto
                </a>
              </div>

              {/* Hamburger Mobile Toggle */}
              <button 
                className={`nav-toggle ${mobileMenuOpen ? "active" : ""}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
          <div className="mobile-menu-links">
            {[
              { 
                id: "inicio", 
                label: "Inicio",
                icon: (
                  <svg className="link-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                )
              },
              { 
                id: "servicios", 
                label: "Servicios",
                icon: (
                  <svg className="link-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )
              },
              { 
                id: "nosotros", 
                label: "Nosotros",
                icon: (
                  <svg className="link-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )
              },
              { 
                id: "proyectos", 
                label: "Proyectos",
                icon: (
                  <svg className="link-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )
              },
              { 
                id: "equipo", 
                label: "Equipo",
                icon: (
                  <svg className="link-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              { 
                id: "contacto", 
                label: "Contacto",
                icon: (
                  <svg className="link-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              }
            ].map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`}
                className={`mobile-menu-link ${activeSection === item.id ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </div>

          <a 
            href="#contacto"
            className="btn"
            style={{ width: "100%", textAlign: "center", marginTop: "10px" }}
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Cotizar Proyecto
          </a>

          {/* Bottom contact panel */}
          <div className="mobile-contact-panel">
            <div className="mobile-contact-item">
              <svg className="contact-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+56 9 9841 2345</span>
            </div>
            <div className="mobile-contact-item">
              <svg className="contact-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>contacto@micelioconstruccion.cl</span>
            </div>
            <div className="mobile-contact-item">
              <svg className="contact-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Carretera Austral, Chamiza, Puerto Montt</span>
            </div>
          </div>
        </div>
      </header>

      {/* ==========================================
         SECTION 2: HERO SLIDER (3 FULL SLIDES)
         ========================================== */}
      <section className="hero-slider-wrap" id="inicio">
        <div className="slider-container">
          
          {/* Slide 1: Drone topograhy video */}
          <div className={`single-slide ${activeSlide === 0 ? "active" : ""}`}>
            <video className="slide-bg-video" autoPlay loop muted playsInline poster="/assets/drone_topography.png">
              <source src="/assets/fondo.mp4" type="video/mp4" />
            </video>
            <div className="slide-overlay"></div>
            <div className="container slide-content-container">
              <div className="slide-content">
                <span className="hero-subtitle">INGENIERÍA & TOPOGRAFÍA AÉREA</span>
                <h2 className="hero-title">Proporcionamos Ortomosaicos Y Topografía <span>RTK</span> De Precisión.</h2>
                <p className="hero-description">
                  Levantamientos fotogramétricos con posicionamiento centimétrico y teledetección multiespectral adaptados a la geografía y pluviosidad austral.
                </p>
                <div className="hero-buttons">
                  <a href="#servicios" className="btn ss-btn" onClick={(e) => { e.preventDefault(); document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" }); }}>Nuestros Servicios</a>
                  <a href="#contacto" className="btn ss-btn active" onClick={(e) => { e.preventDefault(); document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" }); }}>Contáctenos</a>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2: Structural calculation */}
          <div className={`single-slide ${activeSlide === 1 ? "active" : ""}`}>
            <Image 
              src="/assets/industrial_design.png" 
              alt="Cálculo estructural de galpones" 
              fill 
              priority 
              className="slide-bg-image" 
            />
            <div className="slide-overlay"></div>
            <div className="container slide-content-container">
              <div className="slide-content">
                <span className="hero-subtitle">INFRAESTRUCTURA DE ACERO</span>
                <h2 className="hero-title">Diseño Y Montaje De Estructuras <span>Metálicas</span>.</h2>
                <p className="hero-description">
                  Cálculo de fundaciones profundas e ingeniería de detalle para naves industriales y galpones comerciales de gran luz en toda la Patagonia.
                </p>
                <div className="hero-buttons">
                  <a href="#proyectos" className="btn ss-btn" onClick={(e) => { e.preventDefault(); document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" }); }}>Ver Portafolio</a>
                  <a href="#contacto" className="btn ss-btn active" onClick={(e) => { e.preventDefault(); document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" }); }}>Cotizar Obra</a>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3: Excavation / Earthmoving */}
          <div className={`single-slide ${activeSlide === 2 ? "active" : ""}`}>
            <Image 
              src="/assets/earthmoving.png" 
              alt="Maquinaria y movimiento de tierras" 
              fill 
              priority 
              className="slide-bg-image" 
            />
            <div className="slide-overlay"></div>
            <div className="container slide-content-container">
              <div className="slide-content">
                <span className="hero-subtitle">MOVIMIENTO DE TIERRAS</span>
                <h2 className="hero-title">Excavaciones Masivas Con Control De <span>Cota</span>.</h2>
                <p className="hero-description">
                  Nivelación geométrica 3D, conformación de terraplenes y excavaciones de precisión en terrenos complejos con control de cota digital.
                </p>
                <div className="hero-buttons">
                  <a href="#proyectos" className="btn ss-btn" onClick={(e) => { e.preventDefault(); document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" }); }}>Ver Proyectos</a>
                  <a href="#contacto" className="btn ss-btn active" onClick={(e) => { e.preventDefault(); document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" }); }}>Oficina Técnica</a>
                </div>
              </div>
            </div>
          </div>


          {/* Controls */}
          <button 
            className="slider-arrow slider-arrow-prev" 
            onClick={() => setActiveSlide((prev) => (prev === 0 ? 2 : prev - 1))}
            aria-label="Previous slide"
          >
            ❮
          </button>
          <button 
            className="slider-arrow slider-arrow-next" 
            onClick={() => setActiveSlide((prev) => (prev + 1) % 3)}
            aria-label="Next slide"
          >
            ❯
          </button>

          {/* Scroll Down */}
          <a 
            href="#servicios" 
            className="hero-scroll-down"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>Explorar</span>
            <div className="scroll-indicator"></div>
          </a>
        </div>
      </section>

      {/* ==========================================
         SECTION 3: FEATURE BOXES (3 COLUMNS OVERLAY)
         ========================================== */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            
            {/* Box 1 */}
            <div className="feature-box">
              <div className="feature-icon-wrap">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <div className="feature-content">
                <h3>Topografía RTK</h3>
                <p>Nubes de puntos tridimensionales y georreferenciación centimétrica en tiempo real mediante drones DJI Enterprise.</p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="feature-box">
              <div className="feature-icon-wrap">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="feature-content">
                <h3>Ingeniería Sostenible</h3>
                <p>Cálculo y diseño estructural sismorresistente optimizado para galpones y cimientos industriales australes.</p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="feature-box">
              <div className="feature-icon-wrap">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div className="feature-content">
                <h3>Control de Cota</h3>
                <p>Nivelación precisa, cubicación digital y excavaciones controladas geométricamente por topografía diferencial.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
         SECTION 4: SERVICES SECTION (HOVER SLIDE OVERLAY)
         ========================================== */}
      <section className="services-section section-padding" id="servicios">
        <div className="container">
          <div className="section-title center-align text-center">
            <h2>Nuestros Servicios</h2>
          </div>

          <div className="services-grid-3">
            
            {/* Service 1 */}
            <div className="s-single-services">
              <div className="services-img-wrap">
                <Image 
                  src="/assets/drone_topography.png" 
                  alt="Topografía de Precisión" 
                  fill 
                  sizes="(max-width: 992px) 100vw, 33vw"
                />
              </div>
              <div className="h-service">
                <h5>Topografía de Precisión</h5>
              </div>
              <div className="services-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              
              {/* Overlay on Hover */}
              <div className="services-hover">
                <div className="second-services-content">
                  <h5>Topografía Aérea</h5>
                  <p>Levantamientos multiespectrales, control volumétrico de acopios y modelamiento digital de terrenos con drones DJI RTK.</p>
                  <a href="#contacto" onClick={(e) => { e.preventDefault(); document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" }); }}>Cotizar Ahora</a>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="s-single-services">
              <div className="services-img-wrap">
                <Image 
                  src="/assets/industrial_design.png" 
                  alt="Cálculo Estructural" 
                  fill 
                  sizes="(max-width: 992px) 100vw, 33vw"
                />
              </div>
              <div className="h-service">
                <h5>Cálculo Estructural</h5>
              </div>
              <div className="services-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              
              {/* Overlay on Hover */}
              <div className="services-hover">
                <div className="second-services-content">
                  <h5>Ingeniería de Detalle</h5>
                  <p>Cálculo y estructuración de losas, naves metálicas de gran luz y cimientos de hormigón armado para tránsito pesado.</p>
                  <a href="#contacto" onClick={(e) => { e.preventDefault(); document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" }); }}>Cotizar Ahora</a>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="s-single-services">
              <div className="services-img-wrap">
                <Image 
                  src="/assets/earthmoving.png" 
                  alt="Movimiento de Tierras" 
                  fill 
                  sizes="(max-width: 992px) 100vw, 33vw"
                />
              </div>
              <div className="h-service">
                <h5>Movimiento de Tierras</h5>
              </div>
              <div className="services-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              
              {/* Overlay on Hover */}
              <div className="services-hover">
                <div className="second-services-content">
                  <h5>Maquinaria y Cota</h5>
                  <p>Excavaciones controladas geométricamente, estabilización de taludes, escolleras de ribera y trazados viales certificados.</p>
                  <a href="#contacto" onClick={(e) => { e.preventDefault(); document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" }); }}>Cotizar Ahora</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
         SECTION 5: ABOUT US (TEXT LEFT, IMAGE RIGHT)
         ========================================== */}
      <section className="about-section section-padding" id="nosotros">
        <div className="container">
          <div className="about-grid">
            
            {/* Left Column: Content */}
            <div className="about-content2">
              <h5>SOBRE MICELIO</h5>
              <h2>Ingeniería Industrial De Vanguardia En El Sur De Chile.</h2>
              <p>
                Establecidos en Puerto Montt, en Micelio unimos la ingeniería conceptual y de detalle con herramientas tecnológicas de última generación para dar respuesta a proyectos complejos de infraestructura, movimiento de tierras y topografía en toda la Patagonia.
              </p>
              
              <ul>
                <li>
                  <span className="icon">✓</span>
                  <span>Mapeo fotogramétrico con precisión diferencial centimétrica (RTK).</span>
                </li>
                <li>
                  <span className="icon">✓</span>
                  <span>Ingeniería estructural e industrial optimizada contra sismicidad y viento.</span>
                </li>
                <li>
                  <span className="icon">✓</span>
                  <span>Maquinaria pesada controlada geométricamente para exactitud en cota.</span>
                </li>
              </ul>

              <div className="experience-text">
                <div className="exp-no">
                  <span>10<sub>+</sub></span>
                  <p>Años de trayectoria</p>
                </div>
                <div className="exp-text">
                  Garantizamos exactitud geométrica en cada levantamiento y solidez física en cada montaje de galpón industrial, asegurando obras confiables bajo la pluviosidad austral.
                </div>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="s-about-img">
              <Image 
                src="/assets/WhatsApp Image 2026-06-10 at 21.16.17.jpeg" 
                alt="Operaciones en terreno de Micelio" 
                fill 
                sizes="(max-width: 992px) 100vw, 40vw"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
         SECTION 6: GOOGLE REVIEWS INFINITE MARQUEE
         ========================================== */}
      <section className="reviews-marquee-area">
        <div className="reviews-marquee-active">
          <div className="reviews-marquee-track">
            {/* Infinite review block (duplicated to enable loop) */}
            {googleReviews.concat(googleReviews).map((review, idx) => (
              <div key={`${review.id}-${idx}`} className="google-review-card">
                {/* Google "G" SVG Logo in Top-Right */}
                <div className="review-google-logo">
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                  </svg>
                </div>
                
                <div className="review-card-header">
                  <div className="review-avatar" style={{ backgroundColor: review.avatarBg }}>
                    {review.avatarLetter}
                  </div>
                  <div className="review-author-meta">
                    <h5>{review.author}</h5>
                    <p>{review.role}</p>
                  </div>
                </div>

                <div className="review-stars">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <p className="review-text-content">
                  "{review.text}"
                </p>
                <div className="review-date-stamp">{review.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
         SECTION 7: ACHIEVEMENTS & CIRCULAR PROGRESS
         ========================================== */}
      <section className="achievements-section section-padding">
        <div className="container">
          <div className="achievements-grid">
            
            {/* Left Column: Circular Progresses */}
            <div className="progress-outer">
              
              {/* Circle 1 */}
              <div className="progress-box">
                <div className="circular-progress-wrap">
                  <svg width="100" height="100">
                    <circle cx="50" cy="50" r="40" stroke="#eeeeee" strokeWidth="8" fill="transparent" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      stroke="var(--color-accent)" 
                      strokeWidth="8" 
                      fill="transparent" 
                      strokeDasharray="251.32" 
                      strokeDashoffset={getStrokeOffset(achievements.precision)}
                      style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
                    />
                  </svg>
                  <div className="progress-value">{achievements.precision.toFixed(1)}%</div>
                </div>
                <p>Precisión RTK</p>
              </div>

              {/* Circle 2 */}
              <div className="progress-box">
                <div className="circular-progress-wrap">
                  <svg width="100" height="100">
                    <circle cx="50" cy="50" r="40" stroke="#eeeeee" strokeWidth="8" fill="transparent" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      stroke="var(--color-accent)" 
                      strokeWidth="8" 
                      fill="transparent" 
                      strokeDasharray="251.32" 
                      strokeDashoffset={getStrokeOffset(achievements.plazos)}
                      style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
                    />
                  </svg>
                  <div className="progress-value">{achievements.plazos.toFixed(1)}%</div>
                </div>
                <p>Plazos de Obra</p>
              </div>

              {/* Circle 3 */}
              <div className="progress-box">
                <div className="circular-progress-wrap">
                  <svg width="100" height="100">
                    <circle cx="50" cy="50" r="40" stroke="#eeeeee" strokeWidth="8" fill="transparent" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      stroke="var(--color-accent)" 
                      strokeWidth="8" 
                      fill="transparent" 
                      strokeDasharray="251.32" 
                      strokeDashoffset={getStrokeOffset(achievements.seguridad)}
                      style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
                    />
                  </svg>
                  <div className="progress-value">{achievements.seguridad}%</div>
                </div>
                <p>Seguridad HSE</p>
              </div>

            </div>

            {/* Right Column: Narrative & Signature */}
            <div className="achievements-content">
              <h2>Vea Lo Que Hemos Logrado En Terreno.</h2>
              <p>
                Garantizamos la fidelidad geométrica milimétrica de nuestras cubicaciones y la rigidez estructural de las naves que diseñamos y montamos. Operamos bajo las condiciones pluviales más adversas de la Patagonia, asegurando la continuidad de sus faenas.
              </p>
              <p>
                Nuestros procesos técnicos y el uso de drones DJI Enterprise georreferenciados por antenas RTK nos permiten entregar planos, volúmenes e informes periciales libres de desviaciones.
              </p>

              <div className="achievements-profile-row">
                <div className="achivments-outer">
                  <div className="img-avatar">
                    <Image 
                      src="/assets/WhatsApp Image 2026-06-10 at 21.16.06.jpeg" 
                      alt="Ignacio Silva T." 
                      width={60} 
                      height={60} 
                    />
                  </div>
                  <div className="text">
                    <h5>Ignacio Silva T.</h5>
                    <p>Director de Proyectos - Micelio</p>
                  </div>
                </div>
                
                {/* Simulated handwritten signature block */}
                <div className="signature-wrap">
                  <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "28px", color: "var(--color-navy)", opacity: 0.85 }}>
                    I. Silva T.
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
         SECTION 8: LATEST PROJECTS (DARK BACKGROUND, HOVER ZOOM FIGCAPTION)
         ========================================== */}
      <section className="project-two" id="proyectos">
        <div className="container">
          <div className="project-title-row">
            <h2>Nuestros Últimos Proyectos</h2>
            <a 
              href="#contacto" 
              className="btn ss-btn"
              onClick={(e) => { e.preventDefault(); document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              Ver Todos Los Proyectos
            </a>
          </div>

          <div className="project-grid-full">
            {primaryProjects.map((proj) => (
              <div 
                key={proj.id} 
                className="grid-item hover-zoomin"
                onClick={() => setActiveLightbox(proj)}
              >
                <figure className="gallery-image">
                  <Image 
                    src={proj.img} 
                    alt={proj.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    loading="lazy"
                  />
                  <figcaption>
                    <h4>{proj.title}</h4>
                    <p>{proj.category}</p>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
         SECTION 9: TESTIMONIALS (MAP PATTERN BG)
         ========================================== */}
      <section className="testimonial-area section-padding">
        <div className="container">
          <div className="section-title center-align text-center">
            <h2>Qué Dicen Nuestros Clientes</h2>
          </div>

          <div className="testimonial-active2">
            <div className="single-testimonial">
              <div className="testi-author-avatar">
                <Image 
                  src={testimonials[activeTestimonial].avatar} 
                  alt={testimonials[activeTestimonial].author} 
                  width={85} 
                  height={85} 
                />
              </div>
              <div className="ta-info">
                <h6>{testimonials[activeTestimonial].author}</h6>
                <span>{testimonials[activeTestimonial].role} // {testimonials[activeTestimonial].company}</span>
              </div>
              <p>“{testimonials[activeTestimonial].quote}”</p>
            </div>

            {/* Dot Selectors */}
            <div className="test-dots-testimonials">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx} 
                  className={activeTestimonial === idx ? "active" : ""}
                  onClick={() => setActiveTestimonial(idx)}
                  aria-label={`View testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
         SECTION 10: EXPERT TEAM (DARK BACKGROUND)
         ========================================== */}
      <section className="team-area2 section-padding" id="equipo">
        <div className="container">
          <div className="section-title center-align text-center">
            <h2>Nuestro Equipo Experto</h2>
          </div>

          <div className="team-grid-3">
            
            {/* Member 1 */}
            <div className="single-team">
              <div className="team-thumb">
                <div className="team-avatar-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
              </div>
              <div className="team-info">
                <h4>Ignacio Silva T.</h4>
                <p>Director General de Proyectos</p>
                <div className="team-social">
                  <ul>
                    <li className="social-linkedin">
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn Ignacio" aria-label="LinkedIn Ignacio">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                      </a>
                    </li>
                    <li className="social-email">
                      <a href="mailto:contacto@micelioconstruccion.cl" title="Email Ignacio" aria-label="Email Ignacio">
                        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Member 2 */}
            <div className="single-team">
              <div className="team-thumb">
                <div className="team-avatar-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
              </div>
              <div className="team-info">
                <h4>Laura Mendez V.</h4>
                <p>Jefa de Ingeniería Estructural</p>
                <div className="team-social">
                  <ul>
                    <li className="social-linkedin">
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn Laura" aria-label="LinkedIn Laura">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                      </a>
                    </li>
                    <li className="social-email">
                      <a href="mailto:contacto@micelioconstruccion.cl" title="Email Laura" aria-label="Email Laura">
                        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Member 3 */}
            <div className="single-team">
              <div className="team-thumb">
                <div className="team-avatar-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
              </div>
              <div className="team-info">
                <h4>Carlos Soto R.</h4>
                <p>Jefe de Operaciones en Terreno</p>
                <div className="team-social">
                  <ul>
                    <li className="social-linkedin">
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn Carlos" aria-label="LinkedIn Carlos">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                      </a>
                    </li>
                    <li className="social-email">
                      <a href="mailto:contacto@micelioconstruccion.cl" title="Email Carlos" aria-label="Email Carlos">
                        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
         SECTION 11: TECHNICAL OFFICE & DYNAMIC CALCULATOR
         ========================================== */}
      <section className="contact-area section-padding" id="contacto">
        <div className="container">
          <div className="contact-grid">
            
            {/* Left Side: Info & Stats */}
            <div className="contact-info-block">
              <div className="section-title left-align">
                <h2>Hablemos De Tu Proyecto</h2>
              </div>
              <p>
                Nuestra oficina técnica se encuentra en Chamiza, Carretera Austral. Utilice nuestro cotizador digital a la derecha para calcular un presupuesto inicial estimado y envíenos los detalles directamente a nuestro WhatsApp de ingeniería.
              </p>

              <div className="office-info">
                <h4 className="office-manager">Ignacio Silva T.</h4>
                <p className="office-address">Dirección General de Proyectos</p>
                <p className="office-location">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, color: "var(--color-accent)", marginRight: "10px" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Carretera Austral, Chamiza, Puerto Montt</span>
                </p>
              </div>

              <div className="contact-stats">
                <div className="stat-item">
                  <div className="stat-num">45+</div>
                  <div className="stat-label">Proyectos ejecutados</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">99.8%</div>
                  <div className="stat-label">Fidelidad de cota</div>
                </div>
              </div>
            </div>

            {/* Right Side: Dynamic Quote Calculator */}
            <div className="calculator-card">
              <div className="calculator-title">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: "var(--color-accent)", marginRight: "10px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <h3>Cotizador Digital De Proyectos</h3>
              </div>

              <form onSubmit={handleWhatsAppQuote}>
                
                {/* 1. Service Select Grid */}
                <div style={{ marginBottom: "25px" }}>
                  <label style={{ display: "block", marginBottom: "10px", fontWeight: "700", color: "var(--color-navy)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    1. Seleccione el Servicio Técnico
                  </label>
                  <div className="service-selector-grid">
                    
                    <button 
                      type="button"
                      className={`service-select-btn ${calcService === "topografia" ? "active" : ""}`}
                      onClick={() => setCalcService("topografia")}
                    >
                      <svg className="btn-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 4L9 7" />
                      </svg>
                      <span>Topografía</span>
                    </button>

                    <button 
                      type="button"
                      className={`service-select-btn ${calcService === "calculo" ? "active" : ""}`}
                      onClick={() => setCalcService("calculo")}
                    >
                      <svg className="btn-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>Cálculo</span>
                    </button>

                    <button 
                      type="button"
                      className={`service-select-btn ${calcService === "tierras" ? "active" : ""}`}
                      onClick={() => setCalcService("tierras")}
                    >
                      <svg className="btn-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                      <span>Mov. Tierras</span>
                    </button>

                    <button 
                      type="button"
                      className={`service-select-btn ${calcService === "ito" ? "active" : ""}`}
                      onClick={() => setCalcService("ito")}
                    >
                      <svg className="btn-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                      <span>Inspección ITO</span>
                    </button>

                    <button 
                      type="button"
                      className={`service-select-btn ${calcService === "galpones" ? "active" : ""}`}
                      onClick={() => setCalcService("galpones")}
                    >
                      <svg className="btn-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
                      </svg>
                      <span>Estructuras</span>
                    </button>

                  </div>
                </div>

                {/* 2. Interactive Area/Size Slider */}
                <div className="calculator-slider-wrap">
                  <div className="slider-label-row">
                    <span className="slider-label">2. {getCalculationDetails().label}</span>
                    <span className="slider-value-badge">
                      {calcSize} {getCalculationDetails().unit}
                    </span>
                  </div>
                  <input 
                    type="range"
                    className="premium-slider"
                    min={getCalculationDetails().minSize}
                    max={getCalculationDetails().maxSize}
                    step={getCalculationDetails().step}
                    value={calcSize}
                    onChange={(e) => setCalcSize(Number(e.target.value))}
                  />
                </div>

                {/* 3. Complexity Toggles */}
                <div className="complexity-selector-wrap">
                  <label style={{ display: "block", marginBottom: "10px", fontWeight: "700", color: "var(--color-navy)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    3. Complejidad o Tipo de Terreno
                  </label>
                  <div className="complexity-grid">
                    <button 
                      type="button" 
                      className={`complexity-btn ${calcComplexity === "baja" ? "active" : ""}`}
                      onClick={() => setCalcComplexity("baja")}
                    >
                      Baja (Fácil)
                    </button>
                    <button 
                      type="button" 
                      className={`complexity-btn ${calcComplexity === "media" ? "active" : ""}`}
                      onClick={() => setCalcComplexity("media")}
                    >
                      Media (Estándar)
                    </button>
                    <button 
                      type="button" 
                      className={`complexity-btn ${calcComplexity === "alta" ? "active" : ""}`}
                      onClick={() => setCalcComplexity("alta")}
                    >
                      Alta (Complejo)
                    </button>
                  </div>
                </div>

                {/* 4. Live Price Counter Box */}
                <div className="price-display-box">
                  <div className="price-box-title">PRESUPUESTO ESTIMADO INICIAL</div>
                  <div className="price-range">
                    {formatCLP(getEstimatedPrice().min)} - {formatCLP(getEstimatedPrice().max)}
                  </div>
                  <p className="price-disclaimer">
                    *Valores netos aproximados en CLP + IVA. Sujeto a factibilidad en terreno.
                  </p>
                </div>

                {/* 5. Personal Details Form Fields */}
                <div className="calc-inputs-grid">
                  
                  <div className="calc-input-group">
                    <label htmlFor="calc-name">Nombre / Empresa</label>
                    <input 
                      type="text" 
                      id="calc-name"
                      className="calc-field" 
                      placeholder="Ej. Constructora Sur"
                      value={calcClientName}
                      onChange={(e) => setCalcClientName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="calc-input-group">
                    <label htmlFor="calc-email">Email de Contacto</label>
                    <input 
                      type="email" 
                      id="calc-email"
                      className="calc-field" 
                      placeholder="Ej. contacto@empresa.cl"
                      value={calcClientEmail}
                      onChange={(e) => setCalcClientEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="calc-input-group full-width">
                    <label htmlFor="calc-loc">Ubicación del Terreno (Comuna / Sector)</label>
                    <input 
                      type="text" 
                      id="calc-loc"
                      className="calc-field" 
                      placeholder="Ej. Chamiza, Puerto Montt"
                      value={calcClientLoc}
                      onChange={(e) => setCalcClientLoc(e.target.value)}
                      required
                    />
                  </div>

                </div>

                {/* 6. WhatsApp Submit Button */}
                <button type="submit" className="whatsapp-btn">
                  <svg className="wa-icon" viewBox="0 0 24 24" style={{ marginRight: "10px", width: "20px", height: "20px" }}>
                    <path fill="currentColor" d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.517 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.429 0 9.85-4.411 9.853-9.842 0-2.632-1.022-5.105-2.877-6.963C16.386 1.98 13.91 .957 12.007.957 6.58 0 .957 2.158 4.417 4.962.956 7.593.955 10.065 2.812 11.922c1.857 1.857 4.331 2.877 6.963 2.875zM12.008 2.094c-5.419 0-9.83 4.402-9.833 9.808 0 1.901.493 3.75 1.427 5.367l-.953 3.483 3.582-.937c1.558.847 3.308 1.294 5.093 1.295 5.418 0 9.831-4.401 9.834-9.808.001-2.62-1.018-5.084-2.869-6.935C17.085 3.111 14.623 2.095 12.008 2.094zm4.516 6.516c-.247-.124-1.464-.722-1.692-.805-.228-.083-.394-.124-.56.124-.166.248-.641.805-.786.969-.145.165-.29.186-.538.062-.248-.124-1.048-.386-1.995-1.232-.738-.658-1.236-1.47-1.381-1.719-.145-.248-.015-.383.109-.506.112-.111.248-.29.372-.435.124-.145.166-.248.248-.414.083-.166.041-.31-.02-.435-.062-.124-.56-1.352-.767-1.849-.202-.486-.407-.421-.56-.428-.145-.007-.311-.008-.477-.008s-.435.062-.663.31c-.228.248-.87.848-.87 2.068 0 1.22.889 2.4 1.013 2.565.124.165 1.748 2.67 4.236 3.743.592.255 1.053.407 1.413.522.595.19 1.137.163 1.565.099.477-.072 1.464-.599 1.671-1.178.207-.58.207-1.077.145-1.178-.062-.101-.228-.166-.475-.29z" />
                  </svg>
                  <span>Cotizar Vía WhatsApp 💬</span>
                </button>

              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
         SECTION 13: RICH DEEP NAVY FOOTER
         ========================================== */}
      <footer className="footer-bg">

        {/* Middle Footer links */}
        <div className="footer-top pb-70">
          <div className="container">
            <div className="footer-grid-4">
              
              {/* Col 1: About Us info */}
              <div className="footer-widget">
                <div className="f-widget-title">
                  <h2>Sobre Nosotros</h2>
                </div>
                <div className="footer-link">
                  <p>Soluciones conceptuales, de detalle y ejecución de obras civiles, topografía con drones y cubicación de tierras de alta precisión en la región de Los Lagos.</p>
                  <div className="f-contact">
                    <ul>
                      <li>
                        <span className="icon">📞</span>
                        <span>+56 9 9841 2345<br />contacto@micelioconstruccion.cl</span>
                      </li>
                      <li>
                        <span className="icon">📍</span>
                        <span>Carretera Austral, Chamiza<br />Puerto Montt, Chile</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Col 2: Quick Links */}
              <div className="footer-widget">
                <div className="f-widget-title">
                  <h2>Otros Enlaces</h2>
                </div>
                <div className="footer-link">
                  <ul>
                    <li><a href="#inicio" onClick={(e) => { e.preventDefault(); document.getElementById("inicio")?.scrollIntoView({ behavior: "smooth" }); }}>Inicio</a></li>
                    <li><a href="#nosotros" onClick={(e) => { e.preventDefault(); document.getElementById("nosotros")?.scrollIntoView({ behavior: "smooth" }); }}>Sobre Nosotros</a></li>
                    <li><a href="#servicios" onClick={(e) => { e.preventDefault(); document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" }); }}>Servicios</a></li>
                    <li><a href="#proyectos" onClick={(e) => { e.preventDefault(); document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" }); }}>Proyectos</a></li>
                    <li><a href="#equipo" onClick={(e) => { e.preventDefault(); document.getElementById("equipo")?.scrollIntoView({ behavior: "smooth" }); }}>Nuestro Equipo</a></li>
                  </ul>
                </div>
              </div>

              {/* Col 3: Services */}
              <div className="footer-widget">
                <div className="f-widget-title">
                  <h2>Servicios</h2>
                </div>
                <div className="footer-link">
                  <ul>
                    <li><a href="#servicios" onClick={(e) => { e.preventDefault(); document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" }); }}>Topografía Aérea</a></li>
                    <li><a href="#servicios" onClick={(e) => { e.preventDefault(); document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" }); }}>Cálculo Estructural</a></li>
                    <li><a href="#servicios" onClick={(e) => { e.preventDefault(); document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" }); }}>Movimiento Tierras</a></li>
                    <li><a href="#servicios" onClick={(e) => { e.preventDefault(); document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" }); }}>Montaje de Galpones</a></li>
                    <li><a href="#servicios" onClick={(e) => { e.preventDefault(); document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" }); }}>Inspección ITO</a></li>
                  </ul>
                </div>
              </div>

              {/* Col 4: Instagram style Work Gallery */}
              <div className="footer-widget">
                <div className="f-widget-title">
                  <h2>Galería de Trabajo</h2>
                </div>
                <div className="f-insta">
                  <ul>
                    <li>
                      <Image 
                        src="/assets/WhatsApp Image 2026-06-10 at 21.15.58 (2).jpeg" 
                        alt="Galería 1" 
                        width={110} 
                        height={80} 
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveLightbox(primaryProjects[3])}
                      />
                    </li>
                    <li>
                      <Image 
                        src="/assets/WhatsApp Image 2026-06-10 at 21.15.58.jpeg" 
                        alt="Galería 2" 
                        width={110} 
                        height={80} 
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveLightbox(primaryProjects[1])}
                      />
                    </li>
                    <li>
                      <Image 
                        src="/assets/WhatsApp Image 2026-06-10 at 21.15.57.jpeg" 
                        alt="Galería 3" 
                        width={110} 
                        height={80} 
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveLightbox(primaryProjects[0])}
                      />
                    </li>
                    <li>
                      <Image 
                        src="/assets/WhatsApp Image 2026-06-10 at 21.15.58 (1).jpeg" 
                        alt="Galería 4" 
                        width={110} 
                        height={80} 
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveLightbox(primaryProjects[2])}
                      />
                    </li>
                    <li>
                      <Image 
                        src="/assets/WhatsApp Image 2026-06-10 at 21.16.14 (1).jpeg" 
                        alt="Galería 5" 
                        width={110} 
                        height={80} 
                        style={{ cursor: "pointer" }}
                      />
                    </li>
                    <li>
                      <Image 
                        src="/assets/WhatsApp Image 2026-06-10 at 21.16.15.jpeg" 
                        alt="Galería 6" 
                        width={110} 
                        height={80} 
                        style={{ cursor: "pointer" }}
                      />
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="copyright-wrap">
          <div className="container">
            <div className="copyright-row">
              {/* Silver blended logo */}
              <Image 
                src="/assets/logo_corporativo.png" 
                alt="Micelio Logo" 
                width={130} 
                height={40} 
              />
              <div className="copy-text">
                Copyright &copy; 2026 MICELIO INGENIERÍA Y CONSTRUCCIÓN. Todos los derechos reservados.
              </div>
              <div className="footer-social">
                <a href="#inicio">In</a>
                <a href="#inicio">Ig</a>
                <a href="#inicio">Fb</a>
              </div>
            </div>
          </div>
        </div>

      </footer>

      {/* ==========================================
         PORTFOLIO TECHNICAL LIGHTBOX MODAL
         ========================================== */}
      {activeLightbox && (
        <div className="lightbox-modal" role="dialog" aria-modal="true">
          <div className="lightbox-overlay" onClick={() => setActiveLightbox(null)}></div>
          <div className="lightbox-content-card">
            <button className="lightbox-close-btn" onClick={() => setActiveLightbox(null)}>✕</button>
            <div className="lightbox-img-wrap">
              <Image 
                src={activeLightbox.img} 
                alt={activeLightbox.title} 
                fill
                sizes="90vw"
                className="lightbox-img"
              />
            </div>
            <div className="lightbox-meta-panel">
              <span className="gallery-item-tag" style={{ fontSize: "11px", fontWeight: "700", color: "var(--color-accent)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "5px", display: "block" }}>
                {activeLightbox.category}
              </span>
              <h3 style={{ fontSize: "22px", color: "var(--color-navy)", fontWeight: "700", marginBottom: "15px", lineHeight: "1.3" }}>
                {activeLightbox.title}
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "24px", color: "var(--color-text)", marginBottom: "25px" }}>
                {activeLightbox.desc}
              </p>
              
              <div className="lightbox-tech-grid">
                <div className="hud-line">
                  <span style={{ fontWeight: "700", color: "var(--color-navy)", fontSize: "11px", minWidth: "120px", display: "inline-block" }}>UBICACIÓN:</span>
                  <span style={{ fontSize: "13px", color: "var(--color-text)" }}>{activeLightbox.loc}</span>
                </div>
                <div className="hud-line">
                  <span style={{ fontWeight: "700", color: "var(--color-navy)", fontSize: "11px", minWidth: "120px", display: "inline-block" }}>COORDENADAS:</span>
                  <span style={{ fontSize: "13px", color: "var(--color-accent)", fontWeight: "600" }}>{activeLightbox.coords}</span>
                </div>
                <div className="hud-line">
                  <span style={{ fontWeight: "700", color: "var(--color-navy)", fontSize: "11px", minWidth: "120px", display: "inline-block" }}>ELEVACIÓN:</span>
                  <span style={{ fontSize: "13px", color: "var(--color-text)" }}>{activeLightbox.elevation}</span>
                </div>
                <div className="hud-line">
                  <span style={{ fontWeight: "700", color: "var(--color-navy)", fontSize: "11px", minWidth: "120px", display: "inline-block" }}>SISTEMA:</span>
                  <span style={{ fontSize: "11px", color: "var(--color-accent)", fontWeight: "bold", fontFamily: "monospace" }}>RTK_GPS // CONNECTED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
         CONTACT SUCCESS MODAL
         ========================================== */}
      <div className={`modal ${formSuccess ? "active" : ""}`} role="dialog" aria-modal="true">
        <div className="modal-overlay" onClick={() => setFormSuccess(false)}></div>
        <div className="modal-card">
          <div className="modal-icon">
            <svg width="35" height="35" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="modal-title">Consulta Registrada</h3>
          <p className="modal-desc">
            Su consulta técnica ha sido recibida con éxito y registrada en el sistema de proyectos de Micelio. Un ingeniero especialista se pondrá en contacto a la brevedad para coordinar la evaluación en terreno.
          </p>
          <button className="btn" style={{ width: "100%" }} onClick={() => setFormSuccess(false)}>
            Entendido
          </button>
        </div>
      </div>

      {/* Floating WhatsApp Button in bottom-left - Company Colors & Tooltip */}
      <a 
        href="https://api.whatsapp.com/send?phone=56998412345&text=Hola%20Micelio%2C%20me%20gustar%C3%ADa%20realizar%20una%20consulta%20t%C3%A9cnica."
        className="floating-whatsapp-btn"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <svg className="floating-wa-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.517 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.429 0 9.85-4.411 9.853-9.842 0-2.632-1.022-5.105-2.877-6.963C16.386 1.98 13.91 .957 12.007.957 6.58 0 .957 2.158 4.417 4.962.956 7.593.955 10.065 2.812 11.922c1.857 1.857 4.331 2.877 6.963 2.875zM12.008 2.094c-5.419 0-9.83 4.402-9.833 9.808 0 1.901.493 3.75 1.427 5.367l-.953 3.483 3.582-.937c1.558.847 3.308 1.294 5.093 1.295 5.418 0 9.831-4.401 9.834-9.808.001-2.62-1.018-5.084-2.869-6.935C17.085 3.111 14.623 2.095 12.008 2.094zm4.516 6.516c-.247-.124-1.464-.722-1.692-.805-.228-.083-.394-.124-.56.124-.166.248-.641.805-.786.969-.145.165-.29.186-.538.062-.248-.124-1.048-.386-1.995-1.232-.738-.658-1.236-1.47-1.381-1.719-.145-.248-.015-.383.109-.506.112-.111.248-.29.372-.435.124-.145.166-.248.248-.414.083-.166.041-.31-.02-.435-.062-.124-.56-1.352-.767-1.849-.202-.486-.407-.421-.56-.428-.145-.007-.311-.008-.477-.008s-.435.062-.663.31c-.228.248-.87.848-.87 2.068 0 1.22.889 2.4 1.013 2.565.124.165 1.748 2.67 4.236 3.743.592.255 1.053.407 1.413.522.595.19 1.137.163 1.565.099.477-.072 1.464-.599 1.671-1.178.207-.58.207-1.077.145-1.178-.062-.101-.228-.166-.475-.29z" />
        </svg>
        <span className="wa-tooltip">Chat con un experto</span>
      </a>
    </>
  );
}
