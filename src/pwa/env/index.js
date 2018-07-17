/* eslint-disable import/prefer-default-export */
import fastdom from 'fastdom';
import fdPromised from 'fastdom/extensions/fastdom-promised';

const fastdomPromised = fastdom.extend(fdPromised);
const delay = time => new Promise(resolve => setTimeout(resolve, time));

export { fastdomPromised, delay };
