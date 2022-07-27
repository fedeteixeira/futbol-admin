import polyglotI18nProvider from 'ra-i18n-polyglot';
import spanishMessages from '@blackbox-vision/ra-language-spanish';

export const spanishProvider = polyglotI18nProvider(() => spanishMessages, 'es');