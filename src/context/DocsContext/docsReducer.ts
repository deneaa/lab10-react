import type { Comment, History } from "../../types";
import type { Page } from "../../types/page";
import pagesData from "../../data/pages.json";

export interface IState {
  pages: Page[];
  istoric: History[];
  comments: Record<string, Comment[]>;
}

export type Action =
  | { type: "ADD_HISTORY"; payload: { page: Page } }
  | { type: "DELETE_HISTORY" }
  | {
      type: "ADD_COMMENT";
      payload: {
        paginaId: string;
        comment: Comment;
      };
    }
  | {
      type: "UPDATE_PAGE";
      payload: {
        id: string;
        sectiune: string;
        titlu: string;
        continut: string;
      };
    };

export const initialState: IState = {
  pages: pagesData,
  comments: {},
  istoric: [],
};

export const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case "UPDATE_PAGE": {
      return {
        ...state,
        pages: state.pages.map((p) =>
          p.id === action.payload.id && p.sectiune === action.payload.sectiune
            ? {
                ...p,
                titlu: action.payload.titlu,
                continut: action.payload.continut,
              }
            : p,
        ),
      };
    }

    case "ADD_HISTORY": {
      const newItem: History = {
        page: action.payload.page,
        data: Date.now(),
      };

      return {
        ...state,
        istoric: [...state.istoric, newItem].slice(-10),
      };
    }

    case "DELETE_HISTORY": {
      return { ...state, istoric: [] };
    }

    case "ADD_COMMENT": {
      const { paginaId, comment } = action.payload;

      return {
        ...state,
        comments: {
          ...state.comments,
          [paginaId]: [...(state.comments[paginaId] || []), comment],
        },
      };
    }

    default:
      return state;
  }
};
