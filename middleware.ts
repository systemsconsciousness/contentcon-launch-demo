import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {

  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    if (user === process.env.BASIC_AUTH_USERNAME && pwd === process.env.BASIC_AUTH_PASSWORD) {
      return NextResponse.next()
    }
  }
  url.pathname = '/api/basicauth'

  return NextResponse.rewrite(url)
}

export const config = {
  matcher: 'protected/:path*',
}