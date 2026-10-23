import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Bug,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Download,
  ExternalLink,
  Image,
  Mail,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import profilePhoto from "./assets/FotoProfile/FotoReno.png";
import companyLogo from "./assets/FotoProfile/logoSofcograha.jpg";
import "./App.css";

const tools = [
  "Manual Testing",
  "Playwright",
  "Postman",
  "JIRA",
  "SQL",
  "Git",
  "Notion",
  "Draw.io",
];

const heroPhrases = [
  "Software Quality Assurance",
  "Pengujian yang terstruktur",
  "Produk digital yang andal",
];

const workflow = [
  [
    "01",
    "Pahami kebuthuan",
    "Pelajari alur sistem, kebutuhan pengguna, dan risiko sebelum mulai menguji.",
  ],
  [
    "02",
    "Rancang skenario",
    "Susun skenario pengujian positif, negatif, dan edge case berdasarkan kebutuhan.",
  ],
  [
    "03",
    "Uji & dokumentasikan",
    "Jalankan pengujian, catat temuan, dan siapkan evidence yang mudah ditindaklanjuti.",
  ],
  [
    "04",
    "Validasi & bagikan",
    "Lakukan retest dan rangkum panduan agar alur sistem mudah dipahami.",
  ],
];

const projectDetails = {
  COMPANYPROFILE: {
    type: "WEBSITE / COMPANY PROFILE",
    title: "Company Profile",
    desc: "Halaman profil perusahaan, informasi alamat, galeri, menu, dan profil pemilik.",
    tags: ["Website", "Company Profile"],
    accent: "mint",
  },
  PEMESANAN: {
    type: "WEB APPLICATION",
    title: "Aplikasi Pemesanan",
    desc: "Alur pemesanan menu, pembayaran, dan pemantauan pesanan.",
    tags: ["Web App", "Pemesanan"],
    accent: "amber",
  },
  PENJUALAN: {
    type: "WEB APPLICATION",
    title: "Aplikasi Penjualan",
    desc: "Aplikasi penjualan dengan fitur kasir, pengelolaan menu, alur dapur, dan laporan.",
    tags: ["Web App", "Penjualan"],
    accent: "blue",
  },
  QA: {
    type: "QUALITY ASSURANCE",
    title: "QA Testing & Dokumentasi",
    desc: "Dokumentasi QA berisi test scenario, test case, evidence, flow, dan user guide.",
    tags: ["Quality Assurance", "Dokumentasi"],
    accent: "mint",
  },
};

const projectAssetFiles = import.meta.glob(
  "./assets/project/*/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" },
);
const certificateAssetFiles = import.meta.glob(
  "./assets/sertifikat/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" },
);

function getAssetName(path) {
  return path
    .split("/")
    .pop()
    .replace(/\.[^.]+$/, "")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const projects = Object.entries(projectDetails).map(([folder, details]) => ({
  ...details,
  images: Object.entries(projectAssetFiles)
    .filter(([path]) => path.split("/").at(-2) === folder)
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
    .map(([path, src]) => ({ src, title: getAssetName(path) })),
}));

const certificates = Object.entries(certificateAssetFiles)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([path, src]) => ({ title: getAssetName(path), src }));

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
      </div>
      {children && <p className="heading-note">{children}</p>}
    </div>
  );
}

