import type {Lang} from './translations';
export const routeFor=(lang:Lang,page='')=>`/${lang}${page?'/'+page:''}`;
