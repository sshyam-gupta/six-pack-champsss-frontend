import { IconButton, IconButtonProps } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { useUpdateEffect } from '@chakra-ui/hooks';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { AnimatePresence, motion, useElementScroll } from 'framer-motion';
import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import useRouteChanged from '../hooks/use-route-changed';
import { RemoveScroll } from 'react-remove-scroll';
import { Box, BoxProps, Flex } from '@chakra-ui/layout';
import { SidebarContent } from './Sidebar';

export const MobileNavButton = React.forwardRef((props: IconButtonProps, ref: React.Ref<any>) => {
  return (
    <IconButton
      ref={ref}
      display={['flex', 'flex', 'none']}
      aria-label="Open menu"
      fontSize="20px"
      color={useColorModeValue('gray.800', 'inherit')}
      variant="ghost"
      icon={<AiOutlineMenu />}
      {...props}
    />
  );
});

interface MobileNavContentProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function MobileNavContent(props: MobileNavContentProps) {
  const { isOpen, onClose } = props;
  const closeBtnRef = React.useRef<HTMLButtonElement>();

  useRouteChanged(onClose);

  /**
   * Scenario: Menu is open on mobile, and user resizes to desktop/tablet viewport.
   * Result: We'll close the menu
   */
  const showOnBreakpoint = useBreakpointValue({ base: true, lg: false });

  React.useEffect(() => {
    if (showOnBreakpoint == false) {
      onClose();
    }
  }, [showOnBreakpoint]);

  useUpdateEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus();
      });
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <RemoveScroll forwardProps>
          <motion.div
            transition={{ duration: 0.08 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Flex
              direction="column"
              w="100%"
              bg={useColorModeValue('white', 'gray.800')}
              h="100vh"
              overflow="auto"
              top="0"
              left="0"
              zIndex={20}
              pb="8"
            >
              <ScrollView>
                <SidebarContent />
              </ScrollView>
            </Flex>
          </motion.div>
        </RemoveScroll>
      )}
    </AnimatePresence>
  );
}

const ScrollView = (props: BoxProps & { onScroll?: any }) => {
  const { onScroll, ...rest } = props;
  const [y, setY] = React.useState(0);
  const elRef = React.useRef<any>();
  const { scrollY } = useElementScroll(elRef);
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  useUpdateEffect(() => {
    onScroll?.(y > 5 ? true : false);
  }, [y]);

  return <Box ref={elRef} flex="1" id="routes" overflow="auto" px="6" pb="6" {...rest} />;
};
