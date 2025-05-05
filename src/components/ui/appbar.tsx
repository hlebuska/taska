import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { Button } from "../../components/ui/button";

export default function Appbar() {
  return (
    <div className="px-2 w-full h-14 flex items-center justify-between fixed bg-white z-50 border-b border-gray-300 top-0">
      <div className="flex gap-2 items-center">
        <Button variant="ghost" size="icon">
          <MenuIcon />
        </Button>
        <div className="flex gap-1 items-center">
          <Image src="/taskaLogo.svg" alt="Taska Logo" width={36} height={36} />
          <h1 className="text-primary font-normal text-lg m-0">Taska</h1>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline">Account</Button>
        <Button variant="outline">Settings</Button>
      </div>
    </div>
  );
}
