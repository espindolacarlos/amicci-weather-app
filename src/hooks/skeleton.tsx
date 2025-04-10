import { useEffect, useRef } from 'react';

export function useSkeleton(isLoading: boolean) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isLoading) {
      el.classList.add('loading-skeleton');
    } else {
      el.classList.remove('loading-skeleton');
    }
  }, [isLoading]);

  return ref;
}
