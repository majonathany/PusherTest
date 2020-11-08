var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export var ChannelTypePrefixes = {
    PRIVATE: 'private-',
    PUBLIC: 'public-',
    PRESENCE: 'presence-',
    ENCRYPTED: 'private-encrypted-'
};
export function getChannelTypePrefix(input) {
    switch (input) {
        case "1":
            return ChannelTypePrefixes.PUBLIC;
        case "2":
            return ChannelTypePrefixes.PRIVATE;
        case "3":
            return ChannelTypePrefixes.PRESENCE;
        case "4":
            return ChannelTypePrefixes.ENCRYPTED;
        default:
            return ChannelTypePrefixes.PUBLIC;
    }
}
export var PusherStates = {
    INITIALIZED: "initialized",
    CONNECTING: "connecting",
    CONNECTED: "connected",
    UNAVAILABLE: "unavailable",
    FAILED: "failed",
    DISCONNECTED: "disconnected"
};
export function fetchJSONOrGetNull(url, options, isJson, bodyJSON, isPost) {
    if (options === void 0) { options = {}; }
    if (isJson === void 0) { isJson = true; }
    if (bodyJSON === void 0) { bodyJSON = ""; }
    if (isPost === void 0) { isPost = true; }
    return fetch(url, { method: isPost ? 'POST' : 'GET', headers: __assign({ 'Content-Type': isJson ?
                'application/json' :
                'application/x-www-form-urlencoded' }, options), body: bodyJSON })
        .then(function (response) {
        return response.json();
    }).catch(function (e) {
        console.info(e);
        return null;
    });
}
export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
export function fetchStaffId() {
    fetchJSONOrGetNull('/fetch_staffId').then(function (response) {
        return response['staffId'];
    }).catch(function (e) {
        console.error('Could not fetch your Staff ID');
        return -1;
    });
}
//Converts camelCase **or** CamelCase  to SCREAMING_SNAKE_CASE
export function screamifyCamel(input) {
    input = input.replace(/[A-Z]/g, function (letter) { return "_" + letter; }).toUpperCase();
    return input.charAt(0) === '_' ? input.substr(1) : input;
}
export function camelifyScreaming(input) {
    return input.toLowerCase()
        .replace(/['"]/g, '')
        .replace(/\W+/g, ' ')
        .replace(/_(.)/g, function ($1) { return $1.toUpperCase(); })
        .replace(/ /g, '')
        .replace(/[_]/g, '');
}
export function getSessionStorageKeyName(projectTemplateVersionId) {
    return "projTempVer-" + projectTemplateVersionId + "-SessionToken";
}
export function getChannelName(channelTypePrefix, channelName) {
    return channelTypePrefix + channelName;
}
export function isNumeric(str) {
    if (typeof str != "string")
        return false; // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)); // ...and ensure strings of whitespace fail
}
