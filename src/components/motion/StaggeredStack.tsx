import { Stack, StackProps } from '@chakra-ui/layout';
import { motion } from 'framer-motion';

const MotionStack = motion.custom(Stack);

function StaggeredStack(props: StackProps) {
  return (
    <MotionStack
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      initial="hidden"
      animate="show"
      {...props}
    />
  );
}

export function StaggeredStackItem(props: StackProps) {
  return (
    <MotionStack
      variants={{
        hidden: { opacity: 0, x: 40 },
        show: { opacity: 1, x: 0 },
      }}
      {...props}
    />
  );
}

export default StaggeredStack;
