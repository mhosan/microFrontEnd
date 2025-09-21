import { loadRemoteModule } from '@angular-architects/native-federation';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MicroFrontend {

  async loadRemoteComponent(port:number, remoteName:string) {
    try {
      console.log(`Loading remote module for ${remoteName}`);
      const module = await loadRemoteModule({
        exposedModule: './Component',
        remoteName: remoteName,
        remoteEntry: `http://localhost:${port}/remoteEntry.json`
      });
      console.log(`Loaded remote module for ${remoteName}`, module);
      return module;
    } catch (error) {
      console.error(`Error loading ${remoteName} remote component:`, error);
      throw new Error("Failed to load remote component");
    }
  }

}
