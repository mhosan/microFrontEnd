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
  @ViewChild('mfe3', {read: ViewContainerRef, static: true}) listContainer3!: ViewContainerRef;
  @ViewChild('mfe4', {read: ViewContainerRef, static: true}) listContainer4!: ViewContainerRef;
  

  private listComponentRefmfe1: ComponentRef<any> | null = null;
  private listComponentRefmfe2  : ComponentRef<any> | null = null;
  private listComponentRefmfe3  : ComponentRef<any> | null = null;
  private listComponentRefmfe4  : ComponentRef<any> | null = null;


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

      const mfe3 =await this.microFrontend.loadRemoteComponent(4201, 'mfe1'); 
      this.listContainer3.clear();
      this.listComponentRefmfe3=this.listContainer3.createComponent(mfe1.App);
      this.listComponentRefmfe3.changeDetectorRef.detectChanges();

      const mfe4 =await this.microFrontend.loadRemoteComponent(4202, 'mfe2'); 
      this.listContainer4.clear();
      this.listComponentRefmfe4=this.listContainer4.createComponent(mfe2.App);
      this.listComponentRefmfe4.changeDetectorRef.detectChanges();

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
    if (this.listComponentRefmfe3) {
      this.listComponentRefmfe3.destroy();
    }
    if (this.listComponentRefmfe4) {
      this.listComponentRefmfe4.destroy();
    }
  }

}
