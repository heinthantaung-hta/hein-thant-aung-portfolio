import Link from 'next/link';
import Image from 'next/image';
import { Code2, Layers3, Smartphone, BookOpen, GraduationCap, Trophy, FileText, MessageCircle, CodeXml, Globe } from 'lucide-react';
import { portfolio as p, type Project } from '@/data/portfolio';
import { Navigation } from '@/components/navigation';
import { Reveal } from '@/components/reveal';
import { ContactIcon } from '@/components/contact-icon';
import { DocumentPreview } from '@/components/document-preview';

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) { return <p className="section-label"><span>{number}</span>{children}</p>; }
function ProjectLinks({ project }: { project: Project }) { return <div className="project-links">{project.caseStudy?.overview.trim() && <Link className="text-button" href={`/projects/${project.slug}`}>Read case study</Link>}{project.liveUrl && <a className="text-button" href={project.liveUrl} target="_blank" rel="noopener noreferrer"><Globe size={16} /> Live project</a>}{project.sourceUrl && <a className="text-button" href={project.sourceUrl} target="_blank" rel="noopener noreferrer"><CodeXml size={16} /> Source code</a>}</div>; }
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.slug === 'aethel' ? Layers3 : project.slug === 'harumii' ? BookOpen : project.category === 'Mobile' ? Smartphone : Code2;
  return <article className={`project-card ${index === 0 ? 'featured-project' : ''}`}>
    <div className={`project-preview preview-${index} ${project.image ? 'has-screenshot' : ''} ${project.category === 'Mobile' ? 'is-mobile' : ''}`}>
      {project.image ? <Image src={project.image.src} alt={project.image.alt} width={project.image.width} height={project.image.height} sizes={project.category === 'Mobile' ? '250px' : index === 0 ? '(max-width: 768px) 100vw, 65vw' : '(max-width: 768px) 100vw, 50vw'} /> : <><span className="preview-index">0{index + 1} / {project.category}</span><div className="project-typography"><Icon strokeWidth={1.1} size={index === 0 ? 56 : 40} aria-hidden="true" /><span>{project.title}</span></div><span className="preview-caption">Typographic preview · Screenshot not provided</span></>}
    </div>
    <div className="project-information"><div><p className="eyebrow">{project.category}{project.year ? ` / ${project.year}` : ''}</p><h3>{project.title}</h3><p className="muted">{project.description || 'Project details coming soon.'}</p></div>{project.status && <span className="chip">{project.status}</span>}{project.stack && <div className="chips">{project.stack.map(item => <span key={item} className="chip">{item}</span>)}</div>}<ProjectLinks project={project} /></div>
  </article>;
}
export default function Home() {
  return <><Navigation name={p.name} initials={p.initials} items={p.navigation} /><main id="main">
    <section id="home" className="hero container" aria-labelledby="hero-title">
      <div className="hero-topline"><span className="eyebrow">{p.role} portfolio</span><span className="hero-edition">Selected work & personal journey</span></div>
      <div className="hero-content"><div className="hero-copy"><h1 id="hero-title">{p.hero.headline.split('\n').map((line, i) => <span key={line} className={i === 1 ? 'hero-last' : ''}>{line}</span>)}</h1>{p.hero.introduction && <p className="hero-introduction">{p.hero.introduction}</p>}<div className="hero-actions"><a className="button button-primary" href="#projects">{p.hero.primaryLabel}</a><a className="button button-secondary" href="#contact">{p.hero.secondaryLabel}</a></div></div>
      <figure className="identity-card">
        {p.about.photograph ? <Image
          src={p.about.photograph.src}
          alt={p.about.photograph.alt}
          width={p.about.photograph.width}
          height={p.about.photograph.height}
          sizes="(max-width: 767px) 280px, 400px"
          preload
        /> : <div className="identity-placeholder" aria-hidden="true">{p.initials}</div>}
        <figcaption className="identity-caption"><span>{p.name}</span><span>{p.role}</span></figcaption>
      </figure></div>
      <div className="hero-bottom"><span>Code. Create. Keep learning.</span><a href="#about">Scroll to discover <span aria-hidden="true">↓</span></a></div>
    </section>
    <section id="about" tabIndex={-1} className="section container" aria-labelledby="about-title">
      <Reveal>
        <SectionLabel number="01">About me</SectionLabel>
        <div className="about-grid">
          <h2 id="about-title">{p.about.heading}</h2>
          <div className="about-copy">
            {p.about.body ? p.about.body.split(/\n\n+/).map((paragraph, index) => <p key={index}>{paragraph}</p>) : <>
              <p className="intro-copy">{p.name}<br /><span className="muted">{p.role}</span></p>
              <p className="muted">Personal introduction coming soon.</p>
            </>}
            <a className="text-button" href="#journey">Explore the journey</a>
          </div>
        </div>
      </Reveal>
    </section>
    <section id="projects" tabIndex={-1} className="section work-section" aria-labelledby="work-title"><div className="container"><Reveal><SectionLabel number="02">Selected work</SectionLabel><div className="section-heading"><h2 id="work-title">Ideas into<br /><span className="muted">reality.</span></h2><p>A selection of projects across<br className="desktop-break" /> systems and mobile.</p></div></Reveal><div className="projects-grid">{p.projects.map((project, index) => <Reveal key={project.slug} className={index === 0 ? 'featured-wrapper' : ''}><ProjectCard project={project} index={index} /></Reveal>)}</div></div></section>
    <section id="journey" tabIndex={-1} className="section container" aria-labelledby="journey-title">
      <Reveal>
        <SectionLabel number="03">The journey</SectionLabel>
        <div className="section-heading">
          <h2 id="journey-title">Learning.<br /><span className="muted">Growing.</span></h2>
          <p>Education, milestones,<br />and experiences along the way.</p>
        </div>
        <div className="education-block">
          <div className="subsection-title"><GraduationCap size={22} /><h3>Education</h3></div>
          {p.education.length ? <div className="education-grid">
            {[...p.education].sort((a, b) => (a.startYear ?? a.endYear ?? Infinity) - (b.startYear ?? b.endYear ?? Infinity)).map((item, i) => <article key={`${item.title}-${i}`} className="education-card">
              {(item.startYear || item.endYear) ? <span className="eyebrow">{[item.startYear, item.endYear].filter(Boolean).join(' — ')}</span> : null}
              <h4>{item.title}</h4>
              {item.institution && <p>{item.institution}</p>}
              {item.detail && <p className="muted">{item.detail}</p>}
            </article>)}
          </div> : <p className="muted">Education details coming soon.</p>}
        </div>
        <div className="subsection-title achievement-heading"><Trophy size={22} /><h3>Academic achievements</h3></div>
        <div className="achievement-grid">{p.achievements.map((item, i) => <article key={item.title} className="achievement-card"><span className="eyebrow">Milestone 0{i + 1}</span><p className="achievement-value">{item.value || '—'}</p><h4>{item.title}</h4><p className="muted">{item.detail || 'Result not provided.'}</p></article>)}</div>
        <div className="competition-block">
          <div className="subsection-title"><Trophy size={22} /><h3>Competition experience</h3></div>
          {p.competitions.length ? p.competitions.map((item, i) => <article className={`competition-card ${item.image ? 'has-photo' : ''}`} key={`${item.title}-${i}`}>
            <div className="competition-copy">
              <h4>{item.title}</h4>
              {item.date && <p className="eyebrow">{item.date}</p>}
              {item.institution && <p>{item.institution}</p>}
              {item.description && <p className="muted">{item.description}</p>}
              {item.document && <DocumentPreview title={item.title} document={item.document} />}
            </div>
            {item.image && <figure className="competition-photo">
              <Image src={item.image.src} alt={item.image.alt} width={item.image.width} height={item.image.height} sizes="(max-width: 767px) min(520px, calc(100vw - 40px)), (max-width: 1100px) 45vw, 520px" />
              {item.imageCaption && <figcaption>{item.imageCaption}</figcaption>}
            </figure>}
          </article>) : <p className="muted">Competition details coming soon.</p>}
        </div>
      </Reveal>
    </section>
    <section id="certificates" tabIndex={-1} className="section container" aria-labelledby="certificates-title"><Reveal><SectionLabel number="04">Certificates</SectionLabel><div className="section-heading"><h2 id="certificates-title">The paper trail.</h2><p>Supporting documents.</p></div><div className="certificate-grid">{p.certificates.map((item, i) => <article className="certificate-card" key={`${item.title}-${i}`}>
      {item.document?.image && <Image className="certificate-thumbnail" src={item.document.image.src} alt={item.document.image.alt} width={item.document.image.width} height={item.document.image.height} sizes="(max-width: 767px) calc(100vw - 88px), 30vw" />}
      <div className="certificate-top"><FileText size={28} strokeWidth={1.3} /><span className="eyebrow">0{i + 1}</span></div><h3>{item.title}</h3>{item.issuer && <p>{item.issuer}</p>}{item.date && <p className="eyebrow">{item.date}</p>}{item.document ? <DocumentPreview title={item.title} document={item.document} /> : <p className="muted">Document not provided.</p>}</article>)}</div></Reveal></section>
    <section id="contact" tabIndex={-1} className="contact-section" aria-labelledby="contact-title">
      <div className="container">
        <Reveal>
          <SectionLabel number="05">Get in touch</SectionLabel>
          <div className="contact-grid">
            <div className="contact-intro">
              <div className="contact-emblem" aria-hidden="true"><MessageCircle size={44} strokeWidth={1.3} /></div>
              <h2 id="contact-title">{p.contact.heading.split('\n').map(line => <span key={line}>{line}</span>)}</h2>
            </div>
            <div className="contact-details">
              {p.contact.email ? <a className="contact-email-card" href={`mailto:${p.contact.email}`}>
                <span className="contact-logo"><ContactIcon platform="Email" /></span>
                <span className="contact-email-copy"><span className="contact-card-label">Email me</span><span>{p.contact.email}</span></span>
              </a> : <p>Contact details coming soon.</p>}
              {p.contact.links.length > 0 && <div className="contact-social-grid">{p.contact.links.map(link => <a className="contact-social-card" href={link.url} key={link.label} target="_blank" rel="noopener noreferrer">
                <span className="contact-logo"><ContactIcon platform={link.label} /></span>
                <span>{link.label}</span>
              </a>)}</div>}
            </div>
          </div>
        </Reveal>
        <footer><a className="wordmark" href="#home">{p.initials}<span>.</span></a><span>© {new Date().getFullYear()} {p.footer}</span><a href="#home">Back to top <span aria-hidden="true">↑</span></a></footer>
      </div>
    </section>
  </main></>;
}
