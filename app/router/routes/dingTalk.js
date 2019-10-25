'use strict';

module.exports = (app) => {
  const { router, controller } = app;

  router.post('/dingTalk/markdown', controller.dingTalk.markdown);
  router.post('/dingTalk/feedCard', controller.dingTalk.feedCard);
  router.post('/dingTalk/text', controller.dingTalk.text);
  router.post('/dingTalk/link', controller.dingTalk.link);
  router.post('/dingTalk/actionCard', controller.dingTalk.actionCard);
};
