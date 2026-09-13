import {Miniflare} from 'miniflare';
import {readFile,writeFile,mkdir,readdir} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=process.cwd();
const files=await readdir(path.join(root,'dist/server'),{recursive:true});
const modules=['index.js',...files.filter(f=>f.endsWith('.js')&&f!=='index.js')].map(f=>({type:'ESModule',path:path.join(root,'dist/server',f)}));
const worker=new Miniflare({name:'portfolio-production-check',modules,modulesRoot:path.join(root,'dist/server'),compatibilityDate:'2026-05-15',compatibilityFlags:['nodejs_compat'],assets:{directory:path.join(root,'dist/client'),binding:'ASSETS',routerConfig:{has_user_worker:true,invoke_user_worker_ahead_of_assets:true}},cf:false});
const results=[];
const origin='https://mohammed-amin-design.shrfaldynmhmd355.chatgpt.site';
const pages=['','work','about','services','experience','contact','work/athar-perfumes','work/troy-41','work/prime-haven','work/advertising-social','work/print-outdoor','work/brand-print'];
try{
 for(const lang of ['en','tr','ar']){
  for(const page of pages){
   const route=`/${lang}${page?'/'+page:''}`,response=await worker.dispatchFetch(origin+route),html=await response.text();
   if(response.status!==200)console.log('Failed response',route,html.slice(0,450));assert.equal(response.status,200,route);assert.match(html,new RegExp(`<html[^>]*lang="${lang}"`),route+' lang');assert.match(html,new RegExp(`<html[^>]*dir="${lang==='ar'?'rtl':'ltr'}"`),route+' dir');
   assert.equal((html.match(/<h1[ >]/g)||[]).length,1,route+' heading');assert.match(html,/rel="canonical"/,route+' canonical');assert(html.includes('href="'+origin+route+'"'),route+' canonical URL');assert.match(html,/property="og:title"/,route+' OG');assert.match(html,/hreflang="ar"/i,route+' alternates');
   assert(!html.includes('Starter Project'));results.push({route,status:response.status,title:html.match(/<title>(.*?)<\/title>/)?.[1]});
  }
  for(const p of ['missing-page','work/missing-project']){const route=`/${lang}/${p}`,res=await worker.dispatchFetch(origin+route),html=await res.text();assert.equal(res.status,404,route);assert.match(html,new RegExp(`<html[^>]*lang="${lang}"`),route+' lang');results.push({route,status:res.status});}
 }
 for(const route of ['/qa','/fr','/fr/work']){const res=await worker.dispatchFetch(origin+route);assert.equal(res.status,404,route);results.push({route,status:res.status});await res.text();}
 for(const [cookie,expected] of [['','/en'],['ma-language=ar','/ar'],['ma-language=tr','/tr'],['ma-language=invalid','/en']]){const res=await worker.dispatchFetch(origin+'/',{redirect:'manual',headers:{cookie}});assert([307,308,302].includes(res.status),'root redirect');assert.equal(new URL(res.headers.get('location'),origin).pathname,expected);results.push({route:'/',cookie,redirect:expected});await res.text();}
 const cv=await worker.dispatchFetch(origin+'/Mohammed-Amin-CV.pdf');assert.equal(cv.status,200);const cvBytes=Buffer.from(await cv.arrayBuffer());assert.equal(cvBytes.subarray(0,5).toString(),'%PDF-');assert.equal(cvBytes.compare(await readFile('dist/client/Mohammed-Amin-CV.pdf')),0);results.push({route:'/Mohammed-Amin-CV.pdf',status:cv.status,bytes:cvBytes.length});
 for(const route of ['/favicon.png','/favicon.ico','/robots.txt','/sitemap.xml','/fonts/noto-sans-regular.woff','/fonts/noto-arabic-regular.woff']){const res=await worker.dispatchFetch(origin+route);assert.equal(res.status,200,route);await res.arrayBuffer();results.push({route,status:res.status});}
 const manifest=JSON.parse(await readFile('content/asset-manifest.json','utf8'));
 for(const name of Object.keys(manifest)){for(const suffix of ['', '-sm']){const route=`/assets/${name}${suffix}.webp`,res=await worker.dispatchFetch(origin+route);assert.equal(res.status,200,route);assert((await res.arrayBuffer()).byteLength>100,route);}}
 await mkdir('test-results',{recursive:true});await writeFile('test-results/production.json',JSON.stringify({status:'passed',checks:results.length+Object.keys(manifest).length*2,results},null,2));console.log(`Production checks passed: ${results.length+Object.keys(manifest).length*2}. All localized routes, 404s, redirects, metadata, downloads, fonts and images verified.`);
}finally{await worker.dispose();}
