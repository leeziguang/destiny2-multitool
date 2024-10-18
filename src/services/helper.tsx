export const queryBuilder = (queries:string[]|number[]) => {
  return queries.length ? '?components=' + queries.join(',') : '';
}