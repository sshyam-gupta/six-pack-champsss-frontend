import Lottie, { LottieProps } from 'react-lottie';

const DEFAULT_ANIMATION = {
  loop: true,
  autoplay: true,
  animType: 'svg',
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

function UncontrolledLottie(props: LottieProps) {
  return <Lottie {...props} options={{ ...DEFAULT_ANIMATION, ...props.options }} />;
}

export default UncontrolledLottie;
