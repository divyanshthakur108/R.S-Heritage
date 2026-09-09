import React, { useEffect, useRef, useState } from 'react';

// Transition (0.75s) + the card-settle keyframe (0.9s), with headroom.
const ANIMATION_MS = 1100;

/**
 * Scroll-reveal wrapper.
 *
 * Fades/slides its children in the first time they scroll into view.
 *
 * Two details worth knowing:
 *
 * 1. The hidden state lives behind a `prefers-reduced-motion: no-preference`
 *    media query in index.css, so reduced-motion users — and anyone whose JS
 *    fails to run — always see fully visible content.
 *
 * 2. Once the reveal has played, the `reveal*` classes are removed entirely.
 *    `.reveal` overrides Tailwind's `transition-all`/`duration-*` on the cards
 *    it wraps (it is emitted later in the bundle), so dropping it hands the
 *    element back to plain Tailwind for its hover transitions, and clears the
 *    `will-change` compositing hint. The end state is identical (opacity 1,
 *    no transform), so there is no visual jump.
 *
 * variant: 'up' | 'left' | 'right' | 'zoom'
 * delay:   ms of stagger, applied as transition-delay
 */
const Reveal = ({
  children,
  variant = 'up',
  delay = 0,
  className = '',
  as: Tag = 'div',
  ...rest
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    // No observer support, or user prefers reduced motion -> show immediately.
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true);
      setDone(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible || done) return;
    const timer = setTimeout(() => setDone(true), delay + ANIMATION_MS);
    return () => clearTimeout(timer);
  }, [visible, done, delay]);

  const revealClasses = done
    ? ''
    : `reveal reveal-${variant}${visible ? ' is-visible' : ''} `;

  return (
    <Tag
      ref={ref}
      className={`${revealClasses}${className}`}
      style={!done && delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
