import React, { FC, useState, ChangeEvent, MouseEvent, useEffect } from 'react';
import Box from '@material-ui/core/Box/Box';
import Typography from '@material-ui/core/Typography/Typography';
import { makeStyles, Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import FormControl from '@material-ui/core/FormControl/FormControl';
import Container from '@material-ui/core/Container';
import BaseInput from '../../components/Input/BaseInput';
import history from '../../history';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../redux/actions/profile';
import { StoreState } from '../../redux/reducers/rootReducer';
const useStyles = makeStyles((theme: Theme) => ({
  hero: {
    fontWeight: 700,
    background: 'linear-gradient(90deg, #8338ec, #3a86ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  profileForm: {
    marginTop: '1.5rem',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '20rem',
    },
  },

  formAction: {
    margin: '1rem auto 15rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      margin: '1rem auto 5rem',
      justifyContent: 'center',
    },
  },
  showMore: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '1rem ',
    },
  },
}));

interface createProfileProps {
  getCurrentProfile: Function;
  createProfile: Function;
  profile: any;
}
interface ProfileFormState {
  company: string;
  website: string;
  location: string;
  status: string;
  skills: string | [];
  githubusername: string;
  bio: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  youtube: string;
  instagram: string;
}
const CreateProfile: FC<createProfileProps> = ({
  getCurrentProfile,
  profile: { profile, loading },
  createProfile,
}) => {
  const [formData, setFormData] = useState<ProfileFormState>({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });
  const [displaySocialInputs, toggleSocialInputs] = useState<boolean>(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const classes = useStyles();

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      setFormData({
        company: loading || !profile.company ? '' : profile.company,
        website: loading || !profile.website ? '' : profile.website,
        location: loading || !profile.location ? '' : profile.location,
        status: loading || !profile.status ? '' : profile.status,
        skills: loading || !profile.skills ? '' : profile.skills,
        githubusername:
          loading || !profile.githubusername ? '' : profile.githubusername,
        bio: loading || !profile.bio ? '' : profile.bio,
        twitter:
          loading || !profile.social.twitter ? '' : profile.social.twitter,
        facebook:
          loading || !profile.social.facebook ? '' : profile.social.facebook,
        linkedin:
          loading || !profile.social.linkedin ? '' : profile.social.linkedin,
        youtube:
          loading || !profile.social.youtube ? '' : profile.social.youtube,
        instagram:
          loading || !profile.social.instagram ? '' : profile.social.instagram,
      });
    }
  }, [loading, getCurrentProfile, profile]);

  const onChangeHandler = (e: ChangeEvent<any>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitHandler = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    createProfile(formData, profile ? true : false);
  };

  return (
    <Container>
      <Box
        mt={5}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h5" component="h1" className={classes.hero}>
          Edit your profile
        </Typography>
        <FormControl className={classes.profileForm}>
          <BaseInput
            name="status"
            onChange={onChangeHandler}
            type="text"
            label="Status"
            variant="filled"
            value={status}
            fullWidth
          />
          <BaseInput
            name="company"
            onChange={onChangeHandler}
            type="text"
            label="Company"
            variant="filled"
            value={company}
            fullWidth
          />
          <BaseInput
            name="website"
            onChange={onChangeHandler}
            type="text"
            label="Website"
            variant="filled"
            fullWidth
            value={website}
          />
          <BaseInput
            fullWidth
            name="location"
            onChange={onChangeHandler}
            type="text"
            label="Location"
            variant="filled"
            value={location}
          />
          <BaseInput
            name="skills"
            onChange={onChangeHandler}
            type="text"
            label="Skills"
            variant="filled"
            value={skills}
            fullWidth
          />
          <BaseInput
            name="githubusername"
            onChange={onChangeHandler}
            type="text"
            label="Github"
            variant="filled"
            value={githubusername}
            fullWidth
          />
          <BaseInput
            name="bio"
            onChange={onChangeHandler}
            label="Bio"
            variant="filled"
            value={bio}
            fullWidth
          />
        </FormControl>

        {displaySocialInputs && (
          <FormControl className={classes.profileForm}>
            <BaseInput
              name="twitter"
              onChange={onChangeHandler}
              label="Twitter"
              variant="filled"
              value={twitter}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <TwitterIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <BaseInput
              name="facebook"
              onChange={onChangeHandler}
              label="Facebook"
              variant="filled"
              value={facebook}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FacebookIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <BaseInput
              name="youtube"
              onChange={onChangeHandler}
              label="Youtube"
              variant="filled"
              value={youtube}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <YouTubeIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <BaseInput
              name="linkedin"
              onChange={onChangeHandler}
              label="Linkedin"
              variant="filled"
              value={linkedin}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LinkedInIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <BaseInput
              name="instagram"
              onChange={onChangeHandler}
              label="Instagram"
              variant="filled"
              value={instagram}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <InstagramIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </FormControl>
        )}
      </Box>
      <Container className={classes.formAction} maxWidth="sm">
        <span>
          <Button
            color="primary"
            variant="contained"
            style={{ color: 'white' }}
            onClick={onSubmitHandler}
          >
            {profile ? 'Edit' : 'Save'}
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => history.goBack()}
            style={{ color: '#E0245E', margin: 'auto 1rem' }}
          >
            Back
          </Button>
        </span>

        <Button
          onClick={() => toggleSocialInputs(!displaySocialInputs)}
          color="primary"
          variant="outlined"
          className={classes.showMore}
        >
          social network links
        </Button>
      </Container>
    </Container>
  );
};
const mapStateToProps = (state: StoreState) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  CreateProfile
);
