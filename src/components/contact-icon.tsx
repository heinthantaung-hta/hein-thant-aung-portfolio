import { Mail, Send, Globe } from 'lucide-react';

// Small vector marks stay crisp and load without an external icon service.
export function ContactIcon({ platform }: { platform: string }) {
  if (platform === 'Telegram') return <Send size={24} aria-hidden="true" />;
  if (platform === 'Email') return <Mail size={26} aria-hidden="true" />;
  if (platform === 'Facebook') return <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
  if (platform === 'GitHub') return <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .75a11.25 11.25 0 0 0-3.558 21.923c.563.103.768-.244.768-.543 0-.267-.01-.975-.016-1.914-3.128.68-3.788-1.507-3.788-1.507-.511-1.298-1.248-1.643-1.248-1.643-1.021-.699.078-.685.078-.685 1.129.08 1.723 1.159 1.723 1.159 1.003 1.718 2.633 1.222 3.274.934.102-.726.392-1.222.713-1.502-2.497-.284-5.122-1.249-5.122-5.562 0-1.229.44-2.233 1.159-3.02-.116-.284-.503-1.429.11-2.978 0 0 .944-.302 3.092 1.154a10.79 10.79 0 0 1 5.629 0c2.147-1.456 3.09-1.154 3.09-1.154.614 1.549.228 2.694.112 2.978.72.787 1.157 1.791 1.157 3.02 0 4.324-2.629 5.275-5.134 5.553.404.349.766 1.035.766 2.086 0 1.506-.014 2.722-.014 3.092 0 .302.203.652.774.541A11.25 11.25 0 0 0 12 .75Z" /></svg>;
  return <Globe size={24} aria-hidden="true" />;
}
