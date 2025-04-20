export function groupMessagesByDate(messages) {
    const grouped = {};
  
    messages.forEach((msg) => {
      const date = new Date(msg.timestamp);
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
  
      let label = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  
      if (
        date.toDateString() === today.toDateString()
      ) {
        label = "Today";
      } else if (
        date.toDateString() === yesterday.toDateString()
      ) {
        label = "Yesterday";
      }
  
      if (!grouped[label]) {
        grouped[label] = [];
      }
  
      grouped[label].push(msg);
    });
  
    return grouped;
  }
  