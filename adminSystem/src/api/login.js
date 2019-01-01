import { ERR_OK, DOMAIN } from 'common/js/config';
import axios from 'axios';

export function getUser() {
  return axios.get(`${DOMAIN}/api/user/getUser`)
  .then(resp => {
    console.log(resp);
    if (resp.data.status === ERR_OK) {
      return Promise.resolve(resp.data);
    } else {
      return Promise.reject(resp.data);
    }
  }).catch(err => {
    console.log(err);
    return Promise.reject(err);
  })
}

export function login(account, password) {
  return axios.post(`${DOMAIN}/api/user/login`,{
    account, password
  },{headers: {'Content-Type': 'application/json'}})
  .then(resp => {
    if (resp.data.status === ERR_OK) {
      return Promise.resolve(resp.data.data);
    } else {
      return Promise.reject(resp.data);
    }
  }).catch(err => {
    console.log(err);
    return Promise.reject(err);
  })
}