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
      console.log('Loading mfe1');
      const mfe1 = await this.microFrontend.loadRemoteComponent(4201, 'mfe1');
      console.log('Creating mfe1 component');
      this.listContainer.clear();
      this.listComponentRefmfe1 = this.listContainer.createComponent(mfe1.App);
      this.listComponentRefmfe1.changeDetectorRef.detectChanges();
    } catch (error) {
      console.error(`Error loading mfe1 remote component:`, error);
    }

    try {
      console.log('Loading mfe2');
      const mfe2 = await this.microFrontend.loadRemoteComponent(4202, 'mfe2');
      console.log('Creating mfe2 component');
      this.listContainer2.clear();
      this.listComponentRefmfe2 = this.listContainer2.createComponent(mfe2.App);
      this.listComponentRefmfe2.changeDetectorRef.detectChanges();
    } catch (error) {
      console.error(`Error loading mfe2 remote component:`, error);
    }

    try {
      console.log('Loading mfe3');
      const mfe3 = await this.microFrontend.loadRemoteComponent(4203, 'mfe3');
      console.log('Creating mfe3 component');
      this.listContainer3.clear();
      this.listComponentRefmfe3 = this.listContainer3.createComponent(mfe3.App);
      this.listComponentRefmfe3.changeDetectorRef.detectChanges();
    } catch (error) {
      console.error(`Error loading mfe3 remote component:`, error);
    }

    try {
      console.log('Loading mfe4');
      const mfe4 = await this.microFrontend.loadRemoteComponent(4204, 'mfe4');
      console.log('Creating mfe4 component');
      this.listContainer4.clear();
      this.listComponentRefmfe4 = this.listContainer4.createComponent(mfe4.App);
      this.listComponentRefmfe4.changeDetectorRef.detectChanges();
    } catch (error) {
      console.error(`Error loading mfe4 remote component:`, error);
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
