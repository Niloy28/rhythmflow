import * as React from "react";

/** Breakpoint width in pixels that defines the mobile/desktop boundary */
const MOBILE_BREAKPOINT = 768;

/**
 * Hook for detecting if the current viewport is mobile-sized
 *
 * @returns Boolean indicating if the current viewport width is below the mobile breakpoint
 *
 * @remarks
 * Uses a media query listener to track viewport changes and determine if the
 * current screen size should be considered "mobile" (< 768px width).
 *
 * The hook returns `undefined` during server-side rendering and initial hydration
 * to prevent hydration mismatches. Once the effect runs client-side, it returns
 * the actual boolean value.
 *
 * Automatically updates when the window is resized, making it suitable for
 * responsive design decisions and conditional component rendering.
 *
 * @example
 * ```typescript
 * const isMobile = useIsMobile();
 *
 * if (isMobile === undefined) return <div>Loading...</div>;
 *
 * return isMobile ? <MobileNav /> : <DesktopNav />;
 * ```
 */
export function useIsMobile() {
	const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
		undefined
	);

	React.useEffect(() => {
		// Create media query listener for mobile breakpoint
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

		// Handler for viewport size changes
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};

		// Set up listener and get initial value
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

		// Cleanup listener on unmount
		return () => mql.removeEventListener("change", onChange);
	}, []);

	return !!isMobile;
}
