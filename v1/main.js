(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/core-js/es7/reflect.js":
/*!*********************************************!*\
  !*** ./node_modules/core-js/es7/reflect.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es7.reflect.define-metadata */ "./node_modules/core-js/modules/es7.reflect.define-metadata.js");
__webpack_require__(/*! ../modules/es7.reflect.delete-metadata */ "./node_modules/core-js/modules/es7.reflect.delete-metadata.js");
__webpack_require__(/*! ../modules/es7.reflect.get-metadata */ "./node_modules/core-js/modules/es7.reflect.get-metadata.js");
__webpack_require__(/*! ../modules/es7.reflect.get-metadata-keys */ "./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js");
__webpack_require__(/*! ../modules/es7.reflect.get-own-metadata */ "./node_modules/core-js/modules/es7.reflect.get-own-metadata.js");
__webpack_require__(/*! ../modules/es7.reflect.get-own-metadata-keys */ "./node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js");
__webpack_require__(/*! ../modules/es7.reflect.has-metadata */ "./node_modules/core-js/modules/es7.reflect.has-metadata.js");
__webpack_require__(/*! ../modules/es7.reflect.has-own-metadata */ "./node_modules/core-js/modules/es7.reflect.has-own-metadata.js");
__webpack_require__(/*! ../modules/es7.reflect.metadata */ "./node_modules/core-js/modules/es7.reflect.metadata.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/core-js/modules/_core.js").Reflect;


/***/ }),

/***/ "./node_modules/core-js/modules/_a-function.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_an-instance.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_an-instance.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_an-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-from-iterable.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-from-iterable.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-includes.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-methods.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-methods.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var asc = __webpack_require__(/*! ./_array-species-create */ "./node_modules/core-js/modules/_array-species-create.js");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-species-constructor.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-constructor.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/modules/_is-array.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-species-create.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-create.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ "./node_modules/core-js/modules/_array-species-constructor.js");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_classof.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_classof.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_cof.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_collection-strong.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-strong.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var redefineAll = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");
var $iterDefine = __webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/modules/_iter-define.js");
var step = __webpack_require__(/*! ./_iter-step */ "./node_modules/core-js/modules/_iter-step.js");
var setSpecies = __webpack_require__(/*! ./_set-species */ "./node_modules/core-js/modules/_set-species.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var fastKey = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").fastKey;
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_collection-weak.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-weak.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js");
var getWeak = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").getWeak;
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");
var createArrayMethod = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js");
var $has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),

/***/ "./node_modules/core-js/modules/_collection.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_collection.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var redefineAll = __webpack_require__(/*! ./_redefine-all */ "./node_modules/core-js/modules/_redefine-all.js");
var meta = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/core-js/modules/_for-of.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/core-js/modules/_an-instance.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var $iterDetect = __webpack_require__(/*! ./_iter-detect */ "./node_modules/core-js/modules/_iter-detect.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ "./node_modules/core-js/modules/_inherit-if-required.js");

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_core.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_ctx.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_defined.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_descriptors.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_dom-create.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/modules/_enum-bug-keys.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "./node_modules/core-js/modules/_export.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "./node_modules/core-js/modules/_fails.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_for-of.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_for-of.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var call = __webpack_require__(/*! ./_iter-call */ "./node_modules/core-js/modules/_iter-call.js");
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "./node_modules/core-js/modules/_is-array-iter.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/core-js/modules/core.get-iterator-method.js");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "./node_modules/core-js/modules/_global.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_has.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_hide.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_html.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "./node_modules/core-js/modules/_ie8-dom-define.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_inherit-if-required.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_inherit-if-required.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var setPrototypeOf = __webpack_require__(/*! ./_set-proto */ "./node_modules/core-js/modules/_set-proto.js").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iobject.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-array-iter.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array-iter.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-array.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-call.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-call.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-create.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-create.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var descriptor = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(IteratorPrototype, __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-define.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-define.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var $iterCreate = __webpack_require__(/*! ./_iter-create */ "./node_modules/core-js/modules/_iter-create.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-detect.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-detect.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-step.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-step.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iterators.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iterators.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/modules/_library.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/modules/_meta.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_meta.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('meta');
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var setDesc = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "./node_modules/core-js/modules/_metadata.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_metadata.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(/*! ./es6.map */ "./node_modules/core-js/modules/es6.map.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(/*! ./es6.weak-map */ "./node_modules/core-js/modules/es6.weak-map.js"))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-assign.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-assign.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-create.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var dPs = __webpack_require__(/*! ./_object-dps */ "./node_modules/core-js/modules/_object-dps.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ "./node_modules/core-js/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dps.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopd.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gops.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gops.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gpo.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys-internal.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-pie.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/modules/_property-desc.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_redefine-all.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine-all.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_redefine.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var SRC = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "./node_modules/core-js/modules/_set-proto.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_set-proto.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js")(Function.call, __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-species.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_set-species.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-to-string-tag.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared-key.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('keys');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js") ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/modules/_to-absolute-index.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-integer.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-iobject.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-length.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-primitive.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/modules/_uid.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_validate-collection.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_validate-collection.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_wks.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('wks');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var Symbol = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "./node_modules/core-js/modules/core.get-iterator-method.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/core.get-iterator-method.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/modules/_classof.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
module.exports = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "./node_modules/core-js/modules/es6.map.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.map.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ "./node_modules/core-js/modules/_collection-strong.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(/*! ./_collection */ "./node_modules/core-js/modules/_collection.js")(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.set.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.set.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ "./node_modules/core-js/modules/_collection-strong.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(/*! ./_collection */ "./node_modules/core-js/modules/_collection.js")(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),

/***/ "./node_modules/core-js/modules/es6.weak-map.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.weak-map.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(/*! ./_array-methods */ "./node_modules/core-js/modules/_array-methods.js")(0);
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var meta = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js");
var assign = __webpack_require__(/*! ./_object-assign */ "./node_modules/core-js/modules/_object-assign.js");
var weak = __webpack_require__(/*! ./_collection-weak */ "./node_modules/core-js/modules/_collection-weak.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var validate = __webpack_require__(/*! ./_validate-collection */ "./node_modules/core-js/modules/_validate-collection.js");
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(/*! ./_collection */ "./node_modules/core-js/modules/_collection.js")(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.define-metadata.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.define-metadata.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.delete-metadata.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.delete-metadata.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(/*! ./es6.set */ "./node_modules/core-js/modules/es6.set.js");
var from = __webpack_require__(/*! ./_array-from-iterable */ "./node_modules/core-js/modules/_array-from-iterable.js");
var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.get-metadata.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.get-own-metadata.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.has-metadata.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-metadata.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.has-own-metadata.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-own-metadata.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),

/***/ "./node_modules/core-js/modules/es7.reflect.metadata.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.metadata.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(/*! ./_metadata */ "./node_modules/core-js/modules/_metadata.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),

/***/ "./node_modules/zone.js/dist/zone.js":
/*!*******************************************!*\
  !*** ./node_modules/zone.js/dist/zone.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
* @license
* Copyright Google Inc. All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
(function (global, factory) {
	 true ? factory() :
	undefined;
}(this, (function () { 'use strict';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Zone$1 = (function (global) {
    var FUNCTION = 'function';
    var performance = global['performance'];
    function mark(name) {
        performance && performance['mark'] && performance['mark'](name);
    }
    function performanceMeasure(name, label) {
        performance && performance['measure'] && performance['measure'](name, label);
    }
    mark('Zone');
    if (global['Zone']) {
        throw new Error('Zone already loaded.');
    }
    var Zone = /** @class */ (function () {
        function Zone(parent, zoneSpec) {
            this._properties = null;
            this._parent = parent;
            this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';
            this._properties = zoneSpec && zoneSpec.properties || {};
            this._zoneDelegate =
                new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
        }
        Zone.assertZonePatched = function () {
            if (global['Promise'] !== patches['ZoneAwarePromise']) {
                throw new Error('Zone.js has detected that ZoneAwarePromise `(window|global).Promise` ' +
                    'has been overwritten.\n' +
                    'Most likely cause is that a Promise polyfill has been loaded ' +
                    'after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. ' +
                    'If you must load one, do so before loading zone.js.)');
            }
        };
        Object.defineProperty(Zone, "root", {
            get: function () {
                var zone = Zone.current;
                while (zone.parent) {
                    zone = zone.parent;
                }
                return zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone, "current", {
            get: function () {
                return _currentZoneFrame.zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone, "currentTask", {
            get: function () {
                return _currentTask;
            },
            enumerable: true,
            configurable: true
        });
        Zone.__load_patch = function (name, fn) {
            if (patches.hasOwnProperty(name)) {
                throw Error('Already loaded patch: ' + name);
            }
            else if (!global['__Zone_disable_' + name]) {
                var perfName = 'Zone:' + name;
                mark(perfName);
                patches[name] = fn(global, Zone, _api);
                performanceMeasure(perfName, perfName);
            }
        };
        Object.defineProperty(Zone.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Zone.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Zone.prototype.get = function (key) {
            var zone = this.getZoneWith(key);
            if (zone)
                return zone._properties[key];
        };
        Zone.prototype.getZoneWith = function (key) {
            var current = this;
            while (current) {
                if (current._properties.hasOwnProperty(key)) {
                    return current;
                }
                current = current._parent;
            }
            return null;
        };
        Zone.prototype.fork = function (zoneSpec) {
            if (!zoneSpec)
                throw new Error('ZoneSpec required!');
            return this._zoneDelegate.fork(this, zoneSpec);
        };
        Zone.prototype.wrap = function (callback, source) {
            if (typeof callback !== FUNCTION) {
                throw new Error('Expecting function got: ' + callback);
            }
            var _callback = this._zoneDelegate.intercept(this, callback, source);
            var zone = this;
            return function () {
                return zone.runGuarded(_callback, this, arguments, source);
            };
        };
        Zone.prototype.run = function (callback, applyThis, applyArgs, source) {
            if (applyThis === void 0) { applyThis = undefined; }
            if (applyArgs === void 0) { applyArgs = null; }
            if (source === void 0) { source = null; }
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        };
        Zone.prototype.runGuarded = function (callback, applyThis, applyArgs, source) {
            if (applyThis === void 0) { applyThis = null; }
            if (applyArgs === void 0) { applyArgs = null; }
            if (source === void 0) { source = null; }
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                try {
                    return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                _currentZoneFrame = _currentZoneFrame.parent;
            }
        };
        Zone.prototype.runTask = function (task, applyThis, applyArgs) {
            if (task.zone != this) {
                throw new Error('A task can only be run in the zone of creation! (Creation: ' +
                    (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
            }
            // https://github.com/angular/zone.js/issues/778, sometimes eventTask
            // will run in notScheduled(canceled) state, we should not try to
            // run such kind of task but just return
            // we have to define an variable here, if not
            // typescript compiler will complain below
            var isNotScheduled = task.state === notScheduled;
            if (isNotScheduled && task.type === eventTask) {
                return;
            }
            var reEntryGuard = task.state != running;
            reEntryGuard && task._transitionTo(running, scheduled);
            task.runCount++;
            var previousTask = _currentTask;
            _currentTask = task;
            _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
            try {
                if (task.type == macroTask && task.data && !task.data.isPeriodic) {
                    task.cancelFn = null;
                }
                try {
                    return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
                }
                catch (error) {
                    if (this._zoneDelegate.handleError(this, error)) {
                        throw error;
                    }
                }
            }
            finally {
                // if the task's state is notScheduled or unknown, then it has already been cancelled
                // we should not reset the state to scheduled
                if (task.state !== notScheduled && task.state !== unknown) {
                    if (task.type == eventTask || (task.data && task.data.isPeriodic)) {
                        reEntryGuard && task._transitionTo(scheduled, running);
                    }
                    else {
                        task.runCount = 0;
                        this._updateTaskCount(task, -1);
                        reEntryGuard &&
                            task._transitionTo(notScheduled, running, notScheduled);
                    }
                }
                _currentZoneFrame = _currentZoneFrame.parent;
                _currentTask = previousTask;
            }
        };
        Zone.prototype.scheduleTask = function (task) {
            if (task.zone && task.zone !== this) {
                // check if the task was rescheduled, the newZone
                // should not be the children of the original zone
                var newZone = this;
                while (newZone) {
                    if (newZone === task.zone) {
                        throw Error("can not reschedule task to " + this
                            .name + " which is descendants of the original zone " + task.zone.name);
                    }
                    newZone = newZone.parent;
                }
            }
            task._transitionTo(scheduling, notScheduled);
            var zoneDelegates = [];
            task._zoneDelegates = zoneDelegates;
            task._zone = this;
            try {
                task = this._zoneDelegate.scheduleTask(this, task);
            }
            catch (err) {
                // should set task's state to unknown when scheduleTask throw error
                // because the err may from reschedule, so the fromState maybe notScheduled
                task._transitionTo(unknown, scheduling, notScheduled);
                // TODO: @JiaLiPassion, should we check the result from handleError?
                this._zoneDelegate.handleError(this, err);
                throw err;
            }
            if (task._zoneDelegates === zoneDelegates) {
                // we have to check because internally the delegate can reschedule the task.
                this._updateTaskCount(task, 1);
            }
            if (task.state == scheduling) {
                task._transitionTo(scheduled, scheduling);
            }
            return task;
        };
        Zone.prototype.scheduleMicroTask = function (source, callback, data, customSchedule) {
            return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, null));
        };
        Zone.prototype.scheduleMacroTask = function (source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.scheduleEventTask = function (source, callback, data, customSchedule, customCancel) {
            return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
        };
        Zone.prototype.cancelTask = function (task) {
            if (task.zone != this)
                throw new Error('A task can only be cancelled in the zone of creation! (Creation: ' +
                    (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
            task._transitionTo(canceling, scheduled, running);
            try {
                this._zoneDelegate.cancelTask(this, task);
            }
            catch (err) {
                // if error occurs when cancelTask, transit the state to unknown
                task._transitionTo(unknown, canceling);
                this._zoneDelegate.handleError(this, err);
                throw err;
            }
            this._updateTaskCount(task, -1);
            task._transitionTo(notScheduled, canceling);
            task.runCount = 0;
            return task;
        };
        Zone.prototype._updateTaskCount = function (task, count) {
            var zoneDelegates = task._zoneDelegates;
            if (count == -1) {
                task._zoneDelegates = null;
            }
            for (var i = 0; i < zoneDelegates.length; i++) {
                zoneDelegates[i]._updateTaskCount(task.type, count);
            }
        };
        Zone.__symbol__ = __symbol__;
        return Zone;
    }());
    var DELEGATE_ZS = {
        name: '',
        onHasTask: function (delegate, _, target, hasTaskState) {
            return delegate.hasTask(target, hasTaskState);
        },
        onScheduleTask: function (delegate, _, target, task) {
            return delegate.scheduleTask(target, task);
        },
        onInvokeTask: function (delegate, _, target, task, applyThis, applyArgs) { return delegate.invokeTask(target, task, applyThis, applyArgs); },
        onCancelTask: function (delegate, _, target, task) {
            return delegate.cancelTask(target, task);
        }
    };
    var ZoneDelegate = /** @class */ (function () {
        function ZoneDelegate(zone, parentDelegate, zoneSpec) {
            this._taskCounts = { 'microTask': 0, 'macroTask': 0, 'eventTask': 0 };
            this.zone = zone;
            this._parentDelegate = parentDelegate;
            this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
            this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
            this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate.zone);
            this._interceptZS =
                zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
            this._interceptDlgt =
                zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
            this._interceptCurrZone =
                zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate.zone);
            this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
            this._invokeDlgt =
                zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
            this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate.zone);
            this._handleErrorZS =
                zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
            this._handleErrorDlgt =
                zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
            this._handleErrorCurrZone =
                zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate.zone);
            this._scheduleTaskZS =
                zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
            this._scheduleTaskDlgt =
                zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
            this._scheduleTaskCurrZone =
                zoneSpec && (zoneSpec.onScheduleTask ? this.zone : parentDelegate.zone);
            this._invokeTaskZS =
                zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
            this._invokeTaskDlgt =
                zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
            this._invokeTaskCurrZone =
                zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate.zone);
            this._cancelTaskZS =
                zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
            this._cancelTaskDlgt =
                zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
            this._cancelTaskCurrZone =
                zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate.zone);
            this._hasTaskZS = null;
            this._hasTaskDlgt = null;
            this._hasTaskDlgtOwner = null;
            this._hasTaskCurrZone = null;
            var zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
            var parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
            if (zoneSpecHasTask || parentHasTask) {
                // If we need to report hasTask, than this ZS needs to do ref counting on tasks. In such
                // a case all task related interceptors must go through this ZD. We can't short circuit it.
                this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
                this._hasTaskDlgt = parentDelegate;
                this._hasTaskDlgtOwner = this;
                this._hasTaskCurrZone = zone;
                if (!zoneSpec.onScheduleTask) {
                    this._scheduleTaskZS = DELEGATE_ZS;
                    this._scheduleTaskDlgt = parentDelegate;
                    this._scheduleTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onInvokeTask) {
                    this._invokeTaskZS = DELEGATE_ZS;
                    this._invokeTaskDlgt = parentDelegate;
                    this._invokeTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onCancelTask) {
                    this._cancelTaskZS = DELEGATE_ZS;
                    this._cancelTaskDlgt = parentDelegate;
                    this._cancelTaskCurrZone = this.zone;
                }
            }
        }
        ZoneDelegate.prototype.fork = function (targetZone, zoneSpec) {
            return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) :
                new Zone(targetZone, zoneSpec);
        };
        ZoneDelegate.prototype.intercept = function (targetZone, callback, source) {
            return this._interceptZS ?
                this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) :
                callback;
        };
        ZoneDelegate.prototype.invoke = function (targetZone, callback, applyThis, applyArgs, source) {
            return this._invokeZS ?
                this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) :
                callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.handleError = function (targetZone, error) {
            return this._handleErrorZS ?
                this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) :
                true;
        };
        ZoneDelegate.prototype.scheduleTask = function (targetZone, task) {
            var returnTask = task;
            if (this._scheduleTaskZS) {
                if (this._hasTaskZS) {
                    returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
                }
                returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
                if (!returnTask)
                    returnTask = task;
            }
            else {
                if (task.scheduleFn) {
                    task.scheduleFn(task);
                }
                else if (task.type == microTask) {
                    scheduleMicroTask(task);
                }
                else {
                    throw new Error('Task is missing scheduleFn.');
                }
            }
            return returnTask;
        };
        ZoneDelegate.prototype.invokeTask = function (targetZone, task, applyThis, applyArgs) {
            return this._invokeTaskZS ?
                this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) :
                task.callback.apply(applyThis, applyArgs);
        };
        ZoneDelegate.prototype.cancelTask = function (targetZone, task) {
            var value;
            if (this._cancelTaskZS) {
                value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
            }
            else {
                if (!task.cancelFn) {
                    throw Error('Task is not cancelable');
                }
                value = task.cancelFn(task);
            }
            return value;
        };
        ZoneDelegate.prototype.hasTask = function (targetZone, isEmpty) {
            // hasTask should not throw error so other ZoneDelegate
            // can still trigger hasTask callback
            try {
                return this._hasTaskZS &&
                    this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
            }
            catch (err) {
                this.handleError(targetZone, err);
            }
        };
        ZoneDelegate.prototype._updateTaskCount = function (type, count) {
            var counts = this._taskCounts;
            var prev = counts[type];
            var next = counts[type] = prev + count;
            if (next < 0) {
                throw new Error('More tasks executed then were scheduled.');
            }
            if (prev == 0 || next == 0) {
                var isEmpty = {
                    microTask: counts['microTask'] > 0,
                    macroTask: counts['macroTask'] > 0,
                    eventTask: counts['eventTask'] > 0,
                    change: type
                };
                this.hasTask(this.zone, isEmpty);
            }
        };
        return ZoneDelegate;
    }());
    var ZoneTask = /** @class */ (function () {
        function ZoneTask(type, source, callback, options, scheduleFn, cancelFn) {
            this._zone = null;
            this.runCount = 0;
            this._zoneDelegates = null;
            this._state = 'notScheduled';
            this.type = type;
            this.source = source;
            this.data = options;
            this.scheduleFn = scheduleFn;
            this.cancelFn = cancelFn;
            this.callback = callback;
            var self = this;
            // TODO: @JiaLiPassion options should have interface
            if (type === eventTask && options && options.useG) {
                this.invoke = ZoneTask.invokeTask;
            }
            else {
                this.invoke = function () {
                    return ZoneTask.invokeTask.call(global, self, this, arguments);
                };
            }
        }
        ZoneTask.invokeTask = function (task, target, args) {
            if (!task) {
                task = this;
            }
            _numberOfNestedTaskFrames++;
            try {
                task.runCount++;
                return task.zone.runTask(task, target, args);
            }
            finally {
                if (_numberOfNestedTaskFrames == 1) {
                    drainMicroTaskQueue();
                }
                _numberOfNestedTaskFrames--;
            }
        };
        Object.defineProperty(ZoneTask.prototype, "zone", {
            get: function () {
                return this._zone;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ZoneTask.prototype, "state", {
            get: function () {
                return this._state;
            },
            enumerable: true,
            configurable: true
        });
        ZoneTask.prototype.cancelScheduleRequest = function () {
            this._transitionTo(notScheduled, scheduling);
        };
        ZoneTask.prototype._transitionTo = function (toState, fromState1, fromState2) {
            if (this._state === fromState1 || this._state === fromState2) {
                this._state = toState;
                if (toState == notScheduled) {
                    this._zoneDelegates = null;
                }
            }
            else {
                throw new Error(this.type + " '" + this.source + "': can not transition to '" + toState + "', expecting state '" + fromState1 + "'" + (fromState2 ?
                    ' or \'' + fromState2 + '\'' :
                    '') + ", was '" + this._state + "'.");
            }
        };
        ZoneTask.prototype.toString = function () {
            if (this.data && typeof this.data.handleId !== 'undefined') {
                return this.data.handleId;
            }
            else {
                return Object.prototype.toString.call(this);
            }
        };
        // add toJSON method to prevent cyclic error when
        // call JSON.stringify(zoneTask)
        ZoneTask.prototype.toJSON = function () {
            return {
                type: this.type,
                state: this.state,
                source: this.source,
                zone: this.zone.name,
                runCount: this.runCount
            };
        };
        return ZoneTask;
    }());
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    ///  MICROTASK QUEUE
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    var symbolSetTimeout = __symbol__('setTimeout');
    var symbolPromise = __symbol__('Promise');
    var symbolThen = __symbol__('then');
    var _microTaskQueue = [];
    var _isDrainingMicrotaskQueue = false;
    var nativeMicroTaskQueuePromise;
    function scheduleMicroTask(task) {
        // if we are not running in any task, and there has not been anything scheduled
        // we must bootstrap the initial task creation by manually scheduling the drain
        if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
            // We are not running in Task, so we need to kickstart the microtask queue.
            if (!nativeMicroTaskQueuePromise) {
                if (global[symbolPromise]) {
                    nativeMicroTaskQueuePromise = global[symbolPromise].resolve(0);
                }
            }
            if (nativeMicroTaskQueuePromise) {
                nativeMicroTaskQueuePromise[symbolThen](drainMicroTaskQueue);
            }
            else {
                global[symbolSetTimeout](drainMicroTaskQueue, 0);
            }
        }
        task && _microTaskQueue.push(task);
    }
    function drainMicroTaskQueue() {
        if (!_isDrainingMicrotaskQueue) {
            _isDrainingMicrotaskQueue = true;
            while (_microTaskQueue.length) {
                var queue = _microTaskQueue;
                _microTaskQueue = [];
                for (var i = 0; i < queue.length; i++) {
                    var task = queue[i];
                    try {
                        task.zone.runTask(task, null, null);
                    }
                    catch (error) {
                        _api.onUnhandledError(error);
                    }
                }
            }
            _api.microtaskDrainDone();
            _isDrainingMicrotaskQueue = false;
        }
    }
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    ///  BOOTSTRAP
    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    var NO_ZONE = { name: 'NO ZONE' };
    var notScheduled = 'notScheduled', scheduling = 'scheduling', scheduled = 'scheduled', running = 'running', canceling = 'canceling', unknown = 'unknown';
    var microTask = 'microTask', macroTask = 'macroTask', eventTask = 'eventTask';
    var patches = {};
    var _api = {
        symbol: __symbol__,
        currentZoneFrame: function () { return _currentZoneFrame; },
        onUnhandledError: noop,
        microtaskDrainDone: noop,
        scheduleMicroTask: scheduleMicroTask,
        showUncaughtError: function () { return !Zone[__symbol__('ignoreConsoleErrorUncaughtError')]; },
        patchEventTarget: function () { return []; },
        patchOnProperties: noop,
        patchMethod: function () { return noop; },
        bindArguments: function () { return null; },
        setNativePromise: function (NativePromise) {
            // sometimes NativePromise.resolve static function
            // is not ready yet, (such as core-js/es6.promise)
            // so we need to check here.
            if (NativePromise && typeof NativePromise.resolve === FUNCTION) {
                nativeMicroTaskQueuePromise = NativePromise.resolve(0);
            }
        },
    };
    var _currentZoneFrame = { parent: null, zone: new Zone(null, null) };
    var _currentTask = null;
    var _numberOfNestedTaskFrames = 0;
    function noop() { }
    function __symbol__(name) {
        return '__zone_symbol__' + name;
    }
    performanceMeasure('Zone', 'Zone');
    return global['Zone'] = Zone;
})(typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || global);

Zone.__load_patch('ZoneAwarePromise', function (global, Zone, api) {
    var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var ObjectDefineProperty = Object.defineProperty;
    function readableObjectToString(obj) {
        if (obj && obj.toString === Object.prototype.toString) {
            var className = obj.constructor && obj.constructor.name;
            return (className ? className : '') + ': ' + JSON.stringify(obj);
        }
        return obj ? obj.toString() : Object.prototype.toString.call(obj);
    }
    var __symbol__ = api.symbol;
    var _uncaughtPromiseErrors = [];
    var symbolPromise = __symbol__('Promise');
    var symbolThen = __symbol__('then');
    var creationTrace = '__creationTrace__';
    api.onUnhandledError = function (e) {
        if (api.showUncaughtError()) {
            var rejection = e && e.rejection;
            if (rejection) {
                console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
            }
            else {
                console.error(e);
            }
        }
    };
    api.microtaskDrainDone = function () {
        while (_uncaughtPromiseErrors.length) {
            var _loop_1 = function () {
                var uncaughtPromiseError = _uncaughtPromiseErrors.shift();
                try {
                    uncaughtPromiseError.zone.runGuarded(function () {
                        throw uncaughtPromiseError;
                    });
                }
                catch (error) {
                    handleUnhandledRejection(error);
                }
            };
            while (_uncaughtPromiseErrors.length) {
                _loop_1();
            }
        }
    };
    var UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL = __symbol__('unhandledPromiseRejectionHandler');
    function handleUnhandledRejection(e) {
        api.onUnhandledError(e);
        try {
            var handler = Zone[UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL];
            if (handler && typeof handler === 'function') {
                handler.call(this, e);
            }
        }
        catch (err) {
        }
    }
    function isThenable(value) {
        return value && value.then;
    }
    function forwardResolution(value) {
        return value;
    }
    function forwardRejection(rejection) {
        return ZoneAwarePromise.reject(rejection);
    }
    var symbolState = __symbol__('state');
    var symbolValue = __symbol__('value');
    var symbolFinally = __symbol__('finally');
    var symbolParentPromiseValue = __symbol__('parentPromiseValue');
    var symbolParentPromiseState = __symbol__('parentPromiseState');
    var source = 'Promise.then';
    var UNRESOLVED = null;
    var RESOLVED = true;
    var REJECTED = false;
    var REJECTED_NO_CATCH = 0;
    function makeResolver(promise, state) {
        return function (v) {
            try {
                resolvePromise(promise, state, v);
            }
            catch (err) {
                resolvePromise(promise, false, err);
            }
            // Do not return value or you will break the Promise spec.
        };
    }
    var once = function () {
        var wasCalled = false;
        return function wrapper(wrappedFunction) {
            return function () {
                if (wasCalled) {
                    return;
                }
                wasCalled = true;
                wrappedFunction.apply(null, arguments);
            };
        };
    };
    var TYPE_ERROR = 'Promise resolved with itself';
    var CURRENT_TASK_TRACE_SYMBOL = __symbol__('currentTaskTrace');
    // Promise Resolution
    function resolvePromise(promise, state, value) {
        var onceWrapper = once();
        if (promise === value) {
            throw new TypeError(TYPE_ERROR);
        }
        if (promise[symbolState] === UNRESOLVED) {
            // should only get value.then once based on promise spec.
            var then = null;
            try {
                if (typeof value === 'object' || typeof value === 'function') {
                    then = value && value.then;
                }
            }
            catch (err) {
                onceWrapper(function () {
                    resolvePromise(promise, false, err);
                })();
                return promise;
            }
            // if (value instanceof ZoneAwarePromise) {
            if (state !== REJECTED && value instanceof ZoneAwarePromise &&
                value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) &&
                value[symbolState] !== UNRESOLVED) {
                clearRejectedNoCatch(value);
                resolvePromise(promise, value[symbolState], value[symbolValue]);
            }
            else if (state !== REJECTED && typeof then === 'function') {
                try {
                    then.call(value, onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false)));
                }
                catch (err) {
                    onceWrapper(function () {
                        resolvePromise(promise, false, err);
                    })();
                }
            }
            else {
                promise[symbolState] = state;
                var queue = promise[symbolValue];
                promise[symbolValue] = value;
                if (promise[symbolFinally] === symbolFinally) {
                    // the promise is generated by Promise.prototype.finally          
                    if (state === RESOLVED) {
                        // the state is resolved, should ignore the value
                        // and use parent promise value
                        promise[symbolState] = promise[symbolParentPromiseState];
                        promise[symbolValue] = promise[symbolParentPromiseValue];
                    }
                }
                // record task information in value when error occurs, so we can
                // do some additional work such as render longStackTrace
                if (state === REJECTED && value instanceof Error) {
                    // check if longStackTraceZone is here
                    var trace = Zone.currentTask && Zone.currentTask.data &&
                        Zone.currentTask.data[creationTrace];
                    if (trace) {
                        // only keep the long stack trace into error when in longStackTraceZone
                        ObjectDefineProperty(value, CURRENT_TASK_TRACE_SYMBOL, { configurable: true, enumerable: false, writable: true, value: trace });
                    }
                }
                for (var i = 0; i < queue.length;) {
                    scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
                }
                if (queue.length == 0 && state == REJECTED) {
                    promise[symbolState] = REJECTED_NO_CATCH;
                    try {
                        // try to print more readable error log
                        throw new Error('Uncaught (in promise): ' + readableObjectToString(value) +
                            (value && value.stack ? '\n' + value.stack : ''));
                    }
                    catch (err) {
                        var error_1 = err;
                        error_1.rejection = value;
                        error_1.promise = promise;
                        error_1.zone = Zone.current;
                        error_1.task = Zone.currentTask;
                        _uncaughtPromiseErrors.push(error_1);
                        api.scheduleMicroTask(); // to make sure that it is running
                    }
                }
            }
        }
        // Resolving an already resolved promise is a noop.
        return promise;
    }
    var REJECTION_HANDLED_HANDLER = __symbol__('rejectionHandledHandler');
    function clearRejectedNoCatch(promise) {
        if (promise[symbolState] === REJECTED_NO_CATCH) {
            // if the promise is rejected no catch status
            // and queue.length > 0, means there is a error handler
            // here to handle the rejected promise, we should trigger
            // windows.rejectionhandled eventHandler or nodejs rejectionHandled
            // eventHandler
            try {
                var handler = Zone[REJECTION_HANDLED_HANDLER];
                if (handler && typeof handler === 'function') {
                    handler.call(this, { rejection: promise[symbolValue], promise: promise });
                }
            }
            catch (err) {
            }
            promise[symbolState] = REJECTED;
            for (var i = 0; i < _uncaughtPromiseErrors.length; i++) {
                if (promise === _uncaughtPromiseErrors[i].promise) {
                    _uncaughtPromiseErrors.splice(i, 1);
                }
            }
        }
    }
    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
        clearRejectedNoCatch(promise);
        var promiseState = promise[symbolState];
        var delegate = promiseState ?
            (typeof onFulfilled === 'function') ? onFulfilled : forwardResolution :
            (typeof onRejected === 'function') ? onRejected : forwardRejection;
        zone.scheduleMicroTask(source, function () {
            try {
                var parentPromiseValue = promise[symbolValue];
                var isFinallyPromise = chainPromise && symbolFinally === chainPromise[symbolFinally];
                if (isFinallyPromise) {
                    // if the promise is generated from finally call, keep parent promise's state and value
                    chainPromise[symbolParentPromiseValue] = parentPromiseValue;
                    chainPromise[symbolParentPromiseState] = promiseState;
                }
                // should not pass value to finally callback
                var value = zone.run(delegate, undefined, isFinallyPromise && delegate !== forwardRejection && delegate !== forwardResolution ? [] : [parentPromiseValue]);
                resolvePromise(chainPromise, true, value);
            }
            catch (error) {
                // if error occurs, should always return this error
                resolvePromise(chainPromise, false, error);
            }
        }, chainPromise);
    }
    var ZONE_AWARE_PROMISE_TO_STRING = 'function ZoneAwarePromise() { [native code] }';
    var ZoneAwarePromise = /** @class */ (function () {
        function ZoneAwarePromise(executor) {
            var promise = this;
            if (!(promise instanceof ZoneAwarePromise)) {
                throw new Error('Must be an instanceof Promise.');
            }
            promise[symbolState] = UNRESOLVED;
            promise[symbolValue] = []; // queue;
            try {
                executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
            }
            catch (error) {
                resolvePromise(promise, false, error);
            }
        }
        ZoneAwarePromise.toString = function () {
            return ZONE_AWARE_PROMISE_TO_STRING;
        };
        ZoneAwarePromise.resolve = function (value) {
            return resolvePromise(new this(null), RESOLVED, value);
        };
        ZoneAwarePromise.reject = function (error) {
            return resolvePromise(new this(null), REJECTED, error);
        };
        ZoneAwarePromise.race = function (values) {
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                resolve = res;
                reject = rej;
            });
            function onResolve(value) {
                promise && (promise = null || resolve(value));
            }
            function onReject(error) {
                promise && (promise = null || reject(error));
            }
            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                var value = values_1[_i];
                if (!isThenable(value)) {
                    value = this.resolve(value);
                }
                value.then(onResolve, onReject);
            }
            return promise;
        };
        ZoneAwarePromise.all = function (values) {
            var resolve;
            var reject;
            var promise = new this(function (res, rej) {
                resolve = res;
                reject = rej;
            });
            var count = 0;
            var resolvedValues = [];
            for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
                var value = values_2[_i];
                if (!isThenable(value)) {
                    value = this.resolve(value);
                }
                value.then((function (index) { return function (value) {
                    resolvedValues[index] = value;
                    count--;
                    if (!count) {
                        resolve(resolvedValues);
                    }
                }; })(count), reject);
                count++;
            }
            if (!count)
                resolve(resolvedValues);
            return promise;
        };
        ZoneAwarePromise.prototype.then = function (onFulfilled, onRejected) {
            var chainPromise = new this.constructor(null);
            var zone = Zone.current;
            if (this[symbolState] == UNRESOLVED) {
                this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
            }
            else {
                scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
            }
            return chainPromise;
        };
        ZoneAwarePromise.prototype.catch = function (onRejected) {
            return this.then(null, onRejected);
        };
        ZoneAwarePromise.prototype.finally = function (onFinally) {
            var chainPromise = new this.constructor(null);
            chainPromise[symbolFinally] = symbolFinally;
            var zone = Zone.current;
            if (this[symbolState] == UNRESOLVED) {
                this[symbolValue].push(zone, chainPromise, onFinally, onFinally);
            }
            else {
                scheduleResolveOrReject(this, zone, chainPromise, onFinally, onFinally);
            }
            return chainPromise;
        };
        return ZoneAwarePromise;
    }());
    // Protect against aggressive optimizers dropping seemingly unused properties.
    // E.g. Closure Compiler in advanced mode.
    ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;
    ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;
    ZoneAwarePromise['race'] = ZoneAwarePromise.race;
    ZoneAwarePromise['all'] = ZoneAwarePromise.all;
    var NativePromise = global[symbolPromise] = global['Promise'];
    var ZONE_AWARE_PROMISE = Zone.__symbol__('ZoneAwarePromise');
    var desc = ObjectGetOwnPropertyDescriptor(global, 'Promise');
    if (!desc || desc.configurable) {
        desc && delete desc.writable;
        desc && delete desc.value;
        if (!desc) {
            desc = { configurable: true, enumerable: true };
        }
        desc.get = function () {
            // if we already set ZoneAwarePromise, use patched one
            // otherwise return native one.
            return global[ZONE_AWARE_PROMISE] ? global[ZONE_AWARE_PROMISE] : global[symbolPromise];
        };
        desc.set = function (NewNativePromise) {
            if (NewNativePromise === ZoneAwarePromise) {
                // if the NewNativePromise is ZoneAwarePromise
                // save to global
                global[ZONE_AWARE_PROMISE] = NewNativePromise;
            }
            else {
                // if the NewNativePromise is not ZoneAwarePromise
                // for example: after load zone.js, some library just
                // set es6-promise to global, if we set it to global
                // directly, assertZonePatched will fail and angular
                // will not loaded, so we just set the NewNativePromise
                // to global[symbolPromise], so the result is just like
                // we load ES6 Promise before zone.js
                global[symbolPromise] = NewNativePromise;
                if (!NewNativePromise.prototype[symbolThen]) {
                    patchThen(NewNativePromise);
                }
                api.setNativePromise(NewNativePromise);
            }
        };
        ObjectDefineProperty(global, 'Promise', desc);
    }
    global['Promise'] = ZoneAwarePromise;
    var symbolThenPatched = __symbol__('thenPatched');
    function patchThen(Ctor) {
        var proto = Ctor.prototype;
        var prop = ObjectGetOwnPropertyDescriptor(proto, 'then');
        if (prop && (prop.writable === false || !prop.configurable)) {
            // check Ctor.prototype.then propertyDescriptor is writable or not
            // in meteor env, writable is false, we should ignore such case
            return;
        }
        var originalThen = proto.then;
        // Keep a reference to the original method.
        proto[symbolThen] = originalThen;
        Ctor.prototype.then = function (onResolve, onReject) {
            var _this = this;
            var wrapped = new ZoneAwarePromise(function (resolve, reject) {
                originalThen.call(_this, resolve, reject);
            });
            return wrapped.then(onResolve, onReject);
        };
        Ctor[symbolThenPatched] = true;
    }
    function zoneify(fn) {
        return function () {
            var resultPromise = fn.apply(this, arguments);
            if (resultPromise instanceof ZoneAwarePromise) {
                return resultPromise;
            }
            var ctor = resultPromise.constructor;
            if (!ctor[symbolThenPatched]) {
                patchThen(ctor);
            }
            return resultPromise;
        };
    }
    if (NativePromise) {
        patchThen(NativePromise);
        var fetch_1 = global['fetch'];
        if (typeof fetch_1 == 'function') {
            global['fetch'] = zoneify(fetch_1);
        }
    }
    // This is not part of public API, but it is useful for tests, so we expose it.
    Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
    return ZoneAwarePromise;
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Suppress closure compiler errors about unknown 'Zone' variable
 * @fileoverview
 * @suppress {undefinedVars,globalThis,missingRequire}
 */
