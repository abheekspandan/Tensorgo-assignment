import React, { useEffect } from 'react';

const HelpCrunchChat = () => {
  useEffect(() => {
    // Define HelpCrunch settings
    window.helpcrunchSettings = {
      organization: 'barmanabheek',
      appId: '190c7719-eea2-4dce-86b9-431b37da0278',
    };

    // Load the HelpCrunch script
    (function (w, d) {
      const hS = w.helpcrunchSettings;
      if (!hS || !hS.organization) return;

      const widgetSrc = 'https://embed.helpcrunch.com/sdk.js';
      w.HelpCrunch = function () {
        w.HelpCrunch.q.push(arguments);
      };
      w.HelpCrunch.q = [];

      const r = () => {
        if (d.querySelector(`script[src="${widgetSrc}"]`)) return;

        const s = d.createElement('script');
        s.async = true;
        s.type = 'text/javascript';
        s.src = widgetSrc;
        (d.body || d.head).appendChild(s);
      };

      if (d.readyState === 'complete' || hS.loadImmediately) {
        r();
      } else if (w.attachEvent) {
        w.attachEvent('onload', r);
      } else {
        w.addEventListener('load', r, false);
      }
    })(window, document);

    // Initialize HelpCrunch when script loads
    const interval = setInterval(() => {
      if (window.HelpCrunch) {
        clearInterval(interval);
        console.log('HelpCrunch is ready.');
        window.HelpCrunch('init');
      } else {
        console.log('Waiting for HelpCrunch...');
      }
    }, 500);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return null; // No visible UI elements needed for this component
};

export default HelpCrunchChat;
