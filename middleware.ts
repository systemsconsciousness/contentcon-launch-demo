import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {

  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    if (user === process.env.BASIC_AUTH_USERNAME && pwd === process.env.BASIC_AUTH_PASSWORD) {
      const response = NextResponse.next()
      response.cookies.set('vercel', 'fast')
      response.cookies.set({
        name: 'vercel',
        value: 'fast',
        path: '/test',
      })
      cookie = response.cookies.get('vercel')
      console.log(cookie) // => { name: 'vercel', value: 'fast', Path: '/test' }
      return response
    }
  }
  url.pathname = '/api/basicauth'

  return NextResponse.rewrite(url)
}

export const config = {
  matcher: '/:path*',
}