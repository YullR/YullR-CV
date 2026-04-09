import { useState, useEffect, useRef } from "react";

const COLORS = {
  navy: "#0B1D3A",
  navyMid: "#152C52",
  navyLight: "#1E3F70",
  emerald: "#10B981",
  emeraldDark: "#059669",
  slate: "#64748B",
  slateLight: "#94A3B8",
  offWhite: "#F0F4F8",
  white: "#FFFFFF",
  cardBg: "#0F2340",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: ${COLORS.navy};
    color: ${COLORS.offWhite};
    overflow-x: hidden;
  }

  h1, h2, h3, .serif {
    font-family: 'Playfair Display', serif;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${COLORS.navy}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.emerald}; border-radius: 3px; }

  .fade-in {
    animation: fadeIn 0.7s ease forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse-emerald {
    0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
    50% { box-shadow: 0 0 0 8px rgba(16,185,129,0); }
  }

  @keyframes slideLeft {
    from { width: 0; }
    to { width: var(--target-width); }
  }

  .skill-bar-fill {
    animation: slideLeft 1.2s ease forwards;
    animation-delay: var(--delay, 0s);
  }

  .card-hover {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .card-hover:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(16,185,129,0.15);
  }

  .nav-link {
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${COLORS.slateLight};
    transition: color 0.2s;
    padding: 6px 0;
    border-bottom: 2px solid transparent;
  }
  .nav-link:hover, .nav-link.active {
    color: ${COLORS.emerald};
    border-bottom-color: ${COLORS.emerald};
  }

  .filter-btn {
    padding: 8px 20px;
    border-radius: 2px;
    border: 1px solid ${COLORS.navyLight};
    background: transparent;
    color: ${COLORS.slateLight};
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.06em;
    cursor: pointer;
    transition: all 0.2s;
    text-transform: uppercase;
  }
  .filter-btn:hover {
    border-color: ${COLORS.emerald};
    color: ${COLORS.emerald};
  }
  .filter-btn.active {
    background: ${COLORS.emerald};
    border-color: ${COLORS.emerald};
    color: ${COLORS.navy};
    font-weight: 600;
  }

  .chat-input {
    background: ${COLORS.navyMid};
    border: 1px solid ${COLORS.navyLight};
    color: ${COLORS.offWhite};
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    padding: 12px 16px;
    border-radius: 4px;
    outline: none;
    flex: 1;
    transition: border-color 0.2s;
  }
  .chat-input:focus {
    border-color: ${COLORS.emerald};
  }
  .chat-input::placeholder {
    color: ${COLORS.slate};
  }

  .send-btn {
    background: ${COLORS.emerald};
    border: none;
    color: ${COLORS.navy};
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 13px;
    padding: 12px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
    white-space: nowrap;
  }
  .send-btn:hover { background: ${COLORS.emeraldDark}; }
  .send-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .section-tag {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${COLORS.emerald};
  }

  .divider {
    height: 1px;
    background: linear-gradient(90deg, ${COLORS.emerald}, transparent);
    margin: 12px 0;
  }

  .timeline-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${COLORS.emerald};
    border: 2px solid ${COLORS.navy};
    box-shadow: 0 0 0 3px ${COLORS.emerald}40;
    flex-shrink: 0;
    margin-top: 4px;
    animation: pulse-emerald 2.5s infinite;
  }

  .timeline-dot.past {
    animation: none;
    background: ${COLORS.navyLight};
    box-shadow: 0 0 0 3px ${COLORS.navyLight}40;
  }

  .stat-card {
    background: ${COLORS.cardBg};
    border: 1px solid ${COLORS.navyLight};
    border-radius: 6px;
    padding: 20px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: ${COLORS.emerald};
  }
