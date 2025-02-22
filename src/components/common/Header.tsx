import { useTheme } from "@/providers/Theme.provider";
import { ModeToggle } from "./ModeToggle";

function Header() {
  const { theme } = useTheme();

  return (
    <header className="p-4 text-foreground bg-background flex justify-between items-center h-20 border-b-2 border-muted-foreground/10">
      <div className="flex gap-2 h-full">
        <img src={theme === "light" ? "/logo-negro.svg" : "/logo-blanco.svg"} />
        <div className="flex flex-col">
          <p className="text-left font-oswald whitespace-nowrap">
            Asado Entre Parejas
          </p>
          <p className="text-left font-oswald whitespace-nowrap">
            Ministerio MEAC
          </p>
        </div>
      </div>
      <ModeToggle />
    </header>
  );
}

export default Header;