// issue #989, to reduce bundle size, use short name
/** Object.getOwnPropertyDescriptor */
var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
/** Object.defineProperty */
var ObjectDefineProperty = Object.defineProperty;
/** Object.getPrototypeOf */
var ObjectGetPrototypeOf = Object.getPrototypeOf;
/** Object.create */
var ObjectCreate = Object.create;
/** Array.prototype.slice */
var ArraySlice = Array.prototype.slice;
/** addEventListener string const */
var ADD_EVENT_LISTENER_STR = 'addEventListener';
/** removeEventListener string const */
var REMOVE_EVENT_LISTENER_STR = 'removeEventListener';
/** zoneSymbol addEventListener */
var ZONE_SYMBOL_ADD_EVENT_LISTENER = Zone.__symbol__(ADD_EVENT_LISTENER_STR);
/** zoneSymbol removeEventListener */
var ZONE_SYMBOL_REMOVE_EVENT_LISTENER = Zone.__symbol__(REMOVE_EVENT_LISTENER_STR);
/** true string const */
var TRUE_STR = 'true';
/** false string const */
var FALSE_STR = 'false';
/** __zone_symbol__ string const */
var ZONE_SYMBOL_PREFIX = '__zone_symbol__';
function wrapWithCurrentZone(callback, source) {
    return Zone.current.wrap(callback, source);
}
function scheduleMacroTaskWithCurrentZone(source, callback, data, customSchedule, customCancel) {
    return Zone.current.scheduleMacroTask(source, callback, data, customSchedule, customCancel);
}
var zoneSymbol = Zone.__symbol__;
var isWindowExists = typeof window !== 'undefined';
var internalWindow = isWindowExists ? window : undefined;
var _global = isWindowExists && internalWindow || typeof self === 'object' && self || global;
var REMOVE_ATTRIBUTE = 'removeAttribute';
var NULL_ON_PROP_VALUE = [null];
function bindArguments(args, source) {
    for (var i = args.length - 1; i >= 0; i--) {
        if (typeof args[i] === 'function') {
            args[i] = wrapWithCurrentZone(args[i], source + '_' + i);
        }
    }
    return args;
}
function patchPrototype(prototype, fnNames) {
    var source = prototype.constructor['name'];
    var _loop_1 = function (i) {
        var name_1 = fnNames[i];
        var delegate = prototype[name_1];
        if (delegate) {
            var prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, name_1);
            if (!isPropertyWritable(prototypeDesc)) {
                return "continue";
            }
            prototype[name_1] = (function (delegate) {
                var patched = function () {
                    return delegate.apply(this, bindArguments(arguments, source + '.' + name_1));
                };
                attachOriginToPatched(patched, delegate);
                return patched;
            })(delegate);
        }
    };
    for (var i = 0; i < fnNames.length; i++) {
        _loop_1(i);
    }
}
function isPropertyWritable(propertyDesc) {
    if (!propertyDesc) {
        return true;
    }
    if (propertyDesc.writable === false) {
        return false;
    }
    return !(typeof propertyDesc.get === 'function' && typeof propertyDesc.set === 'undefined');
}
var isWebWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);
// Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
// this code.
var isNode = (!('nw' in _global) && typeof _global.process !== 'undefined' &&
    {}.toString.call(_global.process) === '[object process]');
var isBrowser = !isNode && !isWebWorker && !!(isWindowExists && internalWindow['HTMLElement']);
// we are in electron of nw, so we are both browser and nodejs
// Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
// this code.
var isMix = typeof _global.process !== 'undefined' &&
    {}.toString.call(_global.process) === '[object process]' && !isWebWorker &&
    !!(isWindowExists && internalWindow['HTMLElement']);
var zoneSymbolEventNames = {};
var wrapFn = function (event) {
    // https://github.com/angular/zone.js/issues/911, in IE, sometimes
    // event will be undefined, so we need to use window.event
    event = event || _global.event;
    if (!event) {
        return;
    }
    var eventNameSymbol = zoneSymbolEventNames[event.type];
    if (!eventNameSymbol) {
        eventNameSymbol = zoneSymbolEventNames[event.type] = zoneSymbol('ON_PROPERTY' + event.type);
    }
    var target = this || event.target || _global;
    var listener = target[eventNameSymbol];
    var result = listener && listener.apply(this, arguments);
    if (result != undefined && !result) {
        event.preventDefault();
    }
    return result;
};
function patchProperty(obj, prop, prototype) {
    var desc = ObjectGetOwnPropertyDescriptor(obj, prop);
    if (!desc && prototype) {
        // when patch window object, use prototype to check prop exist or not
        var prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, prop);
        if (prototypeDesc) {
            desc = { enumerable: true, configurable: true };
        }
    }
    // if the descriptor not exists or is not configurable
    // just return
    if (!desc || !desc.configurable) {
        return;
    }
    // A property descriptor cannot have getter/setter and be writable
    // deleting the writable and value properties avoids this error:
    //
    // TypeError: property descriptors must not specify a value or be writable when a
    // getter or setter has been specified
    delete desc.writable;
    delete desc.value;
    var originalDescGet = desc.get;
    var originalDescSet = desc.set;
    // substr(2) cuz 'onclick' -> 'click', etc
    var eventName = prop.substr(2);
    var eventNameSymbol = zoneSymbolEventNames[eventName];
    if (!eventNameSymbol) {
        eventNameSymbol = zoneSymbolEventNames[eventName] = zoneSymbol('ON_PROPERTY' + eventName);
    }
    desc.set = function (newValue) {
        // in some of windows's onproperty callback, this is undefined
        // so we need to check it
        var target = this;
        if (!target && obj === _global) {
            target = _global;
        }
        if (!target) {
            return;
        }
        var previousValue = target[eventNameSymbol];
        if (previousValue) {
            target.removeEventListener(eventName, wrapFn);
        }
        // issue #978, when onload handler was added before loading zone.js
        // we should remove it with originalDescSet
        if (originalDescSet) {
            originalDescSet.apply(target, NULL_ON_PROP_VALUE);
        }
        if (typeof newValue === 'function') {
            target[eventNameSymbol] = newValue;
            target.addEventListener(eventName, wrapFn, false);
        }
        else {
            target[eventNameSymbol] = null;
        }
    };
    // The getter would return undefined for unassigned properties but the default value of an
    // unassigned property is null
    desc.get = function () {
        // in some of windows's onproperty callback, this is undefined
        // so we need to check it
        var target = this;
        if (!target && obj === _global) {
            target = _global;
        }
        if (!target) {
            return null;
        }
        var listener = target[eventNameSymbol];
        if (listener) {
            return listener;
        }
        else if (originalDescGet) {
            // result will be null when use inline event attribute,
            // such as <button onclick="func();">OK</button>
            // because the onclick function is internal raw uncompiled handler
            // the onclick will be evaluated when first time event was triggered or
            // the property is accessed, https://github.com/angular/zone.js/issues/525
            // so we should use original native get to retrieve the handler
            var value = originalDescGet && originalDescGet.call(this);
            if (value) {
                desc.set.call(this, value);
                if (typeof target[REMOVE_ATTRIBUTE] === 'function') {
                    target.removeAttribute(prop);
                }
                return value;
            }
        }
        return null;
    };
    ObjectDefineProperty(obj, prop, desc);
}
function patchOnProperties(obj, properties, prototype) {
    if (properties) {
        for (var i = 0; i < properties.length; i++) {
            patchProperty(obj, 'on' + properties[i], prototype);
        }
    }
    else {
        var onProperties = [];
        for (var prop in obj) {
            if (prop.substr(0, 2) == 'on') {
                onProperties.push(prop);
            }
        }
        for (var j = 0; j < onProperties.length; j++) {
            patchProperty(obj, onProperties[j], prototype);
        }
    }
}
var originalInstanceKey = zoneSymbol('originalInstance');
// wrap some native API on `window`
function patchClass(className) {
    var OriginalClass = _global[className];
    if (!OriginalClass)
        return;
    // keep original class in global
    _global[zoneSymbol(className)] = OriginalClass;
    _global[className] = function () {
        var a = bindArguments(arguments, className);
        switch (a.length) {
            case 0:
                this[originalInstanceKey] = new OriginalClass();
                break;
            case 1:
                this[originalInstanceKey] = new OriginalClass(a[0]);
                break;
            case 2:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
                break;
            case 3:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
                break;
            case 4:
                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
                break;
            default:
                throw new Error('Arg list too long.');
        }
    };
    // attach original delegate to patched function
    attachOriginToPatched(_global[className], OriginalClass);
    var instance = new OriginalClass(function () { });
    var prop;
    for (prop in instance) {
        // https://bugs.webkit.org/show_bug.cgi?id=44721
        if (className === 'XMLHttpRequest' && prop === 'responseBlob')
            continue;
        (function (prop) {
            if (typeof instance[prop] === 'function') {
                _global[className].prototype[prop] = function () {
                    return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
                };
            }
            else {
                ObjectDefineProperty(_global[className].prototype, prop, {
                    set: function (fn) {
                        if (typeof fn === 'function') {
                            this[originalInstanceKey][prop] = wrapWithCurrentZone(fn, className + '.' + prop);
                            // keep callback in wrapped function so we can
                            // use it in Function.prototype.toString to return
                            // the native one.
                            attachOriginToPatched(this[originalInstanceKey][prop], fn);
                        }
                        else {
                            this[originalInstanceKey][prop] = fn;
                        }
                    },
                    get: function () {
                        return this[originalInstanceKey][prop];
                    }
                });
            }
        }(prop));
    }
    for (prop in OriginalClass) {
        if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {
            _global[className][prop] = OriginalClass[prop];
        }
    }
}
function patchMethod(target, name, patchFn) {
    var proto = target;
    while (proto && !proto.hasOwnProperty(name)) {
        proto = ObjectGetPrototypeOf(proto);
    }
    if (!proto && target[name]) {
        // somehow we did not find it, but we can see it. This happens on IE for Window properties.
        proto = target;
    }
    var delegateName = zoneSymbol(name);
    var delegate;
    if (proto && !(delegate = proto[delegateName])) {
        delegate = proto[delegateName] = proto[name];
        // check whether proto[name] is writable
        // some property is readonly in safari, such as HtmlCanvasElement.prototype.toBlob
        var desc = proto && ObjectGetOwnPropertyDescriptor(proto, name);
        if (isPropertyWritable(desc)) {
            var patchDelegate_1 = patchFn(delegate, delegateName, name);
            proto[name] = function () {
                return patchDelegate_1(this, arguments);
            };
            attachOriginToPatched(proto[name], delegate);
        }
    }
    return delegate;
}
// TODO: @JiaLiPassion, support cancel task later if necessary
function patchMacroTask(obj, funcName, metaCreator) {
    var setNative = null;
    function scheduleTask(task) {
        var data = task.data;
        data.args[data.cbIdx] = function () {
            task.invoke.apply(this, arguments);
        };
        setNative.apply(data.target, data.args);
        return task;
    }
    setNative = patchMethod(obj, funcName, function (delegate) { return function (self, args) {
        var meta = metaCreator(self, args);
        if (meta.cbIdx >= 0 && typeof args[meta.cbIdx] === 'function') {
            return scheduleMacroTaskWithCurrentZone(meta.name, args[meta.cbIdx], meta, scheduleTask, null);
        }
        else {
            // cause an error by calling it directly.
            return delegate.apply(self, args);
        }
    }; });
}

