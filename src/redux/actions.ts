export const MARK_VISITED = "MARK_VISITED";

export interface MarkVisitedAction {
  type: typeof MARK_VISITED;
  payload: number;
}

export const markVisited = (id: number): MarkVisitedAction => ({
  type: MARK_VISITED,
  payload: id,
});

export type ActionTypes = MarkVisitedAction;
