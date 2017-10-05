const {remote} = require('electron');
const {app} = remote;
const {requireTaskPool} = window.require('electron-remote');
const worker = requireTaskPool(window.require.resolve(`${app.getAppPath()}/worker.js`));
window.worker = worker;