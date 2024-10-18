import React from "react"
import { Button, ButtonProps } from "antd"
import { clientId } from "src/constants"
export const AuthenticateBtn = (props:ButtonProps) => {
  const { disabled } = props
  return (
    <Button onClick={() => {
      window.location.href = `https://www.bungie.net/en/OAuth/Authorize?client_id=${clientId}&response_type=code`
      }}
      disabled={disabled}>
      Authenticate
    </Button>
  )
}