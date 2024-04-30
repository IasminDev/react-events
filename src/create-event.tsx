import { Header } from "./components/header";
import { CreateNewEvent } from "./components/create-new-event";

export function CreateEvent() {
  return(
    <div className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
      <Header/>
      <CreateNewEvent />
    </div>
  ) 
}