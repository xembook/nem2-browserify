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


},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
tslib_1.__exportStar(require("./link"), exports);
var linkUtils_1 = require("./linkUtils");
exports.createOperation = linkUtils_1.createOperation;
exports.makePromise = linkUtils_1.makePromise;
exports.toPromise = linkUtils_1.toPromise;
exports.fromPromise = linkUtils_1.fromPromise;
exports.fromError = linkUtils_1.fromError;
exports.getOperationName = linkUtils_1.getOperationName;
var zen_observable_ts_1 = tslib_1.__importDefault(require("zen-observable-ts"));
exports.Observable = zen_observable_ts_1.default;

},{"./link":4,"./linkUtils":5,"tslib":17,"zen-observable-ts":18}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var zen_observable_ts_1 = tslib_1.__importDefault(require("zen-observable-ts"));
var ts_invariant_1 = require("ts-invariant");
var linkUtils_1 = require("./linkUtils");
function passthrough(op, forward) {
    return forward ? forward(op) : zen_observable_ts_1.default.of();
}
function toLink(handler) {
    return typeof handler === 'function' ? new ApolloLink(handler) : handler;
}
function empty() {
    return new ApolloLink(function () { return zen_observable_ts_1.default.of(); });
}
exports.empty = empty;
function from(links) {
    if (links.length === 0)
        return empty();
    return links.map(toLink).reduce(function (x, y) { return x.concat(y); });
}
exports.from = from;
function split(test, left, right) {
    var leftLink = toLink(left);
    var rightLink = toLink(right || new ApolloLink(passthrough));
    if (linkUtils_1.isTerminating(leftLink) && linkUtils_1.isTerminating(rightLink)) {
        return new ApolloLink(function (operation) {
            return test(operation)
                ? leftLink.request(operation) || zen_observable_ts_1.default.of()
                : rightLink.request(operation) || zen_observable_ts_1.default.of();
        });
    }
    else {
        return new ApolloLink(function (operation, forward) {
            return test(operation)
                ? leftLink.request(operation, forward) || zen_observable_ts_1.default.of()
                : rightLink.request(operation, forward) || zen_observable_ts_1.default.of();
        });
    }
}
exports.split = split;
exports.concat = function (first, second) {
    var firstLink = toLink(first);
    if (linkUtils_1.isTerminating(firstLink)) {
        ts_invariant_1.invariant.warn(new linkUtils_1.LinkError("You are calling concat on a terminating link, which will have no effect", firstLink));
        return firstLink;
    }
    var nextLink = toLink(second);
    if (linkUtils_1.isTerminating(nextLink)) {
        return new ApolloLink(function (operation) {
            return firstLink.request(operation, function (op) { return nextLink.request(op) || zen_observable_ts_1.default.of(); }) || zen_observable_ts_1.default.of();
        });
    }
    else {
        return new ApolloLink(function (operation, forward) {
            return (firstLink.request(operation, function (op) {
                return nextLink.request(op, forward) || zen_observable_ts_1.default.of();
            }) || zen_observable_ts_1.default.of());
        });
    }
};
var ApolloLink = (function () {
    function ApolloLink(request) {
        if (request)
            this.request = request;
    }
    ApolloLink.prototype.split = function (test, left, right) {
        return this.concat(split(test, left, right || new ApolloLink(passthrough)));
    };
    ApolloLink.prototype.concat = function (next) {
        return exports.concat(this, next);
    };
    ApolloLink.prototype.request = function (operation, forward) {
        throw new ts_invariant_1.InvariantError('request is not implemented');
    };
    ApolloLink.empty = empty;
    ApolloLink.from = from;
    ApolloLink.split = split;
    ApolloLink.execute = execute;
    return ApolloLink;
}());
exports.ApolloLink = ApolloLink;
function execute(link, operation) {
    return (link.request(linkUtils_1.createOperation(operation.context, linkUtils_1.transformOperation(linkUtils_1.validateOperation(operation)))) || zen_observable_ts_1.default.of());
}
exports.execute = execute;

},{"./linkUtils":5,"ts-invariant":16,"tslib":17,"zen-observable-ts":18}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var zen_observable_ts_1 = tslib_1.__importDefault(require("zen-observable-ts"));
var apollo_utilities_1 = require("apollo-utilities");
exports.getOperationName = apollo_utilities_1.getOperationName;
var ts_invariant_1 = require("ts-invariant");
function validateOperation(operation) {
    var OPERATION_FIELDS = [
        'query',
        'operationName',
        'variables',
        'extensions',
        'context',
    ];
    for (var _i = 0, _a = Object.keys(operation); _i < _a.length; _i++) {
        var key = _a[_i];
        if (OPERATION_FIELDS.indexOf(key) < 0) {
            throw new ts_invariant_1.InvariantError("illegal argument: " + key);
        }
    }
    return operation;
}
exports.validateOperation = validateOperation;
var LinkError = (function (_super) {
    tslib_1.__extends(LinkError, _super);
    function LinkError(message, link) {
        var _this = _super.call(this, message) || this;
        _this.link = link;
        return _this;
    }
    return LinkError;
}(Error));
exports.LinkError = LinkError;
function isTerminating(link) {
    return link.request.length <= 1;
}
exports.isTerminating = isTerminating;
function toPromise(observable) {
    var completed = false;
    return new Promise(function (resolve, reject) {
        observable.subscribe({
            next: function (data) {
                if (completed) {
                    ts_invariant_1.invariant.warn("Promise Wrapper does not support multiple results from Observable");
                }
                else {
                    completed = true;
                    resolve(data);
                }
            },
            error: reject,
        });
    });
}
exports.toPromise = toPromise;
exports.makePromise = toPromise;
function fromPromise(promise) {
    return new zen_observable_ts_1.default(function (observer) {
        promise
            .then(function (value) {
            observer.next(value);
            observer.complete();
        })
            .catch(observer.error.bind(observer));
    });
}
exports.fromPromise = fromPromise;
function fromError(errorValue) {
    return new zen_observable_ts_1.default(function (observer) {
        observer.error(errorValue);
    });
}
exports.fromError = fromError;
function transformOperation(operation) {
    var transformedOperation = {
        variables: operation.variables || {},
        extensions: operation.extensions || {},
        operationName: operation.operationName,
        query: operation.query,
    };
    if (!transformedOperation.operationName) {
        transformedOperation.operationName =
            typeof transformedOperation.query !== 'string'
                ? apollo_utilities_1.getOperationName(transformedOperation.query)
                : '';
    }
    return transformedOperation;
}
exports.transformOperation = transformOperation;
function createOperation(starting, operation) {
    var context = tslib_1.__assign({}, starting);
    var setContext = function (next) {
        if (typeof next === 'function') {
            context = tslib_1.__assign({}, context, next(context));
        }
        else {
            context = tslib_1.__assign({}, context, next);
        }
    };
    var getContext = function () { return (tslib_1.__assign({}, context)); };
    Object.defineProperty(operation, 'setContext', {
        enumerable: false,
        value: setContext,
    });
    Object.defineProperty(operation, 'getContext', {
        enumerable: false,
        value: getContext,
    });
    Object.defineProperty(operation, 'toKey', {
        enumerable: false,
        value: function () { return getKey(operation); },
    });
    return operation;
}
exports.createOperation = createOperation;
function getKey(operation) {
    var query = operation.query, variables = operation.variables, operationName = operation.operationName;
    return JSON.stringify([operationName, query, variables]);
}
exports.getKey = getKey;

},{"apollo-utilities":6,"ts-invariant":16,"tslib":17,"zen-observable-ts":18}],6:[function(require,module,exports){
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
},{"@wry/equality":2,"_process":1,"fast-json-stable-stringify":7,"graphql/language/visitor":13,"ts-invariant":16,"tslib":17}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{"./invariant.js":10,"./nodejsCustomInspectSymbol.js":11}],9:[function(require,module,exports){
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

},{"./nodejsCustomInspectSymbol.js":11}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')
var nodejsCustomInspectSymbol = typeof Symbol === 'function' && typeof Symbol.for === 'function' ? Symbol.for('nodejs.util.inspect.custom') : undefined;
var _default = nodejsCustomInspectSymbol;
exports.default = _default;

},{}],12:[function(require,module,exports){
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

},{"../jsutils/defineInspect.js":8}],13:[function(require,module,exports){
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

},{"../jsutils/inspect.js":9,"./ast.js":12}],14:[function(require,module,exports){
(function (global){(function (){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = require('./ponyfill.js');

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ponyfill.js":15}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};
},{}],16:[function(require,module,exports){
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
},{"_process":1,"tslib":17}],17:[function(require,module,exports){
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
},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var zenObservable_1 = require("./zenObservable");
tslib_1.__exportStar(require("./zenObservable"), exports);
exports.default = zenObservable_1.Observable;

},{"./zenObservable":19,"tslib":17}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var zen_observable_1 = tslib_1.__importDefault(require("zen-observable"));
exports.Observable = zen_observable_1.default;

},{"tslib":17,"zen-observable":20}],20:[function(require,module,exports){
module.exports = require('./lib/Observable.js').Observable;

},{"./lib/Observable.js":21}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Observable = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// === Symbol Support ===
var hasSymbols = function () {
  return typeof Symbol === 'function';
};

var hasSymbol = function (name) {
  return hasSymbols() && Boolean(Symbol[name]);
};

var getSymbol = function (name) {
  return hasSymbol(name) ? Symbol[name] : '@@' + name;
};

if (hasSymbols() && !hasSymbol('observable')) {
  Symbol.observable = Symbol('observable');
}

var SymbolIterator = getSymbol('iterator');
var SymbolObservable = getSymbol('observable');
var SymbolSpecies = getSymbol('species'); // === Abstract Operations ===

function getMethod(obj, key) {
  var value = obj[key];
  if (value == null) return undefined;
  if (typeof value !== 'function') throw new TypeError(value + ' is not a function');
  return value;
}

function getSpecies(obj) {
  var ctor = obj.constructor;

  if (ctor !== undefined) {
    ctor = ctor[SymbolSpecies];

    if (ctor === null) {
      ctor = undefined;
    }
  }

  return ctor !== undefined ? ctor : Observable;
}

function isObservable(x) {
  return x instanceof Observable; // SPEC: Brand check
}

function hostReportError(e) {
  if (hostReportError.log) {
    hostReportError.log(e);
  } else {
    setTimeout(function () {
      throw e;
    });
  }
}

function enqueue(fn) {
  Promise.resolve().then(function () {
    try {
      fn();
    } catch (e) {
      hostReportError(e);
    }
  });
}

function cleanupSubscription(subscription) {
  var cleanup = subscription._cleanup;
  if (cleanup === undefined) return;
  subscription._cleanup = undefined;

  if (!cleanup) {
    return;
  }

  try {
    if (typeof cleanup === 'function') {
      cleanup();
    } else {
      var unsubscribe = getMethod(cleanup, 'unsubscribe');

      if (unsubscribe) {
        unsubscribe.call(cleanup);
      }
    }
  } catch (e) {
    hostReportError(e);
  }
}

function closeSubscription(subscription) {
  subscription._observer = undefined;
  subscription._queue = undefined;
  subscription._state = 'closed';
}

function flushSubscription(subscription) {
  var queue = subscription._queue;

  if (!queue) {
    return;
  }

  subscription._queue = undefined;
  subscription._state = 'ready';

  for (var i = 0; i < queue.length; ++i) {
    notifySubscription(subscription, queue[i].type, queue[i].value);
    if (subscription._state === 'closed') break;
  }
}

function notifySubscription(subscription, type, value) {
  subscription._state = 'running';
  var observer = subscription._observer;

  try {
    var m = getMethod(observer, type);

    switch (type) {
      case 'next':
        if (m) m.call(observer, value);
        break;

      case 'error':
        closeSubscription(subscription);
        if (m) m.call(observer, value);else throw value;
        break;

      case 'complete':
        closeSubscription(subscription);
        if (m) m.call(observer);
        break;
    }
  } catch (e) {
    hostReportError(e);
  }

  if (subscription._state === 'closed') cleanupSubscription(subscription);else if (subscription._state === 'running') subscription._state = 'ready';
}

function onNotify(subscription, type, value) {
  if (subscription._state === 'closed') return;

  if (subscription._state === 'buffering') {
    subscription._queue.push({
      type: type,
      value: value
    });

    return;
  }

  if (subscription._state !== 'ready') {
    subscription._state = 'buffering';
    subscription._queue = [{
      type: type,
      value: value
    }];
    enqueue(function () {
      return flushSubscription(subscription);
    });
    return;
  }

  notifySubscription(subscription, type, value);
}

var Subscription =
/*#__PURE__*/
function () {
  function Subscription(observer, subscriber) {
    _classCallCheck(this, Subscription);

    // ASSERT: observer is an object
    // ASSERT: subscriber is callable
    this._cleanup = undefined;
    this._observer = observer;
    this._queue = undefined;
    this._state = 'initializing';
    var subscriptionObserver = new SubscriptionObserver(this);

    try {
      this._cleanup = subscriber.call(undefined, subscriptionObserver);
    } catch (e) {
      subscriptionObserver.error(e);
    }

    if (this._state === 'initializing') this._state = 'ready';
  }

  _createClass(Subscription, [{
    key: "unsubscribe",
    value: function unsubscribe() {
      if (this._state !== 'closed') {
        closeSubscription(this);
        cleanupSubscription(this);
      }
    }
  }, {
    key: "closed",
    get: function () {
      return this._state === 'closed';
    }
  }]);

  return Subscription;
}();

var SubscriptionObserver =
/*#__PURE__*/
function () {
  function SubscriptionObserver(subscription) {
    _classCallCheck(this, SubscriptionObserver);

    this._subscription = subscription;
  }

  _createClass(SubscriptionObserver, [{
    key: "next",
    value: function next(value) {
      onNotify(this._subscription, 'next', value);
    }
  }, {
    key: "error",
    value: function error(value) {
      onNotify(this._subscription, 'error', value);
    }
  }, {
    key: "complete",
    value: function complete() {
      onNotify(this._subscription, 'complete');
    }
  }, {
    key: "closed",
    get: function () {
      return this._subscription._state === 'closed';
    }
  }]);

  return SubscriptionObserver;
}();

var Observable =
/*#__PURE__*/
function () {
  function Observable(subscriber) {
    _classCallCheck(this, Observable);

    if (!(this instanceof Observable)) throw new TypeError('Observable cannot be called as a function');
    if (typeof subscriber !== 'function') throw new TypeError('Observable initializer must be a function');
    this._subscriber = subscriber;
  }

  _createClass(Observable, [{
    key: "subscribe",
    value: function subscribe(observer) {
      if (typeof observer !== 'object' || observer === null) {
        observer = {
          next: observer,
          error: arguments[1],
          complete: arguments[2]
        };
      }

      return new Subscription(observer, this._subscriber);
    }
  }, {
    key: "forEach",
    value: function forEach(fn) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (typeof fn !== 'function') {
          reject(new TypeError(fn + ' is not a function'));
          return;
        }

        function done() {
          subscription.unsubscribe();
          resolve();
        }

        var subscription = _this.subscribe({
          next: function (value) {
            try {
              fn(value, done);
            } catch (e) {
              reject(e);
              subscription.unsubscribe();
            }
          },
          error: reject,
          complete: resolve
        });
      });
    }
  }, {
    key: "map",
    value: function map(fn) {
      var _this2 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      return new C(function (observer) {
        return _this2.subscribe({
          next: function (value) {
            try {
              value = fn(value);
            } catch (e) {
              return observer.error(e);
            }

            observer.next(value);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            observer.complete();
          }
        });
      });
    }
  }, {
    key: "filter",
    value: function filter(fn) {
      var _this3 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      return new C(function (observer) {
        return _this3.subscribe({
          next: function (value) {
            try {
              if (!fn(value)) return;
            } catch (e) {
              return observer.error(e);
            }

            observer.next(value);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            observer.complete();
          }
        });
      });
    }
  }, {
    key: "reduce",
    value: function reduce(fn) {
      var _this4 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      var hasSeed = arguments.length > 1;
      var hasValue = false;
      var seed = arguments[1];
      var acc = seed;
      return new C(function (observer) {
        return _this4.subscribe({
          next: function (value) {
            var first = !hasValue;
            hasValue = true;

            if (!first || hasSeed) {
              try {
                acc = fn(acc, value);
              } catch (e) {
                return observer.error(e);
              }
            } else {
              acc = value;
            }
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            if (!hasValue && !hasSeed) return observer.error(new TypeError('Cannot reduce an empty sequence'));
            observer.next(acc);
            observer.complete();
          }
        });
      });
    }
  }, {
    key: "concat",
    value: function concat() {
      var _this5 = this;

      for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
        sources[_key] = arguments[_key];
      }

      var C = getSpecies(this);
      return new C(function (observer) {
        var subscription;
        var index = 0;

        function startNext(next) {
          subscription = next.subscribe({
            next: function (v) {
              observer.next(v);
            },
            error: function (e) {
              observer.error(e);
            },
            complete: function () {
              if (index === sources.length) {
                subscription = undefined;
                observer.complete();
              } else {
                startNext(C.from(sources[index++]));
              }
            }
          });
        }

        startNext(_this5);
        return function () {
          if (subscription) {
            subscription.unsubscribe();
            subscription = undefined;
          }
        };
      });
    }
  }, {
    key: "flatMap",
    value: function flatMap(fn) {
      var _this6 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      return new C(function (observer) {
        var subscriptions = [];

        var outer = _this6.subscribe({
          next: function (value) {
            if (fn) {
              try {
                value = fn(value);
              } catch (e) {
                return observer.error(e);
              }
            }

            var inner = C.from(value).subscribe({
              next: function (value) {
                observer.next(value);
              },
              error: function (e) {
                observer.error(e);
              },
              complete: function () {
                var i = subscriptions.indexOf(inner);
                if (i >= 0) subscriptions.splice(i, 1);
                completeIfDone();
              }
            });
            subscriptions.push(inner);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            completeIfDone();
          }
        });

        function completeIfDone() {
          if (outer.closed && subscriptions.length === 0) observer.complete();
        }

        return function () {
          subscriptions.forEach(function (s) {
            return s.unsubscribe();
          });
          outer.unsubscribe();
        };
      });
    }
  }, {
    key: SymbolObservable,
    value: function () {
      return this;
    }
  }], [{
    key: "from",
    value: function from(x) {
      var C = typeof this === 'function' ? this : Observable;
      if (x == null) throw new TypeError(x + ' is not an object');
      var method = getMethod(x, SymbolObservable);

      if (method) {
        var observable = method.call(x);
        if (Object(observable) !== observable) throw new TypeError(observable + ' is not an object');
        if (isObservable(observable) && observable.constructor === C) return observable;
        return new C(function (observer) {
          return observable.subscribe(observer);
        });
      }

      if (hasSymbol('iterator')) {
        method = getMethod(x, SymbolIterator);

        if (method) {
          return new C(function (observer) {
            enqueue(function () {
              if (observer.closed) return;
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = method.call(x)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var _item = _step.value;
                  observer.next(_item);
                  if (observer.closed) return;
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              observer.complete();
            });
          });
        }
      }

      if (Array.isArray(x)) {
        return new C(function (observer) {
          enqueue(function () {
            if (observer.closed) return;

            for (var i = 0; i < x.length; ++i) {
              observer.next(x[i]);
              if (observer.closed) return;
            }

            observer.complete();
          });
        });
      }

      throw new TypeError(x + ' is not observable');
    }
  }, {
    key: "of",
    value: function of() {
      for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        items[_key2] = arguments[_key2];
      }

      var C = typeof this === 'function' ? this : Observable;
      return new C(function (observer) {
        enqueue(function () {
          if (observer.closed) return;

          for (var i = 0; i < items.length; ++i) {
            observer.next(items[i]);
            if (observer.closed) return;
          }

          observer.complete();
        });
      });
    }
  }, {
    key: SymbolSpecies,
    get: function () {
      return this;
    }
  }]);

  return Observable;
}();

