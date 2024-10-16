import { cookies, xApi } from "../constants"
import { BASEPATH } from "../constants/paths"

export const fetchUser = () => {
  const res = fetch(BASEPATH+'User/GetBungieNetUser/', {
    headers: {

    }
  })
}

export async function fetchItemManifestById(id:number){
  const response = await fetch(BASEPATH+`Destiny/Manifest/InventoryItem/${id}/`, {
    headers: {
      "X-API-KEY": xApi,
      "Cookie": cookies,
      "X-CSRF": '7608256705282622142',
    }
  })
  if (!response.ok) {
    throw new Error("Bad response")
  }

  return await response.json();
}