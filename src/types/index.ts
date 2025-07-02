import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};


export interface RatesData {
    base: string;
    date: string;
    privacy: string;
    rates: { [key: string]: number };
    success: boolean;
    terms: string;
    timestamp: number;
}
