const lifecycle = require("../lifecycle");

const appDir = path.dirname(require.main.filename);
const HTMLFile = appDir + '/vs/code/electron-browser/workbench/workbench.html';
const JSFile = appDir + '/main.js';

lifecycle.Uninstall(HTMLFile, JSFile)