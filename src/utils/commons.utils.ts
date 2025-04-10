export class Commons {
    /**
     * 
     * @param func Function
     * @param delay number
     * @returns Function
     * @description Debounces a function to limit the rate at which it can be called.
     */
    static debounce<T extends (...args: Parameters<T>) => void>(func: T, delay: number) {
        let timeout: ReturnType<typeof setTimeout>;
        return (...args: Parameters<T>): void => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    }

    /**
     * 
     * @param date Date
     * @returns { weekday: string; datetime: string }
     * @description Formats the date and time to the Brazilian format
     */
    static formatDateTime(date: Date): { weekday: string; datetime: string } {
        const weekday = date.toLocaleString("pt-BR", { weekday: "long" });
        const datetime = date.toLocaleString("pt-BR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).replace(":", "h");
        return { weekday, datetime };
    }
}