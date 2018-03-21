/* eslint-disable no-template-curly-in-string */
import * as classes from './classes';

const gaVars = {
  // --- COMMENTS ---
  // openCommentsSelector: '#comments', // not supported yet
  // --- COOKIES ---
  cookiesSelector: `.${classes.cookies}`,
  // --- MENU ---
  openMenuSelector: `.${classes.openMenu}`,
  menuOpenSingleSelector: `.${classes.menuOpenSingle}`,
  menuOpenListSelector: `.${classes.menuOpenList}`,
  // -- NAVBAR ---
  goHomeSelector: `a.${classes.goHome}`,
  navbarOpenSingleSelector: `.${classes.navbarOpenSingle}`,
  navbarOpenListSelector: `.${classes.navbarOpenList}`,
  // --- POST ---
  // postOpenSingleSelector: '.carousel a.single-link', // not supported yet
  postOpenListSelector: `.${classes.navbarOpenList}`,
  // --- SHARE BAR ---
  shareButtonFacebookSelector: `.${classes.shareButtonFacebook}`,
  shareButtonTwitterSelector: "amp-social-share[type='twitter']",
  shareButtonWhatsappSelector: "amp-social-share[type='whatsapp']",
  shareButtonEmailSelector: "amp-social-share[type='email']",
  shareButtonSystemSelector: "amp-social-share[type='system']",
  nextButtonSelector: `.${classes.nextButton}`,
};

const gaTriggers = {
  // --- COMMENTS ---
  openComments: {
    on: 'click',
    selector: '${openCommentsSelector}',
    request: 'event',
    vars: {
      eventCategory: 'AMP - Post',
      eventAction: 'AMP - open comments',
    },
  },

  // --- COOKIES ---
  cookies: {
    on: 'click',
    selector: '${cookiesSelector}',
    request: 'event',
    vars: {
      eventCategory: 'AMP - Cookies modal',
      eventAction: 'AMP - close',
    },
  },

  // --- MENU ---
  openMenu: {
    on: 'click',
    selector: '${openMenuSelector}',
    request: 'event',
    vars: {
      eventCategory: 'AMP - Post bar', // others are: 'Media bar', 'List bar' (not supported yet)
      eventAction: 'AMP - open menu',
    },
  },
  menuOpenSingle: {
    on: 'click',
    selector: '${menuOpenSingleSelector}',
    request: 'event',
    vars: {
      eventCategory: 'AMP - Menu',
      eventAction: 'AMP - open single',
    },
  },
  menuOpenList: {
    on: 'click',
    selector: '${menuOpenListSelector}',
    request: 'event',
    vars: {
      eventCategory: 'AMP - Menu',
      eventAction: 'AMP - open list',
    },
  },

  // --- NAVBAR ---
  goHome: {
    on: 'click',
    selector: '${goHomeSelector}',
    request: 'event',
    vars: {
      eventCategory: 'AMP - List bar',
      eventAction: 'AMP - go home',
    },
  },
  navbarOpenSingle: {
    on: 'click',
    selector: '${navbarOpenSingleSelector}',
    request: 'event',
    vars: {
      eventCategory: 'AMP - Navbar',
      eventAction: 'AMP - open single',
    },
  },
  navbarOpenList: {
    on: 'click',
    selector: '${navbarOpenListSelector}',
    request: 'event',
    vars: {
      eventCategory: 'AMP - Navbar',
      eventAction: 'AMP - open list',
    },
  },

  // --- POST ---
  postOpenList: {
    on: 'click',
    selector: '${postOpenListSelector}',
    request: 'event',
    vars: {
      eventCategory: 'AMP - Post', // <-- tags in Post
      eventAction: 'AMP - open list',
    },
  },
  // // --- not supported yet ---
  // postOpenSingle: {
  //   on: 'click',
  //   selector: '${postOpenSingleSelector}',
  //   request: 'event',
  //   vars: {
  //     eventCategory: 'AMP - Post', // <-- carousel in Post
  //     eventAction: 'AMP - open single',
  //   },
  // },

  // --- SHARE BAR ---
  shareButtonFacebook: {
    on: 'click',
    selector: '${shareButtonFacebookSelector}',
    request: 'event',
    vars: {
      eventCategory: 'AMP - Share bar',
      eventAction: 'AMP - share',
      eventLabel: 'method: facebook',
    },
  },
  shareButtonTwitter: {
    on: 'click',
    selector: '${shareButtonTwitterSelector}',
    request: 'event',
    vars: {
      eventCategory: 'AMP - Share bar',
      eventAction: 'AMP - share',
      eventLabel: 'method: twitter',
    },
  },
  shareButtonWhatsapp: {
    on: 'click',
    selector: '${shareButtonWhatsappSelector}',
    request: 'event',
    vars: {
      eventCategory: 'AMP - Share bar',
      eventAction: 'AMP - share',
      eventLabel: 'method: whatsapp',
    },
  },
  shareButtonEmail: {
    on: 'click',
    selector: '${shareButtonEmailSelector}',
    request: 'event',
    vars: {
      eventCategory: 'AMP - Share bar',
      eventAction: 'AMP - share',
      eventLabel: 'method: email',
    },
  },
  shareButtonSystem: {
    on: 'click',
    selector: '${shareButtonSystemSelector}',
    request: 'event',
    vars: {
      eventCategory: 'AMP - Share bar', // others are: 'List' (not supported yet)
      eventAction: 'AMP - open share modal',
    },
  },
  nextButton: {
    on: 'click',
    selector: '${nextButtonSelector}',
    request: 'event',
    vars: {
      eventCategory: 'AMP - Share bar',
      eventAction: 'AMP - next',
    },
  },
};

export { gaVars, gaTriggers };
