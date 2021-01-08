import Box from '@material-ui/core/Box';

export default function DayBox(props) {
  return (
    <Box
      border='1px solid'
      borderColor="white"
      borderBottom={1}
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