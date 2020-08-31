import React, { FC } from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import { Box, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import LanguageIcon from '@material-ui/icons/Language';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LocationCityIcon from '@material-ui/icons/LocationCity';
const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    margin: '1rem auto',
    height: 125,
    width: 125,
    [theme.breakpoints.down('sm')]: {
      height: 90,
      width: 90,
    },
  },
}));
interface ProfileHeroProps {
  profile: {
    status: string;
    company: string;
    location: string;
    website: string;
    social: any;
    bio: string;
    user: {
      name: string;
      avatar: string;
    };
  };
}
const ProfileHero: FC<ProfileHeroProps> = ({
  profile: {
    location,
    website,
    social,
    bio,
    user: { name, avatar },
  },
}) => {
  const classes = useStyles();

  return (
    <Box flexDirection="column" display="flex" alignItems="center">
      <Avatar className={classes.avatar} src={avatar} alt={name} />
      <Typography style={{ fontWeight: 700 }} variant="h6" component="h1">
        {name}
      </Typography>
      <Typography color="textSecondary" variant="body2" component="p">
        {bio && bio}
      </Typography>
      <Box mt={1} display="flex">
        <LocationCityIcon
          style={{ color: '#8899A6', marginRight: '5px' }}
          fontSize="small"
        />
        <Typography color="textSecondary" variant="body2" component="p">
          {location && <span> {location}</span>}
        </Typography>
      </Box>

      <Box my={1}>
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <LanguageIcon color="primary" />
          </a>
        )}
        {social && social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <TwitterIcon color="primary" />
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <FacebookIcon color="primary" />
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon color="primary" />
          </a>
        )}
        {social && social.youtube && (
          <Link to={social.youtube} target="_blank" rel="noopener noreferrer">
            <YouTubeIcon color="primary" />
          </Link>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <InstagramIcon color="primary" />
          </a>
        )}
      </Box>
    </Box>
  );
};

export default ProfileHero;
