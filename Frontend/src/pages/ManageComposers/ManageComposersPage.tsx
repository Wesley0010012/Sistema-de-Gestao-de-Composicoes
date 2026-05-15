import { ManageComposersPageContent } from "./ManageComposersPageContent";
import { ManageComposersPageProvider } from "./ManageComposersPageProvider";

export function ManageComposersPage() {
  return (
    <ManageComposersPageProvider>
      <ManageComposersPageContent />
    </ManageComposersPageProvider>
  );
}
