export const config = {
  // Skrip ini hanya akan berjalan saat user membuka halaman utama (/)
  matcher: '/',
};

export default function middleware(request) {
  const url = new URL(request.url);
  
  // Deteksi negara dari fitur bawaan Vercel (geo)
  // Jika tidak terdeteksi, kita anggap US (Luar Negeri)
  const country = request.geo?.country || 'US';

  // Logika pengalihan (Redirect)
  if (country === 'ID') {
    // Arahkan ke folder /id jika dari Indonesia
    url.pathname = '/id';
  } else {
    // Arahkan ke folder /en jika dari luar negeri
    url.pathname = '/en';
  }

  // Lakukan pengalihan (Redirect 307 - Temporary)
  return Response.redirect(url);
}
