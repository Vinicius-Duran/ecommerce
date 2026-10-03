import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')
  
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1]
      const [user, pwd] = atob(authValue).split(':')

      // Use variáveis de ambiente na produção
      const adminUser = process.env.ADMIN_USER || 'admin'
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

      if (user === adminUser && pwd === adminPassword) {
        return NextResponse.next()
      }
    }

    req.nextUrl.pathname = '/api/auth'
    return new NextResponse('Auth required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
