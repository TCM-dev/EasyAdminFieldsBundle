<?php

namespace Insitaction\EasyAdminFieldsBundle\Field;

use Doctrine\ORM\Mapping as ORM;

trait PublishableTrait
{
    #[ORM\Column(type: "datetime_immutable", nullable: true)]
    private $published_at;

    #[ORM\Column(type: "datetime_immutable", nullable: true)]
    private $archived_at;

    #[ORM\Column(type: "string", length: 255)]
    private $status;

    public function getPublishedAt(): ?\DateTimeImmutable
    {
        return $this->published_at;
    }

    public function setPublishedAt(?\DateTimeImmutable $published_at): self
    {
        $this->published_at = $published_at;

        return $this;
    }

    public function getArchivedAt(): ?\DateTimeImmutable
    {
        return $this->archived_at;
    }

    public function setArchivedAt(?\DateTimeImmutable $archived_at): self
    {
        $this->archived_at = $archived_at;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }
}