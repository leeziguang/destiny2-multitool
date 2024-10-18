import React from "react"
import { Button } from "antd"
import { userStore } from "src/stores/user"

export const CharDetailsBtn = () => {
  return (
    <Button onClick={async () => {
      const response = await userStore.getCharDetails();
      console.log(`onclick chardetails: ${response}`)
    }}>
      Show all character details
    </Button>
  )
}