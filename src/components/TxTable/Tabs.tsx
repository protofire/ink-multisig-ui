import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type AssetTabsProps = {
  options: string[];
  children: React.ReactNode;
  value: number;
  onChange?: (_: React.SyntheticEvent, newValue: number) => void;
};

// const handleChange = (_: React.SyntheticEvent, newValue: number) => {
//   props.onChange?.(newValue);
// };

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
  const { value, onChange } = props;
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={onChange}>
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
      <CustomTabPanel value={value} index={value}>
        {props.children}
      </CustomTabPanel>
    </Box>
  );
}
