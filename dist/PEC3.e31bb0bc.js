// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"PEC3/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ENDPOINTS = exports.DATA_API_TOKEN = exports.DATA_API_HOST = void 0;
const DATA_API_HOST = 'omgvamp-hearthstone-v1.p.rapidapi.com';
exports.DATA_API_HOST = DATA_API_HOST;
const DATA_API_TOKEN = 'b3e1d58ff3msh830486f923b551ep16cc60jsnadd6090c0935';
exports.DATA_API_TOKEN = DATA_API_TOKEN;
const DATA_API = `https://${DATA_API_HOST}`;
const IMAGES_API = 'https://art.hearthstonejson.com/v1/render/latest/enUS/256x';
const ENDPOINTS = {
  INFO: `${DATA_API}/info`,
  CLASSES: `${DATA_API}/cards/classes`,
  SETS: `${DATA_API}/cards/sets`,
  RACES: `${DATA_API}/cards/races`,
  QUALITIES: `${DATA_API}/cards/qualities`,
  TYPES: `${DATA_API}/cards/types`,
  FACTIONS: `${DATA_API}/cards/factions`,
  IMAGES: IMAGES_API
};
exports.ENDPOINTS = ENDPOINTS;
},{}],"PEC3/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestInfo = requestInfo;
exports.requestCardsByClass = requestCardsByClass;
exports.requestCardsByRace = requestCardsByRace;
exports.requestCardsByType = requestCardsByType;
exports.requestCardsByFaction = requestCardsByFaction;
exports.requestCardsByQuality = requestCardsByQuality;
exports.requestCardsBySet = requestCardsBySet;

var _config = require("./config");

const headers = new Headers();
headers.append('x-rapidapi-host', _config.DATA_API_HOST);
headers.append('x-rapidapi-key', _config.DATA_API_TOKEN);

async function getEndpoint(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers
    });
    const apiData = await response.json();
    return apiData;
  } catch (err) {
    console.log('fetch failed', err);
  }
}

async function requestInfo() {
  const apiData = await getEndpoint(_config.ENDPOINTS.INFO);
  return apiData;
}

async function requestCardsByClass(option) {
  const apiData = await getEndpoint(`${_config.ENDPOINTS.CLASSES}/${option}`);
  return apiData;
}

async function requestCardsByRace(option) {
  const apiData = await getEndpoint(`${_config.ENDPOINTS.RACES}/${option}`);
  return apiData;
}

async function requestCardsByType(option) {
  const apiData = await getEndpoint(`${_config.ENDPOINTS.TYPES}/${option}`);
  return apiData;
}

async function requestCardsByFaction(option) {
  const apiData = await getEndpoint(`${_config.ENDPOINTS.FACTIONS}/${option}`);
  return apiData;
}

async function requestCardsByQuality(option) {
  const apiData = await getEndpoint(`${_config.ENDPOINTS.QUALITIES}/${option}`);
  return apiData;
}

async function requestCardsBySet(option) {
  const apiData = await getEndpoint(`${_config.ENDPOINTS.SETS}/${option}`);
  return apiData;
}
},{"./config":"PEC3/config.js"}],"PEC3/Classes/DeckBuilder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DeckBuilder = void 0;

class DeckBuilder {
  init(apiData) {
    const {
      classes,
      sets,
      types,
      factions,
      qualities,
      races
    } = apiData;
    this._info = {
      classes,
      sets,
      types,
      factions,
      qualities,
      races
    };
    this._cards = {
      all: new Map(),
      byClass: {},
      byFaction: {},
      byQuality: {},
      byRace: {},
      bySet: {},
      byType: {}
    };
    this._deck = [];
  }

  get info() {
    return this._info;
  }

  get cards() {
    return this._cards;
  }

  get deck() {
    return this._deck;
  }

  addCardToDeck() {}

  removeCardFromDeck() {}

  getCardsById(id) {
    return this._cards.all.get(id);
  }

  getCardsByClass(cardClass) {
    if (this._cards.byClass.hasOwnProperty(cardClass)) {
      return this._cards.byClass[cardClass];
    }
  }

  setCardsByClass(cardClass, cardsByClass) {
    this._cards.all = new Map([...this._cards.all, ...cardsByClass]);
    this._cards.byClass[cardClass] = cardsByClass.keys();
  }

  getCardsBySet(cardSet) {
    if (this._cards.bySet.hasOwnProperty(cardSet)) {
      return this._cards.bySet[cardSet];
    }
  }

