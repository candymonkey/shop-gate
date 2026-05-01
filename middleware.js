import { next } from '@vercel/edge';

export default function middleware(req) {
    const { nextUrl: url, geo } = req;
    const country = geo?.country || 'US';

    // Redirect otomatis dari halaman utama ke versi bahasa masing-masing
    if (url.pathname === '/') {
        const locale = country === 'ID' ? '/id' : '/en';
        url.pathname = locale;
        return Response.redirect(url);
    }

    return next();
}
