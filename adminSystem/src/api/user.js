import { ERR_OK, DOMAIN } from 'common/js/config';
import axios from 'axios';

export function getUserList() {
  return axios.get(`${DOMAIN}/api/user/getUserList`)
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

export function getAddressListByUserId(userId) {
  return axios.get(`${DOMAIN}/api/user/getAddressListByUserId?userId=${userId}`)
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
export function deleteUser(userId) {
  return axios.post(`${DOMAIN}/api/user/deleteUser`,{
    userId
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

export function addUser(user) {
  return axios.post(`${DOMAIN}/api/user/addUser`,{
    user
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