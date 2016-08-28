export class Counter {
  private _value : number;
  private _textElement : HTMLElement;
  private _unitName : string;
  private _subscribers: Function[];

  constructor(unitName: string) {
    this._textElement = document.createElement('p');
    this._unitName = unitName;
    this._value = 0;
    this._subscribers = [];
    this.update();
  }

  attachElement( parent: HTMLElement) {
    parent.appendChild(this._textElement);
  }

  add( value: number ) : void {
    this._value += value;
    this.update();
  }

  subscribe( action: (n: number) => any) {
    this._subscribers.push(action);
  }

  private update() : void {
    this._textElement.innerText = this._value.toString() + ' ' + this._unitName;
    for( var callback of this._subscribers) {
        callback(this._value);
    }
  }
}