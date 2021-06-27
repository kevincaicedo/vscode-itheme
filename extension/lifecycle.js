const fs = require('mz/fs');
const vscode = require('vscode');

async function uninstallJS(JSFile) {
    const JS = await fs.readFile(JSFile, 'utf-8');
    const needClean = /\/\* !! VSCODE-VIBRANCY-START !! \*\/[\s\S]*?\/\* !! VSCODE-VIBRANCY-END !! \*\//.test(JS);
    if (needClean) {
        const newJS = JS
            .replace(/\/\* !! VSCODE-VIBRANCY-START !! \*\/[\s\S]*?\/\* !! VSCODE-VIBRANCY-END !! \*\//, '')
        await fs.writeFile(JSFile, newJS, 'utf-8');
    }
}

async function uninstallHTML(HTMLFile) {
    const HTML = await fs.readFile(HTMLFile, 'utf-8');
    const needClean = /<!-- !! VSCODE-VIBRANCY-START !! -->[\s\S]*?<!-- !! VSCODE-VIBRANCY-END !! -->/.test(HTML);
    if (needClean) {
        const newHTML = HTML
            .replace(/<!-- !! VSCODE-VIBRANCY-START !! -->[\s\S]*?<!-- !! VSCODE-VIBRANCY-END !! -->/, '')
        await fs.writeFile(HTMLFile, newHTML, 'utf-8');
    }
}

async function Uninstall(HTMLFile, JSFile) {
    try {
        // uninstall old version
        await fs.stat(HTMLFile);
        await uninstallHTML(HTMLFile);
    } finally {

    }

    try {
        await fs.stat(JSFile);
        
        await uninstallJS(JSFile);
    } catch (error) {
        if (error && (error.code === 'EPERM' || error.code === 'EACCES')) {
            vscode.window.showInformationMessage(localize('messages.admin') + error);
        }
        else {
            vscode.window.showInformationMessage(localize('messages.smthingwrong') + error);
        }
        throw error;
    }
}

exports.Uninstall = Uninstall