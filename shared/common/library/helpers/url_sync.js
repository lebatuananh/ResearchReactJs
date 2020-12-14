import qs from 'qs';
import { isServer } from './isServer';
import { MasterMenuMapper } from '@shared/config/menu/admin/Master';
import { OPMenuMapper } from '@shared/config/menu/admin/OP';

export function getInitData() {
  if (!isServer) {
    const initData = qs.parse(window.location.search.slice(1));
    if (initData.toggle) initData.toggle.free_shipping = initData.toggle.free_shipping === 'true' ? true : undefined;
    return initData;
  }
  return false;
}
export function setUrl(searchState) {
  if (!isServer) {
    const search = searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : '';
    window.history.pushState(searchState, null, search);
  }
  return;
}

export function getDefaultPath(menu, appName) {
  const getParent = (lastRoute) => {
    const parent = [];
    if (!lastRoute) return parent;
    parent.push(lastRoute);
    // console.log('OPMenuMapper:', OPMenuMapper);
    const mapper = appName === 'master' ? MasterMenuMapper[lastRoute] : OPMenuMapper[lastRoute];
    if (mapper) {
      mapper.forEach((item) => {
        parent.push(item);
      });
    }
    // menu.forEach((option) => {
    //   if (option.children) {
    //     option.children.forEach((child) => {
    //       if (child.key === lastRoute) {
    //         parent.push(option.key);
    //       }
    //     });
    //   }
    // });
    return parent;
  };
  if (!isServer && window.location.pathname) {
    const routes = window.location.pathname.split('/');
    if (routes.length > 1) {
      const lastRoute = routes[routes.length - 1];
      return getParent(lastRoute);
    }
  }
  return [];
}
