import { useState, useEffect } from 'react';

 const useDynamicCSSLoader = (cssPath, cssId) => {
  const [cssLoaded, setCssLoaded] = useState(false);

  useEffect(() => {
    const cssLink = document.createElement("link");
    cssLink.href = cssPath;
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";
    cssLink.id = cssId;

    cssLink.onload = () => setCssLoaded(true);
    document.head.appendChild(cssLink);

    return () => {
      const existingLink = document.getElementById(cssId);
      if (existingLink) existingLink.remove();
    };
  }, [cssPath, cssId]);

  return cssLoaded;
};

export default useDynamicCSSLoader;