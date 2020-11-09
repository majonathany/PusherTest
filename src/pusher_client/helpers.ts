import axios, {AxiosError, AxiosResponse} from 'axios';
import {StaffIdResponse} from './index';

export enum ChannelTypePrefix {
    CONNECTED = "connected",
    UNAVAILABLE = "unavailable",
    FAILED = "failed",
    DISCONNECTED = "disconnected"
}

export function requestJSON<T>(url: string, options = {}, jsonBody: string = "", isPost = false): Promise<T | string> {

    if (isPost)
    {
        return axios.post(url, jsonBody, options)
            .then((response: AxiosResponse<T> ) => {return response.data})
            .catch((error: AxiosError<T>) => {return `Code ${error.code}: Error: ${error.response}`});
    }
    else
    {
        return axios.get(url, options)
            .then((response: AxiosResponse<T> ) => { return response.data })
            .catch((error: AxiosError<T>) => {return `Code ${error.code}: Error: ${error.response}`});

    }
}

export function uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c: string) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function fetchStaffId(): Promise<number> {
    return requestJSON<StaffIdResponse>('/fetch_staffId')
        .then((response: StaffIdResponse) => {
            if (typeof response.staffid === "number") {
                return response.staffid;
            }
            else {
                const staff_id = parseInt(response.staffid);
                return isNaN(staff_id) ? -1 : staff_id;
            }
        }).catch((_: AxiosError) => {
            console.error('Could not fetch your Staff ID');
            return -1
        })
}

//Converts camelCase **or** CamelCase  to SCREAMING_SNAKE_CASE
export function screamifyCamel(input: string): string
{
    input = input.replace(/[A-Z]/g, letter => `_${letter}`).toUpperCase();
    return input.charAt(0) === '_' ? input.substr(1) : input;
}

export function camelifyScreaming(input: string): string
{
        return input.toLowerCase()
            .replace( /['"]/g, '' )
            .replace( /\W+/g, ' ' )
            .replace( /_(.)/g, function($1) { return $1.toUpperCase(); })
            .replace( / /g, '' )
            .replace( /[_]/g, '' );
}

export function getSessionStorageKeyName(projectTemplateVersionId: string | number): string
{
    return `projTempVer-${projectTemplateVersionId}-SessionToken`
}

export function getChannelName(channelTypePrefix: string, channelName: string): string
{
    return channelTypePrefix + channelName;
}

export function isNumeric(str: string): boolean {
    return !isNaN(Number(str));
}