function attachOriginToPatched(patched, original) {
    patched[zoneSymbol('OriginalDelegate')] = original;
}
var isDetectedIEOrEdge = false;
var ieOrEdge = false;
function isIEOrEdge() {
    if (isDetectedIEOrEdge) {
        return ieOrEdge;
    }
    isDetectedIEOrEdge = true;
    try {
        var ua = internalWindow.navigator.userAgent;
        if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1 || ua.indexOf('Edge/') !== -1) {
            ieOrEdge = true;
        }
        return ieOrEdge;
    }
    catch (error) {
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// override Function.prototype.toString to make zone.js patched function
// look like native function
Zone.__load_patch('toString', function (global) {
    // patch Func.prototype.toString to let them look like native
    var originalFunctionToString = Function.prototype.toString;
    var ORIGINAL_DELEGATE_SYMBOL = zoneSymbol('OriginalDelegate');
    var PROMISE_SYMBOL = zoneSymbol('Promise');
    var ERROR_SYMBOL = zoneSymbol('Error');
    var newFunctionToString = function toString() {
        if (typeof this === 'function') {
            var originalDelegate = this[ORIGINAL_DELEGATE_SYMBOL];
            if (originalDelegate) {
                if (typeof originalDelegate === 'function') {
                    return originalFunctionToString.apply(this[ORIGINAL_DELEGATE_SYMBOL], arguments);
                }
                else {
                    return Object.prototype.toString.call(originalDelegate);
                }
            }
            if (this === Promise) {
                var nativePromise = global[PROMISE_SYMBOL];
                if (nativePromise) {
                    return originalFunctionToString.apply(nativePromise, arguments);
                }
            }
            if (this === Error) {
                var nativeError = global[ERROR_SYMBOL];
                if (nativeError) {
                    return originalFunctionToString.apply(nativeError, arguments);
                }
            }
        }
        return originalFunctionToString.apply(this, arguments);
    };
    newFunctionToString[ORIGINAL_DELEGATE_SYMBOL] = originalFunctionToString;
    Function.prototype.toString = newFunctionToString;
    // patch Object.prototype.toString to let them look like native
    var originalObjectToString = Object.prototype.toString;
    var PROMISE_OBJECT_TO_STRING = '[object Promise]';
    Object.prototype.toString = function () {
        if (this instanceof Promise) {
            return PROMISE_OBJECT_TO_STRING;
        }
        return originalObjectToString.apply(this, arguments);
    };
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
// an identifier to tell ZoneTask do not create a new invoke closure
var OPTIMIZED_ZONE_EVENT_TASK_DATA = {
    useG: true
};
var zoneSymbolEventNames$1 = {};
var globalSources = {};
var EVENT_NAME_SYMBOL_REGX = /^__zone_symbol__(\w+)(true|false)$/;
var IMMEDIATE_PROPAGATION_SYMBOL = ('__zone_symbol__propagationStopped');
function patchEventTarget(_global, apis, patchOptions) {
    var ADD_EVENT_LISTENER = (patchOptions && patchOptions.add) || ADD_EVENT_LISTENER_STR;
    var REMOVE_EVENT_LISTENER = (patchOptions && patchOptions.rm) || REMOVE_EVENT_LISTENER_STR;
    var LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.listeners) || 'eventListeners';
    var REMOVE_ALL_LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.rmAll) || 'removeAllListeners';
    var zoneSymbolAddEventListener = zoneSymbol(ADD_EVENT_LISTENER);
    var ADD_EVENT_LISTENER_SOURCE = '.' + ADD_EVENT_LISTENER + ':';
    var PREPEND_EVENT_LISTENER = 'prependListener';
    var PREPEND_EVENT_LISTENER_SOURCE = '.' + PREPEND_EVENT_LISTENER + ':';
    var invokeTask = function (task, target, event) {
        // for better performance, check isRemoved which is set
        // by removeEventListener
        if (task.isRemoved) {
            return;
        }
        var delegate = task.callback;
        if (typeof delegate === 'object' && delegate.handleEvent) {
            // create the bind version of handleEvent when invoke
            task.callback = function (event) { return delegate.handleEvent(event); };
            task.originalDelegate = delegate;
        }
        // invoke static task.invoke
        task.invoke(task, target, [event]);
        var options = task.options;
        if (options && typeof options === 'object' && options.once) {
            // if options.once is true, after invoke once remove listener here
            // only browser need to do this, nodejs eventEmitter will cal removeListener
            // inside EventEmitter.once
            var delegate_1 = task.originalDelegate ? task.originalDelegate : task.callback;
            target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate_1, options);
        }
    };
    // global shared zoneAwareCallback to handle all event callback with capture = false
    var globalZoneAwareCallback = function (event) {
        // https://github.com/angular/zone.js/issues/911, in IE, sometimes
        // event will be undefined, so we need to use window.event
        event = event || _global.event;
        if (!event) {
            return;
        }
        // event.target is needed for Samsung TV and SourceBuffer
        // || global is needed https://github.com/angular/zone.js/issues/190
        var target = this || event.target || _global;
        var tasks = target[zoneSymbolEventNames$1[event.type][FALSE_STR]];
        if (tasks) {
            // invoke all tasks which attached to current target with given event.type and capture = false
            // for performance concern, if task.length === 1, just invoke
            if (tasks.length === 1) {
                invokeTask(tasks[0], target, event);
            }
            else {
                // https://github.com/angular/zone.js/issues/836
                // copy the tasks array before invoke, to avoid
                // the callback will remove itself or other listener
                var copyTasks = tasks.slice();
                for (var i = 0; i < copyTasks.length; i++) {
                    if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                        break;
                    }
                    invokeTask(copyTasks[i], target, event);
                }
            }
        }
    };
    // global shared zoneAwareCallback to handle all event callback with capture = true
    var globalZoneAwareCaptureCallback = function (event) {
        // https://github.com/angular/zone.js/issues/911, in IE, sometimes
        // event will be undefined, so we need to use window.event
        event = event || _global.event;
        if (!event) {
            return;
        }
        // event.target is needed for Samsung TV and SourceBuffer
        // || global is needed https://github.com/angular/zone.js/issues/190
        var target = this || event.target || _global;
        var tasks = target[zoneSymbolEventNames$1[event.type][TRUE_STR]];
        if (tasks) {
            // invoke all tasks which attached to current target with given event.type and capture = false
            // for performance concern, if task.length === 1, just invoke
            if (tasks.length === 1) {
                invokeTask(tasks[0], target, event);
            }
            else {
                // https://github.com/angular/zone.js/issues/836
                // copy the tasks array before invoke, to avoid
                // the callback will remove itself or other listener
                var copyTasks = tasks.slice();
                for (var i = 0; i < copyTasks.length; i++) {
                    if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                        break;
                    }
                    invokeTask(copyTasks[i], target, event);
                }
            }
        }
    };
    function patchEventTargetMethods(obj, patchOptions) {
        if (!obj) {
            return false;
        }
        var useGlobalCallback = true;
        if (patchOptions && patchOptions.useG !== undefined) {
            useGlobalCallback = patchOptions.useG;
        }
        var validateHandler = patchOptions && patchOptions.vh;
        var checkDuplicate = true;
        if (patchOptions && patchOptions.chkDup !== undefined) {
            checkDuplicate = patchOptions.chkDup;
        }
        var returnTarget = false;
        if (patchOptions && patchOptions.rt !== undefined) {
            returnTarget = patchOptions.rt;
        }
        var proto = obj;
        while (proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER)) {
            proto = ObjectGetPrototypeOf(proto);
        }
        if (!proto && obj[ADD_EVENT_LISTENER]) {
            // somehow we did not find it, but we can see it. This happens on IE for Window properties.
            proto = obj;
        }
        if (!proto) {
            return false;
        }
        if (proto[zoneSymbolAddEventListener]) {
            return false;
        }
        // a shared global taskData to pass data for scheduleEventTask
        // so we do not need to create a new object just for pass some data
        var taskData = {};
        var nativeAddEventListener = proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER];
        var nativeRemoveEventListener = proto[zoneSymbol(REMOVE_EVENT_LISTENER)] =
            proto[REMOVE_EVENT_LISTENER];
        var nativeListeners = proto[zoneSymbol(LISTENERS_EVENT_LISTENER)] =
            proto[LISTENERS_EVENT_LISTENER];
        var nativeRemoveAllListeners = proto[zoneSymbol(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] =
            proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER];
        var nativePrependEventListener;
        if (patchOptions && patchOptions.prepend) {
            nativePrependEventListener = proto[zoneSymbol(patchOptions.prepend)] =
                proto[patchOptions.prepend];
        }
        var customScheduleGlobal = function () {
            // if there is already a task for the eventName + capture,
            // just return, because we use the shared globalZoneAwareCallback here.
            if (taskData.isExisting) {
                return;
            }
            return nativeAddEventListener.call(taskData.target, taskData.eventName, taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, taskData.options);
        };
        var customCancelGlobal = function (task) {
            // if task is not marked as isRemoved, this call is directly
            // from Zone.prototype.cancelTask, we should remove the task
            // from tasksList of target first
            if (!task.isRemoved) {
                var symbolEventNames = zoneSymbolEventNames$1[task.eventName];
                var symbolEventName = void 0;
                if (symbolEventNames) {
                    symbolEventName = symbolEventNames[task.capture ? TRUE_STR : FALSE_STR];
                }
                var existingTasks = symbolEventName && task.target[symbolEventName];
                if (existingTasks) {
                    for (var i = 0; i < existingTasks.length; i++) {
                        var existingTask = existingTasks[i];
                        if (existingTask === task) {
                            existingTasks.splice(i, 1);
                            // set isRemoved to data for faster invokeTask check
                            task.isRemoved = true;
                            if (existingTasks.length === 0) {
                                // all tasks for the eventName + capture have gone,
                                // remove globalZoneAwareCallback and remove the task cache from target
                                task.allRemoved = true;
                                task.target[symbolEventName] = null;
                            }
                            break;
                        }
                    }
                }
            }
            // if all tasks for the eventName + capture have gone,
            // we will really remove the global event callback,
            // if not, return
            if (!task.allRemoved) {
                return;
            }
            return nativeRemoveEventListener.call(task.target, task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, task.options);
        };
        var customScheduleNonGlobal = function (task) {
            return nativeAddEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
        };
        var customSchedulePrepend = function (task) {
            return nativePrependEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
        };
        var customCancelNonGlobal = function (task) {
            return nativeRemoveEventListener.call(task.target, task.eventName, task.invoke, task.options);
        };
        var customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal;
        var customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal;
        var compareTaskCallbackVsDelegate = function (task, delegate) {
            var typeOfDelegate = typeof delegate;
            return (typeOfDelegate === 'function' && task.callback === delegate) ||
                (typeOfDelegate === 'object' && task.originalDelegate === delegate);
        };
        var compare = (patchOptions && patchOptions.diff) ? patchOptions.diff : compareTaskCallbackVsDelegate;
        var blackListedEvents = Zone[Zone.__symbol__('BLACK_LISTED_EVENTS')];
        var makeAddListener = function (nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget, prepend) {
            if (returnTarget === void 0) { returnTarget = false; }
            if (prepend === void 0) { prepend = false; }
            return function () {
                var target = this || _global;
                var delegate = arguments[1];
                if (!delegate) {
                    return nativeListener.apply(this, arguments);
                }
                // don't create the bind delegate function for handleEvent
                // case here to improve addEventListener performance
                // we will create the bind delegate when invoke
                var isHandleEvent = false;
                if (typeof delegate !== 'function') {
                    if (!delegate.handleEvent) {
                        return nativeListener.apply(this, arguments);
                    }
                    isHandleEvent = true;
                }
                if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) {
                    return;
                }
                var eventName = arguments[0];
                var options = arguments[2];
                if (blackListedEvents) {
                    // check black list
                    for (var i = 0; i < blackListedEvents.length; i++) {
                        if (eventName === blackListedEvents[i]) {
                            return nativeListener.apply(this, arguments);
                        }
                    }
                }
                var capture;
                var once = false;
                if (options === undefined) {
                    capture = false;
                }
                else if (options === true) {
                    capture = true;
                }
                else if (options === false) {
                    capture = false;
                }
                else {
                    capture = options ? !!options.capture : false;
                    once = options ? !!options.once : false;
                }
                var zone = Zone.current;
                var symbolEventNames = zoneSymbolEventNames$1[eventName];
                var symbolEventName;
                if (!symbolEventNames) {
                    // the code is duplicate, but I just want to get some better performance
                    var falseEventName = eventName + FALSE_STR;
                    var trueEventName = eventName + TRUE_STR;
                    var symbol = ZONE_SYMBOL_PREFIX + falseEventName;
                    var symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
                    zoneSymbolEventNames$1[eventName] = {};
                    zoneSymbolEventNames$1[eventName][FALSE_STR] = symbol;
                    zoneSymbolEventNames$1[eventName][TRUE_STR] = symbolCapture;
                    symbolEventName = capture ? symbolCapture : symbol;
                }
                else {
                    symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
                }
                var existingTasks = target[symbolEventName];
                var isExisting = false;
                if (existingTasks) {
                    // already have task registered
                    isExisting = true;
                    if (checkDuplicate) {
                        for (var i = 0; i < existingTasks.length; i++) {
                            if (compare(existingTasks[i], delegate)) {
                                // same callback, same capture, same event name, just return
                                return;
                            }
                        }
                    }
                }
                else {
                    existingTasks = target[symbolEventName] = [];
                }
                var source;
                var constructorName = target.constructor['name'];
                var targetSource = globalSources[constructorName];
                if (targetSource) {
                    source = targetSource[eventName];
                }
                if (!source) {
                    source = constructorName + addSource + eventName;
                }
                // do not create a new object as task.data to pass those things
                // just use the global shared one
                taskData.options = options;
                if (once) {
                    // if addEventListener with once options, we don't pass it to
                    // native addEventListener, instead we keep the once setting
                    // and handle ourselves.
                    taskData.options.once = false;
                }
                taskData.target = target;
                taskData.capture = capture;
                taskData.eventName = eventName;
                taskData.isExisting = isExisting;
                var data = useGlobalCallback ? OPTIMIZED_ZONE_EVENT_TASK_DATA : null;
                // keep taskData into data to allow onScheduleEventTask to access the task information
                if (data) {
                    data.taskData = taskData;
                }
                var task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn);
                // should clear taskData.target to avoid memory leak
                // issue, https://github.com/angular/angular/issues/20442
                taskData.target = null;
                // need to clear up taskData because it is a global object
                if (data) {
                    data.taskData = null;
                }
                // have to save those information to task in case
                // application may call task.zone.cancelTask() directly
                if (once) {
                    options.once = true;
                }
                task.options = options;
                task.target = target;
                task.capture = capture;
                task.eventName = eventName;
                if (isHandleEvent) {
                    // save original delegate for compare to check duplicate
                    task.originalDelegate = delegate;
                }
                if (!prepend) {
                    existingTasks.push(task);
                }
                else {
                    existingTasks.unshift(task);
                }
                if (returnTarget) {
                    return target;
                }
            };
        };
        proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget);
        if (nativePrependEventListener) {
            proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, true);
        }
        proto[REMOVE_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            var options = arguments[2];
            var capture;
            if (options === undefined) {
                capture = false;
            }
            else if (options === true) {
                capture = true;
            }
            else if (options === false) {
                capture = false;
            }
            else {
                capture = options ? !!options.capture : false;
            }
            var delegate = arguments[1];
            if (!delegate) {
                return nativeRemoveEventListener.apply(this, arguments);
            }
            if (validateHandler &&
                !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) {
                return;
            }
            var symbolEventNames = zoneSymbolEventNames$1[eventName];
            var symbolEventName;
            if (symbolEventNames) {
                symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
            }
            var existingTasks = symbolEventName && target[symbolEventName];
            if (existingTasks) {
                for (var i = 0; i < existingTasks.length; i++) {
                    var existingTask = existingTasks[i];
                    if (compare(existingTask, delegate)) {
                        existingTasks.splice(i, 1);
                        // set isRemoved to data for faster invokeTask check
                        existingTask.isRemoved = true;
                        if (existingTasks.length === 0) {
                            // all tasks for the eventName + capture have gone,
                            // remove globalZoneAwareCallback and remove the task cache from target
                            existingTask.allRemoved = true;
                            target[symbolEventName] = null;
                        }
                        existingTask.zone.cancelTask(existingTask);
                        if (returnTarget) {
                            return target;
                        }
                        return;
                    }
                }
            }
            // issue 930, didn't find the event name or callback
            // from zone kept existingTasks, the callback maybe
            // added outside of zone, we need to call native removeEventListener
            // to try to remove it.
            return nativeRemoveEventListener.apply(this, arguments);
        };
        proto[LISTENERS_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            var listeners = [];
            var tasks = findEventTasks(target, eventName);
            for (var i = 0; i < tasks.length; i++) {
                var task = tasks[i];
                var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                listeners.push(delegate);
            }
            return listeners;
        };
        proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function () {
            var target = this || _global;
            var eventName = arguments[0];
            if (!eventName) {
                var keys = Object.keys(target);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var match = EVENT_NAME_SYMBOL_REGX.exec(prop);
                    var evtName = match && match[1];
                    // in nodejs EventEmitter, removeListener event is
                    // used for monitoring the removeListener call,
                    // so just keep removeListener eventListener until
                    // all other eventListeners are removed
                    if (evtName && evtName !== 'removeListener') {
                        this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, evtName);
                    }
                }
                // remove removeListener listener finally
                this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, 'removeListener');
            }
            else {
                var symbolEventNames = zoneSymbolEventNames$1[eventName];
                if (symbolEventNames) {
                    var symbolEventName = symbolEventNames[FALSE_STR];
                    var symbolCaptureEventName = symbolEventNames[TRUE_STR];
                    var tasks = target[symbolEventName];
                    var captureTasks = target[symbolCaptureEventName];
                    if (tasks) {
                        var removeTasks = tasks.slice();
                        for (var i = 0; i < removeTasks.length; i++) {
                            var task = removeTasks[i];
                            var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                            this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                        }
                    }
                    if (captureTasks) {
                        var removeTasks = captureTasks.slice();
                        for (var i = 0; i < removeTasks.length; i++) {
                            var task = removeTasks[i];
                            var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                            this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                        }
                    }
                }
            }
            if (returnTarget) {
                return this;
            }
        };
        // for native toString patch
        attachOriginToPatched(proto[ADD_EVENT_LISTENER], nativeAddEventListener);
        attachOriginToPatched(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener);
        if (nativeRemoveAllListeners) {
            attachOriginToPatched(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners);
        }
        if (nativeListeners) {
            attachOriginToPatched(proto[LISTENERS_EVENT_LISTENER], nativeListeners);
        }
        return true;
    }
    var results = [];
    for (var i = 0; i < apis.length; i++) {
        results[i] = patchEventTargetMethods(apis[i], patchOptions);
    }
    return results;
}
function findEventTasks(target, eventName) {
    var foundTasks = [];
    for (var prop in target) {
        var match = EVENT_NAME_SYMBOL_REGX.exec(prop);
        var evtName = match && match[1];
        if (evtName && (!eventName || evtName === eventName)) {
            var tasks = target[prop];
            if (tasks) {
                for (var i = 0; i < tasks.length; i++) {
                    foundTasks.push(tasks[i]);
                }
            }
        }
    }
    return foundTasks;
}
function patchEventPrototype(global, api) {
    var Event = global['Event'];
    if (Event && Event.prototype) {
        api.patchMethod(Event.prototype, 'stopImmediatePropagation', function (delegate) { return function (self, args) {
            self[IMMEDIATE_PROPAGATION_SYMBOL] = true;
            // we need to call the native stopImmediatePropagation
            // in case in some hybrid application, some part of
            // application will be controlled by zone, some are not
            delegate && delegate.apply(self, args);
        }; });
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
var taskSymbol = zoneSymbol('zoneTask');
function patchTimer(window, setName, cancelName, nameSuffix) {
    var setNative = null;
    var clearNative = null;
    setName += nameSuffix;
    cancelName += nameSuffix;
    var tasksByHandleId = {};
    function scheduleTask(task) {
        var data = task.data;
        function timer() {
            try {
                task.invoke.apply(this, arguments);
            }
            finally {
                // issue-934, task will be cancelled
                // even it is a periodic task such as
                // setInterval
                if (!(task.data && task.data.isPeriodic)) {
                    if (typeof data.handleId === 'number') {
                        // in non-nodejs env, we remove timerId
                        // from local cache
                        delete tasksByHandleId[data.handleId];
                    }
                    else if (data.handleId) {
                        // Node returns complex objects as handleIds
                        // we remove task reference from timer object
                        data.handleId[taskSymbol] = null;
                    }
                }
            }
        }
        data.args[0] = timer;
        data.handleId = setNative.apply(window, data.args);
        return task;
    }
    function clearTask(task) {
        return clearNative(task.data.handleId);
    }
    setNative =
        patchMethod(window, setName, function (delegate) { return function (self, args) {
            if (typeof args[0] === 'function') {
                var options = {
                    handleId: null,
                    isPeriodic: nameSuffix === 'Interval',
                    delay: (nameSuffix === 'Timeout' || nameSuffix === 'Interval') ? args[1] || 0 : null,
                    args: args
                };
                var task = scheduleMacroTaskWithCurrentZone(setName, args[0], options, scheduleTask, clearTask);
                if (!task) {
                    return task;
                }
                // Node.js must additionally support the ref and unref functions.
                var handle = task.data.handleId;
                if (typeof handle === 'number') {
                    // for non nodejs env, we save handleId: task
                    // mapping in local cache for clearTimeout
                    tasksByHandleId[handle] = task;
                }
                else if (handle) {
                    // for nodejs env, we save task
                    // reference in timerId Object for clearTimeout
                    handle[taskSymbol] = task;
                }
                // check whether handle is null, because some polyfill or browser
                // may return undefined from setTimeout/setInterval/setImmediate/requestAnimationFrame
                if (handle && handle.ref && handle.unref && typeof handle.ref === 'function' &&
                    typeof handle.unref === 'function') {
                    task.ref = handle.ref.bind(handle);
                    task.unref = handle.unref.bind(handle);
                }
                if (typeof handle === 'number' || handle) {
                    return handle;
                }
                return task;
            }
            else {
                // cause an error by calling it directly.
                return delegate.apply(window, args);
            }
        }; });
    clearNative =
        patchMethod(window, cancelName, function (delegate) { return function (self, args) {
            var id = args[0];
            var task;
            if (typeof id === 'number') {
                // non nodejs env.
                task = tasksByHandleId[id];
            }
            else {
                // nodejs env.
                task = id && id[taskSymbol];
                // other environments.
                if (!task) {
                    task = id;
                }
            }
            if (task && typeof task.type === 'string') {
                if (task.state !== 'notScheduled' &&
                    (task.cancelFn && task.data.isPeriodic || task.runCount === 0)) {
                    if (typeof id === 'number') {
                        delete tasksByHandleId[id];
                    }
                    else if (id) {
                        id[taskSymbol] = null;
                    }
                    // Do not cancel already canceled functions
                    task.zone.cancelTask(task);
                }
            }
            else {
                // cause an error by calling it directly.
                delegate.apply(window, args);
            }
        }; });
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/*
 * This is necessary for Chrome and Chrome mobile, to enable
 * things like redefining `createdCallback` on an element.
 */
var _defineProperty = Object[zoneSymbol('defineProperty')] = Object.defineProperty;
var _getOwnPropertyDescriptor = Object[zoneSymbol('getOwnPropertyDescriptor')] =
    Object.getOwnPropertyDescriptor;
var _create = Object.create;
var unconfigurablesKey = zoneSymbol('unconfigurables');
function propertyPatch() {
    Object.defineProperty = function (obj, prop, desc) {
        if (isUnconfigurable(obj, prop)) {
            throw new TypeError('Cannot assign to read only property \'' + prop + '\' of ' + obj);
        }
        var originalConfigurableFlag = desc.configurable;
        if (prop !== 'prototype') {
            desc = rewriteDescriptor(obj, prop, desc);
        }
        return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
    };
    Object.defineProperties = function (obj, props) {
        Object.keys(props).forEach(function (prop) {
            Object.defineProperty(obj, prop, props[prop]);
        });
        return obj;
    };
    Object.create = function (obj, proto) {
        if (typeof proto === 'object' && !Object.isFrozen(proto)) {
            Object.keys(proto).forEach(function (prop) {
                proto[prop] = rewriteDescriptor(obj, prop, proto[prop]);
            });
        }
        return _create(obj, proto);
    };
    Object.getOwnPropertyDescriptor = function (obj, prop) {
        var desc = _getOwnPropertyDescriptor(obj, prop);
        if (isUnconfigurable(obj, prop)) {
            desc.configurable = false;
        }
        return desc;
    };
}
function _redefineProperty(obj, prop, desc) {
    var originalConfigurableFlag = desc.configurable;
    desc = rewriteDescriptor(obj, prop, desc);
    return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
}
function isUnconfigurable(obj, prop) {
    return obj && obj[unconfigurablesKey] && obj[unconfigurablesKey][prop];
}
function rewriteDescriptor(obj, prop, desc) {
    // issue-927, if the desc is frozen, don't try to change the desc
    if (!Object.isFrozen(desc)) {
        desc.configurable = true;
    }
    if (!desc.configurable) {
        // issue-927, if the obj is frozen, don't try to set the desc to obj
        if (!obj[unconfigurablesKey] && !Object.isFrozen(obj)) {
            _defineProperty(obj, unconfigurablesKey, { writable: true, value: {} });
        }
        if (obj[unconfigurablesKey]) {
            obj[unconfigurablesKey][prop] = true;
        }
    }
    return desc;
}
function _tryDefineProperty(obj, prop, desc, originalConfigurableFlag) {
    try {
        return _defineProperty(obj, prop, desc);
    }
    catch (error) {
        if (desc.configurable) {
            // In case of errors, when the configurable flag was likely set by rewriteDescriptor(), let's
            // retry with the original flag value
            if (typeof originalConfigurableFlag == 'undefined') {
                delete desc.configurable;
            }
            else {
                desc.configurable = originalConfigurableFlag;
            }
            try {
                return _defineProperty(obj, prop, desc);
            }
            catch (error) {
                var descJson = null;
                try {
                    descJson = JSON.stringify(desc);
                }
                catch (error) {
                    descJson = desc.toString();
                }
                console.log("Attempting to configure '" + prop + "' with descriptor '" + descJson + "' on object '" + obj + "' and got error, giving up: " + error);
            }
        }
        else {
            throw error;
        }
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// we have to patch the instance since the proto is non-configurable
function apply(api, _global) {
    var WS = _global.WebSocket;
    // On Safari window.EventTarget doesn't exist so need to patch WS add/removeEventListener
    // On older Chrome, no need since EventTarget was already patched
    if (!_global.EventTarget) {
        patchEventTarget(_global, [WS.prototype]);
    }
    _global.WebSocket = function (x, y) {
        var socket = arguments.length > 1 ? new WS(x, y) : new WS(x);
        var proxySocket;
        var proxySocketProto;
        // Safari 7.0 has non-configurable own 'onmessage' and friends properties on the socket instance
        var onmessageDesc = ObjectGetOwnPropertyDescriptor(socket, 'onmessage');
        if (onmessageDesc && onmessageDesc.configurable === false) {
            proxySocket = ObjectCreate(socket);
            // socket have own property descriptor 'onopen', 'onmessage', 'onclose', 'onerror'
            // but proxySocket not, so we will keep socket as prototype and pass it to
            // patchOnProperties method
            proxySocketProto = socket;
            [ADD_EVENT_LISTENER_STR, REMOVE_EVENT_LISTENER_STR, 'send', 'close'].forEach(function (propName) {
                proxySocket[propName] = function () {
                    var args = ArraySlice.call(arguments);
                    if (propName === ADD_EVENT_LISTENER_STR || propName === REMOVE_EVENT_LISTENER_STR) {
                        var eventName = args.length > 0 ? args[0] : undefined;
                        if (eventName) {
                            var propertySymbol = Zone.__symbol__('ON_PROPERTY' + eventName);
                            socket[propertySymbol] = proxySocket[propertySymbol];
                        }
                    }
                    return socket[propName].apply(socket, args);
                };
            });
        }
        else {
            // we can patch the real socket
            proxySocket = socket;
        }
        patchOnProperties(proxySocket, ['close', 'error', 'message', 'open'], proxySocketProto);
        return proxySocket;
    };
    var globalWebSocket = _global['WebSocket'];
    for (var prop in WS) {
        globalWebSocket[prop] = WS[prop];
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {globalThis}
 */
var globalEventHandlersEventNames = [
    'abort',
    'animationcancel',
    'animationend',
    'animationiteration',
    'auxclick',
    'beforeinput',
    'blur',
    'cancel',
    'canplay',
    'canplaythrough',
    'change',
    'compositionstart',
    'compositionupdate',
    'compositionend',
    'cuechange',
    'click',
    'close',
    'contextmenu',
    'curechange',
    'dblclick',
    'drag',
    'dragend',
    'dragenter',
    'dragexit',
    'dragleave',
    'dragover',
    'drop',
    'durationchange',
    'emptied',
    'ended',
    'error',
    'focus',
    'focusin',
    'focusout',
    'gotpointercapture',
    'input',
    'invalid',
    'keydown',
    'keypress',
    'keyup',
    'load',
    'loadstart',
    'loadeddata',
    'loadedmetadata',
    'lostpointercapture',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'mousewheel',
    'orientationchange',
    'pause',
    'play',
    'playing',
    'pointercancel',
    'pointerdown',
    'pointerenter',
    'pointerleave',
    'pointerlockchange',
    'mozpointerlockchange',
    'webkitpointerlockerchange',
    'pointerlockerror',
    'mozpointerlockerror',
    'webkitpointerlockerror',
    'pointermove',
    'pointout',
    'pointerover',
    'pointerup',
    'progress',
    'ratechange',
    'reset',
    'resize',
    'scroll',
    'seeked',
    'seeking',
    'select',
    'selectionchange',
    'selectstart',
    'show',
    'sort',
    'stalled',
    'submit',
    'suspend',
    'timeupdate',
    'volumechange',
    'touchcancel',
    'touchmove',
    'touchstart',
    'touchend',
    'transitioncancel',
    'transitionend',
    'waiting',
    'wheel'
];
var documentEventNames = [
    'afterscriptexecute', 'beforescriptexecute', 'DOMContentLoaded', 'fullscreenchange',
    'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange', 'fullscreenerror',
    'mozfullscreenerror', 'webkitfullscreenerror', 'msfullscreenerror', 'readystatechange',
    'visibilitychange'
];
var windowEventNames = [
    'absolutedeviceorientation',
    'afterinput',
    'afterprint',
    'appinstalled',
    'beforeinstallprompt',
    'beforeprint',
    'beforeunload',
    'devicelight',
    'devicemotion',
    'deviceorientation',
    'deviceorientationabsolute',
    'deviceproximity',
    'hashchange',
    'languagechange',
    'message',
    'mozbeforepaint',
    'offline',
    'online',
    'paint',
    'pageshow',
    'pagehide',
    'popstate',
    'rejectionhandled',
    'storage',
    'unhandledrejection',
    'unload',
    'userproximity',
    'vrdisplyconnected',
    'vrdisplaydisconnected',
    'vrdisplaypresentchange'
];
var htmlElementEventNames = [
    'beforecopy', 'beforecut', 'beforepaste', 'copy', 'cut', 'paste', 'dragstart', 'loadend',
    'animationstart', 'search', 'transitionrun', 'transitionstart', 'webkitanimationend',
    'webkitanimationiteration', 'webkitanimationstart', 'webkittransitionend'
];
var mediaElementEventNames = ['encrypted', 'waitingforkey', 'msneedkey', 'mozinterruptbegin', 'mozinterruptend'];
var ieElementEventNames = [
    'activate',
    'afterupdate',
    'ariarequest',
    'beforeactivate',
    'beforedeactivate',
    'beforeeditfocus',
    'beforeupdate',
    'cellchange',
    'controlselect',
    'dataavailable',
    'datasetchanged',
    'datasetcomplete',
    'errorupdate',
    'filterchange',
    'layoutcomplete',
    'losecapture',
    'move',
    'moveend',
    'movestart',
    'propertychange',
    'resizeend',
    'resizestart',
    'rowenter',
    'rowexit',
    'rowsdelete',
    'rowsinserted',
    'command',
    'compassneedscalibration',
    'deactivate',
    'help',
    'mscontentzoom',
    'msmanipulationstatechanged',
    'msgesturechange',
    'msgesturedoubletap',
    'msgestureend',
    'msgesturehold',
    'msgesturestart',
    'msgesturetap',
    'msgotpointercapture',
    'msinertiastart',
    'mslostpointercapture',
    'mspointercancel',
    'mspointerdown',
    'mspointerenter',
    'mspointerhover',
    'mspointerleave',
    'mspointermove',
    'mspointerout',
    'mspointerover',
    'mspointerup',
    'pointerout',
    'mssitemodejumplistitemremoved',
    'msthumbnailclick',
    'stop',
    'storagecommit'
];
var webglEventNames = ['webglcontextrestored', 'webglcontextlost', 'webglcontextcreationerror'];
var formEventNames = ['autocomplete', 'autocompleteerror'];
var detailEventNames = ['toggle'];
var frameEventNames = ['load'];
var frameSetEventNames = ['blur', 'error', 'focus', 'load', 'resize', 'scroll', 'messageerror'];
var marqueeEventNames = ['bounce', 'finish', 'start'];
var XMLHttpRequestEventNames = [
    'loadstart', 'progress', 'abort', 'error', 'load', 'progress', 'timeout', 'loadend',
    'readystatechange'
];
var IDBIndexEventNames = ['upgradeneeded', 'complete', 'abort', 'success', 'error', 'blocked', 'versionchange', 'close'];
var websocketEventNames = ['close', 'error', 'open', 'message'];
var workerEventNames = ['error', 'message'];
var eventNames = globalEventHandlersEventNames.concat(webglEventNames, formEventNames, detailEventNames, documentEventNames, windowEventNames, htmlElementEventNames, ieElementEventNames);
function filterProperties(target, onProperties, ignoreProperties) {
    if (!ignoreProperties) {
        return onProperties;
    }
    var tip = ignoreProperties.filter(function (ip) { return ip.target === target; });
    if (!tip || tip.length === 0) {
        return onProperties;
    }
    var targetIgnoreProperties = tip[0].ignoreProperties;
    return onProperties.filter(function (op) { return targetIgnoreProperties.indexOf(op) === -1; });
}
function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
    // check whether target is available, sometimes target will be undefined
    // because different browser or some 3rd party plugin.
    if (!target) {
        return;
    }
    var filteredProperties = filterProperties(target, onProperties, ignoreProperties);
    patchOnProperties(target, filteredProperties, prototype);
}
function propertyDescriptorPatch(api, _global) {
    if (isNode && !isMix) {
        return;
    }
    var supportsWebSocket = typeof WebSocket !== 'undefined';
    if (canPatchViaPropertyDescriptor()) {
        var ignoreProperties = _global.__Zone_ignore_on_properties;
        // for browsers that we can patch the descriptor:  Chrome & Firefox
        if (isBrowser) {
            var internalWindow = window;
            // in IE/Edge, onProp not exist in window object, but in WindowPrototype
            // so we need to pass WindowPrototype to check onProp exist or not
            patchFilteredProperties(internalWindow, eventNames.concat(['messageerror']), ignoreProperties, ObjectGetPrototypeOf(internalWindow));
            patchFilteredProperties(Document.prototype, eventNames, ignoreProperties);
            if (typeof internalWindow['SVGElement'] !== 'undefined') {
                patchFilteredProperties(internalWindow['SVGElement'].prototype, eventNames, ignoreProperties);
            }
            patchFilteredProperties(Element.prototype, eventNames, ignoreProperties);
            patchFilteredProperties(HTMLElement.prototype, eventNames, ignoreProperties);
            patchFilteredProperties(HTMLMediaElement.prototype, mediaElementEventNames, ignoreProperties);
            patchFilteredProperties(HTMLFrameSetElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLBodyElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLFrameElement.prototype, frameEventNames, ignoreProperties);
            patchFilteredProperties(HTMLIFrameElement.prototype, frameEventNames, ignoreProperties);
            var HTMLMarqueeElement_1 = internalWindow['HTMLMarqueeElement'];
            if (HTMLMarqueeElement_1) {
                patchFilteredProperties(HTMLMarqueeElement_1.prototype, marqueeEventNames, ignoreProperties);
            }
            var Worker_1 = internalWindow['Worker'];
            if (Worker_1) {
                patchFilteredProperties(Worker_1.prototype, workerEventNames, ignoreProperties);
            }
        }
        patchFilteredProperties(XMLHttpRequest.prototype, XMLHttpRequestEventNames, ignoreProperties);
        var XMLHttpRequestEventTarget = _global['XMLHttpRequestEventTarget'];
        if (XMLHttpRequestEventTarget) {
            patchFilteredProperties(XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype, XMLHttpRequestEventNames, ignoreProperties);
        }
        if (typeof IDBIndex !== 'undefined') {
            patchFilteredProperties(IDBIndex.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBOpenDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBDatabase.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBTransaction.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBCursor.prototype, IDBIndexEventNames, ignoreProperties);
        }
        if (supportsWebSocket) {
            patchFilteredProperties(WebSocket.prototype, websocketEventNames, ignoreProperties);
        }
    }
    else {
        // Safari, Android browsers (Jelly Bean)
        patchViaCapturingAllTheEvents();
        patchClass('XMLHttpRequest');
        if (supportsWebSocket) {
            apply(api, _global);
        }
    }
}
function canPatchViaPropertyDescriptor() {
    if ((isBrowser || isMix) && !ObjectGetOwnPropertyDescriptor(HTMLElement.prototype, 'onclick') &&
        typeof Element !== 'undefined') {
        // WebKit https://bugs.webkit.org/show_bug.cgi?id=134364
        // IDL interface attributes are not configurable
        var desc = ObjectGetOwnPropertyDescriptor(Element.prototype, 'onclick');
        if (desc && !desc.configurable)
            return false;
    }
    var ON_READY_STATE_CHANGE = 'onreadystatechange';
    var XMLHttpRequestPrototype = XMLHttpRequest.prototype;
    var xhrDesc = ObjectGetOwnPropertyDescriptor(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE);
    // add enumerable and configurable here because in opera
    // by default XMLHttpRequest.prototype.onreadystatechange is undefined
    // without adding enumerable and configurable will cause onreadystatechange
    // non-configurable
    // and if XMLHttpRequest.prototype.onreadystatechange is undefined,
    // we should set a real desc instead a fake one
    if (xhrDesc) {
        ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, {
            enumerable: true,
            configurable: true,
            get: function () {
                return true;
            }
        });
        var req = new XMLHttpRequest();
        var result = !!req.onreadystatechange;
        // restore original desc
        ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, xhrDesc || {});
        return result;
    }
    else {
        var SYMBOL_FAKE_ONREADYSTATECHANGE_1 = zoneSymbol('fake');
        ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, {
            enumerable: true,
            configurable: true,
            get: function () {
                return this[SYMBOL_FAKE_ONREADYSTATECHANGE_1];
            },
            set: function (value) {
                this[SYMBOL_FAKE_ONREADYSTATECHANGE_1] = value;
            }
        });
        var req = new XMLHttpRequest();
        var detectFunc = function () { };
        req.onreadystatechange = detectFunc;
        var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
        req.onreadystatechange = null;
        return result;
    }
}
var unboundKey = zoneSymbol('unbound');
// Whenever any eventListener fires, we check the eventListener target and all parents
// for `onwhatever` properties and replace them with zone-bound functions
// - Chrome (for now)
function patchViaCapturingAllTheEvents() {
    var _loop_1 = function (i) {
        var property = eventNames[i];
        var onproperty = 'on' + property;
        self.addEventListener(property, function (event) {
            var elt = event.target, bound, source;
            if (elt) {
                source = elt.constructor['name'] + '.' + onproperty;
            }
            else {
                source = 'unknown.' + onproperty;
            }
            while (elt) {
                if (elt[onproperty] && !elt[onproperty][unboundKey]) {
                    bound = wrapWithCurrentZone(elt[onproperty], source);
                    bound[unboundKey] = elt[onproperty];
                    elt[onproperty] = bound;
                }
                elt = elt.parentElement;
            }
        }, true);
    };
    for (var i = 0; i < eventNames.length; i++) {
        _loop_1(i);
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function eventTargetPatch(_global, api) {
    var WTF_ISSUE_555 = 'Anchor,Area,Audio,BR,Base,BaseFont,Body,Button,Canvas,Content,DList,Directory,Div,Embed,FieldSet,Font,Form,Frame,FrameSet,HR,Head,Heading,Html,IFrame,Image,Input,Keygen,LI,Label,Legend,Link,Map,Marquee,Media,Menu,Meta,Meter,Mod,OList,Object,OptGroup,Option,Output,Paragraph,Pre,Progress,Quote,Script,Select,Source,Span,Style,TableCaption,TableCell,TableCol,Table,TableRow,TableSection,TextArea,Title,Track,UList,Unknown,Video';
    var NO_EVENT_TARGET = 'ApplicationCache,EventSource,FileReader,InputMethodContext,MediaController,MessagePort,Node,Performance,SVGElementInstance,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebKitNamedFlow,Window,Worker,WorkerGlobalScope,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload,IDBRequest,IDBOpenDBRequest,IDBDatabase,IDBTransaction,IDBCursor,DBIndex,WebSocket'
        .split(',');
    var EVENT_TARGET = 'EventTarget';
    var apis = [];
    var isWtf = _global['wtf'];
    var WTF_ISSUE_555_ARRAY = WTF_ISSUE_555.split(',');
    if (isWtf) {
        // Workaround for: https://github.com/google/tracing-framework/issues/555
        apis = WTF_ISSUE_555_ARRAY.map(function (v) { return 'HTML' + v + 'Element'; }).concat(NO_EVENT_TARGET);
    }
    else if (_global[EVENT_TARGET]) {
        apis.push(EVENT_TARGET);
    }
    else {
        // Note: EventTarget is not available in all browsers,
        // if it's not available, we instead patch the APIs in the IDL that inherit from EventTarget
        apis = NO_EVENT_TARGET;
    }
    var isDisableIECheck = _global['__Zone_disable_IE_check'] || false;
    var isEnableCrossContextCheck = _global['__Zone_enable_cross_context_check'] || false;
    var ieOrEdge = isIEOrEdge();
    var ADD_EVENT_LISTENER_SOURCE = '.addEventListener:';
    var FUNCTION_WRAPPER = '[object FunctionWrapper]';
    var BROWSER_TOOLS = 'function __BROWSERTOOLS_CONSOLE_SAFEFUNC() { [native code] }';
    //  predefine all __zone_symbol__ + eventName + true/false string
    for (var i = 0; i < eventNames.length; i++) {
        var eventName = eventNames[i];
        var falseEventName = eventName + FALSE_STR;
        var trueEventName = eventName + TRUE_STR;
        var symbol = ZONE_SYMBOL_PREFIX + falseEventName;
        var symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
        zoneSymbolEventNames$1[eventName] = {};
        zoneSymbolEventNames$1[eventName][FALSE_STR] = symbol;
        zoneSymbolEventNames$1[eventName][TRUE_STR] = symbolCapture;
    }
    //  predefine all task.source string
    for (var i = 0; i < WTF_ISSUE_555.length; i++) {
        var target = WTF_ISSUE_555_ARRAY[i];
        var targets = globalSources[target] = {};
        for (var j = 0; j < eventNames.length; j++) {
            var eventName = eventNames[j];
            targets[eventName] = target + ADD_EVENT_LISTENER_SOURCE + eventName;
        }
    }
    var checkIEAndCrossContext = function (nativeDelegate, delegate, target, args) {
        if (!isDisableIECheck && ieOrEdge) {
            if (isEnableCrossContextCheck) {
                try {
                    var testString = delegate.toString();
                    if ((testString === FUNCTION_WRAPPER || testString == BROWSER_TOOLS)) {
                        nativeDelegate.apply(target, args);
                        return false;
                    }
                }
                catch (error) {
                    nativeDelegate.apply(target, args);
                    return false;
                }
            }
            else {
                var testString = delegate.toString();
                if ((testString === FUNCTION_WRAPPER || testString == BROWSER_TOOLS)) {
                    nativeDelegate.apply(target, args);
                    return false;
                }
            }
        }
        else if (isEnableCrossContextCheck) {
            try {
                delegate.toString();
            }
            catch (error) {
                nativeDelegate.apply(target, args);
                return false;
            }
        }
        return true;
    };
    var apiTypes = [];
    for (var i = 0; i < apis.length; i++) {
        var type = _global[apis[i]];
        apiTypes.push(type && type.prototype);
    }
    // vh is validateHandler to check event handler
    // is valid or not(for security check)
    patchEventTarget(_global, apiTypes, { vh: checkIEAndCrossContext });
    api.patchEventTarget = patchEventTarget;
    return true;
}
function patchEvent(global, api) {
    patchEventPrototype(global, api);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function registerElementPatch(_global) {
    if ((!isBrowser && !isMix) || !('registerElement' in _global.document)) {
        return;
    }
    var _registerElement = document.registerElement;
    var callbacks = ['createdCallback', 'attachedCallback', 'detachedCallback', 'attributeChangedCallback'];
    document.registerElement = function (name, opts) {
        if (opts && opts.prototype) {
            callbacks.forEach(function (callback) {
                var source = 'Document.registerElement::' + callback;
                var prototype = opts.prototype;
                if (prototype.hasOwnProperty(callback)) {
                    var descriptor = ObjectGetOwnPropertyDescriptor(prototype, callback);
                    if (descriptor && descriptor.value) {
                        descriptor.value = wrapWithCurrentZone(descriptor.value, source);
                        _redefineProperty(opts.prototype, callback, descriptor);
                    }
                    else {
                        prototype[callback] = wrapWithCurrentZone(prototype[callback], source);
                    }
                }
                else if (prototype[callback]) {
                    prototype[callback] = wrapWithCurrentZone(prototype[callback], source);
                }
            });
        }
        return _registerElement.call(document, name, opts);
    };
    attachOriginToPatched(document.registerElement, _registerElement);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
Zone.__load_patch('util', function (global, Zone, api) {
    api.patchOnProperties = patchOnProperties;
    api.patchMethod = patchMethod;
    api.bindArguments = bindArguments;
});
Zone.__load_patch('timers', function (global) {
    var set = 'set';
    var clear = 'clear';
    patchTimer(global, set, clear, 'Timeout');
    patchTimer(global, set, clear, 'Interval');
    patchTimer(global, set, clear, 'Immediate');
});
Zone.__load_patch('requestAnimationFrame', function (global) {
    patchTimer(global, 'request', 'cancel', 'AnimationFrame');
    patchTimer(global, 'mozRequest', 'mozCancel', 'AnimationFrame');
    patchTimer(global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
});
Zone.__load_patch('blocking', function (global, Zone) {
    var blockingMethods = ['alert', 'prompt', 'confirm'];
    for (var i = 0; i < blockingMethods.length; i++) {
        var name_1 = blockingMethods[i];
        patchMethod(global, name_1, function (delegate, symbol, name) {
            return function (s, args) {
                return Zone.current.run(delegate, global, args, name);
            };
        });
    }
});
Zone.__load_patch('EventTarget', function (global, Zone, api) {
    // load blackListEvents from global
    var SYMBOL_BLACK_LISTED_EVENTS = Zone.__symbol__('BLACK_LISTED_EVENTS');
    if (global[SYMBOL_BLACK_LISTED_EVENTS]) {
        Zone[SYMBOL_BLACK_LISTED_EVENTS] = global[SYMBOL_BLACK_LISTED_EVENTS];
    }
    patchEvent(global, api);
    eventTargetPatch(global, api);
    // patch XMLHttpRequestEventTarget's addEventListener/removeEventListener
    var XMLHttpRequestEventTarget = global['XMLHttpRequestEventTarget'];
    if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
        api.patchEventTarget(global, [XMLHttpRequestEventTarget.prototype]);
    }
    patchClass('MutationObserver');
    patchClass('WebKitMutationObserver');
    patchClass('IntersectionObserver');
    patchClass('FileReader');
});
Zone.__load_patch('on_property', function (global, Zone, api) {
    propertyDescriptorPatch(api, global);
    propertyPatch();
    registerElementPatch(global);
});
Zone.__load_patch('canvas', function (global) {
    var HTMLCanvasElement = global['HTMLCanvasElement'];
    if (typeof HTMLCanvasElement !== 'undefined' && HTMLCanvasElement.prototype &&
        HTMLCanvasElement.prototype.toBlob) {
        patchMacroTask(HTMLCanvasElement.prototype, 'toBlob', function (self, args) {
            return { name: 'HTMLCanvasElement.toBlob', target: self, cbIdx: 0, args: args };
        });
    }
});
Zone.__load_patch('XHR', function (global, Zone) {
    // Treat XMLHttpRequest as a macrotask.
    patchXHR(global);
    var XHR_TASK = zoneSymbol('xhrTask');
    var XHR_SYNC = zoneSymbol('xhrSync');
    var XHR_LISTENER = zoneSymbol('xhrListener');
    var XHR_SCHEDULED = zoneSymbol('xhrScheduled');
    var XHR_URL = zoneSymbol('xhrURL');
    function patchXHR(window) {
        var XMLHttpRequestPrototype = XMLHttpRequest.prototype;
        function findPendingTask(target) {
            return target[XHR_TASK];
        }
        var oriAddListener = XMLHttpRequestPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
        var oriRemoveListener = XMLHttpRequestPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
        if (!oriAddListener) {
            var XMLHttpRequestEventTarget = window['XMLHttpRequestEventTarget'];
            if (XMLHttpRequestEventTarget) {
                var XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget.prototype;
                oriAddListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                oriRemoveListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
            }
        }
        var READY_STATE_CHANGE = 'readystatechange';
        var SCHEDULED = 'scheduled';
        function scheduleTask(task) {
            XMLHttpRequest[XHR_SCHEDULED] = false;
            var data = task.data;
            var target = data.target;
            // remove existing event listener
            var listener = target[XHR_LISTENER];
            if (!oriAddListener) {
                oriAddListener = target[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                oriRemoveListener = target[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
            }
            if (listener) {
                oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
            }
            var newListener = target[XHR_LISTENER] = function () {
                if (target.readyState === target.DONE) {
                    // sometimes on some browsers XMLHttpRequest will fire onreadystatechange with
                    // readyState=4 multiple times, so we need to check task state here
                    if (!data.aborted && XMLHttpRequest[XHR_SCHEDULED] && task.state === SCHEDULED) {
                        task.invoke();
                    }
                }
            };
            oriAddListener.call(target, READY_STATE_CHANGE, newListener);
            var storedTask = target[XHR_TASK];
            if (!storedTask) {
                target[XHR_TASK] = task;
            }
            sendNative.apply(target, data.args);
            XMLHttpRequest[XHR_SCHEDULED] = true;
            return task;
        }
        function placeholderCallback() { }
        function clearTask(task) {
            var data = task.data;
            // Note - ideally, we would call data.target.removeEventListener here, but it's too late
            // to prevent it from firing. So instead, we store info for the event listener.
            data.aborted = true;
            return abortNative.apply(data.target, data.args);
        }
        var openNative = patchMethod(XMLHttpRequestPrototype, 'open', function () { return function (self, args) {
            self[XHR_SYNC] = args[2] == false;
            self[XHR_URL] = args[1];
            return openNative.apply(self, args);
        }; });
        var XMLHTTPREQUEST_SOURCE = 'XMLHttpRequest.send';
        var sendNative = patchMethod(XMLHttpRequestPrototype, 'send', function () { return function (self, args) {
            if (self[XHR_SYNC]) {
                // if the XHR is sync there is no task to schedule, just execute the code.
                return sendNative.apply(self, args);
            }
            else {
                var options = {
                    target: self,
                    url: self[XHR_URL],
                    isPeriodic: false,
                    delay: null,
                    args: args,
                    aborted: false
                };
                return scheduleMacroTaskWithCurrentZone(XMLHTTPREQUEST_SOURCE, placeholderCallback, options, scheduleTask, clearTask);
            }
        }; });
        var abortNative = patchMethod(XMLHttpRequestPrototype, 'abort', function () { return function (self) {
            var task = findPendingTask(self);
            if (task && typeof task.type == 'string') {
                // If the XHR has already completed, do nothing.
                // If the XHR has already been aborted, do nothing.
                // Fix #569, call abort multiple times before done will cause
                // macroTask task count be negative number
                if (task.cancelFn == null || (task.data && task.data.aborted)) {
                    return;
                }
                task.zone.cancelTask(task);
            }
            // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no
            // task
            // to cancel. Do nothing.
        }; });
    }
});
Zone.__load_patch('geolocation', function (global) {
    /// GEO_LOCATION
    if (global['navigator'] && global['navigator'].geolocation) {
        patchPrototype(global['navigator'].geolocation, ['getCurrentPosition', 'watchPosition']);
    }
});
Zone.__load_patch('PromiseRejectionEvent', function (global, Zone) {
    // handle unhandled promise rejection
    function findPromiseRejectionHandler(evtName) {
        return function (e) {
            var eventTasks = findEventTasks(global, evtName);
            eventTasks.forEach(function (eventTask) {
                // windows has added unhandledrejection event listener
                // trigger the event listener
                var PromiseRejectionEvent = global['PromiseRejectionEvent'];
                if (PromiseRejectionEvent) {
                    var evt = new PromiseRejectionEvent(evtName, { promise: e.promise, reason: e.rejection });
                    eventTask.invoke(evt);
                }
            });
        };
    }
    if (global['PromiseRejectionEvent']) {
        Zone[zoneSymbol('unhandledPromiseRejectionHandler')] =
            findPromiseRejectionHandler('unhandledrejection');
        Zone[zoneSymbol('rejectionHandledHandler')] =
            findPromiseRejectionHandler('rejectionhandled');
    }
});

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

})));


/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/Character/Enums/attributes.enum.ts":
/*!****************************************************!*\
  !*** ./src/app/Character/Enums/attributes.enum.ts ***!
  \****************************************************/
/*! exports provided: Attributes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Attributes", function() { return Attributes; });
var Attributes;
(function (Attributes) {
    Attributes[Attributes["Strength"] = 0] = "Strength";
    Attributes[Attributes["Dexterity"] = 1] = "Dexterity";
    Attributes[Attributes["Constitution"] = 2] = "Constitution";
    Attributes[Attributes["Intelligence"] = 3] = "Intelligence";
    Attributes[Attributes["Wisdom"] = 4] = "Wisdom";
    Attributes[Attributes["Charisma"] = 5] = "Charisma";
})(Attributes || (Attributes = {}));


/***/ }),

/***/ "./src/app/Character/Enums/dieties.enum.ts":
/*!*************************************************!*\
  !*** ./src/app/Character/Enums/dieties.enum.ts ***!
  \*************************************************/
/*! exports provided: Diety */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Diety", function() { return Diety; });
var Diety;
(function (Diety) {
    Diety[Diety["Din"] = 0] = "Din";
    Diety[Diety["Farore"] = 1] = "Farore";
    Diety[Diety["Nayru"] = 2] = "Nayru";
})(Diety || (Diety = {}));


/***/ }),

/***/ "./src/app/Character/Enums/elements.enum.ts":
/*!**************************************************!*\
  !*** ./src/app/Character/Enums/elements.enum.ts ***!
  \**************************************************/
/*! exports provided: Elements */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Elements", function() { return Elements; });
var Elements;
(function (Elements) {
    Elements[Elements["Fire"] = 0] = "Fire";
    Elements[Elements["Ice"] = 1] = "Ice";
    Elements[Elements["Lightning"] = 2] = "Lightning";
    Elements[Elements["Wind"] = 3] = "Wind";
    Elements[Elements["Poison"] = 4] = "Poison";
    Elements[Elements["Light"] = 5] = "Light";
    Elements[Elements["Shadow"] = 6] = "Shadow"; // 6
})(Elements || (Elements = {}));


/***/ }),

/***/ "./src/app/Character/Enums/levels.enum.ts":
/*!************************************************!*\
  !*** ./src/app/Character/Enums/levels.enum.ts ***!
  \************************************************/
/*! exports provided: Level */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Level", function() { return Level; });
var Level;
(function (Level) {
    Level[Level["level1"] = 0] = "level1";
    Level[Level["level2"] = 3000] = "level2";
    Level[Level["level3"] = 7500] = "level3";
    Level[Level["level4"] = 14000] = "level4";
    Level[Level["level5"] = 23000] = "level5";
    Level[Level["level6"] = 35000] = "level6";
    Level[Level["level7"] = 53000] = "level7";
    Level[Level["level8"] = 77000] = "level8";
    Level[Level["level9"] = 115000] = "level9";
    Level[Level["level10"] = 160000] = "level10";
    Level[Level["level11"] = 235000] = "level11";
    Level[Level["level12"] = 330000] = "level12";
    Level[Level["level13"] = 475000] = "level13";
    Level[Level["level14"] = 665000] = "level14";
    Level[Level["level15"] = 955000] = "level15";
    Level[Level["level16"] = 1350000] = "level16";
    Level[Level["level17"] = 1900000] = "level17";
    Level[Level["level18"] = 2700000] = "level18";
    Level[Level["level19"] = 3850000] = "level19";
    Level[Level["level20"] = 5350000] = "level20";
})(Level || (Level = {}));


/***/ }),

/***/ "./src/app/Character/Enums/magic-skills.enum.ts":
/*!******************************************************!*\
  !*** ./src/app/Character/Enums/magic-skills.enum.ts ***!
  \******************************************************/
/*! exports provided: Magics */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Magics", function() { return Magics; });
var Magics;
(function (Magics) {
    Magics[Magics["Din"] = 0] = "Din";
    Magics[Magics["Nayru"] = 1] = "Nayru";
    Magics[Magics["Farore"] = 2] = "Farore";
})(Magics || (Magics = {}));


/***/ }),

/***/ "./src/app/Character/Enums/saves.enum.ts":
/*!***********************************************!*\
  !*** ./src/app/Character/Enums/saves.enum.ts ***!
  \***********************************************/
/*! exports provided: Saves */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Saves", function() { return Saves; });
var Saves;
(function (Saves) {
    Saves[Saves["Fortitude"] = 0] = "Fortitude";
    Saves[Saves["Reflex"] = 1] = "Reflex";
    Saves[Saves["Will"] = 2] = "Will";
})(Saves || (Saves = {}));


/***/ }),

/***/ "./src/app/Character/Enums/skills.enum.ts":
/*!************************************************!*\
  !*** ./src/app/Character/Enums/skills.enum.ts ***!
  \************************************************/
/*! exports provided: Skills */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Skills", function() { return Skills; });
var Skills;
(function (Skills) {
    Skills[Skills["Acrobatics"] = 0] = "Acrobatics";
    Skills[Skills["Appraise"] = 1] = "Appraise";
    Skills[Skills["Bluff"] = 2] = "Bluff";
    Skills[Skills["Climb"] = 3] = "Climb";
    Skills[Skills["CraftOne"] = 4] = "CraftOne";
    Skills[Skills["CraftTwo"] = 5] = "CraftTwo";
    Skills[Skills["Diplomacy"] = 6] = "Diplomacy";
    Skills[Skills["Escape Artist"] = 7] = "Escape Artist";
    Skills[Skills["Fly"] = 8] = "Fly";
    Skills[Skills["Handle Animal"] = 9] = "Handle Animal";
    Skills[Skills["Heal"] = 10] = "Heal";
    Skills[Skills["Intimidate"] = 11] = "Intimidate";
    Skills[Skills["Knowledge Geography"] = 12] = "Knowledge Geography";
    Skills[Skills["Knowledge History"] = 13] = "Knowledge History";
    Skills[Skills["Knowledge Language"] = 14] = "Knowledge Language";
    Skills[Skills["Knowledge Local"] = 15] = "Knowledge Local";
    Skills[Skills["Knowledge Magic"] = 16] = "Knowledge Magic";
    Skills[Skills["Knowledge Monsters"] = 17] = "Knowledge Monsters";
    Skills[Skills["Knowledge Nature"] = 18] = "Knowledge Nature";
    Skills[Skills["Knowledge Nobility"] = 19] = "Knowledge Nobility";
    Skills[Skills["Knowledge Plains"] = 20] = "Knowledge Plains";
    Skills[Skills["Knowledge Religion"] = 21] = "Knowledge Religion";
    Skills[Skills["Perception"] = 22] = "Perception";
    Skills[Skills["Perform Music"] = 23] = "Perform Music";
    Skills[Skills["Perform Other"] = 24] = "Perform Other";
    Skills[Skills["Profession"] = 25] = "Profession";
    Skills[Skills["Ride"] = 26] = "Ride";
    Skills[Skills["Sense Motive"] = 27] = "Sense Motive";
    Skills[Skills["Sleight of Hand"] = 28] = "Sleight of Hand";
    Skills[Skills["Stealth"] = 29] = "Stealth";
    Skills[Skills["Survival"] = 30] = "Survival";
    Skills[Skills["Swim"] = 31] = "Swim";
})(Skills || (Skills = {}));


/***/ }),

/***/ "./src/app/Character/Enums/weapon-skills.enum.ts":
/*!*******************************************************!*\
  !*** ./src/app/Character/Enums/weapon-skills.enum.ts ***!
  \*******************************************************/
/*! exports provided: Weapons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Weapons", function() { return Weapons; });
var Weapons;
(function (Weapons) {
    Weapons[Weapons["Short Sword"] = 0] = "Short Sword";
    Weapons[Weapons["Long Sword"] = 1] = "Long Sword";
    Weapons[Weapons["Dual Sword"] = 2] = "Dual Sword";
    Weapons[Weapons["Great Sword"] = 3] = "Great Sword";
    Weapons[Weapons["Light Shield"] = 4] = "Light Shield";
    Weapons[Weapons["Heavy Shield"] = 5] = "Heavy Shield";
    Weapons[Weapons["Tower Shield"] = 6] = "Tower Shield";
    Weapons[Weapons["One-Handed Hammer"] = 7] = "One-Handed Hammer";
    Weapons[Weapons["Two-Handed Hammer"] = 8] = "Two-Handed Hammer";
    Weapons[Weapons["Spear"] = 9] = "Spear";
    Weapons[Weapons["Halberd"] = 10] = "Halberd";
    Weapons[Weapons["Naginata"] = 11] = "Naginata";
    Weapons[Weapons["Boomerang"] = 12] = "Boomerang";
    Weapons[Weapons["Sling"] = 13] = "Sling";
    Weapons[Weapons["Bow"] = 14] = "Bow";
    Weapons[Weapons["Small Bomb"] = 15] = "Small Bomb";
    Weapons[Weapons["Medium Bomb"] = 16] = "Medium Bomb";
    Weapons[Weapons["Large Bomb"] = 17] = "Large Bomb";
    Weapons[Weapons["Bombs Other"] = 18] = "Bombs Other";
    Weapons[Weapons["Fire Rod"] = 19] = "Fire Rod";
    Weapons[Weapons["Ice Rod"] = 20] = "Ice Rod";
    Weapons[Weapons["Lightning Rod"] = 21] = "Lightning Rod";
    Weapons[Weapons["Tornado Rod"] = 22] = "Tornado Rod";
    Weapons[Weapons["Sand Rod"] = 23] = "Sand Rod";
    Weapons[Weapons["Whip"] = 24] = "Whip";
    Weapons[Weapons["Ball & Chain"] = 25] = "Ball & Chain";
    Weapons[Weapons["Unarmed"] = 26] = "Unarmed";
})(Weapons || (Weapons = {}));


/***/ }),

