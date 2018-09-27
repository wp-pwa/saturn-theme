/* eslint-disable react/prop-types */
import Image from '../../components/Image';
import Link from '../../../pwa/components/Link';
import processor from '../low/image';

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

const imageWithoutId = {
  type: 'element',
  component: 'img',
  props: {
    src: '/media/image.jpg',
    srcSet: '/media/image.jpg',
    alt: 'image 1',
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
});
