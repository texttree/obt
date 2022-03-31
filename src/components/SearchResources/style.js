import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  divider: {
    backgroundColor: theme.palette.background.default,
    margin: theme.spacing(1),
    padding: '5px 10px',
  },
  menu: { whiteSpace: 'break-spaces' },
  textfield: { margin: theme.spacing(1) },
  link: {
    marginTop: '30px',
    cursor: 'pointer',
    color: 'gray',
    textDecoration: 'underline',
  },
}));
