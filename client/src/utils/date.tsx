import { format } from 'date-fns';

export const formatDate = (timestamp: Date) => {
  return format(new Date(timestamp), 'do MMMM yyyy');
};

export const dateNoTime = (timestamp: Date) => {
  const getDate = timestamp.getDate();
  const getMonth = timestamp.getMonth();
  const getYear = timestamp.getFullYear();

  return new Date(getYear, getMonth, getDate);
};
