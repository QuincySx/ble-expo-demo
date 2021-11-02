/* @flow */
import {
    TRANSPORT,
    UI,
    IFRAME,
    POPUP,
} from '../constants';
import { ConnectSettings, CoreMessage } from './params';
import { Device } from './trezor/device';
import { DiscoveryAccount, SelectFeeLevel } from './account';
import { CoinInfo, BitcoinNetworkInfo } from './networks/coinInfo';

export interface BridgeInfo {
    version: number[];
    directory: string;
    packages: Array<{
        name: string,
        platform: string[],
        url: string,
        signature?: string,
        preferred?: boolean
    }>;
    changelog: string;
}
export type TransportInfo = {
    type: string,
    version: string,
    outdated: boolean,
    bridge?: BridgeInfo
};

export type TransportEvent = {
    type: typeof TRANSPORT.START,
    payload: TransportInfo
} | {
    type: typeof TRANSPORT.ERROR,
    payload: {
        error: string,
        bridge?: BridgeInfo
    }
};

/*
* messages to UI emitted as UI_EVENT
*/

export type MessageWithoutPayload = {
    type: typeof UI.REQUEST_UI_WINDOW | typeof POPUP.CANCEL_POPUP_REQUEST | typeof POPUP.LOADED | typeof UI.TRANSPORT | typeof UI.CHANGE_ACCOUNT | typeof UI.INSUFFICIENT_FUNDS | typeof UI.CLOSE_UI_WINDOW | typeof UI.LOGIN_CHALLENGE_REQUEST
};

export type DeviceMessage = {
    type: typeof UI.REQUEST_PIN | typeof UI.INVALID_PIN | typeof UI.REQUEST_PASSPHRASE_ON_DEVICE | typeof UI.REQUEST_PASSPHRASE | typeof UI.INVALID_PASSPHRASE | typeof UI.REQUEST_WORD,
    payload: {
        device: Device,
        type?: string // todo: better flow enum
    }
};

export type ButtonRequestData = {
    type: "address",
    serializedPath: string,
    address: string
};

export type ButtonRequestMessage = {
    type: typeof UI.REQUEST_BUTTON,
    payload: {
        device: Device,
        code: string,
        data: ButtonRequestData | null
    }
};

export type AddressValidationMessage = {
    type: typeof UI.ADDRESS_VALIDATION,
    payload: ButtonRequestData | null
};

export type IFrameFailure = {
    type: typeof UI.IFRAME_FAILURE
};

export type IFrameError = {
    type: typeof IFRAME.ERROR,
    payload: {
        error: string,
        code?: string
    }
};

export type IFrameLoaded = {
    type: typeof IFRAME.LOADED,
    payload: {
        useBroadcastChannel: boolean
    }
};

export type PopupInit = {
    type: typeof POPUP.INIT,
    payload: {
        settings: ConnectSettings // those are settings from window.opener,
        useBroadcastChannel: boolean
    }
};

export type PopupError = {
    type: typeof POPUP.ERROR,
    payload: {
        error: string
    }
};

export type PopupHandshake = {
    type: typeof POPUP.HANDSHAKE,
    payload?: {
        settings: ConnectSettings // those are settings from the iframe, they could be different from window.opener settings,
        method: string | null,
        transport: TransportInfo | null
    }
};

export type RequestPermission = {
    type: typeof UI.REQUEST_PERMISSION,
    payload: {
        permissions: Array<string>,
        device: Device
    }
};

export type RequestConfirmation = {
    type: typeof UI.REQUEST_CONFIRMATION,
    payload: {
        view: string,
        label?: string,
        customConfirmButton?: {
            className: string,
            label: string
        },
        customCancelButton?: {
            className: string,
            label: string
        }
    }
};

export type SelectDevice = {
    type: typeof UI.SELECT_DEVICE,
    payload: {
        devices: Array<Device>,
        webusb: boolean
    }
};

