import { DeleteEvent } from "./components/delete-event";
import { Header } from "./components/header";

export function DelEvent() {
  return(
    <div className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
      <Header/>
      <DeleteEvent/>
    </div>
  ) 
}