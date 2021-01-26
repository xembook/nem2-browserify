require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// This currentContext variable will only be used if the makeSlotClass
// function is called, which happens only if this is the first copy of the
// @wry/context package to be imported.
var currentContext = null;
// This unique internal object is used to denote the absence of a value
// for a given Slot, and is never exposed to outside code.
var MISSING_VALUE = {};
var idCounter = 1;
// Although we can't do anything about the cost of duplicated code from
// accidentally bundling multiple copies of the @wry/context package, we can
// avoid creating the Slot class more than once using makeSlotClass.
var makeSlotClass = function () { return /** @class */ (function () {
    function Slot() {
        // If you have a Slot object, you can find out its slot.id, but you cannot
        // guess the slot.id of a Slot you don't have access to, thanks to the
        // randomized suffix.
        this.id = [
            "slot",
            idCounter++,
            Date.now(),
            Math.random().toString(36).slice(2),
        ].join(":");
    }
    Slot.prototype.hasValue = function () {
        for (var context_1 = currentContext; context_1; context_1 = context_1.parent) {
            // We use the Slot object iself as a key to its value, which means the
            // value cannot be obtained without a reference to the Slot object.
            if (this.id in context_1.slots) {
                var value = context_1.slots[this.id];
                if (value === MISSING_VALUE)
                    break;
                if (context_1 !== currentContext) {
                    // Cache the value in currentContext.slots so the next lookup will
                    // be faster. This caching is safe because the tree of contexts and
                    // the values of the slots are logically immutable.
                    currentContext.slots[this.id] = value;
                }
                return true;
            }
        }
        if (currentContext) {
            // If a value was not found for this Slot, it's never going to be found
            // no matter how many times we look it up, so we might as well cache
            // the absence of the value, too.
            currentContext.slots[this.id] = MISSING_VALUE;
        }
        return false;
    };
    Slot.prototype.getValue = function () {
        if (this.hasValue()) {
            return currentContext.slots[this.id];
        }
    };
    Slot.prototype.withValue = function (value, callback, 
    // Given the prevalence of arrow functions, specifying arguments is likely
    // to be much more common than specifying `this`, hence this ordering:
    args, thisArg) {
        var _a;
        var slots = (_a = {
                __proto__: null
            },
            _a[this.id] = value,
            _a);
        var parent = currentContext;
        currentContext = { parent: parent, slots: slots };
        try {
            // Function.prototype.apply allows the arguments array argument to be
            // omitted or undefined, so args! is fine here.
            return callback.apply(thisArg, args);
        }
        finally {
            currentContext = parent;
        }
    };
    // Capture the current context and wrap a callback function so that it
    // reestablishes the captured context when called.
    Slot.bind = function (callback) {
        var context = currentContext;
        return function () {
            var saved = currentContext;
            try {
                currentContext = context;
                return callback.apply(this, arguments);
            }
            finally {
                currentContext = saved;
            }
        };
    };
    // Immediately run a callback function without any captured context.
    Slot.noContext = function (callback, 
    // Given the prevalence of arrow functions, specifying arguments is likely
    // to be much more common than specifying `this`, hence this ordering:
    args, thisArg) {
        if (currentContext) {
            var saved = currentContext;
            try {
                currentContext = null;
                // Function.prototype.apply allows the arguments array argument to be
                // omitted or undefined, so args! is fine here.
                return callback.apply(thisArg, args);
            }
            finally {
                currentContext = saved;
            }
        }
        else {
            return callback.apply(thisArg, args);
        }
    };
    return Slot;
}()); };
// We store a single global implementation of the Slot class as a permanent
// non-enumerable symbol property of the Array constructor. This obfuscation
// does nothing to prevent access to the Slot class, but at least it ensures
// the implementation (i.e. currentContext) cannot be tampered with, and all
// copies of the @wry/context package (hopefully just one) will share the
// same Slot implementation. Since the first copy of the @wry/context package
// to be imported wins, this technique imposes a very high cost for any
// future breaking changes to the Slot class.
var globalKey = "@wry/context:Slot";
var host = Array;
var Slot = host[globalKey] || function () {
    var Slot = makeSlotClass();
    try {
        Object.defineProperty(host, globalKey, {
            value: host[globalKey] = Slot,
            enumerable: false,
            writable: false,
            configurable: false,
        });
    }
    finally {
        return Slot;
    }
}();

var bind = Slot.bind, noContext = Slot.noContext;
function setTimeoutWithContext(callback, delay) {
    return setTimeout(bind(callback), delay);
}
// Turn any generator function into an async function (using yield instead
// of await), with context automatically preserved across yields.
function asyncFromGen(genFn) {
    return function () {
        var gen = genFn.apply(this, arguments);
        var boundNext = bind(gen.next);
        var boundThrow = bind(gen.throw);
        return new Promise(function (resolve, reject) {
            function invoke(method, argument) {
                try {
                    var result = method.call(gen, argument);
                }
                catch (error) {
                    return reject(error);
                }
                var next = result.done ? resolve : invokeNext;
                if (isPromiseLike(result.value)) {
                    result.value.then(next, result.done ? reject : invokeThrow);
                }
                else {
                    next(result.value);
                }
            }
            var invokeNext = function (value) { return invoke(boundNext, value); };
            var invokeThrow = function (error) { return invoke(boundThrow, error); };
            invokeNext();
        });
    };
}
function isPromiseLike(value) {
    return value && typeof value.then === "function";
}
// If you use the fibers npm package to implement coroutines in Node.js,
// you should call this function at least once to ensure context management
// remains coherent across any yields.
var wrappedFibers = [];
function wrapYieldingFiberMethods(Fiber) {
    // There can be only one implementation of Fiber per process, so this array
    // should never grow longer than one element.
    if (wrappedFibers.indexOf(Fiber) < 0) {
        var wrap = function (obj, method) {
            var fn = obj[method];
            obj[method] = function () {
                return noContext(fn, arguments, this);
            };
        };
        // These methods can yield, according to
        // https://github.com/laverdet/node-fibers/blob/ddebed9b8ae3883e57f822e2108e6943e5c8d2a8/fibers.js#L97-L100
        wrap(Fiber, "yield");
        wrap(Fiber.prototype, "run");
        wrap(Fiber.prototype, "throwInto");
        wrappedFibers.push(Fiber);
    }
    return Fiber;
}

exports.Slot = Slot;
exports.asyncFromGen = asyncFromGen;
exports.bind = bind;
exports.noContext = noContext;
exports.setTimeout = setTimeoutWithContext;
exports.wrapYieldingFiberMethods = wrapYieldingFiberMethods;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _a = Object.prototype, toString = _a.toString, hasOwnProperty = _a.hasOwnProperty;
var previousComparisons = new Map();
/**
 * Performs a deep equality check on two JavaScript values, tolerating cycles.
 */
function equal(a, b) {
    try {
        return check(a, b);
    }
    finally {
        previousComparisons.clear();
    }
}
function check(a, b) {
    // If the two values are strictly equal, our job is easy.
    if (a === b) {
        return true;
    }
    // Object.prototype.toString returns a representation of the runtime type of
    // the given value that is considerably more precise than typeof.
    var aTag = toString.call(a);
    var bTag = toString.call(b);
    // If the runtime types of a and b are different, they could maybe be equal
    // under some interpretation of equality, but for simplicity and performance
    // we just return false instead.
    if (aTag !== bTag) {
        return false;
    }
    switch (aTag) {
        case '[object Array]':
            // Arrays are a lot like other objects, but we can cheaply compare their
            // lengths as a short-cut before comparing their elements.
            if (a.length !== b.length)
                return false;
        // Fall through to object case...
        case '[object Object]': {
            if (previouslyCompared(a, b))
                return true;
            var aKeys = Object.keys(a);
            var bKeys = Object.keys(b);
            // If `a` and `b` have a different number of enumerable keys, they
            // must be different.
            var keyCount = aKeys.length;
            if (keyCount !== bKeys.length)
                return false;
            // Now make sure they have the same keys.
            for (var k = 0; k < keyCount; ++k) {
                if (!hasOwnProperty.call(b, aKeys[k])) {
                    return false;
                }
            }
            // Finally, check deep equality of all child properties.
            for (var k = 0; k < keyCount; ++k) {
                var key = aKeys[k];
                if (!check(a[key], b[key])) {
                    return false;
                }
            }
            return true;
        }
        case '[object Error]':
            return a.name === b.name && a.message === b.message;
        case '[object Number]':
            // Handle NaN, which is !== itself.
            if (a !== a)
                return b !== b;
        // Fall through to shared +a === +b case...
        case '[object Boolean]':
        case '[object Date]':
            return +a === +b;
        case '[object RegExp]':
        case '[object String]':
            return a == "" + b;
        case '[object Map]':
        case '[object Set]': {
            if (a.size !== b.size)
                return false;
            if (previouslyCompared(a, b))
                return true;
            var aIterator = a.entries();
            var isMap = aTag === '[object Map]';
            while (true) {
                var info = aIterator.next();
                if (info.done)
                    break;
                // If a instanceof Set, aValue === aKey.
                var _a = info.value, aKey = _a[0], aValue = _a[1];
                // So this works the same way for both Set and Map.
                if (!b.has(aKey)) {
                    return false;
                }
                // However, we care about deep equality of values only when dealing
                // with Map structures.
                if (isMap && !check(aValue, b.get(aKey))) {
                    return false;
                }
            }
            return true;
        }
    }
    // Otherwise the values are not equal.
    return false;
}
function previouslyCompared(a, b) {
    // Though cyclic references can make an object graph appear infinite from the
    // perspective of a depth-first traversal, the graph still contains a finite
    // number of distinct object references. We use the previousComparisons cache
    // to avoid comparing the same pair of object references more than once, which
    // guarantees termination (even if we end up comparing every object in one
    // graph to every object in the other graph, which is extremely unlikely),
    // while still allowing weird isomorphic structures (like rings with different
    // lengths) a chance to pass the equality test.
    var bSet = previousComparisons.get(a);
    if (bSet) {
        // Return true here because we can be sure false will be returned somewhere
        // else if the objects are not equivalent.
        if (bSet.has(b))
            return true;
    }
    else {
        previousComparisons.set(a, bSet = new Set);
    }
    bSet.add(b);
    return false;
}