`;

// ── DATA ─────────────────────────────────────────────────────────────────────

const skills = [
  { name: "Soporte TI Nivel 1 & 2", level: 97, cat: "soporte" },
  { name: "Gestión de Tickets (GLPI / SLA)", level: 95, cat: "soporte" },
  { name: "Soporte Remoto (TeamViewer / AnyDesk)", level: 95, cat: "soporte" },
  { name: "Windows Server", level: 88, cat: "infra" },
  { name: "Ubuntu Server (Linux)", level: 82, cat: "infra" },
  { name: "Redes LAN & WiFi", level: 85, cat: "infra" },
  { name: "Office 365 / Entra ID", level: 90, cat: "software" },
  { name: "Hardware & Configuración", level: 90, cat: "software" },
  { name: "Documentación Técnica", level: 93, cat: "soporte" },
  { name: "Diagnóstico & Troubleshooting", level: 96, cat: "soporte" },
];

const statsData = [
  { value: "10+", label: "Años de Experiencia" },
  { value: "1 & 2", label: "Niveles de Soporte" },
  { value: "SLA", label: "Cumplimiento garantizado" },
  { value: "100%", label: "Disponibilidad Remota" },
];

const techBadges = ["GLPI", "TeamViewer", "AnyDesk", "Windows Server", "Ubuntu Server", "Office 365", "Entra ID", "LAN/WiFi", "Active Directory", "CompTIA A+*", "ITIL 4*"];

const timeline = [
  {
    period: "2015 – Actualidad",
    title: "Ingeniero de Soporte TI / Coordinador de Mesa de Ayuda",
    company: "Universidad Libre",
    current: true,
    bullets: [
      "Soporte técnico N1 y N2 a docentes, administrativos y estudiantes — hardware, software y conectividad.",
      "Operación de GLPI: ciclo completo de ticket (registro → categorización → resolución → cierre) con cumplimiento SLA.",
      "Soporte remoto via TeamViewer / AnyDesk — resolución sin desplazamiento físico.",
      "Administración de servidores Windows Server y Ubuntu Server (físicos y virtuales).",
      "Gestión de red LAN/WiFi institucional: switches, routers y puntos de acceso.",
      "Administración de Office 365: usuarios, contraseñas, autenticación e incidencias.",
      "Escalamiento con proveedores tecnológicos en casos complejos.",
      "Capacitaciones e inducciones tecnológicas a usuarios finales.",
    ],
  },
  {
    period: "2010 – 2012",
    title: "Auxiliar de Soporte TI",
    company: "Universidad Francisco de Paula Santander",
    current: false,
    bullets: [
      "Soporte técnico al personal académico y administrativo.",
      "Mantenimiento preventivo y correctivo de equipos de cómputo.",
      "Configuración de equipos y soporte básico de conectividad de red.",
    ],
  },
];

const education = [
  {
    degree: "Maestría en Pedagogía para la Era Digital",
    school: "Universidad Libre",
    status: "En curso",
    icon: "🎓",
  },
  {
    degree: "Especialización en Gerencia de Proyectos",
    school: "Universidad Libre",
    status: "Completado",
    icon: "📋",
  },
  {
    degree: "Ingeniería de Sistemas",
    school: "Universidad Francisco de Paula Santander",
    status: "Completado",
    icon: "💻",
  },
];

const certs = [
  { name: "EF/SET C1 — Inglés", status: "Obtenido", color: COLORS.emerald },
  { name: "CompTIA A+", status: "Planificado", color: COLORS.slateLight },
  { name: "ITIL 4 Foundation", status: "Planificado", color: COLORS.slateLight },
];

// ── COMPONENTS ───────────────────────────────────────────────────────────────

function Navbar({ activeSection, setActiveSection }) {
  const links = ["Inicio", "Habilidades", "Experiencia", "Educación", "Contacto"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: `${COLORS.navy}ee`,
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${COLORS.navyLight}`,
      padding: "0 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 60,
    }}>
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: COLORS.white }}>
        YR<span style={{ color: COLORS.emerald }}>.</span>
      </span>
      <div style={{ display: "flex", gap: 32 }}>
        {links.map(l => (
          <span
            key={l}
            className={`nav-link${activeSection === l ? " active" : ""}`}
            onClick={() => {
              setActiveSection(l);
              document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
            }}
          >{l}</span>
        ))}
      </div>
      <span style={{
        fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
        color: COLORS.emerald, border: `1px solid ${COLORS.emerald}`,
        padding: "4px 10px", borderRadius: 2,
      }}>
        DISPONIBLE REMOTO
      </span>
    </nav>
  );
}

