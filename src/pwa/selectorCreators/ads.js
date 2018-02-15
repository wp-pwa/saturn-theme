import * as selectors from '../selectors';

export const getOptions = type => state => {
  const adsConfig = selectors.ads.getConfig(state);

  if (!adsConfig || !adsConfig.options) return null;

  const optionsList = adsConfig.options;

  if (typeof type === 'undefined')
    return optionsList.find(options => options.type === 'default').options;

  const typeOptions = optionsList.find(options => {
    if (options.type === type) return true;
    if (typeof options.type === 'object' && options.type.includes(type)) return true;

    return false;
  });

  return typeOptions && typeOptions.options
    ? typeOptions.options
    : optionsList.find(options => options.type === 'default').options;
};

export const getFormats = type => state => {
  const adsConfig = selectors.ads.getConfig(state);

  if (!adsConfig || !adsConfig.formats) return null;

  const formatsList = adsConfig.formats;

  if (typeof type === 'undefined')
    return formatsList.find(formats => formats.type === 'default').formats;

  const typeFormats = formatsList.find(formats => {
    if (formats.type === type) return true;
    if (typeof formats.type === 'object' && formats.type.includes(type)) return true;

    return false;
  });

  return typeFormats && typeFormats.formats
    ? typeFormats.formats
    : formatsList.find(formats => formats.type === 'default').formats;
};
