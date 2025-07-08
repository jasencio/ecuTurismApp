
export const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    
    try {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      };
      
      return date.toLocaleDateString('es-ES', options);
    } catch (error) {
      return dateString;
    }
  };
  
  export const formatTime = (timeString: string | undefined) => {
    if (!timeString) return "";
    
    try {
      // Create a date object from the time string
      const date = new Date(timeString);
      
      // Format the time in 24-hour format with minutes
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      });
    } catch (error) {
      // If parsing fails, try to extract just the time part
      const timeMatch = timeString.match(/(\d{2}:\d{2})/);
      return timeMatch ? timeMatch[1] : timeString;
    }
  };