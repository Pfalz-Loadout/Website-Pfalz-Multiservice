import { Curtain } from "@/components/motion/Curtain";
import { Reveals } from "@/components/motion/Reveals";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Curtain />
      {children}
      <Reveals />
    </>
  );
}
