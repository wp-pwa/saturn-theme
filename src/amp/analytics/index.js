/* eslint-disable no-template-curly-in-string */
import * as classes from './classes';

const gaVars = {};

const gaTriggers = {
  // --- COMMENTS ---
  // // not supported yet
  // openComments: {
  //   on: 'click',
  //   selector: '${openCommentsSelector}',
  //   request: 'event',
  //   vars: {
  //     eventCategory: 'AMP - Post',
  //     eventAction: 'AMP - open comments',
  //   },
  // },

  // --- COOKIES ---
  cookies: {
    on: 'click',
    selector: `.${classes.cookies}`,
    request: 'event',
    vars: {
      eventCategory: 'AMP - Cookies modal',
      eventAction: 'AMP - close',
    },
  },

  // --- MENU ---
  openMenu: {
    on: 'click',
    selector: `.${classes.openMenu}`,
    request: 'event',
    vars: {
      eventCategory: 'AMP - Post bar', // others are: 'Media bar', 'List bar' (not supported yet)
      eventAction: 'AMP - open menu',
    },
  },
  menuOpenSingle: {
    on: 'click',
    selector: `.${classes.menuOpenSingle}`,
    request: 'event',
    vars: {
      eventCategory: 'AMP - Menu',
      eventAction: 'AMP - open single',
    },
  },
  menuOpenList: {
    on: 'click',
    selector: `.${classes.menuOpenList}`,
    request: 'event',
    vars: {
      eventCategory: 'AMP - Menu',
      eventAction: 'AMP - open list',
    },
  },

  // --- NAVBAR ---
  goHome: {
    on: 'click',
    selector: `a.${classes.goHome}`,
    request: 'event',
    vars: {
      eventCategory: 'AMP - List bar',
      eventAction: 'AMP - go home',
    },
  },
  navbarOpenSingle: {
    on: 'click',
    selector: `.${classes.navbarOpenSingle}`,
    request: 'event',
    vars: {
      eventCategory: 'AMP - Navbar',
      eventAction: 'AMP - open single',
    },
  },
  navbarOpenList: {
    on: 'click',
    selector: `.${classes.navbarOpenList}`,
    request: 'event',
    vars: {
      eventCategory: 'AMP - Navbar',
      eventAction: 'AMP - open list',
    },
  },

  // --- POST ---
  postOpenList: {
    on: 'click',
    selector: `.${classes.postOpenList}`,
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
    selector: `.${classes.shareButtonFacebook}`,
    request: 'event',
    vars: {
      eventCategory: 'AMP - Share bar',
      eventAction: 'AMP - share',
      eventLabel: 'method: facebook',
    },
  },
  shareButtonTwitter: {
    on: 'click',
    selector: "amp-social-share[type='twitter']",
    request: 'event',
    vars: {
      eventCategory: 'AMP - Share bar',
      eventAction: 'AMP - share',
      eventLabel: 'method: twitter',
    },
  },
  shareButtonWhatsapp: {
    on: 'click',
    selector: "amp-social-share[type='whatsapp']",
    request: 'event',
    vars: {
      eventCategory: 'AMP - Share bar',
      eventAction: 'AMP - share',
      eventLabel: 'method: whatsapp',
    },
  },
  shareButtonEmail: {
    on: 'click',
    selector: "amp-social-share[type='email']",
    request: 'event',
    vars: {
      eventCategory: 'AMP - Share bar',
      eventAction: 'AMP - share',
      eventLabel: 'method: email',
    },
  },
  shareButtonSystem: {
    on: 'click',
    selector: "amp-social-share[type='system']",
    request: 'event',
    vars: {
      eventCategory: 'AMP - Share bar', // others are: 'List' (not supported yet)
      eventAction: 'AMP - open share modal',
    },
  },
  nextButton: {
    on: 'click',
    selector: `.${classes.nextButton}`,
    request: 'event',
    vars: {
      eventCategory: 'AMP - Share bar',
      eventAction: 'AMP - next',
    },
  },
};

export { gaVars, gaTriggers };
