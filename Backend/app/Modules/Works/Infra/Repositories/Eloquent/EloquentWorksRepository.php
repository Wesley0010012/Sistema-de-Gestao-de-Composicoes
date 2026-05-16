<?php

namespace App\Modules\Works\Infra\Repositories\Eloquent;

use App\Modules\Shared\Core\Dto\FindAllPaginatedDto;
use App\Modules\Shared\Core\Entities\AbstractEntity;
use App\Modules\Works\Core\Repositories\WorksRepository;
use App\Modules\Shared\Core\Entities\EntityPage;
use App\Modules\Shared\Infra\Repositories\Eloquent\Models\EloquentEntity;
use App\Modules\Works\Core\Entities\Genre;
use App\Modules\Works\Core\Entities\Score;
use App\Modules\Works\Core\Entities\Section;
use App\Modules\Works\Core\Entities\Work;
use App\Modules\Works\Infra\Repositories\Eloquent\Models\ScoreModel;
use App\Modules\Works\Infra\Repositories\Eloquent\Models\SectionModel;
use App\Modules\Works\Infra\Repositories\Eloquent\Models\WorkModel;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class EloquentWorksRepository extends WorksRepository
{
    private function baseQuery()
    {
        return WorkModel::with([
            'genres',
            'composers',
            'sections.scores.instrument'
        ])->where('active', true);
    }

    public function add(AbstractEntity $entity): void
    {
        $work = (fn($i): Work => $i)($entity);

        DB::transaction(function () use ($work) {
            $model = new WorkModel();

            $this->fillModel($model, $work);
            $model->active = true;
            $model->save();

            $work->setId($model->id);

            $this->syncRelations($model, $work);
        });
    }

    public function findAllPaginated(FindAllPaginatedDto $dto): EntityPage
    {
        $query = $this->baseQuery();
        $searchFilters = [];

        foreach ($dto->getFilters() as $field => $value) {

            if ($field === 'genre_id') {
                $query->whereHas('genres', function ($q) use ($value) {
                    $q->where('genres.id', $value);
                });
            } elseif ($field === 'composer_id') {
                $query->whereHas('composers', function ($q) use ($value) {
                    $q->where('composers.id', $value);
                });
            } elseif ($field === 'instrument_id') {
                $query->whereHas('sections.scores', function ($q) use ($value) {
                    $q->where('scores.instrument_id', $value);
                });
            } else {
                $searchFilters[$field] = $value;
            }
        }

        if (count($searchFilters) > 0) {
            $query->where(function ($query) use ($searchFilters) {
                foreach ($searchFilters as $field => $value) {
                    $query->orWhere($field, 'LIKE', "%{$value}%");
                }
            });
        }

        $total = $query->count();

        $perPage = $dto->getPerPage();
        $page = $dto->getPage();
        $offset = ($page - 1) * $perPage;

        $query->orderBy('title', $dto->getOrder()->value);

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

    public function findById(int $id): ?AbstractEntity
    {
        $model = $this->baseQuery()
            ->where('id', $id)
            ->first();

        if (!$model) {
            return null;
        }

        return ((fn($i): WorkModel => $i)($model))->toEntity();
    }

    public function countAll(): int
    {
        return WorkModel::where('active', true)->count();
    }

    public function countRecent(): int
    {
        return WorkModel::where('active', true)
            ->where('created_at', '>=', Carbon::now()->subDays(7))
            ->count();
    }

    public function update(AbstractEntity $entity): void
    {
        $work = (fn($i): Work => $i)($entity);

        DB::transaction(function () use ($work) {
            $model = WorkModel::with(['sections.scores'])->findOrFail($work->getId());

            $this->fillModel($model, $work);
            $model->update();

            $model->sections->each(fn(SectionModel $section) => $section->scores()->delete());
            $model->sections()->delete();

            $this->syncRelations($model, $work);
        });
    }

    public function deleteById(int $id): void
    {
        WorkModel::where('id', $id)
            ->update(['active' => false]);
    }

    public function updateScorePdfPath(int $workId, int $scoreId, string $path): void
    {
        ScoreModel::where('id', $scoreId)
            ->whereHas('section', function ($query) use ($workId) {
                $query->where('work_id', $workId)
                    ->where('active', true)
                    ->whereHas('work', fn($workQuery) => $workQuery->where('active', true));
            })
            ->where('active', true)
            ->firstOrFail()
            ->update(['path' => $path]);
    }

    private function fillModel(WorkModel $model, Work $work): void
    {
        $model->title = $work->getTitle();
        $model->subtitle = $work->getSubtitle();
        $model->catalog_number = $work->getCatalogNumber();
        $model->opus_number = $work->getOpusNumber();
        $model->year_composition = $work->getYearComposition();
        $model->description = $work->getDescription();
    }

    private function syncRelations(WorkModel $model, Work $work): void
    {
        $genresIds = array_map(
            fn(Genre $genre) => $genre->getId(),
            $work->getGenres()
        );

        $composersIds = array_map(
            fn($composer) => $composer->getId(),
            $work->getComposers()
        );

        $model->genres()->sync($genresIds);
        $model->composers()->sync($composersIds);

        $sections = $work->getSection();
        
        array_walk(
            $sections,
            fn(Section $section) => $this->createSection($model, $section)
        );
    }

    private function createSection(WorkModel $workModel, Section $section): void
    {
        $sectionModel = new SectionModel();
        $sectionModel->work_id = $workModel->id;
        $sectionModel->key_root = $section->getKey()->getRoot()->value;
        $sectionModel->key_mode = $section->getKey()->getKeyMode()->value;
        $sectionModel->active = true;
        $sectionModel->save();

        $section->setId($sectionModel->id);

        $scores = $section->getScores();

        array_walk(
            $scores,
            fn(Score $score) => $this->createScore($sectionModel, $score)
        );
    }

    private function createScore(SectionModel $sectionModel, Score $score): void
    {
        $scoreModel = $sectionModel->scores()->create([
            'instrument_id' => $score->getInstrument()->getId(),
            'path' => $score->getPath(),
            'active' => true,
        ]);

        $score->setId($scoreModel->id);
    }
}
