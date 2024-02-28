import nextAuth from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const handler = nextAuth(options);

export { handler as GET, handler as POST };
