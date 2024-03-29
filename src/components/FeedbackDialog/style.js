import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  textfield: { margin: theme.spacing(1) },
  nameTextfield: { margin: theme.spacing(1), maxWidth: theme.spacing(38) },
  container: { display: 'flex', flexDirection: 'column' },
  link: { textDecoration: 'underline' },
  circular: { margin: theme.spacing(4) },
}));
