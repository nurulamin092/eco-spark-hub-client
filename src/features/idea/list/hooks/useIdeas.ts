import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/react-query/queryClient";
import { ideaService } from "../../shared/services/idea.service";
import { IdeaFilters, IdeasResponse } from "../../shared/types/idea.types";

interface UseIdeasOptions {
  enabled?: boolean;
}

export function useIdeas(
  filters: IdeaFilters,
  options: UseIdeasOptions = {},
): {
  data: IdeasResponse["data"] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
} {
  const { enabled = true } = options;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: queryKeys.ideas.list(filters),
    queryFn: async () => {
      const response = await ideaService.getAllIdeas(filters);
      return response.data;
    },
    enabled,
    staleTime: 30 * 1000,
  });

  return {
    data,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
  };
}
