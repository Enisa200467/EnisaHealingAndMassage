/**
 * Admin session timeout composable
 * Automatically logs out admin users after 5 minutes of inactivity
 */
export function useAdminSessionTimeout() {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const router = useRouter();

  // Session timeout duration (5 minutes in milliseconds)
  const TIMEOUT_DURATION = 5 * 60 * 1000;

  let timeoutId: NodeJS.Timeout | null = null;
  let lastActivityTime = Date.now();

  /**
   * Reset the timeout timer
   */
  const resetTimeout = () => {
    lastActivityTime = Date.now();

    // Clear existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Only set timeout if user is authenticated
    if (user.value) {
      timeoutId = setTimeout(async () => {
        await logout();
      }, TIMEOUT_DURATION);
    }
  };

  /**
   * Logout user and redirect to login page
   */
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  /**
   * Initialize session timeout tracking
   */
  const initSessionTimeout = () => {
    if (!process.client) return; // Only run on client side

    // Events that indicate user activity
    const activityEvents = [
      'mousedown',
      'mousemove',
      'keydown',
      'scroll',
      'touchstart',
      'click',
    ];

    // Throttle function to avoid excessive timer resets
    let isThrottled = false;
    const throttleDelay = 1000; // 1 second

    const handleActivity = () => {
      if (!isThrottled) {
        resetTimeout();
        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
        }, throttleDelay);
      }
    };

    // Add event listeners for user activity
    activityEvents.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Initialize the timeout
    resetTimeout();

    // Cleanup function
    onUnmounted(() => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    });
  };

  /**
   * Get time remaining until timeout (in seconds)
   */
  const getTimeRemaining = computed(() => {
    const elapsed = Date.now() - lastActivityTime;
    const remaining = Math.max(0, TIMEOUT_DURATION - elapsed);
    return Math.floor(remaining / 1000);
  });

  return {
    initSessionTimeout,
    resetTimeout,
    logout,
    getTimeRemaining,
  };
}
