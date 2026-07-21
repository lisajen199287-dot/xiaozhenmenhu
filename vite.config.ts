import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { extname, resolve } from 'path'

const htmlFallbackPlugin = () => {
  const shouldFallback = (req: any) => {
    if (!req.url || req.method !== 'GET') return false
    const accept = req.headers?.accept || ''
    if (!accept.includes('text/html')) return false

    const url = new URL(req.url, 'http://localhost')
    const pathname = url.pathname
    if (
      pathname.startsWith('/api') ||
      pathname.startsWith('/uploads') ||
      pathname.startsWith('/@vite') ||
      pathname.startsWith('/src') ||
      pathname.startsWith('/node_modules') ||
      pathname.startsWith('/static') ||
      pathname.startsWith('/assets')
    ) {
      return false
    }
    if (pathname.endsWith('.html')) return false
    if (extname(pathname)) return false
    return true
  }

  const fallback = (server: any) => {
    server.middlewares.use((req: any, _res: any, next: any) => {
      if (shouldFallback(req)) {
        const url = new URL(req.url, 'http://localhost')
        const showcaseRoutes = new Set([
          '/showcase',
          '/showcase/',
          '/showcase/smart-campus/demo'
        ])
        req.url = showcaseRoutes.has(url.pathname)
          ? `/showcase/showcase.html${url.search}`
          : `/index.html${url.search}`
      }
      next()
    })
  }

  return {
    name: 'local-html-history-fallback',
    configureServer: fallback,
    configurePreviewServer: fallback
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [htmlFallbackPlugin(), vue()],
  server: {
    port: 5555,
    strictPort: false,
    fs: {
      allow: [
        resolve(__dirname),
        '/Users/qingran/Documents/web_projects/pc_ui/node_modules'
      ]
    },
    proxy: {
      '/api': {
        target: 'http://192.168.12.28:48080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      },
      '/uploads': {
        target: 'http://192.168.12.28:48080',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'Portal',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        console: resolve(__dirname, 'console.html'),
        admin: resolve(__dirname, 'admin.html'),
        docs: resolve(__dirname, 'docs.html')
      }
    }
  }
})
