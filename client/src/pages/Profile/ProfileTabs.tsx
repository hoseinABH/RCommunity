import React, { FC } from 'react';
import Box from '@material-ui/core/Box/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Typography } from '@material-ui/core';
import TimeLine from '../../components/Timeline/TimeLine';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: '#15202B',
    margin: 'auto',
  },
  tab: {
    width: '350px',
    fontWeight: 700,
    margin: '0 2rem',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '0 2rem',
    },
  },
  aboutTab: {
    width: '500px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '0 auto',
    },
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      justifyContent="center"
      display="flex"
    >
      {value === index && <>{children}</>}
    </Box>
  );
}

interface ProfileTabsProps {
  profile: {
    skills: any;
    company: string;
    status: string;
  };
  id: any;
}

const ProfileTabs: FC<ProfileTabsProps> = ({
  profile: { skills, company, status },
  id,
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      className={classes.root}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        variant="fullWidth"
        textColor="primary"
        aria-label="icon label tabs"
      >
        <Tab
          disableRipple={true}
          className={classes.tab}
          label="About"
          value={1}
        />
        <Tab
          disableRipple={true}
          className={classes.tab}
          label="Posts"
          value={2}
        />
      </Tabs>
      <TabPanel index={1} value={value}>
        <Box my={5} className={classes.aboutTab}>
          <TimeLine id={id} skills={skills} company={company} status={status} />
        </Box>
      </TabPanel>
      <TabPanel index={2} value={value}>
        <Box my={5}>
          <Typography>Posts</Typography>
        </Box>
      </TabPanel>
    </Box>
  );
};
export default ProfileTabs;
