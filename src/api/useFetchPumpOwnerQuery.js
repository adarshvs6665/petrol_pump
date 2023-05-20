import { useMutation, useQuery } from "react-query";
import axios from "axios";

export const useFetchPumpDetailsQuery = (pumpOwnerId) => {
    const fetchData = async () => {
        const response = await axios.get(
            "http://localhost:3000/api/v1/pump/pump-details",
            {
                params: { pumpOwnerId },
            }
        );
        return response.data;
    };

    return useQuery(["data", pumpOwnerId], fetchData);
};