function RevealSection({ id, className = "", children }) {
  return (
    <motion.section
      id={id}
      className={`section container ${className}`}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
    >
      {children}
    </motion.section>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Tentang", "#about"],
    ["Pengalaman", "#experience"],
    ["Keahlian", "#skills"],
    ["Proyek", "#projects"],
    ["Sertifikat", "#certificates"],
    ["Kontak", "#contact"],
  ];

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <a href="#top" className="logo" onClick={() => setOpen(false)}>
          QA<span>.</span>PORTFOLIO
        </a>
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          aria-controls="main-navigation"
        >
          {open ? "×" : "☰"}
        </button>
        <div id="main-navigation" className={`nav-links ${open ? "open" : ""}`}>
          {links.map(([label, href]) => (
            <a onClick={() => setOpen(false)} href={href} key={label}>
              {label}
            </a>
          ))}
          <a
            onClick={() => setOpen(false)}
            href="#contact"
            className="button button-small"
          >
            Kontak rekrutmen <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = heroPhrases[phraseIndex];
    const finishedTyping = typedText === phrase;
    const finishedDeleting = typedText.length === 0;
    const delay = finishedTyping ? 1500 : deleting ? 38 : 75;

    const timer = window.setTimeout(() => {
      if (finishedTyping) {
        setDeleting(true);
      } else if (finishedDeleting && deleting) {
        setDeleting(false);
        setPhraseIndex((current) => (current + 1) % heroPhrases.length);
      } else {
        setTypedText((current) =>
          deleting ? current.slice(0, -1) : phrase.slice(0, current.length + 1),
        );
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, phraseIndex, typedText]);

  return (
    <header id="top" className="hero-grid container">
      <div className="hero-copy">
        <motion.p
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="eyebrow availability"
        >
          <span /> Terbuka untuk peluang baru
        </motion.p>
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="hero-title"
        >
          Kualitas bukan
          <br />
          <span>sekadar tahap.</span>
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="hero-description"
        >
          Halo, saya <strong>Reno Putro S S</strong> —{" "}
          <span className="typed-line" aria-hidden="true">
            {typedText}
            <span className="typing-cursor" aria-hidden="true" />
          </span>
          <span className="sr-only">Software Quality Assurance</span> yang
          peduli pada alur sistem, pengalaman pengguna, dan kualitas produk
          digital.
        </motion.p>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="hero-actions"
        >
          <a className="button" href="/cv-andi-pratama.pdf" download>
            Download CV <Download size={16} />
          </a>
          <a className="button button-ghost" href="#contact">
            Kontak rekrutmen <ArrowUpRight size={16} />
          </a>
        </motion.div>
        <div className="hero-stats">
          <span>
            <b>QA</b> Fokus pada kualitas
          </span>
          <span>
            <b>Uji</b> Eksplorasi terarah
          </span>
          <span>
            <b>Dok</b> Informasi yang jelas
          </span>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="hero-orbit"
      >
        <div className="orbit-ring" />
        <div className="profile-frame">
          <img src={profilePhoto} alt="Foto profil Reno Putro S S" />
          <div className="profile-label">
            <span>FOKUS SAAT INI</span>
            <b>
              Menguji alur sistem
              <br />
              sebelum digunakan.
            </b>
          </div>
        </div>
        <div className="float-chip chip-top">
          <ShieldCheck size={15} /> Quality first
        </div>
        <div className="float-chip chip-bottom">
          <Bug size={15} /> Detail oriented
        </div>
      </motion.div>
      <div className="hero-scroll-cue" aria-hidden="true">
        <span>GULIR UNTUK MENJELAJAH</span>
        <ArrowDown size={15} />
      </div>
    </header>
  );
}

function About() {
  return (
    <RevealSection id="about">
      <SectionHeading
        eyebrow="01 / Tentang saya"
        title="Kualitas yang terlihat."
      >
        Pengujian bukan sekadar mencari kesalahan. Ini tentang memahami
        bagaimana sistem bekerja dan membantu orang menggunakannya dengan yakin.
      </SectionHeading>
      <div className="about-grid">
        <div className="panel about-panel">
          <Sparkles className="accent-icon" size={25} />
          <p className="about-lead">
            Saya senang memahami alur kerja, menguji skenario, dan mengubah
            temuan menjadi dokumentasi yang jelas serta berguna.
          </p>
          <p className="body-copy">
            Pengalaman magang sebagai Software Quality Assurance memberi saya
            kesempatan untuk mendukung workflow sistem, melakukan pengujian,
            serta menyusun user guide. Saya percaya komunikasi yang rapi sama
            pentingnya dengan pengujian yang teliti.
          </p>
        </div>
        <div className="stat-grid">
          <div className="stat-card">
            <CheckCircle2 />
            <strong>Pengujian</strong>
            <span>Terstruktur & eksploratif</span>
          </div>
          <div className="stat-card">
            <ShieldCheck />
            <strong>Dokumentasi</strong>
            <span>Temuan yang bisa ditindaklanjuti</span>
          </div>
          <div className="stat-card stat-wide">
            <Sparkles />
            <strong>Berorientasi pengguna</strong>
            <span>Memahami alur sistem dari sudut pandang pemakainya</span>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

function Experience() {
  return (
    <RevealSection id="experience" className="experience-section">
      <SectionHeading eyebrow="02 / Pengalaman" title="Belajar lewat praktik.">
        Catatan ringkas pengalaman magang di bidang Software Quality Assurance.
      </SectionHeading>
      <article className="experience-card panel">
        <div className="experience-marker">
          <span className="experience-dot" />
          <span className="experience-line" />
        </div>
        <div className="experience-content">
          <div className="experience-meta">
            <span className="experience-role">
              <BriefcaseBusiness size={16} /> Software Quality Assurance Intern
            </span>
            <span className="experience-role experience-company">
              <img src={companyLogo} alt="Logo Sofco Graha" />
              PT. Sofco Graha
            </span>
            <span className="experience-date">
              Periode magang · Agustus 2025 - Februari 2026
            </span>
          </div>
          <p className="experience-summary">
            Mendukung proses kualitas sistem melalui pemahaman workflow,
            pengujian, dan dokumentasi panduan pengguna.
          </p>
          <div className="experience-highlights">
            <div>
              <span>01</span>
              <p>
                Meninjau alur workflow sistem untuk memahami proses dan
                kebutuhan pengguna.
              </p>
            </div>
            <div>
              <span>02</span>
              <p>
                Membantu pengujian sistem dan mendokumentasikan skenario serta
                hasil temuan.
              </p>
            </div>
            <div>
              <span>03</span>
              <p>
                Menyusun user guide agar fitur dan alur penggunaan lebih mudah
                dipahami.
              </p>
            </div>
          </div>
        </div>
      </article>
    </RevealSection>
  );
}

function Skills() {
  return (
    <RevealSection id="skills">
      <SectionHeading
        eyebrow="03 / Toolbox"
        title="Perangkat untuk menjaga kualitas."
      >
        Metode, tools, dan dokumentasi yang mendukung proses pengujian yang
        terarah.
      </SectionHeading>
      <div className="skills-grid">
        <div className="panel skill-panel">
          <p className="panel-label">Kapabilitas QA</p>
          {[
            "Manual testing",
            "Functional testing",
            "API testing",
            "Test documentation",
          ].map((item, i) => (
            <div className="skill-row" key={item}>
              <span>0{i + 1}</span>
              <b>{item}</b>
              <ArrowUpRight size={16} />
            </div>
          ))}
        </div>
        <div className="panel skill-panel">
          <p className="panel-label">Tools & technologies</p>
          <div className="tool-list">
            {tools.map((tool) => (
              <span className="tool-tag" key={tool}>
                {tool}
              </span>
            ))}
          </div>
          <div className="principle">
            <span>// prinsip</span>
            <br />
            Pilih cara pengujian berdasarkan kebutuhan dan risiko sistem.
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

function TechMarquee() {
  return (
    <div className="marquee-band" aria-label="Tools dan bidang QA">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy} aria-hidden={copy === 1}>
            {tools.map((tool) => (
              <span className="marquee-item" key={`${copy}-${tool}`}>
                <i /> {tool}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Workflow() {
  return (
    <RevealSection className="workflow-section">
      <SectionHeading eyebrow="04 / Cara kerja" title="Dari alur ke keyakinan.">
        Proses yang terstruktur memberi ruang untuk mengeksplorasi sistem dengan
        lebih cermat.
      </SectionHeading>
      <div className="workflow-grid">
        {workflow.map(([number, title, desc], index) => (
          <motion.div
            whileHover={{ y: -5 }}
            className="workflow-step"
            key={number}
          >
            <span className="step-number">{number}</span>
            <div className="step-line">
              {index < workflow.length - 1 && <span />}
            </div>
            <div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </RevealSection>
  );
}

function Projects({ onOpenGallery }) {
  return (
    <RevealSection id="projects" className="projects-section">
      <SectionHeading
        eyebrow="05 / Contoh karya"
        title="Pengalaman lewat proyek nyata."
      >
        Contoh pekerjaan dan artefak yang memperlihatkan pengalaman, cara kerja,
        serta kontribusi saya sebagai kandidat Software Quality Assurance.
      </SectionHeading>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.article
            whileHover={{ y: -7 }}
            className={`project-card ${project.accent}`}
            key={project.title}
          >
            <button
              className="project-visual"
              type="button"
              onClick={() => onOpenGallery(project.title, project.images)}
              aria-label={`Lihat preview ${project.title}`}
            >
              {project.images[0] && (
                <img
                  className="project-cover"
                  src={project.images[0].src}
                  alt={`Preview ${project.title}: ${project.images[0].title}`}
                  loading="lazy"
                />
              )}
              <span className="project-type">{project.type}</span>
              <span className="project-index">0{index + 1}</span>
              <span className="project-image-count">
                <Image size={14} /> {project.images.length} gambar
              </span>
            </button>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <button
                type="button"
                className="project-gallery-link"
                onClick={() => onOpenGallery(project.title, project.images)}
                aria-label={`Buka galeri ${project.title}`}
              >
                Lihat semua preview <ArrowUpRight size={15} />
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </RevealSection>
  );
}

function Certificates({ onOpenGallery }) {
  return (
    <RevealSection id="certificates" className="certificates-section">
      <SectionHeading
        eyebrow="06 / Sertifikat"
        title="Belajar, lalu bertumbuh."
      >
        Seluruh sertifikat dan pelatihan yang telah diselesaikan.
      </SectionHeading>
      <div className="certificates-grid">
        {certificates.map((certificate, index) => (
          <motion.article
            whileHover={{ y: -6 }}
            className="certificate-card panel"
            key={certificate.src}
          >
            <button
              className="certificate-preview"
              type="button"
              onClick={() =>
                onOpenGallery("Sertifikat", [
                  { src: certificate.src, title: certificate.title },
                ])
              }
              aria-label={`Lihat sertifikat ${certificate.title}`}
            >
              <img
                src={certificate.src}
                alt={`Sertifikat ${certificate.title}`}
                loading="lazy"
              />
              <span className="certificate-view">
                <ExternalLink size={14} /> Lihat sertifikat
              </span>
            </button>
            <div className="certificate-caption">
              <div className="certificate-topline">
                <span className="certificate-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Award size={20} />
              </div>
              <p className="certificate-type">SERTIFIKAT / PELATIHAN</p>
              <h3>{certificate.title}</h3>
            </div>
          </motion.article>
        ))}
      </div>
    </RevealSection>
  );
}

function ImageGallery({ gallery, onClose, onNavigate }) {
  useEffect(() => {
    if (!gallery) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onNavigate(-1);
      if (event.key === "ArrowRight") onNavigate(1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gallery, onClose, onNavigate]);

  if (!gallery) return null;

  const currentImage = gallery.images[gallery.index];
  const hasMultipleImages = gallery.images.length > 1;

  return (
    <div
      className="gallery-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="gallery-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`Galeri ${gallery.title}`}
      >
        <div className="gallery-header">
          <div>
            <p className="eyebrow">PREVIEW PROYEK</p>
            <h2>{gallery.title}</h2>
          </div>
          <button
            type="button"
            className="gallery-close"
            onClick={onClose}
            aria-label="Tutup galeri"
          >
            <X size={20} />
          </button>
        </div>
        <div className="gallery-image-wrap">
          {hasMultipleImages && (
            <button
              type="button"
              className="gallery-nav gallery-prev"
              onClick={() => onNavigate(-1)}
              aria-label="Gambar sebelumnya"
            >
              <ChevronLeft />
            </button>
          )}
          <img src={currentImage.src} alt={currentImage.title} />
          {hasMultipleImages && (
            <button
              type="button"
              className="gallery-nav gallery-next"
              onClick={() => onNavigate(1)}
              aria-label="Gambar berikutnya"
            >
              <ChevronRight />
            </button>
          )}
        </div>
        <div className="gallery-footer">
          <span>{currentImage.title}</span>
          <span>
            {gallery.index + 1} / {gallery.images.length}
          </span>
        </div>
        {hasMultipleImages && (
          <div className="gallery-thumbnails" aria-label="Pilih preview">
            {gallery.images.map((image, index) => (
              <button
                type="button"
                className={index === gallery.index ? "active" : ""}
                key={image.src}
                onClick={() => onNavigate(index, true)}
                aria-label={`Lihat gambar ${index + 1}: ${image.title}`}
                aria-current={index === gallery.index ? "true" : undefined}
              >
                <img src={image.src} alt="" />
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <RevealSection id="contact">
      <div className="contact-panel">
        <div className="contact-copy">
          <p className="eyebrow">07 / Mari terhubung</p>
          <h2>
            Siap berkontribusi
            <br />
            <span>di tim QA Anda.</span>
          </h2>
          <p>
            Saya sedang mencari kesempatan kerja di bidang Software Quality
            Assurance. Tim rekrutmen atau calon rekan kerja dapat menghubungi
            saya untuk membahas posisi, pengalaman, dan proses seleksi.
          </p>
          <div className="social-links">
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <BriefcaseBusiness size={17} />
            </a>
            <a href="mailto:hello@andipr.dev" aria-label="Email">
              <Mail size={17} />
            </a>
          </div>
          <a
            className="github-profile-link"
            href="https://github.com/RenoSetyo18?tab=repositories"
            target="_blank"
            rel="noreferrer"
          >
            <Code2 size={18} />
            <span>
              <small>GITHUB / REPOSITORIES</small>
              <b>@RenoSetyo18</b>
            </span>
            <ArrowUpRight size={16} />
          </a>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const name = formData.get("name");
            const email = formData.get("email");
            const message = formData.get("message");
            const subject = encodeURIComponent(
              `Peluang kerja Software Quality Assurance — ${name}`,
            );
            const body = encodeURIComponent(
              `${message}\n\nDari: ${name}\nEmail: ${email}`,
            );
            window.location.href = `mailto:hello@andipr.dev?subject=${subject}&body=${body}`;
            setSent(true);
          }}
        >
          {sent && (
            <p className="success" role="status">
              Aplikasi email dibuka untuk melanjutkan pengiriman pesan.
            </p>
          )}
          <label>
            Nama
            <input name="name" required placeholder="Nama lengkap" />
          </label>
          <label>
            Email
            <input
              name="email"
              required
              type="email"
              placeholder="email@kamu.com"
            />
          </label>
          <label>
            Pesan
            <textarea
              name="message"
              required
              rows="4"
              placeholder="Sampaikan nama posisi, perusahaan, atau informasi proses rekrutmen..."
            />
          </label>
          <button className="button" type="submit">
            Kirim informasi rekrutmen <Send size={16} />
          </button>
        </form>
      </div>
    </RevealSection>
  );
}

function Footer() {
  return (
    <footer className="container footer">
      <span>
        © {new Date().getFullYear()} Reno Putro S S. Dibuat dengan rasa ingin
        tahu.
      </span>
      <span>QUALITY / CLARITY / IMPACT</span>
    </footer>
  );
}

export default function App() {
  const [activeGallery, setActiveGallery] = useState(null);

  const openGallery = (title, images) => {
    if (images.length === 0) return;
    setActiveGallery({ title, images, index: 0 });
  };

  const navigateGallery = (value, isIndex = false) => {
    setActiveGallery((gallery) => {
      if (!gallery) return gallery;
      const index = isIndex
        ? value
        : (gallery.index + value + gallery.images.length) % gallery.images.length;
      return { ...gallery, index };
    });
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Experience />
        <Skills />
        <Workflow />
        <Projects onOpenGallery={openGallery} />
        <Certificates onOpenGallery={openGallery} />
        <Contact />
      </main>
      <Footer />
      <ImageGallery
        gallery={activeGallery}
        onClose={() => setActiveGallery(null)}
        onNavigate={navigateGallery}
      />
    </>
  );
}
