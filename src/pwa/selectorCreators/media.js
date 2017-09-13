import { dep } from 'worona-deps';
import he from 'he';

export const getAlt = id => state =>
  dep('connection', 'selectorCreators', 'getMediaById')(id)(state).alt_text || '';

export const getSrc = id => state =>
  he.decode(dep('connection', 'selectorCreators', 'getMediaById')(id)(state).source_url) || '';

export const getSrcSet = id => state => {
  const media = dep('connection', 'selectorCreators', 'getMediaById')(id)(state);
  const sizes = media && media.media_details ? media.media_details.sizes : '';

  return he.decode(
    Object.keys(sizes)
      .reduce((a, b) => {
        if (a.every(item => sizes[item].width !== sizes[b].width)) a.push(b);
        return a;
      }, [])
      .map(key => `${sizes[key].source_url} ${sizes[key].width}`)
      .reduce((total, current) => `${total}${current}w, `, '')
  );
};
