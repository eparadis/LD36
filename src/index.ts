import {TechItem} from './TechItem';
import {Counter} from './Counter';

class Main
{
  constructor() {
    var gameElement = document.getElementById("game");
    var timeCounter = new Counter(gameElement, "seconds");
    var cashCounter = new Counter(gameElement, "dollars");

    var techItem = new TechItem([]);
    techItem.addBuildAction( () => { cashCounter.add(1); })

    var button = new Button(gameElement, "thinger", techItem);
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
