import type {MetadataRoute} from 'next';
import {projects} from '@/content/projects';
import {languages} from '@/content/translations';
const origin='https://mohammed-amin-design.shrfaldynmhmd355.chatgpt.site';
export default function sitemap():MetadataRoute.Sitemap{return languages.flatMap(l=>['','work','about','services','experience','contact',...projects.map(p=>`work/${p.slug}`)].map(p=>({url:`${origin}/${l}${p?'/'+p:''}`,alternates:{languages:Object.fromEntries(languages.map(l2=>[l2,`${origin}/${l2}${p?'/'+p:''}`]))}})));}
