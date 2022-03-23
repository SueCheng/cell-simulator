import React from "react"
import styled,{css} from "styled-components"

interface CellProps {
    isLive: boolean
}
export const Cell = styled.button<CellProps>`
width: 50px;
height: 50px;
border: 2px solid white;
background: lightblue;
${props=>props.isLive && css `background: darkblue;`}
`
