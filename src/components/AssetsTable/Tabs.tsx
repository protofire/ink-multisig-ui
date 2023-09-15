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
  onChange?: (newValue: number) => void;
  rightComponent: React.ReactNode;
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

export default function AssetTabs(props: AssetTabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    props.onChange?.(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        display="flex"
        flexDirection="row-reverse"
        justifyContent="space-between"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Box display="flex" alignItems="flex-end">
          {props.rightComponent}
        </Box>
        <Tabs value={value} onChange={handleChange}>
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