exports.default = equal;
exports.equal = equal;


},{}],4:[function(require,module,exports){
exports.__esModule = true;
exports.Cache = exports.ApolloCache = void 0;

var _apolloUtilities = require("apollo-utilities");

function queryFromPojo(obj) {
  var op = {
    kind: 'OperationDefinition',
    operation: 'query',
    name: {
      kind: 'Name',
      value: 'GeneratedClientQuery'
    },
    selectionSet: selectionSetFromObj(obj)
  };
  var out = {
    kind: 'Document',
    definitions: [op]
  };
  return out;
}

function fragmentFromPojo(obj, typename) {
  var frag = {
    kind: 'FragmentDefinition',
    typeCondition: {
      kind: 'NamedType',
      name: {
        kind: 'Name',
        value: typename || '__FakeType'
      }
    },
    name: {
      kind: 'Name',
      value: 'GeneratedClientQuery'
    },
    selectionSet: selectionSetFromObj(obj)
  };
  var out = {
    kind: 'Document',
    definitions: [frag]
  };
  return out;
}

function selectionSetFromObj(obj) {
  if (typeof obj === 'number' || typeof obj === 'boolean' || typeof obj === 'string' || typeof obj === 'undefined' || obj === null) {
    return null;
  }

  if (Array.isArray(obj)) {
    return selectionSetFromObj(obj[0]);
  }

  var selections = [];
  Object.keys(obj).forEach(function (key) {
    var nestedSelSet = selectionSetFromObj(obj[key]);
    var field = {
      kind: 'Field',
      name: {
        kind: 'Name',
        value: key
      },
      selectionSet: nestedSelSet || undefined
    };
    selections.push(field);
  });
  var selectionSet = {
    kind: 'SelectionSet',
    selections: selections
  };
  return selectionSet;
}

var justTypenameQuery = {
  kind: 'Document',
  definitions: [{
    kind: 'OperationDefinition',
    operation: 'query',
    name: null,
    variableDefinitions: null,
    directives: [],
    selectionSet: {
      kind: 'SelectionSet',
      selections: [{
        kind: 'Field',
        alias: null,
        name: {
          kind: 'Name',
          value: '__typename'
        },
        arguments: [],
        directives: [],
        selectionSet: null
      }]
    }
  }]
};

var ApolloCache = function () {
  function ApolloCache() {}

  ApolloCache.prototype.transformDocument = function (document) {
    return document;
  };

  ApolloCache.prototype.transformForLink = function (document) {
    return document;
  };

  ApolloCache.prototype.readQuery = function (options, optimistic) {
    if (optimistic === void 0) {
      optimistic = false;
    }

    return this.read({
      query: options.query,
      variables: options.variables,
      optimistic: optimistic
    });
  };

  ApolloCache.prototype.readFragment = function (options, optimistic) {
    if (optimistic === void 0) {
      optimistic = false;
    }

    return this.read({
      query: (0, _apolloUtilities.getFragmentQueryDocument)(options.fragment, options.fragmentName),
      variables: options.variables,
      rootId: options.id,
      optimistic: optimistic
    });
  };

  ApolloCache.prototype.writeQuery = function (options) {
    this.write({
      dataId: 'ROOT_QUERY',
      result: options.data,
      query: options.query,
      variables: options.variables
    });
  };

  ApolloCache.prototype.writeFragment = function (options) {
    this.write({
      dataId: options.id,
      result: options.data,
      variables: options.variables,
      query: (0, _apolloUtilities.getFragmentQueryDocument)(options.fragment, options.fragmentName)
    });
  };

  ApolloCache.prototype.writeData = function (_a) {
    var id = _a.id,
        data = _a.data;

    if (typeof id !== 'undefined') {
      var typenameResult = null;

      try {
        typenameResult = this.read({
          rootId: id,
          optimistic: false,
          query: justTypenameQuery
        });
      } catch (e) {}

      var __typename = typenameResult && typenameResult.__typename || '__ClientData';

      var dataToWrite = Object.assign({
        __typename: __typename
      }, data);
      this.writeFragment({
        id: id,
        fragment: fragmentFromPojo(dataToWrite, __typename),
        data: dataToWrite
      });
    } else {
      this.writeQuery({
        query: queryFromPojo(data),
        data: data
      });
    }
  };

  return ApolloCache;
}();

exports.ApolloCache = ApolloCache;
var Cache;
exports.Cache = Cache;

(function (Cache) {})(Cache || (exports.Cache = Cache = {}));

},{"apollo-utilities":5}],5:[function(require,module,exports){
(function (process){(function (){
exports.__esModule = true;
exports.addTypenameToDocument = addTypenameToDocument;
exports.argumentsObjectFromField = argumentsObjectFromField;
exports.assign = assign;
exports.buildQueryFromSelectionSet = buildQueryFromSelectionSet;
exports.checkDocument = checkDocument;
exports.cloneDeep = cloneDeep;
exports.createFragmentMap = createFragmentMap;
exports.getDefaultValues = getDefaultValues;
exports.getDirectiveInfoFromField = getDirectiveInfoFromField;
exports.getDirectiveNames = getDirectiveNames;
exports.getDirectivesFromDocument = getDirectivesFromDocument;
exports.getEnv = getEnv;
exports.getFragmentDefinition = getFragmentDefinition;
exports.getFragmentDefinitions = getFragmentDefinitions;
exports.getFragmentQueryDocument = getFragmentQueryDocument;
exports.getInclusionDirectives = getInclusionDirectives;
exports.getMainDefinition = getMainDefinition;
exports.getMutationDefinition = getMutationDefinition;
exports.getOperationDefinition = getOperationDefinition;
exports.getOperationDefinitionOrDie = getOperationDefinitionOrDie;
exports.getOperationName = getOperationName;
exports.getQueryDefinition = getQueryDefinition;
exports.getStoreKeyName = getStoreKeyName;
exports.graphQLResultHasError = graphQLResultHasError;
exports.hasClientExports = hasClientExports;
exports.hasDirectives = hasDirectives;
exports.isDevelopment = isDevelopment;
exports.isEnv = isEnv;
exports.isField = isField;
exports.isIdValue = isIdValue;
exports.isInlineFragment = isInlineFragment;
exports.isJsonValue = isJsonValue;
exports.isNumberValue = isNumberValue;
exports.isProduction = isProduction;
exports.isScalarValue = isScalarValue;
exports.isTest = isTest;
exports.maybeDeepFreeze = maybeDeepFreeze;
exports.mergeDeep = mergeDeep;
exports.mergeDeepArray = mergeDeepArray;
exports.removeArgumentsFromDocument = removeArgumentsFromDocument;
exports.removeClientSetsFromDocument = removeClientSetsFromDocument;
exports.removeConnectionDirectiveFromDocument = removeConnectionDirectiveFromDocument;
exports.removeDirectivesFromDocument = removeDirectivesFromDocument;
exports.removeFragmentSpreadFromDocument = removeFragmentSpreadFromDocument;
exports.resultKeyNameFromField = resultKeyNameFromField;
exports.shouldInclude = shouldInclude;
exports.storeKeyNameFromField = storeKeyNameFromField;
exports.stripSymbols = stripSymbols;
exports.toIdValue = toIdValue;
exports.tryFunctionOrLogError = tryFunctionOrLogError;
exports.valueFromNode = valueFromNode;
exports.valueToObjectRepresentation = valueToObjectRepresentation;
exports.variablesInOperation = variablesInOperation;
exports.warnOnceInDevelopment = warnOnceInDevelopment;
exports.canUseWeakMap = exports.isEqual = void 0;

var _visitor = require("graphql/language/visitor");

var _tsInvariant = require("ts-invariant");

var _tslib = require("tslib");

var _fastJsonStableStringify = _interopRequireDefault(require("fast-json-stable-stringify"));

var _equality = require("@wry/equality");

exports.isEqual = _equality.equal;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isScalarValue(value) {
  return ['StringValue', 'BooleanValue', 'EnumValue'].indexOf(value.kind) > -1;
}

function isNumberValue(value) {
  return ['IntValue', 'FloatValue'].indexOf(value.kind) > -1;
}

function isStringValue(value) {
  return value.kind === 'StringValue';
}

function isBooleanValue(value) {
  return value.kind === 'BooleanValue';
}

function isIntValue(value) {
  return value.kind === 'IntValue';
}

function isFloatValue(value) {
  return value.kind === 'FloatValue';
}

function isVariable(value) {
  return value.kind === 'Variable';
}

function isObjectValue(value) {
  return value.kind === 'ObjectValue';
}

function isListValue(value) {
  return value.kind === 'ListValue';
}

function isEnumValue(value) {
  return value.kind === 'EnumValue';
}

function isNullValue(value) {
  return value.kind === 'NullValue';
}

function valueToObjectRepresentation(argObj, name, value, variables) {
  if (isIntValue(value) || isFloatValue(value)) {
    argObj[name.value] = Number(value.value);
  } else if (isBooleanValue(value) || isStringValue(value)) {
    argObj[name.value] = value.value;
  } else if (isObjectValue(value)) {
    var nestedArgObj_1 = {};
    value.fields.map(function (obj) {
      return valueToObjectRepresentation(nestedArgObj_1, obj.name, obj.value, variables);
    });
    argObj[name.value] = nestedArgObj_1;
  } else if (isVariable(value)) {
    var variableValue = (variables || {})[value.name.value];
    argObj[name.value] = variableValue;
  } else if (isListValue(value)) {
    argObj[name.value] = value.values.map(function (listValue) {
      var nestedArgArrayObj = {};
      valueToObjectRepresentation(nestedArgArrayObj, name, listValue, variables);
      return nestedArgArrayObj[name.value];
    });
  } else if (isEnumValue(value)) {
    argObj[name.value] = value.value;
  } else if (isNullValue(value)) {
    argObj[name.value] = null;
  } else {
    throw process.env.NODE_ENV === "production" ? new _tsInvariant.InvariantError(17) : new _tsInvariant.InvariantError("The inline argument \"" + name.value + "\" of kind \"" + value.kind + "\"" + 'is not supported. Use variables instead of inline arguments to ' + 'overcome this limitation.');
  }
}

function storeKeyNameFromField(field, variables) {
  var directivesObj = null;

  if (field.directives) {
    directivesObj = {};
    field.directives.forEach(function (directive) {
      directivesObj[directive.name.value] = {};

      if (directive.arguments) {
        directive.arguments.forEach(function (_a) {
          var name = _a.name,
              value = _a.value;
          return valueToObjectRepresentation(directivesObj[directive.name.value], name, value, variables);
        });
      }
    });
  }

  var argObj = null;

  if (field.arguments && field.arguments.length) {
    argObj = {};
    field.arguments.forEach(function (_a) {
      var name = _a.name,
          value = _a.value;
      return valueToObjectRepresentation(argObj, name, value, variables);
    });
  }

  return getStoreKeyName(field.name.value, argObj, directivesObj);
}

var KNOWN_DIRECTIVES = ['connection', 'include', 'skip', 'client', 'rest', 'export'];

function getStoreKeyName(fieldName, args, directives) {
  if (directives && directives['connection'] && directives['connection']['key']) {
    if (directives['connection']['filter'] && directives['connection']['filter'].length > 0) {
      var filterKeys = directives['connection']['filter'] ? directives['connection']['filter'] : [];
      filterKeys.sort();
      var queryArgs_1 = args;
      var filteredArgs_1 = {};
      filterKeys.forEach(function (key) {
        filteredArgs_1[key] = queryArgs_1[key];
      });
      return directives['connection']['key'] + "(" + JSON.stringify(filteredArgs_1) + ")";
    } else {
      return directives['connection']['key'];
    }
  }

  var completeFieldName = fieldName;

  if (args) {
    var stringifiedArgs = (0, _fastJsonStableStringify.default)(args);
    completeFieldName += "(" + stringifiedArgs + ")";
  }

  if (directives) {
    Object.keys(directives).forEach(function (key) {
      if (KNOWN_DIRECTIVES.indexOf(key) !== -1) return;

      if (directives[key] && Object.keys(directives[key]).length) {
        completeFieldName += "@" + key + "(" + JSON.stringify(directives[key]) + ")";
      } else {
        completeFieldName += "@" + key;
      }
    });
  }

  return completeFieldName;
}

function argumentsObjectFromField(field, variables) {
  if (field.arguments && field.arguments.length) {
    var argObj_1 = {};
    field.arguments.forEach(function (_a) {
      var name = _a.name,
          value = _a.value;
      return valueToObjectRepresentation(argObj_1, name, value, variables);
    });
    return argObj_1;
  }

  return null;
}

function resultKeyNameFromField(field) {
  return field.alias ? field.alias.value : field.name.value;
}

function isField(selection) {
  return selection.kind === 'Field';
}

function isInlineFragment(selection) {
  return selection.kind === 'InlineFragment';
}

function isIdValue(idObject) {
  return idObject && idObject.type === 'id' && typeof idObject.generated === 'boolean';
}

function toIdValue(idConfig, generated) {
  if (generated === void 0) {
    generated = false;
  }

  return (0, _tslib.__assign)({
    type: 'id',
    generated: generated
  }, typeof idConfig === 'string' ? {
    id: idConfig,
    typename: undefined
  } : idConfig);
}

function isJsonValue(jsonObject) {
  return jsonObject != null && typeof jsonObject === 'object' && jsonObject.type === 'json';
}

function defaultValueFromVariable(node) {
  throw process.env.NODE_ENV === "production" ? new _tsInvariant.InvariantError(18) : new _tsInvariant.InvariantError("Variable nodes are not supported by valueFromNode");
}

function valueFromNode(node, onVariable) {
  if (onVariable === void 0) {
    onVariable = defaultValueFromVariable;
  }

  switch (node.kind) {
    case 'Variable':
      return onVariable(node);

    case 'NullValue':
      return null;

    case 'IntValue':
      return parseInt(node.value, 10);

    case 'FloatValue':
      return parseFloat(node.value);

    case 'ListValue':
      return node.values.map(function (v) {
        return valueFromNode(v, onVariable);
      });

    case 'ObjectValue':
      {
        var value = {};

        for (var _i = 0, _a = node.fields; _i < _a.length; _i++) {
          var field = _a[_i];
          value[field.name.value] = valueFromNode(field.value, onVariable);
        }

        return value;
      }

    default:
      return node.value;
  }
}

function getDirectiveInfoFromField(field, variables) {
  if (field.directives && field.directives.length) {
    var directiveObj_1 = {};
    field.directives.forEach(function (directive) {
      directiveObj_1[directive.name.value] = argumentsObjectFromField(directive, variables);
    });
    return directiveObj_1;
  }

  return null;
}

function shouldInclude(selection, variables) {
  if (variables === void 0) {
    variables = {};
  }

  return getInclusionDirectives(selection.directives).every(function (_a) {
    var directive = _a.directive,
        ifArgument = _a.ifArgument;
    var evaledValue = false;

    if (ifArgument.value.kind === 'Variable') {
      evaledValue = variables[ifArgument.value.name.value];
      process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(evaledValue !== void 0, 13) : (0, _tsInvariant.invariant)(evaledValue !== void 0, "Invalid variable referenced in @" + directive.name.value + " directive.");
    } else {
      evaledValue = ifArgument.value.value;
    }

    return directive.name.value === 'skip' ? !evaledValue : evaledValue;
  });
}

function getDirectiveNames(doc) {
  var names = [];
  (0, _visitor.visit)(doc, {
    Directive: function (node) {
      names.push(node.name.value);
    }
  });
  return names;
}

function hasDirectives(names, doc) {
  return getDirectiveNames(doc).some(function (name) {
    return names.indexOf(name) > -1;
  });
}

function hasClientExports(document) {
  return document && hasDirectives(['client'], document) && hasDirectives(['export'], document);
}

function isInclusionDirective(_a) {
  var value = _a.name.value;
  return value === 'skip' || value === 'include';
}

function getInclusionDirectives(directives) {
  return directives ? directives.filter(isInclusionDirective).map(function (directive) {
    var directiveArguments = directive.arguments;
    var directiveName = directive.name.value;
    process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(directiveArguments && directiveArguments.length === 1, 14) : (0, _tsInvariant.invariant)(directiveArguments && directiveArguments.length === 1, "Incorrect number of arguments for the @" + directiveName + " directive.");
    var ifArgument = directiveArguments[0];
    process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(ifArgument.name && ifArgument.name.value === 'if', 15) : (0, _tsInvariant.invariant)(ifArgument.name && ifArgument.name.value === 'if', "Invalid argument for the @" + directiveName + " directive.");
    var ifValue = ifArgument.value;
    process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(ifValue && (ifValue.kind === 'Variable' || ifValue.kind === 'BooleanValue'), 16) : (0, _tsInvariant.invariant)(ifValue && (ifValue.kind === 'Variable' || ifValue.kind === 'BooleanValue'), "Argument for the @" + directiveName + " directive must be a variable or a boolean value.");
    return {
      directive: directive,
      ifArgument: ifArgument
    };
  }) : [];
}

function getFragmentQueryDocument(document, fragmentName) {
  var actualFragmentName = fragmentName;
  var fragments = [];
  document.definitions.forEach(function (definition) {
    if (definition.kind === 'OperationDefinition') {
      throw process.env.NODE_ENV === "production" ? new _tsInvariant.InvariantError(11) : new _tsInvariant.InvariantError("Found a " + definition.operation + " operation" + (definition.name ? " named '" + definition.name.value + "'" : '') + ". " + 'No operations are allowed when using a fragment as a query. Only fragments are allowed.');
    }

    if (definition.kind === 'FragmentDefinition') {
      fragments.push(definition);
    }
  });

  if (typeof actualFragmentName === 'undefined') {
    process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(fragments.length === 1, 12) : (0, _tsInvariant.invariant)(fragments.length === 1, "Found " + fragments.length + " fragments. `fragmentName` must be provided when there is not exactly 1 fragment.");
    actualFragmentName = fragments[0].name.value;
  }

  var query = (0, _tslib.__assign)((0, _tslib.__assign)({}, document), {
    definitions: (0, _tslib.__spreadArrays)([{
      kind: 'OperationDefinition',
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{
          kind: 'FragmentSpread',
          name: {
            kind: 'Name',
            value: actualFragmentName
          }
        }]
      }
    }], document.definitions)
  });
  return query;
}

function assign(target) {
  var sources = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    sources[_i - 1] = arguments[_i];
  }

  sources.forEach(function (source) {
    if (typeof source === 'undefined' || source === null) {
      return;
    }

    Object.keys(source).forEach(function (key) {
      target[key] = source[key];
    });
  });
  return target;
}

function getMutationDefinition(doc) {
  checkDocument(doc);
  var mutationDef = doc.definitions.filter(function (definition) {
    return definition.kind === 'OperationDefinition' && definition.operation === 'mutation';
  })[0];
  process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(mutationDef, 1) : (0, _tsInvariant.invariant)(mutationDef, 'Must contain a mutation definition.');
  return mutationDef;
}

function checkDocument(doc) {
  process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(doc && doc.kind === 'Document', 2) : (0, _tsInvariant.invariant)(doc && doc.kind === 'Document', "Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql");
  var operations = doc.definitions.filter(function (d) {
    return d.kind !== 'FragmentDefinition';
  }).map(function (definition) {
    if (definition.kind !== 'OperationDefinition') {
      throw process.env.NODE_ENV === "production" ? new _tsInvariant.InvariantError(3) : new _tsInvariant.InvariantError("Schema type definitions not allowed in queries. Found: \"" + definition.kind + "\"");
    }

    return definition;
  });
  process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(operations.length <= 1, 4) : (0, _tsInvariant.invariant)(operations.length <= 1, "Ambiguous GraphQL document: contains " + operations.length + " operations");
  return doc;
}

function getOperationDefinition(doc) {
  checkDocument(doc);
  return doc.definitions.filter(function (definition) {
    return definition.kind === 'OperationDefinition';
  })[0];
}

function getOperationDefinitionOrDie(document) {
  var def = getOperationDefinition(document);
  process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(def, 5) : (0, _tsInvariant.invariant)(def, "GraphQL document is missing an operation");
  return def;
}

function getOperationName(doc) {
  return doc.definitions.filter(function (definition) {
    return definition.kind === 'OperationDefinition' && definition.name;
  }).map(function (x) {
    return x.name.value;
  })[0] || null;
}

function getFragmentDefinitions(doc) {
  return doc.definitions.filter(function (definition) {
    return definition.kind === 'FragmentDefinition';
  });
}

function getQueryDefinition(doc) {
  var queryDef = getOperationDefinition(doc);
  process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(queryDef && queryDef.operation === 'query', 6) : (0, _tsInvariant.invariant)(queryDef && queryDef.operation === 'query', 'Must contain a query definition.');
  return queryDef;
}

function getFragmentDefinition(doc) {
  process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(doc.kind === 'Document', 7) : (0, _tsInvariant.invariant)(doc.kind === 'Document', "Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql");
  process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(doc.definitions.length <= 1, 8) : (0, _tsInvariant.invariant)(doc.definitions.length <= 1, 'Fragment must have exactly one definition.');
  var fragmentDef = doc.definitions[0];
  process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(fragmentDef.kind === 'FragmentDefinition', 9) : (0, _tsInvariant.invariant)(fragmentDef.kind === 'FragmentDefinition', 'Must be a fragment definition.');
  return fragmentDef;
}

function getMainDefinition(queryDoc) {
  checkDocument(queryDoc);
  var fragmentDefinition;

  for (var _i = 0, _a = queryDoc.definitions; _i < _a.length; _i++) {
    var definition = _a[_i];

    if (definition.kind === 'OperationDefinition') {
      var operation = definition.operation;

      if (operation === 'query' || operation === 'mutation' || operation === 'subscription') {
        return definition;
      }
    }

    if (definition.kind === 'FragmentDefinition' && !fragmentDefinition) {
      fragmentDefinition = definition;
    }
  }

  if (fragmentDefinition) {
    return fragmentDefinition;
  }

  throw process.env.NODE_ENV === "production" ? new _tsInvariant.InvariantError(10) : new _tsInvariant.InvariantError('Expected a parsed GraphQL query with a query, mutation, subscription, or a fragment.');
}

function createFragmentMap(fragments) {
  if (fragments === void 0) {
    fragments = [];
  }

  var symTable = {};
  fragments.forEach(function (fragment) {
    symTable[fragment.name.value] = fragment;
  });
  return symTable;
}

function getDefaultValues(definition) {
  if (definition && definition.variableDefinitions && definition.variableDefinitions.length) {
    var defaultValues = definition.variableDefinitions.filter(function (_a) {
      var defaultValue = _a.defaultValue;
      return defaultValue;
    }).map(function (_a) {
      var variable = _a.variable,
          defaultValue = _a.defaultValue;
      var defaultValueObj = {};
      valueToObjectRepresentation(defaultValueObj, variable.name, defaultValue);
      return defaultValueObj;
    });
    return assign.apply(void 0, (0, _tslib.__spreadArrays)([{}], defaultValues));
  }

  return {};
}

function variablesInOperation(operation) {
  var names = new Set();

  if (operation.variableDefinitions) {
    for (var _i = 0, _a = operation.variableDefinitions; _i < _a.length; _i++) {
      var definition = _a[_i];
      names.add(definition.variable.name.value);
    }
  }

  return names;
}

function filterInPlace(array, test, context) {
  var target = 0;
  array.forEach(function (elem, i) {
    if (test.call(this, elem, i, array)) {
      array[target++] = elem;
    }
  }, context);
  array.length = target;
  return array;
}

var TYPENAME_FIELD = {
  kind: 'Field',
  name: {
    kind: 'Name',
    value: '__typename'
  }
};

function isEmpty(op, fragments) {
  return op.selectionSet.selections.every(function (selection) {
    return selection.kind === 'FragmentSpread' && isEmpty(fragments[selection.name.value], fragments);
  });
}

function nullIfDocIsEmpty(doc) {
  return isEmpty(getOperationDefinition(doc) || getFragmentDefinition(doc), createFragmentMap(getFragmentDefinitions(doc))) ? null : doc;
}

function getDirectiveMatcher(directives) {
  return function directiveMatcher(directive) {
    return directives.some(function (dir) {
      return dir.name && dir.name === directive.name.value || dir.test && dir.test(directive);
    });
  };
}

function removeDirectivesFromDocument(directives, doc) {
  var variablesInUse = Object.create(null);
  var variablesToRemove = [];
  var fragmentSpreadsInUse = Object.create(null);
  var fragmentSpreadsToRemove = [];
  var modifiedDoc = nullIfDocIsEmpty((0, _visitor.visit)(doc, {
    Variable: {
      enter: function (node, _key, parent) {
        if (parent.kind !== 'VariableDefinition') {
          variablesInUse[node.name.value] = true;
        }
      }
    },
    Field: {
      enter: function (node) {
        if (directives && node.directives) {
          var shouldRemoveField = directives.some(function (directive) {
            return directive.remove;
          });

          if (shouldRemoveField && node.directives && node.directives.some(getDirectiveMatcher(directives))) {
            if (node.arguments) {
              node.arguments.forEach(function (arg) {
                if (arg.value.kind === 'Variable') {
                  variablesToRemove.push({
                    name: arg.value.name.value
                  });
                }
              });
            }

            if (node.selectionSet) {
              getAllFragmentSpreadsFromSelectionSet(node.selectionSet).forEach(function (frag) {
                fragmentSpreadsToRemove.push({
                  name: frag.name.value
                });
              });
            }

            return null;
          }
        }
      }
    },
    FragmentSpread: {
      enter: function (node) {
        fragmentSpreadsInUse[node.name.value] = true;
      }
    },
    Directive: {
      enter: function (node) {
        if (getDirectiveMatcher(directives)(node)) {
          return null;
        }
      }
    }
  }));

  if (modifiedDoc && filterInPlace(variablesToRemove, function (v) {
    return !variablesInUse[v.name];
  }).length) {
    modifiedDoc = removeArgumentsFromDocument(variablesToRemove, modifiedDoc);
  }

  if (modifiedDoc && filterInPlace(fragmentSpreadsToRemove, function (fs) {
    return !fragmentSpreadsInUse[fs.name];
  }).length) {
    modifiedDoc = removeFragmentSpreadFromDocument(fragmentSpreadsToRemove, modifiedDoc);
  }

  return modifiedDoc;
}

function addTypenameToDocument(doc) {
  return (0, _visitor.visit)(checkDocument(doc), {
    SelectionSet: {
      enter: function (node, _key, parent) {
        if (parent && parent.kind === 'OperationDefinition') {
          return;
        }

        var selections = node.selections;

        if (!selections) {
          return;
        }

        var skip = selections.some(function (selection) {
          return isField(selection) && (selection.name.value === '__typename' || selection.name.value.lastIndexOf('__', 0) === 0);
        });

        if (skip) {
          return;
        }

        var field = parent;

        if (isField(field) && field.directives && field.directives.some(function (d) {
          return d.name.value === 'export';
        })) {
          return;
        }

        return (0, _tslib.__assign)((0, _tslib.__assign)({}, node), {
          selections: (0, _tslib.__spreadArrays)(selections, [TYPENAME_FIELD])
        });
      }
    }
  });
}

var connectionRemoveConfig = {
  test: function (directive) {
    var willRemove = directive.name.value === 'connection';

    if (willRemove) {
      if (!directive.arguments || !directive.arguments.some(function (arg) {
        return arg.name.value === 'key';
      })) {
        process.env.NODE_ENV === "production" || _tsInvariant.invariant.warn('Removing an @connection directive even though it does not have a key. ' + 'You may want to use the key parameter to specify a store key.');
      }
    }

    return willRemove;
  }
};

function removeConnectionDirectiveFromDocument(doc) {
  return removeDirectivesFromDocument([connectionRemoveConfig], checkDocument(doc));
}

function hasDirectivesInSelectionSet(directives, selectionSet, nestedCheck) {
  if (nestedCheck === void 0) {
    nestedCheck = true;
  }

  return selectionSet && selectionSet.selections && selectionSet.selections.some(function (selection) {
    return hasDirectivesInSelection(directives, selection, nestedCheck);
  });
}

function hasDirectivesInSelection(directives, selection, nestedCheck) {
  if (nestedCheck === void 0) {
    nestedCheck = true;
  }

  if (!isField(selection)) {
    return true;
  }

  if (!selection.directives) {
    return false;
  }

  return selection.directives.some(getDirectiveMatcher(directives)) || nestedCheck && hasDirectivesInSelectionSet(directives, selection.selectionSet, nestedCheck);
}

function getDirectivesFromDocument(directives, doc) {
  checkDocument(doc);
  var parentPath;
  return nullIfDocIsEmpty((0, _visitor.visit)(doc, {
    SelectionSet: {
      enter: function (node, _key, _parent, path) {
        var currentPath = path.join('-');

        if (!parentPath || currentPath === parentPath || !currentPath.startsWith(parentPath)) {
          if (node.selections) {
            var selectionsWithDirectives = node.selections.filter(function (selection) {
              return hasDirectivesInSelection(directives, selection);
            });

            if (hasDirectivesInSelectionSet(directives, node, false)) {
              parentPath = currentPath;
            }

            return (0, _tslib.__assign)((0, _tslib.__assign)({}, node), {
              selections: selectionsWithDirectives
            });
          } else {
            return null;
          }
        }
      }
    }
  }));
}

function getArgumentMatcher(config) {
  return function argumentMatcher(argument) {
    return config.some(function (aConfig) {
      return argument.value && argument.value.kind === 'Variable' && argument.value.name && (aConfig.name === argument.value.name.value || aConfig.test && aConfig.test(argument));
    });
  };
}

function removeArgumentsFromDocument(config, doc) {
  var argMatcher = getArgumentMatcher(config);
  return nullIfDocIsEmpty((0, _visitor.visit)(doc, {
    OperationDefinition: {
      enter: function (node) {
        return (0, _tslib.__assign)((0, _tslib.__assign)({}, node), {
          variableDefinitions: node.variableDefinitions.filter(function (varDef) {
            return !config.some(function (arg) {
              return arg.name === varDef.variable.name.value;
            });
          })
        });
      }
    },
    Field: {
      enter: function (node) {
        var shouldRemoveField = config.some(function (argConfig) {
          return argConfig.remove;
        });

        if (shouldRemoveField) {
          var argMatchCount_1 = 0;
          node.arguments.forEach(function (arg) {
            if (argMatcher(arg)) {
              argMatchCount_1 += 1;
            }
          });

          if (argMatchCount_1 === 1) {
            return null;
          }
        }
      }
    },
    Argument: {
      enter: function (node) {
        if (argMatcher(node)) {
          return null;
        }
      }
    }
  }));
}

function removeFragmentSpreadFromDocument(config, doc) {
  function enter(node) {
    if (config.some(function (def) {
      return def.name === node.name.value;
    })) {
      return null;
    }
  }

  return nullIfDocIsEmpty((0, _visitor.visit)(doc, {
    FragmentSpread: {
      enter: enter
    },
    FragmentDefinition: {
      enter: enter
    }
  }));
}

function getAllFragmentSpreadsFromSelectionSet(selectionSet) {
  var allFragments = [];
  selectionSet.selections.forEach(function (selection) {
    if ((isField(selection) || isInlineFragment(selection)) && selection.selectionSet) {
      getAllFragmentSpreadsFromSelectionSet(selection.selectionSet).forEach(function (frag) {
        return allFragments.push(frag);
      });
    } else if (selection.kind === 'FragmentSpread') {
      allFragments.push(selection);
    }
  });
  return allFragments;
}

function buildQueryFromSelectionSet(document) {
  var definition = getMainDefinition(document);
  var definitionOperation = definition.operation;

  if (definitionOperation === 'query') {
    return document;
  }

  var modifiedDoc = (0, _visitor.visit)(document, {
    OperationDefinition: {
      enter: function (node) {
        return (0, _tslib.__assign)((0, _tslib.__assign)({}, node), {
          operation: 'query'
        });
      }
    }
  });
  return modifiedDoc;
}

function removeClientSetsFromDocument(document) {
  checkDocument(document);
  var modifiedDoc = removeDirectivesFromDocument([{
    test: function (directive) {
      return directive.name.value === 'client';
    },
    remove: true
  }], document);

  if (modifiedDoc) {
    modifiedDoc = (0, _visitor.visit)(modifiedDoc, {
      FragmentDefinition: {
        enter: function (node) {
          if (node.selectionSet) {
            var isTypenameOnly = node.selectionSet.selections.every(function (selection) {
              return isField(selection) && selection.name.value === '__typename';
            });

            if (isTypenameOnly) {
              return null;
            }
          }
        }
      }
    });
  }

  return modifiedDoc;
}

var canUseWeakMap = typeof WeakMap === 'function' && !(typeof navigator === 'object' && navigator.product === 'ReactNative');
exports.canUseWeakMap = canUseWeakMap;
var toString = Object.prototype.toString;

function cloneDeep(value) {
  return cloneDeepHelper(value, new Map());
}

function cloneDeepHelper(val, seen) {
  switch (toString.call(val)) {
    case "[object Array]":
      {
        if (seen.has(val)) return seen.get(val);
        var copy_1 = val.slice(0);
        seen.set(val, copy_1);
        copy_1.forEach(function (child, i) {
          copy_1[i] = cloneDeepHelper(child, seen);
        });
        return copy_1;
      }

    case "[object Object]":
      {
        if (seen.has(val)) return seen.get(val);
        var copy_2 = Object.create(Object.getPrototypeOf(val));
        seen.set(val, copy_2);
        Object.keys(val).forEach(function (key) {
          copy_2[key] = cloneDeepHelper(val[key], seen);
        });
        return copy_2;
      }

    default:
      return val;
  }
}

function getEnv() {
  if (typeof process !== 'undefined' && process.env.NODE_ENV) {
    return process.env.NODE_ENV;
  }

  return 'development';
}

function isEnv(env) {
  return getEnv() === env;
}

function isProduction() {
  return isEnv('production') === true;
}

function isDevelopment() {
  return isEnv('development') === true;
}

function isTest() {
  return isEnv('test') === true;
}

function tryFunctionOrLogError(f) {
  try {
    return f();
  } catch (e) {
    if (console.error) {
      console.error(e);
    }
  }
}

function graphQLResultHasError(result) {
  return result.errors && result.errors.length;
}

function deepFreeze(o) {
  Object.freeze(o);
  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (o[prop] !== null && (typeof o[prop] === 'object' || typeof o[prop] === 'function') && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });
  return o;
}

function maybeDeepFreeze(obj) {
  if (isDevelopment() || isTest()) {
    var symbolIsPolyfilled = typeof Symbol === 'function' && typeof Symbol('') === 'string';

    if (!symbolIsPolyfilled) {
      return deepFreeze(obj);
    }
  }

  return obj;
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

function mergeDeep() {
  var sources = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }

  return mergeDeepArray(sources);
}

function mergeDeepArray(sources) {
  var target = sources[0] || {};
  var count = sources.length;

  if (count > 1) {
    var pastCopies = [];
    target = shallowCopyForMerge(target, pastCopies);

    for (var i = 1; i < count; ++i) {
      target = mergeHelper(target, sources[i], pastCopies);
    }
  }

  return target;
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

function mergeHelper(target, source, pastCopies) {
  if (isObject(source) && isObject(target)) {
    if (Object.isExtensible && !Object.isExtensible(target)) {
      target = shallowCopyForMerge(target, pastCopies);
    }

    Object.keys(source).forEach(function (sourceKey) {
      var sourceValue = source[sourceKey];

      if (hasOwnProperty.call(target, sourceKey)) {
        var targetValue = target[sourceKey];

        if (sourceValue !== targetValue) {
          target[sourceKey] = mergeHelper(shallowCopyForMerge(targetValue, pastCopies), sourceValue, pastCopies);
        }
      } else {
        target[sourceKey] = sourceValue;
      }
    });
    return target;
  }

  return source;
}

function shallowCopyForMerge(value, pastCopies) {
  if (value !== null && typeof value === 'object' && pastCopies.indexOf(value) < 0) {
    if (Array.isArray(value)) {
      value = value.slice(0);
    } else {
      value = (0, _tslib.__assign)({
        __proto__: Object.getPrototypeOf(value)
      }, value);
    }

    pastCopies.push(value);
  }

  return value;
}

var haveWarned = Object.create({});

function warnOnceInDevelopment(msg, type) {
  if (type === void 0) {
    type = 'warn';
  }

  if (!isProduction() && !haveWarned[msg]) {
    if (!isTest()) {
      haveWarned[msg] = true;
    }

    if (type === 'error') {
      console.error(msg);
    } else {
      console.warn(msg);
    }
  }
}

function stripSymbols(data) {
  return JSON.parse(JSON.stringify(data));
}

}).call(this)}).call(this,require('_process'))
},{"@wry/equality":3,"_process":1,"fast-json-stable-stringify":6,"graphql/language/visitor":12,"ts-invariant":14,"tslib":15}],6:[function(require,module,exports){
'use strict';

module.exports = function (data, opts) {
    if (!opts) opts = {};
    if (typeof opts === 'function') opts = { cmp: opts };
    var cycles = (typeof opts.cycles === 'boolean') ? opts.cycles : false;

    var cmp = opts.cmp && (function (f) {
        return function (node) {
            return function (a, b) {
                var aobj = { key: a, value: node[a] };
                var bobj = { key: b, value: node[b] };
                return f(aobj, bobj);
            };
        };
    })(opts.cmp);

    var seen = [];
    return (function stringify (node) {
        if (node && node.toJSON && typeof node.toJSON === 'function') {
            node = node.toJSON();
        }

        if (node === undefined) return;
        if (typeof node == 'number') return isFinite(node) ? '' + node : 'null';
        if (typeof node !== 'object') return JSON.stringify(node);

        var i, out;
        if (Array.isArray(node)) {
            out = '[';
            for (i = 0; i < node.length; i++) {
                if (i) out += ',';
                out += stringify(node[i]) || 'null';
            }
            return out + ']';
        }

        if (node === null) return 'null';

        if (seen.indexOf(node) !== -1) {
            if (cycles) return JSON.stringify('__cycle__');
            throw new TypeError('Converting circular structure to JSON');
        }

        var seenIndex = seen.push(node) - 1;
        var keys = Object.keys(node).sort(cmp && cmp(node));
        out = '';
        for (i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = stringify(node[key]);

            if (!value) continue;
            if (out) out += ',';
            out += JSON.stringify(key) + ':' + value;
        }
        seen.splice(seenIndex, 1);
        return '{' + out + '}';
    })(data);
};

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defineInspect;

var _invariant = _interopRequireDefault(require("./invariant.js"));

var _nodejsCustomInspectSymbol = _interopRequireDefault(require("./nodejsCustomInspectSymbol.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The `defineInspect()` function defines `inspect()` prototype method as alias of `toJSON`
 */
function defineInspect(classObject) {
  var fn = classObject.prototype.toJSON;
  typeof fn === 'function' || (0, _invariant.default)(0);
  classObject.prototype.inspect = fn; // istanbul ignore else (See: 'https://github.com/graphql/graphql-js/issues/2317')

  if (_nodejsCustomInspectSymbol.default) {
    classObject.prototype[_nodejsCustomInspectSymbol.default] = fn;
  }
}

},{"./invariant.js":9,"./nodejsCustomInspectSymbol.js":10}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = inspect;

var _nodejsCustomInspectSymbol = _interopRequireDefault(require("./nodejsCustomInspectSymbol.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var MAX_ARRAY_LENGTH = 10;
var MAX_RECURSIVE_DEPTH = 2;
/**
 * Used to print values in error messages.
 */

function inspect(value) {
  return formatValue(value, []);
}

function formatValue(value, seenValues) {
  switch (_typeof(value)) {
    case 'string':
      return JSON.stringify(value);

    case 'function':
      return value.name ? "[function ".concat(value.name, "]") : '[function]';

    case 'object':
      if (value === null) {
        return 'null';
      }

      return formatObjectValue(value, seenValues);

    default:
      return String(value);
  }
}

function formatObjectValue(value, previouslySeenValues) {
  if (previouslySeenValues.indexOf(value) !== -1) {
    return '[Circular]';
  }

  var seenValues = [].concat(previouslySeenValues, [value]);
  var customInspectFn = getCustomFn(value);

  if (customInspectFn !== undefined) {
    var customValue = customInspectFn.call(value); // check for infinite recursion

    if (customValue !== value) {
      return typeof customValue === 'string' ? customValue : formatValue(customValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }

  return formatObject(value, seenValues);
}

function formatObject(object, seenValues) {
  var keys = Object.keys(object);

  if (keys.length === 0) {
    return '{}';
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return '[' + getObjectTag(object) + ']';
  }

  var properties = keys.map(function (key) {
    var value = formatValue(object[key], seenValues);
    return key + ': ' + value;
  });
  return '{ ' + properties.join(', ') + ' }';
}

function formatArray(array, seenValues) {
  if (array.length === 0) {
    return '[]';
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return '[Array]';
  }

  var len = Math.min(MAX_ARRAY_LENGTH, array.length);
  var remaining = array.length - len;
  var items = [];

  for (var i = 0; i < len; ++i) {
    items.push(formatValue(array[i], seenValues));
  }

  if (remaining === 1) {
    items.push('... 1 more item');
  } else if (remaining > 1) {
    items.push("... ".concat(remaining, " more items"));
  }

  return '[' + items.join(', ') + ']';
}

function getCustomFn(object) {
  var customInspectFn = object[String(_nodejsCustomInspectSymbol.default)];

  if (typeof customInspectFn === 'function') {
    return customInspectFn;
  }

  if (typeof object.inspect === 'function') {
    return object.inspect;
  }
}

function getObjectTag(object) {
  var tag = Object.prototype.toString.call(object).replace(/^\[object /, '').replace(/]$/, '');

  if (tag === 'Object' && typeof object.constructor === 'function') {
    var name = object.constructor.name;

    if (typeof name === 'string' && name !== '') {
      return name;
    }
  }

  return tag;
}

},{"./nodejsCustomInspectSymbol.js":10}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = invariant;

function invariant(condition, message) {
  var booleanCondition = Boolean(condition); // istanbul ignore else (See transformation done in './resources/inlineInvariant.js')

  if (!booleanCondition) {
    throw new Error(message != null ? message : 'Unexpected invariant triggered.');
  }
}

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')
var nodejsCustomInspectSymbol = typeof Symbol === 'function' && typeof Symbol.for === 'function' ? Symbol.for('nodejs.util.inspect.custom') : undefined;
var _default = nodejsCustomInspectSymbol;
exports.default = _default;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNode = isNode;
exports.Token = exports.Location = void 0;

var _defineInspect = _interopRequireDefault(require("../jsutils/defineInspect.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Contains a range of UTF-8 character offsets and token references that
 * identify the region of the source from which the AST derived.
 */
var Location = /*#__PURE__*/function () {
  /**
   * The character offset at which this Node begins.
   */

  /**
   * The character offset at which this Node ends.
   */

  /**
   * The Token at which this Node begins.
   */

  /**
   * The Token at which this Node ends.
   */

  /**
   * The Source document the AST represents.
   */
  function Location(startToken, endToken, source) {
    this.start = startToken.start;
    this.end = endToken.end;
    this.startToken = startToken;
    this.endToken = endToken;
    this.source = source;
  }

  var _proto = Location.prototype;

  _proto.toJSON = function toJSON() {
    return {
      start: this.start,
      end: this.end
    };
  };

  return Location;
}(); // Print a simplified form when appearing in `inspect` and `util.inspect`.


exports.Location = Location;
(0, _defineInspect.default)(Location);
/**
 * Represents a range of characters represented by a lexical token
 * within a Source.
 */

var Token = /*#__PURE__*/function () {
  /**
   * The kind of Token.
   */

  /**
   * The character offset at which this Node begins.
   */

  /**
   * The character offset at which this Node ends.
   */

  /**
   * The 1-indexed line number on which this Token appears.
   */

  /**
   * The 1-indexed column number at which this Token begins.
   */

  /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   */

  /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */
  function Token(kind, start, end, line, column, prev, value) {
    this.kind = kind;
    this.start = start;
    this.end = end;
    this.line = line;
    this.column = column;
    this.value = value;
    this.prev = prev;
    this.next = null;
  }

  var _proto2 = Token.prototype;

  _proto2.toJSON = function toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column
    };
  };

  return Token;
}(); // Print a simplified form when appearing in `inspect` and `util.inspect`.


exports.Token = Token;
(0, _defineInspect.default)(Token);
/**
 * @internal
 */

function isNode(maybeNode) {
  return maybeNode != null && typeof maybeNode.kind === 'string';
}
/**
 * The list of all possible AST node types.
 */

},{"../jsutils/defineInspect.js":7}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visit = visit;
exports.visitInParallel = visitInParallel;
exports.getVisitFn = getVisitFn;
exports.BREAK = exports.QueryDocumentKeys = void 0;

var _inspect = _interopRequireDefault(require("../jsutils/inspect.js"));

var _ast = require("./ast.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QueryDocumentKeys = {
  Name: [],
  Document: ['definitions'],
  OperationDefinition: ['name', 'variableDefinitions', 'directives', 'selectionSet'],
  VariableDefinition: ['variable', 'type', 'defaultValue', 'directives'],
  Variable: ['name'],
  SelectionSet: ['selections'],
  Field: ['alias', 'name', 'arguments', 'directives', 'selectionSet'],
  Argument: ['name', 'value'],
  FragmentSpread: ['name', 'directives'],
  InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
  FragmentDefinition: ['name', // Note: fragment variable definitions are experimental and may be changed
  // or removed in the future.
  'variableDefinitions', 'typeCondition', 'directives', 'selectionSet'],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ['values'],
  ObjectValue: ['fields'],
  ObjectField: ['name', 'value'],
  Directive: ['name', 'arguments'],
  NamedType: ['name'],
  ListType: ['type'],
  NonNullType: ['type'],
  SchemaDefinition: ['description', 'directives', 'operationTypes'],
  OperationTypeDefinition: ['type'],
  ScalarTypeDefinition: ['description', 'name', 'directives'],
  ObjectTypeDefinition: ['description', 'name', 'interfaces', 'directives', 'fields'],
  FieldDefinition: ['description', 'name', 'arguments', 'type', 'directives'],
  InputValueDefinition: ['description', 'name', 'type', 'defaultValue', 'directives'],
  InterfaceTypeDefinition: ['description', 'name', 'interfaces', 'directives', 'fields'],
  UnionTypeDefinition: ['description', 'name', 'directives', 'types'],
  EnumTypeDefinition: ['description', 'name', 'directives', 'values'],
  EnumValueDefinition: ['description', 'name', 'directives'],
  InputObjectTypeDefinition: ['description', 'name', 'directives', 'fields'],
  DirectiveDefinition: ['description', 'name', 'arguments', 'locations'],
  SchemaExtension: ['directives', 'operationTypes'],
  ScalarTypeExtension: ['name', 'directives'],
  ObjectTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  InterfaceTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  UnionTypeExtension: ['name', 'directives', 'types'],
  EnumTypeExtension: ['name', 'directives', 'values'],
  InputObjectTypeExtension: ['name', 'directives', 'fields']
};
exports.QueryDocumentKeys = QueryDocumentKeys;
var BREAK = Object.freeze({});
/**
 * visit() will walk through an AST using a depth-first traversal, calling
 * the visitor's enter function at each node in the traversal, and calling the
 * leave function after visiting that node and all of its child nodes.
 *
 * By returning different values from the enter and leave functions, the
 * behavior of the visitor can be altered, including skipping over a sub-tree of
 * the AST (by returning false), editing the AST by returning a value or null
 * to remove the value, or to stop the whole traversal by returning BREAK.
 *
 * When using visit() to edit an AST, the original AST will not be modified, and
 * a new version of the AST with the changes applied will be returned from the
 * visit function.
 *
 *     const editedAST = visit(ast, {
 *       enter(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: skip visiting this node
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       },
 *       leave(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: no action
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       }
 *     });
 *
 * Alternatively to providing enter() and leave() functions, a visitor can
 * instead provide functions named the same as the kinds of AST nodes, or
 * enter/leave visitors at a named key, leading to four permutations of the
 * visitor API:
 *
 * 1) Named visitors triggered when entering a node of a specific kind.
 *
 *     visit(ast, {
 *       Kind(node) {
 *         // enter the "Kind" node
 *       }
 *     })
 *
 * 2) Named visitors that trigger upon entering and leaving a node of
 *    a specific kind.
 *
 *     visit(ast, {
 *       Kind: {
 *         enter(node) {
 *           // enter the "Kind" node
 *         }
 *         leave(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 *
 * 3) Generic visitors that trigger upon entering and leaving any node.
 *
 *     visit(ast, {
 *       enter(node) {
 *         // enter any node
 *       },
 *       leave(node) {
 *         // leave any node
 *       }
 *     })
 *
 * 4) Parallel visitors for entering and leaving nodes of a specific kind.
 *
 *     visit(ast, {
 *       enter: {
 *         Kind(node) {
 *           // enter the "Kind" node
 *         }
 *       },
 *       leave: {
 *         Kind(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 */

exports.BREAK = BREAK;

function visit(root, visitor) {
  var visitorKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : QueryDocumentKeys;

  /* eslint-disable no-undef-init */
  var stack = undefined;
  var inArray = Array.isArray(root);
  var keys = [root];
  var index = -1;
  var edits = [];
  var node = undefined;
  var key = undefined;
  var parent = undefined;
  var path = [];
  var ancestors = [];
  var newRoot = root;
  /* eslint-enable no-undef-init */

  do {
    index++;
    var isLeaving = index === keys.length;
    var isEdited = isLeaving && edits.length !== 0;

    if (isLeaving) {
      key = ancestors.length === 0 ? undefined : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();

      if (isEdited) {
        if (inArray) {
          node = node.slice();
        } else {
          var clone = {};

          for (var _i2 = 0, _Object$keys2 = Object.keys(node); _i2 < _Object$keys2.length; _i2++) {
            var k = _Object$keys2[_i2];
            clone[k] = node[k];
          }

          node = clone;
        }

        var editOffset = 0;

        for (var ii = 0; ii < edits.length; ii++) {
          var editKey = edits[ii][0];
          var editValue = edits[ii][1];

          if (inArray) {
            editKey -= editOffset;
          }

          if (inArray && editValue === null) {
            node.splice(editKey, 1);
            editOffset++;
          } else {
            node[editKey] = editValue;
          }
        }
      }

      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else {
      key = parent ? inArray ? index : keys[index] : undefined;
      node = parent ? parent[key] : newRoot;

      if (node === null || node === undefined) {
        continue;
      }

      if (parent) {
        path.push(key);
      }
    }

    var result = void 0;

    if (!Array.isArray(node)) {
      if (!(0, _ast.isNode)(node)) {
        throw new Error("Invalid AST Node: ".concat((0, _inspect.default)(node), "."));
      }

      var visitFn = getVisitFn(visitor, node.kind, isLeaving);

      if (visitFn) {
        result = visitFn.call(visitor, node, key, parent, path, ancestors);

        if (result === BREAK) {
          break;
        }

        if (result === false) {
          if (!isLeaving) {
            path.pop();
            continue;
          }
        } else if (result !== undefined) {
          edits.push([key, result]);

          if (!isLeaving) {
            if ((0, _ast.isNode)(result)) {
              node = result;
            } else {
              path.pop();
              continue;
            }
          }
        }
      }
    }

    if (result === undefined && isEdited) {
      edits.push([key, node]);
    }

    if (isLeaving) {
      path.pop();
    } else {
      var _visitorKeys$node$kin;

      stack = {
        inArray: inArray,
        index: index,
        keys: keys,
        edits: edits,
        prev: stack
      };
      inArray = Array.isArray(node);
      keys = inArray ? node : (_visitorKeys$node$kin = visitorKeys[node.kind]) !== null && _visitorKeys$node$kin !== void 0 ? _visitorKeys$node$kin : [];
      index = -1;
      edits = [];

      if (parent) {
        ancestors.push(parent);
      }

      parent = node;
    }
  } while (stack !== undefined);

  if (edits.length !== 0) {
    newRoot = edits[edits.length - 1][1];
  }

  return newRoot;
}
/**
 * Creates a new visitor instance which delegates to many visitors to run in
 * parallel. Each visitor will be visited for each node before moving on.
 *
 * If a prior visitor edits a node, no following visitors will see that node.
 */


function visitInParallel(visitors) {
  var skipping = new Array(visitors.length);
  return {
    enter: function enter(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (skipping[i] == null) {
          var fn = getVisitFn(visitors[i], node.kind,
          /* isLeaving */
          false);

          if (fn) {
            var result = fn.apply(visitors[i], arguments);

            if (result === false) {
              skipping[i] = node;
            } else if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined) {
              return result;
            }
          }
        }
      }
    },
    leave: function leave(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (skipping[i] == null) {
          var fn = getVisitFn(visitors[i], node.kind,
          /* isLeaving */
          true);

          if (fn) {
            var result = fn.apply(visitors[i], arguments);

            if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined && result !== false) {
              return result;
            }
          }
        } else if (skipping[i] === node) {
          skipping[i] = null;
        }
      }
    }
  };
}
/**
 * Given a visitor instance, if it is leaving or not, and a node kind, return
 * the function the visitor runtime should call.
 */


function getVisitFn(visitor, kind, isLeaving) {
  var kindVisitor = visitor[kind];

  if (kindVisitor) {
    if (!isLeaving && typeof kindVisitor === 'function') {
      // { Kind() {} }
      return kindVisitor;
    }

    var kindSpecificVisitor = isLeaving ? kindVisitor.leave : kindVisitor.enter;

    if (typeof kindSpecificVisitor === 'function') {
      // { Kind: { enter() {}, leave() {} } }
      return kindSpecificVisitor;
    }
  } else {
    var specificVisitor = isLeaving ? visitor.leave : visitor.enter;

    if (specificVisitor) {
      if (typeof specificVisitor === 'function') {
        // { enter() {}, leave() {} }
        return specificVisitor;
      }

      var specificKindVisitor = specificVisitor[kind];

      if (typeof specificKindVisitor === 'function') {
        // { enter: { Kind() {} }, leave: { Kind() {} } }
        return specificKindVisitor;
      }
    }
  }
}

},{"../jsutils/inspect.js":8,"./ast.js":11}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var context = require('@wry/context');

function defaultDispose() { }
var Cache = /** @class */ (function () {
    function Cache(max, dispose) {
        if (max === void 0) { max = Infinity; }
        if (dispose === void 0) { dispose = defaultDispose; }
        this.max = max;
        this.dispose = dispose;
        this.map = new Map();
        this.newest = null;
        this.oldest = null;
    }
    Cache.prototype.has = function (key) {
        return this.map.has(key);
    };
    Cache.prototype.get = function (key) {
        var entry = this.getEntry(key);
        return entry && entry.value;
    };
    Cache.prototype.getEntry = function (key) {
        var entry = this.map.get(key);
        if (entry && entry !== this.newest) {
            var older = entry.older, newer = entry.newer;
            if (newer) {
                newer.older = older;
            }
            if (older) {
                older.newer = newer;
            }
            entry.older = this.newest;
            entry.older.newer = entry;
            entry.newer = null;
            this.newest = entry;
            if (entry === this.oldest) {
                this.oldest = newer;
            }
        }
        return entry;
    };
    Cache.prototype.set = function (key, value) {
        var entry = this.getEntry(key);
        if (entry) {
            return entry.value = value;
        }
        entry = {
            key: key,
            value: value,
            newer: null,
            older: this.newest
        };
        if (this.newest) {
            this.newest.newer = entry;
        }
        this.newest = entry;
        this.oldest = this.oldest || entry;
        this.map.set(key, entry);
        return entry.value;
    };
    Cache.prototype.clean = function () {
        while (this.oldest && this.map.size > this.max) {
            this.delete(this.oldest.key);
        }
    };
    Cache.prototype.delete = function (key) {
        var entry = this.map.get(key);
        if (entry) {
            if (entry === this.newest) {
                this.newest = entry.older;
            }
            if (entry === this.oldest) {
                this.oldest = entry.newer;
            }
            if (entry.newer) {
                entry.newer.older = entry.older;
            }
            if (entry.older) {
                entry.older.newer = entry.newer;
            }
            this.map.delete(key);
            this.dispose(entry.value, key);
            return true;
        }
        return false;
    };
    return Cache;
}());

var parentEntrySlot = new context.Slot();

var reusableEmptyArray = [];
var emptySetPool = [];
var POOL_TARGET_SIZE = 100;
// Since this package might be used browsers, we should avoid using the
// Node built-in assert module.
function assert(condition, optionalMessage) {
    if (!condition) {
        throw new Error(optionalMessage || "assertion failure");
    }
}
function valueIs(a, b) {
    var len = a.length;
    return (
    // Unknown values are not equal to each other.
    len > 0 &&
        // Both values must be ordinary (or both exceptional) to be equal.
        len === b.length &&
        // The underlying value or exception must be the same.
        a[len - 1] === b[len - 1]);
}
function valueGet(value) {
    switch (value.length) {
        case 0: throw new Error("unknown value");
        case 1: return value[0];
        case 2: throw value[1];
    }
}
function valueCopy(value) {
    return value.slice(0);
}
var Entry = /** @class */ (function () {
    function Entry(fn, args) {
        this.fn = fn;
        this.args = args;
        this.parents = new Set();
        this.childValues = new Map();
        // When this Entry has children that are dirty, this property becomes
        // a Set containing other Entry objects, borrowed from emptySetPool.
        // When the set becomes empty, it gets recycled back to emptySetPool.
        this.dirtyChildren = null;
        this.dirty = true;
        this.recomputing = false;
        this.value = [];
        ++Entry.count;
    }
    // This is the most important method of the Entry API, because it
    // determines whether the cached this.value can be returned immediately,
    // or must be recomputed. The overall performance of the caching system
    // depends on the truth of the following observations: (1) this.dirty is
    // usually false, (2) this.dirtyChildren is usually null/empty, and thus
    // (3) valueGet(this.value) is usually returned without recomputation.
    Entry.prototype.recompute = function () {
        assert(!this.recomputing, "already recomputing");
        if (!rememberParent(this) && maybeReportOrphan(this)) {
            // The recipient of the entry.reportOrphan callback decided to dispose
            // of this orphan entry by calling entry.dispose(), so we don't need to
            // (and should not) proceed with the recomputation.
            return void 0;
        }
        return mightBeDirty(this)
            ? reallyRecompute(this)
            : valueGet(this.value);
    };
    Entry.prototype.setDirty = function () {
        if (this.dirty)
            return;
        this.dirty = true;
        this.value.length = 0;
        reportDirty(this);
        // We can go ahead and unsubscribe here, since any further dirty
        // notifications we receive will be redundant, and unsubscribing may
        // free up some resources, e.g. file watchers.
        maybeUnsubscribe(this);
    };
    Entry.prototype.dispose = function () {
        var _this = this;
        forgetChildren(this).forEach(maybeReportOrphan);
        maybeUnsubscribe(this);
        // Because this entry has been kicked out of the cache (in index.js),
        // we've lost the ability to find out if/when this entry becomes dirty,
        // whether that happens through a subscription, because of a direct call
        // to entry.setDirty(), or because one of its children becomes dirty.
        // Because of this loss of future information, we have to assume the
        // worst (that this entry might have become dirty very soon), so we must
        // immediately mark this entry's parents as dirty. Normally we could
        // just call entry.setDirty() rather than calling parent.setDirty() for
        // each parent, but that would leave this entry in parent.childValues
        // and parent.dirtyChildren, which would prevent the child from being
        // truly forgotten.
        this.parents.forEach(function (parent) {
            parent.setDirty();
            forgetChild(parent, _this);
        });
    };
    Entry.count = 0;
    return Entry;
}());
function rememberParent(child) {
    var parent = parentEntrySlot.getValue();
    if (parent) {
        child.parents.add(parent);
        if (!parent.childValues.has(child)) {
            parent.childValues.set(child, []);
        }
        if (mightBeDirty(child)) {
            reportDirtyChild(parent, child);
        }
        else {
            reportCleanChild(parent, child);
        }
        return parent;
    }
}
function reallyRecompute(entry) {
    // Since this recomputation is likely to re-remember some of this
    // entry's children, we forget our children here but do not call
    // maybeReportOrphan until after the recomputation finishes.
    var originalChildren = forgetChildren(entry);
    // Set entry as the parent entry while calling recomputeNewValue(entry).
    parentEntrySlot.withValue(entry, recomputeNewValue, [entry]);
    if (maybeSubscribe(entry)) {
        // If we successfully recomputed entry.value and did not fail to
        // (re)subscribe, then this Entry is no longer explicitly dirty.
        setClean(entry);
    }
    // Now that we've had a chance to re-remember any children that were
    // involved in the recomputation, we can safely report any orphan
    // children that remain.
    originalChildren.forEach(maybeReportOrphan);
    return valueGet(entry.value);
}
function recomputeNewValue(entry) {
    entry.recomputing = true;
    // Set entry.value as unknown.
    entry.value.length = 0;
    try {
        // If entry.fn succeeds, entry.value will become a normal Value.
        entry.value[0] = entry.fn.apply(null, entry.args);
    }
    catch (e) {
        // If entry.fn throws, entry.value will become exceptional.
        entry.value[1] = e;
    }
    // Either way, this line is always reached.
    entry.recomputing = false;
}
function mightBeDirty(entry) {
    return entry.dirty || !!(entry.dirtyChildren && entry.dirtyChildren.size);
}
function setClean(entry) {
    entry.dirty = false;
    if (mightBeDirty(entry)) {
        // This Entry may still have dirty children, in which case we can't
        // let our parents know we're clean just yet.
        return;
    }
    reportClean(entry);
}
function reportDirty(child) {
    child.parents.forEach(function (parent) { return reportDirtyChild(parent, child); });
}
function reportClean(child) {
    child.parents.forEach(function (parent) { return reportCleanChild(parent, child); });
}
// Let a parent Entry know that one of its children may be dirty.
function reportDirtyChild(parent, child) {
    // Must have called rememberParent(child) before calling
    // reportDirtyChild(parent, child).
    assert(parent.childValues.has(child));
    assert(mightBeDirty(child));
    if (!parent.dirtyChildren) {
        parent.dirtyChildren = emptySetPool.pop() || new Set;
    }
    else if (parent.dirtyChildren.has(child)) {
        // If we already know this child is dirty, then we must have already
        // informed our own parents that we are dirty, so we can terminate
        // the recursion early.
        return;
    }
    parent.dirtyChildren.add(child);
    reportDirty(parent);
}
// Let a parent Entry know that one of its children is no longer dirty.
function reportCleanChild(parent, child) {
    // Must have called rememberChild(child) before calling
    // reportCleanChild(parent, child).
    assert(parent.childValues.has(child));
    assert(!mightBeDirty(child));
    var childValue = parent.childValues.get(child);
    if (childValue.length === 0) {
        parent.childValues.set(child, valueCopy(child.value));
    }
    else if (!valueIs(childValue, child.value)) {
        parent.setDirty();
    }
    removeDirtyChild(parent, child);
    if (mightBeDirty(parent)) {
        return;
    }
    reportClean(parent);
}
function removeDirtyChild(parent, child) {
    var dc = parent.dirtyChildren;
    if (dc) {
        dc.delete(child);
        if (dc.size === 0) {
            if (emptySetPool.length < POOL_TARGET_SIZE) {
                emptySetPool.push(dc);
            }
            parent.dirtyChildren = null;
        }
    }
}
// If the given entry has a reportOrphan method, and no remaining parents,
// call entry.reportOrphan and return true iff it returns true. The
// reportOrphan function should return true to indicate entry.dispose()
// has been called, and the entry has been removed from any other caches
// (see index.js for the only current example).
function maybeReportOrphan(entry) {
    return entry.parents.size === 0 &&
        typeof entry.reportOrphan === "function" &&
        entry.reportOrphan() === true;
}
// Removes all children from this entry and returns an array of the
// removed children.
function forgetChildren(parent) {
    var children = reusableEmptyArray;
    if (parent.childValues.size > 0) {
        children = [];
        parent.childValues.forEach(function (_value, child) {
            forgetChild(parent, child);
            children.push(child);
        });
    }
    // After we forget all our children, this.dirtyChildren must be empty
    // and therefore must have been reset to null.
    assert(parent.dirtyChildren === null);
    return children;
}
function forgetChild(parent, child) {
    child.parents.delete(parent);
    parent.childValues.delete(child);
    removeDirtyChild(parent, child);
}
function maybeSubscribe(entry) {
    if (typeof entry.subscribe === "function") {
        try {
            maybeUnsubscribe(entry); // Prevent double subscriptions.
            entry.unsubscribe = entry.subscribe.apply(null, entry.args);
        }
        catch (e) {
            // If this Entry has a subscribe function and it threw an exception
            // (or an unsubscribe function it previously returned now throws),
            // return false to indicate that we were not able to subscribe (or
            // unsubscribe), and this Entry should remain dirty.
            entry.setDirty();
            return false;
        }
    }
    // Returning true indicates either that there was no entry.subscribe
    // function or that it succeeded.
    return true;
}
function maybeUnsubscribe(entry) {
    var unsubscribe = entry.unsubscribe;
    if (typeof unsubscribe === "function") {
        entry.unsubscribe = void 0;
        unsubscribe();
    }
}

// A trie data structure that holds object keys weakly, yet can also hold
// non-object keys, unlike the native `WeakMap`.
var KeyTrie = /** @class */ (function () {
    function KeyTrie(weakness) {
        this.weakness = weakness;
    }
    KeyTrie.prototype.lookup = function () {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            array[_i] = arguments[_i];
        }
        return this.lookupArray(array);
    };
    KeyTrie.prototype.lookupArray = function (array) {
        var node = this;
        array.forEach(function (key) { return node = node.getChildTrie(key); });
        return node.data || (node.data = Object.create(null));
    };
    KeyTrie.prototype.getChildTrie = function (key) {
        var map = this.weakness && isObjRef(key)
            ? this.weak || (this.weak = new WeakMap())
            : this.strong || (this.strong = new Map());
        var child = map.get(key);
        if (!child)
            map.set(key, child = new KeyTrie(this.weakness));
        return child;
    };
    return KeyTrie;
}());
function isObjRef(value) {
    switch (typeof value) {
        case "object":
            if (value === null)
                break;
        // Fall through to return true...
        case "function":
            return true;
    }
    return false;
}

