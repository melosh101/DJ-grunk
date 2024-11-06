import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '~/server/db'
import { eq } from 'drizzle-orm'
import { sessions } from '~/server/db/schema'
import { useAuthContext } from '~/lib/auth'

// 1. Specify protected and public routes
const protectedRoutes = ['/user']
const publicRoutes = ['/login', '/signup', '/']

export default async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)
    const AuthContext = useAuthContext();

    var session = AuthContext;
    if(!session) {
        const DBsession = await db.query.sessions.findFirst({
            where: eq(sessions.token, cookie),
        })
    }
    // 3. Decrypt the session from the cookie
    const cookie = (await cookies()).get('session')?.value

    // 4. Redirect to /login if the user is not authenticated
    if (isProtectedRoute && !cookie) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    if(!cookie) {
        return NextResponse.next()
    }



    if()

    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}