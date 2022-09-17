// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const songApi = createApi({
    reducerPath: "songsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://wildify-api.digitalcopilote.re/api/v1",
    }),
    endpoints: (builder) => ({
        getAllSongs: builder.query({
            query: () => `/songs`,
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllSongsQuery } = songApi;
