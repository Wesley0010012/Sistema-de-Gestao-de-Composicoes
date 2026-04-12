<?php

namespace App\Modules\Works\Core\Services;

use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Shared\Core\Traits\Services\FindAllTrait;
use App\Modules\Works\Core\Dto\GenreDto;
use App\Modules\Works\Core\Entities\Genre;
use App\Modules\Works\Core\Repositories\GenresRepository;

class GenresService
{
    use FindAllTrait;

    public function __construct(
        private readonly GenresRepository $repository
    ) {}

    public function entityToDto(AbstractEntity $entity): mixed
    {
        $genre = (fn($i): Genre => $i)($entity);

        return new GenreDto(
            $genre->getId(),
            $genre->getName(),
            $genre->getDescription()
        );
    }
}
