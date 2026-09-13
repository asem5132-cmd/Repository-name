import {headers} from 'next/headers';
import {isLang} from '@/content/translations';
import {Header,Footer} from '@/components/portfolio/chrome';
import {NotFoundPage} from '@/components/portfolio/pages';
export default async function NotFound(){const v=(await headers()).get('x-site-locale')||'en';const lang=isLang(v)?v:'en';return <><Header lang={lang}/><main id='main' tabIndex={-1}><NotFoundPage lang={lang}/></main><Footer lang={lang} compact/></>;}
