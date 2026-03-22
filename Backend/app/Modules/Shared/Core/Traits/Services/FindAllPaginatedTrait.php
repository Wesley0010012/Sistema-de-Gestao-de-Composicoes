<?php

namespace App\Modules\Shared\Core\Traits\Services;

use App\Modules\Shared\Core\Dto\FindAllPaginatedDto;
use App\Modules\Shared\Core\Dto\Output\EntityPageDto;
use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Shared\Core\Entities\EntityPage;
use Exception;

trait FindAllPaginatedTrait
{
    use EntityToDtoTrait, GetRepositoryTrait;

    public function findAllPaginated(FindAllPaginatedDto $dto): EntityPageDto
    {
        $page = $this->getRepository()->findAllPaginated($dto);

        if ($page->getQuantity() < 1) {
            throw new Exception();
        }

        return $this->entityPageToDtoPage($page);
    }

    protected function entityPageToDtoPage(EntityPage $entityPage): EntityPageDto
    {
        $entities = $entityPage->getEntities();

        $entitiesDtos = array_map(fn(AbstractEntity $entity) => $this->entityToDto($entity), $entities);

        return new EntityPageDto(
            $entityPage->getQuantity(),
            $entityPage->getTotalPages(),
            $entityPage->getActualPage(),
            $entitiesDtos,
            $entityPage->getOrder()
        );
    }
}
