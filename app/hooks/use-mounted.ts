import * as React from "react";

/**
 * A custom React hook that returns a boolean value indicating whether the component is mounted or not.
 * It sets the initial value to `false` and updates it to `true` when the component is mounted.
 * It also updates the value to `false` when the component is unmounted.
 *
 * @returns {boolean} A boolean value indicating whether the component is mounted or not.
 */
export function useMounted() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted;
}

/**
 * A custom React hook that provides state for tracking form submission status.
 * Useful for disabling buttons during form submission to prevent multiple submissions.
 *
 * @returns {Object} An object containing isSubmitting state and a function to update it
 */
export function useIsSubmitting() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  return {
    isSubmitting,
    setIsSubmitting,
  };
}
