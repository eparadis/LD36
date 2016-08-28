import {TechItem} from './TechItem.ts';
import {Counter} from './Counter.ts';

class Main
{
  private cashCounter: Counter;
  private timeCounter: Counter;
  private messages: Messages;
  private counts:{};

  constructor() {
    var gameElement = document.getElementById("game");
    var timeCounter = new Counter("seconds");
    timeCounter.attachElement(gameElement);
    this.timeCounter = timeCounter;
    var cashCounter = new Counter("dollars");
    this.cashCounter = cashCounter;
    cashCounter.attachElement(gameElement);
    var messages = new Messages(gameElement);
    this.messages = messages;

    this.counts = {};

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

    var factoryTechItem = new TechItem([robotTechItem]);
    this.buildAThing(factoryTechItem, 100, 100, 10, "Factory");

    var moonTechItem = new TechItem([robotTechItem, factoryTechItem]);
    moonTechItem.addBuildAction( () => {
      cashCounter.add(-1000000000);
      var msg = "YOU BOUGHT THE MOON! THERE IS NOTHING MORE IN LIFE.";
      alert(msg);
      messages.addMessage(msg);
    });

    var button = new Button(gameElement, "make a buck", techItem, cashCounter, 0);
    var robotButton = new Button( gameElement, "build a robot", robotTechItem, cashCounter, 10);
    var factory = new Button( gameElement, "build a factory", factoryTechItem, cashCounter, 100);
    var endOfGame = new Button( gameElement, "the moon", moonTechItem, cashCounter, 1000000000);
  }

  buildAThing(techItem: TechItem, cost: number, period: number, gain: number, name: string) : void {
    techItem.addBuildAction( () => {
      this.cashCounter.add(-1 * cost);
      var factory = new Robot(this.timeCounter, period, () => { this.cashCounter.add(gain); });
      this.counts[name] += 1;
      this.messages.addMessage(`${name} #${this.counts[name]} built! It will make ${gain} dollars every ${period} seconds.`)
    });
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
