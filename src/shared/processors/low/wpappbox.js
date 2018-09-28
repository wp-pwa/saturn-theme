import React from 'react';
import WPAppbox from '../../components/WPAppbox';

export default {
  test: ({ component, props }) =>
    component === 'div' &&
    props &&
    props.className &&
    props.className.split(' ').includes('wpappbox'),
  process: element => {
    let component;
    try {
      const children = element.children.filter(
        child =>
          child.type === 'element' && !child.props.className.includes('qrcode'),
      );
      const detailsElement = children
        .find(child => child.props.className.split(' ').includes('appdetails'))
        .children.filter(child => child.type === 'element');
      const titleElement = detailsElement.find(item =>
        item.props.className.split(' ').includes('apptitle'),
      );
      const developerElement = detailsElement.find(item =>
        item.props.className.split(' ').includes('developer'),
      );

      const title = titleElement.children[0].children[0].content;
      const link = titleElement.children[0].props.href;
      const developer = developerElement.children[1].children[0].content;
      const developerLink = developerElement.children[1].props.href;
      const price = detailsElement.find(item =>
        item.props.className.split(' ').includes('price'),
      ).children[0].children[0].content;
      const image = children
        .find(child => child.props.className.split(' ').includes('appicon'))
        .children.filter(child => child.type === 'element')[0].children[0].props
        .src;

      component = () => (
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
      component = () => <WPAppbox error />;
    }
    return { component, props: {}, children: null };
  },
};
