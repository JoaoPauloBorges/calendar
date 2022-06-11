import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Layout as AntdLayout } from "antd";
import { FC } from "react";
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
  selectCurrentDate,
} from "../CalendarView/stateManagement/current-date.slice";
import { useSelector, useDispatch } from "react-redux";


const getMonthName = (month: number) => {
  const date = new Date();
  date.setMonth(month);
  return date.toLocaleDateString("default", { month: "long" });
};

const LayoutHeader: FC = () => {
  const currentDate = useSelector(selectCurrentDate);
  const dispatch = useDispatch();

  return (
    <StyledHeader>
      <StyledMenu>
        <StyledLogo>
          <Button onClick={() => dispatch(reset())}> 2Day </Button>
        </StyledLogo>

      </StyledMenu>
      <StyledActions>
        <Year>{new Date(currentDate).getFullYear()}</Year>
        <ButtonLeft
          icon={<LeftOutlined />}
          ghost
          shape="circle"
          onClick={() => dispatch(decreaseMonth())}
        />
        <Month>{getMonthName(new Date(currentDate).getMonth())}</Month>
        <ButtonRight
          icon={<RightOutlined />}
          ghost
          shape="circle"
          onClick={() => dispatch(increaseMonth())}
        />
      </StyledActions>
      <ThemeActions>
        <Button type="link" icon={<div>😎</div>} />
        <Button type="link" icon={<div>🌚</div>} />
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

