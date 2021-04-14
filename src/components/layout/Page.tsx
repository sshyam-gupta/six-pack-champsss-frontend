import Header from '../Header';

const Page = ({ ...props }) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default Page;
