import { makeStyles } from '@material-ui/core'
import logo from './title.png'

const useStyles = makeStyles({
  img: {
    padding: '8px',
    marginTop: '5px',
    width: '30%',
    height: 'auto',
  },
});

export default function TitleBar() {
  const classes = useStyles();

  return (
    <img src={logo} className={classes.img} alt="Timetabler" />
  );
}