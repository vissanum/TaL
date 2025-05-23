// eslint-disable-next-line import/no-named-as-default
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx: any) {
    // Añadí 'any' temporalmente si ctx no tiene tipo
    if (DefaultTheme.enhanceApp) {
      DefaultTheme.enhanceApp(ctx)
    }

    // Asegúrate de que 'window' y 'location' estén disponibles en el contexto de VitePress
    // o considera si esta lógica debe estar condicionada por `typeof window !== 'undefined'`
    if (
      typeof window !== 'undefined' &&
      window.navigator.language.startsWith('zh') &&
      !location.pathname.startsWith('/zh')
    ) {
      ctx.router.go('/zh' + location.pathname)
    }
  },
}
