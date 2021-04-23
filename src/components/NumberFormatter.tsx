import { Text } from '@chakra-ui/layout';
import NumberFormat, { NumberFormatProps } from 'react-number-format';

function NumberFormatter(props: NumberFormatProps) {
  return (
    <Text fontFamily="Varela" isTruncated>
      <NumberFormat displayType="text" thousandSeparator={true} {...props} />
    </Text>
  );
}

export default NumberFormatter;
