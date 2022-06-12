import { Layout as AntdLayout } from "antd";
import { FC } from "react";
import { generateClassNamesWithBaseClass } from "utils/utils";
import { Content } from "antd/lib/layout/layout";
import "./layout.less";
import LayoutHeader from "./LayoutHeader";

interface Props {
  children: React.ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
  const PrefixBaseClass = "Layout";
  const classes = generateClassNamesWithBaseClass(PrefixBaseClass);

  return (
    <AntdLayout style={{ minHeight: "100vh", width: "100%" }}>
      <LayoutHeader />
      <Content className={classes("Content")}>{children}</Content>
    </AntdLayout>
  );
};

export default Layout;
