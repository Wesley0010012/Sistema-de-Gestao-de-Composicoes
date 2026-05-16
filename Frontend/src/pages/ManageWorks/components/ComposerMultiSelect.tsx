import { type GroupBase } from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";

import type { Composer } from "../../../types/Composer";
import { getAllComposersPaginated } from "../../../utils/composers/composers-crud";
import type { ComposerOption } from "../types";

type ComposerMultiSelectProps = {
  value: ComposerOption[];
  onChange: (value: ComposerOption[]) => void;
};

export function ComposerMultiSelect({
  value,
  onChange,
}: ComposerMultiSelectProps) {
  return (
    <AsyncPaginate<
      ComposerOption,
      GroupBase<ComposerOption>,
      { page: number },
      true
    >
      isMulti
      value={value}
      debounceTimeout={300}
      additional={{ page: 1 }}
      placeholder="Buscar compositores..."
      loadOptions={async (search, _, additional) => {
        const page = additional?.page || 1;

        const response = await getAllComposersPaginated(
          page,
          null,
          null,
          search || null,
        );

        return {
          options: response.data.map((composer: Composer) => ({
            label: composer.name,
            value: composer.id,
          })),
          hasMore: page < response.totalPages,
          additional: {
            page: page + 1,
          },
        };
      }}
      onChange={(selected) => onChange(Array.from(selected || []))}
    />
  );
}
