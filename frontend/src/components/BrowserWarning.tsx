import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function detectUnsupportedBrowser(): string | null {
  const ua = navigator.userAgent;
  if (/MSIE|Trident/.test(ua)) return 'Internet Explorer';
  if (/Edge\/\d+/.test(ua) && !/Edg\//.test(ua)) return 'Legacy Edge';
  return null;
}

export default function BrowserWarning() {
  const { t } = useLanguage();
  const [unsupported, setUnsupported] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setUnsupported(detectUnsupportedBrowser());
  }, []);

  if (!unsupported || dismissed) return null;

  const warningText = ((t as any).browser?.warning ?? '{{browser}} is not supported. Please use Chrome, Firefox, Safari, or Edge (latest).')
    .replace('{{browser}}', unsupported);

  return (
    <div className="bg-amber-900/80 border-b border-amber-600 text-amber-200 text-sm px-4 py-2 flex items-center justify-between">
      <span>{warningText}</span>
      <button
        onClick={() => setDismissed(true)}
        className="ml-4 text-amber-400 hover:text-white font-bold"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}
