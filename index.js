// ==UserScript==
// @name         mes
// @namespace    https://github.com/abrkn/mes#readme
// @version      0.3.11
// @description  Memo Enhancement Suite (MES)
// @author       Andreas Brekken: https://memo.cash/profile/149o1esm1LrYEy1DizZgxANSppx3FESHKw
// @match        https://memo.cash/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
'use strict'
/*eslint-env browser */

module.exports = {
  /**
   * Create a <style>...</style> tag and add it to the document head
   * @param {string} cssText
   * @param {object?} options
   * @return {Element}
   */
  createStyle: function (cssText, options) {
    var container = document.head || document.getElementsByTagName('head')[0]
    var style = document.createElement('style')
    options = options || {}
    style.type = 'text/css'
    if (options.href) {
      style.setAttribute('data-href', options.href)
    }
    if (style.sheet) { // for jsdom and IE9+
      style.innerHTML = cssText
      style.sheet.cssText = cssText
    }
    else if (style.styleSheet) { // for IE8 and below
      style.styleSheet.cssText = cssText
    }
    else { // for Chrome, Firefox, and Safari
      style.appendChild(document.createTextNode(cssText))
    }
    if (options.prepend) {
      container.insertBefore(style, container.childNodes[0]);
    } else {
      container.appendChild(style);
    }
    return style
  }
}

},{}],3:[function(require,module,exports){
const injectInlineCommenting = require('./plugins/inline-commenting');
const injectRememberPassword = require('./plugins/remember-password');
const injectAutoExpandImages = require('./plugins/auto-expand-images');
const injectFixTipAmountInput = require('./plugins/fix-tip-amount');
const injectCssStateClasses = require('./plugins/css-state-classes');

const addCss = () => {
  const element = document.createElement('style');
  element.innerText = require('./app.scss');

  document.head.appendChild(element);
};

addCss();

$(() => {
  injectRememberPassword();
  injectFixTipAmountInput();
  injectAutoExpandImages();
  injectCssStateClasses();
  injectInlineCommenting();
});

},{"./app.scss":4,"./plugins/auto-expand-images":7,"./plugins/css-state-classes":8,"./plugins/fix-tip-amount":9,"./plugins/inline-commenting":10,"./plugins/remember-password":11}],4:[function(require,module,exports){
var css = "﻿*{box-sizing:border-box}html body{margin-top:40px}html body .btn-leave{background:#b5b5b5}html body .btn-leave:hover,html body .btn-leave:focus{background:#999}body .btn:hover,.btn:focus{background:#bfe498}body table{margin:65px auto 0}body table.table td{border-radius:0px;margin:5px;padding:20px}html hr{border:1px solid #eee}body table.table th{border-radius:0}body ul{margin:0}body ul li{display:inline-block;list-style:none;margin:5px}body .btn,.btn-primary.btn-block,body input[type=submit].btn{background:#99c261;border:0;border-radius:50px;color:#fff;margin:5px 0;padding:8px 12px;transition:background-color 0.25s ease}.is-disabled,.post.is-liking .actions .like-button,.post.is-liked .actions .like-button{cursor:not-allowed;pointer-events:none}.post .actions .like-button:after{content:\"Like Memo\"}.post.is-liked .actions .like-button{background-color:rgba(0,0,0,0.2)}.post.is-liked .actions .like-button:after{content:\"👍 Liked Memo!\"}.post.is-liking .actions .like-button{background-color:rgba(84,141,29,0.75)}.post.is-liking .actions .like-button:after{content:\"⌛ Liking Memo...\"}body #profile-search{background:#eee;border:0;border-radius:0;font-size:20px;height:45px;margin:5px auto 0;max-width:100%;padding:5px 10px;text-align:center;width:600px}body label[for=profile-search]{display:block;margin:0}body textarea,input[type=text],input[type=password]{background:#eee;border:0;border-radius:0;padding:5px 10px;font-size:19px;line-height:1.4}body input[type=text],body input[type=password]{background:#eee;border:0;border-radius:0;height:35px}body #form-signup{padding:10px 0}html body .new-memo-button{background:#618b32;position:absolute;top:0;right:5px}html body .header{position:fixed;width:100%;top:0;left:0;background:#fff;border-bottom:1px solid #eee;box-shadow:0 0 5px rgba(0,0,0,0.1);z-index:999;padding-bottom:0px}html body .header h1{display:inline-block;line-height:1;float:left;padding-left:5px;padding-top:5px}html body .header img{vertical-align:middle;margin-top:-5px}html body .header .nav a.logout-button{background:#B5B5B5;color:#fff;position:relative}html body .protocol-button{background:rgba(255,255,255,0.7);color:#618b32;position:fixed;right:95px;bottom:0}html body .protocol-button:hover,html body .disclaimer-button:hover{color:#222}body .disclaimer-button{background:rgba(255,255,255,0.7);color:#618b32;position:fixed;right:0;bottom:0}body #profile-list{align-item:flex-end;display:flex;flex-flow:row wrap;justify-content:space-around}body #profile-list .btn{background:#c2c2c2;border-radius:3px;color:white;height:150px;line-height:150px;margin:2px;padding:5px;text-align:center;width:211px;word-break:break-all}body #profile-list .btn:hover,body #profile-list .btn:focus{background:#777}body #profile-list p{margin:0}body .header,body{text-align:center}body .message{font-family:helvetica, arial, sans-serif;font-size:21px;line-height:1.3;padding:5px 10px}html .post{margin:20px auto;box-shadow:none;border:1px solid #ddd;background:#eee;border-radius:4px;max-width:888px;text-align:left;margin:25px auto}body .post .btn-leave{float:right}body .post .actions{margin:10px}body .post .likes{margin:10px}body .message a{color:#a1c16d}body .post{padding:0}body .post .name{background:#fff;border-radius:5px 5px 0 0;margin:0;padding:10px;color:#222}body .post .name .profile-button.post-profile-button{background:#fff}body .new-memo-inner-button{display:block;width:400px;margin:10px auto;background:#618b32;position:absolute;top:95px;left:50%;margin-left:-200px}body .profile-button,body p.name .profile-button{background:#fff;display:inline-block;margin:0;width:auto}body p .profile-button{background:#fff;color:#888}body>p:nth-child(9)>a.btn.profile-button{border:1px solid #888}body p .profile-button:hover,body p .profile-button:focus{background:#fff;border-color:#999;color:#999}body .profile-button.post-profile-button{display:inline-block;width:auto;margin:0}html a[href=\"key/change-password\"],html a[href=\"key/export\"],html a[href=\"memo/set-name\"],html a.outline-button{background:#fff;border:1px solid #888;color:#888}html a[href=\"key/change-password\"]:hover,html a[href=\"key/export\"]:hover,html a[href=\"memo/set-name\"]:hover,html a[href=\"key/change-password\"]:focus,html a[href=\"key/export\"]:focus,html a[href=\"memo/set-name\"]:focus,html a.outline-button:hover,html a.outline-button:focus{background:#fff;border-color:#999;color:#999}html a[href=\"/introducing-memo\"],html a[href=\"/profile/1F5GrRezwGokQhxmF4fYaBbbNrPPaeBqMm\"],html a[href=\"/stats\"],body .footer-button{background:#ccc}@media only screen and (max-width: 920px){html body .new-memo-button{position:relative;right:0}}@media only screen and (max-width: 640px){html body .new-memo-button{position:absolute;right:5px}}\n"
module.exports = require('scssify').createStyle(css, {})
},{"scssify":2}],5:[function(require,module,exports){
const { state, saveState } = require('./state');
const { fetchCsrf, fetchTmXhr } = require('./memoFetch');

const likePostInBackground = async (txhash, tip = 0) => {
  const { memoPassword: password } = localStorage;
  const csrf = await fetchCsrf(`memo/like/${txhash}`);
  const tipForQuery = (+tip || '').toString();

  await fetchTmXhr({
    url: 'memo/like-submit',
    data: `txHash=${txhash}&tip=${tipForQuery}&password=${password}`,
    csrf,
  });

  const prevTip = state.likedPosts[txhash] ? state.likedPosts[txhash].tip || 0 : 0;

  state.likedPosts[txhash] = {
    timestamp: +new Date(),
    tip: prevTip + +tip,
  };

  saveState();
};

Object.assign(exports, {
  likePostInBackground,
});

},{"./memoFetch":6,"./state":12}],6:[function(require,module,exports){
const fetchTmXhr = req =>
  new Promise((resolve, reject) => {
    if (!req.url.match(/^http/)) {
      req.url = `https://memo.cash/${req.url}`;
    }
    console.log(`Fetching ${req.url} to get CSRF...`);

    const onerror = error => reject(error);

    const onload = res => {
      const { readyState, responseText, status } = res;

      if (res.readyState !== 4) {
        reject(new Error(`readyState=${readyState}; responseText: ${responseText || '<none>'}`));
        return;
      }
      if (!(status >= 200 && status < 300)) {
        reject(
          new Error(`HTTP Status=${status || '<none>'}; responseText: ${responseText || '<none>'}`)
        );
        return;
      }
      console.log(`Fetched ${req.url}`);

      resolve(responseText);
    };

    const contentType = 'application/x-www-form-urlencoded; charset=UTF-8';

    const reqToSend = Object.assign(
      {
        method: req.data ? 'POST' : 'GET',
        headers: {
          ...(req.csrf ? { 'x-csrf-token': `${req.csrf}` } : {}),
          ...(req.data ? { referer: req.url } : {}),
          'content-type': contentType,
        },
        onerror,
        onload,
      },
      req
    );

    GM_xmlhttpRequest(reqToSend);
  });

const fetchCsrf = url =>
  fetchTmXhr({ url }).then(text => text.match(/MemoApp.InitCsrf."([^"]+)/)[1]);

