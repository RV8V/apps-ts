import App from './app'

try {
  const app = new App({
    port: 3000,
    applicationName: 'typescript server'
  })
  app.run()
} catch(err) { console.log(err) }
