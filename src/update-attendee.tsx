import { Header } from "./components/header";
import { UpdateAttendeeData } from "./components/update-attendee-data";

export function UpdateAttendee() {
  return(
    <div className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
      <Header/>
      <UpdateAttendeeData/>
    </div>
  ) 
}