// The defaultMakeCacheKey function is remarkably powerful, because it gives
// a unique object for any shallow-identical list of arguments. If you need
// to implement a custom makeCacheKey function, you may find it helpful to
// delegate the final work to defaultMakeCacheKey, which is why we export it
// here. However, you may want to avoid defaultMakeCacheKey if your runtime
// does not support WeakMap, or you have the ability to return a string key.
// In those cases, just write your own custom makeCacheKey functions.
var keyTrie = new KeyTrie(typeof WeakMap === "function");
function defaultMakeCacheKey() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return keyTrie.lookupArray(args);
}
var caches = new Set();
function wrap(originalFunction, options) {
    if (options === void 0) { options = Object.create(null); }
    var cache = new Cache(options.max || Math.pow(2, 16), function (entry) { return entry.dispose(); });
    var disposable = !!options.disposable;
    var makeCacheKey = options.makeCacheKey || defaultMakeCacheKey;
    function optimistic() {
        if (disposable && !parentEntrySlot.hasValue()) {
            // If there's no current parent computation, and this wrapped
            // function is disposable (meaning we don't care about entry.value,
            // just dependency tracking), then we can short-cut everything else
            // in this function, because entry.recompute() is going to recycle
            // the entry object without recomputing anything, anyway.
            return void 0;
        }
        var key = makeCacheKey.apply(null, arguments);
        if (key === void 0) {
            return originalFunction.apply(null, arguments);
        }
        var args = Array.prototype.slice.call(arguments);
        var entry = cache.get(key);
        if (entry) {
            entry.args = args;
        }
        else {
            entry = new Entry(originalFunction, args);
            cache.set(key, entry);
            entry.subscribe = options.subscribe;
            if (disposable) {
                entry.reportOrphan = function () { return cache.delete(key); };
            }
        }
        var value = entry.recompute();
        // Move this entry to the front of the least-recently used queue,
        // since we just finished computing its value.
        cache.set(key, entry);
        caches.add(cache);
        // Clean up any excess entries in the cache, but only if there is no
        // active parent entry, meaning we're not in the middle of a larger
        // computation that might be flummoxed by the cleaning.
        if (!parentEntrySlot.hasValue()) {
            caches.forEach(function (cache) { return cache.clean(); });
            caches.clear();
        }
        // If options.disposable is truthy, the caller of wrap is telling us
        // they don't care about the result of entry.recompute(), so we should
        // avoid returning the value, so it won't be accidentally used.
        return disposable ? void 0 : value;
    }
    optimistic.dirty = function () {
        var key = makeCacheKey.apply(null, arguments);
        var child = key !== void 0 && cache.get(key);
        if (child) {
            child.setDirty();
        }
    };
    return optimistic;
}

