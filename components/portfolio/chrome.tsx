'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useState} from 'react';
import {ArrowUpRight,Download,Menu,X} from 'lucide-react';
import {Sheet,SheetTrigger,SheetContent,SheetTitle,SheetDescription,SheetClose} from '@/components/ui/sheet';
import {copy,contact,languages,type Lang} from '@/content/translations';
import {routeFor} from '@/content/routes';
export function Logo({lang,large=false}:{lang:Lang;large?:boolean}){
 return <Link href={routeFor(lang)} className={`identity ${large?'large':''}`} aria-label={`${copy[lang].name} — ${copy[lang].nav.home}`}><img src='/assets/ma-logo.webp' width='1392' height='860' alt='MA' className='identity-logo'/><span><strong>{copy[lang].name}</strong><small>{copy[lang].title}</small></span></Link>;
}
export function LanguageSelector({lang}:{lang:Lang}){
 const pathname=usePathname();
 const tail=(pathname||'/en').split('/').slice(2).join('/');
 return <div className='language-selector' role='group' aria-label={copy[lang].language} dir='ltr'>{languages.map(l=><Link key={l} href={routeFor(l,tail)} lang={l} hrefLang={l} aria-current={l===lang?'true':undefined} title={{en:'English',tr:'Türkçe',ar:'العربية'}[l]} onClick={()=>{document.cookie=`ma-language=${l};path=/;max-age=31536000;SameSite=Lax`;}}>{l.toUpperCase()}</Link>)}</div>;
}
export function Header({lang}:{lang:Lang}){
 const t=copy[lang],pathname=usePathname();const [open,setOpen]=useState(false);
 useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';setOpen(false);},[lang,pathname]);
 const links=Object.entries(t.nav).filter(([k])=>k!=='home');
 return <><a className='skip-link' href='#main'>{t.skip}</a><header className='site-header'><div className='header-inner'><Logo lang={lang}/><nav className='desktop-nav' aria-label={t.navigation}>{links.map(([key,label])=><Link key={key} href={routeFor(lang,key)} aria-current={pathname?.startsWith(routeFor(lang,key))?'page':undefined}>{label}</Link>)}</nav><div className='header-actions'><LanguageSelector lang={lang}/><a className='cv-link' href='/Mohammed-Amin-CV.pdf' download><Download size={16}/><span>{t.download}</span></a><Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><button className='icon-button menu-button' aria-label={t.menu}><Menu size={25}/></button></SheetTrigger><SheetContent side={lang==='ar'?'left':'right'} showCloseButton={false} className='mobile-sheet' dir={lang==='ar'?'rtl':'ltr'}><div className='mobile-top'><SheetTitle>{t.navigation}</SheetTitle><SheetClose asChild><button className='icon-button' aria-label={t.close}><X/></button></SheetClose></div><SheetDescription className='sr-only'>{t.name} — {t.title}</SheetDescription><Logo lang={lang}/><nav aria-label={t.navigation}>{Object.entries(t.nav).map(([key,label],i)=><Link key={key} onClick={()=>setOpen(false)} href={routeFor(lang,key==='home'?'':key)}><span className='mobile-index'>0{i+1}</span>{label}</Link>)}</nav><div className='mobile-bottom'><LanguageSelector lang={lang}/><a className='button' href='/Mohammed-Amin-CV.pdf' download>{t.download}<Download size={18}/></a></div></SheetContent></Sheet></div></div></header></>;
}
export function Footer({lang,compact=false}:{lang:Lang;compact?:boolean}){
 const t=copy[lang];
 return <footer className='site-footer'>{!compact&&<div className='footer-invite shell'><p className='eyebrow'>{t.contactMe}</p><Link href={routeFor(lang,'contact')} className='footer-headline'>{t.footerHeadline}<ArrowUpRight className='flow-arrow' strokeWidth={1}/></Link></div>}<div className='footer-content shell'><Logo lang={lang}/><div className='footer-contact'><a href={`mailto:${contact.email}`} dir='ltr'>{contact.email}</a><a href={contact.linkedin} target='_blank' rel='noreferrer noopener'>LinkedIn <ArrowUpRight size={16}/></a></div><nav aria-label={t.navigation}>{['work','about','contact'].map(key=><Link href={routeFor(lang,key)} key={key}>{t.nav[key as keyof typeof t.nav]}</Link>)}</nav></div><div className='footer-bottom shell'><span>{t.copyright}</span><span>{t.based}</span><LanguageSelector lang={lang}/></div></footer>;
}
