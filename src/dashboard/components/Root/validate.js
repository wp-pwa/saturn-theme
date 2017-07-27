import urlValidator from 'url-regexp';

export const messages = {
  required: 'Required',
  invalidUrl: 'Invalid url. It should be something like: http://www.mydomain.com/some-page',
};

export default values => {
  const errors = { menu: [] };
  if (values && values.menu) {
    values.menu.forEach((member, index) => {
      const memberErrors = {};
      if (!member.label) {
        memberErrors.label = messages.required;
      }
      if (member.type === 'link' && !member.url) {
        memberErrors.url = messages.required;
      } else if (member.type === 'link' && !urlValidator.validate(member.url)) {
        memberErrors.url = messages.invalidUrl;
      }
      errors.menu[index] = memberErrors;
    });
  }
  return errors;
};
