//React imports
import React from "react";
import { useState, useEffect } from "react";
// Design libraries and styling imports.
import styled from "styled-components";
import { Select, Avatar, Button } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
//utils import
import { merge } from "./utils/mergeData";
//Component imports
import DynamicGraph from "./components/DynamicGraph";
import StaticGraph from "./components/StaticGraph";

function App() {
  //State to store type of graph static / dynamic
  const [type, setType] = useState<string>("dynamic");

  //State to get user input default set to keys[0]
  const [userInput, setUserInput] = useState(
    "sea_surface_wave_significant_height"
  );

  //State to store all the keys.
  const [keys, setKeys] = useState<string[]>();

  //Destructure Option from antd select
  const { Option } = Select;

  //Effect to get all the keys.
  useEffect(() => {
    async function getKeys() {
      setKeys((await merge()).keys);
    }
    getKeys();
  }, []);

  return (
    <MainContainer className="App">
      {/* Sidebar */}
      <Container>
        <Header>
          <SettingOutlined
            style={{ fontSize: "30px", color: "white", marginLeft: "20px" }}
          />
          <User>
            <Avatar size={105} icon={<UserOutlined />} />
            <p>RandomEmail@email.com</p>
          </User>
          <LogoutOutlined
            style={{ fontSize: "30px", color: "white", marginLeft: "20px" }}
          />
        </Header>

        <ButtonContainer>
          <Button
            type="primary"
            style={{ margin: "5px" }}
            onClick={() => setType("dynamic")}
          >
            Dynamic Y Axis plot
          </Button>
          <Button
            type="primary"
            style={{ margin: "5px" }}
            onClick={() => setType("static")}
          >
            Static Values from CSV and json
          </Button>
        </ButtonContainer>
      </Container>

      {/* Dynamic Graph content */}
      <Content>
        {/* If type is dynamic display the selector and dynamic graph else display static graph. */}
        {type === "dynamic" ? (
          <>
            <h1>Select data to plot on y axis</h1>
            {keys ? (
              <Select
                defaultValue={keys[0]}
                style={{ width: 500 }}
                onChange={(item) => setUserInput(item)}
              >
                {keys?.map((item) => (
                  <Option value={item}>{item}</Option>
                ))}
              </Select>
            ) : (
              "Loading...."
            )}
            <DynamicGraph yAxis={userInput} />
          </>
        ) : (
          <>
            <h1>
              Graph plots{" "}
              <span style={{ fontWeight: "bold" }}>
                Sea_Surface_Wave_Significant_Height
              </span>{" "}
              on X-axis and
              <span style={{ fontWeight: "bold" }}>
                {" "}
                Surface_Sea_Water_Speed
              </span>{" "}
              on y-axis
            </h1>
            <StaticGraph />
          </>
        )}

        <p style={{ marginTop: "10px", color: '#606061'}}>
          <span style={{ fontWeight: "bold" }}>**Features**</span>{" "}
          <ul style={{listStyleType: 'none'}}>
          <li>The Top Graph has a zoomable x-axis user can zoom in to see fine details.</li>
          <li>The Bottom Graph acts as a slider for top graph. User can control top graphs zoom and axis using this.</li>
          </ul>
        </p>
      </Content>
    </MainContainer>
  );
}
export default App;

// App styles
const MainContainer = styled.div`
  display: flex;
`;

// Sidebar Container.
const Container = styled.div`
  display: inline;
  flex: 1;
  flex-direction: column;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 370px;
  background-color: #848d97;
`;

// Sidebr header.
const Header = styled.div`
  display: flex;
  padding-top: 40px;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

// Sidebar user avatar and email.
const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 40px;
  margin-right: 40px;

  p {
    margin-top: 5px;
    color: white;
  }
`;

//Sidebar button Container.
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

//Graph Container
const Content = styled.div`
  flex: 1;
  flex-direction: column;
  color: white;
  text-align: center;
  background-color: #a1b9c5;
  overflow: scroll;
  height: 100vh;
  //Hide the scroll-bar
  ::-webkit-scrollbar {
    display: none;
  }

  h1 {
    padding: 30px;
  }
`;
