import { ViewportState } from "@thinairthings/zoom-utils";
import Dexie, { Table } from "dexie";



export class PersistentPresence extends Dexie {
    presence!: Table<ViewportState, string>
    constructor() {
        super('persistentPresence')
        this.version(1).stores({
            presence: ''
        })
    }
}

export const presenceDb = new PersistentPresence()
