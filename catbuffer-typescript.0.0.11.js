require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
var AccountAddressRestrictionTransactionBodyBuilder = (function () {
    function AccountAddressRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions) {
        this.restrictionFlags = restrictionFlags;
        this.accountRestrictionTransactionBody_Reserved1 = 0;
        this.restrictionAdditions = restrictionAdditions;
        this.restrictionDeletions = restrictionDeletions;
    }
    AccountAddressRestrictionTransactionBodyBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var restrictionFlags = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        var restrictionAdditionsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var restrictionDeletionsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var accountRestrictionTransactionBody_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        var restrictionAdditions = [];
        for (var i = 0; i < (Array.isArray(restrictionAdditionsCount) ? GeneratorUtils_1.GeneratorUtils.compact(restrictionAdditionsCount) : restrictionAdditionsCount); i++) {
            var item = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
            restrictionAdditions.push(item);
            byteArray.splice(0, item.getSize());
        }
        var restrictionDeletions = [];
        for (var i = 0; i < (Array.isArray(restrictionDeletionsCount) ? GeneratorUtils_1.GeneratorUtils.compact(restrictionDeletionsCount) : restrictionDeletionsCount); i++) {
            var item = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
            restrictionDeletions.push(item);
            byteArray.splice(0, item.getSize());
        }
        return new AccountAddressRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
    };
    AccountAddressRestrictionTransactionBodyBuilder.prototype.getRestrictionFlags = function () {
        return this.restrictionFlags;
    };
    AccountAddressRestrictionTransactionBodyBuilder.prototype.getAccountRestrictionTransactionBody_Reserved1 = function () {
        return this.accountRestrictionTransactionBody_Reserved1;
    };
    AccountAddressRestrictionTransactionBodyBuilder.prototype.getRestrictionAdditions = function () {
        return this.restrictionAdditions;
    };
    AccountAddressRestrictionTransactionBodyBuilder.prototype.getRestrictionDeletions = function () {
        return this.restrictionDeletions;
    };
    AccountAddressRestrictionTransactionBodyBuilder.prototype.getSize = function () {
        var size = 0;
        size += 2;
        size += 1;
        size += 1;
        size += 4;
        this.restrictionAdditions.forEach(function (o) { return size += o.getSize(); });
        this.restrictionDeletions.forEach(function (o) { return size += o.getSize(); });
        return size;
    };
    AccountAddressRestrictionTransactionBodyBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var restrictionFlagsBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getRestrictionFlags(), 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionFlagsBytes);
        var restrictionAdditionsCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.restrictionAdditions.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionAdditionsCountBytes);
        var restrictionDeletionsCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.restrictionDeletions.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionDeletionsCountBytes);
        var accountRestrictionTransactionBody_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getAccountRestrictionTransactionBody_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountRestrictionTransactionBody_Reserved1Bytes);
        this.restrictionAdditions.forEach(function (item) {
            var restrictionAdditionsBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionAdditionsBytes);
        });
        this.restrictionDeletions.forEach(function (item) {
            var restrictionDeletionsBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionDeletionsBytes);
        });
        return newArray;
    };
    return AccountAddressRestrictionTransactionBodyBuilder;
}());
exports.AccountAddressRestrictionTransactionBodyBuilder = AccountAddressRestrictionTransactionBodyBuilder;

},{"./GeneratorUtils":60,"./UnresolvedAddressDto":134}],2:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AccountAddressRestrictionTransactionBodyBuilder_1 = require("./AccountAddressRestrictionTransactionBodyBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var TransactionBuilder_1 = require("./TransactionBuilder");
var AccountAddressRestrictionTransactionBuilder = (function (_super) {
    __extends(AccountAddressRestrictionTransactionBuilder, _super);
    function AccountAddressRestrictionTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        var _this = _super.call(this, signature, signerPublicKey, version, network, type, fee, deadline) || this;
        _this.accountAddressRestrictionTransactionBody = new AccountAddressRestrictionTransactionBodyBuilder_1.AccountAddressRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
        return _this;
    }
    AccountAddressRestrictionTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var accountAddressRestrictionTransactionBody = AccountAddressRestrictionTransactionBodyBuilder_1.AccountAddressRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountAddressRestrictionTransactionBody.getSize());
        return new AccountAddressRestrictionTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, accountAddressRestrictionTransactionBody.restrictionFlags, accountAddressRestrictionTransactionBody.restrictionAdditions, accountAddressRestrictionTransactionBody.restrictionDeletions);
    };
    AccountAddressRestrictionTransactionBuilder.prototype.getRestrictionFlags = function () {
        return this.accountAddressRestrictionTransactionBody.getRestrictionFlags();
    };
    AccountAddressRestrictionTransactionBuilder.prototype.getAccountRestrictionTransactionBody_Reserved1 = function () {
        return this.accountAddressRestrictionTransactionBody.getAccountRestrictionTransactionBody_Reserved1();
    };
    AccountAddressRestrictionTransactionBuilder.prototype.getRestrictionAdditions = function () {
        return this.accountAddressRestrictionTransactionBody.getRestrictionAdditions();
    };
    AccountAddressRestrictionTransactionBuilder.prototype.getRestrictionDeletions = function () {
        return this.accountAddressRestrictionTransactionBody.getRestrictionDeletions();
    };
    AccountAddressRestrictionTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.accountAddressRestrictionTransactionBody.getSize();
        return size;
    };
    AccountAddressRestrictionTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var accountAddressRestrictionTransactionBodyBytes = this.accountAddressRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountAddressRestrictionTransactionBodyBytes);
        return newArray;
    };
    return AccountAddressRestrictionTransactionBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.AccountAddressRestrictionTransactionBuilder = AccountAddressRestrictionTransactionBuilder;

},{"./AccountAddressRestrictionTransactionBodyBuilder":1,"./GeneratorUtils":60,"./TransactionBuilder":130}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var KeyDto_1 = require("./KeyDto");
var AccountLinkTransactionBodyBuilder = (function () {
    function AccountLinkTransactionBodyBuilder(remotePublicKey, linkAction) {
        this.remotePublicKey = remotePublicKey;
        this.linkAction = linkAction;
    }
    AccountLinkTransactionBodyBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var remotePublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, remotePublicKey.getSize());
        var linkAction = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        return new AccountLinkTransactionBodyBuilder(remotePublicKey, linkAction);
    };
    AccountLinkTransactionBodyBuilder.prototype.getRemotePublicKey = function () {
        return this.remotePublicKey;
    };
    AccountLinkTransactionBodyBuilder.prototype.getLinkAction = function () {
        return this.linkAction;
    };
    AccountLinkTransactionBodyBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.remotePublicKey.getSize();
        size += 1;
        return size;
    };
    AccountLinkTransactionBodyBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var remotePublicKeyBytes = this.remotePublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, remotePublicKeyBytes);
        var linkActionBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.linkAction, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, linkActionBytes);
        return newArray;
    };
    return AccountLinkTransactionBodyBuilder;
}());
exports.AccountLinkTransactionBodyBuilder = AccountLinkTransactionBodyBuilder;

},{"./GeneratorUtils":60,"./KeyDto":75}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AccountLinkTransactionBodyBuilder_1 = require("./AccountLinkTransactionBodyBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var TransactionBuilder_1 = require("./TransactionBuilder");
var AccountLinkTransactionBuilder = (function (_super) {
    __extends(AccountLinkTransactionBuilder, _super);
    function AccountLinkTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, remotePublicKey, linkAction) {
        var _this = _super.call(this, signature, signerPublicKey, version, network, type, fee, deadline) || this;
        _this.accountLinkTransactionBody = new AccountLinkTransactionBodyBuilder_1.AccountLinkTransactionBodyBuilder(remotePublicKey, linkAction);
        return _this;
    }
    AccountLinkTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var accountLinkTransactionBody = AccountLinkTransactionBodyBuilder_1.AccountLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountLinkTransactionBody.getSize());
        return new AccountLinkTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, accountLinkTransactionBody.remotePublicKey, accountLinkTransactionBody.linkAction);
    };
    AccountLinkTransactionBuilder.prototype.getRemotePublicKey = function () {
        return this.accountLinkTransactionBody.getRemotePublicKey();
    };
    AccountLinkTransactionBuilder.prototype.getLinkAction = function () {
        return this.accountLinkTransactionBody.getLinkAction();
    };
    AccountLinkTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.accountLinkTransactionBody.getSize();
        return size;
    };
    AccountLinkTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var accountLinkTransactionBodyBytes = this.accountLinkTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountLinkTransactionBodyBytes);
        return newArray;
    };
    return AccountLinkTransactionBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.AccountLinkTransactionBuilder = AccountLinkTransactionBuilder;

},{"./AccountLinkTransactionBodyBuilder":3,"./GeneratorUtils":60,"./TransactionBuilder":130}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var KeyDto_1 = require("./KeyDto");
var AccountMetadataTransactionBodyBuilder = (function () {
    function AccountMetadataTransactionBodyBuilder(targetPublicKey, scopedMetadataKey, valueSizeDelta, value) {
        this.targetPublicKey = targetPublicKey;
        this.scopedMetadataKey = scopedMetadataKey;
        this.valueSizeDelta = valueSizeDelta;
        this.value = value;
    }
    AccountMetadataTransactionBodyBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var targetPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetPublicKey.getSize());
        var scopedMetadataKey = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        var valueSizeDelta = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        var valueSize = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        var value = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), valueSize);
        byteArray.splice(0, valueSize);
        return new AccountMetadataTransactionBodyBuilder(targetPublicKey, scopedMetadataKey, valueSizeDelta, value);
    };
    AccountMetadataTransactionBodyBuilder.prototype.getTargetPublicKey = function () {
        return this.targetPublicKey;
    };
    AccountMetadataTransactionBodyBuilder.prototype.getScopedMetadataKey = function () {
        return this.scopedMetadataKey;
    };
    AccountMetadataTransactionBodyBuilder.prototype.getValueSizeDelta = function () {
        return this.valueSizeDelta;
    };
    AccountMetadataTransactionBodyBuilder.prototype.getValue = function () {
        return this.value;
    };
    AccountMetadataTransactionBodyBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.targetPublicKey.getSize();
        size += 8;
        size += 2;
        size += 2;
        size += this.value.length;
        return size;
    };
    AccountMetadataTransactionBodyBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var targetPublicKeyBytes = this.targetPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetPublicKeyBytes);
        var scopedMetadataKeyBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getScopedMetadataKey());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, scopedMetadataKeyBytes);
        var valueSizeDeltaBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getValueSizeDelta(), 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueSizeDeltaBytes);
        var valueSizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.value.length, 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueSizeBytes);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.value);
        return newArray;
    };
    return AccountMetadataTransactionBodyBuilder;
}());
exports.AccountMetadataTransactionBodyBuilder = AccountMetadataTransactionBodyBuilder;

},{"./GeneratorUtils":60,"./KeyDto":75}],6:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AccountMetadataTransactionBodyBuilder_1 = require("./AccountMetadataTransactionBodyBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var TransactionBuilder_1 = require("./TransactionBuilder");
var AccountMetadataTransactionBuilder = (function (_super) {
    __extends(AccountMetadataTransactionBuilder, _super);
    function AccountMetadataTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, targetPublicKey, scopedMetadataKey, valueSizeDelta, value) {
        var _this = _super.call(this, signature, signerPublicKey, version, network, type, fee, deadline) || this;
        _this.accountMetadataTransactionBody = new AccountMetadataTransactionBodyBuilder_1.AccountMetadataTransactionBodyBuilder(targetPublicKey, scopedMetadataKey, valueSizeDelta, value);
        return _this;
    }
    AccountMetadataTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var accountMetadataTransactionBody = AccountMetadataTransactionBodyBuilder_1.AccountMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountMetadataTransactionBody.getSize());
        return new AccountMetadataTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, accountMetadataTransactionBody.targetPublicKey, accountMetadataTransactionBody.scopedMetadataKey, accountMetadataTransactionBody.valueSizeDelta, accountMetadataTransactionBody.value);
    };
    AccountMetadataTransactionBuilder.prototype.getTargetPublicKey = function () {
        return this.accountMetadataTransactionBody.getTargetPublicKey();
    };
    AccountMetadataTransactionBuilder.prototype.getScopedMetadataKey = function () {
        return this.accountMetadataTransactionBody.getScopedMetadataKey();
    };
    AccountMetadataTransactionBuilder.prototype.getValueSizeDelta = function () {
        return this.accountMetadataTransactionBody.getValueSizeDelta();
    };
    AccountMetadataTransactionBuilder.prototype.getValue = function () {
        return this.accountMetadataTransactionBody.getValue();
    };
    AccountMetadataTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.accountMetadataTransactionBody.getSize();
        return size;
    };
    AccountMetadataTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var accountMetadataTransactionBodyBytes = this.accountMetadataTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountMetadataTransactionBodyBytes);
        return newArray;
    };
    return AccountMetadataTransactionBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.AccountMetadataTransactionBuilder = AccountMetadataTransactionBuilder;

},{"./AccountMetadataTransactionBodyBuilder":5,"./GeneratorUtils":60,"./TransactionBuilder":130}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var UnresolvedMosaicIdDto_1 = require("./UnresolvedMosaicIdDto");
var AccountMosaicRestrictionTransactionBodyBuilder = (function () {
    function AccountMosaicRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions) {
        this.restrictionFlags = restrictionFlags;
        this.accountRestrictionTransactionBody_Reserved1 = 0;
        this.restrictionAdditions = restrictionAdditions;
        this.restrictionDeletions = restrictionDeletions;
    }
    AccountMosaicRestrictionTransactionBodyBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var restrictionFlags = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        var restrictionAdditionsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var restrictionDeletionsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var accountRestrictionTransactionBody_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        var restrictionAdditions = [];
        for (var i = 0; i < (Array.isArray(restrictionAdditionsCount) ? GeneratorUtils_1.GeneratorUtils.compact(restrictionAdditionsCount) : restrictionAdditionsCount); i++) {
            var item = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
            restrictionAdditions.push(item);
            byteArray.splice(0, item.getSize());
        }
        var restrictionDeletions = [];
        for (var i = 0; i < (Array.isArray(restrictionDeletionsCount) ? GeneratorUtils_1.GeneratorUtils.compact(restrictionDeletionsCount) : restrictionDeletionsCount); i++) {
            var item = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
            restrictionDeletions.push(item);
            byteArray.splice(0, item.getSize());
        }
        return new AccountMosaicRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
    };
    AccountMosaicRestrictionTransactionBodyBuilder.prototype.getRestrictionFlags = function () {
        return this.restrictionFlags;
    };
    AccountMosaicRestrictionTransactionBodyBuilder.prototype.getAccountRestrictionTransactionBody_Reserved1 = function () {
        return this.accountRestrictionTransactionBody_Reserved1;
    };
    AccountMosaicRestrictionTransactionBodyBuilder.prototype.getRestrictionAdditions = function () {
        return this.restrictionAdditions;
    };
    AccountMosaicRestrictionTransactionBodyBuilder.prototype.getRestrictionDeletions = function () {
        return this.restrictionDeletions;
    };
    AccountMosaicRestrictionTransactionBodyBuilder.prototype.getSize = function () {
        var size = 0;
        size += 2;
        size += 1;
        size += 1;
        size += 4;
        this.restrictionAdditions.forEach(function (o) { return size += o.getSize(); });
        this.restrictionDeletions.forEach(function (o) { return size += o.getSize(); });
        return size;
    };
    AccountMosaicRestrictionTransactionBodyBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var restrictionFlagsBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getRestrictionFlags(), 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionFlagsBytes);
        var restrictionAdditionsCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.restrictionAdditions.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionAdditionsCountBytes);
        var restrictionDeletionsCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.restrictionDeletions.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionDeletionsCountBytes);
        var accountRestrictionTransactionBody_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getAccountRestrictionTransactionBody_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountRestrictionTransactionBody_Reserved1Bytes);
        this.restrictionAdditions.forEach(function (item) {
            var restrictionAdditionsBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionAdditionsBytes);
        });
        this.restrictionDeletions.forEach(function (item) {
            var restrictionDeletionsBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionDeletionsBytes);
        });
        return newArray;
    };
    return AccountMosaicRestrictionTransactionBodyBuilder;
}());
exports.AccountMosaicRestrictionTransactionBodyBuilder = AccountMosaicRestrictionTransactionBodyBuilder;

},{"./GeneratorUtils":60,"./UnresolvedMosaicIdDto":136}],8:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AccountMosaicRestrictionTransactionBodyBuilder_1 = require("./AccountMosaicRestrictionTransactionBodyBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var TransactionBuilder_1 = require("./TransactionBuilder");
var AccountMosaicRestrictionTransactionBuilder = (function (_super) {
    __extends(AccountMosaicRestrictionTransactionBuilder, _super);
    function AccountMosaicRestrictionTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        var _this = _super.call(this, signature, signerPublicKey, version, network, type, fee, deadline) || this;
        _this.accountMosaicRestrictionTransactionBody = new AccountMosaicRestrictionTransactionBodyBuilder_1.AccountMosaicRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
        return _this;
    }
    AccountMosaicRestrictionTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var accountMosaicRestrictionTransactionBody = AccountMosaicRestrictionTransactionBodyBuilder_1.AccountMosaicRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountMosaicRestrictionTransactionBody.getSize());
        return new AccountMosaicRestrictionTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, accountMosaicRestrictionTransactionBody.restrictionFlags, accountMosaicRestrictionTransactionBody.restrictionAdditions, accountMosaicRestrictionTransactionBody.restrictionDeletions);
    };
    AccountMosaicRestrictionTransactionBuilder.prototype.getRestrictionFlags = function () {
        return this.accountMosaicRestrictionTransactionBody.getRestrictionFlags();
    };
    AccountMosaicRestrictionTransactionBuilder.prototype.getAccountRestrictionTransactionBody_Reserved1 = function () {
        return this.accountMosaicRestrictionTransactionBody.getAccountRestrictionTransactionBody_Reserved1();
    };
    AccountMosaicRestrictionTransactionBuilder.prototype.getRestrictionAdditions = function () {
        return this.accountMosaicRestrictionTransactionBody.getRestrictionAdditions();
    };
    AccountMosaicRestrictionTransactionBuilder.prototype.getRestrictionDeletions = function () {
        return this.accountMosaicRestrictionTransactionBody.getRestrictionDeletions();
    };
    AccountMosaicRestrictionTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.accountMosaicRestrictionTransactionBody.getSize();
        return size;
    };
    AccountMosaicRestrictionTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var accountMosaicRestrictionTransactionBodyBytes = this.accountMosaicRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountMosaicRestrictionTransactionBodyBytes);
        return newArray;
    };
    return AccountMosaicRestrictionTransactionBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.AccountMosaicRestrictionTransactionBuilder = AccountMosaicRestrictionTransactionBuilder;

},{"./AccountMosaicRestrictionTransactionBodyBuilder":7,"./GeneratorUtils":60,"./TransactionBuilder":130}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var AccountOperationRestrictionTransactionBodyBuilder = (function () {
    function AccountOperationRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions) {
        this.restrictionFlags = restrictionFlags;
        this.accountRestrictionTransactionBody_Reserved1 = 0;
        this.restrictionAdditions = restrictionAdditions;
        this.restrictionDeletions = restrictionDeletions;
    }
    AccountOperationRestrictionTransactionBodyBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var restrictionFlags = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        var restrictionAdditionsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var restrictionDeletionsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var accountRestrictionTransactionBody_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        var restrictionAdditions = [];
        for (var i = 0; i < (Array.isArray(restrictionAdditionsCount) ? GeneratorUtils_1.GeneratorUtils.compact(restrictionAdditionsCount) : restrictionAdditionsCount); i++) {
            var item = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
            restrictionAdditions.push(item);
            byteArray.splice(0, 2);
        }
        var restrictionDeletions = [];
        for (var i = 0; i < (Array.isArray(restrictionDeletionsCount) ? GeneratorUtils_1.GeneratorUtils.compact(restrictionDeletionsCount) : restrictionDeletionsCount); i++) {
            var item = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
            restrictionDeletions.push(item);
            byteArray.splice(0, 2);
        }
        return new AccountOperationRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
    };
    AccountOperationRestrictionTransactionBodyBuilder.prototype.getRestrictionFlags = function () {
        return this.restrictionFlags;
    };
    AccountOperationRestrictionTransactionBodyBuilder.prototype.getAccountRestrictionTransactionBody_Reserved1 = function () {
        return this.accountRestrictionTransactionBody_Reserved1;
    };
    AccountOperationRestrictionTransactionBodyBuilder.prototype.getRestrictionAdditions = function () {
        return this.restrictionAdditions;
    };
    AccountOperationRestrictionTransactionBodyBuilder.prototype.getRestrictionDeletions = function () {
        return this.restrictionDeletions;
    };
    AccountOperationRestrictionTransactionBodyBuilder.prototype.getSize = function () {
        var size = 0;
        size += 2;
        size += 1;
        size += 1;
        size += 4;
        this.restrictionAdditions.forEach(function () { return size += 2; });
        this.restrictionDeletions.forEach(function () { return size += 2; });
        return size;
    };
    AccountOperationRestrictionTransactionBodyBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var restrictionFlagsBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getRestrictionFlags(), 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionFlagsBytes);
        var restrictionAdditionsCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.restrictionAdditions.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionAdditionsCountBytes);
        var restrictionDeletionsCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.restrictionDeletions.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionDeletionsCountBytes);
        var accountRestrictionTransactionBody_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getAccountRestrictionTransactionBody_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountRestrictionTransactionBody_Reserved1Bytes);
        this.restrictionAdditions.forEach(function (item) {
            var restrictionAdditionsBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(item, 2);
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionAdditionsBytes);
        });
        this.restrictionDeletions.forEach(function (item) {
            var restrictionDeletionsBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(item, 2);
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionDeletionsBytes);
        });
        return newArray;
    };
    return AccountOperationRestrictionTransactionBodyBuilder;
}());
exports.AccountOperationRestrictionTransactionBodyBuilder = AccountOperationRestrictionTransactionBodyBuilder;

},{"./GeneratorUtils":60}],10:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AccountOperationRestrictionTransactionBodyBuilder_1 = require("./AccountOperationRestrictionTransactionBodyBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var TransactionBuilder_1 = require("./TransactionBuilder");
var AccountOperationRestrictionTransactionBuilder = (function (_super) {
    __extends(AccountOperationRestrictionTransactionBuilder, _super);
    function AccountOperationRestrictionTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        var _this = _super.call(this, signature, signerPublicKey, version, network, type, fee, deadline) || this;
        _this.accountOperationRestrictionTransactionBody = new AccountOperationRestrictionTransactionBodyBuilder_1.AccountOperationRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
        return _this;
    }
    AccountOperationRestrictionTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var accountOperationRestrictionTransactionBody = AccountOperationRestrictionTransactionBodyBuilder_1.AccountOperationRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountOperationRestrictionTransactionBody.getSize());
        return new AccountOperationRestrictionTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, accountOperationRestrictionTransactionBody.restrictionFlags, accountOperationRestrictionTransactionBody.restrictionAdditions, accountOperationRestrictionTransactionBody.restrictionDeletions);
    };
    AccountOperationRestrictionTransactionBuilder.prototype.getRestrictionFlags = function () {
        return this.accountOperationRestrictionTransactionBody.getRestrictionFlags();
    };
    AccountOperationRestrictionTransactionBuilder.prototype.getAccountRestrictionTransactionBody_Reserved1 = function () {
        return this.accountOperationRestrictionTransactionBody.getAccountRestrictionTransactionBody_Reserved1();
    };
    AccountOperationRestrictionTransactionBuilder.prototype.getRestrictionAdditions = function () {
        return this.accountOperationRestrictionTransactionBody.getRestrictionAdditions();
    };
    AccountOperationRestrictionTransactionBuilder.prototype.getRestrictionDeletions = function () {
        return this.accountOperationRestrictionTransactionBody.getRestrictionDeletions();
    };
    AccountOperationRestrictionTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.accountOperationRestrictionTransactionBody.getSize();
        return size;
    };
    AccountOperationRestrictionTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var accountOperationRestrictionTransactionBodyBytes = this.accountOperationRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountOperationRestrictionTransactionBodyBytes);
        return newArray;
    };
    return AccountOperationRestrictionTransactionBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.AccountOperationRestrictionTransactionBuilder = AccountOperationRestrictionTransactionBuilder;

},{"./AccountOperationRestrictionTransactionBodyBuilder":9,"./GeneratorUtils":60,"./TransactionBuilder":130}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AddressDto_1 = require("./AddressDto");
var GeneratorUtils_1 = require("./GeneratorUtils");
var AccountRestrictionAddressValueBuilder = (function () {
    function AccountRestrictionAddressValueBuilder(restrictionValues) {
        this.restrictionValues = restrictionValues;
    }
    AccountRestrictionAddressValueBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var restrictionValuesCount = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        var restrictionValues = [];
        for (var i = 0; i < (Array.isArray(restrictionValuesCount) ? GeneratorUtils_1.GeneratorUtils.compact(restrictionValuesCount) : restrictionValuesCount); i++) {
            var item = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
            restrictionValues.push(item);
            byteArray.splice(0, item.getSize());
        }
        return new AccountRestrictionAddressValueBuilder(restrictionValues);
    };
    AccountRestrictionAddressValueBuilder.prototype.getRestrictionValues = function () {
        return this.restrictionValues;
    };
    AccountRestrictionAddressValueBuilder.prototype.getSize = function () {
        var size = 0;
        size += 8;
        this.restrictionValues.forEach(function (o) { return size += o.getSize(); });
        return size;
    };
    AccountRestrictionAddressValueBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var restrictionValuesCountBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(GeneratorUtils_1.GeneratorUtils.fromUint(this.restrictionValues.length));
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionValuesCountBytes);
        this.restrictionValues.forEach(function (item) {
            var restrictionValuesBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionValuesBytes);
        });
        return newArray;
    };
    return AccountRestrictionAddressValueBuilder;
}());
exports.AccountRestrictionAddressValueBuilder = AccountRestrictionAddressValueBuilder;

},{"./AddressDto":20,"./GeneratorUtils":60}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicIdDto_1 = require("./MosaicIdDto");
var AccountRestrictionMosaicValueBuilder = (function () {
    function AccountRestrictionMosaicValueBuilder(restrictionValues) {
        this.restrictionValues = restrictionValues;
    }
    AccountRestrictionMosaicValueBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var restrictionValuesCount = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        var restrictionValues = [];
        for (var i = 0; i < (Array.isArray(restrictionValuesCount) ? GeneratorUtils_1.GeneratorUtils.compact(restrictionValuesCount) : restrictionValuesCount); i++) {
            var item = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
            restrictionValues.push(item);
            byteArray.splice(0, item.getSize());
        }
        return new AccountRestrictionMosaicValueBuilder(restrictionValues);
    };
    AccountRestrictionMosaicValueBuilder.prototype.getRestrictionValues = function () {
        return this.restrictionValues;
    };
    AccountRestrictionMosaicValueBuilder.prototype.getSize = function () {
        var size = 0;
        size += 8;
        this.restrictionValues.forEach(function (o) { return size += o.getSize(); });
        return size;
    };
    AccountRestrictionMosaicValueBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var restrictionValuesCountBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(GeneratorUtils_1.GeneratorUtils.fromUint(this.restrictionValues.length));
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionValuesCountBytes);
        this.restrictionValues.forEach(function (item) {
            var restrictionValuesBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionValuesBytes);
        });
        return newArray;
    };
    return AccountRestrictionMosaicValueBuilder;
}());
exports.AccountRestrictionMosaicValueBuilder = AccountRestrictionMosaicValueBuilder;

},{"./GeneratorUtils":60,"./MosaicIdDto":92}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var AccountRestrictionTransactionTypeValueBuilder = (function () {
    function AccountRestrictionTransactionTypeValueBuilder(restrictionValues) {
        this.restrictionValues = restrictionValues;
    }
    AccountRestrictionTransactionTypeValueBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var restrictionValuesCount = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        var restrictionValues = [];
        for (var i = 0; i < (Array.isArray(restrictionValuesCount) ? GeneratorUtils_1.GeneratorUtils.compact(restrictionValuesCount) : restrictionValuesCount); i++) {
            var item = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
            restrictionValues.push(item);
            byteArray.splice(0, 2);
        }
        return new AccountRestrictionTransactionTypeValueBuilder(restrictionValues);
    };
    AccountRestrictionTransactionTypeValueBuilder.prototype.getRestrictionValues = function () {
        return this.restrictionValues;
    };
    AccountRestrictionTransactionTypeValueBuilder.prototype.getSize = function () {
        var size = 0;
        size += 8;
        this.restrictionValues.forEach(function () { return size += 2; });
        return size;
    };
    AccountRestrictionTransactionTypeValueBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var restrictionValuesCountBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(GeneratorUtils_1.GeneratorUtils.fromUint(this.restrictionValues.length));
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionValuesCountBytes);
        this.restrictionValues.forEach(function (item) {
            var restrictionValuesBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(item, 2);
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionValuesBytes);
        });
        return newArray;
    };
    return AccountRestrictionTransactionTypeValueBuilder;
}());
exports.AccountRestrictionTransactionTypeValueBuilder = AccountRestrictionTransactionTypeValueBuilder;

},{"./GeneratorUtils":60}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccountRestrictionsInfoBuilder_1 = require("./AccountRestrictionsInfoBuilder");
var AddressDto_1 = require("./AddressDto");
var GeneratorUtils_1 = require("./GeneratorUtils");
var AccountRestrictionsBuilder = (function () {
    function AccountRestrictionsBuilder(address, restrictions) {
        this.address = address;
        this.restrictions = restrictions;
    }
    AccountRestrictionsBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var address = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, address.getSize());
        var restrictionsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        var restrictions = [];
        for (var i = 0; i < (Array.isArray(restrictionsCount) ? GeneratorUtils_1.GeneratorUtils.compact(restrictionsCount) : restrictionsCount); i++) {
            var item = AccountRestrictionsInfoBuilder_1.AccountRestrictionsInfoBuilder.loadFromBinary(Uint8Array.from(byteArray));
            restrictions.push(item);
            byteArray.splice(0, item.getSize());
        }
        return new AccountRestrictionsBuilder(address, restrictions);
    };
    AccountRestrictionsBuilder.prototype.getAddress = function () {
        return this.address;
    };
    AccountRestrictionsBuilder.prototype.getRestrictions = function () {
        return this.restrictions;
    };
    AccountRestrictionsBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.address.getSize();
        size += 8;
        this.restrictions.forEach(function (o) { return size += o.getSize(); });
        return size;
    };
    AccountRestrictionsBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var addressBytes = this.address.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressBytes);
        var restrictionsCountBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(GeneratorUtils_1.GeneratorUtils.fromUint(this.restrictions.length));
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionsCountBytes);
        this.restrictions.forEach(function (item) {
            var restrictionsBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionsBytes);
        });
        return newArray;
    };
    return AccountRestrictionsBuilder;
}());
exports.AccountRestrictionsBuilder = AccountRestrictionsBuilder;

},{"./AccountRestrictionsInfoBuilder":15,"./AddressDto":20,"./GeneratorUtils":60}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccountRestrictionAddressValueBuilder_1 = require("./AccountRestrictionAddressValueBuilder");
var AccountRestrictionMosaicValueBuilder_1 = require("./AccountRestrictionMosaicValueBuilder");
var AccountRestrictionTransactionTypeValueBuilder_1 = require("./AccountRestrictionTransactionTypeValueBuilder");
var ExpandedAccountRestrictionFlagsDto_1 = require("./ExpandedAccountRestrictionFlagsDto");
var GeneratorUtils_1 = require("./GeneratorUtils");
var AccountRestrictionsInfoBuilder = (function () {
    function AccountRestrictionsInfoBuilder(restrictions1, restrictions2, restrictions3, restrictions4, restrictions5, restrictions6, restrictions7, restrictions8) {
        if ((restrictions1 && restrictions2 && restrictions3 && restrictions4 && restrictions5 && restrictions6 && restrictions7 && restrictions8) || (!restrictions1 && !restrictions2 && !restrictions3 && !restrictions4 && !restrictions5 && !restrictions6 && !restrictions7 && !restrictions8)) {
            throw new Error('Invalid conditional parameters');
        }
        this.restrictions1 = restrictions1;
        this.restrictions2 = restrictions2;
        this.restrictions3 = restrictions3;
        this.restrictions4 = restrictions4;
        this.restrictions5 = restrictions5;
        this.restrictions6 = restrictions6;
        this.restrictions7 = restrictions7;
        this.restrictions8 = restrictions8;
        if (restrictions1) {
            this.restrictionFlags = ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.ADDRESS;
        }
        else if (restrictions2) {
            this.restrictionFlags = ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.ADDRESS_OUTGOING;
        }
        else if (restrictions3) {
            this.restrictionFlags = ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.ADDRESS_BLOCK;
        }
        else if (restrictions4) {
            this.restrictionFlags = ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.ADDRESS_OUTGOING_BLOCK;
        }
        else if (restrictions5) {
            this.restrictionFlags = ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.MOSAIC_ID;
        }
        else if (restrictions6) {
            this.restrictionFlags = ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.MOSAIC_ID_BLOCK;
        }
        else if (restrictions7) {
            this.restrictionFlags = ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.TRANSACTION_TYPE_OUTGOING;
        }
        else {
            this.restrictionFlags = ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.TRANSACTION_TYPE_OUTGOING_BLOCK;
        }
    }
    AccountRestrictionsInfoBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var restrictionFlags = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        var restrictionFlagsConditionBytes = Uint8Array.from(byteArray.slice(0, 1));
        byteArray.splice(0, 1);
        var restrictions1;
        if (restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.ADDRESS) {
            restrictions1 = AccountRestrictionAddressValueBuilder_1.AccountRestrictionAddressValueBuilder.loadFromBinary(restrictionFlagsConditionBytes);
        }
        var restrictions2;
        if (restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.ADDRESS_OUTGOING) {
            restrictions2 = AccountRestrictionAddressValueBuilder_1.AccountRestrictionAddressValueBuilder.loadFromBinary(restrictionFlagsConditionBytes);
        }
        var restrictions3;
        if (restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.ADDRESS_BLOCK) {
            restrictions3 = AccountRestrictionAddressValueBuilder_1.AccountRestrictionAddressValueBuilder.loadFromBinary(restrictionFlagsConditionBytes);
        }
        var restrictions4;
        if (restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.ADDRESS_OUTGOING_BLOCK) {
            restrictions4 = AccountRestrictionAddressValueBuilder_1.AccountRestrictionAddressValueBuilder.loadFromBinary(restrictionFlagsConditionBytes);
        }
        var restrictions5;
        if (restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.MOSAIC_ID) {
            restrictions5 = AccountRestrictionMosaicValueBuilder_1.AccountRestrictionMosaicValueBuilder.loadFromBinary(restrictionFlagsConditionBytes);
        }
        var restrictions6;
        if (restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.MOSAIC_ID_BLOCK) {
            restrictions6 = AccountRestrictionMosaicValueBuilder_1.AccountRestrictionMosaicValueBuilder.loadFromBinary(restrictionFlagsConditionBytes);
        }
        var restrictions7;
        if (restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.TRANSACTION_TYPE_OUTGOING) {
            restrictions7 = AccountRestrictionTransactionTypeValueBuilder_1.AccountRestrictionTransactionTypeValueBuilder.loadFromBinary(restrictionFlagsConditionBytes);
        }
        var restrictions8;
        if (restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.TRANSACTION_TYPE_OUTGOING_BLOCK) {
            restrictions8 = AccountRestrictionTransactionTypeValueBuilder_1.AccountRestrictionTransactionTypeValueBuilder.loadFromBinary(restrictionFlagsConditionBytes);
        }
        return new AccountRestrictionsInfoBuilder(restrictions1, restrictions2, restrictions3, restrictions4, restrictions5, restrictions6, restrictions7, restrictions8);
    };
    AccountRestrictionsInfoBuilder.prototype.getRestrictionFlags = function () {
        return this.restrictionFlags;
    };
    AccountRestrictionsInfoBuilder.prototype.getRestrictions1 = function () {
        if (this.restrictionFlags !== ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.ADDRESS) {
            throw new Error('restrictionFlags is not set to ADDRESS.');
        }
        return this.restrictions1;
    };
    AccountRestrictionsInfoBuilder.prototype.getRestrictions2 = function () {
        if (this.restrictionFlags !== ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.ADDRESS_OUTGOING) {
            throw new Error('restrictionFlags is not set to ADDRESS_OUTGOING.');
        }
        return this.restrictions2;
    };
    AccountRestrictionsInfoBuilder.prototype.getRestrictions3 = function () {
        if (this.restrictionFlags !== ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.ADDRESS_BLOCK) {
            throw new Error('restrictionFlags is not set to ADDRESS_BLOCK.');
        }
        return this.restrictions3;
    };
    AccountRestrictionsInfoBuilder.prototype.getRestrictions4 = function () {
        if (this.restrictionFlags !== ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.ADDRESS_OUTGOING_BLOCK) {
            throw new Error('restrictionFlags is not set to ADDRESS_OUTGOING_BLOCK.');
        }
        return this.restrictions4;
    };
    AccountRestrictionsInfoBuilder.prototype.getRestrictions5 = function () {
        if (this.restrictionFlags !== ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.MOSAIC_ID) {
            throw new Error('restrictionFlags is not set to MOSAIC_ID.');
        }
        return this.restrictions5;
    };
    AccountRestrictionsInfoBuilder.prototype.getRestrictions6 = function () {
        if (this.restrictionFlags !== ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.MOSAIC_ID_BLOCK) {
            throw new Error('restrictionFlags is not set to MOSAIC_ID_BLOCK.');
        }
        return this.restrictions6;
    };
    AccountRestrictionsInfoBuilder.prototype.getRestrictions7 = function () {
        if (this.restrictionFlags !== ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.TRANSACTION_TYPE_OUTGOING) {
            throw new Error('restrictionFlags is not set to TRANSACTION_TYPE_OUTGOING.');
        }
        return this.restrictions7;
    };
    AccountRestrictionsInfoBuilder.prototype.getRestrictions8 = function () {
        if (this.restrictionFlags !== ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.TRANSACTION_TYPE_OUTGOING_BLOCK) {
            throw new Error('restrictionFlags is not set to TRANSACTION_TYPE_OUTGOING_BLOCK.');
        }
        return this.restrictions8;
    };
    AccountRestrictionsInfoBuilder.prototype.getSize = function () {
        var size = 0;
        size += 2;
        if (this.restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.ADDRESS) {
            size += this.restrictions1.getSize();
        }
        if (this.restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.ADDRESS_OUTGOING) {
            size += this.restrictions2.getSize();
        }
        if (this.restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.ADDRESS_BLOCK) {
            size += this.restrictions3.getSize();
        }
        if (this.restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.ADDRESS_OUTGOING_BLOCK) {
            size += this.restrictions4.getSize();
        }
        if (this.restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.MOSAIC_ID) {
            size += this.restrictions5.getSize();
        }
        if (this.restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.MOSAIC_ID_BLOCK) {
            size += this.restrictions6.getSize();
        }
        if (this.restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.TRANSACTION_TYPE_OUTGOING) {
            size += this.restrictions7.getSize();
        }
        if (this.restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.TRANSACTION_TYPE_OUTGOING_BLOCK) {
            size += this.restrictions8.getSize();
        }
        return size;
    };
    AccountRestrictionsInfoBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var restrictionFlagsBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getRestrictionFlags(), 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionFlagsBytes);
        if (this.restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.ADDRESS) {
            var restrictions1Bytes = this.restrictions1.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictions1Bytes);
        }
        if (this.restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.ADDRESS_OUTGOING) {
            var restrictions2Bytes = this.restrictions2.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictions2Bytes);
        }
        if (this.restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.ADDRESS_BLOCK) {
            var restrictions3Bytes = this.restrictions3.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictions3Bytes);
        }
        if (this.restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.ADDRESS_OUTGOING_BLOCK) {
            var restrictions4Bytes = this.restrictions4.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictions4Bytes);
        }
        if (this.restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.MOSAIC_ID) {
            var restrictions5Bytes = this.restrictions5.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictions5Bytes);
        }
        if (this.restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.MOSAIC_ID_BLOCK) {
            var restrictions6Bytes = this.restrictions6.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictions6Bytes);
        }
        if (this.restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.TRANSACTION_TYPE_OUTGOING) {
            var restrictions7Bytes = this.restrictions7.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictions7Bytes);
        }
        if (this.restrictionFlags === ExpandedAccountRestrictionFlagsDto_1.ExpandedAccountRestrictionFlagsDto.TRANSACTION_TYPE_OUTGOING_BLOCK) {
            var restrictions8Bytes = this.restrictions8.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictions8Bytes);
        }
        return newArray;
    };
    return AccountRestrictionsInfoBuilder;
}());
exports.AccountRestrictionsInfoBuilder = AccountRestrictionsInfoBuilder;

},{"./AccountRestrictionAddressValueBuilder":11,"./AccountRestrictionMosaicValueBuilder":12,"./AccountRestrictionTransactionTypeValueBuilder":13,"./ExpandedAccountRestrictionFlagsDto":59,"./GeneratorUtils":60}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccountStateFormatDto_1 = require("./AccountStateFormatDto");
var AddressDto_1 = require("./AddressDto");
var GeneratorUtils_1 = require("./GeneratorUtils");
var HeightActivityBucketsBuilder_1 = require("./HeightActivityBucketsBuilder");
var HeightDto_1 = require("./HeightDto");
var ImportanceSnapshotBuilder_1 = require("./ImportanceSnapshotBuilder");
var KeyDto_1 = require("./KeyDto");
var MosaicBuilder_1 = require("./MosaicBuilder");
var MosaicIdDto_1 = require("./MosaicIdDto");
var AccountStateBuilder = (function () {
    function AccountStateBuilder(address, addressHeight, publicKey, publicKeyHeight, accountType, linkedAccountKey, currencyMosaicId, balances, importanceSnapshots, activityBuckets) {
        if ((importanceSnapshots && activityBuckets) || (!importanceSnapshots && !activityBuckets)) {
            throw new Error('Invalid conditional parameters');
        }
        this.address = address;
        this.addressHeight = addressHeight;
        this.publicKey = publicKey;
        this.publicKeyHeight = publicKeyHeight;
        this.accountType = accountType;
        this.linkedAccountKey = linkedAccountKey;
        this.importanceSnapshots = importanceSnapshots;
        this.activityBuckets = activityBuckets;
        this.currencyMosaicId = currencyMosaicId;
        this.balances = balances;
        if (importanceSnapshots) {
            this.format = AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE;
        }
        else {
            this.format = AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE;
        }
    }
    AccountStateBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var address = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, address.getSize());
        var addressHeight = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, addressHeight.getSize());
        var publicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, publicKey.getSize());
        var publicKeyHeight = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, publicKeyHeight.getSize());
        var accountType = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var linkedAccountKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, linkedAccountKey.getSize());
        var format = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var formatConditionBytes = Uint8Array.from(byteArray.slice(0, 1));
        byteArray.splice(0, 1);
        var currencyMosaicId = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, currencyMosaicId.getSize());
        var balancesCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        var balances = [];
        for (var i = 0; i < (Array.isArray(balancesCount) ? GeneratorUtils_1.GeneratorUtils.compact(balancesCount) : balancesCount); i++) {
            var item = MosaicBuilder_1.MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
            balances.push(item);
            byteArray.splice(0, item.getSize());
        }
        var importanceSnapshots;
        if (format === AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            importanceSnapshots = ImportanceSnapshotBuilder_1.ImportanceSnapshotBuilder.loadFromBinary(formatConditionBytes);
        }
        var activityBuckets;
        if (format === AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            activityBuckets = HeightActivityBucketsBuilder_1.HeightActivityBucketsBuilder.loadFromBinary(formatConditionBytes);
        }
        return new AccountStateBuilder(address, addressHeight, publicKey, publicKeyHeight, accountType, linkedAccountKey, currencyMosaicId, balances, importanceSnapshots, activityBuckets);
    };
    AccountStateBuilder.prototype.getAddress = function () {
        return this.address;
    };
    AccountStateBuilder.prototype.getAddressHeight = function () {
        return this.addressHeight;
    };
    AccountStateBuilder.prototype.getPublicKey = function () {
        return this.publicKey;
    };
    AccountStateBuilder.prototype.getPublicKeyHeight = function () {
        return this.publicKeyHeight;
    };
    AccountStateBuilder.prototype.getAccountType = function () {
        return this.accountType;
    };
    AccountStateBuilder.prototype.getLinkedAccountKey = function () {
        return this.linkedAccountKey;
    };
    AccountStateBuilder.prototype.getFormat = function () {
        return this.format;
    };
    AccountStateBuilder.prototype.getImportanceSnapshots = function () {
        if (this.format !== AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            throw new Error('format is not set to HIGH_VALUE.');
        }
        return this.importanceSnapshots;
    };
    AccountStateBuilder.prototype.getActivityBuckets = function () {
        if (this.format !== AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            throw new Error('format is not set to HIGH_VALUE.');
        }
        return this.activityBuckets;
    };
    AccountStateBuilder.prototype.getCurrencyMosaicId = function () {
        return this.currencyMosaicId;
    };
    AccountStateBuilder.prototype.getBalances = function () {
        return this.balances;
    };
    AccountStateBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.address.getSize();
        size += this.addressHeight.getSize();
        size += this.publicKey.getSize();
        size += this.publicKeyHeight.getSize();
        size += 1;
        size += this.linkedAccountKey.getSize();
        size += 1;
        if (this.format === AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            size += this.importanceSnapshots.getSize();
        }
        if (this.format === AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            size += this.activityBuckets.getSize();
        }
        size += this.currencyMosaicId.getSize();
        size += 2;
        this.balances.forEach(function (o) { return size += o.getSize(); });
        return size;
    };
    AccountStateBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var addressBytes = this.address.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressBytes);
        var addressHeightBytes = this.addressHeight.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressHeightBytes);
        var publicKeyBytes = this.publicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, publicKeyBytes);
        var publicKeyHeightBytes = this.publicKeyHeight.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, publicKeyHeightBytes);
        var accountTypeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.accountType, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountTypeBytes);
        var linkedAccountKeyBytes = this.linkedAccountKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, linkedAccountKeyBytes);
        var formatBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.format, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, formatBytes);
        if (this.format === AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            var importanceSnapshotsBytes = this.importanceSnapshots.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, importanceSnapshotsBytes);
        }
        if (this.format === AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            var activityBucketsBytes = this.activityBuckets.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, activityBucketsBytes);
        }
        var currencyMosaicIdBytes = this.currencyMosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, currencyMosaicIdBytes);
        var balancesCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.balances.length, 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, balancesCountBytes);
        this.balances.forEach(function (item) {
            var balancesBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, balancesBytes);
        });
        return newArray;
    };
    return AccountStateBuilder;
}());
exports.AccountStateBuilder = AccountStateBuilder;

},{"./AccountStateFormatDto":17,"./AddressDto":20,"./GeneratorUtils":60,"./HeightActivityBucketsBuilder":69,"./HeightDto":70,"./ImportanceSnapshotBuilder":73,"./KeyDto":75,"./MosaicBuilder":83,"./MosaicIdDto":92}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccountStateFormatDto;
(function (AccountStateFormatDto) {
    AccountStateFormatDto[AccountStateFormatDto["REGULAR"] = 0] = "REGULAR";
    AccountStateFormatDto[AccountStateFormatDto["HIGH_VALUE"] = 1] = "HIGH_VALUE";
})(AccountStateFormatDto = exports.AccountStateFormatDto || (exports.AccountStateFormatDto = {}));

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AddressDto_1 = require("./AddressDto");
var GeneratorUtils_1 = require("./GeneratorUtils");
var NamespaceIdDto_1 = require("./NamespaceIdDto");
var AddressAliasTransactionBodyBuilder = (function () {
    function AddressAliasTransactionBodyBuilder(namespaceId, address, aliasAction) {
        this.namespaceId = namespaceId;
        this.address = address;
        this.aliasAction = aliasAction;
    }
    AddressAliasTransactionBodyBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var namespaceId = NamespaceIdDto_1.NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceId.getSize());
        var address = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, address.getSize());
        var aliasAction = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        return new AddressAliasTransactionBodyBuilder(namespaceId, address, aliasAction);
    };
    AddressAliasTransactionBodyBuilder.prototype.getNamespaceId = function () {
        return this.namespaceId;
    };
    AddressAliasTransactionBodyBuilder.prototype.getAddress = function () {
        return this.address;
    };
    AddressAliasTransactionBodyBuilder.prototype.getAliasAction = function () {
        return this.aliasAction;
    };
    AddressAliasTransactionBodyBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.namespaceId.getSize();
        size += this.address.getSize();
        size += 1;
        return size;
    };
    AddressAliasTransactionBodyBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var namespaceIdBytes = this.namespaceId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, namespaceIdBytes);
        var addressBytes = this.address.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressBytes);
        var aliasActionBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.aliasAction, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, aliasActionBytes);
        return newArray;
    };
    return AddressAliasTransactionBodyBuilder;
}());
exports.AddressAliasTransactionBodyBuilder = AddressAliasTransactionBodyBuilder;

},{"./AddressDto":20,"./GeneratorUtils":60,"./NamespaceIdDto":110}],19:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AddressAliasTransactionBodyBuilder_1 = require("./AddressAliasTransactionBodyBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var TransactionBuilder_1 = require("./TransactionBuilder");
var AddressAliasTransactionBuilder = (function (_super) {
    __extends(AddressAliasTransactionBuilder, _super);
    function AddressAliasTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, namespaceId, address, aliasAction) {
        var _this = _super.call(this, signature, signerPublicKey, version, network, type, fee, deadline) || this;
        _this.addressAliasTransactionBody = new AddressAliasTransactionBodyBuilder_1.AddressAliasTransactionBodyBuilder(namespaceId, address, aliasAction);
        return _this;
    }
    AddressAliasTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var addressAliasTransactionBody = AddressAliasTransactionBodyBuilder_1.AddressAliasTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, addressAliasTransactionBody.getSize());
        return new AddressAliasTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, addressAliasTransactionBody.namespaceId, addressAliasTransactionBody.address, addressAliasTransactionBody.aliasAction);
    };
    AddressAliasTransactionBuilder.prototype.getNamespaceId = function () {
        return this.addressAliasTransactionBody.getNamespaceId();
    };
    AddressAliasTransactionBuilder.prototype.getAddress = function () {
        return this.addressAliasTransactionBody.getAddress();
    };
    AddressAliasTransactionBuilder.prototype.getAliasAction = function () {
        return this.addressAliasTransactionBody.getAliasAction();
    };
    AddressAliasTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.addressAliasTransactionBody.getSize();
        return size;
    };
    AddressAliasTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var addressAliasTransactionBodyBytes = this.addressAliasTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressAliasTransactionBodyBytes);
        return newArray;
    };
    return AddressAliasTransactionBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.AddressAliasTransactionBuilder = AddressAliasTransactionBuilder;

},{"./AddressAliasTransactionBodyBuilder":18,"./GeneratorUtils":60,"./TransactionBuilder":130}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var AddressDto = (function () {
    function AddressDto(address) {
        this.address = address;
    }
    AddressDto.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var address = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 25);
        byteArray.splice(0, 25);
        return new AddressDto(address);
    };
    AddressDto.prototype.getAddress = function () {
        return this.address;
    };
    AddressDto.prototype.getSize = function () {
        return 25;
    };
    AddressDto.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.address);
        return newArray;
    };
    return AddressDto;
}());
exports.AddressDto = AddressDto;

},{"./GeneratorUtils":60}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicRestrictionKeyDto_1 = require("./MosaicRestrictionKeyDto");
var AddressKeyValueBuilder = (function () {
    function AddressKeyValueBuilder(key, value) {
        this.key = key;
        this.value = value;
    }
    AddressKeyValueBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var key = MosaicRestrictionKeyDto_1.MosaicRestrictionKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, key.getSize());
        var value = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new AddressKeyValueBuilder(key, value);
    };
    AddressKeyValueBuilder.prototype.getKey = function () {
        return this.key;
    };
    AddressKeyValueBuilder.prototype.getValue = function () {
        return this.value;
    };
    AddressKeyValueBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.key.getSize();
        size += 8;
        return size;
    };
    AddressKeyValueBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var keyBytes = this.key.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, keyBytes);
        var valueBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getValue());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueBytes);
        return newArray;
    };
    return AddressKeyValueBuilder;
}());
exports.AddressKeyValueBuilder = AddressKeyValueBuilder;

},{"./GeneratorUtils":60,"./MosaicRestrictionKeyDto":101}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AddressKeyValueBuilder_1 = require("./AddressKeyValueBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var AddressKeyValueSetBuilder = (function () {
    function AddressKeyValueSetBuilder(keys) {
        this.keys = keys;
    }
    AddressKeyValueSetBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var keyValueCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var keys = [];
        for (var i = 0; i < (Array.isArray(keyValueCount) ? GeneratorUtils_1.GeneratorUtils.compact(keyValueCount) : keyValueCount); i++) {
            var item = AddressKeyValueBuilder_1.AddressKeyValueBuilder.loadFromBinary(Uint8Array.from(byteArray));
            keys.push(item);
            byteArray.splice(0, item.getSize());
        }
        return new AddressKeyValueSetBuilder(keys);
    };
    AddressKeyValueSetBuilder.prototype.getKeys = function () {
        return this.keys;
    };
    AddressKeyValueSetBuilder.prototype.getSize = function () {
        var size = 0;
        size += 1;
        this.keys.forEach(function (o) { return size += o.getSize(); });
        return size;
    };
    AddressKeyValueSetBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var keyValueCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.keys.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, keyValueCountBytes);
        this.keys.forEach(function (item) {
            var keysBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, keysBytes);
        });
        return newArray;
    };
    return AddressKeyValueSetBuilder;
}());
exports.AddressKeyValueSetBuilder = AddressKeyValueSetBuilder;

},{"./AddressKeyValueBuilder":21,"./GeneratorUtils":60}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AddressDto_1 = require("./AddressDto");
var GeneratorUtils_1 = require("./GeneratorUtils");
var ReceiptSourceBuilder_1 = require("./ReceiptSourceBuilder");
var AddressResolutionEntryBuilder = (function () {
    function AddressResolutionEntryBuilder(source, resolved) {
        this.source = source;
        this.resolved = resolved;
    }
    AddressResolutionEntryBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var source = ReceiptSourceBuilder_1.ReceiptSourceBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, source.getSize());
        var resolved = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, resolved.getSize());
        return new AddressResolutionEntryBuilder(source, resolved);
    };
    AddressResolutionEntryBuilder.prototype.getSource = function () {
        return this.source;
    };
    AddressResolutionEntryBuilder.prototype.getResolved = function () {
        return this.resolved;
    };
    AddressResolutionEntryBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.source.getSize();
        size += this.resolved.getSize();
        return size;
    };
    AddressResolutionEntryBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var sourceBytes = this.source.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, sourceBytes);
        var resolvedBytes = this.resolved.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, resolvedBytes);
        return newArray;
    };
    return AddressResolutionEntryBuilder;
}());
exports.AddressResolutionEntryBuilder = AddressResolutionEntryBuilder;

},{"./AddressDto":20,"./GeneratorUtils":60,"./ReceiptSourceBuilder":119}],24:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AddressResolutionEntryBuilder_1 = require("./AddressResolutionEntryBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var ReceiptBuilder_1 = require("./ReceiptBuilder");
var UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
var AddressResolutionStatementBuilder = (function (_super) {
    __extends(AddressResolutionStatementBuilder, _super);
    function AddressResolutionStatementBuilder(version, type, unresolved, resolutionEntries) {
        var _this = _super.call(this, version, type) || this;
        _this.unresolved = unresolved;
        _this.resolutionEntries = resolutionEntries;
        return _this;
    }
    AddressResolutionStatementBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = ReceiptBuilder_1.ReceiptBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var unresolved = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, unresolved.getSize());
        var resolutionEntriesByteSize = byteArray.length;
        var resolutionEntries = [];
        while (resolutionEntriesByteSize > 0) {
            var item = AddressResolutionEntryBuilder_1.AddressResolutionEntryBuilder.loadFromBinary(Uint8Array.from(byteArray));
            resolutionEntries.push(item);
            var itemSize = item.getSize();
            resolutionEntriesByteSize -= itemSize;
            byteArray.splice(0, itemSize);
        }
        return new AddressResolutionStatementBuilder(superObject.version, superObject.type, unresolved, resolutionEntries);
    };
    AddressResolutionStatementBuilder.prototype.getUnresolved = function () {
        return this.unresolved;
    };
    AddressResolutionStatementBuilder.prototype.getResolutionEntries = function () {
        return this.resolutionEntries;
    };
    AddressResolutionStatementBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.unresolved.getSize();
        this.resolutionEntries.forEach(function (o) { return size += o.getSize(); });
        return size;
    };
    AddressResolutionStatementBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var unresolvedBytes = this.unresolved.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, unresolvedBytes);
        this.resolutionEntries.forEach(function (item) {
            var resolutionEntriesBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, resolutionEntriesBytes);
        });
        return newArray;
    };
    return AddressResolutionStatementBuilder;
}(ReceiptBuilder_1.ReceiptBuilder));
exports.AddressResolutionStatementBuilder = AddressResolutionStatementBuilder;

},{"./AddressResolutionEntryBuilder":23,"./GeneratorUtils":60,"./ReceiptBuilder":118,"./UnresolvedAddressDto":134}],25:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AggregateTransactionBodyBuilder_1 = require("./AggregateTransactionBodyBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var TransactionBuilder_1 = require("./TransactionBuilder");
var AggregateBondedTransactionBuilder = (function (_super) {
    __extends(AggregateBondedTransactionBuilder, _super);
    function AggregateBondedTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, transactionsHash, transactions, cosignatures) {
        var _this = _super.call(this, signature, signerPublicKey, version, network, type, fee, deadline) || this;
        _this.aggregateTransactionBody = new AggregateTransactionBodyBuilder_1.AggregateTransactionBodyBuilder(transactionsHash, transactions, cosignatures);
        return _this;
    }
    AggregateBondedTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var aggregateTransactionBody = AggregateTransactionBodyBuilder_1.AggregateTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, aggregateTransactionBody.getSize());
        return new AggregateBondedTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, aggregateTransactionBody.transactionsHash, aggregateTransactionBody.transactions, aggregateTransactionBody.cosignatures);
    };
    AggregateBondedTransactionBuilder.prototype.getTransactionsHash = function () {
        return this.aggregateTransactionBody.getTransactionsHash();
    };
    AggregateBondedTransactionBuilder.prototype.getAggregateTransactionHeader_Reserved1 = function () {
        return this.aggregateTransactionBody.getAggregateTransactionHeader_Reserved1();
    };
    AggregateBondedTransactionBuilder.prototype.getTransactions = function () {
        return this.aggregateTransactionBody.getTransactions();
    };
    AggregateBondedTransactionBuilder.prototype.getCosignatures = function () {
        return this.aggregateTransactionBody.getCosignatures();
    };
    AggregateBondedTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.aggregateTransactionBody.getSize();
        return size;
    };
    AggregateBondedTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var aggregateTransactionBodyBytes = this.aggregateTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, aggregateTransactionBodyBytes);
        return newArray;
    };
    return AggregateBondedTransactionBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.AggregateBondedTransactionBuilder = AggregateBondedTransactionBuilder;

},{"./AggregateTransactionBodyBuilder":27,"./GeneratorUtils":60,"./TransactionBuilder":130}],26:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AggregateTransactionBodyBuilder_1 = require("./AggregateTransactionBodyBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var TransactionBuilder_1 = require("./TransactionBuilder");
var AggregateCompleteTransactionBuilder = (function (_super) {
    __extends(AggregateCompleteTransactionBuilder, _super);
    function AggregateCompleteTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, transactionsHash, transactions, cosignatures) {
        var _this = _super.call(this, signature, signerPublicKey, version, network, type, fee, deadline) || this;
        _this.aggregateTransactionBody = new AggregateTransactionBodyBuilder_1.AggregateTransactionBodyBuilder(transactionsHash, transactions, cosignatures);
        return _this;
    }
    AggregateCompleteTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var aggregateTransactionBody = AggregateTransactionBodyBuilder_1.AggregateTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, aggregateTransactionBody.getSize());
        return new AggregateCompleteTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, aggregateTransactionBody.transactionsHash, aggregateTransactionBody.transactions, aggregateTransactionBody.cosignatures);
    };
    AggregateCompleteTransactionBuilder.prototype.getTransactionsHash = function () {
        return this.aggregateTransactionBody.getTransactionsHash();
    };
    AggregateCompleteTransactionBuilder.prototype.getAggregateTransactionHeader_Reserved1 = function () {
        return this.aggregateTransactionBody.getAggregateTransactionHeader_Reserved1();
    };
    AggregateCompleteTransactionBuilder.prototype.getTransactions = function () {
        return this.aggregateTransactionBody.getTransactions();
    };
    AggregateCompleteTransactionBuilder.prototype.getCosignatures = function () {
        return this.aggregateTransactionBody.getCosignatures();
    };
    AggregateCompleteTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.aggregateTransactionBody.getSize();
        return size;
    };
    AggregateCompleteTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var aggregateTransactionBodyBytes = this.aggregateTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, aggregateTransactionBodyBytes);
        return newArray;
    };
    return AggregateCompleteTransactionBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.AggregateCompleteTransactionBuilder = AggregateCompleteTransactionBuilder;

},{"./AggregateTransactionBodyBuilder":27,"./GeneratorUtils":60,"./TransactionBuilder":130}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CosignatureBuilder_1 = require("./CosignatureBuilder");
var EmbeddedTransactionHelper_1 = require("./EmbeddedTransactionHelper");
var GeneratorUtils_1 = require("./GeneratorUtils");
var Hash256Dto_1 = require("./Hash256Dto");
var AggregateTransactionBodyBuilder = (function () {
    function AggregateTransactionBodyBuilder(transactionsHash, transactions, cosignatures) {
        this.transactionsHash = transactionsHash;
        this.aggregateTransactionHeader_Reserved1 = 0;
        this.transactions = transactions;
        this.cosignatures = cosignatures;
    }
    AggregateTransactionBodyBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var transactionsHash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, transactionsHash.getSize());
        var payloadSize = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        var aggregateTransactionHeader_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        var transactionsByteSize = payloadSize;
        var transactions = [];
        while (transactionsByteSize > 0) {
            var item = EmbeddedTransactionHelper_1.EmbeddedTransactionHelper.loadFromBinary(Uint8Array.from(byteArray));
            transactions.push(item);
            var itemSize = item.getSize() + GeneratorUtils_1.GeneratorUtils.getTransactionPaddingSize(item.getSize(), 8);
            transactionsByteSize -= itemSize;
            byteArray.splice(0, itemSize);
        }
        var cosignaturesByteSize = byteArray.length;
        var cosignatures = [];
        while (cosignaturesByteSize > 0) {
            var item = CosignatureBuilder_1.CosignatureBuilder.loadFromBinary(Uint8Array.from(byteArray));
            cosignatures.push(item);
            var itemSize = item.getSize();
            cosignaturesByteSize -= itemSize;
            byteArray.splice(0, itemSize);
        }
        return new AggregateTransactionBodyBuilder(transactionsHash, transactions, cosignatures);
    };
    AggregateTransactionBodyBuilder.prototype.getTransactionsHash = function () {
        return this.transactionsHash;
    };
    AggregateTransactionBodyBuilder.prototype.getAggregateTransactionHeader_Reserved1 = function () {
        return this.aggregateTransactionHeader_Reserved1;
    };
    AggregateTransactionBodyBuilder.prototype.getTransactions = function () {
        return this.transactions;
    };
    AggregateTransactionBodyBuilder.prototype.getCosignatures = function () {
        return this.cosignatures;
    };
    AggregateTransactionBodyBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.transactionsHash.getSize();
        size += 4;
        size += 4;
        this.transactions.forEach(function (o) { return size += EmbeddedTransactionHelper_1.EmbeddedTransactionHelper.serialize(o).length; });
        this.cosignatures.forEach(function (o) { return size += o.getSize(); });
        return size;
    };
    AggregateTransactionBodyBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var transactionsHashBytes = this.transactionsHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, transactionsHashBytes);
        var payloadSizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(EmbeddedTransactionHelper_1.EmbeddedTransactionHelper.getEmbeddedTransactionSize(this.transactions), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, payloadSizeBytes);
        var aggregateTransactionHeader_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getAggregateTransactionHeader_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, aggregateTransactionHeader_Reserved1Bytes);
        this.transactions.forEach(function (item) {
            var transactionsBytes = EmbeddedTransactionHelper_1.EmbeddedTransactionHelper.serialize(item);
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, transactionsBytes);
        });
        this.cosignatures.forEach(function (item) {
            var cosignaturesBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, cosignaturesBytes);
        });
        return newArray;
    };
    return AggregateTransactionBodyBuilder;
}());
exports.AggregateTransactionBodyBuilder = AggregateTransactionBodyBuilder;

},{"./CosignatureBuilder":34,"./EmbeddedTransactionHelper":56,"./GeneratorUtils":60,"./Hash256Dto":63}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var AmountDto = (function () {
    function AmountDto(amount) {
        this.amount = amount;
    }
    AmountDto.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var amount = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new AmountDto(amount);
    };
    AmountDto.prototype.getAmount = function () {
        return this.amount;
    };
    AmountDto.prototype.getSize = function () {
        return 8;
    };
    AmountDto.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var amountBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getAmount());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, amountBytes);
        return newArray;
    };
    return AmountDto;
}());
exports.AmountDto = AmountDto;

},{"./GeneratorUtils":60}],29:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var KeyDto_1 = require("./KeyDto");
var MosaicBuilder_1 = require("./MosaicBuilder");
var ReceiptBuilder_1 = require("./ReceiptBuilder");
var BalanceChangeReceiptBuilder = (function (_super) {
    __extends(BalanceChangeReceiptBuilder, _super);
    function BalanceChangeReceiptBuilder(version, type, mosaic, targetPublicKey) {
        var _this = _super.call(this, version, type) || this;
        _this.mosaic = mosaic;
        _this.targetPublicKey = targetPublicKey;
        return _this;
    }
    BalanceChangeReceiptBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = ReceiptBuilder_1.ReceiptBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var mosaic = MosaicBuilder_1.MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        var targetPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetPublicKey.getSize());
        return new BalanceChangeReceiptBuilder(superObject.version, superObject.type, mosaic, targetPublicKey);
    };
    BalanceChangeReceiptBuilder.prototype.getMosaic = function () {
        return this.mosaic;
    };
    BalanceChangeReceiptBuilder.prototype.getTargetPublicKey = function () {
        return this.targetPublicKey;
    };
    BalanceChangeReceiptBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.mosaic.getSize();
        size += this.targetPublicKey.getSize();
        return size;
    };
    BalanceChangeReceiptBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        var targetPublicKeyBytes = this.targetPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetPublicKeyBytes);
        return newArray;
    };
    return BalanceChangeReceiptBuilder;
}(ReceiptBuilder_1.ReceiptBuilder));
exports.BalanceChangeReceiptBuilder = BalanceChangeReceiptBuilder;

},{"./GeneratorUtils":60,"./KeyDto":75,"./MosaicBuilder":83,"./ReceiptBuilder":118}],30:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AddressDto_1 = require("./AddressDto");
var GeneratorUtils_1 = require("./GeneratorUtils");
var KeyDto_1 = require("./KeyDto");
var MosaicBuilder_1 = require("./MosaicBuilder");
var ReceiptBuilder_1 = require("./ReceiptBuilder");
var BalanceTransferReceiptBuilder = (function (_super) {
    __extends(BalanceTransferReceiptBuilder, _super);
    function BalanceTransferReceiptBuilder(version, type, mosaic, senderPublicKey, recipientAddress) {
        var _this = _super.call(this, version, type) || this;
        _this.mosaic = mosaic;
        _this.senderPublicKey = senderPublicKey;
        _this.recipientAddress = recipientAddress;
        return _this;
    }
    BalanceTransferReceiptBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = ReceiptBuilder_1.ReceiptBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var mosaic = MosaicBuilder_1.MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        var senderPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, senderPublicKey.getSize());
        var recipientAddress = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, recipientAddress.getSize());
        return new BalanceTransferReceiptBuilder(superObject.version, superObject.type, mosaic, senderPublicKey, recipientAddress);
    };
    BalanceTransferReceiptBuilder.prototype.getMosaic = function () {
        return this.mosaic;
    };
    BalanceTransferReceiptBuilder.prototype.getSenderPublicKey = function () {
        return this.senderPublicKey;
    };
    BalanceTransferReceiptBuilder.prototype.getRecipientAddress = function () {
        return this.recipientAddress;
    };
    BalanceTransferReceiptBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.mosaic.getSize();
        size += this.senderPublicKey.getSize();
        size += this.recipientAddress.getSize();
        return size;
    };
    BalanceTransferReceiptBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        var senderPublicKeyBytes = this.senderPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, senderPublicKeyBytes);
        var recipientAddressBytes = this.recipientAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, recipientAddressBytes);
        return newArray;
    };
    return BalanceTransferReceiptBuilder;
}(ReceiptBuilder_1.ReceiptBuilder));
exports.BalanceTransferReceiptBuilder = BalanceTransferReceiptBuilder;

},{"./AddressDto":20,"./GeneratorUtils":60,"./KeyDto":75,"./MosaicBuilder":83,"./ReceiptBuilder":118}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var BlockDurationDto = (function () {
    function BlockDurationDto(blockDuration) {
        this.blockDuration = blockDuration;
    }
    BlockDurationDto.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var blockDuration = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new BlockDurationDto(blockDuration);
    };
    BlockDurationDto.prototype.getBlockDuration = function () {
        return this.blockDuration;
    };
    BlockDurationDto.prototype.getSize = function () {
        return 8;
    };
    BlockDurationDto.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var blockDurationBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getBlockDuration());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, blockDurationBytes);
        return newArray;
    };
    return BlockDurationDto;
}());
exports.BlockDurationDto = BlockDurationDto;

},{"./GeneratorUtils":60}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var BlockFeeMultiplierDto = (function () {
    function BlockFeeMultiplierDto(blockFeeMultiplier) {
        this.blockFeeMultiplier = blockFeeMultiplier;
    }
    BlockFeeMultiplierDto.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var blockFeeMultiplier = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        return new BlockFeeMultiplierDto(blockFeeMultiplier);
    };
    BlockFeeMultiplierDto.prototype.getBlockFeeMultiplier = function () {
        return this.blockFeeMultiplier;
    };
    BlockFeeMultiplierDto.prototype.getSize = function () {
        return 4;
    };
    BlockFeeMultiplierDto.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var blockFeeMultiplierBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getBlockFeeMultiplier(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, blockFeeMultiplierBytes);
        return newArray;
    };
    return BlockFeeMultiplierDto;
}());
exports.BlockFeeMultiplierDto = BlockFeeMultiplierDto;

},{"./GeneratorUtils":60}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlockFeeMultiplierDto_1 = require("./BlockFeeMultiplierDto");
var DifficultyDto_1 = require("./DifficultyDto");
var GeneratorUtils_1 = require("./GeneratorUtils");
var Hash256Dto_1 = require("./Hash256Dto");
var HeightDto_1 = require("./HeightDto");
var KeyDto_1 = require("./KeyDto");
var SignatureDto_1 = require("./SignatureDto");
var TimestampDto_1 = require("./TimestampDto");
var BlockHeaderBuilder = (function () {
    function BlockHeaderBuilder(signature, signerPublicKey, version, network, type, height, timestamp, difficulty, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryPublicKey, feeMultiplier) {
        this.size = 0;
        this.verifiableEntityHeader_Reserved1 = 0;
        this.signature = signature;
        this.signerPublicKey = signerPublicKey;
        this.entityBody_Reserved1 = 0;
        this.version = version;
        this.network = network;
        this.type = type;
        this.height = height;
        this.timestamp = timestamp;
        this.difficulty = difficulty;
        this.previousBlockHash = previousBlockHash;
        this.transactionsHash = transactionsHash;
        this.receiptsHash = receiptsHash;
        this.stateHash = stateHash;
        this.beneficiaryPublicKey = beneficiaryPublicKey;
        this.feeMultiplier = feeMultiplier;
        this.blockHeader_Reserved1 = 0;
    }
    BlockHeaderBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var size = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        var verifiableEntityHeader_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        var signature = SignatureDto_1.SignatureDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signature.getSize());
        var signerPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signerPublicKey.getSize());
        var entityBody_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        var version = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var network = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var type = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        var height = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, height.getSize());
        var timestamp = TimestampDto_1.TimestampDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, timestamp.getSize());
        var difficulty = DifficultyDto_1.DifficultyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, difficulty.getSize());
        var previousBlockHash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, previousBlockHash.getSize());
        var transactionsHash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, transactionsHash.getSize());
        var receiptsHash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, receiptsHash.getSize());
        var stateHash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, stateHash.getSize());
        var beneficiaryPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, beneficiaryPublicKey.getSize());
        var feeMultiplier = BlockFeeMultiplierDto_1.BlockFeeMultiplierDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, feeMultiplier.getSize());
        var blockHeader_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        return new BlockHeaderBuilder(signature, signerPublicKey, version, network, type, height, timestamp, difficulty, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryPublicKey, feeMultiplier);
    };
    BlockHeaderBuilder.prototype.getVerifiableEntityHeader_Reserved1 = function () {
        return this.verifiableEntityHeader_Reserved1;
    };
    BlockHeaderBuilder.prototype.getSignature = function () {
        return this.signature;
    };
    BlockHeaderBuilder.prototype.getSignerPublicKey = function () {
        return this.signerPublicKey;
    };
    BlockHeaderBuilder.prototype.getEntityBody_Reserved1 = function () {
        return this.entityBody_Reserved1;
    };
    BlockHeaderBuilder.prototype.getVersion = function () {
        return this.version;
    };
    BlockHeaderBuilder.prototype.getNetwork = function () {
        return this.network;
    };
    BlockHeaderBuilder.prototype.getType = function () {
        return this.type;
    };
    BlockHeaderBuilder.prototype.getHeight = function () {
        return this.height;
    };
    BlockHeaderBuilder.prototype.getTimestamp = function () {
        return this.timestamp;
    };
    BlockHeaderBuilder.prototype.getDifficulty = function () {
        return this.difficulty;
    };
    BlockHeaderBuilder.prototype.getPreviousBlockHash = function () {
        return this.previousBlockHash;
    };
    BlockHeaderBuilder.prototype.getTransactionsHash = function () {
        return this.transactionsHash;
    };
    BlockHeaderBuilder.prototype.getReceiptsHash = function () {
        return this.receiptsHash;
    };
    BlockHeaderBuilder.prototype.getStateHash = function () {
        return this.stateHash;
    };
    BlockHeaderBuilder.prototype.getBeneficiaryPublicKey = function () {
        return this.beneficiaryPublicKey;
    };
    BlockHeaderBuilder.prototype.getFeeMultiplier = function () {
        return this.feeMultiplier;
    };
    BlockHeaderBuilder.prototype.getBlockHeader_Reserved1 = function () {
        return this.blockHeader_Reserved1;
    };
    BlockHeaderBuilder.prototype.getSize = function () {
        var size = 0;
        size += 4;
        size += 4;
        size += this.signature.getSize();
        size += this.signerPublicKey.getSize();
        size += 4;
        size += 1;
        size += 1;
        size += 2;
        size += this.height.getSize();
        size += this.timestamp.getSize();
        size += this.difficulty.getSize();
        size += this.previousBlockHash.getSize();
        size += this.transactionsHash.getSize();
        size += this.receiptsHash.getSize();
        size += this.stateHash.getSize();
        size += this.beneficiaryPublicKey.getSize();
        size += this.feeMultiplier.getSize();
        size += 4;
        return size;
    };
    BlockHeaderBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var sizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getSize(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, sizeBytes);
        var verifiableEntityHeader_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getVerifiableEntityHeader_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, verifiableEntityHeader_Reserved1Bytes);
        var signatureBytes = this.signature.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, signatureBytes);
        var signerPublicKeyBytes = this.signerPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, signerPublicKeyBytes);
        var entityBody_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getEntityBody_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, entityBody_Reserved1Bytes);
        var versionBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getVersion(), 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, versionBytes);
        var networkBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.network, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, networkBytes);
        var typeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.type, 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, typeBytes);
        var heightBytes = this.height.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, heightBytes);
        var timestampBytes = this.timestamp.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, timestampBytes);
        var difficultyBytes = this.difficulty.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, difficultyBytes);
        var previousBlockHashBytes = this.previousBlockHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, previousBlockHashBytes);
        var transactionsHashBytes = this.transactionsHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, transactionsHashBytes);
        var receiptsHashBytes = this.receiptsHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, receiptsHashBytes);
        var stateHashBytes = this.stateHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, stateHashBytes);
        var beneficiaryPublicKeyBytes = this.beneficiaryPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, beneficiaryPublicKeyBytes);
        var feeMultiplierBytes = this.feeMultiplier.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, feeMultiplierBytes);
        var blockHeader_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getBlockHeader_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, blockHeader_Reserved1Bytes);
        return newArray;
    };
    return BlockHeaderBuilder;
}());
exports.BlockHeaderBuilder = BlockHeaderBuilder;

},{"./BlockFeeMultiplierDto":32,"./DifficultyDto":36,"./GeneratorUtils":60,"./Hash256Dto":63,"./HeightDto":70,"./KeyDto":75,"./SignatureDto":128,"./TimestampDto":129}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var KeyDto_1 = require("./KeyDto");
var SignatureDto_1 = require("./SignatureDto");
var CosignatureBuilder = (function () {
    function CosignatureBuilder(signerPublicKey, signature) {
        this.signerPublicKey = signerPublicKey;
        this.signature = signature;
    }
    CosignatureBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var signerPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signerPublicKey.getSize());
        var signature = SignatureDto_1.SignatureDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signature.getSize());
        return new CosignatureBuilder(signerPublicKey, signature);
    };
    CosignatureBuilder.prototype.getSignerPublicKey = function () {
        return this.signerPublicKey;
    };
    CosignatureBuilder.prototype.getSignature = function () {
        return this.signature;
    };
    CosignatureBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.signerPublicKey.getSize();
        size += this.signature.getSize();
        return size;
    };
    CosignatureBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var signerPublicKeyBytes = this.signerPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, signerPublicKeyBytes);
        var signatureBytes = this.signature.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, signatureBytes);
        return newArray;
    };
    return CosignatureBuilder;
}());
exports.CosignatureBuilder = CosignatureBuilder;

},{"./GeneratorUtils":60,"./KeyDto":75,"./SignatureDto":128}],35:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CosignatureBuilder_1 = require("./CosignatureBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var Hash256Dto_1 = require("./Hash256Dto");
var DetachedCosignatureBuilder = (function (_super) {
    __extends(DetachedCosignatureBuilder, _super);
    function DetachedCosignatureBuilder(signerPublicKey, signature, parentHash) {
        var _this = _super.call(this, signerPublicKey, signature) || this;
        _this.parentHash = parentHash;
        return _this;
    }
    DetachedCosignatureBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = CosignatureBuilder_1.CosignatureBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var parentHash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, parentHash.getSize());
        return new DetachedCosignatureBuilder(superObject.signerPublicKey, superObject.signature, parentHash);
    };
    DetachedCosignatureBuilder.prototype.getParentHash = function () {
        return this.parentHash;
    };
    DetachedCosignatureBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.parentHash.getSize();
        return size;
    };
    DetachedCosignatureBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var parentHashBytes = this.parentHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, parentHashBytes);
        return newArray;
    };
    return DetachedCosignatureBuilder;
}(CosignatureBuilder_1.CosignatureBuilder));
exports.DetachedCosignatureBuilder = DetachedCosignatureBuilder;

},{"./CosignatureBuilder":34,"./GeneratorUtils":60,"./Hash256Dto":63}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var DifficultyDto = (function () {
    function DifficultyDto(difficulty) {
        this.difficulty = difficulty;
    }
    DifficultyDto.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var difficulty = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new DifficultyDto(difficulty);
    };
    DifficultyDto.prototype.getDifficulty = function () {
        return this.difficulty;
    };
    DifficultyDto.prototype.getSize = function () {
        return 8;
    };
    DifficultyDto.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var difficultyBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getDifficulty());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, difficultyBytes);
        return newArray;
    };
    return DifficultyDto;
}());
exports.DifficultyDto = DifficultyDto;

},{"./GeneratorUtils":60}],37:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AccountAddressRestrictionTransactionBodyBuilder_1 = require("./AccountAddressRestrictionTransactionBodyBuilder");
var EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var EmbeddedAccountAddressRestrictionTransactionBuilder = (function (_super) {
    __extends(EmbeddedAccountAddressRestrictionTransactionBuilder, _super);
    function EmbeddedAccountAddressRestrictionTransactionBuilder(signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        var _this = _super.call(this, signerPublicKey, version, network, type) || this;
        _this.accountAddressRestrictionTransactionBody = new AccountAddressRestrictionTransactionBodyBuilder_1.AccountAddressRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
        return _this;
    }
    EmbeddedAccountAddressRestrictionTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var accountAddressRestrictionTransactionBody = AccountAddressRestrictionTransactionBodyBuilder_1.AccountAddressRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountAddressRestrictionTransactionBody.getSize());
        return new EmbeddedAccountAddressRestrictionTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, accountAddressRestrictionTransactionBody.restrictionFlags, accountAddressRestrictionTransactionBody.restrictionAdditions, accountAddressRestrictionTransactionBody.restrictionDeletions);
    };
    EmbeddedAccountAddressRestrictionTransactionBuilder.prototype.getRestrictionFlags = function () {
        return this.accountAddressRestrictionTransactionBody.getRestrictionFlags();
    };
    EmbeddedAccountAddressRestrictionTransactionBuilder.prototype.getAccountRestrictionTransactionBody_Reserved1 = function () {
        return this.accountAddressRestrictionTransactionBody.getAccountRestrictionTransactionBody_Reserved1();
    };
    EmbeddedAccountAddressRestrictionTransactionBuilder.prototype.getRestrictionAdditions = function () {
        return this.accountAddressRestrictionTransactionBody.getRestrictionAdditions();
    };
    EmbeddedAccountAddressRestrictionTransactionBuilder.prototype.getRestrictionDeletions = function () {
        return this.accountAddressRestrictionTransactionBody.getRestrictionDeletions();
    };
    EmbeddedAccountAddressRestrictionTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.accountAddressRestrictionTransactionBody.getSize();
        return size;
    };
    EmbeddedAccountAddressRestrictionTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var accountAddressRestrictionTransactionBodyBytes = this.accountAddressRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountAddressRestrictionTransactionBodyBytes);
        return newArray;
    };
    return EmbeddedAccountAddressRestrictionTransactionBuilder;
}(EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder));
exports.EmbeddedAccountAddressRestrictionTransactionBuilder = EmbeddedAccountAddressRestrictionTransactionBuilder;

},{"./AccountAddressRestrictionTransactionBodyBuilder":1,"./EmbeddedTransactionBuilder":55,"./GeneratorUtils":60}],38:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AccountLinkTransactionBodyBuilder_1 = require("./AccountLinkTransactionBodyBuilder");
var EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var EmbeddedAccountLinkTransactionBuilder = (function (_super) {
    __extends(EmbeddedAccountLinkTransactionBuilder, _super);
    function EmbeddedAccountLinkTransactionBuilder(signerPublicKey, version, network, type, remotePublicKey, linkAction) {
        var _this = _super.call(this, signerPublicKey, version, network, type) || this;
        _this.accountLinkTransactionBody = new AccountLinkTransactionBodyBuilder_1.AccountLinkTransactionBodyBuilder(remotePublicKey, linkAction);
        return _this;
    }
    EmbeddedAccountLinkTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var accountLinkTransactionBody = AccountLinkTransactionBodyBuilder_1.AccountLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountLinkTransactionBody.getSize());
        return new EmbeddedAccountLinkTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, accountLinkTransactionBody.remotePublicKey, accountLinkTransactionBody.linkAction);
    };
    EmbeddedAccountLinkTransactionBuilder.prototype.getRemotePublicKey = function () {
        return this.accountLinkTransactionBody.getRemotePublicKey();
    };
    EmbeddedAccountLinkTransactionBuilder.prototype.getLinkAction = function () {
        return this.accountLinkTransactionBody.getLinkAction();
    };
    EmbeddedAccountLinkTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.accountLinkTransactionBody.getSize();
        return size;
    };
    EmbeddedAccountLinkTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var accountLinkTransactionBodyBytes = this.accountLinkTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountLinkTransactionBodyBytes);
        return newArray;
    };
    return EmbeddedAccountLinkTransactionBuilder;
}(EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder));
exports.EmbeddedAccountLinkTransactionBuilder = EmbeddedAccountLinkTransactionBuilder;

},{"./AccountLinkTransactionBodyBuilder":3,"./EmbeddedTransactionBuilder":55,"./GeneratorUtils":60}],39:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AccountMetadataTransactionBodyBuilder_1 = require("./AccountMetadataTransactionBodyBuilder");
var EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var EmbeddedAccountMetadataTransactionBuilder = (function (_super) {
    __extends(EmbeddedAccountMetadataTransactionBuilder, _super);
    function EmbeddedAccountMetadataTransactionBuilder(signerPublicKey, version, network, type, targetPublicKey, scopedMetadataKey, valueSizeDelta, value) {
        var _this = _super.call(this, signerPublicKey, version, network, type) || this;
        _this.accountMetadataTransactionBody = new AccountMetadataTransactionBodyBuilder_1.AccountMetadataTransactionBodyBuilder(targetPublicKey, scopedMetadataKey, valueSizeDelta, value);
        return _this;
    }
    EmbeddedAccountMetadataTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var accountMetadataTransactionBody = AccountMetadataTransactionBodyBuilder_1.AccountMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountMetadataTransactionBody.getSize());
        return new EmbeddedAccountMetadataTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, accountMetadataTransactionBody.targetPublicKey, accountMetadataTransactionBody.scopedMetadataKey, accountMetadataTransactionBody.valueSizeDelta, accountMetadataTransactionBody.value);
    };
    EmbeddedAccountMetadataTransactionBuilder.prototype.getTargetPublicKey = function () {
        return this.accountMetadataTransactionBody.getTargetPublicKey();
    };
    EmbeddedAccountMetadataTransactionBuilder.prototype.getScopedMetadataKey = function () {
        return this.accountMetadataTransactionBody.getScopedMetadataKey();
    };
    EmbeddedAccountMetadataTransactionBuilder.prototype.getValueSizeDelta = function () {
        return this.accountMetadataTransactionBody.getValueSizeDelta();
    };
    EmbeddedAccountMetadataTransactionBuilder.prototype.getValue = function () {
        return this.accountMetadataTransactionBody.getValue();
    };
    EmbeddedAccountMetadataTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.accountMetadataTransactionBody.getSize();
        return size;
    };
    EmbeddedAccountMetadataTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var accountMetadataTransactionBodyBytes = this.accountMetadataTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountMetadataTransactionBodyBytes);
        return newArray;
    };
    return EmbeddedAccountMetadataTransactionBuilder;
}(EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder));
exports.EmbeddedAccountMetadataTransactionBuilder = EmbeddedAccountMetadataTransactionBuilder;

},{"./AccountMetadataTransactionBodyBuilder":5,"./EmbeddedTransactionBuilder":55,"./GeneratorUtils":60}],40:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AccountMosaicRestrictionTransactionBodyBuilder_1 = require("./AccountMosaicRestrictionTransactionBodyBuilder");
var EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var EmbeddedAccountMosaicRestrictionTransactionBuilder = (function (_super) {
    __extends(EmbeddedAccountMosaicRestrictionTransactionBuilder, _super);
    function EmbeddedAccountMosaicRestrictionTransactionBuilder(signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        var _this = _super.call(this, signerPublicKey, version, network, type) || this;
        _this.accountMosaicRestrictionTransactionBody = new AccountMosaicRestrictionTransactionBodyBuilder_1.AccountMosaicRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
        return _this;
    }
    EmbeddedAccountMosaicRestrictionTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var accountMosaicRestrictionTransactionBody = AccountMosaicRestrictionTransactionBodyBuilder_1.AccountMosaicRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountMosaicRestrictionTransactionBody.getSize());
        return new EmbeddedAccountMosaicRestrictionTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, accountMosaicRestrictionTransactionBody.restrictionFlags, accountMosaicRestrictionTransactionBody.restrictionAdditions, accountMosaicRestrictionTransactionBody.restrictionDeletions);
    };
    EmbeddedAccountMosaicRestrictionTransactionBuilder.prototype.getRestrictionFlags = function () {
        return this.accountMosaicRestrictionTransactionBody.getRestrictionFlags();
    };
    EmbeddedAccountMosaicRestrictionTransactionBuilder.prototype.getAccountRestrictionTransactionBody_Reserved1 = function () {
        return this.accountMosaicRestrictionTransactionBody.getAccountRestrictionTransactionBody_Reserved1();
    };
    EmbeddedAccountMosaicRestrictionTransactionBuilder.prototype.getRestrictionAdditions = function () {
        return this.accountMosaicRestrictionTransactionBody.getRestrictionAdditions();
    };
    EmbeddedAccountMosaicRestrictionTransactionBuilder.prototype.getRestrictionDeletions = function () {
        return this.accountMosaicRestrictionTransactionBody.getRestrictionDeletions();
    };
    EmbeddedAccountMosaicRestrictionTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.accountMosaicRestrictionTransactionBody.getSize();
        return size;
    };
    EmbeddedAccountMosaicRestrictionTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var accountMosaicRestrictionTransactionBodyBytes = this.accountMosaicRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountMosaicRestrictionTransactionBodyBytes);
        return newArray;
    };
    return EmbeddedAccountMosaicRestrictionTransactionBuilder;
}(EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder));
exports.EmbeddedAccountMosaicRestrictionTransactionBuilder = EmbeddedAccountMosaicRestrictionTransactionBuilder;

},{"./AccountMosaicRestrictionTransactionBodyBuilder":7,"./EmbeddedTransactionBuilder":55,"./GeneratorUtils":60}],41:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AccountOperationRestrictionTransactionBodyBuilder_1 = require("./AccountOperationRestrictionTransactionBodyBuilder");
var EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var EmbeddedAccountOperationRestrictionTransactionBuilder = (function (_super) {
    __extends(EmbeddedAccountOperationRestrictionTransactionBuilder, _super);
    function EmbeddedAccountOperationRestrictionTransactionBuilder(signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        var _this = _super.call(this, signerPublicKey, version, network, type) || this;
        _this.accountOperationRestrictionTransactionBody = new AccountOperationRestrictionTransactionBodyBuilder_1.AccountOperationRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
        return _this;
    }
    EmbeddedAccountOperationRestrictionTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var accountOperationRestrictionTransactionBody = AccountOperationRestrictionTransactionBodyBuilder_1.AccountOperationRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountOperationRestrictionTransactionBody.getSize());
        return new EmbeddedAccountOperationRestrictionTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, accountOperationRestrictionTransactionBody.restrictionFlags, accountOperationRestrictionTransactionBody.restrictionAdditions, accountOperationRestrictionTransactionBody.restrictionDeletions);
    };
    EmbeddedAccountOperationRestrictionTransactionBuilder.prototype.getRestrictionFlags = function () {
        return this.accountOperationRestrictionTransactionBody.getRestrictionFlags();
    };
    EmbeddedAccountOperationRestrictionTransactionBuilder.prototype.getAccountRestrictionTransactionBody_Reserved1 = function () {
        return this.accountOperationRestrictionTransactionBody.getAccountRestrictionTransactionBody_Reserved1();
    };
    EmbeddedAccountOperationRestrictionTransactionBuilder.prototype.getRestrictionAdditions = function () {
        return this.accountOperationRestrictionTransactionBody.getRestrictionAdditions();
    };
    EmbeddedAccountOperationRestrictionTransactionBuilder.prototype.getRestrictionDeletions = function () {
        return this.accountOperationRestrictionTransactionBody.getRestrictionDeletions();
    };
    EmbeddedAccountOperationRestrictionTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.accountOperationRestrictionTransactionBody.getSize();
        return size;
    };
    EmbeddedAccountOperationRestrictionTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var accountOperationRestrictionTransactionBodyBytes = this.accountOperationRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountOperationRestrictionTransactionBodyBytes);
        return newArray;
    };
    return EmbeddedAccountOperationRestrictionTransactionBuilder;
}(EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder));
exports.EmbeddedAccountOperationRestrictionTransactionBuilder = EmbeddedAccountOperationRestrictionTransactionBuilder;

},{"./AccountOperationRestrictionTransactionBodyBuilder":9,"./EmbeddedTransactionBuilder":55,"./GeneratorUtils":60}],42:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AddressAliasTransactionBodyBuilder_1 = require("./AddressAliasTransactionBodyBuilder");
var EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var EmbeddedAddressAliasTransactionBuilder = (function (_super) {
    __extends(EmbeddedAddressAliasTransactionBuilder, _super);
    function EmbeddedAddressAliasTransactionBuilder(signerPublicKey, version, network, type, namespaceId, address, aliasAction) {
        var _this = _super.call(this, signerPublicKey, version, network, type) || this;
        _this.addressAliasTransactionBody = new AddressAliasTransactionBodyBuilder_1.AddressAliasTransactionBodyBuilder(namespaceId, address, aliasAction);
        return _this;
    }
    EmbeddedAddressAliasTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var addressAliasTransactionBody = AddressAliasTransactionBodyBuilder_1.AddressAliasTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, addressAliasTransactionBody.getSize());
        return new EmbeddedAddressAliasTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, addressAliasTransactionBody.namespaceId, addressAliasTransactionBody.address, addressAliasTransactionBody.aliasAction);
    };
    EmbeddedAddressAliasTransactionBuilder.prototype.getNamespaceId = function () {
        return this.addressAliasTransactionBody.getNamespaceId();
    };
    EmbeddedAddressAliasTransactionBuilder.prototype.getAddress = function () {
        return this.addressAliasTransactionBody.getAddress();
    };
    EmbeddedAddressAliasTransactionBuilder.prototype.getAliasAction = function () {
        return this.addressAliasTransactionBody.getAliasAction();
    };
    EmbeddedAddressAliasTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.addressAliasTransactionBody.getSize();
        return size;
    };
    EmbeddedAddressAliasTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var addressAliasTransactionBodyBytes = this.addressAliasTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressAliasTransactionBodyBytes);
        return newArray;
    };
    return EmbeddedAddressAliasTransactionBuilder;
}(EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder));
exports.EmbeddedAddressAliasTransactionBuilder = EmbeddedAddressAliasTransactionBuilder;

},{"./AddressAliasTransactionBodyBuilder":18,"./EmbeddedTransactionBuilder":55,"./GeneratorUtils":60}],43:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var HashLockTransactionBodyBuilder_1 = require("./HashLockTransactionBodyBuilder");
var EmbeddedHashLockTransactionBuilder = (function (_super) {
    __extends(EmbeddedHashLockTransactionBuilder, _super);
    function EmbeddedHashLockTransactionBuilder(signerPublicKey, version, network, type, mosaic, duration, hash) {
        var _this = _super.call(this, signerPublicKey, version, network, type) || this;
        _this.hashLockTransactionBody = new HashLockTransactionBodyBuilder_1.HashLockTransactionBodyBuilder(mosaic, duration, hash);
        return _this;
    }
    EmbeddedHashLockTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var hashLockTransactionBody = HashLockTransactionBodyBuilder_1.HashLockTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, hashLockTransactionBody.getSize());
        return new EmbeddedHashLockTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, hashLockTransactionBody.mosaic, hashLockTransactionBody.duration, hashLockTransactionBody.hash);
    };
    EmbeddedHashLockTransactionBuilder.prototype.getMosaic = function () {
        return this.hashLockTransactionBody.getMosaic();
    };
    EmbeddedHashLockTransactionBuilder.prototype.getDuration = function () {
        return this.hashLockTransactionBody.getDuration();
    };
    EmbeddedHashLockTransactionBuilder.prototype.getHash = function () {
        return this.hashLockTransactionBody.getHash();
    };
    EmbeddedHashLockTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.hashLockTransactionBody.getSize();
        return size;
    };
    EmbeddedHashLockTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var hashLockTransactionBodyBytes = this.hashLockTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, hashLockTransactionBodyBytes);
        return newArray;
    };
    return EmbeddedHashLockTransactionBuilder;
}(EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder));
exports.EmbeddedHashLockTransactionBuilder = EmbeddedHashLockTransactionBuilder;

},{"./EmbeddedTransactionBuilder":55,"./GeneratorUtils":60,"./HashLockTransactionBodyBuilder":66}],44:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicAddressRestrictionTransactionBodyBuilder_1 = require("./MosaicAddressRestrictionTransactionBodyBuilder");
var EmbeddedMosaicAddressRestrictionTransactionBuilder = (function (_super) {
    __extends(EmbeddedMosaicAddressRestrictionTransactionBuilder, _super);
    function EmbeddedMosaicAddressRestrictionTransactionBuilder(signerPublicKey, version, network, type, mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress) {
        var _this = _super.call(this, signerPublicKey, version, network, type) || this;
        _this.mosaicAddressRestrictionTransactionBody = new MosaicAddressRestrictionTransactionBodyBuilder_1.MosaicAddressRestrictionTransactionBodyBuilder(mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress);
        return _this;
    }
    EmbeddedMosaicAddressRestrictionTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var mosaicAddressRestrictionTransactionBody = MosaicAddressRestrictionTransactionBodyBuilder_1.MosaicAddressRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicAddressRestrictionTransactionBody.getSize());
        return new EmbeddedMosaicAddressRestrictionTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, mosaicAddressRestrictionTransactionBody.mosaicId, mosaicAddressRestrictionTransactionBody.restrictionKey, mosaicAddressRestrictionTransactionBody.previousRestrictionValue, mosaicAddressRestrictionTransactionBody.newRestrictionValue, mosaicAddressRestrictionTransactionBody.targetAddress);
    };
    EmbeddedMosaicAddressRestrictionTransactionBuilder.prototype.getMosaicId = function () {
        return this.mosaicAddressRestrictionTransactionBody.getMosaicId();
    };
    EmbeddedMosaicAddressRestrictionTransactionBuilder.prototype.getRestrictionKey = function () {
        return this.mosaicAddressRestrictionTransactionBody.getRestrictionKey();
    };
    EmbeddedMosaicAddressRestrictionTransactionBuilder.prototype.getPreviousRestrictionValue = function () {
        return this.mosaicAddressRestrictionTransactionBody.getPreviousRestrictionValue();
    };
    EmbeddedMosaicAddressRestrictionTransactionBuilder.prototype.getNewRestrictionValue = function () {
        return this.mosaicAddressRestrictionTransactionBody.getNewRestrictionValue();
    };
    EmbeddedMosaicAddressRestrictionTransactionBuilder.prototype.getTargetAddress = function () {
        return this.mosaicAddressRestrictionTransactionBody.getTargetAddress();
    };
    EmbeddedMosaicAddressRestrictionTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.mosaicAddressRestrictionTransactionBody.getSize();
        return size;
    };
    EmbeddedMosaicAddressRestrictionTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var mosaicAddressRestrictionTransactionBodyBytes = this.mosaicAddressRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicAddressRestrictionTransactionBodyBytes);
        return newArray;
    };
    return EmbeddedMosaicAddressRestrictionTransactionBuilder;
}(EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder));
exports.EmbeddedMosaicAddressRestrictionTransactionBuilder = EmbeddedMosaicAddressRestrictionTransactionBuilder;

},{"./EmbeddedTransactionBuilder":55,"./GeneratorUtils":60,"./MosaicAddressRestrictionTransactionBodyBuilder":79}],45:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicAliasTransactionBodyBuilder_1 = require("./MosaicAliasTransactionBodyBuilder");
var EmbeddedMosaicAliasTransactionBuilder = (function (_super) {
    __extends(EmbeddedMosaicAliasTransactionBuilder, _super);
    function EmbeddedMosaicAliasTransactionBuilder(signerPublicKey, version, network, type, namespaceId, mosaicId, aliasAction) {
        var _this = _super.call(this, signerPublicKey, version, network, type) || this;
        _this.mosaicAliasTransactionBody = new MosaicAliasTransactionBodyBuilder_1.MosaicAliasTransactionBodyBuilder(namespaceId, mosaicId, aliasAction);
        return _this;
    }
    EmbeddedMosaicAliasTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var mosaicAliasTransactionBody = MosaicAliasTransactionBodyBuilder_1.MosaicAliasTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicAliasTransactionBody.getSize());
        return new EmbeddedMosaicAliasTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, mosaicAliasTransactionBody.namespaceId, mosaicAliasTransactionBody.mosaicId, mosaicAliasTransactionBody.aliasAction);
    };
    EmbeddedMosaicAliasTransactionBuilder.prototype.getNamespaceId = function () {
        return this.mosaicAliasTransactionBody.getNamespaceId();
    };
    EmbeddedMosaicAliasTransactionBuilder.prototype.getMosaicId = function () {
        return this.mosaicAliasTransactionBody.getMosaicId();
    };
    EmbeddedMosaicAliasTransactionBuilder.prototype.getAliasAction = function () {
        return this.mosaicAliasTransactionBody.getAliasAction();
    };
    EmbeddedMosaicAliasTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.mosaicAliasTransactionBody.getSize();
        return size;
    };
    EmbeddedMosaicAliasTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var mosaicAliasTransactionBodyBytes = this.mosaicAliasTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicAliasTransactionBodyBytes);
        return newArray;
    };
    return EmbeddedMosaicAliasTransactionBuilder;
}(EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder));
exports.EmbeddedMosaicAliasTransactionBuilder = EmbeddedMosaicAliasTransactionBuilder;

},{"./EmbeddedTransactionBuilder":55,"./GeneratorUtils":60,"./MosaicAliasTransactionBodyBuilder":81}],46:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicDefinitionTransactionBodyBuilder_1 = require("./MosaicDefinitionTransactionBodyBuilder");
var EmbeddedMosaicDefinitionTransactionBuilder = (function (_super) {
    __extends(EmbeddedMosaicDefinitionTransactionBuilder, _super);
    function EmbeddedMosaicDefinitionTransactionBuilder(signerPublicKey, version, network, type, id, duration, nonce, flags, divisibility) {
        var _this = _super.call(this, signerPublicKey, version, network, type) || this;
        _this.mosaicDefinitionTransactionBody = new MosaicDefinitionTransactionBodyBuilder_1.MosaicDefinitionTransactionBodyBuilder(id, duration, nonce, flags, divisibility);
        return _this;
    }
    EmbeddedMosaicDefinitionTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var mosaicDefinitionTransactionBody = MosaicDefinitionTransactionBodyBuilder_1.MosaicDefinitionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicDefinitionTransactionBody.getSize());
        return new EmbeddedMosaicDefinitionTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, mosaicDefinitionTransactionBody.id, mosaicDefinitionTransactionBody.duration, mosaicDefinitionTransactionBody.nonce, mosaicDefinitionTransactionBody.flags, mosaicDefinitionTransactionBody.divisibility);
    };
    EmbeddedMosaicDefinitionTransactionBuilder.prototype.getId = function () {
        return this.mosaicDefinitionTransactionBody.getId();
    };
    EmbeddedMosaicDefinitionTransactionBuilder.prototype.getDuration = function () {
        return this.mosaicDefinitionTransactionBody.getDuration();
    };
    EmbeddedMosaicDefinitionTransactionBuilder.prototype.getNonce = function () {
        return this.mosaicDefinitionTransactionBody.getNonce();
    };
    EmbeddedMosaicDefinitionTransactionBuilder.prototype.getFlags = function () {
        return this.mosaicDefinitionTransactionBody.getFlags();
    };
    EmbeddedMosaicDefinitionTransactionBuilder.prototype.getDivisibility = function () {
        return this.mosaicDefinitionTransactionBody.getDivisibility();
    };
    EmbeddedMosaicDefinitionTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.mosaicDefinitionTransactionBody.getSize();
        return size;
    };
    EmbeddedMosaicDefinitionTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var mosaicDefinitionTransactionBodyBytes = this.mosaicDefinitionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicDefinitionTransactionBodyBytes);
        return newArray;
    };
    return EmbeddedMosaicDefinitionTransactionBuilder;
}(EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder));
exports.EmbeddedMosaicDefinitionTransactionBuilder = EmbeddedMosaicDefinitionTransactionBuilder;

},{"./EmbeddedTransactionBuilder":55,"./GeneratorUtils":60,"./MosaicDefinitionTransactionBodyBuilder":85}],47:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicGlobalRestrictionTransactionBodyBuilder_1 = require("./MosaicGlobalRestrictionTransactionBodyBuilder");
var EmbeddedMosaicGlobalRestrictionTransactionBuilder = (function (_super) {
    __extends(EmbeddedMosaicGlobalRestrictionTransactionBuilder, _super);
    function EmbeddedMosaicGlobalRestrictionTransactionBuilder(signerPublicKey, version, network, type, mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType) {
        var _this = _super.call(this, signerPublicKey, version, network, type) || this;
        _this.mosaicGlobalRestrictionTransactionBody = new MosaicGlobalRestrictionTransactionBodyBuilder_1.MosaicGlobalRestrictionTransactionBodyBuilder(mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType);
        return _this;
    }
    EmbeddedMosaicGlobalRestrictionTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var mosaicGlobalRestrictionTransactionBody = MosaicGlobalRestrictionTransactionBodyBuilder_1.MosaicGlobalRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicGlobalRestrictionTransactionBody.getSize());
        return new EmbeddedMosaicGlobalRestrictionTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, mosaicGlobalRestrictionTransactionBody.mosaicId, mosaicGlobalRestrictionTransactionBody.referenceMosaicId, mosaicGlobalRestrictionTransactionBody.restrictionKey, mosaicGlobalRestrictionTransactionBody.previousRestrictionValue, mosaicGlobalRestrictionTransactionBody.newRestrictionValue, mosaicGlobalRestrictionTransactionBody.previousRestrictionType, mosaicGlobalRestrictionTransactionBody.newRestrictionType);
    };
    EmbeddedMosaicGlobalRestrictionTransactionBuilder.prototype.getMosaicId = function () {
        return this.mosaicGlobalRestrictionTransactionBody.getMosaicId();
    };
    EmbeddedMosaicGlobalRestrictionTransactionBuilder.prototype.getReferenceMosaicId = function () {
        return this.mosaicGlobalRestrictionTransactionBody.getReferenceMosaicId();
    };
    EmbeddedMosaicGlobalRestrictionTransactionBuilder.prototype.getRestrictionKey = function () {
        return this.mosaicGlobalRestrictionTransactionBody.getRestrictionKey();
    };
    EmbeddedMosaicGlobalRestrictionTransactionBuilder.prototype.getPreviousRestrictionValue = function () {
        return this.mosaicGlobalRestrictionTransactionBody.getPreviousRestrictionValue();
    };
    EmbeddedMosaicGlobalRestrictionTransactionBuilder.prototype.getNewRestrictionValue = function () {
        return this.mosaicGlobalRestrictionTransactionBody.getNewRestrictionValue();
    };
    EmbeddedMosaicGlobalRestrictionTransactionBuilder.prototype.getPreviousRestrictionType = function () {
        return this.mosaicGlobalRestrictionTransactionBody.getPreviousRestrictionType();
    };
    EmbeddedMosaicGlobalRestrictionTransactionBuilder.prototype.getNewRestrictionType = function () {
        return this.mosaicGlobalRestrictionTransactionBody.getNewRestrictionType();
    };
    EmbeddedMosaicGlobalRestrictionTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.mosaicGlobalRestrictionTransactionBody.getSize();
        return size;
    };
    EmbeddedMosaicGlobalRestrictionTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var mosaicGlobalRestrictionTransactionBodyBytes = this.mosaicGlobalRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicGlobalRestrictionTransactionBodyBytes);
        return newArray;
    };
    return EmbeddedMosaicGlobalRestrictionTransactionBuilder;
}(EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder));
exports.EmbeddedMosaicGlobalRestrictionTransactionBuilder = EmbeddedMosaicGlobalRestrictionTransactionBuilder;

},{"./EmbeddedTransactionBuilder":55,"./GeneratorUtils":60,"./MosaicGlobalRestrictionTransactionBodyBuilder":90}],48:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicMetadataTransactionBodyBuilder_1 = require("./MosaicMetadataTransactionBodyBuilder");
var EmbeddedMosaicMetadataTransactionBuilder = (function (_super) {
    __extends(EmbeddedMosaicMetadataTransactionBuilder, _super);
    function EmbeddedMosaicMetadataTransactionBuilder(signerPublicKey, version, network, type, targetPublicKey, scopedMetadataKey, targetMosaicId, valueSizeDelta, value) {
        var _this = _super.call(this, signerPublicKey, version, network, type) || this;
        _this.mosaicMetadataTransactionBody = new MosaicMetadataTransactionBodyBuilder_1.MosaicMetadataTransactionBodyBuilder(targetPublicKey, scopedMetadataKey, targetMosaicId, valueSizeDelta, value);
        return _this;
    }
    EmbeddedMosaicMetadataTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var mosaicMetadataTransactionBody = MosaicMetadataTransactionBodyBuilder_1.MosaicMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicMetadataTransactionBody.getSize());
        return new EmbeddedMosaicMetadataTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, mosaicMetadataTransactionBody.targetPublicKey, mosaicMetadataTransactionBody.scopedMetadataKey, mosaicMetadataTransactionBody.targetMosaicId, mosaicMetadataTransactionBody.valueSizeDelta, mosaicMetadataTransactionBody.value);
    };
    EmbeddedMosaicMetadataTransactionBuilder.prototype.getTargetPublicKey = function () {
        return this.mosaicMetadataTransactionBody.getTargetPublicKey();
    };
    EmbeddedMosaicMetadataTransactionBuilder.prototype.getScopedMetadataKey = function () {
        return this.mosaicMetadataTransactionBody.getScopedMetadataKey();
    };
    EmbeddedMosaicMetadataTransactionBuilder.prototype.getTargetMosaicId = function () {
        return this.mosaicMetadataTransactionBody.getTargetMosaicId();
    };
    EmbeddedMosaicMetadataTransactionBuilder.prototype.getValueSizeDelta = function () {
        return this.mosaicMetadataTransactionBody.getValueSizeDelta();
    };
    EmbeddedMosaicMetadataTransactionBuilder.prototype.getValue = function () {
        return this.mosaicMetadataTransactionBody.getValue();
    };
    EmbeddedMosaicMetadataTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.mosaicMetadataTransactionBody.getSize();
        return size;
    };
    EmbeddedMosaicMetadataTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var mosaicMetadataTransactionBodyBytes = this.mosaicMetadataTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicMetadataTransactionBodyBytes);
        return newArray;
    };
    return EmbeddedMosaicMetadataTransactionBuilder;
}(EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder));
exports.EmbeddedMosaicMetadataTransactionBuilder = EmbeddedMosaicMetadataTransactionBuilder;

},{"./EmbeddedTransactionBuilder":55,"./GeneratorUtils":60,"./MosaicMetadataTransactionBodyBuilder":93}],49:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicSupplyChangeTransactionBodyBuilder_1 = require("./MosaicSupplyChangeTransactionBodyBuilder");
var EmbeddedMosaicSupplyChangeTransactionBuilder = (function (_super) {
    __extends(EmbeddedMosaicSupplyChangeTransactionBuilder, _super);
    function EmbeddedMosaicSupplyChangeTransactionBuilder(signerPublicKey, version, network, type, mosaicId, delta, action) {
        var _this = _super.call(this, signerPublicKey, version, network, type) || this;
        _this.mosaicSupplyChangeTransactionBody = new MosaicSupplyChangeTransactionBodyBuilder_1.MosaicSupplyChangeTransactionBodyBuilder(mosaicId, delta, action);
        return _this;
    }
    EmbeddedMosaicSupplyChangeTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var mosaicSupplyChangeTransactionBody = MosaicSupplyChangeTransactionBodyBuilder_1.MosaicSupplyChangeTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicSupplyChangeTransactionBody.getSize());
        return new EmbeddedMosaicSupplyChangeTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, mosaicSupplyChangeTransactionBody.mosaicId, mosaicSupplyChangeTransactionBody.delta, mosaicSupplyChangeTransactionBody.action);
    };
    EmbeddedMosaicSupplyChangeTransactionBuilder.prototype.getMosaicId = function () {
        return this.mosaicSupplyChangeTransactionBody.getMosaicId();
    };
    EmbeddedMosaicSupplyChangeTransactionBuilder.prototype.getDelta = function () {
        return this.mosaicSupplyChangeTransactionBody.getDelta();
    };
    EmbeddedMosaicSupplyChangeTransactionBuilder.prototype.getAction = function () {
        return this.mosaicSupplyChangeTransactionBody.getAction();
    };
    EmbeddedMosaicSupplyChangeTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.mosaicSupplyChangeTransactionBody.getSize();
        return size;
    };
    EmbeddedMosaicSupplyChangeTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var mosaicSupplyChangeTransactionBodyBytes = this.mosaicSupplyChangeTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicSupplyChangeTransactionBodyBytes);
        return newArray;
    };
    return EmbeddedMosaicSupplyChangeTransactionBuilder;
}(EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder));
exports.EmbeddedMosaicSupplyChangeTransactionBuilder = EmbeddedMosaicSupplyChangeTransactionBuilder;

},{"./EmbeddedTransactionBuilder":55,"./GeneratorUtils":60,"./MosaicSupplyChangeTransactionBodyBuilder":102}],50:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var MultisigAccountModificationTransactionBodyBuilder_1 = require("./MultisigAccountModificationTransactionBodyBuilder");
var EmbeddedMultisigAccountModificationTransactionBuilder = (function (_super) {
    __extends(EmbeddedMultisigAccountModificationTransactionBuilder, _super);
    function EmbeddedMultisigAccountModificationTransactionBuilder(signerPublicKey, version, network, type, minRemovalDelta, minApprovalDelta, publicKeyAdditions, publicKeyDeletions) {
        var _this = _super.call(this, signerPublicKey, version, network, type) || this;
        _this.multisigAccountModificationTransactionBody = new MultisigAccountModificationTransactionBodyBuilder_1.MultisigAccountModificationTransactionBodyBuilder(minRemovalDelta, minApprovalDelta, publicKeyAdditions, publicKeyDeletions);
        return _this;
    }
    EmbeddedMultisigAccountModificationTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var multisigAccountModificationTransactionBody = MultisigAccountModificationTransactionBodyBuilder_1.MultisigAccountModificationTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, multisigAccountModificationTransactionBody.getSize());
        return new EmbeddedMultisigAccountModificationTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, multisigAccountModificationTransactionBody.minRemovalDelta, multisigAccountModificationTransactionBody.minApprovalDelta, multisigAccountModificationTransactionBody.publicKeyAdditions, multisigAccountModificationTransactionBody.publicKeyDeletions);
    };
    EmbeddedMultisigAccountModificationTransactionBuilder.prototype.getMinRemovalDelta = function () {
        return this.multisigAccountModificationTransactionBody.getMinRemovalDelta();
    };
    EmbeddedMultisigAccountModificationTransactionBuilder.prototype.getMinApprovalDelta = function () {
        return this.multisigAccountModificationTransactionBody.getMinApprovalDelta();
    };
    EmbeddedMultisigAccountModificationTransactionBuilder.prototype.getMultisigAccountModificationTransactionBody_Reserved1 = function () {
        return this.multisigAccountModificationTransactionBody.getMultisigAccountModificationTransactionBody_Reserved1();
    };
    EmbeddedMultisigAccountModificationTransactionBuilder.prototype.getPublicKeyAdditions = function () {
        return this.multisigAccountModificationTransactionBody.getPublicKeyAdditions();
    };
    EmbeddedMultisigAccountModificationTransactionBuilder.prototype.getPublicKeyDeletions = function () {
        return this.multisigAccountModificationTransactionBody.getPublicKeyDeletions();
    };
    EmbeddedMultisigAccountModificationTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.multisigAccountModificationTransactionBody.getSize();
        return size;
    };
    EmbeddedMultisigAccountModificationTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var multisigAccountModificationTransactionBodyBytes = this.multisigAccountModificationTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, multisigAccountModificationTransactionBodyBytes);
        return newArray;
    };
    return EmbeddedMultisigAccountModificationTransactionBuilder;
}(EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder));
exports.EmbeddedMultisigAccountModificationTransactionBuilder = EmbeddedMultisigAccountModificationTransactionBuilder;

},{"./EmbeddedTransactionBuilder":55,"./GeneratorUtils":60,"./MultisigAccountModificationTransactionBodyBuilder":104}],51:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var NamespaceMetadataTransactionBodyBuilder_1 = require("./NamespaceMetadataTransactionBodyBuilder");
var EmbeddedNamespaceMetadataTransactionBuilder = (function (_super) {
    __extends(EmbeddedNamespaceMetadataTransactionBuilder, _super);
    function EmbeddedNamespaceMetadataTransactionBuilder(signerPublicKey, version, network, type, targetPublicKey, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value) {
        var _this = _super.call(this, signerPublicKey, version, network, type) || this;
        _this.namespaceMetadataTransactionBody = new NamespaceMetadataTransactionBodyBuilder_1.NamespaceMetadataTransactionBodyBuilder(targetPublicKey, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value);
        return _this;
    }
    EmbeddedNamespaceMetadataTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var namespaceMetadataTransactionBody = NamespaceMetadataTransactionBodyBuilder_1.NamespaceMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceMetadataTransactionBody.getSize());
        return new EmbeddedNamespaceMetadataTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, namespaceMetadataTransactionBody.targetPublicKey, namespaceMetadataTransactionBody.scopedMetadataKey, namespaceMetadataTransactionBody.targetNamespaceId, namespaceMetadataTransactionBody.valueSizeDelta, namespaceMetadataTransactionBody.value);
    };
    EmbeddedNamespaceMetadataTransactionBuilder.prototype.getTargetPublicKey = function () {
        return this.namespaceMetadataTransactionBody.getTargetPublicKey();
    };
    EmbeddedNamespaceMetadataTransactionBuilder.prototype.getScopedMetadataKey = function () {
        return this.namespaceMetadataTransactionBody.getScopedMetadataKey();
    };
    EmbeddedNamespaceMetadataTransactionBuilder.prototype.getTargetNamespaceId = function () {
        return this.namespaceMetadataTransactionBody.getTargetNamespaceId();
    };
    EmbeddedNamespaceMetadataTransactionBuilder.prototype.getValueSizeDelta = function () {
        return this.namespaceMetadataTransactionBody.getValueSizeDelta();
    };
    EmbeddedNamespaceMetadataTransactionBuilder.prototype.getValue = function () {
        return this.namespaceMetadataTransactionBody.getValue();
    };
    EmbeddedNamespaceMetadataTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.namespaceMetadataTransactionBody.getSize();
        return size;
    };
    EmbeddedNamespaceMetadataTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var namespaceMetadataTransactionBodyBytes = this.namespaceMetadataTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, namespaceMetadataTransactionBodyBytes);
        return newArray;
    };
    return EmbeddedNamespaceMetadataTransactionBuilder;
}(EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder));
exports.EmbeddedNamespaceMetadataTransactionBuilder = EmbeddedNamespaceMetadataTransactionBuilder;

},{"./EmbeddedTransactionBuilder":55,"./GeneratorUtils":60,"./NamespaceMetadataTransactionBodyBuilder":112}],52:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var NamespaceRegistrationTransactionBodyBuilder_1 = require("./NamespaceRegistrationTransactionBodyBuilder");
var EmbeddedNamespaceRegistrationTransactionBuilder = (function (_super) {
    __extends(EmbeddedNamespaceRegistrationTransactionBuilder, _super);
    function EmbeddedNamespaceRegistrationTransactionBuilder(signerPublicKey, version, network, type, id, name, duration, parentId) {
        var _this = _super.call(this, signerPublicKey, version, network, type) || this;
        if ((duration && parentId) || (!duration && !parentId)) {
            throw new Error('Invalid conditional parameters');
        }
        _this.namespaceRegistrationTransactionBody = new NamespaceRegistrationTransactionBodyBuilder_1.NamespaceRegistrationTransactionBodyBuilder(id, name, duration, parentId);
        return _this;
    }
    EmbeddedNamespaceRegistrationTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var namespaceRegistrationTransactionBody = NamespaceRegistrationTransactionBodyBuilder_1.NamespaceRegistrationTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceRegistrationTransactionBody.getSize());
        return new EmbeddedNamespaceRegistrationTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, namespaceRegistrationTransactionBody.id, namespaceRegistrationTransactionBody.name, namespaceRegistrationTransactionBody.duration, namespaceRegistrationTransactionBody.parentId);
    };
    EmbeddedNamespaceRegistrationTransactionBuilder.prototype.getDuration = function () {
        return this.namespaceRegistrationTransactionBody.getDuration();
    };
    EmbeddedNamespaceRegistrationTransactionBuilder.prototype.getParentId = function () {
        return this.namespaceRegistrationTransactionBody.getParentId();
    };
    EmbeddedNamespaceRegistrationTransactionBuilder.prototype.getId = function () {
        return this.namespaceRegistrationTransactionBody.getId();
    };
    EmbeddedNamespaceRegistrationTransactionBuilder.prototype.getRegistrationType = function () {
        return this.namespaceRegistrationTransactionBody.getRegistrationType();
    };
    EmbeddedNamespaceRegistrationTransactionBuilder.prototype.getName = function () {
        return this.namespaceRegistrationTransactionBody.getName();
    };
    EmbeddedNamespaceRegistrationTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.namespaceRegistrationTransactionBody.getSize();
        return size;
    };
    EmbeddedNamespaceRegistrationTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var namespaceRegistrationTransactionBodyBytes = this.namespaceRegistrationTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, namespaceRegistrationTransactionBodyBytes);
        return newArray;
    };
    return EmbeddedNamespaceRegistrationTransactionBuilder;
}(EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder));
exports.EmbeddedNamespaceRegistrationTransactionBuilder = EmbeddedNamespaceRegistrationTransactionBuilder;

},{"./EmbeddedTransactionBuilder":55,"./GeneratorUtils":60,"./NamespaceRegistrationTransactionBodyBuilder":115}],53:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var SecretLockTransactionBodyBuilder_1 = require("./SecretLockTransactionBodyBuilder");
var EmbeddedSecretLockTransactionBuilder = (function (_super) {
    __extends(EmbeddedSecretLockTransactionBuilder, _super);
    function EmbeddedSecretLockTransactionBuilder(signerPublicKey, version, network, type, secret, mosaic, duration, hashAlgorithm, recipientAddress) {
        var _this = _super.call(this, signerPublicKey, version, network, type) || this;
        _this.secretLockTransactionBody = new SecretLockTransactionBodyBuilder_1.SecretLockTransactionBodyBuilder(secret, mosaic, duration, hashAlgorithm, recipientAddress);
        return _this;
    }
    EmbeddedSecretLockTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var secretLockTransactionBody = SecretLockTransactionBodyBuilder_1.SecretLockTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secretLockTransactionBody.getSize());
        return new EmbeddedSecretLockTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, secretLockTransactionBody.secret, secretLockTransactionBody.mosaic, secretLockTransactionBody.duration, secretLockTransactionBody.hashAlgorithm, secretLockTransactionBody.recipientAddress);
    };
    EmbeddedSecretLockTransactionBuilder.prototype.getSecret = function () {
        return this.secretLockTransactionBody.getSecret();
    };
    EmbeddedSecretLockTransactionBuilder.prototype.getMosaic = function () {
        return this.secretLockTransactionBody.getMosaic();
    };
    EmbeddedSecretLockTransactionBuilder.prototype.getDuration = function () {
        return this.secretLockTransactionBody.getDuration();
    };
    EmbeddedSecretLockTransactionBuilder.prototype.getHashAlgorithm = function () {
        return this.secretLockTransactionBody.getHashAlgorithm();
    };
    EmbeddedSecretLockTransactionBuilder.prototype.getRecipientAddress = function () {
        return this.secretLockTransactionBody.getRecipientAddress();
    };
    EmbeddedSecretLockTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.secretLockTransactionBody.getSize();
        return size;
    };
    EmbeddedSecretLockTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var secretLockTransactionBodyBytes = this.secretLockTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secretLockTransactionBodyBytes);
        return newArray;
    };
    return EmbeddedSecretLockTransactionBuilder;
}(EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder));
exports.EmbeddedSecretLockTransactionBuilder = EmbeddedSecretLockTransactionBuilder;

},{"./EmbeddedTransactionBuilder":55,"./GeneratorUtils":60,"./SecretLockTransactionBodyBuilder":124}],54:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var SecretProofTransactionBodyBuilder_1 = require("./SecretProofTransactionBodyBuilder");
var EmbeddedSecretProofTransactionBuilder = (function (_super) {
    __extends(EmbeddedSecretProofTransactionBuilder, _super);
    function EmbeddedSecretProofTransactionBuilder(signerPublicKey, version, network, type, secret, hashAlgorithm, recipientAddress, proof) {
        var _this = _super.call(this, signerPublicKey, version, network, type) || this;
        _this.secretProofTransactionBody = new SecretProofTransactionBodyBuilder_1.SecretProofTransactionBodyBuilder(secret, hashAlgorithm, recipientAddress, proof);
        return _this;
    }
    EmbeddedSecretProofTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var secretProofTransactionBody = SecretProofTransactionBodyBuilder_1.SecretProofTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secretProofTransactionBody.getSize());
        return new EmbeddedSecretProofTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, secretProofTransactionBody.secret, secretProofTransactionBody.hashAlgorithm, secretProofTransactionBody.recipientAddress, secretProofTransactionBody.proof);
    };
    EmbeddedSecretProofTransactionBuilder.prototype.getSecret = function () {
        return this.secretProofTransactionBody.getSecret();
    };
    EmbeddedSecretProofTransactionBuilder.prototype.getHashAlgorithm = function () {
        return this.secretProofTransactionBody.getHashAlgorithm();
    };
    EmbeddedSecretProofTransactionBuilder.prototype.getRecipientAddress = function () {
        return this.secretProofTransactionBody.getRecipientAddress();
    };
    EmbeddedSecretProofTransactionBuilder.prototype.getProof = function () {
        return this.secretProofTransactionBody.getProof();
    };
    EmbeddedSecretProofTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.secretProofTransactionBody.getSize();
        return size;
    };
    EmbeddedSecretProofTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var secretProofTransactionBodyBytes = this.secretProofTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secretProofTransactionBodyBytes);
        return newArray;
    };
    return EmbeddedSecretProofTransactionBuilder;
}(EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder));
exports.EmbeddedSecretProofTransactionBuilder = EmbeddedSecretProofTransactionBuilder;

},{"./EmbeddedTransactionBuilder":55,"./GeneratorUtils":60,"./SecretProofTransactionBodyBuilder":126}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var KeyDto_1 = require("./KeyDto");
var EmbeddedTransactionBuilder = (function () {
    function EmbeddedTransactionBuilder(signerPublicKey, version, network, type) {
        this.size = 0;
        this.embeddedTransactionHeader_Reserved1 = 0;
        this.signerPublicKey = signerPublicKey;
        this.entityBody_Reserved1 = 0;
        this.version = version;
        this.network = network;
        this.type = type;
    }
    EmbeddedTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var size = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        var embeddedTransactionHeader_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        var signerPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signerPublicKey.getSize());
        var entityBody_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        var version = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var network = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var type = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        return new EmbeddedTransactionBuilder(signerPublicKey, version, network, type);
    };
    EmbeddedTransactionBuilder.prototype.getEmbeddedTransactionHeader_Reserved1 = function () {
        return this.embeddedTransactionHeader_Reserved1;
    };
    EmbeddedTransactionBuilder.prototype.getSignerPublicKey = function () {
        return this.signerPublicKey;
    };
    EmbeddedTransactionBuilder.prototype.getEntityBody_Reserved1 = function () {
        return this.entityBody_Reserved1;
    };
    EmbeddedTransactionBuilder.prototype.getVersion = function () {
        return this.version;
    };
    EmbeddedTransactionBuilder.prototype.getNetwork = function () {
        return this.network;
    };
    EmbeddedTransactionBuilder.prototype.getType = function () {
        return this.type;
    };
    EmbeddedTransactionBuilder.prototype.getSize = function () {
        var size = 0;
        size += 4;
        size += 4;
        size += this.signerPublicKey.getSize();
        size += 4;
        size += 1;
        size += 1;
        size += 2;
        return size;
    };
    EmbeddedTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var sizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getSize(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, sizeBytes);
        var embeddedTransactionHeader_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getEmbeddedTransactionHeader_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, embeddedTransactionHeader_Reserved1Bytes);
        var signerPublicKeyBytes = this.signerPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, signerPublicKeyBytes);
        var entityBody_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getEntityBody_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, entityBody_Reserved1Bytes);
        var versionBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getVersion(), 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, versionBytes);
        var networkBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.network, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, networkBytes);
        var typeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.type, 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, typeBytes);
        return newArray;
    };
    return EmbeddedTransactionBuilder;
}());
exports.EmbeddedTransactionBuilder = EmbeddedTransactionBuilder;

},{"./GeneratorUtils":60,"./KeyDto":75}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmbeddedAccountAddressRestrictionTransactionBuilder_1 = require("./EmbeddedAccountAddressRestrictionTransactionBuilder");
var EmbeddedAccountLinkTransactionBuilder_1 = require("./EmbeddedAccountLinkTransactionBuilder");
var EmbeddedAccountMetadataTransactionBuilder_1 = require("./EmbeddedAccountMetadataTransactionBuilder");
var EmbeddedAccountMosaicRestrictionTransactionBuilder_1 = require("./EmbeddedAccountMosaicRestrictionTransactionBuilder");
var EmbeddedAccountOperationRestrictionTransactionBuilder_1 = require("./EmbeddedAccountOperationRestrictionTransactionBuilder");
var EmbeddedAddressAliasTransactionBuilder_1 = require("./EmbeddedAddressAliasTransactionBuilder");
var EmbeddedHashLockTransactionBuilder_1 = require("./EmbeddedHashLockTransactionBuilder");
var EmbeddedMosaicAddressRestrictionTransactionBuilder_1 = require("./EmbeddedMosaicAddressRestrictionTransactionBuilder");
var EmbeddedMosaicAliasTransactionBuilder_1 = require("./EmbeddedMosaicAliasTransactionBuilder");
var EmbeddedMosaicDefinitionTransactionBuilder_1 = require("./EmbeddedMosaicDefinitionTransactionBuilder");
var EmbeddedMosaicGlobalRestrictionTransactionBuilder_1 = require("./EmbeddedMosaicGlobalRestrictionTransactionBuilder");
var EmbeddedMosaicMetadataTransactionBuilder_1 = require("./EmbeddedMosaicMetadataTransactionBuilder");
var EmbeddedMosaicSupplyChangeTransactionBuilder_1 = require("./EmbeddedMosaicSupplyChangeTransactionBuilder");
var EmbeddedMultisigAccountModificationTransactionBuilder_1 = require("./EmbeddedMultisigAccountModificationTransactionBuilder");
var EmbeddedNamespaceMetadataTransactionBuilder_1 = require("./EmbeddedNamespaceMetadataTransactionBuilder");
var EmbeddedNamespaceRegistrationTransactionBuilder_1 = require("./EmbeddedNamespaceRegistrationTransactionBuilder");
var EmbeddedSecretLockTransactionBuilder_1 = require("./EmbeddedSecretLockTransactionBuilder");
var EmbeddedSecretProofTransactionBuilder_1 = require("./EmbeddedSecretProofTransactionBuilder");
var EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
var EmbeddedTransferTransactionBuilder_1 = require("./EmbeddedTransferTransactionBuilder");
var EntityTypeDto_1 = require("./EntityTypeDto");
var GeneratorUtils_1 = require("./GeneratorUtils");
var EmbeddedTransactionHelper = (function () {
    function EmbeddedTransactionHelper() {
    }
    EmbeddedTransactionHelper.serialize = function (transaction) {
        var byte = transaction.serialize();
        var padding = new Uint8Array(GeneratorUtils_1.GeneratorUtils.getTransactionPaddingSize(byte.length, 8));
        return GeneratorUtils_1.GeneratorUtils.concatTypedArrays(byte, padding);
    };
    EmbeddedTransactionHelper.loadFromBinary = function (bytes) {
        var header = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(bytes);
        switch (header.getType()) {
            case EntityTypeDto_1.EntityTypeDto.ACCOUNT_LINK_TRANSACTION_BUILDER:
                return EmbeddedAccountLinkTransactionBuilder_1.EmbeddedAccountLinkTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.HASH_LOCK_TRANSACTION_BUILDER:
                return EmbeddedHashLockTransactionBuilder_1.EmbeddedHashLockTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.SECRET_LOCK_TRANSACTION_BUILDER:
                return EmbeddedSecretLockTransactionBuilder_1.EmbeddedSecretLockTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.SECRET_PROOF_TRANSACTION_BUILDER:
                return EmbeddedSecretProofTransactionBuilder_1.EmbeddedSecretProofTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.ACCOUNT_METADATA_TRANSACTION_BUILDER:
                return EmbeddedAccountMetadataTransactionBuilder_1.EmbeddedAccountMetadataTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.MOSAIC_METADATA_TRANSACTION_BUILDER:
                return EmbeddedMosaicMetadataTransactionBuilder_1.EmbeddedMosaicMetadataTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.NAMESPACE_METADATA_TRANSACTION_BUILDER:
                return EmbeddedNamespaceMetadataTransactionBuilder_1.EmbeddedNamespaceMetadataTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.MOSAIC_DEFINITION_TRANSACTION_BUILDER:
                return EmbeddedMosaicDefinitionTransactionBuilder_1.EmbeddedMosaicDefinitionTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.MOSAIC_SUPPLY_CHANGE_TRANSACTION_BUILDER:
                return EmbeddedMosaicSupplyChangeTransactionBuilder_1.EmbeddedMosaicSupplyChangeTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.MULTISIG_ACCOUNT_MODIFICATION_TRANSACTION_BUILDER:
                return EmbeddedMultisigAccountModificationTransactionBuilder_1.EmbeddedMultisigAccountModificationTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.ADDRESS_ALIAS_TRANSACTION_BUILDER:
                return EmbeddedAddressAliasTransactionBuilder_1.EmbeddedAddressAliasTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.MOSAIC_ALIAS_TRANSACTION_BUILDER:
                return EmbeddedMosaicAliasTransactionBuilder_1.EmbeddedMosaicAliasTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.NAMESPACE_REGISTRATION_TRANSACTION_BUILDER:
                return EmbeddedNamespaceRegistrationTransactionBuilder_1.EmbeddedNamespaceRegistrationTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.ACCOUNT_ADDRESS_RESTRICTION_TRANSACTION_BUILDER:
                return EmbeddedAccountAddressRestrictionTransactionBuilder_1.EmbeddedAccountAddressRestrictionTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.ACCOUNT_MOSAIC_RESTRICTION_TRANSACTION_BUILDER:
                return EmbeddedAccountMosaicRestrictionTransactionBuilder_1.EmbeddedAccountMosaicRestrictionTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.ACCOUNT_OPERATION_RESTRICTION_TRANSACTION_BUILDER:
                return EmbeddedAccountOperationRestrictionTransactionBuilder_1.EmbeddedAccountOperationRestrictionTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.MOSAIC_ADDRESS_RESTRICTION_TRANSACTION_BUILDER:
                return EmbeddedMosaicAddressRestrictionTransactionBuilder_1.EmbeddedMosaicAddressRestrictionTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.MOSAIC_GLOBAL_RESTRICTION_TRANSACTION_BUILDER:
                return EmbeddedMosaicGlobalRestrictionTransactionBuilder_1.EmbeddedMosaicGlobalRestrictionTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.TRANSFER_TRANSACTION_BUILDER:
                return EmbeddedTransferTransactionBuilder_1.EmbeddedTransferTransactionBuilder.loadFromBinary(bytes);
            default:
                throw new Error("Transaction type: " + header.getType() + " not recognized.");
        }
    };
    EmbeddedTransactionHelper.getEmbeddedTransactionSize = function (transactions) {
        return transactions.map(function (o) { return EmbeddedTransactionHelper.serialize(o).length; }).reduce(function (a, b) { return a + b; }, 0);
    };
    return EmbeddedTransactionHelper;
}());
exports.EmbeddedTransactionHelper = EmbeddedTransactionHelper;

},{"./EmbeddedAccountAddressRestrictionTransactionBuilder":37,"./EmbeddedAccountLinkTransactionBuilder":38,"./EmbeddedAccountMetadataTransactionBuilder":39,"./EmbeddedAccountMosaicRestrictionTransactionBuilder":40,"./EmbeddedAccountOperationRestrictionTransactionBuilder":41,"./EmbeddedAddressAliasTransactionBuilder":42,"./EmbeddedHashLockTransactionBuilder":43,"./EmbeddedMosaicAddressRestrictionTransactionBuilder":44,"./EmbeddedMosaicAliasTransactionBuilder":45,"./EmbeddedMosaicDefinitionTransactionBuilder":46,"./EmbeddedMosaicGlobalRestrictionTransactionBuilder":47,"./EmbeddedMosaicMetadataTransactionBuilder":48,"./EmbeddedMosaicSupplyChangeTransactionBuilder":49,"./EmbeddedMultisigAccountModificationTransactionBuilder":50,"./EmbeddedNamespaceMetadataTransactionBuilder":51,"./EmbeddedNamespaceRegistrationTransactionBuilder":52,"./EmbeddedSecretLockTransactionBuilder":53,"./EmbeddedSecretProofTransactionBuilder":54,"./EmbeddedTransactionBuilder":55,"./EmbeddedTransferTransactionBuilder":57,"./EntityTypeDto":58,"./GeneratorUtils":60}],57:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var TransferTransactionBodyBuilder_1 = require("./TransferTransactionBodyBuilder");
var EmbeddedTransferTransactionBuilder = (function (_super) {
    __extends(EmbeddedTransferTransactionBuilder, _super);
    function EmbeddedTransferTransactionBuilder(signerPublicKey, version, network, type, recipientAddress, mosaics, message) {
        var _this = _super.call(this, signerPublicKey, version, network, type) || this;
        _this.transferTransactionBody = new TransferTransactionBodyBuilder_1.TransferTransactionBodyBuilder(recipientAddress, mosaics, message);
        return _this;
    }
    EmbeddedTransferTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var transferTransactionBody = TransferTransactionBodyBuilder_1.TransferTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, transferTransactionBody.getSize());
        return new EmbeddedTransferTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, transferTransactionBody.recipientAddress, transferTransactionBody.mosaics, transferTransactionBody.message);
    };
    EmbeddedTransferTransactionBuilder.prototype.getRecipientAddress = function () {
        return this.transferTransactionBody.getRecipientAddress();
    };
    EmbeddedTransferTransactionBuilder.prototype.getTransferTransactionBody_Reserved1 = function () {
        return this.transferTransactionBody.getTransferTransactionBody_Reserved1();
    };
    EmbeddedTransferTransactionBuilder.prototype.getMosaics = function () {
        return this.transferTransactionBody.getMosaics();
    };
    EmbeddedTransferTransactionBuilder.prototype.getMessage = function () {
        return this.transferTransactionBody.getMessage();
    };
    EmbeddedTransferTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.transferTransactionBody.getSize();
        return size;
    };
    EmbeddedTransferTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var transferTransactionBodyBytes = this.transferTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, transferTransactionBodyBytes);
        return newArray;
    };
    return EmbeddedTransferTransactionBuilder;
}(EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder));
exports.EmbeddedTransferTransactionBuilder = EmbeddedTransferTransactionBuilder;

},{"./EmbeddedTransactionBuilder":55,"./GeneratorUtils":60,"./TransferTransactionBodyBuilder":132}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EntityTypeDto;
(function (EntityTypeDto) {
    EntityTypeDto[EntityTypeDto["RESERVED"] = 0] = "RESERVED";
    EntityTypeDto[EntityTypeDto["ACCOUNT_LINK_TRANSACTION_BUILDER"] = 16716] = "ACCOUNT_LINK_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["AGGREGATE_COMPLETE_TRANSACTION_BUILDER"] = 16705] = "AGGREGATE_COMPLETE_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["AGGREGATE_BONDED_TRANSACTION_BUILDER"] = 16961] = "AGGREGATE_BONDED_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["HASH_LOCK_TRANSACTION_BUILDER"] = 16712] = "HASH_LOCK_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["SECRET_LOCK_TRANSACTION_BUILDER"] = 16722] = "SECRET_LOCK_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["SECRET_PROOF_TRANSACTION_BUILDER"] = 16978] = "SECRET_PROOF_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["ACCOUNT_METADATA_TRANSACTION_BUILDER"] = 16708] = "ACCOUNT_METADATA_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["MOSAIC_METADATA_TRANSACTION_BUILDER"] = 16964] = "MOSAIC_METADATA_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["NAMESPACE_METADATA_TRANSACTION_BUILDER"] = 17220] = "NAMESPACE_METADATA_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["MOSAIC_DEFINITION_TRANSACTION_BUILDER"] = 16717] = "MOSAIC_DEFINITION_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["MOSAIC_SUPPLY_CHANGE_TRANSACTION_BUILDER"] = 16973] = "MOSAIC_SUPPLY_CHANGE_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["MULTISIG_ACCOUNT_MODIFICATION_TRANSACTION_BUILDER"] = 16725] = "MULTISIG_ACCOUNT_MODIFICATION_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["ADDRESS_ALIAS_TRANSACTION_BUILDER"] = 16974] = "ADDRESS_ALIAS_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["MOSAIC_ALIAS_TRANSACTION_BUILDER"] = 17230] = "MOSAIC_ALIAS_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["NAMESPACE_REGISTRATION_TRANSACTION_BUILDER"] = 16718] = "NAMESPACE_REGISTRATION_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["ACCOUNT_ADDRESS_RESTRICTION_TRANSACTION_BUILDER"] = 16720] = "ACCOUNT_ADDRESS_RESTRICTION_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["ACCOUNT_MOSAIC_RESTRICTION_TRANSACTION_BUILDER"] = 16976] = "ACCOUNT_MOSAIC_RESTRICTION_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["ACCOUNT_OPERATION_RESTRICTION_TRANSACTION_BUILDER"] = 17232] = "ACCOUNT_OPERATION_RESTRICTION_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["MOSAIC_ADDRESS_RESTRICTION_TRANSACTION_BUILDER"] = 16977] = "MOSAIC_ADDRESS_RESTRICTION_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["MOSAIC_GLOBAL_RESTRICTION_TRANSACTION_BUILDER"] = 16721] = "MOSAIC_GLOBAL_RESTRICTION_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["TRANSFER_TRANSACTION_BUILDER"] = 16724] = "TRANSFER_TRANSACTION_BUILDER";
})(EntityTypeDto = exports.EntityTypeDto || (exports.EntityTypeDto = {}));

},{}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExpandedAccountRestrictionFlagsDto;
(function (ExpandedAccountRestrictionFlagsDto) {
    ExpandedAccountRestrictionFlagsDto[ExpandedAccountRestrictionFlagsDto["ADDRESS"] = 1] = "ADDRESS";
    ExpandedAccountRestrictionFlagsDto[ExpandedAccountRestrictionFlagsDto["ADDRESS_OUTGOING"] = 16385] = "ADDRESS_OUTGOING";
    ExpandedAccountRestrictionFlagsDto[ExpandedAccountRestrictionFlagsDto["MOSAIC_ID"] = 2] = "MOSAIC_ID";
    ExpandedAccountRestrictionFlagsDto[ExpandedAccountRestrictionFlagsDto["TRANSACTION_TYPE_OUTGOING"] = 16388] = "TRANSACTION_TYPE_OUTGOING";
    ExpandedAccountRestrictionFlagsDto[ExpandedAccountRestrictionFlagsDto["ADDRESS_BLOCK"] = 32769] = "ADDRESS_BLOCK";
    ExpandedAccountRestrictionFlagsDto[ExpandedAccountRestrictionFlagsDto["ADDRESS_OUTGOING_BLOCK"] = 49153] = "ADDRESS_OUTGOING_BLOCK";
    ExpandedAccountRestrictionFlagsDto[ExpandedAccountRestrictionFlagsDto["MOSAIC_ID_BLOCK"] = 32770] = "MOSAIC_ID_BLOCK";
    ExpandedAccountRestrictionFlagsDto[ExpandedAccountRestrictionFlagsDto["TRANSACTION_TYPE_OUTGOING_BLOCK"] = 49156] = "TRANSACTION_TYPE_OUTGOING_BLOCK";
})(ExpandedAccountRestrictionFlagsDto = exports.ExpandedAccountRestrictionFlagsDto || (exports.ExpandedAccountRestrictionFlagsDto = {}));

},{}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils = (function () {
    function GeneratorUtils() {
    }
    GeneratorUtils.bufferToUint64 = function (input) {
        if (8 !== input.length) {
            throw Error("byte array has unexpected size '" + input.length + "'");
        }
        input = input.reverse();
        var view = new DataView(input.buffer);
        return [view.getUint32(4), view.getUint32(0)];
    };
    GeneratorUtils.readUint32At = function (bytes, index) {
        return (bytes[index] + (bytes[index + 1] << 8) + (bytes[index + 2] << 16) + (bytes[index + 3] << 24)) >>> 0;
    };
    GeneratorUtils.uintToBuffer = function (uintValue, bufferSize) {
        var buffer = new ArrayBuffer(bufferSize);
        var dataView = new DataView(buffer);
        try {
            if (1 === bufferSize) {
                dataView.setUint8(0, uintValue);
            }
            else if (2 === bufferSize) {
                dataView.setUint16(0, uintValue, true);
            }
            else if (4 === bufferSize) {
                dataView.setUint32(0, uintValue, true);
            }
            else {
                throw new Error('Unexpected bufferSize');
            }
            return new Uint8Array(buffer);
        }
        catch (e) {
            throw new Error("Converting uint value " + uintValue + " into buffer with error: " + e);
        }
    };
    GeneratorUtils.bufferToUint = function (buffer) {
        var dataView = new DataView(buffer.buffer);
        try {
            if (1 === buffer.byteLength) {
                return dataView.getUint8(0);
            }
            else if (2 === buffer.byteLength) {
                return dataView.getUint16(0, true);
            }
            else if (4 === buffer.byteLength) {
                return dataView.getUint32(0, true);
            }
            throw new Error('Unexpected buffer size');
        }
        catch (e) {
            throw new Error("Converting buffer into number with error: " + e);
        }
    };
    GeneratorUtils.uint64ToBuffer = function (uintValue) {
        var uint32Array = new Uint32Array(uintValue);
        return new Uint8Array(uint32Array.buffer);
    };
    GeneratorUtils.concatTypedArrays = function (array1, array2) {
        var newArray = new Uint8Array(array1.length + array2.length);
        newArray.set(array1);
        newArray.set(array2, array1.length);
        return newArray;
    };
    GeneratorUtils.getBytes = function (binary, size) {
        if (size > binary.length) {
            throw new RangeError();
        }
        var bytes = binary.slice(0, size);
        return bytes;
    };
    GeneratorUtils.getTransactionPaddingSize = function (size, alignment) {
        return 0 === size % alignment ? 0 : alignment - (size % alignment);
    };
    GeneratorUtils.compact = function (uint64) {
        var low = uint64[0];
        var high = uint64[1];
        if (0x00200000 <= high) {
            return uint64;
        }
        return (high * 0x100000000) + low;
    };
    GeneratorUtils.fromUint = function (number) {
        var value = [(number & 0xFFFFFFFF) >>> 0, (number / 0x100000000) >>> 0];
        return value;
    };
    GeneratorUtils.uint8ToInt8 = function (input) {
        if (0xFF < input) {
            throw Error("input '" + input + "' is out of range");
        }
        return input << 24 >> 24;
    };
    return GeneratorUtils;
}());
exports.GeneratorUtils = GeneratorUtils;

},{}],61:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicRestrictionKeyDto_1 = require("./MosaicRestrictionKeyDto");
var RestrictionRuleBuilder_1 = require("./RestrictionRuleBuilder");
var GlobalKeyValueBuilder = (function () {
    function GlobalKeyValueBuilder(key, restrictionRule) {
        this.key = key;
        this.restrictionRule = restrictionRule;
    }
    GlobalKeyValueBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var key = MosaicRestrictionKeyDto_1.MosaicRestrictionKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, key.getSize());
        var restrictionRule = RestrictionRuleBuilder_1.RestrictionRuleBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, restrictionRule.getSize());
        return new GlobalKeyValueBuilder(key, restrictionRule);
    };
    GlobalKeyValueBuilder.prototype.getKey = function () {
        return this.key;
    };
    GlobalKeyValueBuilder.prototype.getRestrictionRule = function () {
        return this.restrictionRule;
    };
    GlobalKeyValueBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.key.getSize();
        size += this.restrictionRule.getSize();
        return size;
    };
    GlobalKeyValueBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var keyBytes = this.key.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, keyBytes);
        var restrictionRuleBytes = this.restrictionRule.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionRuleBytes);
        return newArray;
    };
    return GlobalKeyValueBuilder;
}());
exports.GlobalKeyValueBuilder = GlobalKeyValueBuilder;

},{"./GeneratorUtils":60,"./MosaicRestrictionKeyDto":101,"./RestrictionRuleBuilder":120}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var GlobalKeyValueBuilder_1 = require("./GlobalKeyValueBuilder");
var GlobalKeyValueSetBuilder = (function () {
    function GlobalKeyValueSetBuilder(keys) {
        this.keys = keys;
    }
    GlobalKeyValueSetBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var keyValueCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var keys = [];
        for (var i = 0; i < (Array.isArray(keyValueCount) ? GeneratorUtils_1.GeneratorUtils.compact(keyValueCount) : keyValueCount); i++) {
            var item = GlobalKeyValueBuilder_1.GlobalKeyValueBuilder.loadFromBinary(Uint8Array.from(byteArray));
            keys.push(item);
            byteArray.splice(0, item.getSize());
        }
        return new GlobalKeyValueSetBuilder(keys);
    };
    GlobalKeyValueSetBuilder.prototype.getKeys = function () {
        return this.keys;
    };
    GlobalKeyValueSetBuilder.prototype.getSize = function () {
        var size = 0;
        size += 1;
        this.keys.forEach(function (o) { return size += o.getSize(); });
        return size;
    };
    GlobalKeyValueSetBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var keyValueCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.keys.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, keyValueCountBytes);
        this.keys.forEach(function (item) {
            var keysBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, keysBytes);
        });
        return newArray;
    };
    return GlobalKeyValueSetBuilder;
}());
exports.GlobalKeyValueSetBuilder = GlobalKeyValueSetBuilder;

},{"./GeneratorUtils":60,"./GlobalKeyValueBuilder":61}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var Hash256Dto = (function () {
    function Hash256Dto(hash256) {
        this.hash256 = hash256;
    }
    Hash256Dto.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var hash256 = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 32);
        byteArray.splice(0, 32);
        return new Hash256Dto(hash256);
    };
    Hash256Dto.prototype.getHash256 = function () {
        return this.hash256;
    };
    Hash256Dto.prototype.getSize = function () {
        return 32;
    };
    Hash256Dto.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.hash256);
        return newArray;
    };
    return Hash256Dto;
}());
exports.Hash256Dto = Hash256Dto;

},{"./GeneratorUtils":60}],64:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var Hash512Dto = (function () {
    function Hash512Dto(hash512) {
        this.hash512 = hash512;
    }
    Hash512Dto.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var hash512 = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 64);
        byteArray.splice(0, 64);
        return new Hash512Dto(hash512);
    };
    Hash512Dto.prototype.getHash512 = function () {
        return this.hash512;
    };
    Hash512Dto.prototype.getSize = function () {
        return 64;
    };
    Hash512Dto.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.hash512);
        return newArray;
    };
    return Hash512Dto;
}());
exports.Hash512Dto = Hash512Dto;

},{"./GeneratorUtils":60}],65:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var Hash256Dto_1 = require("./Hash256Dto");
var HeightDto_1 = require("./HeightDto");
var KeyDto_1 = require("./KeyDto");
var MosaicBuilder_1 = require("./MosaicBuilder");
var HashLockInfoBuilder = (function () {
    function HashLockInfoBuilder(senderPublicKey, mosaic, endHeight, status, hash) {
        this.senderPublicKey = senderPublicKey;
        this.mosaic = mosaic;
        this.endHeight = endHeight;
        this.status = status;
        this.hash = hash;
    }
    HashLockInfoBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var senderPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, senderPublicKey.getSize());
        var mosaic = MosaicBuilder_1.MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        var endHeight = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, endHeight.getSize());
        var status = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var hash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, hash.getSize());
        return new HashLockInfoBuilder(senderPublicKey, mosaic, endHeight, status, hash);
    };
    HashLockInfoBuilder.prototype.getSenderPublicKey = function () {
        return this.senderPublicKey;
    };
    HashLockInfoBuilder.prototype.getMosaic = function () {
        return this.mosaic;
    };
    HashLockInfoBuilder.prototype.getEndHeight = function () {
        return this.endHeight;
    };
    HashLockInfoBuilder.prototype.getStatus = function () {
        return this.status;
    };
    HashLockInfoBuilder.prototype.getHash = function () {
        return this.hash;
    };
    HashLockInfoBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.senderPublicKey.getSize();
        size += this.mosaic.getSize();
        size += this.endHeight.getSize();
        size += 1;
        size += this.hash.getSize();
        return size;
    };
    HashLockInfoBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var senderPublicKeyBytes = this.senderPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, senderPublicKeyBytes);
        var mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        var endHeightBytes = this.endHeight.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, endHeightBytes);
        var statusBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.status, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, statusBytes);
        var hashBytes = this.hash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, hashBytes);
        return newArray;
    };
    return HashLockInfoBuilder;
}());
exports.HashLockInfoBuilder = HashLockInfoBuilder;

},{"./GeneratorUtils":60,"./Hash256Dto":63,"./HeightDto":70,"./KeyDto":75,"./MosaicBuilder":83}],66:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlockDurationDto_1 = require("./BlockDurationDto");
var GeneratorUtils_1 = require("./GeneratorUtils");
var Hash256Dto_1 = require("./Hash256Dto");
var UnresolvedMosaicBuilder_1 = require("./UnresolvedMosaicBuilder");
var HashLockTransactionBodyBuilder = (function () {
    function HashLockTransactionBodyBuilder(mosaic, duration, hash) {
        this.mosaic = mosaic;
        this.duration = duration;
        this.hash = hash;
    }
    HashLockTransactionBodyBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var mosaic = UnresolvedMosaicBuilder_1.UnresolvedMosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        var duration = BlockDurationDto_1.BlockDurationDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, duration.getSize());
        var hash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, hash.getSize());
        return new HashLockTransactionBodyBuilder(mosaic, duration, hash);
    };
    HashLockTransactionBodyBuilder.prototype.getMosaic = function () {
        return this.mosaic;
    };
    HashLockTransactionBodyBuilder.prototype.getDuration = function () {
        return this.duration;
    };
    HashLockTransactionBodyBuilder.prototype.getHash = function () {
        return this.hash;
    };
    HashLockTransactionBodyBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.mosaic.getSize();
        size += this.duration.getSize();
        size += this.hash.getSize();
        return size;
    };
    HashLockTransactionBodyBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        var durationBytes = this.duration.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, durationBytes);
        var hashBytes = this.hash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, hashBytes);
        return newArray;
    };
    return HashLockTransactionBodyBuilder;
}());
exports.HashLockTransactionBodyBuilder = HashLockTransactionBodyBuilder;

},{"./BlockDurationDto":31,"./GeneratorUtils":60,"./Hash256Dto":63,"./UnresolvedMosaicBuilder":135}],67:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var HashLockTransactionBodyBuilder_1 = require("./HashLockTransactionBodyBuilder");
var TransactionBuilder_1 = require("./TransactionBuilder");
var HashLockTransactionBuilder = (function (_super) {
    __extends(HashLockTransactionBuilder, _super);
    function HashLockTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, mosaic, duration, hash) {
        var _this = _super.call(this, signature, signerPublicKey, version, network, type, fee, deadline) || this;
        _this.hashLockTransactionBody = new HashLockTransactionBodyBuilder_1.HashLockTransactionBodyBuilder(mosaic, duration, hash);
        return _this;
    }
    HashLockTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var hashLockTransactionBody = HashLockTransactionBodyBuilder_1.HashLockTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, hashLockTransactionBody.getSize());
        return new HashLockTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, hashLockTransactionBody.mosaic, hashLockTransactionBody.duration, hashLockTransactionBody.hash);
    };
    HashLockTransactionBuilder.prototype.getMosaic = function () {
        return this.hashLockTransactionBody.getMosaic();
    };
    HashLockTransactionBuilder.prototype.getDuration = function () {
        return this.hashLockTransactionBody.getDuration();
    };
    HashLockTransactionBuilder.prototype.getHash = function () {
        return this.hashLockTransactionBody.getHash();
    };
    HashLockTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.hashLockTransactionBody.getSize();
        return size;
    };
    HashLockTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var hashLockTransactionBodyBytes = this.hashLockTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, hashLockTransactionBodyBytes);
        return newArray;
    };
    return HashLockTransactionBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.HashLockTransactionBuilder = HashLockTransactionBuilder;

},{"./GeneratorUtils":60,"./HashLockTransactionBodyBuilder":66,"./TransactionBuilder":130}],68:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AmountDto_1 = require("./AmountDto");
var GeneratorUtils_1 = require("./GeneratorUtils");
var ImportanceHeightDto_1 = require("./ImportanceHeightDto");
var HeightActivityBucketBuilder = (function () {
    function HeightActivityBucketBuilder(startHeight, totalFeesPaid, beneficiaryCount, rawScore) {
        this.startHeight = startHeight;
        this.totalFeesPaid = totalFeesPaid;
        this.beneficiaryCount = beneficiaryCount;
        this.rawScore = rawScore;
    }
    HeightActivityBucketBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var startHeight = ImportanceHeightDto_1.ImportanceHeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, startHeight.getSize());
        var totalFeesPaid = AmountDto_1.AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, totalFeesPaid.getSize());
        var beneficiaryCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        var rawScore = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new HeightActivityBucketBuilder(startHeight, totalFeesPaid, beneficiaryCount, rawScore);
    };
    HeightActivityBucketBuilder.prototype.getStartHeight = function () {
        return this.startHeight;
    };
    HeightActivityBucketBuilder.prototype.getTotalFeesPaid = function () {
        return this.totalFeesPaid;
    };
    HeightActivityBucketBuilder.prototype.getBeneficiaryCount = function () {
        return this.beneficiaryCount;
    };
    HeightActivityBucketBuilder.prototype.getRawScore = function () {
        return this.rawScore;
    };
    HeightActivityBucketBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.startHeight.getSize();
        size += this.totalFeesPaid.getSize();
        size += 4;
        size += 8;
        return size;
    };
    HeightActivityBucketBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var startHeightBytes = this.startHeight.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, startHeightBytes);
        var totalFeesPaidBytes = this.totalFeesPaid.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, totalFeesPaidBytes);
        var beneficiaryCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getBeneficiaryCount(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, beneficiaryCountBytes);
        var rawScoreBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getRawScore());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, rawScoreBytes);
        return newArray;
    };
    return HeightActivityBucketBuilder;
}());
exports.HeightActivityBucketBuilder = HeightActivityBucketBuilder;

},{"./AmountDto":28,"./GeneratorUtils":60,"./ImportanceHeightDto":72}],69:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var HeightActivityBucketsBuilder = (function () {
    function HeightActivityBucketsBuilder(buckets) {
        this.buckets = buckets;
    }
    HeightActivityBucketsBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var buckets = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 5);
        byteArray.splice(0, 5);
        return new HeightActivityBucketsBuilder(buckets);
    };
    HeightActivityBucketsBuilder.prototype.getBuckets = function () {
        return this.buckets;
    };
    HeightActivityBucketsBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.buckets.length;
        return size;
    };
    HeightActivityBucketsBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.buckets);
        return newArray;
    };
    return HeightActivityBucketsBuilder;
}());
exports.HeightActivityBucketsBuilder = HeightActivityBucketsBuilder;

},{"./GeneratorUtils":60}],70:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var HeightDto = (function () {
    function HeightDto(height) {
        this.height = height;
    }
    HeightDto.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var height = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new HeightDto(height);
    };
    HeightDto.prototype.getHeight = function () {
        return this.height;
    };
    HeightDto.prototype.getSize = function () {
        return 8;
    };
    HeightDto.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var heightBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getHeight());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, heightBytes);
        return newArray;
    };
    return HeightDto;
}());
exports.HeightDto = HeightDto;

},{"./GeneratorUtils":60}],71:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var ImportanceDto = (function () {
    function ImportanceDto(importance) {
        this.importance = importance;
    }
    ImportanceDto.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var importance = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new ImportanceDto(importance);
    };
    ImportanceDto.prototype.getImportance = function () {
        return this.importance;
    };
    ImportanceDto.prototype.getSize = function () {
        return 8;
    };
    ImportanceDto.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var importanceBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getImportance());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, importanceBytes);
        return newArray;
    };
    return ImportanceDto;
}());
exports.ImportanceDto = ImportanceDto;

},{"./GeneratorUtils":60}],72:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var ImportanceHeightDto = (function () {
    function ImportanceHeightDto(importanceHeight) {
        this.importanceHeight = importanceHeight;
    }
    ImportanceHeightDto.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var importanceHeight = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new ImportanceHeightDto(importanceHeight);
    };
    ImportanceHeightDto.prototype.getImportanceHeight = function () {
        return this.importanceHeight;
    };
    ImportanceHeightDto.prototype.getSize = function () {
        return 8;
    };
    ImportanceHeightDto.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var importanceHeightBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getImportanceHeight());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, importanceHeightBytes);
        return newArray;
    };
    return ImportanceHeightDto;
}());
exports.ImportanceHeightDto = ImportanceHeightDto;

},{"./GeneratorUtils":60}],73:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var ImportanceDto_1 = require("./ImportanceDto");
var ImportanceHeightDto_1 = require("./ImportanceHeightDto");
var ImportanceSnapshotBuilder = (function () {
    function ImportanceSnapshotBuilder(importance, height) {
        this.importance = importance;
        this.height = height;
    }
    ImportanceSnapshotBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var importance = ImportanceDto_1.ImportanceDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, importance.getSize());
        var height = ImportanceHeightDto_1.ImportanceHeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, height.getSize());
        return new ImportanceSnapshotBuilder(importance, height);
    };
    ImportanceSnapshotBuilder.prototype.getImportance = function () {
        return this.importance;
    };
    ImportanceSnapshotBuilder.prototype.getHeight = function () {
        return this.height;
    };
    ImportanceSnapshotBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.importance.getSize();
        size += this.height.getSize();
        return size;
    };
    ImportanceSnapshotBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var importanceBytes = this.importance.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, importanceBytes);
        var heightBytes = this.height.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, heightBytes);
        return newArray;
    };
    return ImportanceSnapshotBuilder;
}());
exports.ImportanceSnapshotBuilder = ImportanceSnapshotBuilder;

},{"./GeneratorUtils":60,"./ImportanceDto":71,"./ImportanceHeightDto":72}],74:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicBuilder_1 = require("./MosaicBuilder");
var ReceiptBuilder_1 = require("./ReceiptBuilder");
var InflationReceiptBuilder = (function (_super) {
    __extends(InflationReceiptBuilder, _super);
    function InflationReceiptBuilder(version, type, mosaic) {
        var _this = _super.call(this, version, type) || this;
        _this.mosaic = mosaic;
        return _this;
    }
    InflationReceiptBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = ReceiptBuilder_1.ReceiptBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var mosaic = MosaicBuilder_1.MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        return new InflationReceiptBuilder(superObject.version, superObject.type, mosaic);
    };
    InflationReceiptBuilder.prototype.getMosaic = function () {
        return this.mosaic;
    };
    InflationReceiptBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.mosaic.getSize();
        return size;
    };
    InflationReceiptBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        return newArray;
    };
    return InflationReceiptBuilder;
}(ReceiptBuilder_1.ReceiptBuilder));
exports.InflationReceiptBuilder = InflationReceiptBuilder;

},{"./GeneratorUtils":60,"./MosaicBuilder":83,"./ReceiptBuilder":118}],75:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var KeyDto = (function () {
    function KeyDto(key) {
        this.key = key;
    }
    KeyDto.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var key = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 32);
        byteArray.splice(0, 32);
        return new KeyDto(key);
    };
    KeyDto.prototype.getKey = function () {
        return this.key;
    };
    KeyDto.prototype.getSize = function () {
        return 32;
    };
    KeyDto.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.key);
        return newArray;
    };
    return KeyDto;
}());
exports.KeyDto = KeyDto;

},{"./GeneratorUtils":60}],76:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var KeyDto_1 = require("./KeyDto");
var MetadataValueBuilder_1 = require("./MetadataValueBuilder");
var ScopedMetadataKeyDto_1 = require("./ScopedMetadataKeyDto");
var MetadataEntryBuilder = (function () {
    function MetadataEntryBuilder(sourcePublicKey, targetPublicKey, scopedMetadataKey, targetId, metadataType, value) {
        this.sourcePublicKey = sourcePublicKey;
        this.targetPublicKey = targetPublicKey;
        this.scopedMetadataKey = scopedMetadataKey;
        this.targetId = targetId;
        this.metadataType = metadataType;
        this.value = value;
    }
    MetadataEntryBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var sourcePublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, sourcePublicKey.getSize());
        var targetPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetPublicKey.getSize());
        var scopedMetadataKey = ScopedMetadataKeyDto_1.ScopedMetadataKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, scopedMetadataKey.getSize());
        var targetId = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        var metadataType = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var value = MetadataValueBuilder_1.MetadataValueBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, value.getSize());
        return new MetadataEntryBuilder(sourcePublicKey, targetPublicKey, scopedMetadataKey, targetId, metadataType, value);
    };
    MetadataEntryBuilder.prototype.getSourcePublicKey = function () {
        return this.sourcePublicKey;
    };
    MetadataEntryBuilder.prototype.getTargetPublicKey = function () {
        return this.targetPublicKey;
    };
    MetadataEntryBuilder.prototype.getScopedMetadataKey = function () {
        return this.scopedMetadataKey;
    };
    MetadataEntryBuilder.prototype.getTargetId = function () {
        return this.targetId;
    };
    MetadataEntryBuilder.prototype.getMetadataType = function () {
        return this.metadataType;
    };
    MetadataEntryBuilder.prototype.getValue = function () {
        return this.value;
    };
    MetadataEntryBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.sourcePublicKey.getSize();
        size += this.targetPublicKey.getSize();
        size += this.scopedMetadataKey.getSize();
        size += 8;
        size += 1;
        size += this.value.getSize();
        return size;
    };
    MetadataEntryBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var sourcePublicKeyBytes = this.sourcePublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, sourcePublicKeyBytes);
        var targetPublicKeyBytes = this.targetPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetPublicKeyBytes);
        var scopedMetadataKeyBytes = this.scopedMetadataKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, scopedMetadataKeyBytes);
        var targetIdBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getTargetId());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetIdBytes);
        var metadataTypeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.metadataType, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, metadataTypeBytes);
        var valueBytes = this.value.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueBytes);
        return newArray;
    };
    return MetadataEntryBuilder;
}());
exports.MetadataEntryBuilder = MetadataEntryBuilder;

},{"./GeneratorUtils":60,"./KeyDto":75,"./MetadataValueBuilder":77,"./ScopedMetadataKeyDto":122}],77:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var MetadataValueBuilder = (function () {
    function MetadataValueBuilder(data) {
        this.size = 0;
        this.data = data;
    }
    MetadataValueBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var size = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        var data = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), size);
        byteArray.splice(0, size);
        return new MetadataValueBuilder(data);
    };
    MetadataValueBuilder.prototype.getData = function () {
        return this.data;
    };
    MetadataValueBuilder.prototype.getSize = function () {
        var size = 0;
        size += 2;
        size += this.data.length;
        return size;
    };
    MetadataValueBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var sizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getSize(), 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, sizeBytes);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.data);
        return newArray;
    };
    return MetadataValueBuilder;
}());
exports.MetadataValueBuilder = MetadataValueBuilder;

},{"./GeneratorUtils":60}],78:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AddressDto_1 = require("./AddressDto");
var AddressKeyValueSetBuilder_1 = require("./AddressKeyValueSetBuilder");
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicIdDto_1 = require("./MosaicIdDto");
var MosaicAddressRestrictionEntryBuilder = (function () {
    function MosaicAddressRestrictionEntryBuilder(mosaicId, address, keyPairs) {
        this.mosaicId = mosaicId;
        this.address = address;
        this.keyPairs = keyPairs;
    }
    MosaicAddressRestrictionEntryBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var mosaicId = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        var address = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, address.getSize());
        var keyPairs = AddressKeyValueSetBuilder_1.AddressKeyValueSetBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, keyPairs.getSize());
        return new MosaicAddressRestrictionEntryBuilder(mosaicId, address, keyPairs);
    };
    MosaicAddressRestrictionEntryBuilder.prototype.getMosaicId = function () {
        return this.mosaicId;
    };
    MosaicAddressRestrictionEntryBuilder.prototype.getAddress = function () {
        return this.address;
    };
    MosaicAddressRestrictionEntryBuilder.prototype.getKeyPairs = function () {
        return this.keyPairs;
    };
    MosaicAddressRestrictionEntryBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.mosaicId.getSize();
        size += this.address.getSize();
        size += this.keyPairs.getSize();
        return size;
    };
    MosaicAddressRestrictionEntryBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        var addressBytes = this.address.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressBytes);
        var keyPairsBytes = this.keyPairs.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, keyPairsBytes);
        return newArray;
    };
    return MosaicAddressRestrictionEntryBuilder;
}());
exports.MosaicAddressRestrictionEntryBuilder = MosaicAddressRestrictionEntryBuilder;

},{"./AddressDto":20,"./AddressKeyValueSetBuilder":22,"./GeneratorUtils":60,"./MosaicIdDto":92}],79:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
var UnresolvedMosaicIdDto_1 = require("./UnresolvedMosaicIdDto");
var MosaicAddressRestrictionTransactionBodyBuilder = (function () {
    function MosaicAddressRestrictionTransactionBodyBuilder(mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress) {
        this.mosaicId = mosaicId;
        this.restrictionKey = restrictionKey;
        this.previousRestrictionValue = previousRestrictionValue;
        this.newRestrictionValue = newRestrictionValue;
        this.targetAddress = targetAddress;
    }
    MosaicAddressRestrictionTransactionBodyBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var mosaicId = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        var restrictionKey = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        var previousRestrictionValue = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        var newRestrictionValue = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        var targetAddress = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetAddress.getSize());
        return new MosaicAddressRestrictionTransactionBodyBuilder(mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress);
    };
    MosaicAddressRestrictionTransactionBodyBuilder.prototype.getMosaicId = function () {
        return this.mosaicId;
    };
    MosaicAddressRestrictionTransactionBodyBuilder.prototype.getRestrictionKey = function () {
        return this.restrictionKey;
    };
    MosaicAddressRestrictionTransactionBodyBuilder.prototype.getPreviousRestrictionValue = function () {
        return this.previousRestrictionValue;
    };
    MosaicAddressRestrictionTransactionBodyBuilder.prototype.getNewRestrictionValue = function () {
        return this.newRestrictionValue;
    };
    MosaicAddressRestrictionTransactionBodyBuilder.prototype.getTargetAddress = function () {
        return this.targetAddress;
    };
    MosaicAddressRestrictionTransactionBodyBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.mosaicId.getSize();
        size += 8;
        size += 8;
        size += 8;
        size += this.targetAddress.getSize();
        return size;
    };
    MosaicAddressRestrictionTransactionBodyBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        var restrictionKeyBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getRestrictionKey());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionKeyBytes);
        var previousRestrictionValueBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getPreviousRestrictionValue());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, previousRestrictionValueBytes);
        var newRestrictionValueBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getNewRestrictionValue());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, newRestrictionValueBytes);
        var targetAddressBytes = this.targetAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetAddressBytes);
        return newArray;
    };
    return MosaicAddressRestrictionTransactionBodyBuilder;
}());
exports.MosaicAddressRestrictionTransactionBodyBuilder = MosaicAddressRestrictionTransactionBodyBuilder;

},{"./GeneratorUtils":60,"./UnresolvedAddressDto":134,"./UnresolvedMosaicIdDto":136}],80:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicAddressRestrictionTransactionBodyBuilder_1 = require("./MosaicAddressRestrictionTransactionBodyBuilder");
var TransactionBuilder_1 = require("./TransactionBuilder");
var MosaicAddressRestrictionTransactionBuilder = (function (_super) {
    __extends(MosaicAddressRestrictionTransactionBuilder, _super);
    function MosaicAddressRestrictionTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress) {
        var _this = _super.call(this, signature, signerPublicKey, version, network, type, fee, deadline) || this;
        _this.mosaicAddressRestrictionTransactionBody = new MosaicAddressRestrictionTransactionBodyBuilder_1.MosaicAddressRestrictionTransactionBodyBuilder(mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress);
        return _this;
    }
    MosaicAddressRestrictionTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var mosaicAddressRestrictionTransactionBody = MosaicAddressRestrictionTransactionBodyBuilder_1.MosaicAddressRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicAddressRestrictionTransactionBody.getSize());
        return new MosaicAddressRestrictionTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, mosaicAddressRestrictionTransactionBody.mosaicId, mosaicAddressRestrictionTransactionBody.restrictionKey, mosaicAddressRestrictionTransactionBody.previousRestrictionValue, mosaicAddressRestrictionTransactionBody.newRestrictionValue, mosaicAddressRestrictionTransactionBody.targetAddress);
    };
    MosaicAddressRestrictionTransactionBuilder.prototype.getMosaicId = function () {
        return this.mosaicAddressRestrictionTransactionBody.getMosaicId();
    };
    MosaicAddressRestrictionTransactionBuilder.prototype.getRestrictionKey = function () {
        return this.mosaicAddressRestrictionTransactionBody.getRestrictionKey();
    };
    MosaicAddressRestrictionTransactionBuilder.prototype.getPreviousRestrictionValue = function () {
        return this.mosaicAddressRestrictionTransactionBody.getPreviousRestrictionValue();
    };
    MosaicAddressRestrictionTransactionBuilder.prototype.getNewRestrictionValue = function () {
        return this.mosaicAddressRestrictionTransactionBody.getNewRestrictionValue();
    };
    MosaicAddressRestrictionTransactionBuilder.prototype.getTargetAddress = function () {
        return this.mosaicAddressRestrictionTransactionBody.getTargetAddress();
    };
    MosaicAddressRestrictionTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.mosaicAddressRestrictionTransactionBody.getSize();
        return size;
    };
    MosaicAddressRestrictionTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var mosaicAddressRestrictionTransactionBodyBytes = this.mosaicAddressRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicAddressRestrictionTransactionBodyBytes);
        return newArray;
    };
    return MosaicAddressRestrictionTransactionBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.MosaicAddressRestrictionTransactionBuilder = MosaicAddressRestrictionTransactionBuilder;

},{"./GeneratorUtils":60,"./MosaicAddressRestrictionTransactionBodyBuilder":79,"./TransactionBuilder":130}],81:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicIdDto_1 = require("./MosaicIdDto");
var NamespaceIdDto_1 = require("./NamespaceIdDto");
var MosaicAliasTransactionBodyBuilder = (function () {
    function MosaicAliasTransactionBodyBuilder(namespaceId, mosaicId, aliasAction) {
        this.namespaceId = namespaceId;
        this.mosaicId = mosaicId;
        this.aliasAction = aliasAction;
    }
    MosaicAliasTransactionBodyBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var namespaceId = NamespaceIdDto_1.NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceId.getSize());
        var mosaicId = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        var aliasAction = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        return new MosaicAliasTransactionBodyBuilder(namespaceId, mosaicId, aliasAction);
    };
    MosaicAliasTransactionBodyBuilder.prototype.getNamespaceId = function () {
        return this.namespaceId;
    };
    MosaicAliasTransactionBodyBuilder.prototype.getMosaicId = function () {
        return this.mosaicId;
    };
    MosaicAliasTransactionBodyBuilder.prototype.getAliasAction = function () {
        return this.aliasAction;
    };
    MosaicAliasTransactionBodyBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.namespaceId.getSize();
        size += this.mosaicId.getSize();
        size += 1;
        return size;
    };
    MosaicAliasTransactionBodyBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var namespaceIdBytes = this.namespaceId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, namespaceIdBytes);
        var mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        var aliasActionBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.aliasAction, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, aliasActionBytes);
        return newArray;
    };
    return MosaicAliasTransactionBodyBuilder;
}());
exports.MosaicAliasTransactionBodyBuilder = MosaicAliasTransactionBodyBuilder;

},{"./GeneratorUtils":60,"./MosaicIdDto":92,"./NamespaceIdDto":110}],82:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicAliasTransactionBodyBuilder_1 = require("./MosaicAliasTransactionBodyBuilder");
var TransactionBuilder_1 = require("./TransactionBuilder");
var MosaicAliasTransactionBuilder = (function (_super) {
    __extends(MosaicAliasTransactionBuilder, _super);
    function MosaicAliasTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, namespaceId, mosaicId, aliasAction) {
        var _this = _super.call(this, signature, signerPublicKey, version, network, type, fee, deadline) || this;
        _this.mosaicAliasTransactionBody = new MosaicAliasTransactionBodyBuilder_1.MosaicAliasTransactionBodyBuilder(namespaceId, mosaicId, aliasAction);
        return _this;
    }
    MosaicAliasTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var mosaicAliasTransactionBody = MosaicAliasTransactionBodyBuilder_1.MosaicAliasTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicAliasTransactionBody.getSize());
        return new MosaicAliasTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, mosaicAliasTransactionBody.namespaceId, mosaicAliasTransactionBody.mosaicId, mosaicAliasTransactionBody.aliasAction);
    };
    MosaicAliasTransactionBuilder.prototype.getNamespaceId = function () {
        return this.mosaicAliasTransactionBody.getNamespaceId();
    };
    MosaicAliasTransactionBuilder.prototype.getMosaicId = function () {
        return this.mosaicAliasTransactionBody.getMosaicId();
    };
    MosaicAliasTransactionBuilder.prototype.getAliasAction = function () {
        return this.mosaicAliasTransactionBody.getAliasAction();
    };
    MosaicAliasTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.mosaicAliasTransactionBody.getSize();
        return size;
    };
    MosaicAliasTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var mosaicAliasTransactionBodyBytes = this.mosaicAliasTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicAliasTransactionBodyBytes);
        return newArray;
    };
    return MosaicAliasTransactionBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.MosaicAliasTransactionBuilder = MosaicAliasTransactionBuilder;

},{"./GeneratorUtils":60,"./MosaicAliasTransactionBodyBuilder":81,"./TransactionBuilder":130}],83:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AmountDto_1 = require("./AmountDto");
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicIdDto_1 = require("./MosaicIdDto");
var MosaicBuilder = (function () {
    function MosaicBuilder(mosaicId, amount) {
        this.mosaicId = mosaicId;
        this.amount = amount;
    }
    MosaicBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var mosaicId = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        var amount = AmountDto_1.AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, amount.getSize());
        return new MosaicBuilder(mosaicId, amount);
    };
    MosaicBuilder.prototype.getMosaicId = function () {
        return this.mosaicId;
    };
    MosaicBuilder.prototype.getAmount = function () {
        return this.amount;
    };
    MosaicBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.mosaicId.getSize();
        size += this.amount.getSize();
        return size;
    };
    MosaicBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        var amountBytes = this.amount.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, amountBytes);
        return newArray;
    };
    return MosaicBuilder;
}());
exports.MosaicBuilder = MosaicBuilder;

},{"./AmountDto":28,"./GeneratorUtils":60,"./MosaicIdDto":92}],84:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var HeightDto_1 = require("./HeightDto");
var KeyDto_1 = require("./KeyDto");
var MosaicPropertiesBuilder_1 = require("./MosaicPropertiesBuilder");
var MosaicDefinitionBuilder = (function () {
    function MosaicDefinitionBuilder(startHeight, ownerPublicKey, revision, properties) {
        this.startHeight = startHeight;
        this.ownerPublicKey = ownerPublicKey;
        this.revision = revision;
        this.properties = properties;
    }
    MosaicDefinitionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var startHeight = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, startHeight.getSize());
        var ownerPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, ownerPublicKey.getSize());
        var revision = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        var properties = MosaicPropertiesBuilder_1.MosaicPropertiesBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, properties.getSize());
        return new MosaicDefinitionBuilder(startHeight, ownerPublicKey, revision, properties);
    };
    MosaicDefinitionBuilder.prototype.getStartHeight = function () {
        return this.startHeight;
    };
    MosaicDefinitionBuilder.prototype.getOwnerPublicKey = function () {
        return this.ownerPublicKey;
    };
    MosaicDefinitionBuilder.prototype.getRevision = function () {
        return this.revision;
    };
    MosaicDefinitionBuilder.prototype.getProperties = function () {
        return this.properties;
    };
    MosaicDefinitionBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.startHeight.getSize();
        size += this.ownerPublicKey.getSize();
        size += 4;
        size += this.properties.getSize();
        return size;
    };
    MosaicDefinitionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var startHeightBytes = this.startHeight.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, startHeightBytes);
        var ownerPublicKeyBytes = this.ownerPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, ownerPublicKeyBytes);
        var revisionBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getRevision(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, revisionBytes);
        var propertiesBytes = this.properties.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, propertiesBytes);
        return newArray;
    };
    return MosaicDefinitionBuilder;
}());
exports.MosaicDefinitionBuilder = MosaicDefinitionBuilder;

},{"./GeneratorUtils":60,"./HeightDto":70,"./KeyDto":75,"./MosaicPropertiesBuilder":96}],85:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlockDurationDto_1 = require("./BlockDurationDto");
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicIdDto_1 = require("./MosaicIdDto");
var MosaicNonceDto_1 = require("./MosaicNonceDto");
var MosaicDefinitionTransactionBodyBuilder = (function () {
    function MosaicDefinitionTransactionBodyBuilder(id, duration, nonce, flags, divisibility) {
        this.id = id;
        this.duration = duration;
        this.nonce = nonce;
        this.flags = flags;
        this.divisibility = divisibility;
    }
    MosaicDefinitionTransactionBodyBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var id = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, id.getSize());
        var duration = BlockDurationDto_1.BlockDurationDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, duration.getSize());
        var nonce = MosaicNonceDto_1.MosaicNonceDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, nonce.getSize());
        var flags = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var divisibility = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        return new MosaicDefinitionTransactionBodyBuilder(id, duration, nonce, flags, divisibility);
    };
    MosaicDefinitionTransactionBodyBuilder.prototype.getId = function () {
        return this.id;
    };
    MosaicDefinitionTransactionBodyBuilder.prototype.getDuration = function () {
        return this.duration;
    };
    MosaicDefinitionTransactionBodyBuilder.prototype.getNonce = function () {
        return this.nonce;
    };
    MosaicDefinitionTransactionBodyBuilder.prototype.getFlags = function () {
        return this.flags;
    };
    MosaicDefinitionTransactionBodyBuilder.prototype.getDivisibility = function () {
        return this.divisibility;
    };
    MosaicDefinitionTransactionBodyBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.id.getSize();
        size += this.duration.getSize();
        size += this.nonce.getSize();
        size += 1;
        size += 1;
        return size;
    };
    MosaicDefinitionTransactionBodyBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var idBytes = this.id.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, idBytes);
        var durationBytes = this.duration.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, durationBytes);
        var nonceBytes = this.nonce.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, nonceBytes);
        var flagsBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getFlags(), 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, flagsBytes);
        var divisibilityBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getDivisibility(), 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, divisibilityBytes);
        return newArray;
    };
    return MosaicDefinitionTransactionBodyBuilder;
}());
exports.MosaicDefinitionTransactionBodyBuilder = MosaicDefinitionTransactionBodyBuilder;

},{"./BlockDurationDto":31,"./GeneratorUtils":60,"./MosaicIdDto":92,"./MosaicNonceDto":95}],86:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicDefinitionTransactionBodyBuilder_1 = require("./MosaicDefinitionTransactionBodyBuilder");
var TransactionBuilder_1 = require("./TransactionBuilder");
var MosaicDefinitionTransactionBuilder = (function (_super) {
    __extends(MosaicDefinitionTransactionBuilder, _super);
    function MosaicDefinitionTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, id, duration, nonce, flags, divisibility) {
        var _this = _super.call(this, signature, signerPublicKey, version, network, type, fee, deadline) || this;
        _this.mosaicDefinitionTransactionBody = new MosaicDefinitionTransactionBodyBuilder_1.MosaicDefinitionTransactionBodyBuilder(id, duration, nonce, flags, divisibility);
        return _this;
    }
    MosaicDefinitionTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var mosaicDefinitionTransactionBody = MosaicDefinitionTransactionBodyBuilder_1.MosaicDefinitionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicDefinitionTransactionBody.getSize());
        return new MosaicDefinitionTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, mosaicDefinitionTransactionBody.id, mosaicDefinitionTransactionBody.duration, mosaicDefinitionTransactionBody.nonce, mosaicDefinitionTransactionBody.flags, mosaicDefinitionTransactionBody.divisibility);
    };
    MosaicDefinitionTransactionBuilder.prototype.getId = function () {
        return this.mosaicDefinitionTransactionBody.getId();
    };
    MosaicDefinitionTransactionBuilder.prototype.getDuration = function () {
        return this.mosaicDefinitionTransactionBody.getDuration();
    };
    MosaicDefinitionTransactionBuilder.prototype.getNonce = function () {
        return this.mosaicDefinitionTransactionBody.getNonce();
    };
    MosaicDefinitionTransactionBuilder.prototype.getFlags = function () {
        return this.mosaicDefinitionTransactionBody.getFlags();
    };
    MosaicDefinitionTransactionBuilder.prototype.getDivisibility = function () {
        return this.mosaicDefinitionTransactionBody.getDivisibility();
    };
    MosaicDefinitionTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.mosaicDefinitionTransactionBody.getSize();
        return size;
    };
    MosaicDefinitionTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var mosaicDefinitionTransactionBodyBytes = this.mosaicDefinitionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicDefinitionTransactionBodyBytes);
        return newArray;
    };
    return MosaicDefinitionTransactionBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.MosaicDefinitionTransactionBuilder = MosaicDefinitionTransactionBuilder;

},{"./GeneratorUtils":60,"./MosaicDefinitionTransactionBodyBuilder":85,"./TransactionBuilder":130}],87:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AmountDto_1 = require("./AmountDto");
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicDefinitionBuilder_1 = require("./MosaicDefinitionBuilder");
var MosaicIdDto_1 = require("./MosaicIdDto");
var MosaicEntryBuilder = (function () {
    function MosaicEntryBuilder(mosaicId, supply, definition) {
        this.mosaicId = mosaicId;
        this.supply = supply;
        this.definition = definition;
    }
    MosaicEntryBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var mosaicId = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        var supply = AmountDto_1.AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, supply.getSize());
        var definition = MosaicDefinitionBuilder_1.MosaicDefinitionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, definition.getSize());
        return new MosaicEntryBuilder(mosaicId, supply, definition);
    };
    MosaicEntryBuilder.prototype.getMosaicId = function () {
        return this.mosaicId;
    };
    MosaicEntryBuilder.prototype.getSupply = function () {
        return this.supply;
    };
    MosaicEntryBuilder.prototype.getDefinition = function () {
        return this.definition;
    };
    MosaicEntryBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.mosaicId.getSize();
        size += this.supply.getSize();
        size += this.definition.getSize();
        return size;
    };
    MosaicEntryBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        var supplyBytes = this.supply.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, supplyBytes);
        var definitionBytes = this.definition.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, definitionBytes);
        return newArray;
    };
    return MosaicEntryBuilder;
}());
exports.MosaicEntryBuilder = MosaicEntryBuilder;

},{"./AmountDto":28,"./GeneratorUtils":60,"./MosaicDefinitionBuilder":84,"./MosaicIdDto":92}],88:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicIdDto_1 = require("./MosaicIdDto");
var ReceiptBuilder_1 = require("./ReceiptBuilder");
var MosaicExpiryReceiptBuilder = (function (_super) {
    __extends(MosaicExpiryReceiptBuilder, _super);
    function MosaicExpiryReceiptBuilder(version, type, artifactId) {
        var _this = _super.call(this, version, type) || this;
        _this.artifactId = artifactId;
        return _this;
    }
    MosaicExpiryReceiptBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = ReceiptBuilder_1.ReceiptBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var artifactId = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, artifactId.getSize());
        return new MosaicExpiryReceiptBuilder(superObject.version, superObject.type, artifactId);
    };
    MosaicExpiryReceiptBuilder.prototype.getArtifactId = function () {
        return this.artifactId;
    };
    MosaicExpiryReceiptBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.artifactId.getSize();
        return size;
    };
    MosaicExpiryReceiptBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var artifactIdBytes = this.artifactId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, artifactIdBytes);
        return newArray;
    };
    return MosaicExpiryReceiptBuilder;
}(ReceiptBuilder_1.ReceiptBuilder));
exports.MosaicExpiryReceiptBuilder = MosaicExpiryReceiptBuilder;

},{"./GeneratorUtils":60,"./MosaicIdDto":92,"./ReceiptBuilder":118}],89:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var GlobalKeyValueSetBuilder_1 = require("./GlobalKeyValueSetBuilder");
var MosaicIdDto_1 = require("./MosaicIdDto");
var MosaicGlobalRestrictionEntryBuilder = (function () {
    function MosaicGlobalRestrictionEntryBuilder(mosaicId, keyPairs) {
        this.mosaicId = mosaicId;
        this.keyPairs = keyPairs;
    }
    MosaicGlobalRestrictionEntryBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var mosaicId = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        var keyPairs = GlobalKeyValueSetBuilder_1.GlobalKeyValueSetBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, keyPairs.getSize());
        return new MosaicGlobalRestrictionEntryBuilder(mosaicId, keyPairs);
    };
    MosaicGlobalRestrictionEntryBuilder.prototype.getMosaicId = function () {
        return this.mosaicId;
    };
    MosaicGlobalRestrictionEntryBuilder.prototype.getKeyPairs = function () {
        return this.keyPairs;
    };
    MosaicGlobalRestrictionEntryBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.mosaicId.getSize();
        size += this.keyPairs.getSize();
        return size;
    };
    MosaicGlobalRestrictionEntryBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        var keyPairsBytes = this.keyPairs.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, keyPairsBytes);
        return newArray;
    };
    return MosaicGlobalRestrictionEntryBuilder;
}());
exports.MosaicGlobalRestrictionEntryBuilder = MosaicGlobalRestrictionEntryBuilder;

},{"./GeneratorUtils":60,"./GlobalKeyValueSetBuilder":62,"./MosaicIdDto":92}],90:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var UnresolvedMosaicIdDto_1 = require("./UnresolvedMosaicIdDto");
var MosaicGlobalRestrictionTransactionBodyBuilder = (function () {
    function MosaicGlobalRestrictionTransactionBodyBuilder(mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType) {
        this.mosaicId = mosaicId;
        this.referenceMosaicId = referenceMosaicId;
        this.restrictionKey = restrictionKey;
        this.previousRestrictionValue = previousRestrictionValue;
        this.newRestrictionValue = newRestrictionValue;
        this.previousRestrictionType = previousRestrictionType;
        this.newRestrictionType = newRestrictionType;
    }
    MosaicGlobalRestrictionTransactionBodyBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var mosaicId = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        var referenceMosaicId = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, referenceMosaicId.getSize());
        var restrictionKey = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        var previousRestrictionValue = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        var newRestrictionValue = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        var previousRestrictionType = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var newRestrictionType = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        return new MosaicGlobalRestrictionTransactionBodyBuilder(mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType);
    };
    MosaicGlobalRestrictionTransactionBodyBuilder.prototype.getMosaicId = function () {
        return this.mosaicId;
    };
    MosaicGlobalRestrictionTransactionBodyBuilder.prototype.getReferenceMosaicId = function () {
        return this.referenceMosaicId;
    };
    MosaicGlobalRestrictionTransactionBodyBuilder.prototype.getRestrictionKey = function () {
        return this.restrictionKey;
    };
    MosaicGlobalRestrictionTransactionBodyBuilder.prototype.getPreviousRestrictionValue = function () {
        return this.previousRestrictionValue;
    };
    MosaicGlobalRestrictionTransactionBodyBuilder.prototype.getNewRestrictionValue = function () {
        return this.newRestrictionValue;
    };
    MosaicGlobalRestrictionTransactionBodyBuilder.prototype.getPreviousRestrictionType = function () {
        return this.previousRestrictionType;
    };
    MosaicGlobalRestrictionTransactionBodyBuilder.prototype.getNewRestrictionType = function () {
        return this.newRestrictionType;
    };
    MosaicGlobalRestrictionTransactionBodyBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.mosaicId.getSize();
        size += this.referenceMosaicId.getSize();
        size += 8;
        size += 8;
        size += 8;
        size += 1;
        size += 1;
        return size;
    };
    MosaicGlobalRestrictionTransactionBodyBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        var referenceMosaicIdBytes = this.referenceMosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, referenceMosaicIdBytes);
        var restrictionKeyBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getRestrictionKey());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionKeyBytes);
        var previousRestrictionValueBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getPreviousRestrictionValue());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, previousRestrictionValueBytes);
        var newRestrictionValueBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getNewRestrictionValue());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, newRestrictionValueBytes);
        var previousRestrictionTypeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.previousRestrictionType, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, previousRestrictionTypeBytes);
        var newRestrictionTypeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.newRestrictionType, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, newRestrictionTypeBytes);
        return newArray;
    };
    return MosaicGlobalRestrictionTransactionBodyBuilder;
}());
exports.MosaicGlobalRestrictionTransactionBodyBuilder = MosaicGlobalRestrictionTransactionBodyBuilder;

},{"./GeneratorUtils":60,"./UnresolvedMosaicIdDto":136}],91:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicGlobalRestrictionTransactionBodyBuilder_1 = require("./MosaicGlobalRestrictionTransactionBodyBuilder");
var TransactionBuilder_1 = require("./TransactionBuilder");
var MosaicGlobalRestrictionTransactionBuilder = (function (_super) {
    __extends(MosaicGlobalRestrictionTransactionBuilder, _super);
    function MosaicGlobalRestrictionTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType) {
        var _this = _super.call(this, signature, signerPublicKey, version, network, type, fee, deadline) || this;
        _this.mosaicGlobalRestrictionTransactionBody = new MosaicGlobalRestrictionTransactionBodyBuilder_1.MosaicGlobalRestrictionTransactionBodyBuilder(mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType);
        return _this;
    }
    MosaicGlobalRestrictionTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var mosaicGlobalRestrictionTransactionBody = MosaicGlobalRestrictionTransactionBodyBuilder_1.MosaicGlobalRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicGlobalRestrictionTransactionBody.getSize());
        return new MosaicGlobalRestrictionTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, mosaicGlobalRestrictionTransactionBody.mosaicId, mosaicGlobalRestrictionTransactionBody.referenceMosaicId, mosaicGlobalRestrictionTransactionBody.restrictionKey, mosaicGlobalRestrictionTransactionBody.previousRestrictionValue, mosaicGlobalRestrictionTransactionBody.newRestrictionValue, mosaicGlobalRestrictionTransactionBody.previousRestrictionType, mosaicGlobalRestrictionTransactionBody.newRestrictionType);
    };
    MosaicGlobalRestrictionTransactionBuilder.prototype.getMosaicId = function () {
        return this.mosaicGlobalRestrictionTransactionBody.getMosaicId();
    };
    MosaicGlobalRestrictionTransactionBuilder.prototype.getReferenceMosaicId = function () {
        return this.mosaicGlobalRestrictionTransactionBody.getReferenceMosaicId();
    };
    MosaicGlobalRestrictionTransactionBuilder.prototype.getRestrictionKey = function () {
        return this.mosaicGlobalRestrictionTransactionBody.getRestrictionKey();
    };
    MosaicGlobalRestrictionTransactionBuilder.prototype.getPreviousRestrictionValue = function () {
        return this.mosaicGlobalRestrictionTransactionBody.getPreviousRestrictionValue();
    };
    MosaicGlobalRestrictionTransactionBuilder.prototype.getNewRestrictionValue = function () {
        return this.mosaicGlobalRestrictionTransactionBody.getNewRestrictionValue();
    };
    MosaicGlobalRestrictionTransactionBuilder.prototype.getPreviousRestrictionType = function () {
        return this.mosaicGlobalRestrictionTransactionBody.getPreviousRestrictionType();
    };
    MosaicGlobalRestrictionTransactionBuilder.prototype.getNewRestrictionType = function () {
        return this.mosaicGlobalRestrictionTransactionBody.getNewRestrictionType();
    };
    MosaicGlobalRestrictionTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.mosaicGlobalRestrictionTransactionBody.getSize();
        return size;
    };
    MosaicGlobalRestrictionTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var mosaicGlobalRestrictionTransactionBodyBytes = this.mosaicGlobalRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicGlobalRestrictionTransactionBodyBytes);
        return newArray;
    };
    return MosaicGlobalRestrictionTransactionBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.MosaicGlobalRestrictionTransactionBuilder = MosaicGlobalRestrictionTransactionBuilder;

},{"./GeneratorUtils":60,"./MosaicGlobalRestrictionTransactionBodyBuilder":90,"./TransactionBuilder":130}],92:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicIdDto = (function () {
    function MosaicIdDto(mosaicId) {
        this.mosaicId = mosaicId;
    }
    MosaicIdDto.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var mosaicId = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new MosaicIdDto(mosaicId);
    };
    MosaicIdDto.prototype.getMosaicId = function () {
        return this.mosaicId;
    };
    MosaicIdDto.prototype.getSize = function () {
        return 8;
    };
    MosaicIdDto.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var mosaicIdBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getMosaicId());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        return newArray;
    };
    return MosaicIdDto;
}());
exports.MosaicIdDto = MosaicIdDto;

},{"./GeneratorUtils":60}],93:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var KeyDto_1 = require("./KeyDto");
var UnresolvedMosaicIdDto_1 = require("./UnresolvedMosaicIdDto");
var MosaicMetadataTransactionBodyBuilder = (function () {
    function MosaicMetadataTransactionBodyBuilder(targetPublicKey, scopedMetadataKey, targetMosaicId, valueSizeDelta, value) {
        this.targetPublicKey = targetPublicKey;
        this.scopedMetadataKey = scopedMetadataKey;
        this.targetMosaicId = targetMosaicId;
        this.valueSizeDelta = valueSizeDelta;
        this.value = value;
    }
    MosaicMetadataTransactionBodyBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var targetPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetPublicKey.getSize());
        var scopedMetadataKey = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        var targetMosaicId = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetMosaicId.getSize());
        var valueSizeDelta = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        var valueSize = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        var value = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), valueSize);
        byteArray.splice(0, valueSize);
        return new MosaicMetadataTransactionBodyBuilder(targetPublicKey, scopedMetadataKey, targetMosaicId, valueSizeDelta, value);
    };
    MosaicMetadataTransactionBodyBuilder.prototype.getTargetPublicKey = function () {
        return this.targetPublicKey;
    };
    MosaicMetadataTransactionBodyBuilder.prototype.getScopedMetadataKey = function () {
        return this.scopedMetadataKey;
    };
    MosaicMetadataTransactionBodyBuilder.prototype.getTargetMosaicId = function () {
        return this.targetMosaicId;
    };
    MosaicMetadataTransactionBodyBuilder.prototype.getValueSizeDelta = function () {
        return this.valueSizeDelta;
    };
    MosaicMetadataTransactionBodyBuilder.prototype.getValue = function () {
        return this.value;
    };
    MosaicMetadataTransactionBodyBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.targetPublicKey.getSize();
        size += 8;
        size += this.targetMosaicId.getSize();
        size += 2;
        size += 2;
        size += this.value.length;
        return size;
    };
    MosaicMetadataTransactionBodyBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var targetPublicKeyBytes = this.targetPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetPublicKeyBytes);
        var scopedMetadataKeyBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getScopedMetadataKey());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, scopedMetadataKeyBytes);
        var targetMosaicIdBytes = this.targetMosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetMosaicIdBytes);
        var valueSizeDeltaBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getValueSizeDelta(), 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueSizeDeltaBytes);
        var valueSizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.value.length, 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueSizeBytes);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.value);
        return newArray;
    };
    return MosaicMetadataTransactionBodyBuilder;
}());
exports.MosaicMetadataTransactionBodyBuilder = MosaicMetadataTransactionBodyBuilder;

},{"./GeneratorUtils":60,"./KeyDto":75,"./UnresolvedMosaicIdDto":136}],94:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicMetadataTransactionBodyBuilder_1 = require("./MosaicMetadataTransactionBodyBuilder");
var TransactionBuilder_1 = require("./TransactionBuilder");
var MosaicMetadataTransactionBuilder = (function (_super) {
    __extends(MosaicMetadataTransactionBuilder, _super);
    function MosaicMetadataTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, targetPublicKey, scopedMetadataKey, targetMosaicId, valueSizeDelta, value) {
        var _this = _super.call(this, signature, signerPublicKey, version, network, type, fee, deadline) || this;
        _this.mosaicMetadataTransactionBody = new MosaicMetadataTransactionBodyBuilder_1.MosaicMetadataTransactionBodyBuilder(targetPublicKey, scopedMetadataKey, targetMosaicId, valueSizeDelta, value);
        return _this;
    }
    MosaicMetadataTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var mosaicMetadataTransactionBody = MosaicMetadataTransactionBodyBuilder_1.MosaicMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicMetadataTransactionBody.getSize());
        return new MosaicMetadataTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, mosaicMetadataTransactionBody.targetPublicKey, mosaicMetadataTransactionBody.scopedMetadataKey, mosaicMetadataTransactionBody.targetMosaicId, mosaicMetadataTransactionBody.valueSizeDelta, mosaicMetadataTransactionBody.value);
    };
    MosaicMetadataTransactionBuilder.prototype.getTargetPublicKey = function () {
        return this.mosaicMetadataTransactionBody.getTargetPublicKey();
    };
    MosaicMetadataTransactionBuilder.prototype.getScopedMetadataKey = function () {
        return this.mosaicMetadataTransactionBody.getScopedMetadataKey();
    };
    MosaicMetadataTransactionBuilder.prototype.getTargetMosaicId = function () {
        return this.mosaicMetadataTransactionBody.getTargetMosaicId();
    };
    MosaicMetadataTransactionBuilder.prototype.getValueSizeDelta = function () {
        return this.mosaicMetadataTransactionBody.getValueSizeDelta();
    };
    MosaicMetadataTransactionBuilder.prototype.getValue = function () {
        return this.mosaicMetadataTransactionBody.getValue();
    };
    MosaicMetadataTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.mosaicMetadataTransactionBody.getSize();
        return size;
    };
    MosaicMetadataTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var mosaicMetadataTransactionBodyBytes = this.mosaicMetadataTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicMetadataTransactionBodyBytes);
        return newArray;
    };
    return MosaicMetadataTransactionBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.MosaicMetadataTransactionBuilder = MosaicMetadataTransactionBuilder;

},{"./GeneratorUtils":60,"./MosaicMetadataTransactionBodyBuilder":93,"./TransactionBuilder":130}],95:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicNonceDto = (function () {
    function MosaicNonceDto(mosaicNonce) {
        this.mosaicNonce = mosaicNonce;
    }
    MosaicNonceDto.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var mosaicNonce = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        return new MosaicNonceDto(mosaicNonce);
    };
    MosaicNonceDto.prototype.getMosaicNonce = function () {
        return this.mosaicNonce;
    };
    MosaicNonceDto.prototype.getSize = function () {
        return 4;
    };
    MosaicNonceDto.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var mosaicNonceBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getMosaicNonce(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicNonceBytes);
        return newArray;
    };
    return MosaicNonceDto;
}());
exports.MosaicNonceDto = MosaicNonceDto;

},{"./GeneratorUtils":60}],96:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlockDurationDto_1 = require("./BlockDurationDto");
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicPropertiesBuilder = (function () {
    function MosaicPropertiesBuilder(flags, divisibility, duration) {
        this.flags = flags;
        this.divisibility = divisibility;
        this.duration = duration;
    }
    MosaicPropertiesBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var flags = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var divisibility = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var duration = BlockDurationDto_1.BlockDurationDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, duration.getSize());
        return new MosaicPropertiesBuilder(flags, divisibility, duration);
    };
    MosaicPropertiesBuilder.prototype.getFlags = function () {
        return this.flags;
    };
    MosaicPropertiesBuilder.prototype.getDivisibility = function () {
        return this.divisibility;
    };
    MosaicPropertiesBuilder.prototype.getDuration = function () {
        return this.duration;
    };
    MosaicPropertiesBuilder.prototype.getSize = function () {
        var size = 0;
        size += 1;
        size += 1;
        size += this.duration.getSize();
        return size;
    };
    MosaicPropertiesBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var flagsBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getFlags(), 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, flagsBytes);
        var divisibilityBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getDivisibility(), 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, divisibilityBytes);
        var durationBytes = this.duration.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, durationBytes);
        return newArray;
    };
    return MosaicPropertiesBuilder;
}());
exports.MosaicPropertiesBuilder = MosaicPropertiesBuilder;

},{"./BlockDurationDto":31,"./GeneratorUtils":60}],97:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicIdDto_1 = require("./MosaicIdDto");
var ReceiptSourceBuilder_1 = require("./ReceiptSourceBuilder");
var MosaicResolutionEntryBuilder = (function () {
    function MosaicResolutionEntryBuilder(source, resolved) {
        this.source = source;
        this.resolved = resolved;
    }
    MosaicResolutionEntryBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var source = ReceiptSourceBuilder_1.ReceiptSourceBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, source.getSize());
        var resolved = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, resolved.getSize());
        return new MosaicResolutionEntryBuilder(source, resolved);
    };
    MosaicResolutionEntryBuilder.prototype.getSource = function () {
        return this.source;
    };
    MosaicResolutionEntryBuilder.prototype.getResolved = function () {
        return this.resolved;
    };
    MosaicResolutionEntryBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.source.getSize();
        size += this.resolved.getSize();
        return size;
    };
    MosaicResolutionEntryBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var sourceBytes = this.source.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, sourceBytes);
        var resolvedBytes = this.resolved.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, resolvedBytes);
        return newArray;
    };
    return MosaicResolutionEntryBuilder;
}());
exports.MosaicResolutionEntryBuilder = MosaicResolutionEntryBuilder;

},{"./GeneratorUtils":60,"./MosaicIdDto":92,"./ReceiptSourceBuilder":119}],98:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicResolutionEntryBuilder_1 = require("./MosaicResolutionEntryBuilder");
var ReceiptBuilder_1 = require("./ReceiptBuilder");
var UnresolvedMosaicIdDto_1 = require("./UnresolvedMosaicIdDto");
var MosaicResolutionStatementBuilder = (function (_super) {
    __extends(MosaicResolutionStatementBuilder, _super);
    function MosaicResolutionStatementBuilder(version, type, unresolved, resolutionEntries) {
        var _this = _super.call(this, version, type) || this;
        _this.unresolved = unresolved;
        _this.resolutionEntries = resolutionEntries;
        return _this;
    }
    MosaicResolutionStatementBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = ReceiptBuilder_1.ReceiptBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var unresolved = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, unresolved.getSize());
        var resolutionEntriesByteSize = byteArray.length;
        var resolutionEntries = [];
        while (resolutionEntriesByteSize > 0) {
            var item = MosaicResolutionEntryBuilder_1.MosaicResolutionEntryBuilder.loadFromBinary(Uint8Array.from(byteArray));
            resolutionEntries.push(item);
            var itemSize = item.getSize();
            resolutionEntriesByteSize -= itemSize;
            byteArray.splice(0, itemSize);
        }
        return new MosaicResolutionStatementBuilder(superObject.version, superObject.type, unresolved, resolutionEntries);
    };
    MosaicResolutionStatementBuilder.prototype.getUnresolved = function () {
        return this.unresolved;
    };
    MosaicResolutionStatementBuilder.prototype.getResolutionEntries = function () {
        return this.resolutionEntries;
    };
    MosaicResolutionStatementBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.unresolved.getSize();
        this.resolutionEntries.forEach(function (o) { return size += o.getSize(); });
        return size;
    };
    MosaicResolutionStatementBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var unresolvedBytes = this.unresolved.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, unresolvedBytes);
        this.resolutionEntries.forEach(function (item) {
            var resolutionEntriesBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, resolutionEntriesBytes);
        });
        return newArray;
    };
    return MosaicResolutionStatementBuilder;
}(ReceiptBuilder_1.ReceiptBuilder));
exports.MosaicResolutionStatementBuilder = MosaicResolutionStatementBuilder;

},{"./GeneratorUtils":60,"./MosaicResolutionEntryBuilder":97,"./ReceiptBuilder":118,"./UnresolvedMosaicIdDto":136}],99:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicAddressRestrictionEntryBuilder_1 = require("./MosaicAddressRestrictionEntryBuilder");
var MosaicGlobalRestrictionEntryBuilder_1 = require("./MosaicGlobalRestrictionEntryBuilder");
var MosaicRestrictionEntryTypeDto_1 = require("./MosaicRestrictionEntryTypeDto");
var MosaicRestrictionEntryBuilder = (function () {
    function MosaicRestrictionEntryBuilder(addressEntry, globalEntry) {
        if ((addressEntry && globalEntry) || (!addressEntry && !globalEntry)) {
            throw new Error('Invalid conditional parameters');
        }
        this.addressEntry = addressEntry;
        this.globalEntry = globalEntry;
        if (addressEntry) {
            this.entryType = MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.ADDRESS;
        }
        else {
            this.entryType = MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.GLOBAL;
        }
    }
    MosaicRestrictionEntryBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var entryType = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var entryTypeConditionBytes = Uint8Array.from(byteArray.slice(0, 1));
        byteArray.splice(0, 1);
        var addressEntry;
        if (entryType === MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.ADDRESS) {
            addressEntry = MosaicAddressRestrictionEntryBuilder_1.MosaicAddressRestrictionEntryBuilder.loadFromBinary(entryTypeConditionBytes);
        }
        var globalEntry;
        if (entryType === MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.GLOBAL) {
            globalEntry = MosaicGlobalRestrictionEntryBuilder_1.MosaicGlobalRestrictionEntryBuilder.loadFromBinary(entryTypeConditionBytes);
        }
        return new MosaicRestrictionEntryBuilder(addressEntry, globalEntry);
    };
    MosaicRestrictionEntryBuilder.prototype.getEntryType = function () {
        return this.entryType;
    };
    MosaicRestrictionEntryBuilder.prototype.getAddressEntry = function () {
        if (this.entryType !== MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.ADDRESS) {
            throw new Error('entryType is not set to ADDRESS.');
        }
        return this.addressEntry;
    };
    MosaicRestrictionEntryBuilder.prototype.getGlobalEntry = function () {
        if (this.entryType !== MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.GLOBAL) {
            throw new Error('entryType is not set to GLOBAL.');
        }
        return this.globalEntry;
    };
    MosaicRestrictionEntryBuilder.prototype.getSize = function () {
        var size = 0;
        size += 1;
        if (this.entryType === MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.ADDRESS) {
            size += this.addressEntry.getSize();
        }
        if (this.entryType === MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.GLOBAL) {
            size += this.globalEntry.getSize();
        }
        return size;
    };
    MosaicRestrictionEntryBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var entryTypeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.entryType, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, entryTypeBytes);
        if (this.entryType === MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.ADDRESS) {
            var addressEntryBytes = this.addressEntry.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressEntryBytes);
        }
        if (this.entryType === MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.GLOBAL) {
            var globalEntryBytes = this.globalEntry.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, globalEntryBytes);
        }
        return newArray;
    };
    return MosaicRestrictionEntryBuilder;
}());
exports.MosaicRestrictionEntryBuilder = MosaicRestrictionEntryBuilder;

},{"./GeneratorUtils":60,"./MosaicAddressRestrictionEntryBuilder":78,"./MosaicGlobalRestrictionEntryBuilder":89,"./MosaicRestrictionEntryTypeDto":100}],100:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MosaicRestrictionEntryTypeDto;
(function (MosaicRestrictionEntryTypeDto) {
    MosaicRestrictionEntryTypeDto[MosaicRestrictionEntryTypeDto["ADDRESS"] = 0] = "ADDRESS";
    MosaicRestrictionEntryTypeDto[MosaicRestrictionEntryTypeDto["GLOBAL"] = 1] = "GLOBAL";
})(MosaicRestrictionEntryTypeDto = exports.MosaicRestrictionEntryTypeDto || (exports.MosaicRestrictionEntryTypeDto = {}));

},{}],101:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicRestrictionKeyDto = (function () {
    function MosaicRestrictionKeyDto(mosaicRestrictionKey) {
        this.mosaicRestrictionKey = mosaicRestrictionKey;
    }
    MosaicRestrictionKeyDto.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var mosaicRestrictionKey = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new MosaicRestrictionKeyDto(mosaicRestrictionKey);
    };
    MosaicRestrictionKeyDto.prototype.getMosaicRestrictionKey = function () {
        return this.mosaicRestrictionKey;
    };
    MosaicRestrictionKeyDto.prototype.getSize = function () {
        return 8;
    };
    MosaicRestrictionKeyDto.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var mosaicRestrictionKeyBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getMosaicRestrictionKey());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicRestrictionKeyBytes);
        return newArray;
    };
    return MosaicRestrictionKeyDto;
}());
exports.MosaicRestrictionKeyDto = MosaicRestrictionKeyDto;

},{"./GeneratorUtils":60}],102:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AmountDto_1 = require("./AmountDto");
var GeneratorUtils_1 = require("./GeneratorUtils");
var UnresolvedMosaicIdDto_1 = require("./UnresolvedMosaicIdDto");
var MosaicSupplyChangeTransactionBodyBuilder = (function () {
    function MosaicSupplyChangeTransactionBodyBuilder(mosaicId, delta, action) {
        this.mosaicId = mosaicId;
        this.delta = delta;
        this.action = action;
    }
    MosaicSupplyChangeTransactionBodyBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var mosaicId = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        var delta = AmountDto_1.AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, delta.getSize());
        var action = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        return new MosaicSupplyChangeTransactionBodyBuilder(mosaicId, delta, action);
    };
    MosaicSupplyChangeTransactionBodyBuilder.prototype.getMosaicId = function () {
        return this.mosaicId;
    };
    MosaicSupplyChangeTransactionBodyBuilder.prototype.getDelta = function () {
        return this.delta;
    };
    MosaicSupplyChangeTransactionBodyBuilder.prototype.getAction = function () {
        return this.action;
    };
    MosaicSupplyChangeTransactionBodyBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.mosaicId.getSize();
        size += this.delta.getSize();
        size += 1;
        return size;
    };
    MosaicSupplyChangeTransactionBodyBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        var deltaBytes = this.delta.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, deltaBytes);
        var actionBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.action, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, actionBytes);
        return newArray;
    };
    return MosaicSupplyChangeTransactionBodyBuilder;
}());
exports.MosaicSupplyChangeTransactionBodyBuilder = MosaicSupplyChangeTransactionBodyBuilder;

},{"./AmountDto":28,"./GeneratorUtils":60,"./UnresolvedMosaicIdDto":136}],103:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicSupplyChangeTransactionBodyBuilder_1 = require("./MosaicSupplyChangeTransactionBodyBuilder");
var TransactionBuilder_1 = require("./TransactionBuilder");
var MosaicSupplyChangeTransactionBuilder = (function (_super) {
    __extends(MosaicSupplyChangeTransactionBuilder, _super);
    function MosaicSupplyChangeTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, mosaicId, delta, action) {
        var _this = _super.call(this, signature, signerPublicKey, version, network, type, fee, deadline) || this;
        _this.mosaicSupplyChangeTransactionBody = new MosaicSupplyChangeTransactionBodyBuilder_1.MosaicSupplyChangeTransactionBodyBuilder(mosaicId, delta, action);
        return _this;
    }
    MosaicSupplyChangeTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var mosaicSupplyChangeTransactionBody = MosaicSupplyChangeTransactionBodyBuilder_1.MosaicSupplyChangeTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicSupplyChangeTransactionBody.getSize());
        return new MosaicSupplyChangeTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, mosaicSupplyChangeTransactionBody.mosaicId, mosaicSupplyChangeTransactionBody.delta, mosaicSupplyChangeTransactionBody.action);
    };
    MosaicSupplyChangeTransactionBuilder.prototype.getMosaicId = function () {
        return this.mosaicSupplyChangeTransactionBody.getMosaicId();
    };
    MosaicSupplyChangeTransactionBuilder.prototype.getDelta = function () {
        return this.mosaicSupplyChangeTransactionBody.getDelta();
    };
    MosaicSupplyChangeTransactionBuilder.prototype.getAction = function () {
        return this.mosaicSupplyChangeTransactionBody.getAction();
    };
    MosaicSupplyChangeTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.mosaicSupplyChangeTransactionBody.getSize();
        return size;
    };
    MosaicSupplyChangeTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var mosaicSupplyChangeTransactionBodyBytes = this.mosaicSupplyChangeTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicSupplyChangeTransactionBodyBytes);
        return newArray;
    };
    return MosaicSupplyChangeTransactionBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.MosaicSupplyChangeTransactionBuilder = MosaicSupplyChangeTransactionBuilder;

},{"./GeneratorUtils":60,"./MosaicSupplyChangeTransactionBodyBuilder":102,"./TransactionBuilder":130}],104:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var KeyDto_1 = require("./KeyDto");
var MultisigAccountModificationTransactionBodyBuilder = (function () {
    function MultisigAccountModificationTransactionBodyBuilder(minRemovalDelta, minApprovalDelta, publicKeyAdditions, publicKeyDeletions) {
        this.minRemovalDelta = minRemovalDelta;
        this.minApprovalDelta = minApprovalDelta;
        this.multisigAccountModificationTransactionBody_Reserved1 = 0;
        this.publicKeyAdditions = publicKeyAdditions;
        this.publicKeyDeletions = publicKeyDeletions;
    }
    MultisigAccountModificationTransactionBodyBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var minRemovalDelta = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var minApprovalDelta = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var publicKeyAdditionsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var publicKeyDeletionsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var multisigAccountModificationTransactionBody_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        var publicKeyAdditions = [];
        for (var i = 0; i < (Array.isArray(publicKeyAdditionsCount) ? GeneratorUtils_1.GeneratorUtils.compact(publicKeyAdditionsCount) : publicKeyAdditionsCount); i++) {
            var item = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
            publicKeyAdditions.push(item);
            byteArray.splice(0, item.getSize());
        }
        var publicKeyDeletions = [];
        for (var i = 0; i < (Array.isArray(publicKeyDeletionsCount) ? GeneratorUtils_1.GeneratorUtils.compact(publicKeyDeletionsCount) : publicKeyDeletionsCount); i++) {
            var item = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
            publicKeyDeletions.push(item);
            byteArray.splice(0, item.getSize());
        }
        return new MultisigAccountModificationTransactionBodyBuilder(minRemovalDelta, minApprovalDelta, publicKeyAdditions, publicKeyDeletions);
    };
    MultisigAccountModificationTransactionBodyBuilder.prototype.getMinRemovalDelta = function () {
        return this.minRemovalDelta;
    };
    MultisigAccountModificationTransactionBodyBuilder.prototype.getMinApprovalDelta = function () {
        return this.minApprovalDelta;
    };
    MultisigAccountModificationTransactionBodyBuilder.prototype.getMultisigAccountModificationTransactionBody_Reserved1 = function () {
        return this.multisigAccountModificationTransactionBody_Reserved1;
    };
    MultisigAccountModificationTransactionBodyBuilder.prototype.getPublicKeyAdditions = function () {
        return this.publicKeyAdditions;
    };
    MultisigAccountModificationTransactionBodyBuilder.prototype.getPublicKeyDeletions = function () {
        return this.publicKeyDeletions;
    };
    MultisigAccountModificationTransactionBodyBuilder.prototype.getSize = function () {
        var size = 0;
        size += 1;
        size += 1;
        size += 1;
        size += 1;
        size += 4;
        this.publicKeyAdditions.forEach(function (o) { return size += o.getSize(); });
        this.publicKeyDeletions.forEach(function (o) { return size += o.getSize(); });
        return size;
    };
    MultisigAccountModificationTransactionBodyBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var minRemovalDeltaBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getMinRemovalDelta(), 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, minRemovalDeltaBytes);
        var minApprovalDeltaBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getMinApprovalDelta(), 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, minApprovalDeltaBytes);
        var publicKeyAdditionsCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.publicKeyAdditions.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, publicKeyAdditionsCountBytes);
        var publicKeyDeletionsCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.publicKeyDeletions.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, publicKeyDeletionsCountBytes);
        var multisigAccountModificationTransactionBody_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getMultisigAccountModificationTransactionBody_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, multisigAccountModificationTransactionBody_Reserved1Bytes);
        this.publicKeyAdditions.forEach(function (item) {
            var publicKeyAdditionsBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, publicKeyAdditionsBytes);
        });
        this.publicKeyDeletions.forEach(function (item) {
            var publicKeyDeletionsBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, publicKeyDeletionsBytes);
        });
        return newArray;
    };
    return MultisigAccountModificationTransactionBodyBuilder;
}());
exports.MultisigAccountModificationTransactionBodyBuilder = MultisigAccountModificationTransactionBodyBuilder;

},{"./GeneratorUtils":60,"./KeyDto":75}],105:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var MultisigAccountModificationTransactionBodyBuilder_1 = require("./MultisigAccountModificationTransactionBodyBuilder");
var TransactionBuilder_1 = require("./TransactionBuilder");
var MultisigAccountModificationTransactionBuilder = (function (_super) {
    __extends(MultisigAccountModificationTransactionBuilder, _super);
    function MultisigAccountModificationTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, minRemovalDelta, minApprovalDelta, publicKeyAdditions, publicKeyDeletions) {
        var _this = _super.call(this, signature, signerPublicKey, version, network, type, fee, deadline) || this;
        _this.multisigAccountModificationTransactionBody = new MultisigAccountModificationTransactionBodyBuilder_1.MultisigAccountModificationTransactionBodyBuilder(minRemovalDelta, minApprovalDelta, publicKeyAdditions, publicKeyDeletions);
        return _this;
    }
    MultisigAccountModificationTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var multisigAccountModificationTransactionBody = MultisigAccountModificationTransactionBodyBuilder_1.MultisigAccountModificationTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, multisigAccountModificationTransactionBody.getSize());
        return new MultisigAccountModificationTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, multisigAccountModificationTransactionBody.minRemovalDelta, multisigAccountModificationTransactionBody.minApprovalDelta, multisigAccountModificationTransactionBody.publicKeyAdditions, multisigAccountModificationTransactionBody.publicKeyDeletions);
    };
    MultisigAccountModificationTransactionBuilder.prototype.getMinRemovalDelta = function () {
        return this.multisigAccountModificationTransactionBody.getMinRemovalDelta();
    };
    MultisigAccountModificationTransactionBuilder.prototype.getMinApprovalDelta = function () {
        return this.multisigAccountModificationTransactionBody.getMinApprovalDelta();
    };
    MultisigAccountModificationTransactionBuilder.prototype.getMultisigAccountModificationTransactionBody_Reserved1 = function () {
        return this.multisigAccountModificationTransactionBody.getMultisigAccountModificationTransactionBody_Reserved1();
    };
    MultisigAccountModificationTransactionBuilder.prototype.getPublicKeyAdditions = function () {
        return this.multisigAccountModificationTransactionBody.getPublicKeyAdditions();
    };
    MultisigAccountModificationTransactionBuilder.prototype.getPublicKeyDeletions = function () {
        return this.multisigAccountModificationTransactionBody.getPublicKeyDeletions();
    };
    MultisigAccountModificationTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.multisigAccountModificationTransactionBody.getSize();
        return size;
    };
    MultisigAccountModificationTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var multisigAccountModificationTransactionBodyBytes = this.multisigAccountModificationTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, multisigAccountModificationTransactionBodyBytes);
        return newArray;
    };
    return MultisigAccountModificationTransactionBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.MultisigAccountModificationTransactionBuilder = MultisigAccountModificationTransactionBuilder;

},{"./GeneratorUtils":60,"./MultisigAccountModificationTransactionBodyBuilder":104,"./TransactionBuilder":130}],106:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var KeyDto_1 = require("./KeyDto");
var MultisigEntryBuilder = (function () {
    function MultisigEntryBuilder(minApproval, minRemoval, accountPublicKey, cosignatoryPublicKeys, multisigPublicKeys) {
        this.minApproval = minApproval;
        this.minRemoval = minRemoval;
        this.accountPublicKey = accountPublicKey;
        this.cosignatoryPublicKeys = cosignatoryPublicKeys;
        this.multisigPublicKeys = multisigPublicKeys;
    }
    MultisigEntryBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var minApproval = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        var minRemoval = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        var accountPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountPublicKey.getSize());
        var cosignatoryPublicKeysCount = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        var cosignatoryPublicKeys = [];
        for (var i = 0; i < (Array.isArray(cosignatoryPublicKeysCount) ? GeneratorUtils_1.GeneratorUtils.compact(cosignatoryPublicKeysCount) : cosignatoryPublicKeysCount); i++) {
            var item = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
            cosignatoryPublicKeys.push(item);
            byteArray.splice(0, item.getSize());
        }
        var multisigPublicKeysCount = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        var multisigPublicKeys = [];
        for (var i = 0; i < (Array.isArray(multisigPublicKeysCount) ? GeneratorUtils_1.GeneratorUtils.compact(multisigPublicKeysCount) : multisigPublicKeysCount); i++) {
            var item = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
            multisigPublicKeys.push(item);
            byteArray.splice(0, item.getSize());
        }
        return new MultisigEntryBuilder(minApproval, minRemoval, accountPublicKey, cosignatoryPublicKeys, multisigPublicKeys);
    };
    MultisigEntryBuilder.prototype.getMinApproval = function () {
        return this.minApproval;
    };
    MultisigEntryBuilder.prototype.getMinRemoval = function () {
        return this.minRemoval;
    };
    MultisigEntryBuilder.prototype.getAccountPublicKey = function () {
        return this.accountPublicKey;
    };
    MultisigEntryBuilder.prototype.getCosignatoryPublicKeys = function () {
        return this.cosignatoryPublicKeys;
    };
    MultisigEntryBuilder.prototype.getMultisigPublicKeys = function () {
        return this.multisigPublicKeys;
    };
    MultisigEntryBuilder.prototype.getSize = function () {
        var size = 0;
        size += 4;
        size += 4;
        size += this.accountPublicKey.getSize();
        size += 8;
        this.cosignatoryPublicKeys.forEach(function (o) { return size += o.getSize(); });
        size += 8;
        this.multisigPublicKeys.forEach(function (o) { return size += o.getSize(); });
        return size;
    };
    MultisigEntryBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var minApprovalBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getMinApproval(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, minApprovalBytes);
        var minRemovalBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getMinRemoval(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, minRemovalBytes);
        var accountPublicKeyBytes = this.accountPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountPublicKeyBytes);
        var cosignatoryPublicKeysCountBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(GeneratorUtils_1.GeneratorUtils.fromUint(this.cosignatoryPublicKeys.length));
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, cosignatoryPublicKeysCountBytes);
        this.cosignatoryPublicKeys.forEach(function (item) {
            var cosignatoryPublicKeysBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, cosignatoryPublicKeysBytes);
        });
        var multisigPublicKeysCountBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(GeneratorUtils_1.GeneratorUtils.fromUint(this.multisigPublicKeys.length));
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, multisigPublicKeysCountBytes);
        this.multisigPublicKeys.forEach(function (item) {
            var multisigPublicKeysBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, multisigPublicKeysBytes);
        });
        return newArray;
    };
    return MultisigEntryBuilder;
}());
exports.MultisigEntryBuilder = MultisigEntryBuilder;

},{"./GeneratorUtils":60,"./KeyDto":75}],107:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AddressDto_1 = require("./AddressDto");
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicIdDto_1 = require("./MosaicIdDto");
var NamespaceAliasTypeDto_1 = require("./NamespaceAliasTypeDto");
var NamespaceAliasBuilder = (function () {
    function NamespaceAliasBuilder(mosaicAlias, addressAlias) {
        if ((mosaicAlias && addressAlias) || (!mosaicAlias && !addressAlias)) {
            throw new Error('Invalid conditional parameters');
        }
        this.mosaicAlias = mosaicAlias;
        this.addressAlias = addressAlias;
        if (mosaicAlias) {
            this.namespaceAliasType = NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.MOSAIC_ID;
        }
        else {
            this.namespaceAliasType = NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.ADDRESS;
        }
    }
    NamespaceAliasBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var namespaceAliasType = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var namespaceAliasTypeConditionBytes = Uint8Array.from(byteArray.slice(0, 8));
        byteArray.splice(0, 8);
        var mosaicAlias;
        if (namespaceAliasType === NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.MOSAIC_ID) {
            mosaicAlias = MosaicIdDto_1.MosaicIdDto.loadFromBinary(namespaceAliasTypeConditionBytes);
        }
        var addressAlias;
        if (namespaceAliasType === NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.ADDRESS) {
            addressAlias = AddressDto_1.AddressDto.loadFromBinary(namespaceAliasTypeConditionBytes);
        }
        return new NamespaceAliasBuilder(mosaicAlias, addressAlias);
    };
    NamespaceAliasBuilder.prototype.getNamespaceAliasType = function () {
        return this.namespaceAliasType;
    };
    NamespaceAliasBuilder.prototype.getMosaicAlias = function () {
        if (this.namespaceAliasType !== NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.MOSAIC_ID) {
            throw new Error('namespaceAliasType is not set to MOSAIC_ID.');
        }
        return this.mosaicAlias;
    };
    NamespaceAliasBuilder.prototype.getAddressAlias = function () {
        if (this.namespaceAliasType !== NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.ADDRESS) {
            throw new Error('namespaceAliasType is not set to ADDRESS.');
        }
        return this.addressAlias;
    };
    NamespaceAliasBuilder.prototype.getSize = function () {
        var size = 0;
        size += 1;
        if (this.namespaceAliasType === NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.MOSAIC_ID) {
            size += this.mosaicAlias.getSize();
        }
        if (this.namespaceAliasType === NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.ADDRESS) {
            size += this.addressAlias.getSize();
        }
        return size;
    };
    NamespaceAliasBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var namespaceAliasTypeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.namespaceAliasType, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, namespaceAliasTypeBytes);
        if (this.namespaceAliasType === NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.MOSAIC_ID) {
            var mosaicAliasBytes = this.mosaicAlias.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicAliasBytes);
        }
        if (this.namespaceAliasType === NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.ADDRESS) {
            var addressAliasBytes = this.addressAlias.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressAliasBytes);
        }
        return newArray;
    };
    return NamespaceAliasBuilder;
}());
exports.NamespaceAliasBuilder = NamespaceAliasBuilder;

},{"./AddressDto":20,"./GeneratorUtils":60,"./MosaicIdDto":92,"./NamespaceAliasTypeDto":108}],108:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NamespaceAliasTypeDto;
(function (NamespaceAliasTypeDto) {
    NamespaceAliasTypeDto[NamespaceAliasTypeDto["NONE"] = 0] = "NONE";
    NamespaceAliasTypeDto[NamespaceAliasTypeDto["MOSAIC_ID"] = 1] = "MOSAIC_ID";
    NamespaceAliasTypeDto[NamespaceAliasTypeDto["ADDRESS"] = 2] = "ADDRESS";
})(NamespaceAliasTypeDto = exports.NamespaceAliasTypeDto || (exports.NamespaceAliasTypeDto = {}));

},{}],109:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var NamespaceIdDto_1 = require("./NamespaceIdDto");
var ReceiptBuilder_1 = require("./ReceiptBuilder");
var NamespaceExpiryReceiptBuilder = (function (_super) {
    __extends(NamespaceExpiryReceiptBuilder, _super);
    function NamespaceExpiryReceiptBuilder(version, type, artifactId) {
        var _this = _super.call(this, version, type) || this;
        _this.artifactId = artifactId;
        return _this;
    }
    NamespaceExpiryReceiptBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = ReceiptBuilder_1.ReceiptBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var artifactId = NamespaceIdDto_1.NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, artifactId.getSize());
        return new NamespaceExpiryReceiptBuilder(superObject.version, superObject.type, artifactId);
    };
    NamespaceExpiryReceiptBuilder.prototype.getArtifactId = function () {
        return this.artifactId;
    };
    NamespaceExpiryReceiptBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.artifactId.getSize();
        return size;
    };
    NamespaceExpiryReceiptBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var artifactIdBytes = this.artifactId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, artifactIdBytes);
        return newArray;
    };
    return NamespaceExpiryReceiptBuilder;
}(ReceiptBuilder_1.ReceiptBuilder));
exports.NamespaceExpiryReceiptBuilder = NamespaceExpiryReceiptBuilder;

},{"./GeneratorUtils":60,"./NamespaceIdDto":110,"./ReceiptBuilder":118}],110:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var NamespaceIdDto = (function () {
    function NamespaceIdDto(namespaceId) {
        this.namespaceId = namespaceId;
    }
    NamespaceIdDto.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var namespaceId = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new NamespaceIdDto(namespaceId);
    };
    NamespaceIdDto.prototype.getNamespaceId = function () {
        return this.namespaceId;
    };
    NamespaceIdDto.prototype.getSize = function () {
        return 8;
    };
    NamespaceIdDto.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var namespaceIdBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getNamespaceId());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, namespaceIdBytes);
        return newArray;
    };
    return NamespaceIdDto;
}());
exports.NamespaceIdDto = NamespaceIdDto;

},{"./GeneratorUtils":60}],111:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var HeightDto_1 = require("./HeightDto");
var NamespaceLifetimeBuilder = (function () {
    function NamespaceLifetimeBuilder(lifetimeStart, lifetimeEnd) {
        this.lifetimeStart = lifetimeStart;
        this.lifetimeEnd = lifetimeEnd;
    }
    NamespaceLifetimeBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var lifetimeStart = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, lifetimeStart.getSize());
        var lifetimeEnd = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, lifetimeEnd.getSize());
        return new NamespaceLifetimeBuilder(lifetimeStart, lifetimeEnd);
    };
    NamespaceLifetimeBuilder.prototype.getLifetimeStart = function () {
        return this.lifetimeStart;
    };
    NamespaceLifetimeBuilder.prototype.getLifetimeEnd = function () {
        return this.lifetimeEnd;
    };
    NamespaceLifetimeBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.lifetimeStart.getSize();
        size += this.lifetimeEnd.getSize();
        return size;
    };
    NamespaceLifetimeBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var lifetimeStartBytes = this.lifetimeStart.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, lifetimeStartBytes);
        var lifetimeEndBytes = this.lifetimeEnd.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, lifetimeEndBytes);
        return newArray;
    };
    return NamespaceLifetimeBuilder;
}());
exports.NamespaceLifetimeBuilder = NamespaceLifetimeBuilder;

},{"./GeneratorUtils":60,"./HeightDto":70}],112:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var KeyDto_1 = require("./KeyDto");
var NamespaceIdDto_1 = require("./NamespaceIdDto");
var NamespaceMetadataTransactionBodyBuilder = (function () {
    function NamespaceMetadataTransactionBodyBuilder(targetPublicKey, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value) {
        this.targetPublicKey = targetPublicKey;
        this.scopedMetadataKey = scopedMetadataKey;
        this.targetNamespaceId = targetNamespaceId;
        this.valueSizeDelta = valueSizeDelta;
        this.value = value;
    }
    NamespaceMetadataTransactionBodyBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var targetPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetPublicKey.getSize());
        var scopedMetadataKey = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        var targetNamespaceId = NamespaceIdDto_1.NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetNamespaceId.getSize());
        var valueSizeDelta = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        var valueSize = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        var value = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), valueSize);
        byteArray.splice(0, valueSize);
        return new NamespaceMetadataTransactionBodyBuilder(targetPublicKey, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value);
    };
    NamespaceMetadataTransactionBodyBuilder.prototype.getTargetPublicKey = function () {
        return this.targetPublicKey;
    };
    NamespaceMetadataTransactionBodyBuilder.prototype.getScopedMetadataKey = function () {
        return this.scopedMetadataKey;
    };
    NamespaceMetadataTransactionBodyBuilder.prototype.getTargetNamespaceId = function () {
        return this.targetNamespaceId;
    };
    NamespaceMetadataTransactionBodyBuilder.prototype.getValueSizeDelta = function () {
        return this.valueSizeDelta;
    };
    NamespaceMetadataTransactionBodyBuilder.prototype.getValue = function () {
        return this.value;
    };
    NamespaceMetadataTransactionBodyBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.targetPublicKey.getSize();
        size += 8;
        size += this.targetNamespaceId.getSize();
        size += 2;
        size += 2;
        size += this.value.length;
        return size;
    };
    NamespaceMetadataTransactionBodyBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var targetPublicKeyBytes = this.targetPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetPublicKeyBytes);
        var scopedMetadataKeyBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getScopedMetadataKey());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, scopedMetadataKeyBytes);
        var targetNamespaceIdBytes = this.targetNamespaceId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetNamespaceIdBytes);
        var valueSizeDeltaBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getValueSizeDelta(), 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueSizeDeltaBytes);
        var valueSizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.value.length, 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueSizeBytes);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.value);
        return newArray;
    };
    return NamespaceMetadataTransactionBodyBuilder;
}());
exports.NamespaceMetadataTransactionBodyBuilder = NamespaceMetadataTransactionBodyBuilder;

},{"./GeneratorUtils":60,"./KeyDto":75,"./NamespaceIdDto":110}],113:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var NamespaceMetadataTransactionBodyBuilder_1 = require("./NamespaceMetadataTransactionBodyBuilder");
var TransactionBuilder_1 = require("./TransactionBuilder");
var NamespaceMetadataTransactionBuilder = (function (_super) {
    __extends(NamespaceMetadataTransactionBuilder, _super);
    function NamespaceMetadataTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, targetPublicKey, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value) {
        var _this = _super.call(this, signature, signerPublicKey, version, network, type, fee, deadline) || this;
        _this.namespaceMetadataTransactionBody = new NamespaceMetadataTransactionBodyBuilder_1.NamespaceMetadataTransactionBodyBuilder(targetPublicKey, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value);
        return _this;
    }
    NamespaceMetadataTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var namespaceMetadataTransactionBody = NamespaceMetadataTransactionBodyBuilder_1.NamespaceMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceMetadataTransactionBody.getSize());
        return new NamespaceMetadataTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, namespaceMetadataTransactionBody.targetPublicKey, namespaceMetadataTransactionBody.scopedMetadataKey, namespaceMetadataTransactionBody.targetNamespaceId, namespaceMetadataTransactionBody.valueSizeDelta, namespaceMetadataTransactionBody.value);
    };
    NamespaceMetadataTransactionBuilder.prototype.getTargetPublicKey = function () {
        return this.namespaceMetadataTransactionBody.getTargetPublicKey();
    };
    NamespaceMetadataTransactionBuilder.prototype.getScopedMetadataKey = function () {
        return this.namespaceMetadataTransactionBody.getScopedMetadataKey();
    };
    NamespaceMetadataTransactionBuilder.prototype.getTargetNamespaceId = function () {
        return this.namespaceMetadataTransactionBody.getTargetNamespaceId();
    };
    NamespaceMetadataTransactionBuilder.prototype.getValueSizeDelta = function () {
        return this.namespaceMetadataTransactionBody.getValueSizeDelta();
    };
    NamespaceMetadataTransactionBuilder.prototype.getValue = function () {
        return this.namespaceMetadataTransactionBody.getValue();
    };
    NamespaceMetadataTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.namespaceMetadataTransactionBody.getSize();
        return size;
    };
    NamespaceMetadataTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var namespaceMetadataTransactionBodyBytes = this.namespaceMetadataTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, namespaceMetadataTransactionBodyBytes);
        return newArray;
    };
    return NamespaceMetadataTransactionBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.NamespaceMetadataTransactionBuilder = NamespaceMetadataTransactionBuilder;

},{"./GeneratorUtils":60,"./NamespaceMetadataTransactionBodyBuilder":112,"./TransactionBuilder":130}],114:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var NamespaceAliasBuilder_1 = require("./NamespaceAliasBuilder");
var NamespacePathBuilder = (function () {
    function NamespacePathBuilder(path, alias) {
        this.path = path;
        this.alias = alias;
    }
    NamespacePathBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var pathSize = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var path = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), pathSize);
        byteArray.splice(0, pathSize);
        var alias = NamespaceAliasBuilder_1.NamespaceAliasBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, alias.getSize());
        return new NamespacePathBuilder(path, alias);
    };
    NamespacePathBuilder.prototype.getPath = function () {
        return this.path;
    };
    NamespacePathBuilder.prototype.getAlias = function () {
        return this.alias;
    };
    NamespacePathBuilder.prototype.getSize = function () {
        var size = 0;
        size += 1;
        size += this.path.length;
        size += this.alias.getSize();
        return size;
    };
    NamespacePathBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var pathSizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.path.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, pathSizeBytes);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.path);
        var aliasBytes = this.alias.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, aliasBytes);
        return newArray;
    };
    return NamespacePathBuilder;
}());
exports.NamespacePathBuilder = NamespacePathBuilder;

},{"./GeneratorUtils":60,"./NamespaceAliasBuilder":107}],115:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlockDurationDto_1 = require("./BlockDurationDto");
var GeneratorUtils_1 = require("./GeneratorUtils");
var NamespaceIdDto_1 = require("./NamespaceIdDto");
var NamespaceRegistrationTypeDto_1 = require("./NamespaceRegistrationTypeDto");
var NamespaceRegistrationTransactionBodyBuilder = (function () {
    function NamespaceRegistrationTransactionBodyBuilder(id, name, duration, parentId) {
        if ((duration && parentId) || (!duration && !parentId)) {
            throw new Error('Invalid conditional parameters');
        }
        this.duration = duration;
        this.parentId = parentId;
        this.id = id;
        this.name = name;
        if (duration) {
            this.registrationType = NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.ROOT;
        }
        else {
            this.registrationType = NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.CHILD;
        }
    }
    NamespaceRegistrationTransactionBodyBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var registrationTypeConditionBytes = Uint8Array.from(byteArray.slice(0, 8));
        byteArray.splice(0, 8);
        var id = NamespaceIdDto_1.NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, id.getSize());
        var registrationType = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var nameSize = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var name = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), nameSize);
        byteArray.splice(0, nameSize);
        var duration;
        if (registrationType === NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.ROOT) {
            duration = BlockDurationDto_1.BlockDurationDto.loadFromBinary(registrationTypeConditionBytes);
        }
        var parentId;
        if (registrationType === NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.CHILD) {
            parentId = NamespaceIdDto_1.NamespaceIdDto.loadFromBinary(registrationTypeConditionBytes);
        }
        return new NamespaceRegistrationTransactionBodyBuilder(id, name, duration, parentId);
    };
    NamespaceRegistrationTransactionBodyBuilder.prototype.getDuration = function () {
        if (this.registrationType !== NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.ROOT) {
            throw new Error('registrationType is not set to ROOT.');
        }
        return this.duration;
    };
    NamespaceRegistrationTransactionBodyBuilder.prototype.getParentId = function () {
        if (this.registrationType !== NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.CHILD) {
            throw new Error('registrationType is not set to CHILD.');
        }
        return this.parentId;
    };
    NamespaceRegistrationTransactionBodyBuilder.prototype.getId = function () {
        return this.id;
    };
    NamespaceRegistrationTransactionBodyBuilder.prototype.getRegistrationType = function () {
        return this.registrationType;
    };
    NamespaceRegistrationTransactionBodyBuilder.prototype.getName = function () {
        return this.name;
    };
    NamespaceRegistrationTransactionBodyBuilder.prototype.getSize = function () {
        var size = 0;
        if (this.registrationType === NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.ROOT) {
            size += this.duration.getSize();
        }
        if (this.registrationType === NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.CHILD) {
            size += this.parentId.getSize();
        }
        size += this.id.getSize();
        size += 1;
        size += 1;
        size += this.name.length;
        return size;
    };
    NamespaceRegistrationTransactionBodyBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        if (this.registrationType === NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.ROOT) {
            var durationBytes = this.duration.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, durationBytes);
        }
        if (this.registrationType === NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.CHILD) {
            var parentIdBytes = this.parentId.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, parentIdBytes);
        }
        var idBytes = this.id.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, idBytes);
        var registrationTypeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.registrationType, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, registrationTypeBytes);
        var nameSizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.name.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, nameSizeBytes);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.name);
        return newArray;
    };
    return NamespaceRegistrationTransactionBodyBuilder;
}());
exports.NamespaceRegistrationTransactionBodyBuilder = NamespaceRegistrationTransactionBodyBuilder;

},{"./BlockDurationDto":31,"./GeneratorUtils":60,"./NamespaceIdDto":110,"./NamespaceRegistrationTypeDto":117}],116:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var NamespaceRegistrationTransactionBodyBuilder_1 = require("./NamespaceRegistrationTransactionBodyBuilder");
var TransactionBuilder_1 = require("./TransactionBuilder");
var NamespaceRegistrationTransactionBuilder = (function (_super) {
    __extends(NamespaceRegistrationTransactionBuilder, _super);
    function NamespaceRegistrationTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, id, name, duration, parentId) {
        var _this = _super.call(this, signature, signerPublicKey, version, network, type, fee, deadline) || this;
        if ((duration && parentId) || (!duration && !parentId)) {
            throw new Error('Invalid conditional parameters');
        }
        _this.namespaceRegistrationTransactionBody = new NamespaceRegistrationTransactionBodyBuilder_1.NamespaceRegistrationTransactionBodyBuilder(id, name, duration, parentId);
        return _this;
    }
    NamespaceRegistrationTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var namespaceRegistrationTransactionBody = NamespaceRegistrationTransactionBodyBuilder_1.NamespaceRegistrationTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceRegistrationTransactionBody.getSize());
        return new NamespaceRegistrationTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, namespaceRegistrationTransactionBody.id, namespaceRegistrationTransactionBody.name, namespaceRegistrationTransactionBody.duration, namespaceRegistrationTransactionBody.parentId);
    };
    NamespaceRegistrationTransactionBuilder.prototype.getDuration = function () {
        return this.namespaceRegistrationTransactionBody.getDuration();
    };
    NamespaceRegistrationTransactionBuilder.prototype.getParentId = function () {
        return this.namespaceRegistrationTransactionBody.getParentId();
    };
    NamespaceRegistrationTransactionBuilder.prototype.getId = function () {
        return this.namespaceRegistrationTransactionBody.getId();
    };
    NamespaceRegistrationTransactionBuilder.prototype.getRegistrationType = function () {
        return this.namespaceRegistrationTransactionBody.getRegistrationType();
    };
    NamespaceRegistrationTransactionBuilder.prototype.getName = function () {
        return this.namespaceRegistrationTransactionBody.getName();
    };
    NamespaceRegistrationTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.namespaceRegistrationTransactionBody.getSize();
        return size;
    };
    NamespaceRegistrationTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var namespaceRegistrationTransactionBodyBytes = this.namespaceRegistrationTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, namespaceRegistrationTransactionBodyBytes);
        return newArray;
    };
    return NamespaceRegistrationTransactionBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.NamespaceRegistrationTransactionBuilder = NamespaceRegistrationTransactionBuilder;

},{"./GeneratorUtils":60,"./NamespaceRegistrationTransactionBodyBuilder":115,"./TransactionBuilder":130}],117:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NamespaceRegistrationTypeDto;
(function (NamespaceRegistrationTypeDto) {
    NamespaceRegistrationTypeDto[NamespaceRegistrationTypeDto["ROOT"] = 0] = "ROOT";
    NamespaceRegistrationTypeDto[NamespaceRegistrationTypeDto["CHILD"] = 1] = "CHILD";
})(NamespaceRegistrationTypeDto = exports.NamespaceRegistrationTypeDto || (exports.NamespaceRegistrationTypeDto = {}));

},{}],118:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var ReceiptBuilder = (function () {
    function ReceiptBuilder(version, type) {
        this.size = 0;
        this.version = version;
        this.type = type;
    }
    ReceiptBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var size = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        var version = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        var type = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        return new ReceiptBuilder(version, type);
    };
    ReceiptBuilder.prototype.getVersion = function () {
        return this.version;
    };
    ReceiptBuilder.prototype.getType = function () {
        return this.type;
    };
    ReceiptBuilder.prototype.getSize = function () {
        var size = 0;
        size += 4;
        size += 2;
        size += 2;
        return size;
    };
    ReceiptBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var versionBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getVersion(), 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, versionBytes);
        var typeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.type, 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, typeBytes);
        return newArray;
    };
    return ReceiptBuilder;
}());
exports.ReceiptBuilder = ReceiptBuilder;

},{"./GeneratorUtils":60}],119:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var ReceiptSourceBuilder = (function () {
    function ReceiptSourceBuilder(primaryId, secondaryId) {
        this.primaryId = primaryId;
        this.secondaryId = secondaryId;
    }
    ReceiptSourceBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var primaryId = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        var secondaryId = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        return new ReceiptSourceBuilder(primaryId, secondaryId);
    };
    ReceiptSourceBuilder.prototype.getPrimaryId = function () {
        return this.primaryId;
    };
    ReceiptSourceBuilder.prototype.getSecondaryId = function () {
        return this.secondaryId;
    };
    ReceiptSourceBuilder.prototype.getSize = function () {
        var size = 0;
        size += 4;
        size += 4;
        return size;
    };
    ReceiptSourceBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var primaryIdBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getPrimaryId(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, primaryIdBytes);
        var secondaryIdBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getSecondaryId(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secondaryIdBytes);
        return newArray;
    };
    return ReceiptSourceBuilder;
}());
exports.ReceiptSourceBuilder = ReceiptSourceBuilder;

},{"./GeneratorUtils":60}],120:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var MosaicIdDto_1 = require("./MosaicIdDto");
var RestrictionRuleBuilder = (function () {
    function RestrictionRuleBuilder(referenceMosaicId, restrictionValue, restrictionType) {
        this.referenceMosaicId = referenceMosaicId;
        this.restrictionValue = restrictionValue;
        this.restrictionType = restrictionType;
    }
    RestrictionRuleBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var referenceMosaicId = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, referenceMosaicId.getSize());
        var restrictionValue = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        var restrictionType = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        return new RestrictionRuleBuilder(referenceMosaicId, restrictionValue, restrictionType);
    };
    RestrictionRuleBuilder.prototype.getReferenceMosaicId = function () {
        return this.referenceMosaicId;
    };
    RestrictionRuleBuilder.prototype.getRestrictionValue = function () {
        return this.restrictionValue;
    };
    RestrictionRuleBuilder.prototype.getRestrictionType = function () {
        return this.restrictionType;
    };
    RestrictionRuleBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.referenceMosaicId.getSize();
        size += 8;
        size += 1;
        return size;
    };
    RestrictionRuleBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var referenceMosaicIdBytes = this.referenceMosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, referenceMosaicIdBytes);
        var restrictionValueBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getRestrictionValue());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionValueBytes);
        var restrictionTypeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.restrictionType, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionTypeBytes);
        return newArray;
    };
    return RestrictionRuleBuilder;
}());
exports.RestrictionRuleBuilder = RestrictionRuleBuilder;

},{"./GeneratorUtils":60,"./MosaicIdDto":92}],121:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var KeyDto_1 = require("./KeyDto");
var NamespaceIdDto_1 = require("./NamespaceIdDto");
var NamespaceLifetimeBuilder_1 = require("./NamespaceLifetimeBuilder");
var NamespacePathBuilder_1 = require("./NamespacePathBuilder");
var RootNamespaceHistoryBuilder = (function () {
    function RootNamespaceHistoryBuilder(id, ownerPublicKey, lifetime, rootAlias, paths) {
        this.id = id;
        this.ownerPublicKey = ownerPublicKey;
        this.lifetime = lifetime;
        this.rootAlias = rootAlias;
        this.paths = paths;
    }
    RootNamespaceHistoryBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var id = NamespaceIdDto_1.NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, id.getSize());
        var ownerPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, ownerPublicKey.getSize());
        var lifetime = NamespaceLifetimeBuilder_1.NamespaceLifetimeBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, lifetime.getSize());
        var rootAlias = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var childrenCount = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        var paths = [];
        for (var i = 0; i < (Array.isArray(childrenCount) ? GeneratorUtils_1.GeneratorUtils.compact(childrenCount) : childrenCount); i++) {
            var item = NamespacePathBuilder_1.NamespacePathBuilder.loadFromBinary(Uint8Array.from(byteArray));
            paths.push(item);
            byteArray.splice(0, item.getSize());
        }
        return new RootNamespaceHistoryBuilder(id, ownerPublicKey, lifetime, rootAlias, paths);
    };
    RootNamespaceHistoryBuilder.prototype.getId = function () {
        return this.id;
    };
    RootNamespaceHistoryBuilder.prototype.getOwnerPublicKey = function () {
        return this.ownerPublicKey;
    };
    RootNamespaceHistoryBuilder.prototype.getLifetime = function () {
        return this.lifetime;
    };
    RootNamespaceHistoryBuilder.prototype.getRootAlias = function () {
        return this.rootAlias;
    };
    RootNamespaceHistoryBuilder.prototype.getPaths = function () {
        return this.paths;
    };
    RootNamespaceHistoryBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.id.getSize();
        size += this.ownerPublicKey.getSize();
        size += this.lifetime.getSize();
        size += 1;
        size += 8;
        this.paths.forEach(function (o) { return size += o.getSize(); });
        return size;
    };
    RootNamespaceHistoryBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var idBytes = this.id.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, idBytes);
        var ownerPublicKeyBytes = this.ownerPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, ownerPublicKeyBytes);
        var lifetimeBytes = this.lifetime.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, lifetimeBytes);
        var rootAliasBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.rootAlias, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, rootAliasBytes);
        var childrenCountBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(GeneratorUtils_1.GeneratorUtils.fromUint(this.paths.length));
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, childrenCountBytes);
        this.paths.forEach(function (item) {
            var pathsBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, pathsBytes);
        });
        return newArray;
    };
    return RootNamespaceHistoryBuilder;
}());
exports.RootNamespaceHistoryBuilder = RootNamespaceHistoryBuilder;

},{"./GeneratorUtils":60,"./KeyDto":75,"./NamespaceIdDto":110,"./NamespaceLifetimeBuilder":111,"./NamespacePathBuilder":114}],122:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var ScopedMetadataKeyDto = (function () {
    function ScopedMetadataKeyDto(scopedMetadataKey) {
        this.scopedMetadataKey = scopedMetadataKey;
    }
    ScopedMetadataKeyDto.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var scopedMetadataKey = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new ScopedMetadataKeyDto(scopedMetadataKey);
    };
    ScopedMetadataKeyDto.prototype.getScopedMetadataKey = function () {
        return this.scopedMetadataKey;
    };
    ScopedMetadataKeyDto.prototype.getSize = function () {
        return 8;
    };
    ScopedMetadataKeyDto.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var scopedMetadataKeyBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getScopedMetadataKey());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, scopedMetadataKeyBytes);
        return newArray;
    };
    return ScopedMetadataKeyDto;
}());
exports.ScopedMetadataKeyDto = ScopedMetadataKeyDto;

},{"./GeneratorUtils":60}],123:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AddressDto_1 = require("./AddressDto");
var GeneratorUtils_1 = require("./GeneratorUtils");
var Hash256Dto_1 = require("./Hash256Dto");
var HeightDto_1 = require("./HeightDto");
var KeyDto_1 = require("./KeyDto");
var MosaicBuilder_1 = require("./MosaicBuilder");
var SecretLockInfoBuilder = (function () {
    function SecretLockInfoBuilder(senderPublicKey, mosaic, endHeight, status, hashAlgorithm, secret, recipient) {
        this.senderPublicKey = senderPublicKey;
        this.mosaic = mosaic;
        this.endHeight = endHeight;
        this.status = status;
        this.hashAlgorithm = hashAlgorithm;
        this.secret = secret;
        this.recipient = recipient;
    }
    SecretLockInfoBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var senderPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, senderPublicKey.getSize());
        var mosaic = MosaicBuilder_1.MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        var endHeight = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, endHeight.getSize());
        var status = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var hashAlgorithm = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var secret = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secret.getSize());
        var recipient = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, recipient.getSize());
        return new SecretLockInfoBuilder(senderPublicKey, mosaic, endHeight, status, hashAlgorithm, secret, recipient);
    };
    SecretLockInfoBuilder.prototype.getSenderPublicKey = function () {
        return this.senderPublicKey;
    };
    SecretLockInfoBuilder.prototype.getMosaic = function () {
        return this.mosaic;
    };
    SecretLockInfoBuilder.prototype.getEndHeight = function () {
        return this.endHeight;
    };
    SecretLockInfoBuilder.prototype.getStatus = function () {
        return this.status;
    };
    SecretLockInfoBuilder.prototype.getHashAlgorithm = function () {
        return this.hashAlgorithm;
    };
    SecretLockInfoBuilder.prototype.getSecret = function () {
        return this.secret;
    };
    SecretLockInfoBuilder.prototype.getRecipient = function () {
        return this.recipient;
    };
    SecretLockInfoBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.senderPublicKey.getSize();
        size += this.mosaic.getSize();
        size += this.endHeight.getSize();
        size += 1;
        size += 1;
        size += this.secret.getSize();
        size += this.recipient.getSize();
        return size;
    };
    SecretLockInfoBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var senderPublicKeyBytes = this.senderPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, senderPublicKeyBytes);
        var mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        var endHeightBytes = this.endHeight.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, endHeightBytes);
        var statusBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.status, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, statusBytes);
        var hashAlgorithmBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.hashAlgorithm, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, hashAlgorithmBytes);
        var secretBytes = this.secret.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secretBytes);
        var recipientBytes = this.recipient.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, recipientBytes);
        return newArray;
    };
    return SecretLockInfoBuilder;
}());
exports.SecretLockInfoBuilder = SecretLockInfoBuilder;

},{"./AddressDto":20,"./GeneratorUtils":60,"./Hash256Dto":63,"./HeightDto":70,"./KeyDto":75,"./MosaicBuilder":83}],124:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlockDurationDto_1 = require("./BlockDurationDto");
var GeneratorUtils_1 = require("./GeneratorUtils");
var Hash256Dto_1 = require("./Hash256Dto");
var UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
var UnresolvedMosaicBuilder_1 = require("./UnresolvedMosaicBuilder");
var SecretLockTransactionBodyBuilder = (function () {
    function SecretLockTransactionBodyBuilder(secret, mosaic, duration, hashAlgorithm, recipientAddress) {
        this.secret = secret;
        this.mosaic = mosaic;
        this.duration = duration;
        this.hashAlgorithm = hashAlgorithm;
        this.recipientAddress = recipientAddress;
    }
    SecretLockTransactionBodyBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var secret = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secret.getSize());
        var mosaic = UnresolvedMosaicBuilder_1.UnresolvedMosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        var duration = BlockDurationDto_1.BlockDurationDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, duration.getSize());
        var hashAlgorithm = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var recipientAddress = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, recipientAddress.getSize());
        return new SecretLockTransactionBodyBuilder(secret, mosaic, duration, hashAlgorithm, recipientAddress);
    };
    SecretLockTransactionBodyBuilder.prototype.getSecret = function () {
        return this.secret;
    };
    SecretLockTransactionBodyBuilder.prototype.getMosaic = function () {
        return this.mosaic;
    };
    SecretLockTransactionBodyBuilder.prototype.getDuration = function () {
        return this.duration;
    };
    SecretLockTransactionBodyBuilder.prototype.getHashAlgorithm = function () {
        return this.hashAlgorithm;
    };
    SecretLockTransactionBodyBuilder.prototype.getRecipientAddress = function () {
        return this.recipientAddress;
    };
    SecretLockTransactionBodyBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.secret.getSize();
        size += this.mosaic.getSize();
        size += this.duration.getSize();
        size += 1;
        size += this.recipientAddress.getSize();
        return size;
    };
    SecretLockTransactionBodyBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var secretBytes = this.secret.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secretBytes);
        var mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        var durationBytes = this.duration.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, durationBytes);
        var hashAlgorithmBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.hashAlgorithm, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, hashAlgorithmBytes);
        var recipientAddressBytes = this.recipientAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, recipientAddressBytes);
        return newArray;
    };
    return SecretLockTransactionBodyBuilder;
}());
exports.SecretLockTransactionBodyBuilder = SecretLockTransactionBodyBuilder;

},{"./BlockDurationDto":31,"./GeneratorUtils":60,"./Hash256Dto":63,"./UnresolvedAddressDto":134,"./UnresolvedMosaicBuilder":135}],125:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var SecretLockTransactionBodyBuilder_1 = require("./SecretLockTransactionBodyBuilder");
var TransactionBuilder_1 = require("./TransactionBuilder");
var SecretLockTransactionBuilder = (function (_super) {
    __extends(SecretLockTransactionBuilder, _super);
    function SecretLockTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, secret, mosaic, duration, hashAlgorithm, recipientAddress) {
        var _this = _super.call(this, signature, signerPublicKey, version, network, type, fee, deadline) || this;
        _this.secretLockTransactionBody = new SecretLockTransactionBodyBuilder_1.SecretLockTransactionBodyBuilder(secret, mosaic, duration, hashAlgorithm, recipientAddress);
        return _this;
    }
    SecretLockTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var secretLockTransactionBody = SecretLockTransactionBodyBuilder_1.SecretLockTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secretLockTransactionBody.getSize());
        return new SecretLockTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, secretLockTransactionBody.secret, secretLockTransactionBody.mosaic, secretLockTransactionBody.duration, secretLockTransactionBody.hashAlgorithm, secretLockTransactionBody.recipientAddress);
    };
    SecretLockTransactionBuilder.prototype.getSecret = function () {
        return this.secretLockTransactionBody.getSecret();
    };
    SecretLockTransactionBuilder.prototype.getMosaic = function () {
        return this.secretLockTransactionBody.getMosaic();
    };
    SecretLockTransactionBuilder.prototype.getDuration = function () {
        return this.secretLockTransactionBody.getDuration();
    };
    SecretLockTransactionBuilder.prototype.getHashAlgorithm = function () {
        return this.secretLockTransactionBody.getHashAlgorithm();
    };
    SecretLockTransactionBuilder.prototype.getRecipientAddress = function () {
        return this.secretLockTransactionBody.getRecipientAddress();
    };
    SecretLockTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.secretLockTransactionBody.getSize();
        return size;
    };
    SecretLockTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var secretLockTransactionBodyBytes = this.secretLockTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secretLockTransactionBodyBytes);
        return newArray;
    };
    return SecretLockTransactionBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.SecretLockTransactionBuilder = SecretLockTransactionBuilder;

},{"./GeneratorUtils":60,"./SecretLockTransactionBodyBuilder":124,"./TransactionBuilder":130}],126:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var Hash256Dto_1 = require("./Hash256Dto");
var UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
var SecretProofTransactionBodyBuilder = (function () {
    function SecretProofTransactionBodyBuilder(secret, hashAlgorithm, recipientAddress, proof) {
        this.secret = secret;
        this.hashAlgorithm = hashAlgorithm;
        this.recipientAddress = recipientAddress;
        this.proof = proof;
    }
    SecretProofTransactionBodyBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var secret = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secret.getSize());
        var proofSize = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        var hashAlgorithm = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var recipientAddress = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, recipientAddress.getSize());
        var proof = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), proofSize);
        byteArray.splice(0, proofSize);
        return new SecretProofTransactionBodyBuilder(secret, hashAlgorithm, recipientAddress, proof);
    };
    SecretProofTransactionBodyBuilder.prototype.getSecret = function () {
        return this.secret;
    };
    SecretProofTransactionBodyBuilder.prototype.getHashAlgorithm = function () {
        return this.hashAlgorithm;
    };
    SecretProofTransactionBodyBuilder.prototype.getRecipientAddress = function () {
        return this.recipientAddress;
    };
    SecretProofTransactionBodyBuilder.prototype.getProof = function () {
        return this.proof;
    };
    SecretProofTransactionBodyBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.secret.getSize();
        size += 2;
        size += 1;
        size += this.recipientAddress.getSize();
        size += this.proof.length;
        return size;
    };
    SecretProofTransactionBodyBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var secretBytes = this.secret.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secretBytes);
        var proofSizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.proof.length, 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, proofSizeBytes);
        var hashAlgorithmBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.hashAlgorithm, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, hashAlgorithmBytes);
        var recipientAddressBytes = this.recipientAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, recipientAddressBytes);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.proof);
        return newArray;
    };
    return SecretProofTransactionBodyBuilder;
}());
exports.SecretProofTransactionBodyBuilder = SecretProofTransactionBodyBuilder;

},{"./GeneratorUtils":60,"./Hash256Dto":63,"./UnresolvedAddressDto":134}],127:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var SecretProofTransactionBodyBuilder_1 = require("./SecretProofTransactionBodyBuilder");
var TransactionBuilder_1 = require("./TransactionBuilder");
var SecretProofTransactionBuilder = (function (_super) {
    __extends(SecretProofTransactionBuilder, _super);
    function SecretProofTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, secret, hashAlgorithm, recipientAddress, proof) {
        var _this = _super.call(this, signature, signerPublicKey, version, network, type, fee, deadline) || this;
        _this.secretProofTransactionBody = new SecretProofTransactionBodyBuilder_1.SecretProofTransactionBodyBuilder(secret, hashAlgorithm, recipientAddress, proof);
        return _this;
    }
    SecretProofTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var secretProofTransactionBody = SecretProofTransactionBodyBuilder_1.SecretProofTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secretProofTransactionBody.getSize());
        return new SecretProofTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, secretProofTransactionBody.secret, secretProofTransactionBody.hashAlgorithm, secretProofTransactionBody.recipientAddress, secretProofTransactionBody.proof);
    };
    SecretProofTransactionBuilder.prototype.getSecret = function () {
        return this.secretProofTransactionBody.getSecret();
    };
    SecretProofTransactionBuilder.prototype.getHashAlgorithm = function () {
        return this.secretProofTransactionBody.getHashAlgorithm();
    };
    SecretProofTransactionBuilder.prototype.getRecipientAddress = function () {
        return this.secretProofTransactionBody.getRecipientAddress();
    };
    SecretProofTransactionBuilder.prototype.getProof = function () {
        return this.secretProofTransactionBody.getProof();
    };
    SecretProofTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.secretProofTransactionBody.getSize();
        return size;
    };
    SecretProofTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var secretProofTransactionBodyBytes = this.secretProofTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secretProofTransactionBodyBytes);
        return newArray;
    };
    return SecretProofTransactionBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.SecretProofTransactionBuilder = SecretProofTransactionBuilder;

},{"./GeneratorUtils":60,"./SecretProofTransactionBodyBuilder":126,"./TransactionBuilder":130}],128:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var SignatureDto = (function () {
    function SignatureDto(signature) {
        this.signature = signature;
    }
    SignatureDto.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var signature = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 64);
        byteArray.splice(0, 64);
        return new SignatureDto(signature);
    };
    SignatureDto.prototype.getSignature = function () {
        return this.signature;
    };
    SignatureDto.prototype.getSize = function () {
        return 64;
    };
    SignatureDto.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.signature);
        return newArray;
    };
    return SignatureDto;
}());
exports.SignatureDto = SignatureDto;

},{"./GeneratorUtils":60}],129:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var TimestampDto = (function () {
    function TimestampDto(timestamp) {
        this.timestamp = timestamp;
    }
    TimestampDto.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var timestamp = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new TimestampDto(timestamp);
    };
    TimestampDto.prototype.getTimestamp = function () {
        return this.timestamp;
    };
    TimestampDto.prototype.getSize = function () {
        return 8;
    };
    TimestampDto.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var timestampBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getTimestamp());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, timestampBytes);
        return newArray;
    };
    return TimestampDto;
}());
exports.TimestampDto = TimestampDto;

},{"./GeneratorUtils":60}],130:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AmountDto_1 = require("./AmountDto");
var GeneratorUtils_1 = require("./GeneratorUtils");
var KeyDto_1 = require("./KeyDto");
var SignatureDto_1 = require("./SignatureDto");
var TimestampDto_1 = require("./TimestampDto");
var TransactionBuilder = (function () {
    function TransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline) {
        this.size = 0;
        this.verifiableEntityHeader_Reserved1 = 0;
        this.signature = signature;
        this.signerPublicKey = signerPublicKey;
        this.entityBody_Reserved1 = 0;
        this.version = version;
        this.network = network;
        this.type = type;
        this.fee = fee;
        this.deadline = deadline;
    }
    TransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var size = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        var verifiableEntityHeader_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        var signature = SignatureDto_1.SignatureDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signature.getSize());
        var signerPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signerPublicKey.getSize());
        var entityBody_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        var version = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var network = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var type = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        var fee = AmountDto_1.AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, fee.getSize());
        var deadline = TimestampDto_1.TimestampDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, deadline.getSize());
        return new TransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline);
    };
    TransactionBuilder.prototype.getVerifiableEntityHeader_Reserved1 = function () {
        return this.verifiableEntityHeader_Reserved1;
    };
    TransactionBuilder.prototype.getSignature = function () {
        return this.signature;
    };
    TransactionBuilder.prototype.getSignerPublicKey = function () {
        return this.signerPublicKey;
    };
    TransactionBuilder.prototype.getEntityBody_Reserved1 = function () {
        return this.entityBody_Reserved1;
    };
    TransactionBuilder.prototype.getVersion = function () {
        return this.version;
    };
    TransactionBuilder.prototype.getNetwork = function () {
        return this.network;
    };
    TransactionBuilder.prototype.getType = function () {
        return this.type;
    };
    TransactionBuilder.prototype.getFee = function () {
        return this.fee;
    };
    TransactionBuilder.prototype.getDeadline = function () {
        return this.deadline;
    };
    TransactionBuilder.prototype.getSize = function () {
        var size = 0;
        size += 4;
        size += 4;
        size += this.signature.getSize();
        size += this.signerPublicKey.getSize();
        size += 4;
        size += 1;
        size += 1;
        size += 2;
        size += this.fee.getSize();
        size += this.deadline.getSize();
        return size;
    };
    TransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var sizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getSize(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, sizeBytes);
        var verifiableEntityHeader_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getVerifiableEntityHeader_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, verifiableEntityHeader_Reserved1Bytes);
        var signatureBytes = this.signature.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, signatureBytes);
        var signerPublicKeyBytes = this.signerPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, signerPublicKeyBytes);
        var entityBody_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getEntityBody_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, entityBody_Reserved1Bytes);
        var versionBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getVersion(), 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, versionBytes);
        var networkBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.network, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, networkBytes);
        var typeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.type, 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, typeBytes);
        var feeBytes = this.fee.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, feeBytes);
        var deadlineBytes = this.deadline.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, deadlineBytes);
        return newArray;
    };
    return TransactionBuilder;
}());
exports.TransactionBuilder = TransactionBuilder;

},{"./AmountDto":28,"./GeneratorUtils":60,"./KeyDto":75,"./SignatureDto":128,"./TimestampDto":129}],131:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccountAddressRestrictionTransactionBuilder_1 = require("./AccountAddressRestrictionTransactionBuilder");
var AccountLinkTransactionBuilder_1 = require("./AccountLinkTransactionBuilder");
var AccountMetadataTransactionBuilder_1 = require("./AccountMetadataTransactionBuilder");
var AccountMosaicRestrictionTransactionBuilder_1 = require("./AccountMosaicRestrictionTransactionBuilder");
var AccountOperationRestrictionTransactionBuilder_1 = require("./AccountOperationRestrictionTransactionBuilder");
var AddressAliasTransactionBuilder_1 = require("./AddressAliasTransactionBuilder");
var AggregateBondedTransactionBuilder_1 = require("./AggregateBondedTransactionBuilder");
var AggregateCompleteTransactionBuilder_1 = require("./AggregateCompleteTransactionBuilder");
var EntityTypeDto_1 = require("./EntityTypeDto");
var HashLockTransactionBuilder_1 = require("./HashLockTransactionBuilder");
var MosaicAddressRestrictionTransactionBuilder_1 = require("./MosaicAddressRestrictionTransactionBuilder");
var MosaicAliasTransactionBuilder_1 = require("./MosaicAliasTransactionBuilder");
var MosaicDefinitionTransactionBuilder_1 = require("./MosaicDefinitionTransactionBuilder");
var MosaicGlobalRestrictionTransactionBuilder_1 = require("./MosaicGlobalRestrictionTransactionBuilder");
var MosaicMetadataTransactionBuilder_1 = require("./MosaicMetadataTransactionBuilder");
var MosaicSupplyChangeTransactionBuilder_1 = require("./MosaicSupplyChangeTransactionBuilder");
var MultisigAccountModificationTransactionBuilder_1 = require("./MultisigAccountModificationTransactionBuilder");
var NamespaceMetadataTransactionBuilder_1 = require("./NamespaceMetadataTransactionBuilder");
var NamespaceRegistrationTransactionBuilder_1 = require("./NamespaceRegistrationTransactionBuilder");
var SecretLockTransactionBuilder_1 = require("./SecretLockTransactionBuilder");
var SecretProofTransactionBuilder_1 = require("./SecretProofTransactionBuilder");
var TransactionBuilder_1 = require("./TransactionBuilder");
var TransferTransactionBuilder_1 = require("./TransferTransactionBuilder");
var TransactionHelper = (function () {
    function TransactionHelper() {
    }
    TransactionHelper.loadFromBinary = function (bytes) {
        var header = TransactionBuilder_1.TransactionBuilder.loadFromBinary(bytes);
        switch (header.getType()) {
            case EntityTypeDto_1.EntityTypeDto.ACCOUNT_LINK_TRANSACTION_BUILDER:
                return AccountLinkTransactionBuilder_1.AccountLinkTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.AGGREGATE_COMPLETE_TRANSACTION_BUILDER:
                return AggregateCompleteTransactionBuilder_1.AggregateCompleteTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.AGGREGATE_BONDED_TRANSACTION_BUILDER:
                return AggregateBondedTransactionBuilder_1.AggregateBondedTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.HASH_LOCK_TRANSACTION_BUILDER:
                return HashLockTransactionBuilder_1.HashLockTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.SECRET_LOCK_TRANSACTION_BUILDER:
                return SecretLockTransactionBuilder_1.SecretLockTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.SECRET_PROOF_TRANSACTION_BUILDER:
                return SecretProofTransactionBuilder_1.SecretProofTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.ACCOUNT_METADATA_TRANSACTION_BUILDER:
                return AccountMetadataTransactionBuilder_1.AccountMetadataTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.MOSAIC_METADATA_TRANSACTION_BUILDER:
                return MosaicMetadataTransactionBuilder_1.MosaicMetadataTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.NAMESPACE_METADATA_TRANSACTION_BUILDER:
                return NamespaceMetadataTransactionBuilder_1.NamespaceMetadataTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.MOSAIC_DEFINITION_TRANSACTION_BUILDER:
                return MosaicDefinitionTransactionBuilder_1.MosaicDefinitionTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.MOSAIC_SUPPLY_CHANGE_TRANSACTION_BUILDER:
                return MosaicSupplyChangeTransactionBuilder_1.MosaicSupplyChangeTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.MULTISIG_ACCOUNT_MODIFICATION_TRANSACTION_BUILDER:
                return MultisigAccountModificationTransactionBuilder_1.MultisigAccountModificationTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.ADDRESS_ALIAS_TRANSACTION_BUILDER:
                return AddressAliasTransactionBuilder_1.AddressAliasTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.MOSAIC_ALIAS_TRANSACTION_BUILDER:
                return MosaicAliasTransactionBuilder_1.MosaicAliasTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.NAMESPACE_REGISTRATION_TRANSACTION_BUILDER:
                return NamespaceRegistrationTransactionBuilder_1.NamespaceRegistrationTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.ACCOUNT_ADDRESS_RESTRICTION_TRANSACTION_BUILDER:
                return AccountAddressRestrictionTransactionBuilder_1.AccountAddressRestrictionTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.ACCOUNT_MOSAIC_RESTRICTION_TRANSACTION_BUILDER:
                return AccountMosaicRestrictionTransactionBuilder_1.AccountMosaicRestrictionTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.ACCOUNT_OPERATION_RESTRICTION_TRANSACTION_BUILDER:
                return AccountOperationRestrictionTransactionBuilder_1.AccountOperationRestrictionTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.MOSAIC_ADDRESS_RESTRICTION_TRANSACTION_BUILDER:
                return MosaicAddressRestrictionTransactionBuilder_1.MosaicAddressRestrictionTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.MOSAIC_GLOBAL_RESTRICTION_TRANSACTION_BUILDER:
                return MosaicGlobalRestrictionTransactionBuilder_1.MosaicGlobalRestrictionTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.TRANSFER_TRANSACTION_BUILDER:
                return TransferTransactionBuilder_1.TransferTransactionBuilder.loadFromBinary(bytes);
            default:
                throw new Error("Transaction type: " + header.getType() + " not recognized.");
        }
    };
    return TransactionHelper;
}());
exports.TransactionHelper = TransactionHelper;

},{"./AccountAddressRestrictionTransactionBuilder":2,"./AccountLinkTransactionBuilder":4,"./AccountMetadataTransactionBuilder":6,"./AccountMosaicRestrictionTransactionBuilder":8,"./AccountOperationRestrictionTransactionBuilder":10,"./AddressAliasTransactionBuilder":19,"./AggregateBondedTransactionBuilder":25,"./AggregateCompleteTransactionBuilder":26,"./EntityTypeDto":58,"./HashLockTransactionBuilder":67,"./MosaicAddressRestrictionTransactionBuilder":80,"./MosaicAliasTransactionBuilder":82,"./MosaicDefinitionTransactionBuilder":86,"./MosaicGlobalRestrictionTransactionBuilder":91,"./MosaicMetadataTransactionBuilder":94,"./MosaicSupplyChangeTransactionBuilder":103,"./MultisigAccountModificationTransactionBuilder":105,"./NamespaceMetadataTransactionBuilder":113,"./NamespaceRegistrationTransactionBuilder":116,"./SecretLockTransactionBuilder":125,"./SecretProofTransactionBuilder":127,"./TransactionBuilder":130,"./TransferTransactionBuilder":133}],132:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
var UnresolvedMosaicBuilder_1 = require("./UnresolvedMosaicBuilder");
var TransferTransactionBodyBuilder = (function () {
    function TransferTransactionBodyBuilder(recipientAddress, mosaics, message) {
        this.recipientAddress = recipientAddress;
        this.transferTransactionBody_Reserved1 = 0;
        this.mosaics = mosaics;
        this.message = message;
    }
    TransferTransactionBodyBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var recipientAddress = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, recipientAddress.getSize());
        var mosaicsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        var messageSize = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        var transferTransactionBody_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        var mosaics = [];
        for (var i = 0; i < (Array.isArray(mosaicsCount) ? GeneratorUtils_1.GeneratorUtils.compact(mosaicsCount) : mosaicsCount); i++) {
            var item = UnresolvedMosaicBuilder_1.UnresolvedMosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
            mosaics.push(item);
            byteArray.splice(0, item.getSize());
        }
        var message = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), messageSize);
        byteArray.splice(0, messageSize);
        return new TransferTransactionBodyBuilder(recipientAddress, mosaics, message);
    };
    TransferTransactionBodyBuilder.prototype.getRecipientAddress = function () {
        return this.recipientAddress;
    };
    TransferTransactionBodyBuilder.prototype.getTransferTransactionBody_Reserved1 = function () {
        return this.transferTransactionBody_Reserved1;
    };
    TransferTransactionBodyBuilder.prototype.getMosaics = function () {
        return this.mosaics;
    };
    TransferTransactionBodyBuilder.prototype.getMessage = function () {
        return this.message;
    };
    TransferTransactionBodyBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.recipientAddress.getSize();
        size += 1;
        size += 2;
        size += 4;
        this.mosaics.forEach(function (o) { return size += o.getSize(); });
        size += this.message.length;
        return size;
    };
    TransferTransactionBodyBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var recipientAddressBytes = this.recipientAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, recipientAddressBytes);
        var mosaicsCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.mosaics.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicsCountBytes);
        var messageSizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.message.length, 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, messageSizeBytes);
        var transferTransactionBody_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getTransferTransactionBody_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, transferTransactionBody_Reserved1Bytes);
        this.mosaics.forEach(function (item) {
            var mosaicsBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicsBytes);
        });
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.message);
        return newArray;
    };
    return TransferTransactionBodyBuilder;
}());
exports.TransferTransactionBodyBuilder = TransferTransactionBodyBuilder;

},{"./GeneratorUtils":60,"./UnresolvedAddressDto":134,"./UnresolvedMosaicBuilder":135}],133:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var TransactionBuilder_1 = require("./TransactionBuilder");
var TransferTransactionBodyBuilder_1 = require("./TransferTransactionBodyBuilder");
var TransferTransactionBuilder = (function (_super) {
    __extends(TransferTransactionBuilder, _super);
    function TransferTransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, mosaics, message) {
        var _this = _super.call(this, signature, signerPublicKey, version, network, type, fee, deadline) || this;
        _this.transferTransactionBody = new TransferTransactionBodyBuilder_1.TransferTransactionBodyBuilder(recipientAddress, mosaics, message);
        return _this;
    }
    TransferTransactionBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        var transferTransactionBody = TransferTransactionBodyBuilder_1.TransferTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, transferTransactionBody.getSize());
        return new TransferTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, transferTransactionBody.recipientAddress, transferTransactionBody.mosaics, transferTransactionBody.message);
    };
    TransferTransactionBuilder.prototype.getRecipientAddress = function () {
        return this.transferTransactionBody.getRecipientAddress();
    };
    TransferTransactionBuilder.prototype.getTransferTransactionBody_Reserved1 = function () {
        return this.transferTransactionBody.getTransferTransactionBody_Reserved1();
    };
    TransferTransactionBuilder.prototype.getMosaics = function () {
        return this.transferTransactionBody.getMosaics();
    };
    TransferTransactionBuilder.prototype.getMessage = function () {
        return this.transferTransactionBody.getMessage();
    };
    TransferTransactionBuilder.prototype.getSize = function () {
        var size = _super.prototype.getSize.call(this);
        size += this.transferTransactionBody.getSize();
        return size;
    };
    TransferTransactionBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var superBytes = _super.prototype.serialize.call(this);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        var transferTransactionBodyBytes = this.transferTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, transferTransactionBodyBytes);
        return newArray;
    };
    return TransferTransactionBuilder;
}(TransactionBuilder_1.TransactionBuilder));
exports.TransferTransactionBuilder = TransferTransactionBuilder;

},{"./GeneratorUtils":60,"./TransactionBuilder":130,"./TransferTransactionBodyBuilder":132}],134:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var UnresolvedAddressDto = (function () {
    function UnresolvedAddressDto(unresolvedAddress) {
        this.unresolvedAddress = unresolvedAddress;
    }
    UnresolvedAddressDto.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var unresolvedAddress = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 25);
        byteArray.splice(0, 25);
        return new UnresolvedAddressDto(unresolvedAddress);
    };
    UnresolvedAddressDto.prototype.getUnresolvedAddress = function () {
        return this.unresolvedAddress;
    };
    UnresolvedAddressDto.prototype.getSize = function () {
        return 25;
    };
    UnresolvedAddressDto.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.unresolvedAddress);
        return newArray;
    };
    return UnresolvedAddressDto;
}());
exports.UnresolvedAddressDto = UnresolvedAddressDto;

},{"./GeneratorUtils":60}],135:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AmountDto_1 = require("./AmountDto");
var GeneratorUtils_1 = require("./GeneratorUtils");
var UnresolvedMosaicIdDto_1 = require("./UnresolvedMosaicIdDto");
var UnresolvedMosaicBuilder = (function () {
    function UnresolvedMosaicBuilder(mosaicId, amount) {
        this.mosaicId = mosaicId;
        this.amount = amount;
    }
    UnresolvedMosaicBuilder.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var mosaicId = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        var amount = AmountDto_1.AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, amount.getSize());
        return new UnresolvedMosaicBuilder(mosaicId, amount);
    };
    UnresolvedMosaicBuilder.prototype.getMosaicId = function () {
        return this.mosaicId;
    };
    UnresolvedMosaicBuilder.prototype.getAmount = function () {
        return this.amount;
    };
    UnresolvedMosaicBuilder.prototype.getSize = function () {
        var size = 0;
        size += this.mosaicId.getSize();
        size += this.amount.getSize();
        return size;
    };
    UnresolvedMosaicBuilder.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        var amountBytes = this.amount.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, amountBytes);
        return newArray;
    };
    return UnresolvedMosaicBuilder;
}());
exports.UnresolvedMosaicBuilder = UnresolvedMosaicBuilder;

},{"./AmountDto":28,"./GeneratorUtils":60,"./UnresolvedMosaicIdDto":136}],136:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorUtils_1 = require("./GeneratorUtils");
var UnresolvedMosaicIdDto = (function () {
    function UnresolvedMosaicIdDto(unresolvedMosaicId) {
        this.unresolvedMosaicId = unresolvedMosaicId;
    }
    UnresolvedMosaicIdDto.loadFromBinary = function (payload) {
        var byteArray = Array.from(payload);
        var unresolvedMosaicId = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new UnresolvedMosaicIdDto(unresolvedMosaicId);
    };
    UnresolvedMosaicIdDto.prototype.getUnresolvedMosaicId = function () {
        return this.unresolvedMosaicId;
    };
    UnresolvedMosaicIdDto.prototype.getSize = function () {
        return 8;
    };
    UnresolvedMosaicIdDto.prototype.serialize = function () {
        var newArray = Uint8Array.from([]);
        var unresolvedMosaicIdBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getUnresolvedMosaicId());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, unresolvedMosaicIdBytes);
        return newArray;
    };
    return UnresolvedMosaicIdDto;
}());
exports.UnresolvedMosaicIdDto = UnresolvedMosaicIdDto;

},{"./GeneratorUtils":60}],"/node_modules/catbuffer-typescript":[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./AmountDto"));
__export(require("./BlockDurationDto"));
__export(require("./BlockFeeMultiplierDto"));
__export(require("./DifficultyDto"));
__export(require("./HeightDto"));
__export(require("./ImportanceDto"));
__export(require("./ImportanceHeightDto"));
__export(require("./UnresolvedMosaicIdDto"));
__export(require("./MosaicIdDto"));
__export(require("./TimestampDto"));
__export(require("./UnresolvedAddressDto"));
__export(require("./AddressDto"));
__export(require("./Hash256Dto"));
__export(require("./Hash512Dto"));
__export(require("./KeyDto"));
__export(require("./SignatureDto"));
__export(require("./MosaicBuilder"));
__export(require("./UnresolvedMosaicBuilder"));
__export(require("./TransactionBuilder"));
__export(require("./EmbeddedTransactionBuilder"));
__export(require("./AccountLinkTransactionBodyBuilder"));
__export(require("./AccountLinkTransactionBuilder"));
__export(require("./EmbeddedAccountLinkTransactionBuilder"));
__export(require("./CosignatureBuilder"));
__export(require("./DetachedCosignatureBuilder"));
__export(require("./AggregateTransactionBodyBuilder"));
__export(require("./AggregateCompleteTransactionBuilder"));
__export(require("./AggregateBondedTransactionBuilder"));
__export(require("./BlockHeaderBuilder"));
__export(require("./HashLockTransactionBodyBuilder"));
__export(require("./HashLockTransactionBuilder"));
__export(require("./EmbeddedHashLockTransactionBuilder"));
__export(require("./SecretLockTransactionBodyBuilder"));
__export(require("./SecretLockTransactionBuilder"));
__export(require("./EmbeddedSecretLockTransactionBuilder"));
__export(require("./SecretProofTransactionBodyBuilder"));
__export(require("./SecretProofTransactionBuilder"));
__export(require("./EmbeddedSecretProofTransactionBuilder"));
__export(require("./AccountMetadataTransactionBodyBuilder"));
__export(require("./AccountMetadataTransactionBuilder"));
__export(require("./EmbeddedAccountMetadataTransactionBuilder"));
__export(require("./MosaicMetadataTransactionBodyBuilder"));
__export(require("./MosaicMetadataTransactionBuilder"));
__export(require("./EmbeddedMosaicMetadataTransactionBuilder"));
__export(require("./NamespaceIdDto"));
__export(require("./NamespaceMetadataTransactionBodyBuilder"));
__export(require("./NamespaceMetadataTransactionBuilder"));
__export(require("./EmbeddedNamespaceMetadataTransactionBuilder"));
__export(require("./MosaicNonceDto"));
__export(require("./MosaicDefinitionTransactionBodyBuilder"));
__export(require("./MosaicDefinitionTransactionBuilder"));
__export(require("./EmbeddedMosaicDefinitionTransactionBuilder"));
__export(require("./MosaicSupplyChangeTransactionBodyBuilder"));
__export(require("./MosaicSupplyChangeTransactionBuilder"));
__export(require("./EmbeddedMosaicSupplyChangeTransactionBuilder"));
__export(require("./MultisigAccountModificationTransactionBodyBuilder"));
__export(require("./MultisigAccountModificationTransactionBuilder"));
__export(require("./EmbeddedMultisigAccountModificationTransactionBuilder"));
__export(require("./AddressAliasTransactionBodyBuilder"));
__export(require("./AddressAliasTransactionBuilder"));
__export(require("./EmbeddedAddressAliasTransactionBuilder"));
__export(require("./MosaicAliasTransactionBodyBuilder"));
__export(require("./MosaicAliasTransactionBuilder"));
__export(require("./EmbeddedMosaicAliasTransactionBuilder"));
__export(require("./ReceiptBuilder"));
__export(require("./BalanceTransferReceiptBuilder"));
__export(require("./BalanceChangeReceiptBuilder"));
__export(require("./InflationReceiptBuilder"));
__export(require("./MosaicExpiryReceiptBuilder"));
__export(require("./NamespaceExpiryReceiptBuilder"));
__export(require("./NamespaceRegistrationTransactionBodyBuilder"));
__export(require("./NamespaceRegistrationTransactionBuilder"));
__export(require("./EmbeddedNamespaceRegistrationTransactionBuilder"));
__export(require("./ReceiptSourceBuilder"));
__export(require("./AddressResolutionEntryBuilder"));
__export(require("./MosaicResolutionEntryBuilder"));
__export(require("./MosaicResolutionStatementBuilder"));
__export(require("./AddressResolutionStatementBuilder"));
__export(require("./AccountAddressRestrictionTransactionBodyBuilder"));
__export(require("./AccountAddressRestrictionTransactionBuilder"));
__export(require("./EmbeddedAccountAddressRestrictionTransactionBuilder"));
__export(require("./AccountMosaicRestrictionTransactionBodyBuilder"));
__export(require("./AccountMosaicRestrictionTransactionBuilder"));
__export(require("./EmbeddedAccountMosaicRestrictionTransactionBuilder"));
__export(require("./AccountOperationRestrictionTransactionBodyBuilder"));
__export(require("./AccountOperationRestrictionTransactionBuilder"));
__export(require("./EmbeddedAccountOperationRestrictionTransactionBuilder"));
__export(require("./MosaicAddressRestrictionTransactionBodyBuilder"));
__export(require("./MosaicAddressRestrictionTransactionBuilder"));
__export(require("./EmbeddedMosaicAddressRestrictionTransactionBuilder"));
__export(require("./MosaicRestrictionKeyDto"));
__export(require("./MosaicGlobalRestrictionTransactionBodyBuilder"));
__export(require("./MosaicGlobalRestrictionTransactionBuilder"));
__export(require("./EmbeddedMosaicGlobalRestrictionTransactionBuilder"));
__export(require("./ImportanceSnapshotBuilder"));
__export(require("./HeightActivityBucketBuilder"));
__export(require("./HeightActivityBucketsBuilder"));
__export(require("./AccountStateBuilder"));
__export(require("./HashLockInfoBuilder"));
__export(require("./ScopedMetadataKeyDto"));
__export(require("./MetadataValueBuilder"));
__export(require("./MetadataEntryBuilder"));
__export(require("./MosaicPropertiesBuilder"));
__export(require("./MosaicDefinitionBuilder"));
__export(require("./MosaicEntryBuilder"));
__export(require("./MultisigEntryBuilder"));
__export(require("./NamespaceLifetimeBuilder"));
__export(require("./NamespaceAliasBuilder"));
__export(require("./NamespacePathBuilder"));
__export(require("./RootNamespaceHistoryBuilder"));
__export(require("./AccountRestrictionAddressValueBuilder"));
__export(require("./AccountRestrictionMosaicValueBuilder"));
__export(require("./AccountRestrictionTransactionTypeValueBuilder"));
__export(require("./AccountRestrictionsInfoBuilder"));
__export(require("./AccountRestrictionsBuilder"));
__export(require("./AddressKeyValueBuilder"));
__export(require("./AddressKeyValueSetBuilder"));
__export(require("./RestrictionRuleBuilder"));
__export(require("./GlobalKeyValueBuilder"));
__export(require("./GlobalKeyValueSetBuilder"));
__export(require("./MosaicAddressRestrictionEntryBuilder"));
__export(require("./MosaicGlobalRestrictionEntryBuilder"));
__export(require("./MosaicRestrictionEntryBuilder"));
__export(require("./SecretLockInfoBuilder"));
__export(require("./TransferTransactionBodyBuilder"));
__export(require("./TransferTransactionBuilder"));
__export(require("./EmbeddedTransferTransactionBuilder"));
__export(require("./EmbeddedTransactionHelper"));
__export(require("./TransactionHelper"));
__export(require("./GeneratorUtils"));

},{"./AccountAddressRestrictionTransactionBodyBuilder":1,"./AccountAddressRestrictionTransactionBuilder":2,"./AccountLinkTransactionBodyBuilder":3,"./AccountLinkTransactionBuilder":4,"./AccountMetadataTransactionBodyBuilder":5,"./AccountMetadataTransactionBuilder":6,"./AccountMosaicRestrictionTransactionBodyBuilder":7,"./AccountMosaicRestrictionTransactionBuilder":8,"./AccountOperationRestrictionTransactionBodyBuilder":9,"./AccountOperationRestrictionTransactionBuilder":10,"./AccountRestrictionAddressValueBuilder":11,"./AccountRestrictionMosaicValueBuilder":12,"./AccountRestrictionTransactionTypeValueBuilder":13,"./AccountRestrictionsBuilder":14,"./AccountRestrictionsInfoBuilder":15,"./AccountStateBuilder":16,"./AddressAliasTransactionBodyBuilder":18,"./AddressAliasTransactionBuilder":19,"./AddressDto":20,"./AddressKeyValueBuilder":21,"./AddressKeyValueSetBuilder":22,"./AddressResolutionEntryBuilder":23,"./AddressResolutionStatementBuilder":24,"./AggregateBondedTransactionBuilder":25,"./AggregateCompleteTransactionBuilder":26,"./AggregateTransactionBodyBuilder":27,"./AmountDto":28,"./BalanceChangeReceiptBuilder":29,"./BalanceTransferReceiptBuilder":30,"./BlockDurationDto":31,"./BlockFeeMultiplierDto":32,"./BlockHeaderBuilder":33,"./CosignatureBuilder":34,"./DetachedCosignatureBuilder":35,"./DifficultyDto":36,"./EmbeddedAccountAddressRestrictionTransactionBuilder":37,"./EmbeddedAccountLinkTransactionBuilder":38,"./EmbeddedAccountMetadataTransactionBuilder":39,"./EmbeddedAccountMosaicRestrictionTransactionBuilder":40,"./EmbeddedAccountOperationRestrictionTransactionBuilder":41,"./EmbeddedAddressAliasTransactionBuilder":42,"./EmbeddedHashLockTransactionBuilder":43,"./EmbeddedMosaicAddressRestrictionTransactionBuilder":44,"./EmbeddedMosaicAliasTransactionBuilder":45,"./EmbeddedMosaicDefinitionTransactionBuilder":46,"./EmbeddedMosaicGlobalRestrictionTransactionBuilder":47,"./EmbeddedMosaicMetadataTransactionBuilder":48,"./EmbeddedMosaicSupplyChangeTransactionBuilder":49,"./EmbeddedMultisigAccountModificationTransactionBuilder":50,"./EmbeddedNamespaceMetadataTransactionBuilder":51,"./EmbeddedNamespaceRegistrationTransactionBuilder":52,"./EmbeddedSecretLockTransactionBuilder":53,"./EmbeddedSecretProofTransactionBuilder":54,"./EmbeddedTransactionBuilder":55,"./EmbeddedTransactionHelper":56,"./EmbeddedTransferTransactionBuilder":57,"./GeneratorUtils":60,"./GlobalKeyValueBuilder":61,"./GlobalKeyValueSetBuilder":62,"./Hash256Dto":63,"./Hash512Dto":64,"./HashLockInfoBuilder":65,"./HashLockTransactionBodyBuilder":66,"./HashLockTransactionBuilder":67,"./HeightActivityBucketBuilder":68,"./HeightActivityBucketsBuilder":69,"./HeightDto":70,"./ImportanceDto":71,"./ImportanceHeightDto":72,"./ImportanceSnapshotBuilder":73,"./InflationReceiptBuilder":74,"./KeyDto":75,"./MetadataEntryBuilder":76,"./MetadataValueBuilder":77,"./MosaicAddressRestrictionEntryBuilder":78,"./MosaicAddressRestrictionTransactionBodyBuilder":79,"./MosaicAddressRestrictionTransactionBuilder":80,"./MosaicAliasTransactionBodyBuilder":81,"./MosaicAliasTransactionBuilder":82,"./MosaicBuilder":83,"./MosaicDefinitionBuilder":84,"./MosaicDefinitionTransactionBodyBuilder":85,"./MosaicDefinitionTransactionBuilder":86,"./MosaicEntryBuilder":87,"./MosaicExpiryReceiptBuilder":88,"./MosaicGlobalRestrictionEntryBuilder":89,"./MosaicGlobalRestrictionTransactionBodyBuilder":90,"./MosaicGlobalRestrictionTransactionBuilder":91,"./MosaicIdDto":92,"./MosaicMetadataTransactionBodyBuilder":93,"./MosaicMetadataTransactionBuilder":94,"./MosaicNonceDto":95,"./MosaicPropertiesBuilder":96,"./MosaicResolutionEntryBuilder":97,"./MosaicResolutionStatementBuilder":98,"./MosaicRestrictionEntryBuilder":99,"./MosaicRestrictionKeyDto":101,"./MosaicSupplyChangeTransactionBodyBuilder":102,"./MosaicSupplyChangeTransactionBuilder":103,"./MultisigAccountModificationTransactionBodyBuilder":104,"./MultisigAccountModificationTransactionBuilder":105,"./MultisigEntryBuilder":106,"./NamespaceAliasBuilder":107,"./NamespaceExpiryReceiptBuilder":109,"./NamespaceIdDto":110,"./NamespaceLifetimeBuilder":111,"./NamespaceMetadataTransactionBodyBuilder":112,"./NamespaceMetadataTransactionBuilder":113,"./NamespacePathBuilder":114,"./NamespaceRegistrationTransactionBodyBuilder":115,"./NamespaceRegistrationTransactionBuilder":116,"./ReceiptBuilder":118,"./ReceiptSourceBuilder":119,"./RestrictionRuleBuilder":120,"./RootNamespaceHistoryBuilder":121,"./ScopedMetadataKeyDto":122,"./SecretLockInfoBuilder":123,"./SecretLockTransactionBodyBuilder":124,"./SecretLockTransactionBuilder":125,"./SecretProofTransactionBodyBuilder":126,"./SecretProofTransactionBuilder":127,"./SignatureDto":128,"./TimestampDto":129,"./TransactionBuilder":130,"./TransactionHelper":131,"./TransferTransactionBodyBuilder":132,"./TransferTransactionBuilder":133,"./UnresolvedAddressDto":134,"./UnresolvedMosaicBuilder":135,"./UnresolvedMosaicIdDto":136}]},{},[]);
