export class Counter {
  private _value : number;
  private _textElement : HTMLElement;
  private _unitName : string;

  constructor( parent: HTMLElement, unitName: string) {
    var div = document.createElement('div');
    this._textElement = document.createElement('p');
    parent.appendChild(div);
    div.appendChild(this._textElement);
    this._unitName = unitName;
    this._value = 0;
    this.updateText();
  }

  add( value: number ) : void {
    this._value += value;
    this.updateText();
  }

  private updateText() : void {
    this._textElement.innerText = this._value.toString() + ' ' + this._unitName;
  }
}