function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],

    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(array) {
  return array.map((record) => createEmployeeRecord(record));
}

function createTimeInEvent(record, time) {
  record.timeInEvents.push({
    type: "TimeIn",
    date: time.split(" ")[0],
    hour: parseInt(time.split(" ")[1]),
  });
  return record;
}

function createTimeOutEvent(record, time) {
  record.timeOutEvents.push({
    type: "TimeOut",
    date: time.split(" ")[0],
    hour: parseInt(time.split(" ")[1]),
  });
  return record;
}

function hoursWorkedOnDate(record, date) {
  const timeInObj = record.timeInEvents.find((e) => e.date === date);
  const timeOutObj = record.timeOutEvents.find((e) => e.date === date);
  return (timeOutObj.hour - timeInObj.hour) / 100;
}

function wagesEarnedOnDate(record, date) {
  return hoursWorkedOnDate(record, date) * parseInt(record.payPerHour);
}

function allWagesFor(record) {
  return record.timeInEvents
    .map((e) => wagesEarnedOnDate(record, e.date))
    .reduce((total, curr) => total + curr);
}

function calculatePayroll(records) {
  return records
    .map((r) => allWagesFor(r))
    .reduce((total, curr) => total + curr);
}

function findEmployeeByFirstName(records, firstName){
    return records.find((r) => r.firstName === firstName);
}
