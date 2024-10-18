import { fetchAccessResponse, fetchCharacterDetils, fetchD2SteamMembershipsById, fetchProfile, 
  // fetchItemManifestById
 } from "../services/fetch"
import { makeAutoObservable } from 'mobx'

// import { observable,
//   action,
//   computed
// } from "mobx"
interface AuthObject {
  access_token: string,
  token_type: string,
  expires_in: number,
}
interface BungieAuthObject extends AuthObject {
  membership_id: string,
}

interface StoreAuthObject extends AuthObject {
  bungieMembershipId: string,
}
export interface MembershipsObjectWrapper {
  destinyMemberships: MembershipsObject[],
  primaryMembershipId: string,
  // bungieNetUser: BungieNetUser, excluding since unused
}
interface MembershipsObject {
  
    LastSeenDisplayName: string,
    LastSeenDisplayNameType: number,
    iconPath: string,
    crossSaveOverride: number,
    applicableMembershipTypes: number[],
    isPublic: boolean,
    membershipType: number,
    membershipId: string,
    displayName: string,
    bungieGlobalDisplayName: string,
    bungieGlobalDisplayNameCode: number,
}
export interface ProfileResponseObject {
  responseMintedTimeStampe: string,
  secondaryComponentsMintedTime: string,
  characters: {
    data: {
      [key: string]: CharacterObject
    }
  }
}
interface CharacterObject {
  membershipId: string,
  membershipType: number,
  characterId: string,
  dateLastPlayed: string,
  minutesPlayedThisSession: string,
  minutesPlayedTotal: string,
  light: string,
  stats: CharacterStatObject,
  classType: number,
}
interface CharacterStatObject {
  "1935470627": number, //light lvl
  "2996146975": number, // mob
  "392767087": number, // res
  "1943323491": number, // rec
  "1735777505": number, // dis
  "144602215": number, // int
  "4244567218": number, // str
}
export class UserStore {
  accessResponse: StoreAuthObject = {access_token:'', token_type:'', expires_in:0, bungieMembershipId:''}
  d2Memberships: MembershipsObjectWrapper = {destinyMemberships:[], primaryMembershipId:''}
  membershipType: number = 3; // set to 3 for steam account 
  characterData: Record<string, CharacterObject> = {}
  characterIdList: string[] = []
  accessTokenFlag: boolean = true;
  initFinishedFlag: boolean = false; // to allow display of other buttons after init of user data
  itemManifest: string = undefined
  itemManifestLoading = true
  
  constructor() {
    makeAutoObservable(this);
    this.setInitFinishedFlag(false);
  }
  async initUserData() {
    try {
      const authObj:BungieAuthObject = await this.getAccessToken()
      this.setAccessResponse(authObj);
      this.setAccessTokenFlag(true)

      const membershipsData: MembershipsObjectWrapper = await fetchD2SteamMembershipsById(authObj.membership_id, this.membershipType);
      this.setD2Memberships(membershipsData);

      const profileData = await fetchProfile(membershipsData.destinyMemberships[0].membershipId, this.membershipType, [200])
      Object.keys(profileData.characters.data).forEach((key:string) => {
        this.addCharacterData(key, profileData.characters.data[key]);
        this.addCharIdsToList(key);
      })
      this.setInitFinishedFlag(true);
      console.log(this.characterIdList);
    }
    catch (e) {
      console.log("Error in initUserData: ",e)
    }
  }
  getAccessToken() {
    if (this.accessTokenFlag) {
      const params = new URLSearchParams(window.location.search);
      const authCode = params.get('code');
      if (params.size !== 0) {
        this.setAccessTokenFlag(false)
        return fetchAccessResponse(authCode);
      }
    } else {
      return
    }
  }
  async getCharDetails() {
    const charPromises = this.characterIdList.map(charId => fetchCharacterDetils(charId, this.d2Memberships.destinyMemberships[0].membershipId, this.membershipType))
    return await Promise.all(charPromises)
  }
  setAccessResponse(accessResponse:BungieAuthObject) {
    const { membership_id, ...rest } = accessResponse;
    this.accessResponse = {
      bungieMembershipId: membership_id,
      ...rest
    }
  }
  setD2Memberships(data:MembershipsObjectWrapper) {
    this.d2Memberships = data;
  }
  addCharIdsToList(charId:string) {
    this.characterIdList.push(charId)
  }
  addCharacterData(charId:string, charData:CharacterObject) {
    this.characterData[charId] = charData;
  }
  setAccessTokenFlag(state:boolean) {
    this.accessTokenFlag = state;
  }
  setInitFinishedFlag(state:boolean) {
    this.initFinishedFlag = state;
  }
  setItemManifest(manifest:string) {
    this.itemManifest = manifest;
  }
  setItemManifestLoadingStatus(status:boolean) {
    this.itemManifestLoading = status;
  }
}

export const userStore = new UserStore();