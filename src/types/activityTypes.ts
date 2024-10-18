export interface ActivityWrapper {
  activityDetails: ActivityDetailsObject,
  period: string,
  values: ActivityValues,

}

export interface ActivityDetailsObject {
  directorActivityHash: number,
  instanceId: string,
  isPrivate: boolean,
  membershipType: number,
  mode: number,
  modes: number[],
  referenceId: number,
  
}

export interface ActivityValues {
  [key: string] : ActivityValuesBasicObject
}


interface ActivityValuesBasicObject {
  statId: string,
  basic: {
    displayValue: string,
    value: number,
  }
}

export interface StoreActivityValues {
  kills: number[],
  deaths: number[],
  assists: number[],
  efficiency: number[],
  completed: number[],
  activityDurationSeconds: number[],
  period: string[],
  [key: string]: string[] | number[]
}