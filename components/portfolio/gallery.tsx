'use client';
import {useState,useEffect} from 'react';
import {ArrowLeft,ArrowRight,X,Maximize2} from 'lucide-react';
import {Dialog,DialogContent,DialogTitle,DialogDescription,DialogClose} from '@/components/ui/dialog';
import {ArtworkImage} from './artwork';
import {copy,type Lang} from '@/content/translations';
import type {Artwork} from '@/content/projects';
export function Gallery({items,lang,name,theme}:{items:Artwork[];lang:Lang;name:string;theme:string}){
 const [index,setIndex]=useState<number|null>(null),t=copy[lang];
 const step=(d:number)=>setIndex(i=>i===null?null:(i+d+items.length)%items.length);
 useEffect(()=>{if(index===null)return;const fn=(e:KeyboardEvent)=>{if(e.key==='ArrowRight'){e.preventDefault();step(lang==='ar'?-1:1);}if(e.key==='ArrowLeft'){e.preventDefault();step(lang==='ar'?1:-1);}};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn);},[index,lang,items.length]);
 return <><div className={`project-gallery gallery-${theme}`}>{items.map((item,i)=><figure key={item.asset}><button className='gallery-button' onClick={()=>setIndex(i)} aria-label={`${t.enlarge}: ${item.caption[lang]}`}><ArtworkImage asset={item.asset} alt={item.caption[lang]}/><span className='enlarge-icon'><Maximize2 size={20}/></span></button><figcaption><span>{String(i+1).padStart(2,'0')}</span>{item.caption[lang]}</figcaption></figure>)}</div><Dialog open={index!==null} onOpenChange={v=>{if(!v)setIndex(null);}}><DialogContent className='artwork-dialog' showCloseButton={false} dir={lang==='ar'?'rtl':'ltr'}><div className='lightbox-heading'><DialogTitle>{name}</DialogTitle><DialogClose asChild><button className='icon-button' aria-label={t.close}><X/></button></DialogClose></div>{index!==null&&<><ArtworkImage asset={items[index].asset} alt={items[index].caption[lang]} className='lightbox-image' priority/><div className='lightbox-bottom'><DialogDescription>{items[index].caption[lang]}</DialogDescription><span className='image-counter'>{index+1} {t.imageOf} {items.length}</span>{items.length>1&&<div className='lightbox-controls'><button className='icon-button' aria-label={t.previousImage} onClick={()=>step(-1)}><ArrowLeft className='flow-arrow'/></button><button className='icon-button' aria-label={t.nextImage} onClick={()=>step(1)}><ArrowRight className='flow-arrow'/></button></div>}</div></>}</DialogContent></Dialog></>;
}
