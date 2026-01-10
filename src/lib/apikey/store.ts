import fs from "fs";
import path from "path";

const DATA_PATH = path.resolve("data/usage.json");

export function readStore() {
    if (!fs.existsSync(DATA_PATH)) {
        throw new Error("usage.json not found");
    }
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
}

export function writeStore(data) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

export function resetIfNewDay(store) {
    const today = new Date().toISOString().slice(0, 10);

    if (store.date !== today) {
        store.date = today;
        store.currentIndex = 0;

        for (const key in store.usage) {
            store.usage[key].model1 = 0;
            store.usage[key].model2 = 0;
        }
    }
}