  setCardsBySet(cardSet, cardsBySet) {
    this._cards.all = new Map([...this._cards.all, ...cardsBySet]);
    this._cards.bySet[cardSet] = cardsBySet.keys();
  }

  getCardsByType(cardType) {
    if (this._cards.byType.hasOwnProperty(cardType)) {
      return this._cards.byType[cardType];
    }
  }

  setCardsByType(cardType, cardsByType) {
    this._cards.all = new Map([...this._cards.all, ...cardsByType]);
    this._cards.byType[cardType] = cardsByType.keys();
  }

  getCardsByFaction(cardFaction) {
    if (this._cards.byFaction.hasOwnProperty(cardFaction)) {
      return this._cards.byFaction[cardFaction];
    }
  }

  setCardsByFaction(cardFaction, cardsByFaction) {
    this._cards.all = new Map([...this._cards.all, ...cardsByFaction]);
    this._cards.byFaction[cardFaction] = cardsByFaction.keys();
  }

  getCardsByQuality(cardQuality) {
    if (this._cards.byQuality.hasOwnProperty(cardQuality)) {
      return this._cards.byQuality[cardQuality];
    }
  }

  setCardsByQuality(cardQuality, cardsByQuality) {
    this._cards.all = new Map([...this._cards.all, ...cardsByQuality]);
    this._cards.byQuality[cardQuality] = cardsByQuality.keys();
  }

  getCardsByRace(cardRace) {
    if (this._cards.byRace.hasOwnProperty(cardRace)) {
      return this._cards.byRace[cardRace];
    }
  }

  setCardsByRace(cardRace, cardsByRace) {
    this._cards.all = new Map([...this._cards.all, ...cardsByRace]);
    this._cards.byRace[cardRace] = cardsByRace.keys();
  }

}

exports.DeckBuilder = DeckBuilder;
const DeckBuilderSingleton = new DeckBuilder();
var _default = DeckBuilderSingleton;
exports.default = _default;
},{}],"PEC3/utils/initDeckBuilder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initDeckBuilder;

var _api = require("../api");

var _DeckBuilder = _interopRequireDefault(require("../Classes/DeckBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function initDeckBuilder() {
  const info = await (0, _api.requestInfo)();

  _DeckBuilder.default.init(info);
}
},{"../api":"PEC3/api.js","../Classes/DeckBuilder":"PEC3/Classes/DeckBuilder.js"}],"PEC3/Classes/Card.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = require("../config");

function buildImgUrl(id) {
  return `${_config.ENDPOINTS.IMAGES}/${id}.png`;
}

class Card {
  constructor(apiData) {
    const {
      cardId,
      cardSet,
      name,
      type,
      text,
      playerClass,
      attack,
      health,
      rarity,
      faction,
      cost,
      elite,
      race,
      flavor,
      durability
    } = apiData;
    this._id = cardId;
    this._set = cardSet;
    this._name = name;
    this._type = type;
    this._text = text;
    this._playerClass = playerClass;
    this._attack = attack;
    this._health = health;
    this._rarity = rarity;
    this._faction = faction;
    this._cost = cost;
    this._elite = elite;
    this._race = race;
    this._flavor = flavor;
    this._durability = durability;
    this._img = buildImgUrl(cardId);
  }

  get id() {
    return this._id;
  }

  get img() {
    return this._img;
  }

  get name() {
    return this._name;
  }

  get set() {
    return this._set;
  }

  get type() {
    return this._type;
  }

  get cost() {
    return this._cost;
  }

  get text() {
    return this._text;
  }

  get playerClass() {
    return this._playerClass;
  }

}

exports.default = Card;
},{"../config":"PEC3/config.js"}],"PEC3/utils/getCards.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCardsByClass = getCardsByClass;
exports.getCardsByType = getCardsByType;
exports.getCardsByRace = getCardsByRace;
exports.getCardsBySet = getCardsBySet;
exports.getCardsByQuality = getCardsByQuality;
exports.getCardsByFaction = getCardsByFaction;
exports.getCardsBySelector = getCardsBySelector;

var _DeckBuilder = _interopRequireDefault(require("../Classes/DeckBuilder"));

var _Card = _interopRequireDefault(require("../Classes/Card"));

var _api = require("../api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ACTION_BY_SELECTOR_NAME = {
  classes: getCardsByClass,
  types: getCardsByType,
  races: getCardsByRace,
  qualities: getCardsByQuality,
  factions: getCardsByFaction
};

