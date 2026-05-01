export const config = {
  // Hanya jalankan middleware ini untuk halaman utama (root)
  matcher: '/',
};

export default function middleware(request) {
  const url = new URL(request.url);
  
  // Header ini adalah cara paling akurat untuk membaca negara di Vercel
  const country = request.headers.get('x-vercel-ip-country') || 'US';

  // Jika terdeteksi Indonesia (ID)
  if (country === 'ID') {
    url.pathname = '/id';
  } else {
    // Selain itu (Luar Negeri)
    url.pathname = '/en';
  }

  // Gunakan redirect 307 (Temporary Redirect)
  return Response.redirect(url, 307);
}
