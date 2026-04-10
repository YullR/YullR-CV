import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#F7F5F0",
  bgCard: "#FFFFFF",
  bgMuted: "#EFF0EC",
  navy: "#1B2F4A",
  navyMid: "#2E4A6B",
  navyLight: "#4A6FA5",
  sage: "#4A7C6F",
  sageMid: "#5E9B8C",
  sageLight: "#A8C5BE",
  sagePale: "#E8F2F0",
  clay: "#C4785A",
  text: "#1B2F4A",
  textMid: "#4A5568",
  textLight: "#718096",
  border: "#DDE1DC",
  borderLight: "#EDEEE9",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    font-family: 'Outfit', sans-serif;
    background: ${C.bg};
    color: ${C.text};
    overflow-x: hidden;
    font-weight: 300;
  }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: ${C.bg}; }
  ::-webkit-scrollbar-thumb { background: ${C.sageLight}; border-radius: 10px; }

  @keyframes softUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes barGrow {
    from { width: 0; }
    to { width: var(--w); }
  }

  .fadeUp { animation: softUp 0.6s ease forwards; }

  .nav-link {
    font-family: 'Outfit', sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${C.textLight};
    cursor: pointer;
    padding-bottom: 3px;
    border-bottom: 1.5px solid transparent;
    transition: color 0.2s, border-color 0.2s;
  }
  .nav-link:hover, .nav-link.on {
    color: ${C.sage};
    border-bottom-color: ${C.sage};
  }

  .pill-btn {
    font-family: 'Outfit', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 7px 18px;
    border-radius: 50px;
    border: 1.5px solid ${C.border};
    background: transparent;
    color: ${C.textLight};
    cursor: pointer;
    transition: all 0.2s;
  }
  .pill-btn:hover { border-color: ${C.sage}; color: ${C.sage}; }
  .pill-btn.on {
    background: ${C.sage};
    border-color: ${C.sage};
    color: #fff;
    font-weight: 500;
  }

  .card {
    background: ${C.bgCard};
    border: 1px solid ${C.border};
    border-radius: 14px;
    transition: box-shadow 0.25s, transform 0.25s;
  }
  .card:hover {
    box-shadow: 0 8px 30px rgba(74,124,111,0.12);
    transform: translateY(-2px);
  }

  .chat-in {
    background: ${C.bgCard};
    border: 1px solid ${C.border};
    border-radius: 10px;
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: ${C.text};
    padding: 11px 16px;
    outline: none;
    flex: 1;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .chat-in:focus {
    border-color: ${C.sage};
    box-shadow: 0 0 0 3px ${C.sagePale};
  }
  .chat-in::placeholder { color: ${C.textLight}; font-weight: 300; }

  .send-btn {
    background: ${C.sage};
    border: none;
    color: #fff;
    font-family: 'Outfit', sans-serif;
    font-weight: 500;
    font-size: 12px;
    letter-spacing: 0.06em;
    padding: 11px 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
  }
  .send-btn:hover { background: ${C.navyMid}; }
  .send-btn:active { transform: scale(0.97); }
  .send-btn:disabled { opacity: 0.45; cursor: not-allowed; }
`;

// ── DATA ─────────────────────────────────────────────────────────────────────

const stats = [
  { n: "10+", sub: "Años de experiencia" },
  { n: "N1 & N2", sub: "Niveles de soporte" },
  { n: "SLA", sub: "Cumplimiento garantizado" },
  { n: "100%", sub: "Remoto disponible" },
];

const skills = [
  { name: "Soporte TI N1 & N2", pct: 97, cat: "soporte" },
  { name: "Gestión de Tickets / GLPI", pct: 95, cat: "soporte" },
  { name: "Diagnóstico de incidencias", pct: 96, cat: "soporte" },
  { name: "Soporte Remoto (TV / AnyDesk)", pct: 95, cat: "soporte" },
  { name: "Windows Server", pct: 88, cat: "infra" },
  { name: "Ubuntu Server (Linux)", pct: 82, cat: "infra" },
  { name: "Redes LAN & WiFi", pct: 85, cat: "infra" },
  { name: "Office 365 / Entra ID", pct: 90, cat: "soft" },
  { name: "Documentación técnica", pct: 93, cat: "soporte" },
  { name: "Hardware & Configuración", pct: 90, cat: "soft" },
];

const timeline = [
  {
    y: "2015 – Actualidad",
    title: "Ingeniero Soporte TI · Coordinador Mesa de Ayuda",
    co: "Universidad Libre",
    now: true,
    items: [
      "Soporte técnico N1 y N2 a docentes, personal administrativo y estudiantes.",
      "Operación de GLPI: ciclo completo de ticket bajo cumplimiento SLA.",
      "Soporte remoto vía TeamViewer y AnyDesk — resolución sin desplazamiento.",
      "Administración de servidores Windows Server y Ubuntu Server.",
      "Gestión de red LAN/WiFi: switches, routers y puntos de acceso.",
      "Administración Office 365: usuarios, contraseñas, autenticación e incidencias.",
      "Documentación detallada de cada caso para reducción de reincidencias.",
      "Capacitaciones e inducciones tecnológicas a usuarios finales.",
    ],
  },
  {
    y: "2010 – 2012",
    title: "Auxiliar de Soporte TI",
    co: "Universidad Francisco de Paula Santander",
    now: false,
    items: [
      "Soporte técnico al personal académico y administrativo.",
      "Mantenimiento preventivo y correctivo de equipos de cómputo.",
      "Configuración de equipos y soporte básico de conectividad.",
    ],
  },
];

const edu = [
  { icon: "◈", deg: "Maestría en Pedagogía para la Era Digital", school: "Universidad Libre", tag: "En curso" },
  { icon: "◉", deg: "Especialización en Gerencia de Proyectos", school: "Universidad Libre", tag: "Completado" },
  { icon: "◎", deg: "Ingeniería de Sistemas", school: "Univ. Francisco de Paula Santander", tag: "Completado" },
];

const certs = [
  { name: "EF/SET C1 — Inglés", done: true },
  { name: "CompTIA A+", done: false },
  { name: "ITIL 4 Foundation", done: false },
];

const techCards = [
  { icon: "⬛", name: "Windows Server", desc: "Roles, AD, GPO, virtualización" },
  { icon: "⬡", name: "Ubuntu Server", desc: "CLI, SSH, servicios, seguridad" },
  { icon: "◈", name: "GLPI", desc: "Tickets, SLA, inventario TI" },
  { icon: "◎", name: "Redes LAN/WiFi", desc: "Switches, routers, diagnóstico" },
  { icon: "⬙", name: "Office 365", desc: "Usuarios, MFA, correo, licencias" },
  { icon: "◉", name: "Soporte Remoto", desc: "TeamViewer, AnyDesk, sin viajes" },
  { icon: "▣", name: "Hardware", desc: "Diagnóstico, mantenimiento, config." },
  { icon: "◫", name: "Documentación", desc: "KB, procedimientos, reportes" },
];

const SYSTEM = `Eres el asistente IA del perfil profesional de Yull Ramírez, Ingeniero de Sistemas con más de 10 años en Soporte TI.

Perfil de Yull:
- 10+ años soporte N1/N2 en Universidad Libre (2015-actualidad) y UFPS (2010-2012)
- Herramientas: GLPI, TeamViewer, AnyDesk, Windows Server, Ubuntu Server, redes LAN/WiFi, Office 365
- 100% disponible trabajo remoto desde Colombia
- Español nativo, Inglés C1 (EF/SET)
- Educación: Ing. Sistemas + Especialización Gerencia de Proyectos + Maestría en curso
- Certificaciones: EF/SET C1 obtenido; CompTIA A+ e ITIL 4 planificados

Responde en español, tono profesional y cálido. Máximo 120 palabras. Si preguntan sobre resolución de incidencias, describe el proceso que Yull seguiría paso a paso.`;

// ── NAVBAR ────────────────────────────────────────────────────────────────────

function Navbar({ active, set }) {
  const links = ["Inicio", "Habilidades", "Experiencia", "Educación", "Contacto"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: `${C.bg}ee`, backdropFilter: "blur(14px)",
      borderBottom: `1px solid ${C.border}`,
      height: 58, padding: "0 48px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: C.sage,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 15, fontWeight: 600, color: "#fff",
        }}>YR</div>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 600, color: C.navy }}>
          Yull Ramírez
        </span>
      </div>

      <div style={{ display: "flex", gap: 28 }}>
        {links.map(l => (
          <span key={l}
            className={`nav-link${active === l ? " on" : ""}`}
            onClick={() => { set(l); document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); }}
          >{l}</span>
        ))}
      </div>

      <div style={{
        fontSize: 11, fontWeight: 500, letterSpacing: "0.08em",
        color: C.sage, background: C.sagePale,
        border: `1px solid ${C.sageLight}`,
        padding: "5px 12px", borderRadius: 50,
      }}>
        ● Remoto disponible
      </div>
    </nav>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="inicio" style={{
      minHeight: "100vh",
      background: `radial-gradient(ellipse at 80% 20%, ${C.sagePale} 0%, transparent 55%), ${C.bg}`,
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "100px 60px 70px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Subtle dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(circle, ${C.sageLight}55 1px, transparent 1px)`,
        backgroundSize: "32px 32px", opacity: 0.35,
        pointerEvents: "none",
      }} />

      {/* Clay accent blob */}
      <div style={{
        position: "absolute", right: "8%", top: "18%",
        width: 380, height: 380, borderRadius: "60% 40% 55% 45% / 45% 55% 40% 60%",
        background: `linear-gradient(135deg, ${C.sagePale}, ${C.bgMuted})`,
        opacity: 0.6, pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 780, position: "relative" }}>
        <p className="fadeUp" style={{
          fontFamily: "'Outfit', sans-serif", fontSize: 11,
          fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase",
          color: C.sage, animationDelay: "0.05s",
        }}>
          Ingeniero de Sistemas · Colombia · Disponible Remoto
        </p>

        <div style={{ height: 1, width: 60, background: C.sageLight, margin: "14px 0 22px" }} />

        <h1 className="fadeUp" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(48px, 6.5vw, 88px)",
          fontWeight: 600, lineHeight: 1.05,
          color: C.navy, animationDelay: "0.12s",
        }}>
          Yull Ramírez
        </h1>

        <h2 className="fadeUp" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(20px, 2.8vw, 34px)",
          fontWeight: 400, fontStyle: "italic",
          color: C.sage, marginTop: 8, animationDelay: "0.2s",
        }}>
          Especialista en Soporte TI & Mesa de Ayuda
        </h2>

        <p className="fadeUp" style={{
          fontSize: 16, lineHeight: 1.85, color: C.textMid,
          maxWidth: 580, marginTop: 28, fontWeight: 300,
          animationDelay: "0.28s",
        }}>
          Más de <strong style={{ color: C.navy, fontWeight: 500 }}>10 años</strong> garantizando la continuidad
          tecnológica de instituciones. Resolución ágil de incidencias N1/N2, gestión
          bajo SLA y soporte remoto —{" "}
          <em style={{ color: C.sage }}>donde sea que estés</em>.
        </p>

        {/* Stats */}
        <div className="fadeUp" style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14, marginTop: 44, animationDelay: "0.36s",
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: C.bgCard, border: `1px solid ${C.border}`,
              borderRadius: 12, padding: "18px 16px", textAlign: "center",
              borderTop: `3px solid ${C.sage}`,
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 28, fontWeight: 600, color: C.navy,
              }}>{s.n}</div>
              <div style={{ fontSize: 11, color: C.textLight, marginTop: 5, fontWeight: 400 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="fadeUp" style={{ display: "flex", gap: 14, marginTop: 36, animationDelay: "0.44s" }}>
          <a href="mailto:yullr@outlook.com" style={{
            background: C.navy, color: "#fff",
            fontFamily: "'Outfit', sans-serif", fontWeight: 500,
            fontSize: 13, letterSpacing: "0.07em",
            padding: "13px 28px", borderRadius: 50, textDecoration: "none",
            textTransform: "uppercase", transition: "background 0.2s",
          }}>
            Contactar
          </a>
          <a href="https://www.linkedin.com/in/yullramirez" target="_blank" rel="noreferrer" style={{
            background: "transparent", color: C.navy,
            fontFamily: "'Outfit', sans-serif", fontWeight: 500,
            fontSize: 13, letterSpacing: "0.07em",
            padding: "13px 28px", borderRadius: 50, textDecoration: "none",
            textTransform: "uppercase", border: `1.5px solid ${C.border}`,
            transition: "border-color 0.2s",
          }}>
            LinkedIn →
          </a>
        </div>
      </div>
    </section>
  );
}

