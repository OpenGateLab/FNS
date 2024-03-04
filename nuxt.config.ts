// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    // Keys within public are also exposed client-side
    public: {
      apiBase: 'https://opengatefns.com/web-api-v2' // 'http://192.168.1.165:5200'
    }
  },
  /* nitro: {
    devProxy: {
      '/api': {
        target: 'http://192.168.1.165/',
        changeOrigin: true
      }
    }
    // serveStatic: true
  }, */
  ssr: false,
  css: ['~/assets/app.less'],
  modules: ['nuxt-windicss', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@nuxtjs/i18n'],
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'keywords', content: 'fns' },
        { charset: 'utf-8' }
      ]
    }
  },
  // @ts-ignore
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.yml',
        name: 'English'
      },
      {
        code: 'hk',
        file: 'zh-HK.yml',
        name: '繁體中文'
      }
    ],
    lazy: false,
    langDir: 'lang',
    defaultLocale: 'en'
    /* detectBrowserLanguage: { https://v8.i18n.nuxtjs.org/options/browser
      // default: { alwaysRedirect: false, fallbackLocale: '', redirectOn: 'root', useCookie: true, cookieCrossOrigin: false, cookieDomain: null, cookieKey: 'i18n_redirected', cookieSecure: false }
      useCookie: true,
      cookieKey: 'i18n_redirected'
    } */
  }
})
