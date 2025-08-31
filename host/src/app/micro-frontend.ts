import { loadRemoteModule } from '@angular-architects/native-federation';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MicroFrontend {

  async loadRemoteComponent(port:number, remoteName:string) {
    try {
     return await loadRemoteModule({
      exposedModule: './Component',
      remoteName: remoteName,
      remoteEntry: `http://localhost:${port}/remoteEntry.js`,
      fallback:'unavailable'
     })
    } catch (error) {
     console.error(`Error loading ${remoteName} remote component:`, error);
     throw new Error("Failed to load remote component");
    }
  }

}
