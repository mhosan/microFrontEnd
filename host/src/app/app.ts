import { Component, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MicroFrontend } from './micro-frontend';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy{
  protected title = 'host';
  constructor(private microFrontend: MicroFrontend) {}

  @ViewChild('mfe1', {read: ViewContainerRef, static: true}) listContainer!: ViewContainerRef;
  @ViewChild('mfe2', {read: ViewContainerRef, static: true}) listContainer2!: ViewContainerRef;

  private listComponentRefmfe1: ComponentRef<any> | null = null;
  private listComponentRefmfe2  : ComponentRef<any> | null = null;

  async ngOnInit() {
    try {
      const mfe1 =await this.microFrontend.loadRemoteComponent(4201, 'mfe1'); 
      this.listContainer.clear();
      this.listComponentRefmfe1=this.listContainer.createComponent(mfe1.App);
      this.listComponentRefmfe1.changeDetectorRef.detectChanges();

      const mfe2 =await this.microFrontend.loadRemoteComponent(4202, 'mfe2');
      this.listContainer2.clear();
      this.listComponentRefmfe2=this.listContainer2.createComponent(mfe2.App);
      this.listComponentRefmfe2.changeDetectorRef.detectChanges();
      
    } catch (error) {
      console.error(`Error loading mfe1 remote component:`, error);
    }
  }

  ngOnDestroy(): void {
    if (this.listComponentRefmfe1) {
      this.listComponentRefmfe1.destroy();
    }
    if (this.listComponentRefmfe2) {
      this.listComponentRefmfe2.destroy();
    }
  }

}
