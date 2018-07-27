
// import all file excet index.js
const req = require.context('.', true, /^(?!.\/index).*.js$/);
const modules = {};
const defaultModules = {};

req.keys().forEach(key => {
  const regex = /.\/(.*?).js$/;
  const moduleName = regex.test(key) && key.match(regex)[1];
  modules[moduleName] = req(key);
  defaultModules[moduleName] = req(key).default;
});
// console.log(req('./playGround.js'));
export default modules;
export { defaultModules };
