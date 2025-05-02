
// Date utilities
const dateUtils = {
  /**
   * Rounds a date-time string to the nearest 15-minute interval
   * @param dateTimeStr - ISO date-time string
   * @returns Rounded ISO date-time string
   */
  roundToNearest15Minutes: (dateTimeStr: string): string => {
    if (!dateTimeStr) return dateTimeStr;

    const date = new Date(dateTimeStr);
    const minutes = date.getMinutes();
    const remainder = minutes % 15;

    // Round to nearest 15 minutes
    if (remainder < 8) {
      // Round down
      date.setMinutes(minutes - remainder);
    } else {
      // Round up
      date.setMinutes(minutes + (15 - remainder));
    }

    // Reset seconds and milliseconds
    date.setSeconds(0, 0);

    return dateUtils.formatDateToLocalISOString(date);
  },

  /**
   * Formats a Date object to a local ISO string (YYYY-MM-DDTHH:MM)
   * @param date - Date object
   * @returns Formatted date string
   */
  formatDateToLocalISOString: (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const mins = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${mins}`;
  },

  /**
   * Formats a Date object to a time string (e.g., "3:30 PM")
   * @param date - Date object
   * @returns Formatted time string
   */
  formatTime: (date: Date): string => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    return formatter.format(date);
  },

  /**
   * Formats a date for datetime-local input (YYYY-MM-DDTHH:MM)
   * @param date - Date object
   * @returns Formatted date string for input
   */
  formatDateForInput: (date: Date): string => {
    return dateUtils.formatDateToLocalISOString(date);
  },

  /**
   * Formats a date and time for display
   * @param dateTimeString - ISO date-time string
   * @returns Formatted date and time string
   */
  formatDateTime: (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  },

  /**
   * Formats a date to get the weekday (e.g., "Mon", "Tue")
   * @param date - Date object or date string
   * @param options - Format options (default: short)
   * @returns Formatted weekday string
   */
  formatWeekday: (date: Date | string, options: 'short' | 'long' = 'short'): string => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleString('en-US', { weekday: options });
  },

  /**
   * Formats a date to get the month (e.g., "Jan", "February")
   * @param date - Date object or date string
   * @param options - Format options (default: short)
   * @returns Formatted month string
   */
  formatMonth: (date: Date | string, options: 'short' | 'long' = 'short'): string => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleString('en-US', { month: options });
  },

  /**
   * Formats a date to get the time (e.g., "3 PM", "3:30 PM")
   * @param date - Date object or date string
   * @returns Formatted time string
   */
  formatTimeShort: (date: Date | string): string => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleString('en-US', { hour: 'numeric', hour12: true });
  },

  /**
   * Calculates the end time based on a start time and duration in minutes
   * @param startTime - Start time as Date object
   * @param durationMinutes - Duration in minutes
   * @returns End time as Date object or null if input is invalid
   */
  calcTimeEnd: (startTime: Date, durationMinutes: number): Date => {
    if (!(startTime instanceof Date) || isNaN(startTime.getTime())) {
      console.error("Invalid start date/time provided.");
    }

    const endTime = new Date(startTime.getTime());
    endTime.setMinutes(endTime.getMinutes() + durationMinutes);
    return endTime;
  }
};

// UI utilities
const uiUtils = {
  /**
   * Shows a status message for a specified duration
   * @param message - Message to display
   * @param type - Message type ('success' or 'error')
   * @param duration - Duration in milliseconds
   * @param statusMessage - Ref for status message
   * @param statusType - Ref for status type
   * @param showStatus - Ref for show status flag
   */
  showStatusMessage: (
    message: string,
    type: 'success' | 'error' = 'success',
    duration: number = 3000,
    statusMessage: any,
    statusType: any,
    showStatus: any
  ): void => {
    statusMessage.value = message;
    statusType.value = type;
    showStatus.value = true;
    setTimeout(() => {
      showStatus.value = false;
    }, duration);
  }
};

// Form utilities
const formUtils = {
  /**
   * Validates that end time is after start time
   * @param startTime - Start time string
   * @param endTime - End time string
   * @returns Boolean indicating if form is valid
   */
  validateTimeRange: (startTime: string, endTime: string): boolean => {
    if (startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);

      return end > start;
    }
    return true;
  }
};

// Calculation utilities
const calcUtils = {
  /**
   * Calculates total price from a base price and add-ons
   * @param basePrice - Base price
   * @param addOns - Array of add-ons with price property
   * @returns Total price
   */
  calcTotalPrice: (basePrice: number, addOns: Array<{price: number}> = []): number => {
    let total = basePrice;
    if (addOns && addOns.length > 0) {
      addOns.forEach((addOn) => {
        total += addOn.price;
      });
    }
    return total;
  },

  /**
   * Calculates total duration from a base duration and add-ons
   * @param baseDuration - Base duration in minutes
   * @param addOns - Array of add-ons with duration property
   * @returns Total duration in minutes
   */
  calcTotalDuration: (baseDuration: number, addOns: Array<{duration: number}> = []): number => {
    let total = baseDuration;
    if (addOns && addOns.length > 0) {
      addOns.forEach((addOn) => {
        total += addOn.duration;
      });
    }
    return total;
  },

  /**
   * Formats a number as a price string
   * @param price - Price number
   * @returns Formatted price string
   */
  formatPrice: (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }
};

const utils = {
  date: dateUtils,
  ui: uiUtils,
  form: formUtils,
  calc: calcUtils
}

export default utils;
