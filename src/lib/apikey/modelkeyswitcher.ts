import { apiConfigs } from "./apiConfig.js";
import { readStore, writeStore, resetIfNewDay } from "./store.js";

export function getApiKeyAndModel() {
    const store = readStore();
    resetIfNewDay(store);

    const totalKeys = apiConfigs.length;
    let checked = 0;

    while (checked < totalKeys) {
        const config = apiConfigs[store.currentIndex];
        const usage = store.usage[config.id];

        // Use model1 first
        if (usage.model1 < config.dailyLimitPerModel) {
            usage.model1++;
            writeStore(store);
            return {
                apiKey: config.apiKey,
                model: config.models[0]
            };
        }

        // Then model2
        if (usage.model2 < config.dailyLimitPerModel) {
            usage.model2++;
            writeStore(store);
            return {
                apiKey: config.apiKey,
                model: config.models[1]
            };
        }

        // Both models exhausted → move to next API key
        store.currentIndex = (store.currentIndex + 1) % totalKeys;
        checked++;
    }

    throw new Error("All API keys and models exhausted for today");
}
