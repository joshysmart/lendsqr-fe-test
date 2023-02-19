// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/db/db.config";
import { useLiveQuery } from "dexie-react-hooks";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  users: object;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const users = db.users.toArray();
  // const users = useLiveQuery(
  // );
  res.status(200).json({ users });
}
