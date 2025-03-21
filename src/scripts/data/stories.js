import { token } from "./token";

async function fetchImageAsBlob(url) {
    try {
        const response = await fetch(url);
        return await response.blob();
    } catch (error) {
        console.error('Gagal mengambil gambar:', error);
        return null;
    }
}

const Story = {
    async getAllStories(){
        try {
            const response = await fetch(`${process.env.API_ENDPOINT}/stories?location=1`, {
                headers: {
                    "Authorization": "Bearer " + token.value
                }
            })
            const { listStory } = await response.json()

            const storiesWithBlob = await Promise.all(listStory.map(async (story) => {
                if (story.photoUrl) {
                    story.photoBlob = await fetchImageAsBlob(story.photoUrl);
                    delete story.photoUrl; // Hapus URL asli
                }
                return story;
            }));

            return storiesWithBlob;
        } catch(error){
            console.log(error)
        }
    }
}

export default Story