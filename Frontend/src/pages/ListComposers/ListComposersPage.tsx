import { ListComposersPageContent } from "./ListComposersPageContent";
import { ComposersPageProviders } from "./ListComposersPageProvider";

export function ListComposersPage() {
  return (
    <ComposersPageProviders>
      <ListComposersPageContent />
    </ComposersPageProviders>
  );
}
