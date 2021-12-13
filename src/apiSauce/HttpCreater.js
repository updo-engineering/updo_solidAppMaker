import {create} from 'apisauce';
export default api = create({
  baseURL: 'http://solidappmaker.ml:5055/api/v1/',
  timeout: 20000
});

const naviMonitor = response => console.log('hey!  listen! ', response)
api.addMonitor(naviMonitor)