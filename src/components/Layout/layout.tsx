import { Layout as AntdLayout, Menu, Row } from "antd";
import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { StyledContent, StyledHeader } from "./layout.style";

const LayoutHeader: FC = () => {
  const location = useLocation();
  return (
    <StyledHeader>
      <Row justify="start">
        <div style={{ minWidth: "100px", maxWidth: "100px", margin: "0 8px" }}>
          <NavLink to="/">Calendar</NavLink>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          activeKey={location.pathname}
          selectedKeys={[location.pathname]}
        >
          <Menu.Item key="/">
            Home
            <NavLink to="/" />
          </Menu.Item>
        </Menu>
      </Row>
      <Row justify="end">
        <div>😎</div>
        <div>🌚</div>
      </Row>
    </StyledHeader>
  );
};

interface Props {
  children: React.ReactNode;
}
const Layout: FC<Props> = ({ children }) => (
  <AntdLayout style={{ minHeight: "100vh", width: "100%" }}>
    <LayoutHeader />
    <StyledContent
    >
      {children}
    </StyledContent>
  </AntdLayout>
);

export default Layout;