async function getCardsByClass(cardClass) {
  const localCardsByClass = _DeckBuilder.default.getCardsByClass(cardClass);

  if (localCardsByClass) {
    return localCardsByClass;
  }

  const apiData = await (0, _api.requestCardsByClass)(cardClass);
  const cardsByClass = new Map();
  apiData.forEach(cardData => cardsByClass.set(cardData.cardId, new _Card.default(cardData)));

  _DeckBuilder.default.setCardsByClass(cardClass, cardsByClass);
}

async function getCardsByType(cardType) {
  const localCardsByType = _DeckBuilder.default.getCardsByType(cardType);

  if (localCardsByType) {
    return localCardsByType;
  }

  const apiData = await (0, _api.requestCardsByType)(cardType);
  const cardsByType = new Map();
  apiData.forEach(cardData => cardsByType.set(cardData.cardId, new _Card.default(cardData)));

  _DeckBuilder.default.setCardsByType(cardType, cardsByType);
}

async function getCardsByRace(cardRace) {
  const localCardsByRace = _DeckBuilder.default.getCardsByRace(cardRace);

  if (localCardsByRace) {
    return localCardsByRace;
  }

  const apiData = await (0, _api.requestCardsByRace)(cardRace);
  const cardsByRace = new Map();
  apiData.forEach(cardData => cardsByRace.set(cardData.cardId, new _Card.default(cardData)));

  _DeckBuilder.default.setCardsByRace(cardRace, cardsByRace);
}

async function getCardsBySet(cardSet) {
  const localCardsBySet = _DeckBuilder.default.getCardsBySet(cardSet);

  if (localCardsBySet) {
    return localCardsBySet;
  }

  const apiData = await (0, _api.requestCardsBySet)(cardSet);
  const cardsBySet = new Map();
  apiData.forEach(cardData => cardsBySet.set(cardData.cardId, new _Card.default(cardData)));

  _DeckBuilder.default.setCardsBySet(cardSet, cardsBySet);
}

async function getCardsByQuality(cardQuality) {
  const localCardsByQuality = _DeckBuilder.default.getCardsByQuality(cardQuality);

  if (localCardsByQuality) {
    return localCardsByQuality;
  }

  const apiData = await (0, _api.requestCardsByQuality)(cardQuality);
  const cardsByQuality = new Map();
  apiData.forEach(cardData => cardsByQuality.set(cardData.cardId, new _Card.default(cardData)));

  _DeckBuilder.default.setCardsByQuality(cardQuality, cardsByQuality);
}

async function getCardsByFaction(cardFaction) {
  const localCardsByFaction = _DeckBuilder.default.getCardsByFaction(cardFaction);

  if (localCardsByFaction) {
    return localCardsByFaction;
  }

  const apiData = await (0, _api.requestCardsByFaction)(cardFaction);
  const cardsByFaction = new Map();
  apiData.forEach(cardData => cardsByFaction.set(cardData.cardId, new _Card.default(cardData)));

  _DeckBuilder.default.setCardsByFaction(cardFaction, cardsByFaction);
}

async function getCardsBySelector(event) {
  const {
    name,
    value
  } = event.target;
  const getCardsMethod = ACTION_BY_SELECTOR_NAME[name];
  getCardsMethod(value);
}
},{"../Classes/DeckBuilder":"PEC3/Classes/DeckBuilder.js","../Classes/Card":"PEC3/Classes/Card.js","../api":"PEC3/api.js"}],"PEC3/utils/renderManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSelector = createSelector;
exports.createImage = createImage;
exports.saveCardToDeck = saveCardToDeck;

