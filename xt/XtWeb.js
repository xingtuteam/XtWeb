import utils from './utils';
import {ADDRESS_PREFIX, ADDRESS_PREFIX_REGEX} from './utils/address.js';


export default class XtWeb {
    static utils = utils;

    static get address() {
        return {
            toXtAddress(address) {
                if (!utils.isHex(address)&&Number(String(address).length) !== 42 )
                    return address;
                return utils.crypto.getBase58CheckAddress(
                    utils.code.hexStr2byteArray(address.replace(/^0x/, ADDRESS_PREFIX))
                );
            },
            addressHexString(address) {
                if (utils.isHex(address))
                    return address.toLowerCase().replace(/^0x/, ADDRESS_PREFIX);
                return utils.code.byteArray2hexStr(
                    utils.crypto.decodeBase58Address(address)
                ).toLowerCase();
            },
            fromPrivateKey(privateKey, strict = false) {
                try {
                    return utils.crypto.pkToAddress(privateKey, strict);
                } catch {
                    return false;
                }
            },
            addressToHex(value) {
                if (Number(value.length) === 35 && String(String(value).slice(0, 2)) === 'X1')
                    return this.addressHexString(value).replace(ADDRESS_PREFIX_REGEX, '0x');
                return value;

            }
        }
    }
}
