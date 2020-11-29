import styled from "styled-components";
import { rem } from "polished";
import { colors } from "../theme/colors";

export const Heading = styled.h1`
  margin: 0;
  font: normal normal 600 16px/22px Open Sans;
  padding: ${rem(8)};
  color: ${colors.secondary};
`;
