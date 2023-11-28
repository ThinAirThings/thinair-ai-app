import { FC } from "react";


export type ExtractComponentParameters<T extends FC> = Parameters<T>[0];