/***/ "./src/app/Character/Weapons/weapon.ts":
/*!*********************************************!*\
  !*** ./src/app/Character/Weapons/weapon.ts ***!
  \*********************************************/
/*! exports provided: Weapon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Weapon", function() { return Weapon; });
var Weapon = /** @class */ (function () {
    function Weapon() {
    }
    return Weapon;
}());



/***/ }),

/***/ "./src/app/Character/character-methods.ts":
/*!************************************************!*\
  !*** ./src/app/Character/character-methods.ts ***!
  \************************************************/
/*! exports provided: methods */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "methods", function() { return methods; });
/* harmony import */ var _Enums_levels_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Enums/levels.enum */ "./src/app/Character/Enums/levels.enum.ts");

var methods = {
    levelUp: function (char) {
        char.health = char.maxHealth += 16 + char.attributes[2].modifier;
        char.magic = char.maxMagic += 3 + char.attributes[4].modifier;
        char.level++;
    },
    calcMod: function (char) {
        for (var i = 0; i < char.attributes.length; i++) {
            var attrVal = char.attributes[i].value;
            var modVal = (attrVal % 2 === 0) ? (attrVal - 10) / 2 : (attrVal - 11) / 2;
            char.attributes[i].modifier = modVal;
        }
        return;
    },
    gainExp: function (char, expGain) {
        var counter = 0;
        char.exp += expGain;
        var lvl = 'level';
        for (var key in _Enums_levels_enum__WEBPACK_IMPORTED_MODULE_0__["Level"]) {
            if (key.includes('level')) {
                counter++;
                if (_Enums_levels_enum__WEBPACK_IMPORTED_MODULE_0__["Level"][lvl + counter] <= char.exp && char.exp <= _Enums_levels_enum__WEBPACK_IMPORTED_MODULE_0__["Level"][lvl + (counter + 1)]) {
                    char.level = counter;
                    break;
                }
            }
        }
    },
    getDateString: function () {
        var time = new Date(Date.now());
        var month = time.getMonth() + 1;
        var day = time.getDate();
        var hour = time.getHours();
        var minute = time.getMinutes();
        var second = time.getSeconds();
        var dateString = month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
        return dateString;
    }
};



/***/ }),

/***/ "./src/app/Character/character.ts":
/*!****************************************!*\
  !*** ./src/app/Character/character.ts ***!
  \****************************************/
/*! exports provided: Character */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Character", function() { return Character; });
/* harmony import */ var _Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Enums/attributes.enum */ "./src/app/Character/Enums/attributes.enum.ts");
/* harmony import */ var _Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enums/weapon-skills.enum */ "./src/app/Character/Enums/weapon-skills.enum.ts");
/* harmony import */ var _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Enums/skills.enum */ "./src/app/Character/Enums/skills.enum.ts");
/* harmony import */ var _Enums_magic_skills_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Enums/magic-skills.enum */ "./src/app/Character/Enums/magic-skills.enum.ts");
/* harmony import */ var _Enums_saves_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Enums/saves.enum */ "./src/app/Character/Enums/saves.enum.ts");





var BASE = 8;
var Character = /** @class */ (function () {
    function Character() {
        this.attributes = [];
        this.skills = [];
        this.weaponSkills = [];
        this.magicSkills = [];
        this.weapons = [];
        this.spells = [];
        this.notes = [];
        this.importantNotes = [];
        this.inventory = [];
        this.savingThrows = [];
        for (var key in _Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_0__["Attributes"]) {
            if (isNaN(Number(key))) {
                var attr = {
                    name: key,
                    value: BASE,
                    modifier: -1
                };
                this.attributes.push(attr);
            }
        }
        for (var key in _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]) {
            if (isNaN(Number(key))) {
                var skill = {
                    skillName: key,
                    ranks: 0,
                    racial: 0,
                    trained: false,
                    item: 0,
                    misc: 0,
                    modifier: ''
                };
                this.skills.push(skill);
            }
        }
        for (var key in _Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Weapons"]) {
            if (isNaN(Number(key))) {
                var weapon = {
                    skillName: key,
                    trained: false,
                    ranks: 0,
                    racial: 0
                };
                this.weaponSkills.push(weapon);
            }
        }
        for (var key in _Enums_magic_skills_enum__WEBPACK_IMPORTED_MODULE_3__["Magics"]) {
            if (isNaN(Number(key))) {
                var magic = {
                    skillName: key,
                    ranks: 0,
                    modifier: key === 'Din' ? 'Intelligence' : key === 'Nayru' ? 'Wisdom' : 'Charisma'
                };
                this.magicSkills.push(magic);
            }
        }
        for (var key in _Enums_saves_enum__WEBPACK_IMPORTED_MODULE_4__["Saves"]) {
            if (isNaN(Number(key))) {
                var save = {
                    name: key,
                    modifier: key === 'Fortitude' ? 'Constitution' : key === 'Reflex' ? 'Dexterity' : 'Wisdom',
                    racial: 0
                };
                this.savingThrows.push(save);
            }
        }
        /* A T T R I B U T E   A R R A Y S */
        var strArray = [_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Climb'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Intimidate'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Swim']];
        // tslint:disable-next-line:max-line-length
        var dexArray = [_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Acrobatics'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Escape Artist'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Fly'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Ride'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Sleight of Hand'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Stealth']];
        var conArray = [];
        // tslint:disable-next-line:max-line-length
        var intArray = [_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Appraise'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['CraftOne'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['CraftTwo'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Knowledge Geography'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Knowledge History'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Knowledge Language'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Knowledge Local'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Knowledge Magic'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Knowledge Monsters'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Knowledge Nature'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Knowledge Nobility'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Knowledge Plains'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Knowledge Religion']];
        var wisArray = [_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Heal'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Perception'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Profession'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Sense Motive'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Survival']];
        var chaArray = [_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Bluff'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Diplomacy'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Handle Animal'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Perform Music'], _Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"]['Perform Other']];
        /*E N D   A T T R I B U T E   A R R A Y S */
        var attrArrays = [
            strArray,
            dexArray,
            conArray,
            intArray,
            wisArray,
            chaArray
        ];
        for (var i = 0; i < attrArrays.length; i++) {
            for (var j = 0; j < attrArrays[i].length; j++) {
                this.skills[attrArrays[i][j]].modifier = _Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_0__["Attributes"][i];
            }
        }
        this.exp = 0;
    }
    return Character;
}());



/***/ }),

/***/ "./src/app/Character/note.ts":
/*!***********************************!*\
  !*** ./src/app/Character/note.ts ***!
  \***********************************/
/*! exports provided: Note */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Note", function() { return Note; });
var Note = /** @class */ (function () {
    function Note() {
    }
    return Note;
}());



/***/ }),

/***/ "./src/app/Character/spells.ts":
/*!*************************************!*\
  !*** ./src/app/Character/spells.ts ***!
  \*************************************/
/*! exports provided: Spell */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Spell", function() { return Spell; });
var Spell = /** @class */ (function () {
    function Spell() {
        this.useDiety = false;
    }
    return Spell;
}());



/***/ }),

/***/ "./src/app/CustomPipes/customPipes.ts":
/*!********************************************!*\
  !*** ./src/app/CustomPipes/customPipes.ts ***!
  \********************************************/
/*! exports provided: EnumToArrayPipe, SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnumToArrayPipe", function() { return EnumToArrayPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var EnumToArrayPipe = /** @class */ (function () {
    function EnumToArrayPipe() {
    }
    EnumToArrayPipe.prototype.transform = function (enumToTransform) {
        var retArray = [];
        for (var key in enumToTransform) {
            if (!isNaN(Number(key))) {
                retArray.push(enumToTransform[key]);
            }
        }
        return retArray;
    };
    EnumToArrayPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'enumToArray' })
    ], EnumToArrayPipe);
    return EnumToArrayPipe;
}());

var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [EnumToArrayPipe],
            exports: [EnumToArrayPipe]
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./src/app/Races/Races.ts":
/*!********************************!*\
  !*** ./src/app/Races/Races.ts ***!
  \********************************/
/*! exports provided: Fairy, Gerudo, Goron, Hylian, Rito, Sheikah, Twili, Zora */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fairy", function() { return Fairy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Gerudo", function() { return Gerudo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Goron", function() { return Goron; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hylian", function() { return Hylian; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rito", function() { return Rito; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sheikah", function() { return Sheikah; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Twili", function() { return Twili; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Zora", function() { return Zora; });
/* harmony import */ var _Character_character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Character/character */ "./src/app/Character/character.ts");
/* harmony import */ var _Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Character/Enums/skills.enum */ "./src/app/Character/Enums/skills.enum.ts");
/* harmony import */ var _Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Character/Enums/weapon-skills.enum */ "./src/app/Character/Enums/weapon-skills.enum.ts");
/* harmony import */ var _Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Character/Enums/attributes.enum */ "./src/app/Character/Enums/attributes.enum.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var Fairy = /** @class */ (function (_super) {
    __extends(Fairy, _super);
    function Fairy(subRace) {
        var _this = _super.call(this) || this;
        _this.race = 'Fairy';
        _this.subRace = subRace;
        _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Strength']].value -= 2;
        _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Intelligence']].value += 2;
        _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Wisdom']].value += 2;
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['CraftOne']].trained = true; // Craft 1
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['CraftTwo']].trained = true; // Craft 2
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Fly']].trained = true; // Fly
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Heal']].trained = true; // Heal
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Geography']].trained = true; // Knowledge (Geography)
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge History']].trained = true; // Knowledge (History)
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Language']].trained = true; // Knowledge (Language)
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Local']].trained = true; // Knowledge (Local)
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Magic']].trained = true; // Knowledge (Magic)
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Monsters']].trained = true; // Knowledge (Monster)
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Nature']].trained = true; // Knowledge (Nature)
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Nobility']].trained = true; // Knowledge (Nobility)
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Plains']].trained = true;
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Religion']].trained = true; // Knowledge (Religion)
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Perception']].trained = true; // Perception
        _this.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Weapons"]['Fire Rod']].trained = true; // Fire Rods
        _this.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Weapons"]['Ice Rod']].trained = true; // Ice Rods
        _this.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Weapons"]['Lightning Rod']].trained = true; // Lightning Rods
        _this.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Weapons"]['Tornado Rod']].trained = true; // Tornado Rods
        _this.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Weapons"]['Sand Rod']].trained = true; // Sand Rods
        switch (subRace) {
            case 'Din': {
                break;
            }
            case 'Farore': {
                break;
            }
            case 'Nayru': {
                break;
            }
        }
        return _this;
    }
    return Fairy;
}(_Character_character__WEBPACK_IMPORTED_MODULE_0__["Character"]));

var Gerudo = /** @class */ (function (_super) {
    __extends(Gerudo, _super);
    function Gerudo() {
        var _this = _super.call(this) || this;
        _this.race = 'Gerudo';
        _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Strength']].value += 2; // Strength Buff
        _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Constitution']].value += 1; // Constitution Buff
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Intimidate']].trained = true; // Intimidate
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Geography']].trained = true;
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Nature']].trained = true;
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Profession']].trained = true;
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Ride']].trained = true;
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Survival']].trained = true;
        _this.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Weapons"]['Long Sword']].trained = true;
        _this.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Weapons"]['Halberd']].trained = true;
        return _this;
    }
    return Gerudo;
}(_Character_character__WEBPACK_IMPORTED_MODULE_0__["Character"]));

var Goron = /** @class */ (function (_super) {
    __extends(Goron, _super);
    function Goron(subRace) {
        var _this = _super.call(this) || this;
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Appraise']].trained = true; // Appraise
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Climb']].trained = true; // Climb
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Intimidate']].trained = true; // Intimidate
        _this.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Weapons"]['One-Handed Hammer']].trained = true; // Hammers
        _this.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Weapons"]['Two-Handed Hammer']].trained = true; // Hammers
        _this.race = 'Goron';
        _this.subRace = subRace;
        switch (subRace) {
            case 'Rock Spine': {
                _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Strength']].value += 2; // Strength Buff
                break;
            }
            case 'Soft Belly': {
                _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Wisdom']].value += 1; // Wisdom Buff
                break;
            }
        }
        return _this;
    }
    return Goron;
}(_Character_character__WEBPACK_IMPORTED_MODULE_0__["Character"]));

var Hylian = /** @class */ (function (_super) {
    __extends(Hylian, _super);
    function Hylian(subRace) {
        var _this = _super.call(this) || this;
        // All Hylian Skills
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Diplomacy']].racial = 4;
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['CraftOne']].trained = true; // Craft 1
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Climb']].trained = true; // Climb
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge History']].trained = true; // Knowledge (History)
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Local']].trained = true; // Knowledge (Local)
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Perception']].trained = true; // Perception
        _this.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Weapons"]['Short Sword']].trained = true; // Short Sword
        _this.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Weapons"]['Long Sword']].trained = true; // Long Sword
        _this.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Weapons"]['Light Shield']].trained = true; // Light Shield
        _this.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Weapons"]['Heavy Shield']].trained = true; // Heavy Shield
        _this.race = 'Hylian';
        _this.subRace = subRace;
        if (subRace) {
            switch (subRace) {
                case 'Farmer': {
                    // Farmhand Hylian Skills
                    _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Strength']].value += 2; // Strength Buff
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Acrobatics']].trained = true; // Acrobatics
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Handle Animal']].trained = true; // Handle Animal
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Geography']].trained = true; // Knowledge (Geography)
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Nature']].trained = true; // Knowledge (Nature)
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Ride']].trained = true; // Ride
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Survival']].trained = true; // Survival
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Swim']].trained = true; // Swim
                    break;
                }
                case 'Sheikah': {
                    // Sheikah Hylian Skills
                    _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Dexterity']].value += 2; // Dexterity Buff
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Acrobatics']].trained = true; // Acronatics
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Appraise']].trained = true; // Appraise
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Bluff']].trained = true; // Bluff
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Escape Artist']].trained = true; // Escpe Artist
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Intimidate']].trained = true; // Intimidate
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Language']].trained = true; // Knowledge (Language)
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Nobility']].trained = true; // Knowledge (Nobility)
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Religion']].trained = true; // Knowledge (Religion)
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Sense Motive']].trained = true; // Sense Motive
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Stealth']].trained = true; // Stealth
                    break;
                }
                case 'Guard': {
                    // Guard Hylian Skills
                    _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Constitution']].value += 2; // Consitution Buff
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Bluff']].trained = true; // Bluff
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Diplomacy']].trained = true; // Diplomacy
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Heal']].trained = true; // Heal
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Intimidate']].trained = true; // Intimidate
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowldege Nobility']].trained = true; // Knowledge (Nobility)
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowldege Reiligion']].trained = true; // Knowledge (Religion)
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Profession']].trained = true; // Profession
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Ride']].trained = true; // Ride
                    _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Sense Motive']].trained = true; // Sense Motive
                    break;
                }
            }
        }
        return _this;
    }
    return Hylian;
}(_Character_character__WEBPACK_IMPORTED_MODULE_0__["Character"]));

var Rito = /** @class */ (function (_super) {
    __extends(Rito, _super);
    function Rito(subRace) {
        var _this = _super.call(this) || this;
        _this.race = 'Rito';
        _this.subRace = subRace;
        // All Rito Skills
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Acrobatics']].trained = true; // Acrobatics
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['CraftOne']].trained = true; // Craft One
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['CraftTwo']].trained = true; // Craft Two
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Fly']].trained = true; // Fly
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Local']].trained = true; // Knowledge (Local)
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Nature']].trained = true; // Knowledge (Nature)
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Perception']].trained = true; // Perception
        switch (subRace) {
            case 'Sharp Eye': {
                _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Intelligence']].value += 1; // Intelligence Buff
                _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Perception']].racial = 5; // Perception Bonus
                break;
            }
            case 'Sharp Tongue': {
                _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Charisma']].value += 1; // Charisma Buff
                _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Bluff']].trained = true; // Bluff
                _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['bluff']].misc = 2; // Bluff Buff
                break;
            }
        }
        return _this;
    }
    return Rito;
}(_Character_character__WEBPACK_IMPORTED_MODULE_0__["Character"]));

var Sheikah = /** @class */ (function (_super) {
    __extends(Sheikah, _super);
    function Sheikah() {
        var _this = _super.call(this) || this;
        _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Dexterity']].value += 2; // Dex Buff
        _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Constitution']].value += 2; // Con Buff
        _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Charisma']].value -= 2; // Cha Neg
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Stealth']].racial = 4; // Stealth buff
        _this.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Weapons"]['Naginata']].trained = true; // Naginatas
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Acrobatics']].trained = true; // Acrobatics
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['CraftOne']].trained = true; // Craft 1
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['CraftTwo']].trained = true; // Craft 2
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Escape Artist']].trained = true; // Escape Artist
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge History']].trained = true; // Knowledge (History)
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Language']].trained = true; // Knowledge (Language)
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Local']].trained = true; // Knowledge (Local)
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Nobility']].trained = true; // Knowledge (Nobility)
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Plains']].trained = true;
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Religion']].trained = true; // Knowledge (Religion)
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Perception']].trained = true; // Perception
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Sense Motive']].trained = true; // Sense Motive
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Sleight of Hand']].trained = true; // Sleight of Hand
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Stealth']].trained = true; // Stealth
        return _this;
    }
    return Sheikah;
}(_Character_character__WEBPACK_IMPORTED_MODULE_0__["Character"]));

var Twili = /** @class */ (function (_super) {
    __extends(Twili, _super);
    function Twili() {
        var _this = _super.call(this) || this;
        _this.race = 'Twili';
        _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Intelligence']].value += 2; // Int Buff
        _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Constitution']].value += 2; // Con Buff
        _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Wisdom']].value -= 2; // Wis Neg
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Perform Music']].trained = false; // Can't perform Music
        _this.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Weapons"]['Dual Sword']].trained = true; // Dual Swords
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Bluff']].trained = true; // Bluff
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Intimidate']].trained = true; // Intimidate
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge History']].trained = true; // Knowledge (History)
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Plains']].trained = true;
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Stealth']].trained = true; // Stealth
        return _this;
    }
    return Twili;
}(_Character_character__WEBPACK_IMPORTED_MODULE_0__["Character"]));

var Zora = /** @class */ (function (_super) {
    __extends(Zora, _super);
    function Zora(subRace) {
        var _this = _super.call(this) || this;
        _this.race = 'Zora';
        _this.subRace = subRace;
        _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Swim']].racial = 4;
        _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Dexterity']].value += 2; // Dexterity
        _this.skills[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Acrobatics']].trained = true; // Acrobatics
        _this.skills[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['CraftOne']].trained = true; // Craft 1
        _this.skills[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['CraftTwo']].trained = true; // Craft 2
        _this.skills[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Perception']].trained = true; // Percetption
        _this.skills[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Swim']].trained = true; // Swim
        _this.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Weapons"]['Spear']].trained = true; // Spears
        switch (subRace) {
            case 'River': {
                _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Constitution']].value -= 2; // Con Neg
                _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Intelligence']].value += 2; // Int Buff
                _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Diplomacy']].trained = true; // Diplomacy
                _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Heal']].trained = true; // Heal;
                _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge History']].trained = true; // Knowledge (History)
                _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Nature']].trained = true; // Knowledge(Nature)
                _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Perform Other']].trained = true; // Perform (Other)
                break;
            }
            case 'Ocean': {
                _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Strength']].value += 2;
                _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Wisdom']].value -= 2;
                _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Diplomacy']].trained = true; // Diplomacy
                _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Escape Artist']].trained = true; // Escape Artist
                _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Intimidate']].trained = true; // Intimidate
                _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Knowledge Nature']].trained = true; // Knowledge (Nature)
                break;
            }
            case 'Swamp': {
                _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Strength']].value -= 2;
                _this.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"]['Constitution']].value += 2;
                _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Bluff']].trained = true; // Bluff
                _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Escape Artist']].trained = true; // Escape Artist
                _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Intimidate']].trained = true; // Intimidate
                _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Sense Motive']].trained = true; // Sense Motive
                _this.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_1__["Skills"]['Stealth']].trained = true; // Stealth
                break;
            }
        }
        return _this;
    }
    return Zora;
}(_Character_character__WEBPACK_IMPORTED_MODULE_0__["Character"]));



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".foot{\r\n  margin-top: 5em;\r\n  font-size: 10pt;\r\n  margin-bottom: .5em;\r\n}\r\n.tab{\r\n  width: calc(100% / 3);\r\n}\r\n.stat{\r\n  display: inline;\r\n  font-weight: bold;\r\n}\r\n.description{\r\n  position: relative; \r\n}\r\n.hidden{\r\n  color: #fff;\r\n}\r\n.hidden:hover{\r\n  color: #888;\r\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\r\n<button (click)=\"about()\">About!</button>\r\n<button (click)=\"characterCreate()\">About Creating a Character</button>\r\n<div class=\"modal\" [class.showModal]=\"showModal\">\r\n  <div class=\"modal-content\">\r\n    <div class=\"modal-header\">\r\n      <span class=\"close\" (click)=\"about()\">&times;</span>\r\n      <h2>Welcome to the {{ title }}</h2>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n      <p>Welcome to the ZeldaPlay character tracker! This web application is meant for you to be able to create,\r\n        save, and track your ZeldaPlay's character's stats and skills! This application is currently still a work in progress,\r\n        and may not look like the finished product. Do keep in mind that the dev team is small and the ambitions of the project\r\n        are very, very large. I hope you do enjoy the use of the character tracker! Now, on to adventuring!</p>\r\n      <div class=\"foot\">\r\n        <a href=\"https://github.com/jmcdo29/zeldaPlay#zeldaplay\" target=\"_blank\">Source Code</a>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"modal\" [class.showModal]=\"showCharacterCreate\">\r\n  <div class=\"modal-content\">\r\n    <div class=\"modal-header\">\r\n      <span class=\"close\" (click)=\"characterCreate()\">&times;</span>\r\n      <h2>Charcter Creation</h2>\r\n    </div>\r\n    <div class=\"body-header\">\r\n      <div class=\"tab large\" (click)=\"showTab(0)\">Choosing a Race</div>\r\n      <div class=\"tab large\" (click)=\"showTab(1)\">Allocating Attributes</div>\r\n      <div class=\"tab large\" (click)=\"showTab(2)\">Setting your Skills</div>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n      <div *ngIf=\"showRace\">\r\n        <h3>Choosing your Race</h3>\r\n        <p>In ZeldaPlay, your race strongly determines your class. While the abiltity to allocate skill points to weapons makes\r\n          it easier to \"multiclass\", and while classes do not entirely exist, the race you chose to play very much plays\r\n          a factor into the kind of class you will play to. For example: a Sheikah will almost always play a rogue-like character.\r\n          Very rarely would you find a Sheikah player charing into battle with a great sword or tower shield expecting to\r\n          single-handedly destroy the opposing forces. Instead, that would normally be a Goron wielding a hammer.</p>\r\n        <small>Note: While your race does not define your class, it very much plays a factor into what kind of character you should\r\n          probably play. It is a suggestion, not a rule. While you probably will not find the afformentioned Sheikah, it\r\n          is not entirely impossible.</small>\r\n      </div>\r\n      <div *ngIf=\"showAttributes\">\r\n        <h3>Allocating your Attribute Points</h3>\r\n        <p>Your attribute points are your stat points. These help you determine your Strength, Dexterity, and other attributes\r\n          about your character. To describe each of the attributes, here is an example with tomatoes:</p>\r\n        <ul>\r\n          <li>\r\n            <p class=\"stat\">Strength:</p>\r\n            <span class=\"description\"> The ability to crush a tomato.</span>\r\n          </li>\r\n          <li>\r\n            <p class=\"stat\">Dexterity:</p>\r\n            <span class=\"description\"> The aility to dodge a tomato.</span>\r\n          </li>\r\n          <li>\r\n            <p class=\"stat\">Constitution:</p>\r\n            <span class=\"description\"> The ability to eat a bad tomato.</span>\r\n          </li>\r\n          <li>\r\n            <p class=\"stat\">Intelligence:</p>\r\n            <span class=\"description\"> Knowing that a tomato is a fruit.</span>\r\n          </li>\r\n          <li>\r\n            <p class=\"stat\">Wisdom:</p>\r\n            <span class=\"description\"> Knowing not to put a tomato in a fruit salad.</span>\r\n          </li>\r\n          <li>\r\n            <p class=\"stat\">Charisma:</p>\r\n            <span class=\"description\"> Being able to sell a tomato based fruit salad.</span>\r\n          </li>\r\n        </ul>\r\n        <small class=\"hidden\">Note: If you said that a tomato based fruit salad is just salsa, congratulations, you're a bard.</small>\r\n        <p></p>\r\n      </div>\r\n      <div *ngIf=\"showSkills\">\r\n        <h3>Assigning your Skills</h3>\r\n        <p>Your skills are your abilities. In every day life, in combat, in knowledge, magic, theivery: they are your tools\r\n          of the trade so to speak. Most of the time your skills will play towards your character. Most Gerudo will not have\r\n          the inital abiltiy to Bluff or Ride, but they will always know how to intimidate anyone they need to and how to\r\n          handle their weapons. When you create a character you are given 5, 10, 15, or 20 skill points based on a randomly\r\n          generated number (normally the roll of a d4 die). From there you can put those points into your regular skills,\r\n          weapon skills, or magic skills. Kepp in mind as well that all skills, whether you are trained in them or not, are\r\n          available to all cahracters. This just means that a Fairy that wants to use intimidate will have a much harder\r\n          time than the Gerudo from earlier. If you can't get all the skills you want, don't worry; you gain 10 skill points\r\n          every level up along with an extra attribute point!</p>\r\n        <small>Note: Skill points are shared across Skills, Weapons, and Magic. Spend them wisely.</small>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<app-characters></app-characters>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'ZeldaPlay Character Tracker';
        this.showModal = false;
        this.showCharacterCreate = false;
        this.showRace = true;
        this.showAttributes = false;
        this.showSkills = false;
    }
    AppComponent.prototype.about = function () {
        this.showModal = !this.showModal;
    };
    AppComponent.prototype.characterCreate = function () {
        this.showCharacterCreate = !this.showCharacterCreate;
    };
    AppComponent.prototype.showTab = function (index) {
        this.showRace = false;
        this.showAttributes = false;
        this.showSkills = false;
        if (index === 0) {
            this.showRace = true;
        }
        else if (index === 1) {
            this.showAttributes = true;
        }
        else if (index === 2) {
            this.showSkills = true;
        }
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var angular_in_memory_web_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-in-memory-web-api */ "./node_modules/angular-in-memory-web-api/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _in_memory_data_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./in-memory-data.service */ "./src/app/in-memory-data.service.ts");
/* harmony import */ var _CustomPipes_customPipes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CustomPipes/customPipes */ "./src/app/CustomPipes/customPipes.ts");
/* harmony import */ var ng_chartist__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng-chartist */ "./node_modules/ng-chartist/bundles/ng-chartist.umd.js");
/* harmony import */ var ng_chartist__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ng_chartist__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _characters_characters_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./characters/characters.component */ "./src/app/characters/characters.component.ts");
/* harmony import */ var _character_detail_character_detail_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./character-detail/character-detail.component */ "./src/app/character-detail/character-detail.component.ts");
/* harmony import */ var _die_die_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./die/die.component */ "./src/app/die/die.component.ts");
/* harmony import */ var _character_create_character_create_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./character-create/character-create.component */ "./src/app/character-create/character-create.component.ts");
/* harmony import */ var _character_level_up_character_level_up_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./character-level-up/character-level-up.component */ "./src/app/character-level-up/character-level-up.component.ts");
/* harmony import */ var _character_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./character.service */ "./src/app/character.service.ts");
/* harmony import */ var _character_skills_character_skills_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./character-skills/character-skills.component */ "./src/app/character-skills/character-skills.component.ts");
/* harmony import */ var _character_weapon_character_weapon_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./character-weapon/character-weapon.component */ "./src/app/character-weapon/character-weapon.component.ts");
/* harmony import */ var _character_spell_character_spell_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./character-spell/character-spell.component */ "./src/app/character-spell/character-spell.component.ts");
/* harmony import */ var _messages_messages_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./messages/messages.component */ "./src/app/messages/messages.component.ts");
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./message.service */ "./src/app/message.service.ts");
/* harmony import */ var _character_notes_character_notes_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./character-notes/character-notes.component */ "./src/app/character-notes/character-notes.component.ts");
/* harmony import */ var _character_inventory_character_inventory_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./character-inventory/character-inventory.component */ "./src/app/character-inventory/character-inventory.component.ts");
/* harmony import */ var _character_saves_character_saves_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./character-saves/character-saves.component */ "./src/app/character-saves/character-saves.component.ts");
/* harmony import */ var _character_charts_character_charts_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./character-charts/character-charts.component */ "./src/app/character-charts/character-charts.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







// attempting to add in chartist for Angular. Hopefully it goes well!

















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"],
                _characters_characters_component__WEBPACK_IMPORTED_MODULE_9__["CharactersComponent"],
                _character_detail_character_detail_component__WEBPACK_IMPORTED_MODULE_10__["CharacterDetailComponent"],
                _die_die_component__WEBPACK_IMPORTED_MODULE_11__["DieComponent"],
                _character_create_character_create_component__WEBPACK_IMPORTED_MODULE_12__["CharacterCreateComponent"],
                _character_level_up_character_level_up_component__WEBPACK_IMPORTED_MODULE_13__["CharacterLevelUpComponent"],
                _character_skills_character_skills_component__WEBPACK_IMPORTED_MODULE_15__["CharacterSkillsComponent"],
                _character_weapon_character_weapon_component__WEBPACK_IMPORTED_MODULE_16__["CharacterWeaponComponent"],
                _character_spell_character_spell_component__WEBPACK_IMPORTED_MODULE_17__["CharacterSpellComponent"],
                _messages_messages_component__WEBPACK_IMPORTED_MODULE_18__["MessagesComponent"],
                _character_notes_character_notes_component__WEBPACK_IMPORTED_MODULE_20__["CharacterNotesComponent"],
                _character_inventory_character_inventory_component__WEBPACK_IMPORTED_MODULE_21__["CharacterInventoryComponent"],
                _character_saves_character_saves_component__WEBPACK_IMPORTED_MODULE_22__["CharacterSavesComponent"],
                _character_charts_character_charts_component__WEBPACK_IMPORTED_MODULE_23__["CharacterChartsComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                // import for chartist
                ng_chartist__WEBPACK_IMPORTED_MODULE_7__["ChartistModule"],
                _CustomPipes_customPipes__WEBPACK_IMPORTED_MODULE_6__["SharedModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                angular_in_memory_web_api__WEBPACK_IMPORTED_MODULE_3__["HttpClientInMemoryWebApiModule"].forRoot(_in_memory_data_service__WEBPACK_IMPORTED_MODULE_5__["InMemoryDataService"], { passThruUnknownUrl: true, dataEncapsulation: false })
            ],
            providers: [_character_service__WEBPACK_IMPORTED_MODULE_14__["CharacterService"], _message_service__WEBPACK_IMPORTED_MODULE_19__["MessageService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"]],
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["CUSTOM_ELEMENTS_SCHEMA"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/character-charts/character-charts.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/character-charts/character-charts.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "x-chartist.Magic path.ct-slice-donut{\r\n  stroke: blue;\r\n}\r\n"

/***/ }),

/***/ "./src/app/character-charts/character-charts.component.html":
/*!******************************************************************!*\
  !*** ./src/app/character-charts/character-charts.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let chart of charts\">\r\n    <x-chartist\r\n    class=\"{{chart.data.labels[0]}}\"\r\n    [data]=\"chart.data\"\r\n    [type]=\"chart.type\"\r\n    [options]=\"chart.options\"\r\n    [responsiveOptions]=\"chart.responsiveOptions\"\r\n    [events]=\"chart.events\">\r\n</x-chartist>\r\n</div>"

/***/ }),

/***/ "./src/app/character-charts/character-charts.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/character-charts/character-charts.component.ts ***!
  \****************************************************************/
/*! exports provided: CharacterChartsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CharacterChartsComponent", function() { return CharacterChartsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Character_character__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Character/character */ "./src/app/Character/character.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CharacterChartsComponent = /** @class */ (function () {
    function CharacterChartsComponent() {
    }
    CharacterChartsComponent.prototype.ngOnInit = function () {
        var health = 100 * this.character.health / this.character.health;
        var magic = 100 * this.character.magic / this.character.magic;
        console.log('Health', health, '\nMagic', magic);
        this.charts = [
            {
                data: {
                    labels: ['Health', 'Magic'],
                    series: [health, magic]
                },
                type: 'Pie',
                options: {
                    donut: true,
                    donutWidth: 15,
                    startAngle: 270,
                    total: 400,
                    labelDirection: 'explode',
                    showLabel: false
                }
            }
            /*  {
               data: {
                 labels: ['Magic'],
                 series: [this.character.magic]
               },
               type: 'Pie',
               options: {
                 donut: true,
                 donutWidth: 15,
                 startAngle: 270,
                 total: this.character.maxMagic * 2
               }
             } */
        ];
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _Character_character__WEBPACK_IMPORTED_MODULE_1__["Character"])
    ], CharacterChartsComponent.prototype, "character", void 0);
    CharacterChartsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-character-charts',
            template: __webpack_require__(/*! ./character-charts.component.html */ "./src/app/character-charts/character-charts.component.html"),
            styles: [__webpack_require__(/*! ./character-charts.component.css */ "./src/app/character-charts/character-charts.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], CharacterChartsComponent);
    return CharacterChartsComponent;
}());



/***/ }),

/***/ "./src/app/character-create/character-create.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/character-create/character-create.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".race-input{\r\n  width: 100%;\r\n}\r\n.radio{\r\n  width: 100%;\r\n  float: left;\r\n  position: relative;\r\n}\r\n.button{\r\n  width: 40%;\r\n  float: left;\r\n}\r\ninput.skill{\r\n  width: 5em;\r\n}\r\n.skill-input{\r\n  width: 3em;\r\n}\r\nh4{\r\n  color: #444;\r\n}\r\n.error{\r\n  color: purple;\r\n}\r\n.title{\r\n  display: inline;\r\n  font-weight: bold;\r\n}\r\n.description{\r\n  position: relative;\r\n}\r\ninput.non-zero:in-range{\r\n  background-color: lightskyblue;\r\n}\r\n.bad-input, input:out-of-range{\r\n  background-color: lightcoral;\r\n}  \r\n"

/***/ }),

