import {TechItem} from './TechItem.ts';
import {Counter} from './Counter.ts';

class Main
{
  private cashCounter: Counter;
  private timeCounter: Counter;
  private messages: Messages;
  private counts:{};
  private gameElement: HTMLElement;

  constructor() {
    var gameElement = document.getElementById("game");
    this.gameElement = gameElement;
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

    var george = new TechItem([]);
    george.addBuildAction( () => { cashCounter.add(1); });
    var button = new Button(gameElement, "make a buck", george, cashCounter, 0);

    var robotTechItem = new TechItem([]); 
    this.buildAThing(robotTechItem, 10, 10, 2, "Robot", "build a robot"); // 2/10 = 0.20

    var doubleRobot = new TechItem([robotTechItem]);
    this.buildAThing(doubleRobot, 25, 6, 2, "Double robot", "double robot!"); // 2/6 = 0.33

    var factoryTechItem = new TechItem([robotTechItem]);
    this.buildAThing(factoryTechItem, 100, 100, 25, "Factory", "build a factory"); // 25/100 = 0.25

    var sweatshop = new TechItem([factoryTechItem]);
    this.buildAThing(sweatshop, 500, 28, 28, "Sweatshop", "sweatshop"); // 28/28 = 1.0

    var twodollar = new TechItem([sweatshop]);
    twodollar.addBuildAction( () => { cashCounter.add(2); });
    new Button(gameElement, "make two bucks; bank >=", twodollar, cashCounter, 1000);  // ~250/10 = ~25.0

    var smallIsland = new TechItem([factoryTechItem]);
    this.buildAThing(smallIsland, 16000, 13, 210, "Small island nation", "small island nation"); // 210/13 = 16.2

    var govt = new TechItem([factoryTechItem]);
    this.buildAThing(govt, 100000, 3, 600, "Corrupt official", "bribe an official"); // 2100/3 = 200

    var benjamin = new TechItem([govt]);
    benjamin.addBuildAction( () => { cashCounter.add(100); });
    new Button(gameElement, "make a benjamin", benjamin, cashCounter, 0); // ~10000/10 = 1000.0

    var moonTechItem = new TechItem([robotTechItem, factoryTechItem]);
    moonTechItem.addBuildAction( () => {
      cashCounter.add(-1000000000);
      var msg = "YOU BOUGHT THE MOON! THERE IS NOTHING MORE IN LIFE.";
      alert(msg);
      messages.addMessage(msg);
    });
    new Button( gameElement, "the moon", moonTechItem, cashCounter, 1000000000);
  }

  buildAThing(techItem: TechItem, cost: number, period: number, gain: number, name: string, buttonText: string) : void {
    techItem.addBuildAction( () => {
      this.cashCounter.add(-1 * cost);
      var factory = new Robot(this.timeCounter, period, () => { this.cashCounter.add(gain); });
      if( this.counts[name] == undefined ) {
        this.counts[name] = 0;
      }
      this.counts[name] += 1;
      this.messages.addMessage(`${name} #${this.counts[name]} built! It will make ${gain} dollars every ${period} seconds.`)
    });
    new Button( this.gameElement, buttonText, techItem, this.cashCounter, cost);
  }

}

class Messages {
  private messages: string[];
  private textbox: HTMLElement;
  constructor( parent: HTMLElement) {
    this.messages = [];
    var p = document.createElement("div");
    p.id = "messages";
    parent.appendChild(p);
    this.textbox = document.createElement("p");
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
    button.innerText = `${name} $${cost}`;
    button.disabled = true;
    counter.subscribe( (money) => {
      if( money >= cost && itemToBuild.canBuild()) {
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
