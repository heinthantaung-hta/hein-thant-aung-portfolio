import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { enabledProjects, portfolio, projectBySlug } from '@/data/portfolio';
import { Navigation } from '@/components/navigation';
import { pageMetadata } from '@/lib/metadata';
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return enabledProjects.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projectBySlug((await params).slug);
  if (!project?.caseStudy) return { title: 'Project not found', robots: { index: false, follow: false } };
  return pageMetadata(`${project.title} — ${portfolio.name}`, project.description || project.caseStudy.overview, `/projects/${project.slug}`);
}
export default async function ProjectPage({ params }: Props) {
  const project = projectBySlug((await params).slug);
  if (!project?.caseStudy) notFound();
  return <><Navigation name={portfolio.name} initials={portfolio.initials} items={portfolio.navigation} /><main id="main" className="container case-study"><Link className="text-button" href="/#projects">Back to selected work</Link><p className="eyebrow">{project.category}</p><h1>{project.title}</h1><p className="intro-copy">{project.caseStudy.overview}</p>{project.image && <Image src={project.image.src} alt={project.image.alt} width={project.image.width} height={project.image.height} sizes="100vw" />}{project.stack?.length ? <div className="chips">{project.stack.map(item => <span className="chip" key={item}>{item}</span>)}</div> : null}{project.caseStudy.sections?.filter(section => section.title.trim() && section.body.trim()).map(section => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}<div className="project-links">{project.liveUrl && <a href={project.liveUrl}>Live project</a>}{project.sourceUrl && <a href={project.sourceUrl}>Source code</a>}</div></main></>;
}
