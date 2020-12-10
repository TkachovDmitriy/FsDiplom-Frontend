const manageTranslations = require('react-intl-translations-manager').default

manageTranslations({
  messagesDirectory: 'src/i18n/translations',
  translationsDirectory: 'src/i18n/locales',
  languages: ['en', 'de'],
  singleMessagesFile: true,
});