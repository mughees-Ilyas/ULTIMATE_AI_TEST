import styled, { css } from 'styled-components'
import { colors } from "../theme/colors";
import { rem } from 'polished'

const style = () => css`
  align-items: center;
  height: ${rem(32)};
  padding: 0 ${rem(12)};
  transition: all 0.2s linear;
  background-color: ${colors.primary};
  border: ${rem(1)} solid ${colors.primary};
  color: ${colors.base};
  cursor: pointer;
  outline: none;
  margin:${rem(8)};
  &:hover {
    background-color: ${colors.primaryDarker};
  }
  
   ${props => props.type === 'PrimaryHollow' && css`
     background-color: ${colors.base};
     color: ${colors.primary};
     border: ${rem(1)} solid ${colors.primary};
       font-weight: 100;
       &:hover {
        background-color: ${colors.base};
        color: ${colors.primaryDarker};
        }
        
    `}
`;

export const Button = styled.button([style]);