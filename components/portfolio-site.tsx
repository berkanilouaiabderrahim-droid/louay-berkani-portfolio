"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Globe2, Menu, Minus, Square, X } from "lucide-react"

type Locale = "en" | "ar"

const copy = {
  en: {
    nav: ["Work", "Services", "About", "Contact"],
    kicker: "INDEPENDENT WEB DEVELOPER / ALGERIA",
    title: "Websites with a point of view.",
    intro: "I create polished, responsive websites for businesses that want to be understood, remembered, and easy to contact.",
    viewWork: "View selected work",
    startProject: "Start a project",
    available: "AVAILABLE FOR NEW PROJECTS",
    selected: "Selected work",
    selectedIntro: "Two completed directions, built around the people and places they represent.",
    illustrative: "PROJECT PRESENTATION / ILLUSTRATIVE",
    viewDetails: "View project details",
    services: "What I can build",
    servicesIntro: "A focused set of services for getting a business online with clarity and care.",
    serviceItems: [
      ["01", "Business websites", "Clear, credible websites that make your offer easy to understand."],
      ["02", "Landing pages", "Focused pages for launches, services, campaigns, or a single strong call to action."],
      ["03", "Responsive implementation", "Interfaces that stay considered and useful from desktop to mobile."],
      ["04", "Redesigns", "A sharper structure and visual direction for an existing website."],
      ["05", "Arabic / English support", "Bilingual experiences with proper RTL layout and thoughtful content flow."],
    ],
    about: "The person behind the interface",
    aboutText: "I’m Louay Berkani, an independent web developer focused on thoughtful design, usable interfaces, and precise responsive implementation. I work directly with small businesses and founders to turn a clear idea into a website they can confidently share.",
    contact: "Have a project in mind?",
    contactText: "Tell me what you’re building, what it needs to do, and where you want to take it.",
    email: "Email me",
    whatsapp: "Message on WhatsApp",
    upwork: "View Upwork profile",
    footer: "BUILT WITH INTENTION / 2026",
  },
  ar: {
    nav: ["الأعمال", "الخدمات", "نبذة", "تواصل"],
    kicker: "مطور مواقع مستقل / الجزائر",
    title: "مواقع لها وجهة نظر.",
    intro: "أصمم مواقع متقنة ومتجاوبة للشركات التي تريد أن تكون مفهومة، حاضرة في الذاكرة، وسهلة التواصل.",
    viewWork: "شاهد أعمالي",
    startProject: "ابدأ مشروعًا",
    available: "متاح لمشاريع جديدة",
    selected: "أعمال مختارة",
    selectedIntro: "توجهان مكتملان، صُمما حول الأشخاص والأماكن التي يمثلانها.",
    illustrative: "عرض المشروع / توضيحي",
    viewDetails: "شاهد تفاصيل المشروع",
    services: "ما يمكنني بناؤه",
    servicesIntro: "خدمات مركزة لمساعدة نشاطك التجاري على الظهور بوضوح واحترافية.",
    serviceItems: [
      ["01", "مواقع الشركات", "مواقع واضحة وموثوقة تجعل عرضك سهل الفهم."],
      ["02", "صفحات الهبوط", "صفحات مركزة للإطلاقات والخدمات والحملات وطلبات التواصل."],
      ["03", "تنفيذ متجاوب", "واجهات مدروسة ومفيدة على الحاسوب والهاتف."],
      ["04", "إعادة تصميم", "هيكلة واتجاه بصري أكثر قوة لموقع موجود."],
      ["05", "دعم العربية / الإنجليزية", "تجارب ثنائية اللغة مع تخطيط RTL سليم وتدفق محتوى واضح."],
    ],
    about: "الشخص خلف الواجهة",
    aboutText: "أنا لؤي بركاني، مطور مواقع مستقل أركز على التصميم المدروس، الواجهات سهلة الاستخدام، والتنفيذ المتجاوب بدقة. أعمل مباشرة مع الشركات الصغيرة وأصحاب المشاريع لتحويل الفكرة الواضحة إلى موقع يمكن مشاركته بثقة.",
    contact: "لديك مشروع في ذهنك؟",
    contactText: "أخبرني بما تبنيه، وما الذي يحتاجه، وإلى أين تريد الوصول به.",
    email: "راسلني بالبريد",
    whatsapp: "تواصل عبر واتساب",
    upwork: "شاهد ملفي على Upwork",
    footer: "صُنع بعناية / 2026",
  },
}

