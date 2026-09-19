import { cookies } from 'next/headers'; // นำเข้า cookies
import { getRequestConfig } from 'next-intl/server';
 
export default getRequestConfig(async () => {
  // อ่านค่าคุกกี้ที่ชื่อ NEXT_LOCALE
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en'; 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
