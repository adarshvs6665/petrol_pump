import { useMutation, useQuery } from "react-query";
import axios from "axios";

export const useFetchOrdersQuery = (pumpOwnerId) => {
    const fetchData = async () => {
        const response = await axios.get(
            "http://localhost:3000/api/v1/pump/order",
            {
                params: { pumpOwnerId },
            }
        );
        return response.data;
    };

    return useQuery(["data", pumpOwnerId], fetchData, {
        staleTime: 0, // Set the staleTime to 0 to bypass caching
    });
};
