import { store } from './store';
import authActions from '@shared/redux-admin/auth/actions';

export default () =>
  new Promise(() => {
    store.dispatch(authActions.checkAuthorization());
  });
