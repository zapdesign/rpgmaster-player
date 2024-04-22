import { NextRequest, NextResponse } from "next/server"

export default function middleware(request: NextRequest){
    const token = request.cookies.get('@access_token_player')?.value

    const signInURL = new URL('/404', request.url)
    const homeURL = new URL('/section', request.url)

    if(!token){
        if(request.nextUrl.pathname.includes('login')){
            return NextResponse.next()
        }   

        if(request.nextUrl.pathname.includes('section')){
            return NextResponse.redirect(signInURL)
        }

    }    

    
    if(request.nextUrl.pathname.includes('login')){
        return NextResponse.redirect(homeURL)
    }
    
    if(request.nextUrl.pathname === '/'){
        return NextResponse.redirect(homeURL)
    }
    
}

export const config = {
    matcher: ['/:path*', '/section/:path*', '/login/:path*'] 
}