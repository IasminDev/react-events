import { Header } from "./components/header";
import { UpdateEventData } from "./components/update-event-data";

export function UpdateAttendee() {
  return(
    <div className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
      <Header/>
      <UpdateEventData/>
    </div>
  ) 
}