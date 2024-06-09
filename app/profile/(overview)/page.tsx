import { Card } from "../../ui/profile/cards";
import JointClubs from "../../ui/profile/joint-clubs";
import { lusitana } from "@/app/ui/fonts"
import { fetchJointClubs, fetchProfileData} from "@/app/lib/data"

export default async function Page() {
  const clubs = await fetchJointClubs();
  const { 
    name,
    email,
    dateOfBirth,
   } = await fetchProfileData();
  
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2x1`}>
        Profile
      </h1>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-1">
      { <Card
        name={name}
        email={email}
        dateOfBirth={dateOfBirth}
        /> }
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-1">        
        { <JointClubs clubs={clubs} /> }
      </div>
    </main>
  )
}