import { ERR_OK, DOMAIN } from 'common/js/config';
import axios from 'axios';

export function getGoodsList() {
  return axios.get(`${DOMAIN}/api/goods/getGoodsList`)
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

export function deleteGoods(goodsId) {
  return axios.post(`${DOMAIN}/api/goods/deleteGoods`,{
    goodsId
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

export function addGoods(goods) {
  return axios.post(`${DOMAIN}/api/goods/addGoods`,{
    goods
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

export function editGoods(goods) {
  return axios.post(`${DOMAIN}/api/goods/editGoods`,{
    goods
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

export function getImgList(goodsId) {
  return axios.get(`${DOMAIN}/api/goods/getImgListByGoodsId?goodsId=${goodsId}`)
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

export function addGoodsImg(img) {
  return axios.post(`${DOMAIN}/api/goods/addGoodsImg`,{
    img
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

export function deleteGoodsImg(imgId) {
  return axios.post(`${DOMAIN}/api/goods/deleteGoodsImg`,{
    imgId
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