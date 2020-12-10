module.exports = {
  env: {
    development: {
      compact: false
    }
  },
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-typescript',
    [
      "react-intl", {
        "messagesDir": "src/i18n/translations/",
      }
    ],
    [
      'react-intl-auto',
      {
        removePrefix: 'src/',
        filebase: false,
      }
    ]
  ]
}
