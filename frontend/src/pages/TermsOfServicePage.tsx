import { useTranslation } from 'react-i18next';

export default function TermsOfServicePage() {
  const { t } = useTranslation();
  const date = new Date().toLocaleDateString();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">{t('terms.title')}</h1>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 space-y-6 text-gray-300 text-sm leading-relaxed">
        <p className="text-gray-400">{t('terms.lastUpdated', { date })}</p>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">{t('terms.s1Title')}</h2>
          <p>{t('terms.s1Text')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">{t('terms.s2Title')}</h2>
          <p>{t('terms.s2Text')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">{t('terms.s3Title')}</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>{t('terms.s3Item1')}</li>
            <li>{t('terms.s3Item2')}</li>
            <li>{t('terms.s3Item3')}</li>
            <li>{t('terms.s3Item4')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">{t('terms.s4Title')}</h2>
          <p>{t('terms.s4Intro')}</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>{t('terms.s4Item1')}</li>
            <li>{t('terms.s4Item2')}</li>
            <li>{t('terms.s4Item3')}</li>
            <li>{t('terms.s4Item4')}</li>
            <li>{t('terms.s4Item5')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">{t('terms.s5Title')}</h2>
          <p>{t('terms.s5Text')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">{t('terms.s6Title')}</h2>
          <p>{t('terms.s6Text')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">{t('terms.s7Title')}</h2>
          <p>{t('terms.s7Text')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">{t('terms.s8Title')}</h2>
          <p>{t('terms.s8Text')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">{t('terms.s9Title')}</h2>
          <p>{t('terms.s9Text')}</p>
        </section>
      </div>
    </div>
  );
}
