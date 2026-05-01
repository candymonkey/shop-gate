export const config = {
  matcher: '/',
};

export default function middleware(request) {
  const url = new URL(request.url);

  // Ambil data negara langsung dari header Vercel
  const country = request.headers.get('x-vercel-ip-country') || 'US';
  
  // Ambil data bahasa browser
  const acceptLanguage = request.headers.get('accept-language') || '';
  const isIndo = country === 'ID' || acceptLanguage.toLowerCase().includes('id');

  // Logika pengalihan
  if (isIndo) {
    url.pathname = '/id';
  } else {
    url.pathname = '/en';
  }

  // Gunakan redirect 307 (Temporary) agar browser tidak 'hafal' link yang salah
  return Response.redirect(url, 307);
}
