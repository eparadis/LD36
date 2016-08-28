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

  }
}

(()=>{
 var main = new Main();
})();