function Hero() {
  return (
    <section id="inicio" style={{
      minHeight: "100vh",
      background: `radial-gradient(ellipse at 70% 40%, ${COLORS.navyLight}55 0%, transparent 60%), ${COLORS.navy}`,
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "100px 60px 60px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Grid decorative */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: `linear-gradient(${COLORS.offWhite} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.offWhite} 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      {/* Emerald accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: 4, height: "100%",
        background: `linear-gradient(180deg, ${COLORS.emerald}, transparent)`,
      }} />

      <div style={{ maxWidth: 820, position: "relative" }}>
        <p className="section-tag fade-in" style={{ animationDelay: "0.1s" }}>
          Ingeniero de Sistemas · Soporte TI · Colombia
        </p>
        <div className="divider" style={{ width: 80, marginTop: 16, marginBottom: 24 }} />

        <h1 className="fade-in" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(42px, 6vw, 80px)",
          fontWeight: 900,
          lineHeight: 1.08,
          color: COLORS.white,
          animationDelay: "0.2s",
        }}>
          Yull Ramírez
        </h1>
        <h2 className="fade-in" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(18px, 3vw, 32px)",
          fontWeight: 400,
          color: COLORS.emerald,
          marginTop: 8,
          animationDelay: "0.3s",
        }}>
          Especialista en Soporte TI & Mesa de Ayuda
        </h2>

        <p className="fade-in" style={{
          marginTop: 28,
          fontSize: 17,
          lineHeight: 1.75,
          color: COLORS.slateLight,
          maxWidth: 620,
          animationDelay: "0.4s",
        }}>
          Más de <strong style={{ color: COLORS.white }}>10 años</strong> garantizando la continuidad operativa tecnológica de instituciones. 
          Resolución de incidencias N1/N2, gestión integral bajo SLA y soporte remoto — 
          <strong style={{ color: COLORS.emerald }}> sin importar la distancia</strong>.
        </p>

        {/* Stats row */}
        <div className="fade-in" style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16, marginTop: 48, animationDelay: "0.5s",
        }}>
          {statsData.map((s, i) => (
            <div key={i} className="stat-card">
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: COLORS.white }}>
                {s.value}
              </div>
              <div style={{ fontSize: 11, color: COLORS.slateLight, marginTop: 4, letterSpacing: "0.05em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="fade-in" style={{ display: "flex", gap: 16, marginTop: 40, animationDelay: "0.6s" }}>
          <a href="mailto:yullr@outlook.com" style={{
            background: COLORS.emerald, color: COLORS.navy,
            fontWeight: 700, fontSize: 13, letterSpacing: "0.08em",
            padding: "14px 28px", borderRadius: 3, textDecoration: "none",
            textTransform: "uppercase", transition: "background 0.2s",
          }}>
            Contactar ahora
          </a>
          <a href="https://www.linkedin.com/in/yullramirez" target="_blank" rel="noreferrer" style={{
            background: "transparent", color: COLORS.offWhite,
            fontWeight: 600, fontSize: 13, letterSpacing: "0.08em",
            padding: "14px 28px", borderRadius: 3, textDecoration: "none",
            textTransform: "uppercase", border: `1px solid ${COLORS.navyLight}`,
            transition: "border-color 0.2s",
          }}>
            LinkedIn →
          </a>
        </div>
      </div>
    </section>
  );
}

function SkillsPanel() {
  const [catFilter, setCatFilter] = useState("all");
  const filtered = catFilter === "all" ? skills : skills.filter(s => s.cat === catFilter);
  const cats = ["all", "soporte", "infra", "software"];
  const catLabels = { all: "Todas", soporte: "Soporte & Gestión", infra: "Infraestructura", software: "Software & Apps" };

  return (
    <section id="habilidades" style={{
      padding: "90px 60px",
      background: `linear-gradient(180deg, ${COLORS.navy} 0%, ${COLORS.navyMid}88 100%)`,
    }}>
      <p className="section-tag">Panel de Competencias</p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 700, color: COLORS.white, marginTop: 8 }}>
        Stack Tecnológico
      </h2>
      <div className="divider" style={{ width: 100, marginBottom: 32 }} />

      {/* Filter buttons */}
      <div style={{ display: "flex", gap: 10, marginBottom: 36, flexWrap: "wrap" }}>
        {cats.map(c => (
          <button key={c} className={`filter-btn${catFilter === c ? " active" : ""}`} onClick={() => setCatFilter(c)}>
            {catLabels[c]}
          </button>
        ))}
      </div>

      {/* Skill bars */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 48px", maxWidth: 900 }}>
        {filtered.map((sk, i) => (
          <div key={sk.name}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.offWhite }}>{sk.name}</span>
              <span style={{ fontSize: 12, color: COLORS.emerald, fontWeight: 600 }}>{sk.level}%</span>
            </div>
            <div style={{ background: COLORS.navyLight, borderRadius: 2, height: 5, overflow: "hidden" }}>
              <div
                className="skill-bar-fill"
                style={{
                  height: "100%",
                  background: `linear-gradient(90deg, ${COLORS.emerald}, ${COLORS.emeraldDark})`,
                  borderRadius: 2,
                  "--target-width": `${sk.level}%`,
                  "--delay": `${i * 0.07}s`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Tech badge cloud */}
      <div style={{ marginTop: 52 }}>
        <p style={{ fontSize: 12, color: COLORS.slate, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
          Herramientas & Tecnologías
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {techBadges.map(t => (
            <span key={t} style={{
              padding: "6px 14px",
              background: COLORS.cardBg,
              border: `1px solid ${COLORS.navyLight}`,
              borderRadius: 2,
              fontSize: 12, fontWeight: 500,
              color: COLORS.slateLight,
              letterSpacing: "0.04em",
            }}>{t}</span>
          ))}
        </div>
        <p style={{ fontSize: 11, color: COLORS.slate, marginTop: 10 }}>* Planificado</p>
      </div>
    </section>
  );
}

function ExperienceTimeline() {
  const [filter, setFilter] = useState("experiencia");

  return (
    <section id="experiencia" style={{ padding: "90px 60px", background: COLORS.navy }}>
      <p className="section-tag">Trayectoria Profesional</p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 700, color: COLORS.white, marginTop: 8 }}>
        Línea de Tiempo
      </h2>
      <div className="divider" style={{ width: 100, marginBottom: 32 }} />

      {/* Area filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 44, flexWrap: "wrap" }}>
        {["experiencia", "tecnologias", "educacion"].map(f => (
          <button
            key={f}
            className={`filter-btn${filter === f ? " active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f === "experiencia" ? "Experiencia" : f === "tecnologias" ? "Tecnologías" : "Educación"}
          </button>
        ))}
      </div>

      {filter === "experiencia" && (
        <div style={{ position: "relative", paddingLeft: 36 }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute", left: 6, top: 0, bottom: 0, width: 2,
            background: `linear-gradient(180deg, ${COLORS.emerald}, ${COLORS.navyLight})`,
          }} />

          {timeline.map((item, i) => (
            <div key={i} style={{ position: "relative", marginBottom: 48 }}>
              <div style={{ position: "absolute", left: -30, top: 4 }}>
                <div className={`timeline-dot${item.current ? "" : " past"}`} />
              </div>

              <div className="card-hover" style={{
                background: COLORS.cardBg,
                border: `1px solid ${item.current ? COLORS.emerald + "55" : COLORS.navyLight}`,
                borderRadius: 6,
                padding: "24px 28px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: COLORS.white }}>
                      {item.title}
                    </h3>
                    <p style={{ color: COLORS.emerald, fontSize: 13, fontWeight: 600, marginTop: 4 }}>{item.company}</p>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
                    color: item.current ? COLORS.emerald : COLORS.slateLight,
                    border: `1px solid ${item.current ? COLORS.emerald : COLORS.navyLight}`,
                    padding: "4px 10px", borderRadius: 2, whiteSpace: "nowrap",
                  }}>
                    {item.period}
                  </span>
                </div>

                <ul style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                  {item.bullets.map((b, j) => (
                    <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: COLORS.emerald, marginTop: 2, fontSize: 12 }}>▸</span>
                      <span style={{ fontSize: 14, color: COLORS.slateLight, lineHeight: 1.6 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {filter === "tecnologias" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {[
            { icon: "🖥️", name: "Windows Server", desc: "Admin de servidores, AD, GPO, roles & features" },
            { icon: "🐧", name: "Ubuntu Server", desc: "CLI, servicios, ssh, actualizaciones, seguridad" },
            { icon: "🌐", name: "Redes LAN/WiFi", desc: "Switches, routers, APs, diagnóstico de conectividad" },
            { icon: "📧", name: "Office 365", desc: "Usuarios, licencias, correo, autenticación MFA" },
            { icon: "🎫", name: "GLPI", desc: "Gestión de tickets, SLA, inventario de activos TI" },
            { icon: "🔗", name: "Soporte Remoto", desc: "TeamViewer, AnyDesk, acceso sin desplazamiento" },
            { icon: "🔧", name: "Hardware", desc: "Diagnóstico, mantenimiento, configuración de equipos" },
            { icon: "📋", name: "Documentación", desc: "Procedimientos, KB, reportes de incidencias" },
          ].map((t, i) => (
            <div key={i} className="card-hover stat-card" style={{ textAlign: "left" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{t.icon}</div>
              <div style={{ fontWeight: 600, color: COLORS.white, fontSize: 14, marginBottom: 6 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: COLORS.slateLight, lineHeight: 1.6 }}>{t.desc}</div>
            </div>
          ))}
        </div>
      )}

      {filter === "educacion" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 680 }}>
          {education.map((e, i) => (
            <div key={i} className="card-hover" style={{
              background: COLORS.cardBg,
              border: `1px solid ${COLORS.navyLight}`,
              borderRadius: 6,
              padding: "22px 24px",
              display: "flex", gap: 18, alignItems: "flex-start",
            }}>
              <div style={{ fontSize: 32 }}>{e.icon}</div>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: COLORS.white }}>
                  {e.degree}
                </h3>
                <p style={{ color: COLORS.emerald, fontSize: 13, marginTop: 4 }}>{e.school}</p>
                <span style={{
                  display: "inline-block", marginTop: 8,
                  fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
                  color: e.status === "En curso" ? COLORS.emerald : COLORS.slateLight,
                  border: `1px solid ${e.status === "En curso" ? COLORS.emerald : COLORS.navyLight}`,
                  padding: "3px 8px", borderRadius: 2,
                }}>
                  {e.status}
                </span>
              </div>
            </div>
          ))}

          {/* Certifications */}
          <div style={{ marginTop: 20 }}>
            <p className="section-tag" style={{ marginBottom: 14 }}>Certificaciones</p>
            {certs.map((c, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px 0",
                borderBottom: `1px solid ${COLORS.navyLight}`,
              }}>
                <span style={{ fontSize: 14, color: COLORS.offWhite }}>{c.name}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: c.color, letterSpacing: "0.08em" }}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hola, soy el **Asistente IA de Yull**. Puedes preguntarme: *¿Cómo resolvería Yull mis incidencias de red?* o *¿Qué experiencia tiene con Windows Server?* — Estoy aquí para ayudarte a conocer su perfil.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const SYSTEM = `Eres el asistente IA del perfil profesional de Yull Ramírez, Ingeniero de Sistemas y Especialista en Soporte TI con más de 10 años de experiencia. Tu misión es responder preguntas de reclutadores o empresas que buscan contratar soporte TI remoto.

Contexto sobre Yull:
- Experiencia: 10+ años en soporte técnico N1 y N2 en Universidad Libre (2015-actualidad) y UFPS (2010-2012).
- Habilidades: GLPI, TeamViewer, AnyDesk, Windows Server, Ubuntu Server, redes LAN/WiFi, Office 365, diagnóstico de hardware/software.
- Modalidad: 100% disponible para trabajo remoto desde Colombia.
- Idiomas: Español nativo, Inglés intermedio-alto (C1 EF/SET).
- Educación: Ing. Sistemas + Especialización Gerencia Proyectos + Maestría en curso.
- Certificaciones: EF/SET C1; CompTIA A+ e ITIL 4 planificados.

Responde siempre en español, con un tono profesional y convincente. Si preguntan sobre resolución de incidencias, describe el proceso detallado que Yull seguiría. Sé conciso pero completo. Máximo 150 palabras por respuesta.`;

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const updatedMsgs = [...messages.filter(m => m.role !== "assistant" || messages.indexOf(m) > 0), userMsg];
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const apiMessages = updatedMsgs
        .filter(m => m.role !== "assistant" || updatedMsgs.indexOf(m) > 0)
        .map(m => ({ role: m.role, content: m.content }));

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM,
          messages: apiMessages,
        }),
      });
      const data = await res.json();
      const reply = data.content?.map(b => b.text || "").join("") || "Lo siento, no pude procesar esa consulta.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Error de conexión. Por favor intenta de nuevo." }]);
    } finally {
      setLoading(false);
    }
  }

  function renderMessage(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, `<strong style="color:${COLORS.white}">$1</strong>`)
      .replace(/\*(.*?)\*/g, `<em style="color:${COLORS.emerald}">$1</em>`);
  }

  const suggestions = [
    "¿Cómo resuelvo mis incidencias con Yull?",
    "¿Qué experiencia tiene con Windows Server?",
    "¿Puede trabajar en zona horaria diferente?",
    "¿Cómo gestiona múltiples tickets simultáneos?",
  ];

  return (
    <section id="contacto" style={{
      padding: "90px 60px",
      background: `linear-gradient(180deg, ${COLORS.navyMid}55, ${COLORS.navy})`,
    }}>
      <p className="section-tag">Asistente Inteligente</p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 700, color: COLORS.white, marginTop: 8 }}>
        Ingeniero de Sistemas<span style={{ color: COLORS.emerald }}>+</span>
      </h2>
      <p style={{ color: COLORS.slateLight, fontSize: 14, marginTop: 8, marginBottom: 32 }}>
        Pregúntale a la IA sobre el perfil de Yull — disponibilidad, habilidades, resolución de incidencias y más.
      </p>

      <div style={{ maxWidth: 720 }}>
        {/* Suggestion chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => setInput(s)} style={{
              background: COLORS.cardBg, border: `1px solid ${COLORS.navyLight}`,
              color: COLORS.slateLight, fontSize: 12, padding: "6px 12px",
              borderRadius: 2, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = COLORS.emerald; e.target.style.color = COLORS.emerald; }}
              onMouseLeave={e => { e.target.style.borderColor = COLORS.navyLight; e.target.style.color = COLORS.slateLight; }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Chat window */}
        <div style={{
          background: COLORS.cardBg,
          border: `1px solid ${COLORS.navyLight}`,
          borderRadius: 6,
          overflow: "hidden",
        }}>
          {/* Chat header */}
          <div style={{
            padding: "12px 20px",
            borderBottom: `1px solid ${COLORS.navyLight}`,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: `linear-gradient(135deg, ${COLORS.emerald}, ${COLORS.navyLight})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14,
            }}>🤖</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.white }}>Asistente IA · Yull Ramírez</div>
              <div style={{ fontSize: 11, color: COLORS.emerald }}>● En línea</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            height: 340, overflowY: "auto", padding: "20px",
            display: "flex", flexDirection: "column", gap: 14,
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              }}>
                <div style={{
                  maxWidth: "82%",
                  padding: "12px 16px",
                  borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  background: m.role === "user" ? COLORS.emerald : COLORS.navyMid,
                  color: m.role === "user" ? COLORS.navy : COLORS.offWhite,
                  fontSize: 13, lineHeight: 1.65,
                  border: m.role === "user" ? "none" : `1px solid ${COLORS.navyLight}`,
                }}
                  dangerouslySetInnerHTML={{ __html: renderMessage(m.content) }}
                />
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 5, padding: "8px 16px" }}>
                {[0, 1, 2].map(d => (
                  <div key={d} style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: COLORS.emerald,
                    animation: `pulse-emerald 1.2s ${d * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: "14px 16px",
            borderTop: `1px solid ${COLORS.navyLight}`,
            display: "flex", gap: 10,
          }}>
            <input
              className="chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ej: ¿Cómo resolvería Yull un problema de red?"
            />
            <button className="send-btn" onClick={sendMessage} disabled={loading || !input.trim()}>
              Enviar →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section style={{
      padding: "60px 60px 80px",
      background: COLORS.navyMid,
      borderTop: `1px solid ${COLORS.navyLight}`,
    }}>
      <div style={{ maxWidth: 900, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
        <div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: COLORS.white, fontWeight: 700 }}>
            ¿Listo para resolver tus incidencias TI?
          </h3>
          <p style={{ color: COLORS.slateLight, marginTop: 6, fontSize: 14 }}>
            Disponible para contratos remotos · Colombia (GMT-5) · Turnos flexibles
          </p>
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a href="mailto:yullr@outlook.com" style={{
            background: COLORS.emerald, color: COLORS.navy, fontWeight: 700,
            fontSize: 13, padding: "12px 24px", borderRadius: 3,
            textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase",
          }}>
            yullr@outlook.com
          </a>
          <a href="https://www.linkedin.com/in/yullramirez" target="_blank" rel="noreferrer" style={{
            background: "transparent", color: COLORS.offWhite, fontWeight: 600,
            fontSize: 13, padding: "12px 24px", borderRadius: 3,
            textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase",
            border: `1px solid ${COLORS.navyLight}`,
          }}>
            LinkedIn
          </a>
        </div>
      </div>
      <p style={{ textAlign: "center", marginTop: 50, fontSize: 12, color: COLORS.slate }}>
        © 2025 Yull Ramírez · Ingeniero de Soporte TI · Diseñado con precisión
      </p>
    </section>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState("Inicio");

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const map = { inicio: "Inicio", habilidades: "Habilidades", experiencia: "Experiencia", educacion: "Educación", contacto: "Contacto" };
            setActiveSection(map[e.target.id] || "Inicio");
          }
        });
      },
      { threshold: 0.3 }
    );
    ["inicio", "habilidades", "experiencia", "contacto"].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <Hero />
      <SkillsPanel />
      <ExperienceTimeline />
      <AIChat />
      <Contact />
    </div>
  );
}
