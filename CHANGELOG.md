# [1.6.0](https://github.com/frontity/saturn-theme/compare/v1.5.28...v1.6.0) (2018-09-28)


### Bug Fixes

* **amp:** fetches home list to populate next button ([1586446](https://github.com/frontity/saturn-theme/commit/1586446))
* **amp:** fix image and share bar styles in AMP ([9c6223f](https://github.com/frontity/saturn-theme/commit/9c6223f))
* **amp:** requests home list only when the initial item is a single ([ba16f30](https://github.com/frontity/saturn-theme/commit/ba16f30))
* **amp:** requests menu taxonomies to populate links and removes sagas ([920d928](https://github.com/frontity/saturn-theme/commit/920d928))
* **analytics:** fixes error when analytics doesn't exist ([34fb69b](https://github.com/frontity/saturn-theme/commit/34fb69b))
* **close-button:** use 'latest' as default type and 'post' as default id ([b0be2e2](https://github.com/frontity/saturn-theme/commit/b0be2e2))
* **close-button:** use 'latest' as default type and 'post' as default id ([0a2a765](https://github.com/frontity/saturn-theme/commit/0a2a765))
* **column:** fixes margin top in Column ([66489e3](https://github.com/frontity/saturn-theme/commit/66489e3))
* **content:** adapt Content to new version of h2r ([fd4d301](https://github.com/frontity/saturn-theme/commit/fd4d301))
* **content:** fixes col tag bug in AMP and refactors processors ([4b56827](https://github.com/frontity/saturn-theme/commit/4b56827))
* **content:** fixes iframe's height in AMP ([5a5e738](https://github.com/frontity/saturn-theme/commit/5a5e738))
* **content:** fixes LazyFacebook in AMP ([b3e5948](https://github.com/frontity/saturn-theme/commit/b3e5948))
* **content:** fixes LazyFacebook in pwa ([3931b48](https://github.com/frontity/saturn-theme/commit/3931b48))
* **content:** fixes LazyIframe in AMP ([218bc34](https://github.com/frontity/saturn-theme/commit/218bc34))
* **content:** fixes LazyVideo in AMP ([6d66169](https://github.com/frontity/saturn-theme/commit/6d66169))
* **content:** fixes regex for amp-youtube ([dfc8a50](https://github.com/frontity/saturn-theme/commit/dfc8a50))
* **content:** fixes soundcloud's color attribute ([04f4d8a](https://github.com/frontity/saturn-theme/commit/04f4d8a))
* **content:** fixes twitter and instagram components ([eec205d](https://github.com/frontity/saturn-theme/commit/eec205d))
* **content:** removes <ul>, <ol>, <li>'s attribute type in AMP ([279ea22](https://github.com/frontity/saturn-theme/commit/279ea22))
* **content:** removes wp-embedded-content with a converter ([89e767f](https://github.com/frontity/saturn-theme/commit/89e767f))
* **content:** small fixes in LazyTwitter and LazyInstagram ([dd02eef](https://github.com/frontity/saturn-theme/commit/dd02eef))
* **fetch-waypoint:** fixes infinite requests when taxonomy is empty ([daf263a](https://github.com/frontity/saturn-theme/commit/daf263a))
* **fetch-waypoint:** remove unnecessary prop ([6b06c2a](https://github.com/frontity/saturn-theme/commit/6b06c2a))
* **footer:** changes campaign link ([6840272](https://github.com/frontity/saturn-theme/commit/6840272))
* **footer:** fixes warning about customFooterName being required ([b281574](https://github.com/frontity/saturn-theme/commit/b281574))
* **footer:** fixes warning about customFooterName prop ([3ae1728](https://github.com/frontity/saturn-theme/commit/3ae1728))
* **galleries:** add analytics events ([d550402](https://github.com/frontity/saturn-theme/commit/d550402))
* **gdpr:** add display none for new config button ([dd3c6d4](https://github.com/frontity/saturn-theme/commit/dd3c6d4))
* **gdpr:** use config option instead of css ([4f82842](https://github.com/frontity/saturn-theme/commit/4f82842)), closes [#27](https://github.com/frontity/saturn-theme/issues/27)
* **h2r:** fix a bug removing elements from processors ([5f16edf](https://github.com/frontity/saturn-theme/commit/5f16edf))
* **h2r:** fix handleChildren method ([f4d4433](https://github.com/frontity/saturn-theme/commit/f4d4433))
* **head:** set node.component to node.tagName again ([712a15b](https://github.com/frontity/saturn-theme/commit/712a15b))
* **html2react:** adds support for resizable iframes ([37c6168](https://github.com/frontity/saturn-theme/commit/37c6168))
* **html2react:** adds support for resizable iframes [WIP] ([f0b5508](https://github.com/frontity/saturn-theme/commit/f0b5508))
* **html2react:** fixes warnings about keys ([c70cff9](https://github.com/frontity/saturn-theme/commit/c70cff9))
* **icons:** adds close, image, instagram and share icons ([299482f](https://github.com/frontity/saturn-theme/commit/299482f))
* **icons:** changes comments icons ([a5aad1a](https://github.com/frontity/saturn-theme/commit/a5aad1a))
* **icons:** changes rest of icons ([dc31123](https://github.com/frontity/saturn-theme/commit/dc31123))
* **icons:** uses new instagram icon ([1605000](https://github.com/frontity/saturn-theme/commit/1605000))
* **iframes:** replaces http for https in iframes src ([4557ac5](https://github.com/frontity/saturn-theme/commit/4557ac5))
* **image-component:** fixes error when content prop is undefined ([5dde136](https://github.com/frontity/saturn-theme/commit/5dde136))
* **images:** fixes Image and converter for incomplete src and srcset ([7353890](https://github.com/frontity/saturn-theme/commit/7353890))
* **images:** removes `he` and changes condition to solve incomplete uris ([aa4a44c](https://github.com/frontity/saturn-theme/commit/aa4a44c))
* **inject-slot:** correct test function of restartCounter processor ([9818bcd](https://github.com/frontity/saturn-theme/commit/9818bcd))
* **lang:** fixes lang.getMoreInCategory action ([91f111a](https://github.com/frontity/saturn-theme/commit/91f111a))
* **languages:** adds missing translations ([76ffa40](https://github.com/frontity/saturn-theme/commit/76ffa40))
* **lazy-iframe:** fixes src prop in PWA ([4365aa7](https://github.com/frontity/saturn-theme/commit/4365aa7))
* **lazyload:** fixes lazyload classes [WIP] ([833bbee](https://github.com/frontity/saturn-theme/commit/833bbee))
* **lazyload:** fixes lazyload classes conflict ([7dd1a95](https://github.com/frontity/saturn-theme/commit/7dd1a95))
* **lazyload:** supports new lazyload without async ([6a7f870](https://github.com/frontity/saturn-theme/commit/6a7f870))
* **lazyload:** updates to new version of vanilla-lazyload ([c8741e8](https://github.com/frontity/saturn-theme/commit/c8741e8))
* **logo:** fixes styles in bar logo ([4ff9435](https://github.com/frontity/saturn-theme/commit/4ff9435))
* **media:** fixes SmartAd component missing mstId ([dc947c4](https://github.com/frontity/saturn-theme/commit/dc947c4))
* **menu:** fixes animation in menu ([59f5e2c](https://github.com/frontity/saturn-theme/commit/59f5e2c))
* **menu:** refactor styles and add menuHeader to theme ([042b948](https://github.com/frontity/saturn-theme/commit/042b948))
* **myr-footer:** adds config for new site ([c6fb2b4](https://github.com/frontity/saturn-theme/commit/c6fb2b4))
* **myr-footer:** adds new sites ([2806740](https://github.com/frontity/saturn-theme/commit/2806740))
* **myr-footer:** ads for dominiomundial.com ([b60af75](https://github.com/frontity/saturn-theme/commit/b60af75))
* **myr-footer:** ads for solorecetas.com ([5636a2a](https://github.com/frontity/saturn-theme/commit/5636a2a))
* **myr-footer:** changes Worona for Frontity ([990ad0e](https://github.com/frontity/saturn-theme/commit/990ad0e))
* **notifications-switch:** fix NotificationsSwitch appearance ([a083f8f](https://github.com/frontity/saturn-theme/commit/a083f8f))
* **npm:** add [@frontity](https://github.com/frontity)/lazyload as dependency ([4a9189f](https://github.com/frontity/saturn-theme/commit/4a9189f))
* **npm:** add react as dev dependency ([a39dcdc](https://github.com/frontity/saturn-theme/commit/a39dcdc))
* **npm:** add react-helmet as dev dependency ([a3c5bdd](https://github.com/frontity/saturn-theme/commit/a3c5bdd))
* **parse-and-adapt:** fix htmlTree adapt algorithm ([c636d9f](https://github.com/frontity/saturn-theme/commit/c636d9f))
* **processors:** adapt some processors to new version of h2r ([e007aaa](https://github.com/frontity/saturn-theme/commit/e007aaa))
* **processors:** change order of injectSlot processors ([5f078a3](https://github.com/frontity/saturn-theme/commit/5f078a3))
* **processors:** fix a typo with a processor name ([bb1797c](https://github.com/frontity/saturn-theme/commit/bb1797c))
* **processors:** fix gallery processor ([15cc2d1](https://github.com/frontity/saturn-theme/commit/15cc2d1))
* **processors:** fix image processor ([b0f085f](https://github.com/frontity/saturn-theme/commit/b0f085f))
* **processors:** fix some errors in image processor ([81a7d85](https://github.com/frontity/saturn-theme/commit/81a7d85))
* **processors:** remove processors moved to h2r and their components ([cce164e](https://github.com/frontity/saturn-theme/commit/cce164e))
* **react-warnings:** fixes different react warnings ([10142a8](https://github.com/frontity/saturn-theme/commit/10142a8))
* **scroll:** fixes handleScroll logic ([0571272](https://github.com/frontity/saturn-theme/commit/0571272))
* **share:** installs latests version of [@frontity](https://github.com/frontity)/share ([0f69aa4](https://github.com/frontity/saturn-theme/commit/0f69aa4))
* **share:** updates share to last version and fixes comments action ([60b87d9](https://github.com/frontity/saturn-theme/commit/60b87d9))
* **slider:** change componentDidMount and updateActiveSlide functions ([c616b4c](https://github.com/frontity/saturn-theme/commit/c616b4c))
* **slot-injector:** fix debug mode in SlotInjector ([0b317ba](https://github.com/frontity/saturn-theme/commit/0b317ba))
* **slot-injector:** fix SlotInjector component ([32d4c79](https://github.com/frontity/saturn-theme/commit/32d4c79))
* **slots:** fixes react warnings about keys ([7bd07e6](https://github.com/frontity/saturn-theme/commit/7bd07e6))
* **slots:** rename content slots ([86488e8](https://github.com/frontity/saturn-theme/commit/86488e8))
* **stores:** fixes listsFromMenu action when menu is not available ([1867478](https://github.com/frontity/saturn-theme/commit/1867478))
* **styles:** adds evilGrey to theme colors ([ef9a9a1](https://github.com/frontity/saturn-theme/commit/ef9a9a1))
* **styles:** fixes colors in LoadMore button ([bd1a7a9](https://github.com/frontity/saturn-theme/commit/bd1a7a9))
* **styles:** fixes styles for content links ([90f7bbc](https://github.com/frontity/saturn-theme/commit/90f7bbc))
* **taglist-component:** fixes this component on custom post type ([6a6447e](https://github.com/frontity/saturn-theme/commit/6a6447e))


### Features

* **content:** adds support for soundcloud ([65db5f6](https://github.com/frontity/saturn-theme/commit/65db5f6))
* **content:** adds support for twitter videos ([b9a7037](https://github.com/frontity/saturn-theme/commit/b9a7037))
* **context:** adds latest list after post ([0dce5ad](https://github.com/frontity/saturn-theme/commit/0dce5ad))
* **context:** adds latest list after post ([150cb54](https://github.com/frontity/saturn-theme/commit/150cb54))
* **footer:** changes footer logo and adds a campaign link ([caaedb0](https://github.com/frontity/saturn-theme/commit/caaedb0))
* **galleries:** adds galleries with featured and content images ([aebfe47](https://github.com/frontity/saturn-theme/commit/aebfe47))
* **h2r:** merge processors and converters ([9afb1fd](https://github.com/frontity/saturn-theme/commit/9afb1fd))
* **lazyload:** changes threshold values (need new version of lazyload) ([69ea53a](https://github.com/frontity/saturn-theme/commit/69ea53a))
* **lazyload:** implementation of vanilla-lazyload ([6b57d60](https://github.com/frontity/saturn-theme/commit/6b57d60))
* **lazyload:** implementation of vanilla-lazyload [WIP] ([900a7d8](https://github.com/frontity/saturn-theme/commit/900a7d8))
* **lazyload:** installs vanilla-lazyload and intersection-observer ([bb13001](https://github.com/frontity/saturn-theme/commit/bb13001))
* **myr-footer:** move footer settings to db ([0981227](https://github.com/frontity/saturn-theme/commit/0981227))
* **pwa:** send analytics events ([4fbcc18](https://github.com/frontity/saturn-theme/commit/4fbcc18))
* **stores:** changes beforeSSR and afterCSR names to camel case ([4c104dc](https://github.com/frontity/saturn-theme/commit/4c104dc))
* **youtube:** support iframe data-src attribute in youtube converter ([9a01d79](https://github.com/frontity/saturn-theme/commit/9a01d79))


### Performance Improvements

* **components:** reduce animation times ([7fcb29f](https://github.com/frontity/saturn-theme/commit/7fcb29f))
* **components:** remove unnecessary transitions ([9a707ef](https://github.com/frontity/saturn-theme/commit/9a707ef))
* **slider:** reduce animation time when swiping ([451b92b](https://github.com/frontity/saturn-theme/commit/451b92b))

## [0.10.1](https://github.com/frontity/saturn-theme/compare/v0.10.0...v0.10.1) (2018-08-29)


### Bug Fixes

* **footer:** fixes warning about customFooterName being required ([b281574](https://github.com/frontity/saturn-theme/commit/b281574))


### Performance Improvements

* **components:** reduce animation times ([7fcb29f](https://github.com/frontity/saturn-theme/commit/7fcb29f))
* **components:** remove unnecessary transitions ([9a707ef](https://github.com/frontity/saturn-theme/commit/9a707ef))
* **slider:** reduce animation time when swiping ([451b92b](https://github.com/frontity/saturn-theme/commit/451b92b))

# [0.10.0](https://github.com/frontity/saturn-theme/compare/v0.9.1...v0.10.0) (2018-08-24)


### Features

* **myr-footer:** move footer settings to db ([0981227](https://github.com/frontity/saturn-theme/commit/0981227))
* **youtube:** support iframe data-src attribute in youtube converter ([9a01d79](https://github.com/frontity/saturn-theme/commit/9a01d79))

## [0.9.1](https://github.com/frontity/saturn-theme/compare/v0.9.0...v0.9.1) (2018-08-23)


### Bug Fixes

* **styles:** fixes colors in LoadMore button ([bd1a7a9](https://github.com/frontity/saturn-theme/commit/bd1a7a9))

# [0.9.0](https://github.com/frontity/saturn-theme/compare/v0.8.1...v0.9.0) (2018-08-23)


### Bug Fixes

* **content:** fixes col tag bug in AMP and refactors processors ([4b56827](https://github.com/frontity/saturn-theme/commit/4b56827))
* **myr-footer:** adds new sites ([2806740](https://github.com/frontity/saturn-theme/commit/2806740))
* **myr-footer:** ads for dominiomundial.com ([b60af75](https://github.com/frontity/saturn-theme/commit/b60af75))
* **myr-footer:** ads for solorecetas.com ([5636a2a](https://github.com/frontity/saturn-theme/commit/5636a2a))
* **myr-footer:** changes Worona for Frontity ([990ad0e](https://github.com/frontity/saturn-theme/commit/990ad0e))


### Features

* **content:** adds support for twitter videos ([b9a7037](https://github.com/frontity/saturn-theme/commit/b9a7037))

## [0.8.1](https://github.com/frontity/saturn-theme/compare/v0.8.0...v0.8.1) (2018-08-17)


### Bug Fixes

* **content:** fixes iframe's height in AMP ([5a5e738](https://github.com/frontity/saturn-theme/commit/5a5e738))
* **media:** fixes SmartAd component missing mstId ([dc947c4](https://github.com/frontity/saturn-theme/commit/dc947c4))

# [0.8.0](https://github.com/frontity/saturn-theme/compare/v0.7.3...v0.8.0) (2018-08-16)


### Bug Fixes

* **column:** fixes margin top in Column ([66489e3](https://github.com/frontity/saturn-theme/commit/66489e3))
* **content:** fixes LazyFacebook in AMP ([b3e5948](https://github.com/frontity/saturn-theme/commit/b3e5948))
* **content:** fixes LazyFacebook in pwa ([3931b48](https://github.com/frontity/saturn-theme/commit/3931b48))
* **content:** fixes LazyIframe in AMP ([218bc34](https://github.com/frontity/saturn-theme/commit/218bc34))
* **content:** fixes LazyVideo in AMP ([6d66169](https://github.com/frontity/saturn-theme/commit/6d66169))
* **content:** fixes regex for amp-youtube ([dfc8a50](https://github.com/frontity/saturn-theme/commit/dfc8a50))
* **content:** fixes soundcloud's color attribute ([04f4d8a](https://github.com/frontity/saturn-theme/commit/04f4d8a))
* **content:** fixes twitter and instagram components ([eec205d](https://github.com/frontity/saturn-theme/commit/eec205d))
* **content:** removes <ul>, <ol>, <li>'s attribute type in AMP ([279ea22](https://github.com/frontity/saturn-theme/commit/279ea22))
* **content:** removes wp-embedded-content with a converter ([89e767f](https://github.com/frontity/saturn-theme/commit/89e767f))
* **content:** small fixes in LazyTwitter and LazyInstagram ([dd02eef](https://github.com/frontity/saturn-theme/commit/dd02eef))
* **html2react:** adds support for resizable iframes ([37c6168](https://github.com/frontity/saturn-theme/commit/37c6168))
* **html2react:** adds support for resizable iframes [WIP] ([f0b5508](https://github.com/frontity/saturn-theme/commit/f0b5508))
* **html2react:** fixes warnings about keys ([c70cff9](https://github.com/frontity/saturn-theme/commit/c70cff9))
* **iframes:** replaces http for https in iframes src ([4557ac5](https://github.com/frontity/saturn-theme/commit/4557ac5))
* **images:** fixes Image and converter for incomplete src and srcset ([7353890](https://github.com/frontity/saturn-theme/commit/7353890))
* **images:** removes `he` and changes condition to solve incomplete uris ([aa4a44c](https://github.com/frontity/saturn-theme/commit/aa4a44c))
* **lazy-iframe:** fixes src prop in PWA ([4365aa7](https://github.com/frontity/saturn-theme/commit/4365aa7))
* **myr-footer:** adds config for new site ([c6fb2b4](https://github.com/frontity/saturn-theme/commit/c6fb2b4))
* **slot-injector:** fix SlotInjector component ([32d4c79](https://github.com/frontity/saturn-theme/commit/32d4c79))
* **slots:** fixes react warnings about keys ([7bd07e6](https://github.com/frontity/saturn-theme/commit/7bd07e6))
* **slots:** rename content slots ([86488e8](https://github.com/frontity/saturn-theme/commit/86488e8))


### Features

* **content:** adds support for soundcloud ([65db5f6](https://github.com/frontity/saturn-theme/commit/65db5f6))

## [0.7.3](https://github.com/frontity/saturn-theme/compare/v0.7.2...v0.7.3) (2018-08-03)


### Bug Fixes

* **fetch-waypoint:** fixes infinite requests when taxonomy is empty ([daf263a](https://github.com/frontity/saturn-theme/commit/daf263a))
* **fetch-waypoint:** remove unnecessary prop ([6b06c2a](https://github.com/frontity/saturn-theme/commit/6b06c2a))
* **image-component:** fixes error when content prop is undefined ([5dde136](https://github.com/frontity/saturn-theme/commit/5dde136))
* **taglist-component:** fixes this component on custom post type ([6a6447e](https://github.com/frontity/saturn-theme/commit/6a6447e))

## [0.7.2](https://github.com/frontity/saturn-theme/compare/v0.7.1...v0.7.2) (2018-07-18)


### Bug Fixes

* **close-button:** use 'latest' as default type and 'post' as default id ([b0be2e2](https://github.com/frontity/saturn-theme/commit/b0be2e2))
* **close-button:** use 'latest' as default type and 'post' as default id ([0a2a765](https://github.com/frontity/saturn-theme/commit/0a2a765))
* **icons:** adds close, image, instagram and share icons ([299482f](https://github.com/frontity/saturn-theme/commit/299482f))
* **icons:** changes comments icons ([a5aad1a](https://github.com/frontity/saturn-theme/commit/a5aad1a))
* **icons:** changes rest of icons ([dc31123](https://github.com/frontity/saturn-theme/commit/dc31123))
* **icons:** uses new instagram icon ([1605000](https://github.com/frontity/saturn-theme/commit/1605000))
* **menu:** refactor styles and add menuHeader to theme ([042b948](https://github.com/frontity/saturn-theme/commit/042b948))
* **notifications-switch:** fix NotificationsSwitch appearance ([a083f8f](https://github.com/frontity/saturn-theme/commit/a083f8f))

## [0.7.1](https://github.com/frontity/saturn-theme/compare/v0.7.0...v0.7.1) (2018-07-17)


### Bug Fixes

* **share:** installs latests version of [@frontity](https://github.com/frontity)/share ([0f69aa4](https://github.com/frontity/saturn-theme/commit/0f69aa4))

# [0.7.0](https://github.com/frontity/saturn-theme/compare/v0.6.0...v0.7.0) (2018-07-17)


### Bug Fixes

* **amp:** fetches home list to populate next button ([1586446](https://github.com/frontity/saturn-theme/commit/1586446))
* **amp:** requests home list only when the initial item is a single ([ba16f30](https://github.com/frontity/saturn-theme/commit/ba16f30))
* **amp:** requests menu taxonomies to populate links and removes sagas ([920d928](https://github.com/frontity/saturn-theme/commit/920d928))
* **analytics:** fixes error when analytics doesn't exist ([34fb69b](https://github.com/frontity/saturn-theme/commit/34fb69b))
* **footer:** changes campaign link ([6840272](https://github.com/frontity/saturn-theme/commit/6840272))
* **galleries:** add analytics events ([d550402](https://github.com/frontity/saturn-theme/commit/d550402))
* **gdpr:** add display none for new config button ([dd3c6d4](https://github.com/frontity/saturn-theme/commit/dd3c6d4))
* **gdpr:** use config option instead of css ([4f82842](https://github.com/frontity/saturn-theme/commit/4f82842)), closes [#27](https://github.com/frontity/saturn-theme/issues/27)
* **lang:** fixes lang.getMoreInCategory action ([91f111a](https://github.com/frontity/saturn-theme/commit/91f111a))
* **languages:** adds missing translations ([76ffa40](https://github.com/frontity/saturn-theme/commit/76ffa40))
* **react-warnings:** fixes different react warnings ([10142a8](https://github.com/frontity/saturn-theme/commit/10142a8))
* **scroll:** fixes handleScroll logic ([0571272](https://github.com/frontity/saturn-theme/commit/0571272))
* **share:** updates share to last version and fixes comments action ([60b87d9](https://github.com/frontity/saturn-theme/commit/60b87d9))
* **slider:** change componentDidMount and updateActiveSlide functions ([c616b4c](https://github.com/frontity/saturn-theme/commit/c616b4c))
* **stores:** fixes listsFromMenu action when menu is not available ([1867478](https://github.com/frontity/saturn-theme/commit/1867478))
* **styles:** adds evilGrey to theme colors ([ef9a9a1](https://github.com/frontity/saturn-theme/commit/ef9a9a1))


### Features

* **context:** adds latest list after post ([150cb54](https://github.com/frontity/saturn-theme/commit/150cb54))
* **context:** adds latest list after post ([0dce5ad](https://github.com/frontity/saturn-theme/commit/0dce5ad))
* **footer:** changes footer logo and adds a campaign link ([caaedb0](https://github.com/frontity/saturn-theme/commit/caaedb0))
* **galleries:** adds galleries with featured and content images ([aebfe47](https://github.com/frontity/saturn-theme/commit/aebfe47))
* **pwa:** send analytics events ([4fbcc18](https://github.com/frontity/saturn-theme/commit/4fbcc18))

# [0.6.0](https://github.com/frontity/saturn-theme/compare/v0.5.28...v0.6.0) (2018-07-09)


### Features

* **stores:** changes beforeSSR and afterCSR names to camel case ([4c104dc](https://github.com/frontity/saturn-theme/commit/4c104dc))
