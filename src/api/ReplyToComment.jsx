import { baseUrl } from '../utils/Constants';
import axiosInstance from '../utils/axiosInstance';

const ReplyToComment = async ( commentId, replyText) => {
  console.log("jjjjjjjjj");
  console.log(commentId,replyText,"fromapi");
  try {
    const formData = new FormData();
    formData.append('content', replyText);

    const response = await axiosInstance.post(`${baseUrl}posts/replytocomment/${commentId}/`, formData);

    if (response.status === 201) {
      // Optional: You can return the response data here if needed
      return response.data;
    } else {
      throw new Error('Failed to create reply');
    }
  } catch (error) {
    throw error;
  }
};

export default ReplyToComment;
