import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  publicRoutes: [
    '/', 
    '/login', 
    '/register', 
    '/email', 
    '/api/webhook'
  ],
  ignoredRoutes: [
    '/api/webhook'
  ]
});

export const config = {
  matcher: [
    // Exécuter le middleware sur toutes les routes sauf :
    // - Les fichiers statiques (/_next/, /favicon.ico, etc.)
    // - Les fichiers publics (/images/, /public/, etc.)
    '/((?!_next|[^?]\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).)',
    // Toujours exécuter pour les routes API
    '/(api|trpc)(.*)',
  ],
};