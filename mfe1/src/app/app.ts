import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'mfe1';
  public cartel = 'nada';

  ngOnInit(): void {
    window.addEventListener('msgFromHost', this.handleEvent.bind(this));
  }

  handleEvent(event: Event) {
    // Recibir los datos del evento
    if (event instanceof CustomEvent) {
      const eventInfo = event.detail;
      this.cartel = eventInfo.motivo + '<br>';
      this.cartel += eventInfo.msg + '<br>';
      this.cartel += eventInfo.timestamp;
    }
  }
}


