import { useEffect } from 'react';

/**
 * AudioAutoplayTrigger
 *
 * Listens for the first user interaction (click, scroll, or touch) and then
 * calls the supplied `startAudio` callback. After the first successful
 * trigger the listeners are removed so the callback runs only once.
 */
export default function AudioAutoplayTrigger({
  startAudio,
}: {
  /** Called on the first qualifying user gesture */
  startAudio: () => void;
}) {
  useEffect(() => {
    let triggered = false;
    const handler = () => {
      if (triggered) return;
      triggered = true;
      startAudio();
      window.removeEventListener('click', handler);
      window.removeEventListener('scroll', handler);
      window.removeEventListener('touchstart', handler);
    };
    window.addEventListener('click', handler, { passive: true });
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('touchstart', handler, { passive: true });
    return () => {
      window.removeEventListener('click', handler);
      window.removeEventListener('scroll', handler);
      window.removeEventListener('touchstart', handler);
    };
  }, [startAudio]);

  return null;
}
