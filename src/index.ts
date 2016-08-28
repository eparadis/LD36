import {TechItem} from './TechItem.ts';
import {Counter} from './Counter.ts';

class Main
{
  constructor() {
    var gameElement = document.getElementById("game");
    var timeCounter = new Counter("seconds");
    timeCounter.attachElement(gameElement);
    var cashCounter = new Counter("dollars");
    cashCounter.attachElement(gameElement);

    setInterval( () => {timeCounter.add(1);}, 1000);

    var techItem = new TechItem([]);
    techItem.addBuildAction( () => { cashCounter.add(1); })

    var button = new Button(gameElement, "thinger", techItem);

    var robot = new Robot(timeCounter, 10, () => { cashCounter.add(100); })
  }
}

class Robot {
  private period: number;
  private nextTime: number;
  private action: Function;

  constructor( counter: Counter, period: number, action: Function) {
    counter.subscribe( (time) => { this.act(time); } );
    this.period = period;
    this.nextTime = -1;
    this.action = action;
  }

  act( time: number) : void {
    if( this.nextTime === -1 ) {
      this.nextTime = time + this.period;
    } else if( time >= this.nextTime) {
      this.action();
      this.nextTime = time + this.period;
    }
      
  }
}

class Button {
  constructor( parent: HTMLElement, name: string, techItem: TechItem) {
    var button = document.createElement("button");
    parent.appendChild(button);
    button.innerText = name;
    button.onclick = (event) => { techItem.build(); };
  }
}

(()=>{
 var main = new Main();
})();
