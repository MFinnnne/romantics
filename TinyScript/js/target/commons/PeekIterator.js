"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts_linked_list_1 = __importDefault(require("ts-linked-list"));
/*
 * @Author: MFine
 * @Date: 2021-07-01 01:00:39
 * @LastEditTime: 2021-07-02 00:35:15
 * @LastEditors: MFine
 * @Description:
 */
var PeekIterator = /** @class */ (function () {
    function PeekIterator(it, endToken) {
        this.it = null;
        this.stackPutBacks = new ts_linked_list_1.default();
        this.queueCache = new ts_linked_list_1.default();
        this.CACHE_SIZE = 10;
        this.endToken = null;
        this.it = it;
        this.endToken = endToken !== null && endToken !== void 0 ? endToken : null;
    }
    PeekIterator.prototype.peek = function () {
        var _a;
        if (this.stackPutBacks.length > 0) {
            return this.stackPutBacks.get(0);
        }
        if (!this.hasNext()) {
            return this.endToken;
        }
        var next = (_a = this.it) === null || _a === void 0 ? void 0 : _a.next().value;
        this.putBack();
        return next;
    };
    PeekIterator.prototype.putBack = function () {
        var val = this.queueCache.pop();
        val && this.stackPutBacks.push(val);
    };
    PeekIterator.prototype.hasNext = function () {
        return this.endToken !== null || !!this.peek();
    };
    PeekIterator.prototype.next = function () {
        var _a;
        var val;
        if (this.stackPutBacks.length > 0) {
            val = this.stackPutBacks.pop();
        }
        else {
            val = (_a = this.it) === null || _a === void 0 ? void 0 : _a.next().value;
        }
        if (this.queueCache.length > this.CACHE_SIZE - 1) {
            this.queueCache.shift();
        }
        val && this.queueCache.append(val);
        return val;
    };
    return PeekIterator;
}());
exports.default = PeekIterator;
