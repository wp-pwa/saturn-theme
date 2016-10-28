import pkg from '../dashboard/src';
import { packageDownloaded } from 'worona-deps';

packageDownloaded(pkg);

console.log('bundle loaded!');