var _DeckBuilder = _interopRequireDefault(require("../Classes/DeckBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSelector(selector, options) {
  const selectEl = document.createElement('select');
  selectEl.name = selector;
  selectEl.className = 'select-css';
  selectEl.appendChild(createSelectorOption(`All ${selector}`));
  options.forEach(option => {
    selectEl.appendChild(createSelectorOption(option));
  });
  return selectEl;
}

function createSelectorOption(option) {
  const optionEl = document.createElement('option');
  const optionText = document.createTextNode(option);
  optionEl.value = option;
  optionEl.appendChild(optionText);
  return optionEl;
}

function createImage(card) {
  const imgEl = document.createElement('img');
  imgEl.src = card.img;
  imgEl.alt = `Imagen de la carta ${card.name}`;
  imgEl.title = card.id;

  imgEl.onerror = () => imgEl.src = "http://www.josepserra.com/web/uoc/nocard.png";

  return imgEl;
}

function saveCardToDeck(cardId) {
  const clickedCard = _DeckBuilder.default.getCardsById(cardId);

  const ulStats = document.querySelector('#hearthStone_cardSummaryStats');
  const ulDeck = document.querySelector('#hearthStone_deckBuilderCards');

  if (!_DeckBuilder.default.deck.includes(clickedCard)) {
    _DeckBuilder.default.deck.push(clickedCard);

    const liEl = document.createElement('li');
    const liText = document.createTextNode(clickedCard.name);
    liEl.appendChild(liText);
    ulDeck.appendChild(liEl);
  }

  ulDeck.addEventListener("click", event => {
    ulDeck.removeChild(event.target);

    _DeckBuilder.default.deck.pop(_DeckBuilder.default.deck.filter(card => {
      card.name == event.target.innerText;
    }));

    while (ulStats.firstChild) {
      ulStats.firstChild.remove();
    }
  });
  ulDeck.addEventListener("mouseover", event => {
    const mouseOverCard = _DeckBuilder.default.deck.filter(card => card.name == event.target.innerText);

    const fieldsToShow = (({
      id,
      name,
      set,
      type,
      cost,
      text,
      playerClass
    }) => ({
      id,
      name,
      set,
      type,
      cost,
      text,
      playerClass
    }))(mouseOverCard[0]);

    for (var key in fieldsToShow) {
      console.log(key + fieldsToShow[key]);
      var value = fieldsToShow[key];
      const liEl = document.createElement('li');
      const liText = document.createTextNode(`${key}: ${value}`);
      liEl.appendChild(liText);
      ulStats.appendChild(liEl);
    }
  });
  ulDeck.addEventListener("mouseout", () => {
    while (ulStats.firstChild) {
      ulStats.firstChild.remove();
    }

    console.log(ulStats);
  });
}
},{"../Classes/DeckBuilder":"PEC3/Classes/DeckBuilder.js"}],"PEC3/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _initDeckBuilder = _interopRequireDefault(require("./utils/initDeckBuilder"));

var _getCards = require("./utils/getCards");

var _DeckBuilder = _interopRequireDefault(require("./Classes/DeckBuilder"));

var _renderManager = require("./utils/renderManager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PLAYER_CLASS = 'Hunter';
const CARD_ID = 'DRGA_BOSS_38p';

async function init() {
  await (0, _initDeckBuilder.default)(); //await getCardsByClass(PLAYER_CLASS);
  //await getCardsByFaction(FACTION);
  // Date cuenta de que todos los datos presentados por consola se hace localmene
  // Una vez solicitados los datos a la API todas las consultas son a DeckBuilderSingleton
  // Cuando el usuario solicite datos consultaremos si existen en local antes de ir a la API
  //Generación de selectores

  const sidebarSelectors = document.querySelector('#hearthStone_sidebarSelectors');
  const infoSelect = Object.keys(_DeckBuilder.default.info);
  infoSelect.forEach(selector => {
    sidebarSelectors.appendChild((0, _renderManager.createSelector)(selector, _DeckBuilder.default.info[selector]));
  });
  sidebarSelectors.addEventListener('change', _getCards.getCardsBySelector); //Generación de imagenes

  /*const cardSelector = document.querySelector('#hearthStone_cardSelector');
  const cards = DeckBuilderSingleton.cards.all;
  cards.forEach(card => {
    cardSelector.appendChild(createImage(card));
  })
  
  cardSelector.addEventListener("click", (event) => {
     saveCardToDeck(event.target.title);
  } )
  */

  console.log('%cSelectores: ', 'color: #ccc; font-size: small'); //console.dir(DeckBuilderSingleton.info);

  console.log(`%cResultado de getCardsByClass(${PLAYER_CLASS}):`, 'color: #ccc; font-size: small'); //console.dir(DeckBuilderSingleton.getCardsByClass(PLAYER_CLASS));

  console.log(`%cResultado de getCardById(${CARD_ID}):`, 'color: #ccc; font-size: small'); //console.dir(DeckBuilderSingleton.getCardsById(CARD_ID));

  console.log(_DeckBuilder.default._cards);
}
},{"./utils/initDeckBuilder":"PEC3/utils/initDeckBuilder.js","./utils/getCards":"PEC3/utils/getCards.js","./Classes/DeckBuilder":"PEC3/Classes/DeckBuilder.js","./utils/renderManager":"PEC3/utils/renderManager.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _PEC = _interopRequireDefault(require("./PEC3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('Bienvenidos a JS para programadores');
(0, _PEC.default)();
},{"./PEC3":"PEC3/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53290" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/PEC3.e31bb0bc.js.map