// ── SKILLS ────────────────────────────────────────────────────────────────────

function Skills() {
  const [cat, setCat] = useState("all");
  const filtered = cat === "all" ? skills : skills.filter(s => s.cat === cat);

  return (
    <section id="habilidades" style={{ padding: "90px 60px", background: C.bgMuted }}>
      <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: C.sage }}>
        Competencias
      </p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 600, color: C.navy, marginTop: 6 }}>
        Stack Tecnológico
      </h2>
      <div style={{ height: 1, width: 70, background: C.sageLight, margin: "14px 0 32px" }} />

      <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
        {[["all","Todas"], ["soporte","Soporte & Gestión"], ["infra","Infraestructura"], ["soft","Software & Apps"]].map(([k,v]) => (
          <button key={k} className={`pill-btn${cat === k ? " on" : ""}`} onClick={() => setCat(k)}>{v}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 56px", maxWidth: 860 }}>
        {filtered.map((sk, i) => (
          <div key={sk.name}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 400, color: C.textMid }}>{sk.name}</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: C.sage }}>{sk.pct}%</span>
            </div>
            <div style={{ height: 4, borderRadius: 10, background: C.border, overflow: "hidden" }}>
              <div className="skill-bar" style={{
                height: "100%",
                background: `linear-gradient(90deg, ${C.sage}, ${C.sageMid})`,
                borderRadius: 10,
                width: 0,
                "--w": `${sk.pct}%`,
                animation: `barGrow 1s ${i * 0.06}s ease forwards`,
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Tech badges */}
      <div style={{ marginTop: 52 }}>
        <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: C.textLight, marginBottom: 16 }}>
          Herramientas
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["GLPI","TeamViewer","AnyDesk","Windows Server","Ubuntu Server","Office 365","Entra ID","LAN/WiFi","Active Directory","CompTIA A+*","ITIL 4*"].map(t => (
            <span key={t} style={{
              padding: "6px 14px",
              background: C.bgCard, border: `1px solid ${C.border}`,
              borderRadius: 50, fontSize: 12, fontWeight: 400,
              color: C.textMid,
            }}>{t}</span>
          ))}
        </div>
        <p style={{ fontSize: 11, color: C.textLight, marginTop: 8 }}>* Planificado</p>
      </div>
    </section>
  );
}

