async function fetchJSONOrGetNull(url, options = {}, isJson = true)
{
    let response = await fetch(url,
        {headers: {'Content-Type': isJson ?
                    'application/json' :
                    'application/x-www-form-urlencoded',
                ...options}});
    if (response.ok)
    {
        return response.json();
    }
    else
    {
        console.info(response);
        return null;
    }
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function fetchStaffId() {
    fetchJSONOrGetNull('/fetch_staff_id').then(response => {
        return response['staff_id'];
    }).catch(response => {
        console.error('Could not fetch your Staff ID');
        return -1
    })
}