import authentication from "../handlers/authentication.js";
import dataGenerator from "./dataGenerator.js";


export default async function createCall(createData) {
	if (createData.get('title').length < 6 || !createData.get('description') || !createData.get('imageURL')) {
        alert('Title should be at least 6 characters long')
        
	} else if(createData.get('description').length < 10) {
        return alert('Description should be at least 10 characters long')
    } else if (createData.get('imageURL').length < 5) {
        return alert('Image should be at least 5 characters long')
    } else {
        const body = {
            title: createData.get("title"),
            description: createData.get("description"),
            img: createData.get('imageURL')
        };
    
        const response = await dataGenerator.post('/data/ideas', body)
        return response;
    }
	
	
}