import axiosInstance from "../utils/axiosInstance";
import { baseUrl } from "../utils/Constants";

const ReplyDeleteApi = async (id) => {
    try {
        console.log("Deleting reply with id:", id);

        const response = await axiosInstance.delete(`${baseUrl}posts/deletereply/${id}/`);

        if (response.status === 204) {
            console.log("Reply deleted successfully!");
            return true; // Indicate successful deletion
        } else {
            console.error("Error: Reply not deleted. Unexpected status:", response.status);
            return false; // Indicate deletion failed
        }
    } catch (error) {
        console.error("Error deleting reply:", error);
        throw error; // Re-throw the error to be handled elsewhere if needed
    }
};

export default ReplyDeleteApi;
