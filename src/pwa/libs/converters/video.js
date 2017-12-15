import LazyVideo from "../../elements/LazyVideo";
import { filter } from "../../elements/HtmlToReactConverter/filter";

export default {
  test: ({ tagName, attributes }) => {
    /* Cases tested:
      1:
        <video />
      2:
        <div class='wp-video' />
    */

    // Returns false if it's already a lazy component.
    if (attributes && attributes["data-lazy"]) return false;

    // Returns true if it's a <video>.
    if (tagName === "video") return true;

    // Returns true if it's a <div> with class 'wp-video'.
    if (tagName === "div" && attributes && attributes.className === "wp-video") return true;

    return false;
  },
  converter: element => {
    const { tagName, ...rest } = element;

    let height;
    let width;
    let attributes;

    if (tagName === "video") {
      ({ attributes } = element);
    } else if (tagName === "div") {
      [{ attributes }] = element.children;
      console.log(attributes);
    }

    if (attributes.height && attributes.width) {
      width = "100vw";
      height = `${(attributes.height * 100) / attributes.width}vw`; // prettier-ignore
    } else {
      height = "120px";
      width = "120px";
    }

    return {
      type: "Element",
      tagName: LazyVideo,
      attributes: {
        width,
        height,
        offset: 400,
        throttle: 50,
        imgProps: filter(attributes),
      },
      children: [{ ...rest, attributes: { ...attributes, "data-lazy": true } }],
    };
  },
};
