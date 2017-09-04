import { dep } from 'worona-deps';
import he from 'he';

export const getAlt = id => state =>
  dep('connection', 'selectorCreators', 'getMediaById')(id)(state).alt_text || '';

export const getSrc = id => state =>
  he.decode(dep('connection', 'selectorCreators', 'getMediaById')(id)(state).source_url) || '';

export const getSrcSet = id => state => {
  const sizes =
    dep('connection', 'selectorCreators', 'getMediaById')(id)(state).media_details.sizes || '';

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