function WindowBar({ label, dark = false }: { label: string; dark?: boolean }) {
  return <div className={`window-bar${dark ? " window-bar-dark" : ""}`}><span>{label}</span><span className="window-controls"><Minus size={13} /><Square size={11} /><X size={13} /></span></div>
}

function InteractiveTerminal({ locale, onNavigate }: { locale: Locale; onNavigate: (id: string) => void }) {
  const [command, setCommand] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const rtl = locale === "ar"
  const prompts = rtl
    ? { welcome: "مرحبًا بك في طرفية لؤي. اكتب help لاكتشاف الأوامر.", help: "الأوامر: help  about  projects  contact  clear", about: "مطور مواقع مستقل يركز على الواجهات الواضحة والتنفيذ المتجاوب.", projects: "جاري فتح الأعمال المختارة...", contact: "جاري فتح بروتوكول التواصل...", unknown: "أمر غير معروف. اكتب help لرؤية الأوامر." }
    : { welcome: "Welcome to Louay's terminal. Type help to discover commands.", help: "Commands: help  about  projects  contact  clear", about: "Independent web developer focused on clear interfaces and responsive implementation.", projects: "Opening selected work...", contact: "Opening contact protocol...", unknown: "Unknown command. Type help to see available commands." }
  const runCommand = (value: string) => {
    const normalized = value.trim().toLowerCase()
    if (!normalized) return
    const next = [...history, `> ${value}`]
    if (normalized === "clear") setHistory([])
    else if (["about", "projects", "contact"].includes(normalized)) {
      const response = normalized === "about" ? prompts.about : normalized === "projects" ? prompts.projects : prompts.contact
      setHistory([...next, response])
      onNavigate(normalized)
    } else setHistory([...next, normalized === "help" ? prompts.help : prompts.unknown])
    setCommand("")
  }
  return <div className="interactive-terminal" dir="ltr" onClick={() => inputRef.current?.focus()}>
    <div className="terminal-output" aria-live="polite"><span>{prompts.welcome}</span>{history.map((line, index) => <span key={`${line}-${index}`}>{line}</span>)}</div>
    <form className="terminal-form" onSubmit={(event) => { event.preventDefault(); runCommand(command) }}>
      <label htmlFor="terminal-command">{rtl ? "أمر" : "cmd"}</label><input ref={inputRef} id="terminal-command" value={command} onChange={(event) => setCommand(event.target.value)} aria-label={rtl ? "أدخل أمرًا" : "Enter a terminal command"} autoComplete="off" spellCheck={false} /><span className="terminal-cursor" aria-hidden="true" />
    </form>
  </div>
}

function ProjectCard({ number, name, description, tags, tone, href, children, t }: { number: string; name: string; description: string; tags: string; tone: string; href: string; children: React.ReactNode; t: typeof copy.en }) {
  return <article className={`project-card ${tone} reveal`}>
    <WindowBar label={`PROJECT_${number} / CASE_STUDY`} dark />
    <div className="project-art">{children}<span className="art-label">{t.illustrative}</span></div>
    <div className="project-copy"><div className="project-number">{number}</div><div><p className="eyebrow">{tags}</p><h3>{name}</h3><p>{description}</p><a href={href} target="_blank" rel="noreferrer" className="text-link">{t.viewDetails} <ArrowUpRight size={16} /></a></div></div>
  </article>
}

