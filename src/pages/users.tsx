import PageContainer from '../components/layout/PageContainer';
import LoginRequired from '../components/layout/LoginRequired';
import fetcher from '../util/swr-util';
import useSWR from 'swr';
import EmptyPlaceholder from '../components/EmptyPlaceholder';
import UserItem, { User } from '../components/Users/UserItem';
import StaggeredStack from '../components/motion/StaggeredStack';

function Projects(props) {
  const { data } = useSWR('https://60850d5f9b2bed00170417e4.mockapi.io/api/v1/users', fetcher, {
    initialData: props.users,
  });

  return (
    <LoginRequired>
      <PageContainer pageTitle="Users">
        {data && data.length ? (
          <StaggeredStack mt="1rem">
            {data.map((user: User) => (
              <UserItem key={user.id} {...user} />
            ))}
          </StaggeredStack>
        ) : (
          <EmptyPlaceholder description="No users available" />
        )}
      </PageContainer>
    </LoginRequired>
  );
}

export async function getStaticProps() {
  // `getStaticProps` is invoked on the server-side,
  // so this `fetcher` function will be executed on the server-side.
  const posts = await fetcher('https://60850d5f9b2bed00170417e4.mockapi.io/api/v1/users');
  return { props: { posts } };
}

export default Projects;
