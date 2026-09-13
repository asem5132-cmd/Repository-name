import {notFound} from 'next/navigation';
import {PreviewHarness} from './preview-harness';
export default function QA(){if(process.env.NODE_ENV!=='development')notFound();return <PreviewHarness/>;}
