import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";

import { TxTabType } from ".";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type AssetTabsProps = {
  options: string[];
  children: React.ReactNode;
  tabSelected: TxTabType;
  onChange?: (_: React.SyntheticEvent, newValue: number) => void;
};

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `assets-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TxTabs(props: AssetTabsProps) {
  const { tabSelected, onChange } = props;

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabSelected} onChange={onChange}>
          {props.options.map((option, index) => (
            <Tab
              key={option}
              label={option}
              {...a11yProps(index)}
              sx={{ textTransform: "none" }}
            />
          ))}
        </Tabs>
      </Box>
      <CustomTabPanel value={tabSelected} index={tabSelected}>
        {props.children}
      </CustomTabPanel>
    </Box>
  );
}
