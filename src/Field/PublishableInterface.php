<?php

namespace Insitaction\EasyAdminFieldsBundle\Field;

interface PublishableInterface
{
    public function getPublishedAt(): ?\DateTimeImmutable;

    public function setPublishedAt(?\DateTimeImmutable $published_at): self;

    public function getArchivedAt(): ?\DateTimeImmutable;

    public function setArchivedAt(?\DateTimeImmutable $archived_at): self;

    public function getStatus(): ?string;

    public function setStatus(string $status): self;
}