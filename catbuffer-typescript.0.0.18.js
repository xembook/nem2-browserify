require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
class AccountAddressRestrictionTransactionBodyBuilder {
    constructor(restrictionFlags, restrictionAdditions, restrictionDeletions) {
        this.restrictionFlags = restrictionFlags;
        this.accountRestrictionTransactionBody_Reserved1 = 0;
        this.restrictionAdditions = restrictionAdditions;
        this.restrictionDeletions = restrictionDeletions;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const restrictionFlags = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        const restrictionAdditionsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const restrictionDeletionsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const accountRestrictionTransactionBody_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        const restrictionAdditions = [];
        for (let i = 0; i < (Array.isArray(restrictionAdditionsCount) ? GeneratorUtils_1.GeneratorUtils.compact(restrictionAdditionsCount) : restrictionAdditionsCount); i++) {
            const item = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
            restrictionAdditions.push(item);
            byteArray.splice(0, item.getSize());
        }
        const restrictionDeletions = [];
        for (let i = 0; i < (Array.isArray(restrictionDeletionsCount) ? GeneratorUtils_1.GeneratorUtils.compact(restrictionDeletionsCount) : restrictionDeletionsCount); i++) {
            const item = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
            restrictionDeletions.push(item);
            byteArray.splice(0, item.getSize());
        }
        return new AccountAddressRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
    }
    getRestrictionFlags() {
        return this.restrictionFlags;
    }
    getAccountRestrictionTransactionBody_Reserved1() {
        return this.accountRestrictionTransactionBody_Reserved1;
    }
    getRestrictionAdditions() {
        return this.restrictionAdditions;
    }
    getRestrictionDeletions() {
        return this.restrictionDeletions;
    }
    getSize() {
        let size = 0;
        size += 2;
        size += 1;
        size += 1;
        size += 4;
        this.restrictionAdditions.forEach((o) => size += o.getSize());
        this.restrictionDeletions.forEach((o) => size += o.getSize());
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const restrictionFlagsBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getRestrictionFlags(), 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionFlagsBytes);
        const restrictionAdditionsCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.restrictionAdditions.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionAdditionsCountBytes);
        const restrictionDeletionsCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.restrictionDeletions.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionDeletionsCountBytes);
        const accountRestrictionTransactionBody_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getAccountRestrictionTransactionBody_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountRestrictionTransactionBody_Reserved1Bytes);
        this.restrictionAdditions.forEach((item) => {
            const restrictionAdditionsBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionAdditionsBytes);
        });
        this.restrictionDeletions.forEach((item) => {
            const restrictionDeletionsBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionDeletionsBytes);
        });
        return newArray;
    }
}
exports.AccountAddressRestrictionTransactionBodyBuilder = AccountAddressRestrictionTransactionBodyBuilder;

},{"./GeneratorUtils":64,"./UnresolvedAddressDto":143}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountAddressRestrictionTransactionBodyBuilder_1 = require("./AccountAddressRestrictionTransactionBodyBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
class AccountAddressRestrictionTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.accountAddressRestrictionTransactionBody = new AccountAddressRestrictionTransactionBodyBuilder_1.AccountAddressRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const accountAddressRestrictionTransactionBody = AccountAddressRestrictionTransactionBodyBuilder_1.AccountAddressRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountAddressRestrictionTransactionBody.getSize());
        return new AccountAddressRestrictionTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, accountAddressRestrictionTransactionBody.restrictionFlags, accountAddressRestrictionTransactionBody.restrictionAdditions, accountAddressRestrictionTransactionBody.restrictionDeletions);
    }
    getRestrictionFlags() {
        return this.accountAddressRestrictionTransactionBody.getRestrictionFlags();
    }
    getAccountRestrictionTransactionBody_Reserved1() {
        return this.accountAddressRestrictionTransactionBody.getAccountRestrictionTransactionBody_Reserved1();
    }
    getRestrictionAdditions() {
        return this.accountAddressRestrictionTransactionBody.getRestrictionAdditions();
    }
    getRestrictionDeletions() {
        return this.accountAddressRestrictionTransactionBody.getRestrictionDeletions();
    }
    getSize() {
        let size = super.getSize();
        size += this.accountAddressRestrictionTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const accountAddressRestrictionTransactionBodyBytes = this.accountAddressRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountAddressRestrictionTransactionBodyBytes);
        return newArray;
    }
}
exports.AccountAddressRestrictionTransactionBuilder = AccountAddressRestrictionTransactionBuilder;

},{"./AccountAddressRestrictionTransactionBodyBuilder":1,"./GeneratorUtils":64,"./TransactionBuilder":139}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccountKeyFlagsDto;
(function (AccountKeyFlagsDto) {
    AccountKeyFlagsDto[AccountKeyFlagsDto["UNSET"] = 0] = "UNSET";
    AccountKeyFlagsDto[AccountKeyFlagsDto["LINKED"] = 1] = "LINKED";
    AccountKeyFlagsDto[AccountKeyFlagsDto["VRF"] = 2] = "VRF";
    AccountKeyFlagsDto[AccountKeyFlagsDto["VOTING"] = 4] = "VOTING";
    AccountKeyFlagsDto[AccountKeyFlagsDto["NODE"] = 8] = "NODE";
})(AccountKeyFlagsDto = exports.AccountKeyFlagsDto || (exports.AccountKeyFlagsDto = {}));

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const KeyDto_1 = require("./KeyDto");
class AccountKeyLinkTransactionBodyBuilder {
    constructor(remotePublicKey, linkAction) {
        this.remotePublicKey = remotePublicKey;
        this.linkAction = linkAction;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const remotePublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, remotePublicKey.getSize());
        const linkAction = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        return new AccountKeyLinkTransactionBodyBuilder(remotePublicKey, linkAction);
    }
    getRemotePublicKey() {
        return this.remotePublicKey;
    }
    getLinkAction() {
        return this.linkAction;
    }
    getSize() {
        let size = 0;
        size += this.remotePublicKey.getSize();
        size += 1;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const remotePublicKeyBytes = this.remotePublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, remotePublicKeyBytes);
        const linkActionBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.linkAction, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, linkActionBytes);
        return newArray;
    }
}
exports.AccountKeyLinkTransactionBodyBuilder = AccountKeyLinkTransactionBodyBuilder;

},{"./GeneratorUtils":64,"./KeyDto":79}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountKeyLinkTransactionBodyBuilder_1 = require("./AccountKeyLinkTransactionBodyBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
class AccountKeyLinkTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, remotePublicKey, linkAction) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.accountKeyLinkTransactionBody = new AccountKeyLinkTransactionBodyBuilder_1.AccountKeyLinkTransactionBodyBuilder(remotePublicKey, linkAction);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const accountKeyLinkTransactionBody = AccountKeyLinkTransactionBodyBuilder_1.AccountKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountKeyLinkTransactionBody.getSize());
        return new AccountKeyLinkTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, accountKeyLinkTransactionBody.remotePublicKey, accountKeyLinkTransactionBody.linkAction);
    }
    getRemotePublicKey() {
        return this.accountKeyLinkTransactionBody.getRemotePublicKey();
    }
    getLinkAction() {
        return this.accountKeyLinkTransactionBody.getLinkAction();
    }
    getSize() {
        let size = super.getSize();
        size += this.accountKeyLinkTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const accountKeyLinkTransactionBodyBytes = this.accountKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountKeyLinkTransactionBodyBytes);
        return newArray;
    }
}
exports.AccountKeyLinkTransactionBuilder = AccountKeyLinkTransactionBuilder;

},{"./AccountKeyLinkTransactionBodyBuilder":4,"./GeneratorUtils":64,"./TransactionBuilder":139}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const KeyDto_1 = require("./KeyDto");
class AccountMetadataTransactionBodyBuilder {
    constructor(targetPublicKey, scopedMetadataKey, valueSizeDelta, value) {
        this.targetPublicKey = targetPublicKey;
        this.scopedMetadataKey = scopedMetadataKey;
        this.valueSizeDelta = valueSizeDelta;
        this.value = value;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const targetPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetPublicKey.getSize());
        const scopedMetadataKey = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        const valueSizeDelta = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        const valueSize = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        const value = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), valueSize);
        byteArray.splice(0, valueSize);
        return new AccountMetadataTransactionBodyBuilder(targetPublicKey, scopedMetadataKey, valueSizeDelta, value);
    }
    getTargetPublicKey() {
        return this.targetPublicKey;
    }
    getScopedMetadataKey() {
        return this.scopedMetadataKey;
    }
    getValueSizeDelta() {
        return this.valueSizeDelta;
    }
    getValue() {
        return this.value;
    }
    getSize() {
        let size = 0;
        size += this.targetPublicKey.getSize();
        size += 8;
        size += 2;
        size += 2;
        size += this.value.length;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const targetPublicKeyBytes = this.targetPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetPublicKeyBytes);
        const scopedMetadataKeyBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getScopedMetadataKey());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, scopedMetadataKeyBytes);
        const valueSizeDeltaBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getValueSizeDelta(), 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueSizeDeltaBytes);
        const valueSizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.value.length, 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueSizeBytes);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.value);
        return newArray;
    }
}
exports.AccountMetadataTransactionBodyBuilder = AccountMetadataTransactionBodyBuilder;

},{"./GeneratorUtils":64,"./KeyDto":79}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountMetadataTransactionBodyBuilder_1 = require("./AccountMetadataTransactionBodyBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
class AccountMetadataTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, targetPublicKey, scopedMetadataKey, valueSizeDelta, value) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.accountMetadataTransactionBody = new AccountMetadataTransactionBodyBuilder_1.AccountMetadataTransactionBodyBuilder(targetPublicKey, scopedMetadataKey, valueSizeDelta, value);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const accountMetadataTransactionBody = AccountMetadataTransactionBodyBuilder_1.AccountMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountMetadataTransactionBody.getSize());
        return new AccountMetadataTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, accountMetadataTransactionBody.targetPublicKey, accountMetadataTransactionBody.scopedMetadataKey, accountMetadataTransactionBody.valueSizeDelta, accountMetadataTransactionBody.value);
    }
    getTargetPublicKey() {
        return this.accountMetadataTransactionBody.getTargetPublicKey();
    }
    getScopedMetadataKey() {
        return this.accountMetadataTransactionBody.getScopedMetadataKey();
    }
    getValueSizeDelta() {
        return this.accountMetadataTransactionBody.getValueSizeDelta();
    }
    getValue() {
        return this.accountMetadataTransactionBody.getValue();
    }
    getSize() {
        let size = super.getSize();
        size += this.accountMetadataTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const accountMetadataTransactionBodyBytes = this.accountMetadataTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountMetadataTransactionBodyBytes);
        return newArray;
    }
}
exports.AccountMetadataTransactionBuilder = AccountMetadataTransactionBuilder;

},{"./AccountMetadataTransactionBodyBuilder":6,"./GeneratorUtils":64,"./TransactionBuilder":139}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const UnresolvedMosaicIdDto_1 = require("./UnresolvedMosaicIdDto");
class AccountMosaicRestrictionTransactionBodyBuilder {
    constructor(restrictionFlags, restrictionAdditions, restrictionDeletions) {
        this.restrictionFlags = restrictionFlags;
        this.accountRestrictionTransactionBody_Reserved1 = 0;
        this.restrictionAdditions = restrictionAdditions;
        this.restrictionDeletions = restrictionDeletions;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const restrictionFlags = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        const restrictionAdditionsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const restrictionDeletionsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const accountRestrictionTransactionBody_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        const restrictionAdditions = [];
        for (let i = 0; i < (Array.isArray(restrictionAdditionsCount) ? GeneratorUtils_1.GeneratorUtils.compact(restrictionAdditionsCount) : restrictionAdditionsCount); i++) {
            const item = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
            restrictionAdditions.push(item);
            byteArray.splice(0, item.getSize());
        }
        const restrictionDeletions = [];
        for (let i = 0; i < (Array.isArray(restrictionDeletionsCount) ? GeneratorUtils_1.GeneratorUtils.compact(restrictionDeletionsCount) : restrictionDeletionsCount); i++) {
            const item = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
            restrictionDeletions.push(item);
            byteArray.splice(0, item.getSize());
        }
        return new AccountMosaicRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
    }
    getRestrictionFlags() {
        return this.restrictionFlags;
    }
    getAccountRestrictionTransactionBody_Reserved1() {
        return this.accountRestrictionTransactionBody_Reserved1;
    }
    getRestrictionAdditions() {
        return this.restrictionAdditions;
    }
    getRestrictionDeletions() {
        return this.restrictionDeletions;
    }
    getSize() {
        let size = 0;
        size += 2;
        size += 1;
        size += 1;
        size += 4;
        this.restrictionAdditions.forEach((o) => size += o.getSize());
        this.restrictionDeletions.forEach((o) => size += o.getSize());
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const restrictionFlagsBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getRestrictionFlags(), 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionFlagsBytes);
        const restrictionAdditionsCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.restrictionAdditions.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionAdditionsCountBytes);
        const restrictionDeletionsCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.restrictionDeletions.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionDeletionsCountBytes);
        const accountRestrictionTransactionBody_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getAccountRestrictionTransactionBody_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountRestrictionTransactionBody_Reserved1Bytes);
        this.restrictionAdditions.forEach((item) => {
            const restrictionAdditionsBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionAdditionsBytes);
        });
        this.restrictionDeletions.forEach((item) => {
            const restrictionDeletionsBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionDeletionsBytes);
        });
        return newArray;
    }
}
exports.AccountMosaicRestrictionTransactionBodyBuilder = AccountMosaicRestrictionTransactionBodyBuilder;

},{"./GeneratorUtils":64,"./UnresolvedMosaicIdDto":145}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountMosaicRestrictionTransactionBodyBuilder_1 = require("./AccountMosaicRestrictionTransactionBodyBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
class AccountMosaicRestrictionTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.accountMosaicRestrictionTransactionBody = new AccountMosaicRestrictionTransactionBodyBuilder_1.AccountMosaicRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const accountMosaicRestrictionTransactionBody = AccountMosaicRestrictionTransactionBodyBuilder_1.AccountMosaicRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountMosaicRestrictionTransactionBody.getSize());
        return new AccountMosaicRestrictionTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, accountMosaicRestrictionTransactionBody.restrictionFlags, accountMosaicRestrictionTransactionBody.restrictionAdditions, accountMosaicRestrictionTransactionBody.restrictionDeletions);
    }
    getRestrictionFlags() {
        return this.accountMosaicRestrictionTransactionBody.getRestrictionFlags();
    }
    getAccountRestrictionTransactionBody_Reserved1() {
        return this.accountMosaicRestrictionTransactionBody.getAccountRestrictionTransactionBody_Reserved1();
    }
    getRestrictionAdditions() {
        return this.accountMosaicRestrictionTransactionBody.getRestrictionAdditions();
    }
    getRestrictionDeletions() {
        return this.accountMosaicRestrictionTransactionBody.getRestrictionDeletions();
    }
    getSize() {
        let size = super.getSize();
        size += this.accountMosaicRestrictionTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const accountMosaicRestrictionTransactionBodyBytes = this.accountMosaicRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountMosaicRestrictionTransactionBodyBytes);
        return newArray;
    }
}
exports.AccountMosaicRestrictionTransactionBuilder = AccountMosaicRestrictionTransactionBuilder;

},{"./AccountMosaicRestrictionTransactionBodyBuilder":8,"./GeneratorUtils":64,"./TransactionBuilder":139}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class AccountOperationRestrictionTransactionBodyBuilder {
    constructor(restrictionFlags, restrictionAdditions, restrictionDeletions) {
        this.restrictionFlags = restrictionFlags;
        this.accountRestrictionTransactionBody_Reserved1 = 0;
        this.restrictionAdditions = restrictionAdditions;
        this.restrictionDeletions = restrictionDeletions;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const restrictionFlags = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        const restrictionAdditionsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const restrictionDeletionsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const accountRestrictionTransactionBody_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        const restrictionAdditions = [];
        for (let i = 0; i < (Array.isArray(restrictionAdditionsCount) ? GeneratorUtils_1.GeneratorUtils.compact(restrictionAdditionsCount) : restrictionAdditionsCount); i++) {
            const item = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
            restrictionAdditions.push(item);
            byteArray.splice(0, 2);
        }
        const restrictionDeletions = [];
        for (let i = 0; i < (Array.isArray(restrictionDeletionsCount) ? GeneratorUtils_1.GeneratorUtils.compact(restrictionDeletionsCount) : restrictionDeletionsCount); i++) {
            const item = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
            restrictionDeletions.push(item);
            byteArray.splice(0, 2);
        }
        return new AccountOperationRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
    }
    getRestrictionFlags() {
        return this.restrictionFlags;
    }
    getAccountRestrictionTransactionBody_Reserved1() {
        return this.accountRestrictionTransactionBody_Reserved1;
    }
    getRestrictionAdditions() {
        return this.restrictionAdditions;
    }
    getRestrictionDeletions() {
        return this.restrictionDeletions;
    }
    getSize() {
        let size = 0;
        size += 2;
        size += 1;
        size += 1;
        size += 4;
        this.restrictionAdditions.forEach(() => size += 2);
        this.restrictionDeletions.forEach(() => size += 2);
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const restrictionFlagsBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getRestrictionFlags(), 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionFlagsBytes);
        const restrictionAdditionsCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.restrictionAdditions.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionAdditionsCountBytes);
        const restrictionDeletionsCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.restrictionDeletions.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionDeletionsCountBytes);
        const accountRestrictionTransactionBody_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getAccountRestrictionTransactionBody_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountRestrictionTransactionBody_Reserved1Bytes);
        this.restrictionAdditions.forEach((item) => {
            const restrictionAdditionsBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(item, 2);
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionAdditionsBytes);
        });
        this.restrictionDeletions.forEach((item) => {
            const restrictionDeletionsBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(item, 2);
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionDeletionsBytes);
        });
        return newArray;
    }
}
exports.AccountOperationRestrictionTransactionBodyBuilder = AccountOperationRestrictionTransactionBodyBuilder;

},{"./GeneratorUtils":64}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountOperationRestrictionTransactionBodyBuilder_1 = require("./AccountOperationRestrictionTransactionBodyBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
class AccountOperationRestrictionTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.accountOperationRestrictionTransactionBody = new AccountOperationRestrictionTransactionBodyBuilder_1.AccountOperationRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const accountOperationRestrictionTransactionBody = AccountOperationRestrictionTransactionBodyBuilder_1.AccountOperationRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountOperationRestrictionTransactionBody.getSize());
        return new AccountOperationRestrictionTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, accountOperationRestrictionTransactionBody.restrictionFlags, accountOperationRestrictionTransactionBody.restrictionAdditions, accountOperationRestrictionTransactionBody.restrictionDeletions);
    }
    getRestrictionFlags() {
        return this.accountOperationRestrictionTransactionBody.getRestrictionFlags();
    }
    getAccountRestrictionTransactionBody_Reserved1() {
        return this.accountOperationRestrictionTransactionBody.getAccountRestrictionTransactionBody_Reserved1();
    }
    getRestrictionAdditions() {
        return this.accountOperationRestrictionTransactionBody.getRestrictionAdditions();
    }
    getRestrictionDeletions() {
        return this.accountOperationRestrictionTransactionBody.getRestrictionDeletions();
    }
    getSize() {
        let size = super.getSize();
        size += this.accountOperationRestrictionTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const accountOperationRestrictionTransactionBodyBytes = this.accountOperationRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountOperationRestrictionTransactionBodyBytes);
        return newArray;
    }
}
exports.AccountOperationRestrictionTransactionBuilder = AccountOperationRestrictionTransactionBuilder;

},{"./AccountOperationRestrictionTransactionBodyBuilder":10,"./GeneratorUtils":64,"./TransactionBuilder":139}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AddressDto_1 = require("./AddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
class AccountRestrictionAddressValueBuilder {
    constructor(restrictionValues) {
        this.restrictionValues = restrictionValues;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const restrictionValuesCount = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        const restrictionValues = [];
        for (let i = 0; i < (Array.isArray(restrictionValuesCount) ? GeneratorUtils_1.GeneratorUtils.compact(restrictionValuesCount) : restrictionValuesCount); i++) {
            const item = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
            restrictionValues.push(item);
            byteArray.splice(0, item.getSize());
        }
        return new AccountRestrictionAddressValueBuilder(restrictionValues);
    }
    getRestrictionValues() {
        return this.restrictionValues;
    }
    getSize() {
        let size = 0;
        size += 8;
        this.restrictionValues.forEach((o) => size += o.getSize());
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const restrictionValuesCountBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(GeneratorUtils_1.GeneratorUtils.fromUint(this.restrictionValues.length));
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionValuesCountBytes);
        this.restrictionValues.forEach((item) => {
            const restrictionValuesBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionValuesBytes);
        });
        return newArray;
    }
}
exports.AccountRestrictionAddressValueBuilder = AccountRestrictionAddressValueBuilder;

},{"./AddressDto":22,"./GeneratorUtils":64}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccountRestrictionFlagsDto;
(function (AccountRestrictionFlagsDto) {
    AccountRestrictionFlagsDto[AccountRestrictionFlagsDto["ADDRESS"] = 1] = "ADDRESS";
    AccountRestrictionFlagsDto[AccountRestrictionFlagsDto["MOSAIC_ID"] = 2] = "MOSAIC_ID";
    AccountRestrictionFlagsDto[AccountRestrictionFlagsDto["TRANSACTION_TYPE"] = 4] = "TRANSACTION_TYPE";
    AccountRestrictionFlagsDto[AccountRestrictionFlagsDto["OUTGOING"] = 16384] = "OUTGOING";
    AccountRestrictionFlagsDto[AccountRestrictionFlagsDto["BLOCK"] = 32768] = "BLOCK";
})(AccountRestrictionFlagsDto = exports.AccountRestrictionFlagsDto || (exports.AccountRestrictionFlagsDto = {}));

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicIdDto_1 = require("./MosaicIdDto");
class AccountRestrictionMosaicValueBuilder {
    constructor(restrictionValues) {
        this.restrictionValues = restrictionValues;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const restrictionValuesCount = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        const restrictionValues = [];
        for (let i = 0; i < (Array.isArray(restrictionValuesCount) ? GeneratorUtils_1.GeneratorUtils.compact(restrictionValuesCount) : restrictionValuesCount); i++) {
            const item = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
            restrictionValues.push(item);
            byteArray.splice(0, item.getSize());
        }
        return new AccountRestrictionMosaicValueBuilder(restrictionValues);
    }
    getRestrictionValues() {
        return this.restrictionValues;
    }
    getSize() {
        let size = 0;
        size += 8;
        this.restrictionValues.forEach((o) => size += o.getSize());
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const restrictionValuesCountBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(GeneratorUtils_1.GeneratorUtils.fromUint(this.restrictionValues.length));
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionValuesCountBytes);
        this.restrictionValues.forEach((item) => {
            const restrictionValuesBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionValuesBytes);
        });
        return newArray;
    }
}
exports.AccountRestrictionMosaicValueBuilder = AccountRestrictionMosaicValueBuilder;

},{"./GeneratorUtils":64,"./MosaicIdDto":96}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class AccountRestrictionTransactionTypeValueBuilder {
    constructor(restrictionValues) {
        this.restrictionValues = restrictionValues;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const restrictionValuesCount = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        const restrictionValues = [];
        for (let i = 0; i < (Array.isArray(restrictionValuesCount) ? GeneratorUtils_1.GeneratorUtils.compact(restrictionValuesCount) : restrictionValuesCount); i++) {
            const item = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
            restrictionValues.push(item);
            byteArray.splice(0, 2);
        }
        return new AccountRestrictionTransactionTypeValueBuilder(restrictionValues);
    }
    getRestrictionValues() {
        return this.restrictionValues;
    }
    getSize() {
        let size = 0;
        size += 8;
        this.restrictionValues.forEach(() => size += 2);
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const restrictionValuesCountBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(GeneratorUtils_1.GeneratorUtils.fromUint(this.restrictionValues.length));
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionValuesCountBytes);
        this.restrictionValues.forEach((item) => {
            const restrictionValuesBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(item, 2);
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionValuesBytes);
        });
        return newArray;
    }
}
exports.AccountRestrictionTransactionTypeValueBuilder = AccountRestrictionTransactionTypeValueBuilder;

},{"./GeneratorUtils":64}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountRestrictionsInfoBuilder_1 = require("./AccountRestrictionsInfoBuilder");
const AddressDto_1 = require("./AddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
class AccountRestrictionsBuilder {
    constructor(address, restrictions) {
        this.address = address;
        this.restrictions = restrictions;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const address = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, address.getSize());
        const restrictionsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        const restrictions = [];
        for (let i = 0; i < (Array.isArray(restrictionsCount) ? GeneratorUtils_1.GeneratorUtils.compact(restrictionsCount) : restrictionsCount); i++) {
            const item = AccountRestrictionsInfoBuilder_1.AccountRestrictionsInfoBuilder.loadFromBinary(Uint8Array.from(byteArray));
            restrictions.push(item);
            byteArray.splice(0, item.getSize());
        }
        return new AccountRestrictionsBuilder(address, restrictions);
    }
    getAddress() {
        return this.address;
    }
    getRestrictions() {
        return this.restrictions;
    }
    getSize() {
        let size = 0;
        size += this.address.getSize();
        size += 8;
        this.restrictions.forEach((o) => size += o.getSize());
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const addressBytes = this.address.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressBytes);
        const restrictionsCountBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(GeneratorUtils_1.GeneratorUtils.fromUint(this.restrictions.length));
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionsCountBytes);
        this.restrictions.forEach((item) => {
            const restrictionsBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionsBytes);
        });
        return newArray;
    }
}
exports.AccountRestrictionsBuilder = AccountRestrictionsBuilder;

},{"./AccountRestrictionsInfoBuilder":17,"./AddressDto":22,"./GeneratorUtils":64}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountRestrictionAddressValueBuilder_1 = require("./AccountRestrictionAddressValueBuilder");
const AccountRestrictionFlagsDto_1 = require("./AccountRestrictionFlagsDto");
const AccountRestrictionMosaicValueBuilder_1 = require("./AccountRestrictionMosaicValueBuilder");
const AccountRestrictionTransactionTypeValueBuilder_1 = require("./AccountRestrictionTransactionTypeValueBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
class AccountRestrictionsInfoBuilder {
    constructor(restrictionFlags, addressRestrictions, mosaicIdRestrictions, transactionTypeRestrictions) {
        this.restrictionFlags = restrictionFlags;
        this.addressRestrictions = addressRestrictions;
        this.mosaicIdRestrictions = mosaicIdRestrictions;
        this.transactionTypeRestrictions = transactionTypeRestrictions;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const restrictionFlags = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        const restrictionFlagsConditionBytes = Uint8Array.from(byteArray.slice(0, 1));
        byteArray.splice(0, 1);
        let addressRestrictions;
        if (restrictionFlags & AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.ADDRESS) {
            addressRestrictions = AccountRestrictionAddressValueBuilder_1.AccountRestrictionAddressValueBuilder.loadFromBinary(restrictionFlagsConditionBytes);
        }
        let mosaicIdRestrictions;
        if (restrictionFlags & AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.MOSAIC_ID) {
            mosaicIdRestrictions = AccountRestrictionMosaicValueBuilder_1.AccountRestrictionMosaicValueBuilder.loadFromBinary(restrictionFlagsConditionBytes);
        }
        let transactionTypeRestrictions;
        if (restrictionFlags & AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.TRANSACTION_TYPE) {
            transactionTypeRestrictions = AccountRestrictionTransactionTypeValueBuilder_1.AccountRestrictionTransactionTypeValueBuilder.loadFromBinary(restrictionFlagsConditionBytes);
        }
        return new AccountRestrictionsInfoBuilder(restrictionFlags, addressRestrictions, mosaicIdRestrictions, transactionTypeRestrictions);
    }
    getRestrictionFlags() {
        return this.restrictionFlags;
    }
    getAddressRestrictions() {
        if (this.restrictionFlags & AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.ADDRESS) {
            throw new Error('restrictionFlags is not set to ADDRESS.');
        }
        return this.addressRestrictions;
    }
    getMosaicIdRestrictions() {
        if (this.restrictionFlags & AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.MOSAIC_ID) {
            throw new Error('restrictionFlags is not set to MOSAIC_ID.');
        }
        return this.mosaicIdRestrictions;
    }
    getTransactionTypeRestrictions() {
        if (this.restrictionFlags & AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.TRANSACTION_TYPE) {
            throw new Error('restrictionFlags is not set to TRANSACTION_TYPE.');
        }
        return this.transactionTypeRestrictions;
    }
    getSize() {
        let size = 0;
        size += 2;
        if (this.restrictionFlags & AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.ADDRESS) {
            size += this.addressRestrictions.getSize();
        }
        if (this.restrictionFlags & AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.MOSAIC_ID) {
            size += this.mosaicIdRestrictions.getSize();
        }
        if (this.restrictionFlags & AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.TRANSACTION_TYPE) {
            size += this.transactionTypeRestrictions.getSize();
        }
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const restrictionFlagsBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getRestrictionFlags(), 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionFlagsBytes);
        if (this.restrictionFlags & AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.ADDRESS) {
            const addressRestrictionsBytes = this.addressRestrictions.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressRestrictionsBytes);
        }
        if (this.restrictionFlags & AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.MOSAIC_ID) {
            const mosaicIdRestrictionsBytes = this.mosaicIdRestrictions.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdRestrictionsBytes);
        }
        if (this.restrictionFlags & AccountRestrictionFlagsDto_1.AccountRestrictionFlagsDto.TRANSACTION_TYPE) {
            const transactionTypeRestrictionsBytes = this.transactionTypeRestrictions.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, transactionTypeRestrictionsBytes);
        }
        return newArray;
    }
}
exports.AccountRestrictionsInfoBuilder = AccountRestrictionsInfoBuilder;

},{"./AccountRestrictionAddressValueBuilder":12,"./AccountRestrictionFlagsDto":13,"./AccountRestrictionMosaicValueBuilder":14,"./AccountRestrictionTransactionTypeValueBuilder":15,"./GeneratorUtils":64}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountKeyFlagsDto_1 = require("./AccountKeyFlagsDto");
const AccountStateFormatDto_1 = require("./AccountStateFormatDto");
const AddressDto_1 = require("./AddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const HeightActivityBucketsBuilder_1 = require("./HeightActivityBucketsBuilder");
const HeightDto_1 = require("./HeightDto");
const ImportanceSnapshotBuilder_1 = require("./ImportanceSnapshotBuilder");
const KeyDto_1 = require("./KeyDto");
const MosaicBuilder_1 = require("./MosaicBuilder");
const MosaicIdDto_1 = require("./MosaicIdDto");
const VotingKeyDto_1 = require("./VotingKeyDto");
class AccountStateBuilder {
    constructor(address, addressHeight, publicKey, publicKeyHeight, accountType, supplementalAccountKeysMask, currencyMosaicId, balances, linkedPublicKey, vrfPublicKey, votingPublicKey, nodePublicKey, importanceSnapshots, activityBuckets) {
        this.address = address;
        this.addressHeight = addressHeight;
        this.publicKey = publicKey;
        this.publicKeyHeight = publicKeyHeight;
        this.accountType = accountType;
        this.supplementalAccountKeysMask = supplementalAccountKeysMask;
        this.linkedPublicKey = linkedPublicKey;
        this.vrfPublicKey = vrfPublicKey;
        this.votingPublicKey = votingPublicKey;
        this.nodePublicKey = nodePublicKey;
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
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const address = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, address.getSize());
        const addressHeight = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, addressHeight.getSize());
        const publicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, publicKey.getSize());
        const publicKeyHeight = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, publicKeyHeight.getSize());
        const accountType = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const format = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const supplementalAccountKeysMask = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const supplementalAccountKeysMaskConditionBytes = Uint8Array.from(byteArray.slice(0, 32));
        byteArray.splice(0, 32);
        const formatConditionBytes = Uint8Array.from(byteArray.slice(0, 1));
        byteArray.splice(0, 1);
        const currencyMosaicId = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, currencyMosaicId.getSize());
        const balancesCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        const balances = [];
        for (let i = 0; i < (Array.isArray(balancesCount) ? GeneratorUtils_1.GeneratorUtils.compact(balancesCount) : balancesCount); i++) {
            const item = MosaicBuilder_1.MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
            balances.push(item);
            byteArray.splice(0, item.getSize());
        }
        let linkedPublicKey;
        if (supplementalAccountKeysMask & AccountKeyFlagsDto_1.AccountKeyFlagsDto.LINKED) {
            linkedPublicKey = KeyDto_1.KeyDto.loadFromBinary(supplementalAccountKeysMaskConditionBytes);
        }
        let vrfPublicKey;
        if (supplementalAccountKeysMask & AccountKeyFlagsDto_1.AccountKeyFlagsDto.VRF) {
            vrfPublicKey = KeyDto_1.KeyDto.loadFromBinary(supplementalAccountKeysMaskConditionBytes);
        }
        let votingPublicKey;
        if (supplementalAccountKeysMask & AccountKeyFlagsDto_1.AccountKeyFlagsDto.VOTING) {
            votingPublicKey = VotingKeyDto_1.VotingKeyDto.loadFromBinary(supplementalAccountKeysMaskConditionBytes);
        }
        let nodePublicKey;
        if (supplementalAccountKeysMask & AccountKeyFlagsDto_1.AccountKeyFlagsDto.NODE) {
            nodePublicKey = KeyDto_1.KeyDto.loadFromBinary(supplementalAccountKeysMaskConditionBytes);
        }
        let importanceSnapshots;
        if (format === AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            importanceSnapshots = ImportanceSnapshotBuilder_1.ImportanceSnapshotBuilder.loadFromBinary(formatConditionBytes);
        }
        let activityBuckets;
        if (format === AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            activityBuckets = HeightActivityBucketsBuilder_1.HeightActivityBucketsBuilder.loadFromBinary(formatConditionBytes);
        }
        return new AccountStateBuilder(address, addressHeight, publicKey, publicKeyHeight, accountType, supplementalAccountKeysMask, currencyMosaicId, balances, linkedPublicKey, vrfPublicKey, votingPublicKey, nodePublicKey, importanceSnapshots, activityBuckets);
    }
    getAddress() {
        return this.address;
    }
    getAddressHeight() {
        return this.addressHeight;
    }
    getPublicKey() {
        return this.publicKey;
    }
    getPublicKeyHeight() {
        return this.publicKeyHeight;
    }
    getAccountType() {
        return this.accountType;
    }
    getFormat() {
        return this.format;
    }
    getSupplementalAccountKeysMask() {
        return this.supplementalAccountKeysMask;
    }
    getLinkedPublicKey() {
        if (this.supplementalAccountKeysMask & AccountKeyFlagsDto_1.AccountKeyFlagsDto.LINKED) {
            throw new Error('supplementalAccountKeysMask is not set to LINKED.');
        }
        return this.linkedPublicKey;
    }
    getVrfPublicKey() {
        if (this.supplementalAccountKeysMask & AccountKeyFlagsDto_1.AccountKeyFlagsDto.VRF) {
            throw new Error('supplementalAccountKeysMask is not set to VRF.');
        }
        return this.vrfPublicKey;
    }
    getVotingPublicKey() {
        if (this.supplementalAccountKeysMask & AccountKeyFlagsDto_1.AccountKeyFlagsDto.VOTING) {
            throw new Error('supplementalAccountKeysMask is not set to VOTING.');
        }
        return this.votingPublicKey;
    }
    getNodePublicKey() {
        if (this.supplementalAccountKeysMask & AccountKeyFlagsDto_1.AccountKeyFlagsDto.NODE) {
            throw new Error('supplementalAccountKeysMask is not set to NODE.');
        }
        return this.nodePublicKey;
    }
    getImportanceSnapshots() {
        if (this.format !== AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            throw new Error('format is not set to HIGH_VALUE.');
        }
        return this.importanceSnapshots;
    }
    getActivityBuckets() {
        if (this.format !== AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            throw new Error('format is not set to HIGH_VALUE.');
        }
        return this.activityBuckets;
    }
    getCurrencyMosaicId() {
        return this.currencyMosaicId;
    }
    getBalances() {
        return this.balances;
    }
    getSize() {
        let size = 0;
        size += this.address.getSize();
        size += this.addressHeight.getSize();
        size += this.publicKey.getSize();
        size += this.publicKeyHeight.getSize();
        size += 1;
        size += 1;
        size += 1;
        if (this.supplementalAccountKeysMask & AccountKeyFlagsDto_1.AccountKeyFlagsDto.LINKED) {
            size += this.linkedPublicKey.getSize();
        }
        if (this.supplementalAccountKeysMask & AccountKeyFlagsDto_1.AccountKeyFlagsDto.VRF) {
            size += this.vrfPublicKey.getSize();
        }
        if (this.supplementalAccountKeysMask & AccountKeyFlagsDto_1.AccountKeyFlagsDto.VOTING) {
            size += this.votingPublicKey.getSize();
        }
        if (this.supplementalAccountKeysMask & AccountKeyFlagsDto_1.AccountKeyFlagsDto.NODE) {
            size += this.nodePublicKey.getSize();
        }
        if (this.format === AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            size += this.importanceSnapshots.getSize();
        }
        if (this.format === AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            size += this.activityBuckets.getSize();
        }
        size += this.currencyMosaicId.getSize();
        size += 2;
        this.balances.forEach((o) => size += o.getSize());
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const addressBytes = this.address.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressBytes);
        const addressHeightBytes = this.addressHeight.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressHeightBytes);
        const publicKeyBytes = this.publicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, publicKeyBytes);
        const publicKeyHeightBytes = this.publicKeyHeight.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, publicKeyHeightBytes);
        const accountTypeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.accountType, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountTypeBytes);
        const formatBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.format, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, formatBytes);
        const supplementalAccountKeysMaskBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getSupplementalAccountKeysMask(), 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, supplementalAccountKeysMaskBytes);
        if (this.supplementalAccountKeysMask & AccountKeyFlagsDto_1.AccountKeyFlagsDto.LINKED) {
            const linkedPublicKeyBytes = this.linkedPublicKey.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, linkedPublicKeyBytes);
        }
        if (this.supplementalAccountKeysMask & AccountKeyFlagsDto_1.AccountKeyFlagsDto.VRF) {
            const vrfPublicKeyBytes = this.vrfPublicKey.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, vrfPublicKeyBytes);
        }
        if (this.supplementalAccountKeysMask & AccountKeyFlagsDto_1.AccountKeyFlagsDto.VOTING) {
            const votingPublicKeyBytes = this.votingPublicKey.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, votingPublicKeyBytes);
        }
        if (this.supplementalAccountKeysMask & AccountKeyFlagsDto_1.AccountKeyFlagsDto.NODE) {
            const nodePublicKeyBytes = this.nodePublicKey.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, nodePublicKeyBytes);
        }
        if (this.format === AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            const importanceSnapshotsBytes = this.importanceSnapshots.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, importanceSnapshotsBytes);
        }
        if (this.format === AccountStateFormatDto_1.AccountStateFormatDto.HIGH_VALUE) {
            const activityBucketsBytes = this.activityBuckets.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, activityBucketsBytes);
        }
        const currencyMosaicIdBytes = this.currencyMosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, currencyMosaicIdBytes);
        const balancesCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.balances.length, 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, balancesCountBytes);
        this.balances.forEach((item) => {
            const balancesBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, balancesBytes);
        });
        return newArray;
    }
}
exports.AccountStateBuilder = AccountStateBuilder;

},{"./AccountKeyFlagsDto":3,"./AccountStateFormatDto":19,"./AddressDto":22,"./GeneratorUtils":64,"./HeightActivityBucketsBuilder":73,"./HeightDto":74,"./ImportanceSnapshotBuilder":77,"./KeyDto":79,"./MosaicBuilder":87,"./MosaicIdDto":96,"./VotingKeyDto":146}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccountStateFormatDto;
(function (AccountStateFormatDto) {
    AccountStateFormatDto[AccountStateFormatDto["REGULAR"] = 0] = "REGULAR";
    AccountStateFormatDto[AccountStateFormatDto["HIGH_VALUE"] = 1] = "HIGH_VALUE";
})(AccountStateFormatDto = exports.AccountStateFormatDto || (exports.AccountStateFormatDto = {}));

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AddressDto_1 = require("./AddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const NamespaceIdDto_1 = require("./NamespaceIdDto");
class AddressAliasTransactionBodyBuilder {
    constructor(namespaceId, address, aliasAction) {
        this.namespaceId = namespaceId;
        this.address = address;
        this.aliasAction = aliasAction;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const namespaceId = NamespaceIdDto_1.NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceId.getSize());
        const address = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, address.getSize());
        const aliasAction = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        return new AddressAliasTransactionBodyBuilder(namespaceId, address, aliasAction);
    }
    getNamespaceId() {
        return this.namespaceId;
    }
    getAddress() {
        return this.address;
    }
    getAliasAction() {
        return this.aliasAction;
    }
    getSize() {
        let size = 0;
        size += this.namespaceId.getSize();
        size += this.address.getSize();
        size += 1;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const namespaceIdBytes = this.namespaceId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, namespaceIdBytes);
        const addressBytes = this.address.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressBytes);
        const aliasActionBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.aliasAction, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, aliasActionBytes);
        return newArray;
    }
}
exports.AddressAliasTransactionBodyBuilder = AddressAliasTransactionBodyBuilder;

},{"./AddressDto":22,"./GeneratorUtils":64,"./NamespaceIdDto":114}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AddressAliasTransactionBodyBuilder_1 = require("./AddressAliasTransactionBodyBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
class AddressAliasTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, namespaceId, address, aliasAction) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.addressAliasTransactionBody = new AddressAliasTransactionBodyBuilder_1.AddressAliasTransactionBodyBuilder(namespaceId, address, aliasAction);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const addressAliasTransactionBody = AddressAliasTransactionBodyBuilder_1.AddressAliasTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, addressAliasTransactionBody.getSize());
        return new AddressAliasTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, addressAliasTransactionBody.namespaceId, addressAliasTransactionBody.address, addressAliasTransactionBody.aliasAction);
    }
    getNamespaceId() {
        return this.addressAliasTransactionBody.getNamespaceId();
    }
    getAddress() {
        return this.addressAliasTransactionBody.getAddress();
    }
    getAliasAction() {
        return this.addressAliasTransactionBody.getAliasAction();
    }
    getSize() {
        let size = super.getSize();
        size += this.addressAliasTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const addressAliasTransactionBodyBytes = this.addressAliasTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressAliasTransactionBodyBytes);
        return newArray;
    }
}
exports.AddressAliasTransactionBuilder = AddressAliasTransactionBuilder;

},{"./AddressAliasTransactionBodyBuilder":20,"./GeneratorUtils":64,"./TransactionBuilder":139}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class AddressDto {
    constructor(address) {
        this.address = address;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const address = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 25);
        byteArray.splice(0, 25);
        return new AddressDto(address);
    }
    getAddress() {
        return this.address;
    }
    getSize() {
        return 25;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.address);
        return newArray;
    }
}
exports.AddressDto = AddressDto;

},{"./GeneratorUtils":64}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicRestrictionKeyDto_1 = require("./MosaicRestrictionKeyDto");
class AddressKeyValueBuilder {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const key = MosaicRestrictionKeyDto_1.MosaicRestrictionKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, key.getSize());
        const value = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new AddressKeyValueBuilder(key, value);
    }
    getKey() {
        return this.key;
    }
    getValue() {
        return this.value;
    }
    getSize() {
        let size = 0;
        size += this.key.getSize();
        size += 8;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const keyBytes = this.key.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, keyBytes);
        const valueBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getValue());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueBytes);
        return newArray;
    }
}
exports.AddressKeyValueBuilder = AddressKeyValueBuilder;

},{"./GeneratorUtils":64,"./MosaicRestrictionKeyDto":105}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AddressKeyValueBuilder_1 = require("./AddressKeyValueBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
class AddressKeyValueSetBuilder {
    constructor(keys) {
        this.keys = keys;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const keyValueCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const keys = [];
        for (let i = 0; i < (Array.isArray(keyValueCount) ? GeneratorUtils_1.GeneratorUtils.compact(keyValueCount) : keyValueCount); i++) {
            const item = AddressKeyValueBuilder_1.AddressKeyValueBuilder.loadFromBinary(Uint8Array.from(byteArray));
            keys.push(item);
            byteArray.splice(0, item.getSize());
        }
        return new AddressKeyValueSetBuilder(keys);
    }
    getKeys() {
        return this.keys;
    }
    getSize() {
        let size = 0;
        size += 1;
        this.keys.forEach((o) => size += o.getSize());
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const keyValueCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.keys.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, keyValueCountBytes);
        this.keys.forEach((item) => {
            const keysBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, keysBytes);
        });
        return newArray;
    }
}
exports.AddressKeyValueSetBuilder = AddressKeyValueSetBuilder;

},{"./AddressKeyValueBuilder":23,"./GeneratorUtils":64}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AddressDto_1 = require("./AddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const ReceiptSourceBuilder_1 = require("./ReceiptSourceBuilder");
class AddressResolutionEntryBuilder {
    constructor(source, resolved) {
        this.source = source;
        this.resolved = resolved;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const source = ReceiptSourceBuilder_1.ReceiptSourceBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, source.getSize());
        const resolved = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, resolved.getSize());
        return new AddressResolutionEntryBuilder(source, resolved);
    }
    getSource() {
        return this.source;
    }
    getResolved() {
        return this.resolved;
    }
    getSize() {
        let size = 0;
        size += this.source.getSize();
        size += this.resolved.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const sourceBytes = this.source.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, sourceBytes);
        const resolvedBytes = this.resolved.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, resolvedBytes);
        return newArray;
    }
}
exports.AddressResolutionEntryBuilder = AddressResolutionEntryBuilder;

},{"./AddressDto":22,"./GeneratorUtils":64,"./ReceiptSourceBuilder":128}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AddressResolutionEntryBuilder_1 = require("./AddressResolutionEntryBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const ReceiptBuilder_1 = require("./ReceiptBuilder");
const UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
class AddressResolutionStatementBuilder extends ReceiptBuilder_1.ReceiptBuilder {
    constructor(version, type, unresolved, resolutionEntries) {
        super(version, type);
        this.unresolved = unresolved;
        this.resolutionEntries = resolutionEntries;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = ReceiptBuilder_1.ReceiptBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const unresolved = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, unresolved.getSize());
        let resolutionEntriesByteSize = byteArray.length;
        const resolutionEntries = [];
        while (resolutionEntriesByteSize > 0) {
            const item = AddressResolutionEntryBuilder_1.AddressResolutionEntryBuilder.loadFromBinary(Uint8Array.from(byteArray));
            resolutionEntries.push(item);
            const itemSize = item.getSize();
            resolutionEntriesByteSize -= itemSize;
            byteArray.splice(0, itemSize);
        }
        return new AddressResolutionStatementBuilder(superObject.version, superObject.type, unresolved, resolutionEntries);
    }
    getUnresolved() {
        return this.unresolved;
    }
    getResolutionEntries() {
        return this.resolutionEntries;
    }
    getSize() {
        let size = super.getSize();
        size += this.unresolved.getSize();
        this.resolutionEntries.forEach((o) => size += o.getSize());
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const unresolvedBytes = this.unresolved.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, unresolvedBytes);
        this.resolutionEntries.forEach((item) => {
            const resolutionEntriesBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, resolutionEntriesBytes);
        });
        return newArray;
    }
}
exports.AddressResolutionStatementBuilder = AddressResolutionStatementBuilder;

},{"./AddressResolutionEntryBuilder":25,"./GeneratorUtils":64,"./ReceiptBuilder":127,"./UnresolvedAddressDto":143}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AggregateTransactionBodyBuilder_1 = require("./AggregateTransactionBodyBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
class AggregateBondedTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, transactionsHash, transactions, cosignatures) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.aggregateTransactionBody = new AggregateTransactionBodyBuilder_1.AggregateTransactionBodyBuilder(transactionsHash, transactions, cosignatures);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const aggregateTransactionBody = AggregateTransactionBodyBuilder_1.AggregateTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, aggregateTransactionBody.getSize());
        return new AggregateBondedTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, aggregateTransactionBody.transactionsHash, aggregateTransactionBody.transactions, aggregateTransactionBody.cosignatures);
    }
    getTransactionsHash() {
        return this.aggregateTransactionBody.getTransactionsHash();
    }
    getAggregateTransactionHeader_Reserved1() {
        return this.aggregateTransactionBody.getAggregateTransactionHeader_Reserved1();
    }
    getTransactions() {
        return this.aggregateTransactionBody.getTransactions();
    }
    getCosignatures() {
        return this.aggregateTransactionBody.getCosignatures();
    }
    getSize() {
        let size = super.getSize();
        size += this.aggregateTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const aggregateTransactionBodyBytes = this.aggregateTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, aggregateTransactionBodyBytes);
        return newArray;
    }
}
exports.AggregateBondedTransactionBuilder = AggregateBondedTransactionBuilder;

},{"./AggregateTransactionBodyBuilder":29,"./GeneratorUtils":64,"./TransactionBuilder":139}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AggregateTransactionBodyBuilder_1 = require("./AggregateTransactionBodyBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
class AggregateCompleteTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, transactionsHash, transactions, cosignatures) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.aggregateTransactionBody = new AggregateTransactionBodyBuilder_1.AggregateTransactionBodyBuilder(transactionsHash, transactions, cosignatures);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const aggregateTransactionBody = AggregateTransactionBodyBuilder_1.AggregateTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, aggregateTransactionBody.getSize());
        return new AggregateCompleteTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, aggregateTransactionBody.transactionsHash, aggregateTransactionBody.transactions, aggregateTransactionBody.cosignatures);
    }
    getTransactionsHash() {
        return this.aggregateTransactionBody.getTransactionsHash();
    }
    getAggregateTransactionHeader_Reserved1() {
        return this.aggregateTransactionBody.getAggregateTransactionHeader_Reserved1();
    }
    getTransactions() {
        return this.aggregateTransactionBody.getTransactions();
    }
    getCosignatures() {
        return this.aggregateTransactionBody.getCosignatures();
    }
    getSize() {
        let size = super.getSize();
        size += this.aggregateTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const aggregateTransactionBodyBytes = this.aggregateTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, aggregateTransactionBodyBytes);
        return newArray;
    }
}
exports.AggregateCompleteTransactionBuilder = AggregateCompleteTransactionBuilder;

},{"./AggregateTransactionBodyBuilder":29,"./GeneratorUtils":64,"./TransactionBuilder":139}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CosignatureBuilder_1 = require("./CosignatureBuilder");
const EmbeddedTransactionHelper_1 = require("./EmbeddedTransactionHelper");
const GeneratorUtils_1 = require("./GeneratorUtils");
const Hash256Dto_1 = require("./Hash256Dto");
class AggregateTransactionBodyBuilder {
    constructor(transactionsHash, transactions, cosignatures) {
        this.transactionsHash = transactionsHash;
        this.aggregateTransactionHeader_Reserved1 = 0;
        this.transactions = transactions;
        this.cosignatures = cosignatures;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const transactionsHash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, transactionsHash.getSize());
        const payloadSize = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        const aggregateTransactionHeader_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        let transactionsByteSize = payloadSize;
        const transactions = [];
        while (transactionsByteSize > 0) {
            const item = EmbeddedTransactionHelper_1.EmbeddedTransactionHelper.loadFromBinary(Uint8Array.from(byteArray));
            transactions.push(item);
            const itemSize = item.getSize() + GeneratorUtils_1.GeneratorUtils.getTransactionPaddingSize(item.getSize(), 8);
            transactionsByteSize -= itemSize;
            byteArray.splice(0, itemSize);
        }
        let cosignaturesByteSize = byteArray.length;
        const cosignatures = [];
        while (cosignaturesByteSize > 0) {
            const item = CosignatureBuilder_1.CosignatureBuilder.loadFromBinary(Uint8Array.from(byteArray));
            cosignatures.push(item);
            const itemSize = item.getSize();
            cosignaturesByteSize -= itemSize;
            byteArray.splice(0, itemSize);
        }
        return new AggregateTransactionBodyBuilder(transactionsHash, transactions, cosignatures);
    }
    getTransactionsHash() {
        return this.transactionsHash;
    }
    getAggregateTransactionHeader_Reserved1() {
        return this.aggregateTransactionHeader_Reserved1;
    }
    getTransactions() {
        return this.transactions;
    }
    getCosignatures() {
        return this.cosignatures;
    }
    getSize() {
        let size = 0;
        size += this.transactionsHash.getSize();
        size += 4;
        size += 4;
        this.transactions.forEach((o) => size += EmbeddedTransactionHelper_1.EmbeddedTransactionHelper.serialize(o).length);
        this.cosignatures.forEach((o) => size += o.getSize());
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const transactionsHashBytes = this.transactionsHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, transactionsHashBytes);
        const payloadSizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(EmbeddedTransactionHelper_1.EmbeddedTransactionHelper.getEmbeddedTransactionSize(this.transactions), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, payloadSizeBytes);
        const aggregateTransactionHeader_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getAggregateTransactionHeader_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, aggregateTransactionHeader_Reserved1Bytes);
        this.transactions.forEach((item) => {
            const transactionsBytes = EmbeddedTransactionHelper_1.EmbeddedTransactionHelper.serialize(item);
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, transactionsBytes);
        });
        this.cosignatures.forEach((item) => {
            const cosignaturesBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, cosignaturesBytes);
        });
        return newArray;
    }
}
exports.AggregateTransactionBodyBuilder = AggregateTransactionBodyBuilder;

},{"./CosignatureBuilder":36,"./EmbeddedTransactionHelper":59,"./GeneratorUtils":64,"./Hash256Dto":67}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class AmountDto {
    constructor(amount) {
        this.amount = amount;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const amount = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new AmountDto(amount);
    }
    getAmount() {
        return this.amount;
    }
    getSize() {
        return 8;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const amountBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getAmount());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, amountBytes);
        return newArray;
    }
}
exports.AmountDto = AmountDto;

},{"./GeneratorUtils":64}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const KeyDto_1 = require("./KeyDto");
const MosaicBuilder_1 = require("./MosaicBuilder");
const ReceiptBuilder_1 = require("./ReceiptBuilder");
class BalanceChangeReceiptBuilder extends ReceiptBuilder_1.ReceiptBuilder {
    constructor(version, type, mosaic, targetPublicKey) {
        super(version, type);
        this.mosaic = mosaic;
        this.targetPublicKey = targetPublicKey;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = ReceiptBuilder_1.ReceiptBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const mosaic = MosaicBuilder_1.MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        const targetPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetPublicKey.getSize());
        return new BalanceChangeReceiptBuilder(superObject.version, superObject.type, mosaic, targetPublicKey);
    }
    getMosaic() {
        return this.mosaic;
    }
    getTargetPublicKey() {
        return this.targetPublicKey;
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaic.getSize();
        size += this.targetPublicKey.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        const targetPublicKeyBytes = this.targetPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetPublicKeyBytes);
        return newArray;
    }
}
exports.BalanceChangeReceiptBuilder = BalanceChangeReceiptBuilder;

},{"./GeneratorUtils":64,"./KeyDto":79,"./MosaicBuilder":87,"./ReceiptBuilder":127}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AddressDto_1 = require("./AddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const KeyDto_1 = require("./KeyDto");
const MosaicBuilder_1 = require("./MosaicBuilder");
const ReceiptBuilder_1 = require("./ReceiptBuilder");
class BalanceTransferReceiptBuilder extends ReceiptBuilder_1.ReceiptBuilder {
    constructor(version, type, mosaic, senderPublicKey, recipientAddress) {
        super(version, type);
        this.mosaic = mosaic;
        this.senderPublicKey = senderPublicKey;
        this.recipientAddress = recipientAddress;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = ReceiptBuilder_1.ReceiptBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const mosaic = MosaicBuilder_1.MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        const senderPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, senderPublicKey.getSize());
        const recipientAddress = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, recipientAddress.getSize());
        return new BalanceTransferReceiptBuilder(superObject.version, superObject.type, mosaic, senderPublicKey, recipientAddress);
    }
    getMosaic() {
        return this.mosaic;
    }
    getSenderPublicKey() {
        return this.senderPublicKey;
    }
    getRecipientAddress() {
        return this.recipientAddress;
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaic.getSize();
        size += this.senderPublicKey.getSize();
        size += this.recipientAddress.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        const senderPublicKeyBytes = this.senderPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, senderPublicKeyBytes);
        const recipientAddressBytes = this.recipientAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, recipientAddressBytes);
        return newArray;
    }
}
exports.BalanceTransferReceiptBuilder = BalanceTransferReceiptBuilder;

},{"./AddressDto":22,"./GeneratorUtils":64,"./KeyDto":79,"./MosaicBuilder":87,"./ReceiptBuilder":127}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class BlockDurationDto {
    constructor(blockDuration) {
        this.blockDuration = blockDuration;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const blockDuration = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new BlockDurationDto(blockDuration);
    }
    getBlockDuration() {
        return this.blockDuration;
    }
    getSize() {
        return 8;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const blockDurationBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getBlockDuration());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, blockDurationBytes);
        return newArray;
    }
}
exports.BlockDurationDto = BlockDurationDto;

},{"./GeneratorUtils":64}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class BlockFeeMultiplierDto {
    constructor(blockFeeMultiplier) {
        this.blockFeeMultiplier = blockFeeMultiplier;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const blockFeeMultiplier = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        return new BlockFeeMultiplierDto(blockFeeMultiplier);
    }
    getBlockFeeMultiplier() {
        return this.blockFeeMultiplier;
    }
    getSize() {
        return 4;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const blockFeeMultiplierBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getBlockFeeMultiplier(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, blockFeeMultiplierBytes);
        return newArray;
    }
}
exports.BlockFeeMultiplierDto = BlockFeeMultiplierDto;

},{"./GeneratorUtils":64}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockFeeMultiplierDto_1 = require("./BlockFeeMultiplierDto");
const DifficultyDto_1 = require("./DifficultyDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const Hash256Dto_1 = require("./Hash256Dto");
const HeightDto_1 = require("./HeightDto");
const KeyDto_1 = require("./KeyDto");
const SignatureDto_1 = require("./SignatureDto");
const TimestampDto_1 = require("./TimestampDto");
const VrfProofBuilder_1 = require("./VrfProofBuilder");
class BlockHeaderBuilder {
    constructor(signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryPublicKey, feeMultiplier) {
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
        this.generationHashProof = generationHashProof;
        this.previousBlockHash = previousBlockHash;
        this.transactionsHash = transactionsHash;
        this.receiptsHash = receiptsHash;
        this.stateHash = stateHash;
        this.beneficiaryPublicKey = beneficiaryPublicKey;
        this.feeMultiplier = feeMultiplier;
        this.blockHeader_Reserved1 = 0;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const size = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        const verifiableEntityHeader_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        const signature = SignatureDto_1.SignatureDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signature.getSize());
        const signerPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signerPublicKey.getSize());
        const entityBody_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        const version = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const network = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const type = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        const height = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, height.getSize());
        const timestamp = TimestampDto_1.TimestampDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, timestamp.getSize());
        const difficulty = DifficultyDto_1.DifficultyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, difficulty.getSize());
        const generationHashProof = VrfProofBuilder_1.VrfProofBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, generationHashProof.getSize());
        const previousBlockHash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, previousBlockHash.getSize());
        const transactionsHash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, transactionsHash.getSize());
        const receiptsHash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, receiptsHash.getSize());
        const stateHash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, stateHash.getSize());
        const beneficiaryPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, beneficiaryPublicKey.getSize());
        const feeMultiplier = BlockFeeMultiplierDto_1.BlockFeeMultiplierDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, feeMultiplier.getSize());
        const blockHeader_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        return new BlockHeaderBuilder(signature, signerPublicKey, version, network, type, height, timestamp, difficulty, generationHashProof, previousBlockHash, transactionsHash, receiptsHash, stateHash, beneficiaryPublicKey, feeMultiplier);
    }
    getVerifiableEntityHeader_Reserved1() {
        return this.verifiableEntityHeader_Reserved1;
    }
    getSignature() {
        return this.signature;
    }
    getSignerPublicKey() {
        return this.signerPublicKey;
    }
    getEntityBody_Reserved1() {
        return this.entityBody_Reserved1;
    }
    getVersion() {
        return this.version;
    }
    getNetwork() {
        return this.network;
    }
    getType() {
        return this.type;
    }
    getHeight() {
        return this.height;
    }
    getTimestamp() {
        return this.timestamp;
    }
    getDifficulty() {
        return this.difficulty;
    }
    getGenerationHashProof() {
        return this.generationHashProof;
    }
    getPreviousBlockHash() {
        return this.previousBlockHash;
    }
    getTransactionsHash() {
        return this.transactionsHash;
    }
    getReceiptsHash() {
        return this.receiptsHash;
    }
    getStateHash() {
        return this.stateHash;
    }
    getBeneficiaryPublicKey() {
        return this.beneficiaryPublicKey;
    }
    getFeeMultiplier() {
        return this.feeMultiplier;
    }
    getBlockHeader_Reserved1() {
        return this.blockHeader_Reserved1;
    }
    getSize() {
        let size = 0;
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
        size += this.generationHashProof.getSize();
        size += this.previousBlockHash.getSize();
        size += this.transactionsHash.getSize();
        size += this.receiptsHash.getSize();
        size += this.stateHash.getSize();
        size += this.beneficiaryPublicKey.getSize();
        size += this.feeMultiplier.getSize();
        size += 4;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const sizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getSize(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, sizeBytes);
        const verifiableEntityHeader_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getVerifiableEntityHeader_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, verifiableEntityHeader_Reserved1Bytes);
        const signatureBytes = this.signature.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, signatureBytes);
        const signerPublicKeyBytes = this.signerPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, signerPublicKeyBytes);
        const entityBody_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getEntityBody_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, entityBody_Reserved1Bytes);
        const versionBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getVersion(), 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, versionBytes);
        const networkBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.network, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, networkBytes);
        const typeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.type, 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, typeBytes);
        const heightBytes = this.height.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, heightBytes);
        const timestampBytes = this.timestamp.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, timestampBytes);
        const difficultyBytes = this.difficulty.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, difficultyBytes);
        const generationHashProofBytes = this.generationHashProof.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, generationHashProofBytes);
        const previousBlockHashBytes = this.previousBlockHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, previousBlockHashBytes);
        const transactionsHashBytes = this.transactionsHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, transactionsHashBytes);
        const receiptsHashBytes = this.receiptsHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, receiptsHashBytes);
        const stateHashBytes = this.stateHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, stateHashBytes);
        const beneficiaryPublicKeyBytes = this.beneficiaryPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, beneficiaryPublicKeyBytes);
        const feeMultiplierBytes = this.feeMultiplier.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, feeMultiplierBytes);
        const blockHeader_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getBlockHeader_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, blockHeader_Reserved1Bytes);
        return newArray;
    }
}
exports.BlockHeaderBuilder = BlockHeaderBuilder;

},{"./BlockFeeMultiplierDto":34,"./DifficultyDto":38,"./GeneratorUtils":64,"./Hash256Dto":67,"./HeightDto":74,"./KeyDto":79,"./SignatureDto":137,"./TimestampDto":138,"./VrfProofBuilder":151}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const KeyDto_1 = require("./KeyDto");
const SignatureDto_1 = require("./SignatureDto");
class CosignatureBuilder {
    constructor(signerPublicKey, signature) {
        this.signerPublicKey = signerPublicKey;
        this.signature = signature;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const signerPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signerPublicKey.getSize());
        const signature = SignatureDto_1.SignatureDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signature.getSize());
        return new CosignatureBuilder(signerPublicKey, signature);
    }
    getSignerPublicKey() {
        return this.signerPublicKey;
    }
    getSignature() {
        return this.signature;
    }
    getSize() {
        let size = 0;
        size += this.signerPublicKey.getSize();
        size += this.signature.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const signerPublicKeyBytes = this.signerPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, signerPublicKeyBytes);
        const signatureBytes = this.signature.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, signatureBytes);
        return newArray;
    }
}
exports.CosignatureBuilder = CosignatureBuilder;

},{"./GeneratorUtils":64,"./KeyDto":79,"./SignatureDto":137}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CosignatureBuilder_1 = require("./CosignatureBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const Hash256Dto_1 = require("./Hash256Dto");
class DetachedCosignatureBuilder extends CosignatureBuilder_1.CosignatureBuilder {
    constructor(signerPublicKey, signature, parentHash) {
        super(signerPublicKey, signature);
        this.parentHash = parentHash;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = CosignatureBuilder_1.CosignatureBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const parentHash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, parentHash.getSize());
        return new DetachedCosignatureBuilder(superObject.signerPublicKey, superObject.signature, parentHash);
    }
    getParentHash() {
        return this.parentHash;
    }
    getSize() {
        let size = super.getSize();
        size += this.parentHash.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const parentHashBytes = this.parentHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, parentHashBytes);
        return newArray;
    }
}
exports.DetachedCosignatureBuilder = DetachedCosignatureBuilder;

},{"./CosignatureBuilder":36,"./GeneratorUtils":64,"./Hash256Dto":67}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class DifficultyDto {
    constructor(difficulty) {
        this.difficulty = difficulty;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const difficulty = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new DifficultyDto(difficulty);
    }
    getDifficulty() {
        return this.difficulty;
    }
    getSize() {
        return 8;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const difficultyBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getDifficulty());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, difficultyBytes);
        return newArray;
    }
}
exports.DifficultyDto = DifficultyDto;

},{"./GeneratorUtils":64}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountAddressRestrictionTransactionBodyBuilder_1 = require("./AccountAddressRestrictionTransactionBodyBuilder");
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
class EmbeddedAccountAddressRestrictionTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        super(signerPublicKey, version, network, type);
        this.accountAddressRestrictionTransactionBody = new AccountAddressRestrictionTransactionBodyBuilder_1.AccountAddressRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const accountAddressRestrictionTransactionBody = AccountAddressRestrictionTransactionBodyBuilder_1.AccountAddressRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountAddressRestrictionTransactionBody.getSize());
        return new EmbeddedAccountAddressRestrictionTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, accountAddressRestrictionTransactionBody.restrictionFlags, accountAddressRestrictionTransactionBody.restrictionAdditions, accountAddressRestrictionTransactionBody.restrictionDeletions);
    }
    getRestrictionFlags() {
        return this.accountAddressRestrictionTransactionBody.getRestrictionFlags();
    }
    getAccountRestrictionTransactionBody_Reserved1() {
        return this.accountAddressRestrictionTransactionBody.getAccountRestrictionTransactionBody_Reserved1();
    }
    getRestrictionAdditions() {
        return this.accountAddressRestrictionTransactionBody.getRestrictionAdditions();
    }
    getRestrictionDeletions() {
        return this.accountAddressRestrictionTransactionBody.getRestrictionDeletions();
    }
    getSize() {
        let size = super.getSize();
        size += this.accountAddressRestrictionTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const accountAddressRestrictionTransactionBodyBytes = this.accountAddressRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountAddressRestrictionTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedAccountAddressRestrictionTransactionBuilder = EmbeddedAccountAddressRestrictionTransactionBuilder;

},{"./AccountAddressRestrictionTransactionBodyBuilder":1,"./EmbeddedTransactionBuilder":58,"./GeneratorUtils":64}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountKeyLinkTransactionBodyBuilder_1 = require("./AccountKeyLinkTransactionBodyBuilder");
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
class EmbeddedAccountKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, remotePublicKey, linkAction) {
        super(signerPublicKey, version, network, type);
        this.accountKeyLinkTransactionBody = new AccountKeyLinkTransactionBodyBuilder_1.AccountKeyLinkTransactionBodyBuilder(remotePublicKey, linkAction);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const accountKeyLinkTransactionBody = AccountKeyLinkTransactionBodyBuilder_1.AccountKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountKeyLinkTransactionBody.getSize());
        return new EmbeddedAccountKeyLinkTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, accountKeyLinkTransactionBody.remotePublicKey, accountKeyLinkTransactionBody.linkAction);
    }
    getRemotePublicKey() {
        return this.accountKeyLinkTransactionBody.getRemotePublicKey();
    }
    getLinkAction() {
        return this.accountKeyLinkTransactionBody.getLinkAction();
    }
    getSize() {
        let size = super.getSize();
        size += this.accountKeyLinkTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const accountKeyLinkTransactionBodyBytes = this.accountKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountKeyLinkTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedAccountKeyLinkTransactionBuilder = EmbeddedAccountKeyLinkTransactionBuilder;

},{"./AccountKeyLinkTransactionBodyBuilder":4,"./EmbeddedTransactionBuilder":58,"./GeneratorUtils":64}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountMetadataTransactionBodyBuilder_1 = require("./AccountMetadataTransactionBodyBuilder");
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
class EmbeddedAccountMetadataTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, targetPublicKey, scopedMetadataKey, valueSizeDelta, value) {
        super(signerPublicKey, version, network, type);
        this.accountMetadataTransactionBody = new AccountMetadataTransactionBodyBuilder_1.AccountMetadataTransactionBodyBuilder(targetPublicKey, scopedMetadataKey, valueSizeDelta, value);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const accountMetadataTransactionBody = AccountMetadataTransactionBodyBuilder_1.AccountMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountMetadataTransactionBody.getSize());
        return new EmbeddedAccountMetadataTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, accountMetadataTransactionBody.targetPublicKey, accountMetadataTransactionBody.scopedMetadataKey, accountMetadataTransactionBody.valueSizeDelta, accountMetadataTransactionBody.value);
    }
    getTargetPublicKey() {
        return this.accountMetadataTransactionBody.getTargetPublicKey();
    }
    getScopedMetadataKey() {
        return this.accountMetadataTransactionBody.getScopedMetadataKey();
    }
    getValueSizeDelta() {
        return this.accountMetadataTransactionBody.getValueSizeDelta();
    }
    getValue() {
        return this.accountMetadataTransactionBody.getValue();
    }
    getSize() {
        let size = super.getSize();
        size += this.accountMetadataTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const accountMetadataTransactionBodyBytes = this.accountMetadataTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountMetadataTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedAccountMetadataTransactionBuilder = EmbeddedAccountMetadataTransactionBuilder;

},{"./AccountMetadataTransactionBodyBuilder":6,"./EmbeddedTransactionBuilder":58,"./GeneratorUtils":64}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountMosaicRestrictionTransactionBodyBuilder_1 = require("./AccountMosaicRestrictionTransactionBodyBuilder");
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
class EmbeddedAccountMosaicRestrictionTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        super(signerPublicKey, version, network, type);
        this.accountMosaicRestrictionTransactionBody = new AccountMosaicRestrictionTransactionBodyBuilder_1.AccountMosaicRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const accountMosaicRestrictionTransactionBody = AccountMosaicRestrictionTransactionBodyBuilder_1.AccountMosaicRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountMosaicRestrictionTransactionBody.getSize());
        return new EmbeddedAccountMosaicRestrictionTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, accountMosaicRestrictionTransactionBody.restrictionFlags, accountMosaicRestrictionTransactionBody.restrictionAdditions, accountMosaicRestrictionTransactionBody.restrictionDeletions);
    }
    getRestrictionFlags() {
        return this.accountMosaicRestrictionTransactionBody.getRestrictionFlags();
    }
    getAccountRestrictionTransactionBody_Reserved1() {
        return this.accountMosaicRestrictionTransactionBody.getAccountRestrictionTransactionBody_Reserved1();
    }
    getRestrictionAdditions() {
        return this.accountMosaicRestrictionTransactionBody.getRestrictionAdditions();
    }
    getRestrictionDeletions() {
        return this.accountMosaicRestrictionTransactionBody.getRestrictionDeletions();
    }
    getSize() {
        let size = super.getSize();
        size += this.accountMosaicRestrictionTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const accountMosaicRestrictionTransactionBodyBytes = this.accountMosaicRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountMosaicRestrictionTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedAccountMosaicRestrictionTransactionBuilder = EmbeddedAccountMosaicRestrictionTransactionBuilder;

},{"./AccountMosaicRestrictionTransactionBodyBuilder":8,"./EmbeddedTransactionBuilder":58,"./GeneratorUtils":64}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountOperationRestrictionTransactionBodyBuilder_1 = require("./AccountOperationRestrictionTransactionBodyBuilder");
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
class EmbeddedAccountOperationRestrictionTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, restrictionFlags, restrictionAdditions, restrictionDeletions) {
        super(signerPublicKey, version, network, type);
        this.accountOperationRestrictionTransactionBody = new AccountOperationRestrictionTransactionBodyBuilder_1.AccountOperationRestrictionTransactionBodyBuilder(restrictionFlags, restrictionAdditions, restrictionDeletions);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const accountOperationRestrictionTransactionBody = AccountOperationRestrictionTransactionBodyBuilder_1.AccountOperationRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountOperationRestrictionTransactionBody.getSize());
        return new EmbeddedAccountOperationRestrictionTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, accountOperationRestrictionTransactionBody.restrictionFlags, accountOperationRestrictionTransactionBody.restrictionAdditions, accountOperationRestrictionTransactionBody.restrictionDeletions);
    }
    getRestrictionFlags() {
        return this.accountOperationRestrictionTransactionBody.getRestrictionFlags();
    }
    getAccountRestrictionTransactionBody_Reserved1() {
        return this.accountOperationRestrictionTransactionBody.getAccountRestrictionTransactionBody_Reserved1();
    }
    getRestrictionAdditions() {
        return this.accountOperationRestrictionTransactionBody.getRestrictionAdditions();
    }
    getRestrictionDeletions() {
        return this.accountOperationRestrictionTransactionBody.getRestrictionDeletions();
    }
    getSize() {
        let size = super.getSize();
        size += this.accountOperationRestrictionTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const accountOperationRestrictionTransactionBodyBytes = this.accountOperationRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountOperationRestrictionTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedAccountOperationRestrictionTransactionBuilder = EmbeddedAccountOperationRestrictionTransactionBuilder;

},{"./AccountOperationRestrictionTransactionBodyBuilder":10,"./EmbeddedTransactionBuilder":58,"./GeneratorUtils":64}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AddressAliasTransactionBodyBuilder_1 = require("./AddressAliasTransactionBodyBuilder");
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
class EmbeddedAddressAliasTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, namespaceId, address, aliasAction) {
        super(signerPublicKey, version, network, type);
        this.addressAliasTransactionBody = new AddressAliasTransactionBodyBuilder_1.AddressAliasTransactionBodyBuilder(namespaceId, address, aliasAction);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const addressAliasTransactionBody = AddressAliasTransactionBodyBuilder_1.AddressAliasTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, addressAliasTransactionBody.getSize());
        return new EmbeddedAddressAliasTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, addressAliasTransactionBody.namespaceId, addressAliasTransactionBody.address, addressAliasTransactionBody.aliasAction);
    }
    getNamespaceId() {
        return this.addressAliasTransactionBody.getNamespaceId();
    }
    getAddress() {
        return this.addressAliasTransactionBody.getAddress();
    }
    getAliasAction() {
        return this.addressAliasTransactionBody.getAliasAction();
    }
    getSize() {
        let size = super.getSize();
        size += this.addressAliasTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const addressAliasTransactionBodyBytes = this.addressAliasTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressAliasTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedAddressAliasTransactionBuilder = EmbeddedAddressAliasTransactionBuilder;

},{"./AddressAliasTransactionBodyBuilder":20,"./EmbeddedTransactionBuilder":58,"./GeneratorUtils":64}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const HashLockTransactionBodyBuilder_1 = require("./HashLockTransactionBodyBuilder");
class EmbeddedHashLockTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, mosaic, duration, hash) {
        super(signerPublicKey, version, network, type);
        this.hashLockTransactionBody = new HashLockTransactionBodyBuilder_1.HashLockTransactionBodyBuilder(mosaic, duration, hash);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const hashLockTransactionBody = HashLockTransactionBodyBuilder_1.HashLockTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, hashLockTransactionBody.getSize());
        return new EmbeddedHashLockTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, hashLockTransactionBody.mosaic, hashLockTransactionBody.duration, hashLockTransactionBody.hash);
    }
    getMosaic() {
        return this.hashLockTransactionBody.getMosaic();
    }
    getDuration() {
        return this.hashLockTransactionBody.getDuration();
    }
    getHash() {
        return this.hashLockTransactionBody.getHash();
    }
    getSize() {
        let size = super.getSize();
        size += this.hashLockTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const hashLockTransactionBodyBytes = this.hashLockTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, hashLockTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedHashLockTransactionBuilder = EmbeddedHashLockTransactionBuilder;

},{"./EmbeddedTransactionBuilder":58,"./GeneratorUtils":64,"./HashLockTransactionBodyBuilder":70}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicAddressRestrictionTransactionBodyBuilder_1 = require("./MosaicAddressRestrictionTransactionBodyBuilder");
class EmbeddedMosaicAddressRestrictionTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress) {
        super(signerPublicKey, version, network, type);
        this.mosaicAddressRestrictionTransactionBody = new MosaicAddressRestrictionTransactionBodyBuilder_1.MosaicAddressRestrictionTransactionBodyBuilder(mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const mosaicAddressRestrictionTransactionBody = MosaicAddressRestrictionTransactionBodyBuilder_1.MosaicAddressRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicAddressRestrictionTransactionBody.getSize());
        return new EmbeddedMosaicAddressRestrictionTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, mosaicAddressRestrictionTransactionBody.mosaicId, mosaicAddressRestrictionTransactionBody.restrictionKey, mosaicAddressRestrictionTransactionBody.previousRestrictionValue, mosaicAddressRestrictionTransactionBody.newRestrictionValue, mosaicAddressRestrictionTransactionBody.targetAddress);
    }
    getMosaicId() {
        return this.mosaicAddressRestrictionTransactionBody.getMosaicId();
    }
    getRestrictionKey() {
        return this.mosaicAddressRestrictionTransactionBody.getRestrictionKey();
    }
    getPreviousRestrictionValue() {
        return this.mosaicAddressRestrictionTransactionBody.getPreviousRestrictionValue();
    }
    getNewRestrictionValue() {
        return this.mosaicAddressRestrictionTransactionBody.getNewRestrictionValue();
    }
    getTargetAddress() {
        return this.mosaicAddressRestrictionTransactionBody.getTargetAddress();
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaicAddressRestrictionTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicAddressRestrictionTransactionBodyBytes = this.mosaicAddressRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicAddressRestrictionTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedMosaicAddressRestrictionTransactionBuilder = EmbeddedMosaicAddressRestrictionTransactionBuilder;

},{"./EmbeddedTransactionBuilder":58,"./GeneratorUtils":64,"./MosaicAddressRestrictionTransactionBodyBuilder":83}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicAliasTransactionBodyBuilder_1 = require("./MosaicAliasTransactionBodyBuilder");
class EmbeddedMosaicAliasTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, namespaceId, mosaicId, aliasAction) {
        super(signerPublicKey, version, network, type);
        this.mosaicAliasTransactionBody = new MosaicAliasTransactionBodyBuilder_1.MosaicAliasTransactionBodyBuilder(namespaceId, mosaicId, aliasAction);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const mosaicAliasTransactionBody = MosaicAliasTransactionBodyBuilder_1.MosaicAliasTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicAliasTransactionBody.getSize());
        return new EmbeddedMosaicAliasTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, mosaicAliasTransactionBody.namespaceId, mosaicAliasTransactionBody.mosaicId, mosaicAliasTransactionBody.aliasAction);
    }
    getNamespaceId() {
        return this.mosaicAliasTransactionBody.getNamespaceId();
    }
    getMosaicId() {
        return this.mosaicAliasTransactionBody.getMosaicId();
    }
    getAliasAction() {
        return this.mosaicAliasTransactionBody.getAliasAction();
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaicAliasTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicAliasTransactionBodyBytes = this.mosaicAliasTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicAliasTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedMosaicAliasTransactionBuilder = EmbeddedMosaicAliasTransactionBuilder;

},{"./EmbeddedTransactionBuilder":58,"./GeneratorUtils":64,"./MosaicAliasTransactionBodyBuilder":85}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicDefinitionTransactionBodyBuilder_1 = require("./MosaicDefinitionTransactionBodyBuilder");
class EmbeddedMosaicDefinitionTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, id, duration, nonce, flags, divisibility) {
        super(signerPublicKey, version, network, type);
        this.mosaicDefinitionTransactionBody = new MosaicDefinitionTransactionBodyBuilder_1.MosaicDefinitionTransactionBodyBuilder(id, duration, nonce, flags, divisibility);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const mosaicDefinitionTransactionBody = MosaicDefinitionTransactionBodyBuilder_1.MosaicDefinitionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicDefinitionTransactionBody.getSize());
        return new EmbeddedMosaicDefinitionTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, mosaicDefinitionTransactionBody.id, mosaicDefinitionTransactionBody.duration, mosaicDefinitionTransactionBody.nonce, mosaicDefinitionTransactionBody.flags, mosaicDefinitionTransactionBody.divisibility);
    }
    getId() {
        return this.mosaicDefinitionTransactionBody.getId();
    }
    getDuration() {
        return this.mosaicDefinitionTransactionBody.getDuration();
    }
    getNonce() {
        return this.mosaicDefinitionTransactionBody.getNonce();
    }
    getFlags() {
        return this.mosaicDefinitionTransactionBody.getFlags();
    }
    getDivisibility() {
        return this.mosaicDefinitionTransactionBody.getDivisibility();
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaicDefinitionTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicDefinitionTransactionBodyBytes = this.mosaicDefinitionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicDefinitionTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedMosaicDefinitionTransactionBuilder = EmbeddedMosaicDefinitionTransactionBuilder;

},{"./EmbeddedTransactionBuilder":58,"./GeneratorUtils":64,"./MosaicDefinitionTransactionBodyBuilder":89}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicGlobalRestrictionTransactionBodyBuilder_1 = require("./MosaicGlobalRestrictionTransactionBodyBuilder");
class EmbeddedMosaicGlobalRestrictionTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType) {
        super(signerPublicKey, version, network, type);
        this.mosaicGlobalRestrictionTransactionBody = new MosaicGlobalRestrictionTransactionBodyBuilder_1.MosaicGlobalRestrictionTransactionBodyBuilder(mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const mosaicGlobalRestrictionTransactionBody = MosaicGlobalRestrictionTransactionBodyBuilder_1.MosaicGlobalRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicGlobalRestrictionTransactionBody.getSize());
        return new EmbeddedMosaicGlobalRestrictionTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, mosaicGlobalRestrictionTransactionBody.mosaicId, mosaicGlobalRestrictionTransactionBody.referenceMosaicId, mosaicGlobalRestrictionTransactionBody.restrictionKey, mosaicGlobalRestrictionTransactionBody.previousRestrictionValue, mosaicGlobalRestrictionTransactionBody.newRestrictionValue, mosaicGlobalRestrictionTransactionBody.previousRestrictionType, mosaicGlobalRestrictionTransactionBody.newRestrictionType);
    }
    getMosaicId() {
        return this.mosaicGlobalRestrictionTransactionBody.getMosaicId();
    }
    getReferenceMosaicId() {
        return this.mosaicGlobalRestrictionTransactionBody.getReferenceMosaicId();
    }
    getRestrictionKey() {
        return this.mosaicGlobalRestrictionTransactionBody.getRestrictionKey();
    }
    getPreviousRestrictionValue() {
        return this.mosaicGlobalRestrictionTransactionBody.getPreviousRestrictionValue();
    }
    getNewRestrictionValue() {
        return this.mosaicGlobalRestrictionTransactionBody.getNewRestrictionValue();
    }
    getPreviousRestrictionType() {
        return this.mosaicGlobalRestrictionTransactionBody.getPreviousRestrictionType();
    }
    getNewRestrictionType() {
        return this.mosaicGlobalRestrictionTransactionBody.getNewRestrictionType();
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaicGlobalRestrictionTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicGlobalRestrictionTransactionBodyBytes = this.mosaicGlobalRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicGlobalRestrictionTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedMosaicGlobalRestrictionTransactionBuilder = EmbeddedMosaicGlobalRestrictionTransactionBuilder;

},{"./EmbeddedTransactionBuilder":58,"./GeneratorUtils":64,"./MosaicGlobalRestrictionTransactionBodyBuilder":94}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicMetadataTransactionBodyBuilder_1 = require("./MosaicMetadataTransactionBodyBuilder");
class EmbeddedMosaicMetadataTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, targetPublicKey, scopedMetadataKey, targetMosaicId, valueSizeDelta, value) {
        super(signerPublicKey, version, network, type);
        this.mosaicMetadataTransactionBody = new MosaicMetadataTransactionBodyBuilder_1.MosaicMetadataTransactionBodyBuilder(targetPublicKey, scopedMetadataKey, targetMosaicId, valueSizeDelta, value);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const mosaicMetadataTransactionBody = MosaicMetadataTransactionBodyBuilder_1.MosaicMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicMetadataTransactionBody.getSize());
        return new EmbeddedMosaicMetadataTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, mosaicMetadataTransactionBody.targetPublicKey, mosaicMetadataTransactionBody.scopedMetadataKey, mosaicMetadataTransactionBody.targetMosaicId, mosaicMetadataTransactionBody.valueSizeDelta, mosaicMetadataTransactionBody.value);
    }
    getTargetPublicKey() {
        return this.mosaicMetadataTransactionBody.getTargetPublicKey();
    }
    getScopedMetadataKey() {
        return this.mosaicMetadataTransactionBody.getScopedMetadataKey();
    }
    getTargetMosaicId() {
        return this.mosaicMetadataTransactionBody.getTargetMosaicId();
    }
    getValueSizeDelta() {
        return this.mosaicMetadataTransactionBody.getValueSizeDelta();
    }
    getValue() {
        return this.mosaicMetadataTransactionBody.getValue();
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaicMetadataTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicMetadataTransactionBodyBytes = this.mosaicMetadataTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicMetadataTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedMosaicMetadataTransactionBuilder = EmbeddedMosaicMetadataTransactionBuilder;

},{"./EmbeddedTransactionBuilder":58,"./GeneratorUtils":64,"./MosaicMetadataTransactionBodyBuilder":97}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicSupplyChangeTransactionBodyBuilder_1 = require("./MosaicSupplyChangeTransactionBodyBuilder");
class EmbeddedMosaicSupplyChangeTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, mosaicId, delta, action) {
        super(signerPublicKey, version, network, type);
        this.mosaicSupplyChangeTransactionBody = new MosaicSupplyChangeTransactionBodyBuilder_1.MosaicSupplyChangeTransactionBodyBuilder(mosaicId, delta, action);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const mosaicSupplyChangeTransactionBody = MosaicSupplyChangeTransactionBodyBuilder_1.MosaicSupplyChangeTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicSupplyChangeTransactionBody.getSize());
        return new EmbeddedMosaicSupplyChangeTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, mosaicSupplyChangeTransactionBody.mosaicId, mosaicSupplyChangeTransactionBody.delta, mosaicSupplyChangeTransactionBody.action);
    }
    getMosaicId() {
        return this.mosaicSupplyChangeTransactionBody.getMosaicId();
    }
    getDelta() {
        return this.mosaicSupplyChangeTransactionBody.getDelta();
    }
    getAction() {
        return this.mosaicSupplyChangeTransactionBody.getAction();
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaicSupplyChangeTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicSupplyChangeTransactionBodyBytes = this.mosaicSupplyChangeTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicSupplyChangeTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedMosaicSupplyChangeTransactionBuilder = EmbeddedMosaicSupplyChangeTransactionBuilder;

},{"./EmbeddedTransactionBuilder":58,"./GeneratorUtils":64,"./MosaicSupplyChangeTransactionBodyBuilder":106}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MultisigAccountModificationTransactionBodyBuilder_1 = require("./MultisigAccountModificationTransactionBodyBuilder");
class EmbeddedMultisigAccountModificationTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, minRemovalDelta, minApprovalDelta, publicKeyAdditions, publicKeyDeletions) {
        super(signerPublicKey, version, network, type);
        this.multisigAccountModificationTransactionBody = new MultisigAccountModificationTransactionBodyBuilder_1.MultisigAccountModificationTransactionBodyBuilder(minRemovalDelta, minApprovalDelta, publicKeyAdditions, publicKeyDeletions);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const multisigAccountModificationTransactionBody = MultisigAccountModificationTransactionBodyBuilder_1.MultisigAccountModificationTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, multisigAccountModificationTransactionBody.getSize());
        return new EmbeddedMultisigAccountModificationTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, multisigAccountModificationTransactionBody.minRemovalDelta, multisigAccountModificationTransactionBody.minApprovalDelta, multisigAccountModificationTransactionBody.publicKeyAdditions, multisigAccountModificationTransactionBody.publicKeyDeletions);
    }
    getMinRemovalDelta() {
        return this.multisigAccountModificationTransactionBody.getMinRemovalDelta();
    }
    getMinApprovalDelta() {
        return this.multisigAccountModificationTransactionBody.getMinApprovalDelta();
    }
    getMultisigAccountModificationTransactionBody_Reserved1() {
        return this.multisigAccountModificationTransactionBody.getMultisigAccountModificationTransactionBody_Reserved1();
    }
    getPublicKeyAdditions() {
        return this.multisigAccountModificationTransactionBody.getPublicKeyAdditions();
    }
    getPublicKeyDeletions() {
        return this.multisigAccountModificationTransactionBody.getPublicKeyDeletions();
    }
    getSize() {
        let size = super.getSize();
        size += this.multisigAccountModificationTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const multisigAccountModificationTransactionBodyBytes = this.multisigAccountModificationTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, multisigAccountModificationTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedMultisigAccountModificationTransactionBuilder = EmbeddedMultisigAccountModificationTransactionBuilder;

},{"./EmbeddedTransactionBuilder":58,"./GeneratorUtils":64,"./MultisigAccountModificationTransactionBodyBuilder":108}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const NamespaceMetadataTransactionBodyBuilder_1 = require("./NamespaceMetadataTransactionBodyBuilder");
class EmbeddedNamespaceMetadataTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, targetPublicKey, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value) {
        super(signerPublicKey, version, network, type);
        this.namespaceMetadataTransactionBody = new NamespaceMetadataTransactionBodyBuilder_1.NamespaceMetadataTransactionBodyBuilder(targetPublicKey, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const namespaceMetadataTransactionBody = NamespaceMetadataTransactionBodyBuilder_1.NamespaceMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceMetadataTransactionBody.getSize());
        return new EmbeddedNamespaceMetadataTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, namespaceMetadataTransactionBody.targetPublicKey, namespaceMetadataTransactionBody.scopedMetadataKey, namespaceMetadataTransactionBody.targetNamespaceId, namespaceMetadataTransactionBody.valueSizeDelta, namespaceMetadataTransactionBody.value);
    }
    getTargetPublicKey() {
        return this.namespaceMetadataTransactionBody.getTargetPublicKey();
    }
    getScopedMetadataKey() {
        return this.namespaceMetadataTransactionBody.getScopedMetadataKey();
    }
    getTargetNamespaceId() {
        return this.namespaceMetadataTransactionBody.getTargetNamespaceId();
    }
    getValueSizeDelta() {
        return this.namespaceMetadataTransactionBody.getValueSizeDelta();
    }
    getValue() {
        return this.namespaceMetadataTransactionBody.getValue();
    }
    getSize() {
        let size = super.getSize();
        size += this.namespaceMetadataTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const namespaceMetadataTransactionBodyBytes = this.namespaceMetadataTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, namespaceMetadataTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedNamespaceMetadataTransactionBuilder = EmbeddedNamespaceMetadataTransactionBuilder;

},{"./EmbeddedTransactionBuilder":58,"./GeneratorUtils":64,"./NamespaceMetadataTransactionBodyBuilder":116}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const NamespaceRegistrationTransactionBodyBuilder_1 = require("./NamespaceRegistrationTransactionBodyBuilder");
class EmbeddedNamespaceRegistrationTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, id, name, duration, parentId) {
        super(signerPublicKey, version, network, type);
        this.namespaceRegistrationTransactionBody = new NamespaceRegistrationTransactionBodyBuilder_1.NamespaceRegistrationTransactionBodyBuilder(id, name, duration, parentId);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const namespaceRegistrationTransactionBody = NamespaceRegistrationTransactionBodyBuilder_1.NamespaceRegistrationTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceRegistrationTransactionBody.getSize());
        return new EmbeddedNamespaceRegistrationTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, namespaceRegistrationTransactionBody.id, namespaceRegistrationTransactionBody.name, namespaceRegistrationTransactionBody.duration, namespaceRegistrationTransactionBody.parentId);
    }
    getDuration() {
        return this.namespaceRegistrationTransactionBody.getDuration();
    }
    getParentId() {
        return this.namespaceRegistrationTransactionBody.getParentId();
    }
    getId() {
        return this.namespaceRegistrationTransactionBody.getId();
    }
    getRegistrationType() {
        return this.namespaceRegistrationTransactionBody.getRegistrationType();
    }
    getName() {
        return this.namespaceRegistrationTransactionBody.getName();
    }
    getSize() {
        let size = super.getSize();
        size += this.namespaceRegistrationTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const namespaceRegistrationTransactionBodyBytes = this.namespaceRegistrationTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, namespaceRegistrationTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedNamespaceRegistrationTransactionBuilder = EmbeddedNamespaceRegistrationTransactionBuilder;

},{"./EmbeddedTransactionBuilder":58,"./GeneratorUtils":64,"./NamespaceRegistrationTransactionBodyBuilder":119}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const NodeKeyLinkTransactionBodyBuilder_1 = require("./NodeKeyLinkTransactionBodyBuilder");
class EmbeddedNodeKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, linkedPublicKey, linkAction) {
        super(signerPublicKey, version, network, type);
        this.nodeKeyLinkTransactionBody = new NodeKeyLinkTransactionBodyBuilder_1.NodeKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const nodeKeyLinkTransactionBody = NodeKeyLinkTransactionBodyBuilder_1.NodeKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, nodeKeyLinkTransactionBody.getSize());
        return new EmbeddedNodeKeyLinkTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, nodeKeyLinkTransactionBody.linkedPublicKey, nodeKeyLinkTransactionBody.linkAction);
    }
    getLinkedPublicKey() {
        return this.nodeKeyLinkTransactionBody.getLinkedPublicKey();
    }
    getLinkAction() {
        return this.nodeKeyLinkTransactionBody.getLinkAction();
    }
    getSize() {
        let size = super.getSize();
        size += this.nodeKeyLinkTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const nodeKeyLinkTransactionBodyBytes = this.nodeKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, nodeKeyLinkTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedNodeKeyLinkTransactionBuilder = EmbeddedNodeKeyLinkTransactionBuilder;

},{"./EmbeddedTransactionBuilder":58,"./GeneratorUtils":64,"./NodeKeyLinkTransactionBodyBuilder":122}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const SecretLockTransactionBodyBuilder_1 = require("./SecretLockTransactionBodyBuilder");
class EmbeddedSecretLockTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, secret, mosaic, duration, hashAlgorithm, recipientAddress) {
        super(signerPublicKey, version, network, type);
        this.secretLockTransactionBody = new SecretLockTransactionBodyBuilder_1.SecretLockTransactionBodyBuilder(secret, mosaic, duration, hashAlgorithm, recipientAddress);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const secretLockTransactionBody = SecretLockTransactionBodyBuilder_1.SecretLockTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secretLockTransactionBody.getSize());
        return new EmbeddedSecretLockTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, secretLockTransactionBody.secret, secretLockTransactionBody.mosaic, secretLockTransactionBody.duration, secretLockTransactionBody.hashAlgorithm, secretLockTransactionBody.recipientAddress);
    }
    getSecret() {
        return this.secretLockTransactionBody.getSecret();
    }
    getMosaic() {
        return this.secretLockTransactionBody.getMosaic();
    }
    getDuration() {
        return this.secretLockTransactionBody.getDuration();
    }
    getHashAlgorithm() {
        return this.secretLockTransactionBody.getHashAlgorithm();
    }
    getRecipientAddress() {
        return this.secretLockTransactionBody.getRecipientAddress();
    }
    getSize() {
        let size = super.getSize();
        size += this.secretLockTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const secretLockTransactionBodyBytes = this.secretLockTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secretLockTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedSecretLockTransactionBuilder = EmbeddedSecretLockTransactionBuilder;

},{"./EmbeddedTransactionBuilder":58,"./GeneratorUtils":64,"./SecretLockTransactionBodyBuilder":133}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const SecretProofTransactionBodyBuilder_1 = require("./SecretProofTransactionBodyBuilder");
class EmbeddedSecretProofTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, secret, hashAlgorithm, recipientAddress, proof) {
        super(signerPublicKey, version, network, type);
        this.secretProofTransactionBody = new SecretProofTransactionBodyBuilder_1.SecretProofTransactionBodyBuilder(secret, hashAlgorithm, recipientAddress, proof);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const secretProofTransactionBody = SecretProofTransactionBodyBuilder_1.SecretProofTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secretProofTransactionBody.getSize());
        return new EmbeddedSecretProofTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, secretProofTransactionBody.secret, secretProofTransactionBody.hashAlgorithm, secretProofTransactionBody.recipientAddress, secretProofTransactionBody.proof);
    }
    getSecret() {
        return this.secretProofTransactionBody.getSecret();
    }
    getHashAlgorithm() {
        return this.secretProofTransactionBody.getHashAlgorithm();
    }
    getRecipientAddress() {
        return this.secretProofTransactionBody.getRecipientAddress();
    }
    getProof() {
        return this.secretProofTransactionBody.getProof();
    }
    getSize() {
        let size = super.getSize();
        size += this.secretProofTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const secretProofTransactionBodyBytes = this.secretProofTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secretProofTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedSecretProofTransactionBuilder = EmbeddedSecretProofTransactionBuilder;

},{"./EmbeddedTransactionBuilder":58,"./GeneratorUtils":64,"./SecretProofTransactionBodyBuilder":135}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const KeyDto_1 = require("./KeyDto");
class EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type) {
        this.size = 0;
        this.embeddedTransactionHeader_Reserved1 = 0;
        this.signerPublicKey = signerPublicKey;
        this.entityBody_Reserved1 = 0;
        this.version = version;
        this.network = network;
        this.type = type;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const size = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        const embeddedTransactionHeader_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        const signerPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signerPublicKey.getSize());
        const entityBody_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        const version = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const network = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const type = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        return new EmbeddedTransactionBuilder(signerPublicKey, version, network, type);
    }
    getEmbeddedTransactionHeader_Reserved1() {
        return this.embeddedTransactionHeader_Reserved1;
    }
    getSignerPublicKey() {
        return this.signerPublicKey;
    }
    getEntityBody_Reserved1() {
        return this.entityBody_Reserved1;
    }
    getVersion() {
        return this.version;
    }
    getNetwork() {
        return this.network;
    }
    getType() {
        return this.type;
    }
    getSize() {
        let size = 0;
        size += 4;
        size += 4;
        size += this.signerPublicKey.getSize();
        size += 4;
        size += 1;
        size += 1;
        size += 2;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const sizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getSize(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, sizeBytes);
        const embeddedTransactionHeader_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getEmbeddedTransactionHeader_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, embeddedTransactionHeader_Reserved1Bytes);
        const signerPublicKeyBytes = this.signerPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, signerPublicKeyBytes);
        const entityBody_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getEntityBody_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, entityBody_Reserved1Bytes);
        const versionBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getVersion(), 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, versionBytes);
        const networkBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.network, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, networkBytes);
        const typeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.type, 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, typeBytes);
        return newArray;
    }
}
exports.EmbeddedTransactionBuilder = EmbeddedTransactionBuilder;

},{"./GeneratorUtils":64,"./KeyDto":79}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmbeddedAccountAddressRestrictionTransactionBuilder_1 = require("./EmbeddedAccountAddressRestrictionTransactionBuilder");
const EmbeddedAccountKeyLinkTransactionBuilder_1 = require("./EmbeddedAccountKeyLinkTransactionBuilder");
const EmbeddedAccountMetadataTransactionBuilder_1 = require("./EmbeddedAccountMetadataTransactionBuilder");
const EmbeddedAccountMosaicRestrictionTransactionBuilder_1 = require("./EmbeddedAccountMosaicRestrictionTransactionBuilder");
const EmbeddedAccountOperationRestrictionTransactionBuilder_1 = require("./EmbeddedAccountOperationRestrictionTransactionBuilder");
const EmbeddedAddressAliasTransactionBuilder_1 = require("./EmbeddedAddressAliasTransactionBuilder");
const EmbeddedHashLockTransactionBuilder_1 = require("./EmbeddedHashLockTransactionBuilder");
const EmbeddedMosaicAddressRestrictionTransactionBuilder_1 = require("./EmbeddedMosaicAddressRestrictionTransactionBuilder");
const EmbeddedMosaicAliasTransactionBuilder_1 = require("./EmbeddedMosaicAliasTransactionBuilder");
const EmbeddedMosaicDefinitionTransactionBuilder_1 = require("./EmbeddedMosaicDefinitionTransactionBuilder");
const EmbeddedMosaicGlobalRestrictionTransactionBuilder_1 = require("./EmbeddedMosaicGlobalRestrictionTransactionBuilder");
const EmbeddedMosaicMetadataTransactionBuilder_1 = require("./EmbeddedMosaicMetadataTransactionBuilder");
const EmbeddedMosaicSupplyChangeTransactionBuilder_1 = require("./EmbeddedMosaicSupplyChangeTransactionBuilder");
const EmbeddedMultisigAccountModificationTransactionBuilder_1 = require("./EmbeddedMultisigAccountModificationTransactionBuilder");
const EmbeddedNamespaceMetadataTransactionBuilder_1 = require("./EmbeddedNamespaceMetadataTransactionBuilder");
const EmbeddedNamespaceRegistrationTransactionBuilder_1 = require("./EmbeddedNamespaceRegistrationTransactionBuilder");
const EmbeddedNodeKeyLinkTransactionBuilder_1 = require("./EmbeddedNodeKeyLinkTransactionBuilder");
const EmbeddedSecretLockTransactionBuilder_1 = require("./EmbeddedSecretLockTransactionBuilder");
const EmbeddedSecretProofTransactionBuilder_1 = require("./EmbeddedSecretProofTransactionBuilder");
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const EmbeddedTransferTransactionBuilder_1 = require("./EmbeddedTransferTransactionBuilder");
const EmbeddedVotingKeyLinkTransactionBuilder_1 = require("./EmbeddedVotingKeyLinkTransactionBuilder");
const EmbeddedVrfKeyLinkTransactionBuilder_1 = require("./EmbeddedVrfKeyLinkTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
class EmbeddedTransactionHelper {
    static serialize(transaction) {
        const byte = transaction.serialize();
        const padding = new Uint8Array(GeneratorUtils_1.GeneratorUtils.getTransactionPaddingSize(byte.length, 8));
        return GeneratorUtils_1.GeneratorUtils.concatTypedArrays(byte, padding);
    }
    static loadFromBinary(bytes) {
        const header = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(bytes);
        switch (header.getType()) {
            case EntityTypeDto_1.EntityTypeDto.MOSAIC_DEFINITION_TRANSACTION_BUILDER:
                return EmbeddedMosaicDefinitionTransactionBuilder_1.EmbeddedMosaicDefinitionTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.ACCOUNT_KEY_LINK_TRANSACTION_BUILDER:
                return EmbeddedAccountKeyLinkTransactionBuilder_1.EmbeddedAccountKeyLinkTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.NODE_KEY_LINK_TRANSACTION_BUILDER:
                return EmbeddedNodeKeyLinkTransactionBuilder_1.EmbeddedNodeKeyLinkTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.VOTING_KEY_LINK_TRANSACTION_BUILDER:
                return EmbeddedVotingKeyLinkTransactionBuilder_1.EmbeddedVotingKeyLinkTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.VRF_KEY_LINK_TRANSACTION_BUILDER:
                return EmbeddedVrfKeyLinkTransactionBuilder_1.EmbeddedVrfKeyLinkTransactionBuilder.loadFromBinary(bytes);
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
                throw new Error(`Transaction type: ${header.getType()} not recognized.`);
        }
    }
    static getEmbeddedTransactionSize(transactions) {
        return transactions.map((o) => EmbeddedTransactionHelper.serialize(o).length).reduce((a, b) => a + b, 0);
    }
}
exports.EmbeddedTransactionHelper = EmbeddedTransactionHelper;

},{"./EmbeddedAccountAddressRestrictionTransactionBuilder":39,"./EmbeddedAccountKeyLinkTransactionBuilder":40,"./EmbeddedAccountMetadataTransactionBuilder":41,"./EmbeddedAccountMosaicRestrictionTransactionBuilder":42,"./EmbeddedAccountOperationRestrictionTransactionBuilder":43,"./EmbeddedAddressAliasTransactionBuilder":44,"./EmbeddedHashLockTransactionBuilder":45,"./EmbeddedMosaicAddressRestrictionTransactionBuilder":46,"./EmbeddedMosaicAliasTransactionBuilder":47,"./EmbeddedMosaicDefinitionTransactionBuilder":48,"./EmbeddedMosaicGlobalRestrictionTransactionBuilder":49,"./EmbeddedMosaicMetadataTransactionBuilder":50,"./EmbeddedMosaicSupplyChangeTransactionBuilder":51,"./EmbeddedMultisigAccountModificationTransactionBuilder":52,"./EmbeddedNamespaceMetadataTransactionBuilder":53,"./EmbeddedNamespaceRegistrationTransactionBuilder":54,"./EmbeddedNodeKeyLinkTransactionBuilder":55,"./EmbeddedSecretLockTransactionBuilder":56,"./EmbeddedSecretProofTransactionBuilder":57,"./EmbeddedTransactionBuilder":58,"./EmbeddedTransferTransactionBuilder":60,"./EmbeddedVotingKeyLinkTransactionBuilder":61,"./EmbeddedVrfKeyLinkTransactionBuilder":62,"./EntityTypeDto":63,"./GeneratorUtils":64}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransferTransactionBodyBuilder_1 = require("./TransferTransactionBodyBuilder");
class EmbeddedTransferTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, recipientAddress, mosaics, message) {
        super(signerPublicKey, version, network, type);
        this.transferTransactionBody = new TransferTransactionBodyBuilder_1.TransferTransactionBodyBuilder(recipientAddress, mosaics, message);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const transferTransactionBody = TransferTransactionBodyBuilder_1.TransferTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, transferTransactionBody.getSize());
        return new EmbeddedTransferTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, transferTransactionBody.recipientAddress, transferTransactionBody.mosaics, transferTransactionBody.message);
    }
    getRecipientAddress() {
        return this.transferTransactionBody.getRecipientAddress();
    }
    getTransferTransactionBody_Reserved1() {
        return this.transferTransactionBody.getTransferTransactionBody_Reserved1();
    }
    getMosaics() {
        return this.transferTransactionBody.getMosaics();
    }
    getMessage() {
        return this.transferTransactionBody.getMessage();
    }
    getSize() {
        let size = super.getSize();
        size += this.transferTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const transferTransactionBodyBytes = this.transferTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, transferTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedTransferTransactionBuilder = EmbeddedTransferTransactionBuilder;

},{"./EmbeddedTransactionBuilder":58,"./GeneratorUtils":64,"./TransferTransactionBodyBuilder":141}],61:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const VotingKeyLinkTransactionBodyBuilder_1 = require("./VotingKeyLinkTransactionBodyBuilder");
class EmbeddedVotingKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, linkedPublicKey, linkAction) {
        super(signerPublicKey, version, network, type);
        this.votingKeyLinkTransactionBody = new VotingKeyLinkTransactionBodyBuilder_1.VotingKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const votingKeyLinkTransactionBody = VotingKeyLinkTransactionBodyBuilder_1.VotingKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, votingKeyLinkTransactionBody.getSize());
        return new EmbeddedVotingKeyLinkTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, votingKeyLinkTransactionBody.linkedPublicKey, votingKeyLinkTransactionBody.linkAction);
    }
    getLinkedPublicKey() {
        return this.votingKeyLinkTransactionBody.getLinkedPublicKey();
    }
    getLinkAction() {
        return this.votingKeyLinkTransactionBody.getLinkAction();
    }
    getSize() {
        let size = super.getSize();
        size += this.votingKeyLinkTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const votingKeyLinkTransactionBodyBytes = this.votingKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, votingKeyLinkTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedVotingKeyLinkTransactionBuilder = EmbeddedVotingKeyLinkTransactionBuilder;

},{"./EmbeddedTransactionBuilder":58,"./GeneratorUtils":64,"./VotingKeyLinkTransactionBodyBuilder":147}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmbeddedTransactionBuilder_1 = require("./EmbeddedTransactionBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const VrfKeyLinkTransactionBodyBuilder_1 = require("./VrfKeyLinkTransactionBodyBuilder");
class EmbeddedVrfKeyLinkTransactionBuilder extends EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder {
    constructor(signerPublicKey, version, network, type, linkedPublicKey, linkAction) {
        super(signerPublicKey, version, network, type);
        this.vrfKeyLinkTransactionBody = new VrfKeyLinkTransactionBodyBuilder_1.VrfKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = EmbeddedTransactionBuilder_1.EmbeddedTransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const vrfKeyLinkTransactionBody = VrfKeyLinkTransactionBodyBuilder_1.VrfKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, vrfKeyLinkTransactionBody.getSize());
        return new EmbeddedVrfKeyLinkTransactionBuilder(superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, vrfKeyLinkTransactionBody.linkedPublicKey, vrfKeyLinkTransactionBody.linkAction);
    }
    getLinkedPublicKey() {
        return this.vrfKeyLinkTransactionBody.getLinkedPublicKey();
    }
    getLinkAction() {
        return this.vrfKeyLinkTransactionBody.getLinkAction();
    }
    getSize() {
        let size = super.getSize();
        size += this.vrfKeyLinkTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const vrfKeyLinkTransactionBodyBytes = this.vrfKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, vrfKeyLinkTransactionBodyBytes);
        return newArray;
    }
}
exports.EmbeddedVrfKeyLinkTransactionBuilder = EmbeddedVrfKeyLinkTransactionBuilder;

},{"./EmbeddedTransactionBuilder":58,"./GeneratorUtils":64,"./VrfKeyLinkTransactionBodyBuilder":149}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EntityTypeDto;
(function (EntityTypeDto) {
    EntityTypeDto[EntityTypeDto["RESERVED"] = 0] = "RESERVED";
    EntityTypeDto[EntityTypeDto["MOSAIC_DEFINITION_TRANSACTION_BUILDER"] = 16717] = "MOSAIC_DEFINITION_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["ACCOUNT_KEY_LINK_TRANSACTION_BUILDER"] = 16716] = "ACCOUNT_KEY_LINK_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["NODE_KEY_LINK_TRANSACTION_BUILDER"] = 16972] = "NODE_KEY_LINK_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["AGGREGATE_COMPLETE_TRANSACTION_BUILDER"] = 16705] = "AGGREGATE_COMPLETE_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["AGGREGATE_BONDED_TRANSACTION_BUILDER"] = 16961] = "AGGREGATE_BONDED_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["VOTING_KEY_LINK_TRANSACTION_BUILDER"] = 16707] = "VOTING_KEY_LINK_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["VRF_KEY_LINK_TRANSACTION_BUILDER"] = 16963] = "VRF_KEY_LINK_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["HASH_LOCK_TRANSACTION_BUILDER"] = 16712] = "HASH_LOCK_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["SECRET_LOCK_TRANSACTION_BUILDER"] = 16722] = "SECRET_LOCK_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["SECRET_PROOF_TRANSACTION_BUILDER"] = 16978] = "SECRET_PROOF_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["ACCOUNT_METADATA_TRANSACTION_BUILDER"] = 16708] = "ACCOUNT_METADATA_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["MOSAIC_METADATA_TRANSACTION_BUILDER"] = 16964] = "MOSAIC_METADATA_TRANSACTION_BUILDER";
    EntityTypeDto[EntityTypeDto["NAMESPACE_METADATA_TRANSACTION_BUILDER"] = 17220] = "NAMESPACE_METADATA_TRANSACTION_BUILDER";
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

},{}],64:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GeneratorUtils {
    static bufferToUint64(input) {
        if (8 !== input.length) {
            throw Error(`byte array has unexpected size '${input.length}'`);
        }
        input = input.reverse();
        const view = new DataView(input.buffer);
        return [view.getUint32(4), view.getUint32(0)];
    }
    static readUint32At(bytes, index) {
        return ((bytes[index] +
            (bytes[index + 1] << 8) +
            (bytes[index + 2] << 16) +
            (bytes[index + 3] << 24)) >>>
            0);
    }
    static uintToBuffer(uintValue, bufferSize) {
        const buffer = new ArrayBuffer(bufferSize);
        const dataView = new DataView(buffer);
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
                throw new Error("Unexpected bufferSize");
            }
            return new Uint8Array(buffer);
        }
        catch (e) {
            throw new Error(`Converting uint value ${uintValue} into buffer with error: ${e}`);
        }
    }
    static bufferToUint(buffer) {
        const dataView = new DataView(buffer.buffer);
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
            throw new Error("Unexpected buffer size");
        }
        catch (e) {
            throw new Error(`Converting buffer into number with error: ${e}`);
        }
    }
    static uint64ToBuffer(uintValue) {
        const uint32Array = new Uint32Array(uintValue);
        return new Uint8Array(uint32Array.buffer);
    }
    static concatTypedArrays(array1, array2) {
        const newArray = new Uint8Array(array1.length + array2.length);
        newArray.set(array1);
        newArray.set(array2, array1.length);
        return newArray;
    }
    static getBytes(binary, size) {
        if (size > binary.length) {
            throw new RangeError();
        }
        const bytes = binary.slice(0, size);
        return bytes;
    }
    static getTransactionPaddingSize(size, alignment) {
        return 0 === size % alignment ? 0 : alignment - (size % alignment);
    }
    static compact(uint64) {
        const low = uint64[0];
        const high = uint64[1];
        if (0x00200000 <= high) {
            return uint64;
        }
        return high * 0x100000000 + low;
    }
    static fromUint(number) {
        const value = [(number & 0xffffffff) >>> 0, (number / 0x100000000) >>> 0];
        return value;
    }
}
exports.GeneratorUtils = GeneratorUtils;
GeneratorUtils.uint8ToInt8 = (input) => {
    if (0xff < input) {
        throw Error(`input '${input}' is out of range`);
    }
    return (input << 24) >> 24;
};

},{}],65:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicRestrictionKeyDto_1 = require("./MosaicRestrictionKeyDto");
const RestrictionRuleBuilder_1 = require("./RestrictionRuleBuilder");
class GlobalKeyValueBuilder {
    constructor(key, restrictionRule) {
        this.key = key;
        this.restrictionRule = restrictionRule;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const key = MosaicRestrictionKeyDto_1.MosaicRestrictionKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, key.getSize());
        const restrictionRule = RestrictionRuleBuilder_1.RestrictionRuleBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, restrictionRule.getSize());
        return new GlobalKeyValueBuilder(key, restrictionRule);
    }
    getKey() {
        return this.key;
    }
    getRestrictionRule() {
        return this.restrictionRule;
    }
    getSize() {
        let size = 0;
        size += this.key.getSize();
        size += this.restrictionRule.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const keyBytes = this.key.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, keyBytes);
        const restrictionRuleBytes = this.restrictionRule.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionRuleBytes);
        return newArray;
    }
}
exports.GlobalKeyValueBuilder = GlobalKeyValueBuilder;

},{"./GeneratorUtils":64,"./MosaicRestrictionKeyDto":105,"./RestrictionRuleBuilder":129}],66:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const GlobalKeyValueBuilder_1 = require("./GlobalKeyValueBuilder");
class GlobalKeyValueSetBuilder {
    constructor(keys) {
        this.keys = keys;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const keyValueCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const keys = [];
        for (let i = 0; i < (Array.isArray(keyValueCount) ? GeneratorUtils_1.GeneratorUtils.compact(keyValueCount) : keyValueCount); i++) {
            const item = GlobalKeyValueBuilder_1.GlobalKeyValueBuilder.loadFromBinary(Uint8Array.from(byteArray));
            keys.push(item);
            byteArray.splice(0, item.getSize());
        }
        return new GlobalKeyValueSetBuilder(keys);
    }
    getKeys() {
        return this.keys;
    }
    getSize() {
        let size = 0;
        size += 1;
        this.keys.forEach((o) => size += o.getSize());
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const keyValueCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.keys.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, keyValueCountBytes);
        this.keys.forEach((item) => {
            const keysBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, keysBytes);
        });
        return newArray;
    }
}
exports.GlobalKeyValueSetBuilder = GlobalKeyValueSetBuilder;

},{"./GeneratorUtils":64,"./GlobalKeyValueBuilder":65}],67:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class Hash256Dto {
    constructor(hash256) {
        this.hash256 = hash256;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const hash256 = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 32);
        byteArray.splice(0, 32);
        return new Hash256Dto(hash256);
    }
    getHash256() {
        return this.hash256;
    }
    getSize() {
        return 32;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.hash256);
        return newArray;
    }
}
exports.Hash256Dto = Hash256Dto;

},{"./GeneratorUtils":64}],68:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class Hash512Dto {
    constructor(hash512) {
        this.hash512 = hash512;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const hash512 = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 64);
        byteArray.splice(0, 64);
        return new Hash512Dto(hash512);
    }
    getHash512() {
        return this.hash512;
    }
    getSize() {
        return 64;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.hash512);
        return newArray;
    }
}
exports.Hash512Dto = Hash512Dto;

},{"./GeneratorUtils":64}],69:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const Hash256Dto_1 = require("./Hash256Dto");
const HeightDto_1 = require("./HeightDto");
const KeyDto_1 = require("./KeyDto");
const MosaicBuilder_1 = require("./MosaicBuilder");
class HashLockInfoBuilder {
    constructor(senderPublicKey, mosaic, endHeight, status, hash) {
        this.senderPublicKey = senderPublicKey;
        this.mosaic = mosaic;
        this.endHeight = endHeight;
        this.status = status;
        this.hash = hash;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const senderPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, senderPublicKey.getSize());
        const mosaic = MosaicBuilder_1.MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        const endHeight = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, endHeight.getSize());
        const status = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const hash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, hash.getSize());
        return new HashLockInfoBuilder(senderPublicKey, mosaic, endHeight, status, hash);
    }
    getSenderPublicKey() {
        return this.senderPublicKey;
    }
    getMosaic() {
        return this.mosaic;
    }
    getEndHeight() {
        return this.endHeight;
    }
    getStatus() {
        return this.status;
    }
    getHash() {
        return this.hash;
    }
    getSize() {
        let size = 0;
        size += this.senderPublicKey.getSize();
        size += this.mosaic.getSize();
        size += this.endHeight.getSize();
        size += 1;
        size += this.hash.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const senderPublicKeyBytes = this.senderPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, senderPublicKeyBytes);
        const mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        const endHeightBytes = this.endHeight.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, endHeightBytes);
        const statusBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.status, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, statusBytes);
        const hashBytes = this.hash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, hashBytes);
        return newArray;
    }
}
exports.HashLockInfoBuilder = HashLockInfoBuilder;

},{"./GeneratorUtils":64,"./Hash256Dto":67,"./HeightDto":74,"./KeyDto":79,"./MosaicBuilder":87}],70:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockDurationDto_1 = require("./BlockDurationDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const Hash256Dto_1 = require("./Hash256Dto");
const UnresolvedMosaicBuilder_1 = require("./UnresolvedMosaicBuilder");
class HashLockTransactionBodyBuilder {
    constructor(mosaic, duration, hash) {
        this.mosaic = mosaic;
        this.duration = duration;
        this.hash = hash;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const mosaic = UnresolvedMosaicBuilder_1.UnresolvedMosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        const duration = BlockDurationDto_1.BlockDurationDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, duration.getSize());
        const hash = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, hash.getSize());
        return new HashLockTransactionBodyBuilder(mosaic, duration, hash);
    }
    getMosaic() {
        return this.mosaic;
    }
    getDuration() {
        return this.duration;
    }
    getHash() {
        return this.hash;
    }
    getSize() {
        let size = 0;
        size += this.mosaic.getSize();
        size += this.duration.getSize();
        size += this.hash.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        const durationBytes = this.duration.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, durationBytes);
        const hashBytes = this.hash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, hashBytes);
        return newArray;
    }
}
exports.HashLockTransactionBodyBuilder = HashLockTransactionBodyBuilder;

},{"./BlockDurationDto":33,"./GeneratorUtils":64,"./Hash256Dto":67,"./UnresolvedMosaicBuilder":144}],71:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const HashLockTransactionBodyBuilder_1 = require("./HashLockTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class HashLockTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, mosaic, duration, hash) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.hashLockTransactionBody = new HashLockTransactionBodyBuilder_1.HashLockTransactionBodyBuilder(mosaic, duration, hash);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const hashLockTransactionBody = HashLockTransactionBodyBuilder_1.HashLockTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, hashLockTransactionBody.getSize());
        return new HashLockTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, hashLockTransactionBody.mosaic, hashLockTransactionBody.duration, hashLockTransactionBody.hash);
    }
    getMosaic() {
        return this.hashLockTransactionBody.getMosaic();
    }
    getDuration() {
        return this.hashLockTransactionBody.getDuration();
    }
    getHash() {
        return this.hashLockTransactionBody.getHash();
    }
    getSize() {
        let size = super.getSize();
        size += this.hashLockTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const hashLockTransactionBodyBytes = this.hashLockTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, hashLockTransactionBodyBytes);
        return newArray;
    }
}
exports.HashLockTransactionBuilder = HashLockTransactionBuilder;

},{"./GeneratorUtils":64,"./HashLockTransactionBodyBuilder":70,"./TransactionBuilder":139}],72:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AmountDto_1 = require("./AmountDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const ImportanceHeightDto_1 = require("./ImportanceHeightDto");
class HeightActivityBucketBuilder {
    constructor(startHeight, totalFeesPaid, beneficiaryCount, rawScore) {
        this.startHeight = startHeight;
        this.totalFeesPaid = totalFeesPaid;
        this.beneficiaryCount = beneficiaryCount;
        this.rawScore = rawScore;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const startHeight = ImportanceHeightDto_1.ImportanceHeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, startHeight.getSize());
        const totalFeesPaid = AmountDto_1.AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, totalFeesPaid.getSize());
        const beneficiaryCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        const rawScore = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new HeightActivityBucketBuilder(startHeight, totalFeesPaid, beneficiaryCount, rawScore);
    }
    getStartHeight() {
        return this.startHeight;
    }
    getTotalFeesPaid() {
        return this.totalFeesPaid;
    }
    getBeneficiaryCount() {
        return this.beneficiaryCount;
    }
    getRawScore() {
        return this.rawScore;
    }
    getSize() {
        let size = 0;
        size += this.startHeight.getSize();
        size += this.totalFeesPaid.getSize();
        size += 4;
        size += 8;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const startHeightBytes = this.startHeight.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, startHeightBytes);
        const totalFeesPaidBytes = this.totalFeesPaid.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, totalFeesPaidBytes);
        const beneficiaryCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getBeneficiaryCount(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, beneficiaryCountBytes);
        const rawScoreBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getRawScore());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, rawScoreBytes);
        return newArray;
    }
}
exports.HeightActivityBucketBuilder = HeightActivityBucketBuilder;

},{"./AmountDto":30,"./GeneratorUtils":64,"./ImportanceHeightDto":76}],73:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class HeightActivityBucketsBuilder {
    constructor(buckets) {
        this.buckets = buckets;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const buckets = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 5);
        byteArray.splice(0, 5);
        return new HeightActivityBucketsBuilder(buckets);
    }
    getBuckets() {
        return this.buckets;
    }
    getSize() {
        let size = 0;
        size += this.buckets.length;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.buckets);
        return newArray;
    }
}
exports.HeightActivityBucketsBuilder = HeightActivityBucketsBuilder;

},{"./GeneratorUtils":64}],74:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class HeightDto {
    constructor(height) {
        this.height = height;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const height = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new HeightDto(height);
    }
    getHeight() {
        return this.height;
    }
    getSize() {
        return 8;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const heightBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getHeight());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, heightBytes);
        return newArray;
    }
}
exports.HeightDto = HeightDto;

},{"./GeneratorUtils":64}],75:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class ImportanceDto {
    constructor(importance) {
        this.importance = importance;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const importance = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new ImportanceDto(importance);
    }
    getImportance() {
        return this.importance;
    }
    getSize() {
        return 8;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const importanceBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getImportance());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, importanceBytes);
        return newArray;
    }
}
exports.ImportanceDto = ImportanceDto;

},{"./GeneratorUtils":64}],76:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class ImportanceHeightDto {
    constructor(importanceHeight) {
        this.importanceHeight = importanceHeight;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const importanceHeight = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new ImportanceHeightDto(importanceHeight);
    }
    getImportanceHeight() {
        return this.importanceHeight;
    }
    getSize() {
        return 8;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const importanceHeightBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getImportanceHeight());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, importanceHeightBytes);
        return newArray;
    }
}
exports.ImportanceHeightDto = ImportanceHeightDto;

},{"./GeneratorUtils":64}],77:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const ImportanceDto_1 = require("./ImportanceDto");
const ImportanceHeightDto_1 = require("./ImportanceHeightDto");
class ImportanceSnapshotBuilder {
    constructor(importance, height) {
        this.importance = importance;
        this.height = height;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const importance = ImportanceDto_1.ImportanceDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, importance.getSize());
        const height = ImportanceHeightDto_1.ImportanceHeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, height.getSize());
        return new ImportanceSnapshotBuilder(importance, height);
    }
    getImportance() {
        return this.importance;
    }
    getHeight() {
        return this.height;
    }
    getSize() {
        let size = 0;
        size += this.importance.getSize();
        size += this.height.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const importanceBytes = this.importance.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, importanceBytes);
        const heightBytes = this.height.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, heightBytes);
        return newArray;
    }
}
exports.ImportanceSnapshotBuilder = ImportanceSnapshotBuilder;

},{"./GeneratorUtils":64,"./ImportanceDto":75,"./ImportanceHeightDto":76}],78:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicBuilder_1 = require("./MosaicBuilder");
const ReceiptBuilder_1 = require("./ReceiptBuilder");
class InflationReceiptBuilder extends ReceiptBuilder_1.ReceiptBuilder {
    constructor(version, type, mosaic) {
        super(version, type);
        this.mosaic = mosaic;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = ReceiptBuilder_1.ReceiptBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const mosaic = MosaicBuilder_1.MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        return new InflationReceiptBuilder(superObject.version, superObject.type, mosaic);
    }
    getMosaic() {
        return this.mosaic;
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaic.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        return newArray;
    }
}
exports.InflationReceiptBuilder = InflationReceiptBuilder;

},{"./GeneratorUtils":64,"./MosaicBuilder":87,"./ReceiptBuilder":127}],79:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class KeyDto {
    constructor(key) {
        this.key = key;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const key = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 32);
        byteArray.splice(0, 32);
        return new KeyDto(key);
    }
    getKey() {
        return this.key;
    }
    getSize() {
        return 32;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.key);
        return newArray;
    }
}
exports.KeyDto = KeyDto;

},{"./GeneratorUtils":64}],80:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const KeyDto_1 = require("./KeyDto");
const MetadataValueBuilder_1 = require("./MetadataValueBuilder");
const ScopedMetadataKeyDto_1 = require("./ScopedMetadataKeyDto");
class MetadataEntryBuilder {
    constructor(sourcePublicKey, targetPublicKey, scopedMetadataKey, targetId, metadataType, value) {
        this.sourcePublicKey = sourcePublicKey;
        this.targetPublicKey = targetPublicKey;
        this.scopedMetadataKey = scopedMetadataKey;
        this.targetId = targetId;
        this.metadataType = metadataType;
        this.value = value;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const sourcePublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, sourcePublicKey.getSize());
        const targetPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetPublicKey.getSize());
        const scopedMetadataKey = ScopedMetadataKeyDto_1.ScopedMetadataKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, scopedMetadataKey.getSize());
        const targetId = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        const metadataType = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const value = MetadataValueBuilder_1.MetadataValueBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, value.getSize());
        return new MetadataEntryBuilder(sourcePublicKey, targetPublicKey, scopedMetadataKey, targetId, metadataType, value);
    }
    getSourcePublicKey() {
        return this.sourcePublicKey;
    }
    getTargetPublicKey() {
        return this.targetPublicKey;
    }
    getScopedMetadataKey() {
        return this.scopedMetadataKey;
    }
    getTargetId() {
        return this.targetId;
    }
    getMetadataType() {
        return this.metadataType;
    }
    getValue() {
        return this.value;
    }
    getSize() {
        let size = 0;
        size += this.sourcePublicKey.getSize();
        size += this.targetPublicKey.getSize();
        size += this.scopedMetadataKey.getSize();
        size += 8;
        size += 1;
        size += this.value.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const sourcePublicKeyBytes = this.sourcePublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, sourcePublicKeyBytes);
        const targetPublicKeyBytes = this.targetPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetPublicKeyBytes);
        const scopedMetadataKeyBytes = this.scopedMetadataKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, scopedMetadataKeyBytes);
        const targetIdBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getTargetId());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetIdBytes);
        const metadataTypeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.metadataType, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, metadataTypeBytes);
        const valueBytes = this.value.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueBytes);
        return newArray;
    }
}
exports.MetadataEntryBuilder = MetadataEntryBuilder;

},{"./GeneratorUtils":64,"./KeyDto":79,"./MetadataValueBuilder":81,"./ScopedMetadataKeyDto":131}],81:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class MetadataValueBuilder {
    constructor(data) {
        this.size = 0;
        this.data = data;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const size = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        const data = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), size);
        byteArray.splice(0, size);
        return new MetadataValueBuilder(data);
    }
    getData() {
        return this.data;
    }
    getSize() {
        let size = 0;
        size += 2;
        size += this.data.length;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const sizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getSize(), 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, sizeBytes);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.data);
        return newArray;
    }
}
exports.MetadataValueBuilder = MetadataValueBuilder;

},{"./GeneratorUtils":64}],82:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AddressDto_1 = require("./AddressDto");
const AddressKeyValueSetBuilder_1 = require("./AddressKeyValueSetBuilder");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicIdDto_1 = require("./MosaicIdDto");
class MosaicAddressRestrictionEntryBuilder {
    constructor(mosaicId, address, keyPairs) {
        this.mosaicId = mosaicId;
        this.address = address;
        this.keyPairs = keyPairs;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const mosaicId = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        const address = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, address.getSize());
        const keyPairs = AddressKeyValueSetBuilder_1.AddressKeyValueSetBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, keyPairs.getSize());
        return new MosaicAddressRestrictionEntryBuilder(mosaicId, address, keyPairs);
    }
    getMosaicId() {
        return this.mosaicId;
    }
    getAddress() {
        return this.address;
    }
    getKeyPairs() {
        return this.keyPairs;
    }
    getSize() {
        let size = 0;
        size += this.mosaicId.getSize();
        size += this.address.getSize();
        size += this.keyPairs.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const addressBytes = this.address.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressBytes);
        const keyPairsBytes = this.keyPairs.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, keyPairsBytes);
        return newArray;
    }
}
exports.MosaicAddressRestrictionEntryBuilder = MosaicAddressRestrictionEntryBuilder;

},{"./AddressDto":22,"./AddressKeyValueSetBuilder":24,"./GeneratorUtils":64,"./MosaicIdDto":96}],83:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
const UnresolvedMosaicIdDto_1 = require("./UnresolvedMosaicIdDto");
class MosaicAddressRestrictionTransactionBodyBuilder {
    constructor(mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress) {
        this.mosaicId = mosaicId;
        this.restrictionKey = restrictionKey;
        this.previousRestrictionValue = previousRestrictionValue;
        this.newRestrictionValue = newRestrictionValue;
        this.targetAddress = targetAddress;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const mosaicId = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        const restrictionKey = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        const previousRestrictionValue = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        const newRestrictionValue = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        const targetAddress = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetAddress.getSize());
        return new MosaicAddressRestrictionTransactionBodyBuilder(mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress);
    }
    getMosaicId() {
        return this.mosaicId;
    }
    getRestrictionKey() {
        return this.restrictionKey;
    }
    getPreviousRestrictionValue() {
        return this.previousRestrictionValue;
    }
    getNewRestrictionValue() {
        return this.newRestrictionValue;
    }
    getTargetAddress() {
        return this.targetAddress;
    }
    getSize() {
        let size = 0;
        size += this.mosaicId.getSize();
        size += 8;
        size += 8;
        size += 8;
        size += this.targetAddress.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const restrictionKeyBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getRestrictionKey());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionKeyBytes);
        const previousRestrictionValueBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getPreviousRestrictionValue());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, previousRestrictionValueBytes);
        const newRestrictionValueBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getNewRestrictionValue());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, newRestrictionValueBytes);
        const targetAddressBytes = this.targetAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetAddressBytes);
        return newArray;
    }
}
exports.MosaicAddressRestrictionTransactionBodyBuilder = MosaicAddressRestrictionTransactionBodyBuilder;

},{"./GeneratorUtils":64,"./UnresolvedAddressDto":143,"./UnresolvedMosaicIdDto":145}],84:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicAddressRestrictionTransactionBodyBuilder_1 = require("./MosaicAddressRestrictionTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class MosaicAddressRestrictionTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.mosaicAddressRestrictionTransactionBody = new MosaicAddressRestrictionTransactionBodyBuilder_1.MosaicAddressRestrictionTransactionBodyBuilder(mosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, targetAddress);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const mosaicAddressRestrictionTransactionBody = MosaicAddressRestrictionTransactionBodyBuilder_1.MosaicAddressRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicAddressRestrictionTransactionBody.getSize());
        return new MosaicAddressRestrictionTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, mosaicAddressRestrictionTransactionBody.mosaicId, mosaicAddressRestrictionTransactionBody.restrictionKey, mosaicAddressRestrictionTransactionBody.previousRestrictionValue, mosaicAddressRestrictionTransactionBody.newRestrictionValue, mosaicAddressRestrictionTransactionBody.targetAddress);
    }
    getMosaicId() {
        return this.mosaicAddressRestrictionTransactionBody.getMosaicId();
    }
    getRestrictionKey() {
        return this.mosaicAddressRestrictionTransactionBody.getRestrictionKey();
    }
    getPreviousRestrictionValue() {
        return this.mosaicAddressRestrictionTransactionBody.getPreviousRestrictionValue();
    }
    getNewRestrictionValue() {
        return this.mosaicAddressRestrictionTransactionBody.getNewRestrictionValue();
    }
    getTargetAddress() {
        return this.mosaicAddressRestrictionTransactionBody.getTargetAddress();
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaicAddressRestrictionTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicAddressRestrictionTransactionBodyBytes = this.mosaicAddressRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicAddressRestrictionTransactionBodyBytes);
        return newArray;
    }
}
exports.MosaicAddressRestrictionTransactionBuilder = MosaicAddressRestrictionTransactionBuilder;

},{"./GeneratorUtils":64,"./MosaicAddressRestrictionTransactionBodyBuilder":83,"./TransactionBuilder":139}],85:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicIdDto_1 = require("./MosaicIdDto");
const NamespaceIdDto_1 = require("./NamespaceIdDto");
class MosaicAliasTransactionBodyBuilder {
    constructor(namespaceId, mosaicId, aliasAction) {
        this.namespaceId = namespaceId;
        this.mosaicId = mosaicId;
        this.aliasAction = aliasAction;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const namespaceId = NamespaceIdDto_1.NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceId.getSize());
        const mosaicId = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        const aliasAction = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        return new MosaicAliasTransactionBodyBuilder(namespaceId, mosaicId, aliasAction);
    }
    getNamespaceId() {
        return this.namespaceId;
    }
    getMosaicId() {
        return this.mosaicId;
    }
    getAliasAction() {
        return this.aliasAction;
    }
    getSize() {
        let size = 0;
        size += this.namespaceId.getSize();
        size += this.mosaicId.getSize();
        size += 1;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const namespaceIdBytes = this.namespaceId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, namespaceIdBytes);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const aliasActionBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.aliasAction, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, aliasActionBytes);
        return newArray;
    }
}
exports.MosaicAliasTransactionBodyBuilder = MosaicAliasTransactionBodyBuilder;

},{"./GeneratorUtils":64,"./MosaicIdDto":96,"./NamespaceIdDto":114}],86:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicAliasTransactionBodyBuilder_1 = require("./MosaicAliasTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class MosaicAliasTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, namespaceId, mosaicId, aliasAction) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.mosaicAliasTransactionBody = new MosaicAliasTransactionBodyBuilder_1.MosaicAliasTransactionBodyBuilder(namespaceId, mosaicId, aliasAction);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const mosaicAliasTransactionBody = MosaicAliasTransactionBodyBuilder_1.MosaicAliasTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicAliasTransactionBody.getSize());
        return new MosaicAliasTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, mosaicAliasTransactionBody.namespaceId, mosaicAliasTransactionBody.mosaicId, mosaicAliasTransactionBody.aliasAction);
    }
    getNamespaceId() {
        return this.mosaicAliasTransactionBody.getNamespaceId();
    }
    getMosaicId() {
        return this.mosaicAliasTransactionBody.getMosaicId();
    }
    getAliasAction() {
        return this.mosaicAliasTransactionBody.getAliasAction();
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaicAliasTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicAliasTransactionBodyBytes = this.mosaicAliasTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicAliasTransactionBodyBytes);
        return newArray;
    }
}
exports.MosaicAliasTransactionBuilder = MosaicAliasTransactionBuilder;

},{"./GeneratorUtils":64,"./MosaicAliasTransactionBodyBuilder":85,"./TransactionBuilder":139}],87:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AmountDto_1 = require("./AmountDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicIdDto_1 = require("./MosaicIdDto");
class MosaicBuilder {
    constructor(mosaicId, amount) {
        this.mosaicId = mosaicId;
        this.amount = amount;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const mosaicId = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        const amount = AmountDto_1.AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, amount.getSize());
        return new MosaicBuilder(mosaicId, amount);
    }
    getMosaicId() {
        return this.mosaicId;
    }
    getAmount() {
        return this.amount;
    }
    getSize() {
        let size = 0;
        size += this.mosaicId.getSize();
        size += this.amount.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const amountBytes = this.amount.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, amountBytes);
        return newArray;
    }
}
exports.MosaicBuilder = MosaicBuilder;

},{"./AmountDto":30,"./GeneratorUtils":64,"./MosaicIdDto":96}],88:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const HeightDto_1 = require("./HeightDto");
const KeyDto_1 = require("./KeyDto");
const MosaicPropertiesBuilder_1 = require("./MosaicPropertiesBuilder");
class MosaicDefinitionBuilder {
    constructor(startHeight, ownerPublicKey, revision, properties) {
        this.startHeight = startHeight;
        this.ownerPublicKey = ownerPublicKey;
        this.revision = revision;
        this.properties = properties;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const startHeight = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, startHeight.getSize());
        const ownerPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, ownerPublicKey.getSize());
        const revision = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        const properties = MosaicPropertiesBuilder_1.MosaicPropertiesBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, properties.getSize());
        return new MosaicDefinitionBuilder(startHeight, ownerPublicKey, revision, properties);
    }
    getStartHeight() {
        return this.startHeight;
    }
    getOwnerPublicKey() {
        return this.ownerPublicKey;
    }
    getRevision() {
        return this.revision;
    }
    getProperties() {
        return this.properties;
    }
    getSize() {
        let size = 0;
        size += this.startHeight.getSize();
        size += this.ownerPublicKey.getSize();
        size += 4;
        size += this.properties.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const startHeightBytes = this.startHeight.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, startHeightBytes);
        const ownerPublicKeyBytes = this.ownerPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, ownerPublicKeyBytes);
        const revisionBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getRevision(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, revisionBytes);
        const propertiesBytes = this.properties.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, propertiesBytes);
        return newArray;
    }
}
exports.MosaicDefinitionBuilder = MosaicDefinitionBuilder;

},{"./GeneratorUtils":64,"./HeightDto":74,"./KeyDto":79,"./MosaicPropertiesBuilder":100}],89:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockDurationDto_1 = require("./BlockDurationDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicIdDto_1 = require("./MosaicIdDto");
const MosaicNonceDto_1 = require("./MosaicNonceDto");
class MosaicDefinitionTransactionBodyBuilder {
    constructor(id, duration, nonce, flags, divisibility) {
        this.id = id;
        this.duration = duration;
        this.nonce = nonce;
        this.flags = flags;
        this.divisibility = divisibility;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const id = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, id.getSize());
        const duration = BlockDurationDto_1.BlockDurationDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, duration.getSize());
        const nonce = MosaicNonceDto_1.MosaicNonceDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, nonce.getSize());
        const flags = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const divisibility = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        return new MosaicDefinitionTransactionBodyBuilder(id, duration, nonce, flags, divisibility);
    }
    getId() {
        return this.id;
    }
    getDuration() {
        return this.duration;
    }
    getNonce() {
        return this.nonce;
    }
    getFlags() {
        return this.flags;
    }
    getDivisibility() {
        return this.divisibility;
    }
    getSize() {
        let size = 0;
        size += this.id.getSize();
        size += this.duration.getSize();
        size += this.nonce.getSize();
        size += 1;
        size += 1;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const idBytes = this.id.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, idBytes);
        const durationBytes = this.duration.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, durationBytes);
        const nonceBytes = this.nonce.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, nonceBytes);
        const flagsBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getFlags(), 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, flagsBytes);
        const divisibilityBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getDivisibility(), 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, divisibilityBytes);
        return newArray;
    }
}
exports.MosaicDefinitionTransactionBodyBuilder = MosaicDefinitionTransactionBodyBuilder;

},{"./BlockDurationDto":33,"./GeneratorUtils":64,"./MosaicIdDto":96,"./MosaicNonceDto":99}],90:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicDefinitionTransactionBodyBuilder_1 = require("./MosaicDefinitionTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class MosaicDefinitionTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, id, duration, nonce, flags, divisibility) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.mosaicDefinitionTransactionBody = new MosaicDefinitionTransactionBodyBuilder_1.MosaicDefinitionTransactionBodyBuilder(id, duration, nonce, flags, divisibility);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const mosaicDefinitionTransactionBody = MosaicDefinitionTransactionBodyBuilder_1.MosaicDefinitionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicDefinitionTransactionBody.getSize());
        return new MosaicDefinitionTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, mosaicDefinitionTransactionBody.id, mosaicDefinitionTransactionBody.duration, mosaicDefinitionTransactionBody.nonce, mosaicDefinitionTransactionBody.flags, mosaicDefinitionTransactionBody.divisibility);
    }
    getId() {
        return this.mosaicDefinitionTransactionBody.getId();
    }
    getDuration() {
        return this.mosaicDefinitionTransactionBody.getDuration();
    }
    getNonce() {
        return this.mosaicDefinitionTransactionBody.getNonce();
    }
    getFlags() {
        return this.mosaicDefinitionTransactionBody.getFlags();
    }
    getDivisibility() {
        return this.mosaicDefinitionTransactionBody.getDivisibility();
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaicDefinitionTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicDefinitionTransactionBodyBytes = this.mosaicDefinitionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicDefinitionTransactionBodyBytes);
        return newArray;
    }
}
exports.MosaicDefinitionTransactionBuilder = MosaicDefinitionTransactionBuilder;

},{"./GeneratorUtils":64,"./MosaicDefinitionTransactionBodyBuilder":89,"./TransactionBuilder":139}],91:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AmountDto_1 = require("./AmountDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicDefinitionBuilder_1 = require("./MosaicDefinitionBuilder");
const MosaicIdDto_1 = require("./MosaicIdDto");
class MosaicEntryBuilder {
    constructor(mosaicId, supply, definition) {
        this.mosaicId = mosaicId;
        this.supply = supply;
        this.definition = definition;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const mosaicId = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        const supply = AmountDto_1.AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, supply.getSize());
        const definition = MosaicDefinitionBuilder_1.MosaicDefinitionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, definition.getSize());
        return new MosaicEntryBuilder(mosaicId, supply, definition);
    }
    getMosaicId() {
        return this.mosaicId;
    }
    getSupply() {
        return this.supply;
    }
    getDefinition() {
        return this.definition;
    }
    getSize() {
        let size = 0;
        size += this.mosaicId.getSize();
        size += this.supply.getSize();
        size += this.definition.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const supplyBytes = this.supply.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, supplyBytes);
        const definitionBytes = this.definition.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, definitionBytes);
        return newArray;
    }
}
exports.MosaicEntryBuilder = MosaicEntryBuilder;

},{"./AmountDto":30,"./GeneratorUtils":64,"./MosaicDefinitionBuilder":88,"./MosaicIdDto":96}],92:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicIdDto_1 = require("./MosaicIdDto");
const ReceiptBuilder_1 = require("./ReceiptBuilder");
class MosaicExpiryReceiptBuilder extends ReceiptBuilder_1.ReceiptBuilder {
    constructor(version, type, artifactId) {
        super(version, type);
        this.artifactId = artifactId;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = ReceiptBuilder_1.ReceiptBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const artifactId = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, artifactId.getSize());
        return new MosaicExpiryReceiptBuilder(superObject.version, superObject.type, artifactId);
    }
    getArtifactId() {
        return this.artifactId;
    }
    getSize() {
        let size = super.getSize();
        size += this.artifactId.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const artifactIdBytes = this.artifactId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, artifactIdBytes);
        return newArray;
    }
}
exports.MosaicExpiryReceiptBuilder = MosaicExpiryReceiptBuilder;

},{"./GeneratorUtils":64,"./MosaicIdDto":96,"./ReceiptBuilder":127}],93:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const GlobalKeyValueSetBuilder_1 = require("./GlobalKeyValueSetBuilder");
const MosaicIdDto_1 = require("./MosaicIdDto");
class MosaicGlobalRestrictionEntryBuilder {
    constructor(mosaicId, keyPairs) {
        this.mosaicId = mosaicId;
        this.keyPairs = keyPairs;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const mosaicId = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        const keyPairs = GlobalKeyValueSetBuilder_1.GlobalKeyValueSetBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, keyPairs.getSize());
        return new MosaicGlobalRestrictionEntryBuilder(mosaicId, keyPairs);
    }
    getMosaicId() {
        return this.mosaicId;
    }
    getKeyPairs() {
        return this.keyPairs;
    }
    getSize() {
        let size = 0;
        size += this.mosaicId.getSize();
        size += this.keyPairs.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const keyPairsBytes = this.keyPairs.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, keyPairsBytes);
        return newArray;
    }
}
exports.MosaicGlobalRestrictionEntryBuilder = MosaicGlobalRestrictionEntryBuilder;

},{"./GeneratorUtils":64,"./GlobalKeyValueSetBuilder":66,"./MosaicIdDto":96}],94:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const UnresolvedMosaicIdDto_1 = require("./UnresolvedMosaicIdDto");
class MosaicGlobalRestrictionTransactionBodyBuilder {
    constructor(mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType) {
        this.mosaicId = mosaicId;
        this.referenceMosaicId = referenceMosaicId;
        this.restrictionKey = restrictionKey;
        this.previousRestrictionValue = previousRestrictionValue;
        this.newRestrictionValue = newRestrictionValue;
        this.previousRestrictionType = previousRestrictionType;
        this.newRestrictionType = newRestrictionType;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const mosaicId = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        const referenceMosaicId = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, referenceMosaicId.getSize());
        const restrictionKey = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        const previousRestrictionValue = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        const newRestrictionValue = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        const previousRestrictionType = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const newRestrictionType = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        return new MosaicGlobalRestrictionTransactionBodyBuilder(mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType);
    }
    getMosaicId() {
        return this.mosaicId;
    }
    getReferenceMosaicId() {
        return this.referenceMosaicId;
    }
    getRestrictionKey() {
        return this.restrictionKey;
    }
    getPreviousRestrictionValue() {
        return this.previousRestrictionValue;
    }
    getNewRestrictionValue() {
        return this.newRestrictionValue;
    }
    getPreviousRestrictionType() {
        return this.previousRestrictionType;
    }
    getNewRestrictionType() {
        return this.newRestrictionType;
    }
    getSize() {
        let size = 0;
        size += this.mosaicId.getSize();
        size += this.referenceMosaicId.getSize();
        size += 8;
        size += 8;
        size += 8;
        size += 1;
        size += 1;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const referenceMosaicIdBytes = this.referenceMosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, referenceMosaicIdBytes);
        const restrictionKeyBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getRestrictionKey());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionKeyBytes);
        const previousRestrictionValueBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getPreviousRestrictionValue());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, previousRestrictionValueBytes);
        const newRestrictionValueBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getNewRestrictionValue());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, newRestrictionValueBytes);
        const previousRestrictionTypeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.previousRestrictionType, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, previousRestrictionTypeBytes);
        const newRestrictionTypeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.newRestrictionType, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, newRestrictionTypeBytes);
        return newArray;
    }
}
exports.MosaicGlobalRestrictionTransactionBodyBuilder = MosaicGlobalRestrictionTransactionBodyBuilder;

},{"./GeneratorUtils":64,"./UnresolvedMosaicIdDto":145}],95:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicGlobalRestrictionTransactionBodyBuilder_1 = require("./MosaicGlobalRestrictionTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class MosaicGlobalRestrictionTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.mosaicGlobalRestrictionTransactionBody = new MosaicGlobalRestrictionTransactionBodyBuilder_1.MosaicGlobalRestrictionTransactionBodyBuilder(mosaicId, referenceMosaicId, restrictionKey, previousRestrictionValue, newRestrictionValue, previousRestrictionType, newRestrictionType);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const mosaicGlobalRestrictionTransactionBody = MosaicGlobalRestrictionTransactionBodyBuilder_1.MosaicGlobalRestrictionTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicGlobalRestrictionTransactionBody.getSize());
        return new MosaicGlobalRestrictionTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, mosaicGlobalRestrictionTransactionBody.mosaicId, mosaicGlobalRestrictionTransactionBody.referenceMosaicId, mosaicGlobalRestrictionTransactionBody.restrictionKey, mosaicGlobalRestrictionTransactionBody.previousRestrictionValue, mosaicGlobalRestrictionTransactionBody.newRestrictionValue, mosaicGlobalRestrictionTransactionBody.previousRestrictionType, mosaicGlobalRestrictionTransactionBody.newRestrictionType);
    }
    getMosaicId() {
        return this.mosaicGlobalRestrictionTransactionBody.getMosaicId();
    }
    getReferenceMosaicId() {
        return this.mosaicGlobalRestrictionTransactionBody.getReferenceMosaicId();
    }
    getRestrictionKey() {
        return this.mosaicGlobalRestrictionTransactionBody.getRestrictionKey();
    }
    getPreviousRestrictionValue() {
        return this.mosaicGlobalRestrictionTransactionBody.getPreviousRestrictionValue();
    }
    getNewRestrictionValue() {
        return this.mosaicGlobalRestrictionTransactionBody.getNewRestrictionValue();
    }
    getPreviousRestrictionType() {
        return this.mosaicGlobalRestrictionTransactionBody.getPreviousRestrictionType();
    }
    getNewRestrictionType() {
        return this.mosaicGlobalRestrictionTransactionBody.getNewRestrictionType();
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaicGlobalRestrictionTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicGlobalRestrictionTransactionBodyBytes = this.mosaicGlobalRestrictionTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicGlobalRestrictionTransactionBodyBytes);
        return newArray;
    }
}
exports.MosaicGlobalRestrictionTransactionBuilder = MosaicGlobalRestrictionTransactionBuilder;

},{"./GeneratorUtils":64,"./MosaicGlobalRestrictionTransactionBodyBuilder":94,"./TransactionBuilder":139}],96:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class MosaicIdDto {
    constructor(mosaicId) {
        this.mosaicId = mosaicId;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const mosaicId = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new MosaicIdDto(mosaicId);
    }
    getMosaicId() {
        return this.mosaicId;
    }
    getSize() {
        return 8;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const mosaicIdBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getMosaicId());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        return newArray;
    }
}
exports.MosaicIdDto = MosaicIdDto;

},{"./GeneratorUtils":64}],97:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const KeyDto_1 = require("./KeyDto");
const UnresolvedMosaicIdDto_1 = require("./UnresolvedMosaicIdDto");
class MosaicMetadataTransactionBodyBuilder {
    constructor(targetPublicKey, scopedMetadataKey, targetMosaicId, valueSizeDelta, value) {
        this.targetPublicKey = targetPublicKey;
        this.scopedMetadataKey = scopedMetadataKey;
        this.targetMosaicId = targetMosaicId;
        this.valueSizeDelta = valueSizeDelta;
        this.value = value;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const targetPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetPublicKey.getSize());
        const scopedMetadataKey = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        const targetMosaicId = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetMosaicId.getSize());
        const valueSizeDelta = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        const valueSize = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        const value = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), valueSize);
        byteArray.splice(0, valueSize);
        return new MosaicMetadataTransactionBodyBuilder(targetPublicKey, scopedMetadataKey, targetMosaicId, valueSizeDelta, value);
    }
    getTargetPublicKey() {
        return this.targetPublicKey;
    }
    getScopedMetadataKey() {
        return this.scopedMetadataKey;
    }
    getTargetMosaicId() {
        return this.targetMosaicId;
    }
    getValueSizeDelta() {
        return this.valueSizeDelta;
    }
    getValue() {
        return this.value;
    }
    getSize() {
        let size = 0;
        size += this.targetPublicKey.getSize();
        size += 8;
        size += this.targetMosaicId.getSize();
        size += 2;
        size += 2;
        size += this.value.length;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const targetPublicKeyBytes = this.targetPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetPublicKeyBytes);
        const scopedMetadataKeyBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getScopedMetadataKey());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, scopedMetadataKeyBytes);
        const targetMosaicIdBytes = this.targetMosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetMosaicIdBytes);
        const valueSizeDeltaBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getValueSizeDelta(), 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueSizeDeltaBytes);
        const valueSizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.value.length, 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueSizeBytes);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.value);
        return newArray;
    }
}
exports.MosaicMetadataTransactionBodyBuilder = MosaicMetadataTransactionBodyBuilder;

},{"./GeneratorUtils":64,"./KeyDto":79,"./UnresolvedMosaicIdDto":145}],98:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicMetadataTransactionBodyBuilder_1 = require("./MosaicMetadataTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class MosaicMetadataTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, targetPublicKey, scopedMetadataKey, targetMosaicId, valueSizeDelta, value) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.mosaicMetadataTransactionBody = new MosaicMetadataTransactionBodyBuilder_1.MosaicMetadataTransactionBodyBuilder(targetPublicKey, scopedMetadataKey, targetMosaicId, valueSizeDelta, value);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const mosaicMetadataTransactionBody = MosaicMetadataTransactionBodyBuilder_1.MosaicMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicMetadataTransactionBody.getSize());
        return new MosaicMetadataTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, mosaicMetadataTransactionBody.targetPublicKey, mosaicMetadataTransactionBody.scopedMetadataKey, mosaicMetadataTransactionBody.targetMosaicId, mosaicMetadataTransactionBody.valueSizeDelta, mosaicMetadataTransactionBody.value);
    }
    getTargetPublicKey() {
        return this.mosaicMetadataTransactionBody.getTargetPublicKey();
    }
    getScopedMetadataKey() {
        return this.mosaicMetadataTransactionBody.getScopedMetadataKey();
    }
    getTargetMosaicId() {
        return this.mosaicMetadataTransactionBody.getTargetMosaicId();
    }
    getValueSizeDelta() {
        return this.mosaicMetadataTransactionBody.getValueSizeDelta();
    }
    getValue() {
        return this.mosaicMetadataTransactionBody.getValue();
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaicMetadataTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicMetadataTransactionBodyBytes = this.mosaicMetadataTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicMetadataTransactionBodyBytes);
        return newArray;
    }
}
exports.MosaicMetadataTransactionBuilder = MosaicMetadataTransactionBuilder;

},{"./GeneratorUtils":64,"./MosaicMetadataTransactionBodyBuilder":97,"./TransactionBuilder":139}],99:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class MosaicNonceDto {
    constructor(mosaicNonce) {
        this.mosaicNonce = mosaicNonce;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const mosaicNonce = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        return new MosaicNonceDto(mosaicNonce);
    }
    getMosaicNonce() {
        return this.mosaicNonce;
    }
    getSize() {
        return 4;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const mosaicNonceBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getMosaicNonce(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicNonceBytes);
        return newArray;
    }
}
exports.MosaicNonceDto = MosaicNonceDto;

},{"./GeneratorUtils":64}],100:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockDurationDto_1 = require("./BlockDurationDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
class MosaicPropertiesBuilder {
    constructor(flags, divisibility, duration) {
        this.flags = flags;
        this.divisibility = divisibility;
        this.duration = duration;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const flags = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const divisibility = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const duration = BlockDurationDto_1.BlockDurationDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, duration.getSize());
        return new MosaicPropertiesBuilder(flags, divisibility, duration);
    }
    getFlags() {
        return this.flags;
    }
    getDivisibility() {
        return this.divisibility;
    }
    getDuration() {
        return this.duration;
    }
    getSize() {
        let size = 0;
        size += 1;
        size += 1;
        size += this.duration.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const flagsBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getFlags(), 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, flagsBytes);
        const divisibilityBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getDivisibility(), 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, divisibilityBytes);
        const durationBytes = this.duration.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, durationBytes);
        return newArray;
    }
}
exports.MosaicPropertiesBuilder = MosaicPropertiesBuilder;

},{"./BlockDurationDto":33,"./GeneratorUtils":64}],101:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicIdDto_1 = require("./MosaicIdDto");
const ReceiptSourceBuilder_1 = require("./ReceiptSourceBuilder");
class MosaicResolutionEntryBuilder {
    constructor(source, resolved) {
        this.source = source;
        this.resolved = resolved;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const source = ReceiptSourceBuilder_1.ReceiptSourceBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, source.getSize());
        const resolved = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, resolved.getSize());
        return new MosaicResolutionEntryBuilder(source, resolved);
    }
    getSource() {
        return this.source;
    }
    getResolved() {
        return this.resolved;
    }
    getSize() {
        let size = 0;
        size += this.source.getSize();
        size += this.resolved.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const sourceBytes = this.source.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, sourceBytes);
        const resolvedBytes = this.resolved.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, resolvedBytes);
        return newArray;
    }
}
exports.MosaicResolutionEntryBuilder = MosaicResolutionEntryBuilder;

},{"./GeneratorUtils":64,"./MosaicIdDto":96,"./ReceiptSourceBuilder":128}],102:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicResolutionEntryBuilder_1 = require("./MosaicResolutionEntryBuilder");
const ReceiptBuilder_1 = require("./ReceiptBuilder");
const UnresolvedMosaicIdDto_1 = require("./UnresolvedMosaicIdDto");
class MosaicResolutionStatementBuilder extends ReceiptBuilder_1.ReceiptBuilder {
    constructor(version, type, unresolved, resolutionEntries) {
        super(version, type);
        this.unresolved = unresolved;
        this.resolutionEntries = resolutionEntries;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = ReceiptBuilder_1.ReceiptBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const unresolved = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, unresolved.getSize());
        let resolutionEntriesByteSize = byteArray.length;
        const resolutionEntries = [];
        while (resolutionEntriesByteSize > 0) {
            const item = MosaicResolutionEntryBuilder_1.MosaicResolutionEntryBuilder.loadFromBinary(Uint8Array.from(byteArray));
            resolutionEntries.push(item);
            const itemSize = item.getSize();
            resolutionEntriesByteSize -= itemSize;
            byteArray.splice(0, itemSize);
        }
        return new MosaicResolutionStatementBuilder(superObject.version, superObject.type, unresolved, resolutionEntries);
    }
    getUnresolved() {
        return this.unresolved;
    }
    getResolutionEntries() {
        return this.resolutionEntries;
    }
    getSize() {
        let size = super.getSize();
        size += this.unresolved.getSize();
        this.resolutionEntries.forEach((o) => size += o.getSize());
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const unresolvedBytes = this.unresolved.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, unresolvedBytes);
        this.resolutionEntries.forEach((item) => {
            const resolutionEntriesBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, resolutionEntriesBytes);
        });
        return newArray;
    }
}
exports.MosaicResolutionStatementBuilder = MosaicResolutionStatementBuilder;

},{"./GeneratorUtils":64,"./MosaicResolutionEntryBuilder":101,"./ReceiptBuilder":127,"./UnresolvedMosaicIdDto":145}],103:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicAddressRestrictionEntryBuilder_1 = require("./MosaicAddressRestrictionEntryBuilder");
const MosaicGlobalRestrictionEntryBuilder_1 = require("./MosaicGlobalRestrictionEntryBuilder");
const MosaicRestrictionEntryTypeDto_1 = require("./MosaicRestrictionEntryTypeDto");
class MosaicRestrictionEntryBuilder {
    constructor(addressEntry, globalEntry) {
        this.addressEntry = addressEntry;
        this.globalEntry = globalEntry;
        if (addressEntry) {
            this.entryType = MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.ADDRESS;
        }
        else {
            this.entryType = MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.GLOBAL;
        }
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const entryType = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const entryTypeConditionBytes = Uint8Array.from(byteArray.slice(0, 1));
        byteArray.splice(0, 1);
        let addressEntry;
        if (entryType === MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.ADDRESS) {
            addressEntry = MosaicAddressRestrictionEntryBuilder_1.MosaicAddressRestrictionEntryBuilder.loadFromBinary(entryTypeConditionBytes);
        }
        let globalEntry;
        if (entryType === MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.GLOBAL) {
            globalEntry = MosaicGlobalRestrictionEntryBuilder_1.MosaicGlobalRestrictionEntryBuilder.loadFromBinary(entryTypeConditionBytes);
        }
        return new MosaicRestrictionEntryBuilder(addressEntry, globalEntry);
    }
    getEntryType() {
        return this.entryType;
    }
    getAddressEntry() {
        if (this.entryType !== MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.ADDRESS) {
            throw new Error('entryType is not set to ADDRESS.');
        }
        return this.addressEntry;
    }
    getGlobalEntry() {
        if (this.entryType !== MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.GLOBAL) {
            throw new Error('entryType is not set to GLOBAL.');
        }
        return this.globalEntry;
    }
    getSize() {
        let size = 0;
        size += 1;
        if (this.entryType === MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.ADDRESS) {
            size += this.addressEntry.getSize();
        }
        if (this.entryType === MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.GLOBAL) {
            size += this.globalEntry.getSize();
        }
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const entryTypeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.entryType, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, entryTypeBytes);
        if (this.entryType === MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.ADDRESS) {
            const addressEntryBytes = this.addressEntry.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressEntryBytes);
        }
        if (this.entryType === MosaicRestrictionEntryTypeDto_1.MosaicRestrictionEntryTypeDto.GLOBAL) {
            const globalEntryBytes = this.globalEntry.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, globalEntryBytes);
        }
        return newArray;
    }
}
exports.MosaicRestrictionEntryBuilder = MosaicRestrictionEntryBuilder;

},{"./GeneratorUtils":64,"./MosaicAddressRestrictionEntryBuilder":82,"./MosaicGlobalRestrictionEntryBuilder":93,"./MosaicRestrictionEntryTypeDto":104}],104:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MosaicRestrictionEntryTypeDto;
(function (MosaicRestrictionEntryTypeDto) {
    MosaicRestrictionEntryTypeDto[MosaicRestrictionEntryTypeDto["ADDRESS"] = 0] = "ADDRESS";
    MosaicRestrictionEntryTypeDto[MosaicRestrictionEntryTypeDto["GLOBAL"] = 1] = "GLOBAL";
})(MosaicRestrictionEntryTypeDto = exports.MosaicRestrictionEntryTypeDto || (exports.MosaicRestrictionEntryTypeDto = {}));

},{}],105:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class MosaicRestrictionKeyDto {
    constructor(mosaicRestrictionKey) {
        this.mosaicRestrictionKey = mosaicRestrictionKey;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const mosaicRestrictionKey = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new MosaicRestrictionKeyDto(mosaicRestrictionKey);
    }
    getMosaicRestrictionKey() {
        return this.mosaicRestrictionKey;
    }
    getSize() {
        return 8;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const mosaicRestrictionKeyBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getMosaicRestrictionKey());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicRestrictionKeyBytes);
        return newArray;
    }
}
exports.MosaicRestrictionKeyDto = MosaicRestrictionKeyDto;

},{"./GeneratorUtils":64}],106:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AmountDto_1 = require("./AmountDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const UnresolvedMosaicIdDto_1 = require("./UnresolvedMosaicIdDto");
class MosaicSupplyChangeTransactionBodyBuilder {
    constructor(mosaicId, delta, action) {
        this.mosaicId = mosaicId;
        this.delta = delta;
        this.action = action;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const mosaicId = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        const delta = AmountDto_1.AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, delta.getSize());
        const action = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        return new MosaicSupplyChangeTransactionBodyBuilder(mosaicId, delta, action);
    }
    getMosaicId() {
        return this.mosaicId;
    }
    getDelta() {
        return this.delta;
    }
    getAction() {
        return this.action;
    }
    getSize() {
        let size = 0;
        size += this.mosaicId.getSize();
        size += this.delta.getSize();
        size += 1;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const deltaBytes = this.delta.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, deltaBytes);
        const actionBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.action, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, actionBytes);
        return newArray;
    }
}
exports.MosaicSupplyChangeTransactionBodyBuilder = MosaicSupplyChangeTransactionBodyBuilder;

},{"./AmountDto":30,"./GeneratorUtils":64,"./UnresolvedMosaicIdDto":145}],107:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicSupplyChangeTransactionBodyBuilder_1 = require("./MosaicSupplyChangeTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class MosaicSupplyChangeTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, mosaicId, delta, action) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.mosaicSupplyChangeTransactionBody = new MosaicSupplyChangeTransactionBodyBuilder_1.MosaicSupplyChangeTransactionBodyBuilder(mosaicId, delta, action);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const mosaicSupplyChangeTransactionBody = MosaicSupplyChangeTransactionBodyBuilder_1.MosaicSupplyChangeTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicSupplyChangeTransactionBody.getSize());
        return new MosaicSupplyChangeTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, mosaicSupplyChangeTransactionBody.mosaicId, mosaicSupplyChangeTransactionBody.delta, mosaicSupplyChangeTransactionBody.action);
    }
    getMosaicId() {
        return this.mosaicSupplyChangeTransactionBody.getMosaicId();
    }
    getDelta() {
        return this.mosaicSupplyChangeTransactionBody.getDelta();
    }
    getAction() {
        return this.mosaicSupplyChangeTransactionBody.getAction();
    }
    getSize() {
        let size = super.getSize();
        size += this.mosaicSupplyChangeTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const mosaicSupplyChangeTransactionBodyBytes = this.mosaicSupplyChangeTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicSupplyChangeTransactionBodyBytes);
        return newArray;
    }
}
exports.MosaicSupplyChangeTransactionBuilder = MosaicSupplyChangeTransactionBuilder;

},{"./GeneratorUtils":64,"./MosaicSupplyChangeTransactionBodyBuilder":106,"./TransactionBuilder":139}],108:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const KeyDto_1 = require("./KeyDto");
class MultisigAccountModificationTransactionBodyBuilder {
    constructor(minRemovalDelta, minApprovalDelta, publicKeyAdditions, publicKeyDeletions) {
        this.minRemovalDelta = minRemovalDelta;
        this.minApprovalDelta = minApprovalDelta;
        this.multisigAccountModificationTransactionBody_Reserved1 = 0;
        this.publicKeyAdditions = publicKeyAdditions;
        this.publicKeyDeletions = publicKeyDeletions;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const minRemovalDelta = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const minApprovalDelta = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const publicKeyAdditionsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const publicKeyDeletionsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const multisigAccountModificationTransactionBody_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        const publicKeyAdditions = [];
        for (let i = 0; i < (Array.isArray(publicKeyAdditionsCount) ? GeneratorUtils_1.GeneratorUtils.compact(publicKeyAdditionsCount) : publicKeyAdditionsCount); i++) {
            const item = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
            publicKeyAdditions.push(item);
            byteArray.splice(0, item.getSize());
        }
        const publicKeyDeletions = [];
        for (let i = 0; i < (Array.isArray(publicKeyDeletionsCount) ? GeneratorUtils_1.GeneratorUtils.compact(publicKeyDeletionsCount) : publicKeyDeletionsCount); i++) {
            const item = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
            publicKeyDeletions.push(item);
            byteArray.splice(0, item.getSize());
        }
        return new MultisigAccountModificationTransactionBodyBuilder(minRemovalDelta, minApprovalDelta, publicKeyAdditions, publicKeyDeletions);
    }
    getMinRemovalDelta() {
        return this.minRemovalDelta;
    }
    getMinApprovalDelta() {
        return this.minApprovalDelta;
    }
    getMultisigAccountModificationTransactionBody_Reserved1() {
        return this.multisigAccountModificationTransactionBody_Reserved1;
    }
    getPublicKeyAdditions() {
        return this.publicKeyAdditions;
    }
    getPublicKeyDeletions() {
        return this.publicKeyDeletions;
    }
    getSize() {
        let size = 0;
        size += 1;
        size += 1;
        size += 1;
        size += 1;
        size += 4;
        this.publicKeyAdditions.forEach((o) => size += o.getSize());
        this.publicKeyDeletions.forEach((o) => size += o.getSize());
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const minRemovalDeltaBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getMinRemovalDelta(), 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, minRemovalDeltaBytes);
        const minApprovalDeltaBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getMinApprovalDelta(), 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, minApprovalDeltaBytes);
        const publicKeyAdditionsCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.publicKeyAdditions.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, publicKeyAdditionsCountBytes);
        const publicKeyDeletionsCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.publicKeyDeletions.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, publicKeyDeletionsCountBytes);
        const multisigAccountModificationTransactionBody_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getMultisigAccountModificationTransactionBody_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, multisigAccountModificationTransactionBody_Reserved1Bytes);
        this.publicKeyAdditions.forEach((item) => {
            const publicKeyAdditionsBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, publicKeyAdditionsBytes);
        });
        this.publicKeyDeletions.forEach((item) => {
            const publicKeyDeletionsBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, publicKeyDeletionsBytes);
        });
        return newArray;
    }
}
exports.MultisigAccountModificationTransactionBodyBuilder = MultisigAccountModificationTransactionBodyBuilder;

},{"./GeneratorUtils":64,"./KeyDto":79}],109:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const MultisigAccountModificationTransactionBodyBuilder_1 = require("./MultisigAccountModificationTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class MultisigAccountModificationTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, minRemovalDelta, minApprovalDelta, publicKeyAdditions, publicKeyDeletions) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.multisigAccountModificationTransactionBody = new MultisigAccountModificationTransactionBodyBuilder_1.MultisigAccountModificationTransactionBodyBuilder(minRemovalDelta, minApprovalDelta, publicKeyAdditions, publicKeyDeletions);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const multisigAccountModificationTransactionBody = MultisigAccountModificationTransactionBodyBuilder_1.MultisigAccountModificationTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, multisigAccountModificationTransactionBody.getSize());
        return new MultisigAccountModificationTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, multisigAccountModificationTransactionBody.minRemovalDelta, multisigAccountModificationTransactionBody.minApprovalDelta, multisigAccountModificationTransactionBody.publicKeyAdditions, multisigAccountModificationTransactionBody.publicKeyDeletions);
    }
    getMinRemovalDelta() {
        return this.multisigAccountModificationTransactionBody.getMinRemovalDelta();
    }
    getMinApprovalDelta() {
        return this.multisigAccountModificationTransactionBody.getMinApprovalDelta();
    }
    getMultisigAccountModificationTransactionBody_Reserved1() {
        return this.multisigAccountModificationTransactionBody.getMultisigAccountModificationTransactionBody_Reserved1();
    }
    getPublicKeyAdditions() {
        return this.multisigAccountModificationTransactionBody.getPublicKeyAdditions();
    }
    getPublicKeyDeletions() {
        return this.multisigAccountModificationTransactionBody.getPublicKeyDeletions();
    }
    getSize() {
        let size = super.getSize();
        size += this.multisigAccountModificationTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const multisigAccountModificationTransactionBodyBytes = this.multisigAccountModificationTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, multisigAccountModificationTransactionBodyBytes);
        return newArray;
    }
}
exports.MultisigAccountModificationTransactionBuilder = MultisigAccountModificationTransactionBuilder;

},{"./GeneratorUtils":64,"./MultisigAccountModificationTransactionBodyBuilder":108,"./TransactionBuilder":139}],110:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const KeyDto_1 = require("./KeyDto");
class MultisigEntryBuilder {
    constructor(minApproval, minRemoval, accountPublicKey, cosignatoryPublicKeys, multisigPublicKeys) {
        this.minApproval = minApproval;
        this.minRemoval = minRemoval;
        this.accountPublicKey = accountPublicKey;
        this.cosignatoryPublicKeys = cosignatoryPublicKeys;
        this.multisigPublicKeys = multisigPublicKeys;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const minApproval = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        const minRemoval = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        const accountPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, accountPublicKey.getSize());
        const cosignatoryPublicKeysCount = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        const cosignatoryPublicKeys = [];
        for (let i = 0; i < (Array.isArray(cosignatoryPublicKeysCount) ? GeneratorUtils_1.GeneratorUtils.compact(cosignatoryPublicKeysCount) : cosignatoryPublicKeysCount); i++) {
            const item = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
            cosignatoryPublicKeys.push(item);
            byteArray.splice(0, item.getSize());
        }
        const multisigPublicKeysCount = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        const multisigPublicKeys = [];
        for (let i = 0; i < (Array.isArray(multisigPublicKeysCount) ? GeneratorUtils_1.GeneratorUtils.compact(multisigPublicKeysCount) : multisigPublicKeysCount); i++) {
            const item = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
            multisigPublicKeys.push(item);
            byteArray.splice(0, item.getSize());
        }
        return new MultisigEntryBuilder(minApproval, minRemoval, accountPublicKey, cosignatoryPublicKeys, multisigPublicKeys);
    }
    getMinApproval() {
        return this.minApproval;
    }
    getMinRemoval() {
        return this.minRemoval;
    }
    getAccountPublicKey() {
        return this.accountPublicKey;
    }
    getCosignatoryPublicKeys() {
        return this.cosignatoryPublicKeys;
    }
    getMultisigPublicKeys() {
        return this.multisigPublicKeys;
    }
    getSize() {
        let size = 0;
        size += 4;
        size += 4;
        size += this.accountPublicKey.getSize();
        size += 8;
        this.cosignatoryPublicKeys.forEach((o) => size += o.getSize());
        size += 8;
        this.multisigPublicKeys.forEach((o) => size += o.getSize());
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const minApprovalBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getMinApproval(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, minApprovalBytes);
        const minRemovalBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getMinRemoval(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, minRemovalBytes);
        const accountPublicKeyBytes = this.accountPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, accountPublicKeyBytes);
        const cosignatoryPublicKeysCountBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(GeneratorUtils_1.GeneratorUtils.fromUint(this.cosignatoryPublicKeys.length));
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, cosignatoryPublicKeysCountBytes);
        this.cosignatoryPublicKeys.forEach((item) => {
            const cosignatoryPublicKeysBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, cosignatoryPublicKeysBytes);
        });
        const multisigPublicKeysCountBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(GeneratorUtils_1.GeneratorUtils.fromUint(this.multisigPublicKeys.length));
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, multisigPublicKeysCountBytes);
        this.multisigPublicKeys.forEach((item) => {
            const multisigPublicKeysBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, multisigPublicKeysBytes);
        });
        return newArray;
    }
}
exports.MultisigEntryBuilder = MultisigEntryBuilder;

},{"./GeneratorUtils":64,"./KeyDto":79}],111:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AddressDto_1 = require("./AddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicIdDto_1 = require("./MosaicIdDto");
const NamespaceAliasTypeDto_1 = require("./NamespaceAliasTypeDto");
class NamespaceAliasBuilder {
    constructor(mosaicAlias, addressAlias) {
        this.mosaicAlias = mosaicAlias;
        this.addressAlias = addressAlias;
        if (mosaicAlias) {
            this.namespaceAliasType = NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.MOSAIC_ID;
        }
        else {
            this.namespaceAliasType = NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.ADDRESS;
        }
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const namespaceAliasType = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const namespaceAliasTypeConditionBytes = Uint8Array.from(byteArray.slice(0, 8));
        byteArray.splice(0, 8);
        let mosaicAlias;
        if (namespaceAliasType === NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.MOSAIC_ID) {
            mosaicAlias = MosaicIdDto_1.MosaicIdDto.loadFromBinary(namespaceAliasTypeConditionBytes);
        }
        let addressAlias;
        if (namespaceAliasType === NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.ADDRESS) {
            addressAlias = AddressDto_1.AddressDto.loadFromBinary(namespaceAliasTypeConditionBytes);
        }
        return new NamespaceAliasBuilder(mosaicAlias, addressAlias);
    }
    getNamespaceAliasType() {
        return this.namespaceAliasType;
    }
    getMosaicAlias() {
        if (this.namespaceAliasType !== NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.MOSAIC_ID) {
            throw new Error('namespaceAliasType is not set to MOSAIC_ID.');
        }
        return this.mosaicAlias;
    }
    getAddressAlias() {
        if (this.namespaceAliasType !== NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.ADDRESS) {
            throw new Error('namespaceAliasType is not set to ADDRESS.');
        }
        return this.addressAlias;
    }
    getSize() {
        let size = 0;
        size += 1;
        if (this.namespaceAliasType === NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.MOSAIC_ID) {
            size += this.mosaicAlias.getSize();
        }
        if (this.namespaceAliasType === NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.ADDRESS) {
            size += this.addressAlias.getSize();
        }
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const namespaceAliasTypeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.namespaceAliasType, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, namespaceAliasTypeBytes);
        if (this.namespaceAliasType === NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.MOSAIC_ID) {
            const mosaicAliasBytes = this.mosaicAlias.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicAliasBytes);
        }
        if (this.namespaceAliasType === NamespaceAliasTypeDto_1.NamespaceAliasTypeDto.ADDRESS) {
            const addressAliasBytes = this.addressAlias.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, addressAliasBytes);
        }
        return newArray;
    }
}
exports.NamespaceAliasBuilder = NamespaceAliasBuilder;

},{"./AddressDto":22,"./GeneratorUtils":64,"./MosaicIdDto":96,"./NamespaceAliasTypeDto":112}],112:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NamespaceAliasTypeDto;
(function (NamespaceAliasTypeDto) {
    NamespaceAliasTypeDto[NamespaceAliasTypeDto["NONE"] = 0] = "NONE";
    NamespaceAliasTypeDto[NamespaceAliasTypeDto["MOSAIC_ID"] = 1] = "MOSAIC_ID";
    NamespaceAliasTypeDto[NamespaceAliasTypeDto["ADDRESS"] = 2] = "ADDRESS";
})(NamespaceAliasTypeDto = exports.NamespaceAliasTypeDto || (exports.NamespaceAliasTypeDto = {}));

},{}],113:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const NamespaceIdDto_1 = require("./NamespaceIdDto");
const ReceiptBuilder_1 = require("./ReceiptBuilder");
class NamespaceExpiryReceiptBuilder extends ReceiptBuilder_1.ReceiptBuilder {
    constructor(version, type, artifactId) {
        super(version, type);
        this.artifactId = artifactId;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = ReceiptBuilder_1.ReceiptBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const artifactId = NamespaceIdDto_1.NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, artifactId.getSize());
        return new NamespaceExpiryReceiptBuilder(superObject.version, superObject.type, artifactId);
    }
    getArtifactId() {
        return this.artifactId;
    }
    getSize() {
        let size = super.getSize();
        size += this.artifactId.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const artifactIdBytes = this.artifactId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, artifactIdBytes);
        return newArray;
    }
}
exports.NamespaceExpiryReceiptBuilder = NamespaceExpiryReceiptBuilder;

},{"./GeneratorUtils":64,"./NamespaceIdDto":114,"./ReceiptBuilder":127}],114:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class NamespaceIdDto {
    constructor(namespaceId) {
        this.namespaceId = namespaceId;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const namespaceId = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new NamespaceIdDto(namespaceId);
    }
    getNamespaceId() {
        return this.namespaceId;
    }
    getSize() {
        return 8;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const namespaceIdBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getNamespaceId());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, namespaceIdBytes);
        return newArray;
    }
}
exports.NamespaceIdDto = NamespaceIdDto;

},{"./GeneratorUtils":64}],115:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const HeightDto_1 = require("./HeightDto");
class NamespaceLifetimeBuilder {
    constructor(lifetimeStart, lifetimeEnd) {
        this.lifetimeStart = lifetimeStart;
        this.lifetimeEnd = lifetimeEnd;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const lifetimeStart = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, lifetimeStart.getSize());
        const lifetimeEnd = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, lifetimeEnd.getSize());
        return new NamespaceLifetimeBuilder(lifetimeStart, lifetimeEnd);
    }
    getLifetimeStart() {
        return this.lifetimeStart;
    }
    getLifetimeEnd() {
        return this.lifetimeEnd;
    }
    getSize() {
        let size = 0;
        size += this.lifetimeStart.getSize();
        size += this.lifetimeEnd.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const lifetimeStartBytes = this.lifetimeStart.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, lifetimeStartBytes);
        const lifetimeEndBytes = this.lifetimeEnd.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, lifetimeEndBytes);
        return newArray;
    }
}
exports.NamespaceLifetimeBuilder = NamespaceLifetimeBuilder;

},{"./GeneratorUtils":64,"./HeightDto":74}],116:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const KeyDto_1 = require("./KeyDto");
const NamespaceIdDto_1 = require("./NamespaceIdDto");
class NamespaceMetadataTransactionBodyBuilder {
    constructor(targetPublicKey, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value) {
        this.targetPublicKey = targetPublicKey;
        this.scopedMetadataKey = scopedMetadataKey;
        this.targetNamespaceId = targetNamespaceId;
        this.valueSizeDelta = valueSizeDelta;
        this.value = value;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const targetPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetPublicKey.getSize());
        const scopedMetadataKey = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        const targetNamespaceId = NamespaceIdDto_1.NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetNamespaceId.getSize());
        const valueSizeDelta = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        const valueSize = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        const value = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), valueSize);
        byteArray.splice(0, valueSize);
        return new NamespaceMetadataTransactionBodyBuilder(targetPublicKey, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value);
    }
    getTargetPublicKey() {
        return this.targetPublicKey;
    }
    getScopedMetadataKey() {
        return this.scopedMetadataKey;
    }
    getTargetNamespaceId() {
        return this.targetNamespaceId;
    }
    getValueSizeDelta() {
        return this.valueSizeDelta;
    }
    getValue() {
        return this.value;
    }
    getSize() {
        let size = 0;
        size += this.targetPublicKey.getSize();
        size += 8;
        size += this.targetNamespaceId.getSize();
        size += 2;
        size += 2;
        size += this.value.length;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const targetPublicKeyBytes = this.targetPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetPublicKeyBytes);
        const scopedMetadataKeyBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getScopedMetadataKey());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, scopedMetadataKeyBytes);
        const targetNamespaceIdBytes = this.targetNamespaceId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, targetNamespaceIdBytes);
        const valueSizeDeltaBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getValueSizeDelta(), 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueSizeDeltaBytes);
        const valueSizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.value.length, 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, valueSizeBytes);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.value);
        return newArray;
    }
}
exports.NamespaceMetadataTransactionBodyBuilder = NamespaceMetadataTransactionBodyBuilder;

},{"./GeneratorUtils":64,"./KeyDto":79,"./NamespaceIdDto":114}],117:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const NamespaceMetadataTransactionBodyBuilder_1 = require("./NamespaceMetadataTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class NamespaceMetadataTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, targetPublicKey, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.namespaceMetadataTransactionBody = new NamespaceMetadataTransactionBodyBuilder_1.NamespaceMetadataTransactionBodyBuilder(targetPublicKey, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const namespaceMetadataTransactionBody = NamespaceMetadataTransactionBodyBuilder_1.NamespaceMetadataTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceMetadataTransactionBody.getSize());
        return new NamespaceMetadataTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, namespaceMetadataTransactionBody.targetPublicKey, namespaceMetadataTransactionBody.scopedMetadataKey, namespaceMetadataTransactionBody.targetNamespaceId, namespaceMetadataTransactionBody.valueSizeDelta, namespaceMetadataTransactionBody.value);
    }
    getTargetPublicKey() {
        return this.namespaceMetadataTransactionBody.getTargetPublicKey();
    }
    getScopedMetadataKey() {
        return this.namespaceMetadataTransactionBody.getScopedMetadataKey();
    }
    getTargetNamespaceId() {
        return this.namespaceMetadataTransactionBody.getTargetNamespaceId();
    }
    getValueSizeDelta() {
        return this.namespaceMetadataTransactionBody.getValueSizeDelta();
    }
    getValue() {
        return this.namespaceMetadataTransactionBody.getValue();
    }
    getSize() {
        let size = super.getSize();
        size += this.namespaceMetadataTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const namespaceMetadataTransactionBodyBytes = this.namespaceMetadataTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, namespaceMetadataTransactionBodyBytes);
        return newArray;
    }
}
exports.NamespaceMetadataTransactionBuilder = NamespaceMetadataTransactionBuilder;

},{"./GeneratorUtils":64,"./NamespaceMetadataTransactionBodyBuilder":116,"./TransactionBuilder":139}],118:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const NamespaceAliasBuilder_1 = require("./NamespaceAliasBuilder");
class NamespacePathBuilder {
    constructor(path, alias) {
        this.path = path;
        this.alias = alias;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const pathSize = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const path = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), pathSize);
        byteArray.splice(0, pathSize);
        const alias = NamespaceAliasBuilder_1.NamespaceAliasBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, alias.getSize());
        return new NamespacePathBuilder(path, alias);
    }
    getPath() {
        return this.path;
    }
    getAlias() {
        return this.alias;
    }
    getSize() {
        let size = 0;
        size += 1;
        size += this.path.length;
        size += this.alias.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const pathSizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.path.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, pathSizeBytes);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.path);
        const aliasBytes = this.alias.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, aliasBytes);
        return newArray;
    }
}
exports.NamespacePathBuilder = NamespacePathBuilder;

},{"./GeneratorUtils":64,"./NamespaceAliasBuilder":111}],119:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockDurationDto_1 = require("./BlockDurationDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const NamespaceIdDto_1 = require("./NamespaceIdDto");
const NamespaceRegistrationTypeDto_1 = require("./NamespaceRegistrationTypeDto");
class NamespaceRegistrationTransactionBodyBuilder {
    constructor(id, name, duration, parentId) {
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
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const registrationTypeConditionBytes = Uint8Array.from(byteArray.slice(0, 8));
        byteArray.splice(0, 8);
        const id = NamespaceIdDto_1.NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, id.getSize());
        const registrationType = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const nameSize = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const name = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), nameSize);
        byteArray.splice(0, nameSize);
        let duration;
        if (registrationType === NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.ROOT) {
            duration = BlockDurationDto_1.BlockDurationDto.loadFromBinary(registrationTypeConditionBytes);
        }
        let parentId;
        if (registrationType === NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.CHILD) {
            parentId = NamespaceIdDto_1.NamespaceIdDto.loadFromBinary(registrationTypeConditionBytes);
        }
        return new NamespaceRegistrationTransactionBodyBuilder(id, name, duration, parentId);
    }
    getDuration() {
        if (this.registrationType !== NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.ROOT) {
            throw new Error('registrationType is not set to ROOT.');
        }
        return this.duration;
    }
    getParentId() {
        if (this.registrationType !== NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.CHILD) {
            throw new Error('registrationType is not set to CHILD.');
        }
        return this.parentId;
    }
    getId() {
        return this.id;
    }
    getRegistrationType() {
        return this.registrationType;
    }
    getName() {
        return this.name;
    }
    getSize() {
        let size = 0;
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
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        if (this.registrationType === NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.ROOT) {
            const durationBytes = this.duration.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, durationBytes);
        }
        if (this.registrationType === NamespaceRegistrationTypeDto_1.NamespaceRegistrationTypeDto.CHILD) {
            const parentIdBytes = this.parentId.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, parentIdBytes);
        }
        const idBytes = this.id.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, idBytes);
        const registrationTypeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.registrationType, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, registrationTypeBytes);
        const nameSizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.name.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, nameSizeBytes);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.name);
        return newArray;
    }
}
exports.NamespaceRegistrationTransactionBodyBuilder = NamespaceRegistrationTransactionBodyBuilder;

},{"./BlockDurationDto":33,"./GeneratorUtils":64,"./NamespaceIdDto":114,"./NamespaceRegistrationTypeDto":121}],120:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const NamespaceRegistrationTransactionBodyBuilder_1 = require("./NamespaceRegistrationTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class NamespaceRegistrationTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, id, name, duration, parentId) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.namespaceRegistrationTransactionBody = new NamespaceRegistrationTransactionBodyBuilder_1.NamespaceRegistrationTransactionBodyBuilder(id, name, duration, parentId);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const namespaceRegistrationTransactionBody = NamespaceRegistrationTransactionBodyBuilder_1.NamespaceRegistrationTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, namespaceRegistrationTransactionBody.getSize());
        return new NamespaceRegistrationTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, namespaceRegistrationTransactionBody.id, namespaceRegistrationTransactionBody.name, namespaceRegistrationTransactionBody.duration, namespaceRegistrationTransactionBody.parentId);
    }
    getDuration() {
        return this.namespaceRegistrationTransactionBody.getDuration();
    }
    getParentId() {
        return this.namespaceRegistrationTransactionBody.getParentId();
    }
    getId() {
        return this.namespaceRegistrationTransactionBody.getId();
    }
    getRegistrationType() {
        return this.namespaceRegistrationTransactionBody.getRegistrationType();
    }
    getName() {
        return this.namespaceRegistrationTransactionBody.getName();
    }
    getSize() {
        let size = super.getSize();
        size += this.namespaceRegistrationTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const namespaceRegistrationTransactionBodyBytes = this.namespaceRegistrationTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, namespaceRegistrationTransactionBodyBytes);
        return newArray;
    }
}
exports.NamespaceRegistrationTransactionBuilder = NamespaceRegistrationTransactionBuilder;

},{"./GeneratorUtils":64,"./NamespaceRegistrationTransactionBodyBuilder":119,"./TransactionBuilder":139}],121:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NamespaceRegistrationTypeDto;
(function (NamespaceRegistrationTypeDto) {
    NamespaceRegistrationTypeDto[NamespaceRegistrationTypeDto["ROOT"] = 0] = "ROOT";
    NamespaceRegistrationTypeDto[NamespaceRegistrationTypeDto["CHILD"] = 1] = "CHILD";
})(NamespaceRegistrationTypeDto = exports.NamespaceRegistrationTypeDto || (exports.NamespaceRegistrationTypeDto = {}));

},{}],122:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const KeyDto_1 = require("./KeyDto");
class NodeKeyLinkTransactionBodyBuilder {
    constructor(linkedPublicKey, linkAction) {
        this.linkedPublicKey = linkedPublicKey;
        this.linkAction = linkAction;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const linkedPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, linkedPublicKey.getSize());
        const linkAction = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        return new NodeKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
    }
    getLinkedPublicKey() {
        return this.linkedPublicKey;
    }
    getLinkAction() {
        return this.linkAction;
    }
    getSize() {
        let size = 0;
        size += this.linkedPublicKey.getSize();
        size += 1;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const linkedPublicKeyBytes = this.linkedPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, linkedPublicKeyBytes);
        const linkActionBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.linkAction, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, linkActionBytes);
        return newArray;
    }
}
exports.NodeKeyLinkTransactionBodyBuilder = NodeKeyLinkTransactionBodyBuilder;

},{"./GeneratorUtils":64,"./KeyDto":79}],123:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const NodeKeyLinkTransactionBodyBuilder_1 = require("./NodeKeyLinkTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class NodeKeyLinkTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, linkAction) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.nodeKeyLinkTransactionBody = new NodeKeyLinkTransactionBodyBuilder_1.NodeKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const nodeKeyLinkTransactionBody = NodeKeyLinkTransactionBodyBuilder_1.NodeKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, nodeKeyLinkTransactionBody.getSize());
        return new NodeKeyLinkTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, nodeKeyLinkTransactionBody.linkedPublicKey, nodeKeyLinkTransactionBody.linkAction);
    }
    getLinkedPublicKey() {
        return this.nodeKeyLinkTransactionBody.getLinkedPublicKey();
    }
    getLinkAction() {
        return this.nodeKeyLinkTransactionBody.getLinkAction();
    }
    getSize() {
        let size = super.getSize();
        size += this.nodeKeyLinkTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const nodeKeyLinkTransactionBodyBytes = this.nodeKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, nodeKeyLinkTransactionBodyBytes);
        return newArray;
    }
}
exports.NodeKeyLinkTransactionBuilder = NodeKeyLinkTransactionBuilder;

},{"./GeneratorUtils":64,"./NodeKeyLinkTransactionBodyBuilder":122,"./TransactionBuilder":139}],124:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class ProofGammaDto {
    constructor(proofGamma) {
        this.proofGamma = proofGamma;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const proofGamma = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 32);
        byteArray.splice(0, 32);
        return new ProofGammaDto(proofGamma);
    }
    getProofGamma() {
        return this.proofGamma;
    }
    getSize() {
        return 32;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.proofGamma);
        return newArray;
    }
}
exports.ProofGammaDto = ProofGammaDto;

},{"./GeneratorUtils":64}],125:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class ProofScalarDto {
    constructor(proofScalar) {
        this.proofScalar = proofScalar;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const proofScalar = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 32);
        byteArray.splice(0, 32);
        return new ProofScalarDto(proofScalar);
    }
    getProofScalar() {
        return this.proofScalar;
    }
    getSize() {
        return 32;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.proofScalar);
        return newArray;
    }
}
exports.ProofScalarDto = ProofScalarDto;

},{"./GeneratorUtils":64}],126:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class ProofVerificationHashDto {
    constructor(proofVerificationHash) {
        this.proofVerificationHash = proofVerificationHash;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const proofVerificationHash = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 16);
        byteArray.splice(0, 16);
        return new ProofVerificationHashDto(proofVerificationHash);
    }
    getProofVerificationHash() {
        return this.proofVerificationHash;
    }
    getSize() {
        return 16;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.proofVerificationHash);
        return newArray;
    }
}
exports.ProofVerificationHashDto = ProofVerificationHashDto;

},{"./GeneratorUtils":64}],127:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class ReceiptBuilder {
    constructor(version, type) {
        this.size = 0;
        this.version = version;
        this.type = type;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const size = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        const version = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        const type = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        return new ReceiptBuilder(version, type);
    }
    getVersion() {
        return this.version;
    }
    getType() {
        return this.type;
    }
    getSize() {
        let size = 0;
        size += 4;
        size += 2;
        size += 2;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const versionBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getVersion(), 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, versionBytes);
        const typeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.type, 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, typeBytes);
        return newArray;
    }
}
exports.ReceiptBuilder = ReceiptBuilder;

},{"./GeneratorUtils":64}],128:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class ReceiptSourceBuilder {
    constructor(primaryId, secondaryId) {
        this.primaryId = primaryId;
        this.secondaryId = secondaryId;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const primaryId = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        const secondaryId = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        return new ReceiptSourceBuilder(primaryId, secondaryId);
    }
    getPrimaryId() {
        return this.primaryId;
    }
    getSecondaryId() {
        return this.secondaryId;
    }
    getSize() {
        let size = 0;
        size += 4;
        size += 4;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const primaryIdBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getPrimaryId(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, primaryIdBytes);
        const secondaryIdBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getSecondaryId(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secondaryIdBytes);
        return newArray;
    }
}
exports.ReceiptSourceBuilder = ReceiptSourceBuilder;

},{"./GeneratorUtils":64}],129:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const MosaicIdDto_1 = require("./MosaicIdDto");
class RestrictionRuleBuilder {
    constructor(referenceMosaicId, restrictionValue, restrictionType) {
        this.referenceMosaicId = referenceMosaicId;
        this.restrictionValue = restrictionValue;
        this.restrictionType = restrictionType;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const referenceMosaicId = MosaicIdDto_1.MosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, referenceMosaicId.getSize());
        const restrictionValue = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        const restrictionType = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        return new RestrictionRuleBuilder(referenceMosaicId, restrictionValue, restrictionType);
    }
    getReferenceMosaicId() {
        return this.referenceMosaicId;
    }
    getRestrictionValue() {
        return this.restrictionValue;
    }
    getRestrictionType() {
        return this.restrictionType;
    }
    getSize() {
        let size = 0;
        size += this.referenceMosaicId.getSize();
        size += 8;
        size += 1;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const referenceMosaicIdBytes = this.referenceMosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, referenceMosaicIdBytes);
        const restrictionValueBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getRestrictionValue());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionValueBytes);
        const restrictionTypeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.restrictionType, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, restrictionTypeBytes);
        return newArray;
    }
}
exports.RestrictionRuleBuilder = RestrictionRuleBuilder;

},{"./GeneratorUtils":64,"./MosaicIdDto":96}],130:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const KeyDto_1 = require("./KeyDto");
const NamespaceIdDto_1 = require("./NamespaceIdDto");
const NamespaceLifetimeBuilder_1 = require("./NamespaceLifetimeBuilder");
const NamespacePathBuilder_1 = require("./NamespacePathBuilder");
class RootNamespaceHistoryBuilder {
    constructor(id, ownerPublicKey, lifetime, rootAlias, paths) {
        this.id = id;
        this.ownerPublicKey = ownerPublicKey;
        this.lifetime = lifetime;
        this.rootAlias = rootAlias;
        this.paths = paths;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const id = NamespaceIdDto_1.NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, id.getSize());
        const ownerPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, ownerPublicKey.getSize());
        const lifetime = NamespaceLifetimeBuilder_1.NamespaceLifetimeBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, lifetime.getSize());
        const rootAlias = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const childrenCount = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        const paths = [];
        for (let i = 0; i < (Array.isArray(childrenCount) ? GeneratorUtils_1.GeneratorUtils.compact(childrenCount) : childrenCount); i++) {
            const item = NamespacePathBuilder_1.NamespacePathBuilder.loadFromBinary(Uint8Array.from(byteArray));
            paths.push(item);
            byteArray.splice(0, item.getSize());
        }
        return new RootNamespaceHistoryBuilder(id, ownerPublicKey, lifetime, rootAlias, paths);
    }
    getId() {
        return this.id;
    }
    getOwnerPublicKey() {
        return this.ownerPublicKey;
    }
    getLifetime() {
        return this.lifetime;
    }
    getRootAlias() {
        return this.rootAlias;
    }
    getPaths() {
        return this.paths;
    }
    getSize() {
        let size = 0;
        size += this.id.getSize();
        size += this.ownerPublicKey.getSize();
        size += this.lifetime.getSize();
        size += 1;
        size += 8;
        this.paths.forEach((o) => size += o.getSize());
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const idBytes = this.id.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, idBytes);
        const ownerPublicKeyBytes = this.ownerPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, ownerPublicKeyBytes);
        const lifetimeBytes = this.lifetime.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, lifetimeBytes);
        const rootAliasBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.rootAlias, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, rootAliasBytes);
        const childrenCountBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(GeneratorUtils_1.GeneratorUtils.fromUint(this.paths.length));
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, childrenCountBytes);
        this.paths.forEach((item) => {
            const pathsBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, pathsBytes);
        });
        return newArray;
    }
}
exports.RootNamespaceHistoryBuilder = RootNamespaceHistoryBuilder;

},{"./GeneratorUtils":64,"./KeyDto":79,"./NamespaceIdDto":114,"./NamespaceLifetimeBuilder":115,"./NamespacePathBuilder":118}],131:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class ScopedMetadataKeyDto {
    constructor(scopedMetadataKey) {
        this.scopedMetadataKey = scopedMetadataKey;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const scopedMetadataKey = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new ScopedMetadataKeyDto(scopedMetadataKey);
    }
    getScopedMetadataKey() {
        return this.scopedMetadataKey;
    }
    getSize() {
        return 8;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const scopedMetadataKeyBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getScopedMetadataKey());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, scopedMetadataKeyBytes);
        return newArray;
    }
}
exports.ScopedMetadataKeyDto = ScopedMetadataKeyDto;

},{"./GeneratorUtils":64}],132:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AddressDto_1 = require("./AddressDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const Hash256Dto_1 = require("./Hash256Dto");
const HeightDto_1 = require("./HeightDto");
const KeyDto_1 = require("./KeyDto");
const MosaicBuilder_1 = require("./MosaicBuilder");
class SecretLockInfoBuilder {
    constructor(senderPublicKey, mosaic, endHeight, status, hashAlgorithm, secret, recipient) {
        this.senderPublicKey = senderPublicKey;
        this.mosaic = mosaic;
        this.endHeight = endHeight;
        this.status = status;
        this.hashAlgorithm = hashAlgorithm;
        this.secret = secret;
        this.recipient = recipient;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const senderPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, senderPublicKey.getSize());
        const mosaic = MosaicBuilder_1.MosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        const endHeight = HeightDto_1.HeightDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, endHeight.getSize());
        const status = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const hashAlgorithm = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const secret = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secret.getSize());
        const recipient = AddressDto_1.AddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, recipient.getSize());
        return new SecretLockInfoBuilder(senderPublicKey, mosaic, endHeight, status, hashAlgorithm, secret, recipient);
    }
    getSenderPublicKey() {
        return this.senderPublicKey;
    }
    getMosaic() {
        return this.mosaic;
    }
    getEndHeight() {
        return this.endHeight;
    }
    getStatus() {
        return this.status;
    }
    getHashAlgorithm() {
        return this.hashAlgorithm;
    }
    getSecret() {
        return this.secret;
    }
    getRecipient() {
        return this.recipient;
    }
    getSize() {
        let size = 0;
        size += this.senderPublicKey.getSize();
        size += this.mosaic.getSize();
        size += this.endHeight.getSize();
        size += 1;
        size += 1;
        size += this.secret.getSize();
        size += this.recipient.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const senderPublicKeyBytes = this.senderPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, senderPublicKeyBytes);
        const mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        const endHeightBytes = this.endHeight.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, endHeightBytes);
        const statusBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.status, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, statusBytes);
        const hashAlgorithmBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.hashAlgorithm, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, hashAlgorithmBytes);
        const secretBytes = this.secret.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secretBytes);
        const recipientBytes = this.recipient.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, recipientBytes);
        return newArray;
    }
}
exports.SecretLockInfoBuilder = SecretLockInfoBuilder;

},{"./AddressDto":22,"./GeneratorUtils":64,"./Hash256Dto":67,"./HeightDto":74,"./KeyDto":79,"./MosaicBuilder":87}],133:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlockDurationDto_1 = require("./BlockDurationDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const Hash256Dto_1 = require("./Hash256Dto");
const UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
const UnresolvedMosaicBuilder_1 = require("./UnresolvedMosaicBuilder");
class SecretLockTransactionBodyBuilder {
    constructor(secret, mosaic, duration, hashAlgorithm, recipientAddress) {
        this.secret = secret;
        this.mosaic = mosaic;
        this.duration = duration;
        this.hashAlgorithm = hashAlgorithm;
        this.recipientAddress = recipientAddress;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const secret = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secret.getSize());
        const mosaic = UnresolvedMosaicBuilder_1.UnresolvedMosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaic.getSize());
        const duration = BlockDurationDto_1.BlockDurationDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, duration.getSize());
        const hashAlgorithm = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const recipientAddress = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, recipientAddress.getSize());
        return new SecretLockTransactionBodyBuilder(secret, mosaic, duration, hashAlgorithm, recipientAddress);
    }
    getSecret() {
        return this.secret;
    }
    getMosaic() {
        return this.mosaic;
    }
    getDuration() {
        return this.duration;
    }
    getHashAlgorithm() {
        return this.hashAlgorithm;
    }
    getRecipientAddress() {
        return this.recipientAddress;
    }
    getSize() {
        let size = 0;
        size += this.secret.getSize();
        size += this.mosaic.getSize();
        size += this.duration.getSize();
        size += 1;
        size += this.recipientAddress.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const secretBytes = this.secret.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secretBytes);
        const mosaicBytes = this.mosaic.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicBytes);
        const durationBytes = this.duration.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, durationBytes);
        const hashAlgorithmBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.hashAlgorithm, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, hashAlgorithmBytes);
        const recipientAddressBytes = this.recipientAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, recipientAddressBytes);
        return newArray;
    }
}
exports.SecretLockTransactionBodyBuilder = SecretLockTransactionBodyBuilder;

},{"./BlockDurationDto":33,"./GeneratorUtils":64,"./Hash256Dto":67,"./UnresolvedAddressDto":143,"./UnresolvedMosaicBuilder":144}],134:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const SecretLockTransactionBodyBuilder_1 = require("./SecretLockTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class SecretLockTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, secret, mosaic, duration, hashAlgorithm, recipientAddress) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.secretLockTransactionBody = new SecretLockTransactionBodyBuilder_1.SecretLockTransactionBodyBuilder(secret, mosaic, duration, hashAlgorithm, recipientAddress);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const secretLockTransactionBody = SecretLockTransactionBodyBuilder_1.SecretLockTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secretLockTransactionBody.getSize());
        return new SecretLockTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, secretLockTransactionBody.secret, secretLockTransactionBody.mosaic, secretLockTransactionBody.duration, secretLockTransactionBody.hashAlgorithm, secretLockTransactionBody.recipientAddress);
    }
    getSecret() {
        return this.secretLockTransactionBody.getSecret();
    }
    getMosaic() {
        return this.secretLockTransactionBody.getMosaic();
    }
    getDuration() {
        return this.secretLockTransactionBody.getDuration();
    }
    getHashAlgorithm() {
        return this.secretLockTransactionBody.getHashAlgorithm();
    }
    getRecipientAddress() {
        return this.secretLockTransactionBody.getRecipientAddress();
    }
    getSize() {
        let size = super.getSize();
        size += this.secretLockTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const secretLockTransactionBodyBytes = this.secretLockTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secretLockTransactionBodyBytes);
        return newArray;
    }
}
exports.SecretLockTransactionBuilder = SecretLockTransactionBuilder;

},{"./GeneratorUtils":64,"./SecretLockTransactionBodyBuilder":133,"./TransactionBuilder":139}],135:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const Hash256Dto_1 = require("./Hash256Dto");
const UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
class SecretProofTransactionBodyBuilder {
    constructor(secret, hashAlgorithm, recipientAddress, proof) {
        this.secret = secret;
        this.hashAlgorithm = hashAlgorithm;
        this.recipientAddress = recipientAddress;
        this.proof = proof;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const secret = Hash256Dto_1.Hash256Dto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secret.getSize());
        const proofSize = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        const hashAlgorithm = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const recipientAddress = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, recipientAddress.getSize());
        const proof = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), proofSize);
        byteArray.splice(0, proofSize);
        return new SecretProofTransactionBodyBuilder(secret, hashAlgorithm, recipientAddress, proof);
    }
    getSecret() {
        return this.secret;
    }
    getHashAlgorithm() {
        return this.hashAlgorithm;
    }
    getRecipientAddress() {
        return this.recipientAddress;
    }
    getProof() {
        return this.proof;
    }
    getSize() {
        let size = 0;
        size += this.secret.getSize();
        size += 2;
        size += 1;
        size += this.recipientAddress.getSize();
        size += this.proof.length;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const secretBytes = this.secret.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secretBytes);
        const proofSizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.proof.length, 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, proofSizeBytes);
        const hashAlgorithmBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.hashAlgorithm, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, hashAlgorithmBytes);
        const recipientAddressBytes = this.recipientAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, recipientAddressBytes);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.proof);
        return newArray;
    }
}
exports.SecretProofTransactionBodyBuilder = SecretProofTransactionBodyBuilder;

},{"./GeneratorUtils":64,"./Hash256Dto":67,"./UnresolvedAddressDto":143}],136:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const SecretProofTransactionBodyBuilder_1 = require("./SecretProofTransactionBodyBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
class SecretProofTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, secret, hashAlgorithm, recipientAddress, proof) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.secretProofTransactionBody = new SecretProofTransactionBodyBuilder_1.SecretProofTransactionBodyBuilder(secret, hashAlgorithm, recipientAddress, proof);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const secretProofTransactionBody = SecretProofTransactionBodyBuilder_1.SecretProofTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, secretProofTransactionBody.getSize());
        return new SecretProofTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, secretProofTransactionBody.secret, secretProofTransactionBody.hashAlgorithm, secretProofTransactionBody.recipientAddress, secretProofTransactionBody.proof);
    }
    getSecret() {
        return this.secretProofTransactionBody.getSecret();
    }
    getHashAlgorithm() {
        return this.secretProofTransactionBody.getHashAlgorithm();
    }
    getRecipientAddress() {
        return this.secretProofTransactionBody.getRecipientAddress();
    }
    getProof() {
        return this.secretProofTransactionBody.getProof();
    }
    getSize() {
        let size = super.getSize();
        size += this.secretProofTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const secretProofTransactionBodyBytes = this.secretProofTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, secretProofTransactionBodyBytes);
        return newArray;
    }
}
exports.SecretProofTransactionBuilder = SecretProofTransactionBuilder;

},{"./GeneratorUtils":64,"./SecretProofTransactionBodyBuilder":135,"./TransactionBuilder":139}],137:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class SignatureDto {
    constructor(signature) {
        this.signature = signature;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const signature = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 64);
        byteArray.splice(0, 64);
        return new SignatureDto(signature);
    }
    getSignature() {
        return this.signature;
    }
    getSize() {
        return 64;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.signature);
        return newArray;
    }
}
exports.SignatureDto = SignatureDto;

},{"./GeneratorUtils":64}],138:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class TimestampDto {
    constructor(timestamp) {
        this.timestamp = timestamp;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const timestamp = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new TimestampDto(timestamp);
    }
    getTimestamp() {
        return this.timestamp;
    }
    getSize() {
        return 8;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const timestampBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getTimestamp());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, timestampBytes);
        return newArray;
    }
}
exports.TimestampDto = TimestampDto;

},{"./GeneratorUtils":64}],139:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AmountDto_1 = require("./AmountDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const KeyDto_1 = require("./KeyDto");
const SignatureDto_1 = require("./SignatureDto");
const TimestampDto_1 = require("./TimestampDto");
class TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline) {
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
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const size = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        const verifiableEntityHeader_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        const signature = SignatureDto_1.SignatureDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signature.getSize());
        const signerPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, signerPublicKey.getSize());
        const entityBody_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        const version = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const network = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const type = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        const fee = AmountDto_1.AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, fee.getSize());
        const deadline = TimestampDto_1.TimestampDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, deadline.getSize());
        return new TransactionBuilder(signature, signerPublicKey, version, network, type, fee, deadline);
    }
    getVerifiableEntityHeader_Reserved1() {
        return this.verifiableEntityHeader_Reserved1;
    }
    getSignature() {
        return this.signature;
    }
    getSignerPublicKey() {
        return this.signerPublicKey;
    }
    getEntityBody_Reserved1() {
        return this.entityBody_Reserved1;
    }
    getVersion() {
        return this.version;
    }
    getNetwork() {
        return this.network;
    }
    getType() {
        return this.type;
    }
    getFee() {
        return this.fee;
    }
    getDeadline() {
        return this.deadline;
    }
    getSize() {
        let size = 0;
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
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const sizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getSize(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, sizeBytes);
        const verifiableEntityHeader_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getVerifiableEntityHeader_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, verifiableEntityHeader_Reserved1Bytes);
        const signatureBytes = this.signature.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, signatureBytes);
        const signerPublicKeyBytes = this.signerPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, signerPublicKeyBytes);
        const entityBody_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getEntityBody_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, entityBody_Reserved1Bytes);
        const versionBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getVersion(), 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, versionBytes);
        const networkBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.network, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, networkBytes);
        const typeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.type, 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, typeBytes);
        const feeBytes = this.fee.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, feeBytes);
        const deadlineBytes = this.deadline.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, deadlineBytes);
        return newArray;
    }
}
exports.TransactionBuilder = TransactionBuilder;

},{"./AmountDto":30,"./GeneratorUtils":64,"./KeyDto":79,"./SignatureDto":137,"./TimestampDto":138}],140:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountAddressRestrictionTransactionBuilder_1 = require("./AccountAddressRestrictionTransactionBuilder");
const AccountKeyLinkTransactionBuilder_1 = require("./AccountKeyLinkTransactionBuilder");
const AccountMetadataTransactionBuilder_1 = require("./AccountMetadataTransactionBuilder");
const AccountMosaicRestrictionTransactionBuilder_1 = require("./AccountMosaicRestrictionTransactionBuilder");
const AccountOperationRestrictionTransactionBuilder_1 = require("./AccountOperationRestrictionTransactionBuilder");
const AddressAliasTransactionBuilder_1 = require("./AddressAliasTransactionBuilder");
const AggregateBondedTransactionBuilder_1 = require("./AggregateBondedTransactionBuilder");
const AggregateCompleteTransactionBuilder_1 = require("./AggregateCompleteTransactionBuilder");
const EntityTypeDto_1 = require("./EntityTypeDto");
const HashLockTransactionBuilder_1 = require("./HashLockTransactionBuilder");
const MosaicAddressRestrictionTransactionBuilder_1 = require("./MosaicAddressRestrictionTransactionBuilder");
const MosaicAliasTransactionBuilder_1 = require("./MosaicAliasTransactionBuilder");
const MosaicDefinitionTransactionBuilder_1 = require("./MosaicDefinitionTransactionBuilder");
const MosaicGlobalRestrictionTransactionBuilder_1 = require("./MosaicGlobalRestrictionTransactionBuilder");
const MosaicMetadataTransactionBuilder_1 = require("./MosaicMetadataTransactionBuilder");
const MosaicSupplyChangeTransactionBuilder_1 = require("./MosaicSupplyChangeTransactionBuilder");
const MultisigAccountModificationTransactionBuilder_1 = require("./MultisigAccountModificationTransactionBuilder");
const NamespaceMetadataTransactionBuilder_1 = require("./NamespaceMetadataTransactionBuilder");
const NamespaceRegistrationTransactionBuilder_1 = require("./NamespaceRegistrationTransactionBuilder");
const NodeKeyLinkTransactionBuilder_1 = require("./NodeKeyLinkTransactionBuilder");
const SecretLockTransactionBuilder_1 = require("./SecretLockTransactionBuilder");
const SecretProofTransactionBuilder_1 = require("./SecretProofTransactionBuilder");
const TransactionBuilder_1 = require("./TransactionBuilder");
const TransferTransactionBuilder_1 = require("./TransferTransactionBuilder");
const VotingKeyLinkTransactionBuilder_1 = require("./VotingKeyLinkTransactionBuilder");
const VrfKeyLinkTransactionBuilder_1 = require("./VrfKeyLinkTransactionBuilder");
class TransactionHelper {
    static loadFromBinary(bytes) {
        const header = TransactionBuilder_1.TransactionBuilder.loadFromBinary(bytes);
        switch (header.getType()) {
            case EntityTypeDto_1.EntityTypeDto.MOSAIC_DEFINITION_TRANSACTION_BUILDER:
                return MosaicDefinitionTransactionBuilder_1.MosaicDefinitionTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.ACCOUNT_KEY_LINK_TRANSACTION_BUILDER:
                return AccountKeyLinkTransactionBuilder_1.AccountKeyLinkTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.NODE_KEY_LINK_TRANSACTION_BUILDER:
                return NodeKeyLinkTransactionBuilder_1.NodeKeyLinkTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.AGGREGATE_COMPLETE_TRANSACTION_BUILDER:
                return AggregateCompleteTransactionBuilder_1.AggregateCompleteTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.AGGREGATE_BONDED_TRANSACTION_BUILDER:
                return AggregateBondedTransactionBuilder_1.AggregateBondedTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.VOTING_KEY_LINK_TRANSACTION_BUILDER:
                return VotingKeyLinkTransactionBuilder_1.VotingKeyLinkTransactionBuilder.loadFromBinary(bytes);
            case EntityTypeDto_1.EntityTypeDto.VRF_KEY_LINK_TRANSACTION_BUILDER:
                return VrfKeyLinkTransactionBuilder_1.VrfKeyLinkTransactionBuilder.loadFromBinary(bytes);
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
                throw new Error(`Transaction type: ${header.getType()} not recognized.`);
        }
    }
}
exports.TransactionHelper = TransactionHelper;

},{"./AccountAddressRestrictionTransactionBuilder":2,"./AccountKeyLinkTransactionBuilder":5,"./AccountMetadataTransactionBuilder":7,"./AccountMosaicRestrictionTransactionBuilder":9,"./AccountOperationRestrictionTransactionBuilder":11,"./AddressAliasTransactionBuilder":21,"./AggregateBondedTransactionBuilder":27,"./AggregateCompleteTransactionBuilder":28,"./EntityTypeDto":63,"./HashLockTransactionBuilder":71,"./MosaicAddressRestrictionTransactionBuilder":84,"./MosaicAliasTransactionBuilder":86,"./MosaicDefinitionTransactionBuilder":90,"./MosaicGlobalRestrictionTransactionBuilder":95,"./MosaicMetadataTransactionBuilder":98,"./MosaicSupplyChangeTransactionBuilder":107,"./MultisigAccountModificationTransactionBuilder":109,"./NamespaceMetadataTransactionBuilder":117,"./NamespaceRegistrationTransactionBuilder":120,"./NodeKeyLinkTransactionBuilder":123,"./SecretLockTransactionBuilder":134,"./SecretProofTransactionBuilder":136,"./TransactionBuilder":139,"./TransferTransactionBuilder":142,"./VotingKeyLinkTransactionBuilder":148,"./VrfKeyLinkTransactionBuilder":150}],141:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const UnresolvedAddressDto_1 = require("./UnresolvedAddressDto");
const UnresolvedMosaicBuilder_1 = require("./UnresolvedMosaicBuilder");
class TransferTransactionBodyBuilder {
    constructor(recipientAddress, mosaics, message) {
        this.recipientAddress = recipientAddress;
        this.transferTransactionBody_Reserved1 = 0;
        this.mosaics = mosaics;
        this.message = message;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const recipientAddress = UnresolvedAddressDto_1.UnresolvedAddressDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, recipientAddress.getSize());
        const mosaicsCount = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        const messageSize = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        const transferTransactionBody_Reserved1 = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 4));
        byteArray.splice(0, 4);
        const mosaics = [];
        for (let i = 0; i < (Array.isArray(mosaicsCount) ? GeneratorUtils_1.GeneratorUtils.compact(mosaicsCount) : mosaicsCount); i++) {
            const item = UnresolvedMosaicBuilder_1.UnresolvedMosaicBuilder.loadFromBinary(Uint8Array.from(byteArray));
            mosaics.push(item);
            byteArray.splice(0, item.getSize());
        }
        const message = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), messageSize);
        byteArray.splice(0, messageSize);
        return new TransferTransactionBodyBuilder(recipientAddress, mosaics, message);
    }
    getRecipientAddress() {
        return this.recipientAddress;
    }
    getTransferTransactionBody_Reserved1() {
        return this.transferTransactionBody_Reserved1;
    }
    getMosaics() {
        return this.mosaics;
    }
    getMessage() {
        return this.message;
    }
    getSize() {
        let size = 0;
        size += this.recipientAddress.getSize();
        size += 1;
        size += 2;
        size += 4;
        this.mosaics.forEach((o) => size += o.getSize());
        size += this.message.length;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const recipientAddressBytes = this.recipientAddress.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, recipientAddressBytes);
        const mosaicsCountBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.mosaics.length, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicsCountBytes);
        const messageSizeBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.message.length, 2);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, messageSizeBytes);
        const transferTransactionBody_Reserved1Bytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.getTransferTransactionBody_Reserved1(), 4);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, transferTransactionBody_Reserved1Bytes);
        this.mosaics.forEach((item) => {
            const mosaicsBytes = item.serialize();
            newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicsBytes);
        });
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.message);
        return newArray;
    }
}
exports.TransferTransactionBodyBuilder = TransferTransactionBodyBuilder;

},{"./GeneratorUtils":64,"./UnresolvedAddressDto":143,"./UnresolvedMosaicBuilder":144}],142:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
const TransferTransactionBodyBuilder_1 = require("./TransferTransactionBodyBuilder");
class TransferTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, recipientAddress, mosaics, message) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.transferTransactionBody = new TransferTransactionBodyBuilder_1.TransferTransactionBodyBuilder(recipientAddress, mosaics, message);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const transferTransactionBody = TransferTransactionBodyBuilder_1.TransferTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, transferTransactionBody.getSize());
        return new TransferTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, transferTransactionBody.recipientAddress, transferTransactionBody.mosaics, transferTransactionBody.message);
    }
    getRecipientAddress() {
        return this.transferTransactionBody.getRecipientAddress();
    }
    getTransferTransactionBody_Reserved1() {
        return this.transferTransactionBody.getTransferTransactionBody_Reserved1();
    }
    getMosaics() {
        return this.transferTransactionBody.getMosaics();
    }
    getMessage() {
        return this.transferTransactionBody.getMessage();
    }
    getSize() {
        let size = super.getSize();
        size += this.transferTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const transferTransactionBodyBytes = this.transferTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, transferTransactionBodyBytes);
        return newArray;
    }
}
exports.TransferTransactionBuilder = TransferTransactionBuilder;

},{"./GeneratorUtils":64,"./TransactionBuilder":139,"./TransferTransactionBodyBuilder":141}],143:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class UnresolvedAddressDto {
    constructor(unresolvedAddress) {
        this.unresolvedAddress = unresolvedAddress;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const unresolvedAddress = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 25);
        byteArray.splice(0, 25);
        return new UnresolvedAddressDto(unresolvedAddress);
    }
    getUnresolvedAddress() {
        return this.unresolvedAddress;
    }
    getSize() {
        return 25;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.unresolvedAddress);
        return newArray;
    }
}
exports.UnresolvedAddressDto = UnresolvedAddressDto;

},{"./GeneratorUtils":64}],144:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AmountDto_1 = require("./AmountDto");
const GeneratorUtils_1 = require("./GeneratorUtils");
const UnresolvedMosaicIdDto_1 = require("./UnresolvedMosaicIdDto");
class UnresolvedMosaicBuilder {
    constructor(mosaicId, amount) {
        this.mosaicId = mosaicId;
        this.amount = amount;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const mosaicId = UnresolvedMosaicIdDto_1.UnresolvedMosaicIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, mosaicId.getSize());
        const amount = AmountDto_1.AmountDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, amount.getSize());
        return new UnresolvedMosaicBuilder(mosaicId, amount);
    }
    getMosaicId() {
        return this.mosaicId;
    }
    getAmount() {
        return this.amount;
    }
    getSize() {
        let size = 0;
        size += this.mosaicId.getSize();
        size += this.amount.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const mosaicIdBytes = this.mosaicId.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, mosaicIdBytes);
        const amountBytes = this.amount.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, amountBytes);
        return newArray;
    }
}
exports.UnresolvedMosaicBuilder = UnresolvedMosaicBuilder;

},{"./AmountDto":30,"./GeneratorUtils":64,"./UnresolvedMosaicIdDto":145}],145:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class UnresolvedMosaicIdDto {
    constructor(unresolvedMosaicId) {
        this.unresolvedMosaicId = unresolvedMosaicId;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const unresolvedMosaicId = GeneratorUtils_1.GeneratorUtils.bufferToUint64(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        return new UnresolvedMosaicIdDto(unresolvedMosaicId);
    }
    getUnresolvedMosaicId() {
        return this.unresolvedMosaicId;
    }
    getSize() {
        return 8;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const unresolvedMosaicIdBytes = GeneratorUtils_1.GeneratorUtils.uint64ToBuffer(this.getUnresolvedMosaicId());
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, unresolvedMosaicIdBytes);
        return newArray;
    }
}
exports.UnresolvedMosaicIdDto = UnresolvedMosaicIdDto;

},{"./GeneratorUtils":64}],146:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
class VotingKeyDto {
    constructor(votingKey) {
        this.votingKey = votingKey;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const votingKey = GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 48);
        byteArray.splice(0, 48);
        return new VotingKeyDto(votingKey);
    }
    getVotingKey() {
        return this.votingKey;
    }
    getSize() {
        return 48;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, this.votingKey);
        return newArray;
    }
}
exports.VotingKeyDto = VotingKeyDto;

},{"./GeneratorUtils":64}],147:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const VotingKeyDto_1 = require("./VotingKeyDto");
class VotingKeyLinkTransactionBodyBuilder {
    constructor(linkedPublicKey, linkAction) {
        this.linkedPublicKey = linkedPublicKey;
        this.linkAction = linkAction;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const linkedPublicKey = VotingKeyDto_1.VotingKeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, linkedPublicKey.getSize());
        const linkAction = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        return new VotingKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
    }
    getLinkedPublicKey() {
        return this.linkedPublicKey;
    }
    getLinkAction() {
        return this.linkAction;
    }
    getSize() {
        let size = 0;
        size += this.linkedPublicKey.getSize();
        size += 1;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const linkedPublicKeyBytes = this.linkedPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, linkedPublicKeyBytes);
        const linkActionBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.linkAction, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, linkActionBytes);
        return newArray;
    }
}
exports.VotingKeyLinkTransactionBodyBuilder = VotingKeyLinkTransactionBodyBuilder;

},{"./GeneratorUtils":64,"./VotingKeyDto":146}],148:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
const VotingKeyLinkTransactionBodyBuilder_1 = require("./VotingKeyLinkTransactionBodyBuilder");
class VotingKeyLinkTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, linkAction) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.votingKeyLinkTransactionBody = new VotingKeyLinkTransactionBodyBuilder_1.VotingKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const votingKeyLinkTransactionBody = VotingKeyLinkTransactionBodyBuilder_1.VotingKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, votingKeyLinkTransactionBody.getSize());
        return new VotingKeyLinkTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, votingKeyLinkTransactionBody.linkedPublicKey, votingKeyLinkTransactionBody.linkAction);
    }
    getLinkedPublicKey() {
        return this.votingKeyLinkTransactionBody.getLinkedPublicKey();
    }
    getLinkAction() {
        return this.votingKeyLinkTransactionBody.getLinkAction();
    }
    getSize() {
        let size = super.getSize();
        size += this.votingKeyLinkTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const votingKeyLinkTransactionBodyBytes = this.votingKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, votingKeyLinkTransactionBodyBytes);
        return newArray;
    }
}
exports.VotingKeyLinkTransactionBuilder = VotingKeyLinkTransactionBuilder;

},{"./GeneratorUtils":64,"./TransactionBuilder":139,"./VotingKeyLinkTransactionBodyBuilder":147}],149:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const KeyDto_1 = require("./KeyDto");
class VrfKeyLinkTransactionBodyBuilder {
    constructor(linkedPublicKey, linkAction) {
        this.linkedPublicKey = linkedPublicKey;
        this.linkAction = linkAction;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const linkedPublicKey = KeyDto_1.KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, linkedPublicKey.getSize());
        const linkAction = GeneratorUtils_1.GeneratorUtils.bufferToUint(GeneratorUtils_1.GeneratorUtils.getBytes(Uint8Array.from(byteArray), 1));
        byteArray.splice(0, 1);
        return new VrfKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
    }
    getLinkedPublicKey() {
        return this.linkedPublicKey;
    }
    getLinkAction() {
        return this.linkAction;
    }
    getSize() {
        let size = 0;
        size += this.linkedPublicKey.getSize();
        size += 1;
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const linkedPublicKeyBytes = this.linkedPublicKey.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, linkedPublicKeyBytes);
        const linkActionBytes = GeneratorUtils_1.GeneratorUtils.uintToBuffer(this.linkAction, 1);
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, linkActionBytes);
        return newArray;
    }
}
exports.VrfKeyLinkTransactionBodyBuilder = VrfKeyLinkTransactionBodyBuilder;

},{"./GeneratorUtils":64,"./KeyDto":79}],150:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const TransactionBuilder_1 = require("./TransactionBuilder");
const VrfKeyLinkTransactionBodyBuilder_1 = require("./VrfKeyLinkTransactionBodyBuilder");
class VrfKeyLinkTransactionBuilder extends TransactionBuilder_1.TransactionBuilder {
    constructor(signature, signerPublicKey, version, network, type, fee, deadline, linkedPublicKey, linkAction) {
        super(signature, signerPublicKey, version, network, type, fee, deadline);
        this.vrfKeyLinkTransactionBody = new VrfKeyLinkTransactionBodyBuilder_1.VrfKeyLinkTransactionBodyBuilder(linkedPublicKey, linkAction);
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const superObject = TransactionBuilder_1.TransactionBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, superObject.getSize());
        const vrfKeyLinkTransactionBody = VrfKeyLinkTransactionBodyBuilder_1.VrfKeyLinkTransactionBodyBuilder.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, vrfKeyLinkTransactionBody.getSize());
        return new VrfKeyLinkTransactionBuilder(superObject.signature, superObject.signerPublicKey, superObject.version, superObject.network, superObject.type, superObject.fee, superObject.deadline, vrfKeyLinkTransactionBody.linkedPublicKey, vrfKeyLinkTransactionBody.linkAction);
    }
    getLinkedPublicKey() {
        return this.vrfKeyLinkTransactionBody.getLinkedPublicKey();
    }
    getLinkAction() {
        return this.vrfKeyLinkTransactionBody.getLinkAction();
    }
    getSize() {
        let size = super.getSize();
        size += this.vrfKeyLinkTransactionBody.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const superBytes = super.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, superBytes);
        const vrfKeyLinkTransactionBodyBytes = this.vrfKeyLinkTransactionBody.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, vrfKeyLinkTransactionBodyBytes);
        return newArray;
    }
}
exports.VrfKeyLinkTransactionBuilder = VrfKeyLinkTransactionBuilder;

},{"./GeneratorUtils":64,"./TransactionBuilder":139,"./VrfKeyLinkTransactionBodyBuilder":149}],151:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneratorUtils_1 = require("./GeneratorUtils");
const ProofGammaDto_1 = require("./ProofGammaDto");
const ProofScalarDto_1 = require("./ProofScalarDto");
const ProofVerificationHashDto_1 = require("./ProofVerificationHashDto");
class VrfProofBuilder {
    constructor(gamma, verificationHash, scalar) {
        this.gamma = gamma;
        this.verificationHash = verificationHash;
        this.scalar = scalar;
    }
    static loadFromBinary(payload) {
        const byteArray = Array.from(payload);
        const gamma = ProofGammaDto_1.ProofGammaDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, gamma.getSize());
        const verificationHash = ProofVerificationHashDto_1.ProofVerificationHashDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, verificationHash.getSize());
        const scalar = ProofScalarDto_1.ProofScalarDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, scalar.getSize());
        return new VrfProofBuilder(gamma, verificationHash, scalar);
    }
    getGamma() {
        return this.gamma;
    }
    getVerificationHash() {
        return this.verificationHash;
    }
    getScalar() {
        return this.scalar;
    }
    getSize() {
        let size = 0;
        size += this.gamma.getSize();
        size += this.verificationHash.getSize();
        size += this.scalar.getSize();
        return size;
    }
    serialize() {
        let newArray = Uint8Array.from([]);
        const gammaBytes = this.gamma.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, gammaBytes);
        const verificationHashBytes = this.verificationHash.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, verificationHashBytes);
        const scalarBytes = this.scalar.serialize();
        newArray = GeneratorUtils_1.GeneratorUtils.concatTypedArrays(newArray, scalarBytes);
        return newArray;
    }
}
exports.VrfProofBuilder = VrfProofBuilder;

},{"./GeneratorUtils":64,"./ProofGammaDto":124,"./ProofScalarDto":125,"./ProofVerificationHashDto":126}],"/node_modules/catbuffer-typescript":[function(require,module,exports){
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
__export(require("./VotingKeyDto"));
__export(require("./SignatureDto"));
__export(require("./MosaicBuilder"));
__export(require("./UnresolvedMosaicBuilder"));
__export(require("./ProofGammaDto"));
__export(require("./ProofVerificationHashDto"));
__export(require("./ProofScalarDto"));
__export(require("./VrfProofBuilder"));
__export(require("./BlockHeaderBuilder"));
__export(require("./ReceiptBuilder"));
__export(require("./BalanceTransferReceiptBuilder"));
__export(require("./BalanceChangeReceiptBuilder"));
__export(require("./InflationReceiptBuilder"));
__export(require("./MosaicExpiryReceiptBuilder"));
__export(require("./NamespaceIdDto"));
__export(require("./NamespaceExpiryReceiptBuilder"));
__export(require("./ReceiptSourceBuilder"));
__export(require("./AddressResolutionEntryBuilder"));
__export(require("./MosaicResolutionEntryBuilder"));
__export(require("./MosaicResolutionStatementBuilder"));
__export(require("./AddressResolutionStatementBuilder"));
__export(require("./ImportanceSnapshotBuilder"));
__export(require("./HeightActivityBucketBuilder"));
__export(require("./HeightActivityBucketsBuilder"));
__export(require("./AccountStateBuilder"));
__export(require("./HashLockInfoBuilder"));
__export(require("./ScopedMetadataKeyDto"));
__export(require("./MetadataValueBuilder"));
__export(require("./MetadataEntryBuilder"));
__export(require("./MosaicNonceDto"));
__export(require("./MosaicPropertiesBuilder"));
__export(require("./MosaicDefinitionBuilder"));
__export(require("./MosaicEntryBuilder"));
__export(require("./MultisigEntryBuilder"));
__export(require("./TransactionBuilder"));
__export(require("./EmbeddedTransactionBuilder"));
__export(require("./MosaicDefinitionTransactionBodyBuilder"));
__export(require("./MosaicDefinitionTransactionBuilder"));
__export(require("./EmbeddedMosaicDefinitionTransactionBuilder"));
__export(require("./NamespaceLifetimeBuilder"));
__export(require("./NamespaceAliasBuilder"));
__export(require("./NamespacePathBuilder"));
__export(require("./RootNamespaceHistoryBuilder"));
__export(require("./AccountRestrictionAddressValueBuilder"));
__export(require("./AccountRestrictionMosaicValueBuilder"));
__export(require("./AccountRestrictionTransactionTypeValueBuilder"));
__export(require("./AccountRestrictionsInfoBuilder"));
__export(require("./AccountRestrictionsBuilder"));
__export(require("./MosaicRestrictionKeyDto"));
__export(require("./AddressKeyValueBuilder"));
__export(require("./AddressKeyValueSetBuilder"));
__export(require("./RestrictionRuleBuilder"));
__export(require("./GlobalKeyValueBuilder"));
__export(require("./GlobalKeyValueSetBuilder"));
__export(require("./MosaicAddressRestrictionEntryBuilder"));
__export(require("./MosaicGlobalRestrictionEntryBuilder"));
__export(require("./MosaicRestrictionEntryBuilder"));
__export(require("./SecretLockInfoBuilder"));
__export(require("./AccountKeyLinkTransactionBodyBuilder"));
__export(require("./AccountKeyLinkTransactionBuilder"));
__export(require("./EmbeddedAccountKeyLinkTransactionBuilder"));
__export(require("./NodeKeyLinkTransactionBodyBuilder"));
__export(require("./NodeKeyLinkTransactionBuilder"));
__export(require("./EmbeddedNodeKeyLinkTransactionBuilder"));
__export(require("./CosignatureBuilder"));
__export(require("./DetachedCosignatureBuilder"));
__export(require("./AggregateTransactionBodyBuilder"));
__export(require("./AggregateCompleteTransactionBuilder"));
__export(require("./AggregateBondedTransactionBuilder"));
__export(require("./VotingKeyLinkTransactionBodyBuilder"));
__export(require("./VotingKeyLinkTransactionBuilder"));
__export(require("./EmbeddedVotingKeyLinkTransactionBuilder"));
__export(require("./VrfKeyLinkTransactionBodyBuilder"));
__export(require("./VrfKeyLinkTransactionBuilder"));
__export(require("./EmbeddedVrfKeyLinkTransactionBuilder"));
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
__export(require("./NamespaceMetadataTransactionBodyBuilder"));
__export(require("./NamespaceMetadataTransactionBuilder"));
__export(require("./EmbeddedNamespaceMetadataTransactionBuilder"));
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
__export(require("./NamespaceRegistrationTransactionBodyBuilder"));
__export(require("./NamespaceRegistrationTransactionBuilder"));
__export(require("./EmbeddedNamespaceRegistrationTransactionBuilder"));
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
__export(require("./MosaicGlobalRestrictionTransactionBodyBuilder"));
__export(require("./MosaicGlobalRestrictionTransactionBuilder"));
__export(require("./EmbeddedMosaicGlobalRestrictionTransactionBuilder"));
__export(require("./TransferTransactionBodyBuilder"));
__export(require("./TransferTransactionBuilder"));
__export(require("./EmbeddedTransferTransactionBuilder"));
__export(require("./EmbeddedTransactionHelper"));
__export(require("./TransactionHelper"));
__export(require("./GeneratorUtils"));

},{"./AccountAddressRestrictionTransactionBodyBuilder":1,"./AccountAddressRestrictionTransactionBuilder":2,"./AccountKeyLinkTransactionBodyBuilder":4,"./AccountKeyLinkTransactionBuilder":5,"./AccountMetadataTransactionBodyBuilder":6,"./AccountMetadataTransactionBuilder":7,"./AccountMosaicRestrictionTransactionBodyBuilder":8,"./AccountMosaicRestrictionTransactionBuilder":9,"./AccountOperationRestrictionTransactionBodyBuilder":10,"./AccountOperationRestrictionTransactionBuilder":11,"./AccountRestrictionAddressValueBuilder":12,"./AccountRestrictionMosaicValueBuilder":14,"./AccountRestrictionTransactionTypeValueBuilder":15,"./AccountRestrictionsBuilder":16,"./AccountRestrictionsInfoBuilder":17,"./AccountStateBuilder":18,"./AddressAliasTransactionBodyBuilder":20,"./AddressAliasTransactionBuilder":21,"./AddressDto":22,"./AddressKeyValueBuilder":23,"./AddressKeyValueSetBuilder":24,"./AddressResolutionEntryBuilder":25,"./AddressResolutionStatementBuilder":26,"./AggregateBondedTransactionBuilder":27,"./AggregateCompleteTransactionBuilder":28,"./AggregateTransactionBodyBuilder":29,"./AmountDto":30,"./BalanceChangeReceiptBuilder":31,"./BalanceTransferReceiptBuilder":32,"./BlockDurationDto":33,"./BlockFeeMultiplierDto":34,"./BlockHeaderBuilder":35,"./CosignatureBuilder":36,"./DetachedCosignatureBuilder":37,"./DifficultyDto":38,"./EmbeddedAccountAddressRestrictionTransactionBuilder":39,"./EmbeddedAccountKeyLinkTransactionBuilder":40,"./EmbeddedAccountMetadataTransactionBuilder":41,"./EmbeddedAccountMosaicRestrictionTransactionBuilder":42,"./EmbeddedAccountOperationRestrictionTransactionBuilder":43,"./EmbeddedAddressAliasTransactionBuilder":44,"./EmbeddedHashLockTransactionBuilder":45,"./EmbeddedMosaicAddressRestrictionTransactionBuilder":46,"./EmbeddedMosaicAliasTransactionBuilder":47,"./EmbeddedMosaicDefinitionTransactionBuilder":48,"./EmbeddedMosaicGlobalRestrictionTransactionBuilder":49,"./EmbeddedMosaicMetadataTransactionBuilder":50,"./EmbeddedMosaicSupplyChangeTransactionBuilder":51,"./EmbeddedMultisigAccountModificationTransactionBuilder":52,"./EmbeddedNamespaceMetadataTransactionBuilder":53,"./EmbeddedNamespaceRegistrationTransactionBuilder":54,"./EmbeddedNodeKeyLinkTransactionBuilder":55,"./EmbeddedSecretLockTransactionBuilder":56,"./EmbeddedSecretProofTransactionBuilder":57,"./EmbeddedTransactionBuilder":58,"./EmbeddedTransactionHelper":59,"./EmbeddedTransferTransactionBuilder":60,"./EmbeddedVotingKeyLinkTransactionBuilder":61,"./EmbeddedVrfKeyLinkTransactionBuilder":62,"./GeneratorUtils":64,"./GlobalKeyValueBuilder":65,"./GlobalKeyValueSetBuilder":66,"./Hash256Dto":67,"./Hash512Dto":68,"./HashLockInfoBuilder":69,"./HashLockTransactionBodyBuilder":70,"./HashLockTransactionBuilder":71,"./HeightActivityBucketBuilder":72,"./HeightActivityBucketsBuilder":73,"./HeightDto":74,"./ImportanceDto":75,"./ImportanceHeightDto":76,"./ImportanceSnapshotBuilder":77,"./InflationReceiptBuilder":78,"./KeyDto":79,"./MetadataEntryBuilder":80,"./MetadataValueBuilder":81,"./MosaicAddressRestrictionEntryBuilder":82,"./MosaicAddressRestrictionTransactionBodyBuilder":83,"./MosaicAddressRestrictionTransactionBuilder":84,"./MosaicAliasTransactionBodyBuilder":85,"./MosaicAliasTransactionBuilder":86,"./MosaicBuilder":87,"./MosaicDefinitionBuilder":88,"./MosaicDefinitionTransactionBodyBuilder":89,"./MosaicDefinitionTransactionBuilder":90,"./MosaicEntryBuilder":91,"./MosaicExpiryReceiptBuilder":92,"./MosaicGlobalRestrictionEntryBuilder":93,"./MosaicGlobalRestrictionTransactionBodyBuilder":94,"./MosaicGlobalRestrictionTransactionBuilder":95,"./MosaicIdDto":96,"./MosaicMetadataTransactionBodyBuilder":97,"./MosaicMetadataTransactionBuilder":98,"./MosaicNonceDto":99,"./MosaicPropertiesBuilder":100,"./MosaicResolutionEntryBuilder":101,"./MosaicResolutionStatementBuilder":102,"./MosaicRestrictionEntryBuilder":103,"./MosaicRestrictionKeyDto":105,"./MosaicSupplyChangeTransactionBodyBuilder":106,"./MosaicSupplyChangeTransactionBuilder":107,"./MultisigAccountModificationTransactionBodyBuilder":108,"./MultisigAccountModificationTransactionBuilder":109,"./MultisigEntryBuilder":110,"./NamespaceAliasBuilder":111,"./NamespaceExpiryReceiptBuilder":113,"./NamespaceIdDto":114,"./NamespaceLifetimeBuilder":115,"./NamespaceMetadataTransactionBodyBuilder":116,"./NamespaceMetadataTransactionBuilder":117,"./NamespacePathBuilder":118,"./NamespaceRegistrationTransactionBodyBuilder":119,"./NamespaceRegistrationTransactionBuilder":120,"./NodeKeyLinkTransactionBodyBuilder":122,"./NodeKeyLinkTransactionBuilder":123,"./ProofGammaDto":124,"./ProofScalarDto":125,"./ProofVerificationHashDto":126,"./ReceiptBuilder":127,"./ReceiptSourceBuilder":128,"./RestrictionRuleBuilder":129,"./RootNamespaceHistoryBuilder":130,"./ScopedMetadataKeyDto":131,"./SecretLockInfoBuilder":132,"./SecretLockTransactionBodyBuilder":133,"./SecretLockTransactionBuilder":134,"./SecretProofTransactionBodyBuilder":135,"./SecretProofTransactionBuilder":136,"./SignatureDto":137,"./TimestampDto":138,"./TransactionBuilder":139,"./TransactionHelper":140,"./TransferTransactionBodyBuilder":141,"./TransferTransactionBuilder":142,"./UnresolvedAddressDto":143,"./UnresolvedMosaicBuilder":144,"./UnresolvedMosaicIdDto":145,"./VotingKeyDto":146,"./VotingKeyLinkTransactionBodyBuilder":147,"./VotingKeyLinkTransactionBuilder":148,"./VrfKeyLinkTransactionBodyBuilder":149,"./VrfKeyLinkTransactionBuilder":150,"./VrfProofBuilder":151}]},{},[]);
