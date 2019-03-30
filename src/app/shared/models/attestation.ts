import { Rank, Category } from './teacher';

export class Attestation {
  attestation_date: string;
  attestation_letter: string;
  characteristic: string;
  category_conclusion: Category;
  rank_conclusion: Rank;
  on_category: Category;
  on_rank: Rank;
  personnel_number: number;
}
