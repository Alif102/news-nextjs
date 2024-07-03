"use client"
import React, { useEffect, useRef } from 'react';

const AdComponent = () => {
  const adRef = useRef(null);

  useEffect(() => {
    if (window && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('Adsbygoogle error:', e);
      }
    }
  }, []);

  return (
    <div>
      <ins ref={adRef} className="adsbygoogle"
           style={{ display: 'inline-block', width: '336px', height: '280px' }}
           data-ad-client="ca-pub-3355748505131146"
           data-ad-slot="2858387384"></ins>
    </div>
  );
};

export default AdComponent;
