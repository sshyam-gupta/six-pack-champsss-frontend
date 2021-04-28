import { SimpleGrid, SimpleGridProps } from '@chakra-ui/layout';
import { motion } from 'framer-motion';

const MotionGrid = motion(SimpleGrid);

function StaggeredGrid(props: SimpleGridProps) {
  return (
    <MotionGrid
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

export function StaggeredGridItem(props: SimpleGridProps) {
  return (
    <StaggeredGrid
      //@ts-ignore
      variants={{
        hidden: { opacity: 0, x: 40 },
        show: { opacity: 1, x: 0 },
      }}
      {...props}
    />
  );
}

export default StaggeredGrid;