Object.defineProperty(exports, 'asyncFromGen', {
  enumerable: true,
  get: function () {
    return context.asyncFromGen;
  }
});
Object.defineProperty(exports, 'bindContext', {
  enumerable: true,
  get: function () {
    return context.bind;
  }
});
Object.defineProperty(exports, 'noContext', {
  enumerable: true,
  get: function () {
    return context.noContext;
  }
});
Object.defineProperty(exports, 'setTimeout', {
  enumerable: true,
  get: function () {
    return context.setTimeout;
  }
});
exports.KeyTrie = KeyTrie;
exports.defaultMakeCacheKey = defaultMakeCacheKey;
exports.wrap = wrap;


},{"@wry/context":2}],14:[function(require,module,exports){
(function (process){(function (){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');

var genericMessage = "Invariant Violation";
var _a = Object.setPrototypeOf, setPrototypeOf = _a === void 0 ? function (obj, proto) {
    obj.__proto__ = proto;
    return obj;
} : _a;
var InvariantError = /** @class */ (function (_super) {
    tslib.__extends(InvariantError, _super);
    function InvariantError(message) {
        if (message === void 0) { message = genericMessage; }
        var _this = _super.call(this, typeof message === "number"
            ? genericMessage + ": " + message + " (see https://github.com/apollographql/invariant-packages)"
            : message) || this;
        _this.framesToPop = 1;
        _this.name = genericMessage;
        setPrototypeOf(_this, InvariantError.prototype);
        return _this;
    }
    return InvariantError;
}(Error));
function invariant(condition, message) {
    if (!condition) {
        throw new InvariantError(message);
    }
}
function wrapConsoleMethod(method) {
    return function () {
        return console[method].apply(console, arguments);
    };
}
(function (invariant) {
    invariant.warn = wrapConsoleMethod("warn");
    invariant.error = wrapConsoleMethod("error");
})(invariant || (invariant = {}));
// Code that uses ts-invariant with rollup-plugin-invariant may want to
// import this process stub to avoid errors evaluating process.env.NODE_ENV.
// However, because most ESM-to-CJS compilers will rewrite the process import
// as tsInvariant.process, which prevents proper replacement by minifiers, we
// also attempt to define the stub globally when it is not already defined.
exports.process = { env: {} };
if (typeof process === "object") {
    exports.process = process;
}
else
    try {
        // Using Function to evaluate this assignment in global scope also escapes
        // the strict mode of the current module, thereby allowing the assignment.
        // Inspired by https://github.com/facebook/regenerator/pull/369.
        Function("stub", "process = stub")(exports.process);
    }
    catch (atLeastWeTried) {
        // The assignment can fail if a Content Security Policy heavy-handedly
        // forbids Function usage. In those environments, developers should take
        // extra care to replace process.env.NODE_ENV in their production builds,
        // or define an appropriate global.process polyfill.
    }
var invariant$1 = invariant;

exports.default = invariant$1;
exports.InvariantError = InvariantError;
exports.invariant = invariant;


}).call(this)}).call(this,require('_process'))
},{"_process":1,"tslib":15}],15:[function(require,module,exports){
(function (global){(function (){
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global global, define, System, Reflect, Promise */
var __extends;
var __assign;
var __rest;
var __decorate;
var __param;
var __metadata;
var __awaiter;
var __generator;
var __exportStar;
var __values;
var __read;
var __spread;
var __spreadArrays;
var __await;
var __asyncGenerator;
var __asyncDelegator;
var __asyncValues;
var __makeTemplateObject;
var __importStar;
var __importDefault;
var __classPrivateFieldGet;
var __classPrivateFieldSet;
var __createBinding;
(function (factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function (exports) { factory(createExporter(root, createExporter(exports))); });
    }
    else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
    }
    else {
        factory(createExporter(root));
    }
    function createExporter(exports, previous) {
        if (exports !== root) {
            if (typeof Object.create === "function") {
                Object.defineProperty(exports, "__esModule", { value: true });
            }
            else {
                exports.__esModule = true;
            }
        }
        return function (id, v) { return exports[id] = previous ? previous(id, v) : v; };
    }
})
(function (exporter) {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    __extends = function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    __rest = function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };

    __decorate = function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    __param = function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };

    __metadata = function (metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    };

    __awaiter = function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    __generator = function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };

    __createBinding = function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    };

    __exportStar = function (m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    };

    __values = function (o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };

    __read = function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };

    __spread = function () {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    };

    __spreadArrays = function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    __await = function (v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    };

    __asyncGenerator = function (thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    };

    __asyncDelegator = function (o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    };

    __asyncValues = function (o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    };

    __makeTemplateObject = function (cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    __importStar = function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };

    __importDefault = function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };

    __classPrivateFieldGet = function (receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    };

    __classPrivateFieldSet = function (receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    };

    exporter("__extends", __extends);
    exporter("__assign", __assign);
    exporter("__rest", __rest);
    exporter("__decorate", __decorate);
    exporter("__param", __param);
    exporter("__metadata", __metadata);
    exporter("__awaiter", __awaiter);
    exporter("__generator", __generator);
    exporter("__exportStar", __exportStar);
    exporter("__createBinding", __createBinding);
    exporter("__values", __values);
    exporter("__read", __read);
    exporter("__spread", __spread);
    exporter("__spreadArrays", __spreadArrays);
    exporter("__await", __await);
    exporter("__asyncGenerator", __asyncGenerator);
    exporter("__asyncDelegator", __asyncDelegator);
    exporter("__asyncValues", __asyncValues);
    exporter("__makeTemplateObject", __makeTemplateObject);
    exporter("__importStar", __importStar);
    exporter("__importDefault", __importDefault);
    exporter("__classPrivateFieldGet", __classPrivateFieldGet);
    exporter("__classPrivateFieldSet", __classPrivateFieldSet);
});

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],"/node_modules/apollo-cache-inmemory":[function(require,module,exports){
(function (process){(function (){
exports.__esModule = true;
exports.assertIdValue = assertIdValue;
exports.defaultDataIdFromObject = defaultDataIdFromObject;
exports.defaultNormalizedCacheFactory = defaultNormalizedCacheFactory$1;
exports.enhanceErrorWithDocument = enhanceErrorWithDocument;
exports.WriteError = exports.StoreWriter = exports.StoreReader = exports.ObjectCache = exports.IntrospectionFragmentMatcher = exports.InMemoryCache = exports.HeuristicFragmentMatcher = void 0;

var _tslib = require("tslib");

var _apolloCache = require("apollo-cache");

var _apolloUtilities = require("apollo-utilities");

var _optimism = require("optimism");

var _tsInvariant = require("ts-invariant");

var haveWarned = false;

function shouldWarn() {
  var answer = !haveWarned;

  if (!(0, _apolloUtilities.isTest)()) {
    haveWarned = true;
  }

  return answer;
}

var HeuristicFragmentMatcher = function () {
  function HeuristicFragmentMatcher() {}

  HeuristicFragmentMatcher.prototype.ensureReady = function () {
    return Promise.resolve();
  };

  HeuristicFragmentMatcher.prototype.canBypassInit = function () {
    return true;
  };

  HeuristicFragmentMatcher.prototype.match = function (idValue, typeCondition, context) {
    var obj = context.store.get(idValue.id);
    var isRootQuery = idValue.id === 'ROOT_QUERY';

    if (!obj) {
      return isRootQuery;
    }

    var _a = obj.__typename,
        __typename = _a === void 0 ? isRootQuery && 'Query' : _a;

    if (!__typename) {
      if (shouldWarn()) {
        process.env.NODE_ENV === "production" || _tsInvariant.invariant.warn("You're using fragments in your queries, but either don't have the addTypename:\n  true option set in Apollo Client, or you are trying to write a fragment to the store without the __typename.\n   Please turn on the addTypename option and include __typename when writing fragments so that Apollo Client\n   can accurately match fragments.");
        process.env.NODE_ENV === "production" || _tsInvariant.invariant.warn('Could not find __typename on Fragment ', typeCondition, obj);
        process.env.NODE_ENV === "production" || _tsInvariant.invariant.warn("DEPRECATION WARNING: using fragments without __typename is unsupported behavior " + "and will be removed in future versions of Apollo client. You should fix this and set addTypename to true now.");
      }

      return 'heuristic';
    }

    if (__typename === typeCondition) {
      return true;
    }

    if (shouldWarn()) {
      process.env.NODE_ENV === "production" || _tsInvariant.invariant.error('You are using the simple (heuristic) fragment matcher, but your ' + 'queries contain union or interface types. Apollo Client will not be ' + 'able to accurately map fragments. To make this error go away, use ' + 'the `IntrospectionFragmentMatcher` as described in the docs: ' + 'https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher');
    }

    return 'heuristic';
  };

  return HeuristicFragmentMatcher;
}();

exports.HeuristicFragmentMatcher = HeuristicFragmentMatcher;

var IntrospectionFragmentMatcher = function () {
  function IntrospectionFragmentMatcher(options) {
    if (options && options.introspectionQueryResultData) {
      this.possibleTypesMap = this.parseIntrospectionResult(options.introspectionQueryResultData);
      this.isReady = true;
    } else {
      this.isReady = false;
    }

    this.match = this.match.bind(this);
  }

  IntrospectionFragmentMatcher.prototype.match = function (idValue, typeCondition, context) {
    process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(this.isReady, 1) : (0, _tsInvariant.invariant)(this.isReady, 'FragmentMatcher.match() was called before FragmentMatcher.init()');
    var obj = context.store.get(idValue.id);
    var isRootQuery = idValue.id === 'ROOT_QUERY';

    if (!obj) {
      return isRootQuery;
    }

    var _a = obj.__typename,
        __typename = _a === void 0 ? isRootQuery && 'Query' : _a;

    process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(__typename, 2) : (0, _tsInvariant.invariant)(__typename, "Cannot match fragment because __typename property is missing: " + JSON.stringify(obj));

    if (__typename === typeCondition) {
      return true;
    }

    var implementingTypes = this.possibleTypesMap[typeCondition];

    if (__typename && implementingTypes && implementingTypes.indexOf(__typename) > -1) {
      return true;
    }

    return false;
  };

  IntrospectionFragmentMatcher.prototype.parseIntrospectionResult = function (introspectionResultData) {
    var typeMap = {};

    introspectionResultData.__schema.types.forEach(function (type) {
      if (type.kind === 'UNION' || type.kind === 'INTERFACE') {
        typeMap[type.name] = type.possibleTypes.map(function (implementingType) {
          return implementingType.name;
        });
      }
    });

    return typeMap;
  };

  return IntrospectionFragmentMatcher;
}();

exports.IntrospectionFragmentMatcher = IntrospectionFragmentMatcher;
var hasOwn = Object.prototype.hasOwnProperty;

var DepTrackingCache = function () {
  function DepTrackingCache(data) {
    var _this = this;

    if (data === void 0) {
      data = Object.create(null);
    }

    this.data = data;
    this.depend = (0, _optimism.wrap)(function (dataId) {
      return _this.data[dataId];
    }, {
      disposable: true,
      makeCacheKey: function (dataId) {
        return dataId;
      }
    });
  }

  DepTrackingCache.prototype.toObject = function () {
    return this.data;
  };

  DepTrackingCache.prototype.get = function (dataId) {
    this.depend(dataId);
    return this.data[dataId];
  };

  DepTrackingCache.prototype.set = function (dataId, value) {
    var oldValue = this.data[dataId];

    if (value !== oldValue) {
      this.data[dataId] = value;
      this.depend.dirty(dataId);
    }
  };

  DepTrackingCache.prototype.delete = function (dataId) {
    if (hasOwn.call(this.data, dataId)) {
      delete this.data[dataId];
      this.depend.dirty(dataId);
    }
  };

  DepTrackingCache.prototype.clear = function () {
    this.replace(null);
  };

  DepTrackingCache.prototype.replace = function (newData) {
    var _this = this;

    if (newData) {
      Object.keys(newData).forEach(function (dataId) {
        _this.set(dataId, newData[dataId]);
      });
      Object.keys(this.data).forEach(function (dataId) {
        if (!hasOwn.call(newData, dataId)) {
          _this.delete(dataId);
        }
      });
    } else {
      Object.keys(this.data).forEach(function (dataId) {
        _this.delete(dataId);
      });
    }
  };

  return DepTrackingCache;
}();

function defaultNormalizedCacheFactory(seed) {
  return new DepTrackingCache(seed);
}

var StoreReader = function () {
  function StoreReader(_a) {
    var _this = this;

    var _b = _a === void 0 ? {} : _a,
        _c = _b.cacheKeyRoot,
        cacheKeyRoot = _c === void 0 ? new _optimism.KeyTrie(_apolloUtilities.canUseWeakMap) : _c,
        _d = _b.freezeResults,
        freezeResults = _d === void 0 ? false : _d;

    var _e = this,
        executeStoreQuery = _e.executeStoreQuery,
        executeSelectionSet = _e.executeSelectionSet,
        executeSubSelectedArray = _e.executeSubSelectedArray;

    this.freezeResults = freezeResults;
    this.executeStoreQuery = (0, _optimism.wrap)(function (options) {
      return executeStoreQuery.call(_this, options);
    }, {
      makeCacheKey: function (_a) {
        var query = _a.query,
            rootValue = _a.rootValue,
            contextValue = _a.contextValue,
            variableValues = _a.variableValues,
            fragmentMatcher = _a.fragmentMatcher;

        if (contextValue.store instanceof DepTrackingCache) {
          return cacheKeyRoot.lookup(contextValue.store, query, fragmentMatcher, JSON.stringify(variableValues), rootValue.id);
        }
      }
    });
    this.executeSelectionSet = (0, _optimism.wrap)(function (options) {
      return executeSelectionSet.call(_this, options);
    }, {
      makeCacheKey: function (_a) {
        var selectionSet = _a.selectionSet,
            rootValue = _a.rootValue,
            execContext = _a.execContext;

        if (execContext.contextValue.store instanceof DepTrackingCache) {
          return cacheKeyRoot.lookup(execContext.contextValue.store, selectionSet, execContext.fragmentMatcher, JSON.stringify(execContext.variableValues), rootValue.id);
        }
      }
    });
    this.executeSubSelectedArray = (0, _optimism.wrap)(function (options) {
      return executeSubSelectedArray.call(_this, options);
    }, {
      makeCacheKey: function (_a) {
        var field = _a.field,
            array = _a.array,
            execContext = _a.execContext;

        if (execContext.contextValue.store instanceof DepTrackingCache) {
          return cacheKeyRoot.lookup(execContext.contextValue.store, field, array, JSON.stringify(execContext.variableValues));
        }
      }
    });
  }

  StoreReader.prototype.readQueryFromStore = function (options) {
    return this.diffQueryAgainstStore((0, _tslib.__assign)((0, _tslib.__assign)({}, options), {
      returnPartialData: false
    })).result;
  };

  StoreReader.prototype.diffQueryAgainstStore = function (_a) {
    var store = _a.store,
        query = _a.query,
        variables = _a.variables,
        previousResult = _a.previousResult,
        _b = _a.returnPartialData,
        returnPartialData = _b === void 0 ? true : _b,
        _c = _a.rootId,
        rootId = _c === void 0 ? 'ROOT_QUERY' : _c,
        fragmentMatcherFunction = _a.fragmentMatcherFunction,
        config = _a.config;
    var queryDefinition = (0, _apolloUtilities.getQueryDefinition)(query);
    variables = (0, _apolloUtilities.assign)({}, (0, _apolloUtilities.getDefaultValues)(queryDefinition), variables);
    var context = {
      store: store,
      dataIdFromObject: config && config.dataIdFromObject,
      cacheRedirects: config && config.cacheRedirects || {}
    };
    var execResult = this.executeStoreQuery({
      query: query,
      rootValue: {
        type: 'id',
        id: rootId,
        generated: true,
        typename: 'Query'
      },
      contextValue: context,
      variableValues: variables,
      fragmentMatcher: fragmentMatcherFunction
    });
    var hasMissingFields = execResult.missing && execResult.missing.length > 0;

    if (hasMissingFields && !returnPartialData) {
      execResult.missing.forEach(function (info) {
        if (info.tolerable) return;
        throw process.env.NODE_ENV === "production" ? new _tsInvariant.InvariantError(8) : new _tsInvariant.InvariantError("Can't find field " + info.fieldName + " on object " + JSON.stringify(info.object, null, 2) + ".");
      });
    }

    if (previousResult) {
      if ((0, _apolloUtilities.isEqual)(previousResult, execResult.result)) {
        execResult.result = previousResult;
      }
    }

    return {
      result: execResult.result,
      complete: !hasMissingFields
    };
  };

  StoreReader.prototype.executeStoreQuery = function (_a) {
    var query = _a.query,
        rootValue = _a.rootValue,
        contextValue = _a.contextValue,
        variableValues = _a.variableValues,
        _b = _a.fragmentMatcher,
        fragmentMatcher = _b === void 0 ? defaultFragmentMatcher : _b;
    var mainDefinition = (0, _apolloUtilities.getMainDefinition)(query);
    var fragments = (0, _apolloUtilities.getFragmentDefinitions)(query);
    var fragmentMap = (0, _apolloUtilities.createFragmentMap)(fragments);
    var execContext = {
      query: query,
      fragmentMap: fragmentMap,
      contextValue: contextValue,
      variableValues: variableValues,
      fragmentMatcher: fragmentMatcher
    };
    return this.executeSelectionSet({
      selectionSet: mainDefinition.selectionSet,
      rootValue: rootValue,
      execContext: execContext
    });
  };

  StoreReader.prototype.executeSelectionSet = function (_a) {
    var _this = this;

    var selectionSet = _a.selectionSet,
        rootValue = _a.rootValue,
        execContext = _a.execContext;
    var fragmentMap = execContext.fragmentMap,
        contextValue = execContext.contextValue,
        variables = execContext.variableValues;
    var finalResult = {
      result: null
    };
    var objectsToMerge = [];
    var object = contextValue.store.get(rootValue.id);
    var typename = object && object.__typename || rootValue.id === 'ROOT_QUERY' && 'Query' || void 0;

    function handleMissing(result) {
      var _a;

      if (result.missing) {
        finalResult.missing = finalResult.missing || [];

        (_a = finalResult.missing).push.apply(_a, result.missing);
      }

      return result.result;
    }

    selectionSet.selections.forEach(function (selection) {
      var _a;

      if (!(0, _apolloUtilities.shouldInclude)(selection, variables)) {
        return;
      }

      if ((0, _apolloUtilities.isField)(selection)) {
        var fieldResult = handleMissing(_this.executeField(object, typename, selection, execContext));

        if (typeof fieldResult !== 'undefined') {
          objectsToMerge.push((_a = {}, _a[(0, _apolloUtilities.resultKeyNameFromField)(selection)] = fieldResult, _a));
        }
      } else {
        var fragment = void 0;

        if ((0, _apolloUtilities.isInlineFragment)(selection)) {
          fragment = selection;
        } else {
          fragment = fragmentMap[selection.name.value];

          if (!fragment) {
            throw process.env.NODE_ENV === "production" ? new _tsInvariant.InvariantError(9) : new _tsInvariant.InvariantError("No fragment named " + selection.name.value);
          }
        }

        var typeCondition = fragment.typeCondition && fragment.typeCondition.name.value;
        var match = !typeCondition || execContext.fragmentMatcher(rootValue, typeCondition, contextValue);

        if (match) {
          var fragmentExecResult = _this.executeSelectionSet({
            selectionSet: fragment.selectionSet,
            rootValue: rootValue,
            execContext: execContext
          });

          if (match === 'heuristic' && fragmentExecResult.missing) {
            fragmentExecResult = (0, _tslib.__assign)((0, _tslib.__assign)({}, fragmentExecResult), {
              missing: fragmentExecResult.missing.map(function (info) {
                return (0, _tslib.__assign)((0, _tslib.__assign)({}, info), {
                  tolerable: true
                });
              })
            });
          }

          objectsToMerge.push(handleMissing(fragmentExecResult));
        }
      }
    });
    finalResult.result = (0, _apolloUtilities.mergeDeepArray)(objectsToMerge);

    if (this.freezeResults && process.env.NODE_ENV !== 'production') {
      Object.freeze(finalResult.result);
    }

    return finalResult;
  };

  StoreReader.prototype.executeField = function (object, typename, field, execContext) {
    var variables = execContext.variableValues,
        contextValue = execContext.contextValue;
    var fieldName = field.name.value;
    var args = (0, _apolloUtilities.argumentsObjectFromField)(field, variables);
    var info = {
      resultKey: (0, _apolloUtilities.resultKeyNameFromField)(field),
      directives: (0, _apolloUtilities.getDirectiveInfoFromField)(field, variables)
    };
    var readStoreResult = readStoreResolver(object, typename, fieldName, args, contextValue, info);

    if (Array.isArray(readStoreResult.result)) {
      return this.combineExecResults(readStoreResult, this.executeSubSelectedArray({
        field: field,
        array: readStoreResult.result,
        execContext: execContext
      }));
    }

    if (!field.selectionSet) {
      assertSelectionSetForIdValue(field, readStoreResult.result);

      if (this.freezeResults && process.env.NODE_ENV !== 'production') {
        (0, _apolloUtilities.maybeDeepFreeze)(readStoreResult);
      }

      return readStoreResult;
    }

    if (readStoreResult.result == null) {
      return readStoreResult;
    }

    return this.combineExecResults(readStoreResult, this.executeSelectionSet({
      selectionSet: field.selectionSet,
      rootValue: readStoreResult.result,
      execContext: execContext
    }));
  };

  StoreReader.prototype.combineExecResults = function () {
    var execResults = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      execResults[_i] = arguments[_i];
    }

    var missing;
    execResults.forEach(function (execResult) {
      if (execResult.missing) {
        missing = missing || [];
        missing.push.apply(missing, execResult.missing);
      }
    });
    return {
      result: execResults.pop().result,
      missing: missing
    };
  };

  StoreReader.prototype.executeSubSelectedArray = function (_a) {
    var _this = this;

    var field = _a.field,
        array = _a.array,
        execContext = _a.execContext;
    var missing;

    function handleMissing(childResult) {
      if (childResult.missing) {
        missing = missing || [];
        missing.push.apply(missing, childResult.missing);
      }

      return childResult.result;
    }

    array = array.map(function (item) {
      if (item === null) {
        return null;
      }

      if (Array.isArray(item)) {
        return handleMissing(_this.executeSubSelectedArray({
          field: field,
          array: item,
          execContext: execContext
        }));
      }

      if (field.selectionSet) {
        return handleMissing(_this.executeSelectionSet({
          selectionSet: field.selectionSet,
          rootValue: item,
          execContext: execContext
        }));
      }

      assertSelectionSetForIdValue(field, item);
      return item;
    });

    if (this.freezeResults && process.env.NODE_ENV !== 'production') {
      Object.freeze(array);
    }

    return {
      result: array,
      missing: missing
    };
  };

  return StoreReader;
}();

exports.StoreReader = StoreReader;

function assertSelectionSetForIdValue(field, value) {
  if (!field.selectionSet && (0, _apolloUtilities.isIdValue)(value)) {
    throw process.env.NODE_ENV === "production" ? new _tsInvariant.InvariantError(10) : new _tsInvariant.InvariantError("Missing selection set for object of type " + value.typename + " returned for query field " + field.name.value);
  }
}

function defaultFragmentMatcher() {
  return true;
}

function assertIdValue(idValue) {
  process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)((0, _apolloUtilities.isIdValue)(idValue), 11) : (0, _tsInvariant.invariant)((0, _apolloUtilities.isIdValue)(idValue), "Encountered a sub-selection on the query, but the store doesn't have an object reference. This should never happen during normal use unless you have custom code that is directly manipulating the store; please file an issue.");
}

function readStoreResolver(object, typename, fieldName, args, context, _a) {
  var resultKey = _a.resultKey,
      directives = _a.directives;
  var storeKeyName = fieldName;

  if (args || directives) {
    storeKeyName = (0, _apolloUtilities.getStoreKeyName)(storeKeyName, args, directives);
  }

  var fieldValue = void 0;

  if (object) {
    fieldValue = object[storeKeyName];

    if (typeof fieldValue === 'undefined' && context.cacheRedirects && typeof typename === 'string') {
      var type = context.cacheRedirects[typename];

      if (type) {
        var resolver = type[fieldName];

        if (resolver) {
          fieldValue = resolver(object, args, {
            getCacheKey: function (storeObj) {
              var id = context.dataIdFromObject(storeObj);
              return id && (0, _apolloUtilities.toIdValue)({
                id: id,
                typename: storeObj.__typename
              });
            }
          });
        }
      }
    }
  }

  if (typeof fieldValue === 'undefined') {
    return {
      result: fieldValue,
      missing: [{
        object: object,
        fieldName: storeKeyName,
        tolerable: false
      }]
    };
  }

  if ((0, _apolloUtilities.isJsonValue)(fieldValue)) {
    fieldValue = fieldValue.json;
  }

  return {
    result: fieldValue
  };
}

var ObjectCache = function () {
  function ObjectCache(data) {
    if (data === void 0) {
      data = Object.create(null);
    }

    this.data = data;
  }

  ObjectCache.prototype.toObject = function () {
    return this.data;
  };

  ObjectCache.prototype.get = function (dataId) {
    return this.data[dataId];
  };

  ObjectCache.prototype.set = function (dataId, value) {
    this.data[dataId] = value;
  };

  ObjectCache.prototype.delete = function (dataId) {
    this.data[dataId] = void 0;
  };

  ObjectCache.prototype.clear = function () {
    this.data = Object.create(null);
  };

  ObjectCache.prototype.replace = function (newData) {
    this.data = newData || Object.create(null);
  };

  return ObjectCache;
}();

exports.ObjectCache = ObjectCache;

function defaultNormalizedCacheFactory$1(seed) {
  return new ObjectCache(seed);
}

var WriteError = function (_super) {
  (0, _tslib.__extends)(WriteError, _super);

  function WriteError() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = 'WriteError';
    return _this;
  }

  return WriteError;
}(Error);

exports.WriteError = WriteError;

function enhanceErrorWithDocument(error, document) {
  var enhancedError = new WriteError("Error writing result to store for query:\n " + JSON.stringify(document));
  enhancedError.message += '\n' + error.message;
  enhancedError.stack = error.stack;
  return enhancedError;
}

var StoreWriter = function () {
  function StoreWriter() {}

  StoreWriter.prototype.writeQueryToStore = function (_a) {
    var query = _a.query,
        result = _a.result,
        _b = _a.store,
        store = _b === void 0 ? defaultNormalizedCacheFactory() : _b,
        variables = _a.variables,
        dataIdFromObject = _a.dataIdFromObject,
        fragmentMatcherFunction = _a.fragmentMatcherFunction;
    return this.writeResultToStore({
      dataId: 'ROOT_QUERY',
      result: result,
      document: query,
      store: store,
      variables: variables,
      dataIdFromObject: dataIdFromObject,
      fragmentMatcherFunction: fragmentMatcherFunction
    });
  };

  StoreWriter.prototype.writeResultToStore = function (_a) {
    var dataId = _a.dataId,
        result = _a.result,
        document = _a.document,
        _b = _a.store,
        store = _b === void 0 ? defaultNormalizedCacheFactory() : _b,
        variables = _a.variables,
        dataIdFromObject = _a.dataIdFromObject,
        fragmentMatcherFunction = _a.fragmentMatcherFunction;
    var operationDefinition = (0, _apolloUtilities.getOperationDefinition)(document);

    try {
      return this.writeSelectionSetToStore({
        result: result,
        dataId: dataId,
        selectionSet: operationDefinition.selectionSet,
        context: {
          store: store,
          processedData: {},
          variables: (0, _apolloUtilities.assign)({}, (0, _apolloUtilities.getDefaultValues)(operationDefinition), variables),
          dataIdFromObject: dataIdFromObject,
          fragmentMap: (0, _apolloUtilities.createFragmentMap)((0, _apolloUtilities.getFragmentDefinitions)(document)),
          fragmentMatcherFunction: fragmentMatcherFunction
        }
      });
    } catch (e) {
      throw enhanceErrorWithDocument(e, document);
    }
  };

  StoreWriter.prototype.writeSelectionSetToStore = function (_a) {
    var _this = this;

    var result = _a.result,
        dataId = _a.dataId,
        selectionSet = _a.selectionSet,
        context = _a.context;
    var variables = context.variables,
        store = context.store,
        fragmentMap = context.fragmentMap;
    selectionSet.selections.forEach(function (selection) {
      var _a;

      if (!(0, _apolloUtilities.shouldInclude)(selection, variables)) {
        return;
      }

      if ((0, _apolloUtilities.isField)(selection)) {
        var resultFieldKey = (0, _apolloUtilities.resultKeyNameFromField)(selection);
        var value = result[resultFieldKey];

        if (typeof value !== 'undefined') {
          _this.writeFieldToStore({
            dataId: dataId,
            value: value,
            field: selection,
            context: context
          });
        } else {
          var isDefered = false;
          var isClient = false;

          if (selection.directives && selection.directives.length) {
            isDefered = selection.directives.some(function (directive) {
              return directive.name && directive.name.value === 'defer';
            });
            isClient = selection.directives.some(function (directive) {
              return directive.name && directive.name.value === 'client';
            });
          }

          if (!isDefered && !isClient && context.fragmentMatcherFunction) {
            process.env.NODE_ENV === "production" || _tsInvariant.invariant.warn("Missing field " + resultFieldKey + " in " + JSON.stringify(result, null, 2).substring(0, 100));
          }
        }
      } else {
        var fragment = void 0;

        if ((0, _apolloUtilities.isInlineFragment)(selection)) {
          fragment = selection;
        } else {
          fragment = (fragmentMap || {})[selection.name.value];
          process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(fragment, 3) : (0, _tsInvariant.invariant)(fragment, "No fragment named " + selection.name.value + ".");
        }

        var matches = true;

        if (context.fragmentMatcherFunction && fragment.typeCondition) {
          var id = dataId || 'self';
          var idValue = (0, _apolloUtilities.toIdValue)({
            id: id,
            typename: undefined
          });
          var fakeContext = {
            store: new ObjectCache((_a = {}, _a[id] = result, _a)),
            cacheRedirects: {}
          };
          var match = context.fragmentMatcherFunction(idValue, fragment.typeCondition.name.value, fakeContext);

          if (!(0, _apolloUtilities.isProduction)() && match === 'heuristic') {
            process.env.NODE_ENV === "production" || _tsInvariant.invariant.error('WARNING: heuristic fragment matching going on!');
          }

          matches = !!match;
        }

        if (matches) {
          _this.writeSelectionSetToStore({
            result: result,
            selectionSet: fragment.selectionSet,
            dataId: dataId,
            context: context
          });
        }
      }
    });
    return store;
  };

  StoreWriter.prototype.writeFieldToStore = function (_a) {
    var _b;

    var field = _a.field,
        value = _a.value,
        dataId = _a.dataId,
        context = _a.context;
    var variables = context.variables,
        dataIdFromObject = context.dataIdFromObject,
        store = context.store;
    var storeValue;
    var storeObject;
    var storeFieldName = (0, _apolloUtilities.storeKeyNameFromField)(field, variables);

    if (!field.selectionSet || value === null) {
      storeValue = value != null && typeof value === 'object' ? {
        type: 'json',
        json: value
      } : value;
    } else if (Array.isArray(value)) {
      var generatedId = dataId + "." + storeFieldName;
      storeValue = this.processArrayValue(value, generatedId, field.selectionSet, context);
    } else {
      var valueDataId = dataId + "." + storeFieldName;
      var generated = true;

      if (!isGeneratedId(valueDataId)) {
        valueDataId = '$' + valueDataId;
      }

      if (dataIdFromObject) {
        var semanticId = dataIdFromObject(value);
        process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(!semanticId || !isGeneratedId(semanticId), 4) : (0, _tsInvariant.invariant)(!semanticId || !isGeneratedId(semanticId), 'IDs returned by dataIdFromObject cannot begin with the "$" character.');

        if (semanticId || typeof semanticId === 'number' && semanticId === 0) {
          valueDataId = semanticId;
          generated = false;
        }
      }

      if (!isDataProcessed(valueDataId, field, context.processedData)) {
        this.writeSelectionSetToStore({
          dataId: valueDataId,
          result: value,
          selectionSet: field.selectionSet,
          context: context
        });
      }

      var typename = value.__typename;
      storeValue = (0, _apolloUtilities.toIdValue)({
        id: valueDataId,
        typename: typename
      }, generated);
      storeObject = store.get(dataId);
      var escapedId = storeObject && storeObject[storeFieldName];

      if (escapedId !== storeValue && (0, _apolloUtilities.isIdValue)(escapedId)) {
        var hadTypename = escapedId.typename !== undefined;
        var hasTypename = typename !== undefined;
        var typenameChanged = hadTypename && hasTypename && escapedId.typename !== typename;
        process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(!generated || escapedId.generated || typenameChanged, 5) : (0, _tsInvariant.invariant)(!generated || escapedId.generated || typenameChanged, "Store error: the application attempted to write an object with no provided id but the store already contains an id of " + escapedId.id + " for this object. The selectionSet that was trying to be written is:\n" + JSON.stringify(field));
        process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(!hadTypename || hasTypename, 6) : (0, _tsInvariant.invariant)(!hadTypename || hasTypename, "Store error: the application attempted to write an object with no provided typename but the store already contains an object with typename of " + escapedId.typename + " for the object of id " + escapedId.id + ". The selectionSet that was trying to be written is:\n" + JSON.stringify(field));

        if (escapedId.generated) {
          if (typenameChanged) {
            if (!generated) {
              store.delete(escapedId.id);
            }
          } else {
            mergeWithGenerated(escapedId.id, storeValue.id, store);
          }
        }
      }
    }

    storeObject = store.get(dataId);

    if (!storeObject || !(0, _apolloUtilities.isEqual)(storeValue, storeObject[storeFieldName])) {
      store.set(dataId, (0, _tslib.__assign)((0, _tslib.__assign)({}, storeObject), (_b = {}, _b[storeFieldName] = storeValue, _b)));
    }
  };

  StoreWriter.prototype.processArrayValue = function (value, generatedId, selectionSet, context) {
    var _this = this;

    return value.map(function (item, index) {
      if (item === null) {
        return null;
      }

      var itemDataId = generatedId + "." + index;

      if (Array.isArray(item)) {
        return _this.processArrayValue(item, itemDataId, selectionSet, context);
      }

      var generated = true;

      if (context.dataIdFromObject) {
        var semanticId = context.dataIdFromObject(item);

        if (semanticId) {
          itemDataId = semanticId;
          generated = false;
        }
      }

      if (!isDataProcessed(itemDataId, selectionSet, context.processedData)) {
        _this.writeSelectionSetToStore({
          dataId: itemDataId,
          result: item,
          selectionSet: selectionSet,
          context: context
        });
      }

      return (0, _apolloUtilities.toIdValue)({
        id: itemDataId,
        typename: item.__typename
      }, generated);
    });
  };

  return StoreWriter;
}();

exports.StoreWriter = StoreWriter;

function isGeneratedId(id) {
  return id[0] === '$';
}

function mergeWithGenerated(generatedKey, realKey, cache) {
  if (generatedKey === realKey) {
    return false;
  }

  var generated = cache.get(generatedKey);
  var real = cache.get(realKey);
  var madeChanges = false;
  Object.keys(generated).forEach(function (key) {
    var value = generated[key];
    var realValue = real[key];

    if ((0, _apolloUtilities.isIdValue)(value) && isGeneratedId(value.id) && (0, _apolloUtilities.isIdValue)(realValue) && !(0, _apolloUtilities.isEqual)(value, realValue) && mergeWithGenerated(value.id, realValue.id, cache)) {
      madeChanges = true;
    }
  });
  cache.delete(generatedKey);
  var newRealValue = (0, _tslib.__assign)((0, _tslib.__assign)({}, generated), real);

  if ((0, _apolloUtilities.isEqual)(newRealValue, real)) {
    return madeChanges;
  }

  cache.set(realKey, newRealValue);
  return true;
}

function isDataProcessed(dataId, field, processedData) {
  if (!processedData) {
    return false;
  }

  if (processedData[dataId]) {
    if (processedData[dataId].indexOf(field) >= 0) {
      return true;
    } else {
      processedData[dataId].push(field);
    }
  } else {
    processedData[dataId] = [field];
  }

  return false;
}

var defaultConfig = {
  fragmentMatcher: new HeuristicFragmentMatcher(),
  dataIdFromObject: defaultDataIdFromObject,
  addTypename: true,
  resultCaching: true,
  freezeResults: false
};

function defaultDataIdFromObject(result) {
  if (result.__typename) {
    if (result.id !== undefined) {
      return result.__typename + ":" + result.id;
    }

    if (result._id !== undefined) {
      return result.__typename + ":" + result._id;
    }
  }

  return null;
}

var hasOwn$1 = Object.prototype.hasOwnProperty;

var OptimisticCacheLayer = function (_super) {
  (0, _tslib.__extends)(OptimisticCacheLayer, _super);

  function OptimisticCacheLayer(optimisticId, parent, transaction) {
    var _this = _super.call(this, Object.create(null)) || this;

    _this.optimisticId = optimisticId;
    _this.parent = parent;
    _this.transaction = transaction;
    return _this;
  }

  OptimisticCacheLayer.prototype.toObject = function () {
    return (0, _tslib.__assign)((0, _tslib.__assign)({}, this.parent.toObject()), this.data);
  };

  OptimisticCacheLayer.prototype.get = function (dataId) {
    return hasOwn$1.call(this.data, dataId) ? this.data[dataId] : this.parent.get(dataId);
  };

  return OptimisticCacheLayer;
}(ObjectCache);

var InMemoryCache = function (_super) {
  (0, _tslib.__extends)(InMemoryCache, _super);

  function InMemoryCache(config) {
    if (config === void 0) {
      config = {};
    }

    var _this = _super.call(this) || this;

    _this.watches = new Set();
    _this.typenameDocumentCache = new Map();
    _this.cacheKeyRoot = new _optimism.KeyTrie(_apolloUtilities.canUseWeakMap);
    _this.silenceBroadcast = false;
    _this.config = (0, _tslib.__assign)((0, _tslib.__assign)({}, defaultConfig), config);

    if (_this.config.customResolvers) {
      process.env.NODE_ENV === "production" || _tsInvariant.invariant.warn('customResolvers have been renamed to cacheRedirects. Please update your config as we will be deprecating customResolvers in the next major version.');
      _this.config.cacheRedirects = _this.config.customResolvers;
    }

    if (_this.config.cacheResolvers) {
      process.env.NODE_ENV === "production" || _tsInvariant.invariant.warn('cacheResolvers have been renamed to cacheRedirects. Please update your config as we will be deprecating cacheResolvers in the next major version.');
      _this.config.cacheRedirects = _this.config.cacheResolvers;
    }

    _this.addTypename = !!_this.config.addTypename;
    _this.data = _this.config.resultCaching ? new DepTrackingCache() : new ObjectCache();
    _this.optimisticData = _this.data;
    _this.storeWriter = new StoreWriter();
    _this.storeReader = new StoreReader({
      cacheKeyRoot: _this.cacheKeyRoot,
      freezeResults: config.freezeResults
    });
    var cache = _this;
    var maybeBroadcastWatch = cache.maybeBroadcastWatch;
    _this.maybeBroadcastWatch = (0, _optimism.wrap)(function (c) {
      return maybeBroadcastWatch.call(_this, c);
    }, {
      makeCacheKey: function (c) {
        if (c.optimistic) {
          return;
        }

        if (c.previousResult) {
          return;
        }

        if (cache.data instanceof DepTrackingCache) {
          return cache.cacheKeyRoot.lookup(c.query, JSON.stringify(c.variables));
        }
      }
    });
    return _this;
  }

  InMemoryCache.prototype.restore = function (data) {
    if (data) this.data.replace(data);
    return this;
  };

  InMemoryCache.prototype.extract = function (optimistic) {
    if (optimistic === void 0) {
      optimistic = false;
    }

    return (optimistic ? this.optimisticData : this.data).toObject();
  };

  InMemoryCache.prototype.read = function (options) {
    if (typeof options.rootId === 'string' && typeof this.data.get(options.rootId) === 'undefined') {
      return null;
    }

    var fragmentMatcher = this.config.fragmentMatcher;
    var fragmentMatcherFunction = fragmentMatcher && fragmentMatcher.match;
    return this.storeReader.readQueryFromStore({
      store: options.optimistic ? this.optimisticData : this.data,
      query: this.transformDocument(options.query),
      variables: options.variables,
      rootId: options.rootId,
      fragmentMatcherFunction: fragmentMatcherFunction,
      previousResult: options.previousResult,
      config: this.config
    }) || null;
  };

  InMemoryCache.prototype.write = function (write) {
    var fragmentMatcher = this.config.fragmentMatcher;
    var fragmentMatcherFunction = fragmentMatcher && fragmentMatcher.match;
    this.storeWriter.writeResultToStore({
      dataId: write.dataId,
      result: write.result,
      variables: write.variables,
      document: this.transformDocument(write.query),
      store: this.data,
      dataIdFromObject: this.config.dataIdFromObject,
      fragmentMatcherFunction: fragmentMatcherFunction
    });
    this.broadcastWatches();
  };

  InMemoryCache.prototype.diff = function (query) {
    var fragmentMatcher = this.config.fragmentMatcher;
    var fragmentMatcherFunction = fragmentMatcher && fragmentMatcher.match;
    return this.storeReader.diffQueryAgainstStore({
      store: query.optimistic ? this.optimisticData : this.data,
      query: this.transformDocument(query.query),
      variables: query.variables,
      returnPartialData: query.returnPartialData,
      previousResult: query.previousResult,
      fragmentMatcherFunction: fragmentMatcherFunction,
      config: this.config
    });
  };

  InMemoryCache.prototype.watch = function (watch) {
    var _this = this;

    this.watches.add(watch);
    return function () {
      _this.watches.delete(watch);
    };
  };

  InMemoryCache.prototype.evict = function (query) {
    throw process.env.NODE_ENV === "production" ? new _tsInvariant.InvariantError(7) : new _tsInvariant.InvariantError("eviction is not implemented on InMemory Cache");
  };

  InMemoryCache.prototype.reset = function () {
    this.data.clear();
    this.broadcastWatches();
    return Promise.resolve();
  };

  InMemoryCache.prototype.removeOptimistic = function (idToRemove) {
    var toReapply = [];
    var removedCount = 0;
    var layer = this.optimisticData;

    while (layer instanceof OptimisticCacheLayer) {
      if (layer.optimisticId === idToRemove) {
        ++removedCount;
      } else {
        toReapply.push(layer);
      }

      layer = layer.parent;
    }

    if (removedCount > 0) {
      this.optimisticData = layer;

      while (toReapply.length > 0) {
        var layer_1 = toReapply.pop();
        this.performTransaction(layer_1.transaction, layer_1.optimisticId);
      }

      this.broadcastWatches();
    }
  };

  InMemoryCache.prototype.performTransaction = function (transaction, optimisticId) {
    var _a = this,
        data = _a.data,
        silenceBroadcast = _a.silenceBroadcast;

    this.silenceBroadcast = true;

    if (typeof optimisticId === 'string') {
      this.data = this.optimisticData = new OptimisticCacheLayer(optimisticId, this.optimisticData, transaction);
    }

    try {
      transaction(this);
    } finally {
      this.silenceBroadcast = silenceBroadcast;
      this.data = data;
    }

    this.broadcastWatches();
  };

  InMemoryCache.prototype.recordOptimisticTransaction = function (transaction, id) {
    return this.performTransaction(transaction, id);
  };

  InMemoryCache.prototype.transformDocument = function (document) {
    if (this.addTypename) {
      var result = this.typenameDocumentCache.get(document);

      if (!result) {
        result = (0, _apolloUtilities.addTypenameToDocument)(document);
        this.typenameDocumentCache.set(document, result);
        this.typenameDocumentCache.set(result, result);
      }

      return result;
    }

    return document;
  };

  InMemoryCache.prototype.broadcastWatches = function () {
    var _this = this;

    if (!this.silenceBroadcast) {
      this.watches.forEach(function (c) {
        return _this.maybeBroadcastWatch(c);
      });
    }
  };

  InMemoryCache.prototype.maybeBroadcastWatch = function (c) {
    c.callback(this.diff({
      query: c.query,
      variables: c.variables,
      previousResult: c.previousResult && c.previousResult(),
      optimistic: c.optimistic
    }));
  };

  return InMemoryCache;
}(_apolloCache.ApolloCache); 


exports.InMemoryCache = InMemoryCache;

}).call(this)}).call(this,require('_process'))
},{"_process":1,"apollo-cache":4,"apollo-utilities":5,"optimism":13,"ts-invariant":14,"tslib":15}]},{},[]);