// ── EXPERIENCE ────────────────────────────────────────────────────────────────

function Experience() {
  const [tab, setTab] = useState("experiencia");

  return (
    <section id="experiencia" style={{ padding: "90px 60px", background: C.bg }}>
      <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: C.sage }}>
        Trayectoria
      </p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 600, color: C.navy, marginTop: 6 }}>
        Línea de Tiempo
      </h2>
      <div style={{ height: 1, width: 70, background: C.sageLight, margin: "14px 0 32px" }} />

      <div style={{ display: "flex", gap: 8, marginBottom: 44, flexWrap: "wrap" }}>
        {[["experiencia","Experiencia"], ["tecnologias","Tecnologías"], ["educacion","Educación"]].map(([k, v]) => (
          <button key={k} className={`pill-btn${tab === k ? " on" : ""}`} onClick={() => setTab(k)}>{v}</button>
        ))}
      </div>

      {tab === "experiencia" && (
        <div style={{ position: "relative", paddingLeft: 40, maxWidth: 780 }}>
          <div style={{
            position: "absolute", left: 8, top: 8, bottom: 8,
            width: 1.5, background: `linear-gradient(180deg, ${C.sage}, ${C.border})`,
          }} />
          {timeline.map((item, i) => (
            <div key={i} style={{ position: "relative", marginBottom: 44 }}>
              <div style={{
                position: "absolute", left: -36,
                width: 16, height: 16, borderRadius: "50%",
                background: item.now ? C.sage : C.border,
                border: `3px solid ${C.bg}`,
                boxShadow: item.now ? `0 0 0 3px ${C.sagePale}` : "none",
              }} />
              <div className="card" style={{ padding: "24px 26px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 21, fontWeight: 600, color: C.navy }}>
                      {item.title}
                    </h3>
                    <p style={{ color: C.sage, fontSize: 13, fontWeight: 500, marginTop: 3 }}>{item.co}</p>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 500, letterSpacing: "0.08em",
                    color: item.now ? C.sage : C.textLight,
                    background: item.now ? C.sagePale : C.bgMuted,
                    border: `1px solid ${item.now ? C.sageLight : C.border}`,
                    padding: "4px 12px", borderRadius: 50, whiteSpace: "nowrap", alignSelf: "flex-start",
                  }}>{item.y}</span>
                </div>
                <ul style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                  {item.items.map((b, j) => (
                    <li key={j} style={{ display: "flex", gap: 10 }}>
                      <span style={{ color: C.sageMid, marginTop: 2, fontSize: 11, flexShrink: 0 }}>◆</span>
                      <span style={{ fontSize: 13.5, color: C.textMid, lineHeight: 1.65, fontWeight: 300 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "tecnologias" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14, maxWidth: 860 }}>
          {techCards.map((t, i) => (
            <div key={i} className="card" style={{ padding: "20px 20px" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: C.sage, marginBottom: 8 }}>{t.icon}</div>
              <div style={{ fontWeight: 500, color: C.navy, fontSize: 14, marginBottom: 5 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: C.textLight, lineHeight: 1.6, fontWeight: 300 }}>{t.desc}</div>
            </div>
          ))}
        </div>
      )}

      {tab === "educacion" && (
        <div style={{ maxWidth: 680, display: "flex", flexDirection: "column", gap: 16 }}>
          {edu.map((e, i) => (
            <div key={i} className="card" style={{ padding: "20px 24px", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: C.sagePale, border: `1px solid ${C.sageLight}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: C.sage,
                flexShrink: 0,
              }}>{e.icon}</div>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: C.navy }}>{e.deg}</h3>
                <p style={{ fontSize: 12, color: C.textLight, marginTop: 3 }}>{e.school}</p>
                <span style={{
                  display: "inline-block", marginTop: 8, fontSize: 10, fontWeight: 500,
                  letterSpacing: "0.1em",
                  color: e.tag === "En curso" ? C.sage : C.textLight,
                  background: e.tag === "En curso" ? C.sagePale : C.bgMuted,
                  border: `1px solid ${e.tag === "En curso" ? C.sageLight : C.border}`,
                  padding: "3px 10px", borderRadius: 50,
                }}>{e.tag}</span>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 10, background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 24px" }}>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: C.sage, marginBottom: 14 }}>
              Certificaciones
            </p>
            {certs.map((c, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 0", borderBottom: i < certs.length - 1 ? `1px solid ${C.borderLight}` : "none",
              }}>
                <span style={{ fontSize: 13.5, color: C.textMid, fontWeight: 300 }}>{c.name}</span>
                <span style={{
                  fontSize: 10, fontWeight: 500, letterSpacing: "0.08em",
                  color: c.done ? C.sage : C.textLight,
                  background: c.done ? C.sagePale : C.bgMuted,
                  border: `1px solid ${c.done ? C.sageLight : C.border}`,
                  padding: "3px 10px", borderRadius: 50,
                }}>{c.done ? "Obtenido" : "Planificado"}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// ── AI CHAT ───────────────────────────────────────────────────────────────────

function Chat() {
  const [msgs, setMsgs] = useState([{
    role: "assistant",
    content: "Hola 👋 Soy el asistente de Yull. Puedes preguntarme sobre su experiencia, habilidades o cómo resolvería las incidencias de tu empresa.",
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    setMsgs(p => [...p, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const apiMsgs = [...msgs, userMsg].filter(m => m.role === "user" || msgs.indexOf(m) > 0).map(m => ({ role: m.role, content: m.content }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM,
          messages: apiMsgs,
        }),
      });
      const data = await res.json();
      const reply = data.content?.map(b => b.text || "").join("") || "No pude procesar esa consulta.";
      setMsgs(p => [...p, { role: "assistant", content: reply }]);
    } catch {
      setMsgs(p => [...p, { role: "assistant", content: "Error de conexión. Intenta de nuevo." }]);
    } finally { setLoading(false); }
  }

  const suggestions = [
    "¿Cómo resolvería mis incidencias de red?",
    "¿Qué experiencia tiene con Windows Server?",
    "¿Puede integrarse a nuestro equipo remoto?",
    "¿Cómo gestiona múltiples tickets simultáneos?",
  ];

  return (
    <section id="contacto" style={{ padding: "90px 60px", background: C.bgMuted }}>
      <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: C.sage }}>
        Asistente Inteligente
      </p>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 600, color: C.navy, marginTop: 6 }}>
        Ingeniero de Sistemas<span style={{ color: C.sage }}>+</span>
      </h2>
      <p style={{ fontSize: 14, color: C.textLight, marginTop: 8, marginBottom: 28, fontWeight: 300 }}>
        Consulta al asistente IA sobre el perfil de Yull. Responde preguntas de reclutadores y empresas.
      </p>

      <div style={{ maxWidth: 700 }}>
        {/* Suggestions */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => setInput(s)} style={{
              background: C.bgCard, border: `1px solid ${C.border}`,
              color: C.textLight, fontSize: 11.5, fontWeight: 300,
              padding: "6px 14px", borderRadius: 50, cursor: "pointer",
              fontFamily: "'Outfit', sans-serif",
              transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.sage; e.currentTarget.style.color = C.sage; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textLight; }}
            >{s}</button>
          ))}
        </div>

        {/* Chat card */}
        <div style={{
          background: C.bgCard, border: `1px solid ${C.border}`,
          borderRadius: 16, overflow: "hidden",
          boxShadow: "0 4px 24px rgba(74,124,111,0.08)",
        }}>
          {/* Header */}
          <div style={{
            padding: "14px 20px", borderBottom: `1px solid ${C.borderLight}`,
            display: "flex", alignItems: "center", gap: 12,
            background: C.bgCard,
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: C.sage, display: "flex", alignItems: "center",
              justifyContent: "center", fontFamily: "'Cormorant Garamond', serif",
              fontSize: 15, fontWeight: 600, color: "#fff",
            }}>YR</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.navy }}>Asistente IA · Yull Ramírez</div>
              <div style={{ fontSize: 11, color: C.sage, fontWeight: 400 }}>● En línea</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            height: 320, overflowY: "auto", padding: 20,
            display: "flex", flexDirection: "column", gap: 12,
          }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "80%", padding: "11px 16px",
                  borderRadius: m.role === "user" ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                  background: m.role === "user" ? C.navy : C.bgMuted,
                  color: m.role === "user" ? "#fff" : C.textMid,
                  fontSize: 13, lineHeight: 1.65, fontWeight: 300,
                  border: m.role === "user" ? "none" : `1px solid ${C.border}`,
                }}>{m.content}</div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 5, padding: "6px 14px" }}>
                {[0,1,2].map(d => (
                  <div key={d} style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: C.sageLight,
                    animation: `softUp 0.8s ${d * 0.15}s infinite alternate`,
                  }} />
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: "14px 16px", borderTop: `1px solid ${C.borderLight}`,
            display: "flex", gap: 10, background: C.bg,
          }}>
            <input
              className="chat-in"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="¿Cómo gestionaría Yull mis incidencias?"
            />
            <button className="send-btn" onClick={send} disabled={loading || !input.trim()}>
              Enviar →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <section style={{
      padding: "56px 60px 70px",
      background: C.navy,
    }}>
      <div style={{
        maxWidth: 860, display: "flex",
        justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 28,
      }}>
        <div>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 26, fontWeight: 600, color: "#fff",
          }}>¿Listo para optimizar tu soporte TI?</h3>
          <p style={{ color: C.sageLight, marginTop: 6, fontSize: 13, fontWeight: 300 }}>
            Disponible para contratos remotos · Colombia (GMT-5) · Turnos flexibles
          </p>
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a href="mailto:yullr@outlook.com" style={{
            background: C.sage, color: "#fff", fontWeight: 500,
            fontSize: 12, padding: "12px 24px", borderRadius: 50,
            textDecoration: "none", letterSpacing: "0.07em", textTransform: "uppercase",
          }}>
            yullr@outlook.com
          </a>
          <a href="https://www.linkedin.com/in/yullramirez" target="_blank" rel="noreferrer" style={{
            background: "transparent", color: "#fff", fontWeight: 400,
            fontSize: 12, padding: "12px 24px", borderRadius: 50,
            textDecoration: "none", letterSpacing: "0.07em", textTransform: "uppercase",
            border: `1.5px solid ${C.navyLight}`,
          }}>
            LinkedIn
          </a>
        </div>
      </div>
      <div style={{ height: 1, background: `${C.navyLight}44`, margin: "44px 0 24px" }} />
      <p style={{ fontSize: 11, color: C.textLight, textAlign: "center", fontWeight: 300 }}>
        © 2025 Yull Ramírez · Ingeniero de Soporte TI · Diseñado con precisión
      </p>
    </section>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState("Inicio");

  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = css + `
      .skill-bar { animation: barGrow 1s ease forwards; }
      @keyframes barGrow { from { width: 0; } to { width: var(--w); } }
    `;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const map = { inicio: "Inicio", habilidades: "Habilidades", experiencia: "Experiencia", contacto: "Contacto" };
          if (map[e.target.id]) setActive(map[e.target.id]);
        }
      });
    }, { threshold: 0.3 });
    ["inicio","habilidades","experiencia","contacto"].forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Navbar active={active} set={setActive} />
      <Hero />
      <Skills />
      <Experience />
      <Chat />
      <Footer />
    </>
  );
}
