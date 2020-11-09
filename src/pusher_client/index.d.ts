// Type definitions for Pusher Client
// Project: NeoCEE
// Definitions by: JM


/*~ If this module exports functions, declare them like so.
 */

import {ChannelTypePrefix} from "~pusher_client/helpers";

export function requestJSON<T>(url: string, options: {}, isJson: {}, bodyJSON: JSON, isPost: boolean): T | string | number;

export interface StaffIdResponse {
    staffid: number;
}

export interface connectionInformation {
    channelName: string,
    authToken: string,
    channelTypeInput: string,
    connectChannelInput: string,
    makeChannelInput: string
}

export interface ConnectionSession {
    projTempVerId: number,
    sessionStorageToken: string,
    canEdit: boolean,
    isEditing: boolean,
    eventLog: string[]
}

export interface PusherClientState {
    channelTypeInput: ChannelTypePrefix
    currentProjectVersionId: number,
    authToken: string,
    appKey: string,
    staffId: number,
    makeChannelInput: string,
    connectChannelInput: string,
    sessions: ConnectionSession[]
}


export function myFunction(a: string): string;
export function myOtherFunction(a: number): number;

/*~ You can declare types that are available via importing the module */
export interface SomeType {
    name: string;
    length: number;
    extras?: string[];
}

/*~ You can declare properties of the module using const, let, or var */
export const myField: number;
