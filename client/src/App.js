import React, { useCallback, useState } from "react";
import { Card, Tabs, Page, FooterHelp, Link } from "@shopify/polaris";

import "./App.css";



import Credentials from "./pages/Credentials";
// import Logs from "./pages/Logs";
import Order from "./pages/Order";
import OrderPage from "./pages/OrderPage";
import SettingPage from "./pages/SettingPage";

export default function TabsExample() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    // {
    //   id: "all-customers",
    //   content: "Credentials",
    //   accessibilityLabel: "All customers",
    //   panelID: "all-customers-content",
    // },
    {
      id: "abandon-checkout",
      content: "Orders",
      panelID: "abandon-checkout-content",
    },
    {
      id: "all-customers",
      content: "Settings",
      panelID: "all-customers-content",
    },
    // {
    //   id: "accepts-marketing",
    //   content: "Logs",
    //   panelID: "accepts-marketing-content",
    // },
  ];

  const tabChangeHandler = (params) => {
    switch (tabs[selected].content) {
			// case "Credentials":
			// 	return <Credentials />;

			// case "Logs":
			//   return <Logs />;

			case "Orders":
				return <OrderPage />;

      case "Settings":
  			return <SettingPage />;

			default:
				break;
		}
  };

  return (
    <Page>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Card.Section>{tabChangeHandler()}</Card.Section>
      </Tabs>
      {/* <FooterHelp>
        Learn more about
        <Link url="https://fynd.com" external>
          {" "}
          Fynd
        </Link>
      </FooterHelp> */}
    </Page>
  );
}
