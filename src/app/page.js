import Image from "next/image";
import wave from "@/app/../../public/assets/spherewave.gif";
import atom from "@/app/../../public/assets/atom.gif";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="min-h-screen w-screen flex  flex-wrap  lg:flex-row-reverse bg-black lg:bg-white text-white lg:text-black">
      <div className="w-full  min-h-screen  lg:w-1/2 h-screen lg:h-full  relative lg:block hidden">
        <Image
          src={wave}
          fill
          alt="scifi"
          className="opacity-88 lg:block hidden"
        ></Image>
      </div>

      <div className="w-full min-h-screen lg:w-1/2    flex flex-col justify-center items-center gap-5 ">
        <div className="  lg:h-2/3 sm:w-2/3 w-3/4">
          <h1 className="font-heading text-5xl md:text-7xl">
            Stronger Toghether
          </h1>
          <br></br>
          <p className="md:font-semibold lg:text-sm text-xs font-light break-all">
            An Online market place for publishing, Exploring and Collaborating
            on Research Papers.
          </p>
          <br></br>
          <Image src={atom} className="block md:hidden" alt="atom"></Image>
          <br></br>

          <div className="flex gap-5">
            <Button className="lg:hidden block">
              {" "}
              <Link href="/signup">Signup</Link>{" "}
            </Button>
            <Button className="lg:hidden block" variant="secondary">
              <Link href="/login">Login</Link>
            </Button>
            <Button className="lg:block hidden">
              <Link href="/signup">Signup</Link>
            </Button>
            <Button className="lg:block hidden" variant="secondary">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
