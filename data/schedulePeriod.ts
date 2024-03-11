interface ISchedulePeriod {
  start: string;
  end: string;
}

let schedulePeriods: ISchedulePeriod[] = [];

for (let hour = 0; hour < 23; hour++) {
  const startTime = `${hour < 10 ? '0' : ''}${hour}:00:00`;
  const nextHour = (hour + 1) % 24;
  const endTime = `${nextHour < 10 ? '0' : ''}${nextHour}:00:00`;

  schedulePeriods.push({ start: startTime, end: endTime });
}

schedulePeriods.push({ start: '23:00:00', end: '00:00:00' });

export default schedulePeriods;
