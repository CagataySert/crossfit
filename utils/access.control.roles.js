const AccessControl = require('accesscontrol');

const ac = new AccessControl();

ac.grant('member')
  .readOwn('user')
  .createOwn('user')
  .updateOwn('user')
  .readAny('wod')
  .readAny('section')
  .readAny('movement')
  .readAny('coach');

ac.grant('admin')
  .readAny('user')
  .createAny('user')
  .updateAny('user')
  .deleteAny('user')
  .readAny('coach')
  .createAny('coach')
  .updateAny('coach')
  .deleteAny('coach')
  .readAny('movement')
  .createAny('movement')
  .updateAny('movement')
  .deleteAny('movement')
  .readAny('section')
  .createAny('section')
  .updateAny('section')
  .deleteAny('section')
  .readAny('wod')
  .createAny('wod')
  .updateAny('wod')
  .deleteAny('wod');

module.exports = ac;
