import { db } from "@/db/db.config";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";


const Home = () => {
  const router = useRouter()
  useEffect(() => {
    router.push("/auth/login")
  })
};

export default Home;
