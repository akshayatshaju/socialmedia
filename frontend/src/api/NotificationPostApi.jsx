import axiosInstance from '../utils/axiosInstance';
import { baseUrl } from '../utils/Constants';

const getNotificationPostDetailsApi = async (notificationId) => {
    try {
        const response = await axiosInstance.get(`${baseUrl}posts/notifications/${notificationId}/post/`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        if  (response.status === 200) {
            return response.data;
        } else {
            console.log(response.error);
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default getNotificationPostDetailsApi;
