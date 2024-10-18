import React from "react"
import { Button } from "antd"
import { activityStore } from "src/stores/activities";

export const ViewActivityHistoryBtn = () => {
  return (
    <Button onClick={async () => {
      activityStore.getActivityHistory();
    }}>
      View Activity History
    </Button>
  )
}