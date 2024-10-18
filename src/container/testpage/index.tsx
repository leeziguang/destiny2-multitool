import React from "react"
import { useEffect } from "react";
import { AuthenticateBtn } from "src/components/authenticate-btn";

import { userStore } from "src/stores/user";
import s from "./s.module.scss";
import { CharDetailsBtn } from "src/components/char-details-btn";
import { ViewActivityHistoryBtn } from "src/components/view-activity-history-btn";
import { observer } from "mobx-react-lite";
import { activityStore } from "src/stores/activities";
import { ActivityHistoryEChart } from "./activity-history-echart";

export const TestPage = observer(() => {
  useEffect(() => {
    userStore.initUserData();
  }, [])

  return (
    <div className={s.buttonWrapper}>
      <AuthenticateBtn />
      {userStore.initFinishedFlag && (
        <div>
          <CharDetailsBtn />
          <ViewActivityHistoryBtn />
        </div>
      )}
      {activityStore.activityDetailsLoadedFlag && (
        <ActivityHistoryEChart activityMode={3}/>
      )}
    </div>
  )
})