Object.assign(exports, {
  fetchTmXhr,
  fetchCsrf,
});

},{}],7:[function(require,module,exports){
const get = require('lodash.get');

function injectAutoExpandImages() {
  $('.post .message').each((_, message) => {
    const $message = $(message);
    const messageWidth = $message.width();
    const $a = $message.find('a');

    const createImg = src =>
      $(
        `<img src="${src}" className="is-mes-expanded-media" style="max-width:${messageWidth}px;max-height:200px;display:block;margin:10px auto;" />`
      );

    $a.each((i, el) => {
      const $el = $(el);
      const href = $(el).attr('href');

      // Direct
      const directImg = get(href.match(/^.+\.(png|jpe?g|gif)$/i), '0');

      if (directImg) {
        $el.html(createImg(directImg));
      }

      // Imgflip
      const imgFlipId = get(href.match(/https?:\/\/imgflip\.com\/i\/([a-z0-9]{6,8})/i), '1');

      if (imgFlipId) {
        const imgFlipSrc = `https://i.imgflip.com/${imgFlipId}.jpg`;
        $el.html(createImg(imgFlipSrc));
      }
    });

    // YouTube short-hand
    const prevHtml = $message.html();

    let nextHtml = prevHtml;

    nextHtml = nextHtml.replace(
      /yt!([0-9a-z]{9,12})/i,
      '<iframe src="https://www.youtube.com/embed/$1?html5=1" width=414 height=233 style="margin:10px auto; display:block;border:0;"></iframe>'
    );

    if (nextHtml !== prevHtml) {
      $message.html(nextHtml);
    }
  });
}

module.exports = injectAutoExpandImages;

},{"lodash.get":1}],8:[function(require,module,exports){
const { state } = require('../state');

function injectCssStateClasses() {
  // Add missing css class to "Like Memo" buttons
  $(`.post .actions a[href^='memo/like']`).addClass('like-button');

  //add class to secondary nav buttons
  $(`.nav a[href^='disclaimer']`).addClass('disclaimer-button');
  $(`.nav a[href="logout"]`).addClass('logout-button');


  //icon
  $( "<img style='width:13px; margin-right:3px; vertical-align:middle;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALxSURBVGhD7ZhLiM1RHMfn6RUy5bEhG0RR0sRmapRJTTY2Hgt7sRKRhWxs1IQpsbBgo5ASkiiWFlNMKTZEKTVNNE0eSXL5/M75Utdt7j3nf+/9/0/6f+rbefzeNTX3fzoaUalUtqAbaOJXvkxT8xHrLtSpdrJBosPop0tbIPRwnaVXbcVB4E4SVFymBKCVEbUWB4GvlMPB+SsaZ/s0D1HrA+tfOP9AK9ReGARsULyD8xu0TOZcoN5sdEctODgfkDkMAoYV6+B8SqZcoe52teDgHPfnRcAOxf7huEy5Qt0BX95DXxdlCqMcpMVQtxzEUQ7SYqib/iDU2IQeo4O6qoG6fdjHfAvpDnJZua3BsyxdMlXB/Tzst+WX5CD3lNvB+RaaK3MVmLuxnUfpD2JwN4aWyqUGbOu0DaOoQQzu37KslVtzFDmIgW0KDco1O1kGwacH9YWKGg9ZZwT7d7RP6bMROwj+e9Fn+bYMchon2Wb71CU4dpB38msL5L/CMkvlwokdBPu0d2sf9GQPEYtUMowUBzHo6wVaqbKNSXUQg94mUL9K1yflQQz6+4JWqfzMpDwIvdlryn6Vrk+qg9DXJzSsso1JcRB6es+yUSXDiB0E/0n5tQXyP0fLVS6c2EGwn/ZurYdeHqAFKhVH7CAGMf342ct5kPB/xloXfC6x9KhEPFkGiYUa9X792uN58zWLHIT7b2iP3JqjqEG4+8gyIJcasM3XNowiBuH8Gq2WuQZsu9E5HcMgII9Briq3DfGEZbFMNWA/ioz0Hh/IOUSdSXSN/RxdV8G9vZ5csAaMJAcJgbrlk6mjHKTFULccxPHfDsL5hEy5QumtvgMPfYzKFAYBmxXr4Gz/sLplzg3qjvgOPJyPyBQGMb0ETflwD+dxdIatfXu0XdS6z/ovcV+IBomOKTgJ6OeuWouDWPt5cNOnKRb6eImWqLV4yNFFgkPIPvxzh7r2ajKKFqql5iBnJ8nWoEH2Q+0Wdbah9ewDH647On4Df++3nsnyaMwAAAAASUVORK5CYII='>" ).prependTo( $( ".logout-button" ) );


  $( "<img style='width:18px; margin-right:3px; vertical-align:middle; margin-top:-2px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAWzSURBVGhDxZrLjxRVFMYnyoy6cwYREFkosnEgLly51cREDRgfoGhMVBAcJBHNDPwDvo0zbHRpjISdW8WlifJQlIUrwIWIYEAGBRWjDgz+vnu/qu7qR/Wt7p7hl3ypOud8596qnu56zkA/mJ2dXYw2oF3oc3QU/Yb+tbSu3F40hZ5Ai91+dWADRtA2dOhKF9AnDqJthMMedu5hwmVoEv0VN6V3NBZ6j9Ulnqb/MPggk+xAf4ZZ5wCNjSZYXeBp+wODrkSH4zTNULuEvkKvoUfRnaSH0aA1TG7UNXn2o0vkW0LtO7TS0/cGAz2MLnjsAuSPo3F0i+3JqAdNoJ88XAHyF9Aa27uDATahpk+K3GnVWB20tWs0huf5NQxeh+ZGG22tBv2baZ6NQxX4CN1oW99gTH3N9oQZ6tA2QLWdoGEtKnzyxDqeP2dLW2y/4rAp7gRzPK+53BbQtqC1tpSDUT/Ywnee+CK635ZS3NL1DgjNpTndmnGe3ApbWoNJ38fC0YZYn/x9tnTEbT3tgGBO7UThLwHfovaHWBp2RF+BZ11Owj0974Bge3SgKEDuVZeLUNAZtnCSIv7Y5bbY2hL6//Oq1t9HOg/c4NYk8O/2EAHiP1g0n7EpTEZLhPgMi45Hm+hOh3FPouSjCt6FqHCIJX7H5YhNhWsb4qRJbK9M00aUgHeL2wLE+qbULgBJ6Iowh/g4i6STVOyoDnOIez1MKdiH8J6InRHirS6HHfjG+QDxuEsdcUsOvd+7FCDWZffT6KQtOeQ+sa0jeHe6LUB8IBRYX0KQn3FZ1UljaSgm4LYcegs7kEH+LltyyJ1yuSN4dZC57Fb1ikUqPOlcgHife5JwWw79LXdAUPvRtgDxjEtJ4D/g1gDxeiV3OQ4Qv25/Em7Lob9sB3RkyyGedikJ/G+6NUA8peRexwHiR+xPwm059LfcAUp3R0cNvF+6nAT+x90aIP5UyR8cB4hH7U/CbTn0F3aAlK4ydRPfdN1Pbsy2JPCvcmuA+JiS5xxnVLrBdk9lmHcfi2s9TBL0LIzdEeKzSjZeMA3Zn4R7KsGcf6Okq9t6aB2KI0QY45+rsgN1fMH8yz1UR/C33IGr8hXKYP5jLJI+NLwtv0KNP+JV9ifhthz6m45CpK8hfyt6Bp2Kzhrkkn7M+Fa7JUB8VMl5OYxmUL/H1hxy+10uBV/Lw+iU4wDxnJ3IMvCctj1AfM6lUvA1nsgmlZy3S4kMPIVzAvFFl0rB97VbMtYpeTNqvJhLflDlthx6O32FRm3NIXfE5bbgWY4KF3MsbsqKB2M6QjwRCgm4JYfeph0gdx2l21m+hH6JzhrkPrC1LXgaL6drvxsN7HyAWH/iOb2hyWCuGVR65MOmG5qfY0eE+EWXww7olrLxhn6Ty6XY3jXM87KHaos21vaAt7V4viKp5/M5xLqR7nhSi+7qML6er27wMG3Bow932m0B4rddrkFyKWr8K+x2uS22doSxtMGH0YfoKVLXe4hS8BaelxLrqXXr11MUxu3LIVfpwarb+vJgi7bNsbsG27Pd5Wao62WEHt/l0KBHi8lXjm7reQeY8yHN7fYAsd7Hlb+9wXQHpvOhw5Cb74e7D2hOt2bo4e5ttpSDsd3j9Y5HJtu73gHm2ILyR5JC24Kqva3RxqKmFxyk9qAR2/oGY+po0/IFB4tKD5hz6N2IWr1iOoteYLXSzU8rNAZjjWnMMHgd5GZYdLfxGQyyBrV7yXcC7UTLbE+GHt0fqLdwhs0g/zt60PbeYKAVqO0beWqXkd66v4EeQ6vRCCXdAuoT1uNF5XQ9/xZLefMLs0aoHUJpP9hUGHcBg76C9Hx+TmBsnaS2s9rfF931MIH+seNdVDhr94LG8pjz9w8gzKsHVluR3ro3Ha06oR5Q7xhhpQcJfYeNWITWI/0TyGfoCJpGOndIWldONV00rkPxZqQnBgb+B+oM4YwUYtbdAAAAAElFTkSuQmCC'>" ).prependTo( $( ".btn-leave" ) );

  $( "<img style='margin-right:3px; vertical-align:middle; width:18px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASVSURBVHhe7ZpdiBZlGIbXFFvUUDBFREEKxSAxIkFEOjBF/KFIEukgggJRIRJPWkSUfk6MQAQNBEUU/DnQCM/0VDrqQIREzQR/IIL8KTE1sl2vZ+be3Zmded95Z3b32/3kveBhvnme+5739eb7m2/tiEQikUgkEolEBk93d/dr1Bbqi2Goz6lFWmp00dPTM5bNfU9183hYYYkfqYlaenTAhnZqfy2B9Y5q6ZGH/YxjQ/fTrbUG1jNmaQtDD2vMp5aXFQu/LlkC56/Sbzmsu1JbSKA1h3LteSHHsZK6QbiI+gWxE+bHJE/gfIFGLYV112gLCbS60kk56G9QayUvwnAuur9SuRt0bRmAgecp9bYseRgcks4LurYNwMB3XpY8DK5I4+U5COAph3Gy9cPgZirx0+4BiMmy9RMDCAgAzX3qY1kS6gaA/hq1mYf2Ufsyj9+hgl5+WfC0NgDmv1KFLx/0ggNAe5bDBFn7oDeJ2TLqaiIMAO3AAKbQ+4D6M1V4aRRA6Y0I/aAA0NmzZ6pspSCbgeZR6vCDLhdAL/QXS+KjXgDMLkhWgFloAEdk8WI6WbygKw3AYPazZC5qB3BCsgLMQgPYIYsXdNtl8YLOF8BRyVzUDuCMZAWYhQawWxYv6HbJ4gWdL4DjkrmoHcADDlMkzcEsNIDLHCpvSNCdTx1+0JUGwMjuTn9PVU7qvwnCK5LmwBcawN8cOmVzgu5C6vCDzhVAJ1V1T9MogBmS5qgRwF0OL8jmZLAB0H+RsrB91A+A+UlJc9APCsBA+6VspTD/RNJK0LoC+FYSH42eAcZSyfvAVyeAx1TpLzn0J1K3JK0EbSEAerOpx5L4aBYAmuvUNFkSOA8OwEBvb3K5b4Ocj6F/LBEEgj4XAK0J9H5Kp5U0fgbYwodlSeC8VgAGnm2yJ3C+QqNg8OQCsGtqFMKgAhiKu8Eu2RPsH6N+MOaRPYFWS+4G/6fekyWB87ovgUfmkT2Btt0VVn1250A/8BmwwK6tcRX1AmD2H/UDtVjyPugFBYDuH+oQNU/WHPSnU99RIXdzhQAMuzZ1kHoomYuwAOgZ+6mZkhVg5g2A+RPqGx6WfpMcCFr7HLc/r91Lr1AO80IAvTCezHwX9SRVFwgOYKvGTtA4A2BmL5nVktYCn/2W7/xGx9wZQC9oVtkeZMlSHQDnlziM0dgJOl8ApyRrBP6vdakCzCoDMNCdliVLUABfaeQFnS+ADZI1Av+bulQBZqEBfChLlqAAPtXICzpfAEskawT+qbpUAWahASyRJUtQAH9Q9s1vYO2RJYFzXwC3M75GpUsVYJYLgPNNWV+mbsuSJexNsAx0z+3P4r9p6KXdA8Bn/4ljvGz90D+VSvyga/cALsqSh8Fb1L/SOUHT7i+B9bIU4aLrqDsSltKuAaC3e5DPJHeD6CXqfTwby4rZMkkTOJ9Hv+Wwbu4bJq03KNeeN1C53zGGDBbo5OKhd2FDhgWvLYw8bGa/9tUSWO+clh4dsCf7Oepcur3hhXUuUs670xGDvdnveu9Se6kDw1D7qI9Yp/gZHolEIpFIJBKJROrR0fEMFiPTSmpJePEAAAAASUVORK5CYII='>" ).prependTo( $( "html a[href*='profiles']" ) );

  $( "<img style='width:16px; margin-right:3px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFwSURBVGhD7dnBSoJRFIVRn8Om9e4FvpkQVnPr/LTckzgRgt0r3AX/5OOoW5rZblmWZT7n8/mpnkM975+DbRvqeannwbzf1eFjPa9eP43adKxnb2avjg5eM53a9mJmr44+3E+ntr2Z2XM7LTN77qZlZs/dtMzsuZuWmT13IQ9jRsg9dyEPY0bIPXchD2NGyD13IQ9jRsg9dyGHfDM+JuSQe+5CDvlmfEzIIffchRzyzfiYkEPuuQs55JvxMSGH3HMX8jBmhNxzF/IwZoTccxdyyCH/6NfydiGH3HMXcsghry9w4e1CDrnnLuSQQ76fL/DfzAi55y7kYcwIuecu5JBD/tGv5e1CDrnnLuSQQ15f4MLbhRxyz13IIYd8P1/gv5kRcs9dyMOYEXLPXcjDmBFyz13Iw5gRcu88wf8EOn/6cXf7Cdv9dLZtZvbqaF/P0WumsW3atpn5uzp8qGf7S5y+Xz7UqbY8b5vMW5ZlmcZu9wXoXpdgOSs3fgAAAABJRU5ErkJggg=='>" ).prependTo( $( "html .header a[href*='new-posts']" ) );

  $(".header .nav .btn:contains('Dashboard')").html("<img style='width:16px; margin-right:3px;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQ8SURBVGhD7Zjdi1RlHMfXZE1pb7JCV1tvFLQ/wP4Jb8JqcSXwBSQ1X7CLQo3QO2802+zOrrWSIAKp9c5LEwWDCjbICxV8RVODfNnt832e75z1mTn7cs6cw8zFfODHzO/9Ozuz85w5fT169GifiYmJQWwjNor9go1j97AnNj1XTLkvsZHJycmlbu8MiHgD24v9iphSqBfbrVkeWz8sG8L0l35sHW2jWZjemTe9pnrYs4AFB7B/49rq8QvZz9MFXlsNDFzD4N/Clmkgfwk7im3F1jqcoZhzqrnscC7kr/Cwxuvbg2HD2MM4OoX4NUzvyiqXZ7gkw+EM9WAHsesuSSD+EHvX5eVgwEfYc8/MIHYD28PThS4tDXMWaZZmxulTEHuG7XRpMWjc4TnNfEduscsqQzM1O65IkRaXzQ0aRrBn7s8g9o1LakM7vC7DWt5xycxQ/Bb2KLamEH+KrXNp5Wi2dnhdAnH9T6x2aT4UvIzpGyAXcn/wUNsJqtnekQs5fXv1u7wVCg7E0imIncT0l69VfAPt0C7vPBlEvACxT1yaQkInbHK64p92bh1ureKZ/xJ7XvFzvYjwUZUGaWmAr4/SoHIJBEddE8DX9/OrTtcKu1ay6wg236EMabCWDPxjTkeIvU4wuUTA3+50bbBmHnt2YDexlsOwAbmdUVUEX5ccrzkdCnQoZeD/zUO11yNNsEMf2THv2+VwLtJCzVXVNkh68C/GcITkPqdqgfmbWHPfu87xMM+paaHuY9U3wL/QSAw6FsB/ji0LyYph7hLsR68SehErnJ4R+pZLW2wLOsUSJTY6FsA/755KYfT7zL4dt0Twtzg9J6TNrQH8DQo2f/t87vpKYN5i7JTHZxD7ySVzhp7Dbg/gf6Hgz/YD+OtdXxpm6B/0DPYP1nJpQOwOD4XPFfreixMi+GcV/Mt+AH/m641ZoF/i73pcLuSHXV4IafOIAP64gvfsJ7inMMw74xG5kP/WpYVwewKz7mjhf/YT3FcY5uX+ehPkdH0zdQAVwCMSpF0LW677hfsKM8sLeOCywnhEAvOeKBEOlGbcVxiG/uARLZAr9fERHtHMfS0ctxPAf9s9pWCE7mC0/F8Ru4u1dd9H2jwugP+ngjrKX2Sz60vDTH0TfY89YJ7eYf2ObvumFTO2BIUGf0zB4/YD+Edd33Wg7ZhlBuQr+IH9AP4V13cdaPvdMgP4IwouwyYcC+CudE/XIE2WF7DmeJrzpPly+rOQ6CKkyfIaXHQqJD90MICvu2S1/qApAnp09y65cyfNTod3YABLzgMKtjndcdCy3bIaSOuA0xGKvoq5CP4trNSxXyXSIC2WFcAfdXoK4itIJJcB+Cec7hho+NpyAtaY/yuO5KexLBSex4ac6hjSIC2WJV35N7YE+X4KdGvxENZyj6ZTSIs0Wdv0txYFRYv8tOvoZm09evQoRV/f/xjNcKCxfOJgAAAAAElFTkSuQmCC'> Dashboard");
  

  //add new-memo class
    $(`a[href^='memo/new']`).addClass('new-memo-inner-button');

  $( "<img style='margin-right:3px; margin-top:-4px; width:18px;vertical-align:middle;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASESURBVHhe7dnNbhRHFMVxJ+AQAiyDBAIEUhRAeY/EVlYoYU8MTwFCYgFSlEUMGCQ/RCB5BBYOMmLBA2QTvhIhFoCQjWFhOFX9z2nGds1HuXtSI/VPKs3U6du3b/sTN1OdTqfT6XQ6nc7W3k84biMffSYWt5GPPhOL28hHn4nFbeSjjxEXizGNOB99jLhYjGnE+ehjxMViTCPORx8jLhZjGnE++hhxsRjTiPPRx4iLxZhGnI8+RlwsxjTifPQx4mIxphHno48RG7ERG3FruIwRG3E++hixERuxEbeGyxixEeejjxEbsREbcWu4jBEbcT76GLERG7ERt4bLGLER56OPEReLMY04H32MuFiMacT56GPExWJMI85HHyMuFmMacT76GLERG7ERt4bLGLER56OPERuxERtxa7iMERtxPvoYsREbsRG3Zn19fVXrsd7e0esvVVpjjHz0MWIjNmIj/t8wRj76GHHr9Nncrcv9rNd31ZXz6PzzetlJ29FVbWrErdJljmrwB9UVt0+97mkdoP1o6GHErdGgh7X+5nI9Qq51Tes7reNae1jh/YzWgtYjynsof6h1kssMj/ONuBUa8KDWX1zKGP4nvf2U0iTV7FDtnNamD4Syx1qHKB0O5xqxERuxEWfTwL9p7aHd0HTqXp13u+pSU3ZfL9OUDVadViM2YiM24iwa9le9fEKrkYVz6bHRJUoG4wQjNmIjNuKRafBbeknefFVVI95Eh8IH4feqqqL9mtZw3wqcY8RGbMRGPBINF75/v6DFlqrKGvGW1C/8oHxCaaT9TQ73R70RN0Ytp7Vexua1MxxOos6Ik3TDZymNtH+ll885nFaV14gbo0G+pXWkffjs7+BwUlVdI05SSfjt0PObQfsfOJxGrRE3RkNcp3Wk/TUO9UW5Efel3guUR+HaHEqj1ogboyHu0TrSfoZDfVFuxH2p9/eUR9ovcyiNWiNujIZ4TutI+685FBFno00UehNH2j/lUBq1RtwYDfGW1pH2+zgUEWejTRR6E0far3IojVojboyGeEPraMwfgDUOpVFrxI3REP/SOtJ+nN8CzzmURu3YaKhZLt0X5Ubcl3pv/CF4l0Np1I6Nhhr8q0koN+K+1PsG5ZH2ixxKo3ZsNFRb/xDaSW/T/kcOp1E7VhpsjssnUWrESep5jtJI+9daI/+Z3QoNcpW5Iu0fDRqOUiPeknrt03pKaaT94C//cdEwB7RWmS3SPjzMaOrP4T+qqor24c/hY5SUQQNdZD5T1sQDkfnY7CPKrlBSDs0V/lpbrkasKQsPM/ZSNjSdF77sez7zgbIlvXxGWVk03CGtTU+ElT3RmtPbgc/3Q41qz2r9E0/+iLLws+VLSsukAb/S6vmB9R/l4aluePQ9q+0JvcbH4ryf1bqpFf6bbBPl4cnyN1ymbBo0PB7/k9m3Tb2WtPbTfjJo4F1aF7RWuI+R6dy3WpdDL9pOHt3HEd1A+N+gF9VtDaba8I+cRa2yftVth25mt9YprXmtu1rhe3pFK3yWn2ktay3q/k9rDflbY2rqA/qKjWEv5+TsAAAAAElFTkSuQmCC'>" ).prependTo( $( ".new-memo-inner-button" ) );



  //add my-profile class
  $(`html a[href*="profile/"]`).addClass('profile-button');
  $(`table a[href*="profile/"], h2 a[href*="profile/"]`).removeClass('profile-button');

  // remove from name links
  $(`html a[href="/profile/1F5GrRezwGokQhxmF4fYaBbbNrPPaeBqMm"], html .name a[href*="profile/"]`).addClass('post-profile-button');


  $( "<img style='width:20px; margin-right:3px; vertical-align:middle;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAUwSURBVHhe7ZpLiBxFGMfH9xsVfB2E1XW7qncxQYyIgrooaERFyVjdswlC9KCefMQgKB4mRHxMV3fWgBdPYi6a1ZtXSQ4x8aKiBzUximAiiA+IIiYL6vr/er5Nqqt73ZmdR2qkfvCxvf3/6quvqquqq2u35vF4PB6Px+PxDJ64FV4fa7k1SsVu/PwKP/8g4+vdkZZbyIfd/ycs1E6JM/lgpMWBOJULnRj5qiRYR2U5ymiitLg6TsW+qkZ2ZmJfY1ZexeFGi1gHt2FI/1zdsC5My58areBWDjsaqCycxtObLzdIzEepfBudM6NaUj6kV59HRtd0Dz47lyo3Mp1Q3xaM01OzG4HRMNfJcKZpQ752eYpZ15Nj7OYotODZc17Lv1Qqn2KPjsFCuInKmrEwej5k2U2UlspMmGwljV8k7wQrXkOHdZYdo/309xcS1vIdVleMPR3w+5csuUW+yTESReOP9eMVlq8p1sIYJcF1LLsDGry1kCRWe5Z6BvHwdjgRGx3SZMkdMF93FZLEa42lnlGJ3GDGxjT4gCV3sLe6jTQULPUMxTJjU10suQOG5e9mkve35AUs9QzFMmNTXSy5A+b8UTPJQXYA1cWSO2BY/mgmOdApkIofWHKH/Bu/kGS4nqWeKS+CYhdL7hBroc0k+7EJWqRiM9RiyR0wAm4xk6TNC33YsLxiGsnENfZGSCXhzSy7Q7NZOxWJFrfC2MCwvGIw3N+zYn7h7EkRVueHrWQX4kQ8zXLXqFQ8Y8eLdLiRZfegUYAn9lEhaXzS4t4mdukYlNtMZc1YiLOX6mAXN8lPd1J5xEy8nbycow8bdlsSlU1NYCq9a5eHHam3JgN2cxskuxZP75jVAFi+mO2kV2Q9FeHikRhd86uu+kgMsVQa3snhRwMkvhZP/bdSY7o0itFIwrs47GhBr6vKJ9qxoWwW3sThRofo1fEL8eS29GsE5LEQk8O7DTY/dyDxQ3ZD+mCH4kzeztU4CDYn2A2+jL3A3xXJYyETv+JJvkV7hZlt8ob1qbjksTfWnEFG13QPi90j5EO+VTHy2Fq85NxGKJqrnZYnXpE0Gd7f3214ZdXF7L4s5EtlqmLlpsWbVCe7n1zam5+KP2RYRpuYTjqBG7+3KkbB6GPLhZFAC1Q5OXEQCX5r34fvZ1EydQUXLUEa+djl8lgU075/sg9H4yy4B8n9YyX18To9flnemFR+XtRy/euq43K6R5rtTzEo1sxr115OsQs61Y0cOMRwiV6fOh8JHC4mJA6q7ROXskvtgdmxi+Czp+CT+8nDjdlgkt3Q+GCyFKvtt4disFuNYpdGAspRLuwyPGjFNxPBkzqqMrmK5ePc11xzLub0+6Zv28QvtPLnqz+ubZ3KUFkOc5yZRKymugq+qXiR5eHAw7uQBJ7EZpZLTDenT4fPjoJ/bnSSXDxNZttBZbh4CaXls6Y/5UJThOXBE+vweTMBGpZRc+pMlqvJ9wlytlCuwshnudWd6rKnAkbBcywPlvzkx1rhoyR4lOVlUal8wSxrGmnstixUp1kWHffNUF6LpT+C4jtdZVeew3JHYEv7ODrxxGEHXeMeyx1Bn9F4ZRa/NYbxH2ao9EmzUvw+x1JXYJGLMf/xpSjm6ZpvdwXVbeYCe4KlwWFX2s3wt1E6uJeMf+2afCSZufTxL9JLgg741KxUZcGNLA2d9nmD2QHiE5YGB208zErNjc+wae8OjQ7Q8nuWBgc64E+z0ru3T5zF0tDZ2Bw728yFcmPJ4/F4PB6Px+P5T2q1fwHtcy1yQO/6xAAAAABJRU5ErkJggg=='>" ).prependTo( $( ".name .post-profile-button" ) );
    

  //add footer-button to lower buttons
  $(`html a[href="/introducing-memo"], html a[href="/profile/1F5GrRezwGokQhxmF4fYaBbbNrPPaeBqMm"], html a[href="/stats"], html a[href^='protocol']`).addClass('footer-button');

  //add outline-button to dashboard buttons
  $(`html a[href="key/change-password"], html a[href="key/export"], html a[href="memo/set-name"]`).addClass('outline-button');

  //add new-memo to header 
  if ($(".like-button")[0]){
      // using like to query if user logged in
      $( ".nav" ).append( '<a class="btn new-memo-button" href="memo/new"><img style="margin-right:3px; width:18px; vertical-align:middle;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASESURBVHhe7dnNbhRHFMVxJ+AQAiyDBAIEUhRAeY/EVlYoYU8MTwFCYgFSlEUMGCQ/RCB5BBYOMmLBA2QTvhIhFoCQjWFhOFX9z2nGds1HuXtSI/VPKs3U6du3b/sTN1OdTqfT6XQ6nc7W3k84biMffSYWt5GPPhOL28hHn4nFbeSjjxEXizGNOB99jLhYjGnE+ehjxMViTCPORx8jLhZjGnE++hhxsRjTiPPRx4iLxZhGnI8+RlwsxjTifPQx4mIxphHno48RG7ERG3FruIwRG3E++hixERuxEbeGyxixEeejjxEbsREbcWu4jBEbcT76GLERG7ERt4bLGLER56OPEReLMY04H32MuFiMacT56GPExWJMI85HHyMuFmMacT76GLERG7ERt4bLGLER56OPERuxERtxa7iMERtxPvoYsREbsRG3Zn19fVXrsd7e0esvVVpjjHz0MWIjNmIj/t8wRj76GHHr9Nncrcv9rNd31ZXz6PzzetlJ29FVbWrErdJljmrwB9UVt0+97mkdoP1o6GHErdGgh7X+5nI9Qq51Tes7reNae1jh/YzWgtYjynsof6h1kssMj/ONuBUa8KDWX1zKGP4nvf2U0iTV7FDtnNamD4Syx1qHKB0O5xqxERuxEWfTwL9p7aHd0HTqXp13u+pSU3ZfL9OUDVadViM2YiM24iwa9le9fEKrkYVz6bHRJUoG4wQjNmIjNuKRafBbeknefFVVI95Eh8IH4feqqqL9mtZw3wqcY8RGbMRGPBINF75/v6DFlqrKGvGW1C/8oHxCaaT9TQ73R70RN0Ytp7Vexua1MxxOos6Ik3TDZymNtH+ll885nFaV14gbo0G+pXWkffjs7+BwUlVdI05SSfjt0PObQfsfOJxGrRE3RkNcp3Wk/TUO9UW5Efel3guUR+HaHEqj1ogboyHu0TrSfoZDfVFuxH2p9/eUR9ovcyiNWiNujIZ4TutI+685FBFno00UehNH2j/lUBq1RtwYDfGW1pH2+zgUEWejTRR6E0far3IojVojboyGeEPraMwfgDUOpVFrxI3REP/SOtJ+nN8CzzmURu3YaKhZLt0X5Ubcl3pv/CF4l0Np1I6Nhhr8q0koN+K+1PsG5ZH2ixxKo3ZsNFRb/xDaSW/T/kcOp1E7VhpsjssnUWrESep5jtJI+9daI/+Z3QoNcpW5Iu0fDRqOUiPeknrt03pKaaT94C//cdEwB7RWmS3SPjzMaOrP4T+qqor24c/hY5SUQQNdZD5T1sQDkfnY7CPKrlBSDs0V/lpbrkasKQsPM/ZSNjSdF77sez7zgbIlvXxGWVk03CGtTU+ElT3RmtPbgc/3Q41qz2r9E0/+iLLws+VLSsukAb/S6vmB9R/l4aluePQ9q+0JvcbH4ryf1bqpFf6bbBPl4cnyN1ymbBo0PB7/k9m3Tb2WtPbTfjJo4F1aF7RWuI+R6dy3WpdDL9pOHt3HEd1A+N+gF9VtDaba8I+cRa2yftVth25mt9YprXmtu1rhe3pFK3yWn2ktay3q/k9rDflbY2rqA/qKjWEv5+TsAAAAAElFTkSuQmCC"> New Memo</a>' );
  }

  // Add data-txhash to posts
  $(`.post .actions .like-button`).each((_, a) => {
    const $a = $(a);
    const $post = $a.closest('.post');
    const href = $a.attr('href');
    const txhash = href.match(/[^\/\?]+$/)[0];
    $post.attr('data-txhash', txhash);
  });

  // Remove "Like Memo", which will be done by CSS instead
  $(`.post .actions .like-button`).html('');

  // Restore likes
  $('.post[data-txhash]').each((_, post) => {
    const $post = $(post);
    const txhash = $post.attr('data-txhash');

    $post.toggleClass('is-liked', !!state.likedPosts[txhash]);
  });
}

module.exports = injectCssStateClasses;

},{"../state":12}],9:[function(require,module,exports){
function injectFixTipAmount() {
  const $formMemoLike = $('#form-memo-like');

  if ($formMemoLike.length) {
    // Only tip in integers with a minimum of what is stated: "(min. 123)"
    $formMemoLike.find('input#tip').attr({
      type: 'number',
      pattern: 'd*',
      min: $('#form-memo-like label[for="tip"]')
        .text()
        .match(/(\d+)\)/)[1],
    });
  }
}

module.exports = injectFixTipAmount;

},{}],10:[function(require,module,exports){
const { likePostInBackground } = require('../memoApi');

function injectInlineCommenting() {
  $(`.post .actions .like-button`).click(e => {
    const $a = $(e.target);
    const $post = $a.closest('.post');
    const href = $a.attr('href');
    const txhash = href.match(/[^\/\?]+$/)[0]; // TODO: Duplicate
    const { memoPassword: password } = localStorage;

    const tipText = prompt('How much tip in satoshis? (Blank=0)', '0');

    if (tipText === null) {
      return false;
    }
    $post.addClass('is-liking');

    likePostInBackground(txhash, tipText)
      .then(() => {
        $post.removeClass('is-liking');
        $post.addClass('is-liked');
      })
      .catch(error => {
        $post.removeClass('is-liking');
        alert(`Failed to like: ${error.message || error.stack || error}!`);
      });

    return false;
  });
}

module.exports = injectInlineCommenting;

},{"../memoApi":5}],11:[function(require,module,exports){
function injectRememberPassword() {
  $('[type="password"]').each((_, password) => {
    // Load
    $(password).val(localStorage.memoPassword || '');

    // Save
    $(password)
      .closest('form')
      .submit(() => {
        localStorage.memoPassword = $(password).val();
      });
  });
}

module.exports = injectRememberPassword;

},{}],12:[function(require,module,exports){
const MES_STORAGE_KEY = 'mes-7932a97f';

const state = JSON.parse(localStorage[MES_STORAGE_KEY] || '{}');

Object.assign(state, {
  likedPosts: state.likedPosts || {},
});

console.log({ state });

const saveState = () => {
  localStorage[MES_STORAGE_KEY] = JSON.stringify(state, null, 2);
};

Object.assign(exports, {
  state,
  saveState,
});

},{}]},{},[3]);
