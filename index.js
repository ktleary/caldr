"use strict";

const getSplitEntryDate = datestr => {
  let [month, day, year] = datestr.split("-");
  month && month--;
  const [hour, minute] = splitEntry[1].split(":");
  const entryDate =
    !!new Date(year, month, day, hour, minute) &&
    new Date(year, month, day, hour, minute);

  !entryDate.getTime() && console.log(`Error: ${errors.BADDATE}`);
};

if (!process.argv[2]) return console.log(`Error: ${errors.NOENTRY}`);

const baseEntry = process.argv[2];
const [datestr, eventstr] = baseEntry.split("/");
const ts = Date.parse(datestr);
console.log(Date.parse(datestr).UTC());

function errors() {
  return {
    NOENTRY: "No entry was supplied.",
    BADDATE: "Could not read the supplied date."
  };
}
