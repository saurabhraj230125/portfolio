import { useEffect, useRef } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4';

const SENSITIVITY = 0.8;

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const isSeeking = useRef(false);
  const hasUnlockedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React bug: sometimes muted isn't applied fast enough for iOS autoplay policies
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('muted', 'true');

    // Force load the first frame for iOS
    const onLoadedMetadata = () => {
      // Small delay helps iOS actually paint the frame
      setTimeout(() => {
        if (video) video.currentTime = 0.01;
      }, 50);
    };

    // Unlock video on iOS (requires user interaction to allow arbitrary scrubbing)
    const unlockVideo = () => {
      if (hasUnlockedRef.current || !video) return;
      hasUnlockedRef.current = true;
      video.play().then(() => {
        video.pause();
      }).catch(() => {
        // Silent catch if play fails (e.g. low power mode strict block)
      });
    };

    const seekToTarget = () => {
      if (!video.duration) return;
      const clamped = Math.max(0, Math.min(targetTimeRef.current, video.duration));
      targetTimeRef.current = clamped;
      video.currentTime = clamped;
    };

    const onSeeked = () => {
      isSeeking.current = false;
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.01) {
        isSeeking.current = true;
        seekToTarget();
      }
    };

    const handleMove = (clientX: number) => {
      unlockVideo();
      
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
    
    const onTouchStart = (e: TouchEvent) => {
      unlockVideo();
      prevXRef.current = e.touches[0].clientX;
    };
    
    const onTouchMove = (e: TouchEvent) => {
      handleMove(e.touches[0].clientX);
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('seeked', onSeeked);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    if (video.readyState >= 1) {
      onLoadedMetadata();
    }

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('seeked', onSeeked);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      /* Appending #t=0.001 uses the Media Fragments API to force Safari to extract a poster frame natively */
      src={`${VIDEO_URL}#t=0.001`}
      muted
      playsInline
      preload="auto"
      className="fixed inset-0 w-full h-full object-cover z-0 object-center md:object-[70%_center]"
      style={{ backgroundColor: '#080808' }} 
    />
  );
}
