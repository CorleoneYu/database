import { ERR_OK, DOMAIN } from 'common/js/config';
import axios from 'axios';

export function getAdminList() {
  return axios.get(`${DOMAIN}/api/admin/getAdminList`)
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

export function setRights(adminId, rights) {
  return axios.post(`${DOMAIN}/api/admin/setRights`,{
    adminId, rights
  },{headers: {'Content-Type': 'application/json'}})
  .then(resp => {
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

export function addAdmin(admin) {
  return axios.post(`${DOMAIN}/api/user/addAdmin`,{
    admin
  },{headers: {'Content-Type': 'application/json'}})
  .then(resp => {
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