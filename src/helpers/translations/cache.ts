export default class TranslationCache {
    private static cache: Map<string, Map<string, Map<string, string>>> =
        new Map();

    public static async get(
        langCode: string,
        namespace: string,
    ): Promise<Map<string, string>> {
        if (!this.cache.has(langCode)) {
            this.cache.set(langCode, new Map());
        }
        if (!this.cache.get(langCode)!.has(namespace)) {
            this.cache
                .get(langCode)!
                .set(namespace, await this.fetch(langCode, namespace));
        }
        return this.cache.get(langCode)!.get(namespace)!;
    }

    private static fetch(
        langCode: string,
        namespace: string,
    ): Promise<Map<string, string>> {
        return new Promise((resolve, reject) => {
            // TODO fetch server & client side
            fetch(
                `http://localhost:3000/translations/${langCode}/${namespace}.json`,
            )
                .then((res) => res.json())
                .then((json) => {
                    resolve(new Map(Object.entries(json)));
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}
