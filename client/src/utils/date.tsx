import { format } from 'date-fns';

export const formatDate = (timestamp: Date) => {
  return format(new Date(timestamp), 'do MMM yyyy hh:mm a');
};
