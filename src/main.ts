import { app, BrowserWindow } from 'electron';
import path from 'path';
 

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 920,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  })

  mainWindow.loadFile(path.join(__dirname, "index.html"));

  mainWindow.webContents.openDevTools();
}


app.whenReady().then(async () => {
  await createWindow();
  
  app.on('activate', async function () {
    if (BrowserWindow.getAllWindows().length === 0) {
        await createWindow()
    }
  });
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
      app.quit()
    }
})

try {
  require('electron-reloader')(module);
} catch {}