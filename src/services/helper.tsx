import { dateMappings } from "src/constants";

// fetch helpers start //
export const queryBuilder = (queries:string[]|number[]) => {
  return queries.length ? '?components=' + queries.join(',') : '';
}
// fetch helpers end //
// activity helpers start //
export const activityDurationSecondsToMinute = (duration:number) => {
  const formattedSeconds = duration%60 < 10 ? `0${duration%60}` : `${duration%60}` // pad 0 infront when seconds < 10
  return `${Math.floor(duration/60)}:${formattedSeconds}}`
}
export const dateFormatter = (period:string) => {
  // bungie api period timezone is GMT
  const [_year, month, day] = period.split("T")[0].split("-");
  const [hour, min, _sec] = period.split("T")[1].split(":");
  const hourGMT8 = (Number(hour)+8)%24 
  const formattedHour = hourGMT8 < 10 ? `0${hourGMT8}` : hourGMT8
  return `${day} ${dateMappings[Number(month)]} ${formattedHour}:${Number(min)}`

}
// activity helpers end //
