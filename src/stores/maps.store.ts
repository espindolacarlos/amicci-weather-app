// src/store/useWeatherStore.ts
import { create } from 'zustand';

type GetCurrentLocationResponse = GeolocationPosition | null;

type MapsState = {
  geolocation: GeolocationPosition;
  getCurrentLocation: () => Promise<GetCurrentLocationResponse>;
};

export const useMapsStore = create<MapsState>((set) => ({
  geolocation: {} as GeolocationPosition,

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
