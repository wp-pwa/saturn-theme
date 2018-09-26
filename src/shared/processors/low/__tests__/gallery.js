/* eslint-disable react/prop-types */
import Gallery from '../../../components/Gallery';
import processor from '../gallery';

const gallery = {
  type: 'element',
  component: 'div',
  props: { id: 'gallery-0' },
  children: [
    {
      type: 'element',
      component: 'div',
      props: { class: 'column' },
      children: [
        {
          type: 'element',
          component: 'img',
          props: {
            alt: 'alt',
            sizes: 'sizes',
            src: 'src',
            srcSet: 'srcSet',
            'data-attachment-id': 23,
          },
        },
      ],
    },
    {
      type: 'element',
      component: 'div',
      props: { class: 'column' },
      children: [
        {
          type: 'element',
          component: 'img',
          props: {
            alt: 'alt',
            sizes: 'sizes',
            src: 'src',
            srcSet: 'srcSet',
            'data-attachment-id': 24,
          },
        },
      ],
    },
  ],
};

const noGallery = {
  type: 'element',
  component: 'p',
  props: { id: 'no-gallery' },
  children: [
    {
      type: 'text',
      content: 'Lorem ipsum dolor sit amet',
    },
  ],
};

describe('H2R › Audio processor', () => {
  test('does not pass test with invalid elements', () => {
    expect(processor.test(noGallery)).toBeFalsy();
  });
  test('passes test with valid elements', () => {
    expect(processor.test(gallery)).toBeTruthy();
  });
  test('process valid elements', () => {
    const element = processor.process(gallery);
    expect(element.component).toBe(Gallery);
    expect(element).toMatchSnapshot();
  });
});
