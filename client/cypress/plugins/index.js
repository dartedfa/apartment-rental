module.exports = (on, config) => {

  config.baseUrl = 'https://localhost:3000'
  Object.assign(config, {
    integrationFolder: 'cypress/e2e',
    ignoreTestFiles: '**/*.+(exercise|final|extra-)*.js',
  })

  return config
}
