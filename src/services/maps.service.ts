export class MapsService {
    /**
     * 
     * @param searchTerm string
     * @returns Promise<google.maps.places.AutocompletePrediction[]>
     * @description This function fetches place predictions based on the search term using the Google Maps Places API.
     * It returns a promise that resolves to an array of predictions or rejects with an error message.
     */
    async getSearchAddress(searchTerm: string): Promise<google.maps.places.AutocompletePrediction[]> {
        const autocomplete = new google.maps.places.AutocompleteService();
        return new Promise((resolve, reject) => {
            autocomplete.getPlacePredictions(
                { input: searchTerm, types: ['(cities)'] },
                (predictions, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        resolve(predictions || []);
                    } else {
                        reject(`Failed to fetch predictions: ${status}`);
                    }
                }
            );
        });
    }
}