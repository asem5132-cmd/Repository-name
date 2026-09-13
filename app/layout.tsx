import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { isLang } from '@/content/translations';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL('https://mohammed-amin-design.shrfaldynmhmd355.chatgpt.site'),title:'Mohammed Amin — Graphic Designer',description:'Brand identity, advertising, social media and print design by Mohammed Amin.',icons:{icon:[{url:'/favicon.png',type:'image/png'},{url:'/favicon.ico'}],apple:'/favicon.png'}};
export default async function RootLayout({children}:{children:React.ReactNode}){
 const value=(await headers()).get('x-site-locale')||'en';const lang=isLang(value)?value:'en';
 return <html lang={lang} dir={lang==='ar'?'rtl':'ltr'}><body>{children}</body></html>;
}
