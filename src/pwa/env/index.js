/* eslint-disable import/prefer-default-export */
import fastdom from 'fastdom';
import fdPromised from 'fastdom/extensions/fastdom-promised';

const fastdomPromised = fastdom.extend(fdPromised);

export { fastdomPromised };
