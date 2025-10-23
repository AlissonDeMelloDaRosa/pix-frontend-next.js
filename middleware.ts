import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('authToken');
    const rotasProtegidas = ['/dashboard', '/perfil'];

    if (rotasProtegidas.some(rota => request.nextUrl.pathname.startsWith(rota))) {
        if (!token) {
            const loginUrl = new URL('/', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
        * Corresponde a todos os caminhos de requisição, exceto para:
        * - /api (rotas da API)
        * - /_next/static (arquivos estáticos)
        * - /_next/image (otimização de imagem)
        * - /favicon.ico (ícone)
        */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};