export interface Asset { src: string; alt: string; width: number; height: number }
export interface DocumentAsset { src: string; type: 'image' | 'pdf'; image?: Asset }
export interface Education { title: string; institution?: string; startYear?: number; endYear?: number; detail?: string }
export interface Achievement { title: string; value?: string; detail?: string }
export interface CaseStudy { overview: string; sections?: { title: string; body: string }[] }
export interface Project { slug: string; title: string; category: string; description?: string; stack?: string[]; status?: string; year?: string; liveUrl?: string; sourceUrl?: string; image?: Asset; caseStudy?: CaseStudy }
export interface Certificate { title: string; issuer?: string; date?: string; document?: DocumentAsset }
export interface Competition { title: string; date?: string; institution?: string; description?: string; image?: Asset; imageCaption?: string; document?: DocumentAsset }
export interface ContactLink { label: string; url: string }
export interface Portfolio {
  name: string; initials: string; role: string; description: string;
  hero: { headline: string; introduction?: string; primaryLabel: string; secondaryLabel: string };
  navigation: { id: string; label: string }[];
  about: { heading: string; body?: string; photograph?: Asset };
  education: Education[]; achievements: Achievement[];
  projects: Project[]; competitions: Competition[]; certificates: Certificate[];
  contact: { heading: string; email?: string; links: ContactLink[] }; footer: string;
}

