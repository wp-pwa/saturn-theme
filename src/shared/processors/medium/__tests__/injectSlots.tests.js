import React from 'react';
import renderer from 'react-test-renderer';
import H2R from '@frontity/h2r/components';
import { Provider as MobxProvider } from 'mobx-react';
import { Provider as SlotFillProvider, Fill } from 'react-slot-fill';
import { textCounter, restartCounter, injectSlot } from '../injectSlots';

const stores = {
  theme: {
    h2r: {
      processorsByPriority: [restartCounter, injectSlot, textCounter],
    },
  },
  settings: {
    theme: {
      slots: [
        {
          names: ['injected'],
          position: 'after 300 characters in content',
          rules: {
            item: [{}],
          },
        },
        {
          names: ['injected'],
          position: 'after 600 characters in content',
          rules: {
            item: [{}],
          },
        },
      ],
    },
  },
};

const Injected = () => <p>Injected!</p>;

const renderContent = html =>
  renderer
    .create(
      <MobxProvider stores={stores}>
        <SlotFillProvider>
          <Fill name="injected">
            <Injected />
          </Fill>
          <H2R html={html} />
        </SlotFillProvider>
      </MobxProvider>,
    )
    .toJSON();

describe('Theme › processors › injectSlots', () => {
  test('does not inject anything if sum is below CHARACTERS_LIMIT', () => {
    const html = `
<p>A small paragraph</p>
<p>A small paragraph too</p>`;
    expect(renderContent(html)).toMatchSnapshot();
  });

  test('injects a slot after paragraph', () => {
    const html = `
<p>
  Very long paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing
  elit. Fusce hendrerit hendrerit erat, at ornare ex lacinia ut. Cras semper
  est sit amet erat viverra porttitor. In a sapien erat. Sed consequat,
  justo non lobortis fringilla, arcu elit semper nulla, id mattis elit lorem
  quis nibh. Class aptent taciti sociosqu ad litora torquent per conubia
  nostra, per inceptos himenaeos. Cras nec viverra tortor. Duis dignissim
  diam eu mi commodo mollis non at felis. Quisque ut odio ac tortor
  tincidunt ornare vulputate eget sapien. Aenean eget erat in nisi fermentum
  lobortis vitae sed orci. Integer a eros vitae nisl volutpat tincidunt nec
  eget ligula. Nulla ultricies dapibus ante, lacinia gravida odio cursus eu.
  Maecenas rhoncus, sapien sit amet malesuada molestie, quam ipsum faucibus
  ante, viverra feugiat mauris nisi quis urna. Etiam at risus sed metus
  tempor ornare.
</p>
<p>A small paragraph</p>`;
    expect(renderContent(html)).toMatchSnapshot();
  });

  test('injects a slot after three images', () => {
    const html = `
<img src="/media/image-1.jpg">
<img src="/media/image-2.jpg">
<img src="/media/image-3.jpg">
<div>End of content</div>`;
    expect(renderContent(html)).toMatchSnapshot();
  });

  test('injects a slot after two images and an iframe', () => {
    const html = `
<img src="/media/image-1.jpg">
<img src="/media/image-2.jpg">
<iframe src="/iframe.html">
<div>End of content</div>`;
    expect(renderContent(html)).toMatchSnapshot();
  });

  test('injects two slots after long paragraphs', () => {
    const html = `
<p>
  Very long paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing
  elit. Fusce hendrerit hendrerit erat, at ornare ex lacinia ut. Cras semper
  est sit amet erat viverra porttitor. In a sapien erat. Sed consequat,
  justo non lobortis fringilla, arcu elit semper nulla, id mattis elit lorem
  quis nibh. Class aptent taciti sociosqu ad litora torquent per conubia
  nostra, per inceptos himenaeos.
</p>
<p>
  Cras nec viverra tortor. Duis dignissim
  diam eu mi commodo mollis non at felis. Quisque ut odio ac tortor
  tincidunt ornare vulputate eget sapien. Aenean eget erat in nisi fermentum
  lobortis vitae sed orci. Integer a eros vitae nisl volutpat tincidunt nec
  eget ligula. Nulla ultricies dapibus ante, lacinia gravida odio cursus eu.
  Maecenas rhoncus, sapien sit amet malesuada molestie, quam ipsum faucibus
  ante, viverra feugiat mauris nisi quis urna. Etiam at risus sed metus
  tempor ornare.u
</p>
<p>A small paragraph</p>`;
    expect(renderContent(html)).toMatchSnapshot();
  });

  test('restarts count and does not inject anything', () => {
    const html1 = `
<p>
  Very long paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing
  elit. Fusce hendrerit hendrerit erat, at ornare ex lacinia ut. Cras semper
  est sit amet erat viverra porttitor. In a sapien erat. Sed consequat,
  justo non lobortis fringilla, arcu elit semper nulla, id mattis elit lorem.
</p>`;

    const html2 = `
<p>A small paragraph</p>`;

    expect(renderContent(html1)).toMatchSnapshot();
    expect(renderContent(html2)).toMatchSnapshot();
  });
});