/***/ "./src/app/character-create/character-create.component.html":
/*!******************************************************************!*\
  !*** ./src/app/character-create/character-create.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal\" [class.showModal]=\"showRaceModal\">\r\n  <div class=\"modal-content\">\r\n    <div class=\"modal-header\">\r\n      <span class=\"close\" (click)=\"aboutRace()\">&times;</span>\r\n      <h2>Races!</h2>\r\n    </div>\r\n    <div class=\"body-header\">\r\n      <div class=\"tab\" (click)=\"show(0)\">Hylian</div>\r\n      <div class=\"tab\" (click)=\"show(1)\">Goron</div>\r\n      <div class=\"tab\" (click)=\"show(2)\">Zora</div>\r\n      <div class=\"tab\" (click)=\"show(3)\">Gerudo</div>\r\n      <div class=\"tab\" (click)=\"show(4)\">Sheikah</div>\r\n      <div class=\"tab\" (click)=\"show(5)\">Rito</div>\r\n      <div class=\"tab\" (click)=\"show(6)\">Twili</div>\r\n      <div class=\"tab\" (click)=\"show(7)\">Fairy</div>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n      <div *ngIf=\"!showRace[0] && !showRace[1] && !showRace[2] && !showRace[3] && !showRace[4] && !showRace[5] && !showRace[6] && !showRace[7]\">\r\n        <p>This modal contains inofmration about the different races of ZeldaPlay! Chose which one you would like to learn about!</p>\r\n      </div>\r\n      <div *ngIf=\"showRace[0]\">\r\n        <!--Done for now-->\r\n        <h2>Hylians</h2>\r\n        <div class=\"description\">\r\n          <p>Hylians are the most common race of Hyrule. Players who chose to play a Hylian will more than likely follow the\r\n            Goddess Hylia and come from a normal background. Most Hylians are soldiers or farm/ranch hands, though a select\r\n            few have been known to be chosen in the past for special training from the Sheikah tribe, learning the ways of\r\n            the assassin and the art of stealth.</p>\r\n          <div class=\"bonus\">\r\n            <h3>Bonuses</h3>\r\n            <ul>\r\n              <li>\r\n                <p class=\"title\">Attributes:</p>\r\n                <span class=\"description\">&#43;2 to any attribute</span>\r\n              </li>\r\n              <li>\r\n                <p class=\"title\">Skills:</p>\r\n                <span class=\"description\">Climb, Craft, Knowledge (History), Knowledge (Local), Perform (Music), Perception</span>\r\n              </li>\r\n              <li>\r\n                <p class=\"title\">Eternal Hope:</p>\r\n                <span class=\"description\">&#43;2 racial bonus on fear and despair saves</span>\r\n              </li>\r\n              <li>\r\n                <p class=\"title\">Curiosity:</p>\r\n                <span class=\"description\">&#43;4 bonus on Diplomacy checks to gain information</span>\r\n              </li>\r\n              <li>\r\n                <p class=\"title\">Known Languages:</p>\r\n                <span class=\"description\">Hylian (common)</span>\r\n              </li>\r\n            </ul>\r\n          </div>\r\n        </div>\r\n        <h3>Sub Race Options</h3>\r\n        <ul>\r\n          <li>\r\n            <h3>Farmers</h3>\r\n            <div class=\"description\">\r\n              <p>Those who are farm hands are more likely to be hospitable to those who visit their homes and are usually considered\r\n                friendlier in general. These Hylians, while kind, are also known to be strong, durable, and very headstrong.\r\n                Hylians of the farm hand background will be skilled in unarmed combat, as herding goats can really be a workout.\r\n                Along with the unarmed bonus, farm hands are also trained to use swords in the case of being called upon\r\n                by the militia.</p>\r\n              <div class=\"bonus\">\r\n                <h4>Bonuses</h4>\r\n                <ul>\r\n                  <li>\r\n                    <p class=title>Attributes:</p>\r\n                    <span class=\"description\">&#43;2 Strength</span>\r\n                  </li>\r\n                  <li>\r\n                    <p class=\"title\">Skills:</p>\r\n                    <span class=\"description\">Acrobatics, Handle Animal, Knowledge (Geography), Knowledge (Nature), Ride, Survival, Swim</span>\r\n                  </li>\r\n                  <li>\r\n                    <p class=\"title\">Starting Gear:</p>\r\n                    <span class=\"description\">Short Sword, Wooden Shield, Slingshot, Fishing Pole, 2 Bottles (Contents Vary)</span>\r\n                  </li>\r\n                  <li>\r\n                    <p class=\"title\">Possible Companions (Optional):</p>\r\n                    <span class=\"description\">Horse, Dog, Cucco, Hawk, Monkey</span>\r\n                  </li>\r\n                </ul>\r\n              </div>\r\n            </div>\r\n          </li>\r\n          <li>\r\n            <h3>Sheikah</h3>\r\n            <div class=\"description\">\r\n              <p>The few select Hylians who the Sheikah have deemed worthy of training are very withdrawn and reserved. They\r\n                seem to always have their eyes out for those who are untrustworthy. These Hylians speak seldom and when they\r\n                do, it is usually a warning. Those trained by the Sheikah are skilled in stealth combat, meaning they have\r\n                a bonus when using daggers or swords.</p>\r\n              <div class=\"bonus\">\r\n                <h4>Bonuses</h4>\r\n                <ul>\r\n                  <li>\r\n                    <p class=\"title\">Attributes:</p>\r\n                    <span class=\"description\">&#43;2 Dexterity</span>\r\n                  </li>\r\n                  <li>\r\n                    <p class=\"title\">Skills:</p>\r\n                    <span class=\"description\">Acrobatics, Appraise, Bluff, Escape Artist, Intimidate, Knowledeg (Language), Knowledge (Nobility), Knowledge\r\n                      (Religion), Sense Motive, stealth</span>\r\n                  </li>\r\n                  <li>\r\n                    <p class=\"title\">Starting Gear:</p>\r\n                    <span class=\"description\">2 Daggers or a Naginate, 15 throwing knives, 1-4 vials of poison, 1-2 Bottles (contents vary), 10 smoke\r\n                      bombs</span>\r\n                  </li>\r\n                </ul>\r\n              </div>\r\n            </div>\r\n          </li>\r\n          <li>\r\n            <h3>Guards</h3>\r\n            <div class=\"description\">\r\n              <p>Those who are soldiers will have a bonus to using a sword and shield combo, and will be known to be on the\r\n                front line of the battle, not wavering in the face of danger, and ready to fight for their kingdom and Goddess.</p>\r\n              <div class=\"bonus\">\r\n                <h4>Bonuses</h4>\r\n                <ul>\r\n                  <li>\r\n                    <p class=\"title\">Attributes:</p>\r\n                    <span class=\"description\">&#43;2 Constitution</span>\r\n                  </li>\r\n                  <li>\r\n                    <p class=\"title\">Skills:</p>\r\n                    <span class=\"description\">Bluff, Diplomacy, Heal, Intimidate, Knowledge (Nobility), Knowledge (Religion), Profession, Ride, Sense\r\n                      Motive</span>\r\n                  </li>\r\n                  <li>\r\n                    <p class=\"title\">Starting Gear:</p>\r\n                    <span class=\"description\">Long Sword OR Greatsword, Iron Shield OR Iron Braces, 2-4 Bottles (Contents vary)</span>\r\n                  </li>\r\n                  <li>\r\n                    <p class=\"title\">Possible Animal Companions (Optional):</p>\r\n                    <span class=\"description\">Horse, Dog</span>\r\n                  </li>\r\n                </ul>\r\n              </div>\r\n            </div>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <div *ngIf=\"showRace[1]\">\r\n        <!--TODO: Add Race and subrace descriptions-->\r\n        <h2>Gorons</h2>\r\n        <div class=\"description\">\r\n          <p>Goron Description</p>\r\n          <div class=\"bonus\">\r\n            <h3>Bonuses</h3>\r\n            <ul>\r\n              <li>\r\n                <p class=\"title\">Attributes:</p>\r\n                <span class=\"description\">&#43;2 Constitution</span>\r\n              </li>\r\n              <li>\r\n                <p class=\"title\">Skills:</p>\r\n                <span class=\"description\">Appraise, Climb, Intimidate</span>\r\n              </li>\r\n              <li>\r\n                <p class=\"title\">Starting Gear:</p>\r\n                <span class=\"description\">5 Bombs, Goron Hammer, 1 Bottle of Red Potion</span>\r\n              </li>\r\n              <li>\r\n                <p class=\"title\">Mountain Mother, Stone Father:</p>\r\n                <span class=\"description\">All Gorons may use their Constitution modifier for calculating AC instead of Dexterity.</span>\r\n              </li>\r\n              <li>\r\n                <p class=\"title\">Mineral Diet:</p>\r\n                <span class=\"description\">Gorons have a love of stone. They gain advantage in checks to investigate stonework Also Gorons can consume\r\n                  stone at a rate of 1 cubic foot per minute.</span>\r\n              </li>\r\n              <li>\r\n                <p class=\"title\">Roll Out:</p>\r\n                <span class=\"description\">When a Goron uses the Charge or Run ability, they can roll to move up to 3x their base speed. They also had\r\n                  &#189; their level as damage to the charge attack.</span>\r\n              </li>\r\n              <li>\r\n                <p class=\"title\">Known Languages:</p>\r\n                <span class=\"description\">Hylian (common) and Goron</span>\r\n              </li>\r\n            </ul>\r\n          </div>\r\n        </div>\r\n        <h3>Sub Race Options</h3>\r\n        <ul>\r\n          <li>\r\n            <h3>Rock Spine</h3>\r\n            <div class=\"description\">\r\n              <p>Rock Spine Goron Description</p>\r\n              <div class=\"bonus\">\r\n                <h4>Bonuses</h4>\r\n                <ul>\r\n                  <li>\r\n                    <p class=\"title\">Attributes:</p>\r\n                    <span class=\"description\">&#43;2 Strength</span>\r\n                  </li>\r\n                  <li>\r\n                    <p class=\"title\">Avalanche:</p>\r\n                    <span class=\"description\">The rocky protrusions from a Goron's back can be utilized to make a charge particularly deadly. Rock\r\n                      Spine Gorons akso add their Constitution Mod to the damage of their charge attacks.</span>\r\n                  </li>\r\n                  <li>\r\n                    <p class=\"title\">Forged in the Hearth:</p>\r\n                    <span class=\"description\">Gain resistance to fire damage and gain advantage to saves against sources of fire damage.</span>\r\n                  </li>\r\n                </ul>\r\n              </div>\r\n            </div>\r\n          </li>\r\n          <li>\r\n            <h3>Soft Belly</h3>\r\n            <div class=\"description\">\r\n              <p>Soft Belly Goron Description</p>\r\n              <div class=\"bonus\">\r\n                <h4>Bonuses</h4>\r\n                <ul>\r\n                  <li>\r\n                    <p class=\"title\">Attributes:</p>\r\n                    <span class=\"description\">&#43;1 Wisdom</span>\r\n                  </li>\r\n                  <li>\r\n                    <p class=\"title\">Craftsman:</p>\r\n                    <span class=\"description\">Gain proficiency in one of the following crafts: Armor OR Hammers</span>\r\n                  </li>\r\n                  <li>\r\n                    <p class=\"title\">Strong Body, Strong Mind:</p>\r\n                    <span class=\"description\">You gain proficiency in one Intelligence or Wisdom based skill.</span>\r\n                  </li>\r\n                  <li>\r\n                    <p class=\"title\">Inorganic Origins:</p>\r\n                    <span class=\"description\">You are resistant to poison damage and gain advantages to saves against sources of poison damage.</span>\r\n                  </li>\r\n                </ul>\r\n              </div>\r\n            </div>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <div *ngIf=\"showRace[2]\">\r\n        <!--TODO: Add All-->\r\n        <h2>Zora</h2>\r\n        <div class=\"description\">\r\n          <p>Zora Description</p>\r\n          <div class=\"bonus\">\r\n            <h3>Bonuses</h3>\r\n            <ul></ul>\r\n          </div>\r\n        </div>\r\n        <h3>Sub Race Options</h3>\r\n        <ul>\r\n          <li>\r\n            <h3>River</h3>\r\n            <div class=\"description\">\r\n              <p>River Zora Description</p>\r\n              <div class=\"bonus\">\r\n                <h4>Bonuses</h4>\r\n                <ul></ul>\r\n              </div>\r\n            </div>\r\n          </li>\r\n          <li>\r\n            <h3>Ocean</h3>\r\n            <div class=\"description\">\r\n              <p>Ocean Zora Description</p>\r\n              <div class=\"bonus\">\r\n                <h4>Bonuses</h4>\r\n                <ul></ul>\r\n              </div>\r\n            </div>\r\n          </li>\r\n          <li>\r\n            <h3>Swamp</h3>\r\n            <div class=\"description\">\r\n              <p>Swamp Zora Description</p>\r\n              <div class=\"bonus\">\r\n                <h4>Bonuses</h4>\r\n                <ul></ul>\r\n              </div>\r\n            </div>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <div *ngIf=\"showRace[3]\">\r\n        <!--TODO: Add All-->\r\n        <h2>Gerudo</h2>\r\n        <div class=\"description\">\r\n          <p>Gerudo Description</p>\r\n          <div class=\"bonus\">\r\n            <h3>Bonuses</h3>\r\n            <ul></ul>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"showRace[4]\">\r\n        <!--TODO: Add All-->\r\n        <h2>Sheikah</h2>\r\n        <div class=\"description\">\r\n          <p>Sheikah Description</p>\r\n          <div class=\"bonus\">\r\n            <h3>Bonuses</h3>\r\n            <ul></ul>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"showRace[5]\">\r\n        <!--TODO: Add All-->\r\n        <h2>Rito</h2>\r\n        <div class=\"description\">\r\n          <p>Rito Description</p>\r\n          <div class=\"bonus\">\r\n            <h3>Bonuses</h3>\r\n            <ul></ul>\r\n          </div>\r\n        </div>\r\n        <h3>Sub Race Options</h3>\r\n        <ul>\r\n          <li>\r\n            <h3>Sharp Eye</h3>\r\n            <div class=\"description\">\r\n              <p>Sharp Eye Rito Description</p>\r\n              <div class=\"bonus\">\r\n                <h4>Bonuses</h4>\r\n                <ul></ul>\r\n              </div>\r\n            </div>\r\n          </li>\r\n          <li>\r\n            <h3>Sharp Tongue</h3>\r\n            <div class=\"description\">\r\n              <p>Sharp Tongue Rito Description</p>\r\n              <div class=\"bonus\">\r\n                <h4>Bonuses</h4>\r\n                <ul></ul>\r\n              </div>\r\n            </div>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <div *ngIf=\"showRace[6]\">\r\n        <!--TODO: Add All-->\r\n        <h2>Twili</h2>\r\n        <div class=\"description\">\r\n          <p>Twili Description</p>\r\n          <div class=\"bonus\">\r\n            <h3>Bonuses</h3>\r\n            <ul></ul>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"showRace[7]\">\r\n        <!--TODO: Add All-->\r\n        <h2>Faries</h2>\r\n        <div class=\"description\">\r\n          <p>Fariy Description</p>\r\n          <div class=\"bonus\">\r\n            <h3>Bonuses</h3>\r\n            <ul></ul>\r\n          </div>\r\n        </div>\r\n        <h3>Sub Race Options</h3>\r\n        <ul>\r\n          <li>\r\n            <h3>Din</h3>\r\n            <div class=\"description\">\r\n              <p>Din Fairy Description</p>\r\n              <div class=\"bonus\">\r\n                <h4>Bonuses</h4>\r\n                <ul></ul>\r\n              </div>\r\n            </div>\r\n          </li>\r\n          <li>\r\n            <h3>Farore</h3>\r\n            <div class=\"description\">\r\n              <p>Farore Fairy Description</p>\r\n              <div class=\"bonus\">\r\n                <h4>Bonuses</h4>\r\n                <ul></ul>\r\n              </div>\r\n            </div>\r\n          </li>\r\n          <li>\r\n            <h3>Nayru</h3>\r\n            <div class=\"description\">\r\n              <p>Nayru Fairy Description</p>\r\n              <div class=\"bonus\">\r\n                <h4>Bonuses</h4>\r\n                <ul></ul>\r\n              </div>\r\n            </div>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"modal\" [class.showModal]=\"error\">\r\n  <div class=\"modal-content\">\r\n    <div class=\"modal-header\">\r\n      <span class=\"close\" (click)=\"closeError()\">&times;</span>\r\n      <h2 class=\"error\">Error!</h2>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n      <p>When creating your character, please make sure not to allocate too many or too few skill points or attribute points.\r\n        Failure to recognize the limits of your character will result in an infinite loop of not being able to save. Thank\r\n        you.</p>\r\n      <div *ngIf=\"!newCharacter.name\">\r\n        <p>Please make sure to give your character a name. You don't want to be the nameless adventurer for this epic quest,\r\n          do you?</p>\r\n      </div>\r\n      <div *ngIf=\"!newCharacter.race\">\r\n        <p>Make sure to include a race for your character. Otherwise we shall call you a blob!</p>\r\n      </div>\r\n      <div *ngIf=\"newCharacter.race && !newCharacter.subRace\">\r\n        <p>If you are playing a race that has a subrace, make sure to choose one. Subraces give awesome bonuses to your character!\r\n          <br>If you are a Gerudo, Twili, or Sheikah disregard this message. You are already awesome.</p>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"column-holder\">\r\n  <div class=\"details\">\r\n    <h2>{{ newCharacter.name }} Details</h2>\r\n\r\n    <button (click)=\"save()\">Save Character</button>\r\n    <button (click)=\"cancel()\">Cancel New Character</button>\r\n    <h3> Choose your race.</h3>\r\n    <div class=\"race-input\">\r\n      <select [(ngModel)]=\"newCharacter.race\" (change)=\"raceChange()\">\r\n        <option value=\"Hylian\">Hylian</option>\r\n        <option value=\"Goron\">Goron</option>\r\n        <option value=\"Zora\">Zora</option>\r\n        <option value=\"Gerudo\">Gerudo</option>\r\n        <option value=\"Sheikah\">Sheikah</option>\r\n        <option value=\"Rito\">Rito</option>\r\n        <option value=\"Twili\">Twili</option>\r\n        <option value=\"Fairy\">Fairy</option>\r\n      </select>\r\n      <button (click)=\"aboutRace()\">About Races</button>\r\n      <div *ngIf=\"newCharacter.race && !(newCharacter.race ==='Gerudo' || newCharacter.race === 'Twili' || newCharacter.raace === 'Sheikah')\">\r\n        <h3>Choose your sub-race.</h3>\r\n\r\n        <div *ngIf=\"newCharacter.race==='Hylian'\">\r\n          <select [(ngModel)]=\"newCharacter.subRace\" (change)=\"raceChange()\">\r\n            <option value=\"Farmer\">Farmer</option>\r\n            <option value=\"Sheikah\">Sheikah</option>\r\n            <option value=\"Guard\">Guard</option>\r\n          </select>\r\n        </div>\r\n        <div *ngIf=\"newCharacter.race==='Goron'\">\r\n          <select [(ngModel)]=\"newCharacter.subRace\" (change)=\"raceChange()\">\r\n            <option value=\"Rock Spine\">Rock Spine</option>\r\n            <option value=\"Soft Belly\">Soft Belly</option>\r\n          </select>\r\n        </div>\r\n        <div *ngIf=\"newCharacter.race==='Zora'\">\r\n          <select [(ngModel)]=\"newCharacter.subRace\" (change)=\"raceChange()\">\r\n            <option value=\"River\">River</option>\r\n            <option value=\"Ocean\">Ocean</option>\r\n            <option value=\"Swamp\">Swamp</option>\r\n          </select>\r\n        </div>\r\n        <div *ngIf=\"newCharacter.race==='Fairy'\">\r\n          <select [(ngModel)]=\"newCharacter.subRace\" (change)=\"raceChange()\">\r\n            <option value=\"Din\">Din</option>\r\n            <option value=\"Farore\">Farore</option>\r\n            <option value=\"Nayru\">Nayru</option>\r\n          </select>\r\n        </div>\r\n        <div *ngIf=\"newCharacter.race==='Rito'\" (change)=\"raceChange()\">\r\n          <select [(ngModel)]=\"newCharacter.subRace\">\r\n            <option value=\"Sharp Eye\">Sharp Eye</option>\r\n            <option value=\"Sharp Tongue\">Sharp Tongue</option>\r\n          </select>\r\n        </div>\r\n\r\n      </div>\r\n    </div>\r\n    &nbsp;\r\n    <div class=\"attributes\">\r\n      <h3 [class.error]=\"0 > attPoints\">Attribute Points: {{ attPoints }}</h3>\r\n      <div class=\"table\">\r\n        <table>\r\n          <thead>\r\n            <tr>\r\n              <th>Traits</th>\r\n              <th>Value/Score</th>\r\n              <th>Modifier</th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr>\r\n              <td class=\"name\">Name</td>\r\n              <td>\r\n                <input class=\"skill\" type=\"text\" [(ngModel)]=\"newCharacter.name\" placeholder=\"Name\" maxlength=\"10\">\r\n              </td>\r\n            </tr>\r\n\r\n            <br/>\r\n\r\n            <tr *ngFor=\"let attr of newCharacter.attributes; index as i\" [class.din]=\"attr.name === 'Strength' || attr.name === 'Intelligence'\"\r\n              [class.farore]=\"attr.name === 'Dexterity' || attr.name === 'Charisma'\" [class.nayru]=\"attr.name === 'Wisdom' || attr.name === 'Constitution'\">\r\n              <td class=\"name\">{{ attr.name }}</td>\r\n              <td>\r\n                <input id=\"{{ 'attr'+i }}\" type=\"number\" [(ngModel)]=\"attr.value\" max=\"{{ 24 < attr.value + attPoints ? 24 : attr.value + attPoints }}\" min=\"{{ attrMins[i] }}\"\r\n                  (change)=\"trackAtt(i)\" (blur)=\"validateAttr(i)\">\r\n              </td>\r\n              <td>\r\n                {{ calcMod(attr) }} {{ attr.modifier }}\r\n              </td>\r\n            </tr>\r\n\r\n            <br/>\r\n\r\n            <tr class=\"din\">\r\n              <td class=\"name\">Health</td>\r\n              <td>\r\n                {{ 48+newCharacter.attributes[2].modifier }}\r\n              </td>\r\n            </tr>\r\n            <tr class=\"nayru\">\r\n              <td class=\"name\">Magic</td>\r\n              <td>\r\n                {{ 20+newCharacter.attributes[4].modifier }}\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"skills scrollable\">\r\n    <h2>{{ newCharacter.name }} Skills</h2>\r\n    <div class=\"abv-table\">\r\n      <h3 [class.error]=\"0 > skillPoints\">Skill Points: {{ skillPoints }}</h3>\r\n      <button (click)=\"resetSkills()\">Reset Skills</button>\r\n    </div>\r\n    <div class=\"table\">\r\n      <table>\r\n        <thead>\r\n          <tr>\r\n            <th>Trained</th>\r\n            <th>Skill Name</th>\r\n            <th>Skill Ranks</th>\r\n            <th>Racial Bonus</th>\r\n            <th>Modifier</th>\r\n            <th>Item Bonus</th>\r\n            <th>Misc Bonus</th>\r\n            <th>Total</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr *ngFor=\"let skill of newCharacter.skills; index as j\" [class.din]=\"skill.modifier === 'Strength' || skill.modifier === 'Intelligence'\"\r\n            [class.farore]=\"skill.modifier === 'Dexterity' || skill.modifier === 'Charisma'\" [class.nayru]=\"skill.modifier === 'Wisdom' || skill.modifier === 'Constitution'\">\r\n            <td>\r\n              <input class=\"skill-input\" disabled type=\"checkbox\" [(ngModel)]=\"skill.trained\">\r\n            </td>\r\n            <td class=\"name\">\r\n              <div *ngIf=\"skill.skillName==='Craft 1' || skill.skillName==='Craft 2' || skill.skillName==='Profession' || skill.skillName==='Perform'; then specialSkill; else normalSkill\"></div>\r\n\r\n              <ng-template #specialSkill>\r\n                <div *ngIf=\"skill.skillName==='Craft 1'\">\r\n                  {{ skill.skillName.substr(0, skill.skillName.length-1)}}\r\n                  <input class=\"skill\" type=\"text\" [(ngModel)]=\"newCharacter.craftOne\" placeholder=\"Craft One\">\r\n                </div>\r\n                <div *ngIf=\"skill.skillName==='Craft 2'\">\r\n                  {{ skill.skillName.substr(0, skill.skillName.length-1)}}\r\n                  <input class=\"skill\" type=\"text\" [(ngModel)]=\"newCharacter.craftTwo\" placeholder=\"Craft Two\">\r\n                </div>\r\n                <div *ngIf=\"skill.skillName==='Profession'\">\r\n                  {{ skill.skillName }}\r\n                  <input class=\"skill\" type=\"text\" [(ngModel)]=\"newCharacter.profession\" placeholder=\"Profession\">\r\n                </div>\r\n                <div *ngIf=\"skill.skillName==='Perform'\">\r\n                  {{ skill.skillName }}\r\n                  <input class=\"skill\" type=\"text\" [(ngModel)]=\"newCharacter.performCust\" placeholder=\"(Other)\">\r\n                </div>\r\n              </ng-template>\r\n              <ng-template #normalSkill>\r\n                {{ skill.skillName }}\r\n              </ng-template>\r\n            </td>\r\n            <td>\r\n              <input id=\"{{ 'skills'+j }}\" class=\"skill-input\" type=\"number\" [(ngModel)]=\"skill.ranks\" min=\"0\" max=\"{{ skill.ranks + skillPoints > 0 ? skill.ranks + skillPoints: 0 }}\" (change)=\"track(j, 'skills')\" (blur)=\"validate(j, 'skills')\" [class.non-zero]=\"skill.ranks > 0\">\r\n            </td>\r\n            <td>\r\n              {{ skill.racial }}\r\n            </td>\r\n            <td class=\"mod\">\r\n              {{ skill.modifier.substr(0,3) | uppercase }}\r\n              <span class=\"info\">{{ getMod(skill.modifier) }}</span>\r\n            </td>\r\n            <td>\r\n              <input class=\"skill-input\" type=\"number\" [(ngModel)]=\"skill.item\">\r\n            </td>\r\n            <td>\r\n              <input class=\"skill-input\" type=\"number\" [(ngModel)]=\"skill.misc\">\r\n            </td>\r\n            <td class=\"total\">\r\n              {{ (skill.trained ? 3 : 0) + skill.ranks + getMod(skill.modifier) + skill.item + skill.misc + skill.racial}}\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n\r\n    <h2>{{ newCharacter.name }} Weapon Skills</h2>\r\n    <div class=\"table\">\r\n      <table>\r\n        <thead>\r\n          <tr>\r\n            <th>Trained</th>\r\n            <th>Weapon Type</th>\r\n            <th>Skill Ranks</th>\r\n            <th>Racial Bonus</th>\r\n            <th>Total</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr *ngFor=\"let weapon of newCharacter.weaponSkills; index as k\" class=\"weapon\">\r\n            <td>\r\n              <input type=\"checkbox\" disabled [(ngModel)]=\"weapon.trained\">\r\n            </td>\r\n            <td class=\"name\">{{ weapon.skillName }}</td>\r\n            <td>\r\n              <input id=\"{{ 'weaponSkills'+k }}\" class=\"skill-input\" type=\"number\" [(ngModel)]=\"weapon.ranks\" min=\"0\" max=\"{{ weapon.ranks + skillPoints > 0 ? weapon.ranks + skillPoints : 0 }}\" (change)=\"track(k, 'weaponSkills')\" (blur)=\"validate(k, 'weaponSkills')\" [class.non-zero]=\"weapon.ranks > 0\">\r\n            </td>\r\n            <td>\r\n              {{ weapon.racial }}\r\n            </td>\r\n            <td class=\"total\">\r\n              {{ (weapon.trained ? 3 : 0) + weapon.ranks + weapon.racial }}\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n\r\n    <h2>{{ newCharacter.name }} Magic Skills</h2>\r\n    <div class=\"table\">\r\n      <table>\r\n        <thead>\r\n          <tr>\r\n            <th>Magic Type</th>\r\n            <th>Modifier</th>\r\n            <th>Skill Ranks</th>\r\n            <th>Total</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr *ngFor=\"let magic of newCharacter.magicSkills; index as m\" [class.din]=\"magic.modifier === 'Intelligence'\" [class.farore]=\"magic.modifier === 'Charisma'\"\r\n            [class.nayru]=\"magic.modifier === 'Wisdom'\">\r\n            <td class=\"name\">{{ magic.skillName }}</td>\r\n            <td class=\"mod\">\r\n              {{ magic.modifier.substr(0,3) | uppercase }}\r\n              <span class=\"info\">{{ getMod(magic.modifier) }}</span>\r\n            </td>\r\n            <td>\r\n              <input id=\"{{ 'magicSkills'+m }}\" class=\"skill-input\" type=\"number\" [(ngModel)]=\"magic.ranks\" min=\"0\" max=\"{{ magic.ranks + skillPoints > 0 ? magic.ranks + skillPoints : 0 }}\" (change)=\"track(m, 'magicSkills')\" (blur)=\"validate(m, 'magicSkills')\" [class.non-zero]=\"magic.ranks > 0\">\r\n            </td>\r\n            <td class=\"total\">\r\n              {{ magic.ranks + getMod(magic.modifier) }}\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/character-create/character-create.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/character-create/character-create.component.ts ***!
  \****************************************************************/
/*! exports provided: CharacterCreateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CharacterCreateComponent", function() { return CharacterCreateComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _characters_characters_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../characters/characters.component */ "./src/app/characters/characters.component.ts");
/* harmony import */ var _Character_character__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Character/character */ "./src/app/Character/character.ts");
/* harmony import */ var _Races_Races__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Races/Races */ "./src/app/Races/Races.ts");
/* harmony import */ var _Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Character/Enums/attributes.enum */ "./src/app/Character/Enums/attributes.enum.ts");
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../message.service */ "./src/app/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CharacterCreateComponent = /** @class */ (function () {
    function CharacterCreateComponent(message) {
        this.message = message;
        this.error = false;
        this.attrMins = [];
        this.attrPrior = [];
        this.attPoints = 48;
        this.showRaceModal = false;
        this.showRace = [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false // Fairy 7
        ];
        this.skillsPrior = [];
        this.weaponSkillsPrior = [];
        this.magicSkillsPrior = [];
        this.nullSubRaceClasses = ['Sheikah', 'Gerudo', 'Twili'];
    }
    CharacterCreateComponent.prototype.ngOnInit = function () {
        this.attrMins = [];
        this.attrPrior = [];
        this.skillsPrior = [];
        this.weaponSkillsPrior = [];
        this.magicSkillsPrior = [];
        this.newCharacter = new _Character_character__WEBPACK_IMPORTED_MODULE_2__["Character"]();
        this.originalPoints = this.skillPoints = (Math.round(Math.random() * 100) % 4 + 1) * 5;
        for (var i = 0; i < this.newCharacter.attributes.length; i++) {
            this.attrMins.push(this.newCharacter.attributes[i].value);
        }
    };
    CharacterCreateComponent.prototype.aboutRace = function () {
        this.showRaceModal = !this.showRaceModal;
    };
    CharacterCreateComponent.prototype.show = function (race) {
        for (var i = 0; i < this.showRace.length; i++) {
            this.showRace[i] = false;
        }
        this.showRace[race] = true;
    };
    CharacterCreateComponent.prototype.save = function () {
        var nullSubRace;
        console.log('Race:', this.newCharacter.race);
        if (!this.nullSubRaceClasses.includes(this.newCharacter.race)) {
            nullSubRace = this.newCharacter.subRace ? false : true;
        }
        else {
            nullSubRace = false;
        }
        if (this.newCharacter.name != null && (this.skillPoints === 0 && this.attPoints === 0) && !nullSubRace) {
            this.newCharacter.maxHealth = this.newCharacter.health = 48 + this.newCharacter.attributes[2].modifier;
            this.newCharacter.maxMagic = this.newCharacter.magic = 20 + this.newCharacter.attributes[4].modifier;
            this.CharacterParent.newChar = false;
            this.CharacterParent.characters.push(this.newCharacter);
            this.CharacterParent.selectedCharacter = this.newCharacter;
            this.createMessage();
        }
        else {
            this.error = true;
        }
        console.log('NullSubRace: ', nullSubRace);
        console.log('Skill Points Remaining: ', this.skillPoints);
        console.log('Attribute Points Left: ', this.attPoints);
        console.log('Character Name:', this.newCharacter.name);
    };
    CharacterCreateComponent.prototype.cancel = function () {
        this.CharacterParent.newChar = false;
        this.newCharacter = null;
    };
    CharacterCreateComponent.prototype.raceChange = function () {
        var raceTemp = this.newCharacter.race;
        switch (this.newCharacter.race) {
            case 'Hylian': {
                this.newCharacter = new _Races_Races__WEBPACK_IMPORTED_MODULE_3__["Hylian"](this.newCharacter.subRace ? this.newCharacter.subRace : null);
                break;
            }
            case 'Goron': {
                this.newCharacter = new _Races_Races__WEBPACK_IMPORTED_MODULE_3__["Goron"](this.newCharacter.subRace ? this.newCharacter.subRace : null);
                break;
            }
            case 'Zora': {
                this.newCharacter = new _Races_Races__WEBPACK_IMPORTED_MODULE_3__["Zora"](this.newCharacter.subRace ? this.newCharacter.subRace : null);
                break;
            }
            case 'Gerudo': {
                this.newCharacter = new _Races_Races__WEBPACK_IMPORTED_MODULE_3__["Gerudo"]();
                break;
            }
            case 'Sheikah': {
                this.newCharacter = new _Races_Races__WEBPACK_IMPORTED_MODULE_3__["Sheikah"]();
                break;
            }
            case 'Rito': {
                this.newCharacter = new _Races_Races__WEBPACK_IMPORTED_MODULE_3__["Rito"](this.newCharacter.subRace ? this.newCharacter.subRace : null);
                break;
            }
            case 'Twili': {
                this.newCharacter = new _Races_Races__WEBPACK_IMPORTED_MODULE_3__["Twili"]();
                break;
            }
            case 'Fairy': {
                this.newCharacter = new _Races_Races__WEBPACK_IMPORTED_MODULE_3__["Fairy"](this.newCharacter.subRace ? this.newCharacter.subRace : null);
                break;
            }
        }
        this.resetPriors();
        this.attPoints = 48;
        this.skillPoints = this.originalPoints;
        this.newCharacter.race = raceTemp;
        this.newCharacter.level = 1;
        this.newCharacter.exp = 0;
    };
    CharacterCreateComponent.prototype.resetPriors = function () {
        for (var i = 0; i < this.newCharacter.attributes.length; i++) {
            this.attrMins[i] = this.newCharacter.attributes[i].value;
        }
        for (var j = 0; j < this.attrPrior.length; j++) {
            this.attrPrior[j] = null;
        }
        for (var k = 0; k < this.skillsPrior.length; k++) {
            this.skillsPrior[k] = null;
        }
        for (var m = 0; m < this.weaponSkillsPrior.length; m++) {
            this.weaponSkillsPrior[m] = null;
        }
        for (var n = 0; n < this.magicSkillsPrior.length; n++) {
            this.magicSkillsPrior[n] = null;
        }
    };
    CharacterCreateComponent.prototype.calcMod = function (stat) {
        stat.modifier =
            stat.value % 2 === 0 ? (stat.value - 10) / 2 : (stat.value - 11) / 2;
    };
    CharacterCreateComponent.prototype.getMod = function (modName) {
        return this.newCharacter.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_4__["Attributes"][modName]].modifier;
    };
    CharacterCreateComponent.prototype.closeError = function () {
        this.error = false;
    };
    CharacterCreateComponent.prototype.trackAtt = function (attrIndex) {
        var val = this.newCharacter.attributes[attrIndex].value;
        var modifier = val % 2 === 0 ? (val - 10) / 2 : (val - 11) / 2;
        this.newCharacter.attributes[attrIndex].modifier = modifier;
        if (this.attrPrior[attrIndex]) {
            this.attPoints = this.attPoints - (val - this.attrPrior[attrIndex]);
        }
        else {
            this.attPoints = this.attPoints - (val - this.attrMins[attrIndex]);
        }
        this.attrPrior[attrIndex] = val;
    };
    CharacterCreateComponent.prototype.track = function (index, type) {
        var val = this.newCharacter[type][index].ranks;
        var PRIOR = 'Prior';
        if (this[type + PRIOR][index]) {
            this.skillPoints = this.skillPoints - (val - this[type + PRIOR][index]);
        }
        else {
            this.skillPoints = this.skillPoints - val;
        }
        this[type + PRIOR][index] = val;
    };
    CharacterCreateComponent.prototype.validateAttr = function (attrIndex) {
        var input = document.getElementById('attr' + attrIndex);
        if (this.newCharacter.attributes[attrIndex].value < this.attrMins[attrIndex]) {
            input.classList.add('bad-input');
            this.attPoints += (this.newCharacter.attributes[attrIndex].value - this.attrMins[attrIndex]);
            this.attrPrior[attrIndex] = this.newCharacter.attributes[attrIndex].value = this.attrMins[attrIndex];
        }
        else if (this.attPoints < 0) {
            input.classList.add('bad-input');
            this.newCharacter.attributes[attrIndex].value += this.attPoints;
            this.attrPrior[attrIndex] = this.newCharacter.attributes[attrIndex].value;
            this.attPoints -= this.attPoints;
        }
        else if (input.classList.contains('bad-input')) {
            input.classList.remove('bad-input');
        }
    };
    CharacterCreateComponent.prototype.validate = function (index, type) {
        var input = document.getElementById(type + index);
        var PRIOR = 'Prior';
        if (this.newCharacter[type][index].ranks < 0) {
            input.classList.add('bad-input');
            this.skillPoints += (this.newCharacter[type][index].ranks);
            this[type + PRIOR][index] = this.newCharacter[type][index].ranks = 0;
        }
        else if (this.skillPoints < 0) {
            input.classList.add('bad-input');
            this.newCharacter[type][index].ranks += this.skillPoints;
            this[type + PRIOR][index] = this.newCharacter[type][index].ranks;
            this.skillPoints -= this.skillPoints;
        }
        else if (input.classList.contains('bad-input')) {
            input.classList.remove('bad-input');
        }
    };
    CharacterCreateComponent.prototype.resetSkills = function () {
        for (var i = 0; i < this.newCharacter.skills.length; i++) {
            this.newCharacter.skills[i].ranks = 0;
        }
        for (var i = 0; i < this.newCharacter.weaponSkills.length; i++) {
            this.newCharacter.weaponSkills[i].ranks = 0;
        }
        for (var i = 0; i < this.newCharacter.magicSkills.length; i++) {
            this.newCharacter.magicSkills[i].ranks = 0;
        }
        this.resetPriors();
        this.skillPoints = this.originalPoints;
    };
    CharacterCreateComponent.prototype.createMessage = function () {
        var name = this.newCharacter.name;
        var race = this.newCharacter.race;
        var subRace = this.newCharacter.subRace ? this.newCharacter.subRace + ' ' : '';
        var message = name + ' the ' + subRace + race + ' was created.';
        this.message.add(message);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _characters_characters_component__WEBPACK_IMPORTED_MODULE_1__["CharactersComponent"])
    ], CharacterCreateComponent.prototype, "CharacterParent", void 0);
    CharacterCreateComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-character-create',
            template: __webpack_require__(/*! ./character-create.component.html */ "./src/app/character-create/character-create.component.html"),
            styles: [__webpack_require__(/*! ./character-create.component.css */ "./src/app/character-create/character-create.component.css")]
        }),
        __metadata("design:paramtypes", [_message_service__WEBPACK_IMPORTED_MODULE_5__["MessageService"]])
    ], CharacterCreateComponent);
    return CharacterCreateComponent;
}());



/***/ }),

/***/ "./src/app/character-detail/character-detail.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/character-detail/character-detail.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\ninput.skill{\r\n  width: 8em;\r\n}\r\n\r\n.crit{\r\n  color: gold;\r\n}\r\n\r\n.critmiss{\r\n  color:red;\r\n}\r\n\r\n.maxDmg{\r\n  color: #00aa00;\r\n}\r\n\r\nbutton.square{\r\n  height: 3em;\r\n  width: 3em;\r\n}\r\n\r\n.right{\r\n  margin-left: 83%;\r\n  margin-bottom: .5em;\r\n  margin-top: .5em;\r\n}\r\n\r\n.body-head{\r\n  margin: 1em .2em;\r\n}\r\n\r\n.menuBar{\r\n  color: black;\r\n  float: left;\r\n  width: calc(100% / 5);\r\n  background-color: #5cb85c;\r\n  cursor: pointer;\r\n  text-align: center;\r\n  transition: 0.6s;\r\n  margin-bottom: 1em;\r\n  /* height: 3.5em; */\r\n}\r\n\r\nh4.menu{\r\n  padding: 0.5em 1em;\r\n  margin: 0;\r\n}\r\n\r\n.menuBar:hover{\r\n  background-color: #229e22;\r\n}\r\n\r\n.menuBar.active{\r\n  background-color: #229e22;\r\n}\r\n\r\n@media(max-width: 900px){\r\n  .right{\r\n    margin-left: 50%;\r\n  }\r\n  .menuBar{\r\n    line-height: 3;\r\n  }\r\n  .menu{\r\n    padding-left: 1em;\r\n    padding-right: 1em;\r\n    text-align: center;\r\n    line-height: 1;\r\n    word-wrap: normal;\r\n  }\r\n}\r\n"

