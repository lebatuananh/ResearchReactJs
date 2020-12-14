import styled from 'styled-components';

const LayoutContentWrapper = styled.div`
  padding: 3px;
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;

  @media only screen and (max-width: 767px) {
    padding: 3px;
  }

  @media (max-width: 580px) {
    padding: 3px;
  }
`;

export { LayoutContentWrapper };
