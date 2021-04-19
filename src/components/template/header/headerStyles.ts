import styled from "styled-components";

export const Header = styled.header`
  height: 32px;
  color: #6d6e71;
  background: #1e1f22;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  -webkit-app-region: drag;
`;

export const Ul = styled.ul`
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  flex: 1;

  li {
    height: 100%;
    cursor: pointer;
    display: inline-block;
    padding: 6px 15px 0;
    -webkit-app-region: no-drag;
    &:hover {
      color: #fff;
      background: #383942;
    }
  }
`;

export const UlRight = styled(Ul)`
  text-align: right;

  li {
    padding: 4px 12px 0;
    &:last-child:hover {
      background: #d41224;
    }
  }
`;
