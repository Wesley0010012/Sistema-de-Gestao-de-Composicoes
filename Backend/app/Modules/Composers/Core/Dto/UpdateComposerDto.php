<?php

namespace App\Modules\Composers\Core\Dto;

use DateTime;

class UpdateComposerDto
{
   private string $name;
   private int $NationalityId;

   private ?string $photoPath = null;

   /**
    * Summary of periodsIds
    * @var int[]
    */
   private array $periodsIds;

   private DateTime $birthDate;
   private ?DateTime $deathDate = null;

   public function __construct(
      string $name,
      int $nationalityId,
      array $periodsIds,
      DateTime $birthDate,
      ?DateTime $deathDate = null,
      ?string $photoPath = null
   ) {
      $this->name = $name;
      $this->NationalityId = $nationalityId;
      $this->periodsIds = $periodsIds;
      $this->birthDate = $birthDate;
      $this->deathDate = $deathDate;
      $this->photoPath = $photoPath;
   }

   public function getName(): string
   {
      return $this->name;
   }

   public function getPhotoPath(): ?string
   {
      return $this->photoPath;
   }

   public function getNationalityId(): int
   {
      return $this->NationalityId;
   }

   /**
    * Summary of getPeriodsIds
    * @return int[]
    */
   public function getPeriodsIds(): array
   {
      return $this->periodsIds;
   }

   public function getBirthDate(): DateTime
   {
      return $this->birthDate;
   }

   public function getDeathDate(): ?DateTime
   {
      return $this->deathDate;
   }
}
