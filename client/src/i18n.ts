import NextI18Next from 'next-i18next';
import path from 'path';

// visit https://github.com/i18next/next-i18next/tree/v7.0.1 to see v7.0.1 docs:
// visit https://www.i18next.com/overview/configuration-options for more options to add below inside NextI18Next:

module.exports = new NextI18Next({
  defaultLanguage: 'en',
  detection: {
    order: ['path'],
  },
  otherLanguages: ['en', 'fr', 'en-US', 'en-CA', 'fr-CA'],
  localePath: path.resolve('public/locales'),
  defaultNS: 'translation',
  nonExplicitSupportedLngs: false, // so fr-CA is interpreted as fr
  interpolation: {
    escapeValue: false,
    format: (value, format) => {
      if (format === 'uppercase') {
        return value.toUpperCase();
      }

      return value;
    },
  },
  //debug: true, // IF YOU NEED TO DEBUG!!!
});
