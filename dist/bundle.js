/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************!*\
  !*** multi app ***!
  \*****************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! /Users/ed/git/LD36/src/index.ts */1);


/***/ },
/* 1 */
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var TechItem_ts_1 = __webpack_require__(/*! ./TechItem.ts */ 2);
	var Counter_ts_1 = __webpack_require__(/*! ./Counter.ts */ 3);
	var Main = (function () {
	    function Main() {
	        var gameElement = document.getElementById("game");
	        var timeCounter = new Counter_ts_1.Counter("seconds");
	        timeCounter.attachElement(gameElement);
	        var cashCounter = new Counter_ts_1.Counter("dollars");
	        cashCounter.attachElement(gameElement);
	        var messages = new Messages(gameElement);
	        setInterval(function () { timeCounter.add(1); }, 1000);
	        var techItem = new TechItem_ts_1.TechItem([]);
	        techItem.addBuildAction(function () { cashCounter.add(1); });
	        var robotCount = 0;
	        var robotTechItem = new TechItem_ts_1.TechItem([]);
	        robotTechItem.addBuildAction(function () {
	            cashCounter.add(-10);
	            var robot = new Robot(timeCounter, 10, function () { cashCounter.add(2); });
	            robotCount += 1;
	            messages.addMessage("Robot #" + robotCount + " built! It will make 2 dollars every 10 seconds.");
	        });
	        var button = new Button(gameElement, "make a buck", techItem, cashCounter, 0);
	        var robotButton = new Button(gameElement, "build a robot", robotTechItem, cashCounter, 10);
	    }
	    return Main;
	}());
	var Messages = (function () {
	    function Messages(parent) {
	        this.messages = [];
	        var p = document.createElement("p");
	        parent.appendChild(p);
	        this.textbox = document.createElement("pre");
	        p.appendChild(this.textbox);
	        this.addMessage("Nothing has happened yet...");
	    }
	    Messages.prototype.addMessage = function (text) {
	        this.messages.push(text);
	        if (this.messages.length > 10) {
	            this.messages.shift();
	        }
	        this.textbox.textContent = "";
	        for (var i = this.messages.length - 1; i >= 0; i -= 1) {
	            this.textbox.textContent += this.messages[i] + "\n";
	        }
	    };
	    return Messages;
	}());
	var Robot = (function () {
	    function Robot(counter, period, action) {
	        var _this = this;
	        counter.subscribe(function (time) { _this.act(time); });
	        this.period = period;
	        this.nextTime = -1;
	        this.action = action;
	    }
	    Robot.prototype.act = function (time) {
	        if (this.nextTime === -1) {
	            this.nextTime = time + this.period;
	        }
	        else if (time >= this.nextTime) {
	            this.action();
	            this.nextTime = time + this.period;
	        }
	    };
	    return Robot;
	}());
	var Button = (function () {
	    function Button(parent, name, itemToBuild, counter, cost) {
	        var button = document.createElement("button");
	        parent.appendChild(button);
	        button.innerText = name + " ($" + cost + ")";
	        button.disabled = true;
	        counter.subscribe(function (money) {
	            if (money >= cost) {
	                button.disabled = false;
	            }
	            else {
	                button.disabled = true;
	            }
	        });
	        button.onclick = function (event) {
	            itemToBuild.build();
	        };
	    }
	    return Button;
	}());
	(function () {
	    var main = new Main();
	})();


/***/ },
/* 2 */
/*!*************************!*\
  !*** ./src/TechItem.ts ***!
  \*************************/
/***/ function(module, exports) {

	"use strict";
	var TechItem = (function () {
	    function TechItem(preReqs) {
	        this._preReqs = preReqs;
	        this._buildActions = [];
	    }
	    TechItem.prototype.isBuilt = function () {
	        return this._isBuilt;
	    };
	    TechItem.prototype.build = function () {
	        this._isBuilt = true;
	        for (var _i = 0, _a = this._buildActions; _i < _a.length; _i++) {
	            var callback = _a[_i];
	            callback();
	        }
	    };
	    TechItem.prototype.canBuild = function () {
	        for (var _i = 0, _a = this._preReqs; _i < _a.length; _i++) {
	            var prereq = _a[_i];
	            if (!prereq.isBuilt()) {
	                return false;
	            }
	        }
	        return true;
	    };
	    TechItem.prototype.addBuildAction = function (callback) {
	        this._buildActions.push(callback);
	    };
	    return TechItem;
	}());
	exports.TechItem = TechItem;


/***/ },
/* 3 */
/*!************************!*\
  !*** ./src/Counter.ts ***!
  \************************/
/***/ function(module, exports) {

	"use strict";
	var Counter = (function () {
	    function Counter(unitName) {
	        this._textElement = document.createElement('p');
	        this._unitName = unitName;
	        this._value = 0;
	        this._subscribers = [];
	        this.update();
	    }
	    Counter.prototype.attachElement = function (parent) {
	        parent.appendChild(this._textElement);
	    };
	    Counter.prototype.add = function (value) {
	        this._value += value;
	        this.update();
	    };
	    Counter.prototype.subscribe = function (action) {
	        this._subscribers.push(action);
	        action(this._value);
	    };
	    Counter.prototype.update = function () {
	        this._textElement.innerText = this._value.toString() + ' ' + this._unitName;
	        for (var _i = 0, _a = this._subscribers; _i < _a.length; _i++) {
	            var callback = _a[_i];
	            callback(this._value);
	        }
	    };
	    return Counter;
	}());
	exports.Counter = Counter;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map