/***/ }),

/***/ "./src/app/character-detail/character-detail.component.html":
/*!******************************************************************!*\
  !*** ./src/app/character-detail/character-detail.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--Modals for various actions liking taking damage and healing, maybe leveling up!-->\r\n<div *ngIf=\"character\">\r\n  <!--Modify Health Modal-->\r\n  <div class=\"modal\" [class.showModal]=\"changeHP\">\r\n    <div class=\"modal-content small\">\r\n      <div class=\"modal-header\">\r\n        <span class=\"close\" (click)=\"modHealth()\">&times;</span>\r\n        <h2>Modify Health</h2>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"body-head\">\r\n          Current HP:\r\n          <span style=\"float:right; padding-right:5em; \">{{ character.health }}</span>\r\n        </div>\r\n        <select [(ngModel)]=\"type\">\r\n          <option value=\"-1\">Take Damage</option>\r\n          <option value=\"1\">Regain Health</option>\r\n        </select>\r\n        <input type=\"number\" [(ngModel)]=\"hpDmg\" placeholder=\"{{ hpDmg }}\" min=\"0\" max=\"{{ character.maxHealth + 10 }}\">\r\n        <button class=\"square\" (click)=\"modTheHMod(1)\">+1</button>\r\n        <button class=\"square\" (click)=\"modTheHMod(5)\">+5</button>\r\n        <button class=\"square\" (click)=\"modTheHMod(10)\">+10</button>\r\n        <div class=\"right\">\r\n          <button (click)=\"finalizeHealthMod()\">Done</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <!--Modify Magic Modal-->\r\n  <div class=\"modal\" [class.showModal]=\"changeMP\">\r\n    <div class=\"modal-content small\">\r\n      <div class=\"modal-header\">\r\n        <span class=\"close\" (click)=\"modMagic()\">&times;</span>\r\n        <h2>Modify Magic</h2>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"body-head\">\r\n          Current MP:\r\n          <span style=\"float:right; padding-right:5em; \">{{ character.magic }}</span>\r\n        </div>\r\n        <select [(ngModel)]=\"type\">\r\n          <option value=\"1\">Restore Magic</option>\r\n          <option value=\"-1\">Cast Magic</option>\r\n        </select>\r\n        <input type=\"number\" min=\"0\" [(ngModel)]=\"mpDmg\" placeholder=\"{{ mpDmg }}\" max=\"{{ character.maxMagic }}\">\r\n        <button class=\"square\" (click)=\"modTheMMod(1)\">+1</button>\r\n        <button class=\"square\" (click)=\"modTheMMod(5)\">+5</button>\r\n        <button class=\"square\" (click)=\"modTheMMod(10)\">+10</button>\r\n        <div class=\"right\">\r\n          <button (click)=\"finalizeMagicMod()\">Done</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <!--Level Up Modal-->\r\n  <div class=\"modal\" [class.showModal]=\"editMode\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <span class=\"close\" (click)=\"setEdit()\">&times;</span>\r\n        <h2>Level Up</h2>\r\n      </div>\r\n      <app-character-level-up [currChar]=\"character\" #levelUp></app-character-level-up>\r\n    </div>\r\n  </div>\r\n</div>\r\n<!--The rest of the application the shows the characters attributes and skills-->\r\n<div class=\"column-holder\">\r\n  <div *ngIf=\"character\">\r\n    <!--The table to show the characters attributes and the ability to roll dice with modifiers-->\r\n    <div class=\"details\">\r\n\r\n      <button style=\"margin-bottom: 1em;\" (click)=\"setEdit()\">Level Up</button><br/>\r\n      <button style=\"margin-bottom: 1em;\" (click)=\"gotHeartContainer()\">Get Heart Container</button>\r\n      <button style=\"margin-bottom: 1em;\" (click)=\"gotMagicContainer()\">Get Magic Container</button>\r\n\r\n      <!-- <div class=\"ct\">\r\n        <h3>Charts will go here!</h3>\r\n        <app-character-charts [character]=\"character\"></app-character-charts>\r\n      </div> -->\r\n\r\n      <button class=\"accordian\" (click)=\"expandDets()\">\r\n        <h2>{{ character.name | uppercase }} Details</h2>\r\n      </button>\r\n      <div class=\"panel\" [class.active]=\"showDets\">\r\n        <div class=\"attributes\">\r\n          <div class=\"table\">\r\n            <table>\r\n              <thead>\r\n                <tr>\r\n                  <th>Trait</th>\r\n                  <th>Value/Score</th>\r\n                  <th>Modifier</th>\r\n                </tr>\r\n              </thead>\r\n              <br/>\r\n              <tbody>\r\n                <tr>\r\n                  <td class=\"name\">Name</td>\r\n                  <td>{{ character.name }}</td>\r\n                </tr>\r\n                <tr>\r\n                  <td class=\"name\">Race</td>\r\n                  <td>{{ character.race }}</td>\r\n                </tr>\r\n                <tr [hidden]=\"!character.subRace\">\r\n                  <td class=\"name\">Sub Race</td>\r\n                  <td>{{ character.subRace }}</td>\r\n                </tr>\r\n                <tr>\r\n                  <td class=\"name\">Level</td>\r\n                  <td>{{ character.level }}</td>\r\n                </tr>\r\n                <br/>\r\n                <tr *ngFor=\"let attr of character.attributes\" [class.din]=\"attr.name === 'Strength' || attr.name === 'Intelligence'\" [class.farore]=\"attr.name === 'Dexterity' || attr.name === 'Charisma'\"\r\n                  [class.nayru]=\"attr.name === 'Wisdom' || attr.name === 'Constitution'\">\r\n                  <td class=\"name\">{{ attr.name }}</td>\r\n                  <td>{{ attr.value }}</td>\r\n                  <td>{{ attr.modifier }}</td>\r\n                </tr>\r\n                <br/>\r\n                <tr></tr>\r\n                <tr class=\"din\">\r\n                  <td class=\"name\">Health</td>\r\n                  <td>{{ character.health }} / {{ character.maxHealth }}</td>\r\n                  <td>\r\n                    <button (click)=\"modHealth()\">Modify HP</button>\r\n                  </td>\r\n                </tr>\r\n                <tr class=\"nayru\">\r\n                  <td class=\"name\">Magic</td>\r\n                  <td>{{ character.magic }} / {{ character.maxMagic }}</td>\r\n                  <td>\r\n                    <button (click)=\"modMagic()\">Modify MP</button>\r\n                  </td>\r\n                </tr>\r\n                <tr class=\"farore\">\r\n                  <td class=\"name\">Experience</td>\r\n                  <td>{{ character.exp }}</td>\r\n                  <td></td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <br/>\r\n\r\n      <div>\r\n        <button class=\"accordian\" (click)=\"expandSaves()\">\r\n            <h2>Saving Thorws</h2>\r\n        </button>\r\n        <div class=\"panel\" [class.active]=\"showSaves\">\r\n          <app-character-saves [character]=\"character\" [characterDetailComponent]=\"this\"></app-character-saves>\r\n        </div>\r\n        \r\n      </div>\r\n\r\n      <h3> Roll Dice\r\n        <span style=\"float: right; padding-right:5em;\" *ngIf=\"roll\" [class.crit]=\"this.crit\" [class.critmiss]=\"this.critmiss\" [class.maxDmg]=\"this.maxDmg\">\r\n          {{ roll }}\r\n        </span>\r\n      </h3>\r\n\r\n      <h4> Add a modifier to your roll.</h4>\r\n      <select [(ngModel)]=\"rollMod\">\r\n        <option value=\"null\" selected=\"selected\">None</option>\r\n        <option *ngFor=\"let attr of character.attributes\" [value]=\"attr.name\">{{ attr.name }}</option>\r\n      </select>\r\n      <br>\r\n      <br>\r\n      <app-die [sides]=\"4\" [character]=\"this\" [mod]=\"rollMod\"></app-die>\r\n      <app-die [sides]=\"6\" [character]=\"this\" [mod]=\"rollMod\"></app-die>\r\n      <app-die [sides]=\"8\" [character]=\"this\" [mod]=\"rollMod\"></app-die>\r\n      <app-die [sides]=\"12\" [character]=\"this\" [mod]=\"rollMod\"></app-die>\r\n      <app-die [sides]=\"20\" [character]=\"this\" [mod]=\"rollMod\"></app-die>\r\n      <app-die [sides]=\"100\" [character]=\"this\"></app-die>\r\n\r\n\r\n    </div>\r\n    <!--The table to show the character's skills (weapon, magic and normal)-->\r\n    <div class=\"skills scrollable\">\r\n      <div class=\"menuBar\" [class.active]=\"showSet[0]\" (click)=\"changeSection(0)\">\r\n        <h4 class=\"menu\">{{ character.name }}<br/>Skills</h4>\r\n      </div>\r\n      <div class=\"menuBar\" [class.active]=\"showSet[1]\" (click)=\"changeSection(1)\">\r\n        <h4 class=\"menu\">{{ character.name }}<br/>Weapons</h4>\r\n      </div>\r\n      <div class=\"menuBar\" [class.active]=\"showSet[2]\" (click)=\"changeSection(2)\">\r\n        <h4 class=\"menu\">{{ character.name }}<br/>Spells</h4>\r\n      </div>\r\n      <div class=\"menuBar\" [class.active]=\"showSet[3]\" (click)=\"changeSection(3)\">\r\n          <h4 class=\"menu\">{{ character.name }}<br/>Inventory</h4>\r\n        </div>\r\n        <div class=\"menuBar\" [class.active]=\"showSet[4]\" (click)=\"changeSection(4)\">\r\n            <h4 class=\"menu\">{{ character.name }}<br/>Notes</h4>\r\n          </div>\r\n      <div *ngIf=\"showSet[0]\">\r\n        <app-character-skills [character]=\"character\"></app-character-skills>\r\n      </div>\r\n      <div *ngIf=\"showSet[1]\">\r\n        <app-character-weapon [character]=\"character\"></app-character-weapon>\r\n      </div>\r\n      <div *ngIf=\"showSet[2]\">\r\n        <app-character-spell [character]=\"character\"></app-character-spell>\r\n      </div>\r\n      <div *ngIf=\"showSet[3]\">\r\n          <app-character-inventory [character]=\"character\"></app-character-inventory>\r\n        </div>\r\n        <div *ngIf=\"showSet[4]\">\r\n            <app-character-notes [character]=\"character\"></app-character-notes>\r\n          </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/character-detail/character-detail.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/character-detail/character-detail.component.ts ***!
  \****************************************************************/
/*! exports provided: CharacterDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CharacterDetailComponent", function() { return CharacterDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Character_character__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Character/character */ "./src/app/Character/character.ts");
/* harmony import */ var _character_level_up_character_level_up_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../character-level-up/character-level-up.component */ "./src/app/character-level-up/character-level-up.component.ts");
/* harmony import */ var _Character_character_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Character/character-methods */ "./src/app/Character/character-methods.ts");
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../message.service */ "./src/app/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CharacterDetailComponent = /** @class */ (function () {
    function CharacterDetailComponent(message) {
        this.message = message;
        this.rollMod = 'null';
        this.editMode = false;
        this.crit = false;
        this.critmiss = false;
        this.maxDmg = false;
        this.showDets = true;
        this.showSaves = true;
        this.changeHP = false;
        this.changeMP = false;
        this.showSet = [true, false, false, false, false];
        this.type = 1;
    }
    CharacterDetailComponent.prototype.ngOnInit = function () { };
    CharacterDetailComponent.prototype.finalizeHealthMod = function () {
        var maxHealth = this.character.maxHealth;
        var health = this.character.health;
        health + this.hpDmg * this.type > maxHealth ? this.character.health = maxHealth : this.character.health += this.hpDmg * this.type;
        this.character.health < -10 ? this.character.health = -10 : this.character.health = this.character.health;
        this.changeHP = false;
    };
    CharacterDetailComponent.prototype.modTheHMod = function (addition) {
        this.hpDmg + addition > this.character.maxHealth + 10 ? this.hpDmg = this.character.maxHealth + 10 : this.hpDmg += addition;
    };
    CharacterDetailComponent.prototype.finalizeMagicMod = function () {
        var maxMagic = this.character.maxMagic;
        var magic = this.character.magic;
        magic + this.mpDmg * this.type > maxMagic ? this.character.magic = maxMagic : this.character.magic += this.mpDmg * this.type;
        this.character.magic < 0 ? this.character.magic = 0 : this.character.magic = this.character.magic;
        this.changeMP = false;
    };
    CharacterDetailComponent.prototype.modTheMMod = function (addition) {
        this.mpDmg + addition > this.character.maxMagic ? this.mpDmg = this.character.maxMagic : this.mpDmg += addition;
    };
    CharacterDetailComponent.prototype.modHealth = function () {
        this.hpDmg = 0;
        this.changeHP = !this.changeHP;
    };
    CharacterDetailComponent.prototype.modMagic = function () {
        this.mpDmg = 0;
        this.changeMP = !this.changeMP;
    };
    CharacterDetailComponent.prototype.expandDets = function () {
        this.showDets = !this.showDets;
    };
    CharacterDetailComponent.prototype.expandSaves = function () {
        this.showSaves = !this.showSaves;
    };
    CharacterDetailComponent.prototype.setRoll = function (value) {
        this.roll = value;
    };
    CharacterDetailComponent.prototype.setEdit = function () {
        this.levelUp.ngOnInit();
        if (!this.editMode) {
            _Character_character_methods__WEBPACK_IMPORTED_MODULE_3__["methods"].levelUp(this.character);
        }
        this.editMode = !this.editMode;
    };
    CharacterDetailComponent.prototype.changeSection = function (index) {
        for (var i = 0; i < this.showSet.length; i++) {
            this.showSet[i] = false;
        }
        this.showSet[index] = true;
    };
    CharacterDetailComponent.prototype.gotHeartContainer = function () {
        this.character.health = this.character.maxHealth += 16;
        this.createMessage(16, 'heart');
    };
    CharacterDetailComponent.prototype.gotMagicContainer = function () {
        this.character.magic = this.character.maxMagic += 6;
        this.createMessage(6, 'magic');
    };
    CharacterDetailComponent.prototype.createMessage = function (value, type) {
        var name = this.character.name;
        var obtained = ' obtained a ' + type + ' container ';
        var val = 'for ' + value + (type === 'heart' ? 'HP' : 'MP') + '.';
        var message = name + obtained + val;
        this.message.add(message);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('levelUp'),
        __metadata("design:type", _character_level_up_character_level_up_component__WEBPACK_IMPORTED_MODULE_2__["CharacterLevelUpComponent"])
    ], CharacterDetailComponent.prototype, "levelUp", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _Character_character__WEBPACK_IMPORTED_MODULE_1__["Character"])
    ], CharacterDetailComponent.prototype, "character", void 0);
    CharacterDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-character-detail',
            template: __webpack_require__(/*! ./character-detail.component.html */ "./src/app/character-detail/character-detail.component.html"),
            styles: [__webpack_require__(/*! ./character-detail.component.css */ "./src/app/character-detail/character-detail.component.css")]
        }),
        __metadata("design:paramtypes", [_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"]])
    ], CharacterDetailComponent);
    return CharacterDetailComponent;
}());



/***/ }),

/***/ "./src/app/character-inventory/character-inventory.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/character-inventory/character-inventory.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/character-inventory/character-inventory.component.html":
/*!************************************************************************!*\
  !*** ./src/app/character-inventory/character-inventory.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2>\r\n  CAUTION!!!\r\n</h2>\r\n<h3>\r\n  Still in development!\r\n</h3>\r\n<p>\r\n  This is where each character will be able to view and add items to their inventory. Currently I'm thinking that an item will have a \"name\" a description, a quantity, and maybe where it was found if a player wants to note that. Still a lot to implement into the character sheets, but we are coming closer to a finished product.\r\n</p>\r\n"

/***/ }),

/***/ "./src/app/character-inventory/character-inventory.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/character-inventory/character-inventory.component.ts ***!
  \**********************************************************************/
/*! exports provided: CharacterInventoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CharacterInventoryComponent", function() { return CharacterInventoryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Character_character__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Character/character */ "./src/app/Character/character.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CharacterInventoryComponent = /** @class */ (function () {
    function CharacterInventoryComponent() {
    }
    CharacterInventoryComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _Character_character__WEBPACK_IMPORTED_MODULE_1__["Character"])
    ], CharacterInventoryComponent.prototype, "character", void 0);
    CharacterInventoryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-character-inventory',
            template: __webpack_require__(/*! ./character-inventory.component.html */ "./src/app/character-inventory/character-inventory.component.html"),
            styles: [__webpack_require__(/*! ./character-inventory.component.css */ "./src/app/character-inventory/character-inventory.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], CharacterInventoryComponent);
    return CharacterInventoryComponent;
}());



/***/ }),

/***/ "./src/app/character-level-up/character-level-up.component.css":
/*!*********************************************************************!*\
  !*** ./src/app/character-level-up/character-level-up.component.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".tab{\r\n  width: calc(100% / 2 );\r\n}\r\n.skill{\r\n  width: calc(100% / 3);\r\n}\r\n.bad-input, input:out-of-range{\r\n  background-color: lightcoral;\r\n}\r\n@media(max-width: 900px){\r\n  .skill{\r\n    height: 2em;\r\n    vertical-align: auto;\r\n  }\r\n}"

/***/ }),

/***/ "./src/app/character-level-up/character-level-up.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/character-level-up/character-level-up.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"body-header\">\r\n  <div class=\"tab\" (click)=\"showTab(0)\">Attributes</div>\r\n  <div class=\"tab\" (click)=\"showTab(1)\">Skills</div>\r\n</div>\r\n<div class=\"modal-body\">\r\n  <div>\r\n    <div *ngIf=\"attributeTab\">\r\n      <p style=\"text-align: center;\">Congratulations on leveling up! You may now place\r\n        <b>{{ attrPoints }}</b> attribute point into any attribute!</p>\r\n      <div class=\"table\">\r\n        <table>\r\n          <thead>\r\n            <tr>\r\n              <th>Trait</th>\r\n              <th>Score</th>\r\n              <th>Modifier</th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr *ngFor=\"let attr of currChar.attributes; index as i\" [class.din]=\"attr.name === 'Strength' || attr.name === 'Intelligence'\"\r\n              [class.farore]=\"attr.name === 'Dexterity' || attr.name === 'Charisma'\" [class.nayru]=\"attr.name === 'Wisdom' || attr.name === 'Constitution'\">\r\n              <td class=\"name\">{{ attr.name }}</td>\r\n              <td>\r\n                <input id=\"{{ 'attr'+i }}\" type=\"number\" placeholder=\"{{ attr.value }}\" min=\"{{minimums[i]}}\" max=\"{{ attr.value + attrPoints > minimums[i] ? attr.value + attrPoints : minimums[i] }}\" [(ngModel)]=\"attr.value\"\r\n                  (change)=\"trackAtt(i)\" (blur)=\"validateAttr(i)\" />\r\n              </td>\r\n              <td>{{ attr.modifier }}</td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"skillTab\">\r\n      <p style=\"text-align: center;\">Congratulations on leveling up! You may now place\r\n        <b>{{ skillPoints }}</b> skill point into whicever skills you would like!</p>\r\n      <div class=\"bar\">\r\n        <div class=\"tab skill\" (click)=\"showSkillTab(0)\">Skills</div>\r\n        <div class=\"tab skill\" (click)=\"showSkillTab(1)\">Weapon Skills</div>\r\n        <div class=\"tab skill\" (click)=\"showSkillTab(2)\">Magic Skills</div>\r\n      </div>\r\n\r\n      <!--Regular Skills Table-->\r\n      <div *ngIf=\"skillTypeTab[0]\">\r\n        <div class=\"table\">\r\n          <table>\r\n            <thead>\r\n              <tr>\r\n                <th>Trained</th>\r\n                <th>Skill Name</th>\r\n                <th>Skill Ranks</th>\r\n                <th>Racial Bonus</th>\r\n                <th>Modifier</th>\r\n                <th>Item Bonus</th>\r\n                <th>Misc. Ranks</th>\r\n                <th>Total</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let skill of currChar.skills; index as i\" [class.din]=\"skill.modifier === 'Strength' || skill.modifier === 'Intelligence'\"\r\n                [class.farore]=\"skill.modifier === 'Dexterity' || skill.modifier === 'Charisma'\" [class.nayru]=\"skill.modifier === 'Wisdom' || skill.modifier === 'Constitution'\">\r\n                <td>\r\n                  <input type=\"checkbox\" disabled [checked]=\"skill.trained\" class=\"skill-input\">\r\n                </td>\r\n                <td class=\"name\">\r\n                  <div *ngIf=\"skill.skillName==='Craft 1' || skill.skillName==='Craft 2' || skill.skillName==='Profession' || skill.skillName==='Perform'; then specialSkill; else normalSkill\"></div>\r\n                  <ng-template #specialSkill>\r\n                    <div *ngIf=\"skill.skillName==='Craft 1'\">\r\n                      {{ skill.skillName.substr(0, skill.skillName.length-1)}} {{ currChar.craftOne }}\r\n                    </div>\r\n                    <div *ngIf=\"skill.skillName==='Craft 2'\">\r\n                      {{ skill.skillName.substr(0, skill.skillName.length-1)}} {{ currChar.craftTwo }}\r\n                    </div>\r\n                    <div *ngIf=\"skill.skillName==='Profession'\">\r\n                      {{ skill.skillName }} {{ currChar.profession }}\r\n                    </div>\r\n                    <div *ngIf=\"skill.skillName==='Perform'\">\r\n                      {{ skill.skillName }} {{ currChar.performCust }}\r\n                    </div>\r\n                  </ng-template>\r\n                  <ng-template #normalSkill>\r\n                    {{ skill.skillName }}\r\n                  </ng-template>\r\n                </td>\r\n                <td>\r\n                  <input id=\"{{ 'skills'+i }}\" class=\"skill-input\" type=\"number\" [(ngModel)]=\"skill.ranks\" min=\"{{ skillStarts[i] }}\" max=\"{{ skill.ranks + skillPoints > skillStarts[i] ? skill.ranks + skillPoints : skillStarts[i] }}\"\r\n                    (change)=\"track(i, 'skills')\" (blur)=\"validate(i, 'skills')\">\r\n                </td>\r\n                <td>\r\n                  {{ skill.racial }}\r\n                </td>\r\n                <td class=\"mod\">\r\n                  {{ skill.modifier.substr(0,3) | uppercase }}\r\n                  <span class=\"info\">{{ getMod(skill.modifier) }}</span>\r\n                </td>\r\n                <td>\r\n                  {{ skill.item }}\r\n                </td>\r\n                <td>\r\n                  {{ skill.misc }}\r\n                </td>\r\n                <td class=\"total\">\r\n                  {{ (skill.trained ? 3 : 0) + skill.ranks + getMod(skill.modifier) + skill.item + skill.misc + skill.racial}}\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n      <!--Weapon Skills Table-->\r\n      <div *ngIf=\"skillTypeTab[1]\">\r\n        <div class=\"table\">\r\n          <table>\r\n            <thead>\r\n              <tr>\r\n                <th>Trained</th>\r\n                <th>Weapon Type</th>\r\n                <th>Skill Ranks</th>\r\n                <th>Racial Bonus</th>\r\n                <th>Total</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let weapon of currChar.weaponSkills; index as j\" class=\"weapon\">\r\n                <td>\r\n                  <input class=\"skill-input\" type=\"checkbox\" disabled [checked]=\"weapon.trained\">\r\n                </td>\r\n                <td class=\"name\">\r\n                  {{ weapon.skillName }}\r\n                </td>\r\n                <td>\r\n                  <input id=\"{{ 'weaponSkills'+j }}\" class=\"skill-input\" type=\"number\" min=\"{{ weaponStarts[j] }}\" max=\"{{ weapon.ranks + skillPoints > weaponStarts[j] ? weapon.ranks + skillPoints : weaponStarts[j] }}\" [(ngModel)]=\"weapon.ranks\" (change)=\"track(j, 'weaponSkills')\" (blur)=\"validate(j, 'weaponSkills')\">\r\n                </td>\r\n                <td>\r\n                  {{ weapon.racial }}\r\n                </td>\r\n                <td>\r\n                  {{ (weapon.trained ? 3 : 0) + weapon.ranks + weapon.racial }}\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n      <!--Magic Skills Table-->\r\n      <div *ngIf=\"skillTypeTab[2]\">\r\n        <div class=\"table\">\r\n          <table>\r\n            <thead>\r\n              <tr>\r\n                <th>Magic Type</th>\r\n                <th>Modifier</th>\r\n                <th>Skill Ranks</th>\r\n                <th>Total</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let magic of currChar.magicSkills; index as k\" [class.din]=\"magic.modifier === 'Intelligence'\" [class.farore]=\"magic.modifier === 'Charisma'\"\r\n                [class.nayru]=\"magic.modifier === 'Wisdom'\">\r\n                <td class=\"name\">\r\n                  {{ magic.skillName }}\r\n                </td>\r\n                <td class=\"mod\">\r\n                  {{ magic.modifier.substr(0,3) | uppercase }}\r\n                  <span class=\"info\">{{ getMod(magic.modifier) }}</span>\r\n                </td>\r\n                <td>\r\n                  <input id=\"{{ 'magicSkills'+k }}\" class=\"skill-input\" type=\"number\" [(ngModel)]=\"magic.ranks\" min=\"{{ magicStarts[k] }}\" max=\"{{ magic.ranks + skillPoints > magicStarts[k] ? magic.ranks + skillPoints : magicStarts[k] }}\"\r\n                    (change)=\"track(k, 'magicSkills')\" (blur)=\"validate(k, 'magicSkills')\">\r\n                </td>\r\n                <td class=\"total\">\r\n                  {{ magic.ranks + getMod(magic.modifier) }}\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div>\r\n  </div>"

/***/ }),

/***/ "./src/app/character-level-up/character-level-up.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/character-level-up/character-level-up.component.ts ***!
  \********************************************************************/
/*! exports provided: CharacterLevelUpComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CharacterLevelUpComponent", function() { return CharacterLevelUpComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Character_character__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Character/character */ "./src/app/Character/character.ts");
/* harmony import */ var _Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Character/Enums/attributes.enum */ "./src/app/Character/Enums/attributes.enum.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CharacterLevelUpComponent = /** @class */ (function () {
    function CharacterLevelUpComponent() {
        this.attributeTab = true;
        this.skillTab = !this.attributeTab;
        this.skillTypeTab = [true, false, false];
        this.minimums = [];
        this.skillStarts = [];
        this.weaponStarts = [];
        this.magicStarts = [];
        this.attrPrior = [];
        this.skillsPrior = [];
        this.weaponSkillsPrior = [];
        this.magicSkillsPrior = [];
    }
    CharacterLevelUpComponent.prototype.ngOnInit = function () {
        this.attrPoints = 1;
        this.skillPoints = 10;
        var minimums = [];
        for (var i = 0; i < this.currChar.attributes.length; i++) {
            minimums.push(this.currChar.attributes[i].value);
        }
        this.minimums = minimums;
        this.attrPrior = this.minimums;
        var skillStarts = [];
        for (var j = 0; j < this.currChar.skills.length; j++) {
            skillStarts.push(this.currChar.skills[j].ranks);
        }
        this.skillStarts = skillStarts;
        this.skillsPrior = this.skillStarts;
        var weaponStarts = [];
        for (var k = 0; k < this.currChar.weaponSkills.length; k++) {
            weaponStarts.push(this.currChar.weaponSkills[k].ranks);
        }
        this.weaponStarts = weaponStarts;
        this.weaponSkillsPrior = this.weaponStarts;
        var magicStarts = [];
        for (var m = 0; m < this.currChar.magicSkills.length; m++) {
            magicStarts.push(this.currChar.magicSkills[m].ranks);
        }
        this.magicStarts = magicStarts;
        this.magicSkillsPrior = this.magicStarts;
    };
    CharacterLevelUpComponent.prototype.showTab = function (tabIndex) {
        this.attributeTab = tabIndex === 0;
        this.skillTab = !this.attributeTab;
    };
    CharacterLevelUpComponent.prototype.getMod = function (modName) {
        return this.currChar.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__["Attributes"][modName]].modifier;
    };
    CharacterLevelUpComponent.prototype.showSkillTab = function (skillTabIndex) {
        this.skillTypeTab[skillTabIndex] = true;
        this.skillTypeTab[(skillTabIndex + 1) % 3] = this.skillTypeTab[(skillTabIndex + 2) % 3] = false;
    };
    CharacterLevelUpComponent.prototype.trackAtt = function (attrIndex) {
        var val = this.currChar.attributes[attrIndex].value;
        var modifier = val % 2 === 0 ? (val - 10) / 2 : (val - 11) / 2;
        this.currChar.attributes[attrIndex].modifier = modifier;
        if (this.attrPrior[attrIndex]) {
            this.attrPoints = this.attrPoints - (val - this.attrPrior[attrIndex]);
        }
        else {
            this.attrPoints = this.attrPoints - (val - this.minimums[attrIndex]);
        }
        this.attrPrior[attrIndex] = val;
    };
    CharacterLevelUpComponent.prototype.track = function (index, type) {
        var val = this.currChar[type][index].ranks;
        var PRIOR = 'Prior';
        if (this[type + PRIOR][index]) {
            this.skillPoints = this.skillPoints - (val - this[type + PRIOR][index]);
        }
        else {
            this.skillPoints = this.skillPoints - val;
        }
        this[type + PRIOR][index] = val;
    };
    CharacterLevelUpComponent.prototype.validateAttr = function (attrIndex) {
        var input = document.getElementById('attr' + attrIndex);
        if (this.currChar.attributes[attrIndex].value < this.minimums[attrIndex]) {
            input.classList.add('bad-input');
            this.attrPoints += (this.currChar.attributes[attrIndex].value - this.minimums[attrIndex]);
            this.attrPrior[attrIndex] = this.currChar.attributes[attrIndex].value = this.minimums[attrIndex];
        }
        else if (this.attrPoints < 0) {
            input.classList.add('bad-input');
            this.currChar.attributes[attrIndex].value += this.attrPoints;
            this.attrPrior[attrIndex] = this.currChar.attributes[attrIndex].value;
            this.attrPoints -= this.attrPoints;
        }
        else if (input.classList.contains('bad-input')) {
            input.classList.remove('bad-input');
        }
    };
    CharacterLevelUpComponent.prototype.validate = function (index, type) {
        var input = document.getElementById(type + index);
        var PRIOR = 'Prior';
        if (this.currChar[type][index].ranks < 0) {
            input.classList.add('bad-input');
            this.skillPoints += (this.currChar[type][index].ranks);
            this[type + PRIOR][index] = this.currChar[type][index].ranks = 0;
        }
        else if (this.skillPoints < 0) {
            input.classList.add('bad-input');
            this.currChar[type][index].ranks += this.skillPoints;
            this[type + PRIOR][index] = this.currChar[type][index].ranks;
            this.skillPoints -= this.skillPoints;
        }
        else if (input.classList.contains('bad-input')) {
            input.classList.remove('bad-input');
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _Character_character__WEBPACK_IMPORTED_MODULE_1__["Character"])
    ], CharacterLevelUpComponent.prototype, "currChar", void 0);
    CharacterLevelUpComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-character-level-up',
            template: __webpack_require__(/*! ./character-level-up.component.html */ "./src/app/character-level-up/character-level-up.component.html"),
            styles: [__webpack_require__(/*! ./character-level-up.component.css */ "./src/app/character-level-up/character-level-up.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], CharacterLevelUpComponent);
    return CharacterLevelUpComponent;
}());



/***/ }),

/***/ "./src/app/character-notes/character-notes.component.css":
/*!***************************************************************!*\
  !*** ./src/app/character-notes/character-notes.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".notes{\r\n  margin-top: 1em;\r\n  margin-bottom: 1em;\r\n  height: 50vh;\r\n}\r\n\r\n.noteInput{\r\n  width: 50%;\r\n  height: 2em;\r\n}\r\n\r\n.noteButton{\r\n  float: right;\r\n}\r\n\r\n.newNoteComps{\r\n  margin-bottom: 1em;\r\n}"

/***/ }),

/***/ "./src/app/character-notes/character-notes.component.html":
/*!****************************************************************!*\
  !*** ./src/app/character-notes/character-notes.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"notes\">\r\n\r\n  <div class=\"newNoteComps\">\r\n    <input class=\"noteInput\" type=\"text\" [(ngModel)]=\"newMsg\" placeholder=\"New Note\">\r\n    Important: <input type=\"checkbox\" [(ngModel)]=\"important\">\r\n    <button class=\"noteButton\" (click)=\"addNote()\">Make Note</button>\r\n  </div>\r\n\r\n  <button class=\"accordian\" (click)=\"expandNotes(0)\">\r\n    <h2>Important Notes</h2>\r\n  </button>\r\n  <div class=\"panel\" [class.active]=\"showNotes[0]\">\r\n    <ul>\r\n      <li *ngFor=\"let note of character.importantNotes\">{{ note.time }} <span class=\"message\">{{ note.msg }}</span></li>\r\n    </ul>\r\n  </div>\r\n\r\n  <button class=\"accordian\" (click)=\"expandNotes(1)\">\r\n    <h2>Other Notes</h2>\r\n  </button>\r\n\r\n  <div class=\"panel\" [class.active]=\"showNotes[1]\">\r\n    <ul>\r\n      <li *ngFor=\"let note of character.notes\">{{ note.time }} <span class=\"message\">{{ note.msg }}</span></li>\r\n    </ul>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/character-notes/character-notes.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/character-notes/character-notes.component.ts ***!
  \**************************************************************/
/*! exports provided: CharacterNotesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CharacterNotesComponent", function() { return CharacterNotesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Character_character__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Character/character */ "./src/app/Character/character.ts");
/* harmony import */ var _Character_note__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Character/note */ "./src/app/Character/note.ts");
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../message.service */ "./src/app/message.service.ts");
/* harmony import */ var _Character_character_methods__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Character/character-methods */ "./src/app/Character/character-methods.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CharacterNotesComponent = /** @class */ (function () {
    function CharacterNotesComponent(message) {
        this.message = message;
        this.notes = [];
        this.showNotes = [true, true];
        this.newNote = false;
    }
    CharacterNotesComponent.prototype.ngOnInit = function () {
        this.notes = this.character.notes;
    };
    CharacterNotesComponent.prototype.addNote = function () {
        this.note = new _Character_note__WEBPACK_IMPORTED_MODULE_2__["Note"]();
        this.note.time = _Character_character_methods__WEBPACK_IMPORTED_MODULE_4__["methods"].getDateString().split(' ')[0];
        this.note.msg = this.newMsg;
        this.note.important = this.important;
        if (this.important) {
            this.character.importantNotes.unshift(this.note);
        }
        else {
            this.character.notes.unshift(this.note);
        }
        this.newMsg = '';
        this.important = false;
    };
    CharacterNotesComponent.prototype.makeNewNote = function () {
        this.newNote = !this.newNote;
    };
    CharacterNotesComponent.prototype.expandNotes = function (index) {
        this.showNotes[index] = !this.showNotes[index];
        console.log(index, this.showNotes[index]);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _Character_character__WEBPACK_IMPORTED_MODULE_1__["Character"])
    ], CharacterNotesComponent.prototype, "character", void 0);
    CharacterNotesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-character-notes',
            template: __webpack_require__(/*! ./character-notes.component.html */ "./src/app/character-notes/character-notes.component.html"),
            styles: [__webpack_require__(/*! ./character-notes.component.css */ "./src/app/character-notes/character-notes.component.css")]
        }),
        __metadata("design:paramtypes", [_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"]])
    ], CharacterNotesComponent);
    return CharacterNotesComponent;
}());



/***/ }),

/***/ "./src/app/character-saves/character-saves.component.css":
/*!***************************************************************!*\
  !*** ./src/app/character-saves/character-saves.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".save{\r\n  width: 95%;\r\n  margin: 0 2%;\r\n}"

/***/ }),

/***/ "./src/app/character-saves/character-saves.component.html":
/*!****************************************************************!*\
  !*** ./src/app/character-saves/character-saves.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<table>\r\n  <thead>\r\n    <tr>\r\n      <th>Save Type</th>\r\n      <th>Racial Bonus</th>\r\n      <th>Modifier Bonus</th>\r\n      <th>Total</th>\r\n    </tr>\r\n  </thead>\r\n  <tbody>\r\n    <tr *ngFor=\"let save of character.savingThrows | enumToArray; index as i\" [class.din]=\"i % 3 === 0\" [class.farore]=\"i % 3 === 1\" [class.nayru]=\"i % 3 === 2\">\r\n      <td class=\"name\">\r\n        <button (click)=\"makeSave(save.name)\" class=\"save\">{{ save.name }}</button>\r\n      </td>\r\n      <td>{{ save.racial }}</td>\r\n      <td class=\"mod\">{{ save.modifier.substr(0,3) | uppercase }}\r\n          <span class=\"info\">{{ character.attributes[attributes[save.modifier]].modifier }}</span>\r\n        </td>\r\n      <td>{{ save.racial + character.attributes[attributes[save.modifier]].modifier }}</td>\r\n    </tr>\r\n  </tbody>\r\n</table>\r\n"

/***/ }),

/***/ "./src/app/character-saves/character-saves.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/character-saves/character-saves.component.ts ***!
  \**************************************************************/
