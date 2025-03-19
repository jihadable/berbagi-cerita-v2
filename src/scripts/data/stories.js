import { token } from "./token"

const Story = {
    async getAllStories(){
        
        try {
            const response = await fetch(`${process.env.API_ENDPOINT}/stories?location=1`, {
                headers: {
                    "Authorization": "Bearer " + token.value
                }
            })
            const { listStory } = await response.json()
            
            return listStory
        } catch(error){
            console.log(error)
        }
    }
}

export default Story