exports.Observable = Observable;

if (hasSymbols()) {
  Object.defineProperty(Observable, Symbol('extensions'), {
    value: {
      symbol: SymbolObservable,
      hostReportError: hostReportError
    },
    configurable: true
  });
}
},{}],"/node_modules/apollo-client":[function(require,module,exports){
(function (process){(function (){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "tslib", "apollo-utilities", "apollo-link", "symbol-observable", "ts-invariant", "graphql/language/visitor"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("tslib"), require("apollo-utilities"), require("apollo-link"), require("symbol-observable"), require("ts-invariant"), require("graphql/language/visitor"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.tslib, global.apolloUtilities, global.apolloLink, global.symbolObservable, global.tsInvariant, global.visitor);
    global.unknown = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _tslib, _apolloUtilities, _apolloLink, _symbolObservable, _tsInvariant, _visitor) {

  _exports.__esModule = true;
  _exports.isApolloError = isApolloError;
  _exports.ObservableQuery = _exports.NetworkStatus = _exports.FetchType = _exports.ApolloError = _exports.ApolloClient = _exports.default = void 0;
  _symbolObservable = _interopRequireDefault(_symbolObservable);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var NetworkStatus;
  _exports.NetworkStatus = NetworkStatus;

  (function (NetworkStatus) {
    NetworkStatus[NetworkStatus["loading"] = 1] = "loading";
    NetworkStatus[NetworkStatus["setVariables"] = 2] = "setVariables";
    NetworkStatus[NetworkStatus["fetchMore"] = 3] = "fetchMore";
    NetworkStatus[NetworkStatus["refetch"] = 4] = "refetch";
    NetworkStatus[NetworkStatus["poll"] = 6] = "poll";
    NetworkStatus[NetworkStatus["ready"] = 7] = "ready";
    NetworkStatus[NetworkStatus["error"] = 8] = "error";
  })(NetworkStatus || (_exports.NetworkStatus = NetworkStatus = {}));

  function isNetworkRequestInFlight(networkStatus) {
    return networkStatus < 7;
  }

  var Observable = function (_super) {
    (0, _tslib.__extends)(Observable, _super);

    function Observable() {
      return _super !== null && _super.apply(this, arguments) || this;
    }

    Observable.prototype[_symbolObservable.default] = function () {
      return this;
    };

    Observable.prototype['@@observable'] = function () {
      return this;
    };

    return Observable;
  }(_apolloLink.Observable);

  function isNonEmptyArray(value) {
    return Array.isArray(value) && value.length > 0;
  }

  function isApolloError(err) {
    return err.hasOwnProperty('graphQLErrors');
  }

  var generateErrorMessage = function (err) {
    var message = '';

    if (isNonEmptyArray(err.graphQLErrors)) {
      err.graphQLErrors.forEach(function (graphQLError) {
        var errorMessage = graphQLError ? graphQLError.message : 'Error message not found.';
        message += "GraphQL error: " + errorMessage + "\n";
      });
    }

    if (err.networkError) {
      message += 'Network error: ' + err.networkError.message + '\n';
    }

    message = message.replace(/\n$/, '');
    return message;
  };

  var ApolloError = function (_super) {
    (0, _tslib.__extends)(ApolloError, _super);

    function ApolloError(_a) {
      var graphQLErrors = _a.graphQLErrors,
          networkError = _a.networkError,
          errorMessage = _a.errorMessage,
          extraInfo = _a.extraInfo;

      var _this = _super.call(this, errorMessage) || this;

      _this.graphQLErrors = graphQLErrors || [];
      _this.networkError = networkError || null;

      if (!errorMessage) {
        _this.message = generateErrorMessage(_this);
      } else {
        _this.message = errorMessage;
      }

      _this.extraInfo = extraInfo;
      _this.__proto__ = ApolloError.prototype;
      return _this;
    }

    return ApolloError;
  }(Error);

  _exports.ApolloError = ApolloError;
  var FetchType;
  _exports.FetchType = FetchType;

  (function (FetchType) {
    FetchType[FetchType["normal"] = 1] = "normal";
    FetchType[FetchType["refetch"] = 2] = "refetch";
    FetchType[FetchType["poll"] = 3] = "poll";
  })(FetchType || (_exports.FetchType = FetchType = {}));

  var hasError = function (storeValue, policy) {
    if (policy === void 0) {
      policy = 'none';
    }

    return storeValue && (storeValue.networkError || policy === 'none' && isNonEmptyArray(storeValue.graphQLErrors));
  };

  var ObservableQuery = function (_super) {
    (0, _tslib.__extends)(ObservableQuery, _super);

    function ObservableQuery(_a) {
      var queryManager = _a.queryManager,
          options = _a.options,
          _b = _a.shouldSubscribe,
          shouldSubscribe = _b === void 0 ? true : _b;

      var _this = _super.call(this, function (observer) {
        return _this.onSubscribe(observer);
      }) || this;

      _this.observers = new Set();
      _this.subscriptions = new Set();
      _this.isTornDown = false;
      _this.options = options;
      _this.variables = options.variables || {};
      _this.queryId = queryManager.generateQueryId();
      _this.shouldSubscribe = shouldSubscribe;
      var opDef = (0, _apolloUtilities.getOperationDefinition)(options.query);
      _this.queryName = opDef && opDef.name && opDef.name.value;
      _this.queryManager = queryManager;
      return _this;
    }

    ObservableQuery.prototype.result = function () {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var observer = {
          next: function (result) {
            resolve(result);

            _this.observers.delete(observer);

            if (!_this.observers.size) {
              _this.queryManager.removeQuery(_this.queryId);
            }

            setTimeout(function () {
              subscription.unsubscribe();
            }, 0);
          },
          error: reject
        };

        var subscription = _this.subscribe(observer);
      });
    };

    ObservableQuery.prototype.currentResult = function () {
      var result = this.getCurrentResult();

      if (result.data === undefined) {
        result.data = {};
      }

      return result;
    };

    ObservableQuery.prototype.getCurrentResult = function () {
      if (this.isTornDown) {
        var lastResult = this.lastResult;
        return {
          data: !this.lastError && lastResult && lastResult.data || void 0,
          error: this.lastError,
          loading: false,
          networkStatus: NetworkStatus.error
        };
      }

      var _a = this.queryManager.getCurrentQueryResult(this),
          data = _a.data,
          partial = _a.partial;

      var queryStoreValue = this.queryManager.queryStore.get(this.queryId);
      var result;
      var fetchPolicy = this.options.fetchPolicy;
      var isNetworkFetchPolicy = fetchPolicy === 'network-only' || fetchPolicy === 'no-cache';

      if (queryStoreValue) {
        var networkStatus = queryStoreValue.networkStatus;

        if (hasError(queryStoreValue, this.options.errorPolicy)) {
          return {
            data: void 0,
            loading: false,
            networkStatus: networkStatus,
            error: new ApolloError({
              graphQLErrors: queryStoreValue.graphQLErrors,
              networkError: queryStoreValue.networkError
            })
          };
        }

        if (queryStoreValue.variables) {
          this.options.variables = (0, _tslib.__assign)((0, _tslib.__assign)({}, this.options.variables), queryStoreValue.variables);
          this.variables = this.options.variables;
        }

        result = {
          data: data,
          loading: isNetworkRequestInFlight(networkStatus),
          networkStatus: networkStatus
        };

        if (queryStoreValue.graphQLErrors && this.options.errorPolicy === 'all') {
          result.errors = queryStoreValue.graphQLErrors;
        }
      } else {
        var loading = isNetworkFetchPolicy || partial && fetchPolicy !== 'cache-only';
        result = {
          data: data,
          loading: loading,
          networkStatus: loading ? NetworkStatus.loading : NetworkStatus.ready
        };
      }

      if (!partial) {
        this.updateLastResult((0, _tslib.__assign)((0, _tslib.__assign)({}, result), {
          stale: false
        }));
      }

      return (0, _tslib.__assign)((0, _tslib.__assign)({}, result), {
        partial: partial
      });
    };

    ObservableQuery.prototype.isDifferentFromLastResult = function (newResult) {
      var snapshot = this.lastResultSnapshot;
      return !(snapshot && newResult && snapshot.networkStatus === newResult.networkStatus && snapshot.stale === newResult.stale && (0, _apolloUtilities.isEqual)(snapshot.data, newResult.data));
    };

    ObservableQuery.prototype.getLastResult = function () {
      return this.lastResult;
    };

    ObservableQuery.prototype.getLastError = function () {
      return this.lastError;
    };

    ObservableQuery.prototype.resetLastResults = function () {
      delete this.lastResult;
      delete this.lastResultSnapshot;
      delete this.lastError;
      this.isTornDown = false;
    };

    ObservableQuery.prototype.resetQueryStoreErrors = function () {
      var queryStore = this.queryManager.queryStore.get(this.queryId);

      if (queryStore) {
        queryStore.networkError = null;
        queryStore.graphQLErrors = [];
      }
    };

    ObservableQuery.prototype.refetch = function (variables) {
      var fetchPolicy = this.options.fetchPolicy;

      if (fetchPolicy === 'cache-only') {
        return Promise.reject(process.env.NODE_ENV === "production" ? new _tsInvariant.InvariantError(1) : new _tsInvariant.InvariantError('cache-only fetchPolicy option should not be used together with query refetch.'));
      }

      if (fetchPolicy !== 'no-cache' && fetchPolicy !== 'cache-and-network') {
        fetchPolicy = 'network-only';
      }

      if (!(0, _apolloUtilities.isEqual)(this.variables, variables)) {
        this.variables = (0, _tslib.__assign)((0, _tslib.__assign)({}, this.variables), variables);
      }

      if (!(0, _apolloUtilities.isEqual)(this.options.variables, this.variables)) {
        this.options.variables = (0, _tslib.__assign)((0, _tslib.__assign)({}, this.options.variables), this.variables);
      }

      return this.queryManager.fetchQuery(this.queryId, (0, _tslib.__assign)((0, _tslib.__assign)({}, this.options), {
        fetchPolicy: fetchPolicy
      }), FetchType.refetch);
    };

    ObservableQuery.prototype.fetchMore = function (fetchMoreOptions) {
      var _this = this;

      process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(fetchMoreOptions.updateQuery, 2) : (0, _tsInvariant.invariant)(fetchMoreOptions.updateQuery, 'updateQuery option is required. This function defines how to update the query data with the new results.');
      var combinedOptions = (0, _tslib.__assign)((0, _tslib.__assign)({}, fetchMoreOptions.query ? fetchMoreOptions : (0, _tslib.__assign)((0, _tslib.__assign)((0, _tslib.__assign)({}, this.options), fetchMoreOptions), {
        variables: (0, _tslib.__assign)((0, _tslib.__assign)({}, this.variables), fetchMoreOptions.variables)
      })), {
        fetchPolicy: 'network-only'
      });
      var qid = this.queryManager.generateQueryId();
      return this.queryManager.fetchQuery(qid, combinedOptions, FetchType.normal, this.queryId).then(function (fetchMoreResult) {
        _this.updateQuery(function (previousResult) {
          return fetchMoreOptions.updateQuery(previousResult, {
            fetchMoreResult: fetchMoreResult.data,
            variables: combinedOptions.variables
          });
        });

        _this.queryManager.stopQuery(qid);

        return fetchMoreResult;
      }, function (error) {
        _this.queryManager.stopQuery(qid);

        throw error;
      });
    };

    ObservableQuery.prototype.subscribeToMore = function (options) {
      var _this = this;

      var subscription = this.queryManager.startGraphQLSubscription({
        query: options.document,
        variables: options.variables
      }).subscribe({
        next: function (subscriptionData) {
          var updateQuery = options.updateQuery;

          if (updateQuery) {
            _this.updateQuery(function (previous, _a) {
              var variables = _a.variables;
              return updateQuery(previous, {
                subscriptionData: subscriptionData,
                variables: variables
              });
            });
          }
        },
        error: function (err) {
          if (options.onError) {
            options.onError(err);
            return;
          }

          process.env.NODE_ENV === "production" || _tsInvariant.invariant.error('Unhandled GraphQL subscription error', err);
        }
      });
      this.subscriptions.add(subscription);
      return function () {
        if (_this.subscriptions.delete(subscription)) {
          subscription.unsubscribe();
        }
      };
    };

    ObservableQuery.prototype.setOptions = function (opts) {
      var oldFetchPolicy = this.options.fetchPolicy;
      this.options = (0, _tslib.__assign)((0, _tslib.__assign)({}, this.options), opts);

      if (opts.pollInterval) {
        this.startPolling(opts.pollInterval);
      } else if (opts.pollInterval === 0) {
        this.stopPolling();
      }

      var fetchPolicy = opts.fetchPolicy;
      return this.setVariables(this.options.variables, oldFetchPolicy !== fetchPolicy && (oldFetchPolicy === 'cache-only' || oldFetchPolicy === 'standby' || fetchPolicy === 'network-only'), opts.fetchResults);
    };

    ObservableQuery.prototype.setVariables = function (variables, tryFetch, fetchResults) {
      if (tryFetch === void 0) {
        tryFetch = false;
      }

      if (fetchResults === void 0) {
        fetchResults = true;
      }

      this.isTornDown = false;
      variables = variables || this.variables;

      if (!tryFetch && (0, _apolloUtilities.isEqual)(variables, this.variables)) {
        return this.observers.size && fetchResults ? this.result() : Promise.resolve();
      }

      this.variables = this.options.variables = variables;

      if (!this.observers.size) {
        return Promise.resolve();
      }

      return this.queryManager.fetchQuery(this.queryId, this.options);
    };

    ObservableQuery.prototype.updateQuery = function (mapFn) {
      var queryManager = this.queryManager;

      var _a = queryManager.getQueryWithPreviousResult(this.queryId),
          previousResult = _a.previousResult,
          variables = _a.variables,
          document = _a.document;

      var newResult = (0, _apolloUtilities.tryFunctionOrLogError)(function () {
        return mapFn(previousResult, {
          variables: variables
        });
      });

      if (newResult) {
        queryManager.dataStore.markUpdateQueryResult(document, variables, newResult);
        queryManager.broadcastQueries();
      }
    };

    ObservableQuery.prototype.stopPolling = function () {
      this.queryManager.stopPollingQuery(this.queryId);
      this.options.pollInterval = undefined;
    };

    ObservableQuery.prototype.startPolling = function (pollInterval) {
      assertNotCacheFirstOrOnly(this);
      this.options.pollInterval = pollInterval;
      this.queryManager.startPollingQuery(this.options, this.queryId);
    };

    ObservableQuery.prototype.updateLastResult = function (newResult) {
      var previousResult = this.lastResult;
      this.lastResult = newResult;
      this.lastResultSnapshot = this.queryManager.assumeImmutableResults ? newResult : (0, _apolloUtilities.cloneDeep)(newResult);
      return previousResult;
    };

    ObservableQuery.prototype.onSubscribe = function (observer) {
      var _this = this;

      try {
        var subObserver = observer._subscription._observer;

        if (subObserver && !subObserver.error) {
          subObserver.error = defaultSubscriptionObserverErrorCallback;
        }
      } catch (_a) {}

      var first = !this.observers.size;
      this.observers.add(observer);
      if (observer.next && this.lastResult) observer.next(this.lastResult);
      if (observer.error && this.lastError) observer.error(this.lastError);

      if (first) {
        this.setUpQuery();
      }

      return function () {
        if (_this.observers.delete(observer) && !_this.observers.size) {
          _this.tearDownQuery();
        }
      };
    };

    ObservableQuery.prototype.setUpQuery = function () {
      var _this = this;

      var _a = this,
          queryManager = _a.queryManager,
          queryId = _a.queryId;

      if (this.shouldSubscribe) {
        queryManager.addObservableQuery(queryId, this);
      }

      if (this.options.pollInterval) {
        assertNotCacheFirstOrOnly(this);
        queryManager.startPollingQuery(this.options, queryId);
      }

      var onError = function (error) {
        _this.updateLastResult((0, _tslib.__assign)((0, _tslib.__assign)({}, _this.lastResult), {
          errors: error.graphQLErrors,
          networkStatus: NetworkStatus.error,
          loading: false
        }));

        iterateObserversSafely(_this.observers, 'error', _this.lastError = error);
      };

      queryManager.observeQuery(queryId, this.options, {
        next: function (result) {
          if (_this.lastError || _this.isDifferentFromLastResult(result)) {
            var previousResult_1 = _this.updateLastResult(result);

            var _a = _this.options,
                query_1 = _a.query,
                variables = _a.variables,
                fetchPolicy_1 = _a.fetchPolicy;

            if (queryManager.transform(query_1).hasClientExports) {
              queryManager.getLocalState().addExportedVariables(query_1, variables).then(function (variables) {
                var previousVariables = _this.variables;
                _this.variables = _this.options.variables = variables;

                if (!result.loading && previousResult_1 && fetchPolicy_1 !== 'cache-only' && queryManager.transform(query_1).serverQuery && !(0, _apolloUtilities.isEqual)(previousVariables, variables)) {
                  _this.refetch();
                } else {
                  iterateObserversSafely(_this.observers, 'next', result);
                }
              });
            } else {
              iterateObserversSafely(_this.observers, 'next', result);
            }
          }
        },
        error: onError
      }).catch(onError);
    };

    ObservableQuery.prototype.tearDownQuery = function () {
      var queryManager = this.queryManager;
      this.isTornDown = true;
      queryManager.stopPollingQuery(this.queryId);
      this.subscriptions.forEach(function (sub) {
        return sub.unsubscribe();
      });
      this.subscriptions.clear();
      queryManager.removeObservableQuery(this.queryId);
      queryManager.stopQuery(this.queryId);
      this.observers.clear();
    };

    return ObservableQuery;
  }(Observable);

  _exports.ObservableQuery = ObservableQuery;

  function defaultSubscriptionObserverErrorCallback(error) {
    process.env.NODE_ENV === "production" || _tsInvariant.invariant.error('Unhandled error', error.message, error.stack);
  }

  function iterateObserversSafely(observers, method, argument) {
    var observersWithMethod = [];
    observers.forEach(function (obs) {
      return obs[method] && observersWithMethod.push(obs);
    });
    observersWithMethod.forEach(function (obs) {
      return obs[method](argument);
    });
  }

  function assertNotCacheFirstOrOnly(obsQuery) {
    var fetchPolicy = obsQuery.options.fetchPolicy;
    process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(fetchPolicy !== 'cache-first' && fetchPolicy !== 'cache-only', 3) : (0, _tsInvariant.invariant)(fetchPolicy !== 'cache-first' && fetchPolicy !== 'cache-only', 'Queries that specify the cache-first and cache-only fetchPolicies cannot also be polling queries.');
  }

  var MutationStore = function () {
    function MutationStore() {
      this.store = {};
    }

    MutationStore.prototype.getStore = function () {
      return this.store;
    };

    MutationStore.prototype.get = function (mutationId) {
      return this.store[mutationId];
    };

    MutationStore.prototype.initMutation = function (mutationId, mutation, variables) {
      this.store[mutationId] = {
        mutation: mutation,
        variables: variables || {},
        loading: true,
        error: null
      };
    };

    MutationStore.prototype.markMutationError = function (mutationId, error) {
      var mutation = this.store[mutationId];

      if (mutation) {
        mutation.loading = false;
        mutation.error = error;
      }
    };

    MutationStore.prototype.markMutationResult = function (mutationId) {
      var mutation = this.store[mutationId];

      if (mutation) {
        mutation.loading = false;
        mutation.error = null;
      }
    };

    MutationStore.prototype.reset = function () {
      this.store = {};
    };

    return MutationStore;
  }();

  var QueryStore = function () {
    function QueryStore() {
      this.store = {};
    }

    QueryStore.prototype.getStore = function () {
      return this.store;
    };

    QueryStore.prototype.get = function (queryId) {
      return this.store[queryId];
    };

    QueryStore.prototype.initQuery = function (query) {
      var previousQuery = this.store[query.queryId];
      process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(!previousQuery || previousQuery.document === query.document || (0, _apolloUtilities.isEqual)(previousQuery.document, query.document), 19) : (0, _tsInvariant.invariant)(!previousQuery || previousQuery.document === query.document || (0, _apolloUtilities.isEqual)(previousQuery.document, query.document), 'Internal Error: may not update existing query string in store');
      var isSetVariables = false;
      var previousVariables = null;

      if (query.storePreviousVariables && previousQuery && previousQuery.networkStatus !== NetworkStatus.loading) {
        if (!(0, _apolloUtilities.isEqual)(previousQuery.variables, query.variables)) {
          isSetVariables = true;
          previousVariables = previousQuery.variables;
        }
      }

      var networkStatus;

      if (isSetVariables) {
        networkStatus = NetworkStatus.setVariables;
      } else if (query.isPoll) {
        networkStatus = NetworkStatus.poll;
      } else if (query.isRefetch) {
        networkStatus = NetworkStatus.refetch;
      } else {
        networkStatus = NetworkStatus.loading;
      }

      var graphQLErrors = [];

      if (previousQuery && previousQuery.graphQLErrors) {
        graphQLErrors = previousQuery.graphQLErrors;
      }

      this.store[query.queryId] = {
        document: query.document,
        variables: query.variables,
        previousVariables: previousVariables,
        networkError: null,
        graphQLErrors: graphQLErrors,
        networkStatus: networkStatus,
        metadata: query.metadata
      };

      if (typeof query.fetchMoreForQueryId === 'string' && this.store[query.fetchMoreForQueryId]) {
        this.store[query.fetchMoreForQueryId].networkStatus = NetworkStatus.fetchMore;
      }
    };

    QueryStore.prototype.markQueryResult = function (queryId, result, fetchMoreForQueryId) {
      if (!this.store || !this.store[queryId]) return;
      this.store[queryId].networkError = null;
      this.store[queryId].graphQLErrors = isNonEmptyArray(result.errors) ? result.errors : [];
      this.store[queryId].previousVariables = null;
      this.store[queryId].networkStatus = NetworkStatus.ready;

      if (typeof fetchMoreForQueryId === 'string' && this.store[fetchMoreForQueryId]) {
        this.store[fetchMoreForQueryId].networkStatus = NetworkStatus.ready;
      }
    };

    QueryStore.prototype.markQueryError = function (queryId, error, fetchMoreForQueryId) {
      if (!this.store || !this.store[queryId]) return;
      this.store[queryId].networkError = error;
      this.store[queryId].networkStatus = NetworkStatus.error;

      if (typeof fetchMoreForQueryId === 'string') {
        this.markQueryResultClient(fetchMoreForQueryId, true);
      }
    };

    QueryStore.prototype.markQueryResultClient = function (queryId, complete) {
      var storeValue = this.store && this.store[queryId];

      if (storeValue) {
        storeValue.networkError = null;
        storeValue.previousVariables = null;

        if (complete) {
          storeValue.networkStatus = NetworkStatus.ready;
        }
      }
    };

    QueryStore.prototype.stopQuery = function (queryId) {
      delete this.store[queryId];
    };

    QueryStore.prototype.reset = function (observableQueryIds) {
      var _this = this;

      Object.keys(this.store).forEach(function (queryId) {
        if (observableQueryIds.indexOf(queryId) < 0) {
          _this.stopQuery(queryId);
        } else {
          _this.store[queryId].networkStatus = NetworkStatus.loading;
        }
      });
    };

    return QueryStore;
  }();

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  var LocalState = function () {
    function LocalState(_a) {
      var cache = _a.cache,
          client = _a.client,
          resolvers = _a.resolvers,
          fragmentMatcher = _a.fragmentMatcher;
      this.cache = cache;

      if (client) {
        this.client = client;
      }

      if (resolvers) {
        this.addResolvers(resolvers);
      }

      if (fragmentMatcher) {
        this.setFragmentMatcher(fragmentMatcher);
      }
    }

    LocalState.prototype.addResolvers = function (resolvers) {
      var _this = this;

      this.resolvers = this.resolvers || {};

      if (Array.isArray(resolvers)) {
        resolvers.forEach(function (resolverGroup) {
          _this.resolvers = (0, _apolloUtilities.mergeDeep)(_this.resolvers, resolverGroup);
        });
      } else {
        this.resolvers = (0, _apolloUtilities.mergeDeep)(this.resolvers, resolvers);
      }
    };

    LocalState.prototype.setResolvers = function (resolvers) {
      this.resolvers = {};
      this.addResolvers(resolvers);
    };

    LocalState.prototype.getResolvers = function () {
      return this.resolvers || {};
    };

    LocalState.prototype.runResolvers = function (_a) {
      var document = _a.document,
          remoteResult = _a.remoteResult,
          context = _a.context,
          variables = _a.variables,
          _b = _a.onlyRunForcedResolvers,
          onlyRunForcedResolvers = _b === void 0 ? false : _b;
      return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
        return (0, _tslib.__generator)(this, function (_c) {
          if (document) {
            return [2, this.resolveDocument(document, remoteResult.data, context, variables, this.fragmentMatcher, onlyRunForcedResolvers).then(function (localResult) {
              return (0, _tslib.__assign)((0, _tslib.__assign)({}, remoteResult), {
                data: localResult.result
              });
            })];
          }

          return [2, remoteResult];
        });
      });
    };

    LocalState.prototype.setFragmentMatcher = function (fragmentMatcher) {
      this.fragmentMatcher = fragmentMatcher;
    };

    LocalState.prototype.getFragmentMatcher = function () {
      return this.fragmentMatcher;
    };

    LocalState.prototype.clientQuery = function (document) {
      if ((0, _apolloUtilities.hasDirectives)(['client'], document)) {
        if (this.resolvers) {
          return document;
        }

        process.env.NODE_ENV === "production" || _tsInvariant.invariant.warn('Found @client directives in a query but no ApolloClient resolvers ' + 'were specified. This means ApolloClient local resolver handling ' + 'has been disabled, and @client directives will be passed through ' + 'to your link chain.');
      }

      return null;
    };

    LocalState.prototype.serverQuery = function (document) {
      return this.resolvers ? (0, _apolloUtilities.removeClientSetsFromDocument)(document) : document;
    };

    LocalState.prototype.prepareContext = function (context) {
      if (context === void 0) {
        context = {};
      }

      var cache = this.cache;
      var newContext = (0, _tslib.__assign)((0, _tslib.__assign)({}, context), {
        cache: cache,
        getCacheKey: function (obj) {
          if (cache.config) {
            return cache.config.dataIdFromObject(obj);
          } else {
            process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(false, 6) : (0, _tsInvariant.invariant)(false, 'To use context.getCacheKey, you need to use a cache that has ' + 'a configurable dataIdFromObject, like apollo-cache-inmemory.');
          }
        }
      });
      return newContext;
    };

    LocalState.prototype.addExportedVariables = function (document, variables, context) {
      if (variables === void 0) {
        variables = {};
      }

      if (context === void 0) {
        context = {};
      }

      return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
        return (0, _tslib.__generator)(this, function (_a) {
          if (document) {
            return [2, this.resolveDocument(document, this.buildRootValueFromCache(document, variables) || {}, this.prepareContext(context), variables).then(function (data) {
              return (0, _tslib.__assign)((0, _tslib.__assign)({}, variables), data.exportedVariables);
            })];
          }

          return [2, (0, _tslib.__assign)({}, variables)];
        });
      });
    };

    LocalState.prototype.shouldForceResolvers = function (document) {
      var forceResolvers = false;
      (0, _visitor.visit)(document, {
        Directive: {
          enter: function (node) {
            if (node.name.value === 'client' && node.arguments) {
              forceResolvers = node.arguments.some(function (arg) {
                return arg.name.value === 'always' && arg.value.kind === 'BooleanValue' && arg.value.value === true;
              });

              if (forceResolvers) {
                return _visitor.BREAK;
              }
            }
          }
        }
      });
      return forceResolvers;
    };

    LocalState.prototype.buildRootValueFromCache = function (document, variables) {
      return this.cache.diff({
        query: (0, _apolloUtilities.buildQueryFromSelectionSet)(document),
        variables: variables,
        returnPartialData: true,
        optimistic: false
      }).result;
    };

    LocalState.prototype.resolveDocument = function (document, rootValue, context, variables, fragmentMatcher, onlyRunForcedResolvers) {
      if (context === void 0) {
        context = {};
      }

      if (variables === void 0) {
        variables = {};
      }

      if (fragmentMatcher === void 0) {
        fragmentMatcher = function () {
          return true;
        };
      }

      if (onlyRunForcedResolvers === void 0) {
        onlyRunForcedResolvers = false;
      }

      return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
        var mainDefinition, fragments, fragmentMap, definitionOperation, defaultOperationType, _a, cache, client, execContext;

        return (0, _tslib.__generator)(this, function (_b) {
          mainDefinition = (0, _apolloUtilities.getMainDefinition)(document);
          fragments = (0, _apolloUtilities.getFragmentDefinitions)(document);
          fragmentMap = (0, _apolloUtilities.createFragmentMap)(fragments);
          definitionOperation = mainDefinition.operation;
          defaultOperationType = definitionOperation ? capitalizeFirstLetter(definitionOperation) : 'Query';
          _a = this, cache = _a.cache, client = _a.client;
          execContext = {
            fragmentMap: fragmentMap,
            context: (0, _tslib.__assign)((0, _tslib.__assign)({}, context), {
              cache: cache,
              client: client
            }),
            variables: variables,
            fragmentMatcher: fragmentMatcher,
            defaultOperationType: defaultOperationType,
            exportedVariables: {},
            onlyRunForcedResolvers: onlyRunForcedResolvers
          };
          return [2, this.resolveSelectionSet(mainDefinition.selectionSet, rootValue, execContext).then(function (result) {
            return {
              result: result,
              exportedVariables: execContext.exportedVariables
            };
          })];
        });
      });
    };

    LocalState.prototype.resolveSelectionSet = function (selectionSet, rootValue, execContext) {
      return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
        var fragmentMap, context, variables, resultsToMerge, execute;

        var _this = this;

        return (0, _tslib.__generator)(this, function (_a) {
          fragmentMap = execContext.fragmentMap, context = execContext.context, variables = execContext.variables;
          resultsToMerge = [rootValue];

          execute = function (selection) {
            return (0, _tslib.__awaiter)(_this, void 0, void 0, function () {
              var fragment, typeCondition;
              return (0, _tslib.__generator)(this, function (_a) {
                if (!(0, _apolloUtilities.shouldInclude)(selection, variables)) {
                  return [2];
                }

                if ((0, _apolloUtilities.isField)(selection)) {
                  return [2, this.resolveField(selection, rootValue, execContext).then(function (fieldResult) {
                    var _a;

                    if (typeof fieldResult !== 'undefined') {
                      resultsToMerge.push((_a = {}, _a[(0, _apolloUtilities.resultKeyNameFromField)(selection)] = fieldResult, _a));
                    }
                  })];
                }

                if ((0, _apolloUtilities.isInlineFragment)(selection)) {
                  fragment = selection;
                } else {
                  fragment = fragmentMap[selection.name.value];
                  process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(fragment, 7) : (0, _tsInvariant.invariant)(fragment, "No fragment named " + selection.name.value);
                }

                if (fragment && fragment.typeCondition) {
                  typeCondition = fragment.typeCondition.name.value;

                  if (execContext.fragmentMatcher(rootValue, typeCondition, context)) {
                    return [2, this.resolveSelectionSet(fragment.selectionSet, rootValue, execContext).then(function (fragmentResult) {
                      resultsToMerge.push(fragmentResult);
                    })];
                  }
                }

                return [2];
              });
            });
          };

          return [2, Promise.all(selectionSet.selections.map(execute)).then(function () {
            return (0, _apolloUtilities.mergeDeepArray)(resultsToMerge);
          })];
        });
      });
    };

    LocalState.prototype.resolveField = function (field, rootValue, execContext) {
      return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
        var variables, fieldName, aliasedFieldName, aliasUsed, defaultResult, resultPromise, resolverType, resolverMap, resolve;

        var _this = this;

        return (0, _tslib.__generator)(this, function (_a) {
          variables = execContext.variables;
          fieldName = field.name.value;
          aliasedFieldName = (0, _apolloUtilities.resultKeyNameFromField)(field);
          aliasUsed = fieldName !== aliasedFieldName;
          defaultResult = rootValue[aliasedFieldName] || rootValue[fieldName];
          resultPromise = Promise.resolve(defaultResult);

          if (!execContext.onlyRunForcedResolvers || this.shouldForceResolvers(field)) {
            resolverType = rootValue.__typename || execContext.defaultOperationType;
            resolverMap = this.resolvers && this.resolvers[resolverType];

            if (resolverMap) {
              resolve = resolverMap[aliasUsed ? fieldName : aliasedFieldName];

              if (resolve) {
                resultPromise = Promise.resolve(resolve(rootValue, (0, _apolloUtilities.argumentsObjectFromField)(field, variables), execContext.context, {
                  field: field,
                  fragmentMap: execContext.fragmentMap
                }));
              }
            }
          }

          return [2, resultPromise.then(function (result) {
            if (result === void 0) {
              result = defaultResult;
            }

            if (field.directives) {
              field.directives.forEach(function (directive) {
                if (directive.name.value === 'export' && directive.arguments) {
                  directive.arguments.forEach(function (arg) {
                    if (arg.name.value === 'as' && arg.value.kind === 'StringValue') {
                      execContext.exportedVariables[arg.value.value] = result;
                    }
                  });
                }
              });
            }

            if (!field.selectionSet) {
              return result;
            }

            if (result == null) {
              return result;
            }

            if (Array.isArray(result)) {
              return _this.resolveSubSelectedArray(field, result, execContext);
            }

            if (field.selectionSet) {
              return _this.resolveSelectionSet(field.selectionSet, result, execContext);
            }
          })];
        });
      });
    };

    LocalState.prototype.resolveSubSelectedArray = function (field, result, execContext) {
      var _this = this;

      return Promise.all(result.map(function (item) {
        if (item === null) {
          return null;
        }

        if (Array.isArray(item)) {
          return _this.resolveSubSelectedArray(field, item, execContext);
        }

        if (field.selectionSet) {
          return _this.resolveSelectionSet(field.selectionSet, item, execContext);
        }
      }));
    };

    return LocalState;
  }();

  function multiplex(inner) {
    var observers = new Set();
    var sub = null;
    return new Observable(function (observer) {
      observers.add(observer);
      sub = sub || inner.subscribe({
        next: function (value) {
          observers.forEach(function (obs) {
            return obs.next && obs.next(value);
          });
        },
        error: function (error) {
          observers.forEach(function (obs) {
            return obs.error && obs.error(error);
          });
        },
        complete: function () {
          observers.forEach(function (obs) {
            return obs.complete && obs.complete();
          });
        }
      });
      return function () {
        if (observers.delete(observer) && !observers.size && sub) {
          sub.unsubscribe();
          sub = null;
        }
      };
    });
  }

  function asyncMap(observable, mapFn) {
    return new Observable(function (observer) {
      var next = observer.next,
          error = observer.error,
          complete = observer.complete;
      var activeNextCount = 0;
      var completed = false;
      var handler = {
        next: function (value) {
          ++activeNextCount;
          new Promise(function (resolve) {
            resolve(mapFn(value));
          }).then(function (result) {
            --activeNextCount;
            next && next.call(observer, result);
            completed && handler.complete();
          }, function (e) {
            --activeNextCount;
            error && error.call(observer, e);
          });
        },
        error: function (e) {
          error && error.call(observer, e);
        },
        complete: function () {
          completed = true;

          if (!activeNextCount) {
            complete && complete.call(observer);
          }
        }
      };
      var sub = observable.subscribe(handler);
      return function () {
        return sub.unsubscribe();
      };
    });
  }

  var hasOwnProperty = Object.prototype.hasOwnProperty;

  var QueryManager = function () {
    function QueryManager(_a) {
      var link = _a.link,
          _b = _a.queryDeduplication,
          queryDeduplication = _b === void 0 ? false : _b,
          store = _a.store,
          _c = _a.onBroadcast,
          onBroadcast = _c === void 0 ? function () {
        return undefined;
      } : _c,
          _d = _a.ssrMode,
          ssrMode = _d === void 0 ? false : _d,
          _e = _a.clientAwareness,
          clientAwareness = _e === void 0 ? {} : _e,
          localState = _a.localState,
          assumeImmutableResults = _a.assumeImmutableResults;
      this.mutationStore = new MutationStore();
      this.queryStore = new QueryStore();
      this.clientAwareness = {};
      this.idCounter = 1;
      this.queries = new Map();
      this.fetchQueryRejectFns = new Map();
      this.transformCache = new (_apolloUtilities.canUseWeakMap ? WeakMap : Map)();
      this.inFlightLinkObservables = new Map();
      this.pollingInfoByQueryId = new Map();
      this.link = link;
      this.queryDeduplication = queryDeduplication;
      this.dataStore = store;
      this.onBroadcast = onBroadcast;
      this.clientAwareness = clientAwareness;
      this.localState = localState || new LocalState({
        cache: store.getCache()
      });
      this.ssrMode = ssrMode;
      this.assumeImmutableResults = !!assumeImmutableResults;
    }

    QueryManager.prototype.stop = function () {
      var _this = this;

      this.queries.forEach(function (_info, queryId) {
        _this.stopQueryNoBroadcast(queryId);
      });
      this.fetchQueryRejectFns.forEach(function (reject) {
        reject(process.env.NODE_ENV === "production" ? new _tsInvariant.InvariantError(8) : new _tsInvariant.InvariantError('QueryManager stopped while query was in flight'));
      });
    };

    QueryManager.prototype.mutate = function (_a) {
      var mutation = _a.mutation,
          variables = _a.variables,
          optimisticResponse = _a.optimisticResponse,
          updateQueriesByName = _a.updateQueries,
          _b = _a.refetchQueries,
          refetchQueries = _b === void 0 ? [] : _b,
          _c = _a.awaitRefetchQueries,
          awaitRefetchQueries = _c === void 0 ? false : _c,
          updateWithProxyFn = _a.update,
          _d = _a.errorPolicy,
          errorPolicy = _d === void 0 ? 'none' : _d,
          fetchPolicy = _a.fetchPolicy,
          _e = _a.context,
          context = _e === void 0 ? {} : _e;
      return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
        var mutationId, generateUpdateQueriesInfo, self;

        var _this = this;

        return (0, _tslib.__generator)(this, function (_f) {
          switch (_f.label) {
            case 0:
              process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(mutation, 9) : (0, _tsInvariant.invariant)(mutation, 'mutation option is required. You must specify your GraphQL document in the mutation option.');
              process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(!fetchPolicy || fetchPolicy === 'no-cache', 10) : (0, _tsInvariant.invariant)(!fetchPolicy || fetchPolicy === 'no-cache', "Mutations only support a 'no-cache' fetchPolicy. If you don't want to disable the cache, remove your fetchPolicy setting to proceed with the default mutation behavior.");
              mutationId = this.generateQueryId();
              mutation = this.transform(mutation).document;
              this.setQuery(mutationId, function () {
                return {
                  document: mutation
                };
              });
              variables = this.getVariables(mutation, variables);
              if (!this.transform(mutation).hasClientExports) return [3, 2];
              return [4, this.localState.addExportedVariables(mutation, variables, context)];

            case 1:
              variables = _f.sent();
              _f.label = 2;

            case 2:
              generateUpdateQueriesInfo = function () {
                var ret = {};

                if (updateQueriesByName) {
                  _this.queries.forEach(function (_a, queryId) {
                    var observableQuery = _a.observableQuery;

                    if (observableQuery) {
                      var queryName = observableQuery.queryName;

                      if (queryName && hasOwnProperty.call(updateQueriesByName, queryName)) {
                        ret[queryId] = {
                          updater: updateQueriesByName[queryName],
                          query: _this.queryStore.get(queryId)
                        };
                      }
                    }
                  });
                }

                return ret;
              };

              this.mutationStore.initMutation(mutationId, mutation, variables);
              this.dataStore.markMutationInit({
                mutationId: mutationId,
                document: mutation,
                variables: variables,
                updateQueries: generateUpdateQueriesInfo(),
                update: updateWithProxyFn,
                optimisticResponse: optimisticResponse
              });
              this.broadcastQueries();
              self = this;
              return [2, new Promise(function (resolve, reject) {
                var storeResult;
                var error;
                self.getObservableFromLink(mutation, (0, _tslib.__assign)((0, _tslib.__assign)({}, context), {
                  optimisticResponse: optimisticResponse
                }), variables, false).subscribe({
                  next: function (result) {
                    if ((0, _apolloUtilities.graphQLResultHasError)(result) && errorPolicy === 'none') {
                      error = new ApolloError({
                        graphQLErrors: result.errors
                      });
                      return;
                    }

                    self.mutationStore.markMutationResult(mutationId);

                    if (fetchPolicy !== 'no-cache') {
                      self.dataStore.markMutationResult({
                        mutationId: mutationId,
                        result: result,
                        document: mutation,
                        variables: variables,
                        updateQueries: generateUpdateQueriesInfo(),
                        update: updateWithProxyFn
                      });
                    }

                    storeResult = result;
                  },
                  error: function (err) {
                    self.mutationStore.markMutationError(mutationId, err);
                    self.dataStore.markMutationComplete({
                      mutationId: mutationId,
                      optimisticResponse: optimisticResponse
                    });
                    self.broadcastQueries();
                    self.setQuery(mutationId, function () {
                      return {
                        document: null
                      };
                    });
                    reject(new ApolloError({
                      networkError: err
                    }));
                  },
                  complete: function () {
                    if (error) {
                      self.mutationStore.markMutationError(mutationId, error);
                    }

                    self.dataStore.markMutationComplete({
                      mutationId: mutationId,
                      optimisticResponse: optimisticResponse
                    });
                    self.broadcastQueries();

                    if (error) {
                      reject(error);
                      return;
                    }

                    if (typeof refetchQueries === 'function') {
                      refetchQueries = refetchQueries(storeResult);
                    }

                    var refetchQueryPromises = [];

                    if (isNonEmptyArray(refetchQueries)) {
                      refetchQueries.forEach(function (refetchQuery) {
                        if (typeof refetchQuery === 'string') {
                          self.queries.forEach(function (_a) {
                            var observableQuery = _a.observableQuery;

                            if (observableQuery && observableQuery.queryName === refetchQuery) {
                              refetchQueryPromises.push(observableQuery.refetch());
                            }
                          });
                        } else {
                          var queryOptions = {
                            query: refetchQuery.query,
                            variables: refetchQuery.variables,
                            fetchPolicy: 'network-only'
                          };

                          if (refetchQuery.context) {
                            queryOptions.context = refetchQuery.context;
                          }

                          refetchQueryPromises.push(self.query(queryOptions));
                        }
                      });
                    }

                    Promise.all(awaitRefetchQueries ? refetchQueryPromises : []).then(function () {
                      self.setQuery(mutationId, function () {
                        return {
                          document: null
                        };
                      });

                      if (errorPolicy === 'ignore' && storeResult && (0, _apolloUtilities.graphQLResultHasError)(storeResult)) {
                        delete storeResult.errors;
                      }

                      resolve(storeResult);
                    });
                  }
                });
              })];
          }
        });
      });
    };

    QueryManager.prototype.fetchQuery = function (queryId, options, fetchType, fetchMoreForQueryId) {
      return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
        var _a, metadata, _b, fetchPolicy, _c, context, query, variables, storeResult, isNetworkOnly, needToFetch, _d, complete, result, shouldFetch, requestId, cancel, networkResult;

        var _this = this;

        return (0, _tslib.__generator)(this, function (_e) {
          switch (_e.label) {
            case 0:
              _a = options.metadata, metadata = _a === void 0 ? null : _a, _b = options.fetchPolicy, fetchPolicy = _b === void 0 ? 'cache-first' : _b, _c = options.context, context = _c === void 0 ? {} : _c;
              query = this.transform(options.query).document;
              variables = this.getVariables(query, options.variables);
              if (!this.transform(query).hasClientExports) return [3, 2];
              return [4, this.localState.addExportedVariables(query, variables, context)];

            case 1:
              variables = _e.sent();
              _e.label = 2;

            case 2:
              options = (0, _tslib.__assign)((0, _tslib.__assign)({}, options), {
                variables: variables
              });
              isNetworkOnly = fetchPolicy === 'network-only' || fetchPolicy === 'no-cache';
              needToFetch = isNetworkOnly;

              if (!isNetworkOnly) {
                _d = this.dataStore.getCache().diff({
                  query: query,
                  variables: variables,
                  returnPartialData: true,
                  optimistic: false
                }), complete = _d.complete, result = _d.result;
                needToFetch = !complete || fetchPolicy === 'cache-and-network';
                storeResult = result;
              }

              shouldFetch = needToFetch && fetchPolicy !== 'cache-only' && fetchPolicy !== 'standby';
              if ((0, _apolloUtilities.hasDirectives)(['live'], query)) shouldFetch = true;
              requestId = this.idCounter++;
              cancel = fetchPolicy !== 'no-cache' ? this.updateQueryWatch(queryId, query, options) : undefined;
              this.setQuery(queryId, function () {
                return {
                  document: query,
                  lastRequestId: requestId,
                  invalidated: true,
                  cancel: cancel
                };
              });
              this.invalidate(fetchMoreForQueryId);
              this.queryStore.initQuery({
                queryId: queryId,
                document: query,
                storePreviousVariables: shouldFetch,
                variables: variables,
                isPoll: fetchType === FetchType.poll,
                isRefetch: fetchType === FetchType.refetch,
                metadata: metadata,
                fetchMoreForQueryId: fetchMoreForQueryId
              });
              this.broadcastQueries();

              if (shouldFetch) {
                networkResult = this.fetchRequest({
                  requestId: requestId,
                  queryId: queryId,
                  document: query,
                  options: options,
                  fetchMoreForQueryId: fetchMoreForQueryId
                }).catch(function (error) {
                  if (isApolloError(error)) {
                    throw error;
                  } else {
                    if (requestId >= _this.getQuery(queryId).lastRequestId) {
                      _this.queryStore.markQueryError(queryId, error, fetchMoreForQueryId);

                      _this.invalidate(queryId);

                      _this.invalidate(fetchMoreForQueryId);

                      _this.broadcastQueries();
                    }

                    throw new ApolloError({
                      networkError: error
                    });
                  }
                });

                if (fetchPolicy !== 'cache-and-network') {
                  return [2, networkResult];
                }

                networkResult.catch(function () {});
              }

              this.queryStore.markQueryResultClient(queryId, !shouldFetch);
              this.invalidate(queryId);
              this.invalidate(fetchMoreForQueryId);

              if (this.transform(query).hasForcedResolvers) {
                return [2, this.localState.runResolvers({
                  document: query,
                  remoteResult: {
                    data: storeResult
                  },
                  context: context,
                  variables: variables,
                  onlyRunForcedResolvers: true
                }).then(function (result) {
                  _this.markQueryResult(queryId, result, options, fetchMoreForQueryId);

                  _this.broadcastQueries();

                  return result;
                })];
              }

              this.broadcastQueries();
              return [2, {
                data: storeResult
              }];
          }
        });
      });
    };

    QueryManager.prototype.markQueryResult = function (queryId, result, _a, fetchMoreForQueryId) {
      var fetchPolicy = _a.fetchPolicy,
          variables = _a.variables,
          errorPolicy = _a.errorPolicy;

      if (fetchPolicy === 'no-cache') {
        this.setQuery(queryId, function () {
          return {
            newData: {
              result: result.data,
              complete: true
            }
          };
        });
      } else {
        this.dataStore.markQueryResult(result, this.getQuery(queryId).document, variables, fetchMoreForQueryId, errorPolicy === 'ignore' || errorPolicy === 'all');
      }
    };

    QueryManager.prototype.queryListenerForObserver = function (queryId, options, observer) {
      var _this = this;

      function invoke(method, argument) {
        if (observer[method]) {
          try {
            observer[method](argument);
          } catch (e) {
            process.env.NODE_ENV === "production" || _tsInvariant.invariant.error(e);
          }
        } else if (method === 'error') {
          process.env.NODE_ENV === "production" || _tsInvariant.invariant.error(argument);
        }
      }

      return function (queryStoreValue, newData) {
        _this.invalidate(queryId, false);

        if (!queryStoreValue) return;

        var _a = _this.getQuery(queryId),
            observableQuery = _a.observableQuery,
            document = _a.document;

        var fetchPolicy = observableQuery ? observableQuery.options.fetchPolicy : options.fetchPolicy;
        if (fetchPolicy === 'standby') return;
        var loading = isNetworkRequestInFlight(queryStoreValue.networkStatus);
        var lastResult = observableQuery && observableQuery.getLastResult();
        var networkStatusChanged = !!(lastResult && lastResult.networkStatus !== queryStoreValue.networkStatus);
        var shouldNotifyIfLoading = options.returnPartialData || !newData && queryStoreValue.previousVariables || networkStatusChanged && options.notifyOnNetworkStatusChange || fetchPolicy === 'cache-only' || fetchPolicy === 'cache-and-network';

        if (loading && !shouldNotifyIfLoading) {
          return;
        }

        var hasGraphQLErrors = isNonEmptyArray(queryStoreValue.graphQLErrors);
        var errorPolicy = observableQuery && observableQuery.options.errorPolicy || options.errorPolicy || 'none';

        if (errorPolicy === 'none' && hasGraphQLErrors || queryStoreValue.networkError) {
          return invoke('error', new ApolloError({
            graphQLErrors: queryStoreValue.graphQLErrors,
            networkError: queryStoreValue.networkError
          }));
        }

        try {
          var data = void 0;
          var isMissing = void 0;

          if (newData) {
            if (fetchPolicy !== 'no-cache' && fetchPolicy !== 'network-only') {
              _this.setQuery(queryId, function () {
                return {
                  newData: null
                };
              });
            }

            data = newData.result;
            isMissing = !newData.complete;
          } else {
            var lastError = observableQuery && observableQuery.getLastError();
            var errorStatusChanged = errorPolicy !== 'none' && (lastError && lastError.graphQLErrors) !== queryStoreValue.graphQLErrors;

            if (lastResult && lastResult.data && !errorStatusChanged) {
              data = lastResult.data;
              isMissing = false;
            } else {
              var diffResult = _this.dataStore.getCache().diff({
                query: document,
                variables: queryStoreValue.previousVariables || queryStoreValue.variables,
                returnPartialData: true,
                optimistic: true
              });

              data = diffResult.result;
              isMissing = !diffResult.complete;
            }
          }

          var stale = isMissing && !(options.returnPartialData || fetchPolicy === 'cache-only');
          var resultFromStore = {
            data: stale ? lastResult && lastResult.data : data,
            loading: loading,
            networkStatus: queryStoreValue.networkStatus,
            stale: stale
          };

          if (errorPolicy === 'all' && hasGraphQLErrors) {
            resultFromStore.errors = queryStoreValue.graphQLErrors;
          }

          invoke('next', resultFromStore);
        } catch (networkError) {
          invoke('error', new ApolloError({
            networkError: networkError
          }));
        }
      };
    };

    QueryManager.prototype.transform = function (document) {
      var transformCache = this.transformCache;

      if (!transformCache.has(document)) {
        var cache = this.dataStore.getCache();
        var transformed = cache.transformDocument(document);
        var forLink = (0, _apolloUtilities.removeConnectionDirectiveFromDocument)(cache.transformForLink(transformed));
        var clientQuery = this.localState.clientQuery(transformed);
        var serverQuery = this.localState.serverQuery(forLink);
        var cacheEntry_1 = {
          document: transformed,
          hasClientExports: (0, _apolloUtilities.hasClientExports)(transformed),
          hasForcedResolvers: this.localState.shouldForceResolvers(transformed),
          clientQuery: clientQuery,
          serverQuery: serverQuery,
          defaultVars: (0, _apolloUtilities.getDefaultValues)((0, _apolloUtilities.getOperationDefinition)(transformed))
        };

        var add = function (doc) {
          if (doc && !transformCache.has(doc)) {
            transformCache.set(doc, cacheEntry_1);
          }
        };

        add(document);
        add(transformed);
        add(clientQuery);
        add(serverQuery);
      }

      return transformCache.get(document);
    };

    QueryManager.prototype.getVariables = function (document, variables) {
      return (0, _tslib.__assign)((0, _tslib.__assign)({}, this.transform(document).defaultVars), variables);
    };

    QueryManager.prototype.watchQuery = function (options, shouldSubscribe) {
      if (shouldSubscribe === void 0) {
        shouldSubscribe = true;
      }

      process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(options.fetchPolicy !== 'standby', 11) : (0, _tsInvariant.invariant)(options.fetchPolicy !== 'standby', 'client.watchQuery cannot be called with fetchPolicy set to "standby"');
      options.variables = this.getVariables(options.query, options.variables);

      if (typeof options.notifyOnNetworkStatusChange === 'undefined') {
        options.notifyOnNetworkStatusChange = false;
      }

      var transformedOptions = (0, _tslib.__assign)({}, options);
      return new ObservableQuery({
        queryManager: this,
        options: transformedOptions,
        shouldSubscribe: shouldSubscribe
      });
    };

    QueryManager.prototype.query = function (options) {
      var _this = this;

      process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(options.query, 12) : (0, _tsInvariant.invariant)(options.query, 'query option is required. You must specify your GraphQL document ' + 'in the query option.');
      process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(options.query.kind === 'Document', 13) : (0, _tsInvariant.invariant)(options.query.kind === 'Document', 'You must wrap the query string in a "gql" tag.');
      process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(!options.returnPartialData, 14) : (0, _tsInvariant.invariant)(!options.returnPartialData, 'returnPartialData option only supported on watchQuery.');
      process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(!options.pollInterval, 15) : (0, _tsInvariant.invariant)(!options.pollInterval, 'pollInterval option only supported on watchQuery.');
      return new Promise(function (resolve, reject) {
        var watchedQuery = _this.watchQuery(options, false);

        _this.fetchQueryRejectFns.set("query:" + watchedQuery.queryId, reject);

        watchedQuery.result().then(resolve, reject).then(function () {
          return _this.fetchQueryRejectFns.delete("query:" + watchedQuery.queryId);
        });
      });
    };

    QueryManager.prototype.generateQueryId = function () {
      return String(this.idCounter++);
    };

    QueryManager.prototype.stopQueryInStore = function (queryId) {
      this.stopQueryInStoreNoBroadcast(queryId);
      this.broadcastQueries();
    };

    QueryManager.prototype.stopQueryInStoreNoBroadcast = function (queryId) {
      this.stopPollingQuery(queryId);
      this.queryStore.stopQuery(queryId);
      this.invalidate(queryId);
    };

    QueryManager.prototype.addQueryListener = function (queryId, listener) {
      this.setQuery(queryId, function (_a) {
        var listeners = _a.listeners;
        listeners.add(listener);
        return {
          invalidated: false
        };
      });
    };

    QueryManager.prototype.updateQueryWatch = function (queryId, document, options) {
      var _this = this;

      var cancel = this.getQuery(queryId).cancel;
      if (cancel) cancel();

      var previousResult = function () {
        var previousResult = null;

        var observableQuery = _this.getQuery(queryId).observableQuery;

        if (observableQuery) {
          var lastResult = observableQuery.getLastResult();

          if (lastResult) {
            previousResult = lastResult.data;
          }
        }

        return previousResult;
      };

      return this.dataStore.getCache().watch({
        query: document,
        variables: options.variables,
        optimistic: true,
        previousResult: previousResult,
        callback: function (newData) {
          _this.setQuery(queryId, function () {
            return {
              invalidated: true,
              newData: newData
            };
          });
        }
      });
    };

    QueryManager.prototype.addObservableQuery = function (queryId, observableQuery) {
      this.setQuery(queryId, function () {
        return {
          observableQuery: observableQuery
        };
      });
    };

    QueryManager.prototype.removeObservableQuery = function (queryId) {
      var cancel = this.getQuery(queryId).cancel;
      this.setQuery(queryId, function () {
        return {
          observableQuery: null
        };
      });
      if (cancel) cancel();
    };

    QueryManager.prototype.clearStore = function () {
      this.fetchQueryRejectFns.forEach(function (reject) {
        reject(process.env.NODE_ENV === "production" ? new _tsInvariant.InvariantError(16) : new _tsInvariant.InvariantError('Store reset while query was in flight (not completed in link chain)'));
      });
      var resetIds = [];
      this.queries.forEach(function (_a, queryId) {
        var observableQuery = _a.observableQuery;
        if (observableQuery) resetIds.push(queryId);
      });
      this.queryStore.reset(resetIds);
      this.mutationStore.reset();
      return this.dataStore.reset();
    };

    QueryManager.prototype.resetStore = function () {
      var _this = this;

      return this.clearStore().then(function () {
        return _this.reFetchObservableQueries();
      });
    };

    QueryManager.prototype.reFetchObservableQueries = function (includeStandby) {
      var _this = this;

      if (includeStandby === void 0) {
        includeStandby = false;
      }

      var observableQueryPromises = [];
      this.queries.forEach(function (_a, queryId) {
        var observableQuery = _a.observableQuery;

        if (observableQuery) {
          var fetchPolicy = observableQuery.options.fetchPolicy;
          observableQuery.resetLastResults();

          if (fetchPolicy !== 'cache-only' && (includeStandby || fetchPolicy !== 'standby')) {
            observableQueryPromises.push(observableQuery.refetch());
          }

          _this.setQuery(queryId, function () {
            return {
              newData: null
            };
          });

          _this.invalidate(queryId);
        }
      });
      this.broadcastQueries();
      return Promise.all(observableQueryPromises);
    };

    QueryManager.prototype.observeQuery = function (queryId, options, observer) {
      this.addQueryListener(queryId, this.queryListenerForObserver(queryId, options, observer));
      return this.fetchQuery(queryId, options);
    };

    QueryManager.prototype.startQuery = function (queryId, options, listener) {
      process.env.NODE_ENV === "production" || _tsInvariant.invariant.warn("The QueryManager.startQuery method has been deprecated");
      this.addQueryListener(queryId, listener);
      this.fetchQuery(queryId, options).catch(function () {
        return undefined;
      });
      return queryId;
    };

    QueryManager.prototype.startGraphQLSubscription = function (_a) {
      var _this = this;

      var query = _a.query,
          fetchPolicy = _a.fetchPolicy,
          variables = _a.variables;
      query = this.transform(query).document;
      variables = this.getVariables(query, variables);

      var makeObservable = function (variables) {
        return _this.getObservableFromLink(query, {}, variables, false).map(function (result) {
          if (!fetchPolicy || fetchPolicy !== 'no-cache') {
            _this.dataStore.markSubscriptionResult(result, query, variables);

            _this.broadcastQueries();
          }

          if ((0, _apolloUtilities.graphQLResultHasError)(result)) {
            throw new ApolloError({
              graphQLErrors: result.errors
            });
          }

          return result;
        });
      };

      if (this.transform(query).hasClientExports) {
        var observablePromise_1 = this.localState.addExportedVariables(query, variables).then(makeObservable);
        return new Observable(function (observer) {
          var sub = null;
          observablePromise_1.then(function (observable) {
            return sub = observable.subscribe(observer);
          }, observer.error);
          return function () {
            return sub && sub.unsubscribe();
          };
        });
      }

      return makeObservable(variables);
    };

    QueryManager.prototype.stopQuery = function (queryId) {
      this.stopQueryNoBroadcast(queryId);
      this.broadcastQueries();
    };

    QueryManager.prototype.stopQueryNoBroadcast = function (queryId) {
      this.stopQueryInStoreNoBroadcast(queryId);
      this.removeQuery(queryId);
    };

    QueryManager.prototype.removeQuery = function (queryId) {
      this.fetchQueryRejectFns.delete("query:" + queryId);
      this.fetchQueryRejectFns.delete("fetchRequest:" + queryId);
      this.getQuery(queryId).subscriptions.forEach(function (x) {
        return x.unsubscribe();
      });
      this.queries.delete(queryId);
    };

    QueryManager.prototype.getCurrentQueryResult = function (observableQuery, optimistic) {
      if (optimistic === void 0) {
        optimistic = true;
      }

      var _a = observableQuery.options,
          variables = _a.variables,
          query = _a.query,
          fetchPolicy = _a.fetchPolicy,
          returnPartialData = _a.returnPartialData;
      var lastResult = observableQuery.getLastResult();
      var newData = this.getQuery(observableQuery.queryId).newData;

      if (newData && newData.complete) {
        return {
          data: newData.result,
          partial: false
        };
      }

      if (fetchPolicy === 'no-cache' || fetchPolicy === 'network-only') {
        return {
          data: undefined,
          partial: false
        };
      }

      var _b = this.dataStore.getCache().diff({
        query: query,
        variables: variables,
        previousResult: lastResult ? lastResult.data : undefined,
        returnPartialData: true,
        optimistic: optimistic
      }),
          result = _b.result,
          complete = _b.complete;

      return {
        data: complete || returnPartialData ? result : void 0,
        partial: !complete
      };
    };

    QueryManager.prototype.getQueryWithPreviousResult = function (queryIdOrObservable) {
      var observableQuery;

      if (typeof queryIdOrObservable === 'string') {
        var foundObserveableQuery = this.getQuery(queryIdOrObservable).observableQuery;
        process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(foundObserveableQuery, 17) : (0, _tsInvariant.invariant)(foundObserveableQuery, "ObservableQuery with this id doesn't exist: " + queryIdOrObservable);
        observableQuery = foundObserveableQuery;
      } else {
        observableQuery = queryIdOrObservable;
      }

      var _a = observableQuery.options,
          variables = _a.variables,
          query = _a.query;
      return {
        previousResult: this.getCurrentQueryResult(observableQuery, false).data,
        variables: variables,
        document: query
      };
    };

    QueryManager.prototype.broadcastQueries = function () {
      var _this = this;

      this.onBroadcast();
      this.queries.forEach(function (info, id) {
        if (info.invalidated) {
          info.listeners.forEach(function (listener) {
            if (listener) {
              listener(_this.queryStore.get(id), info.newData);
            }
          });
        }
      });
    };

    QueryManager.prototype.getLocalState = function () {
      return this.localState;
    };

    QueryManager.prototype.getObservableFromLink = function (query, context, variables, deduplication) {
      var _this = this;

      if (deduplication === void 0) {
        deduplication = this.queryDeduplication;
      }

      var observable;
      var serverQuery = this.transform(query).serverQuery;

      if (serverQuery) {
        var _a = this,
            inFlightLinkObservables_1 = _a.inFlightLinkObservables,
            link = _a.link;

        var operation = {
          query: serverQuery,
          variables: variables,
          operationName: (0, _apolloUtilities.getOperationName)(serverQuery) || void 0,
          context: this.prepareContext((0, _tslib.__assign)((0, _tslib.__assign)({}, context), {
            forceFetch: !deduplication
          }))
        };
        context = operation.context;

        if (deduplication) {
          var byVariables_1 = inFlightLinkObservables_1.get(serverQuery) || new Map();
          inFlightLinkObservables_1.set(serverQuery, byVariables_1);
          var varJson_1 = JSON.stringify(variables);
          observable = byVariables_1.get(varJson_1);

          if (!observable) {
            byVariables_1.set(varJson_1, observable = multiplex((0, _apolloLink.execute)(link, operation)));

            var cleanup = function () {
              byVariables_1.delete(varJson_1);
              if (!byVariables_1.size) inFlightLinkObservables_1.delete(serverQuery);
              cleanupSub_1.unsubscribe();
            };

            var cleanupSub_1 = observable.subscribe({
              next: cleanup,
              error: cleanup,
              complete: cleanup
            });
          }
        } else {
          observable = multiplex((0, _apolloLink.execute)(link, operation));
        }
      } else {
        observable = Observable.of({
          data: {}
        });
        context = this.prepareContext(context);
      }

      var clientQuery = this.transform(query).clientQuery;

      if (clientQuery) {
        observable = asyncMap(observable, function (result) {
          return _this.localState.runResolvers({
            document: clientQuery,
            remoteResult: result,
            context: context,
            variables: variables
          });
        });
      }

      return observable;
    };

    QueryManager.prototype.fetchRequest = function (_a) {
      var _this = this;

      var requestId = _a.requestId,
          queryId = _a.queryId,
          document = _a.document,
          options = _a.options,
          fetchMoreForQueryId = _a.fetchMoreForQueryId;
      var variables = options.variables,
          _b = options.errorPolicy,
          errorPolicy = _b === void 0 ? 'none' : _b,
          fetchPolicy = options.fetchPolicy;
      var resultFromStore;
      var errorsFromStore;
      return new Promise(function (resolve, reject) {
        var observable = _this.getObservableFromLink(document, options.context, variables);

        var fqrfId = "fetchRequest:" + queryId;

        _this.fetchQueryRejectFns.set(fqrfId, reject);

        var cleanup = function () {
          _this.fetchQueryRejectFns.delete(fqrfId);

          _this.setQuery(queryId, function (_a) {
            var subscriptions = _a.subscriptions;
            subscriptions.delete(subscription);
          });
        };

        var subscription = observable.map(function (result) {
          if (requestId >= _this.getQuery(queryId).lastRequestId) {
            _this.markQueryResult(queryId, result, options, fetchMoreForQueryId);

            _this.queryStore.markQueryResult(queryId, result, fetchMoreForQueryId);

            _this.invalidate(queryId);

            _this.invalidate(fetchMoreForQueryId);

            _this.broadcastQueries();
          }

          if (errorPolicy === 'none' && isNonEmptyArray(result.errors)) {
            return reject(new ApolloError({
              graphQLErrors: result.errors
            }));
          }

          if (errorPolicy === 'all') {
            errorsFromStore = result.errors;
          }

          if (fetchMoreForQueryId || fetchPolicy === 'no-cache') {
            resultFromStore = result.data;
          } else {
            var _a = _this.dataStore.getCache().diff({
              variables: variables,
              query: document,
              optimistic: false,
              returnPartialData: true
            }),
                result_1 = _a.result,
                complete = _a.complete;

            if (complete || options.returnPartialData) {
              resultFromStore = result_1;
            }
          }
        }).subscribe({
          error: function (error) {
            cleanup();
            reject(error);
          },
          complete: function () {
            cleanup();
            resolve({
              data: resultFromStore,
              errors: errorsFromStore,
              loading: false,
              networkStatus: NetworkStatus.ready,
              stale: false
            });
          }
        });

        _this.setQuery(queryId, function (_a) {
          var subscriptions = _a.subscriptions;
          subscriptions.add(subscription);
        });
      });
    };

    QueryManager.prototype.getQuery = function (queryId) {
      return this.queries.get(queryId) || {
        listeners: new Set(),
        invalidated: false,
        document: null,
        newData: null,
        lastRequestId: 1,
        observableQuery: null,
        subscriptions: new Set()
      };
    };

    QueryManager.prototype.setQuery = function (queryId, updater) {
      var prev = this.getQuery(queryId);
      var newInfo = (0, _tslib.__assign)((0, _tslib.__assign)({}, prev), updater(prev));
      this.queries.set(queryId, newInfo);
    };

    QueryManager.prototype.invalidate = function (queryId, invalidated) {
      if (invalidated === void 0) {
        invalidated = true;
      }

      if (queryId) {
        this.setQuery(queryId, function () {
          return {
            invalidated: invalidated
          };
        });
      }
    };

    QueryManager.prototype.prepareContext = function (context) {
      if (context === void 0) {
        context = {};
      }

      var newContext = this.localState.prepareContext(context);
      return (0, _tslib.__assign)((0, _tslib.__assign)({}, newContext), {
        clientAwareness: this.clientAwareness
      });
    };

    QueryManager.prototype.checkInFlight = function (queryId) {
      var query = this.queryStore.get(queryId);
      return query && query.networkStatus !== NetworkStatus.ready && query.networkStatus !== NetworkStatus.error;
    };

    QueryManager.prototype.startPollingQuery = function (options, queryId, listener) {
      var _this = this;

      var pollInterval = options.pollInterval;
      process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(pollInterval, 18) : (0, _tsInvariant.invariant)(pollInterval, 'Attempted to start a polling query without a polling interval.');

      if (!this.ssrMode) {
        var info = this.pollingInfoByQueryId.get(queryId);

        if (!info) {
          this.pollingInfoByQueryId.set(queryId, info = {});
        }

        info.interval = pollInterval;
        info.options = (0, _tslib.__assign)((0, _tslib.__assign)({}, options), {
          fetchPolicy: 'network-only'
        });

        var maybeFetch_1 = function () {
          var info = _this.pollingInfoByQueryId.get(queryId);

          if (info) {
            if (_this.checkInFlight(queryId)) {
              poll_1();
            } else {
              _this.fetchQuery(queryId, info.options, FetchType.poll).then(poll_1, poll_1);
            }
          }
        };

        var poll_1 = function () {
          var info = _this.pollingInfoByQueryId.get(queryId);

          if (info) {
            clearTimeout(info.timeout);
            info.timeout = setTimeout(maybeFetch_1, info.interval);
          }
        };

        if (listener) {
          this.addQueryListener(queryId, listener);
        }

        poll_1();
      }

      return queryId;
    };

    QueryManager.prototype.stopPollingQuery = function (queryId) {
      this.pollingInfoByQueryId.delete(queryId);
    };

    return QueryManager;
  }();

  var DataStore = function () {
    function DataStore(initialCache) {
      this.cache = initialCache;
    }

    DataStore.prototype.getCache = function () {
      return this.cache;
    };

    DataStore.prototype.markQueryResult = function (result, document, variables, fetchMoreForQueryId, ignoreErrors) {
      if (ignoreErrors === void 0) {
        ignoreErrors = false;
      }

      var writeWithErrors = !(0, _apolloUtilities.graphQLResultHasError)(result);

      if (ignoreErrors && (0, _apolloUtilities.graphQLResultHasError)(result) && result.data) {
        writeWithErrors = true;
      }

      if (!fetchMoreForQueryId && writeWithErrors) {
        this.cache.write({
          result: result.data,
          dataId: 'ROOT_QUERY',
          query: document,
          variables: variables
        });
      }
    };

    DataStore.prototype.markSubscriptionResult = function (result, document, variables) {
      if (!(0, _apolloUtilities.graphQLResultHasError)(result)) {
        this.cache.write({
          result: result.data,
          dataId: 'ROOT_SUBSCRIPTION',
          query: document,
          variables: variables
        });
      }
    };

    DataStore.prototype.markMutationInit = function (mutation) {
      var _this = this;

      if (mutation.optimisticResponse) {
        var optimistic_1;

        if (typeof mutation.optimisticResponse === 'function') {
          optimistic_1 = mutation.optimisticResponse(mutation.variables);
        } else {
          optimistic_1 = mutation.optimisticResponse;
        }

        this.cache.recordOptimisticTransaction(function (c) {
          var orig = _this.cache;
          _this.cache = c;

          try {
            _this.markMutationResult({
              mutationId: mutation.mutationId,
              result: {
                data: optimistic_1
              },
              document: mutation.document,
              variables: mutation.variables,
              updateQueries: mutation.updateQueries,
              update: mutation.update
            });
          } finally {
            _this.cache = orig;
          }
        }, mutation.mutationId);
      }
    };

    DataStore.prototype.markMutationResult = function (mutation) {
      var _this = this;

      if (!(0, _apolloUtilities.graphQLResultHasError)(mutation.result)) {
        var cacheWrites_1 = [{
          result: mutation.result.data,
          dataId: 'ROOT_MUTATION',
          query: mutation.document,
          variables: mutation.variables
        }];
        var updateQueries_1 = mutation.updateQueries;

        if (updateQueries_1) {
          Object.keys(updateQueries_1).forEach(function (id) {
            var _a = updateQueries_1[id],
                query = _a.query,
                updater = _a.updater;

            var _b = _this.cache.diff({
              query: query.document,
              variables: query.variables,
              returnPartialData: true,
              optimistic: false
            }),
                currentQueryResult = _b.result,
                complete = _b.complete;

            if (complete) {
              var nextQueryResult = (0, _apolloUtilities.tryFunctionOrLogError)(function () {
                return updater(currentQueryResult, {
                  mutationResult: mutation.result,
                  queryName: (0, _apolloUtilities.getOperationName)(query.document) || undefined,
                  queryVariables: query.variables
                });
              });

              if (nextQueryResult) {
                cacheWrites_1.push({
                  result: nextQueryResult,
                  dataId: 'ROOT_QUERY',
                  query: query.document,
                  variables: query.variables
                });
              }
            }
          });
        }

        this.cache.performTransaction(function (c) {
          cacheWrites_1.forEach(function (write) {
            return c.write(write);
          });
          var update = mutation.update;

          if (update) {
            (0, _apolloUtilities.tryFunctionOrLogError)(function () {
              return update(c, mutation.result);
            });
          }
        });
      }
    };

    DataStore.prototype.markMutationComplete = function (_a) {
      var mutationId = _a.mutationId,
          optimisticResponse = _a.optimisticResponse;

      if (optimisticResponse) {
        this.cache.removeOptimistic(mutationId);
      }
    };

    DataStore.prototype.markUpdateQueryResult = function (document, variables, newResult) {
      this.cache.write({
        result: newResult,
        dataId: 'ROOT_QUERY',
        variables: variables,
        query: document
      });
    };

    DataStore.prototype.reset = function () {
      return this.cache.reset();
    };

    return DataStore;
  }();

  var version = "2.6.10";
  var hasSuggestedDevtools = false;

  var ApolloClient = function () {
    function ApolloClient(options) {
      var _this = this;

      this.defaultOptions = {};
      this.resetStoreCallbacks = [];
      this.clearStoreCallbacks = [];
      var cache = options.cache,
          _a = options.ssrMode,
          ssrMode = _a === void 0 ? false : _a,
          _b = options.ssrForceFetchDelay,
          ssrForceFetchDelay = _b === void 0 ? 0 : _b,
          connectToDevTools = options.connectToDevTools,
          _c = options.queryDeduplication,
          queryDeduplication = _c === void 0 ? true : _c,
          defaultOptions = options.defaultOptions,
          _d = options.assumeImmutableResults,
          assumeImmutableResults = _d === void 0 ? false : _d,
          resolvers = options.resolvers,
          typeDefs = options.typeDefs,
          fragmentMatcher = options.fragmentMatcher,
          clientAwarenessName = options.name,
          clientAwarenessVersion = options.version;
      var link = options.link;

      if (!link && resolvers) {
        link = _apolloLink.ApolloLink.empty();
      }

      if (!link || !cache) {
        throw process.env.NODE_ENV === "production" ? new _tsInvariant.InvariantError(4) : new _tsInvariant.InvariantError("In order to initialize Apollo Client, you must specify 'link' and 'cache' properties in the options object.\n" + "These options are part of the upgrade requirements when migrating from Apollo Client 1.x to Apollo Client 2.x.\n" + "For more information, please visit: https://www.apollographql.com/docs/tutorial/client.html#apollo-client-setup");
      }

      this.link = link;
      this.cache = cache;
      this.store = new DataStore(cache);
      this.disableNetworkFetches = ssrMode || ssrForceFetchDelay > 0;
      this.queryDeduplication = queryDeduplication;
      this.defaultOptions = defaultOptions || {};
      this.typeDefs = typeDefs;

      if (ssrForceFetchDelay) {
        setTimeout(function () {
          return _this.disableNetworkFetches = false;
        }, ssrForceFetchDelay);
      }

      this.watchQuery = this.watchQuery.bind(this);
      this.query = this.query.bind(this);
      this.mutate = this.mutate.bind(this);
      this.resetStore = this.resetStore.bind(this);
      this.reFetchObservableQueries = this.reFetchObservableQueries.bind(this);
      var defaultConnectToDevTools = process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && !window.__APOLLO_CLIENT__;

      if (typeof connectToDevTools === 'undefined' ? defaultConnectToDevTools : connectToDevTools && typeof window !== 'undefined') {
        window.__APOLLO_CLIENT__ = this;
      }

      if (!hasSuggestedDevtools && process.env.NODE_ENV !== 'production') {
        hasSuggestedDevtools = true;

        if (typeof window !== 'undefined' && window.document && window.top === window.self) {
          if (typeof window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
            if (window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf('Chrome') > -1) {
              console.debug('Download the Apollo DevTools ' + 'for a better development experience: ' + 'https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm');
            }
          }
        }
      }

      this.version = version;
      this.localState = new LocalState({
        cache: cache,
        client: this,
        resolvers: resolvers,
        fragmentMatcher: fragmentMatcher
      });
      this.queryManager = new QueryManager({
        link: this.link,
        store: this.store,
        queryDeduplication: queryDeduplication,
        ssrMode: ssrMode,
        clientAwareness: {
          name: clientAwarenessName,
          version: clientAwarenessVersion
        },
        localState: this.localState,
        assumeImmutableResults: assumeImmutableResults,
        onBroadcast: function () {
          if (_this.devToolsHookCb) {
            _this.devToolsHookCb({
              action: {},
              state: {
                queries: _this.queryManager.queryStore.getStore(),
                mutations: _this.queryManager.mutationStore.getStore()
              },
              dataWithOptimisticResults: _this.cache.extract(true)
            });
          }
        }
      });
    }

    ApolloClient.prototype.stop = function () {
      this.queryManager.stop();
    };

    ApolloClient.prototype.watchQuery = function (options) {
      if (this.defaultOptions.watchQuery) {
        options = (0, _tslib.__assign)((0, _tslib.__assign)({}, this.defaultOptions.watchQuery), options);
      }

      if (this.disableNetworkFetches && (options.fetchPolicy === 'network-only' || options.fetchPolicy === 'cache-and-network')) {
        options = (0, _tslib.__assign)((0, _tslib.__assign)({}, options), {
          fetchPolicy: 'cache-first'
        });
      }

      return this.queryManager.watchQuery(options);
    };

    ApolloClient.prototype.query = function (options) {
      if (this.defaultOptions.query) {
        options = (0, _tslib.__assign)((0, _tslib.__assign)({}, this.defaultOptions.query), options);
      }

      process.env.NODE_ENV === "production" ? (0, _tsInvariant.invariant)(options.fetchPolicy !== 'cache-and-network', 5) : (0, _tsInvariant.invariant)(options.fetchPolicy !== 'cache-and-network', 'The cache-and-network fetchPolicy does not work with client.query, because ' + 'client.query can only return a single result. Please use client.watchQuery ' + 'to receive multiple results from the cache and the network, or consider ' + 'using a different fetchPolicy, such as cache-first or network-only.');

      if (this.disableNetworkFetches && options.fetchPolicy === 'network-only') {
        options = (0, _tslib.__assign)((0, _tslib.__assign)({}, options), {
          fetchPolicy: 'cache-first'
        });
      }

      return this.queryManager.query(options);
    };

    ApolloClient.prototype.mutate = function (options) {
      if (this.defaultOptions.mutate) {
        options = (0, _tslib.__assign)((0, _tslib.__assign)({}, this.defaultOptions.mutate), options);
      }

      return this.queryManager.mutate(options);
    };

    ApolloClient.prototype.subscribe = function (options) {
      return this.queryManager.startGraphQLSubscription(options);
    };

    ApolloClient.prototype.readQuery = function (options, optimistic) {
      if (optimistic === void 0) {
        optimistic = false;
      }

      return this.cache.readQuery(options, optimistic);
    };

    ApolloClient.prototype.readFragment = function (options, optimistic) {
      if (optimistic === void 0) {
        optimistic = false;
      }

      return this.cache.readFragment(options, optimistic);
    };

    ApolloClient.prototype.writeQuery = function (options) {
      var result = this.cache.writeQuery(options);
      this.queryManager.broadcastQueries();
      return result;
    };

    ApolloClient.prototype.writeFragment = function (options) {
      var result = this.cache.writeFragment(options);
      this.queryManager.broadcastQueries();
      return result;
    };

    ApolloClient.prototype.writeData = function (options) {
      var result = this.cache.writeData(options);
      this.queryManager.broadcastQueries();
      return result;
    };

    ApolloClient.prototype.__actionHookForDevTools = function (cb) {
      this.devToolsHookCb = cb;
    };

    ApolloClient.prototype.__requestRaw = function (payload) {
      return (0, _apolloLink.execute)(this.link, payload);
    };

    ApolloClient.prototype.initQueryManager = function () {
      process.env.NODE_ENV === "production" || _tsInvariant.invariant.warn('Calling the initQueryManager method is no longer necessary, ' + 'and it will be removed from ApolloClient in version 3.0.');
      return this.queryManager;
    };

    ApolloClient.prototype.resetStore = function () {
      var _this = this;

      return Promise.resolve().then(function () {
        return _this.queryManager.clearStore();
      }).then(function () {
        return Promise.all(_this.resetStoreCallbacks.map(function (fn) {
          return fn();
        }));
      }).then(function () {
        return _this.reFetchObservableQueries();
      });
    };

    ApolloClient.prototype.clearStore = function () {
      var _this = this;

      return Promise.resolve().then(function () {
        return _this.queryManager.clearStore();
      }).then(function () {
        return Promise.all(_this.clearStoreCallbacks.map(function (fn) {
          return fn();
        }));
      });
    };

    ApolloClient.prototype.onResetStore = function (cb) {
      var _this = this;

      this.resetStoreCallbacks.push(cb);
      return function () {
        _this.resetStoreCallbacks = _this.resetStoreCallbacks.filter(function (c) {
          return c !== cb;
        });
      };
    };

    ApolloClient.prototype.onClearStore = function (cb) {
      var _this = this;

      this.clearStoreCallbacks.push(cb);
      return function () {
        _this.clearStoreCallbacks = _this.clearStoreCallbacks.filter(function (c) {
          return c !== cb;
        });
      };
    };

    ApolloClient.prototype.reFetchObservableQueries = function (includeStandby) {
      return this.queryManager.reFetchObservableQueries(includeStandby);
    };

    ApolloClient.prototype.extract = function (optimistic) {
      return this.cache.extract(optimistic);
    };

    ApolloClient.prototype.restore = function (serializedState) {
      return this.cache.restore(serializedState);
    };

    ApolloClient.prototype.addResolvers = function (resolvers) {
      this.localState.addResolvers(resolvers);
    };

    ApolloClient.prototype.setResolvers = function (resolvers) {
      this.localState.setResolvers(resolvers);
    };

    ApolloClient.prototype.getResolvers = function () {
      return this.localState.getResolvers();
    };

    ApolloClient.prototype.setLocalStateFragmentMatcher = function (fragmentMatcher) {
      this.localState.setFragmentMatcher(fragmentMatcher);
    };

    return ApolloClient;
  }();

  _exports.ApolloClient = ApolloClient;
  var _default = ApolloClient; 

  _exports.default = _default;
});

}).call(this)}).call(this,require('_process'))
},{"_process":1,"apollo-link":3,"apollo-utilities":6,"graphql/language/visitor":13,"symbol-observable":14,"ts-invariant":16,"tslib":17}]},{},[]);
