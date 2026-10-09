'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { FileText, X } from 'lucide-react';
import type { DocumentAsset } from '@/data/portfolio';
export function DocumentPreview({ title, document }: { title: string; document: DocumentAsset }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => { dialog.current?.close(); setOpen(false); trigger.current?.focus(); };
  return <><button ref={trigger} className="text-button" onClick={() => { setOpen(true); dialog.current?.showModal(); }}><FileText size={16} /> View document</button>
    <noscript><a href={document.src}>Open {title}</a></noscript>
    <dialog ref={dialog} className="document-dialog" aria-labelledby={`document-${title.replace(/\W/g, '-')}`} onCancel={close} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="dialog-header"><h3 id={`document-${title.replace(/\W/g, '-')}`}>{title}</h3><button className="icon-button" onClick={close} aria-label="Close document preview"><X /></button></div>
      {open && (document.type === 'image' && document.image ? <Image src={document.image.src} alt={document.image.alt} width={document.image.width} height={document.image.height} sizes="(max-width: 768px) 90vw, 800px" /> : document.type === 'pdf' ? <iframe title={`${title} PDF`} src={document.src} /> : <p>Preview unavailable.</p>)}
      <a className="button button-primary" href={document.src} target="_blank" rel="noopener noreferrer">Open document in a new tab</a>
    </dialog></>;
}
