import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: new URL("https://micelioconstruccion.cl"),
  title: "Micelio | Ingeniería y Construcción de Vanguardia | Puerto Montt",
  description: "Soluciones integrales de ingeniería con tecnología avanzada. Desde la topografía aérea automatizada hasta el diseño y ejecución de infraestructura industrial en el sur de Chile.",
  keywords: ["Micelio", "Ingeniería Puerto Montt", "Construcción Puerto Montt", "Topografía Drones", "DJI Matrice Chile", "Infraestructura Industrial", "Movimiento de Tierras", "Obras Civiles Chile"],
  authors: [{ name: "Micelio S.A." }],
  openGraph: {
    title: "Micelio | Ingeniería y Construcción de Vanguardia",
    description: "Soluciones integrales de ingeniería con tecnología avanzada en el sur de Chile.",
    images: ["/assets/levantamiento_3d.png"],
    type: "website",
    locale: "es_CL",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