/*! exports provided: CharacterSavesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CharacterSavesComponent", function() { return CharacterSavesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Character_character__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Character/character */ "./src/app/Character/character.ts");
/* harmony import */ var _Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Character/Enums/attributes.enum */ "./src/app/Character/Enums/attributes.enum.ts");
/* harmony import */ var _character_detail_character_detail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../character-detail/character-detail.component */ "./src/app/character-detail/character-detail.component.ts");
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../message.service */ "./src/app/message.service.ts");
/* harmony import */ var _Character_Enums_saves_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Character/Enums/saves.enum */ "./src/app/Character/Enums/saves.enum.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CharacterSavesComponent = /** @class */ (function () {
    function CharacterSavesComponent(message) {
        this.message = message;
        this.attributes = _Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__["Attributes"];
    }
    CharacterSavesComponent.prototype.ngOnChanges = function () {
        this.character = this.characterDetailComponent.character;
        this.characterDetailComponent.roll = '';
    };
    CharacterSavesComponent.prototype.ngOnInit = function () {
    };
    CharacterSavesComponent.prototype.makeSave = function (saveString) {
        var modifier = this.character.savingThrows[_Character_Enums_saves_enum__WEBPACK_IMPORTED_MODULE_5__["Saves"][saveString]].modifier;
        var saveValAdd = this.character.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__["Attributes"][modifier]].modifier;
        var saveRacAdd = this.character.savingThrows[_Character_Enums_saves_enum__WEBPACK_IMPORTED_MODULE_5__["Saves"][saveString]].racial;
        var roll = Math.round(Math.random() * 100) % 20 + 1;
        roll += saveValAdd + saveRacAdd;
        roll = roll < 1 ? 1 : roll;
        this.characterDetailComponent.roll = roll.toString();
        this.makeMessage(roll, saveString);
    };
    CharacterSavesComponent.prototype.makeMessage = function (roll, saveString) {
        var message = this.character.name + ' made a ' + this.character.savingThrows[_Character_Enums_saves_enum__WEBPACK_IMPORTED_MODULE_5__["Saves"][saveString]].name + ' save. VALUE: ' + roll + '.';
        this.message.add(message);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _character_detail_character_detail_component__WEBPACK_IMPORTED_MODULE_3__["CharacterDetailComponent"])
    ], CharacterSavesComponent.prototype, "characterDetailComponent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _Character_character__WEBPACK_IMPORTED_MODULE_1__["Character"])
    ], CharacterSavesComponent.prototype, "character", void 0);
    CharacterSavesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-character-saves',
            template: __webpack_require__(/*! ./character-saves.component.html */ "./src/app/character-saves/character-saves.component.html"),
            styles: [__webpack_require__(/*! ./character-saves.component.css */ "./src/app/character-saves/character-saves.component.css")]
        }),
        __metadata("design:paramtypes", [_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"]])
    ], CharacterSavesComponent);
    return CharacterSavesComponent;
}());



/***/ }),

/***/ "./src/app/character-skills/character-skills.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/character-skills/character-skills.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".accordian{\r\n  background: #EEE;\r\n  color: #444444;\r\n  cursor: pointer;\r\n  width: 100%;\r\n  text-align: left;\r\n  border: none;\r\n  outline: none;\r\n  transition: 0.4s;\r\n  padding-top: 2px;\r\n  padding-bottom: 2px;\r\n\r\n}\r\n.accordian:hover{\r\n  background-color: #ccc;\r\n}\r\n.panel{\r\n  padding: 5px 0px;\r\n  background-color: inherit;\r\n  display: none;\r\n}\r\n.active{\r\n  display: block\r\n}\r\n.right{\r\n  float: right;\r\n  cursor: pointer;\r\n  font-size: 150%;\r\n  font-weight: bold;\r\n}\r\n.skillCheck{\r\n  padding: 0.5em 2em;\r\n}\r\n.skillCheck, h4{\r\n  padding-top: 0em;\r\n  padding-bottom: 0em;\r\n  margin-top: 0em;\r\n  margin-bottom: 0em;\r\n}\r\n.crit{\r\n  color: gold;\r\n}\r\n.critMiss{\r\n  color:red;\r\n}\r\n.maxDmg{\r\n  color: #00aa00;\r\n}\r\n.name{\r\n  cursor: pointer;\r\n}"

/***/ }),

/***/ "./src/app/character-skills/character-skills.component.html":
/*!******************************************************************!*\
  !*** ./src/app/character-skills/character-skills.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button class=\"accordian\" (click)=\"expandSkill()\">\r\n  <h2>{{ character.name | uppercase }} Skills</h2>\r\n</button>\r\n\r\n<div class=\"panel\" [class.active]=\"showSkills\">\r\n  <div class=\"skillCheck\" *ngIf=\"skill && checkVal\">\r\n    <h4>Skill Check</h4>\r\n    <span class=\"right\" (click)=\"hideCheck()\">&times;</span>\r\n    <div>\r\n      <span id=\"skill\">{{ skill }}</span> : <span id=\"roll\">{{ checkVal }}</span>\r\n    </div>\r\n  </div>\r\n  <div class=\"table\">\r\n    <table>\r\n      <thead>\r\n        <tr>\r\n          <th>Trained</th>\r\n          <th>Skill Name</th>\r\n          <th>Skill Ranks</th>\r\n          <th>Racial Bonus</th>\r\n          <th>Modifier</th>\r\n          <th>Item Bonus</th>\r\n          <th>Misc. Ranks</th>\r\n          <th>Total</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr *ngFor=\"let skill of character.skills\" [class.din]=\"skill.modifier === 'Strength' || skill.modifier === 'Intelligence'\"\r\n          [class.farore]=\"skill.modifier === 'Dexterity' || skill.modifier === 'Charisma'\" [class.nayru]=\"skill.modifier === 'Wisdom' || skill.modifier === 'Constitution'\">\r\n          <td>\r\n            <input type=\"checkbox\" [checked]=\"skill.trained\" disabled=\"true\" />\r\n          </td>\r\n          <td class=\"name\" (click)=\"makeCheck(skill.skillName)\">\r\n            <div *ngIf=\"skill.skillName==='CraftOne' || skill.skillName==='CraftTwo' || skill.skillName==='Profession' || skill.skillName==='Perform'; then specialSkill; else normalSkill\"></div>\r\n\r\n            <ng-template #specialSkill>\r\n              <div *ngIf=\"skill.skillName==='CraftOne'\">\r\n                {{ skill.skillName.substr(0, skill.skillName.length-4) + ' ' + (character.craftOne ? character.craftOne : 'Other') +''}}\r\n              </div>\r\n              <div *ngIf=\"skill.skillName==='CraftTwo'\">\r\n                {{ skill.skillName.substr(0, skill.skillName.length-4) + ' ' + (character.craftTwo ? character.craftTwo : 'Other') +''}}\r\n              </div>\r\n              <div *ngIf=\"skill.skillName==='Profession'\">\r\n                {{ skill.skillName + ' ' + (character.profession ? character.profession : 'Other') +''}}\r\n              </div>\r\n              <div *ngIf=\"skill.skillName==='Perform'\">\r\n                {{ skill.skillName + ' ' + (character.performCust ? character.performCust : 'Other') +''}}\r\n              </div>\r\n            </ng-template>\r\n            <ng-template #normalSkill>\r\n              {{ skill.skillName }}\r\n            </ng-template>\r\n          </td>\r\n          <td>{{ skill.ranks }}</td>\r\n          <td>{{ skill.racial }}</td>\r\n          <td class=\"mod\">{{ skill.modifier.substr(0,3) | uppercase }}\r\n            <span class=\"info\">{{ getMod(skill.modifier) }}</span>\r\n          </td>\r\n          <td>{{ skill.item }}</td>\r\n          <td>{{ skill.misc }}</td>\r\n          <td class=\"total\">{{ (skill.trained ? 3 : 0) + skill.ranks + getMod(skill.modifier) + skill.item + skill.misc + skill.racial}}</td>\r\n        </tr>\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/character-skills/character-skills.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/character-skills/character-skills.component.ts ***!
  \****************************************************************/
/*! exports provided: CharacterSkillsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CharacterSkillsComponent", function() { return CharacterSkillsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Character_character__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Character/character */ "./src/app/Character/character.ts");
/* harmony import */ var _Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Character/Enums/skills.enum */ "./src/app/Character/Enums/skills.enum.ts");
/* harmony import */ var _Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Character/Enums/attributes.enum */ "./src/app/Character/Enums/attributes.enum.ts");
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../message.service */ "./src/app/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CharacterSkillsComponent = /** @class */ (function () {
    function CharacterSkillsComponent(messeger) {
        this.messeger = messeger;
        this.showSkills = true;
    }
    CharacterSkillsComponent.prototype.ngOnInit = function () {
    };
    CharacterSkillsComponent.prototype.getMod = function (modName) {
        for (var i = 0; i < this.character.attributes.length; i++) {
            if (this.character.attributes[i].name === modName) {
                return this.character.attributes[i].modifier;
            }
        }
    };
    CharacterSkillsComponent.prototype.expandSkill = function () {
        this.showSkills = !this.showSkills;
    };
    CharacterSkillsComponent.prototype.makeCheck = function (skillName) {
        var originalRoll = Math.round(Math.random() * 100) % 20 + 1;
        var roll = originalRoll;
        var skill = this.character.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_2__["Skills"][skillName]];
        var skillMod = skill.modifier;
        var mod = this.character.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"][skillMod]].modifier;
        var trained = skill.trained ? 3 : 0;
        roll += mod + skill.ranks + skill.misc + skill.item + skill.racial + trained;
        this.checkVal = roll;
        this.skill = skillName;
        this.setClasses(originalRoll);
        this.addMessage(skillName, roll);
    };
    CharacterSkillsComponent.prototype.hideCheck = function () {
        this.checkVal = null;
        this.skill = null;
    };
    CharacterSkillsComponent.prototype.addMessage = function (skillName, skillRoll) {
        var name = this.character.name;
        var message = name + ' rolled a ' + skillRoll + ' on a ' + skillName + ' check.';
        this.messeger.add(message);
    };
    CharacterSkillsComponent.prototype.setClasses = function (roll) {
        this.nullify('roll', 'crit');
        this.nullify('roll', 'critMiss');
        if (roll === 1) {
            document.getElementById('roll').classList.add('critMiss');
        }
        else if (roll === 20) {
            document.getElementById('roll').classList.add('crit');
        }
    };
    CharacterSkillsComponent.prototype.nullify = function (id, className) {
        console.log('document.getElementById(%s);', id);
        if (document.getElementById(id) && document.getElementById(id).classList.contains(className)) {
            document.getElementById(id).classList.remove(className);
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _Character_character__WEBPACK_IMPORTED_MODULE_1__["Character"])
    ], CharacterSkillsComponent.prototype, "character", void 0);
    CharacterSkillsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-character-skills',
            template: __webpack_require__(/*! ./character-skills.component.html */ "./src/app/character-skills/character-skills.component.html"),
            styles: [__webpack_require__(/*! ./character-skills.component.css */ "./src/app/character-skills/character-skills.component.css")]
        }),
        __metadata("design:paramtypes", [_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"]])
    ], CharacterSkillsComponent);
    return CharacterSkillsComponent;
}());



/***/ }),

/***/ "./src/app/character-spell/character-spell.component.css":
/*!***************************************************************!*\
  !*** ./src/app/character-spell/character-spell.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "input.dropdown::-webkit-inner-spin-button, input.dropdown::-webkit-outer-spin-button{\r\n  -webkit-appearance: none;\r\n  appearance: none;\r\n  margin: 0;\r\n}\r\ninput, textarea, select, button.save{\r\n  width: 90%; \r\n}\r\n.improv-table{\r\n  float: left; \r\n  width: calc(98% / 8); \r\n  /* max-width: calc(100% / 8); */\r\n  padding: 5px 1px;\r\n}\r\n.table-holder::after{\r\n  content: \"\";\r\n  display: table;\r\n  clear: both;\r\n}\r\n.bad-input{\r\n  background-color: lightcoral;\r\n}\r\n.crit{\r\n  color: gold;\r\n}\r\n.critMiss{\r\n  color:red;\r\n}\r\n.max{\r\n  color: #00aa00;\r\n}\r\n.spellName{\r\n  cursor: pointer;\r\n}\r\n@media(max-width: 900px){\r\n  /* .table-data-for-mobile{\r\n    float: left;\r\n  } */\r\n  .improv-table{\r\n    float: none;\r\n    width: 100%;\r\n    max-width: 100%;\r\n  }\r\n  .smaller{\r\n    width: 80%;\r\n    margin: 10% 10%;\r\n  }\r\n  \r\n}"

/***/ }),

/***/ "./src/app/character-spell/character-spell.component.html":
/*!****************************************************************!*\
  !*** ./src/app/character-spell/character-spell.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"newSpell\">\r\n  <div class=\"modal\" [class.showModal]=\"newSpell\">\r\n    <div class=\"modal-content smaller\">\r\n      <div class=\"modal-header\">\r\n        <span class=\"close\" (click)=\"addSpell()\">&times;</span>\r\n        <h2>Add Spell</h2>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"table-holder\">\r\n          <div class=\"improv-table\">\r\n            <b class=\"head\">Spell name</b>\r\n            <input id=\"spellName\" type=\"text\" [(ngModel)]=\"spell.name\" title=\"Enter the spell's name here\" class=\"name\" (blur)=\"validate('spellName', 'name')\">\r\n          </div>\r\n          <div class=\"improv-table\">\r\n            <b class=\"head\">Spell Effect</b>\r\n            <textarea id=\"spellEffect\" rows=\"2\" [(ngModel)]=\"spell.effect\" title=\"Enter what the spell does\" class=\"description\" (blur)=\"validate('spellEffect', 'effect')\"></textarea>\r\n          </div>\r\n          <div class=\"improv-table\">\r\n            <b class=\"head\">Number of Dice</b>\r\n            <select id=\"spellMult\" [(ngModel)]=\"spell.multiplier\" (blur)=\"validate('spellMult', 'multiplier')\">\r\n              <option value=\"1\">1</option>\r\n              <option value=\"2\">2</option>\r\n              <option value=\"3\">3</option>\r\n              <option value=\"4\">4</option>\r\n            </select>\r\n          </div>\r\n          <div class=\"improv-table\">\r\n            <b class=\"head\">Dice Type</b>\r\n            <select id=\"spellDam\" [(ngModel)]=\"spell.damage\" (blur)=\"validate('spellDam','damage')\">\r\n              <option value=\"4\">D4</option>\r\n              <option value=\"6\">D6</option>\r\n              <option value=\"8\">D8</option>\r\n              <option value=\"10\">D10</option>\r\n              <option value=\"12\">D12</option>\r\n            </select>\r\n          </div>\r\n          <div class=\"improv-table\">\r\n            <b class=\"head\">Modifier (if any)</b>\r\n            <select id=\"spellMod\" [(ngModel)]=\"spell.modifier\">\r\n              <option value=\"null\">None</option>\r\n              <option value=\"Intelligence\">Intelligence</option>\r\n              <option value=\"Wisdom\">Wisdom</option>\r\n              <option value=\"Charisma\">Charisma</option>\r\n            </select>\r\n          </div>\r\n          <div class=\"improv-table\">\r\n            <b class=\"head\">MP Use</b><br/>\r\n            <input type=\"number\" id=\"mpUse\" [(ngModel)]=\"spell.mpUse\" min=\"0\" (blur)=\"validate('mpUse', 'mpUse')\">\r\n          </div>\r\n          <div class=\"improv-table\">\r\n            <b class=\"head\">Magic Type</b>\r\n            <select id=\"spellGod\" [(ngModel)]=\"spell.diety\" (blur)=\"validate('spellGod', 'diety')\">\r\n              <option *ngFor=\"let diety of dieties | enumToArray\" value=\"{{ diety }}\">{{ diety }}</option>\r\n            </select>\r\n          </div>\r\n          <div class=\"improv-table\">\r\n            <b class=\"head\">Submit</b><br/>\r\n            <button class=\"save\" (click)=\"saveSpell()\">Save</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<!-- TODO: Make a modal for casting too much magic. Or at least an erro message.-->\r\n<button (click)=\"addSpell()\">New Spell</button>\r\n<div *ngIf=\"character.spells\" class=\"table\">\r\n  <div *ngIf=\"spellName\" class=\"spellRoll\">\r\n    <h4>{{ spellName }}</h4>\r\n    <span>Roll to hit:</span><span id=\"spellRoll\">{{ spellRoll }}</span><br/>\r\n    <span>Damage/Heal Roll:</span><span id=\"spellDmgRoll\">{{ dmgRoll }}</span>\r\n  </div>\r\n  <table>\r\n    <thead>\r\n      <tr>\r\n        <th>Spell name</th>\r\n        <th>Spell Description</th>\r\n        <th>Effect Die</th>\r\n        <th>MP Use</th>\r\n        <th>Magic Type</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr *ngFor=\"let spell of character.spells index as i\" [class.nayru]=\"spell.diety === 'Nayru'\" [class.farore]=\"spell.diety === 'Farore'\" [class.din]=\"spell.diety === 'Din'\">\r\n        <td class=\"spellName\" (click)=\"castSpell(i)\">{{ spell.name }}</td>\r\n        <td>{{ spell.effect }}</td>\r\n        <td>{{ spell.multiplier }}D{{ spell.damage }}</td>\r\n        <td>{{ spell.mpUse }}</td>\r\n        <td>{{ spell.diety }}</td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</div>\r\n<div class=\"magicSkills\">\r\n  <button class=\"accordian\" (click)=\"expandMagic()\">\r\n    <h2>{{ character.name | uppercase }} Magic Skills</h2>\r\n  </button>\r\n  <div class=\"panel\" [class.active]=\"showMagic\">\r\n    <div class=\"table\">\r\n      <table>\r\n        <thead>\r\n          <tr>\r\n            <th>Magic Type</th>\r\n            <th>Modifier</th>\r\n            <th>Skill Ranks</th>\r\n            <th>Total</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr *ngFor=\"let magic of character.magicSkills\" [class.din]=\"magic.modifier === 'Intelligence'\" [class.farore]=\"magic.modifier === 'Charisma'\"\r\n            [class.nayru]=\"magic.modifier === 'Wisdom'\">\r\n            <td class=\"name\">{{ magic.skillName }}</td>\r\n            <td class=\"mod\">{{ magic.modifier.substr(0,3) | uppercase }}\r\n              <span class=\"info\">{{ getMod(magic.modifier) }}</span>\r\n            </td>\r\n            <td>{{ magic.ranks }}</td>\r\n            <td class=\"total\">{{ magic.ranks+getMod(magic.modifier) }}</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/character-spell/character-spell.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/character-spell/character-spell.component.ts ***!
  \**************************************************************/
/*! exports provided: CharacterSpellComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CharacterSpellComponent", function() { return CharacterSpellComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Character_character__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Character/character */ "./src/app/Character/character.ts");
/* harmony import */ var _Character_spells__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Character/spells */ "./src/app/Character/spells.ts");
/* harmony import */ var _Character_Enums_dieties_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Character/Enums/dieties.enum */ "./src/app/Character/Enums/dieties.enum.ts");
/* harmony import */ var _Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Character/Enums/attributes.enum */ "./src/app/Character/Enums/attributes.enum.ts");
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../message.service */ "./src/app/message.service.ts");
/* harmony import */ var _Character_Enums_magic_skills_enum__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Character/Enums/magic-skills.enum */ "./src/app/Character/Enums/magic-skills.enum.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CharacterSpellComponent = /** @class */ (function () {
    function CharacterSpellComponent(message) {
        this.message = message;
        this.newSpell = false;
        this.showMagic = true;
        this.dieties = _Character_Enums_dieties_enum__WEBPACK_IMPORTED_MODULE_3__["Diety"];
        this.attributes = _Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_4__["Attributes"];
        this.spellArray = [];
    }
    CharacterSpellComponent.prototype.ngOnInit = function () {
        if (this.character.spells) {
            this.spellArray = this.character.spells;
        }
    };
    CharacterSpellComponent.prototype.addSpell = function () {
        if (!this.newSpell) {
            this.spell = new _Character_spells__WEBPACK_IMPORTED_MODULE_2__["Spell"]();
        }
        this.newSpell = !this.newSpell;
    };
    CharacterSpellComponent.prototype.saveSpell = function () {
        var error = false;
        if (!this.spell.name) {
            error = true;
            document.getElementById('spellName').classList.add('bad-input');
        }
        if (!this.spell.effect) {
            error = true;
            document.getElementById('spellEffect').classList.add('bad-input');
        }
        if (!this.spell.multiplier) {
            error = true;
            document.getElementById('spellMult').classList.add('bad-input');
        }
        if (!this.spell.damage) {
            error = true;
            document.getElementById('spellDam').classList.add('bad-input');
        }
        if (!this.spell.diety) {
            error = true;
            document.getElementById('spellGod').classList.add('bad-input');
        }
        if (!this.spell.mpUse) {
            error = true;
            document.getElementById('mpUse').classList.add('bad-input');
        }
        if (!error) {
            this.spellArray.push(this.spell);
            this.character.spells = this.spellArray;
            this.createMessage();
            this.spell = new _Character_spells__WEBPACK_IMPORTED_MODULE_2__["Spell"]();
            this.newSpell = false;
        }
    };
    CharacterSpellComponent.prototype.validate = function (id, key) {
        if (!this.spell[key]) {
            document.getElementById(id).classList.add('bad-input');
            this.spell[key] = '';
        }
        else if (typeof this.spell[key] === 'string') {
            if (this.spell[key].trim() === '' || ((key === 'name' || key === 'effect') && !/^[a-zA-Z\s]+$/i.test(this.spell[key]))) {
                document.getElementById(id).classList.add('bad-input');
            }
            else if (document.getElementById(id).classList.contains('bad-input')) {
                document.getElementById(id).classList.remove('bad-input');
            }
        }
        else {
            if (this.spell[key] === '') {
                document.getElementById(id).classList.add('bad-input');
                this.spell[key] = '';
            }
            else if (document.getElementById(id).classList.contains('bad-input')) {
                document.getElementById(id).classList.remove('bad-input');
            }
        }
    };
    CharacterSpellComponent.prototype.createMessage = function () {
        var name = this.character.name;
        var spell = this.character.spells[this.character.spells.length - 1];
        var spellName = spell.name;
        var spellType = spell.diety;
        var message = name + ' added a spell of ' + spellType + ' called ' + spellName + '.';
        this.message.add(message);
    };
    CharacterSpellComponent.prototype.getMod = function (modName) {
        return this.character.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_4__["Attributes"][modName]].modifier;
    };
    CharacterSpellComponent.prototype.expandMagic = function () {
        this.showMagic = !this.showMagic;
    };
    CharacterSpellComponent.prototype.castSpell = function (spellIndex) {
        var crit = false;
        var character = this.character;
        var spell = character.spells[spellIndex];
        this.character.magic -= spell.mpUse;
        if (this.character.magic < 0) {
            this.character.magic += spell.mpUse;
            // TODO: Make an error modal about using too much magic
        }
        else {
            var magicType = character.magicSkills[_Character_Enums_magic_skills_enum__WEBPACK_IMPORTED_MODULE_6__["Magics"][spell.diety]];
            var magicBonus = magicType.ranks + character.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_4__["Attributes"][magicType.modifier]].modifier;
            var ogSpellRoll = Math.round(Math.random() * 100) % 20 + 1;
            var spellRoll = ogSpellRoll + magicBonus;
            this.spellName = spell.name;
            var ogDmgRoll = Math.round(Math.random() * 100) % spell.damage + 1;
            if (ogDmgRoll === 20) {
                crit = true;
            }
            var dmgRoll = ogDmgRoll * spell.multiplier * (crit ? 3 : 1) + this.getMagicBonus(spell, character);
            this.spellName = spell.name;
            this.spellRoll = spellRoll;
            this.dmgRoll = dmgRoll;
            this.setClasses(ogSpellRoll);
            this.dmgClasses(ogDmgRoll, spell.damage);
        }
    };
    CharacterSpellComponent.prototype.setClasses = function (roll) {
        this.nullify('spellRoll', 'crit');
        this.nullify('spellRoll', 'critMiss');
        if (roll === 1) {
            document.getElementById('spellRoll').classList.add('critMiss');
        }
        else if (roll === 20) {
            document.getElementById('spellRoll').classList.add('crit');
        }
    };
    CharacterSpellComponent.prototype.dmgClasses = function (roll, sides) {
        this.nullify('spellDmgRoll', 'max');
        this.nullify('spellDmgRoll', 'critMiss');
        if (roll === 1) {
            document.getElementById('spellDmgRoll').classList.add('critMiss');
        }
        else if (roll === sides) {
            document.getElementById('spellDmgRoll').classList.add('max');
        }
    };
    CharacterSpellComponent.prototype.nullify = function (id, className) {
        if (document.getElementById(id) && document.getElementById(id).classList.contains(className)) {
            document.getElementById(id).classList.remove(className);
        }
    };
    CharacterSpellComponent.prototype.getMagicBonus = function (spell, character) {
        var retVal = 0;
        if (spell.useDiety) {
            var spellBon = character.magicSkills[_Character_Enums_magic_skills_enum__WEBPACK_IMPORTED_MODULE_6__["Magics"][spell.diety]].ranks;
            spellBon += character.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_4__["Attributes"][character.magicSkills[_Character_Enums_magic_skills_enum__WEBPACK_IMPORTED_MODULE_6__["Magics"][spell.diety]].modifier]].modifier;
            retVal += spellBon;
        }
        else if (spell.modifier) {
            retVal += character.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_4__["Attributes"][spell.modifier]].modifier;
        }
        return retVal;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _Character_character__WEBPACK_IMPORTED_MODULE_1__["Character"])
    ], CharacterSpellComponent.prototype, "character", void 0);
    CharacterSpellComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-character-spell',
            template: __webpack_require__(/*! ./character-spell.component.html */ "./src/app/character-spell/character-spell.component.html"),
            styles: [__webpack_require__(/*! ./character-spell.component.css */ "./src/app/character-spell/character-spell.component.css")]
        }),
        __metadata("design:paramtypes", [_message_service__WEBPACK_IMPORTED_MODULE_5__["MessageService"]])
    ], CharacterSpellComponent);
    return CharacterSpellComponent;
}());



/***/ }),

/***/ "./src/app/character-weapon/character-weapon.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/character-weapon/character-weapon.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "input.dropdown::-webkit-inner-spin-button, input.dropdown::-webkit-outer-spin-button{\r\n  -webkit-appearance: none;\r\n  appearance: none;\r\n  margin: 0;\r\n}\r\ninput, textarea, select, button.save{\r\n  width: 90%; \r\n}\r\n.improv-table{\r\n  float: left; \r\n  width: 48%; \r\n  padding: 5px 1px;\r\n}\r\n.table-holder{\r\n  padding: 0.5% 5%;\r\n}\r\n.table-holder::after{\r\n  content: \"\";\r\n  display: table;\r\n  clear: both;\r\n}\r\n.bad-input{\r\n  background-color: lightcoral;\r\n}\r\n.submit-button{\r\n  align-items: center;\r\n  text-align: center;\r\n  margin-bottom: 10px;\r\n}\r\n.center{\r\n  align-items: center;\r\n}\r\n.weaponName{\r\n  cursor: pointer;\r\n}\r\n@media(max-width: 900px){\r\n  \r\n  .improv-table{\r\n    float: none;\r\n    width: 100%;\r\n    max-width: 100%;\r\n  }\r\n  .smaller{\r\n    width: 80%;\r\n    margin: 10% 10%;\r\n  }\r\n  \r\n}"

/***/ }),

/***/ "./src/app/character-weapon/character-weapon.component.html":
/*!******************************************************************!*\
  !*** ./src/app/character-weapon/character-weapon.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal\" [class.showModal]=\"newWeapon\">\r\n  <div class=\"modal-content smaller\">\r\n    <div class=\"modal-header\">\r\n      <span class=\"close\" (click)=\"addWeapon()\">&times;</span>\r\n      <h2>Add Weapon</h2>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n      <div class=\"table-holder\">\r\n        <div class=\"improv-table\">\r\n          <b>Weapon name</b>\r\n          <input id=\"weaponName\" type=\"text\" [(ngModel)]=\"weapon.name\" (blur)=\"validate('weaponName', 'name')\">\r\n        </div>\r\n        <div class=\"improv-table\">\r\n          <b>Weapon Type</b>\r\n          <select id=\"weaponType\" [(ngModel)]=\"weapon.type\" (blur)=\"validate('weaponType', 'type')\" (change)=\"checkForRanged()\">\r\n            <option *ngFor=\"let weaponS of allWeapons | enumToArray\" value=\"{{ weaponS }}\">{{ weaponS }}</option>\r\n          </select>\r\n        </div>\r\n        <div class=\"improv-table\">\r\n          <b>Number of Dice</b>\r\n          <select id=\"weaponMult\" [(ngModel)]=\"weapon.numberOfAttacks\" (blur)=\"validate('weaponMult', 'numberOfAttacks')\">\r\n            <option value=\"1\">1</option>\r\n            <option value=\"2\">2</option>\r\n            <option value=\"3\">3</option>\r\n            <option value=\"4\">4</option>\r\n          </select>\r\n        </div>\r\n        <div class=\"improv-table\">\r\n          <b>Dice Type</b>\r\n          <select id=\"weaponDam\" [(ngModel)]=\"weapon.attack\" (blur)=\"validate('weaponDam','attack')\">\r\n            <option value=\"4\">D4</option>\r\n            <option value=\"6\">D6</option>\r\n            <option value=\"8\">D8</option>\r\n            <option value=\"10\">D10</option>\r\n            <option value=\"12\">D12</option>\r\n          </select>\r\n        </div>\r\n        <div class=\"improv-table\">\r\n          <b>Critial Hit Range</b>\r\n          <select id=\"critRange\" [(ngModel)]=\"weapon.critRange\" (blur)=\"validate('critRange', 'critRange')\" (change)=\"setCrit()\">\r\n            <option value=\"18,19,20\">18-20</option>\r\n            <option value=\"19,20\">19-20</option>\r\n            <option value=\"20\">20</option>\r\n          </select>\r\n        </div>\r\n        <div class=\"improv-table\">\r\n          <b>Critical Hit Multiplier</b>\r\n          <select id=\"weaponCrit\" [(ngModel)]=\"weapon.critDamage\" (blur)=\"validate('weaponCrit', 'critDamage')\">\r\n            <option value=\"2\">X 2</option>\r\n            <option value=\"3\">X 3</option>\r\n            <option value=\"4\">X 4</option>\r\n          </select>\r\n        </div>\r\n        <div class=\"improv-table\">\r\n          <b>Damage Modifier</b>\r\n          <select id=\"weaponMod\" [(ngModel)]=\"weapon.modifier\" (blur)=\"validate('weaponMod', 'modifier')\">\r\n            <option selected hidden>--Select the Damage Modifier</option>\r\n            <option *ngFor=\"let attr of attributes | enumToArray\" value=\"{{ attr }}\">{{ attr }}</option>\r\n          </select>\r\n        </div>\r\n        <div *ngIf=\"isRangedWeapon\">\r\n          <div class=\"improv-table rangedWeapon\">\r\n            <b>Range</b>\r\n            <input id=\"weaponRange\" [(ngModel)]=\"weapon.range\" step=\"5\" (blur)=\"validate('weaponRange', 'range')\">\r\n          </div>\r\n          <div class=\"improv-table rangedWeapon\">\r\n            <b>Ammo (if any)</b>\r\n            <input id=\"weaponAmmo\" [(ngModel)]=\"weapon.ammo\" step=\"5\" (blur)=\"validate('weaponAmmo', 'ammo')\">\r\n          </div>\r\n        </div>\r\n        <div class=\"improv-table\" >\r\n            <b>Element</b>\r\n            <input type=\"checkbox\" [(ngModel)]=\"isElemental\" (click)=\"makeElement()\">\r\n          </div>\r\n        <div *ngIf=\"isElemental\">\r\n          <div class=\"improv-table\">\r\n            <b>Element Type</b>\r\n            <select id=\"eType\" [(ngModel)]=\"elemental.type\" (blur)=\"validateElement('eType','type')\">\r\n              <option *ngFor=\"let elem of elements | enumToArray\" value=\"{{ elem }}\">{{ elem }}</option>\r\n            </select>\r\n          </div>\r\n          <div class=\"improv-table\">\r\n            <b>Number of Elemental Dice</b>\r\n            <select id=\"elementalMult\" [(ngModel)]=\"elemental.numberOfAttacks\" (blur)=\"validateElement('elementalMult', 'numberOfAttacks')\">\r\n                <option value=\"1\">1</option>\r\n                <option value=\"2\">2</option>\r\n                <option value=\"3\">3</option>\r\n                <option value=\"4\">4</option>\r\n              </select>\r\n          </div>\r\n          <div class=\"improv-table\">\r\n            <b>Elemental Dice Type</b>\r\n            <select id=\"elementDam\" [(ngModel)]=\"elemental.attack\" (blur)=\"validateElement('elementDam','attack')\">\r\n                <option value=\"4\">D4</option>\r\n                <option value=\"6\">D6</option>\r\n                <option value=\"8\">D8</option>\r\n                <option value=\"10\">D10</option>\r\n                <option value=\"12\">D12</option>\r\n              </select>\r\n          </div>\r\n        </div>\r\n        \r\n      </div>\r\n      <div class=\"submit-button\">\r\n        <button class=\"center\" (click)=\"saveWeapon()\">Save Weapon</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<button (click)=\"addWeapon()\">New Weapon</button>\r\n<div *ngIf=\"character.weapons\" class=\"table\">\r\n    <div class=\"spellRoll\">\r\n        <div *ngIf=\"weaponName\">\r\n          <h4>{{ weaponName }}</h4>\r\n          <span>Roll to hit:</span><span id=\"rollToHit\">{{ rollToHit }}</span><br/>\r\n          <span>Damage Roll:</span><span id=\"weaponDmg\">{{ dmgRoll }}</span><br/>\r\n        </div>\r\n        <div *ngIf=\"elemRoll\">\r\n          <span>Elemental Roll:</span><span id=\"elementalDmgRoll\">{{ elemRoll }}</span>\r\n        </div>\r\n      </div>\r\n  <table>\r\n    <thead>\r\n      <tr>\r\n        <th>Weapon Name</th>\r\n        <th>Weapon Type</th>\r\n        <th>Weapon Damage</th>\r\n        <th>Critical Hit Range</th>\r\n        <th>Critical Multiplier</th>\r\n        <th>Damage Modifier</th>\r\n        <th>Range</th>\r\n        <th>Ammo</th>\r\n        <th>Element</th>\r\n        <th>Elemental Damage</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr *ngFor=\"let weapon of character.weapons index as i\" [class.din]=\"weapon.modifier === 'Strength' || weapon.modifier === 'Intelligence'\"\r\n      [class.farore]=\"weapon.modifier === 'Dexterity' || weapon.modifier === 'Charisma'\" [class.nayru]=\"weapon.modifier === 'Wisdom' || weapon.modifier === 'Constitution'\">\r\n        <td class=\"weaponName\" (click)=\"attack(i)\">{{ weapon.name }}</td>\r\n        <td>{{ weapon.type }}</td>\r\n        <td>{{ weapon.numberOfAttacks }}D{{ weapon.attack }}</td>\r\n        <td>{{ weapon.critRange }}</td>\r\n        <td>X{{ weapon.critDamage }}</td>\r\n        <td>{{ weapon.modifier }}</td>\r\n        <td>{{ weapon.range ? weapon.range : 'N/A' }}</td>\r\n        <td>{{ weapon.ammo ? weapon.ammo : 'N/A' }}</td>\r\n        <td>{{ weapon.element ? weapon.element.type : 'N/A'}}</td>\r\n        <td>{{ weapon.element ? ((weapon.element.numberOfAttacks !== null && weapon.element.attack !== null) ? weapon.element.numberOfAttacks + 'D' + weapon.element.attack : 'N/A'): 'N/A'}}</td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</div>\r\n<div class=\"weaponSkills\">\r\n  <button class=\"accordian\" (click)=\"expandWeapon()\">\r\n    <h2>{{ character.name | uppercase }} Weapon Skills</h2>\r\n  </button>\r\n  <div class=\"panel\" [class.active]=\"showWeapon\">\r\n    <div class=\"table\">\r\n      <table>\r\n        <thead>\r\n          <tr>\r\n            <th>Trained</th>\r\n            <th>Weapon Type</th>\r\n            <th>Skill Ranks</th>\r\n            <th>Racial Bonus</th>\r\n            <th>Total\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr *ngFor=\"let weapon of character.weaponSkills\" class=\"weapon\">\r\n            <td>\r\n              <input type=\"checkbox\" [checked]=\"weapon.trained\" disabled=\"true\" />\r\n            </td>\r\n            <td class=\"name\">{{ weapon.skillName }}</td>\r\n            <td>{{ weapon.ranks }}</td>\r\n            <td>{{ weapon.racial }}</td>\r\n            <td class=\"total\">{{ (weapon.trained ? 3 : 0) + weapon.ranks + weapon.racial }}</td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/character-weapon/character-weapon.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/character-weapon/character-weapon.component.ts ***!
  \****************************************************************/
