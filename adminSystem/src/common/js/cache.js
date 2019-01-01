import storage from 'good-storage';

const ACCOUNT_KEY = '__account__';
const RIGHTS_KEY = '__rights__';

export function loadAccount() {
  return storage.get(ACCOUNT_KEY, '');
}

export function clearAccount() {
  storage.remove(ACCOUNT_KEY);
  return '';
}

export function setAccount(account) {
  storage.set(ACCOUNT_KEY, account);
}

export function loadRights() {
  return storage.get(RIGHTS_KEY, []);
}

export function clearRights() {
  storage.remove(RIGHTS_KEY);
  return [];
}

export function setRights(rights) {
  storage.set(RIGHTS_KEY, rights);
}