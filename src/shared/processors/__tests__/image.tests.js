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
    src: 'media/image.jpg',
    srcset: 'media/image.jpg',
    alt: 'image 1',
  },
};

const noImage = {
  type: 'element',
  component: 'div',
  props: { className: 'whatever' },
};

const media = {
  link: 'image.jpg',
  featured: {
    id: 23,
  },
  original: {
    width: 300,
    height: 250,
  },
};

const stores = {
  connection: {
    entity: () => media,
  },
};

const payload = {
  stores,
  item: {
    entity: { media },
  },
};

describe('H2R › Image processor', () => {
  test('does not pass test with invalid elements', () => {
    expect(processor.test(noImage)).toBeFalsy();
  });
  test('passes test with valid elements', () => {
    expect(processor.test(imageWithId)).toBeTruthy();
    expect(processor.test(imageWithoutId)).toBeTruthy();
  });
  test('process images with data-attachment-id', () => {
    const element = processor.process(imageWithId, payload);
    expect(element.component).toBe(Link);
    expect(element.children[0].children[0].component).toBe(Image);
    expect(element).toMatchSnapshot();
  });
  test('process images without data-attachment-id', () => {
    const element = processor.process(imageWithoutId, payload);
    expect(element.component).toBe(Image);
    expect(element).toMatchSnapshot();
  });
});
