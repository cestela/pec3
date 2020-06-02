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
})({"PEC2/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ENDPOINT_CARD_ID = exports.ENDPOINT_CLASSES = exports.ENDPOINT_INFO = void 0;
const BASE_URI = 'https://omgvamp-hearthstone-v1.p.rapidapi.com';
const INFO = '/info';
const CARDS = '/cards';
const CLASSES = '/classes';
const ENDPOINT_INFO = BASE_URI + INFO;
exports.ENDPOINT_INFO = ENDPOINT_INFO;
const ENDPOINT_CLASSES = BASE_URI + CARDS + CLASSES + '/';
exports.ENDPOINT_CLASSES = ENDPOINT_CLASSES;
const ENDPOINT_CARD_ID = BASE_URI + CARDS + '/';
exports.ENDPOINT_CARD_ID = ENDPOINT_CARD_ID;
},{}],"PEC2/utils/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEndpoint = getEndpoint;
exports.getInfo = getInfo;
exports.getCardsByClass = getCardsByClass;

var _config = require("../config.js");

const headers = new Headers();
headers.append('x-rapidapi-host', 'omgvamp-hearthstone-v1.p.rapidapi.com');
headers.append('x-rapidapi-key', 'b3e1d58ff3msh830486f923b551ep16cc60jsnadd6090c0935');
const clasesConsultadas = [];

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

async function getInfo() {
  const apiData = await getEndpoint(_config.ENDPOINT_INFO);
  return apiData;
}

async function getCardsByClass(clase) {
  if (!clasesConsultadas.includes(clase)) {
    const apiData = await getEndpoint(_config.ENDPOINT_CLASSES + clase);
    clasesConsultadas.push(clase);
    return apiData;
  }

  return [];
}
},{"../config.js":"PEC2/config.js"}],"PEC2/classes/DeckBuilder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class DeckBuilder {
  constructor(data) {
    const {
      classes,
      factions,
      qualities,
      races,
      sets,
      types
    } = data;
    this.classes = classes;
    this.sets = sets;
    this.types = types;
    this.factions = factions;
    this.qualities = qualities;
    this.races = races; // this.mazo = [];

    this.cards = [];
  } // PEC 3
  // insertarCartaMazo(carta){
  //   if(this.mazo.length < 1 || this.mazo == undefined || this.mazo.some(card => card.cardId !== carta.cardId)){
  //       this.mazo.push(carta)
  //       console.log("Carta insertada.")
  //       console.log(this.mazo);
  //     }
  // }
  // eliminarCartaMazo(carta){
  //   if(this.mazo.some(card => card.cardId === carta.cardId) && this.mazo.length >= 1){
  //     let index = this.mazo.indexOf(carta);
  //     if (index > -1){
  //       this.mazo.splice(index, 1);
  //       console.log("Carta eliminada.")
  //     console.log(this.mazo);
  //     }
  // }
  // }


  getCardById(cardId) {
    try {
      let resultado = this.cards.filter(card => card.getCardId() == cardId);

      if (resultado.length > 0) {
        return this.cards.filter(card => card.getCardId() == cardId);
      } else {
        throw new Error(`Carta con id '${cardId}' no encontrada`);
      }
    } catch (e) {
      console.error(e);
    }
  }

}

exports.default = DeckBuilder;
},{}],"PEC2/classes/Card.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Card {
  constructor(data) {
    const {
      cardId,
      dbfId,
      name,
      cardSet,
      type,
      faction,
      rarity,
      cost,
      attack,
      health,
      durability,
      armor,
      text,
      inPlayText,
      flavor,
      artist,
      collectible,
      elite,
      race,
      playerClass,
      multiClassGroup,
      classes,
      howToGet,
      howToGetGold,
      imgGold,
      locale,
      mechanics
    } = data;
    this.cardId = cardId;
    this.dbfId = dbfId;
    this.playerClass = playerClass;
    this.faction = faction;
    this.flavor = flavor;
    this.rarity = rarity;
    this.cost = cost;
    this.attack = attack;
    this.durability = durability;
    this.armor = armor;
    this.inPlayText = inPlayText;
    this.artist = artist;
    this.collectible = collectible;
    this.elite = elite;
    this.race = race;
    this.multiClassGroup = multiClassGroup;
    this.classes = classes;
    this.howToGet = howToGet;
    this.howToGetGold = howToGetGold;
    this.mechanics = mechanics;
    this.name = name;
    this.cardSet = cardSet;
    this.type = type;
    this.health = health;
    this.text = text;
    this.imgGold = imgGold;
    this.locale = locale;
    this.img = `https://art.hearthstonejson.com/v1/render/latest/${this.locale}/512x/${this.cardId}.png`;
  }

  getCardId() {
    return this.cardId;
  }

}

exports.default = Card;
},{}],"PEC2/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _api = require("./utils/api.js");

var _DeckBuilder = _interopRequireDefault(require("./classes/DeckBuilder"));

var _Card = _interopRequireDefault(require("./classes/Card.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function init() {
  console.log("Saludos desde la PEC2"); //Deckbuilder

  const info = await (0, _api.getInfo)();
  const deckBuilder = new _DeckBuilder.default(info);
  console.log("DeckBuilder:");
  console.log(deckBuilder); //Cartas por clase

  const cardsByClass = await (0, _api.getCardsByClass)('Hunter');
  cardsByClass.forEach(element => deckBuilder.cards.push(new _Card.default(element)));
  console.log("Conjunto de cartas obtenido a través de getCardsByClass('Hunter'):");
  console.table(deckBuilder.cards); //Carta por Id

  const firstCard = deckBuilder.cards[0].getCardId();
  console.log(`Carta individual obtenida a través de getCardById('${firstCard}'):`);
  console.log(deckBuilder.getCardById(firstCard)); //Llamada API (endpoint de cartas individuales):
  // let cardById = await getCardById(deckBuilder.cards[0].getCardId());
  // let card = processCards(cardById);
  // console.log("Resultado de carta consultada por ID:")
  // console.table(card)
} //extra PEC3
//  deckBuilder.insertarCartaMazo(card);
//  deckBuilder.insertarCartaMazo(deckBuilder.cards[1]);
//  deckBuilder.eliminarCartaMazo(card);
//  deckBuilder.insertarCartaMazo(deckBuilder.cards[1]);
},{"./utils/api.js":"PEC2/utils/api.js","./classes/DeckBuilder":"PEC2/classes/DeckBuilder.js","./classes/Card.js":"PEC2/classes/Card.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _PEC = _interopRequireDefault(require("./PEC2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('Bienvenidos a JS para programadores');
(0, _PEC.default)();
},{"./PEC2":"PEC2/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64778" + '/');

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
//# sourceMappingURL=/PEC2.e31bb0bc.js.map