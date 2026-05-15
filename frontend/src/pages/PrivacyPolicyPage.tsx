import { useTranslation } from 'react-i18next';

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();
  const date = new Date().toLocaleDateString();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">{t('privacy.title')}</h1>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 space-y-6 text-gray-300 text-sm leading-relaxed">
        <p className="text-gray-400">{t('privacy.lastUpdated', { date })}</p>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">{t('privacy.s1Title')}</h2>
          <p>{t('privacy.s1Intro')}</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>{t('privacy.s1Item1Label')}</strong> {t('privacy.s1Item1Text')}</li>
            <li><strong>{t('privacy.s1Item2Label')}</strong> {t('privacy.s1Item2Text')}</li>
            <li><strong>{t('privacy.s1Item3Label')}</strong> {t('privacy.s1Item3Text')}</li>
            <li><strong>{t('privacy.s1Item4Label')}</strong> {t('privacy.s1Item4Text')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">{t('privacy.s2Title')}</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>{t('privacy.s2Item1')}</li>
            <li>{t('privacy.s2Item2')}</li>
            <li>{t('privacy.s2Item3')}</li>
            <li>{t('privacy.s2Item4')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">{t('privacy.s3Title')}</h2>
          <p>{t('privacy.s3Text')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">{t('privacy.s4Title')}</h2>
          <p>{t('privacy.s4Text')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">{t('privacy.s5Title')}</h2>
          <p>{t('privacy.s5Intro')}</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>{t('privacy.s5Item1')}</li>
            <li>{t('privacy.s5Item2')}</li>
            <li>{t('privacy.s5Item3')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">{t('privacy.s6Title')}</h2>
          <p>{t('privacy.s6Text')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">{t('privacy.s7Title')}</h2>
          <p>{t('privacy.s7Text')}</p>
        </section>
      </div>
    </div>
  );
}
