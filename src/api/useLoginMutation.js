import { useMutation } from "react-query";
import axios from "axios";

export const useLoginMutation = () => {
    const mutation = useMutation(async (data) => {
        const response = await axios.post(
            "http://localhost:3000/api/v1/pump/pump-owner-login",
            data
        );

        return response.data;
    });

    return mutation;
};
