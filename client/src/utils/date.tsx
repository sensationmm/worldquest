import { format } from 'date-fns';

export const formatDate = (timestamp: Date, inclTime: boolean = false) => {
  const dateFormat = 'do MMMM yyyy';
  if (inclTime) {
    return format(new Date(timestamp), `${dateFormat} p`);
  }

  return format(new Date(timestamp), dateFormat);
};

export const dateNoTime = (timestamp: Date) => {
  const getDate = timestamp.getDate();
  const getMonth = timestamp.getMonth();
  const getYear = timestamp.getFullYear();

  return new Date(getYear, getMonth, getDate);
};
