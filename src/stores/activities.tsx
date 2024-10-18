import { fetchActivityHistory } from "src/services/fetch";
import { userStore } from "./user";
import { ActivityWrapper, StoreActivityValues } from "src/types/activityTypes";
import { makeAutoObservable } from "mobx";
import { dateFormatter } from "src/services/helper";

export class ActivityStore{
  activityHistory: ActivityWrapper[] = []
  activityDetails:{[key:number]: StoreActivityValues} = {} 
  activityDetailsLoadedFlag: boolean = false
  constructor() {
    makeAutoObservable(this)
    this.setActivityDetailsLoadedFlag(false)
  }
  async getActivityHistory() {
    console.log(userStore.d2Memberships.destinyMemberships)
    const activityResp:ActivityWrapper[] = await fetchActivityHistory(userStore.characterIdList[0], userStore.d2Memberships.destinyMemberships[0]?.membershipId, userStore.membershipType)
    console.log(activityResp)
    this.setActivityHistory(activityResp);
    this.setActivityDetails(activityResp);
    this.setActivityDetailsLoadedFlag(true)
    console.log(this.activityDetailsLoadedFlag)
  }
  setActivityDetailsLoadedFlag(state:boolean) {
    this.activityDetailsLoadedFlag = state;
  }
  setActivityHistory(activityHistory: ActivityWrapper[]) {
    this.activityHistory = activityHistory;
  }

  setActivityDetails(activityHistory: ActivityWrapper[]) {
    activityHistory.forEach((activity:ActivityWrapper) => {
      const mode = activity.activityDetails.mode;
      if (!this.activityDetails[mode]) {
        this.activityDetails[mode] = {
          kills: [],
          deaths: [],
          assists: [],
          efficiency: [],
          completed: [],
          duration: [],
          period: [],
        };
      }
      this.activityDetails[mode].kills.unshift(activity.values.kills.basic.value);
      this.activityDetails[mode].deaths.unshift(activity.values.deaths.basic.value);
      this.activityDetails[mode].assists.unshift(activity.values.assists.basic.value);
      this.activityDetails[mode].completed.unshift(activity.values.completed.basic.value); 
      this.activityDetails[mode].efficiency.unshift(activity.values.efficiency.basic.value);
      this.activityDetails[mode].duration.unshift(activity.values.activityDurationSeconds.basic.value/60);
      this.activityDetails[mode].period.unshift(dateFormatter(activity.period))
    })
  }
}

export const activityStore = new ActivityStore()
