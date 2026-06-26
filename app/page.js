"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// 4 Primary high-fidelity project gallery items for Section 10 (Indobi Project Grid)
const primaryProjects = [
  {
    id: 1,
    title: "Montaje Estructural Galpón Industrial R5",
    category: "Construcción",
    img: "/assets/WhatsApp Image 2026-06-10 at 21.15.58.jpeg",
    loc: "Ruta 5 Sur, Puerto Montt",
    coords: "41°27'10\"S, 72°58'55\"W",
    elevation: "82m",
    desc: "Izado, nivelación y fijación de columnas de acero estructural con recubrimiento de protección anticorrosiva pesada adaptada a la pluviosidad austral."
  },
  {
    id: 2,
    title: "Excavación de Fundaciones Especiales",
    category: "Movimiento Tierras",
    img: "/assets/WhatsApp Image 2026-06-10 at 21.15.58 (1).jpeg",
    loc: "Carretera Austral, Puerto Montt",
    coords: "41°28'50\"S, 72°51'40\"W",
    elevation: "45m",
    desc: "Preparación de sellos de fundación, compactaciones controladas y excavación masiva mediante maquinaria pesada guiada digitalmente en cota."
  },
  {
    id: 3,
    title: "Inspección Técnica de Obra Aeródromo",
    category: "Inspección ITO",
    img: "/assets/WhatsApp Image 2026-06-10 at 21.15.58 (2).jpeg",
    loc: "Ancud, Chiloé",
    coords: "41°52'12\"S, 73°49'33\"W",
    elevation: "65m",
    desc: "Monitoreo fotogramétrico regular, control geométrico 3D de volúmenes de tierra y fiscalización técnica del trazado de pistas auxiliares."
  }
];

