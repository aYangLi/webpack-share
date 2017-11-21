import './css/common.css';
import Layer from './components/layer/layer.js'

const App = function() {
  
  let dom = document.getElementById('app');

  let layer = new Layer();

  console.log(layer);  
  // dom.innerHTML = layer.tpl; 
  dom.innerHTML = layer.ejs({
    name:'aYang',
    arr:['apple','xiaomi','hoor']
  })

}

new App();