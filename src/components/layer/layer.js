import tpl from './layer.html'
import less from './layer.less'
import ejs from './layer.ejs'

function layer (params) {
  return {
    name:'layer',
    tpl:tpl,
    ejs:ejs,
  }
}

export default layer;