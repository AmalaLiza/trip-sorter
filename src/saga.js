import loadPublicGistsOfUser from './sagas/loadPublicGistsOfUser.saga';
import loadForks from './sagas/loadForks.saga';

/**
 * Exporting all sagas used for the applications.
 * * */

export default [
  loadPublicGistsOfUser,
  loadForks,
];
