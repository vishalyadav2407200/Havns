'use client'
import { motion } from "framer-motion";
import { verifyWithCredentials } from "@actions/authActions";
import Wrapper from "@components/Wrapper";

const VerifyPage = async ({ searchParams: { token } }) => {
  const result = await verifyWithCredentials(token);
  const [Counter, setCounter] = useState(5);
  return (
    <Wrapper>
      <motion.div
        initial={{ opacity: 0, y: -150 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -150 }}
        className="flex  flex-col gap-10 justify-center text-green-600 text-3xl"
      >
        {result?.msg}
        {setInterval(() => {
            setCounter(Counter-1)
        }, 1000)}
        You will redirected to home page in {Counter}s
      </motion.div>
    </Wrapper>
  );
};

export default VerifyPage;
