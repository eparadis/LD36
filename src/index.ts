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
    var messages = new Messages(gameElement);

    setInterval( () => {timeCounter.add(1);}, 1000);

    var techItem = new TechItem([]);
    techItem.addBuildAction( () => { cashCounter.add(1); })
    
    var robotCount = 0;
    var robotTechItem = new TechItem([]);
    robotTechItem.addBuildAction( () => {
      cashCounter.add(-10);
      var robot = new Robot(timeCounter, 10, () => { cashCounter.add(2); });
      robotCount += 1;
      messages.addMessage(`Robot #${robotCount} built! It will make 2 dollars every 10 seconds.`);
    });

    var factoryCount = 0;
    var factoryTechItem = new TechItem([robotTechItem]);
    factoryTechItem.addBuildAction( () => {
      cashCounter.add(-100);
      var factory = new Robot(timeCounter, 100, () => { cashCounter.add(10); });
      factoryCount += 1;
      messages.addMessage(`Factory #${factoryCount} built! It will make 10 dollars every 100 seconds.`)
    });

    var button = new Button(gameElement, "make a buck", techItem, cashCounter, 0);
    var robotButton = new Button( gameElement, "build a robot", robotTechItem, cashCounter, 10);
    var factory = new Button( gameElement, "build a factory", factoryTechItem, cashCounter, 100);
  }
}

class Messages {
  private messages: string[];
  private textbox: HTMLElement;
  constructor( parent: HTMLElement) {
    this.messages = [];
    var p = document.createElement("p");
    parent.appendChild(p);
    this.textbox = document.createElement("pre");
    p.appendChild(this.textbox);
    this.addMessage("Nothing has happened yet...");
  }

  addMessage( text: string) : void {
    this.messages.push(text);
    if( this.messages.length > 10) {
      this.messages.shift();
    }
    this.textbox.textContent = "";
    for( var i = this.messages.length - 1; i >= 0; i -= 1) {
      this.textbox.textContent += this.messages[i] + "\n";
    }
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
  constructor( parent: HTMLElement, name: string, itemToBuild: TechItem, counter: Counter, cost: number) {
    var button = document.createElement("button");
    parent.appendChild(button);
    button.innerText = `${name} ($${cost})`;
    button.disabled = true;
    counter.subscribe( (money) => {
      if( money >= cost) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }
    });
    button.onclick = (event) => {
      itemToBuild.build();
    };
  }
}

(()=>{
 var main = new Main();
})();
