export function fetchJSONOrGetNull(url, options = {}, isJson = true) {
    return fetch(url,
        {
            headers: {
                'Content-Type': isJson ?
                    'application/json' :
                    'application/x-www-form-urlencoded',
                ...options
            }
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
    fetchJSONOrGetNull('/fetch_staff_id').then(response => {
        return response['staff_id'];
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

export function getPrivateChannelName(channelSuffix)
{
    return 'private-' + channelSuffix;
}

export function getPublicChannelName(channelSuffix)
{
    return 'public-' + channelSuffix;
}

export function  getEncryptedChannelName(channelSuffix)
{
    return 'private-encrypted-' + channelSuffix;
}

export function  getPresenceChannelName(channelSuffix)
{
    return 'presence-' + channelSuffix;
}