export type UnexpectedDeviceMode = {
    type: typeof UI.BOOTLOADER | typeof UI.NOT_IN_BOOTLOADER | typeof UI.INITIALIZE | typeof UI.SEEDLESS | typeof UI.DEVICE_NEEDS_BACKUP,
    payload: Device
};

export type FirmwareException = {
    type: typeof UI.FIRMWARE_OLD | typeof UI.FIRMWARE_OUTDATED | typeof UI.FIRMWARE_NOT_SUPPORTED | typeof UI.FIRMWARE_NOT_COMPATIBLE | typeof UI.FIRMWARE_NOT_INSTALLED,
    payload: Device
};

export type SelectAccount = {
    type: typeof UI.SELECT_ACCOUNT,
    payload: {
        type: "start" | "progress" | "end",
        coinInfo: CoinInfo,
        accountTypes?: Array<"normal" | "segwit" | "legacy">,
        defaultAccountType?: "normal" | "segwit" | "legacy",
        accounts?: Array<DiscoveryAccount>,
        preventEmpty?: boolean
    }
};

export type SelectFee = {
    type: typeof UI.SELECT_FEE,
    payload: {
        coinInfo: BitcoinNetworkInfo,
        feeLevels: Array<SelectFeeLevel>
    }
};

export type UpdateCustomFee = {
    type: typeof UI.UPDATE_CUSTOM_FEE,
    payload: {
        coinInfo: BitcoinNetworkInfo,
        feeLevels: Array<SelectFeeLevel>
    }
};

export type BundleProgress<R> = {
    type: typeof UI.BUNDLE_PROGRESS,
    payload: {
        progress: number,
        response: R,
        error?: string
    }
};

export type FirmwareProgress = {
    type: typeof UI.FIRMWARE_PROGRESS,
    payload: {
        device: Device,
        progress: number
    }
};

/*
* Callback message for CustomMessage method
*/
export type CustomMessageRequest = {
    type: typeof UI.CUSTOM_MESSAGE_REQUEST,
    payload: {
        type: string,
        message: Object
    }
};

export type UiEvent = MessageWithoutPayload | DeviceMessage | ButtonRequestMessage | PopupHandshake | RequestPermission | RequestConfirmation | SelectDevice | UnexpectedDeviceMode | SelectAccount | SelectFee | UpdateCustomFee | BundleProgress<any> | FirmwareProgress | CustomMessageRequest;

type ReceivePermission = {
    type: typeof UI.RECEIVE_PERMISSION,
    payload: {
        granted: boolean,
        remember: boolean
    }
};

type ReceiveConfirmation = {
    type: typeof UI.RECEIVE_CONFIRMATION,
    payload: boolean
};

type ReceiveDevice = {
    type: typeof UI.RECEIVE_DEVICE,
    payload: {
        device: Device,
        remember: boolean
    }
};

type ReceivePin = {
    type: typeof UI.RECEIVE_PIN,
    payload: string
};

type ReceiveWord = {
    type: typeof UI.RECEIVE_WORD,
    payload: string
};

type ReceivePassphrase = {
    type: typeof UI.RECEIVE_PASSPHRASE,
    payload: {
        save: boolean,
        value: string,
        passphraseOnDevice?: boolean
    }
};

type ReceivePassphraseAction = {
    type: typeof UI.INVALID_PASSPHRASE_ACTION,
    payload: boolean
};

type ReceiveAccount = {
    type: typeof UI.RECEIVE_ACCOUNT,
    payload?: number
};

type ReceiveFee = {
    type: typeof UI.RECEIVE_FEE,
    payload: {
        type: "compose-custom",
        value: number
    } | {
        type: "change-account"
    } | {
        type: "send",
        value: string
    }
};

export type UiResponse = ReceivePermission | ReceiveConfirmation | ReceiveDevice | ReceivePin | ReceiveWord | ReceivePassphrase | ReceivePassphraseAction | ReceiveAccount | ReceiveFee | CustomMessageRequest;

type FT<T> = T["type"];
type FP<T> = T["payload"];

export interface UiMessageBuilder {}