// Personal content and project assets are supplied by the owner; Harumii’s public description was checked against its live site.
// Replace the clearly marked gaps with verified personal content.
export const portfolio: Portfolio = {
  name: 'Hein Thant Aung', initials: 'HTA', role: 'Aspiring Full-Stack Developer & Data Analyst',
  description: 'Hein Thant Aung — final-year Business Computing and Information Systems student, aspiring Full-Stack Developer and Data Analyst. Explore projects and academic achievements.',
  hero: { headline: 'Hein Thant\nAung.', primaryLabel: 'Explore my work', secondaryLabel: 'Get in touch' },
  navigation: [{ id: 'about', label: 'About' }, { id: 'projects', label: 'Work' }, { id: 'journey', label: 'Journey' }, { id: 'contact', label: 'Contact' }],
  about: {
    heading: 'Behind the code.',
    body: `Hi, I'm Hein Thant Aung, a final-year BSc (Hons) Business Computing and Information Systems student and an aspiring Full-Stack Developer and Data Analyst.

I have a strong academic background in computing and data science, having achieved all Distinctions in my NCC Level 3 and Level 4 qualifications, followed by five Distinctions and one Merit in my NCC Level 5 Diploma in Computing with Data Science.

Beyond academics, I participated in the Future IT Professionals Web Development Competition organized by MCPA Yangon, which gave me valuable exposure to practical web development challenges.

I'm passionate about creating user-friendly digital solutions, exploring new technologies, and turning complex data into meaningful insights. I enjoy learning, solving problems, and continuously improving my skills to grow as a developer and data analyst.`,
    photograph: { src: '/images/hein-thant-aung.png', alt: 'Portrait of Hein Thant Aung', width: 1254, height: 1254 },
  },
  education: [
    { title: 'NCC Level 3 qualification', detail: 'Achieved all Distinctions.' },
    { title: 'NCC Level 4 qualification', detail: 'Achieved all Distinctions.' },
    { title: 'NCC Level 5 Diploma in Computing with Data Science', detail: 'Achieved five Distinctions and one Merit.' },
    { title: 'BSc (Hons) Business Computing and Information Systems', detail: 'Final-year student.' },
  ],
  achievements: [
    { title: 'NCC Level 3', value: 'All D', detail: 'All Distinctions.' },
    { title: 'NCC Level 4', value: 'All D', detail: 'All Distinctions.' },
    { title: 'NCC Level 5', value: '5D + 1M', detail: 'Five Distinctions and one Merit in Computing with Data Science.' },
  ],
  projects: [
    {
      slug: 'aethel', title: 'Aethel', category: 'Featured project',
      description: 'A movie community with a social feed, personal collections, ratings, and film discovery.',
      image: { src: '/images/aethel-feed.png', alt: 'Aethel movie community feed showing film posts, personal collection counts, and movie discovery panels', width: 2880, height: 1800 },
    },
    {
      slug: 'mandalar-x', title: 'Mandalar X', category: 'E-commerce system',
      description: 'A marketplace for browsing product listings, with search and filters for category, condition, location, and price.',
      image: { src: '/images/mandalar-x-home.png', alt: 'Mandalar X homepage with its blue hero, Sell Smarter Buy Safer headline, product cards, and marketplace search', width: 3024, height: 1964 },
    },
    {
      slug: 'loanledger', title: 'LoanLedger', category: 'Mobile',
      description: 'An Android loan-tracking app with a Burmese-language dashboard, daily collection summaries, and a monthly calendar.',
      stack: ['Kotlin'],
      image: { src: '/images/loanledger-android.png', alt: 'LoanLedger Android app showing its Burmese-language dashboard, daily collection summary, and monthly calendar', width: 1014, height: 1764 },
    },
    {
      slug: 'harumii', title: 'Harumii', category: 'Japanese language centre',
      description: 'A Japanese language centre website presenting JLPT N5–N2 courses, teacher information, and contact options.',
      liveUrl: 'https://trharumii.online/',
      image: { src: '/images/harumii-home.png', alt: 'Harumii Japanese Language Centre homepage with its pink design, JLPT N5–N2 course introduction, and contact options', width: 2880, height: 1800 },
    },
  ],
  competitions: [
    {
      title: 'Future IT Professionals Web Development Competition',
      institution: 'MCPA Yangon',
      description: 'Participated in the competition, gaining valuable exposure to practical web development challenges.',
      image: { src: '/images/mcpa-competition.jpg', alt: 'Competition participants collaborating around laptops at a table', width: 1600, height: 1200 },
      imageCaption: 'Working together at the Future IT Professionals Web Development Competition.' ,
    },
  ],
  certificates: [
    {
      title: 'Excel Basics for Data Analysis', issuer: 'IBM · Coursera', date: '30 July 2026',
      document: {
        type: 'pdf', src: '/documents/excel-basics-data-analysis.pdf',
        image: { src: '/images/certificates/excel-basics-data-analysis.png', alt: 'IBM Excel Basics for Data Analysis course certificate awarded to Hein Thant Aung', width: 1400, height: 1081 },
      },
    },
    {
      title: 'Database Structures and Management with MySQL', issuer: 'Meta · Coursera', date: '6 July 2026',
      document: {
        type: 'pdf', src: '/documents/database-structures-management-mysql.pdf',
        image: { src: '/images/certificates/database-structures-management-mysql.png', alt: 'Meta Database Structures and Management with MySQL course certificate awarded to Hein Thant Aung', width: 1400, height: 1081 },
      },
    },
    {
      title: 'Build Data Lakes and Data Warehouses on Google Cloud', issuer: 'Google Cloud · Coursera', date: '9 July 2026',
      document: {
        type: 'pdf', src: '/documents/google-cloud-data-lakes-warehouses.pdf',
        image: { src: '/images/certificates/google-cloud-data-lakes-warehouses.png', alt: 'Google Cloud Build Data Lakes and Data Warehouses on Google Cloud course certificate awarded to Hein Thant Aung', width: 1400, height: 1081 },
      },
    },
  ],
  contact: {
    heading: 'Let’s start a\nconversation.',
    email: 'heinthantaung.mst@gmail.com',
    links: [
      { label: 'Telegram', url: 'https://t.me/heinthant_aung' },
      { label: 'Facebook', url: 'https://www.facebook.com/heinthant.aung27' },
      { label: 'GitHub', url: 'https://github.com/heinthantaung-hta' },
    ],
  },
  footer: 'Hein Thant Aung',
};

export const enabledProjects = portfolio.projects.filter(p => Boolean(p.caseStudy?.overview.trim()));
export function projectBySlug(slug: string) { return enabledProjects.find(p => p.slug === slug); }
