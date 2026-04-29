import type { Sections } from "./sections";

export interface SearchState {
  q: string;
  sectiune: Sections | "";
  tags: string[];
}
