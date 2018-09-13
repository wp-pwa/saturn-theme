import React from 'react';
import WPAppbox from '../components/WPAppbox';

export default {
  test: ({ tagName, attributes }) =>
    tagName === 'div' &&
    attributes &&
    attributes.className &&
    attributes.className.split(' ').includes('wpappbox'),
  process: element => {
    try {
      const children = element.children.filter(
        child =>
          child.type === 'Element' &&
          !child.attributes.className.includes('qrcode'),
      );
      const detailsElement = children
        .find(child =>
          child.attributes.className.split(' ').includes('appdetails'),
        )
        .children.filter(child => child.type === 'Element');
      const titleElement = detailsElement.find(item =>
        item.attributes.className.split(' ').includes('apptitle'),
      );
      const developerElement = detailsElement.find(item =>
        item.attributes.className.split(' ').includes('developer'),
      );

      const title = titleElement.children[0].children[0].content;
      const link = titleElement.children[0].attributes.href;
      const developer = developerElement.children[1].children[0].content;
      const developerLink = developerElement.children[1].attributes.href;
      const price = detailsElement.find(item =>
        item.attributes.className.split(' ').includes('price'),
      ).children[0].children[0].content;
      const image = children
        .find(child =>
          child.attributes.className.split(' ').includes('appicon'),
        )
        .children.filter(child => child.type === 'Element')[0].children[0]
        .attributes.src;

      return (
        <WPAppbox
          title={title}
          link={link}
          developer={developer}
          developerLink={developerLink}
          price={price}
          image={image}
        />
      );
    } catch (e) {
      return <WPAppbox error />;
    }
  },
};
