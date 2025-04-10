export class Url {
    /**
     * 
     * @param params Record<string, string | number | boolean>
     * @description Set the search params in the URL
     * @example Url.setSearchParams({ lat: 123, lon: 456, units: 'metric' })
     * @returns void
     */
    public static setSearchParams(params: Record<string, string | number | boolean>) {
        const url = new URL(window.location.href);
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
                url.searchParams.set(key, String(value));
            }
        });
        window.history.pushState({}, '', url.toString());
    }

    /**
     * 
     * @returns Record<string, string | number | boolean>
     * @description Get the search params from the URL
     * @example Url.getSearchParams()
     * @returns The search params from the URL
     */
    public static getSearchParams() {
        const url = new URL(window.location.href);
        const params: Record<string, string | number | boolean> = {};
        url.searchParams.forEach((value, key) => {
            params[key] = value;
        });
        return params;
    }
}