/*! exports provided: CharacterWeaponComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CharacterWeaponComponent", function() { return CharacterWeaponComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Character_character__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Character/character */ "./src/app/Character/character.ts");
/* harmony import */ var _Character_Weapons_weapon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Character/Weapons/weapon */ "./src/app/Character/Weapons/weapon.ts");
/* harmony import */ var _Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Character/Enums/weapon-skills.enum */ "./src/app/Character/Enums/weapon-skills.enum.ts");
/* harmony import */ var _Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Character/Enums/attributes.enum */ "./src/app/Character/Enums/attributes.enum.ts");
/* harmony import */ var _Character_Enums_elements_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Character/Enums/elements.enum */ "./src/app/Character/Enums/elements.enum.ts");
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../message.service */ "./src/app/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CharacterWeaponComponent = /** @class */ (function () {
    function CharacterWeaponComponent(message) {
        this.message = message;
        this.allWeapons = _Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_3__["Weapons"];
        this.attributes = _Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_4__["Attributes"];
        this.newWeapon = false;
        this.showWeapon = true;
        this.weapons = [];
        this.isRangedWeapon = false;
        this.isElemental = false;
        this.elements = _Character_Enums_elements_enum__WEBPACK_IMPORTED_MODULE_5__["Elements"];
        this.rangeList = [
            'Spear',
            'Halberd',
            'Bow',
            'Sling',
            'Naginata',
            'Boomerang',
            'Fire Rod',
            'Ice Rod',
            'Tornado Rod',
            'Sand Rod',
            'Lightning Rod',
            'Whip',
            'Ball & Chain'
        ];
    }
    CharacterWeaponComponent.prototype.ngOnInit = function () {
        this.weapon = new _Character_Weapons_weapon__WEBPACK_IMPORTED_MODULE_2__["Weapon"]();
        if (this.character.weapons) {
            this.weapons = this.character.weapons;
        }
    };
    CharacterWeaponComponent.prototype.addWeapon = function () {
        this.newWeapon = !this.newWeapon;
    };
    CharacterWeaponComponent.prototype.saveWeapon = function () {
        var error = false;
        if (this.elemental) {
            this.weapon.element = this.elemental;
        }
        if (!this.weapon.name) {
            error = true;
            document.getElementById('weaponName').classList.add('bad-input');
        }
        if (!this.weapon.type) {
            error = true;
            document.getElementById('weaponType').classList.add('bad-input');
        }
        if (!this.weapon.numberOfAttacks) {
            error = true;
            document.getElementById('weaponMult').classList.add('bad-input');
        }
        if (!this.weapon.attack) {
            error = true;
            document.getElementById('weaponDam').classList.add('bad-input');
        }
        if (!this.weapon.critRange) {
            error = true;
            document.getElementById('critRange').classList.add('bad-input');
        }
        if (!this.weapon.critDamage) {
            error = true;
            document.getElementById('weaponCrit').classList.add('bad-input');
        }
        if (!this.weapon.modifier) {
            error = true;
            document.getElementById('weaponMod').classList.add('bad-input');
        }
        if (this.isRangedWeapon) {
            if (!this.weapon.range) {
                error = true;
                document.getElementById('weaponRange').classList.add('bad-input');
            }
            if (!this.weapon.ammo) {
                error = true;
                document.getElementById('weaponAmmo').classList.add('bad-input');
            }
        }
        if (this.isElemental) {
            if (!this.weapon.element.type) {
                error = true;
                document.getElementById('eType').classList.add('bad-input');
            }
            if (!this.weapon.element.numberOfAttacks) {
                error = true;
                document.getElementById('elementalMult').classList.add('bad-input');
            }
            if (!this.weapon.element.attack) {
                error = true;
                document.getElementById('elementDam').classList.add('bad-input');
            }
        }
        if (!error) {
            this.weapons.push(this.weapon);
            this.character.weapons = this.weapons;
            this.addWeapon();
            this.createMessage();
            this.weapon = new _Character_Weapons_weapon__WEBPACK_IMPORTED_MODULE_2__["Weapon"]();
        }
    };
    CharacterWeaponComponent.prototype.validate = function (id, key) {
        if (!this.weapon[key]) {
            document.getElementById(id).classList.add('bad-input');
            this.weapon[key] = '';
        }
        else if (typeof this.weapon[key] === 'string') {
            if (this.weapon[key].trim() === '' ||
                (key === 'name' && !/^[a-zA-Z\s]+$/i.test(this.weapon[key]))) {
                document.getElementById(id).classList.add('bad-input');
            }
            else if (document.getElementById(id).classList.contains('bad-input')) {
                document.getElementById(id).classList.remove('bad-input');
            }
        }
        else {
            if (this.weapon[key] === '') {
                document.getElementById(id).classList.add('bad-input');
                this.weapon[key] = '';
            }
            else if (document.getElementById(id).classList.contains('bad-input')) {
                document.getElementById(id).classList.remove('bad-input');
            }
        }
    };
    CharacterWeaponComponent.prototype.validateElement = function (id, key) {
        if (!this.elemental[key]) {
            document.getElementById(id).classList.add('bad-input');
            this.elemental[key] = '';
        }
        else if (typeof this.elemental[key] === 'string') {
            if (this.elemental[key].trim() === '' ||
                (key === 'name' && !/^[a-zA-Z\s]+$/i.test(this.elemental[key]))) {
                document.getElementById(id).classList.add('bad-input');
            }
            else if (document.getElementById(id).classList.contains('bad-input')) {
                document.getElementById(id).classList.remove('bad-input');
            }
        }
        else {
            if (this.elemental[key] === '') {
                document.getElementById(id).classList.add('bad-input');
                this.elemental[key] = '';
            }
            else if (document.getElementById(id).classList.contains('bad-input')) {
                document.getElementById(id).classList.remove('bad-input');
            }
        }
    };
    CharacterWeaponComponent.prototype.makeElement = function () {
        console.log(this.isElemental);
        if (!this.isElemental) {
            this.elemental = {
                'type': '', 'attack': null, 'numberOfAttacks': null
            };
        }
        else {
            this.elemental = null;
        }
        console.log(this.elemental);
    };
    CharacterWeaponComponent.prototype.checkForRanged = function () {
        if (this.rangeList.includes(this.weapon.type)) {
            this.isRangedWeapon = true;
        }
        else {
            this.isRangedWeapon = false;
        }
    };
    CharacterWeaponComponent.prototype.setCrit = function () {
        var range = this.weapon.critRange.toString().split(',');
        var rangeArray = [];
        for (var i = 0; i < range.length; i++) {
            rangeArray.push(Number.parseInt(range[i]));
        }
        this.weapon.critRange = rangeArray;
    };
    CharacterWeaponComponent.prototype.createMessage = function () {
        var name = this.character.name;
        var weapon = this.character.weapons[this.character.weapons.length - 1];
        var weaponName = weapon.name;
        var weaponType = weapon.type;
        var message = name + ' added a ' + weaponType + ' called ' + weaponName + '.';
        this.message.add(message);
    };
    CharacterWeaponComponent.prototype.expandWeapon = function () {
        this.showWeapon = !this.showWeapon;
    };
    CharacterWeaponComponent.prototype.attack = function (weaponIndex) {
        var elemDmg;
        var crit = false;
        // set up constants for the weapon attack.
        var character = this.character;
        var weapon = character.weapons[weaponIndex];
        var weapSkill = character.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_3__["Weapons"][weapon.type]];
        var modifier = character.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_4__["Attributes"][weapon.modifier]];
        // make the roll to hit and see if the roll was a crit.
        var initialRoll = this.roll(20);
        if (weapon.critRange.includes(initialRoll)) {
            crit = true;
        }
        // the roll to hit adding the total wepon bonus and the weapon's modifier bonus.
        var rollWithBonus = initialRoll + weapSkill.ranks + (weapSkill.trained ? 3 : 0) + modifier.modifier;
        var dmgRoll = this.roll(weapon.attack) * weapon.numberOfAttacks * (crit ? weapon.critDamage : 1) + modifier.modifier;
        if (weapon.element && weapon.element != null) {
            elemDmg = this.roll(weapon.element.attack) * weapon.element.numberOfAttacks;
            this.elemRoll = elemDmg;
        }
        else {
            this.elemRoll = null;
        }
        this.attackMessage(character, weapon, rollWithBonus, dmgRoll, elemDmg, weapon.element);
        this.weaponName = weapon.name;
        this.rollToHit = rollWithBonus;
        this.dmgRoll = dmgRoll;
    };
    CharacterWeaponComponent.prototype.attackMessage = function (character, weapon, hit, dmg, elemDam, elem) {
        var name = character.name;
        var rolled = ' rolled a ' + hit + ' to hit with ' + weapon.name + ' for ' + dmg + ' points of physical damage.';
        if (elemDam && elem) {
            rolled = rolled.replace('.', ' and ' + elemDam + ' points of ' + elem.type + ' damage.');
        }
        var message = name + rolled;
        this.message.add(message);
    };
    CharacterWeaponComponent.prototype.roll = function (mod) {
        return Math.round(Math.random() * 100) % mod + 1;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _Character_character__WEBPACK_IMPORTED_MODULE_1__["Character"])
    ], CharacterWeaponComponent.prototype, "character", void 0);
    CharacterWeaponComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-character-weapon',
            template: __webpack_require__(/*! ./character-weapon.component.html */ "./src/app/character-weapon/character-weapon.component.html"),
            styles: [__webpack_require__(/*! ./character-weapon.component.css */ "./src/app/character-weapon/character-weapon.component.css")]
        }),
        __metadata("design:paramtypes", [_message_service__WEBPACK_IMPORTED_MODULE_6__["MessageService"]])
    ], CharacterWeaponComponent);
    return CharacterWeaponComponent;
}());



/***/ }),

/***/ "./src/app/character.service.ts":
/*!**************************************!*\
  !*** ./src/app/character.service.ts ***!
  \**************************************/
/*! exports provided: CharacterService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CharacterService", function() { return CharacterService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./message.service */ "./src/app/message.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// tslint:disable-next-line:import-blacklist


var CharacterService = /** @class */ (function () {
    function CharacterService(httpClient, messageService) {
        this.httpClient = httpClient;
        this.messageService = messageService;
        this.characterUrl = '/api/characters';
    }
    CharacterService.prototype.getCharacters = function () {
        var _this = this;
        return this.httpClient.get(this.characterUrl)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (ch) {
            var outcome = ch ? 'Got characters' : 'Found a problem';
            _this.messageService.add(outcome);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(this.handleError('get characters', [])));
    };
    CharacterService.prototype.handleError = function (operation, result) {
        var _this = this;
        return function (error) {
            console.log(error);
            var errMsg = 'ERROR IN ' + operation.toUpperCase() + ': ' + error.body.error;
            _this.messageService.add(errMsg);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(result);
        };
    };
    CharacterService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _message_service__WEBPACK_IMPORTED_MODULE_2__["MessageService"]])
    ], CharacterService);
    return CharacterService;
}());



/***/ }),

/***/ "./src/app/characters/characters.component.css":
/*!*****************************************************!*\
  !*** ./src/app/characters/characters.component.css ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* charactersComponent's private CSS styles */\r\n.selected {\r\n  background-color: #CFD8DC !important;\r\n  color: darkslategray;\r\n}\r\n.characters {\r\n  margin: 0 0 2em 0;\r\n  list-style-type: none;\r\n  padding: 0;\r\n  width: 10em;\r\n}\r\n.characters li {\r\n  cursor: pointer;\r\n  position: relative;\r\n  left: 0;\r\n  width: 60%;\r\n  background-color: #EEE;\r\n  margin: .5em;\r\n  padding: .3em 0;\r\n  height: 1.6em;\r\n  border-radius: 4px;\r\n}\r\n.characters li.selected:hover {\r\n  background-color: #BBD8DC !important;\r\n  color: darkslategray;\r\n}\r\n.characters li:hover {\r\n  color: #607D8B;\r\n  background-color: #DDD;\r\n  left: .1em;\r\n}\r\n.characters .text {\r\n  display: inline-block;\r\n  position: relative;\r\n  top: -3px;\r\n  text-align: center;\r\n}\r\n.characters .badge {\r\n  display: inline-block;\r\n  font-size: small;\r\n  color: white;\r\n  padding: 0.8em 0.7em 0 0.7em;\r\n  background-color: #607D8B;\r\n  line-height: 1em;\r\n  position: relative;\r\n  left: -1px;\r\n  top: -4px;\r\n  height: 1.8em;\r\n  margin-right: .8em;\r\n  border-radius: 4px 0 0 4px;\r\n}\r\n.character-column{\r\n  width: 25%;\r\n  float: left;\r\n}\r\n.details-column{\r\n  width: 75%;\r\n  float: left;\r\n}\r\n.accordian{\r\n  background: #EEE;\r\n  color: #444444;\r\n  cursor: pointer;\r\n  width: 100%;\r\n  text-align: left;\r\n  border: none;\r\n  outline: none;\r\n  transition: 0.4s;\r\n}\r\n.characters{\r\n  height: 50%;\r\n  width: 100%;\r\n}\r\n.messages{\r\n  height: 50%;\r\n  width: 100%;\r\n  margin-bottom: 1em;\r\n}\r\n@media (max-width: 900px){\r\n  .character-column{\r\n    width:50%;\r\n  }\r\n  .details-column{\r\n    width: 50%;\r\n  }\r\n}\r\n@media (max-width: 600px){\r\n  .character-column{\r\n    width: 100%;\r\n  }\r\n  .details-column{\r\n    width: 100%;\r\n  }\r\n}"

/***/ }),

/***/ "./src/app/characters/characters.component.html":
/*!******************************************************!*\
  !*** ./src/app/characters/characters.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"column-holder\">\r\n  <div class=\"character-column\">\r\n    <div class=\"characters\">\r\n      <h2>My Characters</h2>\r\n      <ul class=\"characters\">\r\n        <li *ngFor=\"let character of characters\" (click)=\"onSelect(character)\" [class.selected]=\"character===selectedCharacter\">\r\n          <span class=\"badge\">{{ character.race }}</span>\r\n          <span class=\"text\">{{ character.name }}</span>\r\n        </li>\r\n      </ul>\r\n  \r\n      <button *ngIf=\"selectedCharacter\" (click)=\"hide()\">Hide Character Sheet</button>\r\n      <br/>\r\n      <button (click)=\"newCharacter()\">Create Character</button>\r\n    </div>\r\n    <div class=\"messages\">\r\n      <app-messages></app-messages>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"details-column\">\r\n    <app-character-detail [character]=\"selectedCharacter\"></app-character-detail>\r\n    <div *ngIf=\"newChar\">\r\n      <app-character-create [CharacterParent]=\"this\"></app-character-create>\r\n    </div>\r\n  </div>\r\n\r\n</div>"

/***/ }),

/***/ "./src/app/characters/characters.component.ts":
/*!****************************************************!*\
  !*** ./src/app/characters/characters.component.ts ***!
  \****************************************************/
/*! exports provided: CharactersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CharactersComponent", function() { return CharactersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _character_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../character.service */ "./src/app/character.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CharactersComponent = /** @class */ (function () {
    function CharactersComponent(characterService) {
        this.characterService = characterService;
    }
    CharactersComponent.prototype.onSelect = function (character) {
        this.selectedCharacter = character;
        this.newChar = false;
    };
    CharactersComponent.prototype.hide = function () {
        this.selectedCharacter = null;
        this.newChar = false;
    };
    CharactersComponent.prototype.newCharacter = function () {
        this.hide();
        this.newChar = true;
    };
    CharactersComponent.prototype.getCharacters = function () {
        var _this = this;
        this.characterService.getCharacters()
            .subscribe(function (characters) {
            _this.characters = characters;
        });
    };
    CharactersComponent.prototype.ngOnInit = function () {
        this.getCharacters();
    };
    CharactersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-characters',
            template: __webpack_require__(/*! ./characters.component.html */ "./src/app/characters/characters.component.html"),
            styles: [__webpack_require__(/*! ./characters.component.css */ "./src/app/characters/characters.component.css")]
        }),
        __metadata("design:paramtypes", [_character_service__WEBPACK_IMPORTED_MODULE_1__["CharacterService"]])
    ], CharactersComponent);
    return CharactersComponent;
}());



/***/ }),

/***/ "./src/app/die/die.component.css":
/*!***************************************!*\
  !*** ./src/app/die/die.component.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".dice{\r\n  border-radius: 3px;\r\n  height: 40px;\r\n  width: 40px;\r\n  text-align: center;\r\n  padding: 3px 5px;\r\n  margin: 3px 3px;\r\n}"

/***/ }),

/***/ "./src/app/die/die.component.html":
/*!****************************************!*\
  !*** ./src/app/die/die.component.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button class=\"dice\" (click)=\"roll(sides)\"> {{ sides }}</button>\n"

/***/ }),

/***/ "./src/app/die/die.component.ts":
/*!**************************************!*\
  !*** ./src/app/die/die.component.ts ***!
  \**************************************/
/*! exports provided: DieComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DieComponent", function() { return DieComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _character_detail_character_detail_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../character-detail/character-detail.component */ "./src/app/character-detail/character-detail.component.ts");
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../message.service */ "./src/app/message.service.ts");
/* harmony import */ var _Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Character/Enums/attributes.enum */ "./src/app/Character/Enums/attributes.enum.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DieComponent = /** @class */ (function () {
    function DieComponent(messageService) {
        this.messageService = messageService;
        this.crit = false;
    }
    DieComponent.prototype.ngOnInit = function () { };
    DieComponent.prototype.createMessage = function (roll, modVal, sides) {
        var NAME = this.character.character.name;
        var ROLLED = ' rolled a ';
        var MOD = ' with a ';
        var MODNAME = modVal ? this.character.character.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"][this.mod]].name + ' modifier of ' : '';
        var THEREISMOD = modVal ? MOD + MODNAME + modVal : '';
        var TOTAL = 'TOTAL: ' + (roll + (modVal ? modVal : 0)) + '.';
        var rollString = NAME + ROLLED + roll + MOD + 'D' + sides + THEREISMOD + '. ' + TOTAL;
        this.messageService.add(rollString);
    };
    DieComponent.prototype.roll = function (sides) {
        this.character.crit = false;
        this.character.critmiss = false;
        this.character.maxDmg = false;
        var roll = Math.round(Math.random() * 100) % sides + 1;
        var modVal;
        var rollVal;
        if (roll === sides && sides === 20) {
            this.character.crit = true;
        }
        if (roll === 1 && sides === 20) {
            this.character.critmiss = true;
        }
        if (roll === sides &&
            (sides === 4 || sides === 6 || sides === 8 || sides === 12)) {
            this.character.maxDmg = true;
        }
        if (this.mod !== 'null' && this.mod) {
            modVal = this.character.character.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_3__["Attributes"][this.mod]].modifier;
            rollVal = roll + modVal;
        }
        else {
            rollVal = roll;
        }
        this.character.setRoll(rollVal.toString());
        this.createMessage(roll, modVal, sides);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _character_detail_character_detail_component__WEBPACK_IMPORTED_MODULE_1__["CharacterDetailComponent"])
    ], DieComponent.prototype, "character", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], DieComponent.prototype, "sides", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], DieComponent.prototype, "mod", void 0);
    DieComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-die',
            template: __webpack_require__(/*! ./die.component.html */ "./src/app/die/die.component.html"),
            styles: [__webpack_require__(/*! ./die.component.css */ "./src/app/die/die.component.css")]
        }),
        __metadata("design:paramtypes", [_message_service__WEBPACK_IMPORTED_MODULE_2__["MessageService"]])
    ], DieComponent);
    return DieComponent;
}());



/***/ }),

/***/ "./src/app/in-memory-data.service.ts":
/*!*******************************************!*\
  !*** ./src/app/in-memory-data.service.ts ***!
  \*******************************************/
/*! exports provided: InMemoryDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InMemoryDataService", function() { return InMemoryDataService; });
/* harmony import */ var _Character_character_methods__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Character/character-methods */ "./src/app/Character/character-methods.ts");
/* harmony import */ var _Races_Races__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Races/Races */ "./src/app/Races/Races.ts");
/* harmony import */ var _Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Character/Enums/attributes.enum */ "./src/app/Character/Enums/attributes.enum.ts");
/* harmony import */ var _Character_Enums_magic_skills_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Character/Enums/magic-skills.enum */ "./src/app/Character/Enums/magic-skills.enum.ts");
/* harmony import */ var _Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Character/Enums/skills.enum */ "./src/app/Character/Enums/skills.enum.ts");
/* harmony import */ var _Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Character/Enums/weapon-skills.enum */ "./src/app/Character/Enums/weapon-skills.enum.ts");
/* harmony import */ var _Character_spells__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Character/spells */ "./src/app/Character/spells.ts");
/* harmony import */ var _Character_Weapons_weapon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Character/Weapons/weapon */ "./src/app/Character/Weapons/weapon.ts");








var InMemoryDataService = /** @class */ (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var EXP = 54150;
        var STR = 'Strength';
        var DEX = 'Dexterity';
        var CON = 'Constitution';
        var INT = 'Intelligence';
        var WIS = 'Wisdom';
        var CHA = 'Charisma';
        var Bryte = new _Races_Races__WEBPACK_IMPORTED_MODULE_1__["Fairy"]('Nayru');
        Bryte.name = 'Bryte';
        Bryte.ac = 20;
        Bryte.flat_footed = 17;
        Bryte.touch = 20;
        Bryte.craftOne = 'Fairy Made Armor';
        Bryte.craftTwo = 'Magic Potions';
        Bryte.profession = 'Armor Smith';
        Bryte.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__["Attributes"][STR]].value = 11;
        Bryte.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__["Attributes"][DEX]].value = 14;
        Bryte.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__["Attributes"][CON]].value = 12;
        Bryte.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__["Attributes"][INT]].value = 14;
        Bryte.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__["Attributes"][WIS]].value = 25;
        Bryte.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__["Attributes"][CHA]].value = 14;
        Bryte.health = Bryte.maxHealth = 166;
        Bryte.magic = Bryte.maxMagic = 77;
        Bryte.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_4__["Skills"]['CraftOne']].ranks = 3;
        Bryte.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_4__["Skills"]['CraftOne']].misc = 5;
        Bryte.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_4__["Skills"]['CraftTwo']].ranks = 2;
        Bryte.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_4__["Skills"]['Fly']].ranks = 1;
        Bryte.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_4__["Skills"]['Knowledge Geography']].ranks = 2;
        Bryte.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_4__["Skills"]['Perception']].ranks = 1;
        Bryte.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_4__["Skills"]['Perform Music']].ranks = 2;
        Bryte.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_4__["Skills"]['Profession']].ranks = 2;
        Bryte.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_4__["Skills"]['Sense Motive']].ranks = 3;
        Bryte.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_5__["Weapons"]['Fire Rod']].ranks = 6;
        Bryte.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_5__["Weapons"]['Ice Rod']].ranks = 6;
        Bryte.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_5__["Weapons"]['Lightning Rod']].ranks = 6;
        Bryte.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_5__["Weapons"]['Tornado Rod']].ranks = 9;
        Bryte.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_5__["Weapons"]['Sand Rod']].ranks = 6;
        Bryte.magicSkills[_Character_Enums_magic_skills_enum__WEBPACK_IMPORTED_MODULE_3__["Magics"]['Din']].ranks = 2;
        Bryte.magicSkills[_Character_Enums_magic_skills_enum__WEBPACK_IMPORTED_MODULE_3__["Magics"]['Nayru']].ranks = 13;
        Bryte.magicSkills[_Character_Enums_magic_skills_enum__WEBPACK_IMPORTED_MODULE_3__["Magics"]['Farore']].ranks = 1;
        _Character_character_methods__WEBPACK_IMPORTED_MODULE_0__["methods"].calcMod(Bryte);
        _Character_character_methods__WEBPACK_IMPORTED_MODULE_0__["methods"].gainExp(Bryte, EXP);
        // Bryte's Spells
        var fairyCure = new _Character_spells__WEBPACK_IMPORTED_MODULE_6__["Spell"]();
        fairyCure.name = 'Fairy Cure';
        fairyCure.effect = 'Heals target.';
        fairyCure.mpUse = 5;
        fairyCure.damage = 8;
        fairyCure.multiplier = 2;
        fairyCure.diety = 'Nayru';
        fairyCure.modifier = WIS;
        var curse = new _Character_spells__WEBPACK_IMPORTED_MODULE_6__["Spell"]();
        curse.name = 'Fairy Curse';
        curse.damage = 8;
        curse.mpUse = 5;
        curse.multiplier = 1;
        curse.modifier = WIS;
        curse.diety = 'Nayru';
        curse.effect = 'Damages target.';
        var shield = new _Character_spells__WEBPACK_IMPORTED_MODULE_6__["Spell"]();
        shield.diety = 'Nayru';
        shield.name = 'Shield of Faith';
        shield.effect = '+2 AC for 1d4 turns.';
        shield.damage = 4;
        shield.multiplier = 1;
        shield.mpUse = 6;
        var esuna = new _Character_spells__WEBPACK_IMPORTED_MODULE_6__["Spell"]();
        esuna.name = 'Esuna';
        esuna.effect = 'Remove status effect.';
        esuna.damage = 4;
        esuna.mpUse = 5;
        esuna.multiplier = 1;
        esuna.diety = 'Nayru';
        var favor = new _Character_spells__WEBPACK_IMPORTED_MODULE_6__["Spell"]();
        favor.name = 'Divine Favor';
        favor.effect = '+1 to Attack and Damage rolls.';
        favor.diety = 'Nayru';
        favor.mpUse = 8;
        favor.damage = 4;
        favor.multiplier = 1;
        var endure = new _Character_spells__WEBPACK_IMPORTED_MODULE_6__["Spell"]();
        endure.name = 'Endure Elemetns';
        endure.mpUse = 5;
        endure.diety = 'Farore';
        endure.effect = 'Grants Hot & Cold resistance.';
        endure.damage = 4;
        endure.multiplier = 1;
        var glitter = new _Character_spells__WEBPACK_IMPORTED_MODULE_6__["Spell"]();
        glitter.name = 'Glitter Dust';
        glitter.effect = 'Blinds & shows enemies.';
        glitter.damage = 4;
        glitter.multiplier = 1;
        glitter.mpUse = 8;
        glitter.diety = 'Din';
        var eCure = new _Character_spells__WEBPACK_IMPORTED_MODULE_6__["Spell"]();
        eCure.name = 'Fairy Cure Enhanced';
        eCure.effect = 'Heal 1/2 level people.';
        eCure.damage = 8;
        eCure.multiplier = 2;
        eCure.diety = 'Nayru';
        eCure.modifier = WIS;
        eCure.mpUse = 15;
        var shadow = new _Character_spells__WEBPACK_IMPORTED_MODULE_6__["Spell"]();
        shadow.name = 'Shadow Sneak';
        shadow.damage = 6;
        shadow.multiplier = 2;
        shadow.diety = 'Nayru';
        shadow.mpUse = 10;
        shadow.effect = 'Attacks targets with 10 ft. range.';
        shadow.useDiety = true;
        // tslint:disable-next-line:max-line-length
        Bryte.spells = [fairyCure, curse, shield, esuna, favor, glitter, eCure, shadow, endure].sort(function (a, b) { return a.diety > b.diety ? 1 : 0; });
        // End Bryte's spells
        // Bryte's Weapons
        var tornadoRod = new _Character_Weapons_weapon__WEBPACK_IMPORTED_MODULE_7__["Weapon"]();
        tornadoRod.name = 'Tornado Rod';
        tornadoRod.attack = 8;
        tornadoRod.numberOfAttacks = 1;
        tornadoRod.range = 30;
        tornadoRod.type = 'Tornado Rod';
        tornadoRod.modifier = WIS;
        tornadoRod.critRange = [20];
        tornadoRod.critDamage = 3;
        tornadoRod.ammo = 0;
        var fireRod = new _Character_Weapons_weapon__WEBPACK_IMPORTED_MODULE_7__["Weapon"]();
        fireRod.name = 'Fire Rod';
        fireRod.attack = 10;
        fireRod.numberOfAttacks = 1;
        fireRod.range = 30;
        fireRod.type = 'Fire Rod';
        fireRod.modifier = WIS;
        fireRod.critDamage = 3;
        fireRod.critRange = [20];
        fireRod.ammo = 0;
        fireRod.element = {
            attack: 8,
            numberOfAttacks: 1,
            type: 'Fire'
        };
        Bryte.weapons = [tornadoRod, fireRod];
        var Rya = new _Races_Races__WEBPACK_IMPORTED_MODULE_1__["Gerudo"]();
        Rya.name = 'Rya';
        Rya.ac = 19;
        Rya.flat_footed = 10;
        Rya.touch = 17;
        Rya.health = Rya.maxHealth = 154;
        Rya.magic = Rya.maxMagic = 30;
        Rya.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__["Attributes"][STR]].value = 24;
        Rya.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__["Attributes"][DEX]].value = 24;
        Rya.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__["Attributes"][CON]].value = 10;
        Rya.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__["Attributes"][INT]].value = 16;
        Rya.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__["Attributes"][WIS]].value = 10;
        Rya.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__["Attributes"][CHA]].value = 8;
        Rya.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_4__["Skills"]['Acrobatics']].ranks = 2;
        Rya.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_4__["Skills"]['Perception']].ranks = 5;
        Rya.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_5__["Weapons"]['Short Sword']].ranks = 10;
        Rya.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_5__["Weapons"]['Long Sword']].ranks = 10;
        Rya.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_5__["Weapons"]['Dual Sword']].ranks = 13;
        Rya.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_5__["Weapons"]['Halberd']].ranks = 4;
        Rya.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_5__["Weapons"]['Sling']].ranks = 5;
        Rya.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_5__["Weapons"]['Unarmed']].ranks = 4;
        _Character_character_methods__WEBPACK_IMPORTED_MODULE_0__["methods"].calcMod(Rya);
        _Character_character_methods__WEBPACK_IMPORTED_MODULE_0__["methods"].gainExp(Rya, EXP);
        // Rya's Weapons
        var tiari = new _Character_Weapons_weapon__WEBPACK_IMPORTED_MODULE_7__["Weapon"]();
        tiari.name = 'Tiari';
        tiari.critDamage = 2;
        tiari.critRange = [19, 20];
        tiari.attack = 8;
        tiari.numberOfAttacks = 1;
        tiari.type = 'Long Sword';
        tiari.modifier = STR;
        tiari.element = {
            attack: 4,
            numberOfAttacks: 1,
            type: 'Fire'
        };
        var sling = new _Character_Weapons_weapon__WEBPACK_IMPORTED_MODULE_7__["Weapon"]();
        sling.name = 'Sling';
        sling.type = 'Sling';
        sling.attack = 4;
        sling.numberOfAttacks = 1;
        sling.range = 30;
        sling.ammo = 30;
        sling.critRange = [20];
        sling.critDamage = 2;
        sling.modifier = DEX;
        var blitz = new _Character_Weapons_weapon__WEBPACK_IMPORTED_MODULE_7__["Weapon"]();
        blitz.name = 'Blitz';
        blitz.attack = 8;
        blitz.numberOfAttacks = 1;
        blitz.type = 'Short Sword';
        blitz.critDamage = 3;
        blitz.critRange = [18, 19, 20];
        blitz.modifier = STR;
        blitz.element = {
            attack: 8,
            numberOfAttacks: 1,
            type: 'Lightning'
        };
        Rya.weapons = [tiari, sling, blitz];
        var Greyson = new _Races_Races__WEBPACK_IMPORTED_MODULE_1__["Goron"]('Rock Spine');
        Greyson.name = 'Greyson';
        Greyson.craftOne = 'Elemental Bomb';
        Greyson.health = Greyson.maxHealth = 140;
        Greyson.magic = Greyson.maxMagic = 19;
        Greyson.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__["Attributes"][STR]].value = 25;
        Greyson.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__["Attributes"][DEX]].value = 14;
        Greyson.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__["Attributes"][CON]].value = 24;
        Greyson.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__["Attributes"][INT]].value = 12;
        Greyson.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__["Attributes"][WIS]].value = 12;
        Greyson.attributes[_Character_Enums_attributes_enum__WEBPACK_IMPORTED_MODULE_2__["Attributes"][CHA]].value = 11;
        Greyson.magicSkills[_Character_Enums_magic_skills_enum__WEBPACK_IMPORTED_MODULE_3__["Magics"]['Din']].ranks = 2;
        Greyson.magicSkills[_Character_Enums_magic_skills_enum__WEBPACK_IMPORTED_MODULE_3__["Magics"]['Nayru']].ranks = 2;
        Greyson.magicSkills[_Character_Enums_magic_skills_enum__WEBPACK_IMPORTED_MODULE_3__["Magics"]['Farore']].ranks = 2;
        Greyson.ac = 17;
        Greyson.flat_footed = 10;
        Greyson.touch = 17;
        Greyson.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_4__["Skills"]['Acrobatics']].ranks = 5;
        Greyson.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_4__["Skills"]['Climb']].ranks = 2;
        Greyson.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_4__["Skills"]['Handle Animal']].ranks = 3;
        Greyson.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_4__["Skills"]['CraftOne']].misc = 3;
        Greyson.skills[_Character_Enums_skills_enum__WEBPACK_IMPORTED_MODULE_4__["Skills"]['Stealth']].ranks = 2;
        Greyson.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_5__["Weapons"]['Tower Shield']].ranks = 5;
        Greyson.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_5__["Weapons"]['One-Handed Hammer']].ranks = 10;
        Greyson.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_5__["Weapons"]['Two-Handed Hammer']].ranks = 2;
        Greyson.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_5__["Weapons"]['Small Bomb']].ranks = 4;
        Greyson.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_5__["Weapons"]['Medium Bomb']].ranks = 4;
        Greyson.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_5__["Weapons"]['Large Bomb']].ranks = 3;
        Greyson.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_5__["Weapons"]['Bombs Other']].ranks = 3;
        Greyson.weaponSkills[_Character_Enums_weapon_skills_enum__WEBPACK_IMPORTED_MODULE_5__["Weapons"]['Unarmed']].ranks = 13;
        _Character_character_methods__WEBPACK_IMPORTED_MODULE_0__["methods"].calcMod(Greyson);
        _Character_character_methods__WEBPACK_IMPORTED_MODULE_0__["methods"].gainExp(Greyson, EXP);
        var Golo = new _Races_Races__WEBPACK_IMPORTED_MODULE_1__["Hylian"]('Farmer');
        Golo.name = 'Golo';
        Golo.health = Golo.maxHealth = 76;
        Golo.magic = Golo.maxMagic = 19;
        Golo.attributes[0].value = 23;
        Golo.attributes[1].value = 12;
        Golo.attributes[2].value = 22;
        Golo.attributes[3].value = 6;
        Golo.attributes[4].value = 6;
        Golo.attributes[5].value = 18;
        Golo.ac = 14;
        Golo.flat_footed = 13;
        Golo.touch = 11;
        Golo.weaponSkills[0].ranks = 5;
        Golo.skills[5].ranks = 3;
        Golo.skills[9].ranks = 1;
        Golo.skills[22].ranks = 4;
        Golo.skills[29].ranks = 2;
        _Character_character_methods__WEBPACK_IMPORTED_MODULE_0__["methods"].calcMod(Golo);
        _Character_character_methods__WEBPACK_IMPORTED_MODULE_0__["methods"].gainExp(Golo, EXP);
        var characters = [Bryte, Rya, Greyson, Golo];
        return { characters: characters };
    };
    return InMemoryDataService;
}());



/***/ }),

/***/ "./src/app/message.service.ts":
/*!************************************!*\
  !*** ./src/app/message.service.ts ***!
  \************************************/
/*! exports provided: MessageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageService", function() { return MessageService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Character_character_methods__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Character/character-methods */ "./src/app/Character/character-methods.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var MessageService = /** @class */ (function () {
    function MessageService() {
        this.messages = [];
    }
    MessageService.prototype.add = function (message) {
        message = _Character_character_methods__WEBPACK_IMPORTED_MODULE_1__["methods"].getDateString() + ' :: ' + message;
        this.messages.unshift(message);
    };
    MessageService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], MessageService);
    return MessageService;
}());



/***/ }),

/***/ "./src/app/messages/messages.component.css":
/*!*************************************************!*\
  !*** ./src/app/messages/messages.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".messages{\r\n  margin-top: 1em;\r\n  margin-bottom: 1em;\r\n  height: 50vh;\r\n  overflow: auto;\r\n}\r\n\r\n.accordian{\r\n  width: 60%;\r\n}"

/***/ }),

/***/ "./src/app/messages/messages.component.html":
/*!**************************************************!*\
  !*** ./src/app/messages/messages.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"messageService.messages.length\">\r\n\r\n  <button class=\"accordian\" (click)=\"showMessages()\">\r\n    <h2>Message Log</h2>\r\n  </button>\r\n  <div class=\"messages panel\" [class.active]=\"show\">\r\n    <div *ngFor=\"let message of messageService.messages\">{{ message }}</div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/messages/messages.component.ts":
/*!************************************************!*\
  !*** ./src/app/messages/messages.component.ts ***!
  \************************************************/
/*! exports provided: MessagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagesComponent", function() { return MessagesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _message_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../message.service */ "./src/app/message.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MessagesComponent = /** @class */ (function () {
    function MessagesComponent(messageService) {
        this.messageService = messageService;
        this.show = false;
    }
    MessagesComponent.prototype.ngOnInit = function () {
    };
    MessagesComponent.prototype.showMessages = function () {
        this.show = !this.show;
    };
    MessagesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-messages',
            template: __webpack_require__(/*! ./messages.component.html */ "./src/app/messages/messages.component.html"),
            styles: [__webpack_require__(/*! ./messages.component.css */ "./src/app/messages/messages.component.css")]
        }),
        __metadata("design:paramtypes", [_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageService"]])
    ], MessagesComponent);
    return MessagesComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _polyfills_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polyfills.ts */ "./src/polyfills.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ "./src/polyfills.ts":
/*!**************************!*\
  !*** ./src/polyfills.ts ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_es7_reflect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/es7/reflect */ "./node_modules/core-js/es7/reflect.js");
/* harmony import */ var core_js_es7_reflect__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_es7_reflect__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zone.js/dist/zone */ "./node_modules/zone.js/dist/zone.js");
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_1__);
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */
/***************************************************************************************************
 * BROWSER POLYFILLS
 */
/** IE9, IE10 and IE11 requires all of the following polyfills. **/
// import 'core-js/es6/symbol';
// import 'core-js/es6/object';
// import 'core-js/es6/function';
// import 'core-js/es6/parse-int';
// import 'core-js/es6/parse-float';
// import 'core-js/es6/number';
// import 'core-js/es6/math';
// import 'core-js/es6/string';
// import 'core-js/es6/date';
// import 'core-js/es6/array';
// import 'core-js/es6/regexp';
// import 'core-js/es6/map';
// import 'core-js/es6/weak-map';
// import 'core-js/es6/set';
/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run `npm install --save classlist.js`.
/** IE10 and IE11 requires the following for the Reflect API. */
// import 'core-js/es6/reflect';
/** Evergreen browsers require these. **/
// Used for reflect-metadata in JIT. If you use AOT (and only Angular decorators), you can remove.

/**
 * Required to support Web Animations `@angular/platform-browser/animations`.
 * Needed for: All but Chrome, Firefox and Opera. http://caniuse.com/#feat=web-animation
 **/
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
 // Included with Angular CLI.
/***************************************************************************************************
 * APPLICATION IMPORTS
 */


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\jay.mcdoniel\Documents\Angular Tutorials\angular-zeldaplay\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map