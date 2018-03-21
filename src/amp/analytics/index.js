/* eslint-disable no-template-curly-in-string */

const gaVars = {
  openCommentsSelector: '#comments',  // TODO - add classes in component
  cookiesSelector: '#cookies-button', // TODO - add classes in component
  // --- MENU ---
  openMenuSelector: '#menu-button',
  menuOpenSingleSelector: 'a.menu-single',
  menuOpenListSelector: 'a.menu-list',
  // -- NAVBAR ---
  navbarOpenSingleSelector: 'a.navbar-single',
  navbarOpenListSelector: 'a.navbar-list',
  // --- POST ---
  // postOpenSingleSelector: '.carousel a.single-link', // not supported yet
  postOpenListSelector: 'a.tag-link',
  // --- SHARE BAR ---
  openShareModalSelector: 'amp-social-share[type=\'system\']',
  nextButtonSelector: '.next-button',
};

const gaTriggers = {
  // --- COMMENTS ---
  openComments: {
    on: 'click',
    selector: '${openCommentsSelector}',
    request: 'event',
    vars: {
      eventCategory: 'Post',
      eventAction: 'open comments',
    },
  },

  // --- COOKIES ---
  cookies: {
    on: 'click',
    selector: '${cookiesSelector}',
    request: 'event',
    vars: {
      eventCategory: 'Cookies modal',
      eventAction: 'close',
    },
  },

  // --- MENU ---
  openMenu: {
    on: 'click',
    selector: '${openMenuSelector}',
    request: 'event',
    vars: {
      eventCategory: 'Post bar', // others are: 'Media bar', 'List bar' (not supported in AMP yet)
      eventAction: 'open menu',
    },
  },
  menuOpenSingle: {
    on: 'click',
    selector: '${menuOpenSingleSelector}',
    request: 'event',
    vars: {
      eventCategory: 'Menu',
      eventAction: 'open single',
    },
  },
  menuOpenList: {
    on: 'click',
    selector: '${menuOpenListSelector}',
    request: 'event',
    vars: {
      eventCategory: 'Menu',
      eventAction: 'open list',
    },
  },

  // --- NAVBAR ---
  navbarOpenSingle: {
    on: 'click',
    selector: '${navbarOpenSingleSelector}',
    request: 'event',
    vars: {
      eventCategory: 'Navbar',
      eventAction: 'open single',
    },
  },
  navbarOpenList: {
    on: 'click',
    selector: '${navbarOpenListSelector}',
    request: 'event',
    vars: {
      eventCategory: 'Navbar',
      eventAction: 'open list',
    },
  },

  // --- POST ---
  postOpenList: {
    on: 'click',
    selector: '${postOpenListSelector}',
    request: 'event',
    vars: {
      eventCategory: 'Post', // <-- tags in Post
      eventAction: 'open list',
    },
  },
  // // --- not supported yet ---
  // postOpenSingle: {
  //   on: 'click',
  //   selector: '${postOpenSingleSelector}',
  //   request: 'event',
  //   vars: {
  //     eventCategory: 'Post', // <-- carousel in Post
  //     eventAction: 'open single',
  //   },
  // },

  // --- SHARE BAR ---
  openShareModal: {
    on: 'click',
    selector: '${openShareModalSelector}',
    request: 'event',
    vars: {
      eventCategory: 'Share bar', // others are: 'List' (not supported in AMP yet)
      eventAction: 'open share modal',
    },
  },
  nextButton: {
    on: 'click',
    selector: '${nextButtonSelector}',
    request: 'event',
    vars: {
      eventCategory: 'Share bar',
      eventAction: 'next',
    },
  },
};

export { gaVars, gaTriggers };
