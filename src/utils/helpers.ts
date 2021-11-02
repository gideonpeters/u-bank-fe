import app from "@/main";
import { DateTime } from "luxon";

/**
 * Add a +234 country code to phone number
 *
 * @param {String} phoneNo
 */
export const appendNgCountryCode = (phoneNo: string) => {
    if (phoneNo.includes("+234")) return phoneNo;
    return phoneNo[0] === "0" ? `+234${phoneNo.slice(1)}` : `+234${phoneNo}`;
};

export const formatPercent = (number: number) => {
    const formatter = new Intl.NumberFormat(`en-NG`, {
        style: "percent",
        minimumFractionDigits: 2,
    });
    return formatter.format(number);
};

export const formatDate = (date: any, format = DateTime.DATE_FULL) => {
    if (!date) {
        return "";
    }

    const dateTime = DateTime.fromISO(date);

    return dateTime.toLocaleString(format);
};

/**
 * Formats money
 * @param {String} amount
 * @param {Boolean} addSign
 */
export const formatMoney = (
    number = 0,
    countryCode = "NG",
    currencyCode = "NGN",
) => {
    if (isNaN(parseFloat(countryCode))) {
        countryCode = "NG";
    }
    if (isNaN(parseFloat(currencyCode))) {
        currencyCode = "NGN";
    }
    const formatter = new Intl.NumberFormat(`en-${countryCode}`, {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 2,
    });
    return formatter.format(number);
};

import { getBankName } from "./nigerianBanks";

export const bankLogo = (code: string | number): any => {
    const name: string = getBankName(code).toLowerCase().replace(/\s/g, "_");
    return require(`@/assets/icons/bank-logos/${name}.svg`);
};
