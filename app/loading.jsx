import Loading from "@components/Loading";
const loading = () => {
  return (
    <div className="h-screen justify-center flex items-center">
      <Loading size='80'/>
    </div>
  );
};

export default loading;