// The 6 high-fidelity B2B services requested by the client
const servicesList = [
  {
    id: 1,
    title: "Construcción de estructuras metálicas",
    hoverTitle: "Estructuras Metálicas",
    desc: "Fabricación y montaje de galpones industriales, plataformas, pasarelas, bodegas, estructuras de apoyo, ampliaciones y obras metálicas para instalaciones productivas.",
    img: "/assets/WhatsApp Image 2026-06-10 at 21.15.58.jpeg",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Movimiento de tierras y enrocados",
    hoverTitle: "Movimiento de Tierras",
    desc: "Excavaciones, rellenos estructurales, estabilización de terrenos, conformación de plataformas y protección mediante enrocados para infraestructura industrial y costera.",
    img: "/assets/earthmoving.png",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11V5a2 2 0 00-2-2H4a2 2 0 00-2 2v6a13 13 0 002.28 7.68M12 11c0-3.517 1.009-6.799 2.753-9.571m3.44 2.04l-.054.09A13.916 13.916 0 0015 11v6a2 2 0 002 2h3a2 2 0 002-2v-6a13.012 13.012 0 00-2.28-7.68" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Obras civiles y minería",
    hoverTitle: "Obras Civiles y Minería",
    desc: "Ejecución de obras civiles para proyectos industriales, faenas mineras e infraestructura productiva, considerando movimiento de tierras, hormigones, fundaciones y montajes.",
    img: "/assets/WhatsApp Image 2026-06-10 at 21.15.58 (1).jpeg",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Agua potable y alcantarillado",
    hoverTitle: "Obras Sanitarias",
    desc: "Construcción, reparación y ampliación de redes de agua potable, alcantarillado y sistemas sanitarios para instalaciones industriales y proyectos públicos.",
    img: "/assets/WhatsApp Image 2026-06-10 at 21.16.00 (1).jpeg",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  },
  {
    id: 5,
    title: "Mantención industrial",
    hoverTitle: "Mantención Industrial",
    desc: "Servicios de mantención preventiva y correctiva de infraestructura, reparación de instalaciones, mejoramientos y apoyo permanente a operaciones industriales.",
    img: "/assets/WhatsApp Image 2026-06-10 at 21.16.14.jpeg",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  },
  {
    id: 6,
    title: "Topografía",
    hoverTitle: "Topografía y Drones RTK",
    desc: "Levantamientos topográficos mediante estación total, GPS y drones RTK para proyectos de ingeniería, construcción, control de obras y cubicaciones.",
    img: "/assets/drone_topography.png",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    )
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
        {mobileMenuOpen && (
          <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}></div>
        )}
        <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
          <button 
            className="mobile-menu-close-btn" 
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            ✕
          </button>
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
            <video className="slide-bg-video" autoPlay loop muted playsInline poster="/assets/levantamiento_3d.png">
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
            {servicesList.map((service) => (
              <div key={service.id} className="s-single-services">
                <div className="services-img-wrap">
                  <Image 
                    src={service.img} 
                    alt={service.title} 
                    fill 
                    sizes="(max-width: 992px) 100vw, 33vw"
                  />
                </div>
                <div className="h-service">
                  <h5>{service.title}</h5>
                </div>
                <div className="services-icon">
                  {service.icon}
                </div>
                
                {/* Overlay on Hover */}
                <div className="services-hover">
                  <div className="second-services-content">
                    <h5>{service.hoverTitle}</h5>
                    <p>{service.desc}</p>
                    <a href="#contacto" onClick={(e) => { e.preventDefault(); document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" }); }}>Cotizar Ahora</a>
                  </div>
                </div>
              </div>
            ))}
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
         SECTION 5B: SECTORES QUE ATENDEMOS
         ========================================== */}
      <section className="sectors-section section-padding" id="sectores">
        <div className="container">
          <div className="section-title center-align text-center">
            <h5>MERCADOS CLAVE</h5>
            <h2>Sectores que Atendemos</h2>
            <div className="section-title-bar"></div>
            <p className="section-intro-text">
              Garantizamos soluciones técnicas y seriedad operativa para los sectores más exigentes del sur de Chile.
            </p>
          </div>

          <div className="sectors-grid">
            
            {/* Sector 1 */}
            <div className="sector-card">
              <div className="sector-icon-box">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4>Industria Salmonera</h4>
              <p>Construcción y mantención de infraestructura productiva. Soluciones adaptadas a exigencias sanitarias, pluviales y costeras.</p>
            </div>

            {/* Sector 2 */}
            <div className="sector-card">
              <div className="sector-icon-box">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4>Sector Público</h4>
              <p>Ejecución de proyectos para municipios, ministerios y organismos del Estado. Rigurosidad en normativas y plazos públicos.</p>
            </div>

            {/* Sector 3 */}
            <div className="sector-card">
              <div className="sector-icon-box">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4>Empresas Privadas</h4>
              <p>Obras industriales, infraestructura y proyectos especiales llave en mano. Flexibilidad y soporte técnico de alto nivel.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
         SECTION 5C: ¿POR QUÉ MICELIO?
         ========================================== */}
      <section className="why-micelio-section section-padding">
        <div className="container">
          <div className="why-micelio-grid">
            
            {/* Left Column: Image/Visual details */}
            <div className="why-visual-panel">
              <div className="why-visual-frame">
                <Image 
                  src="/assets/WhatsApp Image 2026-06-10 at 21.15.58 (2).jpeg" 
                  alt="Control de Calidad Micelio" 
                  fill 
                  sizes="(max-width: 992px) 100vw, 40vw"
                />
                <div className="why-badge">B2B FOCUS</div>
              </div>
            </div>

            {/* Right Column: Key advantages */}
            <div className="why-content-panel">
              <h5>NUESTRO COMPROMISO</h5>
              <h2>¿Por qué Micelio?</h2>
              <div className="section-title-bar" style={{ margin: "15px 0 25px 0" }}></div>
              <p className="why-intro">
                Nos diferenciamos por integrar la ingeniería de detalle y la precisión geométrica digital en cada etapa de la construcción física.
              </p>
              
              <div className="why-advantages-list">
                <div className="adv-item">
                  <span className="adv-check">✓</span>
                  <div className="adv-text-wrap">
                    <h4>Profesionales con experiencia en terreno</h4>
                    <p>Dirección técnica de obras liderada por ingenieros civiles con amplia trayectoria en faenas australes.</p>
                  </div>
                </div>
                <div className="adv-item">
                  <span className="adv-check">✓</span>
                  <div className="adv-text-wrap">
                    <h4>Planificación y cumplimiento de plazos</h4>
                    <p>Gestión rigurosa de cronogramas para evitar desviaciones y asegurar la entrega oportuna del proyecto.</p>
                  </div>
                </div>
                <div className="adv-item">
                  <span className="adv-check">✓</span>
                  <div className="adv-text-wrap">
                    <h4>Equipos propios y asociados</h4>
                    <p>Disponibilidad inmediata de maquinaria pesada y equipamiento de precisión para asegurar la autonomía de la obra.</p>
                  </div>
                </div>
                <div className="adv-item">
                  <span className="adv-check">✓</span>
                  <div className="adv-text-wrap">
                    <h4>Soluciones llave en mano</h4>
                    <p>Desde el levantamiento inicial y el cálculo de fundaciones hasta el montaje final y la entrega en cota.</p>
                  </div>
                </div>
                <div className="adv-item">
                  <span className="adv-check">✓</span>
                  <div className="adv-text-wrap">
                    <h4>Cobertura en la Patagonia y sur de Chile</h4>
                    <p>Capacidad logística para movilizar recursos e infraestructura a zonas extremas y de difícil acceso.</p>
                  </div>
                </div>
                <div className="adv-item">
                  <span className="adv-check">✓</span>
                  <div className="adv-text-wrap">
                    <h4>Seguridad como prioridad operacional</h4>
                    <p>Rigurosos protocolos de prevención de riesgos para proteger el capital humano y asegurar faenas con cero incidentes.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
         SECTION 5D: CAPACIDADES TÉCNICAS
         ========================================== */}
      <section className="capabilities-section section-padding">
        <div className="container">
          <div className="section-title center-align text-center">
            <h5>SOLIDEZ E INGENIERÍA</h5>
            <h2>Capacidades</h2>
            <div className="section-title-bar"></div>
            <p className="section-intro-text">
              Detalle de nuestras especialidades operativas y alcance de ejecución técnica para contratos industriales.
            </p>
          </div>

          <div className="capabilities-table-wrapper">
            <table className="capabilities-table">
              <thead>
                <tr>
                  <th>Especialidad</th>
                  <th>Capacidad</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="cap-spec">Estructuras metálicas</td>
                  <td className="cap-val">Fabricación y montaje</td>
                </tr>
                <tr>
                  <td className="cap-spec">Movimiento de tierras</td>
                  <td className="cap-val">Excavaciones y rellenos</td>
                </tr>
                <tr>
                  <td className="cap-spec">Enrocados</td>
                  <td className="cap-val">Protección de riberas y taludes</td>
                </tr>
                <tr>
                  <td className="cap-spec">Obras civiles</td>
                  <td className="cap-val">Hormigón y fundaciones</td>
                </tr>
                <tr>
                  <td className="cap-spec">Obras sanitarias</td>
                  <td className="cap-val">Agua potable y alcantarillado</td>
                </tr>
                <tr>
                  <td className="cap-spec">Mantención</td>
                  <td className="cap-val">Infraestructura industrial</td>
                </tr>
                <tr>
                  <td className="cap-spec">Topografía</td>
                  <td className="cap-val">GPS, drones RTK y estación total</td>
                </tr>
              </tbody>
            </table>
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
         SECTION 9: TECNOLOGÍA TOPOGRÁFICA 3D (ANTIGRAVITY SHOWCASE)
         ========================================== */}
      <section className="topography-3d-area section-padding">
        
        {/* Antigravity Floating Background Particles */}
        <div className="antigravity-container">
          <div className="floating-orb floating-orb-1"></div>
          <div className="floating-orb floating-orb-2"></div>
          <div className="floating-orb floating-orb-3"></div>
          <div className="floating-orb floating-orb-4"></div>
        </div>

        <div className="container">
          <div className="section-title center-align text-center">
            <h2>Tecnología de Levantamiento Topográfico 3D</h2>
            <div className="section-title-bar"></div>
          </div>

          <div className="topo-3d-grid">
            
            {/* Left Column: Technical telemetry */}
            <div className="topo-3d-specs-card">
              <div className="specs-header">
                <span className="specs-badge">RTK PRECISION</span>
                <h3>Especificaciones Técnicas del Levantamiento</h3>
              </div>
              <p className="specs-intro">
                Procesamiento fotogramétrico centimétrico real mediante teledetección aérea y puntos de control terrestre (GCP) para el modelamiento digital de superficies.
              </p>
              <div className="specs-list">
                <div className="spec-item">
                  <div className="spec-label">Tecnología Sensor</div>
                  <div className="spec-value">Cámara RTK de Obturador Global (DJI Matrice)</div>
                </div>
                <div className="spec-item">
                  <div className="spec-label">Área del Proyecto</div>
                  <div className="spec-value">106.7 Hectáreas (59 Lotes delimitados)</div>
                </div>
                <div className="spec-item">
                  <div className="spec-label">Precisión Centimétrica</div>
                  <div className="spec-value">Horizontal: &lt; 1.5 cm / Vertical: &lt; 2.5 cm</div>
                </div>
                <div className="spec-item">
                  <div className="spec-label">Nube de Puntos 3D</div>
                  <div className="spec-value">450 Millones de puntos georreferenciados</div>
                </div>
                <div className="spec-item">
                  <div className="spec-label">Entregables Clave</div>
                  <div className="spec-value">Modelo Digital de Terreno, Curvas de Nivel, Ortofotocarta 3D</div>
                </div>
              </div>
              <div className="specs-footer-btn">
                <a href="#contacto" className="btn ss-btn" onClick={(e) => { e.preventDefault(); document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" }); }}>
                  Cotizar Levantamiento 3D
                </a>
              </div>
            </div>

            {/* Right Column: 3D Image Showcase with Scanner Laser & HUD */}
            <div className="topo-3d-visual-container">
              <div className="topo-3d-card-floating">
                {/* HUD Overlay details */}
                <div className="hud-overlay-top-left">SCANNING: ACTIVE</div>
                <div className="hud-overlay-top-right">GPS: RTK FIXED</div>
                <div className="hud-overlay-bottom-left">ALT: 115m // SCALE 1:1000</div>
                <div className="hud-overlay-bottom-right">SYS: conform</div>
                
                {/* Gold Scanning Laser Line */}
                <div className="scanning-laser-line"></div>
                
                <div className="topo-3d-image-wrapper">
                  <Image 
                    src="/assets/levantamiento_3d.png" 
                    alt="Levantamiento Topográfico 3D Micelio" 
                    fill
                    sizes="(max-width: 992px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
         SECTION 9B: EXPERIENCIA EN PROYECTOS PARA...
         ========================================== */}
      <section className="client-experience-section section-padding">
        <div className="container">
          <div className="section-title center-align text-center">
            <h5>NUESTRA TRAYECTORIA</h5>
            <h2>Experiencia en proyectos para</h2>
            <div className="section-title-bar"></div>
            <p className="section-intro-text">
              Respaldamos a diversos actores clave del desarrollo industrial y público en el sur de Chile.
            </p>
          </div>

          <div className="client-experience-grid">
            <div className="exp-client-card">
              <div className="exp-client-icon">🐟</div>
              <h4>Industria salmonera</h4>
              <p>Infraestructura terrestre y costera</p>
            </div>
            <div className="exp-client-card">
              <div className="exp-client-icon">🏗️</div>
              <h4>Constructoras</h4>
              <p>Montaje estructural y fundaciones</p>
            </div>
            <div className="exp-client-card">
              <div className="exp-client-icon">📐</div>
              <h4>Empresas de ingeniería</h4>
              <p>Soporte técnico y topografía RTK</p>
            </div>
            <div className="exp-client-card">
              <div className="exp-client-icon">🏢</div>
              <h4>Municipalidades</h4>
              <p>Obras civiles e infraestructura local</p>
            </div>
            <div className="exp-client-card">
              <div className="exp-client-icon">🏛️</div>
              <h4>Servicios Públicos</h4>
              <p>Proyectos sectoriales y viales</p>
            </div>
            <div className="exp-client-card">
              <div className="exp-client-icon">🏬</div>
              <h4>Empresas privadas</h4>
              <p>Galpones, tierras y obras especiales</p>
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
                  <span className="team-soon">(pronto)</span>
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
                  <span className="team-soon">(pronto)</span>
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
                  <span className="team-soon">(pronto)</span>
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
                  <h2>Micelio Construcción</h2>
                </div>
                <div className="footer-link">
                  <p style={{ fontWeight: "700", color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "1px", fontSize: "11px", marginBottom: "8px" }}>
                    Ingeniería • Construcción • Infraestructura Industrial • Topografía
                  </p>
                  <p style={{ fontSize: "14px", lineHeight: "24px" }}>
                    Construimos soluciones para la industria del sur de Chile.
                  </p>
                  <div className="f-contact" style={{ marginTop: "15px" }}>
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
                    <li><a href="#servicios" onClick={(e) => { e.preventDefault(); document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" }); }}>Construcción Estructuras Metálicas</a></li>
                    <li><a href="#servicios" onClick={(e) => { e.preventDefault(); document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" }); }}>Movimiento de Tierras y Enrocados</a></li>
                    <li><a href="#servicios" onClick={(e) => { e.preventDefault(); document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" }); }}>Obras Civiles y Minería</a></li>
                    <li><a href="#servicios" onClick={(e) => { e.preventDefault(); document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" }); }}>Agua Potable y Alcantarillado</a></li>
                    <li><a href="#servicios" onClick={(e) => { e.preventDefault(); document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" }); }}>Mantención Industrial</a></li>
                    <li><a href="#servicios" onClick={(e) => { e.preventDefault(); document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" }); }}>Topografía y Drones RTK</a></li>
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
                        onClick={() => setActiveLightbox(primaryProjects[2])}
                      />
                    </li>
                    <li>
                      <Image 
                        src="/assets/WhatsApp Image 2026-06-10 at 21.15.58.jpeg" 
                        alt="Galería 2" 
                        width={110} 
                        height={80} 
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveLightbox(primaryProjects[0])}
                      />
                    </li>
                    <li>
                      <Image 
                        src="/assets/WhatsApp Image 2026-06-10 at 21.16.17.jpeg" 
                        alt="Galería 3" 
                        width={110} 
                        height={80} 
                      />
                    </li>
                    <li>
                      <Image 
                        src="/assets/WhatsApp Image 2026-06-10 at 21.15.58 (1).jpeg" 
                        alt="Galería 4" 
                        width={110} 
                        height={80} 
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveLightbox(primaryProjects[1])}
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

        {/* Bottom copyright row - Seamlessly integrated into the footer's main flow */}
        <div className="container">
          <div className="copyright-row">
            {/* Silver blended logo - Scaled up & Prominent */}
            <Image 
              src="/assets/logo_corporativo.png" 
              alt="Micelio Logo" 
              width={240} 
              height={75} 
              priority
            />
            <div className="copy-text">
              Copyright &copy; 2026 MICELIO INGENIERÍA Y CONSTRUCCIÓN. Todos los derechos reservados. | Desarrollado por <a href="https://www.noweb.cl" target="_blank" rel="noopener noreferrer">noweb.dev</a>
            </div>
            
            {/* High-Fidelity Minimalist SVG Social Icons */}
            <div className="footer-social">
              <a href="#inicio" title="LinkedIn" aria-label="LinkedIn">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              </a>
              <a href="#inicio" title="Instagram" aria-label="Instagram">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 2H7C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5zm3 15c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10c1.65 0 3 1.35 3 3v10z M12 7.5c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z M17.25 5.5c-.41 0-.75.34-.75.75s.34.75.75.75.75-.34.75-.75-.34-.75-.75-.75z" />
                </svg>
              </a>
              <a href="#inicio" title="Facebook" aria-label="Facebook">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 13.5h2.5l1-3.5H14V7.8c0-.9.7-.9 1.5-.9H18V3.5c-.8-.1-2.2-.2-3.6-.2C11.5 3.3 9.5 5 9.5 8.5v1.5H7v3.5h2.5V22h5v-8.5z" />
                </svg>
              </a>
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
        <svg className="floating-wa-icon" viewBox="0 0 448 512" fill="currentColor">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-13.6-6.8-25-12-46.5-31-16.7-14.9-28-33.3-31.3-39-3.2-5.6-.3-8.6 2.5-11.4 2.5-2.5 5.6-6.5 8.3-9.8.9-1.1 1.9-2.3 2.8-3.4 1-1.2 1.7-2.4 2.5-3.8.8-1.4.4-2.8-.2-4.2-1-2.2-8.8-21.2-12.1-29.2-3.2-7.8-6.5-6.7-8.8-6.9-2.2-.2-4.7-.2-7.2-.2-2.5 0-6.5.9-10 4.7-3.7 3.9-13.9 13.6-13.9 33.2 0 19.5 14.2 38.4 16.2 41.1 2 2.7 28 42.7 67.7 59.9 9.5 4.1 16.9 6.6 22.7 8.5 10 3.2 19 2.7 26.2 1.6 8-1.2 24.6-10.1 28-19.3 3.4-9.3 3.4-17.2 2.4-19-1.1-1.8-3.7-2.7-9.2-5.5z" />
        </svg>
        <span className="wa-tooltip">Chat con un experto</span>
      </a>
    </>
  );
}
