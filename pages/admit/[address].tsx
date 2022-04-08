import type { NextPage } from "next";
import { useRouter } from "next/router";



const Admit: NextPage = () => {

    const router = useRouter();
  const { address } = router.query;

  return (
  <div>{address}</div>
  );
};


export default Admit;
