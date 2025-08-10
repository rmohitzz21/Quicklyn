import SummaryApi from '../common/SummaryApi.js'
import Axios from './Axios.jsx'


const uploadImage = async(image) =>{
    try {
        const fromData = new FormData();
        fromData.append('image', image);

        const response = await Axios({
            ...SummaryApi.uploadImage,
            data: fromData
        })
        return response;
    } catch (error) {
        return error
    }
}

export default uploadImage;

