// import bleUtils from './BleUtils';
import { Buffer } from "buffer";
export class BleHandler {
    constructor() {  
    }
    enumerate() {
        console.log("enumerate ........");
        return Promise.resolve([{path: 'ble', debug: true}]);
    }
    acquire(path, debugLink) {
        console.log("acquire .........");
        return Promise.resolve("");
    }
    release(path, debugLink, closePort) {
        console.log("release .........");
        return Promise.resolve("");
    }
    write(path, debugLink, data) {
        console.log("write ........." + data);
 
        // const newArray = new Uint8Array(64);
        // newArray[0] = 63;
        // newArray.set(new Uint8Array(data), 1);
        // console.log("1111111111111");
        // console.log("write ........." + Buffer.from(newArray).toString('base64'));
        // newArray = Buffer.from(newArray).toString('base64');
        
        // data = "3f" + data;
        // value = Buffer.from(data, 'hex').toString('base64');
        // console.log("==="+ value + data);
        // bleUtils.writeWithoutResponse(value);
        return Promise.resolve("");
    }
    read(path, debugLink) {
        console.log("read .........");
        return Promise.resolve('hello');
    }
}

export const Handler = new BleHandler();
