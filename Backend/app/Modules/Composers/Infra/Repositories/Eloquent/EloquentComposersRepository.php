<?php

namespace App\Modules\Composers\Infra\Repositories\Eloquent;

use App\Modules\Composers\Core\Entities\Period;
use App\Modules\Shared\Core\Dto\FindAllPaginatedDto;
use App\Modules\Shared\Core\Entities\EntityPage;
use App\Modules\Composers\Core\Repositories\ComposersRepository;
use App\Modules\Composers\Infra\Repositories\Eloquent\Models\ComposerModel;
use \App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Shared\Infra\Repositories\Eloquent\Models\EloquentEntity;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class EloquentComposersRepository extends ComposersRepository
{
    public function existsByName(string $name): bool
    {
        return ComposerModel::where('name', $name)
            ->exists();
    }

    public function countAll(): int
    {
        return ComposerModel::count();
    }

    public function findAll(): array
    {
        throw new \Exception('Not implemented');
    }

    public function add(AbstractEntity $entity): void
    {
        /** @var \App\Modules\Composers\Core\Entities\Composer $entity */

        DB::transaction(function () use ($entity) {

            $model = new ComposerModel();

            $model->name = $entity->getName();
            $model->nationality_id = $entity->getNationality()->getId();
            $model->photo_path = $entity->getPhotoPath();

            $model->birth_date = $entity->getBirthDate()->format('Y-m-d');

            $model->death_date = $entity->getDeathDate()
                ? $entity->getDeathDate()->format('Y-m-d')
                : null;

            $model->active = true;

            $model->save();

            $entity->setId($model->id);

            if (!empty($entity->getPeriods())) {
                $periods = $entity->getPeriods();
                array_walk($periods, fn(Period $period) => $model->periods()->sync($period->getId()));
            }
        });
    }

    public function findAllPaginated(FindAllPaginatedDto $dto): EntityPage
    {
        $query = ComposerModel::with(['nationality', 'periods']);

        foreach ($dto->getFilters() as $field => $value) {
            if ($field == 'period_id') {
                $query->whereHas('periods', function ($q) use ($value) {
                    $q->where('periods.id', $value);
                });
            } else {
                $query->where($field, 'LIKE', "%{$value}%");
            }
        }

        $total = $query->count();

        $perPage = $dto->getPerPage();
        $page = $dto->getPage();
        $offset = ($page - 1) * $perPage;

        $query->orderBy('name', $dto->getOrder()->value);

        $models = $query
            ->offset($offset)
            ->limit($perPage)
            ->get();

        $entities = $models
            ->map(fn(EloquentEntity $model) => $model->toEntity())
            ->toArray();

        $totalPages = (int) ceil($total / $perPage);

        return new EntityPage(
            totalPages: $totalPages,
            actualPage: $page,
            entities: $entities,
            order: $dto->getOrder()
        );
    }

    public function countRecent(): int
    {
        return ComposerModel::where('created_at', '>=', Carbon::now()->subDays(7))
            ->count();
    }

    public function findById(int $id): ?AbstractEntity
    {
        $model = ComposerModel::with(['nationality', 'periods'])
            ->find($id);

        if (!$model) {
            return null;
        }

        return ((fn($i): ComposerModel => $i)($model))->toEntity();
    }

    public function deleteById(int $id): void
    {
        ComposerModel::where('id', '=', $id)
            ->update([
                'active' => false
            ]);
    }
}
