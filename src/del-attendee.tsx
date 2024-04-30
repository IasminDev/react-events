import { DeleteAttendee } from "./components/delete-attendee";
import { Header } from "./components/header";

export function DelAttendee() {
  return(
    <div className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
      <Header/>
      <DeleteAttendee/>
    </div>
  ) 
}