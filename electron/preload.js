const { contextBridge } = require('electron');

// Minimal preload to follow best practices (no direct node access in renderer)
contextBridge.exposeInMainWorld('electronAPI', {});
