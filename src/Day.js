import Box from '@material-ui/core/Box';

export default function Day(props) {
  return (
    <Box  
      textAlign="center" 
      py={1.5}                
      bgcolor={ props.ind == 0 ? '' : 'primary.main' }
      color={ props.ind == 0 ? '' : 'primary.contrastText' }
      fontWeight="fontWeightMedium"
      width={100}
    >
      {props.label}             
    </Box>
  );
}