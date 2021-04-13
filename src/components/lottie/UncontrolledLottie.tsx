import Lottie, { LottieProps } from 'react-lottie';

const DEFAULT_ANIMATION = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

function UncontrolledLottie(props: LottieProps) {
  return <Lottie height={600} width={600} {...props} options={{ ...DEFAULT_ANIMATION, ...props.options }} />;
}

export default UncontrolledLottie;
