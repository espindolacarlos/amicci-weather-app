import { create } from 'zustand';

type GetCurrentLocationResponse = GeolocationPosition | null;

type MapsState = {
  geolocation: GeolocationPosition;
  getCurrentLocation: () => Promise<GetCurrentLocationResponse>;
};

export const useMapsStore = create<MapsState>((set) => ({
  geolocation: {} as GeolocationPosition,

  /**
   * 
   * @returns Promise<GeolocationPosition | null>
   * @description This function retrieves the current location of the user using the Geolocation API.
   * It returns a promise that resolves to the current position or null if an error occurs.
   */
  getCurrentLocation(): Promise<GetCurrentLocationResponse> {
    return new Promise<GeolocationPosition | null>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          set({ geolocation: position });
          resolve(position);
        },
        (error) => {
          reject(error);
          resolve(null);
        }
      );
    });
  }
     
}));
