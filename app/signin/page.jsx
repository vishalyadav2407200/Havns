import LeftRight from "@components/auth/leftright"
import Wrapper from "@components/Wrapper";

const Page = () => {
  return (
    <Wrapper>
      <LeftRight
        page="Log in"
        head="Welcome Back"
        secHead="Unlock the door to your dreams, one login at a time."
      />
    </Wrapper>
  );
};

export default Page;
