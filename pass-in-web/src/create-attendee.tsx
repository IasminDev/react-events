import { Header } from "./components/header";
import { RegisterNewAttendee } from "./components/register-new-attendee";

export function RegisterAttendee() {
  return(
    <div className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
      <Header/>
      <RegisterNewAttendee/>
    </div>
  ) 
}