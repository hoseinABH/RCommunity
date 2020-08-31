import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import MoodIcon from '@material-ui/icons/Mood';
import TimelineDot from '@material-ui/lab/TimelineDot';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: '6px 16px',
    background: theme.palette.background.default,
    textAlign: 'justify',
  },
}));
interface TimeLineProps {
  skills: any;
  company: string;
  status: string;
  id: any;
}
const TimeLine: FC<TimeLineProps> = ({ skills, company, status, id }) => {
  const classes = useStyles();

  return (
    <Timeline align="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" variant="outlined">
            <MoodIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Status
            </Typography>
            <Typography variant="body2" component="p">
              {status && status}
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" variant="outlined">
            <EmojiTransportationIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Company
            </Typography>
            <Typography variant="body2" component="p">
              {company && company}
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" variant="outlined">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Skills
            </Typography>
            <Typography variant="body2" component="p">
              {skills.map((skill: string, index: number) => (
                <Box key={index} py={1}>
                  {skill}
                </Box>
              ))}
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary" variant="outlined">
            <LinkIcon />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Share
            </Typography>
            <Typography
              component="a"
              target="_blank"
              variant="body2"
              style={{ textDecoration: 'none', textAlign: 'justify' }}
              color="textSecondary"
              rel="noopener noreferrer"
              href={`http://localhost:3000/profile/${id}`}
            >
              share TheProfile Link To Connect Me To Your Friends
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};
export default TimeLine;
