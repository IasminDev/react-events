import { Header } from "./components/header";

export function Home() {
  return(
    <div className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
      <Header/>
        <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold ">Home</h1>
            </div>
    </div>
  ) 
}