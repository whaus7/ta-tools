import React, { useState } from "react";
import { RecoilRoot } from "recoil";
import { Outlet, Link } from "react-router-dom";
import { BulbOutlined, BarChartOutlined } from "@ant-design/icons";
import { ConfigProvider, theme, Layout, Space, Menu } from "antd";
const { Header, Content, Footer } = Layout;

export default function Root() {
  const [themeToggle, setThemeToggle] = useState("darkAlgorithm");
  const today = new Date();
  const page = window.location.pathname;

  return (
    <RecoilRoot>
      <ConfigProvider theme={{ algorithm: theme[themeToggle] }}>
        <Layout className="layout">
          <Header
            style={{
              display: "flex",
              marginBottom: 16,
              background:
                themeToggle === "darkAlgorithm" ? "#001529" : "#ebebeb",
            }}
          >
            <div className="logo" />

            {/* <Menu theme={themeToggle === 'darkAlgorithm' ? 'dark' : 'light'}  */}
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Menu defaultSelectedKeys={[page]} mode="vertical">
                <Menu.Item key="/price">
                  <BarChartOutlined />
                  <span>Price</span>
                  <Link to={`price`} />
                </Menu.Item>
                <Menu.Item key="/klines">
                  <BarChartOutlined />
                  <span>Klines</span>
                  <Link to={`klines`} />
                </Menu.Item>
              </Menu>

              <div>
                <a
                  onClick={() => {
                    setThemeToggle(
                      themeToggle === "defaultAlgorithm"
                        ? "darkAlgorithm"
                        : "defaultAlgorithm"
                    );
                  }}
                  href="#"
                >
                  <BulbOutlined />
                </a>
              </div>
            </div>
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <div className="site-layout-content">
              <Space
                direction="vertical"
                size="middle"
                style={{ display: "flex" }}
              >
                <Outlet />
              </Space>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Trading Haus Tools ©{today.getFullYear()}
          </Footer>
        </Layout>
      </ConfigProvider>
    </RecoilRoot>
  );
}