export default function PortfolioSite() {
  const [locale, setLocale] = useState<Locale>("en")
  const [showTop, setShowTop] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const t = copy[locale]
  const navigateTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  const rtl = locale === "ar"
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.14 })
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element))
    window.addEventListener("scroll", onScroll)
    return () => { window.removeEventListener("scroll", onScroll); revealObserver.disconnect() }
  }, [])
  return <main dir={rtl ? "rtl" : "ltr"}>
    <header className="site-header"><a className="brand" href="#top">LB<span>_</span></a><nav>{t.nav.map((item, i) => <a key={item} href={["#work", "#services", "#about", "#contact"][i]} onClick={() => setMenuOpen(false)}>{item}</a>)}</nav><button className="language-toggle" onClick={() => setLocale(rtl ? "en" : "ar")} aria-label="Switch language"><Globe2 size={15} /> {rtl ? "EN" : "عربي"}</button><button className="mobile-menu" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>{menuOpen && <nav className="mobile-nav">{t.nav.map((item, i) => <a key={item} href={["#work", "#services", "#about", "#contact"][i]} onClick={() => setMenuOpen(false)}>{item}</a>)}</nav>}</header>
    <div className="page-shell" id="top">
      <section className="hero"><div className="hero-copy reveal reveal-left"><p className="eyebrow accent">[ {t.kicker} ]</p><h1>{t.title}</h1><p className="hero-intro">{t.intro}</p><div className="hero-actions"><a className="button button-orange" href="#work">{t.viewWork} <ArrowUpRight size={18} /></a><a className="button button-plain" href="#contact">{t.startProject}</a></div></div><div className="hero-window reveal reveal-right"><WindowBar label="LOUAY_BERKANI / INDEX.HTML" /><div className="portrait-card"><img className="portrait-photo" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ME-KhIZ8l1CEeFK1P702ba1RF2N9GtrWm.jpg" alt="Louay Berkani, independent web developer" /><div className="portrait-grid"><span>LB</span><span>WEB<br />DEV</span></div><div className="portrait-bottom"><strong>LOUAY<br />BERKANI</strong><span>01<br />/ 01</span></div></div></div></section>
      <div className="availability"><span className="status-dot" />{t.available}<span className="availability-line" /><span>01—05 / 2026</span></div>
      <section className="section reveal" id="work"><div className="section-heading"><div><p className="eyebrow accent">01 / PORTFOLIO</p><h2>{t.selected}</h2></div><p>{t.selectedIntro}</p></div><div className="projects"><ProjectCard number="01" name="Caffeine OEB" description={rtl ? "موقع مقهى محلي بهوية دافئة مستوحاة من الطابع العتيق، مع عرض واضح للقائمة والأجواء ومعلومات التواصل." : "A local café website with a warm, vintage-inspired identity and an intuitive presentation of its menu, atmosphere, and contact options."} tags="#CAFÉ  #HOSPITALITY  #WHATSAPP" tone="caffeine" href="https://caffeine-oeb.netlify.app/" t={t}><div className="coffee-scene"><div className="coffee-cup" /><div className="coffee-copy">CAFFEINE<br /><small>OEB / SINCE 2017</small></div><div className="coffee-sun" /></div></ProjectCard><ProjectCard number="02" name="Salima Dental Clinic" description={rtl ? "موقع عيادة احترافي يشرح المعلومات الصحية بوضوح، مع دعم كامل للعربية من اليمين إلى اليسار." : "A professional clinic website that communicates healthcare information clearly, with Arabic right-to-left support and a calm, confident visual system."} tags="#HEALTHCARE  #RTL  #RESPONSIVE" tone="dental" href="https://salima-dental-clinic.netlify.app/" t={t}><div className="dental-scene"><div className="dental-cross">+</div><div className="dental-ring" /><div className="dental-copy">SALIMA<br /><small>DENTAL CLINIC</small></div></div></ProjectCard></div></section>
      <div className="marquee"><span>DESIGN WITH CLARITY</span><span>BUILD WITH CARE</span><span>DESIGN WITH CLARITY</span><span>BUILD WITH CARE</span></div>
      <section className="section services-section" id="services"><div className="section-heading"><div><p className="eyebrow accent">02 / CAPABILITIES</p><h2>{t.services}</h2></div><p>{t.servicesIntro}</p></div><div className="service-list">{t.serviceItems.map(([num, title, text]) => <div className="service-row reveal" key={num}><span className="service-num">{num}</span><h3>{title}</h3><p>{text}</p><ArrowUpRight size={20} /></div>)}</div></section>
      <section className="about-section reveal" id="about"><div className="about-label"><p className="eyebrow accent">03 / PROFILE</p><h2>{t.about}</h2></div><div className="about-copy"><p>{t.aboutText}</p><InteractiveTerminal locale={locale} onNavigate={navigateTo} /></div></section>
      <section className="contact-section reveal" id="contact"><p className="eyebrow accent">04 / CONTACT_PROTOCOL</p><h2>{t.contact}</h2><p>{t.contactText}</p><div className="contact-links"><a href="mailto:berkanilouaiabderrahim@gmail.com">{t.email} <ArrowUpRight size={18} /></a><a href="https://wa.me/213791821722" target="_blank" rel="noreferrer">{t.whatsapp} <ArrowUpRight size={18} /></a><a href="https://www.upwork.com/freelancers/~016b01956e3caf0eee?mp_source=share" target="_blank" rel="noreferrer">{t.upwork} <ArrowUpRight size={18} /></a></div></section>
      <footer><span className="brand">LB<span>_</span></span><span>{t.footer}</span><a href="#top">↑ TOP</a></footer>
    </div>{showTop && <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top">↑</button>}
  </main>
}
