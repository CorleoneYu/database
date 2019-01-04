import { ERR_OK, DOMAIN } from 'common/js/config';
import axios from 'axios';

export function getOrderList(userName, state) {
  return axios.get(`${DOMAIN}/api/order/getOrderList?userName=${userName}&state=${state}`)
  .then(resp => {
    console.log(resp);
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

//发货
export function delivery(orderId) {
  return axios.post(`${DOMAIN}/api/order/delivery`,{
    orderId
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

export function getOrderDetail(orderId) {
  return axios.get(`${DOMAIN}/api/order/getOrderDetailByOrderId?orderId=${orderId}`)
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
