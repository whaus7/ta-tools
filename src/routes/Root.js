import React, { useState } from "react";
import { RecoilRoot } from "recoil";
import { Outlet, Link } from "react-router-dom";
import { BulbOutlined, BarChartOutlined } from "@ant-design/icons";
import { ConfigProvider, theme, Layout, Space, Menu, Typography } from "antd";
import Price from "./Price";
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

export default function Root() {
  const [themeToggle, setThemeToggle] = useState("darkAlgorithm");
  const today = new Date();
  const page = window.location.pathname;

  return (
    <RecoilRoot>
      <ConfigProvider theme={{ algorithm: theme[themeToggle] }}>
        <Layout className="layout">
          <Sider theme="light">
            <div className="logo">
              <Title level={4} style={{ margin: "10px 0" }}>
                TA Haus
              </Title>
            </div>
            <Menu defaultSelectedKeys={[page]} mode="vertical" style={{ borderInlineEnd: "none" }}>
              {/* <Menu.Item key="/price">
                <BarChartOutlined />
                <span>Price</span>
                <Link to={`price`} />
              </Menu.Item> */}
              <Menu.Item key="/klines">
                <BarChartOutlined />
                <span>Klines</span>
                <Link to={`klines`} />
              </Menu.Item>
              <Menu.Item key="/aggtrades">
                <BarChartOutlined />
                <span>Recent Trades</span>
                <Link to={`aggtrades`} />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header
              style={{
                display: "flex",
                marginBottom: 16,
                background: themeToggle === "darkAlgorithm" ? "#001529" : "#ebebeb",
              }}
            >
              {/* <Menu theme={themeToggle === 'darkAlgorithm' ? 'dark' : 'light'}  */}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Price />
                </div>
                <div>
                  <a
                    onClick={() => {
                      setThemeToggle(themeToggle === "defaultAlgorithm" ? "darkAlgorithm" : "defaultAlgorithm");
                    }}
                    href="#"
                  >
                    <BulbOutlined />
                  </a>
                </div>
              </div>
            </Header>
            <Content style={{ padding: "0 16px" }}>
              <div className="site-layout-content">
                <Space direction="vertical" size="middle" style={{ display: "flex" }}>
                  <Outlet />
                </Space>
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>Trading Haus Tools ©{today.getFullYear()}</Footer>
          </Layout>
        </Layout>
      </ConfigProvider>
    </RecoilRoot>
  );
}
