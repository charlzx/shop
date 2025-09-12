import React, { useEffect } from 'react';

// Simple SEO helper compatible with React 19.
// It updates document.title and meta tags (description, og:image, og:title, og:description, canonical)
// and can inject simple JSON-LD structured data.
export default function SEO({ title, description, image, url, type = 'website', jsonLd = null }) {
    useEffect(() => {
        if (title) document.title = title;

        const setMeta = (nameOrProp, value, isProperty = false) => {
            if (!value) return;
            const attr = isProperty ? 'property' : 'name';
            const selector = `[${attr}="${nameOrProp}"]`;
            let el = document.head.querySelector(selector);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attr, nameOrProp);
                document.head.appendChild(el);
            }
            el.setAttribute('content', value);
        };

        // standard description
        setMeta('description', description || 'Shop curated apparel and accessories.');
        // Open Graph
        setMeta('og:title', title || document.title, true);
        setMeta('og:description', description || 'Shop curated apparel and accessories.', true);
        setMeta('og:type', type, true);
        if (image) setMeta('og:image', image, true);
        // twitter
        setMeta('twitter:card', image ? 'summary_large_image' : 'summary');
        setMeta('twitter:title', title || document.title);
        setMeta('twitter:description', description || 'Shop curated apparel and accessories.');
        if (image) setMeta('twitter:image', image);

        // canonical link
        if (url) {
            let link = document.head.querySelector('link[rel="canonical"]');
            if (!link) {
                link = document.createElement('link');
                link.setAttribute('rel', 'canonical');
                document.head.appendChild(link);
            }
            link.setAttribute('href', url);
        }

        // JSON-LD
        if (jsonLd) {
            let script = document.head.querySelector('script[type="application/ld+json"]');
            if (!script) {
                script = document.createElement('script');
                script.setAttribute('type', 'application/ld+json');
                document.head.appendChild(script);
            }
            try {
                script.textContent = JSON.stringify(jsonLd);
            } catch {
                script.textContent = '';
            }
        }

        // cleanup not removing tags so SPA maintains SEO between navigations; we only update contents.
    }, [title, description, image, url, type, jsonLd]);

    return null;
}
