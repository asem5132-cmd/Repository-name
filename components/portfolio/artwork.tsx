import manifest from '@/content/asset-manifest.json';
export function ArtworkImage({asset,alt,className='',priority=false}:{asset:string;alt:string;className?:string;priority?:boolean}){
 const m=manifest[asset as keyof typeof manifest];
 return <img className={className} src={`/assets/${asset}.webp`} srcSet={m.width>720?`/assets/${asset}-sm.webp 720w, /assets/${asset}.webp ${m.width}w`:undefined} sizes='(max-width: 650px) 92vw, (max-width: 1100px) 85vw, 70vw' width={m.width} height={m.height} alt={alt} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} decoding='async'/>;
}
