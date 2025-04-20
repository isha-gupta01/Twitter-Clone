export function getChatTime(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now - time;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);
  
    // if (diffSec < 60) return "Just now";
    // if (diffMin < 60) return `${diffMin} min${diffMin > 1 ? "s" : ""} ago`;
    // if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;
  
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
  
    const isYesterday =
      time.getDate() === yesterday.getDate() &&
      time.getMonth() === yesterday.getMonth() &&
      time.getFullYear() === yesterday.getFullYear();
  
    if (isYesterday) {
      return `${time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    }
  
    return `${time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }
  