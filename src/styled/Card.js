import React from 'react'
import styled, { css } from 'styled-components'
import { rem } from 'polished'
import { colors } from "../theme/colors";

const style = () => css`
  display: flex;
  flex: 1;
  margin: ${rem(4)};
  align-items: flex-start;
  height: 95%
  
  .card {
    background-color: ${colors.white};
    display: flex;
    flex: 1;
    flex-direction: column;
    box-sizing: border-box;
    cursor: pointer;
    height: 100%
    
    &__selected {
      border: ${colors.primary} 1px solid;
    }


    &:hover {
      background-color: ${colors.lightGraylighter};
    }
  }
`
const CardWrapper = styled.div([style]);

export function Card(props) {
  return (
    <CardWrapper>
      <div className={props.selected ? 'card card__selected': 'card' } >
        <div className="card__header">
          <div className="card__content">
            {props.children}
          </div>
        </div>
      </div>
    </CardWrapper>
  )
}

