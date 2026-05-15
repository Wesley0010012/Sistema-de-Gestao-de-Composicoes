import { type GroupBase } from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";

import { useSelectedComposerContext } from "../../../contexts/SelectedComposerContext";
import type { Composer } from "../../../types/Composer";
import {
  findComposerById,
  getAllComposersPaginated,
} from "../../../utils/composers/composers-crud";

type ComposerOption = {
  label: string;
  value: number;
};

export function ComposerSelect() {
  const { state: selectedComposer, setState: setSelectedComposer } =
    useSelectedComposerContext();

  return (
    <AsyncPaginate<ComposerOption, GroupBase<ComposerOption>, { page: number }>
      isClearable
      value={
        selectedComposer
          ? {
              label: selectedComposer.name,
              value: selectedComposer.id,
            }
          : null
      }
      onChange={async (option) => {
        if (!option) {
          setSelectedComposer(null);
          return;
        }

        const composer = await findComposerById(option.value);
        setSelectedComposer(composer);
      }}
      additional={{ page: 1 }}
      debounceTimeout={300}
      placeholder="Buscar por compositor..."
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
    />
  );
}
