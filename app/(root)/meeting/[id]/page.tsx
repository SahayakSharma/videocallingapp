
import MeetingRoom from '@/components/MeetingRoom';


export default async function Meeting({params}:{params:Promise<{id:string}>}){

    const {id} =await params

    return(
        <MeetingRoom roomid={id}/>
    )
}

