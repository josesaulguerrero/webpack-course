import Template from '@templates/Template.js';
import '@styles/main.css';
// import './styles/vars.styl';
// import './styles/vars.scss';
console.log('hola')
(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
