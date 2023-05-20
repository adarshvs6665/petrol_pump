import { useMutation } from "react-query";
import axios from "axios";

export const useRejectOrderMutation = (pumpOwnerId) => {
    const mutation = useMutation(async (data) => {
        const response = await axios.post(
            "http://localhost:3000/api/v1/pump/reject-order",
            data
        );

        return response.data;
    });

    return mutation;
};
