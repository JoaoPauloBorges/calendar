import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Unsubscribe } from "@reduxjs/toolkit";
import { Button, Layout as AntdLayout, Menu, Row } from "antd";
import { FC, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import store from "store";
import {
  ButtonLeft,
  ButtonRight,
  Month,
  StyledActions,
  StyledContent,
  StyledHeader,
  StyledLogo,
  StyledMenu,
  ThemeActions,
  Year,
} from "./layout.style";

import {
  decreaseMonth,
  increaseMonth,
  reset,
} from "./../CalendarView/stateManagement/current-date.reducer";

const getMonthName = (month: number) => {
  const date = new Date();
  date.setMonth(month);
  return date.toLocaleDateString("default", { month: "long" });
};

const LayoutHeader: FC = () => {
  // const location = useLocation();

  const [currentDate, setCurrentDate] = useState(store.getState().currentDate);

  let unsub: Unsubscribe;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    unsub = store.subscribe(() => {
      setCurrentDate(store.getState().currentDate);
    });
    return () => unsub();
  }, []);
  return (
    <StyledHeader>
      <StyledMenu>
        <StyledLogo>
          <Button onClick={() => store.dispatch(reset())}> 2Day </Button>
          {/* <NavLink to="/">Calendar</NavLink> */}
        </StyledLogo>
        {/* <Menu
          theme="light"
          mode="horizontal"
          activeKey={location.pathname}
          selectedKeys={[location.pathname]}
          items={[
            {
              label: (
                <>
                  Home
                  <NavLink to="/" />
                </>
              ),
              key: "/",
            },
          ]}
        /> */}
      </StyledMenu>
      <StyledActions>
        <Year>{currentDate.getFullYear()}</Year>
        <ButtonLeft
          icon={<LeftOutlined />}
          ghost
          shape="circle"
          onClick={() => store.dispatch(decreaseMonth())}
        />
        <Month>{getMonthName(currentDate.getMonth())}</Month>
        <ButtonRight
          icon={<RightOutlined />}
          ghost
          shape="circle"
          onClick={() => store.dispatch(increaseMonth())}
        />
      </StyledActions>
      <ThemeActions>
        <Button ghost type="link" icon={<div>😎</div>} />
        <Button ghost type="link" icon={<div>🌚</div>} />
      </ThemeActions>
    </StyledHeader>
  );
};

interface Props {
  children: React.ReactNode;
}
const Layout: FC<Props> = ({ children }) => (
  <AntdLayout style={{ minHeight: "100vh", width: "100%" }}>
    <LayoutHeader />
    <StyledContent>{children}</StyledContent>
  </AntdLayout>
);

export default Layout;

