/* eslint-disable react/prop-types */
import Image from '../../../components/Image';
import Link from '../../../../pwa/components/Link';
import processor from '../image';

const imageWithId = {
  type: 'element',
  component: 'img',
  props: {
    src: 'media/image.jpg',
    srcset: 'media/image.jpg',
    alt: 'image 1',
    'data-attachment-id': '23',
  },
};

const imageWithoutSrc = {
  type: 'element',
  component: 'img',
  props: {
    alt: 'image 1',
  },
};

const imageWithoutId = {
  type: 'element',
  component: 'img',
  props: {
    src: '/media/image.jpg',
    srcSet: '/media/image.jpg',
    alt: 'image 1',
  },
};

const imageWithDataSrc = {
  type: 'element',
  component: 'img',
  props: {
    src:
      'https://frontity.com/wp-content/plugins/media-ace/includes/lazy-load/images/blank.png',
    'data-src': 'https://frontity.com/wp-content/uploads/2018/10/image.jpg',
    'data-srcset':
      'https://frontity.com/wp-content/uploads/2018/10/image.jpg 800w, https://frontity.com/wp-content/uploads/2018/10/image-300x225.jpg 300w, https://frontity.com/wp-content/uploads/2018/10/image-768x576.jpg 768w, https://frontity.com/wp-content/uploads/2018/10/image-192x144.jpg 192w, https://frontity.com/wp-content/uploads/2018/10/image-384x288.jpg 384w, https://frontity.com/wp-content/uploads/2018/10/image-90x68.jpg 90w, https://frontity.com/wp-content/uploads/2018/10/image-180x135.jpg 180w, https://frontity.com/wp-content/uploads/2018/10/image-561x421.jpg 561w, https://frontity.com/wp-content/uploads/2018/10/image-364x273.jpg 364w, https://frontity.com/wp-content/uploads/2018/10/image-758x569.jpg 758w, https://frontity.com/wp-content/uploads/2018/10/image-608x456.jpg 608w, https://frontity.com/wp-content/uploads/2018/10/image-64x48.jpg 64w, https://frontity.com/wp-content/uploads/2018/10/image-128x96.jpg 128w',
    'data-sizes': '(max-width: 800px) 100vw, 800px',
  },
};

const imageWithDataSrcAndNoHostname = {
  type: 'element',
  component: 'img',
  props: {
    src: '/wp-content/plugins/media-ace/includes/lazy-load/images/blank.png',
    'data-src': '/wp-content/uploads/2018/10/image.jpg',
    'data-srcset':
      '/wp-content/uploads/2018/10/image.jpg 800w, /wp-content/uploads/2018/10/image-300x225.jpg 300w',
  },
};

const imageWithDataOriginal = {
  type: 'element',
  component: 'img',
  props: {
    alt: 'image 1',
    'data-original': '/media/image.jpg',
  },
};

const noImage = {
  type: 'element',
  component: 'div',
  props: { className: 'whatever' },
};

const item = {
  type: 'post',
  id: 60,
  entity: {
    media: {
      featured: {
        id: 23,
      },
      content: [23, 24, 25],
    },
  },
};

const stores = {
  settings: {
    generalSite: {
      url: 'https://test.frontity.io',
    },
  },
};

const payload = { stores, item };

describe('Theme › Processors › image', () => {
  test('does not pass test with invalid elements', () => {
    expect(processor.test(noImage)).toBeFalsy();
  });
  test('processes images that returns src=null and srcSet=null', () => {
    const element = processor.process(imageWithoutSrc, payload);
    expect(element.component).toBe(Image);
    expect(element.props.src).toBeNull();
    expect(element.props.srcSet).toBeNull();
  });
  test('passes test with valid elements', () => {
    expect(processor.test(imageWithId)).toBeTruthy();
    expect(processor.test(imageWithoutId)).toBeTruthy();
    expect(processor.test(imageWithDataOriginal)).toBeTruthy();
  });
  test('processes images with data-attachment-id', () => {
    const element = processor.process(imageWithId, payload);
    expect(element.component).toBe(Link);
    expect(element.children[0].children[0].component).toBe(Image);
    expect(element).toMatchSnapshot();
  });
  test('processes images without data-attachment-id', () => {
    const element = processor.process(imageWithoutId, payload);
    expect(element.component).toBe(Image);
    expect(element).toMatchSnapshot();
  });
  test('processes images with data-original', () => {
    const element = processor.process(imageWithDataOriginal, payload);
    expect(element.component).toBe(Image);
    expect(element).toMatchSnapshot();
  });
  test('process images with data-src', () => {
    const element = processor.process(imageWithDataSrc, payload);
    expect(element.component).toBe(Image);
    expect(element.props.src).toBe(
      'https://frontity.com/wp-content/uploads/2018/10/image.jpg',
    );
    expect(element.props.srcSet).toBe(
      'https://frontity.com/wp-content/uploads/2018/10/image.jpg 800w, https://frontity.com/wp-content/uploads/2018/10/image-300x225.jpg 300w, https://frontity.com/wp-content/uploads/2018/10/image-768x576.jpg 768w, https://frontity.com/wp-content/uploads/2018/10/image-192x144.jpg 192w, https://frontity.com/wp-content/uploads/2018/10/image-384x288.jpg 384w, https://frontity.com/wp-content/uploads/2018/10/image-90x68.jpg 90w, https://frontity.com/wp-content/uploads/2018/10/image-180x135.jpg 180w, https://frontity.com/wp-content/uploads/2018/10/image-561x421.jpg 561w, https://frontity.com/wp-content/uploads/2018/10/image-364x273.jpg 364w, https://frontity.com/wp-content/uploads/2018/10/image-758x569.jpg 758w, https://frontity.com/wp-content/uploads/2018/10/image-608x456.jpg 608w, https://frontity.com/wp-content/uploads/2018/10/image-64x48.jpg 64w, https://frontity.com/wp-content/uploads/2018/10/image-128x96.jpg 128w',
    );
    expect(element.props['data-src']).toBeUndefined();
    expect(element.props['data-srcset']).toBeUndefined();
    expect(element).toMatchSnapshot();
  });
  test('process images with data-src and without hostname', () => {
    const element = processor.process(imageWithDataSrcAndNoHostname, payload);
    expect(element.component).toBe(Image);
    expect(element.props.src).toBe(
      'https://test.frontity.io/wp-content/uploads/2018/10/image.jpg',
    );
    expect(element.props.srcSet).toBe(
      'https://test.frontity.io/wp-content/uploads/2018/10/image.jpg 800w, https://test.frontity.io/wp-content/uploads/2018/10/image-300x225.jpg 300w',
    );
    expect(element.props['data-src']).toBeUndefined();
    expect(element.props['data-srcset']).toBeUndefined();
    expect(element).toMatchSnapshot();
  });
});
