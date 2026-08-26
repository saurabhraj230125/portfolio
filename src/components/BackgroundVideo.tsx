import { useEffect, useRef } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4';

const SENSITIVITY = 0.8;

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const isSeeking = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const seekToTarget = () => {
      if (!video.duration) return;
      const clamped = Math.max(0, Math.min(targetTimeRef.current, video.duration));
      targetTimeRef.current = clamped;
      video.currentTime = clamped;
    };

    const onSeeked = () => {
      isSeeking.current = false;
      // If target moved while we were seeking, seek again
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.01) {
        isSeeking.current = true;
        seekToTarget();
      }
    };

    const handleMove = (clientX: number) => {
      if (prevXRef.current === null) {
        prevXRef.current = clientX;
        return;
      }
      const delta = clientX - prevXRef.current;
      prevXRef.current = clientX;

      if (!video.duration) return;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      const newTarget = Math.max(
        0,
        Math.min(targetTimeRef.current + timeOffset, video.duration)
      );
      targetTimeRef.current = newTarget;

      if (!isSeeking.current) {
        isSeeking.current = true;
        seekToTarget();
      }
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchStart = (e: TouchEvent) => { prevXRef.current = e.touches[0].clientX; };
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

    video.addEventListener('seeked', onSeeked);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);

    return () => {
      video.removeEventListener('seeked', onSeeked);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={VIDEO_URL}
      muted
      playsInline
      preload="auto"
      className="fixed inset-0 w-full h-full object-cover z-0 object-center md:object-[70%_center]"
    />
  );
}
