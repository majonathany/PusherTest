export enum ChannelTypePrefix {ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
    CONNECTED = "connected",
    UNAVAILABLE = "unavailable",
    FAILED = "failed",
    DISCONNECTED = "disconnected"
}

export function fetchJSONOrGetNull(url, options = {}, isJson = true, bodyJSON="", isPost=true) {
    return fetch(url,
        {method: isPost? 'POST' : 'GET',
            headers: {
                'Content-Type': isJson ?
                    'application/json' :
                    'application/x-www-form-urlencoded',
                ...options
            },
            body: bodyJSON
        })
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
    fetchJSONOrGetNull('/fetch_staffId').then(response => {
        return response['staffId'];
    }).catch(e => {
        console.error('Could not fetch your Staff ID');
        return -1
    })
}

//Converts camelCase **or** CamelCase  to SCREAMING_SNAKE_CASE
export function screamifyCamel(input)
{
    input = input.replace(/[A-Z]/g, letter => `_${letter}`).toUpperCase();
    return input.charAt(0) === '_' ? input.substr(1) : input;
}

export function camelifyScreaming(input)
{
        return input.toLowerCase()
            .replace( /['"]/g, '' )
            .replace( /\W+/g, ' ' )
            .replace( /_(.)/g, function($1) { return $1.toUpperCase(); })
            .replace( / /g, '' )
            .replace( /[_]/g, '' );
}

export function getSessionStorageKeyName(projectTemplateVersionId)
{
    return `projTempVer-${projectTemplateVersionId}-SessionToken`
}

export function getChannelName(channelTypePrefix, channelName)
{
    return channelTypePrefix + channelName;
}

export function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

