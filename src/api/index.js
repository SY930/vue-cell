/**
 * Created by Administrator on 2018/4/27.
 */
import axios from 'axios'

axios.interceptors.response.use((res)=>{
  return res.data;
});
export let getSeller = () =>{
  return axios.get('/api/seller')
};
export let getGoods = () =>{
  return axios.get('/api/goods')
}
export let getRatings = () =>{
  return axios.get('/api/ratings')
}
