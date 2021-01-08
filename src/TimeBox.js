import Box from '@material-ui/core/Box';

export default function TimeBox(props) {
  return (
    <Box
      flex={1}
      textAlign="center" 
      py='auto'               
      bgcolor="primary.main"
      color="primary.contrastText"
      fontWeight="fontWeightMedium"
      width={100}
    >
      {props.label}             
    </Box>
  );
}