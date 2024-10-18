import { MembershipsObjectWrapper, ProfileResponseObject } from "src/stores/user";
import { clientId, cookies, xApi } from "../constants"
import { BASEPATH } from "../constants/paths"
import { queryBuilder } from "./helper";
import { ActivityWrapper } from "src/types/activityTypes";

// export const fetchUser = () => {
//   const res = fetch(BASEPATH+'User/GetBungieNetUser/', {
//     headers: {

//     }
//   })
// }

export async function fetchItemManifestById(id:number){
  const response = await fetch(BASEPATH+`Destiny/Manifest/InventoryItem/${id}/`, {
    headers: {
      "X-API-Key": xApi,
      "Cookie": cookies,
      "x-csrf": '7608256705282622142',
    }
  })
  if (!response.ok) {
    throw new Error("Bad item manifest by id")
  }
  return await response.json();
}

export async function fetchAccessResponse(authCode:string) {
  const response = await fetch(BASEPATH+'app/oauth/token/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-API-Key': xApi
    },
    body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: authCode,
        client_id: `${clientId}`,
    })
});
  if (!response.ok) {
    throw new Error("Bad access token")
  }
  const result = await response.json();
  return result;
}
interface D2BaseResponse {
  ErrorCode: number,
  ErrorStatus: string,
  Message: string,
}
interface D2MembershipsResponseById extends D2BaseResponse {
  Response: MembershipsObjectWrapper,
}
interface ProfileResponse extends D2BaseResponse {
  Response: ProfileResponseObject,
}
export async function fetchD2SteamMembershipsById(bungieMemberId:string, membershipType:number):Promise<MembershipsObjectWrapper> {
  const response = await fetch(BASEPATH+`User/GetMembershipsById/${bungieMemberId}/${membershipType}/`, {
    headers: {
      'X-API-Key': xApi
    }
  })
  if (!response.ok) {
    throw new Error("Bad membershipid")
  }
  const result:D2MembershipsResponseById = await response.json();
  console.log(`membership fetch: ${Object.keys(result.Response)}` )
  return result.Response;
}
type ActivityDetailsResponse = {
  Response : {
    activities: ActivityWrapper[]
  }
}
export async function fetchActivityHistory(characterId:string, d2MembershipId:string, membershipType:number) {
  const response = await fetch(BASEPATH+`Destiny2/${membershipType}/Account/${d2MembershipId}/Character/${characterId}/Stats/Activities/`, {
    headers: {
      'X-API-Key': xApi
    }
  })
  if (!response.ok) {
    throw new Error("Bad activityhistory")
  }
  const result:ActivityDetailsResponse = await response.json();
  console.log(`activityhistory fetch: ${result.Response.activities}`)
  return result.Response.activities;
}

export async function fetchProfile(destinyMembershipId:string, membershipType:number, components: string[]|number[]):Promise<ProfileResponseObject> {
  const response = await fetch(BASEPATH+`Destiny2/${membershipType}/Profile/${destinyMembershipId}/`+queryBuilder(components), {
    headers: {
      'X-API-Key': xApi
    }
  })
  if (!response.ok) {
    throw new Error("Bad profile")
  }
  const result:ProfileResponse  = await response.json();
  console.log(`profile fetch: ${Object.keys(result)}` )
  return result.Response;
}

export async function fetchCharacterDetils(characterId:string, destinyMembershipId:string, membershipType:number,) {
  const response = await fetch(BASEPATH+`Destiny2/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/?components=204`, {
    headers: {
      'X-API-Key': xApi
    }
  })
  if (!response.ok) {
    throw new Error("Bad chardetails")
  }
  const result = await response.json()
  console.log(`chardetils fetch: ${Object.keys(result.Response)}`)
  return result
}