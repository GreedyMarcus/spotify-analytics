import { useEffect, useReducer, useRef } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface State<T> {
  loading: boolean;
  data: T | null;
  error?: string;
}

const loading = () => ({ type: "loading" } as const);
const success = <T>(payload: T) => ({ type: "success", payload } as const);
const error = (payload: string) => ({ type: "error", payload } as const);

type Action<T> = ReturnType<typeof loading> | ReturnType<typeof success<T>> | ReturnType<typeof error>;

export const useSpotifyAPI = <T>(url: string): State<T> => {
  const cache = useRef<Dictionary<T>>({});
  const cancelRequest = useRef<boolean>(false);

  const reducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { loading: true, data: state.data };
      case "success":
        return { loading: false, data: action.payload };
      case "error":
        return { loading: false, data: null, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, { loading: false, data: null });
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    cancelRequest.current = false;

    (async () => {
      dispatch(loading());

      if (cache.current[url]) {
        dispatch(success(cache.current[url]));
        return;
      }

      try {
        const response = await axios.get<T>(`https://api.spotify.com/v1${url}`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        const error = (response.data as any).error;
        if (error) {
          throw new Error(error.message);
        }

        cache.current[url] = response.data;

        if (!cancelRequest.current) {
          dispatch(success(response.data));
        }
      } catch (err) {
        if (!cancelRequest.current) {
          dispatch(error((err as Error).message));
        }
      }
    })();

    return () => {
      cancelRequest.current = true;
    };
  }, [url, session]);

  return state;
};
